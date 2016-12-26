var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var urlEncodedParser = bodyParser.urlencoded( { extended: false } );
var port = process.env.PORT || 3003;
var pg = require ('pg');
var connectionString = 'postgres://localhost:5432/inventory';

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
  // add the item from req.body to the table - DONE!!!
  var objectToSend={
    response: 'from addItems route'
  }; //end objectToSend
  //send info back to client
  pg.connect(connectionString, function(err, client, done){
    if (err){
        console.log(err);
    }
    else {
      client.query ('INSERT INTO items(color, name, size) values ($1, $2, $3)', [ req.body.color, req.body.name, req.body.size] );
      res.send( objectToSend );
    }
  }); // in pg connect connectionString
}); // end addItem route

// get all objects in the inventory
app.get( '/getInventory', function( req, res ){
  console.log( 'getInventory route hit' );
  // get all items in the table and return them to client
  pg.connect( connectionString, function( err, client, done ){
     if( err ){
       console.log( err );
     } // end error
     else{
       console.log( 'connected to db' );
       var query = client.query( 'SELECT * from items') ;
       // array for koala
       var allItems = [];
       query.on( 'row', function( row ){
         // push this koala into the new array
         allItems.push( row );
       });
       query.on( 'end', function(){
         // finish the operation
         done();
         // send back data
         console.log( allItems );
         // will this work?
         res.send( allItems );
       });
     } // end no error
   }); // end connect
  //send info back to client
}); // end addItem route

// static folder
app.use( express.static( 'public' ) );
