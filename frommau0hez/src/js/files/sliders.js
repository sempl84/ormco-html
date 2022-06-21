/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Thumbs, Pagination } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице

	if (document.querySelectorAll('.row-breckets').length) {
		const brecketsSliders = document.querySelectorAll('.row-breckets');
		brecketsSliders.forEach(e => {
			const elem = e.querySelector('.row-breckets__slider');
			const prevBtn = e.querySelector('.swiper-button-prev');
			const nextBtn = e.querySelector('.swiper-button-next');
			new Swiper(elem, { // Указываем скласс нужного слайдера
				// Подключаем модули слайдера
				// для конкретного случая
				modules: [Navigation],
				observer: true,
				observeParents: true,
				slidesPerView: 4,
				spaceBetween: 20,
				speed: 800,
				autoHeight: true,
	
				//touchRatio: 0,
				//simulateTouch: false,
				//loop: true,
				//preloadImages: false,
				//lazy: true,
	
				/*
				// Эффекты
				effect: 'fade',
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				*/
	
				// Пагинация
				/*
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				*/
	
				// Скроллбар
				/*
				scrollbar: {
					el: '.swiper-scrollbar',
					draggable: true,
				},
				*/
	
				// Кнопки "влево/вправо"
				navigation: {
					prevEl: prevBtn,
					nextEl: nextBtn,
				},
	
				// Брейкпоинты
				breakpoints: {
					320: {
						slidesPerView: 2.135,
						spaceBetween: 14,
					},
					480: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					1020: {
						slidesPerView: 4,
					},
				},
				// События
				on: {
	
				}
			});
			
		})
	}

	if (document.querySelector('.article__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		let breakpoints;
		if (document.querySelector('.model_product')) {
			breakpoints = {
				320: {
					slidesPerView: 2.115,
					spaceBetween: 12,
				},
				480: {
					slidesPerView: 2.5,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
			}
		} else {
			breakpoints = {
				319: {
					slidesPerView: 2.115,
					spaceBetween: 12,
				},
				480: {
					slidesPerView: 2.5,
				},
				768: {
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
			}
		}
		new Swiper('.article__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			speed: 800,
			autoHeight: true,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.row-breckets .swiper-button-prev',
				nextEl: '.row-breckets .swiper-button-next',
			},

			// Брейкпоинты
			breakpoints: breakpoints,
			// События
			on: {

			}
		});
	}
	if (document.querySelector('.head-tubes__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.head-tubes__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			spaceBetween: 20,
			speed: 800,
			autoHeight: false,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},
			// Брейкпоинты
			breakpoints: {
				768: {
					slidesPerView: 3,
					spaceBetween: 10,
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
			},
			// События
			on: {

			}
		});
	}
	if (document.querySelector('.sliders-model__main')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.sliders-model__main', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Pagination, Thumbs],
			observer: true,
			observeParents: true,
			speed: 800,
			autoHeight: false,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			pagination: {
				el: '.sliders-model__pagination',
				type: 'fraction',
			},
			thumbs: {
				swiper: {
					el: '.sliders-model__thumbs',
					slidesPerView: 4,
					spaceBetween: 8,
					direction: 'vertical',
					// loop: true,
					// breakpoints: {
					// 	320: {
					// 		slidesPerView: 'auto',
					// 		direction: 'horizontal',
					// 		centeredSlides: true,
					// 		loop: true,
					// 		slideToClickedSlide: true,
					// 	},
					// 	992: {
					// 		slidesPerView: 4,
					// 		direction: 'vertical',
					// 		centeredSlides: false,
					// 		loop: false,
					// 		slideToClickedSlide: false,
					// 	},
					// },
				}
			},

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },
			// Брейкпоинты
			// breakpoints: {
			// 	768: {
			// 		slidesPerView: 3,
			// 		spaceBetween: 10,
			// 	},
			// 	992: {
			// 		slidesPerView: 4,
			// 		spaceBetween: 20,
			// 	},
			// },
			// События
			on: {
				slideChange: function() {
					let thisTextEl = this.$el[0].querySelector('.sliders-model__pagination');
					thisTextEl.innerHTML = thisTextEl.innerHTML.replace(' / ', ' из ');
				},
				init: function() {
					let thisTextEl = this.$el[0].querySelector('.sliders-model__pagination');
					thisTextEl.innerHTML = thisTextEl.innerHTML.replace(' / ', ' из ');
				}
			}
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});