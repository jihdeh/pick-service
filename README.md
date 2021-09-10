# service

## Getting started

Get neccessary environmental variables from .env.example and add it to .env

## Starting the application

There are two ways to start the application, with docker and without docker.

First: create a new file called .env in the root of the project folder.

Then copy the contents of .env.example into the .env file you just created.

With Docker:

- Make sure to have [docker](https://www.docker.com/get-started) and [docker-compose](https://docs.docker.com/compose/install/) installed.
- You would need to make a change to a variable in your .env file, this is a necessary change in order to connect to the mongo database in the docker network successfully.

```javascript

- ~~DEV_DATABASE_URL=mongodb://127.0.0.1:27017/pickfu~~
+ DEV_DATABASE_URL=mongodb://mongo:27017/pickfu

```

- RUN `yarn container`. This command installs images and starts up the backend server.
- You can monitor the logs on the terminal to see when backend has successfully started.
- Once your server is up and running, the backend URL would be accessible locally via [http://localhost:4100](http://localhost:4100)

Without Docker:

- Make sure you are on node version 14 or higher, you can switch your node version easily using this tool [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
- RUN `yarn install`
- Once packages have successfully installed, RUN `yarn start:server`
- For windows users, you might have to change the command in package.json from `cp .env dist/ ` to `copy .env dist/`, because `cp` might not be a recognizable command on your machine.

## How to Test

Integration test was written, but not completely.
However to run the test, you can do so by running

```bash
yarn test
```

## Hosting

This backend api is hosted at https://shutly.herokuapp.com/ on Heroku servers.

## Other notes

This task was built using the good ol' Typescript, NodeJS, ExpressJS and Mongodb(NoSQL) database.

The implementation only tackles the requirements of the task, with a little bit of extra technical stuff, like proper error handling, some testing etc.

There are other things like what should be the expected short length - i used a maximum of 6 chararacters

- Cases like what happens when there's a collision in generated short keys - I didn't handle that.
- Same URLs, generate the same shortURLs, but in a production scenario in the case of analytics tracking for users, URLs would have to be generated differently.
- Caching frequently accessed URLS and also publishing events for ranking of the most visited URLS
- So there are other factors to consider, i just wanted to pointed out that i strictly followed the requirements of the task.
