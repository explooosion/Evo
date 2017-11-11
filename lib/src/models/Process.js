'use strict'

import processWindows from 'node-process-windows';
import R from 'ramda';

class Process {

    isFinish = false;

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

        console.log('Listening on : ' + name);
        this.getProcess(name).then(p => {

            console.log('Result :', p);
            if (R.isNil(p)) {
                // Recall
                this.StartProcess(name);
            }
        });

    }
}

export default Process;