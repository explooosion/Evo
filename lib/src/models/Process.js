'use strict'

import processWindows from 'node-process-windows';
import R from 'ramda';

class Process {

    step = 0;

    constructor() { }

    async getProcess(_name) {
        return new Promise(async function (resolve, reject) {
            await processWindows.getProcesses((err, processes) => {
                const res = R.find(R.propEq('processName', _name), processes) || null;
                resolve(res);
            });
        });
    }


    StartProcess(name) {

        this.getProcess(name).then(p => {

            if (p) {
                // Recall
                console.log('Start : ' + name);
                this.StartProcess(name);

            } else {

                this.stap++;
                switch (this.stap) {
                    case 2: this.StartProcess(beanfun.exe_core); break;
                    case 3: this.StartProcess(beanfun.exe_elsword); break;
                    default: console.log(this.stap);
                }

            }
        });

    }
}

export default Process;