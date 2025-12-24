# AWS CodeArtifact

- Software packages, the developer creates depends usually on each other to be built and so there's like an architecture of software packages. 
- And so it's called a  **code dependencies**
- And so to store and retrieve these dependencies, it's called **artifact management**
- Traditionally, you need to set up your own **artifact management system** maybe on **Amazon S3** or using custom software on **EC2 Instances** and that may be complicated. 
- So AWS came up with **CodeArticat** , which is a secure, scalable and cost-effecitve **artifact management system** for software development. 
- It means , instead of setting up your own infrastructure, you can just use CodeArtifact and all the common dependency management tools that developers use such as Maven, Gradle , npm, yarn , twine , pip and NuGet can just talk to CodeArtifact to store and retrieve these code dependencies. 
- So developers now have a place by default that's secure to store and retrieve these dependencies and that means that once you push your code to CodeCommit and CodeBuild we'll built it, then CodeBuild can also retrieve the dependencies directly from CodeArtifact.

- Summary , CodeArticat is for Artifact management system or a place to store their code dependencies


---

## How it works in practice
- For developers (local):
    - Login: Use AWS CLI to fetch an auth token and configure your tool (e.g., aws codeartifact login --tool npm).
    - Install packages: Run npm install or pip install—your package manager pulls from CodeArtifact.
    - Publish packages: Use npm publish or twine upload to share internal libraries to your team.

- For CI/CD (CodeBuild):
    - Buildspec setup: Retrieve a CodeArtifact token at the start, configure the package manager, then build/test.
    - Determinism: Builds pin versions; CodeArtifact ensures the same versions are available across pipelines.
    - Caching: Upstream packages are cached in your repo, improving speed and resilience against public registry outages.


---

Here’s the **short industry‑standard view** of how these AWS developer tools relate to each other:

---

## 🔗 Relationships

- **CodeCommit (Source Control)**  
  - Git‑based repository service (like GitHub/GitLab).  
  - Stores your application code and tracks changes.  
  - *Industry note:* AWS has deprecated CodeCommit for new customers, so most teams now use GitHub/GitLab/Bitbucket instead.

- **CodeArtifact (Dependency Management)**  
  - Private package repository for dependencies (npm, pip, Maven, NuGet, etc.).  
  - Ensures builds always pull secure, consistent versions of libraries.  
  - *Industry note:* Used alongside source control to manage external/internal packages.

- **CodeBuild (Build & Test)**  
  - Compiles source code, runs unit/integration tests, and produces build artifacts.  
  - Pulls dependencies from **CodeArtifact** and source from **CodeCommit/GitHub**.  
  - *Industry note:* Fully managed build service, replaces Jenkins build servers for many teams.

- **CodeDeploy (Deployment Automation)**  
  - Deploys built artifacts to EC2, ECS, Lambda, or on‑prem servers.  
  - Supports in‑place, rolling, blue/green, and canary deployments.  
  - *Industry note:* Often paired with Auto Scaling Groups and load balancers for safe rollouts.

- **CodePipeline (Orchestration Layer)**  
  - Connects all the above into a CI/CD pipeline.  
  - Defines stages: **Source → Build → Test → Deploy**.  
  - Passes artifacts between services and enforces approvals, rollbacks, and notifications.  
  - *Industry note:* Central CI/CD backbone in AWS; integrates with both AWS and third‑party tools.

---

## 🏢 Industry Standard Flow

```
Developer commits code (GitHub/CodeCommit)
        ↓
CodePipeline triggers build
        ↓
CodeBuild compiles/tests, pulls dependencies from CodeArtifact
        ↓
CodeDeploy rolls out new version to servers/containers/functions
```

---

## ✨ Summary

- **CodeCommit** → where code lives.  
- **CodeArtifact** → where dependencies live.  
- **CodeBuild** → compiles/tests code.  
- **CodeDeploy** → ships code to servers.  
- **CodePipeline** → orchestrates the whole CI/CD process.

---

