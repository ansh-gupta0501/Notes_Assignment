# AWS CloudFront

- CloudFront is a **content delivery network or CDN.**
- It improves the read performance by **caching the content** of your website at the different **edge locations**. 
- And because your content is cached all around the world, then your users all around the world will have a lower latency and this will improve the user experience. 
- CloudFront is made of **hundreds** of **points of presence** globally and that includes **edge locations** and **caches** across the world .
- On top of it, by having the content distributed gloablly we are getting **DDos Protection.**
    - DDoS is a sort of attack where all your servers around the world are getting attacked at the same time
    - And the idea is that CloudFront because your application is worlwide then you're protected against these attacks also using something called **Shield** and **Web Application Firewall** 

- In the map , we can see some **edge locations** and **edge caches** and say we had created an S3 Bucket and a website on our S3 bucket in Australia but we had a user may be in America, then what the user will do is that it will request the content from an American edge locations using CloudFront and cloudfront will be able to fetch the content from Australia. Now if another user in the US will be requesting the same content, then it will be served directly from the edge and it will not go all the way to Australia to serve that content. Same if a user is in China , then we will be talking to a Chinese point of presence and then redirected to the S3 Bucket and then the content will be cached at the edge. 

## CloudFront - Origins
- CloudFront has several types of Origins which are basically backends you want to connect CloudFront to. 
- So we have **Amazon S3 Buckets**
    - For distributing files and caching them at the edge
    - To upload files to Amazon S3 directly through CloudFront
    - The connection between CloudFront and your S3 Bucket is secured using something called an **OAC (Origin Access Control)**
- You can also have a **VPC origin**
    - This is if you have an application hosted in private subnets , in a VPC, then for example it could be an Application Load Balancer, a Network Load Balancer , an EC2 instance. 
    - You can connect CloudFront directly to them privately.
- You can also have any **custom origin**. Anything that uses **HTTP** can be used in the backend.
    - For example, it could be a website hosted on Amazon S3. And first we must make sure that the S3 Bucket is enabled as a static S3 website.
    - Or Any public HTTP backend you want within or outside of AWS. 

## CloudFront at a high level. 

- We have the edge location all around the world. And then it will be connecting to your origin. So would it be an S3 Bucket or an HTTP server?
- And when the client connects and does an HTTP request into your edge location, then the edge location will see if it has it in the cache, if it doesn't have it in the cache, then it will go to the origin to get the request results.
- And once it retrieves the results, it will be caching it into a local cache so that if another client requests the same content from the same edge location, then the edge location does not need to go to the origin.

## CloudFront - S3 as an Origin
- Your S3 bucket is your origin in some region 
- Then you have edge locatons all around the world for example , at Los Angeles.
- And your users accessing the edge location in Los Angeles will get their content directly served through the edge location. But first the edge location will get it from the origin S3 bucket through the private network
- And the S3 bucket will be secured using **Origin Access Control** and by modifying the S3 bucket policy on the S3 bucket
- This is the same when we have user in Sao Paulo, for example, in Brazil. So again this will be another edge location which will be serving users close to Brazil and then it will be a private connection between your edge location and your S3 bucket
- So using CloudFront and the edge locations we can see that the content of our S3 bucket in one region can be distributed all around the world through the edge locations and points of presence

## CloudFront VS S3 Cross Region Replication. 
- If using CloudFront
    - you are using Global Edge network so this is about 216 points of presence
    - Files are going to be cached in each edge locations mayby for a day.
    - So this is amazing if you have static content that must be able to be available everywhere around the world
- If using S3 Cross Region Replication
    - It must be setup for each region you want replication to happen.So this is not for every region in the world
    -  Files are going to be updated in near real-time , so there's no caching that happens
    - It is only for read-only
    - This is great if you have dynamic content that needs to change all the time and be available at low latency in a few regions

---

# AI Explanation 
# CloudFront content delivery and caching explained

---

## Core concepts and terminology

- **CDN (Content Delivery Network):**  
  A globally distributed network that serves content (files, APIs, pages) from locations close to users to reduce latency.

- **Points of presence (PoPs) and edge locations:**  
  CloudFront runs at hundreds of global sites (PoPs). At each PoP, an **edge location** receives user requests, checks a **cache**, and either serves content instantly or fetches it from your origin.

