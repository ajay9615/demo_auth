const mysql = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "auth_demo"
});

db.connect((error) => {
    if (error) {
        console.log("database not connected");
    }
    else {
        console.log("database connected successfully");
    }

});
module.exports = db;