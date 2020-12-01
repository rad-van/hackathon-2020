FROM dregis.strangeloop.net/hackathon-2020/server-dep:1

WORKDIR /app

COPY *.js /app/

ARG HTTPS_PORT
ARG BIND_ARRD
ARG KEY_FILE
ARG CERT_FILE

CMD ["node", "./index.js"]
