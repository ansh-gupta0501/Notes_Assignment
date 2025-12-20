# Amazon API Gateway

- Example:- You want to build a serverless HTTP API.
- We have serverless technologies , we have lambda and we are reading, creating , updating and deleting data from DynamoDB which is also serverless
- But we want external clients to be able to access our lambda function but a lambda function is not exposed as an API right away. So , for this we need to expose it through an API Gateway which is going to provide the client with the rest HTTP API to connect directly to your website.
- The client will talk to the API Gateway, the api gateway will proxy the request to your lambda functions which will execute the transformations on your data.
- And so the API Gateway is used as a fully managed service that is going to allow developers to easily create, publish , maintain, monitor and secure APIs in the cloud
- It is a **serverless technology** and fully **scalable**
- It supports RESTful APIs and also WebSocket APIs for real time streaming of data.
- It supports also security , user authentication , API throttling , API keys , monitoring.

- So in exam , if you see something which creates a serverless API  , you need to think about API Gateway and lambda 