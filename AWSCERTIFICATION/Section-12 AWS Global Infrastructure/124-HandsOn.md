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