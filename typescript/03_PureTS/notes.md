# Understanding `tsc --init` and `tsconfig.json`

When you install TypeScript globally (`npm install -g typescript`), you get access to the TypeScript compiler `tsc`.

---

## What is `tsc --init`?

Running:

```bash
tsc --init
````

in your project directory creates a **`tsconfig.json`** file. This file configures how the TypeScript compiler behaves.

---

## What is `tsconfig.json`?

* A JSON configuration file for TypeScript projects.
* Specifies compiler options and project structure.
* Helps you control what to compile, how to compile, and where to output.

---

## Important Options in `tsconfig.json`

| Option                | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| **`target`**          | Specifies the ECMAScript version output, e.g., `es5`, `es6` (ES2015), `es2020`, etc.     |
| **`module`**          | Defines the module system to use: `commonjs`, `esnext`, `amd`, `umd`, etc.               |
| **`rootDir`**         | Specifies the root folder of your TypeScript source files.                               |
| **`outDir`**          | Folder where compiled JavaScript files will be emitted.                                  |
| **`allowJs`**         | Allows JavaScript files to be compiled alongside TypeScript files when set to `true`.    |
| **`noEmit`**          | If `true`, disables emitting output files (useful for type-checking only).               |
| **`strict`**          | Enables a set of strict type-checking options for safer code.                            |
| **`esModuleInterop`** | Enables compatibility with CommonJS and ES Modules imports/exports.                      |
| **`skipLibCheck`**    | Skips type checking of declaration files (`.d.ts`) to speed up compilation.              |
| **`sourceMap`**       | Generates source map files for debugging the original TypeScript in browsers or editors. |

---

## How these options help you:

* **Target (ES version)** controls which JavaScript features are used in the output, ensuring compatibility with older or newer environments.
* **Root directory and output directory** let you organize your source and build files separately.
* **Module system** must match your environment (Node.js uses CommonJS, modern bundlers use ESNext).
* **AllowJs** is handy when migrating a JS project to TS gradually.
* **NoEmit** allows running the compiler just for type checking without generating files.
* **Strict mode** helps catch bugs early with better type checks.

---

## Example snippet of `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "allowJs": false,
    "noEmit": false,
    "sourceMap": true
  }
}
```

---

## Summary

* `tsc --init` sets up your TypeScript project with a base configuration.
* `tsconfig.json` controls how TypeScript compiles your code.
* Adjust options based on your project needs for compatibility, performance, and debugging.


---

- Now we have setup node project and make a index.html file, src folder and dist folder. src folder is where we write our code and dist folder is what to provide to end user in production. now make a index.ts file in src folder and index.js file in dist folder(in dist folder file will automatically form but for now manually make it ). now in index.html file link your index.js file using script tag. 

- Now we don't write any code in index.js file . we write all code in index.ts file and it will automatically converted to index.js in dist folder file but we need to tell typescript first 

- in tsconfig.json file , in the outDir option set ./dist  folder

- Now write simple console.log() statement in index.ts file and then compile this using tsc command . 

- we see a index.js file formed in same src folder , not in dist folder but we don't want this . we want index.js file formed in dist folder 

- so for this there is something called watchmode. use command (tsc -w). 
- this is keep on running the things and if there is any change in typescript it keeps on just watching it . And now we see the index.js file formed in dist folder 

- it is because when you compile .ts file just by tsc command it does not look for tsconfig.json file.  But when you put it in watchmode then it keeps on watching and also watch it based on tsconfig.json and try to run all these things there. 

- if we got any error in ts file , the js file will still produce but yes we can also configure it in tsconfig.json file not to produce .js file if there any error in .ts file 


---

# Generics

- Generics make our components(functions, arrays ) reusable 
- 