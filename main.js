console.log("app process running");

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const database_helper = require('./db_helper'); 
var database = database_helper.connect();
  
//database_helper.query(database);
let sqlCheck = `CREATE TABLE inventorylist (
    item_id integer PRIMARY KEY AUTOINCREMENT,
    item_name text NOT NULL,
    item_amount text NOT NULL)`;
let sqlCheck2 = `CREATE TABLE depositlist (
    item_id integer PRIMARY KEY AUTOINCREMENT,
    item_name text NOT NULL,
    item_amount text NOT NULL,
    item_user text NOT NULL,
    item_data datetime DEFAULT CURRENT_TIMESTAMP)`;
let sqlCheck3 = `CREATE TABLE withdrawlist (
    item_id integer PRIMARY KEY AUTOINCREMENT,
    item_name text NOT NULL,
    item_amount text NOT NULL,
    item_user text NOT NULL,
    item_data datetime DEFAULT CURRENT_TIMESTAMP)`;
let sqlCreate = `SELECT * from inventorylist`;
let sqlCreate2 = `SELECT * from depositlist`;
let sqlCreate3 = `SELECT * from withdrawlist`;

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
    homeWindow = new BrowserWindow({width: 800, height: 600});
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

app.on('ready', createWindow);
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