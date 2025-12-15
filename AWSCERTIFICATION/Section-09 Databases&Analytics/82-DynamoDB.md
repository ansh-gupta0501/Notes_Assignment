# Dynamo DB

- It is a fully managed , highly available database with replication across three availability zone.
- It is part of the NoSQL database family.
- It scales to massive workload and **it's distributed serverless database** that means we don't provision any servers. With RDS or with ElastiCache we need to provision a instance type but it dynamo db we don't so it's called a serverless database. But there are still servers in the backend , we just don't see them .
- DynamoDB scales to millions of request per seconds, trillions of rows , and hundreds of terabytes of storage. 
- It is fast and consistent performance. And so anytime you need a **single digit millisecond latency with low latency retrieval**, Dynamo DB is the database for you. 
- It is integrated with IAM for security, authorization and administration.
- It has low cost and auto scaling capabilities
- It has a standard and infrequent access (IA) table class based on how you want to classify your data for cost saving.

## DynamoDB - Type of data
- It is a key/value database.
- Data looks like this:
```
        Primary key                |    Products
partition key  Sort key            |   Attributes
Product id      Type                Schema is defined per item
1             Book ID                Odyssey    Homer   1871
2             Album ID               6 Partitas Bach
2             Album ID:Track ID      Partita 1
3             Movie ID               The kid    Drama   Chaplin
```

- You have a primary key which is made of one or two columns(a partition key and sort key). And then attributes on right hand side where you can define your own columsn for your data. Finally all the items are going to be row by row.


# Dynamo DB Accelerator - DAX
- It is a fully managed in-memory cache for DynamoDB.
- So this is a cache that's specific for DynamoDB so it is not ElastiCache.
- For example, your application wants to access DynamoDB tables in DynamoDB. For this if you want to cache most frequently read objects, then you would use DAX as a cache in between.
- DAX is made just for DynamoDB. 
- This will give you a 10x perfomance improvement. So instead of single digit millisecond latency to read records , you have microseconds latency when accessing your DynamoDB tables.
- It is full secure, highly scalable and highly available. 

# DAX VS ElastiCache (At CCP level)
- DAX is only used in its fully integrated with DynamoDB whereas ElastiCache can be used for other types of databases to provide caching capabilities.



---

# DynamoDB overview

DynamoDB is a fully managed NoSQL database designed for extreme scale, high availability, and consistently low latency. You don’t manage servers or storage; AWS handles provisioning, patching, replication, and fault tolerance. Data is automatically replicated across three Availability Zones in a Region for resilience. It can handle millions of requests per second, trillions of items, and hundreds of terabytes while keeping read/write latencies in the single‑digit millisecond range.

- **Fully managed:** No servers to manage; capacity can be on‑demand or provisioned.
- **High availability:** Synchronous replication across 3 AZs per table.
- **Performance:** Single‑digit millisecond reads/writes; microseconds with DAX.
- **Scale:** Horizontal by design with partitioning; grows with your traffic and data.
- **Security:** IAM integration, VPC endpoints, encryption at rest and in transit.
- **Cost control:** Autoscaling for throughput, on‑demand capacity, and table classes (Standard vs Infrequent Access).

---

# Data model and how DynamoDB stores data


## 🗂️ What DynamoDB Stores
Think of DynamoDB as a giant **spreadsheet**:
- Each **row** = one item.
- Each **column** = an attribute (like Name, Age, Price).
- But unlike a normal spreadsheet, **rows don’t need to look the same**. One row can have 3 columns, another can have 10 — DynamoDB doesn’t force a fixed schema.

---

## 🔑 Primary Keys
Every item must have a **primary key** so DynamoDB knows how to find it.

1. **Partition key only**  
   - One column uniquely identifies the item.  
   - Example: `UserId = 101` → DynamoDB can instantly find that user.

2. **Partition key + Sort key**  
   - Partition key groups items together.  
   - Sort key orders or distinguishes items inside that group.  
   - Example:  
     - Partition key = `ProductId`  
     - Sort key = `Type`  
     - So you can store multiple “types” of data under the same product.

