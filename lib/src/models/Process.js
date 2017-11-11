import processWindows from 'node-process-windows';
import R from 'ramda';

class Process {

    isFinish = false;
    step = 0;

    static getProcess(_name) {
        return new Promise(async (resolve) => {
            await processWindows.getProcesses((err, processes) => {
                const res = R.find(R.propEq('processName', _name), processes) || null;
                resolve(res);
            });
        });
    }

    StartProcess(name) {

        console.log('Listening on : ', name);
        this.constructor.getProcess(name).then((p) => {

            console.log('Result :', p);
            if (R.isNil(p)) {
                this.StartProcess(name);
            }
        });
    }
}

export default Process;
