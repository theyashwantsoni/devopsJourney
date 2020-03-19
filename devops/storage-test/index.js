'use strict';

const express = require( 'express' );
var multer = require('multer');
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const helmet = require( 'helmet' );
const path = require('path');
const https = require('https');
const fs = require('fs');


const app = express();
app.use('/images', express.static(path.join(__dirname, 'Images')));

app.use( bodyParser.urlencoded( {
    extended: true
} ) );
app.use( bodyParser.json() );
app.use( cors() );
app.use( helmet() );


const routes = require( './routes/routes' );

app.locals.rootfolder=__dirname;

app.use( '/', routes );

app.use( ( error, request, response, next ) => {
    response.status( error.status || 500 );
    response.json( {
        error: error.message
    } );
} );

app.use( ( request, response, next ) => {
    let error = new Error( 'Not Found' );
    error.status = 404;
    response.json( error );
} );

var server = app.listen( process.env.PORT || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log( 'App is listening on https://%s:%s', host, port );
});
// https.createServer({
//     key: fs.readFileSync('./key.pem'),
//     cert: fs.readFileSync('./cert.pem'),
//     passphrase: 'qwerqwer'
// }, app)
// .listen(3000);
