# Stage 1: Build Angular App
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the code
COPY . /app

# Build the Angular project 
RUN npm run build --prod

# Stage 2: Use Nginx to Serve the App
FROM nginx:1-alpine-slim

# Copy built Angular app to Nginx HTML directory      tttttttttthe issue was forgetting /browser at the end of the path  
COPY --from=build /app/dist/hotel-booking/browser  /usr/share/nginx/html      

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]



#the image name is front-hotel 
#docker run -d --name hotel-container -p 8002:80 front-hotel 