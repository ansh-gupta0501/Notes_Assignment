# S3 Transfer Acceleration 

- As we know S3 buckets are linked to only one region and so sometimes you are looking to transfer files from all around the world into one specific S3 bucket.
- And there is a way to speed up the transfer using **S3 transfer acceleration**.
- The way work is that your file is , for example, being uploaded from the United States into a S3 bucket in Australia. And so what we'll do is that we will upload a file into a edge location that is going to be very close to a user in the USA and then using the internal network, the edge location will transfer the file to the S3 Bucket in Australia in a more reliable and fast connection.
- This is the basics of how S3 Transfer acceleration works. And this is only used when you want to upload or download a file from S3 bucket that is far away from you.
```
                Fast                                    Fast
File in USA --------------------->   Edge Location ------------------------------> s3 bucket
                (Public www)            USA           (Private AWS )                Australia

``` 
- We can also test the tool and see how effective it is for us
```
https://s3-accelerate-speedtest.s3-accelerate.amazonaws.com/en/accelerate-speed-comparsion.html
```
- This will run some tests of the speed connection if i did a direct upload into an Amazon S3 bucket in US-EAST-1 or if i use an S3 accelerated transfer upload, we can see the difference and how much peformance gain we gain if we are uploading the data into differnet s3 buckets around the world. This also depends on **where you are located and type of internet you have** to see if transfer acceleration is worth it for you or not. 