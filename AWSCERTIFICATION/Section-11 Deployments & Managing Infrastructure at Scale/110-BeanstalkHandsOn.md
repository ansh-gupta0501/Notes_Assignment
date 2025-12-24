# Hands On

- Go to Elastic Beanstalk Console and create application.
- So we have an two options to choose for Environment Tier either:-
    - Web server environment :- Run a website, web application, or web API that serves HTTP requests.
    - Worker environment :- Run a worker application that processes long-running workloads on demand or performs tasks on a schedule
- For now , we want to run a website , so choose web server environment but if we wanted to process tasks off of a queue, then we would choose a worker environment.
- Next, Under Application information, give your application a name so **MyApplication**
- Next we have environment information where we Choose the name, subdomain and description for your environment.
    - so name is MyApplication-env , which is autofilled but we can change as MyApplication-dev because this is going to represent my development environment
    - A domain name is going to be automatically generated if we leave it blank for my application and then this will be added at last **.us-east-1.elasticbeanstalk.com**
- Next we need to choose a platform like Docker ,node js, pyhton , .NET etc. 
    - Choose node js and then platform branch and platform version will be selected automatically , so keep it default
- Next we need to choose some application code 
    - You can either choose **sample application** or can **upload you own code** from either s3 or from your device
    - For now choose sample application  and it will be matching the environment i have selected i.e, node js
- Next , we have **presents** and Beanstalk can be quite complicated for the configuration , and as such , we can set recommended values for either a single instance which is free tier eligible , or high availability where we have a load balancer or custom configuration if you wanted to customize everything
    - Configuration presets
        - Single instance (free tier eligible)
        - Single instance (using spot instance)
        - High availability
        - High availability (using spot and on-demand instances)
        - Custom configuration
- Click next 
- Now you have to **configure the service access**
    - **IAM roles**, assumed by Elastic Beanstalk itself as a service role, and **EC2 instance profiles** allow Elastic Beanstalk to create and manage your environment. Both the IAM role and instance profile must be attached to **IAM managed policies** that contain the required permissions
        - So first need to create a **service role** which is an IAM role for Elastic Beanstalk to assume as a service role. The IAM role must have the required IAM managed policies.
            - So create role , it is for AWS service . and for Beanstalk Environment . 
            - click next 
            - We have these permission policies attached
            ```
            AWSElasticBeanstalkEnhancedHealth
            AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy
            ```
            - Click next
            - Role name is given **aws-elasticbeanstalk-service-role**
            - Create role
        - Next, for **EC2 Instance Profile**, An IAM role attached to the EC2 instances that run your application , this is the same thing, we are going to create a role , this time for beanstalk compute , having these permissions
            ```
            AWSElasticBeanstalkMulticontainerDocker
            AWSElasticBeanstalkWebTier
            AWSElasticBeanstalkWorkerTier
            ```
            - Click next , name already given by default **aws-elasticbeanstalk-ec2-role**, so create role
        - Next selecting **key pair is optional** so we will leave it empty 
- Click next 
- And now we can configure **networking(vpc,subnets), database, and tags** but these are optional
- click next
- now we can Configure **instance traffic and scaling** which is again optional
    - Here we can Configure the **Amazon EC2 instances** that run your application, the root volume, CloudWatch monitoring , add EC2 security groups
    - We can also configure **Capacity** which is the compute capacity of your environment and auto scaling settings to optimize the number of instances used. , also instance type , ami image etc. 
- Click on next 
- Now we can Configure updates, monitoring, and logging which is also optional 
- Click next , review everything and create
- Our beanstalk environment will be created. 
- You can scroll down to check Events , we can see some events are happening like creating ec2 instance, setting EIP, security group and many more , 
- These events actually come from a service called **CloudFormation**
- So if you go to CloudFormation console , you see Elastic BeanStalk stack there, check events there and all the resources is being created
- We can also view it in infrastructure composer that we have launch configuration , security groups , elastic ip , a weight condition , a condition handle
- Now go to EC2 console , and you see our ec2 instance **MyApplication-dev** is running.
- We also see elastic ip address created and associated to this instance
- **Auto scaling group was also created and is managing my only EC2 instance. That's why it's called a single EC2 instance.**
- Open the public ip address of this instance and open , we see our basic website of elastic beanstalk
- Also in elastic beanstalk console, if you open the **domain** link, it will also open the same website means now you have access to my Beanstalk environment
and my single EC2 instance

- Now if we wanted to upload a new version, click on **upload and deploy**, we can upload a new version of project, and then automatically, it would be deployed to my EC2 instances. 
- Health tab just give you information around the health checks of all your instances if you had many.
- Under logs tab , you can view logs of your application, you can go on monitoring to have a look at all the metrics for your application.
- The alarms manages updates, which is when Beanstalk sets you update , our entire environment
- In the configuration , you can modify all the configuration of your beanstalk environment 
- If we go under MyApplication , we have one environment MyApplication-dev, we can also create a second environment like MyApplication-prod and that will allow us to really think about environments overall.

