FROM node:12
WORKDIR /usr/app
COPY package.json .
COPY .env .
RUN export $(grep -v '^#' .env | xargs -d '\n') && npm install --unsafe-perm
COPY . .