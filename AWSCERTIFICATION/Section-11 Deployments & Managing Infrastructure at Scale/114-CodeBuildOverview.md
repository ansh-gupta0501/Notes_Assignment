# AWS CodeBuild

- It allows you to build your code in the cloud.
- It means that the source code is going to be compiled , the tests are going to be run, and the output of which is going to produce packages and these packages are going to be ready to be deployed , For eg, by **CodeDeploy** , onto servers so that your application can run. 
For eg, say your code is in **CodeCommit** , **CodeBuild** is going to retrieve this code from **CodeCommit** , run some script that you have to define , build your code, and then you will have a ready-to-deploy artifacts


```
                    Retrieve Code                   Build Code
    CodeCommit <--------------------- CodeBuild -------------------> Ready to-deploy artifact
```


- Benefits:
    - Fully managed and serverless.
    - It's continuously scalable and highly available
    - Secure 
    - Pay-as-you-go pricing that means that you only pay for the time your code is being build.  
    - There are no servers to manage .