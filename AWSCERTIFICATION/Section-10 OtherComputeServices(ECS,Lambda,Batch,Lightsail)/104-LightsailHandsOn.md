- Go to lightsail service and we it is open as a separate service because it does not have any kind of good integration with AWS. 
- You need to create an instance and also tell where is this going to be i.e., instance location
- You can change the region and AZ for that instance and also there is limited amount of region available
- Select ireland and then based on where you select your instance to be , you are going to get some parameters to configure your instance, but very less
- Now you need to pick an instance image, which will correspond to AMI but all these things are hidden from you in lightsail
- Now select a bluprint such as template where we can either choose App + os or only os. 
    - In app + os , you can choose let's say , want to launch a wordpress right now.
- Now you can use lauch script with is nothing but just like ec2 user data
- Then we have SSH key pair
- See the instance plan, we have lot less customization here,we don't have to choose ec2 instance type, we see only some instances with a price indicated
- Create instance. 
- You see we don't have to choose security groups, no networking, no EBS volumes 

- Now we can create **database**. Remember this is not RDS , it is lightsail
- You choose again the region and AZ 
- You pick the database type (mysql or postgress)
- Then you can specify some credentials for the login 
- Then choose database plan , if you want to standard database or high availability
- Then choose price you willing to pay 
- Create database

- Now you could do **networking**
- You can create static ip, DNS zone , Load Balaner

- Now you can choose **storage** to get some more storage disk and then **snapshots of your backup**


- Now click on instnace we created of wordpress, 
    - This actually gets me into an SSH terminal into my EC2 Instance
    - Now i can able to connect to my instance using a version of SSH through the browser
    - Our wordpress was deployed , we can view it 
    - Connect with public ip, and we are able to connect into our WordPress instance where we will get a hello world 