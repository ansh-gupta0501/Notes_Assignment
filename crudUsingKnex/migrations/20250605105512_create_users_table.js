
// migrations/YYYYMMDDHHMMSS_create_users_table.js

exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();  // Primary key id, auto-increment integer
    table.string('name').notNullable();  // User's name, required field
    table.string('email').unique().notNullable();  // User's email, required and unique
    table.timestamps(true, true);   // Adds created_at & updated_at columns with timestamps
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');   // Drops the users table (used for rollback)
};
