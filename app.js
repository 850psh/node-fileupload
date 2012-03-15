/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.limit('5mb'));
  app.use(express.bodyParser({uploadDir: __dirname + '/tmp'}));  
  app.use(express.methodOverride());
  app.use(express.logger({ buffer: 5000}));
  app.use(express.favicon());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/test', routes.test);
app.post('/upload', routes.upload);
app.get('/public/images/*', routes.show);

app.listen(process.env.C9_PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);