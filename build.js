const electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './Evo/',
    outputDirectory: './Build/',
    authors: 'Robby',
    exe: 'Evo.exe'
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));