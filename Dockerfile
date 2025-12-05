# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build

# Stage 2: Production stage with Nginx
FROM nginx:alpine AS production

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/

EXPOSE 9080

CMD ["nginx", "-g", "daemon off;"]
