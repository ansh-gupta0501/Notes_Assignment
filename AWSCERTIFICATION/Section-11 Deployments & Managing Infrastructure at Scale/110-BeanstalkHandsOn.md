# Hands On

- Go to Elastic Beanstalk Console and create application.
- So we have an two options to choose for Environment Tier either:-
    - Web server environment :- Run a website, web application, or web API that serves HTTP requests.
    - Worker environment :- Run a worker application that processes long-running workloads on demand or performs tasks on a schedule
- For now , we want to run a website , so choose web server environment but if we wanted to process tasks off of a queue, then we would choose a worker environment.
- Next, Under Application information, give your application a name so MyApplication
- Next we have environment information where we Choose the name, subdomain and description for your environment.
    - so name is MyApplication-env , which is autofilled but we can change as MyApplication-dev because this is going to represent my development environment
    - A domain name is going to be automatically generated if we leave it blank for my application and then this will be added at last **.us-east-1.elasticbeanstalk.com**
- Next we need to choose a platform 