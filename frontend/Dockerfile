# -------------------------------
# 🏗️ Build Stage
# -------------------------------
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire source code and build the app
COPY . .
RUN npm run build

# -------------------------------
# 🚀 Production Stage
# -------------------------------
FROM nginx:alpine

# Copy custom Nginx config (make sure default.conf exists at root)
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the built app from the builder stage to the Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
