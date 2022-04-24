import db from "../data/db.js";
import bcrypt from "bcrypt";

async function login(username, password) {
  const user = await db("users").where({ username }).first();
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  } else {
    return false;
  }
}

export default { login };
