
# Ai Intigrated Question and Answer Backend Service

## Objective
The objective of this assignment is to create a secure and scalable backend service built on Node.js and Express.js, similar to a minimal version of AnswersAi. This service will handle user requests and questions, designed for use with a frontend application.

## Requirements

1. **API Endpoints**
    - **POST /api/questions**: Accepts user question and returns AI-generated answer.
    - **GET /api/questions/:questionId**: Retrieves specific question and answer by question ID.
    - **POST /api/users**: Creates a new user account.
    - **GET /api/users/:userId**: Retrieves a user profile with a given userId.
    - **GET /api/users/:userId/questions**: Retrieves all questions asked by the user with a given userId.
    
2. **Authentication and Authorization**
    - **POST /api/auth/login**: User login endpoint.
    - **POST /api/auth/logout**: User logout endpoint.

3. **Database**
    - postgres

3. **Database Schema**
    - Designed for scalability, using Sequelize ORM.
    
4. **AI Integration**
    - Integrates with OpenAI API or Anthropic API using langchain for AI-generated answers.
    
5. **Containerization**
    - Dockerized application for easy deployment.
    

## Setup and Running Instructions

### Prerequisites
- Node.js
- Yarn
- postgres
- Docker

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=your_database_port
PORT=your_server_port
AI_API_KEY=your_ai_api_key
```

### Database Setup
1. Install PostgreSQL.
2. Create a new PostgreSQL database.
3. Update the `DATABASE_URL` in the `.env` file with your database connection string.

### Installing Dependencies
```bash
yarn install
```

### Running the Application
```bash
yarn dev
```

### Docker Setup
1. Build the Docker image:
    ```bash
    docker build -t answersai-backend .
    ```
2. Run the Docker container:
    ```bash
    docker run -p 4000:4000 --env-file .env answersai-backend
    ```

### wait-for-postgres.sh
Ensure that the `wait-for-postgres.sh` script is executable and properly configured to wait for PostgreSQL to be ready before starting the application.

### API Endpoints

#### Users
- **POST /api/users**: Create a new user.
- **GET /api/users/:userId**: Retrieve a user profile.
- **GET /api/users/:userId/questions**: Retrieve all questions by user.

#### Questions
- **POST /api/questions**: Submit a new question.
- **GET /api/questions/:questionId**: Retrieve a question by ID.

#### Authentication
- **POST /api/auth/login**: User login.
- **POST /api/auth/logout**: User logout.

## Code Structure
- **index.js**: Entry point of the application.
- **databaseConfig/db.js**: Database configuration using Sequelize.
- **routes/**: Contains route handlers for users, questions, and authentication.
- **middleware/**: Middleware for authentication and token handling and give user to access the content.
- **controllers/** : Contains controller functions for handling route logic for users, questions, and authentication.
- **models/** : Contains Sequelize models for the database User & Question
- **utility/** : for retrieving answers from Anthropic through LangChain.
- **Dockerfile** : Dockerfile for containerizing the application.

aiService.js: Utility function for retrieving answers from Anthropic through LangChain.



## dependencies:

- **@langchain/anthropic (version ^0.2.0)**: Anthropic integration for LangChain.
- **@langchain/core (version ^0.2.5)**: Core module for LangChain.
- **@sequelize/postgres (version ^7.0.0-alpha.41)**: Sequelize PostgreSQL adapter.
- **bcrypt (version ^5.1.1)**: Library for hashing passwords.
- **cors (version ^2.8.5)**: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **dotenv (version ^16.4.5)**: Library for loading environment variables from a .env file.
- **express (version ^4.19.2)**: Web application framework for Node.js.
- **jsonwebtoken (version ^9.0.2)**: Library for generating and verifying JSON Web Tokens (JWT).
- **langchain (version ^0.2.4)**: Library for building applications with LLMs through composability.
- **nodemon (version ^3.1.2)**: Utility for automatically restarting the Node.js application during development.
- **pg (version ^8.11.5)**: PostgreSQL client for Node.js.
- **pg-hstore (version ^2.3.4)**: Node.js package for serializing and deserializing JSON data to hstore format.
- **sequelize (version ^6.37.3)**: Promise-based ORM for Node.js.
- **sequelize-cli (version ^6.6.2)**: Command-line interface for Sequelize.


---

Good luck and happy coding!
