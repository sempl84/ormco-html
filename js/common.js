$(function() {

	// header scroll shadow
	$(window).on('scroll', function() {
		let top = $(document).scrollTop();
		let headHeight = $('.header_top').outerHeight();
		if ( top > headHeight ) {
			$('.header_sticky').addClass('shadow');
		} else {
			$('.header_sticky').removeClass('shadow');
		}

		// Ontop fade
		if (top >= 500) {
			$('#ontop').fadeIn(200);
		} else {
			$('#ontop').fadeOut(200);
		}
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
		},
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
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
	let scrollbox_slider = new Swiper(".scrollbox", {
		direction: "vertical",
		slidesPerView: "auto",
		freeMode: true,
		scrollbar: {
			el: ".swiper-scrollbar",
		},
		mousewheel: true,
	});


	// catpopup
	$('.catpopup').on('mouseleave', function() {
		$('.catpopup .parent1 .parent > a').removeClass('active');
		$('.catpopup .parent2 .parent > a').removeClass('active');
		$('.children').hide();
		$('.sub_children').hide();
		scrollbox_slider[1].update();
		scrollbox_slider[2].update();
	});
	$('.catpopup .parent1 > li > a').on('mouseover', function() {
		let target = $(this).attr('data-title');
		$('.catpopup .parent1 > li > a').removeClass('active');
		$('.catpopup .parent2 .parent > a').removeClass('active');
		$(this).addClass('active');
		$('.children').hide();
		$('.sub_children').hide();
		$(`#${target}`).fadeIn(200);
		scrollbox_slider[1].update();
	});
	$('.catpopup .parent2 > li > a').on('mouseover', function() {
		let target = $(this).attr('data-title');
		$('.catpopup .parent2 > li > a').removeClass('active');
		$(this).addClass('active');
		$('.sub_children').hide();
		$(`#${target}`).fadeIn(200);
		scrollbox_slider[2].update();
		scrollbox_slider[2].scrollbar.updateSize();
	});


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


	// Ontop
	$('#ontop').on('click', function() {
		$('body, html').animate({
			scrollTop: 0
		}, 800);
	});


	
	// custom_select
	$('.custom_select').each(function() {
		$(this).find('.custom_select__select').on('click', function() {
			let div = $(this).closest('.custom_select');
			if ( !div.hasClass('focused') ) {
				$('.custom_select').removeClass('focused');
				$('.custom_select__dropdown').fadeOut(200);
				div.addClass('focused');
				div.find('.custom_select__dropdown').fadeIn(100);
			} else {
				div.removeClass('focused');
				div.find('.custom_select__dropdown').fadeOut(50);
			}
		});
	});
	$(document).on('click touchstart', function(event) {
		let customSelect = $('.custom_select');
		if ( !customSelect.is(event.target) && customSelect.has(event.target).length === 0 ) {
			customSelect.removeClass('focused');
			customSelect.find('.custom_select__dropdown').fadeOut(50);
		}
	});
	$('.custom_select__dropdown li').on('click', function() {
		let txt = $(this).find('span').text();
		$(this).closest('.custom_select').find('.custom_select__select-value').text(txt);
		$(this).closest('.custom_select').find('.custom_select__hidden').val(txt);
		$(this).closest('.custom_select').removeClass('focused');
		$(this).closest('.custom_select__dropdown').fadeOut(50);
	});
	// custom_select end


	// Configurator
	const configChooseTeeth = (id, classname) => {
		$(`#${id}`).on('click', function() {
			$(`.${classname} input[type="checkbox"]`).not(':disabled').each(function() {
				if ( $(this).prop('checked') === false ) {
					$(this).prop('checked', true);
				}
			})
		});
	}
	$('#clearConfig').on('click', function() {
		$(`.teeth_container input[type="checkbox"]`).not(':disabled').each(function() {
			$(this).prop('checked', false);
		});
		return false;
	});
	configChooseTeeth('top-teeth', 'teeth_row-top');
	configChooseTeeth('bottom-teeth', 'teeth_row-bottom');
	configChooseTeeth('all-teeth', 'teeth_container');


	// order_spoiler
	$('.order_spoiler_head').on('click', function() {
		$(this).toggleClass('opened');
		$(this).next().slideToggle(200);
	});
	


});