# Project Name

## Description

## Setup

1. Install appwrite according to [official guide](https://appwrite.io/docs/installation). If you use a custom port or hostname for appwrite, make sure to replace `localhost` with `[HOST]:[PORT]`.
2. Visit `http://localhost/install` and follow the instructions. Create a new project and a new user.
3. Create a new file called `.config.js` in root of project with following attributes:

```js
const config = {
    PORT: 3456, // port to run backend application
    ENDPOINT: 'http://localhost/v1', // appwrite endpoint
    PROJECT: 'project id', // project id
};

export default config;
```

Project id can be found in Project Overview page in Appwrite console.

<img src="./images/ProjectId.png" alt="Location of project id in appwrite console">
