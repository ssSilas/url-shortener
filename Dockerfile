FROM node:alpine

RUN apk add --no-cache bash

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN npm install -g @nestjs/cli

COPY --chown=node:node . .

USER node