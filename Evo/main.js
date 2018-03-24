const electron = require('electron')

const {
  app, Tray, Menu, BrowserWindow, dialog
} = require('electron')

// Module to control application life.

// Module to create native browser window.

const path = require('path')
const url = require('url')

const ChildProcess = require('child_process')

// Utils
const Envi = require('./util/envi')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {

  // Create the browser window.

  const displays = electron.screen.getAllDisplays();
  const externalDisplay = displays.find((display) => {
    return display.size.width !== 0 || display.size.height !== 0
  });

  const windowW = 120;
  const windowH = 170;

  let mx;
  let my;

  if (externalDisplay) {
    mx = externalDisplay.size.width - windowW;
    my = externalDisplay.size.height - (windowH * 1.8);
  } else {
    mx = windowW;
    my = windowH;
  }

  mainWindow = new BrowserWindow({
    x: mx,
    y: my,
    width: windowW,
    height: windowH,
    resizable: false,
    frame: false,
    transparent: true
  })

  mainWindow.on('minimize', function (event) {
    event.preventDefault();
    mainWindow.hide();
  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // mainWindow.setIgnoreMouseEvents(true)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('close', function (event) {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });

  // Create Tray
  let appIcon = null;
  const iconPath = path.join(__dirname, 'app.ico');

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Evo',
      icon: path.join(__dirname, 'icon.png'),
      click() {
        mainWindow.show();
      }
    },
    // {
    //   label: 'Item2',
    //   submenu: [
    //     { label: 'submenu1' },
    //     { label: 'submenu2' }
    //   ]
    // },
    {
      label: '環境設定',
      click() {
        Envi.setPath();
      }
    },
    {
      label: 'Debug',
      click() {
        mainWindow.show();
        mainWindow.toggleDevTools();
      }
    },
    {
      label: '關閉',
      click() {
        mainWindow.removeAllListeners('close');
        mainWindow.close();
      }
    }
  ]);

  appIcon = new Tray(iconPath);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


if (handleSquirrelEvent()) {
  return;
}

function handleSquirrelEvent() {

  if (process.argv.length === 1) {
    return false;
  }

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function (command, args) {
    let spawnedProcess;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
    } catch (error) { }

    return spawnedProcess;
  };

  const spawnUpdate = function (args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      spawnUpdate(['--createShortcut', exeName]);
      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':

      spawnUpdate(['--removeShortcut', exeName]);
      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      app.quit();
      return true;
  }
}
