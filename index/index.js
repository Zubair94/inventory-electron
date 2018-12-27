const { remote } = require('electron');
const database_helper = require('../db_helper');
var database = database_helper.connect();

    getData("All");

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

    const deleteButton = document.getElementById("delete");
    deleteButton.addEventListener('click', (event) => {
        remote.getCurrentWindow().loadFile('./delete/delete.html');
    });

    const editButton = document.getElementById("edit");
    editButton.addEventListener('click', (event) => {
        remote.getCurrentWindow().loadFile('./edit/edit.html');
    });

    const allButton = document.getElementById("all");
    allButton.addEventListener('click', (event) => {
        getData("All");
    });
    const ktimeButton = document.getElementById("ktime");
    ktimeButton.addEventListener('click', (event) => {
        getData("Kids Time");
    });
    const ttimeButton = document.getElementById("ttime");
    ttimeButton.addEventListener('click', (event) => {
        getData("Teachers Time");
    });
    const lohButton = document.getElementById("loh");
    lohButton.addEventListener('click', (event) => {
        getData("Light of Hope");
    });
    const tgmgButton = document.getElementById("tgmg");
    tgmgButton.addEventListener('click', (event) => {
        getData("ToguMogu");
    });

    
    function getData(type){
        var html;
        let sql = `SELECT item_id as id, item_name as name, item_amount as amount, item_type as type from inventorylist WHERE item_type = ?`;
        let params = [];
        if(type === "All"){
            sql = `SELECT item_id as id, item_name as name, item_amount as amount, item_type as type from inventorylist`;
        }else{
            params.push(type);
        }
        database.all(sql, params, (err, rows) => {
        if (err) {
            throw err;
        }
        //console.log(rows);
        html = "<h4>Current Inventory: "+ type +"</h4>"
        html += "<table id='inventory-table' class='table table-bordered' width='100%' cellspacing='0'>";
        html += "<thead>";
        html += "<tr>";
        html += "<tr><th scope='col'>Item ID</th><th scope='col'>Item Name</th><th scope='col'>Item Amount</th><th scope='col'>Item Inventory</th></tr>"
        html += "</thead>"
        html += "<tbody>"
        for(var i = 0; i < rows.length; i++){
            html+="<tr>";
            html+="<th scope='row'>"+rows[i].id+"</th>";
            html+="<td>"+rows[i].name+"</td>";
            html+="<td>"+rows[i].amount+"</td>";
            html+="<td>"+rows[i].type+"</td>";
            html+="</tr>";
        }
        html += "</tbody>"
        html += "</table>"
        document.getElementById("inventory").innerHTML = html;
            $(document).ready(function() {
                $('#inventory-table').DataTable();
            });
        });
    }
   