- **Origin:**  
  The source of truth for content. Common origins:  
  - **Amazon S3 bucket:** Static files (images, JS, CSS, downloads).  
  - **HTTP servers:** ALB/NLB/EC2, containers, or any public HTTP backend.  
  - **Private VPC origin:** Your app inside a VPC, accessed via CloudFront with secure private connectivity.

- **Cache:**  
  Temporary storage at the edge location that holds recently requested content. Reduces trips to origin, lowers latency, and cuts origin load.

- **Cache key:**  
  The set of request attributes CloudFront uses to decide “are two requests the same?” Typically includes path and optionally query string, headers, cookies. The more you include, the lower the cache hit ratio.

- **TTL (time to live):**  
  How long a cached object stays at the edge before CloudFront revalidates/refreshes from origin. You control it via origin headers or CloudFront cache policies.

- **OAC (Origin Access Control):**  
  A security mechanism to let CloudFront access your S3 bucket privately, while blocking the public internet. OAC signs requests from CloudFront so S3 trusts them. (It’s the modern replacement for OAI.)

- **DDoS, Shield, and WAF:**  
  - **DDoS (Distributed Denial of Service):** Overwhelming traffic meant to exhaust resources.  
  - **AWS Shield:** Always-on network-layer protection (Standard is included; Advanced adds features).  
  - **AWS WAF (Web Application Firewall):** Layer-7 rules to block malicious requests (SQLi, XSS, bad bots), applied on CloudFront distributions.

---

## How CloudFront works at a high level

- **Step 1: User request to edge**  
  A user in Los Angeles requests https://d123.cloudfront.net/image.jpg (or your own domain via CloudFront). The request lands at the nearest CloudFront **edge location**.

- **Step 2: Cache check**  
  CloudFront looks in the **local cache** using the **cache key** (path + selected query string/headers/cookies):  
  - **Cache hit:** Return immediately from edge → fast.  
  - **Cache miss:** Fetch from origin (S3 or HTTP service), store in cache, then return.

- **Step 3: Subsequent users nearby**  
  Nearby requests get served from the **edge cache** until TTL expires or invalidation occurs.

- **Step 4: Security and controls**  
  Apply WAF rules, enforce HTTPS, require signed URLs/cookies for private content, and use OAC for S3 privacy.

---

## CloudFront origins in practice

### S3 as an origin
- **Use cases:** Static websites, media, downloads, SPA assets.  
- **Security with OAC:**  
  - **S3 bucket policy**: Only allow requests that come from your CloudFront distribution via OAC.  
  - **Result**: S3 is not publicly readable; users must go through CloudFront.
- **Static website hosting vs REST endpoint:**  
  - **Static website hosting (website endpoint)** supports index/error pages but is public-only.  
  - **REST S3 endpoint** with OAC is preferred for private secure delivery (no public bucket).

### VPC/ALB/EC2 as an origin
- **Use cases:** Dynamic web apps, APIs, microservices.  
- **Private connectivity:** Use CloudFront with a private ALB/NLB or secure origin paths. Combine with AWS WAF and Shield.  
- **Cache strategy:** Cache static assets aggressively; bypass or short TTL for dynamic API responses.

### Custom HTTP origin
- **Use cases:** Any publicly reachable HTTP/S backend, inside or outside AWS.  
- **Controls:** TLS, header forwarding rules, origin request policies, and WAF for security.

---

## Caching behavior and controls

- **What gets cached:**  
  By default, GET/HEAD responses. You decide how query strings, headers, and cookies affect the cache via **cache policies**.

- **Set TTLs:**  
  - **Origin headers** (Cache-Control, Expires) or CloudFront cache policy can set TTL.  
  - **Short TTL:** Fresher content; more origin fetches.  
  - **Long TTL:** Better performance; fewer origin calls.

- **Invalidations:**  
  Manually tell CloudFront to purge paths when content changes. Use sparingly (costs per path beyond free tier), or version your files (e.g., /assets/app.abc123.js) to avoid invalidations.

- **Compression and optimization:**  
  - **Gzip/Brotli** at the edge for text assets.  
  - **Image formats** (WebP/AVIF) and responsive variants reduce payloads.  
  - **HTTP/2/HTTP/3** support improves performance.

