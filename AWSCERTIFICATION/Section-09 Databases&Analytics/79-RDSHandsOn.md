- Go to RDS service and in Databases , create database
- First we have to choose a **database creation method**
    - Full configuration : You set all of the configuration options, including ones for availability, security, backups, and maintenance.
    - Easy create : Use recommended best-practice configurations. Some configuration options can be changed after the database is created.
- For now choose Full Configuration, 
- Next we have different Engine options to select like Aurora(MySQL compatible) , Aurora(PostgreSQL Compatible), MySQL , PostgreSQL , MariaDB, Orace, Microsoft SQL server, IBM Db2. For now select MySQL 
- We choose edition MySQL Community
- Next choose version . Choose the latest version of MySQL.
- Next we choose template to launch our MySQL RDS database.
    - Production template : Use defaults for high availability and fast consistent performance.
    - Dev/Test template : This instance is intended for development use outside of a production environment.
    - Free tier : Use RDS Free Tier to develop new applications, test existing applications, or gain hands-on experience with Amazon RDS.
- Next we have **Availability and durability** where we have to choose **Deployment options**
    - Choose the deployment option that provides the availability and durability needed for your use case. AWS is committed to a certain level of uptime depending on the deployment option you choose. 
        - Multi-AZ DB cluster deployment (3 instances)
            - Creates a primary DB instance with two readable standbys in separate Availability Zones. This setup provides:
                - 99.95% uptime
                - Redundancy across Availability Zones
                - Increased read capacity
                - Reduced write latency
        - Multi-AZ DB instance deployment (2 instances)
            - Creates a primary DB instance with a non-readable standby instance in a separate Availability Zone. This setup provides:
                - 99.95% uptime
                - Redundancy across Availability Zones
        - Single-AZ DB instance deployment (1 instance)
            - Creates a single DB instance without standby instances. This setup provides:
                - 99.5% uptime
                - No data redundancy
    - For now choose Single-AZ DB instance Deployment
- Next under settings, type your **DB instance identifier** where you will write name of your DB instance. So write **database-1**
    - The DB instance identifier is case-insensitive, but is stored as all lowercase (as in "mydbinstance"). Constraints: 1 to 63 alphanumeric characters or hyphens. First character must be a letter. Can't contain two consecutive hyphens. Can't end with a hyphen.
- Next under credentials settings
    - write master username so write admin
    - next You can use **AWS Secrets Manager** or manage your master user credentials.
        - Managed in AWS Secrets Manager - most secure
            - RDS generates a password for you and manages it throughout its lifecycle using AWS Secrets Manager.
        - Self managed
            - Create your own password or have RDS create a password that you manage.
    - Now enter password
- Next **database class** : It is now a burstable class of t4g.micro
    - Note for different template we choose different database class
- Next we have storage settings 
    -   Choose storage type
    - We can enable 20 gigabytes of gp2 SSD storage. 
    - We can also have storage autoscaling which Provides dynamic scaling support for your database’s storage based on your application’s needs. Enabling this feature will allow the storage to increase after the specified threshold is exceeded.
    - Give maximum of like one terabyte, 1000 gigabytes threshold

- Now **connectivity** where do you want to lauch the database? So we specity a VPC and subnet group
    - Set **compute resource** as **don't connect to an EC2** and network type as IPv4. in compute resouce we Choose whether to set up a connection to a compute resource for this database. Setting up a connection will automatically change connectivity settings so that the compute resource can connect to this database
    - Next we have to choose do we want **public access** or not
        - If Yes
            - RDS assigns a public IP address to the database. Amazon EC2 instances and other resources outside of the VPC can connect to your database. Resources inside the VPC can also connect to the database. Choose one or more VPC security groups that specify which resources can connect to the database.
        - If No
            - RDS doesn't assign a public IP address to the database. Only Amazon EC2 instances and other resources inside the VPC can connect to your database. Choose one or more VPC security groups that specify which resources can connect to the database.
        - Choose yes as we want to able to connect to our database from our computer if we don't have direct connectivity into AWS. 
    - Then we assign some security group or can create new security group
        - Name it demo-database-rds
        - Choose AZ as no preference
        - Database port is 3306 default
    - Then we have **RDS Proxy**
        - RDS Proxy is a fully managed, highly available database proxy that improves application scalability, resiliency, and security.
            - Create an RDS Proxy : RDS automatically creates an IAM role and a Secrets Manager secret for the proxy. RDS Proxy has additional costs. 

    - Then we have **Certificate authority - optional**
        - Using a server certificate provides an extra layer of security by validating that the connection is being made to an Amazon database. It does so by checking the server certificate that is automatically installed on all databases that you provision. If you don't select a certificate authority, RDS chooses one for you.
