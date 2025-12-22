## 3-tier architecture

- When we have deployed a web application in AWS, we typically follow a architecture called a **3-tier architecture.**
    - Our users talk to a load balancer that could be in multiple availablity zones.
    - Then the load balancer will forward traffic to multiple EC2 instances managed by an Auto Scaling Group.
    - And then these EC2 instances need to store data somewhere so they will use a database such as Amazon RDS to read and write data.
    - And if they need to have an in-memory database for an in-memory cache, then they can also use ElasticCache to store a retrieve the session data or the cached data.

- This architecture is something we can easily reproduce manually. We can also reproduce it on AWS through CloudFormation but there is a better way. 

## Developer problem on AWS
- When you're a developer on AWS, you don't want to be **managing infrastructure**, you just want to be **deploying code**.
- You don't want to be able to configure all the databases, the load balancers etc. 
- You want to make sure that whatever you're doing scales.
- And as we saw, most web applications will have the same or similar architecture with a load balancer (ALB + ASG)
- So as a developer on AWS, all that you want to do is to run your code.
- Possible you want to run your code for different applications and environments the same way, so there comes **Elastic Beanstalk**

## AWS Elastic Beanstalk Overview
- So it is a developer centric view of deploying an application on AWS. 
- And behind Beanstalk, we have the same components we've seen before, EC2 , ASG, ELB,RDS etc. But in Beanstalk, it's a developer centric view.
- We still have control over the configuration of all the components , but it is all within Beanstalk.
- So **Beanstalk** from a cloud perspective is a **platform as a service or Paas** because we just worry about the code .

- Using Beanstalk is free but you're going to pay for the underlying instances


## Elastic Beanstalk
- It is a managed service means:
    - All the EC2 instance configuration and operating system will be handled by Beanstalk itself. 
    - The deployment strategy can be configured but the deployment itself is going to be performed by Elastic Beanstalk.
    - All the capacity provisioning through an auto scaling group and load balancing are done by Beanstalk
    - The application health monitoring and responsiveness is also included in Beanstalk dashboard. 

- **Your responsibilty as a developer is just the application code**

#### Three architecture models with Elastic Beanstalk
- **Single Instance Deployment** : good for development enviroment
- But if you wanna scale up , you can have **load balancer and an ASG**, which is going to be great for production or pre-production web applications
- If you want to have non-web apps in production for example , Background processes, batch jobs, workers , you have an option to only have **Auto Scaling group** on as a standalone


---

- Beanstalk can be used to support many platforms to deploy your application , including Docker and many programming languages :-
    - Go                                        - Single Container Docker
    - Java SE                                   - Multi-Container Docker
    - Java with Tomcat                          - Preconfigured Docker
    - .NET on windows Server with IIS
    - Node.js
    - PHP
    - Python
    - Ruby
    - Packer Builder


## Elastic Beanstalk - Health Monitoring 
- Beanstalk does have a full **monitoring** suite available within the service itself
- And so there's going to be a **health agent** on each **EC2 instance** within Beanstalk that is going to push **metrics** to **CloudWatch**
- Within Beanstalk , you can view these metrics, do some monitoring and so on. 
- It also checks for **application health** and will **publish health events** 