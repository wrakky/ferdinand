
setTimeout(() => {
  const elem = document.querySelector('.landing-title.version-title');
  if (elem && elem.innerText.toLowerCase().includes('google chrome')) {
    window.location.reload();
  }
}, 1000);

window.addEventListener('beforeunload', async () => {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
});

module.exports = ({ loop, setCount }) => {
  loop(() => {
    const elements = document.querySelectorAll('.CxUIE, .unread, ._0LqQ');
    let count = 0;

    for (let i = 0; i < elements.length; i += 1) {
      if (elements[i].querySelectorAll('.P6z4j').length === 1 && elements[i].querySelectorAll('*[data-icon="muted"]').length === 0) {
        count += 1;
      }
    }
    setCount(count);
  });
};
