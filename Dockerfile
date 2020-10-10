FROM node:14 as builder

WORKDIR /app

COPY . ./

RUN yarn install
#ENV PATH /app/node_modules/.bin:$PATH

CMD yarn start