---

## 📊 Example Table
Imagine you’re storing products:

| ProductId | Type             | Attributes                          |
|-----------|------------------|-------------------------------------|
| 1         | Book             | Title=Odyssey, Author=Homer, Year=1871 |
| 2         | Album            | Title=6 Partitas, Artist=Bach       |
| 2         | Album#Track1     | TrackName=Partita 1                 |
| 3         | Movie            | Title=The Kid, Genre=Drama, Director=Chaplin |

- **ProductId=2** groups everything about that album.  
- The **Sort key** (`Album`, `Album#Track1`) lets you store both the album info and its tracks under the same product.  
- When you query `ProductId=2`, DynamoDB returns both rows — the album and its track.

---

## 🧩 Attributes and Flexibility
- Attributes are just key/value pairs (like `Title=Odyssey`).  
- You can mix and match: one item can have `Title` and `Author`, another can have `TrackName`.  
- DynamoDB doesn’t force all rows to look identical — that’s why it’s called **schema flexible**.

---

## 🔍 Indexes
Indexes are shortcuts for searching:
- **Global Secondary Index (GSI):** Lets you query by another attribute (e.g., search by `Artist` instead of `ProductId`).  
- **Local Secondary Index (LSI):** Lets you query by a different sort key but same partition key.

---

## ✅ Simple Analogy
Think of DynamoDB like a **library shelf**:
- **Partition key = Shelf number** (groups related books).  
- **Sort key = Book title** (orders books on that shelf).  
- Attributes = Details inside the book (author, year, genre).  
- You can put different kinds of books on the same shelf — some have more details, some fewer.  

---

👉 In short: DynamoDB groups items by a **partition key**, distinguishes them with a **sort key**, and stores flexible attributes per item. That’s how you can model complex relationships without rigid tables.

---
# How DynamoDB differs from MongoDB data format

- **DynamoDB:**
  - Stores attribute–value pairs with types (String, Number, Map, List, etc.). You send and retrieve items as JSON over the API, but DynamoDB does not store raw JSON text; it stores typed attributes in its internal format.
  - Flexible schema per item, but strict on keys and partitioning behavior.

- **MongoDB:**
  - Stores documents in **BSON** (binary JSON). Collections hold JSON‑like documents with flexible schema; indexes are added to support query patterns.

- **Takeaway:** DynamoDB can store JSON‑like structures (Maps/Lists) and return JSON in APIs, but it’s not a “JSON file store.” Its design revolves around predictable access patterns, partitioning, and key design to ensure scale and low latency.

---

# Does AWS support MongoDB?

- **Amazon DocumentDB (with MongoDB compatibility):**
  - AWS’s managed document database with API compatibility for MongoDB drivers and tools. It’s not MongoDB under the hood, but it aims to support commonly used MongoDB features so many apps can migrate with minimal code changes.
- **MongoDB Atlas on AWS:**
  - MongoDB Inc. offers a fully managed MongoDB service (Atlas) that runs on AWS infrastructure. You can deploy clusters in AWS Regions via Atlas and purchase through AWS Marketplace.
- **Self‑managed on EC2:**
  - You can run community or enterprise MongoDB on EC2 if you want full control.

---

# Capacity, performance, and cost controls

## ⚡ Capacity Modes
This decides **how you pay and scale** for reads/writes:

- **On‑demand mode**  
  - You don’t set any limits. DynamoDB automatically handles traffic.  
  - You pay only for the requests you make.  
  - Best for apps where traffic is **unpredictable** (sometimes low, sometimes suddenly high).  
  - *Example:* A startup app that might get 100 users today but 10,000 tomorrow.

- **Provisioned mode**  
  - You set how many reads/writes per second your table can handle (RCUs = Read Capacity Units, WCUs = Write Capacity Units).  
  - You can enable **autoscaling** so DynamoDB adjusts capacity when traffic changes.  
  - Best for apps with **steady or predictable traffic**.  
  - *Example:* A payroll system that always processes about 1,000 records every day.

---

## 📦 Table Classes
This decides **how much storage costs** depending on how often you use the data:

