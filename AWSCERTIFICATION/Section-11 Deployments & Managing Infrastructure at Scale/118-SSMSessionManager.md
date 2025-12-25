# Systems Manager - SSM Session Manager

- It allows you to start a secure shell on your EC2 instances and on-premisses servers without having SSH access or the need for bastion host or any SSH keys. 
- This means that the port 22 on your EC2 Instances is going to be closed because there is going to be no need to do SSH to establish a secure shell onto your EC2 instance. That means better security.
- Eg, the EC2 instance has an SSM Agent and that agent is connected to the Session Manager Service. So that means that our users can access through the Session Manager service these EC2 instance and execute some commands on it. 
- This has support for Linux, macos and Windows.
- We can send log data to amazon S3 or CloudWatch logs to make it super secure.


# Hands-On
- Go to SSM Session Manager Service but first we need to launch EC2 instance
    - So launch an ec2 instance, don't need to enable key pair and in security group ,no need to allow anything even SSH
    - In advanced details , we need to attach an IAM Instance Profile to allow it to talk to the SSM service.
        - So create a new IAM Role profile
        - Create a role for AWS service , use case EC2 
        - In permission , choose AmazonSSMManagedInstanceCore
        - Name the role DemoEC2RoleForSSM which allows the EC2 instance to use this policy to talk to SSM service
    - Launch instance.
- Now go to AWS Systems Manager Service
    - On the left side, click on Fleet Manager
        - Fleet Manager is a service where all the EC2 Instances that are registered with SSM will appear here , so they are called Managed Nodes
        - So the EC2 instance we made will appear here
        - Now here we see SSM Agent is online
        - As soon as our instance is under Fleet Manager, that means we're ready to run a secure shell against it
    - Now go to Session Manager under the Nodes Management on left hand side
        - Session Manager is a way for us to access Linux Instances and Windows instances
        - So start a session
        - You can also see we have 0 inbound rule for security group attached to this ec2 instance
        - So start a session on this EC2 instance and the idea is that we are going to get a secure shell  and i didn't need to have SSH access
        - So we can run commands like ping google.com, hostname
        - Using the SSM Secure shell we are able to have indeed a secure shell directly from AWS without SSH sercurity keys and SSH access


### Summary 
- We have three ways of accessing our EC2 instance
    - To open the port 22 and then use SSH keys to connect with terminal 
    - To use EC2 Instance connect which didn't require to get SSH Keys but this required still port 22 
    - Session Manager