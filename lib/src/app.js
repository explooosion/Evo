'use strict'

import R from 'ramda';

import Beanfun from './models/Beanfun';
import Process from './models/Process';

const beanfun = new Beanfun();
const process = new Process();

class Evo extends process {

    constructor() {
        super();
    }

    Work() {
        this.StartProcess(beanfun.exe_web);
        while (this.stap < 4) {
        }
        console.log('Copy : file');
    }

}

const evo = new Evo();

evo.Work();



