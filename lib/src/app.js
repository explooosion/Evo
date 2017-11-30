import Process from './models/Process';
import Controller from './models/Controller';

class Evo extends Process {

    constructor() {
        super();
        this.ctr = new Controller();
    }

    work() {
        this.startProcess();
        this.processHandler(800);
        // this.ctr.renameToTemp();
    }

    recovery() {
        this.ctr.renameToKom();
    }

    getGamePath() {
        return this.ctr.gamePath;
    }

    getEvoPath() {
        return this.ctr.evoPath;
    }

}

module.exports = Evo;