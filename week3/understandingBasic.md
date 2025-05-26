# Database Concepts

## Database

An **organized collection of data**. A method to manipulate and access the data.

---

## Database vs DBMS

- **DBMS** is like a bridge between our app and the database.  
- Examples of DBMS: PostgreSQL, MySQL, Oracle.  
- PostgreSQL takes the data from our app, processes it, and organizes it in the database.

---

## RDBMS

- A type of database system that stores data in **structured tables** (using rows and columns) and uses **SQL** for managing and querying data.

---

## Some Other Databases

- MongoDB  
- Oracle  
- MySQL  
- SQLite  
- PostgreSQL  
- MaxDB  
- Firebird  
- Redis  

---

## SQL vs PostgreSQL

- sql is **Structured Query Language** which is used to talk to our database 
- Example : SELECT * FROM person_db

- PostgreSQL is just a tool 

---

## DB vs Schema vs Tables (we can also see its structure in pgAdmin)

- suppose we have instagram which have database DB which is top level 
- instagram has so many things like **users, profile , followers, profilepic, reels , media ,post** :- so we can group them or categories them using **Schema**

- eg. we have public schema (in pgadmin inside schema) :- in which we set posts , or reels data  . Next we can make one more schema related to users in which we can put users data like his followers,following 

- eg. in public schema , we make two tables one for reels data and one for posts data 



