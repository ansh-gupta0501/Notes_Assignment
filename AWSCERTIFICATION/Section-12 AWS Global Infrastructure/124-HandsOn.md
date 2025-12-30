# Hands-On for CloudFront

- First , create S3 bucket to hold our files for our distribution.
    - Name it **democloudfrontv5**
    - Rest keep everything default
    - Now upload files in it .(upload beach , coffee, index.html)
    - Now if we open the index.html file using object url , it will now open because it is not public, and if we either open it using the open button , the text will shown but the image will not shown as image itself is not public
- So now we see using cloudFront, to make these files accessible without making them public
- Open a cloudfront console and create a **cloudfront distribution**
    - Give name for the distribution **DemoCloudFrontDistribution**
    - Now choose Distribution type
        - Single website or app : Choose if each website or application will have a unique configuration.
        - Multi-tenant architecture : Choose when you have multiple domains that need to share configurations. This is a common architecture for SaaS providers.
    - For need to select **Custom-domain**  which is optional so we don't select now as we don't have custom domain. We are going to use domain name of cloudfront. 
        - Route 53 managed domain - optional
        Enter a domain that's already registered with Route 53 in your AWS account. CloudFront will provision a TLS certificate for you. If you have a domain from a different DNS provider, skip this step and configure your domain later.
- Next we need to choose **Orgin** type. Your origin is where your content (such as a website or app) lives. CloudFront works with AWS-based origins and origins hosted on other cloud providers.
    - Amazon S3 : Deliver static assets like files and images, statically generated websites or single page applications (SPA).
    - Elastic Load Balancer : Deliver applications hosted behind ELB such as dynamic websites, web services, and APIs.
    - API Gateway : Deliver API endpoints for REST APIs hosted on API Gateway.
    - Elemental MediaPackage : Deliver end-to-end live events or video on demand (VOD).
    - VPC origin: Deliver applications and content hosted within private VPCs, such as EC2 instances and Application Load Balancers.
    - Other: Refer to any AWS or non-AWS origin through its publicly resolvable URL.
- We choose Amazon S3 , then we need to choose an origin which is your bucket you made 
- Then choose origin path which is optional , this is where you content is stored, but as we stored everything in the root of our buckets, so we keep it empty 
- Next for settings , we want to allow private S3 bucket access to cloudFront. So this is going to allowy cloudfront to access the buckets directly, privately and modify the bucket policy automatically. So we don't need to make objects in our bucket public. CloudFront is going to create what's called an **Origin Access Control**  and access our S3 Bucket privately.
- Now for origin settings , we choose **recommended settings** . Origin settings control how CloudFront connects to the specified origin.
    - We can also customize origin settings in which we customize header (CloudFront includes this header in all requests that it sends to your origin.). Connection attempts to origin, Connection timeout, response timeout(Wait for the response from origin )
- Now for cache settings , we again choose **recommended settings**. Cache settings determine when CloudFront serves cached content and when it fetches new content from the origin.
    - We can also customize this and in which we choose viewer protocol policy (http and https, redirect http to https , https only), allowed http methods (Default is get, head), then cache policy , origin request policy, response headers policy 

- Next **Security**
    - Do we want to enable Web Application Firewal (WAF) Security? A firewall that inspects HTTP requests at the application layer. It Blocks malicious requests (SQL injection, cross-site scripting, bad bots).Filters traffic by IP, country, or request patterns. Rate-limits abusive clients.Benefit: Attacks are stopped at the edge before they ever reach your origin servers.
    - It gives you extra cost if you enable it
- Next review and create it 

- Before creating this , if we see our Bucket policy , it is empty , we don't have any bucket policy before. But after creating this CloudFront, we see bucket policy automatically attached.
```
{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::democloudfrontv5/*",
            "Condition": {
                "ArnLike": {
                    "AWS:SourceArn": "arn:aws:cloudfront::aws_account_number:distribution/cloudfront_Distribution_id"
                }
            }
        }
    ]
}
```
- We see , this policy allows the cloudfront service to get object anywhere on my bucket as long as the source of this operation is my cloudfront distribution that i just created
- Now to access our CloudFront distribution , copy the domain name **d3jifvi04vrh9i.cloudfront.net** , and open in new tab 
- It says **access denied** because right now , we have not specified any paths
- If we specify path like /coffee.jpg, we will see the image. Similarly type /beach.jpg and /index.html , we will see the files
- This is accessed through cloudfront and then cloudfront is going to access my s3 bucket. But remember my elements in my s3 bucket are still private
- Benefit is that , next time if we open image though this cloudfront domain , it will be instantly loaded because we have cached version . So it is same fast/very little latency even if we access this page from other regions 


