const {
    setTimeout
} = require('timers');

require('babel-core/register');
require('babel-polyfill');

const Evo = require('./src/app.js');

const evo = new Evo();

// evo.setCustomPath('D:\\Project\\Game\\Evo\\');
evo.work();
handle();
// evo.replace();
// evo.recovery();

function handle() {
    setTimeout(() => {
        console.log(evo.getStatus());
        handle();
    }, 800);
}