var arrLen,
	points,
	width,
	height,
	canvas,
	context,
	pattern,
	now = 0,
	lockScroll = false,
	lockBackground = false,
	triangle = {},
	mousex = 0,
	mousey = 0,
	color = [ '#0c0c0c', '#0f0f0f', '#121212', '#151515' ];

// polyfill
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function( callback ) {
	    		window.setTimeout( callback, 1000 / 60 );
			};
})();

window.onload = function() {

	var $content = $( '.content' );

	width = Math.max( 24, (window.innerWidth/32<<0) );
	height = Math.max( 18, (window.innerHeight/55.5<<0) );
	arrLen = (width*height)*4;
	points = new Float32Array( arrLen );
	canvas = document.getElementById( 'background' );
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context = canvas.getContext( '2d' );

	triangle.side = 64;
	triangle.h = triangle.side * (Math.sqrt(3)/2);

	// create triangle points
	var row, col, index;
	for( var i = arrLen-1; i >= 3; i-=4 ) {
		index = ((i+1)/4)-1;
		col = index%width;
		row = index/width << 0;

		points[i-3] = col*32;
		points[i-2] = row*55.5;
		points[i-1] = Math.random()*4 << 0;
		points[i] = 0;
	}

	// create bg pattern
	/*var bb = document.createElement( 'canvas' );
		bb.width = 5;
		bb.height = 5;
	var ctx = bb.getContext( '2d' );
		ctx.fillStyle = color[3];
		ctx.fillRect(0,0,5,5);
		ctx.fillStyle = '#000';
		ctx.fillRect(0,0,1,1);
		ctx.fillRect(1,1,1,1);
		ctx.fillRect(2,2,1,1);
		ctx.fillRect(3,3,1,1);
		ctx.fillRect(4,4,1,1);
	pattern = context.createPattern( bb, 'repeat' );*/

	this.addEventListener( 'mousemove', function( evt ) {
		mousex = evt.clientX;
		mousey = evt.clientY;
	});

	this.addEventListener( 'resize', function( evt ) { 
		canvas.width = this.innerWidth;
		canvas.height = this.innerHeight;
		//render();
	});

	$content.on( 'click', 'section:not(.tweet,.gallery)', function( evt ) {
		clone( this );
	});

	$( '.top-btn' ).on( 'click', function( evt ) {
		if( $( 'body' ).hasClass( 'fullscreen' ) ) {
			var $section = $( 'body' ).find( '.clone' );
			$section
			.css( 'top', $section.data('top') )
			.css( 'left', $section.data('left') )
			.css( 'width', $section.data('width') )
			.css( 'height', $section.data('height') );

			$( 'body' ).removeClass( 'fullscreen' );
			$( '.content' ).removeClass( 'fade' );

			lockScroll = false;
			lockBackground = true;
			var t = setInterval( function() {
				if( $section.width()+'px' === $section.data('width') ) {
					$( '.cloned' ).removeClass( 'cloned' );
					$section.remove();
					lockBackground = false;
					clearInterval( t );
				}
			}, 33 );
		}
	});

	// start animating that shit
	now = new Date().getTime() / 30000;
	(function animloop() {
		requestAnimFrame( animloop );
		render();
	})();

	//render();
};

