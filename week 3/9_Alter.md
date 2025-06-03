## ALTER QUERY :- 

- To modify the structure of table
- **update** query is used to change the data inside table but alter query is used to change structure of table 


# Add or remove a column

### to add a column use add

- **ALTER TABLE <table_name> ADD COLUMN city VARCHAR(50);**

- **ALTER TABLE person ADD COLUMN age INT;**  // new column added with initial values null

### to remove a column use drop

- **ALTER TABLE <table_name> DROP COLUMN <column_name>;**
- **ALTER TABLE persion DROP COLUMN age;**

### adding default value while adding column 

- **ALTER TABLE person ADD COLUMN age INT DEFAULT 0;**  // now new column added with initial value 0


# rename a column or table name

### rename a column

- **ALTER TABLE <table_name> RENAME COLUMN <old_column_name> TO <new_column_name>**

- **ALTER TABLE person RENAME COLUMN name TO fname;**

### rename a table name 

- **ALTER TABLE <old_table_name> RENAME TO <new_table_name>;**
- **RENAME TABLE <old_table_name> TO <new_table_name>;**

# Modify a column - changing datatype or adding default values etc.

- **ALTER TABLE <table_name> ALTER COLUMN <column_name> SET DATA TYPE <new_data_Type>;**
- **ALTER TABLE <table_name> ALTER COLUMN <column_name> SET DEFAULT 'unknown';**

- **ALTER TABLE person ALTER COLUMN fname SET DATA TYPE VARCHAR(150);**
- **ALTER TABLE person ALTER COLUMN fname SET DEFAULT 'unknown';**

### we can also set NOT NULL
- **ALTER TABLE person ALTER COLUMN fname SET NOT NULL;**

### can also remove default value from column
- **ALTER TABLE person ALTER COLUMN fname DROP DEFAULT;**

# ALTER WITH CONSTRAINTS
- **ALTER TABLE contacts DROP CONSTRAINT mob_no_less_than_10digits;**  // we can get this name by command shell (writing \d )
- **ALTER TABLE contacts ADD CONSTRAINT mob_not_null CHECK (mob != null);;**


### ALTER WITH NAMED CONSTRAINT

```sql
ALTER TABLE person
ADD CONSTRAINT mob_no_less_than_10
CHECK (LENGTH(mob) >= 10);
```