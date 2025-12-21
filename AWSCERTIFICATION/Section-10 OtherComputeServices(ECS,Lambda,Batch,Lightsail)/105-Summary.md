# Other Compute - Summary

- Docker : Container technology to run applications
- ECS : Run docker container on EC2 instances
- Fargate : Run docker container without provisioning the infrastructure. A serverless offereing because we don't manage any EC2 instances to run these docker containers
- ECR : Private Docker images repository, 
- Batch : run batch jobs on AWS across managed EC2 instances. It is run on top of the ECS service means Batch uses ECS under the hood
    - ECS = the engine that knows how to run containers.
    - Batch = the driver that decides when to run them, how many to run, and what order to run them in.
- Lightsail : predictable and low pricing for simple applications and DB stacks

### Lambda summary 
- It is serverlss , function as a service , seamless scaling , reactive
- Lambda billing:
    - (By the time run) X (by the RAM provisioned)
    - By the number of invocations has been invoked
- Language support : many programming languages **except arbitrary docker**
    - Even though it supports container images but then need to implement a specific runtime API . So lambda does not support arbitrary docker images , for this you would use ECS and Fargate , but if your Docker image does implement the lambda container runtime API, then you can run docker images on lambda but this is not the standard again 
- Invocation time : up to 15 minutes
- Use cases :
    - Create thumbnail for images uploaded onto s3
    - Run a serverless cron job
- If we wanted to expose our lambda function as APIs , we would use another serverless service called **API gateway** which also give us capabilities around secuirty , api keys and so on. 