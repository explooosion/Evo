'use strict'

import R from 'ramda';

import Beanfun from './models/Beanfun';
import Process from './models/Process';

const beanfun = new Beanfun();
const process = new Process();

class Evo extends Process {

    constructor() {
        super();
    }

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



