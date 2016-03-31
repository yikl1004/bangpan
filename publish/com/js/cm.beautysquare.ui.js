
$(function(){

	var BS = {};

	var doc = document,
		qs = 'querySelector',
		qsa = 'querySelectorAll',
		_ua = navigator.userAgent.indexOf('Android 2.3'),
		ginger = function () {
			return (_ua !== -1) ? true : false;
		},
		devDir = '/bangpan';
		// devDir = '';
	/*
	축약
	doc[qs]  ===   document.querySelector
	doc[qsa]  ===   document.querySelectorAll
	*/

	$(window).on('load', function(){

		//document 높이 부여
		var $tabsSlide = $('.tabs > .swiper-wrapper').find('>.swiper-slide');
		for ( var i=1; i<$tabsSlide.length; i++ ) {//data-swiper-slide-index
			if( $tabsSlide.eq(i).attr('data-swiper-slide-index') !== 0 ) {
				$('.tabs > .swiper-wrapper').find('>.swiper-slide').eq(i).height(
					document.documentElement.clientHeight - $('#gnb').height()
				);
			}
		}
		// $('body, html').height( $('#wrap').outerHeight() );

		//컨텐츠 로드 완료
		$('#wrap').addClass('loaded');

		//transition 완료 후 로딩 제거
		$('.loading').addClass('end').on('transitionend', function(){
			$(this).remove();
		});

		// 네이티브 스크롤 가능 여부
		var pageScroll = function( bool ) {
			// if ( bool ) {
			// 	if ( window.BS )
			// 		BS.slideAnimation(true);
			// } else {
			// 	if (window.BS)
			// 		BS.slideAnimation(false);
			// }
		};

		// 네비게이션(gnb) iScroll 적용
		var gnbWidth = 0;

		for ( var i=0; i<=$('#gnb li').length; i++ ) {
			gnbWidth += $('#gnb li').eq(i).outerWidth(true);
		}

		$('#gnb').width( gnbWidth + 1 );

		$('#gnb li').eq(0).find('a').addClass('active');

		$('#gnb .move_bar').css({
			width: $('#gnb li').eq(0).outerWidth()
		});

		if ( $('#gnbWrap').length > 0 ) {
			var gnbScroll = new IScroll('#gnbWrap', {
				tap: true,
				scrollX: true,
				scrollY: false,
				mouseWheel: true,
				click: true,
				maxScrollX: doc.documentElement.clientWidth - gnbWidth
			});
		}

		var setSlideHeight = function( swipeIndex ) {
			var $activeSlide = $('.tabs > .swiper-wrapper').find('>.swiper-slide.swiper-slide-active');
			$('.swiper-container.tabs').css({
				// height: ,
			});
		};

		var moveBarAni = function( num ) {
			var target = $('#gnb li:nth-child(' + num + ')'),
				targetMarginLeft = parseFloat(target.css('margin-left'));
			target.siblings().find('a').removeClass('active');
			target.find('a').addClass('active');
			$('#gnb .move_bar').css({
				width: target.outerWidth(),
				transform: 'translateX(' + (target.position().left + targetMarginLeft) + 'px)'
			});
		};

		var tabsSwiperCtrl = {
				lock: function() {
					if ( tabsSwiper ) {
						tabsMoveCtrl = false;
						tabsSwiper.lockSwipes();
					}
				},
				unlock: function () {
					if ( tabsSwiper ) {
						tabsMoveCtrl = true;
						tabsSwiper.unlockSwipes();
					}
				}
			};

		// 네이티브 컨트롤 ( 메뉴이동 )
		window.tabsSwiperFunc = function ( index ) {
			$('#gnb a:eq(' + index + ')').trigger('click');
		};

		var tabsDiff = null,						// 페이지를 swipe한 거리
			menuLength = $('#gnb ul li').length,	// 매뉴 갰수
			speedAll = 300,							// 스와이프 관련 스피드 (전체)
			tabsMoveCtrl = true,
			tabsSlideStr = '.swiper-container.tabs > .swiper-wrapper > '
			swiperLoadPages = [
				'hotissue_list.html',
				'product_info_list.html',
				'sales_tip_list.html',
				'praise_list.html',
				'life_list.html'
			];

		//swiper 플러그인 옵션 ( 메인비주얼, 라이프스퀘어, 최신제품정보, 카운셀러 세일즈노트 )
		var swiperOptions = {
			tabs: {
				slidesPerView: 1,
				loop: true,
				autoHeight: true,
				speed: speedAll,
				onSlideChangeEnd: function(swiper) {
				},
				onTransitionEnd: function( swiper ){
					var idx = swiper.activeIndex;

					if ( idx > menuLength ) idx = 1;
					if ( idx <= 0 ) idx = menuLength;
					
					gnbScroll.scrollToElement( doc[qs]( '#gnb li:nth-child(' + idx + ')'), speedAll, true, null );
					moveBarAni( idx );

					if ( (idx-1) !== 0 ) {
						console.log(idx);
						$.ajax({
							url: devDir + '/publish/html/0' + (idx-1) + '/' + swiperLoadPages[idx-2],
							success: function(data) {
								var _data = $(data),
									$wrapper = $('.swiper-container.tabs > .swiper-wrapper'),
									ht = 0,
									dataSlideIndexStr = '[data-swiper-slide-index=' + (idx-1) + ']';

								console.log(ht);
								if ( !$wrapper.find( dataSlideIndexStr + ' .container').hasClass('loaded') ) {
									$wrapper.find( dataSlideIndexStr + ' .container').append( _data ).addClass('loaded');
									ht = $wrapper.find( dataSlideIndexStr + ' .container').outerHeight(false);
									$wrapper.find( dataSlideIndexStr ).height(ht);
									$wrapper.height(ht);
								}
							},
							error: {

							}
						});
					}
				},
				onTouchMove : function( swiper ) {
					console.log('tabs move', swiper);
					if ( tabsDiff !== swiper.touches.diff && tabsMoveCtrl ) {
						var idx = swiper.activeIndex,
							diff = swiper.touches.diff;

						if ( diff > 0 ) idx -= 1;
						else if ( diff < 0 ) idx += 1;

						if ( idx > menuLength ) idx = 1;
						else if ( idx <= 0 ) idx = menuLength;

						moveBarAni( idx );
					}
				},
				onTouchStart: function(swiper){
					console.log('tabs start', swiper);
					tabsDiff = swiper.touches.diff;
				}
			},
			mainVisual: {
				speed: speedAll,
				pagination: '.swiper-pagination',
				loop: true,
				nested: true,
				direction: 'horizontal',
		        paginationClickable: false,
		        longSwipeRatio: 0.1,
		        onSlideChangeStart: function () {  },
		        onTransitionStart: function () { tabsSwiperCtrl.lock(); },
		        onTouchMove: function () { tabsSwiperCtrl.lock(); },
		        onTouchStart: function () { tabsSwiperCtrl.lock(); },
		        onTransitionEnd: function () { tabsSwiperCtrl.unlock(); },
		        onTouchEnd: function () { tabsSwiperCtrl.unlock(); }
			},
			scroller01: {
				slidesPerView: 'auto',
				// freeMode: true,
				spaceBetween: 10,
				nested: true,
				direction: 'horizontal',
		        paginationClickable: false,
				onTouchStart: function () { tabsSwiperCtrl.lock(); },
				onTouchMove: function () { tabsSwiperCtrl.lock(); },
				onTransitionEnd: function () { tabsSwiperCtrl.unlock(); },
		        onTouchEnd: function(){ tabsSwiperCtrl.unlock(); }
			},
			scroller02: {
				slidesPerView: 'auto',
				// freeMode: true,
				spaceBetween: 10,
				nested: true,
				direction: 'horizontal',
		        paginationClickable: false,
				onTouchStart: function () { tabsSwiperCtrl.lock(); },
				onTouchMove: function () { tabsSwiperCtrl.lock(); },
				onTransitionEnd: function () { tabsSwiperCtrl.unlock(); },
		        onTouchEnd: function(){ tabsSwiperCtrl.unlock(); }
			},
			scroller03: {
				slidesPerView: 'auto',
				// freeMode: true,
				spaceBetween: 10,
				nested: true,
				direction: 'horizontal',
		        paginationClickable: false,
				onTouchStart: function () { tabsSwiperCtrl.lock(); },
				onTouchMove: function () { tabsSwiperCtrl.lock(); },
				onTransitionEnd: function () { tabsSwiperCtrl.unlock(); },
		        onTouchEnd: function(){ tabsSwiperCtrl.unlock(); }
			}
		};

		// Swiper 실행 Element 변수
		var tabsSwiper = null
			mainVisual = null,
			scroller01 = null,
			scroller02 = null,
			scroller03 = null;

		// 스와이프 페이지
		if ( $('.tabs').length > 0 )
			tabsSwiper = new Swiper('.tabs', swiperOptions.tabs);
		console.log(tabsSwiper);

		//메인 비주얼
		if ( $('.main_visual').length >= 1 )
			mainVisual = new Swiper('.main_visual', swiperOptions.mainVisual);

		//스와이프 리스트( 최신제품정보 )
		if ( $('.scroller.type01').length >= 1 )
			scroller01 = new Swiper('.scroller.type01', swiperOptions.scroller01);

		//스와이프 리스트( 노하우공유 )
		if ( $('.scroller.type02').length >= 1 )
	    	scroller02 = new Swiper('.scroller.type02', swiperOptions.scroller02);

	    //스와이프 리스트( 라이프 )
	    if ( $('.scroller.type03').length >= 1 )
	    	scroller03 = new Swiper('.scroller.type03', swiperOptions.scroller03);

		//메인 비주얼 윈도우 리사이즈시 이미지 사이즈에 맞는 높이 재조정
		$(window).on('resize', function(){
			$('.main_visual').height( $('.main_visual img').height() );
		}).trigger('resize');

		// 네비게이션 메뉴 클릭 시
		$('#gnb a').on('click', function(e){
			e.preventDefault();
			var $this = $(this),
				target = $this.parent('li')
				left = target.offset().left,
				width = target.outerWidth(),
				idx = $this.parent().index();

			gnbScroll.scrollToElement( doc[qs]( '#gnb li:nth-child(' + (idx + 1) + ')'), 200, true, null );

			tabsSwiper.slideTo( $(this).parent().index()+1 );

			// target = $('#gnb li:nth-child(' + idx + ')');
			targetMarginLeft = parseFloat(target.css('margin-left'));

			$('#gnb .move_bar').css({
				width: target.outerWidth(),
				transform: 'translateX(' + (target.position().left + targetMarginLeft) + 'px)'
			});
		});


		// 스크롤 차단 여부
		var scrollEnable = function( bool ){
			if ( bool ) {
				$(window).off('.disableScroll');
			} else {
				$(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll scroll.disableScroll", function(e) {
					e.preventDefault();
					return ;
				});
			}
		};

	}); // window load

}); // jquery functiuon