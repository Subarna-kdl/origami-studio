/**
 * Top menu bar behaviour: click to open, click outside / Esc to close.
 * `actions` maps a menu item's data-action name to a function.
 */
export function initMenubar(actions) {
  const menus = [...document.querySelectorAll('.menu')];
  const closeAll = () => menus.forEach((m) => m.classList.remove('open'));

  menus.forEach((menu) => {
    menu.querySelector('.menu-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = menu.classList.contains('open');
      closeAll();
      if (!wasOpen) menu.classList.add('open');
    });
  });

  document.querySelectorAll('.menu-item[data-action]').forEach((item) => {
    item.addEventListener('click', () => actions[item.dataset.action]?.());
  });

  document.addEventListener('click', closeAll);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
}
