import fs from 'fs';
import path from 'path';
import R from 'ramda';

class Controller {

    constructor() {
        this.gamePath = path.resolve(path.resolve(__dirname, '../../../'), 'elsword/');
        this.evoPath = path.resolve(path.resolve(__dirname, '../../../'), 'elsword/Evo/custom/');
        this.extnameKom = '.kom';
        this.extnameEvo = '.evo';
    }

    /**
     * Rename the files to temp files
     * @param {string} files Korean files
     */
    renameToTemp() {
        fs.readdirSync(this.gamePath)
            .filter(value => {
                return path.extname(value) === this.extnameKom
            })
            .map(value => {
                return path.resolve(this.gamePath, value)
            })
            .forEach(value => {
                fs.rename(value, `${value}${this.extnameEvo}`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`${value} => ${value}${this.extnameEvo}`);
                });
            });
    }

    /**
     * Rename temp files to kom files
     * @param {string} files Korean fiels
     */
    renameToKom() {
        fs.readdirSync(this.gamePath)
            .filter(value => {
                return path.extname(value) === this.extnameEvo
            })
            .map(value => {
                return path.resolve(this.gamePath, value)
            })
            .forEach(value => {
                fs.rename(value, `${R.replace(this.extnameEvo, '', value)}`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`${value} => ${R.replace(this.extnameEvo, '', value)}`);
                });
            });
    }

    /**
     * Copy files to Game Path
     * @param {string} files Custom Files
     */
    copyCustomFiles(files) {

    }
}

export default Controller;