import { promisify } from "util";
import { db } from "../data/database.js";

async function login(email) {
  const query = `select * from users WHERE email = "${email}"`;
  const promiseQuery = promisify(db.query).bind(db);
  const promisedbEnd = promisify(db.end).bind(db);
  const result = await promiseQuery(query);
  promisedbEnd();
  if (result) {
    return result;
  } else {
    return false;
  }
}
export default { login };
