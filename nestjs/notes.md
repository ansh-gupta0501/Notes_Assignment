### Nest js
- A progressive Node.js framework for building efficient and scalable server-side appliations.
- Built with typescript and heavily inspired by Angular.
- Used modular architecture for better organization.


### Why we need nest js
- To simplify backend development using modern architecture
- Provides a structured way to build scalable and testable applications
- Solves the limitations of traditional express apps.


### Difference between express vs nest

- Express is unopinionated framework. (means there is no fixed structure in this)(we can make project in single file or by multiple folders)(to fixed file name stucture). means it is very flexible. Different developers have different way for writing code 

- Nest js  is opinionated framework . less flexible but more scalable. anyone can understand the code as it has fixed structure

- Nestjs have many build in support like database integration , graphql , rest api


### Benefits of nest js 
- Fully supports Typescript
- Built-in dependency injection system
- Easy integration with databases, websockets,graphql, microservices
- Scalbale and maintainable codebase
- Active and growing community support

---

### Installation
- npm i -g @nest/cli      - nest js command line interface tool which is used to control the nest using commands 
- nest new project-name  - this command will only run if we have nest js cli installed 

### File and folder structure

- **app.controller.spec.ts** inside src/ folder. This file is for testing of our controller file **app.controller.ts**. This is for unit testing 

- **app.controller.ts** inside src/folder. this is controller file in which we work with req, res. take request and send response 

- **app.module.ts** inside src/folder. As nestjs is based on modules. In the module file, we tell about our  imports , controllers, providers we use in our project. This file is basically our root module and all imports , controllers are registered in this file. 

- **app.service.ts** inside src/folder. In this file we write our business logic, calculations. Controller file call this service file. Whatever req comes to controller , controller call the service based on the request

**main.ts** inside src/ folder. This is the entry point of our nest js application. This is the first file which will executed. It registers our app on a port number 

**test/** this directory is for testing any specific feature or any controller.

**eslint.config.mjs** This file gives warning if we don't follow nest js standards. Purpose: ESLint configuration in modern ES Module format.Defines code style, formatting, linting rules.

**nest-cli.json** Configuration file for Nest CLI.
 Nestjs cli read this file when we run any command on cli 

**tsconfig.build.json** This file is used during production. when optimization typescript compilation done this file is used

**tsconfig.json** This tells how to compile typescript

**package-lock.json** The dependencies used in our application was listed in package.json file. But There are also subdependencies of these dependencies. So these are listed in this file.Means in this file we get detailed information of the subdependencies or the detailed information of dependenices listed in our package.json file . This file also locks dependency version. Records exact versions of all installed packages and their sub-dependencies.Ensures consistency across different environments and installs.

**package.json** this file have information regarding our project like versions , script,dependencies

| File/Folder                  | Purpose                                 |
| ---------------------------- | --------------------------------------- |
| `src/app.controller.ts`      | Handles requests and sends responses    |
| `src/app.service.ts`         | Business logic layer                    |
| `src/app.module.ts`          | Main module for configuration           |
| `src/main.ts`                | Entry point of the application          |
| `src/app.controller.spec.ts` | Unit test for controller                |
| `test/`                      | Folder for integration/end-to-end tests |
| `eslint.config.mjs`          | Code linting configuration              |
| `nest-cli.json`              | Nest CLI behavior config                |
| `tsconfig.json`              | TypeScript compiler settings            |
| `tsconfig.build.json`        | Production build TypeScript settings    |
| `package.json`               | Project metadata and dependencies       |
| `package-lock.json`          | Exact dependency lock file              |
