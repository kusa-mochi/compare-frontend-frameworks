import { app, BrowserWindow, ipcMain } from 'electron';
import path from "path";

require('electron-reload')(__dirname);

let mainWindow: BrowserWindow | null = null;

const createWindow  = () => { 
    mainWindow = new BrowserWindow({
        width: 600,
        height: 480,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            // enableRemoteModule: true
        }
    });
    mainWindow.loadURL(path.join(__dirname, 'www', 'index.html'));
}

app.on('ready', () => {
    app.name = 'Svelte Template';
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});

ipcMain.on('requestSystemInfo', async (event, message) => {
    const versionChrome = process.versions.chrome;
    const versionNode = process.versions.node;
    const versionElectron = process.versions.electron;
    const result = {
        chrome: versionChrome,
        node: versionNode,
        electron: versionElectron
    }
    if(mainWindow != null) {
        mainWindow.webContents.send("getSystemInfo", result);
    }
});