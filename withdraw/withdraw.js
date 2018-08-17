
const { remote } = require('electron');
const database_helper = require('../db_helper');
var database = database_helper.connect();
getWithdraw();
const indexButton = document.getElementById("index");
indexButton.addEventListener('click', (event) => {
    remote.getCurrentWindow().loadFile('./index/index.html');
});

const withdrawButton = document.getElementById("submit");
withdrawButton.addEventListener('click', (event) => {
    var id = document.getElementById("item_id").value;
    var amount = document.getElementById("item_amount").value;
    var user = document.getElementById("item_user").value;
    var date = document.getElementById("item_date").value;
    var local = new Date(date);
    local = local.toLocaleString();
    var isnumid = /^\d+$/.test(id);
    var isnumamount = /^\d+$/.test(amount);
    let sql = `UPDATE inventorylist SET item_amount = item_amount - ? WHERE item_id = ?`;
    let sql2 = `SELECT * FROM inventorylist WHERE item_id = ?`;
    var item_name;
    //console.log(id);
    if(isnumid && isnumamount && user !==""){
        database.all(sql2, [id], (err, rows) => {
            if(err){
                throw err;
            }
            item_name = rows[0].item_name;
            if(date === "" || undefined || null){
                local = dateConverter();
            }
            let sql3 = `INSERT INTO withdrawlist(item_name, item_amount, item_user, item_date) VALUES(?, ?, ?, ?)`;
            database.run(sql, amount, id, (err) => {
                if(err){
                    $("#fail-msg").show();
                    setTimeout(function() {
                        document.getElementById("fail-msg").style.display = "none";
                    }, 2000);
                }
                database.run(sql3, item_name, amount, user, local, (err) => {
                    if(err){
                        throw err;
                    }
                    document.getElementById("item_id").value = "";
                    document.getElementById("item_amount").value = "";
                    document.getElementById("item_user").value = "";
                    document.getElementById("item_date").value = "";
                    getWithdraw();
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

function dateConverter(){
    var date = new Date(Date.now());
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var local = year.toString()+'/'+month.toString()+'/'+day.toString()+', '+hour.toString()+':'+minute.toString()+':'+second.toString();
    dlocal = new Date(local);
    dlocal = dlocal.toLocaleString();
    return dlocal;
}

function getWithdraw(){
    let sql = `SELECT item_id as id, item_name as name, item_amount as amount, item_date as date, item_user as user from withdrawlist ORDER BY datetime(item_date) DESC`;
    database.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        //console.log(rows);
        html = "<table id='withdraw-table' class='table table-bordered'>";
        html += "<thead>";
        html += "<tr>";
        html += "<tr><th scope='col'>Item ID</th><th scope='col'>Item Name</th><th scope='col'>Item Amount</th><th scope='col'>Withdrawn By</th><th scope='col'>Withdraw Date</th></tr>"
        html += "</thead>"
        html += "<tbody>"
        for(var i = 0; i < rows.length; i++){
            html+="<tr>";
            html+="<th scope='row'>"+rows[i].id+"</th>";
            html+="<td>"+rows[i].name+"</td>";
            html+="<td>"+rows[i].amount+"</td>";
            html+="<td>"+rows[i].user+"</td>";
            html+="<td>"+rows[i].date+"</td>";
            html+="</tr>";
        }
        html += "</tbody>"
        html += "</table>"
        document.getElementById("withdraw").innerHTML = html;
    });
}