---
# AI Explanation
---

# Elastic Beanstalk web app setup and architecture

---

## Environment tiers and what they mean

### Web server vs worker environments

| Tier | Purpose | Typical trigger | Networking | Scaling pattern |
|---|---|---|---|---|
| Web server | Serve HTTP traffic for websites/APIs | Direct HTTP/HTTPS requests | Public endpoint | Scale on request load |
| Worker | Process background jobs | SQS messages or schedules | Private by default | Scale on queue depth |

> In your case, you chose Web server because you want a website. A Worker environment would be for jobs like image processing, report generation, or scheduled tasks.

---

## Step-by-step: Creating the application and environment

### Application and environment basics

- **Application name:** A logical container for one or more environments (e.g., dev, prod).
- **Environment name:** A specific runtime stack (e.g., MyApplication-dev). Think “a deployable slice.”
- **Domain:** Elastic Beanstalk gives an automatic subdomain; for single-instance web environments, it points to your environment’s public endpoint.

### Platform and code

- **Platform:** Node.js selected; branch/version defaults are fine to start and keep maintenance simple.
- **Code selection:** The sample application is matched to your platform so deployment completes cleanly. Upload your own code later via “Upload and deploy.”

### Configuration presets

- **Single instance (free tier eligible):** One EC2 instance, no load balancer, managed by an Auto Scaling Group for lifecycle consistency.
- **Single instance (using spot):** Same as above but cheaper spot capacity; add on-demand fallback only in HA presets.
- **High availability:** Multiple instances behind a load balancer for zero-downtime resilience.
- **High availability (spot and on-demand):** Mix spot with on-demand to control cost and stability.
- **Custom configuration:** Full control over capacity, networking, scaling policies, health checks, and more.

---

## Service access: IAM roles and instance profiles

Elastic Beanstalk needs permission to create and manage resources on your behalf.

- **Service role (aws-elasticbeanstalk-service-role):**  
  - **Purpose:** Lets Elastic Beanstalk orchestrate your environment (create/update/delete resources, track health).  
  - **Policies:**  
    - **AWSElasticBeanstalkEnhancedHealth:** Allows health monitoring and reporting.  
    - **AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy:** Enables managed platform updates and controlled rollouts.

- **EC2 instance profile (aws-elasticbeanstalk-ec2-role):**  
  - **Purpose:** Attached to the EC2 instances so your app/agent can talk to AWS services securely.  
  - **Policies:**  
    - **AWSElasticBeanstalkWebTier:** Grants the instance what a typical web tier needs (logs, health, basic service access).  
    - **AWSElasticBeanstalkWorkerTier:** Used by worker envs; included in the profile for flexibility.  
    - **AWSElasticBeanstalkMulticontainerDocker:** Enables multi-container Docker setups (safe to keep; harmless if unused).

- **Key pair (optional):**  
  - **Purpose:** SSH access. Skip it if you don’t plan on logging into instances. Add later if needed.

---

## Networking, capacity, traffic, and scaling

### Networking and database (optional but important)

- **VPC and subnets:**  
  - **Public subnets:** Needed for web-facing instances to receive traffic.  
  - **Private subnets:** Better for databases and internal services.
- **Security groups:**  
  - **EC2 SG:** Controls inbound/outbound traffic to the instance.  
  - **ELB SG (only in HA):** Controls traffic in/out of the load balancer.
- **Database:**  
  - **RDS inside environment:** Convenient but couples DB lifecycle to the environment.  
  - **RDS outside environment:** Recommended for production to prevent accidental deletion during environment teardown.
- **Tags:**  
  - **Purpose:** Ownership, cost allocation, environment, and application context (e.g., Owner=TeamA, Env=Dev).

### Instance, capacity, and scaling

- **Instance configuration:**  
  - **Instance type:** Size your compute (e.g., t3.micro for dev).  
  - **AMI:** Chosen by the platform; override only for special requirements.  
  - **Root volume:** Keep default; increase only if your app needs more disk.
- **Auto Scaling Group (ASG):**  
  - **Purpose:** Even single-instance environments use an ASG to standardize lifecycle, health replacements, and future scaling.  
  - **Min/Max capacity:** In single instance, Min=1, Max=1.
- **Load balancer (LB):**  
  - **Presence:** Only in High availability presets. It distributes traffic and enables zero-downtime instance replacements.

### Traffic routing and health

- **Health checks:** EB uses built-in and customizable health endpoints to detect bad deployments and recover.  
- **Monitoring:** CloudWatch metrics for CPU, latency, HTTP codes, and instance health.

---

## Deployments, monitoring, logging, and updates

- **Upload and deploy:**  
  - **Purpose:** Push new app versions; EB rolls out to instances. In HA, you can use rolling or rolling with additional batch for safer deploys.
