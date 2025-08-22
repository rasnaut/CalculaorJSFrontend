# Stage 1: Build app
FROM node:14-alpine AS build

WORKDIR /app
COPY package-docker.json package.json 

RUN npm install

COPY src ./src
COPY public ./public

# set env variables
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# Stage 2: Setup Nginx for processing static files
FROM nginx:alpine
RUN apk add --no-cache gettext

WORKDIR /usr/share/nginx/html

# Copy builded app from previus stage
COPY --from=build /app/src ./src/    
COPY --from=build /app/public .

COPY public/config.template.js ./config.template.js
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


EXPOSE 5002

# Start Nginx
ENTRYPOINT ["/entrypoint.sh"]
