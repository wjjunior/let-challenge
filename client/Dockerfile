FROM node:12.18-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci -qy

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]