module.exports = function() {
  var options = {
    sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.1.1/sockjs.min.js',
    log: function() {},
  };
  var sockjs = require('sockjs');
  var ws = sockjs.createServer(options);

  var clients = {};

  function broadcastAll(event, msg) {
    var data = JSON.stringify({
      event : event,
      msg : msg,
    });
    for (var id in clients) {
      clients[id].write(data);
    }
  }

  ws.on('connection', function(conn) {
    clients[conn.id] = conn;
    conn.on('close', function() {
       delete clients[conn.id]
    });
  });

  var externalAPI = {
    broadcastAll: broadcastAll,
    ws: ws,
  };

  return externalAPI;
};
