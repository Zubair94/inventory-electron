const { remote } = require('electron');
const database_helper = require('../db_helper');
var database = database_helper.connect();
var dataobj;
document.getElementById("edit-deposit").style.display = "none";
document.getElementById("edit-withdraw").style.display = "none";
document.getElementById("edit-inventory").style.display = "none";
var html;
let currentInventoryType = "All";
document.getElementById("current-inventory").innerHTML = "Current Inventory: " +currentInventoryType;
getInventoryData(currentInventoryType);
getDepositData(currentInventoryType);
getWithdrawData(currentInventoryType);
var prevamount;
var previousname;

/*const getInventoryTabLink = document.getElementById("inventory-tab");
getInventoryTabLink.addEventListener('click', (event) => {
    getInventoryData();
});
const getDepositTabLink = document.getElementById("inventory-tab");
getDepositTabLink.addEventListener('click', (event) => {
    getDepositData();
});
const getWithdrawTabLink = document.getElementById("inventory-tab");
getWithdrawTabLink.addEventListener('click', (event) => {
    getWithdrawData();
});*/

function showGetItem(){
    document.getElementById("get-item").style.display = "block";
    document.getElementById("edit-inventory").style.display = "none";
    document.getElementById("edit-deposit").style.display = "none";
    document.getElementById("edit-withdraw").style.display = "none";
}

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

const editNavButton = document.getElementById("edit");
editNavButton.addEventListener('click', (event) => {
    remote.getCurrentWindow().loadFile('./edit/edit.html');
});

const backButton = document.getElementById("back-i");
backButton.addEventListener('click', (event) => {
    document.getElementById("item_id").value = '';
    showGetItem();
});

const backDButton = document.getElementById("back-d");
backDButton.addEventListener('click', (event) => {
    document.getElementById("item_id").value = '';
    showGetItem();
});

const backWButton = document.getElementById("back-w");
backWButton.addEventListener('click', (event) => {
    document.getElementById("item_id").value = '';
    showGetItem();
});

const allButton = document.getElementById("all");
allButton.addEventListener('click', (event) => {
    currentInventoryType = "All"
    document.getElementById("current-inventory").innerHTML = "Current Inventory: " +currentInventoryType;
    getInventoryData(currentInventoryType);
    getDepositData(currentInventoryType);
    getWithdrawData(currentInventoryType);
});
const ktimeButton = document.getElementById("ktime");
ktimeButton.addEventListener('click', (event) => {
    currentInventoryType = "Kids Time"
    document.getElementById("current-inventory").innerHTML = "Current Inventory: " +currentInventoryType;
    getInventoryData(currentInventoryType);
    getDepositData(currentInventoryType);
    getWithdrawData(currentInventoryType);
});
const ttimeButton = document.getElementById("ttime");
ttimeButton.addEventListener('click', (event) => {
    currentInventoryType = "Teachers Time"
    document.getElementById("current-inventory").innerHTML = "Current Inventory: " +currentInventoryType;
    getInventoryData(currentInventoryType);
    getDepositData(currentInventoryType);
    getWithdrawData(currentInventoryType);
});
const lohButton = document.getElementById("loh");
lohButton.addEventListener('click', (event) => {
    currentInventoryType = "Light of Hope"
    document.getElementById("current-inventory").innerHTML = "Current Inventory: " +currentInventoryType;;
    getInventoryData(currentInventoryType);
    getDepositData(currentInventoryType);
    getWithdrawData(currentInventoryType);
});
const tgmgButton = document.getElementById("tgmg");
tgmgButton.addEventListener('click', (event) => {
    currentInventoryType = "ToguMogu"
    document.getElementById("current-inventory").innerHTML = "Current Inventory: " +currentInventoryType;
    getInventoryData(currentInventoryType);
    getDepositData(currentInventoryType);
    getWithdrawData(currentInventoryType);
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
            console.log(data);
            document.getElementById("get-item").style.display = "none";
            document.getElementById("edit-inventory").style.display = "block";
            document.getElementById("edit-deposit").style.display = "none";
            document.getElementById("edit-withdraw").style.display = "none";
            document.getElementById("item_name_i").value = data.name;
            document.getElementById("item_amount_i").value = data.amount;
            document.getElementById("selectInventory").value = data.type;
            //console.log(data.id);
            previousname = data.name;
            dataobj = data;
        });
    }
    document.getElementById("item_id").value = "";
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
            console.log(data);
            document.getElementById("get-item").style.display = "none";
            document.getElementById("edit-inventory").style.display = "none";
            document.getElementById("edit-deposit").style.display = "block";
            document.getElementById("edit-withdraw").style.display = "none";
            document.getElementById("item_user_d").value = data.user;
            document.getElementById("item_amount_d").value = data.amount;
            document.getElementById("selectDepositInventory").value = data.type;
            var date = data.date.split(" ");
            var local = date[0]+"T"+date[1];
            document.getElementById("item_date_d").value = local;
            prevamount = data.amount;
            dataobj = data;
            //console.log(dataobj);
        });
    }
    document.getElementById("item_id").value = "";
});

