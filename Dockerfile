# build stage
FROM node:12-alpine as node_base

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

FROM node_base as build-stage
WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install
RUN npm build

COPY --chown=node:node . .

EXPOSE 8080

RUN chmod a+rx ./scripts/wait-for.sh

CMD ./scripts/wait-for.sh db:5432 -- /bin/sh -c npm run server

# production stage
#FROM nginx:stable-alpine as production-stage
#COPY --from=build-stage /home/node/app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