- Now **Database authentication**. How do we want to authenticate the database?
    - Password authentication : Authenticates using database passwords.
    - Password and IAM database authentication : Authenticates using the database password and user credentials through AWS IAM users and roles.
    - Password and Kerberos authentication : Choose a directory in which you want to allow authorized users to authenticate with this DB instance using Kerberos Authentication.

- Keep rest as default 
- Create database
- Now we will have endpoint and port if you wanted to connect to it. 
- We will have VPC security group that has been created for my RDS instance. 
- We can see the inbound rules on the port 3306 into my instance so that means that i can use the correct port to connect to my MySQL database instance. 
- If we look under monitoring tab , as this is a managed service, we have some information around the CPU utilization 
- We can also take **snapshot** of our database and this snapshot will allow you to restore the database into another one. 
    - Write snapshot name as demo-snapshot
    - We can do **restore snapshot** which allow me to create a new database out of this snapshot. It is for like if you wanted to create a bigger database or create a copy of the database or create a different settings for your database and so on. 
    - We can also **copy snapshot** to a differnet region. It will be helpfull if you wanted to restore the database into another region of AWS. 
    - We can **share snapshot** and sharing snapshot allows you to share with other accounts so they can restore their databases directly from your snapshot.


---

## Overview

## Database creation method

- **Full configuration:**  
  Lets you control high availability, security, backups, maintenance windows, networking, and more. Use this in production or regulated environments where defaults aren’t enough.  
  **Example:** A fintech app must pin maintenance windows outside trading hours and enforce encryption and private networking.

- **Easy create:**  
  Applies AWS best-practice defaults. Good for quick dev environments or proof-of-concepts where speed matters more than fine-grained control.  
  **Example:** A startup prototype spinning up a test DB in minutes to validate schema changes.

---

## Engine and version selection

- **Engine options:**  
  Choose Aurora (MySQL/PostgreSQL compatible) or RDS engines (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, IBM Db2). Aurora is cloud-native with distributed storage and fast failover; standard RDS runs familiar engines as managed services.  
  **Example:** A gaming backend using Aurora MySQL for bursty traffic scaling; an ERP migration using RDS SQL Server to keep engine features.

- **Edition (MySQL Community):**  
  The open-source distribution of MySQL with wide tooling support and no licensing fees.  
  **Example:** A SaaS analytics service choosing MySQL Community to avoid commercial license complexity.

- **Version (latest):**  
  Prefer the latest supported minor version for performance, security patches, and features. Pin versions intentionally if an app depends on specific behavior.  
  **Example:** Upgrading to leverage JSON functions while confirming ORM compatibility in staging first.

---

## Templates and instance class

- **Production template:**  
  Defaults prioritize high availability, consistent performance, backups, and monitoring.  
  **Example:** An e-commerce site ensures Multi-AZ and automated backups before holiday traffic.

- **Dev/test template:**  
  Lower cost, reduced redundancy, suitable for experimentation.  
  **Example:** Engineering CI pipelines that spin up ephemeral databases.

- **Free tier:**  
  Budget-friendly for learning and small experiments.  
  **Example:** New developers practicing RDS setup without costs.

- **Database class (t4g.micro burstable):**  
  Burstable instances provide baseline CPU with credit-based bursts, ideal for intermittent workloads. ARM-based “g” classes are cost-efficient; ensure library/runtime compatibility.  
  **Example:** A backend with predictable low load that occasionally spikes on report generation.

---



## Availability and durability deployment options 

**1. Multi-AZ DB Cluster (3 instances)**

- You get one main database (writer) and two backup databases (readable standbys) in different Availability Zones (data centers).

- If the main one fails, one of the backups takes over quickly.

- You can also use the backups to handle extra read traffic (like many users reading data at the same time).

- Very reliable: 99.95% uptime.

- When to use: If your app has lots of users reading data (like social media feeds, product catalogs).

- Example: A social app where thousands of people are constantly checking profiles and posts. The read replicas help spread the load.

**2. Multi-AZ DB Instance (2 instances)**
- You get one main database (writer) and one backup database (standby) in another Availability Zone.

- If the main one fails, the standby takes over.

- But the standby cannot be used for reading — it’s only there for backup.

- Still very reliable: 99.95% uptime.

- When to use: If you just need high availability (HA) and don’t care about scaling reads.

- Example: A banking or fintech system where accuracy of writes (transactions) is more important than handling lots of reads.

**3. Single-AZ DB Instance (1 instance)**
- Only one database in one Availability Zone. No backups or standbys.

- Cheapest option.

- But if it fails, your app will be down until you restore from a backup.

- Reliability is lower: 99.5% uptime.

- When to use: For testing, development, or apps that can tolerate downtime.

- Example: An internal tool used by employees where downtime is acceptable.

