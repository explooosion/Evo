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
     * ProcessStop
     */
    stopProcess() {
        this.isWork = false;
    }

    /**
     * ProcessStart
     */
    startProcess() {
        this.resetProcess();
    }

    /**
     * ProcessRun
     */
    process() {

        if (this.isWork == true) {

            this.getProcess().then((p) => {

                const resWeb = R.filter(R.propEq('processName', beanfun.exe_web), p);
                const resCore = R.filter(R.propEq('processName', beanfun.exe_core), p);
                const resElsword = R.filter(R.propEq('processName', beanfun.exe_elsword), p);
                const resX2 = R.filter(R.propEq('processName', beanfun.exe_x2), p);

                this.arg = [resWeb, resCore, resElsword, resX2];

                // check has process
                if (R.not(this.isRecover) && R.not(this.recovering)) {

                    this.recovering = true;
                    // console.log(`recovering = true`);
                    this.startRecovery();

                } else if (resElsword.length > 0 && R.not(this.updating)) {

                    this.updating = true;
                    // console.log(`updating = true`);

                } else if (R.not(resElsword.length) && R.not(this.isUpdate) && this.updating) {

                    this.isUpdate = true;
                    // console.log(`isUpdate = true`);

                } else if (R.not(resElsword.length) && this.isUpdate && R.not(this.isReplace) && R.not(this.replacing)) {

                    this.replacing = true;
                    // console.log(`replacing = true`);
                    this.startReplce();

                }

                // check has replace
                if (R.not(this.isFinish)) {
                    // recursion funx
                    this.process();

                } else {

                    // game exit
                    if (R.and(R.not(resElsword.length), R.not(resX2.length))) {

                        // reset 
                        this.resetProcess();
                        this.status = 'reset all';
                        this.process();

                    } else {
                        // recursion funx
                        // this.status = 'wating game exit';
                        this.process();
                    }

                }

            });

        }
    }

    /**
     * FileRecovery
     */
    startRecovery() {
        controller.deleteGameFile();
        controller.renameToKom();
        this.isRecover = true;
        // console.log(`isRecover = true`);
        this.status = '已復原';
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
        // console.log(`isFinish = true`);
        this.status = '已替換';
    }

    /**
     * Initialize Process
     */
    resetProcess() {
        // reset 
        this.isWork = true;

        this.isRecover = false;
        this.recovering = false;

        this.isUpdate = false;
        this.updating = false;

        this.isReplace = false;
        this.replacing = false;

        this.isFinish = false;

        this.arg = [null, null, null];
    }

}

export default Process;