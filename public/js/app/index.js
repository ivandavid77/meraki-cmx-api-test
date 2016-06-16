define('ws', [
  'sockjs'
], function(SockJS, config) {
  var socket = new SockJS('http://'+location.host+'/ws');

  function emit(event, msg) {
    var data = JSON.stringify({
      event: event,
      msg: msg,
    });
    socket.send(data);
  }

  function onMessage(callback) {
    socket.onmessage = function(e) {
      var {event, msg} = JSON.parse(e.data);
      callback(event, msg);
    };
  }

  var externalAPI = {
    emit: emit,
    onMessage : onMessage,
  };
  return externalAPI;
});


define([
    'jquery',
    'ws'
], function($, ws) {
    $(function() {
        ws.onMessage((event, msg) => {
            switch (event) {
                case 'datosV2':
                    $('#datos > tbody:last-child').append(`
                        <tr>
                        <td><textarea rows="3">${msg}</textarea></td>
                        </tr>`);
                    break;
                }
        });
    });
});