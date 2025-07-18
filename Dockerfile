FROM node:22.17-alpine

WORKDIR /var/www

RUN mkdir stash_bot

WORKDIR /var/www/stash_bot

COPY . .

RUN npm install