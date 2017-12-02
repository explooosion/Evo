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
        this.gameList = [];
    }

    /**
     * Rename the files to temp files  
     */
    renameToTemp() {
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
    }

    /**
     * Rename temp files to kom files 
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
     * Copy files from custom to game path 
     */
    copyCustomToGame() {
        copy(`${this.evoPath}/*${this.extnameKom}`, this.gamePath, (err, files) => {
            if (err) throw err;
        });
    }

    /**
     * Delete files from game path
     */
    deleteGameFile() {

        this.getGameList();

        this.gameList.forEach(value => {
            fs.unlink(`${this.gamePath}/${value}`, err => {
                if (err) throw err;
            })
        });
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
        console.log('customList', this.customList);
    }

    /**
     * Get files(evo) from game folder
     */
    getGameList() {
        this.gameList = fs.readdirSync(this.gamePath)
            .filter(value => {
                return path.extname(value) === this.extnameEvo
            })
            .map(value => {
                return R.replace(this.extnameEvo, '', value)
            });
        console.log('gameList', this.gameList);
    }
}

export default Controller;