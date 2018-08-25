const { remote } = require('electron');
const database_helper = require('../db_helper');
var database = database_helper.connect();
var dataobj;
document.getElementById("edit-deposit").style.display = "none";
document.getElementById("edit-withdraw").style.display = "none";
document.getElementById("edit-inventory").style.display = "none";
var html;
getInventoryData();


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

const getInventory = document.getElementById("submit");
getInventory.addEventListener('click', (event) => {
    var id = document.getElementById("item_id").value;
    if(id === ""){
        $("#fail-msg").show();
        setTimeout(function() {
            document.getElementById("fail-msg").style.display = "none";
        }, 2000);
    }
    else{
        let sql = `SELECT * FROM inventorylist WHERE item_id = ?`;
        getData(sql, id).then(data => {
            document.getElementById("edit-inventory").style.display = "block";
            document.getElementById("edit-deposit").style.display = "none";
            document.getElementById("edit-withdraw").style.display = "none";
            document.getElementById("item_name_i").value = data.name;
            document.getElementById("item_amount_i").value = data.amount;
            //console.log(data.id);
            dataobj = data;
        });
    }
    
});

const getDeposit = document.getElementById("submit-d");
getDeposit.addEventListener('click', (event) => {
    var id = document.getElementById("item_id").value;
    if(id === ""){
        $("#fail-msg").show();
        setTimeout(function() {
            document.getElementById("fail-msg").style.display = "none";
        }, 2000);
    }
    else{
        let sql = `SELECT * FROM depositlist WHERE item_id = ?`;
        getData(sql, id).then(data => {
            document.getElementById("edit-inventory").style.display = "none";
            document.getElementById("edit-deposit").style.display = "block";
            document.getElementById("edit-withdraw").style.display = "none";
            document.getElementById("item_user_d").value = data.user;
            document.getElementById("item_amount_d").value = data.amount;
            var date = data.date.split(" ");
            var local = date[0]+"T"+date[1];
            document.getElementById("item_date_d").value = local;
            dataobj = data;
        });
    }
    
});

const getWithdraw = document.getElementById("submit-w");
getWithdraw.addEventListener('click', (event) => {
    var id = document.getElementById("item_id").value;
    console.log("XD");
    if(id === ""){
        $("#fail-msg").show();
        setTimeout(function() {
            document.getElementById("fail-msg").style.display = "none";
        }, 2000);
    }
    else{
        let sql = `SELECT * FROM withdrawlist WHERE item_id = ?`;
        getData(sql, id).then(data => {
            document.getElementById("edit-inventory").style.display = "none";
            document.getElementById("edit-deposit").style.display = "none";
            document.getElementById("edit-withdraw").style.display = "block";
            document.getElementById("item_user_w").value = data.user;
            document.getElementById("item_amount_w").value = data.amount;
            //console.log(data.date);
            var date = data.date.split(" ");
            var local = date[0]+"T"+date[1];
            document.getElementById("item_date_w").value = local;
            dataobj = data;
        });
    }
    
});

const editInventory = document.getElementById("submit-edit-i");
editInventory.addEventListener('click', (event) => {
    var name =  document.getElementById("item_name_i").value;
    var amount = document.getElementById("item_amount_i").value;
    var isnum = /^\d+$/.test(amount);
    if(name !== "" && isnum) {
        let sql = `UPDATE inventorylist SET item_name = ?, item_amount = ? WHERE item_id = ?`;
        var sqlobj = {
            id: dataobj.id,
            name: name || dataobj.name,
            amount: amount || dataobj.amount
        }
        database.run(sql, sqlobj.name, sqlobj.amount, sqlobj.id, (err) => {
            if (err) {
                $("#fail-msg").show();
                setTimeout(function() {
                    document.getElementById("fail-msg").style.display = "none";
                }, 2000);
                throw err;
            }
            else{
                document.getElementById("item_name_i").value = "";
                document.getElementById("item_amount_i").value = "";
                getInventoryData();
                $("#alert-msg").show();
                setTimeout(function() {
                    document.getElementById("alert-msg").style.display = "none";
                }, 2000);
            }
        });
    }
});

const editDeposit = document.getElementById("submit-edit-d");
editDeposit.addEventListener('click', (event) => {
    var user =  document.getElementById("item_user_d").value;
    var amount = document.getElementById("item_amount_d").value;
    var date = document.getElementById("item_date_d").value;
    var isnum = /^\d+$/.test(amount);
    if(user !== "" && isnum){
        let sql = `UPDATE depositlist SET item_name = ?, item_amount = ?, item_date = ? WHERE item_id = ?`;
        if(date === "" || undefined || null){
            var d = new Date(Date.now());
            //console.log(d);
            local = dateConverter(d);
        }
        else{
            var sqldate = new Date(date);
            var local = dateConverter(sqldate);
            //console.log(sqldate);
        }
        var sqlobj = {
            id: dataobj.id,
            user: user || dataobj.user,
            name: dataobj.name,
            amount: amount || dataobj.amount,
            date: local || dataobj.date
        }
        database.run(sql, sqlobj.user, sqlobj.amount, sqlobj.date, sqlobj.id, (err) => {
            if (err) {
                $("#fail-msg").show();
                setTimeout(function() {
                    document.getElementById("fail-msg").style.display = "none";
                }, 2000);
                throw err;
            }
            else{
                let sql2 = `UPDATE inventorylist SET item_amount = ? WHERE item_name = ?`;
                database.run(sql2, sqlobj.amount, sqlobj.name, (err) => {
                    if (err) {
                        throw err;
                    }
                    else{
                        document.getElementById("item_user_d").value = "";
                        document.getElementById("item_amount_d").value = "";
                        document.getElementById("item_date_d").value = "";
                        getInventoryData();
                        $("#alert-msg").show();
                        setTimeout(function() {
                            document.getElementById("alert-msg").style.display = "none";
                        }, 2000);
                    }
                });
            }
        });
    }
});


function dateConverter(date){
    var day = date.getDate();
    var month = date.getMonth() + 1;
    if(month < 10){
        month = '0'+month.toString();
    }
    else{
        month = month.toString();
    }
    var year = date.getFullYear();
    var hour = date.getHours();
    if(hour < 10){
        hour = '0'+hour.toString();
    }
    else{
        hour = hour.toString();
    }
    var minute = date.getMinutes();
    if(minute < 10){
        minute = '0'+minute.toString();
    }
    else{
        minute = minute.toString();
    }
    var second = date.getSeconds();
    if(second < 10){
        second = '0'+second.toString();
    }
    else{
        second = second.toString();
    }
    console.log(hour, minute, second);
    var local = year.toString()+'-'+month+'-'+day.toString()+' '+hour+':'+minute+':'+second;
    //dlocal = new Date(local);
    //dlocal = dlocal.toLocaleString();
    return local;
}

function getInventoryData(){
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
}

function getData(sql, id){
    return new Promise((resolve, reject) => {
        database.all(sql, [id], (err, rows) => {
            if(err){
                reject("error");
                throw err;
            }
            else{
                var obj = {
                    id: rows[0].item_id || "",
                    amount: rows[0].item_amount || "",
                    name: rows[0].item_name || "",
                    date: rows[0].item_date || "",
                    user: rows[0].item_user || ""
                }
                resolve(obj);
            }
        });
    });
}