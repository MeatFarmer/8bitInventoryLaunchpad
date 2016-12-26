// properties by which searches can be done
var sizes = [ 'small', 'medium', 'large' ];
var colors = [ 'red', 'orange', 'yellow', 'green', 'mermaid treasure', 'blue', 'purple' ];

////// global array of items in inventory //////
var items = [];

$( document ).ready( function(){
  var addObject = function( colorIn, nameIn, sizeIn ){
    console.log( 'in addObject' );
    // assemble object from new fields
    var newItem = {
      color: colorIn,
      name: nameIn,
      size: sizeIn
    }; // end testObject
    console.log( 'adding:', newItem );
      ////// TODO: add ajax call to addItem route to add this item to the table - DONE
    $.ajax({
    url: '/addItem',
    type: 'POST',
    data: newItem,
    success: function( data ){
      console.log( 'got some items: ', data );
    } // end success
  }); //end ajax
    // add to items array
    items.push( newItem );
  }; // end addObject
  var findObject = function( colorCheck, sizeCheck ){
    console.log( 'in findObject. Looking for:', colorCheck, sizeCheck );
    // array of matches
    var matches = [];
    for ( var i = 0; i < items.length; i++ ) {
      if( items[i].color == colorCheck && items[i].size == sizeCheck ){
        // match, add to array
        matches.push( items[i] );
      } // end if
    } // end for
    console.log( 'matches:', matches );
    ////// TODO: display matches - in progress
  }; // end findObject

  var getObjects = function(){
    console.log( 'in getObjects');
    // populate the items array
    ////// TODO: replace the stuff in this function with getting items from the database - in progress
    ////// hint: make a get call to the getInventory and use it's response data to fill the items array
      $.ajax({
        url: '/getInventory',
        type: 'GET',
        success: function (data){
          console.log('got some items', data);
          displayItems(data);
      }
    });
  }; // end getObjects
  function displayItems(array) {
    var htmlString = '<table><thead><td>color</td><td>name</td><td>size</td></thead>';
    for (var i = 0; i < array.length; i++) {
      htmlString += '<tr><td>' + array[i].color + '</td><td>' + array[i].name + '</td><td>' + array[i].size + '</td></tr>';
    }
    htmlString += '</table>';
    $('.outputDiv').html(htmlString);
  }
  // get objects when doc is ready
  getObjects();
  // the below are tests to show what is returned when running findObject
  addObject( 'blue', 'blueberry', 'small' );
  findObject( 'blue', 'small' );
  findObject( 'blue', 'large' );
}); // end doc ready
