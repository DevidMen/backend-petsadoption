import mysql from "mysql";

export const db = mysql.createConnection({
  user: "devid",
  host: "localhost",
  password: "Devid123!",
  database: "loginsystem",
  port: "3306",
});
db.connect(function (err) {
  if (err) {
    console.log("error: " + err);
  }
  const mysql =
    "CREATE TABLE  if not exists users(email VARCHAR(45), firstname VARCHAR(45), lastname VARCHAR(45), password VARCHAR(500), phone VARCHAR(45) , biography VARCHAR(45))";
  db.query(mysql, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
});
