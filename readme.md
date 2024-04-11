
# Internship Assignment

This project is a RESTful API built with Node.js and Express.js for managing courses, user enrollments, and user authentication. It provides endpoints to perform CRUD operations on courses, enroll users in courses, and manage user authentication.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DATABASE_URL`

`JWT_SECRET`

`JWT_EXPIRY`


## Run Locally

Clone the project

```bash
  git clone https://github.com/ismailbohra/Internship-Assignment my-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
Swagger Docs

```bash
  http://localhost:3000/docs
```


## Node Packages 

**express** : Web framework for Node.js

**mongoose** : MongoDB object modeling tool

**jsonwebtoken** : JSON Web Token implementation for authentication

**bcryptjs** : Password hashing library

**dotenv** : Load environment variables from a .env file

**joi** : Object schema validation library

**express** -rate-limit: Rate limiting middleware for Express.js

**swagger** -ui-express: Swagger middleware for Express.js

**nodemon** : Development tool to automatically restart the server

**eslint** : JavaScript linter

**prettier** : Code formatter


## Api End Points

- Courses

`GET /api/course/getCourseById/{courseId}`: Get course by ID 

`GET /api/course`: Get all courses

`POST /api/course`: Create a new course

`PUT /api/course`: Update course by ID

`DELETE /api/course/{courseId}`: Delete course by ID

- Enrollment

`POST /api/enrollment`: Enroll user in course

`DELETE /api/enrollment/{enrollmentId}`: Remove enrollment by ID

- User

`POST /api/user/register`: Register a new user

`GET /api/user/getUserById/{userId}`: Get user by ID

`GET /api/user/getAllUser`: Get all users

`POST /api/user/login`: Login with email and password

`PUT /api/user`: Update user information

