# STORED ROUTINE

- An SQL statement or a set of SQL statement that can be stored on database server which can be call no. of times.

## Types of stored routine
- Stored Procedure
- User Defined Funtions

### Stored Procedure
- Set of SQL statements and procedural logic that can be perform Operations such as inserting,updating,deleting and querying data.

```sql
- CREATE OR REPLACE PROCEDURE <procedure_name> (parameter_name,pareameter_type,...)
LANGUAGE plpgsql
AS $$
BEGIN
    -- procedural code here
END;
$$;

```

```sql
CREATE OR REPLACE PROCEDURE update_emp_salary(
    p_employee_id INT,  -- it is like functions, which accepts parameter,CREATED TWO VARIABLES WHICH WE ARE EXPECTING 
    p_new_salary NUMERIC
)
LANGUAGE plpsql
AS $$
BEGIN
    UPDATE employees
    SET salary = p_new_salary
    WHERE emp_id = p_emloyee_id;
END;
$$;

CALL update_emp_salary(3,71000);
```

### User Defined Functions

- Custom function created by the user to perform specific operations and return a value. 

- In this we get in return 

```sql
CREATE OR REPLACE FUNCTION function_name(parameters)
RETURNS return_type AS $$
BEGIN
    -- Function Body (sql statements)
    RETURN some_value; -- For scalar functions
End;
$$ LANGUAGE plpgsql;

```

- usecase:- Find name of the employees in each department having maximum salary. THIS CAN'T BE DONE BY GROUP BY BECAUSE USING GROUP BY WE GET ONLY DEPT AND MAX SALARY IN EACH DEPARTEMENT BUT WE WANT FULL DETAILS OF THE EMPLOYEES . So this is done by subqueries

```sql
SELECT 
        e.emp_id,
        e.fname,
        e.salary
    FROM
        employees e
    WHERE e.dept = 'HR'
        AND e.salary = (
            SELECT MAX(emp.salary)
            FROM employees emp
            WHERE emp.dept = 'HR'
        );

```
- Now we have to perform this task again and again for every department , so we make its function and we pass only dept in this function 

```sql
CREATE OR REPLACE FUNCTION dept_max_sal_emp(dept_name VARCHAR)
RETURNS TABLE(emp_id INT,fname VARCHAR,salary NUMERIC) 
AS $$
BEGIN
    
    RETURN
    SELECT 
        e.emp_id,
        e.fname,
        e.salary
    FROM
        employees e
    WHERE e.dept = dept_name
        AND e.salary = (
            SELECT MAX(emp.salary)
            FROM employees emp
            WHERE emp.dept = dept_name
        ); 
End;
$$ LANGUAGE plpgsql;

SELECT * FROM dept_max_sal_emp('HR');
```