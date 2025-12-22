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
Resources:   # Defines AWS resources to create.
  MyInstance: # Logical ID (internal reference).
    Type: AWS::EC2::Instance # Resource type (AWS::EC2::Instance).
    Properties: # Configuration details.
      AvailabilityZone: us-east-1a
      ImageId: ami-0453ec754f44f9a4a #  AMI ID (Amazon Linux 2023).
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
- First we have **tags**, so give tag key as Name and value as **CFDemo** (value is optional to give)
- Next for **Permissions** , no need to set any 
- Next no need to set other options as these are optional 
    - Stack failure options : Decide whether to roll back or keep partial resources if stack creation fails.
    - Stack policy - optional : Protect certain resources from accidental updates/deletes.
    - Rollback configuration - optional : Control rollback triggers (like CloudWatch alarms).
    - Notification options - optional : Send stack events to SNS topics.
    - Stack creation options - optional :  Configure termination protection, timeouts, etc.
- Click on next , review and create and submit
  - CloudFormation shows a change set when updating stacks. It tells you what will be created, modified, or replaced.

- Now you see the template i uploaded is going to generate some events and that was very quick and this actually created a resource right here
- You can go to EC2 instance console and check that instance is created with name **CFDemo**, Also see the **AMI ID of the instance** is the same we have mentioned in our template
- Also if we go our EC2 instance and look at tags , we see that some tags were applied by CloudFormation which are the name of the cloudformation , the name of logical id and the stack id . Also the tag we specified the **CFDemo**.


## Doubts till this 

### 1. Why the instance shows as **CFDemo** instead of **MyInstance**
- **Logical ID vs. Tags vs. Instance Name**
  - In your YAML, `MyInstance` is the **logical ID**. This is how CloudFormation internally tracks the resource in the stack.
  - The **Name tag** you added (`CFDemo`) is what the EC2 console displays as the instance’s name. AWS EC2 doesn’t have a “name” property in the resource definition — it only uses tags for naming.
  - So the console shows **CFDemo** because that’s the tag you explicitly set. If you hadn’t set a tag, the instance would appear with no name, but CloudFormation would still know it as `MyInstance` internally.

👉 In short:  
- `MyInstance` = CloudFormation’s internal identifier.  
- `CFDemo` = EC2 console display name (from the tag).  

---

### 2. How the **ImageId** works in CloudFormation
- **ImageId is an AMI reference**: When you launch an EC2 instance, you must specify an AMI (Amazon Machine Image). **This is what defines the OS and base configuration (e.g., Amazon Linux, Ubuntu, Windows**).
- In your template, you hardcoded `ami-0453ec754f44f9a4a`. That’s a valid AMI ID in **us-east-1** (Northern Virginia). AMI IDs are **region-specific**, so the same AMI won’t exist in other regions.
- Why you don’t see it under “AMIs” in the console:
  - The **AMI section in the EC2 console** only shows AMIs you own or have explicitly shared with you.
  - Public AMIs (like Amazon Linux or Ubuntu) are available to use but don’t show up in your AMI list. You can still reference them by ID in CloudFormation.
  - That’s why the instance launches fine even though you don’t see the AMI in your console — AWS maintains these public AMIs behind the scenes.

