# What's serverless?

- Serverless is a new paradigm in which the developers don't manage the servers anymore. They just do what they do best. They just deploy code. They just deploy function.
- Initially,serverless was pioneered as a Funtion as a Service with AWS Lambda
- That means that you just deploy your code and each function will be run independently by the Lambda service, but nowadays, anything that's serverless is mostly mentioned as something that is managed and that does not include servers managed by the users so that includes serverless databases , messaging, storage,etc.
- Serverless does not mean that there are no servers. There are servers behind the scenes otherwise services would not work but it just means that as an end user, you don't manage , provision or even see the servers.

- So far we have used many serverless services like :-
    - **Amazon S3** because we used it as a storage layer but we didn't manage any servers at all. Amazon S3 can scale infinitely, there was no servers , we just uploaded file and that was it.
    - **DynamoDB** because in this we just created a table but we didn't provision a server for that table and that server was, that table could auto scale based on the load it was receiving.
    - **Fargate** because it was to just send the Docker containers and Fargate will automatically find a way for it to be run.