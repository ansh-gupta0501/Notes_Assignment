# Amazon Neptune
- Neptune is a fully-managed **graph** database.
- Example of graph dataset would be **social network**. In social network, people are friends, they like, they comment, they read, they comment and so on. So,
    - Users have friends
    - Posts have comments
    - Comments have likes from users
    - Users share and like posts
    So all these things are interconnected and so they create a graph. So that's what neptune is for.
- Neptune has replication across 3 AZ up to 15 read replicas.
- It is used to build and run applications that are gonna be with highly connected datasets so like social network
- And because Neptune is optimized to run queries that are complex and hard on top of these graph datasets.
- You can store up to billions of relations on the database and query the graph with milliseconds latency.
- It's highly available with replication across multiple Availability zones.
- It is also great for storing knowledge graphs. For eg, the **Wikipedia** database is a knowledge graph because all the Wikipedia articles are interconnected with each other.
- It is also great for fraud detection, recommendations engine and social networking