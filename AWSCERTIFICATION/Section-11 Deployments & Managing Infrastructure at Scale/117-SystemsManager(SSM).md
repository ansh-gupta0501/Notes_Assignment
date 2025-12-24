# AWS Systems Manager (SSM)

- SSM helps you manage your fleet of **EC2 Instances** and **On-Premises** systems at scale. 
- It is a way to manage your both **On-Premises** and **AWS**. So, therefore, it is called a **Hybrid AWS service**
- SSM allows you to do a ton of things that is quite complicated, but the idea is that its a Systems Manager so you can get **Operational Insights** about the state of your **infrastructure**. 
- You also get access to a suite of 10+ products.
- Most important products and features are 
    - You can do automotive patching of all your servers and instances for enhanced compilance.
    - You can also run a command across your entire fleet of server directly from SSM 
    - You can store primary configuration with the SSM Parameter Store.
- Finally, SSM works for Linux, Windows, MacOS, and Raspberry Pi OS (Raspbian)

#### From exam perspective, anytime you see a way to patch your fleet of EC2 Instances or On-Premises servers you have to think about SSM or if you wanted to run a command consistently across all your servers , SSM would be the right way.

## How does SSM work ?
- SSM service works on its own but you need to first install the SSM agent onto the systems we control and that is a small program that will be running in the background.
- By default, if you use Amazon Linux AMI or Ubuntu AMI on the AWS, it will be installed by default. 
- So if we look at our EC2 Instances(say we have 2 EC2 instance) and On-premise Virtual machines(1 On Premise VM ), we first have to install the SSM agent on all of these and the SSM agent will be reporting back to the SSM service in AWS. As we can see SSM is linked to both EC2 Instances and On-premises VM so it makes it a hybrid service.
- Now if an instance cannot be controlled by SSM , it's only probably an issue with the agent 
- Now that the agent is installed on both our servers and our EC2 instances then we can use the SSM service to run commands across all these servers or we can patch them all at once or we can configure them consistently using the SSM service

```
                |------------------------------------------------|
                |                   SSM                          |
                |------------------------------------------------|
                    ^                   ^                  ^
                    |                   |                  |
                    |                   |                  |
                |---|---------| |-------|-------|  |-------|------|
                |   |         | |       |       |  |       |      |
                |   |         | |       |       |  |       |      |  
                |ssm agent    | |  SSM Agent    |  |  SSM Agent   |
                |             | |               |  |              |
                |EC2 Instance | |  EC2 Instance |  |  EC2 Instance|
                |             | |               |  |              |
                |-------------| |---------------|  |--------------|


```