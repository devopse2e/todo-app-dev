# Stage 1: Build environment using Node.js 18 as the base image. The 'AS build' names this stage for later reference.
FROM node:18 AS build

# Sets the working directory inside the container to /app. All subsequent commands run here.
WORKDIR /app

# Copies package.json and package-lock.json to the working dir. This allows caching dependencies.
COPY package*.json ./

# Installs dependencies cleanly (using lockfile) without dev deps, optimizing for production builds.
RUN npm ci

# Copies the entire frontend code into the container.
COPY . .

# Runs the build script (from package.json), which uses Webpack to bundle the React app into /app/dist.
RUN npm run build

#### Stage 2: Starts a new, lightweight base image with Nginx on Alpine Linux (small footprint for serving static files).
FROM nginx:alpine

# Copies only the built artifacts (dist folder) from the 'build' stage to Nginx's HTML directory. This discards the heavy Node build tools.
COPY --from=build /app/dist /usr/share/nginx/html 

# Declares that the container listens on port 80 (Nginx default for HTTP).
EXPOSE 80

# Runs Nginx in the foreground (required for Docker; 'daemon off' prevents it from backgrounding).
CMD ["nginx", "-g", "daemon off;"]