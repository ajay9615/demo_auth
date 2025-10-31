const mysql = require('mysql2');
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "auth_demo",
    port: process.env.DB_PORT || 3306
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