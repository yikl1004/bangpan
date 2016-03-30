	$.fn.swiper = function( options ) {

		var defaults = {
				autoDelay: 3000,
				activeKlass: 'active',
				duration: 300
			},
			opts = $.extend({}, defaults, options);

		var swipeCont = this, //$('.swiper-container'),
			swipe = swipeCont.find('.swiper-wrapper'),
			slide = swipe.find('.swiper-slide'),
			pager = swipeCont.find('.swiper-pagination'),
			lth = slide.length,
			slideWidth = slide.width(),
			autoDelay = opts.autoDelay ? opts.autoDelay : 3000,
			idx = 0,
			timer = null,
			activeKlass = opts.activeKlass ? opts.activeKlass : 'active';

		//all - init
		$(window).on('resize', function(){
			swipeCont.height( slide.height() );
		}).trigger('resize');
		slide.css({ left: slideWidth }).eq(idx).css({ left: 0 }).addClass( activeKlass );
		slide.eq(idx).addClass( activeKlass );
		slide.eq(lth-1).css({ left: -1*slide.width() });

		//pagination - init
		var pagerHTML = '',
			klass = '';
		for (var i=0; i<lth; i++) {
			klass = (i==idx) ? activeKlass : '';
			pagerHTML += "<a href='javascript:;' class='" + klass + "'><span>" + i + "</span></a>";
		}
		pager.append( pagerHTML );

		// functions

		function pagerMove ( num ) {
			if ( typeof num !== 'number' ) return alert('숫자가 아닙니다.');
			pager.find('a').removeClass( activeKlass ).eq( num ).addClass( activeKlass );
		}

		function move ( dir ) {
			if ( dir === 'next' ) {
				$('.swiper-slide.' + activeKlass).stop().animate({ left: -1*slideWidth}, opts.duration, 'easeInOutCubic', function(){
					$(this).removeClass( activeKlass ).next().addClass( activeKlass );
					//console.log($(this).index());
					pagerMove( ($(this).index() + 1) % lth );
					if ( $(this).index() == (lth -2) )
						slide.eq(0).css({ left: slideWidth });
					if ( $(this).next().length == 0 )
						slide.eq(0).addClass( activeKlass );
				});
				var _next = $('.swiper-slide.' + activeKlass).next().length == 0 ? slide.eq(0) : $('.swiper-slide.' + activeKlass).next();
				_next.stop().animate({ left: 0}, opts.duration, 'easeInOutCubic', function(){
					$(this).prev().css({ left: -1*slideWidth });
					$(this).next().css({ left: slideWidth });
				});
			}
		}

		function auto () {
			timer = setInterval(function(){
				move('next');
			}, autoDelay);
		}

		auto();
	};

	// $('.swiper-container').swiper({
	// 	autoDelay: 4500,
	// 	activeKlass: 'active',
	// 	duration: 400
	// });