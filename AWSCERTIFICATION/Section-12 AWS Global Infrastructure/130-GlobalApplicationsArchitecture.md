# Global Applications Architecture

- If we have a **single region , single AZ** , it's very simple
    - We have an EC2 instance in one AZ ,in one region 
    - This does not give us high availability 
    - This does not give us good global latency because if we access this EC2 instance from a user that's very very far away from a region is going to get a bad latency
    - It is very simple to set up , so low difficulty

- If we have **Single region , multi AZ** (EC2 instances (or load balancers, RDS databases) )
    - In this we have two AZs in one region , so we do have high availability
    - But we do not have improvements for a global latency. So again , the AZs are close to each other and so if we take a point in the well that's far away from my AZs then we're going to have high latency
    - Difficulty to set up is little bit increased.

- If we have **multi-region called Active-passive**
    - It means we have two regions, each region has one or multiple AZ.
    - In one region our EC2 instances are going to be active or our application is going to be active. That means our users whereever they are in the world can do reads and writes to our EC2 instances in the active region. And the other one EC2 is passive. That means that there is data replication between the active region and the passive region. And possibly the users can do reads from the passive region but they can not do writes to the passive region
    - With this active passive,  if we have many regions around the world and they are all passive , that means that we are going to have improved read latency because now we have our data replicated  across the world and with low latency
    - But for writes , all the writes still need to go to the same central region so that means that the writes at a global level still have the high latency
    - Difficulty to set up increased as we have mutiple regions

- If we have **Multi Region , Active-Active**
    - In this each EC2 instance is able to take writes and reads and there is replication still happening with these two instances
    - So this improves read latency , write latency at a global level
    - Higher difficulty because now your application has to do lot of things in every single region
    - Eg, a database that is having an active-active demo setup is dynamoDB global tables