FROM node:12.16.0-alpine3.9
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT [ "node", "server/server.js" ]