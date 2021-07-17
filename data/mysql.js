import mysql from 'mysql';
import * as path from 'path';
import fs from 'fs';

class DBManager {
    constructor() {
    this.conn = mysql.createConnection({
        host: "localhost",
        user: 'admin',
        password: 'password',
        port: 3306
    });
    let connection=this.conn;
    this.setCurrentDB(function (data) {
        if (data == 'refused') {
        // let queries = fs.readFileSync('./test/dhsqldb.db', { encoding: "UTF-8" }).split(";\n");
        // for (let query of queries) {
        //     query = query.trim();
        //     if (query.length !== 0 && !query.match(/\/\*/)) {
        //     connection.query(query, function (err, sets, fields) {
        //         if (err) {
        //         console.log(`Importing failed for Mysql Database  - Query:${query}`);
        //         } else {
        //         console.log(`Importing Mysql Database  - Query:${query}`);
        //         }
        //     });
        //     }
        // }
        } else if (data == 'connected') {
        console.log(`Connected to Mysql Database  `);
        }
    });
    this.conn.connect(function (err) {
        if (err) {
        console.log(`Mysql Database connection error`);
        } else {
        console.log(`Connected to Mysql Database`);
        }
    });
    }

setCurrentDB(callback) {
this.conn.query(`USE dbname`, function (err, rows) {
    if (err) {
    if (err.errno == 1049) {
        console.log(`${err.sqlMessage} : Failed to connect MySql database`);
        return callback('refused');
    } else {
        console.log(`Mysql Database connection error`);
        return callback('refused');
    }
    } else {
    return callback('connected');
    }
});
}

}
export default new DBManager();