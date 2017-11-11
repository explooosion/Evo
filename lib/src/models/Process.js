import processWindows from 'node-process-windows';
import R from 'ramda';

import Beanfun from './Beanfun';

const beanfun = new Beanfun();

class Process {

    isRecover = false;
    isUpdate = false;
    isReplace = false;
    status = 0;
    arg = [null, null, null];

    /**
     * ProcessGet
     */
    static getProcess() {
        return new Promise((resolve) => {
            processWindows.getProcesses((err, processes) => {
                const res = processes;
                resolve(res);
            });
        });
    }

    /**
     * FileRecovery
     */
    static startRecovery() {
        this.isRecover = true;
    }

    /**
     * FileReplace
     */
    static startReplce() {
        console.log('Finish Work.');
    }

    /**
     * ProcessStart
     */
    startProcess() {

        this.constructor.getProcess().then((p) => {

            const resWeb = R.find(R.propEq('processName', beanfun.exe_web), p) || null;
            const resCore = R.find(R.propEq('processName', beanfun.exe_core), p) || null;
            const resElsword = R.find(R.propEq('processName', beanfun.exe_elsword), p) || null;

            this.arg = [resWeb, resCore, resElsword];

            // check has process
            if (R.and(resWeb, R.not(this.isRecover))) {

                // run recover work
                console.log('Start Recovery');
                this.startRecovery();

            } else if (R.and(resCore, R.not(this.isRecover))) {

                // run recover work
                console.log('Start Recovery');
                this.startRecovery();

            } else if (resElsword) {

                // run official update
                this.isUpdate = true;

            } else if (R.and(R.isNil(resElsword), this.isUpdate, R.not(this.isReplace))) {

                // run replace work
                this.isReplace = true;
                console.log('File Copy');
                setTimeout(() => {
                    // just make a fake work
                    this.constructor.startReplce();
                }, 2000);
            }

            // check has replace
            if (R.not(this.isReplace)) {
                // recursion funx
                this.startProcess();
            } else {
                console.log('Finish Work.');
            }
        });
    }

    /**
     * ProcessStart handler
     * @param {number} ms speed
     */
    processHandler(ms) {
        setTimeout(() => {
            console.log(this.arg);
            if (R.not(this.isReplace)) this.processHandler(ms);
        }, ms);
    }

}

export default Process;