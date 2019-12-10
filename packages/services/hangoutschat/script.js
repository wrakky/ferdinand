module.exports = ({ loop, setCount }) => {
  const muteSelector = '.DQy0Rb';
  const directMessageSelector = '.eM5l9e.FVKzAb';
  const indirectMessageSelector = '.PL5Wwe.H7du2 .t5F5nf';

  const isMuted = node => !!node.closest('[role="listitem"]').querySelector(muteSelector);

  loop(() => {
    let count = 0;
    document.querySelectorAll(`${directMessageSelector},${indirectMessageSelector}`).forEach((node) => {
      if (!isMuted(node)) {
        count += 1;
      }
    });
    setCount(count);
  });
};
