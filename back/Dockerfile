FROM node:20-alpine

WORKDIR /home/node/memorio/back

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD [ "npm", "run", "start:dev" ]