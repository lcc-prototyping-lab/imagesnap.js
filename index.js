var spawn = require( 'child_process' ).spawn;
var imagesnap_path = __dirname + '/bin/imagesnap';
var buffer = new Buffer( 0 );

module.exports = {
	list: function( callback ) {
		var imagesnap = spawn( imagesnap_path, [ '-l' ] );
		imagesnap.stdout.on( 'data', function( data ) {
			var cameras = data.toString().trim().split( '\n' );
			cameras.shift();
			callback( cameras );
		} );
	},
	captureToFile: function( device, callback ) {
		var opts = [];

		if ( typeof( device ) == "function" )
			callback = device;

		if ( device != undefined ) {
			opts.push( '-d' );
			opts.push( '' + device + '' );
		}

		var imagesnap = spawn( imagesnap_path, opts );
		imagesnap.stdout.on( 'data', function( data ) {
			callback( data.toString().trim().split( '...' ).pop() );
		} );
	},
	captureToBuffer: function( device, callback ) {
		var opts = [];
		opts.push( '-' );

		if ( typeof( device ) == "function" )
			callback = device;

		if ( device != undefined ) {
			opts.push( '-d' );
			opts.push( '' + device + '' );
		}
		var imagesnap = spawn( imagesnap_path, opts );
		imagesnap.stdout.on( 'data', function( data ) {
			buffer = Buffer.concat( [ buffer, data ] );
		} );
		imagesnap.stdout.on( 'end', function( data ) {
			callback( buffer );
			buffer = new Buffer( 0 )
		} );
	}
};
