## What is a migration?

- A migration is a JavaScript file that defines changes to your database schema.

- It allows you to version-control database changes (like adding tables, columns, indexes).

- You write two functions in a migration file:

- exports.up: Defines what changes to apply (e.g., create a table).

- exports.down: Defines how to rollback those changes (e.g., drop the table)