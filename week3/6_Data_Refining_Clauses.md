## Clauses

- when we are executing sql queries along with some conditions(where,distinct,order by,limit,like) then these are called clauses

# Where

- it is used in update or delete . Used to fetch specific data , can be used with any column. Can be used with relational operator and logical operator

- **SELECT * from employees WHERE emp_id = 5;**  -- it will give all columns with single row where emp_id is 5

- **SELECT * from employees where dept = 'HR';**  -- it will give 2 rows as 2 rows have dept HR

- **SELECT * from employees WHERE salary >= 50000;** -- give all the rows which has salary value greater than 50000

- **SELECT * from employees WHERE dept = 'HR' or dept = 'Finance';** -- give all the rows which has dept either hr or finance

- **SELECT * from employees WHERE dept = 'IT' AND salary > 50000;** -- it matches both the condition

### RELATIONAL OPERATORS
- < Less than
- > greater than
- <= Less than or equal to 
- >= greater than or equal to 
- = equal to 
- != not equal to 

### Logical operators
- AND  when both conditions true
- OR   when one condition true
- IN   (**SELECT * FROM employees WHERE dept IN('IT','HR','Finance');**) it works as multiple OR , means it matches the result in list 
- NOT IN  (opposite to IN)
- BETWEEN (eg. find employees whose salary is more than 40 and less than 65 , we can use realational operator also like >40 <65 , but instead we can use BETWEEN  )(**SELECT * FROM employees WHERE salary BETWEEN 40000 AND 65000;** BOTH ARE INCLUDED )


---

# DISTINCT (SELECT DISTINCT fname FROM employees;) 

- DISTINCT means to get unique values
- eg. we use query **SELECT dept FROM employees;** , it will give all dept with duplicates also 
- But we want , **unique dept in the bank** , so for this we use query 
- **SELECT DISTINCT dept FROM employees;** 

---

# ORDER BY (used for sorting of data )(by default in asc)

- **SELECT * FROM employees ORDER BY fname;** // it sorts the data in by fname in ascending order 
- **SELECT * FROM employees ORDER BY fname DESC;**

---
 
# LIMIT (used to show limited no of data )(SELECT * FROM employees LIMIT 3;)

- **SELECT * FROM employees LIMIT 3** show starting 3 data ;

---

# LIKE (SELECT * FROM employees WHERE dept LIKE "%Acc%");

- this is used to find pattern (not exact values )
- **SELECT * FROM employees WHERE fname LIKE 'A%';**  select all employees whose fname starts with A . After A there can be any number of characters 
- % means any number of characters
- **SELECT * FROM employees WHERE fname LIKE '%a';** ends with A
- **SELECT * FROM employees WHERE fname LIKE '%i%'** fname which contains letter i
- **SELECT * FROM employees WHERE fname LIKE '_A%'** SECOND character is 'A'

- to find dept which having only 2 characters 
- **SELECT * from employees WHERE fname LIKE '__'** _ represents single character 

---

# GROUP BY

- use case :- we can found the count of all dept in the table using count aggregate function but to find no. of employees in each department we need to use group By

- For grouping , we need comman subject like in this table eg. we can group by using dept

- **SELECT * FROM employees GROUP BY dept**;
- this gives error because can't use * with group by , use column name

- **SELECT dept FROM employees GROUP BY dept**;   // we make 4 groups 

- now we find how many people in each group/dept (using count)

- **SELECT dept, COUNT(emp_id) FROM employees GROUP BY dept**;

- now we find total salary in each department 

- **SELECT dept, SUM(salary) FROM employees GROUP BY dept**;


## EXERCISES

### Find different type of departments in database  (can be done by distinct)
### Display records with High-Low salary 
- **SELECT * FROM employees ORDER BY salary DESC;**
### How to see only top 3 records from a table (can be done by limit)
### Show records where first name start with letter 'A' (can be done using LIKE)
### Show records where length of the lname is 4 characters (can be done using length function or like function )