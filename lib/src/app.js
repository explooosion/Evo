import R from 'ramda';
import Process from './models/Process';
import Beanfun from './models/Beanfun';

const beanfun = new Beanfun();

class Evo extends Process {

    Work() {

        console.log('Start Listening...');
        this.StartProcess(beanfun.exe_core);
        // this.StartProcess('chrome');

        while (R.isNil(this.isFinish)) {
            console.log('Step : ', this.step);
        }

        console.log('Copy : file');
    }

}

const evo = new Evo();

evo.Work();
