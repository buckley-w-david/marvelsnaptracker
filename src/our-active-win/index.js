'use strict';

module.exports.sync = () => {
  if (process.platform === 'darwin') {
    return require('./lib/macos').sync();
  }

  if (process.platform === 'win32') {
    return require('./lib/windows').sync();
  }

  if (process.platform === "linux") {
    return require('./lib/linux').sync();
  }

  throw new Error(`${process.platform} is not supported`);
};

module.exports.launch = (JustDoInjection) => {
  if (process.platform === 'win32') {
    return require('./lib/windows-emit').launch(JustDoInjection);
  }

  if (process.platform === "linux") {
    return require('./lib/linux-emit').launch(JustDoInjection);
  }

  throw new Error(`${process.platform} is not supported`);
};
