var $container = $('.container');
var $bubbles = $('.bubble');
var $bubbleHeader = $('.bubble-header');
var $dragElem;

var drag = false;
var dragStart = { x: 0, y: 0 };

window.onload = function() {

$container = $('.container');
$bubbles = $('.bubble');
$bubbleHeader = $('.bubble-header');

// bind listeners
$(document).bind( 'mousemove', documentMouseMove );
$(document).bind( 'mouseup', documentMouseUp );
$bubbles.bind( 'mousedown', bubbleMouseDown );

};


function documentMouseMove( e ) {
	var dx, dy;
	if( drag ) {
		dx = e.clientX - dragStart.x;
		dy = e.clientY - dragStart.y;

		$dragElem.removeClass( 'bbl-flex' );
		$dragElem.addClass( 'bbl-flex-x' );
		$dragElem.css( 'left', dx+'px' );

		if( !$dragElem.hasClass('collapse') ) {
			if( dx < -100 ) {
				$dragElem.removeClass('favor-text');
				$dragElem.addClass('favor-media');
			}

			if( dx > 100 ) {
				$dragElem.removeClass('favor-media');
				$dragElem.addClass('favor-text');
			}
		}
	}

	$bubbles.each( function( index ) {
		var $this = $(this).find('.bbl-content');

		var top = $this.parent().offset().top;
		if( top > 20 && top < 100 ) {
			$this.removeClass('collapse');
		}
		else  {
			$this.addClass('collapse');
		}
	});
};

function bubbleMouseDown( e ) {
	$dragElem = $(e.delegateTarget).find('.bbl-content');

	axis = -1;
	drag = true;
	dragStart.x = e.clientX - parseFloat( $dragElem.css('left') );
	dragStart.y = e.clientY;
};

function documentMouseUp( e ) {
	axis = -1;
	drag = false;

	if( $dragElem ) {
		$dragElem.removeClass( 'bbl-flex-x' );
		$dragElem.addClass( 'bbl-flex' );
		$dragElem.css( 'left', 0+'px' );
	}
};