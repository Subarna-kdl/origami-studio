import { setState, subscribe } from '../core/state.js';

export function initToolbar() {
  const buttons = [...document.querySelectorAll('.tool-btn')];
  const statusLabel = document.getElementById('status-tool');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => setState({ activeTool: btn.dataset.tool }));
  });

  subscribe('activeTool', (tool) => {
    buttons.forEach((btn) => btn.classList.toggle('active', btn.dataset.tool === tool));
    statusLabel.textContent = buttons.find((b) => b.dataset.tool === tool)?.dataset.label ?? tool;
  });
}
