#!/usr/bin/env node

const parseArgs = require('minimist');

const {INF, ERR, DEB, logger} = require('./log.js');

INF(`Node version: ${process.version}`);

const args = parseArgs(process.argv.slice(2),
                       {
                         default: {
                           key: "key.pem",
                           cert: "cert.pem",
                           port: 4430,
                           addr: "0.0.0.0"
                         },
                         alias: {
                           a: 'addr',
                           p: 'port'
                         }
                       });

const server_options = {
  https_port: process.env.HTTPS_PORT || args.port,
  bind_addr: process.env.BIND_ADDR || args.addr,
  key_file: process.env.KEY_FILE || args.key,
  cert_file: process.env.CERT_FILE || args.cert
};

INF(`Starting WAF a la Mod HTTPS server on ${server_options.bind_addr}:${server_options.https_port}`);

const express = require('express');
const express_winston = require('express-winston');

const https = require('https');
const fs = require('fs');

const app = express();

app.use(express_winston.logger({
  level: 'info',
  winstonInstance: logger,
  msg: '{{res.statusCode}} - {{req.secure === true ? \'https\' : \'http\'}} {{req.method}} on {{req.url}} by {{req.headers[\'x-forwarded-for\'] || req.connection.remoteAddress}}',
  meta: false,
}));

let server_count = 1;

let https_server;
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
  https_server = https.createServer(
    {
      key: fs.readFileSync(server_options.key_file),
      cert: fs.readFileSync(server_options.cert_file)
    },
    app
  );

  https_server.on('close', server_closed('HTTPS server'));
  https_server.listen(
    server_options.https_port, server_options.bind_addr,
    () => {
      const addr = https_server.address();
      INF(`HTTPS server listening on: ${addr.address}:${addr.port}`);
      server_count += 1;
    }
  );
};

const shutdown = () => {
  https_server.close(() => {
    // FIXME: This message is only showing up in the console, not in
    // the log file.
    INF('HTTPS server shut down');
  });

  // This appears to be a hack to shut down an HTTP server quickly.  See
  // https://apple.stackexchange.com/questions/117644/how-can-i-list-my-open-network-ports-with-netstat
  setImmediate(() => https_server.emit('close'));

  setTimeout(() => {
    ERR('Unable to close HTTPS connections in time, forcefully exiting...');
    process.exit(1);
  }, 3500);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

https_startup();
