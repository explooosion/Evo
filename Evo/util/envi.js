
const { dialog } = require('electron')

const fs = require('fs');
const ini = require('ini');
const path = require('path');

const ConfigDir = path.resolve(__dirname, '../config.ini')
let GameDir = ''
let CustomDir = ''

module.exports = {


    /** 設定環境路徑 */
    setPath: () => {

        GameDir = ''
        CustomDir = ''

        /** 選擇遊戲安裝位置 */
        dialog.showOpenDialog({
            title: '選擇遊戲安裝位置',
            properties: ['openDirectory'],
        }, function (game) {
            GameDir = String(game)

            /** 選擇素材來源 */
            dialog.showOpenDialog({
                title: '選擇素材來源',
                properties: ['openDirectory'],
            }, function (custom) {
                CustomDir = String(custom)

                if (GameDir !== 'undefined' && CustomDir !== 'undefined') {
                    dialog.showMessageBox({
                        title: 'message',
                        message: `
                            遊戲安裝位置:\n
                            ${GameDir}\n
                            素材來源:\n
                            ${CustomDir}
                            `,
                    })

                    setGameDir(GameDir)
                    setCustomDir(CustomDir)
                }
            })
        })
    },

}

function setGameDir(dir) {
    try {
        const config = ini.parse(fs.readFileSync(ConfigDir, 'utf-8'));
        config.game.dir = dir;
        fs.writeFileSync(ConfigDir, ini.stringify(config));
    } catch (err) {
        console.log('err', err);
    }
}

function setCustomDir(dir) {
    try {
        const config = ini.parse(fs.readFileSync(ConfigDir, 'utf-8'));
        config.custom.dir = dir;
        fs.writeFileSync(ConfigDir, ini.stringify(config));
    } catch (err) {
        console.log('err', err);
    }
}