---


## 📦 Static Content (best fit for CloudFront)
- Examples: images, CSS, JavaScript, videos, downloads.  
- Why it works well:  
  - These files don’t change often.  
  - CloudFront caches them at edge locations worldwide.  
  - Users get super-fast delivery because the file is already stored near them.  
- Industry practice:  
  - Long cache times (hours or days).  
  - Versioned filenames (e.g., `app.v2.js`) so you don’t need to invalidate caches when you update.

---

## ⚡ Dynamic Content (also supported)
- Examples: APIs, personalized pages, search results.  
- CloudFront can still help here:  
  - You can configure **short cache times** or even **no cache**.  
  - CloudFront still provides benefits like **global TLS termination, DDoS protection, WAF filtering, and optimized routing** over AWS’s backbone network.  
- Industry practice:  
  - Cache static parts (images, scripts).  
  - Forward dynamic requests to the origin (EC2, ALB, API Gateway).  
  - Use cache policies to control what gets cached and what doesn’t.

---

## 🔑 Key Point
- **Static content** → CloudFront caches aggressively, huge performance boost.  
- **Dynamic content** → CloudFront still helps, but caching is limited. The main value is security, global distribution, and optimized routing.  

---

## ✅ Summary
CloudFront is **best for static content** that doesn’t change often, but it’s also widely used for **dynamic content delivery** (like APIs or personalized sites). The trick is in how you configure caching rules and policies.

---
## 🔒 Global TLS Termination
- **TLS (Transport Layer Security):** The encryption protocol behind HTTPS. It ensures data between your browser and the server is secure.  
- **Termination at the edge:** With CloudFront, the HTTPS connection is established at the nearest **edge location** to the user.  
- **Benefit:**  
  - Users don’t have to connect all the way to your origin (say, an S3 bucket in Australia).  
  - The secure handshake happens locally (e.g., Los Angeles edge), making it faster.  
  - CloudFront then forwards the request securely to your origin over AWS’s private backbone.  
- **Industry standard:** This is called **SSL/TLS offloading** — it reduces latency and origin load.

---

## 🛡️ DDoS Protection
- **DDoS (Distributed Denial of Service):** Attackers flood your servers with massive traffic to overwhelm them.  
- **CloudFront defense:**  
  - Because CloudFront sits in front of your origin, the attack traffic hits CloudFront’s global edge network first.  
  - AWS Shield (built-in) absorbs and mitigates these floods at scale.  
  - Your origin never sees the full attack volume.  
- **Industry standard:** Enterprises use CDNs like CloudFront or Akamai as a “buffer” against DDoS.

---

## 🚧 WAF Filtering (Web Application Firewall)
- **WAF:** A firewall that inspects HTTP requests at the application layer.  
- **CloudFront integration:** You can attach AWS WAF rules to your CloudFront distribution.  
- **What it does:**  
  - Blocks malicious requests (SQL injection, cross-site scripting, bad bots).  
  - Filters traffic by IP, country, or request patterns.  
  - Rate-limits abusive clients.  
- **Benefit:** Attacks are stopped at the edge before they ever reach your origin servers.

---

## 🌍 Optimized Routing over AWS’s Backbone
- **AWS backbone network:** A private, high-speed global network connecting AWS regions and edge locations.  
- **How CloudFront uses it:**  
  - When an edge location needs to fetch content from your origin, it doesn’t use the public internet.  
  - It travels over AWS’s optimized private routes.  
- **Benefit:**  
  - Lower latency, fewer hops, more reliability.  
  - Avoids congestion and packet loss common on the public internet.  
- **Industry standard:** This is called **Anycast routing + private backbone acceleration** — it’s why CDNs deliver content faster and more reliably worldwide.

---

## ✅ Putting It All Together
When a user requests your content:
1. **TLS termination** happens at the nearest edge → fast and secure.  
2. **DDoS protection** absorbs floods at the edge → origin stays safe.  
3. **WAF filtering** blocks malicious traffic → only clean requests pass through.  
4. **Optimized routing** carries requests/responses over AWS’s private backbone → faster global delivery.  

👉 CloudFront isn’t just about caching static files — it’s also a **security shield and performance accelerator** for both static and dynamic content.

