;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height() - $('#fh5co-header').height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height() - $('#fh5co-header').height());
			});
		}

	};

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Main Menu Superfish
	var mainMenu = function() {

		$('#fh5co-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	var sliderMain = function() {
		
	  	$('#fh5co-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	  	$('#fh5co-hero .flexslider .slides > li').css('height', $(window).height());	
	  	$(window).resize(function(){
	  		$('#fh5co-hero .flexslider .slides > li').css('height', $(window).height());	
	  	});

	};


	// Offcanvas and cloning of the main menu
	var offcanvas = function() {

		var $clone = $('#fh5co-menu-wrap').clone();
		$clone.attr({
			'id' : 'offcanvas-menu'
		});
		$clone.find('> ul').attr({
			'class' : '',
			'id' : ''
		});

		$('#fh5co-page').prepend($clone);

		// click the burger
		$('.js-fh5co-nav-toggle').on('click', function(){

			if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			} else {
				$('body').addClass('fh5co-offcanvas');
			}
			// $('body').toggleClass('fh5co-offcanvas');

		});

		$('#offcanvas-menu').css('height', $(window).height());

		$(window).resize(function(){
			var w = $(window);


			$('#offcanvas-menu').css('height', w.height());

			if ( w.width() > 769 ) {
				if ( $('body').hasClass('fh5co-offcanvas') ) {
					$('body').removeClass('fh5co-offcanvas');
				}
			}

		});	

	}

	

	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			}
	    }
		});
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};


	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};

	var gridAutoHeight = function() {
		if (!isiPhone() || !isiPad()) {
			$('.row-half').css('height', $('.col-half').outerHeight()/2);
		}
		$(window).resize(function(){
			if (!isiPhone() && !isiPad()) {
				$('.row-half').css('height', $('.col-half').outerHeight()/2);
			}
		});
	}

	var counter = function() {
		$('.js-counter').countTo({
			formatter: function (value, options) {
	      	return value.toFixed(options.decimals);
	    	}
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter-section').length > 0 ) {
			$('#fh5co-counter-section').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '90%' } );
		}
	};

    $('#gototop').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("body").offset().top
        }, 500);
    });
	

	// Document on load.
	$(function(){
		mainMenu();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		sliderMain();
		fullHeight();
		gridAutoHeight();
		parallax();
		counterWayPoint();
	});


}());

var CORRECT = 100; //正确

var USERNAME_ERROR = 201; //用户名错误
//-------------------------------------------------------
var USERNAME_BLANK_ERROR = 2010; //用户名为空
var USERNAME_LENGTH_ERROR = 2011; //用户名长度不符合要求
var USERNAME_FORMAT_ERROR = 2012; //用户名格式错误
var USERNAME_REPEAT_ERROR = 2013; //用户名重复
var USERNAME_NOT_FOUND_ERROR = 2014; //没有找到该用户
var USER_DISABLED = 2015; //该用户被禁用

var PASSWORD_ERROR = 202; //密码错误
//-------------------------------------------------------
var PASSWORD_BLANK_ERROR = 2020; //密码为空
var PASSWORD_LENGTH_ERROR = 2021; //密码长度不符合要求
var PASSWORD_INCONSISTENT_ERROR = 2022; //密码输入不一致
var PASSWORD_INCORRECT_ERROR = 2023; //密码错误

var INVITATION_CODE_ERROR = 203; //无效的邀请码

var DB_INSERT_ERROR = 301; //未知的INSERT错误
var DB_SELECT_ERROR = 302;     //数据库查询错误

var NOT_LOGIN = 400;   //没有登录
var TOKEN_INCORRECT = 402; //__token 不符合

var NO_PERMISSION = 500;

function errorCode2errorInfo(errorcode) {
    switch (errorcode) {
        case USERNAME_ERROR:
            return "用户名错误";
        case USERNAME_BLANK_ERROR:
            return "用户名为空";
        case USERNAME_LENGTH_ERROR:
            return "用户名长度不符合要求";
        case USERNAME_FORMAT_ERROR:
            return "用户名格式错误";
        case USERNAME_REPEAT_ERROR:
            return "用户名已存在";
        case USERNAME_NOT_FOUND_ERROR:
            return "该用户名不存在";
        case PASSWORD_ERROR:
            return "密码错误";
        case PASSWORD_BLANK_ERROR:
            return "密码为空";
        case PASSWORD_LENGTH_ERROR:
            return "密码长度不符合要求";
        case PASSWORD_INCONSISTENT_ERROR:
            return "确认密码输入不一致";
        case PASSWORD_INCORRECT_ERROR:
            return "密码错误";
        case INVITATION_CODE_ERROR:
            return "无效的邀请码";
        case DB_INSERT_ERROR:
            return "未知的INSERT错误";
        case DB_SELECT_ERROR:
            return "未知的SELECT错误";
        case NOT_LOGIN:
            return "未登录";
        case NO_PERMISSION:
            return "没有权限执行此操作";
        case TOKEN_INCORRECT:
            return "TOKEN不正确";
        case USER_DISABLED:
            return "该用户被禁用";
    }
}
