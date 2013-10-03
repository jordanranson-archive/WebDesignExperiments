var arrLen,
	points,
	width,
	height,
	canvas,
	context;

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
	width = window.innerWidth/64<<0+1;
	height = window.innerHeight/64<<0+1;
	arrLen = (width*height)*4;
	points = new Float32Array( arrLen );
	canvas = document.getElementById( 'background' );
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context = canvas.getContext( '2d' );

	// create triangle points
	var row, col, index;
	for( var i = arrLen-1; i >= 3; i-=4 ) {
		index = ((i+1)/4)-1;
		col = index%width;
		row = index/width << 0;

		points[i-3] = col*64;
		points[i-2] = row*64;
		points[i-1] = Math.random()*4 << 0;
		points[i] = 0;
	}

	console.log( points );

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

	context.fillStyle = '#fff';

	var x, y, a, b;
	for( var i = arrLen-1; i >= 3; i-=4 ) {
		x = points[i-3];
		y = points[i-2];
		a = points[i-1];
		b = points[i];

		context.fillRect( x-1, y-1, 2, 2 );
	}

	context.restore();
}