- **Health tab:**  
  - **Shows:** Instance/application health, request success rates, platform events.
- **Logs tab:**  
  - **Access:** Retrieve instance/application logs without SSH. Configure log streaming to CloudWatch Logs for retention and searchability.
- **Monitoring:**  
  - **CloudWatch metrics:** CPU, network, latency, HTTP 4xx/5xx. Set alarms on meaningful thresholds (e.g., sustained 5xx, high latency).
- **Managed updates:**  
  - **Platform patches:** EB can automatically update the platform (Node.js runtime/OS) during maintenance windows. Pin versions if your app is sensitive.

---

## Behind the scenes: What EB creates for you

- **CloudFormation:**  
  - **Role:** EB drives your environment via CloudFormation stacks. Events in EB’s console map to stack operations (create/update/delete of resources).
- **Resources typically created:**  
  - **EC2 instance(s):** Your app runtime.  
  - **Security groups:** Networking controls.  
  - **Auto Scaling Group:** Lifecycle and scaling management.  
  - **Elastic IP (optional):** Static public IP address associated to your instance or NAT/fronting patterns.  
  - **Load balancer (HA only):** Traffic distribution and health-based failover.  
  - **S3 buckets:** Store app versions and logs.  
  - **IAM roles:** Service role and instance profile.  
  - **DNS record:** Environment CNAME to the public endpoint (instance or LB depending on preset).

---

## Answers to your specific questions

### Why an Auto Scaling Group but no Load Balancer?

- **ASG is foundational:** EB always uses an ASG to manage instance lifecycle—replace unhealthy nodes, maintain desired count, and give you a path to scale later.
- **No LB in single instance:** The “Single instance” preset targets cost and simplicity. With only one instance, an LB adds price and complexity without real benefit. Choose “High availability” to get an Application Load Balancer and multiple instances.

### Elastic IP created but not visibly attached in Infrastructure Composer

- **What you’re seeing:** The EIP exists and is associated to your instance, but the Infrastructure Composer diagram may not render that specific association line, especially for resources created inside a managed ASG or by nested stacks. It’s a visualization limitation, not a configuration error.
- **How to verify:**  
  - **EC2 > Elastic IPs:** Check the “Associated instance” column.  
  - **EC2 > Instances:** Inspect Networking tab; the public IPv4 address should show “Elastic IP.”  
  - **CloudFormation stack resources:** Find the EIP and its “Association” resource attached to the instance logical ID.
- **Why EB might create an EIP:**  
  - **Stable public IP:** Useful for firewall allowlists, webhooks, or external integrations that expect a fixed IP.  
  - **Note:** In many default web server environments, EB just assigns a standard public IP via the VPC’s internet gateway; EIP usage depends on configuration and region defaults.

---

## Simple glossary of terms

- **Application:** Top-level container for environments.  
- **Environment:** A deployable runtime (e.g., dev, prod) with its own resources.  
- **Platform:** Language/runtime stack (Node.js, Python, .NET, Docker).  
- **Preset:** A bundle of recommended settings (single instance vs high availability).  
- **IAM role / instance profile:** Permission sets for EB and for EC2 instances.  
- **Auto Scaling Group (ASG):** Manages how many instances run and replaces them if unhealthy.  
- **Load balancer (LB):** Distributes traffic and enables zero-downtime swaps in multi-instance setups.  
- **Elastic IP (EIP):** Static public IP that you can reassign across instances.  
- **Security group (SG):** Virtual firewall rules for instances/LBs.  
- **CloudFormation:** AWS’s infrastructure-as-code engine that EB uses under the hood.  
- **CloudWatch:** Monitoring, metrics, and logs service.  
- **S3 bucket:** Storage for app versions, logs, and EB artifacts.

---

## Industry-standard best practices

- **Separate environments:** Use MyApplication-dev and MyApplication-prod, with distinct VPCs or at least separate subnets and security groups.  
- **Keep the database independent:** Run RDS outside the EB environment; manage backups, upgrades, and security separately.  
- **Pin platform versions:** In production, pin and test platform updates in dev before enabling managed updates.  
- **Health endpoint:** Add a lightweight /health route your app can serve 200 quickly; configure EB to use it for health checks.  
- **Observability:** Stream application logs to CloudWatch Logs; set alarms on 5xx rates, latency, and CPU.  
- **Deployment strategy:**  
  - **Dev:** Single instance is fine.  
  - **Prod:** High availability with an Application Load Balancer, multiple instances, and rolling deployments.  
- **Security:**  
  - **Least privilege IAM:** Don’t add broad policies to instance profiles.  
  - **Key pairs:** Enable SSH only when needed; lock SG to your office IP if you must.  
  - **TLS:** Terminate HTTPS at the load balancer in HA, or on the instance for single instance, using ACM certificates.  
- **Cost control:** Use tags, budgets, and consider spot capacity only in non-critical tiers with on-demand fallback.

---

