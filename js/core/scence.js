import * as THREE from 'three';

/**
 * Builds the empty workspace: background, grid floor, axis lines and lights.
 * `floor` groups the grid and axes so the View menu can hide them together.
 */
export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2b2d31);

  const floor = new THREE.Group();

  // 20 x 20 units, one line per unit.
  floor.add(new THREE.GridHelper(20, 20, 0x4a4d55, 0x3a3d44));

  // Coloured axis lines (X red, Z blue), lifted slightly to avoid z-fighting with the grid.
  floor.add(axisLine(new THREE.Vector3(-10, 0.001, 0), new THREE.Vector3(10, 0.001, 0), 0xc0392b));
  floor.add(axisLine(new THREE.Vector3(0, 0.001, -10), new THREE.Vector3(0, 0.001, 10), 0x2e6fd1));
  scene.add(floor);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x444455, 0.9));
  const sun = new THREE.DirectionalLight(0xffffff, 1.2);
  sun.position.set(5, 10, 7);
  scene.add(sun);

  return { scene, floor };
}

function axisLine(from, to, color) {
  const geometry = new THREE.BufferGeometry().setFromPoints([from, to]);
  return new THREE.Line(geometry, new THREE.LineBasicMaterial({ color }));
}
