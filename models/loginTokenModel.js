import { promisify } from "util";
import { db } from "../data/database.js";

async function getToken(decode) {
  const queryIfExist =
    "SELECT * FROM users WHERE email = '" + decode.email + "'";
  const promiseQuery = promisify(db.query).bind(db);
  const resultIfExist = await promiseQuery(queryIfExist);

  if (resultIfExist) {
    return resultIfExist;
  } else {
    return false;
  }
}

export default { getToken };
