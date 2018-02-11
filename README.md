# Electron test  
**Application de test du framework electron**  
*Vivien Louradour*
   
Tutoriel : https://zestedesavoir.com/tutoriels/996/vos-applications-avec-electron/  
  

### Prérequis  
- nodejs et npm    
`apt-get install nodejs npm`
- Electron Framework  
`npm install electron -g`
- Electron-packager + wine si l'OS de dev est Linux ou Mac OS X (permet de créer des exécutables Linux/MacOS/Windows)    
`apt-get install wine` 
`npm install electron-packager -g --save-dev`

### Installation rapide 
Dans le répertoire racine de l'application :  
`npm install` 

### Lancement de l'appli
`npm start`

### Publication de l'appli
Dans le répertoire racine de l'application :  
`electron-packager ./ --all --out out/ [--overwrite]`






