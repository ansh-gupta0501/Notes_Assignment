
// -----------------------

// import express from 'express'
// const app = express()
// app.use(express.json())



// import helloRoute from './routes/hello.js'

// app.use('/api',helloRoute)

//-------------------------

//for mocking database


import express from 'express';
import createRouter from './routes/hello.js';

export default function makeApp(dependencies) {
  const app = express();
  app.use(express.json());
  app.use('/api', createRouter(dependencies));
  return app;
}
