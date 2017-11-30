import Process from './models/Process';
import Controller from './models/Controller';

class Evo extends Process {

    constructor() {
        super();
        this.ctr = new Controller();
    }

    work() {
        this.recovery();
        this.startProcess();
    }

    recovery() {
        this.ctr.renameToKom();
    }

    replace() {
        this.ctr.renameToTemp();
    }
    
    getGamePath() {
        return this.ctr.gamePath;
    }

    getEvoPath() {
        return this.ctr.evoPath;
    }

    getStatus() {
        return this.arg;
    }

}

module.exports = Evo;