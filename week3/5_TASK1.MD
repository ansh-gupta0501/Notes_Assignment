| emp_id | fname  | lname  | email                     | dept     | salary | hire_date   |
|--------|--------|--------|---------------------------|----------|--------|-------------|
| 1      | Raj    | Sharma | raj.sharma@example.com    | IT       | 50000  | 2020-01-15  |
| 2      | Priya  | Singh  | priya.singh@example.com   | HR       | 45000  | 2019-03-22  |
| 3      | Arjun  | Verma  | arjun.verma@example.com   | IT       | 55000  | 2021-06-01  |
| 4      | Suman  | Patel  | suman.patel@example.com   | Finance  | 60000  | 2018-07-30  |
| 5      | Kavita | Rao    | kavita.rao@example.com    | HR       | 47000  | 2020-11-10  |
| 6      | Amit   | Gupta  | amit.gupta@example.com    | Marketing| 52000  | 2020-09-25  |
| 7      | Neha   | Desai  | neha.desai@example.com    | IT       | 48000  | 2019-05-18  |
| 8      | Rahul  | Kumar  | rahul.kumar@example.com   | IT       | 53000  | 2021-02-14  |
| 9      | Anjali | Mehta  | anjali.mehta@example.com  | Finance  | 61000  | 2018-12-03  |
| 10     | Vijay  | Nair   | vijay.nair@example.com    | Sales    | 49000  | 2020-04-10  |


```sql 
CREATE TABLE employees(
    emp_id SERIAL PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    dept VARCHAR(50),
    salary DECIMAL(10,2) DEFAULT 30000.00,
    hire_date DATE NOT NULL DEFAULT CURRENT_DATE 
);
```

- **primary key and unique constraint help in formind indexes . Indexes help in optimizing searching operation using btree algo**

```sql
INSERT INTO employees (emp_id, fname, lname, email, dept, salary, hire_date) 
VALUES
(1, 'Raj', 'Sharma', 'raj.sharma@example.com', 'IT', 50000.00, '2020-01-15'),
(2, 'Priya', 'Singh', 'priya.singh@example.com', 'HR', 45000.00, '2019-03-22'),
(3, 'Arjun', 'Verma', 'arjun.verma@example.com', 'IT', 55000.00, '2021-06-01'),
(4, 'Suman', 'Patel', 'suman.patel@example.com', 'Finance', 60000.00, '2018-07-30'),
(5, 'Kavita', 'Rao', 'kavita.rao@example.com', 'HR', 47000.00, '2020-11-10'),
(6, 'Amit', 'Gupta', 'amit.gupta@example.com', 'Marketing', 52000.00, '2020-09-25'),
(7, 'Neha', 'Desai', 'neha.desai@example.com', 'IT', 48000.00, '2019-05-18'),
(8, 'Rahul', 'Kumar', 'rahul.kumar@example.com', 'IT', 53000.00, '2021-02-14'),
(9, 'Anjali', 'Mehta', 'anjali.mehta@example.com', 'Finance', 61000.00, '2018-12-03'),
(10, 'Vijay', 'Nair', 'vijay.nair@example.com', 'Marketing', 50000.00, '2020-04-19');
```

- **Note:- As we have given emp id serial but if we insert id by our own , then it will inserted , but after that if say we want not serial automatically set then it will give error , because serial starts from 1 but we already insert 1 . so to solve this problem we have to set serial value first using command \d employess  in which we see (employees_emp_id_seq). we can set it as SELECT setval('employees_emp_id_seq',1); Now we have set value 1 means in nextval it automatically takes 2. we can also check currval using SELECT currval('employees_emp_id_seq');**

