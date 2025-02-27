# Development Dockerfile for React
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3000 for React development server
EXPOSE 3000

# Start the React development server with the host set to 0.0.0.0
ENV HOST=0.0.0.0

# Start the React development server
CMD ["npm", "start"]
