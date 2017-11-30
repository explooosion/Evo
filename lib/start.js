require('babel-core/register');
require('babel-polyfill');

const Evo = require('./src/app.js');

const evo = new Evo();
console.log(`getGamePath = ${evo.getGamePath()}`);