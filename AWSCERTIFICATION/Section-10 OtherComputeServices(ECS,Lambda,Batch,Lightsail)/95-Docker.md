# What is Docker?

- Docker is a software development platform to deploy apps. 
- So the way we've been deploying applications from before is to install them on linux and then they will work but with Docker , you will package your app into something called a container and that container is very special beacause it can be run on any operating system very easily. 
- The app, once in a container will run the exact same way , regardless of where they're run. So it could be :-
    - Any machine
    - No compatibility issues
    - With predictable behaviour
    - Less work
    - Easier to maintain and deploy
    - Works with any language, any OS, any technology
- With Docker , you can scale containers up and down very quickly (seconds)
- So docker is very popular nowadays to deploy applications.

## Docker on an EC2 instance
- If we see Docker on an EC2 instance, we would have , for example, a Docker running java code, a Docker running NodeJS code, a Docker running in MySQL Database and so on , all onto the same EC2 instance.
- So the idea is that if we managed to package our application in a Docker Container, then it will become very easy for use to run it on an EC2 instance

## Where docker images are stored?
- So Docker images, you need to create them, this is how your container will be run and they can be stored in something called **Docker Repositories**.
- So there is a public Docker Repository called the Docker Hub availbale online and you can find the base images for many technologies or operating system . 
    - So for Ubuntu, which is a Linux Operating System
    - or Mysql, this is a database technology
    - NodeJS, Java programming languages
- Or, we can use Amazon ECR (Elastic Container Registry) which is a private Docker Repository. This is where you can store your private Docker images.


### Important : Docker containers run on a host with a specific kernel type. Linux containers need a Linux kernel; Windows containers need a Windows kernel. On macOS or Windows, Docker uses a lightweight virtual machine to provide a Linux kernel for Linux containers. Portability is excellent, but it’s not literally “any OS” without a compatible engine and kernel. 


## Docker VS Virtual Machines

- Docker is **sort of** a virtualization technology, but not exactly
- So the resources are shared with a host that means that you can have many containers on one server so if we look at comparing EC2 and Docker:-
    - We have the infrastructure which is on AWS, then host operating system, then hyperwiser which is stuff we don't have access to and then finally when we get an EC2 instance, we have our application onto the Guest Operating System and so if we want another EC2 instance, it will be created like another Guest OS. This is what happens when we create EC2 instances
    
    ``` 

                 Virtual Machines

    |-------------||-------------||-------------|
    |Apps         ||Apps         ||Apps         |
    |-------------||-------------||-------------|
    |-------------||-------------||-------------|
    |Guest OS (VM)||Guest OS (VM)||Guest OS (VM)|
    |-------------||-------------||-------------|
    |-------------------------------------------|
    |           Hypervisor                      |
    |-------------------------------------------|
    |            Host OS                        |
    |-------------------------------------------|
    |          Infrastructure                   |
    |-------------------------------------------|

    
    ```

    - But in case of Docker , we have the Infrastructure, the Host OS which is the EC2 instance, and then the Docker Daemon, and then as soon as the Docker Daemon is running , we can have many containers running on to the Docker Daemon and they're more light weights. They don't package, they don't come with a full operating system and a virtual machine , all of them 

    ```
                    Docker 

    |-------------||-------------||-------------|
    |Container    ||Container    ||Container    |
    |Container    ||Container    ||Container    |
    |Container    ||Container    ||Container    |
    |-------------||-------------||-------------|
    |-------------------------------------------|
    |           Docker Daemon                   |
    |-------------------------------------------|
    |            Host OS(EC2 Instance)          |
    |-------------------------------------------|
    |          Infrastructure                   |
    |-------------------------------------------|


    ```


---


## 🧩 Key Terms

- **Infrastructure**: The physical or cloud hardware your system runs on. In AWS, this is the data centers, servers, and networking that power your EC2 instance.  
- **Host OS (Operating System)**: The main operating system installed on the physical machine (or EC2 instance). Examples: Linux, Windows.  
- **Kernel**: The core part of the operating system. It manages communication between hardware (CPU, memory, disks) and software (apps). Think of it as the “traffic controller” of the computer.  
- **Hypervisor**: A special software layer that allows multiple virtual machines (VMs) to run on one physical machine. It divides resources and ensures each VM thinks it has its own hardware. Examples: VMware, KVM.  
- **Guest OS**: The operating system inside a virtual machine. For example, you can run Ubuntu as a guest OS on a Windows host.  
- **Docker Daemon**: The background service that manages Docker containers. It listens for commands (like `docker run`) and handles container lifecycle.  
- **Container**: A lightweight package that includes your app and everything it needs to run (libraries, dependencies). Unlike a VM, it doesn’t include a full OS—just what’s necessary.  
- **Image**: A blueprint for a container. You build an image once, then run many containers from it.  
- **Registry/Repository**: A storage location for images. Docker Hub (public) or Amazon ECR (private) are examples.

