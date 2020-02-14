#!/usr/bin/env node
const chalk = require('chalk');
const fs = require('fs');
// const pathExits = require('../src/main');
const mdLinks = require('./index');


const path = process.argv[2];
const [,,, argvs] = process.argv;
const options = {
  validate: false,
  stats: false,
};

const pathExits = (pathFile) => (!!(fs.existsSync(pathFile)));

if (path) {
  if (pathExits(path)) {
    if (argvs) {
      if ((argvs).indexOf('--validate') !== -1 || (argvs).indexOf('--stats') !== -1) {
        process.argv.forEach((option) => {
          if (option === '--validate') {
            options.validate = true;
          } else if (option === '--stats') {
            options.stats = true;
          }
        });
        mdLinks(path, options)
          .then((resolve) => console.log(resolve))
          .catch((error) => console.log(error));
      } else {
        console.log(chalk.bold.red('✖ Error: Opcion ingresada no es correcta.\nIngrese: "--validate" y/ó "--stats"'));
      }
    } else {
      mdLinks(path, options)
        .then((resolve) => console.log(resolve))
        .catch((error) => console.log(chalk.bold.red(error)));
    }
  } else {
    console.log(chalk.bold.red('✖ Error: La ruta ingresada no existe'));
  }
} else {
  console.log(chalk.bold.red('✖ Error: Por favor ingrese una ruta'));
}
