### Introduction to Prisma ORM

- Prisma is an open source ORM(Object relational Mapping ) tool for Node js and typescript that simplifies database interaction

- It helps you interact with database using a type-safe query builder and eliminates the need to write raw SQL Queries.

- Prisma provides Prisma Client, a powerful auto-generated query builder and prisma Migrate for database schema migrations.

- **Prisma Client** - Auto-generated and type-safe database client.
- **Prisma Migrate** - Declarative data modelling and customizable migrations
- **Prisma studio** - Modern UI to view and edit your application data

### Migrations In ORM
- As you know that, SQL based databases require you to assign schema which you can't do while backend is running; you have to do beforehand. Migrations is for that 

- Migration is the process of evolving and managing changes to a database schema over time.

- It involves creating, modifying, or deleting tables,columns and relationship in the database.

- In prisma, migrations are stored as versioned SQL script files.

- Migrations help ensure the database stuructures stay consistent according to environments(eg. development , staging , production)

- Prisma Migrate generates and applies migrations automatically based on changes in the Prisma Schema.


- creating our model or schema or table 

```prisma
model User{
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?                                  // it means optional 
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt      // @updatedAt will automatically update the data 
}
```

### Migrate it
- Now run **npx prisma migrate dev** to create migration files and push it.
- you can pass **-name** flag with it to include name: **npx prisma migrate dev -name init** init is just a name you can write anything
- In production, you can run **npx prisma migrate deploy** to run migrations files.
- You can also include both of them in package.json scrips.

- **generate is called under the hood by default, after running prisma migrate dev. If the prisma-client-js generator is defined in your schema, this will check if @prisma/client is installed and install it if it's missing. Great, you now created three tables in your database with Prisma Migrate**

### Prisma Client
- You have to install separate package for querying with prisma
- Prisma Client is an auto- generated database client for javascript/typescript
- It provides an easy-to-use API to interact with the database without writing raw SQL queries
- Generated based on the schema.prisma file that defines models and database configurations.
- Prisma client is type-safe, offering TypeScript support to prevent
- Features include querying(find,create,update delete) and handle relationships.


---
- Run **npx prisma generate** to generate Prisma Client after defining schema
- **npx prisma generate** is automatically executed when running 
- It can also be run manually if the schema is updated outside of 


- Whenever you update your Prisma schema, you will have to update your database schema using either **prisma migrate dev** or **prisma db push**. This will keep your database schema in sync with your Prisma schema. These commands will also run prisma generate under the hood to re-generate your Prisma Client



---

# Summary 

## Prisma Client
- It is an auto- generated query builder for your database. It lets you perform CRUD operations (Create,Read,Update,Delete) on your database using javascript/typescript with type safety and autocomplete.

- Whenever you want to interact with your database in you app code, you use it

- You generate it by running **npx prisma generate**. This creates the client based on your prisma schema.

- This command generates the prisma client code based on your current prisma schema.

### when to use this command ?
- When you first set up prisma client.
- After changing your prisma schema (eg. after migrations)
- If you manually update your schema or want to refresh prisma client for any reason without migrating.

### Note :- npx prisma migrate dev runs this automatically after migration



## Prisma Migrate
- It is a tool for managing database schema migrations. When you change you prisma Schema (like adding a model or field), you use prisma migrate to create and apply those changes safely to your database.

- When you change your Prisma Schema and want you to update your database structure accordingle.
- To track schema changes with migrations files, which you can version-control.

- **npx prisma migrate dev** command is used in development to create and apply migrations based on your prisma schema changes, and also updated your prisma client.

### What happens after this command :- 
- It compares your current schema with the previous migration
- creates a new migration file if there are changes.
- Applies the migration to your database.
- Regenerates prisma client so your app reflects the latest schema

- We use this command everytime you change your prisma schema during development and want to apply those changes to your database immediately.


## prisma db push

- This command pushes your prisma schema state directly to the database without generating migration files.

