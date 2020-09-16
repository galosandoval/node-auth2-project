const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const { makeJwt } = require("./users-model");
const User = require("./users-model");
const isValid = require("./users-service");
const restricted = require('./restricted-middleware')

router.post("/register", (req, res) => {
  const newUser = req.body;
  if (isValid(newUser)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcryptjs.hashSync(newUser.password, rounds);

    newUser.password = hash;

    User.add(newUser)
      .then((user) => {
        const token = User.makeJwt(user);
        res.status(201).json({ data: user, token });
      })
      .catch((error) => res.status(500).json({ error: error.message }));
  } else {
    res.status(400).json({ message: "please provide username and pw" });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (isValid(req.body)) {
    User.findBy({ username: username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeJwt(user);
          res.status(200).json({ message: "welcome to our api", token });
        } else {
          res.status(401).json({ message: "invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({ message: "please provide username and password" });
  }
});

router.get("/users", restricted, (req, res) => {
  User.find().then((users) => {
    res.status(200).json(users);
  });
});

module.exports = router;