---

## 📊 Diagrams Explained

### 1. Virtual Machines (VMs)

```
|-------------||-------------||-------------|
|Apps         ||Apps         ||Apps         |
|-------------||-------------||-------------|
|Guest OS (VM)||Guest OS (VM)||Guest OS (VM)|
|-------------||-------------||-------------|
|-------------------------------------------|
|           Hypervisor                      |
|-------------------------------------------|
|            Host OS                        |
|-------------------------------------------|
|          Infrastructure                   |
|-------------------------------------------|
```

- At the bottom: **Infrastructure** (AWS servers).  
- Then: **Host OS** (the real operating system on the server).  
- Then: **Hypervisor** (splits resources into multiple VMs).  
- Each VM has its own **Guest OS** (like Ubuntu, Windows).  
- On top of each Guest OS, you install your **Apps**.  

👉 This means every VM carries a full OS, which makes it heavy and slower to start.

---

### 2. Docker Containers

```
|-------------||-------------||-------------|
|Container    ||Container    ||Container    |
|Container    ||Container    ||Container    |
|Container    ||Container    ||Container    |
|-------------||-------------||-------------|
|-------------------------------------------|
|           Docker Daemon                   |
|-------------------------------------------|
|            Host OS (EC2 Instance)         |
|-------------------------------------------|
|          Infrastructure                   |
|-------------------------------------------|
```

- At the bottom: **Infrastructure** (AWS servers).  
- Then: **Host OS** (like Linux on EC2).  
- Then: **Docker Daemon** (manages containers).  
- On top: Many **Containers**, each running an app with its dependencies.  

👉 Containers share the same Host OS kernel, so they’re lightweight, fast, and you can run many of them on one machine.

---

## 🌱 Concept in Simple Terms

Think of it like housing:

- **Virtual Machines**: Each person rents a whole apartment (Guest OS). Every apartment has its own kitchen, bathroom, electricity. Heavy, expensive, slower to set up.  
- **Docker Containers**: Everyone shares one big house (Host OS + Docker Daemon), but each person has their own locked room (Container) with just what they need. Faster, cheaper, easier to manage.

So:
- VMs = heavy, isolated, slower to start.  
- Containers = lightweight, share resources, faster to scale.  

---


## 🧩 Do containers have an OS?

- **Containers don’t include a full operating system** like a VM does.  
- What they *do* include is:
  - Your application code
  - All the libraries and dependencies it needs
  - A minimal runtime environment (like `glibc`, `OpenJDK`, `Node.js`, etc.)
- They **share the kernel** of the host operating system. That’s why they’re lightweight.

So, a Linux container uses the Linux kernel. A Windows container uses the Windows kernel. You can’t run a Linux container directly on a Windows kernel — they’re different.

---

## 🖥️ Running Docker on Windows or macOS

Here’s the trick:  
- On **Linux hosts** (like EC2 running Ubuntu), containers run natively because they share the Linux kernel.  
- On **Windows/macOS hosts**, Docker Desktop runs a **lightweight virtual machine** behind the scenes:
  - On Windows: Docker Desktop uses **WSL2 (Windows Subsystem for Linux)** or Hyper-V to spin up a Linux VM.  
  - On macOS: Docker Desktop uses a small Linux VM (via Apple’s Hypervisor framework).  

That VM provides the Linux kernel, so your Linux-based containers run exactly the same way as they would on a real Linux server.  

👉 This is how Docker solves the “works on my machine” problem:  
Even though you’re on Windows or macOS, your container is still running on a Linux kernel inside that VM. So the environment is consistent across all developers and servers.

---

## 🌱 Why this consistency matters

Without Docker:
- On Windows, you’d install dependencies differently than on macOS or Linux.
- Path differences, library versions, and OS quirks cause “works on my machine” bugs.

With Docker:
- Everyone runs the same container image, which always expects the same kernel and dependencies.
- The VM layer on Windows/macOS makes sure Linux containers still run correctly.
- When you deploy to production (usually Linux servers like AWS EC2), the container runs identically.

---

## 🏠 Simple analogy

Think of containers like **shipping containers**:
- The cargo (your app + dependencies) is always packed the same way.  
- The ship (host OS + kernel) just needs to know how to carry containers.  
- On Windows/macOS, Docker Desktop quietly provides a “ship” that understands Linux containers by running a small Linux VM.  

So whether you’re on Windows, macOS, or Linux, the container contents don’t change — only the ship underneath changes, and Docker makes that invisible to you.

---