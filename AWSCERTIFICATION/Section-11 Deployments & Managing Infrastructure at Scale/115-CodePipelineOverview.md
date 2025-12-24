# AWS CodePipeline

- How do we know that **CodeCommit** and **CodeBuild** are connected ?
- Well , we can connect them using **CodePipeline**
- So it is going to be a way for us to orchestrate the different steps to have the code automatically pushed to production.
- It means , maybe we want to define a pipeline that takes the code , builds it , tests it , provision some servers and deploys the application on those servers but it could be more complicated
```
code => Build => Test => Provision => Deploy
```
- So to orchestrate all these steps , you need a pipeline tool and that is going to be **CodePipeline**
- It is basis for CI/CD 

- For example, say we have a **CodePipeline as an orchestration layer** , it will take its code from **CodeCommit** , build it with **CodeBuild** , then decide to deploy it with **CodeDeploy** and may be deployed into an **Elastic Beanstalk Environment** or **ECS/Lambda**

```
|------------------------CodePipeline : orchestration layer----------------------------------|
|                                                                                            |
|CodeCommit -----------> Code Build ------------> CodeDeploy -----------> Elastic Beanstalk  |
|--------------------------------------------------------------------------------------------|
```

- Benefits
    - Fully Managed 
    - Compatible with so many services such as CodeCommit , CodeBuild, CodeDeploy, Elastic Beanstalk, CloudFormation , GitHub and other third party services and custom plugins
    - It gives you fast delivery and rapid updates 
    - So it is at the **core of the CICD services within AWS**