import mysql from "mysql";
import dotenv from 'dotenv'
dotenv.config()

export const db = mysql.createPool({
  limit: 100,
  user: process.env.USERSQL,
  host: process.env.HOST,
  password: process.env.PASSWORDSQL,
  database: process.env.DATABASENAMESQL,
  port: "3306",
});
db.getConnection(function (err,connection) {
  if (err) {
 
  }
  connection.release();
  const users =
    "CREATE TABLE  if not exists users(email VARCHAR(45), firstname VARCHAR(45), lastname VARCHAR(45), password VARCHAR(500), phone VARCHAR(45) , biography VARCHAR(45), role VARCHAR(45))";
    const pets =
    "CREATE TABLE  if not exists pets(petsId INT NOT NULL AUTO_INCREMENT,type VARCHAR(45), namePets VARCHAR(45), color VARCHAR(45), hypo VARCHAR(45), breed VARCHAR(45) , biography VARCHAR(45), dietary VARCHAR(45), adoptionStatus VARCHAR(45), weight INT, height INT,image VARCHAR(500) ,owner VARCHAR(250) ,PRIMARY KEY (petsId))";
    const savePets =
    "CREATE TABLE if not exists savepets(petsId VARCHAR(45), email VARCHAR(45))"
  db.query(users, function (err, result) {
    if (err) {

    }
  });
  db.query(pets, function (err, result) {
    if (err) {

    }
  });
  db.query(savePets, function (err, result) {
    if (err) {

    }
  });
});
