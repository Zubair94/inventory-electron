
const { remote } = require('electron');
const database_helper = require('../db_helper');
var database = database_helper.connect();


const indexButton = document.getElementById("index");
indexButton.addEventListener('click', (event) => {
    remote.getCurrentWindow().loadFile('./index/index.html');
});

const deleteButton = document.getElementById("submit");
deleteButton.addEventListener('click', (event) => {
    var id = document.getElementById("item_id").value;
  
    let sql = `DELETE FROM inventorylist WHERE item_id = ?`; 
    var isnum = /^\d+$/.test(id);
    if(isnum){
        database.run(sql, id, (err) => {
            if (err) {
                $("#fail-msg").show();
                setTimeout(function() {
                    document.getElementById("fail-msg").style.display = "none";
                }, 2000);
                throw err;
            }
            else{
                document.getElementById("item_id").value = "";
                $("#alert-msg").show();
                setTimeout(function() {
                    document.getElementById("alert-msg").style.display = "none";
                }, 2000);
            }
        });
       
    }
    else{
        $("#fail-msg").show();
        setTimeout(function() {
            document.getElementById("fail-msg").style.display = "none";
        }, 2000);
    }
    
});

const deleteDButton = document.getElementById("submit-d");
deleteDButton.addEventListener('click', (event) => {
    var id = document.getElementById("item_id").value;
  
    let sql = `DELETE FROM depositlist WHERE item_id = ?`; 
    var isnum = /^\d+$/.test(id);
    if(isnum){
        database.run(sql, id, (err) => {
            if (err) {
                $("#fail-msg").show();
                setTimeout(function() {
                    document.getElementById("fail-msg").style.display = "none";
                }, 2000);
                throw err;
            }
            else{
                document.getElementById("item_id").value = "";
                $("#alert-msg").show();
                setTimeout(function() {
                    document.getElementById("alert-msg").style.display = "none";
                }, 2000);
            }
        });
       
    }
    else{
        $("#fail-msg").show();
        setTimeout(function() {
            document.getElementById("fail-msg").style.display = "none";
        }, 2000);
    }
    
});

const deleteWButton = document.getElementById("submit-w");
deleteWButton.addEventListener('click', (event) => {
    var id = document.getElementById("item_id").value;
  
    let sql = `DELETE FROM withdrawlist WHERE item_id = ?`; 
    var isnum = /^\d+$/.test(id);
    if(isnum){
        database.run(sql, id, (err) => {
            if (err) {
                $("#fail-msg").show();
                setTimeout(function() {
                    document.getElementById("fail-msg").style.display = "none";
                }, 2000);
                throw err;
            }
            else{
                document.getElementById("item_id").value = "";
                $("#alert-msg").show();
                setTimeout(function() {
                    document.getElementById("alert-msg").style.display = "none";
                }, 2000);
            }
        });
       
    }
    else{
        $("#fail-msg").show();
        setTimeout(function() {
            document.getElementById("fail-msg").style.display = "none";
        }, 2000);
    }
    
});
