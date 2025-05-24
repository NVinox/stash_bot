FROM node:23.11.0

WORKDIR /var/www

RUN mkdir stash_bot
RUN npm install typescript@5.8.3 -g
RUN npm install rimraf -g

WORKDIR /var/www/stash_bot

COPY . .

RUN npm install