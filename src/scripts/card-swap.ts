/**
 * Card swap — framework-free port of React Bits' `CardSwap`
 * (https://reactbits.dev/components/card-swap).
 *
 * A 3D stack of cards; every `delay` ms the front card drops out of view,
 * the rest move one slot forward, and the dropped card returns to the back.
 *
 * Differences from the React original (intentional):
 *   - No React: works on existing DOM nodes rendered by Astro.
 *   - `maxVisible`: only the first N cards are visible in the stack; the
 *     rest wait (transparent) in the last slot, so long lists stay compact.
 *   - The stack is centred in its container (no hard-coded offsets).
 *   - Manual control: `next()`, `prev()`, `goTo(index)`, `setPlaying()`.
 *   - `onFrontChange` callback so the page can sync a detail panel.
 *   - Autoplay pauses via independent "blockers" (hover, off-screen,
 *     hidden tab, hidden view, user pause) and never starts for
 *     `prefers-reduced-motion`, where every transition is instant.
 */
import gsap from "gsap";

export interface CardSwapOptions {
  /** X spacing between stacked cards, px. */
  cardDistance?: number;
  /** Y spacing between stacked cards, px. */
  verticalDistance?: number;
  /** Milliseconds between automatic swaps. */
  delay?: number;
  pauseOnHover?: boolean;
  /** Vertical skew applied to every card, degrees. */
  skewAmount?: number;
  easing?: "linear" | "elastic";
  maxVisible?: number;
  autoplay?: boolean;
  onFrontChange?: (index: number) => void;
}

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
  opacity: number;
}

const EASINGS = {
  elastic: {
    ease: "elastic.out(0.6,0.9)",
    durDrop: 2,
    durMove: 2,
    durReturn: 2,
    promoteOverlap: 0.9,
    returnDelay: 0.05,
  },
  linear: {
    ease: "power1.inOut",
    durDrop: 0.8,
    durMove: 0.8,
    durReturn: 0.8,
    promoteOverlap: 0.45,
    returnDelay: 0.2,
  },
} as const;

export class CardSwap {
  private readonly container: HTMLElement;
  private readonly cards: HTMLElement[];
  private readonly opts: Required<Omit<CardSwapOptions, "onFrontChange">> &
    Pick<CardSwapOptions, "onFrontChange">;
  private readonly reducedMotion: boolean;
  private order: number[];
  private tl?: gsap.core.Timeline;
  private timer = 0;
  /** Reasons autoplay is currently suspended. Empty set = playing. */
  private readonly blockers = new Set<string>();
  private intersection?: IntersectionObserver;

  constructor(container: HTMLElement, cards: HTMLElement[], options: CardSwapOptions = {}) {
    this.container = container;
    this.cards = cards;
    this.opts = {
      cardDistance: 60,
      verticalDistance: 70,
      delay: 5000,
      pauseOnHover: false,
      skewAmount: 6,
      easing: "elastic",
      maxVisible: 4,
      autoplay: true,
      ...options,
    };
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.order = cards.map((_, i) => i);

    if (this.reducedMotion || !this.opts.autoplay) this.blockers.add("disabled");
    if (document.hidden) this.blockers.add("tab");
    this.bindEvents();
    this.place();
    this.sync();
  }

  /** Index (in the original card list) of the card currently in front. */
  get front() {
    return this.order[0];
  }

  get playing() {
    return this.blockers.size === 0;
  }

  /** Update spacing (e.g. after a resize) and snap cards to their slots. */
  setDistances(cardDistance: number, verticalDistance: number) {
    this.opts.cardDistance = cardDistance;
    this.opts.verticalDistance = verticalDistance;
    this.tl?.progress(1);
    this.place();
  }

  /** Suspend or resume autoplay for a named reason. */
  block(reason: string, on: boolean) {
    if (on) this.blockers.add(reason);
    else this.blockers.delete(reason);
    this.sync();
  }

  setPlaying(playing: boolean) {
    this.block("user", !playing);
  }

