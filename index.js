#!/usr/bin/env node
var config = require('./config.js')();
var ws = require('./sock.js')();
var expressApp = require('./expressApp.js')(config, ws);
ws.ws.installHandlers(expressApp.server, {prefix: '/ws'});
expressApp.run();

