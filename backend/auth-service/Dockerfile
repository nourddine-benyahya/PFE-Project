FROM node:latest

WORKDIR /app

COPY . .

RUN npm install
RUN npm install body-parser

EXPOSE 3000

CMD node server.js