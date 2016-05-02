var pageIdxStr = '.swiper-container.tabs > .swiper-wrapper .swiper-slide-active',
	pageContent = '>.container';



// 앱 알림창 기본
$.alert = function ( msg, callback, evt, point, event ) {
	if ( $('body > .alert').length > 0 ) return false;

	//dimm
	$('body').append('<div class="dimm"></div>');
	$('body').find('> .dimm').css({
		height: window.innerHeight
	});

	// 알림창
	var alertStr = '<div class="alert">';
		alertStr += 	'<div class="content">';
		if ( evt == 'event' ) {
			alertStr += '<h2 class="event_title">축하합니다!</h2>';
			alertStr += '<p class="txt">깜짝 이벤트에 당첨되었습니다.</p>';
			alertStr += '<p class="point_txt">';
			alertStr += '<span class="point">';
			alertStr += '<em>' + point + 'Point</em>가';
			alertStr += '<br>지급되었습니다.</span>';
			alertStr += '</p>';
		} else {
			alertStr +=			msg;
		}
		alertStr += 	'</div>';
		alertStr +=		'<div class="btns">';
		alertStr +=			'<a class="ok" href="#;"><span>확인</span></a>';
		alertStr +=		'</div>';
		alertStr += '</div>';

	$('body').append( alertStr );

	var contentHeight = 0;
	if ( evt == 'event' ) {
		contentHeight = 0;
	} else {
		contentHeight = parseInt($('body').find('> .alert .content').css('font-size')) * 1.5 * 3;
	}

	if ( $('body').find('> .alert .content').height() <= contentHeight && !$('body').find('> .alert').hasClass('event') ) {
		$('body').find('> .alert .content').addClass('single_line');
	} else if ( $('body').find('> .alert').hasClass('event') ) {
		$('body').find('> .alert').addClass('event');
	}

	if ( evt == 'event' ) {
		$('body').find('> .alert').addClass('event');
	}


	$('body').find('> .alert').css({
		marginTop: -1 * $('body').find('> .alert').height() / 2
	});


	$('body').find('> .alert a.ok').on('click', function( e ){
		var e = event || window.event;
		e.preventDefault();
		$('body').find('.dimm').remove();
		$('body').find('.alert').remove();
		if ( callback && typeof callback === 'function' ) callback();
	});
};

$.confirm = function ( msg, callback ) {
	$.alert(msg, callback);
	//$('body').find('> .alert a.ok').off('click');
	$('body').find('> .alert').addClass('confirm');
	$('body').find('> .alert .btns').prepend('<a class="cancel" href="javscrip:;"><span>취소</span></a>');
	$('body').find('> .alert a.cancel').on('click', function(){
		$('body').find('.dimm').remove();
		$('body').find('.alert').remove();
	});
};

var nullEvent = function(event) {
	var e = event || window.event;
	e.preventDefault && e.preventDefault();
	e.stopPropagation && e.stopPropagation();
	e.cancelBubble = true;
	e.returnValue = false;
	return false;
};


