const mysql = require('mysql2');
require('dotenv').config();

// Detect environment automatically
const isProduction = process.env.RAILWAY_ENVIRONMENT_NAME !== undefined;

const dbConfig = isProduction
    ? {
        host: process.env.DB_HOST || "mysql.railway.internal",
        user: process.env.DB_USERNAME || process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DATABASE || process.env.DB_NAME || "railway",
        port: process.env.DB_PORT || 3306,
    }
    : {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DATABASE || "auth_demo",
        port: process.env.DB_PORT || 3306,
    };

const db = mysql.createConnection(dbConfig);

db.connect((error) => {
    if (error) {
        console.log("❌ Database not connected:", error.message);
    } else {
        console.log("✅ Database connected successfully");
        console.log("🔹 Environment:", isProduction ? "Railway" : "Local (XAMPP)");
    }
});

module.exports = db;


// const mysql = require('mysql2');
// require('dotenv').config();

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.DB_PORT
// });

// db.connect((error) => {
//     if (error) {
//         console.log("❌ Database not connected:", error.message);
//     } else {
//         console.log("✅ Database connected successfully!");
//     }
// });

// module.exports = db;



// const mysql = require('mysql2');
// require('dotenv').config();
// const db = mysql.createConnection({
//     host: process.env.DB_HOST || "localhost",
//     user: process.env.DB_USERNAME || "root",
//     password: process.env.DB_PASSWORD || "",
//     database: process.env.DATABASE || "auth_demo",
//     port: process.env.PORT || 3306
// });

// db.connect((error) => {
//     if (error) {
//         console.log("database not connected");
//     }
//     else {
//         console.log("database connected successfully");
//     }

// });
// module.exports = db;