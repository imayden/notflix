# Use the official Node.js mirror as the basic mirror
FROM node:14

# Work directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build app
RUN npm run build

# Expose 4231 port
EXPOSE 4231

# Run app
CMD ["npm", "run", "start:prod"]
