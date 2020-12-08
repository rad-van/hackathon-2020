ARG BASE_IMAGE=node:12.20.0-alpine3.9
FROM ${BASE_IMAGE} AS deps

WORKDIR /app
COPY *.json ./

RUN npm install --prod

FROM ${BASE_IMAGE} AS release

COPY . .
COPY --from=deps /app/node_modules ./node_modules
ARG SERVER_PORT
ARG BIND_ARRD

EXPOSE ${SERVER_PORT}
CMD ["npm", "run", "start"]
