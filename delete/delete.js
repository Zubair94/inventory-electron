
const { remote } = require('electron');
const database_helper = require('../db_helper');
var database = database_helper.connect();


const indexButton = document.getElementById("index");
indexButton.addEventListener('click', (event) => {
    remote.getCurrentWindow().loadFile('./index/index.html');
});

const depositButton = document.getElementById("deposit");
depositButton.addEventListener('click', (event) => {
    remote.getCurrentWindow().loadFile('./deposit/deposit.html');
});

const withdrawButton = document.getElementById("withdraw");
withdrawButton.addEventListener('click', (event) => {
    remote.getCurrentWindow().loadFile('./withdraw/withdraw.html');
});

const reportButton = document.getElementById("report");
reportButton.addEventListener('click', (event) => {
    remote.getCurrentWindow().loadFile('./report/report.html');
});

const addButton = document.getElementById("add");
addButton.addEventListener('click', (event) => {
    remote.getCurrentWindow().loadFile('./add/add.html');
});

const editButton = document.getElementById("edit");
editButton.addEventListener('click', (event) => {
    remote.getCurrentWindow().loadFile('./edit/edit.html');
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

var html;
let sql = `SELECT item_id as id, item_name as name, item_amount as amount from inventorylist`;
database.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }
    //console.log(rows);
    html = "<table id='inventory-table' class='table table-bordered'>";
    html += "<thead>";
    html += "<tr>";
    html += "<tr><th scope='col'>Item ID</th><th scope='col'>Item Name</th><th scope='col'>Item Amount</th></tr>"
    html += "</thead>"
    html += "<tbody>"
    for(var i = 0; i < rows.length; i++){
        html+="<tr>";
        html+="<th scope='row'>"+rows[i].id+"</th>";
        html+="<td>"+rows[i].name+"</td>";
        html+="<td>"+rows[i].amount+"</td>";
        html+="</tr>";
    }
    html += "</tbody>"
    html += "</table>"
    document.getElementById("inventory").innerHTML = html;
});
