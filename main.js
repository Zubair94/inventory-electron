console.log("app process running");

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
//const database_helper = require('./db_helper'); 
//var database = database_helper.connect();
  
//database_helper.query(database);

let homeWindow;

function createWindow(){
    homeWindow = new BrowserWindow({width: 800, height: 600});
    homeWindow.loadURL(url.format({
        pathname: path.join(__dirname, './index/index.html'),
        protocol: 'file',
        slashes: true
    }));
    //homeWindow.webContents.openDevTools();
       
    homeWindow.on('closed', () => {
        homeWindow = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        //database_helper.disconnect(database);
        app.quit();
    }
});

app.on('activate', () => {
    if(homeWindow === null){
        createWindow();
    }
});