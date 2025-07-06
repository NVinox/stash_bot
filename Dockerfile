FROM node:23.11.0

WORKDIR /var/www

RUN mkdir stash_bot

WORKDIR /var/www/stash_bot

COPY . .

RUN npm install