👉 If you want to confirm, you can run this in the AWS CLI:
```bash
aws ec2 describe-images --image-ids ami-0453ec754f44f9a4a --region us-east-1
```
This will show details of the AMI (owner, OS type, etc.).
```json
{
    "Images": [
        {
            "PlatformDetails": "Linux/UNIX",
            "UsageOperation": "RunInstances",
            "BlockDeviceMappings": [
                {
                    "Ebs": {
                        "DeleteOnTermination": true,
                        "Iops": 3000,
                        "SnapshotId": "snap-0938e311dc85e7433",
                        "VolumeSize": 8,
                        "VolumeType": "gp3",
                        "Throughput": 125,
                        "Encrypted": false
                    },
                    "DeviceName": "/dev/xvda"
                }
            ],
            "Description": "Amazon Linux 2023 AMI 2023.6.20241121.0 x86_64 HVM kernel-6.1",
            "EnaSupport": true,
            "Hypervisor": "xen",
            "ImageOwnerAlias": "amazon",
            "Name": "al2023-ami-2023.6.20241121.0-kernel-6.1-x86_64",
            "RootDeviceName": "/dev/xvda",
            "RootDeviceType": "ebs",
            "SriovNetSupport": "simple",
            "VirtualizationType": "hvm",
            "BootMode": "uefi-preferred",
            "DeprecationTime": "2025-02-20T05:23:00.000Z",
            "ImdsSupport": "v2.0",
            "FreeTierEligible": true,
            "ImageId": "ami-0453ec754f44f9a4a",
            "ImageLocation": "amazon/al2023-ami-2023.6.20241121.0-kernel-6.1-x86_64",
            "State": "available",
            "OwnerId": "137112412989",
            "CreationDate": "2024-11-22T05:23:19.000Z",
            "Public": true,
            "Architecture": "x86_64",
            "ImageType": "machine"
        }
    ]
}
```

- Instead of hardcoding ImageId, use SSM Parameter Store so your stack always picks the latest AMI
---

✅ **Summary**
- The EC2 instance name comes from the **Name tag**, not the logical ID.  
- The AMI ID is valid but region-specific and may not appear in your console because it’s a **public AMI**, not one you own.  


---
---


- Now we have an instance, now go to stack and update the stack , replace the existing template with **--ec2-with-sg-eip.yaml** file which have code 

```yaml
---
Parameters:  # Lets you input values at stack creation.
  SecurityGroupDescription:  # Here, you provide a description for the security group.
    Description: Security Group Description # what the console shows to guide you.
    Type: String # what kind of input CloudFormation expects.

Resources:
  MyInstance:
    Type: AWS::EC2::Instance
    Properties:
      AvailabilityZone: us-east-1a
      ImageId: ami-0453ec754f44f9a4a
      InstanceType: t3.micro
      SecurityGroups:
        - !Ref SSHSecurityGroup   # !Ref means reference another resource in the template.
        - !Ref ServerSecurityGroup

  # an elastic IP for our instance
  MyEIP:
    Type: AWS::EC2::EIP
    Properties:
      InstanceId: !Ref MyInstance

  # our EC2 security group
  SSHSecurityGroup:  # Allows SSH (port 22) from anywhere.
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

Outputs: # Values returned after stack creation.
  ElasticIP: # Here, it outputs the Elastic IP assigned to the instance.
    Description: Elastic IP Value
    Value: !Ref MyEIP

```
- In this file we have a parameter section to set the security group description, we have ec2 section which has 2 security groups, we also have an Elastic ip attached to my instance
- We have security group defined for SSH rules, so port 22 is going to be open and we have another security group which is going to open port 80 from everyone and port 22 from a very specific IP.
- So apply this template in cloud formation
- We will be prompted with parameters(Parameters are defined in your template and allow you to input custom values when you create or update a stack.). So as we have parameter SecurityGroupDescription , so write description for security group as **Demo Description**
- Click on next
- We get some optional options , just click on next , review and create 
- As we are applying an update , we have a change set, which tell us what is going to change in our cloudFormation stack like we see few things are added , elastic ip , ssh security group , server secruity group and my instnance is going to change that is modified, There is a column **Replacement** which says **true** for myinstance. This means that this EC2 instance is going to be replaced means previous one is going to be deleted and a new one is going to be created. 
- So submit this update.
- So we see in events cloudformation is so smart that he knows what to create first , so he created secutiy groups first and then instance is updated
- We also see elastic ip created with same name **CFDemo** and attached to instance. Also tags will be same as tags in ec2 instance
- We also see cloudformation first created new instance and then delete the previous instance
- See this new architecture in an infrastructure composer, we see we have an ec2 instance connected to an elastic ip and connected to two security groups
- Now to delete the resources, it is not recommended to delete it manually , you can either update the template or if you want to delete everything , just click on delete from stack. So cloudformation also figure out what to delete first and so on to clean up everything.

