import fs from 'fs';
import path from 'path';
import R from 'ramda';
import copy from 'copy';

class Controller {

    constructor() {
        this.gamePath = path.resolve(path.resolve(__dirname, '../../../'), 'elsword/');
        this.evoPath = path.resolve(path.resolve(__dirname, '../../../'), 'elsword/Evo/custom/');
        this.extnameKom = '.kom';
        this.extnameEvo = '.evo';
        this.customList = [];
    }

    /**
     * Rename the files to temp files
     * @param {string} files Korean files
     */
    renameToTemp() {

        this.getCustomList();

        fs.readdirSync(this.gamePath)
            .filter(value => {
                return path.extname(value) === this.extnameKom
            })
            .filter(value => {
                return R.indexOf(R.replace(path.extname(value), '', value), this.customList) > -1
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

        this.copyCustomToGame();
    }

    /**
     * Rename temp files to kom files
     * @param {string} files Korean fiels
     */
    renameToKom() {

        this.getCustomList();

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
     * Copy files from custom to Game Path
     * @param {string} files Custom Files
     */
    copyCustomToGame() {
        copy(`${this.evoPath}/*${this.extnameKom}`, this.gamePath, function (err, files) {
            if (err) throw err;

            console.log(files);
            // `files` is an array of the files that were copied
        });
    }

    deleteGameFile() {

    }

    /**
     * Get files from custom folder
     */
    getCustomList() {
        this.customList = fs.readdirSync(this.evoPath)
            .filter(value => {
                return path.extname(value) === this.extnameKom
            })
            .map(value => {
                return R.replace(this.extnameKom, '', value)
            });
    }
}

export default Controller;