### When to use this?
- For quick prototyping or development, when your database to match your schema but don't care about migration history or versin control. 
- When you want to syn the database with your prisma schema immediately without creating migrations.

### Note :- This does not create migrations files, so it's not recommended for production or projects where you want schema version control 




| Command / Tool               | Purpose                                      | When to Use                                      |
| ---------------------------- | -------------------------------------------- | ------------------------------------------------ |
| **Prisma Client**            | Auto-generated DB client for queries         | Always in your app code to interact with DB      |
| **Prisma Migrate**           | Manage DB schema migrations                  | When schema changes and you want migration files |
| **`npx prisma migrate dev`** | Create and apply migration + generate client | Development; after every schema change           |
| **`npx prisma generate`**    | Generate Prisma Client code                  | When you need to regenerate client manually      |
| **`prisma db push`**         | Push schema to DB without migration          | Fast prototyping; no migration history needed    |



---

# Database Seeding?
- Seeding a database means inserting initial data into tables after the database schema (tables, columns, relationships) has been created.

- This initial data can be default settings, sample records, test data, or anything necessary to get your app started and working properly.

- Why seed a PostgreSQL database?
- To have meaningful data during development or testing without manually adding it every time.

- To ensure consistency across environments (development, staging, production).

- To populate lookup/reference tables (e.g., list of countries, user roles).

- How do you seed data in PostgreSQL?
- You write SQL INSERT statements to add rows to tables.

- These can be run manually using psql or automated in scripts or migration tools.

- In many web frameworks (like Django, Rails, Node.js with Sequelize, etc.), there are seed scripts or seeding tools that automate running these inserts.


Absolutely! Here’s a detailed explanation of **introspection** in the context of Prisma:

---

## What is **Introspection** in Prisma?

**Introspection** is the process where Prisma **reads your existing database schema** and automatically generates the Prisma schema file (`schema.prisma`) based on that.

---

### Why use introspection?

* You already have a **database with tables and relationships**, but no Prisma schema.
* You want Prisma Client to work with that existing database without manually writing the whole schema.
* Introspection saves you time and avoids errors by generating the Prisma models automatically to match your database.

---

### How does Prisma introspection work?

When you run:

```bash
npx prisma db pull
```

Prisma connects to your database and:

* Reads all tables, columns, indexes, relationships, constraints, enums, and types.
* Creates a `schema.prisma` file (or updates it) with models that reflect your database schema.
* Infers field types, relations (`@relation`), and other metadata.

---

### What do you get after introspection?

* A Prisma schema that maps exactly to your existing database.
* Models with fields matching your table columns.
* Relations mapped as Prisma relations (`@relation`).
* Enum types generated if your DB uses enums.

---

### Typical use cases for introspection:

* You have a legacy or existing database and want to add Prisma on top.
* You work with a database someone else created.
* You want to sync your Prisma schema with changes made directly in the database.

---

### Example flow:

1. Connect to your database (defined in `.env` with `DATABASE_URL`).

2. Run:

   ```bash
   npx prisma db pull
   ```

3. Prisma introspects the DB and updates `schema.prisma`.

4. You can now generate Prisma Client:

   ```bash
   npx prisma generate
   ```

5. Use Prisma Client in your app with the introspected schema.

---

### Important notes:

* Introspection **does not modify your database**, only reads it.
* If you change the database directly later, run `prisma db pull` again to update your Prisma schema.
* You can still customize the generated schema manually after introspection.

---

### Summary:

| What is it? | Reading an existing DB to generate Prisma schema automatically. |
| ----------- | --------------------------------------------------------------- |
| Command     | `npx prisma db pull`                                            |
| Purpose     | Save time, avoid manual schema writing, sync Prisma with DB     |
| Result      | Updated `schema.prisma` with models and fields matching the DB  |
| Use case    | Existing databases, legacy schemas, collaborative projects      |

---