- **Standard class**  
  - Default option.  
  - Best for data that is accessed **frequently**.  
  - *Example:* User profiles that are read every time someone logs in.

- **Infrequent Access (IA) class**  
  - Cheaper storage, but each read/write costs a little more.  
  - Best for data that is **rarely accessed** but still needs fast retrieval when used.  
  - *Example:* Archived customer orders from 5 years ago — you don’t read them often, but when you do, you still want millisecond speed.

---

## 🚀 Design for Performance
How you design your table affects speed and cost:

- **Even partition key distribution**  
  - DynamoDB splits data into “partitions.” If one partition gets too much traffic, it becomes a **hotspot** and slows down.  
  - Solution: Choose keys that spread traffic evenly.  
  - *Example:* Instead of using `Country=USA` as a key (too many items in one partition), use `UserId` so data is spread across many partitions.

- **Item size**  
  - Keep items small. Large files (images, videos) should go to **Amazon S3**, and DynamoDB should store only a reference (like a link).  
  - *Example:* Store `ImageURL` in DynamoDB, but keep the actual image in S3.

- **Access patterns first**  
  - DynamoDB works best when you design tables around how you will query them.  
  - Plan queries first, then design keys and indexes (GSIs/LSIs) to match.  
  - *Example:* If you know you’ll often query by `Email`, create a Global Secondary Index on `Email`.

---

## ✅ In Short
- **On-demand vs Provisioned** → Choose based on traffic predictability.  
- **Standard vs IA table class** → Choose based on how often you access data.  
- **Performance design** → Spread keys evenly, keep items small, and design tables around queries.

---

# DynamoDB Accelerator (DAX)

DAX is a fully managed, in‑memory cache specifically for DynamoDB. It sits in front of your table, caching query results and dramatically reducing read latency.

- **Latency:** Microseconds for reads vs single‑digit milliseconds from DynamoDB.
- **Integration:** Drop‑in with DAX SDK clients; same data model and APIs (GetItem, Query, Scan).
- **Use cases:** Read‑heavy or bursty workloads, hot keys, session caching, product catalog pages.
- **High availability:** Multi‑node clusters across AZs; managed failover.

#### DAX vs ElastiCache (Redis/Memcached)
- **DAX:** Purpose‑built for DynamoDB, understands its APIs, handles cache invalidation consistent with DynamoDB access patterns.
- **ElastiCache:** General caching for any data source (RDS, HTTP responses, computed results, etc.). You manage keys/TTL and cache logic; great for cross‑service caching and complex data structures.

Use DAX when your reads are primarily DynamoDB calls and you want minimal code changes. Use ElastiCache for broader caching needs beyond DynamoDB.

---

# Common patterns and real‑world use cases

- **User profiles and sessions:** Partition key = UserId; store profile and session items with different sort keys. DAX speeds profile reads; DynamoDB Streams feed updates to downstream systems.
- **IoT telemetry:** DeviceId as partition key; time‑ordered sort key (e.g., ISO timestamp). GSIs for querying by status or region; IA table class for historical data.
- **E‑commerce catalogs:** ProductId partition key; store variants, inventory, reviews under different sort keys. DAX for fast product detail pages; S3 for images; GSI to query by category.
- **Event sourcing:** AggregateId as partition key; sort key = event timestamp. Streams to Lambda for projections and search indexing.

---

# Practical guidance

- **Choose keys carefully:** 
  - **Partition key:** Distributes traffic. Use hashes or composite keys to avoid hotspots.
  - **Sort key:** Enables range queries and grouping related items.
- **Plan access patterns upfront:**
  - If you can list your reads/writes, you can design tables and GSIs to match and avoid expensive scans.
- **Use DAX for hot reads:**
  - Especially for GetItem/Query heavy endpoints with repetitive keys.
- **Use IA table class for cold data:**
  - Archive older items to IA or S3 + Athena for cost efficiency.
- **Global Tables (optional):**
  - For multi‑Region active‑active reads/writes with conflict resolution—use when you need local write/read in multiple Regions and very high availability.
