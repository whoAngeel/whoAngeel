/**
 * ASCII text animation — framework-free port of React Bits' `ASCIIText`
 * (https://reactbits.dev/text-animations/ascii-text, itself based on
 * https://codepen.io/JuanFuentes/pen/eYEeoyE).
 *
 * Pipeline per frame:
 *   1. Text is drawn once to an offscreen 2D canvas → used as a texture.
 *   2. Three.js renders that texture on a subdivided plane whose vertices are
 *      displaced by a wave shader and tilted toward the pointer.
 *   3. The WebGL output is downsampled to one pixel per character cell and
 *      every pixel is mapped to a glyph by luminance, then written to a <pre>.
 *
 * Differences from the React original (intentional):
 *   - No React: the site is plain Astro, so we avoid shipping a UI runtime.
 *   - Uses the site's mono font (JetBrains Mono) instead of loading IBM Plex.
 *   - Single palette color (CSS) instead of the rainbow hue-rotate filter.
 *   - Plane is scaled to fit the container, so it never clips on mobile.
 *   - Rendering pauses when off-screen or the tab is hidden, and is capped
 *     at `maxFps` to keep CPU usage low.
 *   - `prefers-reduced-motion`: renders a single static frame, no loop.
 */
import {
  CanvasTexture,
  Mesh,
  NearestFilter,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";

export interface AsciiTextOptions {
  text: string;
  /** Size of each ASCII glyph in CSS px (React Bits `asciiFontSize`). */
  asciiFontSize?: number;
  /** Resolution of the source text texture. */
  textFontSize?: number;
  /** Max plane height in world units (React Bits `planeBaseHeight`). */
  planeBaseHeight?: number;
  enableWaves?: boolean;
  fontFamily?: string;
  maxFps?: number;
  /** Fraction of the visible width the text may occupy. */
  fit?: number;
}

const CHARSET = " .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const CAMERA_Z = 30;
const CAMERA_FOV = 45;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uEnableWaves;

  void main() {
    vUv = uv;
    float time = uTime * 5.;
    vec3 p = position;
    p.x += sin(time + position.y) * 0.5 * uEnableWaves;
    p.y += cos(time + position.z) * 0.15 * uEnableWaves;
    p.z += sin(time + position.x) * uEnableWaves;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform sampler2D uTexture;

  void main() {
    float time = uTime;
    vec2 pos = vUv;
    float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;
    float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;
    float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;
    float a = texture2D(uTexture, pos).a;
    gl_FragColor = vec4(r, g, b, a);
  }
`;

const lerpRange = (n: number, a: number, b: number, c: number, d: number) =>
  ((n - a) / (b - a)) * (d - c) + c;

/** Renders the source string to a tightly-sized canvas used as texture. */
function createTextCanvas(text: string, fontSize: number, fontFamily: string) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const font = `600 ${fontSize}px ${fontFamily}`;

  ctx.font = font;
  const m = ctx.measureText(text);
  canvas.width = Math.ceil(m.width) + 20;
  canvas.height = Math.ceil(m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) + 20;

  // Resizing a canvas resets its state, so set the font again.
  ctx.font = font;
  ctx.fillStyle = "#fdf9f3";
  ctx.fillText(text, 10, 10 + m.actualBoundingBoxAscent);
  return canvas;
}

export class AsciiText {
  private readonly opts: Required<AsciiTextOptions>;
  private readonly container: HTMLElement;
  private readonly pre: HTMLPreElement;
  private readonly sampler: HTMLCanvasElement;
  private readonly samplerCtx: CanvasRenderingContext2D;

  private renderer!: WebGLRenderer;
  private camera!: PerspectiveCamera;
  private scene!: Scene;
  private mesh!: Mesh<PlaneGeometry, ShaderMaterial>;
  private texture!: CanvasTexture;
  private textAspect = 1;

  private width = 0;
  private height = 0;
  private cols = 0;
  private rows = 0;
  private pointer = { x: 0, y: 0 };

  private raf = 0;
  private lastFrame = 0;
  private visible = true;
  private readonly reducedMotion: boolean;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;

  constructor(container: HTMLElement, options: AsciiTextOptions) {
    this.container = container;
    this.opts = {
      asciiFontSize: 9,
      textFontSize: 200,
      planeBaseHeight: 8,
      enableWaves: true,
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      maxFps: 30,
      fit: 0.92,
      ...options,
    };
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.pre = document.createElement("pre");
    this.pre.className = "ascii-text-pre";
    this.pre.setAttribute("aria-hidden", "true");

    this.sampler = document.createElement("canvas");
    this.samplerCtx = this.sampler.getContext("2d", { willReadFrequently: true })!;
    this.samplerCtx.imageSmoothingEnabled = false;
  }

  /** Throws if WebGL is unavailable so callers can keep a static fallback. */
  async init() {
    const { fontFamily, text, textFontSize, enableWaves } = this.opts;
    try {
      await document.fonts.load(`600 ${textFontSize}px ${fontFamily}`);
    } catch {
      /* Fallback font is fine. */
    }

    this.renderer = new WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0x000000, 0);

    this.camera = new PerspectiveCamera(CAMERA_FOV, 1, 1, 1000);
    this.camera.position.z = CAMERA_Z;
    this.scene = new Scene();

    const textCanvas = createTextCanvas(text, textFontSize, fontFamily);
    this.textAspect = textCanvas.width / textCanvas.height;
    this.texture = new CanvasTexture(textCanvas);
    this.texture.minFilter = NearestFilter;

    // Unit-height plane; real size is applied through `mesh.scale` in fit().
    const geometry = new PlaneGeometry(this.textAspect, 1, 36, 36);
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: this.texture },
        uEnableWaves: { value: enableWaves && !this.reducedMotion ? 1 : 0 },
      },
    });
    this.mesh = new Mesh(geometry, material);
    this.scene.add(this.mesh);

    this.container.appendChild(this.pre);
    this.bindEvents();
    this.resize();
    this.start();
  }

  private bindEvents() {
    this.container.addEventListener("pointermove", this.onPointerMove, { passive: true });

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);

    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      if (this.visible) this.start();
      else this.stop();
    });
    this.intersectionObserver.observe(this.container);

    document.addEventListener("visibilitychange", this.onVisibilityChange);
  }

  private onPointerMove = (e: PointerEvent) => {
    const rect = this.container.getBoundingClientRect();
    this.pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  private onVisibilityChange = () => {
    if (document.hidden) this.stop();
    else if (this.visible) this.start();
  };

  private resize() {
    const { width, height } = this.container.getBoundingClientRect();
    if (!width || !height) return;
    this.width = width;
    this.height = height;
    this.pointer = { x: width / 2, y: height / 2 };

    // Glyph grid: one sampled pixel per character cell.
    const { asciiFontSize, fontFamily } = this.opts;
    this.samplerCtx.font = `${asciiFontSize}px ${fontFamily}`;
    const charWidth = this.samplerCtx.measureText("A").width;
    this.cols = Math.floor(width / charWidth);
    this.rows = Math.floor(height / asciiFontSize);
    this.sampler.width = this.cols;
    this.sampler.height = this.rows;

    this.pre.style.fontSize = `${asciiFontSize}px`;
    this.pre.style.fontFamily = fontFamily;

    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.fit();

    // Static mode still needs a fresh frame after layout changes.
    if (this.reducedMotion) this.render(0);
  }

  /** Scale the plane so the full word stays inside the viewport. */
  private fit() {
    const visibleH = 2 * CAMERA_Z * Math.tan((CAMERA_FOV * Math.PI) / 360);
    const visibleW = visibleH * this.camera.aspect;
    // Waves push vertices ±0.5 units horizontally; reserve room for that.
    const maxByWidth = (visibleW * this.opts.fit - 1) / this.textAspect;
    const h = Math.max(1, Math.min(this.opts.planeBaseHeight, maxByWidth, visibleH * 0.8));
    this.mesh.scale.set(h, h, 1);
  }

  private start() {
    if (this.reducedMotion) {
      this.render(0);
      return;
    }
    if (!this.raf) this.raf = requestAnimationFrame(this.loop);
  }

  private stop() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private loop = (now: number) => {
    this.raf = requestAnimationFrame(this.loop);
    if (now - this.lastFrame < 1000 / this.opts.maxFps) return;
    this.lastFrame = now;
    this.render(now / 1000);
  };

  private render(seconds: number) {
    if (!this.cols || !this.rows) return;
    this.mesh.material.uniforms.uTime.value = Math.sin(seconds);

    // Ease the plane's tilt toward the pointer.
    const targetX = lerpRange(this.pointer.y, 0, this.height, 0.5, -0.5);
    const targetY = lerpRange(this.pointer.x, 0, this.width, -0.5, 0.5);
    if (this.reducedMotion) {
      this.mesh.rotation.set(0, 0, 0);
    } else {
      this.mesh.rotation.x += (targetX - this.mesh.rotation.x) * 0.05;
      this.mesh.rotation.y += (targetY - this.mesh.rotation.y) * 0.05;
    }

    this.renderer.render(this.scene, this.camera);
    this.samplerCtx.clearRect(0, 0, this.cols, this.rows);
    this.samplerCtx.drawImage(this.renderer.domElement, 0, 0, this.cols, this.rows);
    this.pre.textContent = this.asciify();
  }

  private asciify() {
    const data = this.samplerCtx.getImageData(0, 0, this.cols, this.rows).data;
    const last = CHARSET.length - 1;
    let out = "";
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const i = (x + y * this.cols) * 4;
        if (data[i + 3] === 0) {
          out += " ";
          continue;
        }
        const gray = (0.3 * data[i] + 0.6 * data[i + 1] + 0.1 * data[i + 2]) / 255;
        // React Bits uses `invert: true`, i.e. brighter pixel → denser glyph.
        out += CHARSET[last - Math.floor((1 - gray) * last)];
      }
      out += "\n";
    }
    return out;
  }

  dispose() {
    this.stop();
    this.container.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.texture.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.pre.remove();
  }
}
