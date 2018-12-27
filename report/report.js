
const { remote } = require('electron');
const database_helper = require('../db_helper');
var database = database_helper.connect();
var download = 'none';
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

const reportNavButton = document.getElementById("report");
reportNavButton.addEventListener('click', (event) => {
    remote.getCurrentWindow().loadFile('./report/report.html');
});


const userWButton = document.getElementById("submit-uw");
userWButton.addEventListener('click', (event) => {
    download = 'withdraw';
    var user = document.getElementById("item_user");
    let sql = `SELECT item_id as id, item_name as name, item_amount as amount, item_date as date, item_user as user from withdrawlist WHERE item_user = ?`;
    if(user.value !== ""){
        database.all(sql, [user.value], (err, rows) => {
            if (err) {
                $("#fail-msg").show();
                setTimeout(function() {
                    document.getElementById("fail-msg").style.display = "none";
                }, 2000);
                throw err;
            }
            $("#alert-msg").show();
                setTimeout(function() {
                document.getElementById("alert-msg").style.display = "none";
            }, 2000);
            html = "<h3>Withdraw Report for User "+ user.value + "</h3>";
            html += "<table id='report-table' class='table table-bordered'>";
            html += "<thead>";
            html += "<tr>";
            html += "<tr><th scope='col'>Item ID</th><th scope='col'>Item Name</th><th scope='col'>Item Amount</th><th scope='col'>Deposited By</th><th scope='col'>Deposit Date</th></tr>"
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
            document.getElementById("report-user-w").innerHTML = html;
        });
    }
    else{
        $("#alert-msg").show();
                setTimeout(function() {
                document.getElementById("alert-msg").style.display = "none";
            }, 2000);
    }
});

const userDButton = document.getElementById("submit-ud");
userDButton.addEventListener('click', (event) => {
    download = 'deposit';
    var user = document.getElementById("item_user");
    let sql = `SELECT item_id as id, item_name as name, item_amount as amount, item_date as date, item_user as user from depositlist WHERE item_user = ?`;
    if(user.value !== ""){
        database.all(sql, [user.value], (err, rows) => {
            if (err) {
                $("#fail-msg").show();
                setTimeout(function() {
                    document.getElementById("fail-msg").style.display = "none";
                }, 2000);
                throw err;
            }
            $("#alert-msg").show();
                setTimeout(function() {
                document.getElementById("alert-msg").style.display = "none";
            }, 2000);
            html = "<h3>Deposit Report for User "+ user.value + "</h3>";
            html += "<table id='report-table' class='table table-bordered'>";
            html += "<thead>";
            html += "<tr>";
            html += "<tr><th scope='col'>Item ID</th><th scope='col'>Item Name</th><th scope='col'>Item Amount</th><th scope='col'>Deposited By</th><th scope='col'>Deposit Date</th></tr>"
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
            document.getElementById("report-user-d").innerHTML = html;
        });
    }
    else{
        $("#alert-msg").show();
                setTimeout(function() {
                document.getElementById("alert-msg").style.display = "none";
            }, 2000);
    }
});

const depositReportButton = document.getElementById("submit-d");
depositReportButton.addEventListener('click', (event) => {
    var fromdate = document.getElementById("item_datefrom");
    var todate = document.getElementById("item_dateto");
    let sql = `SELECT item_id as id, item_name as name, item_amount as amount, item_date as date, item_user as user FROM depositlist WHERE strftime('%Y-%m-%d', item_date) BETWEEN ? AND ?`;
    if(fromdate.value !== "" && todate.value !== ""){
        database.all(sql, [fromdate.value, todate.value], (err, rows)=> {
            if (err) {
                $("#fail-msg").show();
                setTimeout(function() {
                    document.getElementById("fail-msg").style.display = "none";
                }, 2000);
                throw err;
            }
            //console.log(rows);
            $("#alert-msg").show();
                setTimeout(function() {
                document.getElementById("alert-msg").style.display = "none";
            }, 2000);
            html = "<h3>Deposit Report Between "+ fromdate.value + " to " + todate.value +"</h3>";
            html += "<table id='report-table' class='table table-bordered'>";
            html += "<thead>";
            html += "<tr>";
            html += "<tr><th scope='col'>Item ID</th><th scope='col'>Item Name</th><th scope='col'>Item Amount</th><th scope='col'>Deposited By</th><th scope='col'>Deposit Date</th></tr>"
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
            document.getElementById("report-deposit").innerHTML = html;
            Export2Doc('report-deposit','deposit');
        });
    }
    else{
        $("#alert-msg").show();
                setTimeout(function() {
                document.getElementById("alert-msg").style.display = "none";
            }, 2000);
    }
    
});

const withdrawReportButton = document.getElementById("submit-w");
withdrawReportButton.addEventListener('click', (event) => {
    var fromdate = document.getElementById("item_datefrom");
    var todate = document.getElementById("item_dateto");
    if(fromdate.value !== "" && todate.value !== ""){
        //console.log("das");
        let sql2 = `SELECT item_id as id, item_name as name, item_amount as amount, item_date as date, item_user as user FROM withdrawlist WHERE strftime('%Y-%m-%d', item_date) BETWEEN ? AND ?`;
    database.all(sql2, [fromdate.value, todate.value], (err, rows)=> {
        if (err) {
            $("#fail-msg").show();
            setTimeout(function() {
                document.getElementById("fail-msg").style.display = "none";
            }, 2000);
            throw err;
        }
        //console.log(rows);
        $("#alert-msg").show();
                setTimeout(function() {
                document.getElementById("alert-msg").style.display = "none";
            }, 2000);
        html = "<h3>Withdraw Report Between "+ fromdate.value + " to " + todate.value +"</h3>";
        html += "<table id='report-table' class='table table-bordered'>";
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
        document.getElementById("report-withdraw").innerHTML = html;
        Export2Doc('report-withdraw','withdraw');
    });
        
        
    }
    else{
        $("#fail-msg").show();
            setTimeout(function() {
                document.getElementById("fail-msg").style.display = "none";
            }, 2000);   
    }
    
});

const downloadBtn = document.getElementById("reportbtn");
downloadBtn.addEventListener('click', (event) => {
    console.log(download);
    if(download === 'deposit'){
        Export2Doc('report-user-d','user-deposit');
    }
    else if(download === 'withdraw'){
        Export2Doc('report-user-w','user-withdraw');
    }
    else{
        $("#fail-msg").show();
            setTimeout(function() {
                document.getElementById("fail-msg").style.display = "none";
            }, 2000); 
    }
});
function Export2Doc(element, filename = ''){
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+document.getElementById(element).innerHTML+postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    filename = filename?filename+'.doc':'document.doc';
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
}

