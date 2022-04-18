import fs from "fs";

async function readUsers() {
  const response = await fs.promises.readFile("src/data/users.json");
  return JSON.parse(response);
}

async function login(email, password) {
  const users = await readUsers();
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  return user;
}

export default { login };
