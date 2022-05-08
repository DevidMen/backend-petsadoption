import { promisify } from "util";
import { db } from "../data/database.js";
const promiseQuery = promisify(db.query).bind(db);
const query = `SELECT * from users WHERE email = ?`;
const queryIfExist = "SELECT email FROM users WHERE email = ?";
async function login(email) {
  const result = await promiseQuery(query, [email]);

  if (result) {
    return result;
  } else {
    return false;
  }
}
async function checkAdmin(email) {

    const queryAllUsers = "SELECT * FROM users";
    const promiseQuery = promisify(db.query).bind(db);
    const resultIfExist = await promiseQuery(query, [email]);
    if (resultIfExist[0].role === "admin") {
      const allUsers = await promiseQuery(queryAllUsers);

      return allUsers;
    } else {
      return false;
    }
  }

async function getToken(email) {
  const resultIfExist = await promiseQuery(query, [email]);

  if (resultIfExist) {
    return resultIfExist;
  } else {
    return false;
  }
}

async function signUp(email, firstname, lastname, hash, phone) {
  const queryOfInsertingUser = `INSERT INTO users (email,firstname, lastname, password, phone, role) VALUES (?,?,?,?,?,?)`;
  const statusrole = "user"
  const resultIfExist = await promiseQuery(queryIfExist, [email]);

  if (resultIfExist) {
    const inserting = await promiseQuery(queryOfInsertingUser, [
      email,
      firstname,
      lastname,
      hash,
      phone,
      statusrole
    ]);
    return inserting;
  } else {
    return false;
  }
}

async function update(
  biography,
  email,
  firstname,
  lastname,
  phone,
  loginemail
) {
  const queryOfInsertingUser =
    "UPDATE users SET biography = ? , email = ? , firstname = ? , lastname = ? , phone = ? WHERE email = ?";

  const resultIfExist = await promiseQuery(queryIfExist, [email]);

  if (resultIfExist.length === 0 || loginemail === resultIfExist[0].email) {
    const update = await promiseQuery(queryOfInsertingUser, [
      biography,
      email,
      firstname,
      lastname,
      phone,
      loginemail,
    ]);

    return update;
  } else {
    return false;
  }
}

async function updatePass(email, hash, loginEmail) {
  const queryOfInsertingUser = `UPDATE users SET password = ? WHERE email = ?`;

  const promiseQuery = promisify(db.query).bind(db);
  const resultIfExist = await promiseQuery(queryIfExist, [email]);

  if (resultIfExist.length === 0 || loginEmail === resultIfExist[0].email) {
    const update = await promiseQuery(queryOfInsertingUser, [hash, loginEmail]);

    return update;
  } else {
    return false;
  }
}



export default { updatePass, update, login, signUp, getToken , checkAdmin};
