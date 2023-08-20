const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        height: 525,
        width: 1000,
        minWidth: 675,
        minHeight: 420,
        transparent: false,
        autoHideMenuBar: true,
        titleBarStyle: 'hidden',
        fullscreenable: true,
        fullscreen: false,
        darkTheme: true,
        frame: false,
        titleBarOverlay: {
            height: 45,
            width: 45,
            color: '#00000000',
            symbolColor: '#fff'
            
        },
        backgroundColor: "#00000000",
        webPreferences: {
            experimentalFeatures: true,
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true
        },
       
    })
    win.loadURL('http://localhost:6970');
};
app.commandLine.appendSwitch('--enable-experimental-web-platform-features');
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});


