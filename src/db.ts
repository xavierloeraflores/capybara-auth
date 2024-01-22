const mysql = require("mysql");
export const connection = mysql.createConnection(process.env.DATABASE_URL);
