### FOR NORMAL SERVERS ###
# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14.17.0-alpine as build

RUN mkdir -p /app

# Set the working directory
WORKDIR /app

COPY package.json /app

# Install all the dependencies
RUN npm install

# Add the source code to app
COPY . /app

# Generate the build of the application
RUN npm run build --prod

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1.20.1

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/biplan /usr/share/nginx/html

# Expose port 4200
EXPOSE 4200:80


# # ### FOR RASPBIAN SERVERS ###
# # Stage 1: Compile and Build angular codebase
# FROM node:14.17.0-alpine as build

# RUN mkdir -p /app
# WORKDIR /app

# COPY package.json /app
# RUN npm install

# COPY . /app
# RUN npm run build --prod

# # Stage 2: Serve app with nginx server
# FROM arm32v7/nginx:1.20.1

# COPY --from=build /app/dist/biplan /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
