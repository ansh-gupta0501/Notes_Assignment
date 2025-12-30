# AWS Local Zones

- The idea is that we have the availabilities zones and the regions all around the world, but now there's the concept of local zones which allows you to place compute, storage, database and other services that are selected by AWS, closer to end users to run latency sensitive applications.
- So the idea is that you will extend your AWS region to one or more locations , one or more quote-unquote availability zones. Then they are actually called local zones. 
- This is compatible with EC2, RDS, ECS, EBS , ElastiCache, Direct Connect and so on.
- Example
    - There is a AWS Region : Northern Virginia , US-EAST-1 and has 6 AZ by default 
    - But you can extend these AZs with more local zones so we have Boston , Chicago , Dallas, Houston, Miami and so on.


## How does that work?
- We have US-EAST-1 region with two AZs
- Now it is possible for you to define a local zone in Boston and then extend your VPC to be going across these AZs and local zones and then you would be able to launch an EC2 Instance into this local zone. 


# Hands-On 

- Now go to EC2 Console and pick up a region which don't have local zone. For example, pick Europe (Ireland)
- We see we have three AZs in Ireland enabled by default, there is no local zone in it , (we can see this ec2 global view)
- Now switch to US-EAST-1(Northern Virginia), we have lots of option , we have local zones , we have wavelength zones, then we have availability zones(6 AZs)
- We need to enable particular local zone , for example, if we knew that we had users in Boston and we really really want them to have low-latency access to our applications directly from Boston, then we can enable the local zone in Boston
- Now what it means that if i go to into my instances, launch an instance and then in the instance details, in terms of network, we have VPC , subnets , we will se our 6 subnets but it's possible for us to create a new subnet
    - When creating new subnet , we need to select AZ, where we can actually choose our local zone
    - By this way , we extend our VPC to local zones and therefore deploy EC2 instances closer to our users