---

## Security layers and access control

- **HTTPS everywhere:**  
  Use ACM certificates with your custom domain (e.g., cdn.yourdomain.com or www.yourdomain.com) → encrypt data in transit.

- **OAC for S3:**  
  Block public access at S3; allow CloudFront via OAC and bucket policy. Prevents direct S3 hotlinking.

- **Signed URLs/cookies:**  
  Restrict content access to authenticated or authorized users (e.g., paid downloads, premium videos). CloudFront validates the signature before serving.

- **AWS WAF:**  
  Attach rulesets (managed or custom). Block common attacks, rate-limit abusive clients, and filter by country or patterns.

- **Shield Standard (included):**  
  Baseline DDoS protection on CloudFront. Shield Advanced adds enhanced protections, cost safeguards, and 24/7 DRT access.

---

## CloudFront versus S3 Cross-Region Replication (CRR)

### What CloudFront gives you
- **Global presence:**  
  Content available from hundreds of **edge locations** worldwide.
- **Caching:**  
  Repeated requests served locally from the edge for the TTL duration (often minutes to hours or a day, configurable).
- **Performance:**  
  Lower latency, fewer origin hits, offloads bandwidth and compute.  
- **Security and controls:**  
  WAF, Shield, OAC, signed URLs, HTTPS, header policies, and detailed logging (CloudFront Standard Logs/Realtime logs).

### What S3 CRR gives you
- **Replication of objects between S3 buckets in selected regions:**  
  Not global; you pick specific regions to replicate to.
- **Near real-time updates:**  
  New or updated objects replicate to target regions (eventual consistency on metadata). No caching; each region has a full copy.
- **Read/locality:**  
  Users in those target regions read from a local S3 bucket → reduced latency without a CDN.
- **Limitations:**  
  - **Not a CDN:** No edge caching, no WAF/Shield integration at the edge, no signed URL enforcement by default.  
  - **Write model:** Primarily for read distribution; multi-region write patterns require careful design (conflict handling).  
  - **Cost and complexity:** Storage and replication costs per region; you manage multiple buckets and policies.

### When to choose which
- **Choose CloudFront** when you want global performance, edge caching, security controls, and reduced origin load. Ideal for websites, assets, streaming, APIs (with careful cache rules).
- **Choose S3 CRR** when you need copies of data in specific regions for compliance, locality, or disaster recovery, and your access pattern reads directly from S3. Combine with CloudFront if you want both replicated data and edge acceleration.

---

## Practical example: S3 in Australia, users in the US and China

- **First US request:**  
  Hits the US edge location → cache miss → CloudFront fetches from the S3 origin in Australia via AWS’s backbone → returns to user and caches it.
- **Second US request for same file:**  
  Cache hit at US edge → served instantly, no trip to Australia.
- **User in China:**  
  Hits a nearby point of presence → same logic (miss then cache). Each edge location maintains its own cache.

---

## Best practices for a clean, production setup

- **Use OAC with S3 and block all public S3 access.**
- **Keep cache keys minimal** (path + needed query params). Don’t forward all headers/cookies unless necessary.
- **Version static assets** (e.g., app.1.2.3.js) → change file names on deploy; avoid mass invalidations.
- **Set sensible TTLs:**  
  - Static assets: long TTL (hours to days).  
  - Dynamic pages/API: short TTL or no-cache; rely on origin.
- **Enable HTTPS** with ACM and force redirect HTTP→HTTPS.  
- **Attach WAF** with managed rules, plus rate limits on abusive patterns.  
- **Log and monitor:**  
  - CloudFront logs to S3; Realtime logs for high-traffic troubleshooting.  
  - Use CloudWatch metrics (CacheHitRate, 4xx/5xx, Requests).
- **Cost awareness:**  
  Data transfer out, requests, invalidations (beyond free), WAF/Shield Advanced, and logging have costs; design for cache efficiency.

---

## Quick mental model

- **CloudFront = global “fast lanes” with smart local memory.**  
  It brings your content close to users, remembers popular files, protects at the edge, and offloads your origin.
- **S3 CRR = multiple warehouses of the same goods in selected cities.**  
  You maintain full copies in chosen regions, but there’s no edge memory or global security controls unless you add CloudFront on top.

---

