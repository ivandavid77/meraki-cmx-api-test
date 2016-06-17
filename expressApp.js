module.exports = function(config, ws) {
    var jsonfile = require('jsonfile');
    var express = require('express');
    var bodyParser = require('body-parser');
    var serveIndex = require('serve-index');
    var app = express();
    var http = require('http');
    var server = http.Server(app);
    app.set('port', config.HTTP_PORT);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/public'));
    app.use('/json', serveIndex(__dirname + '/public/json', {'icons': true}));
    app.get('/', function(req, res) {
        res.redirect('/index.html');
    });    
    app.get('/meraki', function(req, res){
        res.send(config.VALIDATOR);
        console.log("sending validation")
    });
    app.post('/meraki', function(req, res){
        var obj = req.body;
        var filename = 'public/json/meraki_'+new Date().toISOString()+'.json';
        jsonfile.writeFile(filename, obj, function(err) {
            if (err) console.error('Error al generar el archivo:', err);
        });
        ws.broadcastAll('datosV2', JSON.stringify(obj));
    });
    function run() {
        server.listen(
            app.get('port'),
            function() { 
                console.log('Aplicacion iniciada: '+app.get('port'));
            }
        );
    }
    var externalAPI = {
        server : server,
        run : run,
    };
    return externalAPI;
};
