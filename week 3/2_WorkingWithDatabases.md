# Working With Databases

## List down existing databases

- **SELECT Datname FROM pg_database;**
- **\l** (for command line shortcut)

- **SELECT datname FROM pg_database;**
- dataname and pg_database are postgresql system objects not sql keyword 
- pg_database is a sytem table
- datname is a column in that table 

- **select * from pg_database;**

---

## Creating a new Database

- **CREATE DATABASE <db_name>;**

---

## change a database

- **\c <db_name>;**  (in command line )

--- 

## deleting a database 

- **DROP DATABASE <db_name>;**  (rembember to disconnect that database from pgadmin first)

---