**Exam Mindset (Quick Shortcut)**
- Need read scaling + disaster recovery → Multi-AZ Cluster

- Need simple high availability (HA) → Multi-AZ Instance

- Need cheapest option for dev/test → Single-AZ Instance

---

## Settings and credentials

- **DB instance identifier (“database-1”):**  
  Naming constraints ensure consistency. Use meaningful names with environment prefixes.  
  **Example:** prod-mysql-orders-ap-south-1.

- **Master username (“admin”):**  
  Create role-based application accounts later; avoid using master credentials in app connections.  
  **Example:** App roles like app_reader, app_writer with least-privilege grants.

- **Secrets management:**  
  - **Managed in Secrets Manager:** RDS generates and rotates the password; your app retrieves it securely.  
    **Use when:** Security and rotation are priorities.  
    **Example:** Healthcare app with strict credential rotation policies.  
  - **Self-managed:** You set and rotate passwords manually.  
    **Use when:** Legacy workflows or external secret stores.  
    **Example:** Enterprise using HashiCorp Vault to centralize secrets across platforms.

---

## Storage settings

**1. Storage Type (gp2 SSD with autoscaling)**
- gp2 SSD → This is the default storage type in RDS. It’s like a solid-state drive that balances speed and cost.

- Autoscaling → If your database runs out of space, AWS automatically increases the storage size up to the maximum you set (e.g., 1000 GB).

- You don’t have to worry about your database crashing because it ran out of space.

- Example: Imagine you run a SaaS app where customers upload files. You don’t know how fast storage will grow. Autoscaling makes sure the database keeps running even if one customer suddenly uploads a huge dataset.

**2. Storage Autoscaling Behavior**
- Storage can only grow, it does not shrink back down.

- If your database grows to 500 GB, even if you delete data later, it won’t go back to 200 GB automatically.

- Best practice: Use archiving and lifecycle policies to move old data to cheaper storage like Amazon S3.

- Example: A company keeps sales records in RDS. After 2 years, they move old records to S3 for cheaper storage, so the database doesn’t keep growing unnecessarily.

**3. Performance Considerations**
- In AWS, more storage = more performance (because larger volumes give higher baseline throughput and IOPS).

- IOPS (Input/Output Operations per Second): How many read/write operations your storage can handle.

- Throughput: How much data can be transferred per second.

- Buffer pool hit rate: How often queries are served from memory instead of disk (higher is better).

- Example: An analytics company runs heavy queries on customer data. They increase storage size to get better performance, tune MySQL’s innodb_buffer_pool_size to optimize memory usage, and use read replicas to spread the query load.

---
## Connectivity, networking, and security

- **VPC and subnet group:**  
  Choose subnets across AZs for resilience. Private subnets with controlled ingress are standard in production.  
  **Example:** Banking app isolates DB in private subnets, accessed via app servers and bastion hosts only.

- **Compute resource (don’t connect to EC2):**  
  If you link a compute resource, AWS preconfigures connectivity. Skipping it gives you manual control.  
  **Example:** Microservices across ECS/EKS subnets require custom security group rules.

- **Public access (Yes):**  
  Assigns a public IP so you can reach the DB from your laptop. Use tight security groups, client-side TLS, and IP whitelisting.  
  **Risk:** Increased attack surface; prefer VPN/Direct Connect/Client VPN for production.  
  **Example:** A demo environment for a workshop where attendees connect from home.

- **Security groups (“demo-database-rds”):**  
  Allow inbound TCP 3306 from specific IPs or app security groups, not 0.0.0.0/0.  
  **Example:** Allow only the app ECS task group and the office IP range.

- **AZ preference (no preference):**  
  RDS places the instance optimally. Pin AZs only if you have data locality or quota constraints.

- **Port 3306:**  
  Default MySQL port. Change only if you need obfuscation (not security), and ensure clients match.

- **RDS Proxy:**  
**Purpose:**
- Connection pooling: Instead of each app opening its own connection to the database (which can overwhelm MySQL), RDS Proxy keeps a pool of ready connections and shares them.

- Fast failover: If the database fails over to a standby, the proxy helps apps reconnect quickly without errors.

- Secrets integration: Works with AWS Secrets Manager so apps don’t need to store passwords.

- IAM auth support: Lets apps use AWS IAM roles instead of static passwords for authentication.

-**When to use**:
- Serverless apps (like AWS Lambda) that open many short-lived connections.
- High-concurrency apps where thousands of users connect at once.

- Example: A ticketing platform during a flash sale. Thousands of people try to buy tickets at the same time. Without RDS Proxy, the database could crash from too many connections. With RDS Proxy, connections are pooled and managed smoothly.

