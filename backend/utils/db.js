/*connection with mysql database-  the leavems database*/
import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "leavems",
    port:"3307"
})

con.connect(function(err) {
    if(err) {
        console.log("Connection error")
    } else {
        console.log("Connected")
    }

})

export default con;

