FROM node:16-alpine
WORKDIR /home/node/app
ENV REACT_APP_API_URL=""

ADD frontend/package.json package.json
ADD frontend/yarn.lock yarn.lock

RUN yarn
ADD frontend .

RUN yarn build

FROM node:16-alpine
WORKDIR /home/node/app

ADD backend/package.json package.json
ADD backend/yarn.lock yarn.lock

RUN yarn
ADD backend .
COPY --from=0 /home/node/app/build /home/node/app/public
ENV GITHUB_OAUTH_REDIRECT_URL=""
CMD [ "node", "src", "index.js" ]