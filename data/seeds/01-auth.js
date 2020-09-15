exports.seed = function (knex) {
  const users = [
    {
      username: "test",
      department: "testing",
      password: "password",
    },
    {
      username: "test2",
      department: "testing",
      password: "password",
    },
  ];
  return knex("users")
    .insert(users)
    .then(() => console.log("== Seed data for roles table added. =="));
};
