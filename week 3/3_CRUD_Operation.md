## CRUD Operation

# Creating Table
- a table is a collection of related data held in a table format within a database 

- **CREATE TABLE person (id INT , name VARCHAR(100), city VARCHAR(50));**

- VARCHAR means variable character , varchar(100) means 100 character length

- **\d person** (in command shell ) to check the database 

---

# Inserting data in  table 

- **INSERT INTO person(id,name,city) VALUES (101,'RAJU','Delhi');**
- **INSERT INTO students VALUES (101,"RAHUL");**  only if inserting all the data 

- inserting multiple data 

- **INSERT INTO person(id,name,city) VALUES (101,'RAJU','Delhi'),(103,'PAUL','Chennai');**

---

# Reading Data Table 

- **SELECT * FROM <table_name>**
- **SELECT <column_name> FROM students**
- **SELECT <column_name>,<column_name> FROM students**

---

# Updating Data Table 

- **UPDATE person SET city = 'London' WHERE id = 2;**

# Deleting Data 

- **DELETE FROM person where name = 'Raju';**   It will delete the complete row

# Drawback of current structure 

- if we add duplicate id in this table then it will be inserted , which is problem 

- if we skip one value in the column then automatically it sets the **null**


**To solve these problems we need datatypes and contraints (Primary Key,NOT NULL, default , serial, unique)**