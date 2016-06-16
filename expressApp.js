module.exports = function(config, ws) {
    var express = require('express');
    var bodyParser = require('body-parser');
    var app = express();
    var http = require('http');
    var server = http.Server(app);
    app.set('port', config.HTTP_PORT);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/public'));
    app.get('/', function(req, res) {
        res.redirect('/index.html');
    });    
    app.get('/meraki', function(req, res){
        res.send(config.VALIDATOR);
        console.log("sending validation")
    });
    app.post('/meraki', function(req, res){
        ws.broadcastAll('datosV2', JSON.stringify(req.body));
    });
    function run() {
        server.listen(
            app.get('port'),
            () => console.log('Aplicacion iniciada: '+app.get('port'))
        );
    }
    var externalAPI = {
        server : server,
        run : run,
    };
    return externalAPI;
};
