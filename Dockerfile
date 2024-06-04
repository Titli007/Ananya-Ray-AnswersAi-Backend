# Use the specific Node.js version as the base image
FROM node:20.11.1

# Install PostgreSQL client tools
RUN apt-get update && apt-get install -y postgresql-client

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of your application code to the working directory
COPY . .

# Copy the wait-for-postgres.sh script
COPY wait-for-postgres.sh ./

# Make the wait-for-postgres.sh script executable
RUN chmod +x wait-for-postgres.sh

# Expose the port your app runs on (assuming it runs on port 5000)
EXPOSE 5000

# Wait for PostgreSQL to be ready before starting the application
CMD ["./wait-for-postgres.sh", "postgres", "yarn", "dev"]

