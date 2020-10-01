# Setup and build the client

FROM node:12.18-alpine as client

WORKDIR /usr/app/client/
COPY client/package*.json ./
RUN npm install -qy
COPY client/ ./
EXPOSE 8080
RUN npm run build


# Setup the server

FROM node:12.18-alpine

WORKDIR /usr/app/
COPY --from=client /usr/app/client/dist/ ./client/dist/

WORKDIR /usr/app/server/
COPY server/package*.json ./
RUN npm install -qy
COPY server/ ./

EXPOSE 4000

CMD npm run dev