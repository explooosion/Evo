const {
    setTimeout
} = require('timers');
require('babel-core/register');
require('babel-polyfill');

const Evo = require('./src/app.js');

const evo = new Evo();
evo.work();
handle();

function handle() {
    setTimeout(() => {
        let gt = evo.getStatus();
        // console.log(gt);
        handle();
    }, 800);
}