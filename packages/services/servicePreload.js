const { ipcRenderer } = require('electron');

const loadService = (type) => {
  console.log(__dirname);
  const path = `./${type}/script.js`;
  delete require.cache[require.resolve(path)];
  return require(path);
};

let lastCount = 0;
const setCount = (serviceId, count) => {
  console.log(serviceId, count);
  if (lastCount !== count) {
    ipcRenderer.send('SET_UNREAD_COUNT', {
      serviceId,
      count
    });
    lastCount = count;
  }
};

let loopId = null;
const loop = (fn) => {
  if (loopId) {
    clearInterval(loopId);
  }
  loopId = setInterval(fn, 1000);
};

console.log('service preload');

ipcRenderer.on('LOAD_SERVICE', (event, { id, type, muted }) => {
  console.log('LOAD_SERVICE', id, type, muted);
  const service = loadService(type);
  service({
    loop,
    setCount: (count) => {
      if (!muted) {
        setCount(id, count)
      }
    }
  });
});
