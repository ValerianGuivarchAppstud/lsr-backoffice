# Stage 0 - "build-stage"
FROM node:16.14.0-alpine3.15 as build-stage

ARG REACT_APP_API_URL=${REACT_APP_API_URL:-"http://127.0.0.1:8080/api/v1/admin"}
ARG PUBLIC_URL=${PUBLIC_URL:-"http://127.0.0.1:3000"}
ARG REACT_APP_RELEASE_NUMBER=${REACT_APP_RELEASE_NUMBER:-"0.0.1"}

WORKDIR /app
COPY package*.json /app/

RUN npm install
COPY ./ /app/
RUN npm run build

# Stage 1 - Put everything in nginx and run it
FROM nginx:1.21.5

ENV PORT 80
EXPOSE ${PORT}

COPY docker/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker/nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/build/ /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
