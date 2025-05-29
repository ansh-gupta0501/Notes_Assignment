## DataTypes

- An attribute that specifies the type of data in a column of our database - table 

- **Most widely used are**
- Numeric - INT DOUBLE FLOAT DECIMAL
- String - VARCHAR
- Date - DATE
- Boolean - BOOLEAN

- **DECIMAL(5,2)** WHERE 5 denotes total digit and 2 denotes digit after decimal


| Name           | Storage Size | Description                     | Range                                                                                   |
|----------------|--------------|---------------------------------|-----------------------------------------------------------------------------------------|
| smallint       | 2 bytes     | small-range integer             | -32,768 to +32,767                                                                     |
| integer        | 4 bytes     | typical choice for integer      | -2,147,483,648 to +2,147,483,647                                                      |
| bigint         | 8 bytes     | large-range integer             | -9,223,372,036,854,775,808 to +9,223,372,036,854,775,807                              |
| decimal        | variable    | user-specified precision, exact | up to 131,072 digits before the decimal point; up to 16,383 digits after the decimal   |
| numeric        | variable    | user-specified precision, exact | up to 131,072 digits before the decimal point; up to 16,383 digits after the decimal   |
| real           | 4 bytes     | variable-precision, inexact    | 6 decimal digits precision                                                             |
| double precision | 8 bytes   | variable-precision, inexact    | 15 decimal digits precision                                                            |
| smallserial    | 2 bytes     | small autoincrementing integer | 1 to 32,767                                                                            |
| serial         | 4 bytes     | autoincrementing integer       | 1 to 2,147,483,647                                                                     |
| bigserial      | 8 bytes     | large autoincrementing integer | 1 to 9,223,372,036,854,775,807                                                        |

---

## Constraint

- It is a rule applied to a column

# Primary Key

- The PRIMARY KEY constraint uniquely identifies each record in a table.
- Primary Keys must contain UNIQUE values, and cannot contain NULL values.
- A table can have only ONE primary Key.

# NOT NULL

- **CREATE TABLE customers(id INT NOT NULL, name VARCHAR(100) NOT NULL);**

# DEFAULT VALUE

- **CREATE TABLE customers(acc_no INT PRIMARY KEY, name VARCHAR(100) NOT NULL, acc_type VARCHAR(50) NOT NULL DEFAULT 'Savings');**

# AUTO_INCREMENT(for sequence ) (SERIAL :- A datatype)

- **CREATE TABLE employees(id SERIAL PRIMARY KEY, firstname VARCHAR(50) lastname VARCHAR(50))**

# CHECK
- use case - used for data validation like phone no etc. 
- we add condtion in check 
- **CREATE TABLE contacts(name VARCHAR(50), mob VARCHAR(15) UNIQUE CHECK (LENGTH(mob) >= 10));**

- **ALTER TABLE person ADD COLUMN mob VARCHAR(15) CHECK (LENGTH(mob) > = 10);**

### Named Constraint :- Its benefit is that if any error we get it in console by constraint name 

```sql
CREATE TABLE contacts(
    name VARCHAR(50),
    mob VARCHAR(15) UNIQUE,
    CONSTRAINT mob_no_less_than_10digits CHECK (LENGTH(mob) >= 10)
);
```



