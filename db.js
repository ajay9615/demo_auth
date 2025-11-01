const mysql = require('mysql2');
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DATABASE || "auth_demo",
    port: process.env.PORT || 3306
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