# AWS Batch
- Batch is a fully managed **batch processing service** that can allow you to do **batch processing** at any scale. 
- With the batch service, you can efficiently run hundreds of thousands of computing batch jobs on AWS very easily. 
- A **batch job** is a job that has a start and an end  and that is opposed to say , a continuous or a streaming job that really doesn't ever end, it's always running. But a batch job say, for example, starts at 1 a.m. and finishes at 3 a.m. So a batch job has a point of time when it happens and so the batch service will dyamically launch **EC2 Instances or Spot instances** to accommtdate with the load that you have to run these batch jobs. 
- So batch will provision the right amount of compute and memory for you to deal with your batch queue.
- And you just submit or scheduled batch jobs into the batch queue and the batch service does the rest. 
- To define a batch job, it is simply a **Docker image** and a test definition that you **run on the ECS service.**
- So it can be said that anything that can run on ECS can run on batch.
- This is going to be very helpful to use batch to run these batch jobs.
- And because it automatically scales the right number of EC2 Instances or Spot instances to do these jobs, then you get lots of cost optimizations and you focus a lot less on the infrastructure, you just focus on your batch jobs.

## AWS Batch - Simplified Example

- Say we wanted to process images submitted by users into Amazon S3 in a batch way.
- So image will be put into Amazon S3, and this will trigger a batch job.
- So batch will automatically have an ECS cluster made of EC2 instances or Spot Instances and batch would make sure that you have the right amount of instances to accommodate the load of batch jobs you have in the batch queue.
- And then these instances will be running your Docker images that will be doing your job and then maybe that job will be to insert the processed object. Maybe it's a filter on top of the image into another Amazon S3 buckets.


# Batch vs Lambda
- Lambda:
    - has a time limit . It's 15 minutes.
    - you only get access to a few programming languages
    - On top of it , you have limited temporary disk space. If you want to run your jobs.
    - It is serverless
- Batch:
    - No time limit because it relies on EC2 instances
    - It's any runtime that you want as long as you package it as a Docker image.
    - For storage, you rely on the storage that comes with an EC2 intances. So it could be an EBS volume, or an EC2 Instance store for disk space which can be a lot more than for Lambda Functions.
    - Batch is **not a serverless service**
    - It is a managed service but it relies on actual EC2 Instances being created. And these EC2 instances are managed by AWS so not worry about autoscalling.


## practical examples of AWS Batch jobs
- ETL pipelines: Extracting raw logs from S3, transforming them into structured formats, and loading into Redshift.

- Financial risk modeling: Running overnight risk calculations across millions of trades.

- Log aggregation: Batch jobs that compress, filter, and archive logs into Glacier for long-term storage.

- Video transcoding: Converting uploaded videos into multiple resolutions and formats for streaming platforms.

- Image processing: Applying filters, resizing, or watermarking images in bulk.

- Rendering workloads: 3D rendering for animation studios using GPU-enabled EC2 instances.

- Model training: Training deep learning models that require GPUs and long runtimes.

- Batch inference: Running predictions on millions of records (e.g., fraud detection on transactions).

- Feature engineering: Preprocessing large datasets into feature sets for ML pipelines.
- Database backups: Scheduled jobs that dump and compress databases into S3.

- Patch testing: Running automated test suites on new software builds overnight.

- Report generation: Creating daily/weekly reports from business data and emailing them to stakeholders.

### Each of these jobs is defined as a Docker container with the required runtime, submitted to a Batch queue, and executed on dynamically provisioned compute (EC2, Spot, or Fargate).