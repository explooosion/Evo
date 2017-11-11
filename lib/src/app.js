import R from 'ramda';
import Process from './models/Process';

class Evo extends Process {

    Work() {
        console.log('Start Listening...');
        this.StartProcess('chrome');
        while (R.isNil(this.isFinish)) {
        }
        console.log('Copy : file');
    }

}

const evo = new Evo();

evo.Work();
