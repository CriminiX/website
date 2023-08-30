#CI
FROM node:18.16-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install --loglevel=error
COPY . .
RUN npm run ci

#CD
FROM nginx:alpine
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/criminix /usr/share/nginx/html
