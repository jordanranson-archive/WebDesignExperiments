var arrLen,
	points,
	width,
	height,
	canvas,
	context,
	pattern,
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
	console.clear();

	var $content = $( '.content' );

	width = Math.max( 24, window.innerWidth/64<<0+2 );
	height = Math.max( 18, window.innerHeight/64<<0+1 );
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

		points[i-3] = col*31.5;
		points[i-2] = row*54.5;
		points[i-1] = Math.random()*4 << 0;
		points[i] = 0;
	}

	// create bg pattern
	var bb = document.createElement( 'canvas' );
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
	pattern = context.createPattern( bb, 'repeat' );

	this.addEventListener( 'mousemove', function( evt ) {
		mousex = evt.clientX;
		mousey = evt.clientY;
	});

	this.addEventListener( 'resize', function( evt ) { 
		canvas.width = this.innerWidth;
		canvas.height = this.innerHeight;
	});

	$content.on( 'click', 'section', function( evt ) {
		clone( this );
	});

	// start animating that shit
	(function animloop() {
		requestAnimFrame( animloop );
		render();
	})();
};

// draw loop
function render() {
	context.clearRect( 0, 0, canvas.width, canvas.height );
	context.save();

	var offsetx = (canvas.width-width*31.5) / 2;
	var offsety = (canvas.height-height*54.5) / 2;
	context.translate( offsetx, offsety );

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
		//b = points[i];

		dist = distanceTo( x+offsetx, y+offsety, canvas.width/2, canvas.height/2 );
		dist = Math.min( Math.max( dist, 0 ), canvas.width*0.46 );
		dist /= canvas.width*0.46;

		context.fillStyle = color[a];
		context.globalAlpha = 1-dist;
		drawTriangle( x, y, dir );
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

	$elem
	.addClass( 'cloned' );

	$clone
	.addClass( 'clone' )
	.css( 'top', offset.top+'px' )
	.css( 'left', offset.left+'px' )
	.css( 'width', $elem.width()+'px' )
	.css( 'height', $elem.height()+'px' )
	.appendTo( 'body' );
}