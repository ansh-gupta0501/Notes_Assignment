- In the Cloud Monitoring section , we are going to know how we can get a better idea and a better picture of the **performance of our cloud deployments**.

# Amazon CloudWatch Metrics

- CloudWatch provides metrics for every services in AWS.
- Metric is a variable to monitor like CPU Utilization, NetworkIn etc.
- The Metrics are going through the time so they will have timestamps.
- If you want to visualize all your metrics at once, you can create a **CloudWatch dashboard** of metrics

- Example : **CloudWatch Billing metric** (us-east-1)
    - This metric is only available in us-east-1 and it represents the total amount you have spent on your AWS cloud
    - So obviously , at every month end it will reset back into zero , but you can see over time metric goes up and then will go back to zero.

- Some other important Metrics
    - For **EC2 Instances** - we can look at the **CPU Utilization** , which is how much we are making the CPU work and if it works a lot, than maybe our instance is too busy and we need to scale it up or scale it out. The **Status Check** to make sure that our EC2 Instance is properly functioning, and the **Network** to see how much network is going in our instance and our our instance. But the **RAM** is **not** an available metric for your EC2 Instnaces.
        - These metrics you get every **five minutes** by default
        - But you can enable a **Detailed Monitoring**, which is more expensive to get these metrics every **one minute**.
    - **For EBS Volumes** - They are where you store your data and you get information about the amount of disk read and writes that are happening. 
    - For **S3 Buckets** - You can get some information around the bucket size and bytes , the number of objects, or the number of requests done into your S3 Buckets. 
    - **Billing** - it shows you the total estimated charge for your account only in us-east-1 but it's for your entire account.
    - **Service Limits** - Which is how much you have been  using a service API 
    - **Custom metrics** - You can push your own custom metrics. 

# Amazon CloudWatch Alarms











