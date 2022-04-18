const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow = {};

function createWindow () {
    mainWindow = new BrowserWindow({
        width: isDev ? 2100 : 1280,
        height: 1024,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    });

    if (isDev) {
        mainWindow.loadURL("http://localhost:3000");
    } else {
        mainWindow.loadFile(`${path.join(__dirname, '../build/index.html')}`)
    }
    
    if (isDev) mainWindow.webContents.openDevTools({ node: 'detach' });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('greetings:sayHello', () => {
    console.log('Hello renderer! This is main process!');
    mainWindow.webContents.send('greetings: message', 'Hello renderer');
});