/* eslint-disable no-undef */
const {
  init, validateLinks, findUnique, findBroken,
} = require('../src/main');

const mdLinks = (route, options) => new Promise((resolve, reject) => {
  if (options.validate === false && options.stats === false) {
    init(route)
      .then((array) => {
        resolve(array);
      })
      .catch((error) => reject(error));
  } else if (options.validate === true && options.stats === false) {
    init(route)
      .then((array) => {
        Promise.all(validateLinks(array))
          .then((result) => resolve(result))
          .catch((error) => reject(error));
      });
  } else if (options.validate === false && options.stats === true) {
    init(route)
      .then((array) => {
        Promise.all(validateLinks(array))
          .then((result) => {
            resolve(findUnique(result));
          })
          .catch((error) => reject(error));
      });
  } else {
    init(route)
      .then((array) => {
        Promise.all(validateLinks(array))
          .then((result) => {
            resolve(findBroken(result));
          })
          .catch((error) => reject(error));
      });
  }
});

module.exports = mdLinks;
