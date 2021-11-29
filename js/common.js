$(function() {

	// header scroll shadow
	$(window).on('scroll', function() {
		let top = $(document).scrollTop();
		let headHeight = $('.header_top').outerHeight();
		( top > headHeight )
			? $('.header_sticky').addClass('shadow')
			: $('.header_sticky').removeClass('shadow')
	});

	// header phones
	$('.js_choose_phone').on('click', function() {
		$(this).closest('.js_header_phones').find('.phones_nav').toggleClass('opened');
		return false;
	});
	$(document).on('click touchstart', function(e) {
		let div = $('.phones_nav');
		if ( !div.is(e.target) ) {
			div.removeClass('opened');
		}
	});
	$('.phones_nav li a').on('click', function(e) {
		let id = e.target.hash;
		let txt = $(this).text();
		$(this).closest('.js_header_phones').find('.js_choose_phone').text(txt);
		$(this).closest('.js_header_phones').find('.phone_link').hide();
		$(this).closest('.phones_nav').removeClass('opened');
		$(id).fadeIn(200);
		return false;
	});


	// js_search_mb
	$('.js_search_mb').on('click', function() {
		$('.mobile_header .searchbox').slideToggle(200);
		return false;
	});


	// js_nav
	$('.js_nav').on('click', function() {
		$('body').addClass('panel_opened');
		$('.panel_overlay').fadeIn(200);
		return false;
	});
	$('.panel .btn-close').on('click', function() {
		$('body').removeClass('panel_opened');
		$('.panel_overlay').fadeOut(200);
		return false;
	});
	$('.panel_overlay').on('click touchstart', function() {
		$('body').removeClass('panel_opened');
		$('.parent_child').removeClass('opened');
		$(this).fadeOut(200);
	});
	$('.js_panel_child').on('click', function() {
		$(this).closest('.parent').find('.parent_child').addClass('opened');
		return false;
	});
	$('.js_panel_child_back').on('click', function() {
		$(this).closest('.parent').find('.parent_child').removeClass('opened');
		return false;
	});


	// input-float
	$('.input-float').each(function() {
		$(this).find('.input').on('focus', function() {
			$(this).closest('.input-float').addClass('focused');
		});
		$(this).find('.input').on('blur', function() {
			if ( $(this).val().length === 0 || $(this).val() === '+7 (___) ___-__-__' ) {
				$(this).closest('.input-float').removeClass('focused');
			}
		});
	});
	
	
	// Fancybox
	$('.js_auth, .js_authmail, .js_modal_code, .js_signup2').on('click', function() {
		$.fancybox.close();
	});
	$('.js_auth, .js_authmail, .js_modal_code, .js_signup2, .js_choose_country, .js_freeconsult').fancybox({
		autoFocus: false,
		touch: false,
		closeBtn: false,
		btnTpl: {
			close: '',
			smallBtn: ''
		}
	});

	
	// Mask input
	$('.phone_input').mask('+7 (999) 999-99-99');
	

	// codeinput_input
	$('input[type="radio"]').on('change', function() {
		$('.input-field-hidden').slideUp(200);
		if ( $(this).val() === 'another' ) {
			$(this).closest('.input-field-hide').find('.input-field-hidden').slideDown(200);
		}
	});
	
	
	// Swiper
	let topslider = new Swiper('.topslider .swiper', {
		slidesPerView: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: '.topslider .swiper-button-next',
			prevEl: '.topslider .swiper-button-prev',
		},
		pagination: {
			el: '.topslider .swiper-pagination',
			type: "fraction",
		}
	});
	
	let popuparProducts = new Swiper('.popupar_products .swiper', {
		slidesPerView: 1,
		spaceBetween: 20,
		navigation: {
			nextEl: '.popupar_products .swiper-button-next',
			prevEl: '.popupar_products .swiper-button-prev',
		},
		pagination: {
			el: '.popupar_products .swiper-pagination',
		},
		breakpoints: {
			1020: { slidesPerView: 4 },
			560: { slidesPerView: 2 }
		}
	});
	
	let newsSlider = new Swiper('#news_slider .swiper', {
		slidesPerView: 1,
		spaceBetween: 20,
		navigation: {
			nextEl: '#news_slider .swiper-button-next',
			prevEl: '#news_slider .swiper-button-prev',
		},
		pagination: {
			el: '#news_slider .swiper-pagination',
		},
		breakpoints: {
			1020: { slidesPerView: 3 },
			560: { slidesPerView: 2 }
		}
	});


	// alert close
	$('.alert .btn-close').on('click', function() {
		$(this).closest('.alert').fadeOut(200);
		return false;
	});


	// Pin code
	$('.codeinput_input').pincodeInput({
		inputs: 6
	});


	// ScrollBox
	var scrollbox = new Swiper(".scrollbox", {
		direction: "vertical",
		slidesPerView: "auto",
		freeMode: true,
		scrollbar: {
			el: ".swiper-scrollbar",
		},
		mousewheel: true,
	});


	// js_catpopup
	// $('.js_catpopup').on('click', function() {
	// 	$(this).toggleClass('active');
	// 	$('.catpopup').toggleClass('opened');
	// 	return false;
	// });
	// $(document).on('click touchstart', function(e) {
	// 	let cat = $('.catpopup');
	// 	if ( !cat.is(e.target) && cat.has(e.target).length === 0 ) {
	// 		$('.js_catpopup').removeClass('active');
	// 		cat.removeClass('opened');
	// 	}
	// });


	// Select
	$('.selectbox').styler();
	$('.select_default').styler();
	$('.select_rounded').styler();
	
	

	// Spoiler
	$('.spoiler_name').click(function() {
		$(this).html($(this).text() == 'Открыть спойлер' ? 'Закрыть спойлер' : 'Открыть спойлер');
		$(this).closest('.spoiler').find('.spoiler_hide').slideToggle(200);
		return false;
	});

});
