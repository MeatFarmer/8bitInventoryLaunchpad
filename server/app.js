var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var urlEncodedParser = bodyParser.urlencoded( { extended: false } );
var port = process.env.PORT || 3003;
var pg = require ('pg');
var connectionString = 'postgres://localhost:5432/*';

// spin up server
app.listen( port, function(){
  console.log( 'server up on:', port );
}); // end spin up server

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end home base

// add new objects to the inventory
app.post( '/addItem', urlEncodedParser, function( req, res ){
  console.log( 'addItem route hit:', req.body );
  // add the item from req.body to the table - in progress
  res.send()
}); // end addItem route

// get all objects in the inventory
app.get( '/getInventory', function( req, res ){
  console.log( 'getInventory route hit' );
  // get all items in the table and return them to client
}); // end addItem route

// static folder
app.use( express.static( 'public' ) );
