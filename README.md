# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading
1. Clone this repository 

```
git clone https://github.com/yuliya-v/nodejs2022Q2-service.git
```
2. Go to project folder 
```
cd nodejs2022Q2-service
```
3. Choose development branch

```
git checkout develop
```

## Installing NPM modules

```
npm install
```

## Running application

Rename `.env.example` file to `.env`

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

