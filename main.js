/* 
Script principal de l'appli
Auteur : vivien louradour
*/

//Import du module electron 
const electron = require('electron');
//
const app = electron.app;
//Fenêtre electron
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

//Créer et affichage la fenetre principale
function createWindow () {

  mainWindow = new BrowserWindow({width: 1800, height: 1200}); // on définit une taille pour notre fenêtre

  mainWindow.loadURL(`file://${__dirname}/index.html`); // on doit charger un chemin absolu

  //Ferme la fenetre mainWindow lors de l'évenement 'closed'
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

//Evenement ready : lancement de l'application
app.on('ready', createWindow);
//Evenement activate : réaction de l'application (application tourne déjà en arrière-plan(MacOS))
app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

//Evenement window-all-closed : toutes les fenêtres sont fermées
app.on('window-all-closed', () => {
    //Si OS != MacOS
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  