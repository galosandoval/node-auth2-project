exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();

    tbl.string("username", 128).unique().notNullable().index();

    tbl.string("password", 128).notNullable();

    tbl.string("department").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
