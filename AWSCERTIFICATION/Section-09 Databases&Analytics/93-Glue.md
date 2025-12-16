# AWS Glue

- Glue is a managed extract, transform , and load service (ETL)
- ETL is very helpful when you have some datasets but they're not exactly in the right form, or the right format that you need to do your analytics on them.
- So the idea is that you would use an ETL service to prepare and transform that data. 
- So , Glue does that , but traditionally you use servers to do it, but with Glue it's a fully serverless service, so you just worry about the actual data transformation and Glue does the rest. 
- Example, Glue ETL sits in the middle and say we wanted to extract data from both an S3 bucket and an Amazon RDS database. So for this we use Glue to extract the data from both these sources and then once the data is extracted , it is in a Glue service, and we would write a script to do a transform part. So here, Glue would help us transform the data and then , once it's transformed , we need to actually analyze it so we can load up the data into , for example, an Amazon Redshift database where we can do our analytics the right way.
- It's a very powerful tool, because you can do any kind of instruction transformation and you can load it into many different places. 

```

s3 bucket --------------------|
                              | (Extract)     (Transform)      (Load)
                              |---------------> Glue ETL -----------------------> Redshift
                              |
Amazon RDS -------------------|

```

## Glue Data Catalog
- It is a catalog of your datasets in your AWS infrastructure and so this Glue Data Catalog will have a alert reference of everything , the column names, the field names, the field types etc. 
- This can be used by services such as Athena, Redshift and EMR to discover the datasets and build the proper schemas for them. 