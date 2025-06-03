# Window Functions
- Window Functions, also knows as analytic functions allow you to perform calculations across a set of rows related to the current row.

- Defined by an OVER() clause.

- We can also perform calculators using Aggregate functions like **SELECT SUM(salary) FROM employees;** But it will give only single output like 547000.00 , hides all the other rows . Here over clause comes 

- **SELECT SUM(salary) OVER() FROM employees;**
- OVER () associates the sum(salary) with all the data rows in the table 
- OUTPUT:- 
```sql
547000.00
547000.00
547000.00
547000.00
547000.00
547000.00
547000.00
547000.00
```

- **SELECT fname ,salary , SUM(salary) OVER() FROM employees;**
- **SELECT fname ,salary , SUM(salary) OVER(ORDER BY salary) FROM employees;** - it gives the running sum 




