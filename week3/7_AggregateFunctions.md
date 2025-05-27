## Aggregate Functions

- Used to perform calculations on the table or results 
- eg. how to find total no of employees , employee with maxSalary, Average salary of employees 
- count,sum,avg,min,max

# COUNT 

- **SELECT COUNT(emp_id) from employees;** //10
- **SELECT COUNT(fname) from employees;** //10

- **Best practice to use primary key while count**

---

# SUM

- **SELECT SUM(salary) FROM employees;** //give sum of all the salary 

---

# AVG

- **SELECT AVG(salary) FROM employees;** //give avg of all the salary 

---

# MIN

- **SELECT MIN(salary) FROM employees;** //give min of all the salary 

---

# MAX

- **SELECT MAX(salary) FROM employees;** //give max of all the salary 


---

## Exercises

### Find total no. of employees in database (can be done using count function )
### Find no. of employees in each department.(can be done using group by )
### Find lowest salary paying. (can be done using min function)
### Find the data of  highest salary paying person
- **SELECT * FROM employees order by salary desc limit 1** but this will give only 1 person data , if there are multiple person of same salary then this query fails

- **SELECT * FROM employees WHERE salary = (SELECT max(salary) from employees);**

### Find total salary paying in HR department
- **SELECT SUM(salary) from employee WHERE dept = 'HR';**

### Average salary paying in each department