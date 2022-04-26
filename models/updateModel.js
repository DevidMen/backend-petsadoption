import { promisify } from "util";
import { db } from "../data/database.js";

async function update(
  biography,
  email,
  firstname,
  lastname,
  phone,
  loginemail
) {
  const queryIfExist = "SELECT email FROM users WHERE email = '" + email + "'";
  const queryOfInsertingUser = `UPDATE users SET biography = "${biography}", email = "${email}" , firstname = "${firstname}" , lastname = "${lastname}" , phone = "${phone}" WHERE email = "${loginemail}"`;

  const promiseQuery = promisify(db.query).bind(db);

  const resultIfExist = await promiseQuery(queryIfExist);

  if (resultIfExist.length === 0 || loginemail === resultIfExist[0].email) {
    const update = await promiseQuery(queryOfInsertingUser);
    console.log(update);
    return update;
  } else {
    return false;
  }
}

export default { update };
