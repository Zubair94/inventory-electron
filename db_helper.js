function connect(){
    //console.log("in connect");
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('./db/inventory.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the inventory database.');
      });
      return db;
}

function disconnect(db){
    db.close((err) => {
        if (err) {
        return console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
}

/*function query(db, sql){
    db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          console.log(row);
        });
    });
}*/

/*db.serialize(() => {
    db.each(`SELECT * FROM inventorylist;`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
    });
  });*/

module.exports = {
    'connect': connect,
    'disconnect': disconnect
}