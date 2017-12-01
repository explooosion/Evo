import processWindows from 'node-process-windows';
import R from 'ramda';

import Controller from './Controller';
import Beanfun from './Beanfun';

const beanfun = new Beanfun();
const controller = new Controller();

class Process {

    constructor() {

        this.isWork = true;

        this.isRecover = false; // todo
        this.recovering = false; // doing

        this.isUpdate = false; // todo
        this.updating = false; // doing

        this.isReplace = false; // todo
        this.replacing = false; // doing

        this.isFinish = false;

        this.arg = [null, null, null];

        this.status = 'status';
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
        controller.deleteGameFile();
        controller.renameToKom();
        this.isRecover = true;
        this.status = 'Finish Recovery';
    }

    /**
     * FileReplace
     */
    startReplce() {
        this.isReplace = true;
        controller.getCustomList();
        controller.renameToTemp();
        controller.copyCustomToGame();
        this.isFinish = true;
        this.status = 'Finish Replace';
    }

    /**
     * ProcessStop
     */
    stopProcess() {
        this.isWork = false;
    }

    /**
     * ProcessStart
     */
    startProcess() {
        this.isWork = true;
    }

    /**
     * ProcessRun
     */
    process() {

        if (this.isWork) {

            this.getProcess().then((p) => {

                const resWeb = R.filter(R.propEq('processName', beanfun.exe_web), p);
                const resCore = R.filter(R.propEq('processName', beanfun.exe_core), p);
                const resElsword = R.filter(R.propEq('processName', beanfun.exe_elsword), p);
                const resX2 = R.filter(R.propEq('processName', beanfun.exe_x2), p);

                this.arg = [resWeb, resCore, resElsword, resX2];

                // check has process
                if (R.not(this.isRecover) && R.not(this.recovering)) {

                    // console.log(`isRecover = true`);
                    this.recovering = true;
                    this.startRecovery();

                } else if (resElsword.length > 0 && R.not(this.updating)) {

                    this.updating = true;

                } else if (R.not(resElsword.length) && R.not(this.isUpdate) && this.updating) {

                    // console.log(`isUpdate = true`);
                    this.isUpdate = true;

                } else if (R.not(resElsword.length) && this.isUpdate && R.not(this.isReplace) && R.not(this.replacing)) {

                    this.replacing = true;
                    this.startReplce();

                }

                // check has replace
                if (R.not(this.isFinish)) {

                    // recursion funx
                    this.startProcess();

                } else {

                    // game exit
                    if (R.and(R.not(resElsword.length), R.not(resX2.length))) {

                        // reset 
                        this.isRecover = false;
                        this.recovering = false;

                        this.isUpdate = false;
                        this.updating = false;

                        this.isReplace = false;
                        this.replacing = false;

                        this.isFinish = false;

                        this.arg = [null, null, null];

                        this.status = 'reset all';
                        this.startProcess();

                    } else {
                        // recursion funx
                        this.status = 'wating game exit';
                        this.startProcess();
                    }

                }

            });

        }
    }

    /**
     * ProcessStart handler 
     */
    getStatus() {
        return this.status;
    }

}

export default Process;