import { app, BrowserWindow, ipcMain } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
import path from 'path';

import { IPC_Channel } from './ipc';
import weaponFile from './db/weapons.csv';
import { db_init } from './db/db';

const devTools = process.env.NODE_ENV === 'development';

const weaponsDBPath = path.join(__dirname, weaponFile);
const weaponsDBData: [string, string, string][] = [];

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const aspectRation = 16 / 9;
const width = 1024;
const height = width / aspectRation;

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width,
    height,
    minWidth: width,
    minHeight: height,
    show: false,
    backgroundColor: '#000',
    center: true,
    webPreferences: {
      devTools,
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      enableRemoteModule: true,
      textAreasAreResizable: false,
    },
  });

  mainWindow.menuBarVisible = false;

  const db = db_init();

  ipcMain.on(IPC_Channel.initDB.toString(), () => {
    mainWindow.webContents.send(IPC_Channel.initDB.toString(), db);
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (devTools) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
