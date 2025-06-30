### File and folder structure

- **app.controller.spec.ts** inside src/ folder. This file is for testing of our controller file **app.controller.ts**. This is for unit testing 

- **app.controller.ts** inside src/folder. this is controller file in which we work with req, res. take request and send response 

- **app.module.ts** inside src/folder. As nestjs is based on modules. In the module file, we tell about our  imports , controllers, providers we use in our project. This file is basically our root module and all imports , controllers are registered in this file. 

- **app.service.ts** inside src/folder. In this file we write our business logic, calculations. Controller file call this service file. Whatever req comes to controller , controller call the service based on the request

- **main.ts** inside src/ folder. This is the entry point of our nest js application. This is the first file which will executed. It registers our app on a port number 

- **test/** this directory is for testing any specific feature or any controller.

- **eslint.config.mjs** This file gives warning if we don't follow nest js standards. Purpose: ESLint configuration in modern ES Module format.Defines code style, formatting, linting rules.

- **nest-cli.json** Configuration file for Nest CLI.
 Nestjs cli read this file when we run any command on cli 

- **tsconfig.build.json** This file is used during production. when optimization typescript compilation done this file is used

- **tsconfig.json** This tells how to compile typescript

- **package-lock.json** The dependencies used in our application was listed in package.json file. But There are also subdependencies of these dependencies. So these are listed in this file.Means in this file we get detailed information of the subdependencies or the detailed information of dependenices listed in our package.json file . This file also locks dependency version. Records exact versions of all installed packages and their sub-dependencies.Ensures consistency across different environments and installs.

- **package.json** this file have information regarding our project like versions , script,dependencies

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


---

# Controllers
- Controllers handle incoming HTTP requests. It is first place where http requests lands first
- They define routes(eg. GET,POST,PUT,DELETE)
- Bridge between client and business login (services)

### Importance of Controllers
- Organize API endpoints clearly and modularly.
- Help separate concerns: routing vs business logic
- Make code scalable and maintainable.
- Improve code readability with clearn structure

### Decorators
- They are special functions that give special behaviour to a class , method, or parameter. 
- They define meta data of any parameter, of any method ,of any class, as to what special powers this class, method or parameter have.
- Start with @symbol (eg., @Controller(),@Get())
- Tell nest js how to treat the class or method
- Used for routing , dependency injection , validation etc. 


### Creating controllers file using cli
- **nest g controller controller_name**  g means generate . It will create a folder with name controller_name and inside that folder , it also create 2 files controller_name.controller.ts and controller_name.controller.spec.ts (for testing).
It will also update the app.module file by registering controller in that. 

# Services
- A typescript class with logic like calculations, data access ,etc.
- Used to write business logic in a clean and reusable way.
- They are marked with @injectable() so nest js can use them . 
- We have to provide our services inside the controllers. so we use @injectable decorator. Nest js internally inject the services inside the controller

### Why Use services??
- To separate logic from controllers
- Makes code modular, clean and testable
- services can be reused in mutiple places
- Helps keep your app organized and scalable.

### Important points 
- Always use @Injectable() decorator on services
- Inject services into controllers using constructor injection 
- Services are part of the dependency injection system.
- Logic like fetching data , calculations, or API calls goes inside services.

### Creating services file using cli
- **nest g s service_name** g means generate , s means services

# Modules
- A container where we keep related controllers,services and providers for our application
- Core part of nest js architecture
- Everty nest js app has at least on module
- we should make separate module for each feature. like we have employee feature in our app so we make a module employee and in this we register our employee controller, service. In the main app.module , we import this employee module

### Creating module file using cli
- **nest g module module_name** g means generate