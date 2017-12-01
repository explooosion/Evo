const {
    setTimeout
} = require('timers');

require('babel-core/register');
require('babel-polyfill');

const Evo = require('./src/app.js');

const evo = new Evo();
// evo.work();
// handle();
console.log(evo.getEvoPath());

function handle() {
    setTimeout(() => {
        console.log(evo.getStatus());
        handle();
    }, 800);
}