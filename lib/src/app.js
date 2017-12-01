import Process from './models/Process';
import Controller from './models/Controller';

class Evo extends Process {

    constructor() {
        super();
        this.ctr = new Controller();
    }

    work() {
        this.process();
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
        return this.getStatus();
    }

}

module.exports = Evo;