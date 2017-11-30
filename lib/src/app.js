import Process from './models/Process';
import Controller from './models/Controller';

class Evo extends Process {

    constructor() {
        super();
        this.ctr = new Controller();
    }

    Work() {
        // this.startProcess();
        // this.processHandler(800);
        // this.ctr.renameToTemp();
        this.ctr.renameToKom();
    }

    getTest() {
        return 'test';
    }

    getGamePath() {
        return this.ctr.gamePath;
    }

    getEvoPath() {
        return this.ctr.getEvoPath;
    }

}

module.exports = Evo;
