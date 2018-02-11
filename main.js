/* 
Script principal de l'appli
*/

//Import des modules
const electron = require('electron');
const app = electron.app;
const path = require('path')
const glob = require('glob')


//Fenêtre electron
const BrowserWindow = electron.BrowserWindow;

//True si "--dev" dans le 2e argument
const dev = /--dev/.test(process.argv[2])

if (process.mas) app.setName('Electron test app')

let mainWindow;

function initialize () {
  var shouldQuit = makeSingleInstance()
  if (shouldQuit) return app.quit()

  loadMainProcess()

  function createWindow () {
    var windowOptions = {
      width: 1080,
      minWidth: 680,
      height: 840,
      title: app.getName()
    }

    // if (process.platform === 'linux') {
    //   windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
    // }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

    // Launch with electron-reloader , usage: npm run dev
    if (dev) {
      //mainWindow.webContents.openDevTools()
      //mainWindow.maximize()
      //Plugin de debug
      require('devtron').install()
      //Permet de recharger l'appli automatiquement quand le code est modifé
      try{
        require('electron-reloader')(module)
      }
      catch(err){
        console.log(err)
      }
    }



    mainWindow.on('closed', function () {
      mainWindow = null
    })
  }

  app.on('ready', function () {
    createWindow()
    // autoUpdater.initialize()
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', function () {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
  if (process.mas) return false

  return app.makeSingleInstance(function () {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// Require each JS file in the main-process dir
function loadMainProcess () {
  var files = glob.sync(path.join(__dirname, 'src/main-process/**/*.js'))
  files.forEach(function (file) {
    require(file)
  })
  // autoUpdater.updateMenu()
}

initialize()

