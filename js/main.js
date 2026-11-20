// Entry point: creates the workspace and connects the UI. Features added in later

import { createRenderer, watchResize } from './core/renderer.js';
import { createScene } from './core/scene.js';
import { createCamera, createControls, setView } from './core/camera.js';
import { getState, setState, subscribe } from './core/state.js';
import { initToolbar } from './ui/toolbar.js';
import { initMenubar } from './ui/menubar.js';

const container = document.getElementById('viewport');
const canvas = document.getElementById('viewport-canvas');

let renderer;
try {
  renderer = createRenderer(canvas);
} catch (err) {
  document.getElementById('gl-error').hidden = false;
  throw err;
}

const { scene, floor } = createScene();
const camera = createCamera();
const controls = createControls(camera, canvas);
watchResize(container, renderer, camera);

// UI
initToolbar();
initMenubar({
  'view-reset': () => setView(camera, controls, 'reset'),
  'view-front': () => setView(camera, controls, 'front'),
  'view-right': () => setView(camera, controls, 'right'),
  'view-top': () => setView(camera, controls, 'top'),
  'toggle-grid': () => setState({ gridVisible: !getState().gridVisible }),
  'help-navigation': () => document.getElementById('help-dialog').showModal(),
});

subscribe('gridVisible', (visible) => { floor.visible = visible; });

// Render loop
renderer.setAnimationLoop(() => {
  controls.update(); // needed for damping
  renderer.render(scene, camera);
});
