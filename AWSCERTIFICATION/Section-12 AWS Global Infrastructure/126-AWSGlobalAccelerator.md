# AWS Global Accelerator

- It is used to improve the global application **availability** and **performance** using the **AWS Global Network**.
- The idea is that your requests are going to be routed through the internal network we saw from before from AWS and this is going to allow you to optimize the route to your application for about 60%
- Eg, We have deployed an **application Load balancer** in India and users all around the world want to access our application. What they will do using the Gloabal Accelerator is actually connect to an edge location and the edge location will be routing the traffic directly into India. The benefit we get out of it is that the traffic on the public internet only happens between America and the closest edge location and then it leverages the private AWS network to speed up the connection from the Edge location to your application load balancer. So this is the same for Europe , for australia
- Also , you only access your application through two static IPs called **Anycast IPs** and then using the static Anycast IP, you will be redirected automatically to the correct edge locations and then the edge location will be sending the traffic to your application.

# Diagram 

## Without Global Accelerator

- Your clients to get to your application in your region can go through a lot of hops and an lot of network and there could be problems, latencies added to it.

## With Global Accelerator

- If you use Global Accelerator, then you just connect to an Edge location of AWS and then very quickly from the Edge Location to the region you're connecting to, it goes through the private AWS network which is much faster.


# AWS Global Accelerator VS CloudFront

- They both use the Global Network of AWS and the edge locations around the world.
- They will both integrate with AWS Shield for DDoS protection.
- But CloudFront is a **Content Delivery Network**
    - which is used to cache content at the edge such as images, videos , and websites
    - And the content is served at the edge with **CloudFront** because it is cached at the edge location

- For **Global Accelerator**
    - There is no caching, all the requests are going to be passed on from the edge locations back to your application in your regions
    - And so therefore what it's going to do is that it's going to improve the performance of these queries over a wide range of TCP or UDP .
    - Good for HTTP use case if you require a static IP address
    - Good for HTTP use cases that required fast deterministic , regional failover and good preformance.

## For a speed comparison for AWS Global Accelerator, you can go to link 
```
https://speedtest.globalaccelerator.aws/#/
```
- This allows you to see if Global Accelerator makes a difference compared to the public internet


---



## 🌍 What is an Anycast IP?

- **Anycast = one IP address, announced from many locations.**  
  - AWS Global Accelerator gives you **two static Anycast IPs**.  
  - These IPs are advertised from **all AWS edge locations worldwide**.  
  - When a user connects, the internet routing system automatically directs them to the **nearest edge location** (based on network distance).  

👉 Think of it like a **single phone number** that rings at the nearest branch office to the caller, no matter where they are in the world.

---

## 🖥️ What is an Elastic IP?

- **Elastic IP = one IP address tied to one AWS resource in one region.**  
  - It’s a static IPv4 address you can attach to an EC2 instance, NAT gateway, or load balancer.  
  - It only works in the region where you allocate it.  
  - If your server is in Mumbai, the Elastic IP is only reachable there — users everywhere connect directly to that region.

👉 Think of it like a **local office phone number** — it always rings in the same office, no matter where the caller is.

---

## 🔑 Key Differences

| Feature | **Anycast IP (Global Accelerator)** | **Elastic IP (EC2/NLB/ALB)** |
|---------|--------------------------------------|-------------------------------|
| **Scope** | Global (advertised from all AWS edge locations) | Regional (tied to one AWS region) |
| **Routing** | User connects to nearest edge → traffic carried over AWS backbone | User connects directly to the region over public internet |
| **Failover** | Automatic regional failover if endpoint unhealthy | Manual reassignment needed if instance fails |
| **Use case** | Global apps needing static IPs, fast routing, multi-region failover | Regional apps needing a fixed IP for whitelisting or DNS |
| **Caching** | No caching (just transport optimization) | Not applicable — it’s just an address |

---

## 🖼️ Example

- **Elastic IP:**  
  - You assign `203.0.113.25` to an EC2 in India.  
  - A user in the US connects → traffic travels across the public internet all the way to India.  

- **Anycast IP (Global Accelerator):**  
  - You get `198.51.100.10` as a static Anycast IP.  
  - A user in the US connects → traffic enters AWS at the nearest US edge location, then travels across AWS’s private backbone to India.  
  - A user in Europe connects → traffic enters AWS at a European edge location, then travels across AWS backbone to India.  
  - Same IP, but routing is optimized globally.

---

## ✅ Summary

- **Elastic IP = static IP in one region.**  
- **Anycast IP = static IP advertised globally, routing users to the nearest AWS edge, then over AWS’s backbone to your app.**  
- They are **not the same**: Elastic IP is regional, Anycast IP is global.

