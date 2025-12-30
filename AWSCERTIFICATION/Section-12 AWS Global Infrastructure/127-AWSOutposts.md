# AWS Outposts

- **Hybrid Cloud** :  Businesses that keep an on-premises infrastructure alongside a cloud infrastructure are called hybrid cloud.
    - Therefore, We have two ways of dealing with IT systems
        - One for the cloud of AWS(Using the console of AWS , The cli, and AWS APIs)
        - One that is dedicated to on-premises infrastructure
    - This means two different types of skillsets, two different types of API, and that may be complicated
- So, AWS said , okay we do recognise that some companies will run a hybrid cloud, therefore let's create **Outpost**
- **Outpost** are **server racks** that offers the same AWS infrastructure, services, API and tools to build your own application on-premises just like in the cloud.
- This means that they will come and set up and manage Outpost racks which are servers within your on-premises infrastructure and these servers come preloaded with the AWS services that you can benefit them from on-premises
- So as we can see now on your corporate data center, you will have your Outpost racks directly set up by the AWS and this allows you to extend the AWS services direclty onto your on-premises data centers
- But the difference between an **EC2 Instance running on the cloud** and an **EC2 Instance running in your own data center** is that now you are responsible for their security, the physical security of the rack itself because that rack is within your own data center

## Benefits
- You get **Low-latency access** to on-premises systems
- You get local data processing so the data may actually never leave your on-premise system and never go to the cloud
- Data residency . It lives within your own data centers.
- Easy to start migration from on-premises to Outpost and then  you're ready from Outpost to the cloud.
- It is a fully managed service so AWS will manage the service for you
- And with **Outpost** for now
    - you can launch a lot of services such as EC2, EBS, S3, EKS , ECS, RDS, EMR