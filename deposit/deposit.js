
const { remote } = require('electron');
const database_helper = require('../db_helper');
var database = database_helper.connect();

const indexButton = document.getElementById("index");
indexButton.addEventListener('click', (event) => {
    remote.getCurrentWindow().loadFile('./index/index.html');
});

const depositButton = document.getElementById("submit");
depositButton.addEventListener('click', (event) => {
    var id = document.getElementById("item_id").value;
    var amount = document.getElementById("item_amount").value;
    var user = document.getElementById("item_user").value;
    var isnumid = /^\d+$/.test(id);
    var isnumamount = /^\d+$/.test(amount);
    let sql = `UPDATE inventorylist SET item_amount = item_amount + ? WHERE item_id = ?`;
    let sql2 = `SELECT * FROM inventorylist WHERE item_id = ?`;
    var item_name;
    if(isnumid && isnumamount){
        database.all(sql2, [id], (err, rows) => {
            if(err){
                throw err;
            }
        item_name = rows[0].item_name;
        console.log(item_name);    
        let sql3 = `INSERT INTO depositlist(item_name, item_amount, item_user) VALUES(?, ?, ?)`;
        
        database.run(sql, amount, id, (err) => {
            if(err){
                $("#fail-msg").show();
                setTimeout(function() {
                    document.getElementById("fail-msg").style.display = "none";
                }, 2000);
            }
            database.run(sql3, item_name, amount, user, (err) => {
                if(err){
                    throw err;
                }
                $("#alert-msg").show();
                setTimeout(function() {
                    document.getElementById("alert-msg").style.display = "none";
                }, 2000);
            }); 
        });
        });
    }
    else{
        $("#fail-msg").show();
        setTimeout(function() {
            document.getElementById("fail-msg").style.display = "none";
        }, 2000);
    }
});
