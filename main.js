//refactoring by https://github.com/kevinsawicki/tray-example/blob/master/main.js

const { app, Tray, Menu, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

const iconPath = path.join(__dirname, 'resources/icon/icon.png');
let appIcon = null;
let win = null;

app.on('ready', function () {
    win = new BrowserWindow({ show: false });
    appIcon = new Tray(iconPath);

    //registry global shoutcast
    const ret = globalShortcut.register('CommandOrControl+X', () => {
        createWindow();
      })

    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Dictionary'
        },
        {
            label: 'Search history',
            click: function () {
                createWindow();
            }
        },
        {
            label: 'Settings'
        },
        {
            label: 'Toggle DevTools',
            click: function () {
                win.show();
                win.toggleDevTools();
            }
        },
        {
            label: 'Quit',
            accelerator: 'Alt+Q',
            selector: 'terminate:',
            click: function () {
                app.quit();
            }
        }
    ]);
    appIcon.setToolTip('Dictionary app');
    appIcon.setContextMenu(contextMenu);
})

app.on('will-quit', () => {
    // Unregister a shortcut.
    globalShortcut.unregister('CommandOrControl+X')
  
    // Unregister all shortcuts.
    globalShortcut.unregisterAll()
  })
;

function createWindow(){
    const modalPath = path.join('file://', __dirname, 'src/window.html')
    let win = new BrowserWindow({ frame: false, width: 400, height: 200 })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
}