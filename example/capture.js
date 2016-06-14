var imagesnap = require('../index.js');
var fs = require('fs');
imagesnap.list( function( cameras ) {
	console.log( cameras );
} )

imagesnap.captureToBuffer( 'FaceTime HD Camera', function( data ) {
	fs.writeFile( 'capture.jpg', data, function() {
		console.log( 'captured' );
	} );
} );
