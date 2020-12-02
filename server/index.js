#!/usr/bin/env node

const parseArgs = require('minimist');

const {INF, ERR, DEB, logger} = require('./log.js');

INF(`Node version: ${process.version}`);

const args = parseArgs(process.argv.slice(2),
                       {
                         default: {
                           port: 80,
                           addr: "0.0.0.0",
                           es_host: "es",
                           es_port: 9200
                         },
                         alias: {
                           a: 'addr',
                           p: 'port'
                         }
                       });

const server_options = {
  server_port: process.env.SERVER_PORT || args.port,
  bind_addr: process.env.BIND_ADDR || args.addr,
  es_host: process.env.ES_HOSTNAME || args.es_host,
  es_port: process.env.ES_PORT || args.es_port
};

INF(`Starting WAF a la Mod HTTP server on ${server_options.bind_addr}:${server_options.server_port}`);

const express = require('express');
const express_winston = require('express-winston');
const es = require('@elastic/elasticsearch');

const http = require('http');
const fs = require('fs');

const app = express();

app.use(express_winston.logger({
  level: 'info',
  winstonInstance: logger,
  msg: '{{res.statusCode}} - {{req.secure === true ? \'https\' : \'http\'}} {{req.method}} on {{req.url}} by {{req.headers[\'x-forwarded-for\'] || req.connection.remoteAddress}}',
  meta: false,
}));

const esc = (() => {
  const {es_host, es_port} = server_options;
  return new es.Client({node: `http://${es_host}:${es_port}`});
})();

app.use(express.json());

app.post("/ingest", async (req, res, next) => {
  const {transaction} = req.body;
  if (transaction !== undefined) {
    DEB(transaction);
    if (transaction.messages.length !== 0) {
      INF('=== blocked request on [', transaction.request.uri, ']');
    }
  }
  // TODO: name the index by the protected host name?
  await esc.index({
    index: 'all_logs',
    refresh: true,
    body: transaction
  });
  // TODO: send transaction over websocket
  next();
});

app.post("/history", async (req, res, next) => {
  const {query} = req.body;
  const {body} = await esc.search({
    index: 'all_logs',
    body: {
      query
    }
  });
  DEB("total hits:", body.hits.total.value);
  res.json(body.hits);
  next();
});

let server_count = 1;

let http_server;
const server_closed = (what) => {
  return () => {
    INF(`${what} closed`);
    server_count -= 1;
    if (server_count === 0) {
      INF('All servers shutdown. Process exiting...');
      process.exit(0);
    }
  };
};

let io;

const https_startup = () => {
  http_server = http.createServer(app);

  http_server.on('close', server_closed('HTTP server'));
  io = require('socket.io')(http_server);
  http_server.listen(
    server_options.server_port, server_options.bind_addr,
    () => {
      const addr = http_server.address();
      INF(`HTTP server listening on: ${addr.address}:${addr.port}`);
      server_count += 1;
    }
  );
};

const shutdown = () => {
  http_server.close(() => {
    // FIXME: This message is only showing up in the console, not in
    // the log file.
    INF('HTTP server shut down');
  });

  // This appears to be a hack to shut down an HTTP server quickly.  See
  // https://apple.stackexchange.com/questions/117644/how-can-i-list-my-open-network-ports-with-netstat
  setImmediate(() => http_server.emit('close'));

  setTimeout(() => {
    ERR('Unable to close HTTP connections in time, forcefully exiting...');
    process.exit(1);
  }, 3500);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

https_startup();


io.on('connection', socket => {
    console.log('connect');
});

app.get('/', function(req, res) {
    res.send('redirect to dashboard')
});

app.post('/ingestion', function(req, res) {
    res.send('parse/store to es')
});
