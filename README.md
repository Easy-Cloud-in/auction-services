# Codingly.io: Base Serverless Framework Template

https://codingly.io

## What's included

- Folder structure used consistently across our projects.
- [serverless-pseudo-parameters plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Allows you to take advantage of CloudFormation Pseudo Parameters.
- [serverless-bundle plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Bundler based on the serverless-webpack plugin - requires zero configuration and fully compatible with ES6/ES7 features.

## Getting started

```
sls create --name YOUR_PROJECT_NAME --template-url https://github.com/codingly-io/sls-base
cd YOUR_PROJECT_NAME
npm install
```

You are ready to go!

# SLS commands

sls deploy -v

sls remove -v

sls deploy -f <functionName> -v

sls invoke local -f <functionName> #offline mode

sls logs -f <functionName> --startTime 1m

sls logs -f processAuctions

sls logs -f processAuctions -t
