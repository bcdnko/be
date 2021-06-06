FROM node:14 as builder

WORKDIR /app

COPY . ./

RUN yarn install
#ENV PATH /app/node_modules/.bin:$PATH

RUN yarn run import-version -t bq-kjv
RUN yarn run import-version -t bq-rst
RUN yarn run import-strong -id mb-strong-ru
RUN yarn run update-version-index

CMD yarn start

