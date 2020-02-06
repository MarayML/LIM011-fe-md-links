/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

// eslint-disable-next-line max-len
const changePathAbsolute = (pathFile) => ((path.isAbsolute(pathFile)) ? pathFile : path.resolve(pathFile));

const isDirectories = (pathFile) => (fs.existsSync(pathFile) && fs.statSync(pathFile).isDirectory());

const isFileMD = (pathFile) => (fs.existsSync(pathFile) && path.extname(pathFile) === '.md');

const foundFilesMarckdown = (pathFile) => {
  const filesMD = [];
  if (isDirectories(pathFile)) readRecursive(pathFile, filesMD);
  else if (isFileMD(pathFile)) filesMD.push(pathFile);
  return filesMD;
};

const readRecursive = (pathFile, filesMD) => {
  fs.readdirSync(pathFile).forEach((element) => {
    const newPath = pathFile.concat(path.sep, element);
    if (isDirectories(newPath)) readRecursive(newPath, filesMD);
    else if (isFileMD(newPath)) filesMD.push(newPath);
  });
};

const readFileMD = (pathFile) => fs.readFileSync(pathFile, 'utf-8');

const findLinks = (string) => (string.match(/\[(.+)\]\(([^ ]+?)( "(.+)")?\)/gi));

const countLinks = (arrayPaths) => {
  const result = [];
  arrayPaths.forEach((elPath) => {
    const md = readFileMD(elPath);
    if (md.length !== 0) {
      const arrayLinks = findLinks(md);
      arrayLinks.forEach((elLink) => {
        result.push({
          href: elLink.match(/\((.*?)\)/)[1],
          text: elLink.match(/([\w\s]+)/)[0],
          file: elPath,
        });
      });
    }
  });
  return result;
};

const validateLinks = (arraylinks) => {
  const arrayCopy = [];
  arraylinks.forEach((ellink) => {
    const newobj = {
      ...ellink,
    };
    arrayCopy.push(fetch(newobj.href)
      .then((res) => {
        newobj.status = res.status;
        newobj.statusText = ((newobj.status >= 200) && (newobj.status <= 309)) ? 'OK' : 'FAIL';
        return newobj;
      }));
  });
  return arrayCopy;
};

module.exports = {
  changePathAbsolute,
  isDirectories,
  isFileMD,
  foundFilesMarckdown,
  readFileMD,
  findLinks,
  countLinks,
  validateLinks,
};
