# Phase 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Set dynamic API URL for the build
ARG BASE_URL
ENV BASE_URL=$BASE_URL

RUN npm run build

# Phase 2: Serve with Nginx
FROM nginx:stable-alpine
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the build output to nginx public folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]