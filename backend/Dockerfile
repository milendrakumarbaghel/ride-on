# Use the official Node.js 20 image as the base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy all other backend source code files into the container
COPY . .

# Expose the port the backend will run on
EXPOSE 4000

# Command to run your backend app
CMD ["npm", "start"]
