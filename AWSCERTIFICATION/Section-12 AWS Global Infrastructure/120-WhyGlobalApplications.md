# Why would make a Global Application?

- A global Application is an application that will be deployed in **multiple geographies**.
- And when you translate this onto AWS, that could means that you deploy your application onto different **AWS Regions** or **Edge Locations**. 
- With this, your users around the world will have
    - **Decreased Latency**
        - **Latency** is the time it takes for a network packet to reach a server
        - It takes a lot of time for a packet from Asia to reach the US.
        - So if you have user in india, for example, and your servers in the US, they will be have more lag, it will be having more latency
        - But if you deploy your applications closer to users, they will have better experience. 
        - So if we deploy our application in the US and in Asia, then both our users in the US and both our users in Asia will have a better latency because it will be fast to reach your application servers. 
    - **Disaster Recovery (DR)**
        - The idea is that you don't wanna rely on only one data center or one region. 
        - For example , if an entire region goes down because of an earthquake or a storm , a power shutdown , politics , whatever then by having a disaster recovery strategy in place, you can fail-over to another region an your application will still be working. 
        - So a DR is important to increase the availability of your application. 
    - **Attack Protection**
        - It is for hackers online to attack your application to try to take it down for various reasons 
        - And so if you have your application across multiple regions and distributed globally , then it's going to be much harder for an attacker to attack all of these locations at once.


# Global AWS Infrastructure 

- Regions - Where we are deploying our applications and infrastructure. They are made of multiple **availability zones**
- Availability Zone - They are made themselves of multiple data centers. AZs are present at distant locations from one another but still these AZ are linked some very , very fast network
- Edge locations - Also called **Points of Presence**. They are used for  **content delivery** to be as close as possible to users. You cannot deploy an application there but something like **CloudFront** will be using it. So if see in map, if we look at California, we have pink dots right here all around the US so that even your users that are close to the Mexico border or even are in Mexico get some fast connection to AWS. 

- There is a network between all the regions and all the AZs and all the point of presence and that network is really , really very stable. This is a network from AWS. So all this is **private**. AWS actually installed cables under the water to link , for example, between Europe and the US or to link between Europe and Africa and so on. 

---



## 🌍 AWS Regions
- **Definition:** A physical geographic area (like *US East (N. Virginia)* or *Asia Pacific (Mumbai)*).  
- **Contains:** Multiple **Availability Zones (AZs)**, each with isolated data centers.  
- **Purpose:** Where you actually run your compute, storage, and databases (EC2, RDS, S3, etc.).  
- **Use case:** Deploy applications close to your users or meet compliance requirements.

---

## 📡 AWS Edge Locations
- **Definition:** Smaller data centers located in **hundreds of cities worldwide**, closer to end‑users than Regions.  
- **Purpose:** Primarily used by **Amazon CloudFront (CDN)** and other edge services (like Route 53, Global Accelerator, AWS WAF).  
- **Function:**  
  - Cache content (static files, media, APIs) near users for faster delivery.  
  - Reduce latency by serving requests locally instead of always going back to the Region.  
  - Handle DNS resolution, DDoS protection, and traffic routing at the “edge” of the AWS network.  
- **Use case:** If you deploy a web app in *US East (Virginia)* but have users in India, CloudFront will serve cached content from an **Edge Location in Hyderabad or Mumbai**, making it feel faster.

---

## ✨ Simple analogy
- **Region:** Your main office building where all employees (servers) work.  
- **Edge Location:** Small branch offices spread across the world that deliver documents quickly to local customers without them traveling to the main office.

---

## 🏢 Industry standard usage
- Applications are deployed in **Regions** (compute, storage, databases).  
- Content delivery and latency optimization are handled by **Edge Locations** via CloudFront and related services.  
- Together, they ensure both **scalability** (Regions) and **performance** (Edge Locations).

---

So in your sentence:  
- **Deploying to Regions** = running your app in multiple geographic data centers.  
- **Using Edge Locations** = caching and serving content closer to users for speed and reliability.  

---



## 🏢 AWS Region
- **Mumbai** is indeed an **AWS Region** (called `ap-south-1`).  
- A **Region** is a large geographic area where AWS has infrastructure.

---

## 🏬 Availability Zones (AZs)
- Inside a Region (like Mumbai), there are **multiple Availability Zones**.  
- Each AZ is made up of **one or more physical data centers** with independent power, cooling, and networking.  
- AZs are designed to be isolated from each other to provide high availability — if one AZ fails, others keep running.

---

## 📡 Edge Locations
- **Edge Locations are different**: they are **not the same as AZ data centers**.  
- Edge Locations are **smaller data centers spread across the world**, used mainly by **Amazon CloudFront (CDN)**, Route 53, Global Accelerator, and AWS WAF.  
- Their job is to **cache and deliver content closer to users** (reduce latency).  
- **Example: Even if your app is hosted in the Mumbai Region, users in Delhi or London might get static content served from a nearby **Edge Location** instead of going all the way to Mumbai.**

---

## ✅ Corrected understanding
- **Mumbai Region** → contains **multiple AZs**.  
- **AZs** → each has one or more **data centers**.  
- **Edge Locations** → separate from Regions/AZs, used for **content delivery at the network edge**, not for running your EC2/RDS workloads.

---

## ✨ Quick analogy
- **Region (Mumbai):** The city where AWS has a big campus.  
- **Availability Zone:** Different office buildings in that city, each independent but connected.  
- **Edge Location:** Small branch offices scattered worldwide, just to deliver documents faster to local customers.

---

So: **data centers inside AZs are not called edge locations**. Edge locations are a separate global network for caching and delivery.  
