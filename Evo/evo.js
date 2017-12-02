const Evo = require('./dist/app.js');

const evo = new Evo();

let status;
const gpath = document.querySelector('.gpath');
const cpath = document.querySelector('.cpath');

work();

// reset path
gpath.addEventListener('change', function (event) {
    evo.setGamePath(String(event.target.files[0].path).replace('/', '//') || '');
    work();
});

cpath.addEventListener('change', function (event) {
    evo.setCustomPath(String(event.target.files[0].path).replace('/', '//') || '');
    work();
});


function work() {

    const gp = evo.getGamePath();
    const cp = evo.getCustomPath();

    let p = true;

    // Work Start
    if (gp === '') {
        p = false;
        const i = Math.floor(Math.random() * 6) + 1;
        const not = new Notification('初始化設定', {
            icon: `https://unsplash.it/100/?random&i=${i}`,
            body: '請選擇遊戲路徑',
        });
        not.onclick = () => {
            gpath.click()
        }
    }

    if (cp === '') {
        p = false;
        const i = Math.floor(Math.random() * 6) + 1;
        const not = new Notification('初始化設定', {
            icon: `https://unsplash.it/100/?random&i=${i}`,
            body: '請選擇自訂檔案路徑',
        });
        not.onclick = () => {
            cpath.click()
        }
    }

    if (p) {
        evo.work();
        workHandler();
    }
}


function workHandler() {
    setTimeout(() => {
        const gt = evo.getStatus();
        if (status !== gt) {
            notification(gt);
        }
        status = gt;
        workHandler();
    }, 800);
}


function notification(msg) {
    const i = Math.floor(Math.random() * 6) + 1;
    const not = new Notification('工作通知', {
        icon: `https://unsplash.it/100/?random&i=${i}`,
        body: msg,
    });
}