const getWithdraw = document.getElementById("submit-w");
getWithdraw.addEventListener('click', (event) => {
    var id = document.getElementById("item_id").value;
    //console.log("XD");
    if(id === ""){
        $("#fail-msg").show();
        setTimeout(function() {
            document.getElementById("fail-msg").style.display = "none";
        }, 2000);
    }
    else{
        let sql = `SELECT * FROM withdrawlist WHERE item_id = ?`;
        getData(sql, id).then(data => {
            console.log(data);
            document.getElementById("get-item").style.display = "none";
            document.getElementById("edit-inventory").style.display = "none";
            document.getElementById("edit-deposit").style.display = "none";
            document.getElementById("edit-withdraw").style.display = "block";
            document.getElementById("item_user_w").value = data.user;
            document.getElementById("item_amount_w").value = data.amount;
            document.getElementById("selectWithdrawInventory").value = data.type;
            //console.log(data.date);
            var date = data.date.split(" ");
            var local = date[0]+"T"+date[1];
            document.getElementById("item_date_w").value = local;
            prevamount = data.amount;
            dataobj = data;
        });
    }
    document.getElementById("item_id").value = "";
});

const editInventory = document.getElementById("submit-edit-i");
editInventory.addEventListener('click', (event) => {
    var name =  document.getElementById("item_name_i").value;
    var amount = document.getElementById("item_amount_i").value;
    var isnum = /^\d+$/.test(amount);
    if(name !== "" && isnum) {
        let sql = `UPDATE inventorylist SET item_name = ?, item_amount = ? WHERE item_id = ?`;
        let sql2 = `UPDATE depositlist SET item_name = ? WHERE item_name = ?`;
        let sql3 = `UPDATE withdrawlist SET item_name = ? WHERE item_name = ?`;
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
                database.run(sql2, sqlobj.name, previousname, (err) => {
                    if(err){
                        throw err;
                    }
                });
                database.run(sql3, sqlobj.name, previousname, (err) => {
                    if(err){
                        throw err;
                    }
                });
                document.getElementById("item_name_i").value = "";
                document.getElementById("item_amount_i").value = "";
                getInventoryData(currentInventoryType);
                getDepositData(currentInventoryType);
                getWithdrawData(currentInventoryType);
                showGetItem(currentInventoryType);
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
        let sql = `UPDATE depositlist SET item_user = ?, item_amount = ?, item_date = ? WHERE item_id = ?`;
        
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
        let sql3 = `SELECT * from inventorylist WHERE item_name = ?`;
        //console.log(dataobj.name);
        database.all(sql3, [dataobj.name], (err, rows) => {
            if(err){
                throw err;
            }
            //console.log(rows);
            user =  document.getElementById("item_user_d").value;
            amount = document.getElementById("item_amount_d").value;
            date = document.getElementById("item_date_d").value;
            isnum = /^\d+$/.test(amount);
            var newamount = (parseInt(rows[0].item_amount) - parseInt(prevamount)) + parseInt(amount);
            var sqlobj = {
                id: dataobj.id,
                user: user || dataobj.user,
                name: dataobj.name,
                amount: amount || dataobj.amount,
                date: local || dataobj.date
            }
            if(user && date !== "" && isnum){
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
                        database.run(sql2, newamount, sqlobj.name, (err) => {
                            if (err) {
                                throw err;
                            }
                            else{
                                document.getElementById("item_user_d").value = "";
                                document.getElementById("item_amount_d").value = "";
                                document.getElementById("item_date_d").value = "";
                                getInventoryData(currentInventoryType);
                                getDepositData(currentInventoryType);
                                getWithdrawData(currentInventoryType);
                                showGetItem();
                                $("#alert-msg").show();
                                setTimeout(function() {
                                    document.getElementById("alert-msg").style.display = "none";
                                }, 2000);
                            }
                        });
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
    }
});

const editWithdraw = document.getElementById("submit-edit-w");
editWithdraw.addEventListener('click', (event) => {
    var user =  document.getElementById("item_user_w").value;
    var amount = document.getElementById("item_amount_w").value;
    var date = document.getElementById("item_date_w").value;
    var isnum = /^\d+$/.test(amount);
    if(user !== "" && isnum){
        let sql = `UPDATE withdrawlist SET item_user = ?, item_amount = ?, item_date = ? WHERE item_id = ?`;
        
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
        let sql3 = `SELECT * from inventorylist WHERE item_name = ?`;
        //console.log(dataobj.name);
        database.all(sql3, [dataobj.name], (err, rows) => {
            if(err){
                throw err;
            }
            //console.log(rows);
            user =  document.getElementById("item_user_w").value;
            amount = document.getElementById("item_amount_w").value;
            date = document.getElementById("item_date_w").value;
            isnum = /^\d+$/.test(amount);
            var newamount = (parseInt(rows[0].item_amount) + parseInt(prevamount)) - parseInt(amount);
            var sqlobj = {
                id: dataobj.id,
                user: user || dataobj.user,
                name: dataobj.name,
                amount: amount || dataobj.amount,
                date: local || dataobj.date
            }
            if(user && date !== "" && isnum){
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
                        database.run(sql2, newamount, sqlobj.name, (err) => {
                            if (err) {
                                throw err;
                            }
                            else{
                                document.getElementById("item_user_w").value = "";
                                document.getElementById("item_amount_w").value = "";
                                document.getElementById("item_date_w").value = "";
                                getInventoryData(currentInventoryType);
                                getDepositData(currentInventoryType);
                                getWithdrawData(currentInventoryType);
                                showGetItem();
                                $("#alert-msg").show();
                                setTimeout(function() {
                                    document.getElementById("alert-msg").style.display = "none";
                                }, 2000);
                            }
                        });
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

function getDepositData(type){
    let sql = `SELECT item_id as id, item_name as name, item_amount as amount, item_type as type, item_date as date, item_user as user from depositlist WHERE item_type = ? ORDER BY datetime(item_date) DESC`;
    let params = [];
    if(type === "All"){
        sql = `SELECT item_id as id, item_name as name, item_amount as amount, item_type as type, item_date as date, item_user as user from depositlist ORDER BY datetime(item_date) DESC;`;
    }else{
        params.push(type);
    }
    database.all(sql, params, (err, rows) => {
        if (err) {
            throw err;
        }
        //console.log(rows);
        html = "<h4>Current Inventory: "+ type +"</h4>"
        html += "<table id='deposit-table' class='table table-bordered'>";
        html += "<thead>";
        html += "<tr>";
        html += "<tr><th scope='col'>Item ID</th><th scope='col'>Item Name</th><th scope='col'>Item Amount</th><th scope='col'>Item Inventory</th><th scope='col'>Deposited By</th><th scope='col'>Deposit Date</th></tr>"
        html += "</thead>"
        html += "<tbody>"
        for(var i = 0; i < rows.length; i++){
            html+="<tr>";
            html+="<th scope='row'>"+rows[i].id+"</th>";
            html+="<td>"+rows[i].name+"</td>";
            html+="<td>"+rows[i].amount+"</td>";
            html+="<td>"+rows[i].type+"</td>";
            html+="<td>"+rows[i].user+"</td>";
            html+="<td>"+rows[i].date+"</td>";
            html+="</tr>";
        }
        html += "</tbody>"
        html += "</table>"
        document.getElementById("deposit-data").innerHTML = html;
        $(document).ready(function() {
            $('#deposit-table').DataTable();
        });
    });
}


function getWithdrawData(type){
    let sql = `SELECT item_id as id, item_name as name, item_amount as amount, item_type as type, item_date as date, item_user as user from withdrawlist WHERE item_type = ? ORDER BY datetime(item_date) DESC`;
    let params = [];
    if(type === "All"){
        sql = `SELECT item_id as id, item_name as name, item_amount as amount, item_type as type, item_date as date, item_user as user from withdrawlist ORDER BY datetime(item_date) DESC`;
    }else{
        params.push(type);
    }
    database.all(sql, params, (err, rows) => {
        if (err) {
            throw err;
        }
        //console.log(rows);
        html = "<h4>Current Inventory: "+ type +"</h4>"
        html += "<table id='withdraw-table' class='table table-bordered'>";
        html += "<thead>";
        html += "<tr>";
        html += "<tr><th scope='col'>Item ID</th><th scope='col'>Item Name</th><th scope='col'>Item Amount</th><th scope='col'>Item Inventory</th><th scope='col'>Withdrawn By</th><th scope='col'>Withdraw Date</th></tr>"
        html += "</thead>"
        html += "<tbody>"
        for(var i = 0; i < rows.length; i++){
            html+="<tr>";
            html+="<th scope='row'>"+rows[i].id+"</th>";
            html+="<td>"+rows[i].name+"</td>";
            html+="<td>"+rows[i].amount+"</td>";
            html+="<td>"+rows[i].type+"</td>";
            html+="<td>"+rows[i].user+"</td>";
            html+="<td>"+rows[i].date+"</td>";
            html+="</tr>";
        }
        html += "</tbody>"
        html += "</table>"
        document.getElementById("withdraw-data").innerHTML = html;
        $(document).ready(function() {
            $('#withdraw-table').DataTable();
        });
    });
}

function getInventoryData(type){
    let sql = `SELECT item_id as id, item_name as name, item_amount as amount, item_type as type from inventorylist WHERE item_type = ?`;
    let params = [];
    if(type === "All"){
        sql = `SELECT item_id as id, item_name as name, item_amount as amount, item_type as type from inventorylist`;
    }else{
       params.push(type)
    }
    database.all(sql, params, (err, rows) => {
        if (err) {
            throw err;
        }
        //console.log(rows);
        html = "<h4>Current Inventory: "+ type +"</h4>"
        html += "<table id='inventory-table' class='table table-bordered'>";
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
        document.getElementById("inventory-data").innerHTML = html;
        $(document).ready(function() {
            $('#inventory-table').DataTable();
        });
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
                //console.log(rows);
                var obj = {
                    id: rows[0].item_id || "",
                    amount: rows[0].item_amount || "",
                    name: rows[0].item_name || "",
                    date: rows[0].item_date || "",
                    user: rows[0].item_user || "",
                    type: rows[0].item_type || ""
                }
                //console.log(obj);
                resolve(obj);
            }
        });
    });
}