  /** Advance one card with the original drop → promote → return animation. */
  next() {
    if (this.cards.length < 2) return;
    this.finishRunning();

    const [front, ...rest] = this.order;
    this.order = [...rest, front];
    this.opts.onFrontChange?.(this.front);
    this.restartTimer();

    if (this.reducedMotion) {
      this.place();
      return;
    }

    const cfg = EASINGS[this.opts.easing];
    const elFront = this.cards[front];
    const tl = gsap.timeline();
    this.tl = tl;

    tl.to(elFront, { y: "+=500", duration: cfg.durDrop, ease: cfg.ease });

    tl.addLabel("promote", `-=${cfg.durDrop * cfg.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = this.cards[idx];
      const slot = this.slot(i);
      tl.set(el, { zIndex: slot.zIndex }, "promote");
      tl.to(
        el,
        { x: slot.x, y: slot.y, z: slot.z, opacity: slot.opacity, duration: cfg.durMove, ease: cfg.ease },
        // Cap the stagger so hidden cards don't delay the timeline.
        `promote+=${Math.min(i, this.opts.maxVisible) * 0.15}`,
      );
    });

    const back = this.slot(this.cards.length - 1);
    tl.addLabel("return", `promote+=${cfg.durMove * cfg.returnDelay}`);
    tl.call(() => void gsap.set(elFront, { zIndex: back.zIndex }), undefined, "return");
    tl.to(
      elFront,
      { x: back.x, y: back.y, z: back.z, opacity: back.opacity, duration: cfg.durReturn, ease: cfg.ease },
      "return",
    );
  }

  prev() {
    this.goTo(this.order[this.order.length - 1]);
  }

  /** Bring a specific card to the front, rotating the stack. */
  goTo(index: number) {
    if (index === this.front || !this.cards[index]) return;
    this.finishRunning();

    while (this.order[0] !== index) this.order.push(this.order.shift()!);
    this.opts.onFrontChange?.(this.front);
    this.restartTimer();

    if (this.reducedMotion) {
      this.place();
      return;
    }

    const tl = gsap.timeline();
    this.tl = tl;
    this.order.forEach((idx, pos) => {
      const slot = this.slot(pos);
      tl.set(this.cards[idx], { zIndex: slot.zIndex }, 0);
      tl.to(
        this.cards[idx],
        { x: slot.x, y: slot.y, z: slot.z, opacity: slot.opacity, duration: 0.7, ease: "power3.out" },
        0,
      );
    });
  }

  dispose() {
    window.clearInterval(this.timer);
    this.tl?.kill();
    this.intersection?.disconnect();
    document.removeEventListener("visibilitychange", this.onVisibility);
  }

  // ---------------------------------------------------------------------------

  private slot(pos: number): Slot {
    const { cardDistance: dx, verticalDistance: dy, maxVisible } = this.opts;
    const visible = Math.min(maxVisible, this.cards.length);
    const v = Math.min(pos, visible - 1);
    // Centre the whole stack inside the container.
    const shiftX = -((visible - 1) * dx) / 2;
    const shiftY = ((visible - 1) * dy) / 2;
    return {
      x: v * dx + shiftX,
      y: -v * dy + shiftY,
      z: -v * dx * 1.5,
      zIndex: this.cards.length - pos,
      opacity: pos < visible ? 1 : 0,
    };
  }

  /** Snap every card to its slot without animating. */
  private place() {
    this.order.forEach((idx, pos) => {
      gsap.set(this.cards[idx], {
        ...this.slot(pos),
        xPercent: -50,
        yPercent: -50,
        skewY: this.opts.skewAmount,
        transformOrigin: "center center",
        force3D: true,
      });
    });
  }

  private finishRunning() {
    if (this.tl?.isActive() || this.tl?.paused()) this.tl.progress(1);
  }

  private restartTimer() {
    window.clearInterval(this.timer);
    this.timer = 0;
    this.sync();
  }

  /** Start/stop the interval and pause/resume a running timeline. */
  private sync() {
    if (this.playing) {
      if (!this.timer) this.timer = window.setInterval(() => this.next(), this.opts.delay);
      if (this.tl?.paused()) this.tl.play();
    } else {
      window.clearInterval(this.timer);
      this.timer = 0;
      if (this.blockers.has("hover")) this.tl?.pause();
    }
  }

  private onVisibility = () => this.block("tab", document.hidden);

  private bindEvents() {
    if (this.opts.pauseOnHover) {
      this.container.addEventListener("mouseenter", () => this.block("hover", true));
      this.container.addEventListener("mouseleave", () => this.block("hover", false));
    }
    this.intersection = new IntersectionObserver(([entry]) => this.block("offscreen", !entry.isIntersecting));
    this.intersection.observe(this.container);
    document.addEventListener("visibilitychange", this.onVisibility);
  }
}
