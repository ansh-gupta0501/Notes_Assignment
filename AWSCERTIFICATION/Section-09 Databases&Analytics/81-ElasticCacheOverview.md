# Amazon ElastiCache Overview (Another type of database on AWS) 

- So the same way you use RDS to get managed relational databases, you are going to get **ElastiCache** to get a **managed Redis or Memcached database**.
- These caches are going to be **in-memory databases** with high-perfomance , low latency. 
- ElastiCache will be helpful to reduce load off of databases that have a read intensive workloads.
- The idea is that if we have an RDS database and we're doing a lot of query on it and they're the same queries all the time, we put a pressure onto that RDS database. Instead what we could be doing is to use a cache to reduce the pressure off of the database by making sure the queries are directly going onto my in-memory database through ElastiCache
- And because this is a managed database, AWS will take care of all the OS, maintenance/patching, the optimizations, the setup , the configration, the monitoring, faiure recovery and backups

# ElastiCache Solution Architecture - Cache
- You have a Elastic Load Balancer which will go to your EC2 instances , possible in a ASG. They will be reading and writing data from  your Amazon RDS database, which is slow. And then if possible there will be caching some values into an Amazon ElastiCache database and this will be very fast because it's in-memory. So with ElastiCache, there will be pressure taken off the main RDS database and put it on to the ElastiCache database

```
                                                    ElastiCache
                                                       /
                                            Fast      /          
                                                     /
                                                    /
Elastic load balancer ---------------> EC2 Instances 
                                    (Possible in an ASG)
                                                    \
                                                     \
                                           Slow       \
                                                       \
                                                      SQL (relation) database  


Users send requests → ELB routes them to EC2 servers.

EC2 servers check if the needed data is in ElastiCache:

If yes (cache hit) → Data is returned instantly (fast).

If no (cache miss) → EC2 queries RDS (slower), then stores the result in ElastiCache for future requests.



```