module.exports = ({ loop, setCount }) => {
  const selector = '.J-Ke.n0';
  loop(() => {
    const el = document.querySelector(selector);
    const ariaLabel = el.getAttribute('aria-label');
    if (ariaLabel) {
      const count = parseInt(ariaLabel.replace(/[^\d]/g, ''), 10);
      setCount(isNaN(count) ? 0 : count);
    }
  });
};
