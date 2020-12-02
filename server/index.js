#!/usr/bin/env node

const parseArgs = require('minimist');

const {INF, ERR, DEB, logger} = require('./log.js');

INF(`Node version: ${process.version}`);

const args = parseArgs(process.argv.slice(2),
                       {
                         default: {
                           port: 80,
                           addr: "0.0.0.0"
                         },
                         alias: {
                           a: 'addr',
                           p: 'port'
                         }
                       });

const server_options = {
  server_port: process.env.SERVER_PORT || args.port,
  bind_addr: process.env.BIND_ADDR || args.addr
};

INF(`Starting WAF a la Mod HTTP server on ${server_options.bind_addr}:${server_options.server_port}`);

const express = require('express');
const express_winston = require('express-winston');

const http = require('http');
const fs = require('fs');

const app = express();

app.use(express_winston.logger({
  level: 'info',
  winstonInstance: logger,
  msg: '{{res.statusCode}} - {{req.secure === true ? \'https\' : \'http\'}} {{req.method}} on {{req.url}} by {{req.headers[\'x-forwarded-for\'] || req.connection.remoteAddress}}',
  meta: false,
}));

app.use(express.json());

app.post("/ingest", (req, res, next) => {
  const {transaction} = req.body;
  if (transaction !== undefined) {
    DEB(transaction);
    if (transaction.messages.length !== 0) {
      INF('=== blocked request on [', transaction.request.uri, ']');
    }
  }
  // TODO: send transaction into ES
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

const https_startup = () => {
  http_server = http.createServer(app);

  http_server.on('close', server_closed('HTTP server'));
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
