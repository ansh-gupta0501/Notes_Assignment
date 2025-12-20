# ECS

- ECS stands for **Elastic Container Service**
- This is used to launch the docker containers on AWS. 
- For it to work , we need to docker containers to run somewhere, and so for ECS , you must provision and maintain the infrastructure yourself. So that means you need to create EC2 instances in advance.
- AWS will take care of starting or stopping the containers for you and it has an integration with an **application load balancer** if you want to create a web application on ECS.
- Example, you have multiple EC2 instances and we need to create these EC2 instances in advance and they will be running different containers by the ECS service.
    - Now the ECS service , anytime it as a new docker container,it will be smart enough to find on which EC2 instance to place that docker container
- So anythime in the exam you see, i want to run docker containers on AWS, think of ECS. 
```
                ECS Service

            New Docker Container
                /     |      \
               /      |       \
              /       |        \
             /        |         \
            /         |          \
           /          |           \  
    EC2 Instance  EC2 Instance  EC2 Instance
```


---

# Fargate
- Fargate is also used to launch docker containers on AWS. 
- But this time with Fargate , we don't need to provision any infrastructure so we don't need to create any EC2 instances and manage them . 
- So Fargate is actually a serverless offering from AWS becuase we don't manage any servers. 
- AWS will just run the containers that we need based on the specification of CPU and RAM for each container
- Eg, we have a new docker container to be run on Fargate, the fargate will automatically run that container for us. We don't exactly know where , but it will be run.
- So the idea here is that with Fargate, we don't manage any EC2 instances so it's easier to use
```
                New Docker Container 
                        |
                        |
          |-------------|--------------------------|
          |  Fargate    |                          |
          |             v                          |
          | Container      Container   Container   |
          | Container       container   Container  |
          |  Container      Container   Container  |        
          |----------------------------------------|
```

---
# ECR

- Finally , for storing these docker images, so that it can be run on the AWS, you need to use a container registry. And for this we can use ECR (Elastic Container Registry)
- It is a private docker registry on AWS and this is where you're going to store your docker images so that it can be run by the ECS service or the Fargate service.
- Example, we have ECR and Fargate. We are going to store our images of our application onto Amazon ECR and then Fargite will be able to look at these images and create a container from them and run them directly on the Fargate service. So it could be one container or multiple container here and there
- Multiple images stored in ECR can be used to create different containers on fargate.
```
            ECR                     Fargate
        Image 1 ----------------------> Container
               ------------------------> Another container
        Image 2--------------------------> another container
                 
```

## 🧩 Docker Image vs Docker Container

- **Image**  
  - A **blueprint** or **recipe**.  
  - It contains your application code, dependencies, libraries, and configuration.  
  - Stored in registries like **Docker Hub** or **Amazon ECR**.  
  - Immutable — once built, it doesn’t change.  
  - Example: `node:18-alpine` or your custom `myapp:v1`.  

- **Container**  
  - A **running instance** of an image.  
  - It’s the actual process that executes your app.  
  - You can run multiple containers from the same image.  
  - Containers are dynamic — they can start, stop, scale up/down.  
  - Example: Running 3 containers of `myapp:v1` behind a load balancer.  

---

## 📊 Diagram explained

```
            ECR                     Fargate
        Image 1 ----------------------> Container
               ------------------------> Another container
        Image 2--------------------------> another container
```

- On the left: **ECR stores images** (blueprints).  
- On the right: **Fargate runs containers** (instances of those blueprints).  
- One image can produce many containers.  
- Different images can produce different containers, all managed by ECS/Fargate.

---

## 🌱 Simple analogy

Think of it like **house plans vs houses**:  
- **Image = house plan (blueprint)**. You design it once.  
- **Container = actual house built from that plan**. You can build one, two, or ten houses from the same plan.  

---

👉 In short:  
- **Image = static blueprint stored in ECR.**  
- **Container = live running copy of that image, managed by ECS/Fargate.**

