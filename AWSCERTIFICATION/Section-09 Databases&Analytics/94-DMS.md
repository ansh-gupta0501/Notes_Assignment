# DMS Overview - Database Migration Service

- We have seen so many different database technologies but how to migrate data from one database to another?
- For this we can use DMS 
- We use source database and once we extract the data , so we will run an EC2 instance that will be running the DMS software that will extract the data from source database, and then DMS will insert the data back into a target database that will be somewhere else. 
- So with DMS we get a quick and secure database migration into AWS that's going to be resilent and self healing.
- The source database remains available during the migration so we don't have to take it down
- It supports many kind of migration.
    - Homogeneous migration :- Eg, Oracle to Oracle. So it's the same database technology for the source database and the target database.
    - Heterogeneous migration :- When the source database technology and the target are different for example, a microsoft sql server to aurora. And in that case , DMS is smart enough to know how to convert data from the source into the target