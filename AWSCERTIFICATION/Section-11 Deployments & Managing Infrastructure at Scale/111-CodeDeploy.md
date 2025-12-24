# AWS CodeDeploy

- CodeDeploy is also a way for us to deploy our application automatically.
- Now the difference is that CodeDeploy is a bit more permissive. It does not need to be using Beanstalk or CloudFormation. This is completely independent.
- So with CodeDeploy , we have our application, it's in version one and we want to upgrade it into version two So CodeDeploy will find a way for us to do this.
- So codeDeploy works with two things:
    - It works with **EC2 instances** and so you can have many EC2 instances being upgraded from Version 1 to Version 2.
    - It also works with **On-Premises Servers** , so if you have servers On-Premises and you want to help them upgrade from version one to version two for your application. It is possible to do it with CodeDeploy.
- So CodeDeploy is a **Hybrid Service** because it works both On-Premises and for EC2 instances.
- So CodeDeploy really allows you to work with any kind of servers but you must provision the servers/instances ahead of time. And you must configure them to install the **CodeDeploy Agent** that will be assisting you to do these upgrades.

- So summary , CodeDeploy allows you to upgrade both your EC2 instances, applications, and your On-Premises Servers applications from version one to version two automatically from a single interface.

---
Got it 👍 — let’s keep this simple and practical.

---

## 🚀 What AWS CodeDeploy Does (Basics)

- **Purpose:** Automates deployments of applications to servers (EC2 or on‑premises).  
- **Agent:** Each server has a small **CodeDeploy agent** installed that listens for deployment instructions.  
- **Application + Deployment Group:** You define your app in CodeDeploy and group the servers that should receive updates.  
- **Revision (Version):** Your packaged code (v1, v2, etc.) stored in S3, GitHub, or CodeCommit.  

---

## 🔄 How Version Updates Work

1. **Upload new version (v2):** Package your code with an **AppSpec file** (instructions for install/start).  
2. **Create deployment:** In CodeDeploy, you tell it to deploy v2 to your deployment group.  
3. **Agent pulls revision:** Each server’s agent downloads v2 from S3/GitHub.  
4. **Lifecycle hooks run:** Scripts defined in AppSpec run in order (stop old app, install new files, start new app, validate).  
5. **Health check:** If validation passes, deployment succeeds. If it fails, CodeDeploy can roll back to v1.  

---

## 🏢 Industry Standard Usage

- **EC2 fleets:** Companies use CodeDeploy to roll out new app versions across many EC2 instances in batches (safe rollout).  
- **Blue/Green deployments:** Common in production — new servers (green) get v2, traffic shifts gradually from old servers (blue).  
- **On‑premises servers:** Some enterprises use CodeDeploy to keep hybrid environments consistent.  
- **CI/CD pipelines:** Often integrated with **CodePipeline** so builds automatically trigger deployments.  

---

## ✨ Simple Example

- You have **version 1** of your app running on 5 EC2 instances.  
- You upload **version 2** to S3.  
- CodeDeploy tells each agent:  
  - Stop v1 → Install v2 → Start v2 → Run health check.  
- If all checks pass, now all 5 servers run **version 2**.  
- If something breaks, CodeDeploy can roll back to **version 1** automatically.

---

So in short: **CodeDeploy is the delivery truck** — it takes your new app package (v2), drives it to each server, swaps out the old one (v1), and makes sure everything is running smoothly.  


## How CodeDeploy differs from Elastic Beanstalk
- Beanstalk: Manages infrastructure and platform plus deployments (PaaS-like).

- CodeDeploy: Only manages deployments to your existing servers; no platform or infra provisioning.

- Use both: Beanstalk for environment lifecycle, CodeDeploy for fine-grained rollout control (often replaced by EB’s native rolling strategies in simpler cases).

---
Great question — let’s keep this clear and straightforward.

---

## 🖥️ How CodeDeploy works with **on‑premises servers**

Unlike EC2, your on‑premises servers aren’t automatically known to AWS. You need to **register them** so CodeDeploy can treat them like managed instances.

### Steps in practice

1. **Install the CodeDeploy agent**  
   - Download and install the lightweight agent on each on‑premises server (Linux or Windows).  
   - This agent is what listens for deployment instructions from AWS.

2. **Register the server with CodeDeploy**  
   - Use an **IAM user/role** and an **activation code** to register the server.  
   - Registration makes the server appear in CodeDeploy as a “managed instance.”  
   - You can tag it (e.g., `Env=Prod`, `App=MyApp`) so deployments can target groups of servers.

3. **Create a deployment group**  
   - In CodeDeploy, you define a group of targets (your on‑premises servers).  
   - You can select them by tags or by explicit registration.

4. **Prepare your application revision**  
   - Package your code (ZIP/TAR) with an **AppSpec file** that tells CodeDeploy where to put files and which scripts to run.  
   - Store the package in S3 or GitHub.

5. **Run the deployment**  
   - CodeDeploy sends instructions to the agent.  
   - The agent downloads the new revision (say, version 2), runs the lifecycle hooks (stop old app, install new files, start new app, validate).  
   - If validation passes, the server is now running version 2.  
   - If validation fails, CodeDeploy can roll back to version 1.

---

## 🔑 Industry standard usage

- **Hybrid environments:** Enterprises often have a mix of EC2 and on‑prem servers. CodeDeploy lets them use one deployment tool for both.  
- **Consistency:** Same AppSpec file and deployment process across cloud and on‑prem.  
- **CI/CD integration:** On‑prem servers can be part of the same pipeline as EC2, so updates roll out everywhere in sync.  
- **Security:** IAM activation codes and least‑privilege policies ensure only registered servers can participate.

---

👉 In short: You **install the agent**, **register the server**, and then CodeDeploy treats your on‑premises machine just like an EC2 instance — pulling down version 2, replacing version 1, and running your defined scripts.

---