- **Certificate authority (optional):**  
  Use TLS to verify the server’s certificate and encrypt the wire. your app trusts only the specific certificate authority AWS uses, so if AWS rotates certificates, your app won’t break.  
  **Example:** A compliance-bound app failing closed if TLS validation doesn’t pass.

---

## Database authentication

- **Password authentication:**  
  Simple and universal. Rotate regularly; store in Secrets Manager.  
  **Example:** Small SaaS with stable app fleets.

- **Password + IAM database authentication:**  
  Uses short-lived auth tokens via IAM, reducing static password exposure.  
  **Example:** Serverless APIs on Lambda with no long-lived secrets on disk.

- **Password + Kerberos:**  
  Integrates with a directory service (e.g., Microsoft Active Directory) for centralized auth and auditing.  
  **Example:** Large enterprise aligning DB auth with corporate SSO and audit trails.

---

## Monitoring, endpoints, and operations

- **Endpoint and port:**  
  App connects via the provided hostname and port 3306. For HA, clients should gracefully handle failovers.

- **Monitoring (CPU, memory, I/O, connections):**  
  Use CloudWatch metrics and Enhanced Monitoring/Performance Insights to diagnose slow queries and resource hotspots.  
  **Example:** Noticing CPU spikes during cron jobs and moving batch queries to a read replica.

- **Maintenance windows:**  
  Schedule OS/engine patching when traffic is low. Test change impact in staging first.  
  **Example:** Retail platform sets Sunday 2–4 AM local time for maintenance.

---

## Snapshots: create, restore, copy, and share

- **Manual snapshot (“demo-snapshot”):**  
  Point-in-time copy you trigger on demand.  
  **Use cases:**  
  - **Pre-change safety:** Take a snapshot before schema migrations.  
  - **Release rollbacks:** Revert quickly if deployment breaks the database.  
  - **Compliance:** Retain immutable copies for audits.

- **Restore snapshot (create new DB):**  
  Spins up a new RDS instance from the snapshot.  
  **Use cases:**  
  - **Blue/green migrations:** Restore to a new instance, run validations, then cut over.  
  - **Performance testing:** Clone production data (with masking) into a larger class to test index changes.  
  - **Incident recovery:** Rapidly rebuild after data corruption.

- **Copy snapshot (to another region):**  
  Replicates the snapshot cross-region.  
  **Use cases:**  
  - **Disaster recovery:** Keep restorable copies in a secondary region.  
  - **Latency experiments:** Restore in a closer region to test geo-distributed access.  
  - **Regulatory needs:** Maintain data in a region aligned with legal requirements.

- **Share snapshot (with other AWS accounts):**  
  Grant another account access to the snapshot to restore their own DB.  
  **Use cases:**  
  - **B2B integrations:** Partners restore your reference dataset for integration testing.  
  - **Mergers/acquisitions:** Transfer operational data between entities securely.  
  - **Multi-account setups:** Central data team shares golden snapshots to app-team accounts.

- **Best practices for snapshots:**  
  - **Sanitization:** Mask PII before sharing or restoring to lower environments.  
  - **Tagging:** Add purpose, environment, retention, owner tags for governance.  
  - **Lifecycle:** Define retention policies to control costs.

---

## Practical scenarios and decision tips

- **E-commerce production:**  
  - **Availability:** Multi-AZ instance or cluster.  
  - **Reads:** Read replicas for catalog queries.  
  - **Auth:** Password + IAM for stateless services.  
  - **Snapshots:** Before promotions and schema changes.

- **Fintech/regulated:**  
  - **Networking:** Private subnets, no public access.  
  - **Secrets:** Managed in Secrets Manager with rotation.  
  - **TLS:** Enforce CA validation.  
  - **DR:** Copy snapshots cross-region; run periodic restore drills.

- **SaaS multi-tenant:**  
  - **Burstable class for dev/test, provisioned for prod.**  
  - **Autoscaling storage with quotas.**  
  - **RDS Proxy for connection storms.**  
  - **Shared snapshots for staging parity (with data masking).**

- **Serverless APIs:**  
  - **Aurora Serverless or RDS + RDS Proxy.**  
  - **IAM auth tokens to avoid static secrets.**  
  - **Public access off; use VPC integration.**

---

## Common pitfalls to avoid

- **Overly broad security groups:**  
  Don’t open 3306 to the world; restrict by IP or security group references.

- **Skipping TLS certificate validation:**  
  Leads to man-in-the-middle risk; pin CA bundles in clients.

- **Assuming autoscaling reduces storage:**  
  It grows but doesn’t shrink; manage data lifecycle.

- **Using master user in applications:**  
  Creates security and operational risk; enforce least privilege.

- **Ignoring maintenance windows:**  
  Unexpected reboots or patching during peak hours can cause outages.

---