# Why AWS Lambda

- If we use an **EC2 instance**:-  
    - We have a virtual server in the cloud
    - We are bounded by the amount of memory and CPU power we give it
    - It is continuously running even though sometimes we don't use it.
    - If we want to scale, we can use an **Auto Scaling group** but that means that we need to add or remove servers over time. That may be a little slow or they may be sometimes very complicated to implement.

- With **Lambda**:-
    - We don't have servers
    - We just have virtual functions and these functions are limited by time. So they are intended for shorted type of executions.
        - Limited by time means each Lambda execution has a maximum runtime.
            - As of now, a Lambda function can run for up to 15 minutes per invocation.After that, AWS automatically stops it.
            - This makes Lambda suitable for short-lived tasks, not for long-running processes.
        - Intended for shorter type of executions” emphasizes that Lambda is designed for things like:
            - Responding to an API request.
            - Processing a file uploaded to S3.
            - Running a scheduled job.
            - Transforming data in a stream.
        - It’s not meant for workloads like:
            - Hosting a web server that runs continuously.
            - Long-running batch jobs that take hours.
            - Stateful applications that need persistent connections.

    - They will run on demand. So that means that whenever we run a function,it will be there to be run. But whenever we don't need a function , it will not be run and we will not be billed for it.
    - In case we need Scaling, it's already automated as part of the Lambda service.



## Benefits of AWS Lambda
- Easy pricing
    - You are going to pay per request and per compute time
    - In Free tier , you get every month, 1 million Lambda Invocations and 400,000 gigabyte seconds of compute time. 
- It is integrated with the whole AWS suite of services . 
- **Event-driven** - Funtions will only get invoked by AWS when something happens , when an event happens or when needed. So it makes lambda a reactive type of services.
- It is fully integrated with many programming languages
- You get easy monitoring through **CloudWatch**
- It is easy to get more resources per function.(upto 10GB of RAM)
- Increasing the RAM , it will also improves the CPU and the network quality.

## AWS Lambda language support
- Node.js (javascript)
- Python
- Java
- C# (.NET Core) / Powershell
- Ruby
- It also supports many other languages which AWS doesn’t natively support through **Custom Runtime API**. For example, it supports Rust or Golang languages through that
    - You provide a runtime layer (basically a bootstrap program) that knows how to start your language runtime.
    - Your code runs inside that runtime, and Lambda communicates with it through the Runtime API.
- You also have the option to use **Containers** on Lambda. So this is a **container image**
    - The container image must implement the **Lambda Runtime API.**
    - There is a service named ECS or Fargate and so to run container images, especially Docker images. Lambda support running some level of customized Docker images
    ```
    ---
     Running Containers on Lambda
    - Traditionally, Lambda packages code as a **.zip file**.  
    - Now, Lambda also supports **container images** (up to 10 GB).  
    - This is useful when:  
    - Your app has large dependencies (machine learning models, binaries).  
    - You want to use Docker tooling for builds.  
    - You need more control over the environment.  

    ### Requirements:
    - The container image must implement the **Lambda Runtime API**.  
    - That means inside your Docker image, you need the Lambda bootstrap so AWS knows how to start and stop your function.  
    - You can build these images using AWS-provided base images (for Python, Node, etc.) or create your own.

    👉 Example: You build a Docker image with Python + TensorFlow + your ML model. Push it to **Amazon ECR**. Deploy it to Lambda. Lambda pulls the image and runs it as a function.

    ---

    ## 🧩 3. ECS/Fargate vs Lambda Containers
    - **ECS/Fargate**:  
    - Designed for **long-running services** or microservices.  
    - You run full Docker containers (any image) without time limits.  
    - Great for APIs, background workers, or apps that need continuous uptime.  

    - **Lambda with containers**:  
    - Designed for **event-driven functions**.  
    - Containers here are still **functions** — they run only when triggered, and stop after execution (max 15 minutes).  
    - Great for short tasks, serverless workloads, or when you want Docker packaging but don’t need a full service.

    👉 Think of it like this:  
    - **ECS/Fargate** = run containers as **services** (always on, scalable).  
    - **Lambda with containers** = run containers as **functions** (on-demand, short-lived).

    ---

    👉 In short:    
    - **Lambda containers** let you package your function as a Docker image (with dependencies).  
    - **ECS/Fargate** runs full containers as services, while **Lambda containers** are still short-lived, event-driven functions.


    ```

# Use case for Lambda
## Serverless Thumbnail Creation

- We have an S3 bucket and we add images in it. So say our users are uploading a beach image into an S3 bucket
- The s3 bucket will trigger a lambda function once the image is uploaded and that lambda function will take that image and will change it to create a thumbnail
- It will push the thumbnail back into Amazon S3( A thumbnail is a smaller version of that image)
- It will also push some metadata about the thumbnail(like image name, image size, creation date etc.) into DynamoDB
- All of this is fully **event-driven** and **fully serverless**. As with S3 , we don't provision servers , with lamdba we don't provision servers and with dynamodb we also don't provision any servers.
- This will also scale very well , no need to manage any servers for scaling also.


## Serverless CRON job
- CRON allows you to define a schedule, for example every hour, every day , every Monday and based on that schedule to run a script 
- By default, CRON job is run on a Linux AMI , a linux machine
- But we are serverless so we cannot provision an EC2 instance , so instead, we will be using something called **CloudWatch events or EventBridge**. This service will be triggering every one hour our lambda function to perform a task. And effectively , we have no servers in this because **cloudwatch events** in serverless and lambda is also serverless and so effectively we're launching a script every hour through a lambda function
```
                            Trigger every 1 hour 
        Cloudwatch events  ------------------------> AWS Lambda function performs a task
        Event Bridge
```

# AWS Lambda pricing 
- Pay per calls:
    - First 1 million lambda invocations are free. 
    - you pay 20 cents per 1 million request thereafter 
- Pay for duration
    - 400,000 GB - seconds of computime time for free
    - And that means it's 400,000 seconds if the function has 1GB of RAM 
    - 3.2 million seconds if function has 128 MB RAM
    - So the less memory you allocate, the more seconds you get for free.
    - After that you pay $1 for 600,000GB-seconds