// draw loop
function render() {
	context.clearRect( 0, 0, canvas.width, canvas.height );
	context.save();

	var offsetx = (canvas.width-width*32) / 2;
	var offsety = (canvas.height-height*55.5) / 2;

	var mx = mousex - canvas.width/2;
	var my = mousey - canvas.height/2;


	context.translate( offsetx, offsety );
	/*$( '.content' )
	.css( 'transform', 'translateX('+((mx*-0.01)<<0)+'px) translateY('+((my*-0.01)<<0)+'px)' )
	.css( '-moz-transform', 'translateX('+((mx*-0.01)<<0)+'px) translateY('+((my*-0.01)<<0)+'px)' )
	.css( '-webkit-transform', 'translateX('+((mx*-0.01)<<0)+'px) translateY('+((my*-0.01)<<0)+'px)' )
	*/

	var x, y, a, b, dir, index, row, col, dist;
	for( var i = arrLen-1; i >= 3; i-=4 ) {
		index = ((i+1)/4)-1;
		row = index/width << 0;
		col = index%width;
		dir = row % 2 === 0 ? 
			  col % 2 === 0 ? 0 : 180 :
			  col % 2 === 0 ? 180 : 0;

		x = points[i-3];
		y = points[i-2];
		a = points[i-1];

		if( x > width*32 ) 		points[i] = 0;
		if( x < 0 ) 			points[i] = width*32;
		if( y > height*55.5 ) 	points[i-2] = 0;
		if( y < 0 ) 			points[i-2] = height*55.5;

		x = points[i-3] + points[i];
		y = points[i-2];

		dist = distanceTo( x+offsetx+mx*0.05, y+offsety+my*0.05, canvas.width/2, canvas.height/2 );
		dist = Math.min( Math.max( dist, 0 ), canvas.width*0.46 );
		dist /= canvas.width*0.46;

		context.fillStyle = i === 4 ? '#ff0' : color[a];
		context.globalAlpha = (1-dist);

		drawTriangle( x+mx*0.05, y+my*0.05, dir );
	}

	context.restore();
}

function drawTriangle( x, y, deg ) {
    context.save();

    context.translate( x, y );
	context.rotate( rad( deg ) );

    context.beginPath();
        
    context.moveTo( 0, -triangle.h/2 );
    context.lineTo( -triangle.side/2, triangle.h/2 );
    context.lineTo( triangle.side/2, triangle.h/2 );
    context.lineTo( 0, -triangle.h/2 );
        
    context.closePath();
    context.fill();

    context.restore();
}

function distanceTo( x1, y1, x2, y2 ) {
	return Math.sqrt( (x1 -= x2) * x1 + (y1 -= y2) * y1 );
}

function rad( deg ) {
	return deg * ( Math.PI / 180 );
}

function clone( elem ) {
	var $elem = $( elem );
	var $clone = $elem.clone();
	var offset = $elem.offset();
	var scrollTop = $( 'body' ).scrollTop();

	$elem
	.addClass( 'cloned' );

	$clone
	.addClass( 'clone' )
	.css( 'top', offset.top+'px' )
	.css( 'left', offset.left+'px' )
	.css( 'width', $elem.width()+'px' )
	.css( 'height', $elem.height()+'px' )
	.data( 'top', offset.top+'px' )
	.data( 'left', offset.left+'px' )
	.data( 'width', $elem.width()+'px' )
	.data( 'height', $elem.height()+'px' );

	if( $clone.hasClass( 'media' ) ) {
		var $content = $clone.find( '.media' );
			$content.addClass( 'left' );
		var $newContent = $content.clone();
			$newContent
			.addClass( 'right' )
			.appendTo( $clone );
	}

	$clone.appendTo( 'body' );
	$( '.content' ).addClass( 'fade50' );
	setTimeout( function() { $clone.addClass( 'active' ) }, 0 );

	// TODO: ajax callback
	setTimeout( function() {
		var h = window.innerHeight-102-35;

		$( '.content' ).addClass( 'fade' );
		$( '.content' ).removeClass( 'fade50' );

		$clone
		.css( 'top', 102+scrollTop+'px' )
		.css( 'bottom', 35+'px' )
		.css( 'left', 0+'px' )
		.css( 'right', 0+'px' )
		.css( 'width', '100%' )
		.css( 'height', h+'px' )
		.addClass( 'fullscreen' ) 
		.removeClass( 'active' );

		$( 'body' ).addClass( 'fullscreen' );

		lockBackground = true;
		lockScroll = true;
		var t = setInterval( function() { 
			if( $clone.width() === canvas.width && $clone.height() === h ) {
				lockBackground = false;
				clearInterval( t );
			}
		}, 33 );
	}, 2500 );
}