---


## 🧩 Structure of a CloudFormation Template
Every CloudFormation template is made up of **sections**. Not all are required, but these are the most common:

1. **Parameters**  
2. **Resources**  
3. **Outputs**  
4. (Optional) Mappings, Conditions, Metadata, Transform  

---

### 1. **Parameters**
- **Purpose**: Parameters let you pass values into the template at stack creation time.  
- **Why useful**: Instead of hardcoding values (like AMI IDs, instance types, or descriptions), you can make them configurable.  
- **Example in your template**:
  ```yaml
  Parameters:
    SecurityGroupDescription:
      Description: Security Group Description
      Type: String
  ```
  - When you launch the stack, CloudFormation asks you to provide a value for `SecurityGroupDescription`.  
  - That value is then used in the `ServerSecurityGroup` resource:
    ```yaml
    GroupDescription: !Ref SecurityGroupDescription
    ```
  - `!Ref` means “take the value of this parameter or resource.”

👉 Parameters are **not mandatory**. If you don’t define them, your template is static.  

---

### 2. **Resources**
- **Purpose**: This is the **heart of the template** — it defines the actual AWS resources to be created.  
- **Example in your template**:
  ```yaml
  MyInstance:
    Type: AWS::EC2::Instance
    Properties:
      AvailabilityZone: us-east-1a
      ImageId: ami-0453ec754f44f9a4a
      InstanceType: t3.micro
      SecurityGroups:
        - !Ref SSHSecurityGroup
        - !Ref ServerSecurityGroup
  ```
- Here you’re creating:
  - An EC2 instance (`MyInstance`)  
  - An Elastic IP (`MyEIP`)  
  - Two security groups (`SSHSecurityGroup` and `ServerSecurityGroup`)  

👉 **Resources section is required** in every template. Without it, CloudFormation has nothing to build.  

---

### 3. **Outputs**
- **Purpose**: Outputs return values after the stack is created.  
- **Why useful**: They let you easily find important information (like IP addresses, ARNs, or IDs) without digging through the console.  
- **Example in your template**:
  ```yaml
  Outputs:
    ElasticIP:
      Description: Elastic IP Value
      Value: !Ref MyEIP
  ```
- This means after stack creation, CloudFormation will show you the Elastic IP assigned to your instance.  
- After the stack is created (or updated), CloudFormation displays these values in the CloudFormation console:
  - Go to CloudFormation → Stacks → Your stack → Outputs tab.
  - You’ll see a table with:
  - Key (here: ElasticIP)
  - Description (here: Elastic IP Value)
  - Value (the actual Elastic IP assigned to your instance).
- You can also export outputs for use in other stacks.

👉 Outputs are **optional**, but very handy for debugging and chaining stacks together.  

---

### 4. **Other Sections (Optional)**
- **Mappings**: Define static values based on keys (e.g., region → AMI ID).  
- **Conditions**: Create resources only if certain conditions are true.  
- **Metadata**: Add extra info for documentation or UI hints.  
- **Transform**: Use macros like `AWS::Include` or `AWS::Serverless` (SAM).  

---

## 🔑 How Do You Know These Terms?
- These are **standard CloudFormation template sections** defined by AWS.  
- They are the same across all templates, though you don’t need to use all of them.  
- The official [CloudFormation Template Anatomy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html) explains each section.  

---

## ✅ Summary
- **Parameters** = Inputs at stack creation (make templates flexible).  
- **Resources** = Actual AWS resources (mandatory).  
- **Outputs** = Values returned after stack creation (optional but useful).  
- These terms are **standard across all CloudFormation templates**. You can mix and match depending on your needs.  

---
