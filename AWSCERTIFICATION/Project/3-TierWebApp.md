
# Build a Three-Tier Web App

**Project Link:** [View Project](http://learn.nextwork.org/projects/aws-compute-threetier)



## Build a Three-Tier Web App

![Image](http://learn.nextwork.org/ecstatic_silver_witty_jackfruit/uploads/aws-compute-threetier_2b3c4d5e)

---

## Introducing Today's Project!

In this project, I will demonstrate how to set up a three-tier web app from scratch. First start with the presentation tier, then logic tier, then data tier and then tying them all together.

### Tools and concepts

Services I used were Amazon S3, Cloudfront, DynamoDB, Lambda , API Gateway. Key concepts I learnt include Lambda functions, CORS errors, updating the javascript file with the API invoke URL, and testing the invoke url with in the browser.

### Project reflection

This project took me approximately 4 hours. The most challenging part was to resolving the CORS errors in both API Gateway and Lambda.  

I chose to do this project today because to learn about Three-tier architecture and set up our own web app. 

---

## Presentation tier

For the presentation tier, I will set up how website will be visible to our end users. Because presentation tier is responsible for our website files (s3 bucket) + website distribution.(cloudfront)

I accessed my delivered website using cloudfront distribution url. We set up an Origin Access Control that that lets our S3 bucket to restrict access to only Cloudfront distribution

![Image](http://learn.nextwork.org/ecstatic_silver_witty_jackfruit/uploads/aws-compute-threetier_3a4b5c6d)

---

## Logic tier

For the logic tier, I will set up Lambda function to handle request (find user by id ) and also an API with API Gateway to receive request from user and pass it to Lambda.

The Lambda function retrieves data by userId , the user enters on the web app , in DynamoDB. The AWS SDK is used in the lambda function to so that we can use templates and libraries that let us find the correct DynamoDB table and request data.

![Image](http://learn.nextwork.org/ecstatic_silver_witty_jackfruit/uploads/aws-compute-threetier_6a7b8c9d)

---

## Data tier

For the data tier, I will set up DynamoDB database that store user data because we are using api to find user data through lambda.

The partition key for my DynamoDB table is userId which means when our table looks for data , it will look based on userID. It can return all data(values) related to that item with that ID.

![Image](http://learn.nextwork.org/ecstatic_silver_witty_jackfruit/uploads/aws-compute-threetier_u1v2w3x4)

---

## Logic and Data tier

Once all three layers of my three-tier architecture are set up, the next step is to connect the presentation and logic tier. This is because currently there is no way for API to catch requests that users make through our distributed site.

To test my API, I visited the invoke URL of the prod stage API. This let us test whether we can use the API and retreive the user data. The results were some user data in JSON when we looked up userid = 1. This proved logic + data tier connection.

![Image](http://learn.nextwork.org/ecstatic_silver_witty_jackfruit/uploads/aws-compute-threetier_a112c3d5)

---

## Console Errors

The error in my distributed site was because there was an error with script.js file (file that i uploaded into S3). The script.js file is referencing an prod stage API url placeholder and my API's actual URL.

To resolve the error, I updated script.js by replacing some placeholder text with the API's prod stage INVOKE URL. I then reuploaded it into S3 because the s3 bucket still storing the old script.js file.

I ran into a second error after updating script.js. This was an error with CORS because we have not allowed API Gatway to allow request from CloudFront Distribution

![Image](http://learn.nextwork.org/ecstatic_silver_witty_jackfruit/uploads/aws-compute-threetier_a1b2c3d5)

---

## Resolving CORS Errors

To resolve the CORS error, I first went into our API and enabled CORS on the /users resource. We then made sure GET requests are enabled and referenced our Cloudfront domain as domain getting access.

I also updated my Lambda function because it needs to be able to return CORS headers to show that it has the permissions to invoke  the API's URL and return a response. We added 'Access-Control-Allow-Origin' as the header.

![Image](http://learn.nextwork.org/ecstatic_silver_witty_jackfruit/uploads/aws-compute-threetier_1qthryj2)

---

## Fixed Solution

I verified the fixed connection between API Gateway and CloudFront by looking the user data in the distributed site again. In my final test , user data could be returned- so a user request in the presentation tier gets data from the data tier.

![Image](http://learn.nextwork.org/ecstatic_silver_witty_jackfruit/uploads/aws-compute-threetier_2b3c4d5e)

---

---
