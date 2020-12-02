FROM node:12.20.0 AS base

RUN apt-get update && \
    apt-get install -y tcpdump less net-tools \
      dnsutils netcat-openbsd telnet

WORKDIR /app
COPY *.json ./

FROM base AS deps

RUN npm install --prod

FROM base AS release

COPY . .
COPY --from=deps /app/node_modules ./node_modules
ARG SERVER_PORT
ARG BIND_ARRD

EXPOSE ${SERVER_PORT}
CMD ["npm", "run", "start"]
