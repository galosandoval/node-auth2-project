const db = require("../data/connection");
const jwt = require("jsonwebtoken");

module.exports = {
  add,
  findBy,
  find,
  makeJwt,
};

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");
    return findById(id);
  } catch (error) {
    throw error;
  }
}

function find() {
  return db("users").select("users.username", "users.department");
}

function findById(id) {
  return db("users").where({ id }).first();
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

function makeJwt(user) {
  const payload = {
    id: user.id,
    username: user.username,
    department: user.department,
  };

  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

  const options = {
    expiresIn: "8h",
  };

  return jwt.sign(payload, secret, options);
}
