# MongoDB

### What is NoSQL?
- NoSQL means "Not Only SQL"
- It stores data in flexible formats(like json)
- It does not require tables or fixed schemas
- Used for fast and scalable applications 

### What is MongoDB
- It is a NoSQL database
- Stores data in JSON -like documents
- It is document-based , not table-based.
- Very popular in javascript/Node js apps

### Benefits With NestJS
- Mongodb uses JSON like format, perfect for Javascript/NestJs apps
- Easy integration with Mongoose in nest js
- Schema can be changed anytime (no migrations)
- Fast development- no need to define every field strictly.

### Integrating MongoDB With NestJS
- Install two packages , @nestjs/mongoose and mongoose. Built in mongoose package in nest js and separate mongoose package **npm i @nestjs/mongoose mongoose**
- Now go to app.module.ts file and import the MongooseModel **MongooseModule.forRoot(process.env.MONGO_URL!)** It is to tell nestjs to provide value of MONGO_URL globally in our appliation. The ! after process.env.MONGO_URL is TypeScript’s non-null assertion, telling TypeScript you’re sure the value is not undefined or null.

### What is forRoot() in NestJS?
- In NestJS, the forRoot() method is a static configuration method used by modules to perform initialization logic.

#### It's commonly used in:
- ConfigModule.forRoot()
- MongooseModule.forRoot()
- TypeOrmModule.forRoot()
- And others...

#### Purpose of forRoot():
- Allows you to pass initial configuration when importing a module.
- Internally sets up providers, dependencies, and configuration.
