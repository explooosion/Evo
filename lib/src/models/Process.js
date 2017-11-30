import processWindows from 'node-process-windows';
import R from 'ramda';

import Controller from './Controller';
import Beanfun from './Beanfun';

const beanfun = new Beanfun();
const controller = new Controller();

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
    getProcess() {
        return new Promise((resolve) => {
            new processWindows.getProcesses((err, processes) => {
                resolve(processes);
            });
        });
    }

    /**
     * FileRecovery
     */
    startRecovery() {
        console.log('Start Recovery');
        this.isRecover = true;
        controller.renameToKom();
        console.log('Finish Recovery');
    }

    /**
     * FileReplace
     */
    startReplce() {
        console.log('Start Replace');
        this.isFinish = true;
        controller.renameToTemp();
        console.log('Finish Replace');
    }

    /**
     * ProcessStart
     */
    startProcess() {

        this.getProcess().then((p) => {

            const resWeb = R.filter(R.propEq('processName', beanfun.exe_web), p);
            const resCore = R.filter(R.propEq('processName', beanfun.exe_core), p);
            const resElsword = R.filter(R.propEq('processName', beanfun.exe_elsword), p);
            const resX2 = R.filter(R.propEq('processName', beanfun.exe_x2), p);

            this.arg = [resWeb, resCore, resElsword, resX2];

            // console.log(resWeb, resWeb.length);
            // console.log(resCore, resCore.length);
            // console.log(resElsword, resElsword.length);
            // console.log(resX2, resX2.length);

            // check has process
            // if (R.or(
            //         R.and(R.not(resWeb.length), R.not(this.isRecover)),
            //         R.and(R.not(resCore.length), R.not(this.isRecover))
            //     )) {

            if (R.and(R.not(resWeb.length), R.not(this.isRecover))) {

                // console.log(`isRecover = true`);
                this.startRecovery();

            } else if (R.not(resElsword.length) && this.isUpdate && R.not(this.isReplace)) {

                console.log(`isReplace = true`);
                this.isReplace = true;
                this.startReplce();


            } else if (R.not(resElsword.length) && R.not(this.isUpdate)) {

                // console.log(`isUpdate = true`);
                this.isUpdate = true;
                // console.log(`waiting for elsword update finish`);
            }


            console.log(R.not(resElsword.length) && this.isUpdate && R.not(this.isReplace));
            // check has replace
            if (R.not(this.isFinish)) {

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
            // console.log(`arg`, this.arg);
            if (R.not(this.isFinish)) {
                this.processHandler(ms);
            }
        }, ms);
    }

}

export default Process;