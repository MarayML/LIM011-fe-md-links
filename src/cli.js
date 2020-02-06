/* eslint-disable max-len */
/* eslint-disable no-console */
const {
  changePathAbsolute, isDirectories, isFileMD, foundFilesMarckdown, countLinks, validateLinks,
} = require('./index');

console.log(changePathAbsolute('../'));
console.log(isDirectories('/home/maray/Desktop/Marckdown/package.json'));
console.log(isFileMD('/home/maray/Desktop/Marckdown/LIM011-fe-md-links/readme.md'));
console.log(foundFilesMarckdown('/home/maray/Desktop/Marckdown/LIM011-fe-md-links/src'));
const arraylinks = countLinks(foundFilesMarckdown('/home/maray/Desktop/Marckdown/LIM011-fe-md-links/src/prueba'));
// console.log(validateLinks(countLinks(foundFilesMarckdown('/home/maray/Desktop/Marckdown/LIM011-fe-md-links/src/prueba'))));
Promise.all(validateLinks(arraylinks)).then((values) => {
  console.log(values); // [3, 1337, "foo"]
});
