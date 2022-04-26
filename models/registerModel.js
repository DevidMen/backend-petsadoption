import { promisify } from "util";
import { db } from "../data/database.js";

async function signUp(email, firstname, lastname, hash, phone) {
  const queryIfExist = "SELECT email FROM users WHERE email = '" + email + "'";
  const queryOfInsertingUser = `INSERT INTO users (email,firstname, lastname, password, phone) VALUES ("${email}", "${firstname}", "${lastname}", "${hash}", "${phone}")`;
  const promiseQuery = promisify(db.query).bind(db);
  const resultIfExist = await promiseQuery(queryIfExist);

  if (resultIfExist) {
    const inserting = await promiseQuery(queryOfInsertingUser);
    return inserting;
  } else {
    return false;
  }
}

export default { signUp };
