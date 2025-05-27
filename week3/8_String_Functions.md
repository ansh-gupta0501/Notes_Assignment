## String Functions

- CONCAT,CONCAT_WS
- SUBSTR
- LEFT,RIGHT
- LENGTH
- UPPER,LOWER
- TRIM,LTRIM,RTRIM
- REPLACE
- POSITION
- STRING_AGG


# CONCAT (connect two or more words )
- CONCAT(first_col,sec_col)
- CONCAT(first_word,sec_word,...)

- **SELECT CONCAT('Hello','World');** // HelloWorld

- **SELECT CONCAT(fname,lname) from employees;** 

- Using alias in concat(alias is temporary name)

- **SELECT CONCAT(fname,lname) As FullName from employees;**  // store the result of concat in new column FullName 

- **SELECT emp_id,CONCAT(fname,lname) As FullName ,dept from employees;**  // show all the three columns , id , fullname ,dept

- giving space between fname and lname (two ways )
- **SELECT emp_id,CONCAT(fname,' ',lname) As FullName ,dept from employees;**

# CONCAT_WS(CONCAT WITH SEPARATOR)

- **SELECT emp_id,CONCAT_WS('-',fname,lname) As FullName ,dept from employees;**

# SUBSTRING

- **SELECT SUBSTRING('Hey Buddy',1,4);**
- **SELECT SUBSTR('Hey Buddy',1,4);**

# REPLACE (REPLACE A VALUE)
- REPLACE(str,from_str,to_str);
- REPLACE('hey buddy','hey','hello')  // replace hey buddy to hello buddy 

- **SELECT REPLACE(dept,'IT','TECH') FROM employees;**  // it will replace all it to tech in dept column and show the result 

# REVERSE

- **SELECT REVERSE('Hello')**  // olleh
- **SELECT REVERSE('fname') from employees;** // it will show all the fname in reverse order 

# LENGTH
- **SELECT LENGTH('Hello');** //5
- **SELECT LENGTH(fname) from employees;**  // shows the length of fname of all employees

- **SELECT * FROM employees WHERE LENGTH(fname) > 5;**

# UPPER & LOWER

- **SELECT UPPER('Hello World');**
- **SELECT LOWER('Hello World');**

- **SELECT UPPER(fname) from employee;** // convertes to uppercase 
- **SELECT LOWER(fname) from employee;** // convertes to LOWERCASE

# LEFT & RIGHT 

- **SELECT LEFT('Abcdefghij',3);**  // Abc // 3 characters from left
- **SELECT RIGHT('Abcdefghij',4);** // ghij //4 characters from right

# TRIM

- **SELECT TRIM('    Alright!    ');** //Alright! //remove whitespaces 
- **SELECT LENGTH(TRIM('    Alright!    '))** //8

# POSITION

- **SELECT POSITION('OM' in 'Thomas');** //3 AS O starts from 3 // find the position of a word in a long string 


---

## EXERCISES

###  1:Raju Sharma:IT:50000

- **SELECT CONCAT_WS(':',emp_id,CONCAT_WS(' ',fname,lname),dept,salary) from employees where emp_id = 1;**

### 4:Suman:FINANCE

- **SELECT CONCAT_WS(':',emp_id,fname,UPPER(dept)) from employees where emp_id = 4;**

### I1 Raju  (dept firstchar then emp_id then name)
### H2 Priya

- **SELECT CONCAT_WS(' ',CONCAT(LEFT(dept,1),emp_id),fname) from employees where id = 1;**

