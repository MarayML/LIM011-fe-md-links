/* eslint-disable no-undef */
const path = require('path');
const fetchMock = require('../_mocks_/node-fetch');
const mdLinks = require('../src/index');
const {
  changePathAbsolute, isFileMD, countLinks, pathExits, foundFilesMarckdown, isDirectories,
} = require('../src/main');

const firtsRoute = path.join(process.cwd(), 'test', 'MDFile', 'README.md');
const secondRoute = path.join(process.cwd(), 'test');
const array = [firtsRoute];

const firtsData = [{
  href: 'https://es.wikipedia.org/Markdown',
  text: 'Markdown',
  file: firtsRoute,
},
{
  href: 'https://nodejs.org/',
  text: 'Node',
  file: firtsRoute,
}];

const secondData = [{
  href: 'https://es.wikipedia.org/Markdown',
  text: 'Markdown',
  file: firtsRoute,
  status: 404,
  statusText: 'FAIL',
},
{
  href: 'https://nodejs.org/',
  text: 'Node',
  file: firtsRoute,
  status: 200,
  statusText: 'OK',
}];

describe('test for functions with path library', () => {
  it('should return absolute path', () => expect(changePathAbsolute('.'))
    .toBe(process.cwd()));
  it('should return true for Marckdown file', () => expect(isFileMD(firtsRoute))
    .toBe(true));
  it('should return true is path exist', () => expect(pathExits(firtsRoute))
    .toBe(true));
});

describe('test for functions with fs library', () => {
  it('should return true is route es directorie', () => expect(isDirectories(secondRoute)).toBe(true));
  it('should return a array with links', () => expect(countLinks(array)).toEqual(firtsData));
  it('should return a array with paths of file MD', () => foundFilesMarckdown(secondRoute)
    .then((result) => expect(result).toEqual(array)));
});

describe('mdLinks', () => {
  it('should return a array of object whit 5 propertys', () => mdLinks(secondRoute, { validate: true, stats: false })
    .then((result) => {
      expect(result).toEqual(secondData);
    }));

  it('deberia brindar array de objetos con 3 propiedades', () => mdLinks(secondRoute, { validate: true, stats: true })
    .then((result) => {
      expect(result).toEqual('Total: 2 \nUnique: 2 \nBroken: 1');
    }));
});
