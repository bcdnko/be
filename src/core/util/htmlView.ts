export function isOffscreen(el: HTMLElement) {
	const r = el.getBoundingClientRect();

  const above = r.top < 0;
  const left = r.left < 0;
  const right = r.right > (window.innerWidth || document.documentElement.clientWidth);
  const below = r.bottom > (window.innerHeight || document.documentElement.clientHeight);

  return {
    above,
    left,
    right,
    below,
    any: above || left || right || below,
    all: above && left && right && below,
  };
};
