import Process from './models/Process';
import Controller from './models/Controller';

class Evo extends Process {

    constructor() {
        super();
        this.ctr = new Controller();
    }

    work() {
        this.startProcess();
    }

    recovery() {
        this.ctr.deleteGameFile();
        this.ctr.renameToKom();
    }

    replace() {
        this.ctr.getCustomList();
        this.ctr.renameToTemp();
        this.ctr.copyCustomToGame();
    }

    getStatus() {
        return this.processHandler(800);
    }

}

module.exports = Evo;