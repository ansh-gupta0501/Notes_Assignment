# RELATIONSHIP
- Connecting multiple tables together 

## Types of Relationship
- One to One
- One to Many
- Many to Many

### One to One

### Employees Table
| emp_id | name | dept    |
|--------|------|---------|
| 101    | Raju | IT      |
| 102    | Sham | Finance |

### Employee Details Table
| emp_id | addr     | City   | phone      | title       |
|--------|----------|--------|------------|-------------|
| 101    | CP       | Delhi  | 9090909090 | Manager     |
| 102    | Bhandup  | Mumbai | 9020202000 | Accountant  |

- In both tables , there is only one data for particular person, this is called One to One

### One To Many 

### Employees Table
| emp_id | name | dept    |
|--------|------|---------|
| 101    | Raju | IT      |
| 102    | Sham | Finance |

### Employee Task Table
| emp_id | task_no | task_detail                |
|--------|---------|----------------------------|
| 101    | TS-1    | Opening account for Ram    |
| 102    | TS-2    | Closing account for Neru   |
| 101    | TS-3    | Loan sanction              |

- In this , second table contains multiple data for particular persion raju so it is one to many 

### Many to Many 

- Suppose there is Book A which is made by 2 authors Author A , Author B . But Author A has also made three more books(Book B, Book c , Book D ). So it is many to many one book has 2 author and one author has multiple books


---

# FOREIGN KEY 

- if in a table we use primary key of another table then this key is called Foreign key 

### Employees Table
| emp_id | name | dept    |
|--------|------|---------|
| 101    | Raju | IT      |
| 102    | Sham | Finance |

### Employee Task Table
| emp_id | task_no | task_detail                |
|--------|---------|----------------------------|
| 101    | TS-1    | Opening account for Ram    |
| 102    | TS-2    | Closing account for Neru   |
| 101    | TS-3    | Loan sanction              |

- In Employees Table , emp_id is primary key 
- In Empoyee Task Table , we are using emp_id of Employees Table , so this emp_id in Employee Task Table is now become Foreign Key 

## Practical Example Of Foreign Key 

- Making two tables 

```sql
CREATE TABLE customers(
    cust_id SERIAL PRIMARY KEY,
    cust_name VARCHAR(100) NOT NULL
);
```

```sql
CREATE TABLE orders(
    ord_id SERIAL PRIMARY KEY,
    ord_date DATE NOT NULL,
    price NUMERIC NOT NULL,
    cust_id INTEGER NOT NULL,
    FOREIGN KEY (cust_id) REFERENCES
    customers(cust_id)
);
```

### Inserting data 

- Customers **INSERT INTO customers(cust_name) VALUES ('Raju'),('Sham'),('Paul'),('Alex');**

- Orders **INSERT INTO orders(ord_date,cust_id,price) VALUES ('2024-01-01',1,250.00),('2024-01-15',1,300.00),('2024-01-01',2,150.00),('2024-03-01',3,450.00),('2024-04-04',2,550.00);**


- if we describe customers table in command shell , we see it will be writte **Referenced By Orders table**
- Which denotes these these two tables are not connected with each other 