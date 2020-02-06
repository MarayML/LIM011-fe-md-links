/* eslint-disable max-len */
/* eslint-disable no-undef */

const { changePathAbsolute, isDirectories, isFileMD } = require('../src/index.js');

describe('changePathAbsolute', () => {
  it('Debería ser una función', () => { expect(typeof changePathAbsolute).toBe('function'); });

  it('Para la entrada Ruta Relativa:../ deberia retornar Ruta Absoluta:/home/maray/Desktop/Marckdown', () => {
    expect(changePathAbsolute('../')).toBe('/home/maray/Desktop/Marckdown');
  });
  it('Para la entrada Ruta Absoluta:/home/maray/Desktop/Marckdown deberia retornar Ruta Absoluta:/home/maray/Desktop/Marckdown/Desktop', () => {
    expect(changePathAbsolute('/home/maray/Desktop/Marckdown')).toBe('/home/maray/Desktop/Marckdown');
  });
});

describe('isDirectories', () => {
  it('Debería ser una función', () => { expect(typeof isDirectories).toBe('function'); });

  it('Deberia retornar True para /home/maray/Desktop/Marckdown', () => {
    expect(isDirectories('/home/maray/Desktop/Marckdown')).toBe(true);
  });

  it('Deberia retornar False para /home/maray/Desktop/Marckdown/LIM011-fe-md-links/readme.md', () => {
    expect(isDirectories('/home/maray/Desktop/Marckdown/LIM011-fe-md-links/readme.md')).toBe(false);
  });
});

describe('isFileMD', () => {
  it('Debería ser una función', () => { expect(typeof isFileMD).toBe('function'); });

  it('Deberia retornar False para /home/maray/Desktop/Marckdown/LIM011-fe-md-links/packge.json', () => {
    expect(isFileMD('/home/maray/Desktop/Marckdown/LIM011-fe-md-links/package.json')).toBe(false);
  });

  it('Deberia retornar True para /home/maray/Desktop/Marckdown/LIM011-fe-md-links/readme.md', () => {
    expect(isFileMD('/home/maray/Desktop/Marckdown/LIM011-fe-md-links/src/readme-2.md')).toBe(true);
  });
});
