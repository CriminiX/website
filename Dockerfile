#CI
FROM node:18.16-alpine as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run ci

#CD
FROM nginx:alpine
COPY --from=node /app/dist/criminix /usr/share/nginx/html
