const Evo = require('./dist/app.js');

const evo = new Evo();

let status;
const chooser = document.querySelector('#path');

work();

// addEventListener
chooser.addEventListener('change', function (event) {
    alert(event.target.files[0].path);
});


function work() {

    const src = evo.getGamePath();

    // Work Start
    if (src !== '') {
        const i = Math.floor(Math.random() * 6) + 1;
        const not = new Notification('初始化設定', {
            icon: `https://unsplash.it/100/?random&i=${i}`,
            body: '請選擇遊戲路徑',
        });
        not.onclick = () => {
            chooser.click()
        }

    } else {
        evo.work();
        handle();
    }
}


function handle() {
    setTimeout(() => {
        const gt = evo.getStatus();
        if (status !== gt) {
            notification(gt);
            chooser.click();
        }
        status = gt;
        handle();
    }, 800);
}


function notification(msg) {
    const i = Math.floor(Math.random() * 6) + 1;
    const not = new Notification('工作通知', {
        icon: `https://unsplash.it/100/?random&i=${i}`,
        body: msg,
    });
}
