
FROM node:14 AS build

# Work directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build app
RUN npm run build --prod

# Use Nginx as running environment
FROM nginx:alpine
COPY --from=build /app/dist/notflix /usr/share/nginx/html

# Expose 80 port
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
