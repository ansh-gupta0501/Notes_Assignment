# Some Additional Topics

## CASE EXPRESSION

- usecase :- it is like if/else or switch case , it is used in situations like : we have a table in which we have salary columns , we want a new column salary category in which we have values like low salary , high salary based on salary . So it is done by CASE EXPRESSION

```SQL
select fname,salary,
CASE
    WHEN salary >= 50000 THEN 'HIGH'
    ELSE 'LOW'
END AS sal_cat     
FROM 
    employees;
```

- sal_cat is the column name we want to add 
- employees is table name 
- fname,salary are two column in the table 
- inside case , we add a condition that if salary > 500000 then high else low 

- its output will be like 

| fname | salary  | sal_cat |
|-------|---------|---------|
| Raj   | 50000.00| HIGH    |
| Priya | 45000.00| LOW     |
| Arjun | 55000.00| HIGH    |
| Suman | 60000.00| HIGH    |
| Kavita| 47000.00| LOW     |
| Amit  | 52000.00| HIGH    |
| Neha  | 48000.00| LOW     |
| Rahul | 53000.00| HIGH    |
| Anjali| 6100000.| HIGH    |
| Vijay | 5000000.| HIGH    |


- We can also add multiple conditions also 

```SQL
select fname,salary,
CASE
    WHEN salary >= 50000 THEN 'HIGH'
    WHEN salary >= 40000 AND salary < 50000 THEN 'MID'
    ELSE 'LOW'
END AS sal_cat     
FROM 
    employees;
```

- Another Example

```sql
select fname,salary,
CASE
    WHEN salary >= 0 THEN ROUND(salary * 0.10)
END AS bonus     
FROM 
    employees;
```

- Another Example

```SQL
select
CASE
    WHEN salary >= 55000 THEN 'HIGH'
    WHEN salary BETWEEN 48000 AND 55000 
        THEN 'MID'
    ELSE 'LOW'
END AS sal_cat, COUNT(emp_id)    
    FROM employees
    GROUP BY sal_cat;
```
- this will give output like

| sal_cat | count  | 
|---------|--------|
| MID     |       6|  
| HIGH    |       2|
| LOW     |       2|

