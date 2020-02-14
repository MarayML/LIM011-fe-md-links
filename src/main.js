/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

// eslint-disable-next-line max-len
const changePathAbsolute = (pathFile) => ((path.isAbsolute(pathFile)) ? pathFile : path.resolve(pathFile));

const pathExits = (pathFile) => (!!(fs.existsSync(pathFile)));

const isDirectories = (pathFile) => fs.statSync(pathFile).isDirectory();

const isFileMD = (pathFile) => path.extname(pathFile) === '.md';

const readFileMD = (pathFile) => fs.readFileSync(pathFile, 'utf-8');

const findLinks = (string) => (string.match(/\[([^\[]+)\](\(http.*\))/gi));

const foundFilesMarckdown = (pathFile) => {
  const filesMD = [];
  const promesa = new Promise((resolve, reject) => {
    if (isDirectories(pathFile)) readRecursive(pathFile, filesMD);
    else if (isFileMD(pathFile)) filesMD.push(pathFile);
    else reject(new Error('Error: No es un fichero .md, rectifique la ruta'));
    resolve(filesMD);
  });
  return promesa;
};

const readRecursive = (pathFile, filesMD) => {
  fs.readdirSync(pathFile).forEach((element) => {
    const newPath = pathFile.concat(path.sep, element);
    if (isDirectories(newPath)) readRecursive(newPath, filesMD);
    else if (isFileMD(newPath)) filesMD.push(newPath);
  });
};

const countLinks = (arrayPaths) => {
  const result = [];
  arrayPaths.forEach((elPath) => {
    const md = readFileMD(elPath);
    if (md.length !== 0) {
      const arrayLinks = findLinks(md);
      if (arrayLinks !== null) {
        arrayLinks.forEach((elLink) => {
          result.push({
            href: elLink.match(/\((http.*?)\)/)[1],
            text: elLink.match(/([\w\s]+)/)[0],
            file: elPath,
          });
        });
      }
    }
  });
  return result;
};

const init = (pathFile) => new Promise((resolve, reject) => {
  const route = changePathAbsolute(pathFile);
  foundFilesMarckdown(route).then((filesMD) => {
    resolve(countLinks(filesMD));
  }).catch((error) => reject(error));
});

const validateLinks = (arraylinks) => {
  const arrayCopy = [];
  arraylinks.forEach((ellink) => {
    const newobj = {
      ...ellink,
    };
    arrayCopy.push(fetch(newobj.href)
      .then((res) => {
        newobj.status = res.status;
        newobj.statusText = ((res.status >= 200) && (res.status <= 399)) ? 'OK' : 'FAIL';
        return newobj;
      }).catch((error) => {
        newobj.status = 404;
        newobj.statusText = 'FAIL';
        return newobj;
      }));
  });
  return arrayCopy;
};

const findUnique = (arrayLinks) => {
  const array = [];
  arrayLinks.forEach((object) => {
    array.push(object.href);
  });
  mySet = new Set(array);
  return `Total: ${arrayLinks.length} \nUnique: ${mySet.size}`;
};

const findBroken = (arrayLinks) => {
  const array = [];
  let countBroken = 0;
  arrayLinks.forEach((object) => {
    array.push(object.href);
    if (object.statusText === 'FAIL') countBroken += 1;
  });
  mySet = new Set(array);
  return `Total: ${arrayLinks.length} \nUnique: ${mySet.size} \nBroken: ${countBroken}`;
};

module.exports = {
  init,
  validateLinks,
  findUnique,
  findBroken,
  changePathAbsolute,
  isDirectories,
  isFileMD,
  foundFilesMarckdown,
  countLinks,
  pathExits,
};
