
const { remote } = require('electron');
const database_helper = require('../db_helper');
var database = database_helper.connect();


const indexButton = document.getElementById("index");
indexButton.addEventListener('click', (event) => {
    remote.getCurrentWindow().loadFile('./index/index.html');
});

const addButton = document.getElementById("submit");
addButton.addEventListener('click', (event) => {
    var name = document.getElementById("item_name").value;
    var amount = document.getElementById("item_amount").value;
    console.log(name);
    console.log(amount);
    let sql = `INSERT INTO inventorylist(item_name, item_amount) VALUES (?,?)`; 
    var isnum = /^\d+$/.test(amount);
    if(isnum && name !== ""){
        database.run(sql, name, amount, (err) => {
            if (err) {
                $("#fail-msg").show();
                setTimeout(function() {
                    document.getElementById("fail-msg").style.display = "none";
                }, 2000);
                throw err;
            }
            else{
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
