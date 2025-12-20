# Amazon EKS
- EKS = Elastic Kubernetes Service
- This allows you to launch and manage Kubernetes cluster on AWS. 
- Kubernetes is an open source system that is used for the management , deployment , and scaling of containerized apps like Docker but could be other types of containers as well .
- So these containers can be hosted on :-
    - either EC2 instances
    - Fargate if you want it to be fully serverless


- Example, you use an EKS cluster, a kuberneters cluster managed by EKS, then you are going to have , for example, EKS nodes, for example , in this case , there are EC2 instances . So whenever you launch a new Docker Container on your Kubernetes cluster, automatically Pods are going to be lauched onto your EC2 instances.

```
                        New Docker Container
                                /\
                               /  \
                              /    \
                             /      \
                        EKS Node   EKS Node
                    (EC2 instance) (EC2 instance)   

                     Container       Container
                     Container       Container
                     Container       Container
                     Container       Container

                     EKS Pods           EKS Pods



```


- So why would you use Kubernetes on Amazon EKS?
    - Launching kubernetes is quite hard, so using a managed service to manage your kubernetes cluster is a great idea, 

- Why should you use Kubernetes?
    - If you are using multiple clouds or even on-premises infrastructure, then kubernetes can run everywhere and so therefore , this is cloud agnostic and therefore , learning kubernetes can allow you to learn how to lauch containers anywhere would be on AWS but also Azure or GCP or anywhere else

---

## 🧩 Docker vs Kubernetes

- **Docker**:  
  - Builds **images** (blueprints of your app + dependencies).  
  - Runs **containers** (actual running instances of those images).  
  - Example: You build an image of a Node.js app, then run 3 containers from it.

- **Kubernetes**:  
  - Doesn’t replace Docker — it **uses Docker (or other container runtimes)** underneath.  
  - Its job is to **orchestrate** containers: decide where they run, restart them if they crash, scale them up/down, expose them to the network, etc.  
  - A job to "**orchestrate containers**" means automating the complex tasks of deploying, scaling, networking, and managing containerized applications (like those built with Docker) across many servers, ensuring they run reliably and efficiently as one big system, using tools like Kubernetes to handle the lifecycle from start to finish without manual intervention

👉 So Kubernetes **does run containers**, but it wraps them in something called a **Pod**.

---

## 🧩 What is a Pod?

- A **Pod** is the smallest unit in Kubernetes.  
- It’s basically a **wrapper around one or more containers**.  
- Why? Because Kubernetes needs a standard way to manage containers (scheduling, networking, storage).  
- Inside a Pod, you’ll usually have **one container** (your app). Sometimes you add a “sidecar” container (like a logging agent).  

👉 Think of a Pod as a **box** that holds your container(s). Kubernetes doesn’t run raw containers directly — it always runs them inside Pods.

---

## 🧩 Other key terms

- **Node**: A machine (EC2 instance or Fargate) where Pods run.  
- **Cluster**: A group of Nodes managed together.  
- **Deployment**: A higher-level object that tells Kubernetes how many Pods of your app should run, and handles updates.  
- **Service**: A stable network endpoint that exposes Pods (because Pods can move around between Nodes).  
- **Ingress**: Rules for external traffic (like routing HTTP requests through a load balancer).  

---

## 🌱 Easy analogy

- **Docker**: Builds and runs containers (like cars).  
- **Pod**: A parking spot that holds one or more cars. Kubernetes only manages cars that are parked in Pods.  
- **Node**: The parking lot (EC2 instance).  
- **Cluster**: All parking lots together.  
- **Deployment**: The parking manager who ensures there are always, say, 5 cars available.  
- **Service**: The entrance gate that directs visitors to the right cars.  

---


  
  - Kubernetes **does run containers**, but it always runs them **inside Pods**.  
  - A Pod is not an image — it’s a **wrapper/abstraction** that tells Kubernetes how to run the container.  
  - The **image** still comes from Docker/ECR/Docker Hub.  
  - The Pod says: “Run this image as a container, give it these resources, attach it to this network.”  

---

---
# Amazon EKS overview

Amazon EKS (Elastic Kubernetes Service) is a managed service that runs Kubernetes control planes for you, so you can deploy, scale, and operate containerized applications on AWS without building and maintaining the Kubernetes control plane yourself. You bring worker capacity (EC2 or Fargate), EKS operates the control plane, and Kubernetes orchestrates your pods across that capacity.

---

# Kubernetes fundamentals

- **Containers:** Lightweight packages of an app plus its runtime and dependencies (Docker/OCI).  
- **Pods:** The smallest deployable unit in Kubernetes, typically one container (sometimes sidecars).  
- **Nodes:** Worker machines where pods run (EC2 instances or AWS Fargate).  
- **Cluster:** A set of nodes managed by a Kubernetes control plane.  
- **Control plane:** API server, scheduler, controller manager, and etcd (state store). In EKS, AWS manages and scales this for you.  
- **Workloads:** Deployments, StatefulSets, Jobs — define how pods are created, updated, and maintained.  
- **Networking & discovery:** Services and Ingress expose pods internally and to the internet, often via AWS Load Balancers.

