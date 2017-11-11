import Process from './models/Process';

class Evo extends Process {

    Work() {
        this.startProcess();
        this.processHandler(800);
    }

}

const evo = new Evo();

evo.Work();