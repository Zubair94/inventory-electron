const { remote } = require('electron');
const database_helper = require('../db_helper');
var database = database_helper.connect();
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

    const deleteButton = document.getElementById("delete");
    deleteButton.addEventListener('click', (event) => {
        remote.getCurrentWindow().loadFile('./delete/delete.html');
    });

    const editButton = document.getElementById("edit");
    editButton.addEventListener('click', (event) => {
        remote.getCurrentWindow().loadFile('./edit/edit.html');
    });

    

   