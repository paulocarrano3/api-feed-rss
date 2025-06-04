FROM node:alpine

WORKDIR /api

COPY package*.json .

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start"]