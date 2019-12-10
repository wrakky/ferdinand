module.exports = ({ loop, setCount }) => {
  loop(() => {
    const count = document.querySelector('#hangout-landing-chat iframe').contentWindow.document.querySelectorAll('.ee').length;
    setCount(count);
  });
};
