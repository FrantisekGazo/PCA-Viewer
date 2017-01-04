const {app, shell, Menu, BrowserWindow} = require('electron').remote;


const DEV_TOOLS = {
    label: 'Toggle Developer Tools',
    accelerator: (function () {
        if (process.platform === 'darwin') {
            return 'Alt+Command+I'
        } else {
            return 'Ctrl+Shift+I'
        }
    })(),
    click: function (item, focusedWindow) {
        if (focusedWindow) {
            focusedWindow.toggleDevTools()
        }
    }
};

const template = () => [
    {
        label: 'View',
        submenu: [
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: function (item, focusedWindow) {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Window',
        role: 'window',
        submenu: [
            {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            },
            {
                label: 'Toggle Full Screen',
                accelerator: (function () {
                    if (process.platform === 'darwin') {
                        return 'Ctrl+Command+F'
                    } else {
                        return 'F11'
                    }
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
                    }
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Reopen Window',
                accelerator: 'CmdOrCtrl+Shift+T',
                enabled: false,
                key: 'reopenMenuItem',
                click: function () {
                    app.emit('activate')
                }
            }
        ]
    },
    {
        label: 'Help',
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: function () {
                    shell.openExternal('http://electron.atom.io')
                }
            }
        ]
    }
];

function fileMenu(onSaveClick, onCloseClick) {
    return {
        label: 'File',
        role: 'file',
        submenu: [
            {
                label: 'Save',
                click: onSaveClick
            },
            {
                label: 'Close',
                click: onCloseClick
            }
        ]
    }
}

function showMenu(forProject = false, onSaveClick = null, onCloseClick = null) {
    const layout = template();

    // add 1st menu item
    if (process.env.NODE_ENV === 'development') {
        layout[0].submenu.push(DEV_TOOLS);
    }

    if (forProject) {
        // add 2st menu item
        const fm = fileMenu(onSaveClick, onCloseClick);
        layout.splice(1, 0, fm);
    }

    const menu = Menu.buildFromTemplate(layout);
    Menu.setApplicationMenu(menu);
}

module.exports = showMenu;
