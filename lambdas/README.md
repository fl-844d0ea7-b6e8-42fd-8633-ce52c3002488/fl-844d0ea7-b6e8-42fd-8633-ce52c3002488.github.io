# Lambdas for flashcard app

## Introduction/motivation
Orignally I wanted a dynamic application, server-side rendered, with a postgresql database underneath. But, this turned out to be a bit difficult, when I wanted to put costs to near 0. So, the overcome this, I took advantage of the AWS Always Free Tier, and hosted my backend stuff as a bunch of lambdas connecting to the DB instead.

## Local setup
Begin by installing the AWS SAM cli, instructions found here (for Mac): https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html


## Debug locally
To run locally, enter this into your terminal:
```bash
sam local start-api -p 3003 --docker-network=host --debug
```

You only need to restart the SAM local server if you make changes to the template.yaml, otherwise, hot reloading is supported.