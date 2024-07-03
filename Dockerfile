ARG NODE_VERSION=20.14.0
FROM node:${NODE_VERSION}

WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install

COPY . .

RUN chown -R node:node /usr/src/app

EXPOSE 3000
CMD [ "npm", "run", "dev" ]
