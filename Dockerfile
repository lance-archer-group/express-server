# Use a lightweight Node base image
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the source code
COPY src ./src

# Use a smaller runtime image
FROM node:18-alpine AS runtime

WORKDIR /app

# Copy dependencies and source code from the build stage
COPY --from=build /app /app

# Create a non-root user for security
RUN addgroup app && adduser -S -G app app
USER app

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
