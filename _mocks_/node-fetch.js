/* eslint-disable no-undef */
const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('fetch-mock').sandbox();

Object.assign(fetchMock.config, {
  fetch: nodeFetch,
});

fetchMock.config.sendAsJson = false;

fetchMock
  .mock('https://es.wikipedia.org/Markdown', 404)
  .mock('https://nodejs.org/', 200);

// module.exports = fetchMock;
