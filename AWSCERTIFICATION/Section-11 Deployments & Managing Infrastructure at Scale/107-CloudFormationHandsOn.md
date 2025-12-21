- Go to CloudFormation service and create a stack 
- Before this , make sure to use **Northern Virginia, US East 1 region,** because the template we use now only works in this region
- Now to create a stack , we have to prepare templates. 
    - A template is a JSON or YAML file that contains configuration information about the AWS resources you want to include in the stack.
    - There are multiple options
        - Choose an existing template: Upload or choose an existing template.
        - Build from Infrastructure Composer: Create a template using a visual builder.

- Choose an existing template. Here we again have multiple options for template source
    - Amazon S3 URL: Provide an Amazon S3 URL to your template.
    - Upload a template file: Upload your template directly to the console.
    - Sync from Git: Sync a template from your Git repository.
- We will upload a template file (upload 0-just-ec2.yaml file) in which we have code 
```yaml
---
Resources:
  MyInstance:
    Type: AWS::EC2::Instance
    Properties:
      AvailabilityZone: us-east-1a
      ImageId: ami-0453ec754f44f9a4a
      InstanceType: t3.micro

```
- This file has a resource block and it creates an instance called MyInstance , the type is EC2 instance. Then you have a few properties , first one is Availability zone which is us-east-1a and the image id is ami-0453ec754f44f9a4a and instance type is t3.micro.
- So upload this file , you can also view it in **Infrastructure Composer**. If we open it you see visual understanding of our template. We also have code there in both **yaml and json**.
- Also selecting a template thorugh any way will generates an **Amazon S3 URL** automatically .
- Click on next 
- We have to provide stack a name , so **DemoCloudFormation**
- Then need to provide some parameters . Parameters are defined in your template and allow you to input custom values when you create or update a stack. 
    - But for now in our template , we don't have any parameters
- Click on next
- First we have **tags**, so give tag key as Name and value as CFDemo (value is optional to give)
- Next for **Permissions** , no need to set any 
- Next no need to set other options as these are optional 
    - Stack failure options
    - Stack policy - optional
    - Rollback configuration - optional
    - Notification options - optional
    - Stack creation options - optional
- Click on next , review and create and submit

- Now you see the template i uploaded is going to generate some events and that was very quick and this actually created a resource right here
- You can go to EC2 instance console and check that instance is created with name **CFDemo**, Also see the AMI ID of the instance is the same we have mentioned in our template
- Also if we go our EC2 instance and look at tags , we see that some tags were applied by CloudFormation which are the name of the cloudformation , the name of logical id and the stack id . Also the tag we specified the **CFDemo**.

- Now we have an instance, now go to stack and update the stack , replace the existing template with --ec2-with-sg-eip.yaml file which have code 

```yaml
---
Parameters:
  SecurityGroupDescription:
    Description: Security Group Description
    Type: String

Resources:
  MyInstance:
    Type: AWS::EC2::Instance
    Properties:
      AvailabilityZone: us-east-1a
      ImageId: ami-0453ec754f44f9a4a
      InstanceType: t3.micro
      SecurityGroups:
        - !Ref SSHSecurityGroup
        - !Ref ServerSecurityGroup

  # an elastic IP for our instance
  MyEIP:
    Type: AWS::EC2::EIP
    Properties:
      InstanceId: !Ref MyInstance

  # our EC2 security group
  SSHSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable SSH access via port 22
      SecurityGroupIngress:
        - CidrIp: 0.0.0.0/0
          FromPort: 22
          IpProtocol: tcp
          ToPort: 22

  # our second EC2 security group
  ServerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: !Ref SecurityGroupDescription
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 192.168.1.1/32

Outputs:
  ElasticIP:
    Description: Elastic IP Value
    Value: !Ref MyEIP

```
- In this file we have a parameter section , 