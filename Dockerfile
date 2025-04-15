# Use Node version 22 as the base image
FROM node:22

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the TypeScript source
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]