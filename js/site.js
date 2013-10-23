var $cards,
	$cardSources,
	$cardTools,
	$cardContent,
	$cardMeta;

$(document).ready(function() {

	$cards 			= $('.card');
	$cardSources 	= $('.card-sources');
	$cardTools 		= $('.card-tools');
	$cardContent 	= $('.card-main-content');
	$cardMeta 		= $('.card-meta-content');

	$cardSources.click	( toggleSideCard );
	$cardTools.click	( toggleSideCard );
	$cardContent.click	( toggleContentCard );

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
			}, 600 );*/
		}
	}
}