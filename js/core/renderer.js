import * as THREE from 'three';

/** Creates the WebGL renderer on the existing canvas. Throws if WebGL is unavailable. */
export function createRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  return renderer;
}

/**
 * Keeps the canvas and camera matching the viewport size.
 * ResizeObserver also fires when the layout changes (e.g. sidebar width), not just the window.
 */
export function watchResize(container, renderer, camera) {
  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false); // false: CSS controls the canvas size
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(container);
  resize();
}
