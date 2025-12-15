- Go to DynamoDB service and create a table. 
    - DynamoDB is a schemaless database that requires only a table name and a primary key when you create the table
- Name it DemoTable
- Now specify a **partition key** so specify **user_id**. Specify its data type as string
    - The partition key is part of the table's primary key. It is a hash value that is used to retrieve items from your table and allocate data across hosts for scalability and availability.
- Sort keys are out of scope for the exam 
    - You can use a sort key as the second part of a table's primary key. The sort key allows you to sort or search among all items sharing the same partition key.
- Under settings, we have two options. Choose default settings for now 
    - Default settings
    The fastest way to create your table. You can modify most of these settings after your table has been created. To modify these settings now, choose 'Customize settings'.
    - Customize settings
    Use these advanced features to make DynamoDB work better for your needs.
- Create table 

- **We notice that we are creating a table without creating a database. So the database already exists, it's serverless. We don't need to provision servers. We don't care how it is run , we just create tables.**
- Now click on table and click on Explore table items 
- We see currently there are 0 items , so create item. 
    - We see like this 
    ```
    Attribute name                  Value               Type
    user_id -partition key          ______              String
    ```
    Enter value as 1234 and add new attribute
    We can have first name to be equal to ansh
    We can have last name to be gupta
    We can have a number type favorite_number to be 42

    - If we toggle json view button we see these content as json
    ```json
        {
            "user_id": "1234",
            "first_name": "ansh",
            "last_name": "gupta",
            "favorite_number": 42
        }
    ```
    - If dynamodb json , 
    ```json
        {
            "user_id": {
            "S": "1234"
            },
            "first_name": {
            "S": "ansh"
            },
            "last_name": {
            "S": "gupta"
            },
            "favorite_number": {
            "N": "42"
            }
        }
    ```
- We see item is inserted as

```
user_id (String)    favorite_number     first_name      last_name

1234                    42                 ansh           gupta
```
- We see we have 4 attributes or columns

- Now create second item with only user_id and first name only . it will be still accespted
```
user_id (String)    favorite_number     first_name      last_name
4567                                      systumm
1234                    42                 ansh           gupta
```
- So it is very flexible type of database

### DynamoDB VS RDS
- DynamoDB will have all the data living within one single table and there is no way to join it with another table . So it's not a relational database. We cannot link this table to another table so we make sure all the relevant data is well formatted with our main DynamoDB table. 