---

# How EKS runs containers on EC2 and Fargate

- **EC2-backed nodes (managed node groups):**  
  - **What it is:** You provision EC2 instances as Kubernetes worker nodes.  
  - **How it works:** The EKS control plane schedules pods onto nodes that have capacity. You manage AMIs, scaling, and patching (often automated with tools like managed node groups and Cluster Autoscaler).  
  - **When to use:** Maximum control over instance types, GPUs, spot instances, storage, and custom DaemonSets (e.g., logging/monitoring agents).

- **Fargate (serverless nodes):**  
  - **What it is:** AWS runs pods on serverless compute; no EC2 to manage.  
  - **How it works:** You define Fargate profiles; EKS schedules matching pods onto Fargate. AWS handles provisioning, scaling, and patching of the underlying compute.  
  - **When to use:** Simplified operations, fine-grained cost per pod, suitable for variable workloads and teams prioritizing operational efficiency over infra control.

---

# Diagram explained: scheduling pods to nodes

```
                        New Docker Container
                                /\
                               /  \
                              /    \
                             /      \
                        EKS Node   EKS Node
                    (EC2 instance) (EC2 instance)   

                     Container       Container
                     Container       Container
                     Container       Container
                     Container       Container

                     EKS Pods           EKS Pods
```

- **New Docker container → Pod:**  
  - **Meaning:** In Kubernetes you don’t run raw containers; you declare a Pod (via a Deployment/Job/etc.) that wraps the container image.
- **Scheduler → EKS nodes:**  
  - **Placement:** The Kubernetes scheduler (part of the EKS-managed control plane) decides which node has available CPU/memory and places the pod there.
- **Pods on nodes:**  
  - **Runtime:** The pod runs your container image (pulled from a registry like Amazon ECR) on that node’s container runtime.
- **Scaling:**  
  - **Horizontal Pod Autoscaler (HPA):** Scales pod replicas based on metrics.  
  - **Cluster Autoscaler:** Adds/removes EC2 nodes when the cluster needs more/less capacity.

---

# Why use Kubernetes with EKS

- **Managed control plane:**  
  - **Benefit:** AWS operates the Kubernetes API server, etcd, and critical controllers; you avoid complex setup and high-availability maintenance.
- **Integration with AWS services:**  
  - **Security:** IAM roles for service accounts (IRSA), security groups for pods, private networking with VPC CNI.  
  - **Ingress/Load balancing:** ALB/Network Load Balancer via controllers; easy traffic routing to services.  
  - **Storage:** EBS/EFS CSI drivers for persistent volumes.  
  - **Registry:** Seamless pull from Amazon ECR for images.
- **Portability and ecosystem:**  
  - **Cloud-agnostic:** Kubernetes is standard across clouds and on‑prem, enabling hybrid/multi‑cloud strategies.  
  - **Rich tooling:** Helm charts, operators, service mesh (Istio), monitoring (Prometheus/Grafana), logs (Fluent Bit), policies (OPA/Gatekeeper).

---

# When to choose Kubernetes vs ECS

- **Choose EKS (Kubernetes) if:**  
  - **Requirement:** Multi-cloud/on‑prem portability, advanced orchestration features, or broad ecosystem integrations.  
  - **Teams:** Comfortable with Kubernetes concepts (pods, deployments, services, ingress), or need sophisticated workloads (stateful apps, operators).

- **Choose ECS if:**  
  - **Simplicity:** AWS‑native orchestration with fewer moving parts and simpler operations.  
  - **Focus:** Primarily in AWS, with straightforward microservices and minimal custom scheduling needs.

---

# Typical workflow with EKS and ECR

1. **Build image:**  
   - **Action:** Create a Docker/OCI image of your app locally or in CI.
2. **Push to ECR:**  
   - **Action:** Tag and push the image to an Amazon ECR repository.
3. **Define Kubernetes manifests:**  
   - **Action:** Write Deployments/Services/Ingress and reference the ECR image.
4. **Deploy to EKS:**  
   - **Action:** Apply manifests; EKS pulls the image from ECR and schedules pods onto nodes (EC2 or Fargate).
5. **Expose and scale:**  
   - **Action:** Use Services/Ingress for traffic; HPA and Cluster Autoscaler to scale pods and nodes.

---

# Simple analogy

- **EKS as the conductor:**  
  - **Role:** It doesn’t play instruments; it coordinates the orchestra (nodes and pods) so music (your app) runs smoothly.  
- **EC2/Fargate as the stage:**  
  - **Role:** Where musicians (pods/containers) perform.  
- **ECR as the music sheets:**  
  - **Role:** The source of truth (images) every musician reads from.  
- **Kubernetes as the score:**  
  - **Role:** The rules (manifests) that define who plays, when, and how loud (replicas, resources, scaling).