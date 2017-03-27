import http     from 'http';
import express  from 'express';
import parser   from 'body-parser';
import socket   from 'socket.io';

import Articles from './routes/articles';

let app    = express();
app.server = http.createServer(app);
let io     = new socket(app.server);

//PARSER
app.use(parser.urlencoded({ extended: false }));

//STATIC
app.use('/static', express.static(__dirname + '/public'));

//ROUTES
app.use('/articles', Articles);

//HANDLER NOT FOUND - ERROR
app.use((req, res, next)      => { res.status(404).send() });
app.use((err, req, res, next) => { res.status(500).send() });

//START
app.server.listen(3000);
console.log(`up.`);

global.io = io;
export default app;
