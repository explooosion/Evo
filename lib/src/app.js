import Process from './models/Process';

import Controller from './models/Controller';

class Evo extends Process {

    Work() {
        this.startProcess();
        this.processHandler(800);
    }

}

const evo = new Evo();

// evo.Work();
const ctr = new Controller();
console.log('gamePath : ', ctr.gamePath);
console.log('evoPath : ', ctr.evoPath);
ctr.renameToTemp();
ctr.renameToKom();