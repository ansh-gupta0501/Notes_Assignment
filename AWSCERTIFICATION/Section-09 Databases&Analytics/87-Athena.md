# Amazon Athena
- Amazon Athena is a serverless query service to perform analytics against your objects stored in Amazon S3. 
- So the idea is that you would use the SQL query language to create these files, but you don't need to load them. They just need to be in S3 and Athena will do the rest. 
- So these files can be formatted in different ways such as CSV, JSON,ORC,Avro and Parquet.
- Athena is built on the Presto Engine.(open-source distributed SQL query engine optimized for interactive analytics.)
- Example, users will load data into Amazon S3, and then Amazon Athena will be used to query and analyze the data. And then if you wanted to , you could have some reporting on top of Athena such as using Amazon QuickSight.
- Pricing for Athena is around $5 per terabyte of data scanned.
- If you use compressed or data stored in a columnar fashion, then you're going to have cost savings because there is less scan of the data being made.
- Use cases : Business Intelligence/analytics/reporing or to analyze Flow logs in VPC or ELB logs, or cloudtrail logs, or platform logs in AWS

- For exam perspective, whenever you see serverless anayze data in s3  use SQL then think Athena