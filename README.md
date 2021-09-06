# TypeScript project that gets data from one API, transforms it, then posts it to a different API

* The code is written in TypeScript and uses ts-node for lightweight JIT execution
* The Axios HTTP client is used to manage API request/response
* Dependencies are handled by NPM
* zip-state package was added for easy conversion of zipcodes to state names

<br/>

# Project Instructions

## Prerequisites:
<br/>

**1. Node Package Manager installed**
  * [Download: npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
<br/>

**2. Git installed**
  * [Download: git-scm](https://git-scm.com/downloads)
<br/>

<br/><br/>

## Execution Instructions:
<br/>

**1. Use Git to clone this repository to a local directory**
  * In Git Bash, change the current working directory to the location where this repository should be cloned
  * In the directory run the command: `git clone https://github.com/austinesmith/api-transform`
<br/>

**2. Install dependencies**
  * Run the command `npm install` in the root directory of the project
  * This creates the `node_modules` directory containing required packages
<br/>

**3. Run script**
  * Run the command `npm run transform` in the root directory of the project
  * The script was added to `package.json` to encourage execution with ts-node 
  * Alternatively, you can run `npx ts-node ./src/transform.ts` 
<br/>