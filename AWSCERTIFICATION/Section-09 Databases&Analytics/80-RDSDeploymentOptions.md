# RDS Deployments : Read Replicas , Multi-AZ

- So when you deploy RDS databases, there are multiple architectural choices you need to make. 
    - **Read Replicas :**
    Your application reads from your main RDS database. But now you need to scale the read workloads because you need to read more and more data from RDS. The way you can do it is by creating **Read Replica**. 
        - There is gonna be some copies, some replicas of your RDS database that are going to be created and this is going to allow your applications to read from this Read Replica also. 
        - You are distributing the reads to many different RDS databases. 
        - You can create up to 15 Read Replicas. 
        - Read replicas can be created in the same Availability Zone (AZ), a different AZ in the same region, or even in a different region (multi-region read replicas).
        - When it comes to writing data, it is only done to main database. So your application still have to write to the only one central RDS database. 
        - Imagine you have a e-commerce site, Your app directs browsing traffic to replicas, while checkout traffic still goes to the main DB
    - **Multi-AZ :**
    This is helpful when you have failover in case of an AZ outage. So like crashes in the AZ . So this gives you high availabily. For example, your application still read and write from same main RDS database. But we are going to set up a replication across AZ so in a different availability zone and this is going to be a failover database. In case the main RDS database crashes for whatever reason then RDS will trigger a failover. And then your application will failover to failover database in different AZ.
        - In this case, data is only read and written to the main database.
        - The failover DB is passive. It's not accessible until there is an issue with the main database.
        - You can only have one other AZ as a failover AZ
    - **Multi-Region**
    This is for read replicas but this time , instead of being in the same region they are across different regions. For example, we have EU-WEST-1 for RDS database and we are going to create a read replica in US-EAST-2. So your applications in US-EAST-2 can read locally from this read replica. But anytime this application needs to write data, the writes need to happen across region. So we need to write data to EU-WEST-1. Same if you were to have also another region in ap-southeast-2 , you would have same concept.
        - **Why we want a multi region type of deployment?**
            - You want to set up a disaster recovery strategy in case of a region issue.
            - Our applications that are in differnet regions get better performance because they're read from local database , so they have less latency
            - But as you are replicating data across regions then there is going to be a replication cost associated with a network transfers of data between regions