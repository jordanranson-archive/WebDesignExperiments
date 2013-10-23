var $cards,
	$cardSources,
	$cardTools,
	$cardContent,
	$cardMeta,
	$body;

$(document).ready(function() {

	$body			= $('body');
	$cards 			= $('.card');
	$cardSources 	= $('.card-sources');
	$cardTools 		= $('.card-tools');
	$cardContent 	= $('.card-main-content');
	$cardMeta 		= $('.card-meta-content');

	$cardSources.click	( toggleSideCard );
	$cardTools.click	( toggleSideCard );
	$cardContent.click	( toggleMetaCard );

});

var cardTimer, sideCardOpen = false;
function toggleSideCard( evt ) {
	$self = $(this);

	$cards.not($self).not('.card-main-content').removeClass('slide-out')

	if( !$self.hasClass('slide-out') ) {
		clearTimeout( cardTimer );

		$self
		.addClass('animate-slide-out')
		.addClass('slide-out');
		
		sideCardOpen = true;
	} else {
		clearTimeout( cardTimer );

		$self
		.removeClass('slide-out');

		cardTimer = setTimeout( function() {
			$self.removeClass('animate-slide-out');
			sideCardOpen = false;
		}, 400 );
	}
}

var contentTimer, contentTimer2;
function toggleContentCard( evt ) {
	$self = $(this);
	console.log( sideCardOpen );

	$cards.not($self).not($cardMeta).removeClass('slide-out');
	contentTimer2 = setTimeout( function() {
		sideCardOpen = false;
	}, 400 );

	if( !sideCardOpen ) {
		if( !$self.hasClass('slide-out') ) {
			console.log( 'out' );
			$self
			.addClass('slide-out')
			/*.addClass('animate-slide-out');
			$cardMeta
			.addClass('slide-out')
			.addClass('animate-slide-out');

			clearTimeout( contentTimer );*/
		} else {
			console.log('in');
			$self
			.removeClass('slide-out');
			/*$cardMeta
			.removeClass('slide-out');

			contentTimer = setTimeout( function() {
				$self.removeClass('animate-slide-out');
				$cardMeta.removeClass('animate-slide-out');
			}, 400 );*/
		}
	}
}

var metaTimer;
function toggleMetaCard( evt ) {
	$self = $(this);

	if( $body.hasClass('hide-meta') ) {
		console.log( 'out' )
		$cardMeta
		.removeClass('animate-slide-out')
		.css('right','320px')
		.css('-webkit-transform','scale( 1, 1 )')
		.css('opacity', '1')

		setTimeout( function() {
			$cardMeta
			.addClass('animate-slide-out')
			.css('right', '0');
		}, 1 );

		$body
		.removeClass('hide-meta');

		clearTimeout( metaTimer );
	} else {
		console.log( 'in' )
		$cardMeta
		.removeClass('animate-slide-out')
		.css('right','0')
		.css('-webkit-transform','scale( 1, 1 )')
		.css('opacity', '1')

		setTimeout( function() {
			$cardMeta
			.addClass('animate-slide-out')
			.css('-webkit-transform','scale( 0, 0 )')
			.css('opacity', '0')
		}, 1 );

		$body
		.addClass('hide-meta');

		metaTimer = setTimeout( function() {
			$cardMeta.removeClass('animate-slide-out');
		}, 400 );
	}
}