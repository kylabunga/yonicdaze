var main = function() {
	$("footer li").hover(function() {
  		$( this ).fadeTo( "slow", 0.65 );
	},

function () {
   $( this ).fadeTo( "slow", 1 );
	
});
};

$(document).ready(main);
