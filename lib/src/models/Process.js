import processWindows from 'node-process-windows';
import R from 'ramda';

import Beanfun from './Beanfun';

const beanfun = new Beanfun();

class Process {

    constructor() {
        this.isRecover = false;
        this.isUpdate = false;
        this.isReplace = false;
        this.isFinish = false;
        this.status = 0;
        this.arg = [null, null, null];
    }

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
        console.log('Start Recovery');
        setTimeout(() => {
            // just make a fake work
            console.log('Finish Recovery');
            this.isRecover = true;
        }, 2000);
    }

    /**
     * FileReplace
     */
    static startReplce() {
        console.log('Start Replace');
        setTimeout(() => {
            // just make a fake work
            console.log('Finish Replace');
            this.isFinish = true;
        }, 2000);
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
            if (
                R.or(
                    R.and(resWeb, R.not(this.isRecover)),
                    R.and(resCore, R.not(this.isRecover))
                )
            ) {
                // run recover work
                this.startRecovery();
            } else if (resElsword) {
                // run official update
                this.isUpdate = true;
            } else if (R.and(R.isNil(resElsword), this.isUpdate, R.not(this.isReplace))) {
                // run replace work
                this.isReplace = true;
                this.constructor.startReplce();
            }

            // check has replace
            if (R.not(this.isReplace)) {
                // recursion funx
                this.startProcess();
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