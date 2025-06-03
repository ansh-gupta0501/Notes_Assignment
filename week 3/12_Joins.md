# Joins

- When we maintain relationship between two tables , then instead of seeing data of tables individually , we can see combined data using JOINS

- Join operation is used to combine rows from two or more tables based on a related column between them.

## Types of Join
- Cross Join
- Inner Join
- Left Join
- Right Join

### Cross Join
- Every row from one table is combined with every row from another table
- It show all the possible combinations
- **SELECT * FROM customers CROSS JOIN orders;**  Joins two tables customers and orders made in 11_ part

- This will show the data of both tables like-

- A CROSS JOIN produces the Cartesian product of the two tables.

- That means every row from the first table is combined with every row from the second table.

- If the first table has m rows and the second has n rows, the result will have m × n rows.

- What happens with SELECT * FROM customers CROSS JOIN orders;?
- There are 4 customers and 5 orders.

- The CROSS JOIN will produce 4 × 5 = 20 rows.

- Each customer will be paired with each order, regardless of whether the order belongs to that customer or not.


```sql
 cust_id | cust_name | ord_id | ord_date   | price  | cust_id 
---------+-----------+--------+------------+--------+---------
       1 | Raju      |      1 | 2024-01-01 | 250.00 |       1
       2 | Sham      |      1 | 2024-01-01 | 250.00 |       1
       3 | Paul      |      1 | 2024-01-01 | 250.00|        |
       . . .
(20 rows)
```


**Important Notes:**
- The CROSS JOIN does not filter rows by the foreign key relationship.


### Inner Join
- Returns only the rows where there is a match between the specified columns in both the left(or First) and right(or second) tables given in the query . 


- **SELECT * FROM customers INNER JOIN orders;**  this will give error because in inner join we need to tell on what basis we are joining 


- **SELECT * FROM customers c INNER JOIN orders o ON c.cust_id = o.cust_id;** 
"cust_id"	"cust_name"	"ord_id"	"ord_date"	    "price"	"cust_id-2"
    1	        "Raju"	    1	    "2024-01-01"	250.00	    1
    1	        "Raju"	    2	    "2024-01-15"	300.00	    1
    2	        "Sham"	    3	    "2024-01-01"	150.00	    2
    3	        "Paul"	    4	    "2024-03-01"	450.00	    3
    2	        "Sham"	    5	    "2024-04-04"	550.00	    2

### Inner Join With Group By 
- **Select c.cust_name , COUNT(o.ord_id) FROM customers c INNER JOIN orders o ON c.cust_id = o.cust_id GROUP BY cust_name;**
- **Select c.cust_name , SUM(o.price) FROM customers c INNER JOIN orders o ON c.cust_id = o.cust_id GROUP BY cust_name;**

"cust_name"	"sum"
"Paul"	450.00
"Sham"	700.00
"Raju"	550.00

### Left Join
- Returns all rows from the left (or first) table and the matching rows from the right(or second) table

- **SELECT * FROM customers c LEFT JOIN orders o ON c.cust_id = o.cust_id;**

"cust_id"	"cust_name"	"ord_id"	"ord_date"	    "price"	"cust_id-2"
    1	        "Raju"	    1	    "2024-01-01"	250.00	    1
    1	        "Raju"	    2	    "2024-01-15"	300.00	    1
    2	        "Sham"	    3	    "2024-01-01"	150.00	    2
    3	        "Paul"	    4	    "2024-03-01"	450.00	    3
    2	        "Sham"	    5	    "2024-04-04"	550.00	    2
    4	        "Alex"	    null        null        null        null			

### Right Join

- **SELECT * FROM customers c RIGHT JOIN orders o ON c.cust_id = o.cust_id;**

"cust_id"	"cust_name"	"ord_id"	"ord_date"	    "price"	"cust_id-2"
    1	        "Raju"	    1	    "2024-01-01"	250.00	    1
    1	        "Raju"	    2	    "2024-01-15"	300.00	    1
    2	        "Sham"	    3	    "2024-01-01"	150.00	    2
    3	        "Paul"	    4	    "2024-03-01"	450.00	    3
    2	        "Sham"	    5	    "2024-04-04"	550.00	    2