import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Camera positions for the View menu. All look at the origin.
const VIEWS = {
  reset: [6, 5, 8],
  front: [0, 0, 12],
  right: [12, 0, 0],
  top: [0, 14, 0.001], // tiny z offset keeps "up" well-defined when looking straight down
};

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
  camera.position.set(...VIEWS.reset);
  return camera;
}

/**
 * Mouse: left drag orbits, right drag pans, wheel zooms.
 * Touch: one finger orbits, two fingers pinch-zoom and pan (OrbitControls defaults).
 */
export function createControls(camera, domElement) {
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.minDistance = 1;
  controls.maxDistance = 100;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN,
  };
  return controls;
}

/** Jump to a named view ('reset' | 'front' | 'right' | 'top'). */
export function setView(camera, controls, name) {
  camera.position.set(...VIEWS[name]);
  controls.target.set(0, 0, 0);
  controls.update();
}
