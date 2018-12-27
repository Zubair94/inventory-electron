console.log("app process running");

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const database_helper = require('./db_helper'); 
//app.setPath('userDB', 'db/inventory.db');
//const dbPath = app.getPath('userDB');
var database = database_helper.connect();

//database_helper.query(database);
let sqlCreate = `CREATE TABLE inventorylist (
    item_id integer PRIMARY KEY AUTOINCREMENT,
    item_name text NOT NULL,
    item_amount integer NOT NULL,
    item_type text NOT NULL)`;
let sqlCreate2 = `CREATE TABLE depositlist (
    item_id integer PRIMARY KEY AUTOINCREMENT,
    item_name text NOT NULL,
    item_amount integer NOT NULL,
    item_user text NOT NULL,
    item_type text NOT NULL,
    item_date datetime DEFAULT CURRENT_TIMESTAMP)`;
let sqlCreate3 = `CREATE TABLE withdrawlist (
    item_id integer PRIMARY KEY AUTOINCREMENT,
    item_name text NOT NULL,
    item_amount integer NOT NULL,
    item_user text NOT NULL,
    item_type text NOT NULL,
    item_date datetime DEFAULT CURRENT_TIMESTAMP)`;
let sqlCheck = `SELECT * from inventorylist`;
let sqlCheck2 = `SELECT * from depositlist`;
let sqlCheck3 = `SELECT * from withdrawlist`;

database_helper.create(database, sqlCheck, sqlCreate).then(value => {
    console.log(value);
});
database_helper.create(database, sqlCheck2, sqlCreate2).then(value => {
    console.log(value);
});
database_helper.create(database, sqlCheck3, sqlCreate3).then(value => {
    console.log(value);
});

   

   

let homeWindow;


function createWindow(){
    homeWindow = new BrowserWindow({width: 1024, height: 768});
    homeWindow.setMenu(null);
    homeWindow.loadURL(url.format({
        pathname: path.join(__dirname, './index/index.html'),
        protocol: 'file',
        slashes: true
    }));
    homeWindow.webContents.openDevTools();
       
    homeWindow.on('closed', () => {
        homeWindow = null;
    });
}

function setWindow(){
    const screen = electron.screen;
    const mainScreen = screen.getPrimaryDisplay();
    const dimensions = mainScreen.size;
    homeWindow.setSize(dimensions.width, dimensions.height);
}
app.on('ready', createWindow);
app.on('ready', setWindow);
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        database_helper.disconnect(database);
        app.quit();
    }
});

app.on('activate', () => {
    if(homeWindow === null){
        createWindow();
    }
});