// jquery start
$(function( event ){

	// 이미지로드 jquery prototype
	$.fn.imagesLoaded = function () {
	    var $imgs = this.find('img[src!=""]');
	    if (!$imgs.length) {return $.Deferred().resolve().promise();}

	    var dfds = [];
		
		$imgs.each(function(){
			var dfd = $.Deferred();
				dfds.push(dfd);
			var img = new Image();
				img.onload = function(){dfd.resolve();}
				img.onerror = function(){dfd.resolve();}
				img.src = this.src;
		});
	    return $.when.apply($,dfds);
	};

	// 퍼블리싱 테스트 용
	var devJson = location.href.match('bangpan') ? '/bangpan' : '';

	var BS = {};

	var doc = document,
		qs = 'querySelector',
		qsa = 'querySelectorAll',
		_qs = function( selector ){
			return doc.querySelector( selector );
		},
		_qsa =function( selector ){
			return doc.querySelectorAll( selector );
		},
		devDir = devJson;

	/*
	축약
	doc[qs]  ===   document.querySelector
	doc[qsa]  ===   document.querySelectorAll
	*/

	//모바일 UA
	window.ua = ua = navigator.userAgent;
	window.isGingerbread = ua.match('Android 2.3') ? true : false;
	window.isAndroid = ua.match('Android') ? true : false;
	window.isIOS = ua.match('iPhone') ? true : false;
	window.isDevice = function() {
		if ( isAndroid ) {
			if ( isGingerbread ) return 'gingerbread';
			else return 'android';
		}
		if ( isIOS ) return 'ios';
		if ( !isAndroid && !isIOS ) return 'no-mobile';
	};

	if ( isDevice() ) $('body').addClass( isDevice() );

	/*
	이미지 비율 계산기 (소수점 이하는 반올림 됩니다.)
	pixelRatio(
		direction: 'x' or 'y',		//string
		num: 320 (알고있는 수)		//number
		originalSize: '16:8.5'		//string
	);
	*/
	window.pixelRatio = function ( originalSize, num, direction ) {

		var gcd = function (x, y) {
			while (y != 0) {
				var z = x % y;
				x = y;
				y = z;
			}
			return x;
		};

		var width = Number( originalSize.split(':')[0] ),
			height = Number( originalSize.split(':')[1] ),
			GCD = gcd( width, height ),
			ratioX = width / GCD,
			ratioY = height / GCD;

		if ( direction === 'y' ) return Math.round( ( ratioY * num ) / ratioX );
		else if ( direction === 'x' ) return Math.round( ( ratioX * num ) / ratioY );

	};

	window.photoListImgAlgin = function(){
		$('.photo_list .thumb img').each(function(){
			var pure = $(this).get(0),
				wrap = $(this).parent();
			$(this).css({ 'margin-top': -1 * ( (pure.clientHeight-wrap.height() ) / 2 ) });
		});
	};

	window.imgSetting = function( index ){
		if ( $('#gnbWrap').length <= 0 ) pageIdxStr = '';
		switch ( index ) {
			case 1:
				$(pageIdxStr + ' .video_area .thumb').css({
					height: pixelRatio( '900:420', $(pageIdxStr + ' .video_area .thumb').width(), 'y' )
				}),
				$(pageIdxStr + ' .scroller.type01 .thumb').css({
					height: pixelRatio( '540:540', $(pageIdxStr + ' .scroller.type01 .thumb').width(), 'y' )
				}),
				$(pageIdxStr + ' .scroller.type02 .thumb').css({
					height: pixelRatio( '540:390', $(pageIdxStr + ' .scroller.type02 .thumb').width(), 'y' )
				}),
				$(pageIdxStr + ' .scroller.type03 .thumb').css({
					height: pixelRatio( '540:390', $(pageIdxStr + ' .scroller.type03 .thumb').width(), 'y' )
				});
			case 2:
				$(pageIdxStr + ' .photo_list .thumb').css({
					height: pixelRatio( '900:420', $(pageIdxStr + ' .photo_list .thumb').width(), 'y' )
				}),
				photoListImgAlgin();
			break;
			case 3:
				$(pageIdxStr + ' .img_list .thumb').css({
					height: pixelRatio( '290:290', $(pageIdxStr + ' .img_list .thumb').width(), 'y' )
				});
			break;
			case 4: 
				$(pageIdxStr + ' .img_list.type02 .thumb').css({
					height: pixelRatio( '339:245', $(pageIdxStr + ' .img_list.type02 .thumb').width(), 'y' )
				});
			case 6: 
				$(pageIdxStr + ' .img_list.type02 .thumb').css({
					height: pixelRatio( '339:245', $(pageIdxStr + ' .img_list.type02 .thumb').width(), 'y' )
				});
			break;
		}
	};

	window.writeBtn = {
		active: function ( idx ) {
			this.changeKlass();
			if ( idx == 5 || idx == 4 ) {
				var activeSlide = '.swiper-container.tabs > .swiper-wrapper > [data-swiper-slide-index=' + (idx-1) + ']',
					tabIdx = $(activeSlide).find('.tab li.active').index();
				if ( idx == 5 && tabIdx == 0 ) {	//칭찬합시다
					$('body').addClass( 'praise' );
				} else if ( idx == 5 && tabIdx == 1 ) {		//궁금해요
					$('body').addClass( 'wonder' );
				} else if ( idx == 4 && tabIdx == 1 ) {		//노하우 공유
					$('body').addClass( 'knowhowshare' );
				}
			}
		},
		custom: function( menu ){
			this.changeKlass();
			$('body').addClass(menu);
		},
		changeKlass: function(){
			var klass = ['knowhowshare', 'praise', 'wonder'];
			$('body').removeClass( klass.join(" ") );
		}
	};

	window.setSlideHeight = function(  ) {
		if ( $('#gnbWrap').length <= 0 ) return ;
		var swiperWrapper = '.swiper-container.tabs > .swiper-wrapper',
			activeSlideStr = swiperWrapper + ' > .swiper-slide-active > .container';
		$( activeSlideStr ).imagesLoaded().then(function(){
			$( swiperWrapper ).height( $( activeSlideStr ).outerHeight() );
		});
	};

	window.tabActive = function(){
		$('.tab li a').off('click')
		.on('click', function(){
			$(this).parent().addClass('active').siblings().removeClass('active');
		});
	};

	window.floatingChange = function ( index ) {
		if ( index == 1 ) {
			$('.floating_util .mode_change').addClass('active');
			$('.floating_util .sort').removeClass('active');
			$('.fu_select').removeClass('current');
		} else {
			if ( index == 5 ) {
				$('.floating_util .sort [data-select-type=type]').css({ display: 'none' });
			} else {
				$('.floating_util .sort [data-select-type=type]').css({ display: 'inherit' });
			}
			$('.floating_util .mode_change').removeClass('active');
			$('.floating_util .sort').addClass('active');
			$('.fu_select').removeClass('current');
			var typeText = $('.fu_select[data-select-index=' + index + '][data-select-type=type]').attr('data-selected-item'),
				sortText = $('.fu_select[data-select-index=' + index + '][data-select-type=sort]').attr('data-selected-item');
			$('.floating_util .sort [data-select-type=type] span').text(typeText);
			$('.floating_util .sort [data-select-type=sort] span').text(sortText);
		}
	};

	//에러 이미지
	window.imgError = function() {
		$('img').each(function(){
			$(this).on('error', function(){
				$(this).get(0).src = '/front/img/com/error.png';
			});
		});
	};

	window.loadingVisible = function( bool ){
		//불린 이 아닐 경우 실행하지 않음
		if ( typeof bool !== 'boolean') return false;

		// var isMain = $('body').hasClass('sub') ? 'body' : 'body #wrap',
		// 	gnbHeight = $('#gnbWrap').length > 0 ? $('#gnbWrap').outerHeight(false) : 0;
		var isMain = 'body',
			gnbHeight = 0;

		if ( bool && $( isMain ).find('> .loading').length <= 0) {
			tabsSwiperCtrl.lock();
			$( isMain ).prepend( "<div class='loading' />" );
			$( isMain ).find('> .loading').css({
				height: doc.documentElement.clientHeight - gnbHeight
			});
		} else {
			$( isMain ).find('> .loading')
			.animate({ opacity: 0 }, 200, function(){
				$( isMain ).find('> .loading').remove();
				tabsSwiperCtrl.unlock();
			});
			// .addClass('end').delay(50)
			// .on('transitionend', function(){
			// 	$( isMain ).find('> .loading').remove();
			// 	tabsSwiperCtrl.unlock();
			// });
		}
	};

	// long tap contextmenu 방지
	(function(){
		var cancel=function(e){
			if (window.event) {
				window.event.cancelBubble = true;
				window.event.returnValue = false;
			}
			if (e && e.stopPropagation && e.preventDefault) {
				e.stopPropagation();
				e.preventDefault();
			}
			return false;
		};
		var block=function(e){
			e = e || window.event;
			var t=e.srcElement || e.target;
			var tag=t.tagName;
			if (e && tag==='HTML' || tag==='INPUT' || tag==='TEXTAREA' || tag==='BUTTON' || tag==='SELECT' || tag==='OPTION' || tag==='EMBED' || tag==='OBJECT') { return; }
			if (e.type==='keydown' || e.type=='keyup') {
				// keyboard event : only block ctrl-A, ctrl-a, ctrl-C, ctrl-c, meta-A, meta-a, meta-C, meta-c
				if ((e.ctrlKey || e.metaKey) && (e.keyCode == 65 || e.keyCode == 97 || e.keyCode == 67 || e.keyCode == 99)) { return cancel(e); }
			} else if(e.type == "contextmenu"){
				// console.log('무단복사를 막기 위해 마우스 드래그 금지가 설정되어 있습니다');
				return cancel(e);
			} else {
				return cancel(e);
			}
		}
		var addEvent = function(el, type, fn){
			if (window.addEventListener) {
 				el.addEventListener(type, fn, false);
			} else if (window.attachEvent) {
				el.attachEvent('on' + type, fn);
			} else {
				el['on' + type] = fn;
			}
		}
		var addBlockEvent = function(){
			addEvent(document.body,'keydown',block);
			addEvent(document.body,'keyup',block);
			addEvent(document.body,'mouseup',block);
			addEvent(document.body,'mousedown',block);
			addEvent(document.body,'dragstart',block);
			addEvent(document.body,'selectstart',block);
			addEvent(document.body,'copy',block);
			addEvent(document.body,'contextmenu', block);
		};
		addEvent(window,'load',addBlockEvent);
	})();




	//==================================//
	// 여기서 부터 시작 //
	//==================================//

	//window load : S
	// $(window).on('load', function(){

		// //메인 비주얼 이미지 높이 부여
		$('.swiper-container.main_visual .img').css({
			height: pixelRatio( '960:510', document.documentElement.clientWidth, 'y' )
		});

		imgError(); //에러 이미지 교체 

		// document 높이 부여 - 메인
		var $tabsSlide = $('.tabs > .swiper-wrapper').find('>.swiper-slide'),
			tabSlideHeight = doc.documentElement.clientHeight - $('#gnbWrap').height() - $('.floating_util').height();
		for ( var i=1; i<$tabsSlide.length; i++ ) {//data-swiper-slide-index
			if( $tabsSlide.eq(i).attr('data-swiper-slide-index') !== 0 ) {
				// $('.swiper-container.tabs > .swiper-wrapper').css({
				// 	// height: tabSlideHeight
				// });
				// $('.tabs > .swiper-wrapper').find('>.swiper-slide').eq(i).css({
				// 	// height: tabSlideHeight
				// });
				$('.tabs > .swiper-wrapper').find('>.swiper-slide > .container').css({
					minHeight: tabSlideHeight
				});
			}
		}
		// document 높이 부여 - 서브
		if (_qs('body.sub'))
			_qs('body.sub').style.minHeight = document.documentElement.clientHeight+'px';

		// 네이티브 스크롤 가능 여부
		// var pageScroll = function( bool ) {
		// 	if ( bool ) {
		// 		if ( window.BS )
		// 			BS.slideAnimation(true);
		// 	} else {
		// 		if (window.BS)
		// 			BS.slideAnimation(false);
		// 	}
		// };

		// 네비게이션(gnb) iScroll 적용
		if ( $('#gnbWrap').length > 0 ) {
			var gnbScroll = null,
				gnbWidth = 0;
			for ( var i=0; i<=$('#gnb li').length; i++ )
				gnbWidth += $('#gnb li').eq(i).outerWidth(true) + 10;
			$('#gnb, #gnb ul').width( gnbWidth );
			$('#gnb li').eq(0).find('a').addClass('active');
			$('#gnb .move_bar').css({
				width: $('#gnb li').eq(0).outerWidth()
			});
			gnbScroll = new IScroll('#gnbWrap', {
				tap: true, scrollX: true, scrollY: false, mouseWheel: true, click: true, maxScrollX: doc.documentElement.clientWidth - gnbWidth
			});
			console.log('gnbScroll : ', doc.documentElement.clientWidth - gnbWidth);
			console.log(doc.documentElement.clientWidth, gnbWidth);
		}

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

		//페이지 인덱스 저장
		window.tabSlideIdx = 1;

		var tabsDiff = null,						// 페이지를 swipe한 거리
			menuLength = $('#gnb ul li').length,	// 매뉴 갯수
			speedAll = 100,							// 스와이프 관련 스피드 (전체)
			gnbCtrl = true,
			tabsMoveCtrl = true,
			tabsSlideStr = '.swiper-container.tabs > .swiper-wrapper > ',
			//퍼블리싱
			swiperLoadPages = [
				'beautynews_list.html',
				'product_info_list.html',
				// 'sales_tip_list_bestknowhow.html',
				'sales_tip_list_knowhowshare.html',
				'praise_list.html',
				// 'wonder_list.html',
				'life_list.html'
			];
			//개발
			// swiperLoadPages = [
			// 	'/front/front/beautyNews/main.do',
			// 	'/front/front/productInfo/main.do',
			// 	'/front/front/salestip/bestknowhow/main.do',
			// 	'/front/front/counsellortalk/compliment/main.do',
			// 	'/front/front/life/main.do'
			// ];


		//swiper 플러그인 옵션 ( 메인비주얼, 라이프스퀘어, 최신제품정보, 카운셀러 세일즈노트 )
		var swiperOptions = {
			tabs: {
				slidesPerView: 1,
				loop: true,
				autoHeight: true,
				speed: speedAll,
				initialSlide: 0,
				threshold: 15,
				touchAngle: 23,
				hashnav: true,
				onSliderMove: function(swiper, event) {
					// console.log(event.type);
				},
				onSlideNextEnd: function(swiper) {
					// console.log('onSlideNextEnd');
					// console.log(swiper);
				},
				onTouchEnd: function (swiper, event) {
					var idx = swiper.activeIndex,
						loadingCheck = !$('.swiper-container.tabs > .swiper-wrapper').find('[data-swiper-slide-index=' + (idx-1) + ']' + ' .container').hasClass('loaded');
					// console.log('onTouchEnd');
				},
				onSlideChangeEnd: function(swiper) {
					// ajax 로드 전 높이
					setSlideHeight();
					gnbCtrl = true;
				},
				onTransitionStart: function(swiper) {
					gnbCtrl = false;
				},
				onTransitionEnd: function( swiper ){

					// console.log('onTransitionEnd');
					
					var idx = swiper.activeIndex,
						loadingCheck = !$('.swiper-container.tabs > .swiper-wrapper').find('[data-swiper-slide-index=' + (idx-1) + ']' + ' .container').hasClass('loaded'),
						homeLoadingCheck = !$('.swiper-container.tabs > .swiper-wrapper').find('[data-swiper-slide-index=' + (idx-1) + ']' + ' .container').hasClass('home');

					if ( idx > menuLength ) idx = 1;
					if ( idx <= 0 ) idx = menuLength;

					if ( tabSlideIdx !== idx ) {
						$('html, body').scrollTop(0);
					}

					window.tabSlideIdx = idx;

					gnbScroll.scrollToElement( _qs( '#gnb li:nth-child(' + idx + ')'), 100, true, null );
					moveBarAni( idx );

					imgSetting( idx );

					if ( (idx-1) !== 0 && loadingCheck ) {

					// 	// 퍼블리싱 테스트 용 : S
						var	_hashURLs = location.hash.split('/');
							 _url = function() {
								if ( _hashURLs[1] == 3 ) {
									if ( _hashURLs[2] == 2 ) {
										return '/front/html/0' + (idx-1) + '/sales_tip_list_knowhowshare.html';
									}
								} else if ( _hashURLs[1] == 4 ) {
									if ( _hashURLs[2] == 2 ) {
										return '/front/html/0' + (idx-1) + '/wonder_list.html';
									}
								}
								return '/front/html/0' + (idx-1) + '/' + swiperLoadPages[idx-2];
							};
					 	// 퍼블리싱 테스트 용 : E

						//tabs 스와이프 차단
						tabsSwiperCtrl.lock();

						//로딩 노출
						loadingVisible(true);

						$.ajax({
							// url: swiperLoadPages[idx-2],	//개발
							url: devDir + _url(),			//퍼블리싱 테스트 용
							success: function(data) {
								var _data = $(data),
									$wrapper = $('.swiper-container.tabs > .swiper-wrapper'),
									dataSlideIndexStr = '[data-swiper-slide-index=' + (idx-1) + ']';

								$wrapper.find( dataSlideIndexStr + ' .container').html( _data ).imagesLoaded().then(function(){
									$wrapper.find( dataSlideIndexStr + ' .container').addClass('loaded');

									//tabsSwiper 높이 맞추기
									setSlideHeight();
									//스와이프 차단 해체
									tabsSwiperCtrl.unlock();
									//이미지 높이값 부여
									imgSetting( idx );
								});

								var slideHightTimer = setTimeout(function(){
									//tabsSwiper 높이 맞추기
									setSlideHeight();
								}, 50);

								//스와이프 차단 해체
								tabsSwiperCtrl.unlock();
								//이미지 높이값 부여
								imgSetting( idx );

								//이미지 error시 엑박 방지
								imgError();

								//로딩 노출 삭제
								var loadingRemove = function(){
									loadingVisible(false);
									var timer = setInterval(function(){
										if ( $('.loading').length > 0 ) {
											loadingRemove();
										} else {
											clearInterval(timer);
										}
									}, 100);
								};
								loadingRemove();
								gnbCtrl = false;

							},
							async: true,
							error: function(xhr, status, error){
								alert( status );
								// console.log(xhr, status, error);
							}
						});

					}

					//tabsSwiper 높이 맞추기
					setSlideHeight();

					//글쓰기 버튼 활성화
					writeBtn.active( idx );
					
					//플로팅 컨텐츠 변경
					floatingChange( idx );

					//로딩 노출 삭제
					loadingVisible(false);

					gnbCtrl = false;
				},
				onTouchMove : function( swiper ) {
					if ( tabsDiff !== swiper.touches.diff && tabsMoveCtrl ) {
						var idx = swiper.activeIndex,
							diff = swiper.touches.diff;

						if ( diff > 0 ) idx -= 1;
						else if ( diff < 0 ) idx += 1;

						if ( idx > menuLength ) idx = 1;
						else if ( idx <= 0 ) idx = menuLength;

						// moveBarAni( idx );
					}
				},
				onTouchStart: function(swiper){
					// console.log('tabs start', swiper);
					tabsDiff = swiper.touches.diff;
				}
			},
			mainVisual: {
				speed: 300,
				pagination: '.swiper-pagination',
				autoHeight: true,
				height: pixelRatio( '960:510', document.documentElement.clientWidth, 'y' ),
				autoplay: 4000,
				loop: true,
				nested: true,
				direction: 'horizontal',
		        paginationClickable: false,
		        longSwipeRatio: 0.1,
		        onSlideChangeStart: function () {  },
		        onTransitionStart: function () { tabsSwiperCtrl.lock(); },
		        onTouchMove: function () { tabsSwiperCtrl.lock(); },
		        onTouchStart: function () {  },
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
				onTouchStart: function () {  },
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
				onTouchStart: function () {  },
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
				onTouchStart: function () {  },
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
		$(window).on('load', function(){
			if ( $('.tabs').length > 0 )
				tabsSwiper = new Swiper('.tabs', swiperOptions.tabs);
		});

		//메인 비주얼
		// $(window).on('load', function(){
			if ( $('.main_visual').length >= 1 ) {
				// $('.main_visual').imagesLoaded().then(function(){
					mainVisual = new Swiper('.main_visual', swiperOptions.mainVisual);
				// });
			}
		// });

		//스와이프 리스트( 최신제품정보 )
		if ( $('.scroller.type01').length >= 1 ) {
			scroller01 = new Swiper('.scroller.type01', swiperOptions.scroller01);
			if ( tabsSwiperCtrl && $('.tabs').length > 0 ) {
				$('.scroller.type01').on('touchcancel', tabsSwiperCtrl.unlock);
			}
		}

		//스와이프 리스트( 노하우공유 )
		if ( $('.scroller.type02').length >= 1 ){
	    	scroller02 = new Swiper('.scroller.type02', swiperOptions.scroller02);
	    	if ( tabsSwiperCtrl && $('.tabs').length > 0 ) {
	    		$('.scroller.type02').on('touchcancel', tabsSwiperCtrl.unlock);
	    	}
		}

	    //스와이프 리스트( 라이프 )
	    if ( $('.scroller.type03').length >= 1 ){
	    	scroller03 = new Swiper('.scroller.type03', swiperOptions.scroller03);
	    	if ( tabsSwiperCtrl && $('.tabs').length > 0 ) {
	    		$('.scroller.type03').on('touchcancel', tabsSwiperCtrl.unlock);
	    	}
	    }

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
				idx = $this.parent().index() + 1;

			if ( gnbCtrl ) {
				gnbScroll.scrollToElement( _qs( '#gnb li:nth-child(' + idx + ')'), 100, true, null );
				tabsSwiper.slideTo( $(this).parent().index()+1 );
				targetMarginLeft = parseFloat(target.css('margin-left'));
				$('#gnb .move_bar').css({
					width: target.outerWidth(),
					transform: 'translateX(' + (target.position().left + targetMarginLeft) + 'px)'
				});
			}

		});

		//컨텐츠 로드 완료후 class 추가
		$(window).on('load', function(){
			$('#wrap').addClass('loaded');
			$(pageIdxStr + ' .container.home').addClass('loaded');
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

		//비디오 플레이어
		// var videoPlayer = _qs('#videoPlayer');
		// if ( videoPlayer ) {
		// 	videoPlayer[qs]('.video').addEventListener('click', function(){
		// 		if ( $('#videoPlayer').find('.video').hasClass('play') ) {
		// 			videoPlayer[qs]('video').pause();
		// 			$('#videoPlayer').find('.video').removeClass('play');
		// 		} else {
		// 			videoPlayer[qs]('video').play();
		// 			$('#videoPlayer').find('.video').addClass('play');
		// 		}
		// 	}, false);
		// }

		//버튼 활성화
		// $('a.bookmark').on('click', function(){
		// 	$(this).addClass('active');
		// });

		//폰트사이즈 조정
		$('.font_sizing a').on('click', function( event ){
			event.preventDefault();
			var cl = $('body').get(0).classList,
				$this = $(this),
				re_cl = null,
				cond = null,
				increase = $this.hasClass('up') ? 1 : -1;

			for(var i=0; i<cl.length; i++) {
				if (cl[i].match('font_size_')) {
					re_cl = parseInt(cl[i].replace('font_size_', '')) + increase;
					cond = $this.hasClass('up') ? (re_cl <= 5) : (re_cl >= 1);
					if ( cond ) {
						$('body').removeClass(cl[i]).addClass('font_size_' + re_cl);
						location.hash = 'font_size_' + re_cl;
					}
					break;
				}
			}
			setSlideHeight();
		});
		// function subFontSizing() {
		// 	if ( $('body').hasClass('sub') ) {
		// 		if( location.hash.indexOf('font_size_') > -1 ) {
		// 			var cl = $('body').get(0).classList;
		// 			var re_cl = null;
		// 			for ( var i=0; i<cl.length; i++ ) {
		// 				if ( cl[i].match('font_size_') ) {
		// 					$('body').removeClass(cl[i]);
		// 				}
		// 			}
		// 			var fontSizeHash = location.hash.replace('#', '');
		// 			if (parseInt( fontSizeHash.replace('font_size_', '') ) <= 5 ) {
		// 				$('body').addClass( fontSizeHash );
		// 			}
		// 		}
		// 	}
		// }
		// subFontSizing();

		//홈화면 슬라이드탭 이동( 추후 삭제 요망 )
		if ( location.hash.match('tab') ) {
			var _hash = location.hash,
				pageNumber = parseInt( _hash.split('/')[1] );
			tabsSwiperFunc( pageNumber );
		}

		//탭 활성화
		tabActive();

		// 아코디언
		$('.accordian .acc_toggle').on('click', function(){
			$parents = $(this).parents('.accordian');
			$parents.hasClass('active') ? $parents.removeClass('active') : $parents.addClass('active');
		});

		//더보기, 맨위로 감추기
		window.moreAndTopHide = function(){
			$('.more_and_top').css({
				display: 'none'
			});
			setSlideHeight();
		};

		//디자인 된 알림창
		$.customAlert = function( cond ){
			var like = '<div class="custom_alert like_success"><span>좋아요 성공!</span></div>',
				bookmark_y = '<div class="custom_alert bookmark_success"><span>보관함 담기<br>성공!</span></div>',
				bookmark_n = '<div class="custom_alert bookmark_cancel"><span>보관함 담기<br>취소!</span></div>';
			switch ( cond ) {
				case 'like': $('body').append( like );
				break;
				case 'bookmark_y': $('body').append( bookmark_y );
				break;
				case 'bookmark_n': $('body').append( bookmark_n );
				break;
			}

			var timer = setTimeout(function(){
				$('.custom_alert')
				.css({ opacity: 0 })
				.on('transitionend', function(){
					$(this).remove();
				});
			}, 1000);
		};

		//플로팅 sort, type 클릭
		$('.floating_util .sort [data-select-type]').on('click', function(){
			var type = $(this).data('select-type');
				selectorStr = '.fu_select[data-select-index=' + tabSlideIdx + '][data-select-type=' + type + ']',
				floatingUtil = '.floating_util',
				wrap = '#wrap',
				dimm = '.dimm',
				currentText = $.trim( $(selectorStr).attr('data-selected-item') );

			//플로팅 감추기	
			$('.floating_util').hide();
			
			//dimm 삽입
			if ( $('#wrap').length <= 0 ) wrap = 'body';
			$( wrap ).append( '<div class="dimm" />' ).find(' > .dimm').height( doc.documentElement.clientHeight );

			// 선택되었던 셀렉트 li 활성화
			$( selectorStr ).find('li').each(function(){
				var thisText = $.trim( $(this).find('a').text() );
				$(this).removeClass('active');
				if ( thisText == currentText ) {
					$(this).addClass('active');
				}
			});
			
			//셀렉트 보여주기
			$( selectorStr ).each(function(){
				if ( parseInt( $(this).data('select-index') ) == tabSlideIdx )
					$(this).show()
			});

			//셀렉트 버튼 클릭할 경우
			$( selectorStr ).find(' li > a').on('click', function(){
				var text = $.trim( $(this).text() );
				$(this).parents('.fu_select').hide();
				$( dimm ).remove();
				$( floatingUtil ).show().find('[data-select-type=' + type + '] span').text( text );
				$( selectorStr ).attr('data-selected-item', text);
			});

			//dimm을 클릭할 경우
			$( selectorStr ).find('.cancel').add( $( dimm ) ).on('click', function(){
				$('.fu_select').hide();
				$( dimm ).remove();
				$( floatingUtil ).show();
			});
		});

		//체크박스 (전체 선택 포함, 나의 보관함)
		$('input#chkAll').on('click', function(){
			$('.archive_list').find('.action > input[type=checkbox]').prop(true);
		});

		//체크박스(전체 선택 포함)
		var wrap = $('.archive'),
			item = wrap.find('li'),
			parent = item.find('.action'),
			chk = parent.find('input:checkbox');
			chkAll = wrap.find('.total input#chkAll');

		chkAll.on('click', function(){ 
			var $this = $(this);
			chk.each(function(){
				$(this).prop('checked', $this.prop('checked') );
			});
		});

		chk.on('click', function(){
			var lth = chk.length,
				checkedLength = (function(){
					var num = 0;
					for ( var i=0; i<lth; i++ ) 
						if ( chk.eq(i).prop('checked') ) num++;
					return num;
				})();
				if ( lth == checkedLength ) chkAll.prop('checked', true);
				else chkAll.prop('checked', false);
		});


		//다운로드 페이지 스와이프
		if ( $('.swiper-container.app_guide').length > 0 ) {
			var swiper = new Swiper('.swiper-container.app_guide', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				loop: true
			});
		}

		//앱 다운로드 페이지(다운로드 링크 분기)
		if ( $('#wrap').find('> .app_download').length > 0 ) {
			var downloadPath = {
				android: 'https://dl.dropboxusercontent.com/s/k7ma5pkkbxskozn/beautySquare2.apk',
				gingerbread: 'https://www.dropbox.com/s/k7ma5pkkbxskozn/beautySquare2.apk?dl=0',
				ios: 'itms-services://?action=download-manifest&url=https://dl.dropboxusercontent.com/s/7sv68u0v7znuv2k/houseSelling.plist',
				'no-mobile': 'javascript: alert("태블릿 또는 PC에서는 다운로드 할 수 없습니다.");'
			};
			console.log(isDevice());
			$('.btn_app_download').get(0).href = downloadPath[isDevice()];
		}



	//}); // window load : E

}); // jquery functiuon