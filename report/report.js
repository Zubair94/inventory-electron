
const { remote } = require('electron');

var pdf = new jsPDF('p', 'pt', 'a4');
const database_helper = require('../db_helper');
var database = database_helper.connect();

const indexButton = document.getElementById("index");
indexButton.addEventListener('click', (event) => {
    remote.getCurrentWindow().loadFile('./index/index.html');
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
            margins = {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
              };
            pdf.addHTML( document.getElementById("report-deposit"), function() {
                pdf.setFontSize(12);
                pdf.save('deposit.pdf');
            });
            
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
        pdf.addHTML( document.getElementById("report-withdraw"), function() {
            pdf.save('withdraw.pdf');
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

function getWithdrawReport(from, to){
   return new Promise((resolve, reject) => {
    
   });
}

