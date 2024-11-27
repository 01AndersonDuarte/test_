FROM node:alpine

WORKDIR /usr/src

COPY . .

EXPOSE 8080

RUN npm install

RUN npm run build

CMD ["npm", "start"]