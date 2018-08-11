
const { remote } = require('electron');
const database_helper = require('../db_helper');
var database = database_helper.connect();

const indexButton = document.getElementById("index");
indexButton.addEventListener('click', (event) => {
    remote.getCurrentWindow().loadFile('./index/index.html');
});

const withdrawButton = document.getElementById("submit");
withdrawButton.addEventListener('click', (event) => {
    var id = document.getElementById("item_id").value;
    var amount = document.getElementById("item_amount").value;
    var isnumid = /^\d+$/.test(id);
    var isnumamount = /^\d+$/.test(amount);
    let sql = `UPDATE inventorylist SET item_amount = item_amount - ? WHERE item_id = ?`;
    if(isnumid && isnumamount){
        database.run(sql, amount, id, (err) => {
            if(err){
                $("#fail-msg").show();
                setTimeout(function() {
                    document.getElementById("fail-msg").style.display = "none";
                }, 2000);
            }
            $("#alert-msg").show();
            setTimeout(function() {
                document.getElementById("alert-msg").style.display = "none";
            }, 2000);
        })
    }
    else{
        $("#fail-msg").show();
        setTimeout(function() {
            document.getElementById("fail-msg").style.display = "none";
        }, 2000);
    }
});
