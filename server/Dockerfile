FROM node:12.20.0

WORKDIR /app

COPY *.json /app/
COPY *.js /app/

RUN apt-get update && \
    apt-get install -y tcpdump less net-tools \
      dnsutils netcat-openbsd telnet

RUN npm install --prod

ARG HTTPS_PORT
ARG BIND_ARRD
ARG KEY_FILE
ARG CERT_FILE

CMD ["node", "./index.js"]
