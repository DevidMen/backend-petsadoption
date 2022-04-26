import { promisify } from "util";
import { db } from "../data/database.js";

async function updatePass(email, hash, loginEmail) {
  const queryIfExist = "SELECT email FROM users WHERE email = '" + email + "'";
  const queryOfInsertingUser = `UPDATE users SET password = "${hash}" WHERE email = "${loginEmail}"`;

  const promiseQuery = promisify(db.query).bind(db);

  const resultIfExist = await promiseQuery(queryIfExist);

  if (resultIfExist.length === 0 || loginEmail === resultIfExist[0].email) {
    const update = await promiseQuery(queryOfInsertingUser);
    console.log(update);
    return update;
  } else {
    return false;
  }
}

export default { updatePass };
