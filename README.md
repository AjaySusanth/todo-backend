Todo Backend API
================

This project is a RESTful API built using Node.js, Express, and MongoDB for a simple Todo application. It provides user authentication, task management, and CRUD operations for managing tasks.

Features
--------

-   User authentication (sign up and login)

-   Create, read, update, and delete tasks

-   Token-based authentication using JWT

-   Input validation and error handling

-   Swagger documentation for API endpoints

* * * * *

Tech Stack
----------

-   **Backend**: Node.js, Express.js

-   **Database**: MongoDB (Mongoose ORM)

-   **Authentication**: JWT

-   **Libraries**: bcrypt, jsonwebtoken, cookie-parser, mongoose

-   **API Documentation**: Swagger

* * * * *

Prerequisites
-------------

-   Node.js installed

-   MongoDB instance running locally or a cloud MongoDB Atlas instance

-   Postman or any REST API client for testing

* * * * *

Installation
------------

1.  Clone the repository:

    ```
    git clone https://github.com/your-repo/todo-backend.git
    cd todo-backend
    ```

2.  Install dependencies:

    ```
    npm install
    ```

3.  Create a `.env` file in the root directory and configure the following:

    ```
    PORT=5000
    JWT_SECRET=your_jwt_secret
    MONGO_URI=your_mongo_connection_string
    ```

4.  Start the server:

    ```
    npm run dev
    ```

    The API will be available at `http://localhost:5000`.

* * * * *




API Endpoints
-------------

### Authentication

1.  **Sign Up**

    -   **POST** `/auth/signup`

    -   **Request Body**:

        ```
        {
            "name":"Ajay",
            "email":"axs@gmail.com",
            "password":"axs"
        }
        ```

    -   **Response**:

        ```
        {
            "message": "Signed in successfully",
            "success": true,
            "user": {
                "name": "Ajay",
                "email": "axs@gmail.com",
                "_id": "6759e9f5ef058d6873c1aa9d",
                "createdAt": "2024-12-11T19:37:25.940Z",
                "updatedAt": "2024-12-11T19:37:25.940Z",
                "__v": 0
            }
        }
        ```

2.  **Login**

    -   **POST** `/auth/login`

    -   **Request Body**:

        ```
        {
            "email":"ajai@gmail.com",
            "password":"123"
        }
        ```

    -   **Response**:

        ```
        {
            "messsage": "Logged in successfully",
            "success": true,
            "user": {
                "_id": "6759dc8ff187ba62f9559cd6",
                "name": "Ajay",
                "email": "ajai@gmail.com",
                "createdAt": "2024-12-11T18:40:15.312Z",
                "updatedAt": "2024-12-11T18:40:15.312Z",
                "__v": 0
            }
        }
        ```

### Task Management

1.  **Get All Tasks**

    -   **GET** `/tasks`

    -   **Response**:

        ```
        {
            "message": "Tasks retrieved successfully",
            "success": true,
            "tasks": [
                {
                    "_id": "6759e7d1ef058d6873c1aa94",
                    "task": "Go to class",
                    "status": "completed"
                },
                {
                    "_id": "6759e729ef058d6873c1aa91",
                    "task": "Go to gym",
                    "status": "pending"
                }
            ]
        }
        ```

2.  **Create Task**

    -   **POST** `/tasks`

    -   **Request Body**:

        ```
        {
            "task":"Go to gym"
        }
        ```

    -   **Response**:

        ```
        {
            "message": "Task created successfully",
            "success": true,
            "task": {
                "userId": "6759dc8ff187ba62f9559cd6",
                "task": "Go to gym",
                "status": "pending",
                "_id": "6759e729ef058d6873c1aa91",
                "createdAt": "2024-12-11T19:25:29.070Z",
                "updatedAt": "2024-12-11T19:25:29.070Z",
                "__v": 0
        }
}
        ```

3.  **Update Task**

    -   **PUT** `/tasks/:id`

    -   **Request Body**:

        ```
        {
            "status":"completed"
        }
        ```

    -   **Response**:

        ```
        {
            "message": "Task updated successfully",
            "success": true,
            "task": {
                "task": "Go to gym",
                "status": "completed"
            }
        }
        ```

4.  **Delete Task**

    -   **DELETE** `/tasks/:id`

    -   **Response**:

        ```
        {
            "message": "Task deleted successfully",
            "success": true,
            "task": {
                "_id": "6759e729ef058d6873c1aa91",
                "userId": "6759dc8ff187ba62f9559cd6",
                "task": "Go to gym",
                "status": "completed",
                "createdAt": "2024-12-11T19:25:29.070Z",
                "updatedAt": "2024-12-11T19:30:15.080Z",
                "__v": 0
            }
        }
        ```

* * * * *

Documentation
-------------

The API documentation is available at `/api-docs` (using Swagger). Access it in your browser after running the server:

```
http://localhost:5000/api-docs
```

* * * * *

Testing
-------

Use Postman or any REST client to test the endpoints. Ensure you pass the token as a cookie for authenticated routes.

* * * * *