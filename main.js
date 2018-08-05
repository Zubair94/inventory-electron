console.log("app process running");

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const sqlite3 = require('sqlite3').verbose();
 
// open database in memory

let db = new sqlite3.Database('./db/inventory.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the inventory database.');
});

let homeWindow;

function createWindow(){
    homeWindow = new BrowserWindow();
    homeWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));
    homeWindow.webContents.openDevTools();
       
    homeWindow.on('closed', () => {
        homeWindow = null;
    });
}



app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        // close the database connection
        db.close((err) => {
            if (err) {
            return console.error(err.message);
            }
            console.log('Closed the database connection.');
        });
        app.quit();
    }
});

app.on('activate', () => {
    if(homeWindow === null){
        createWindow();
    }
});