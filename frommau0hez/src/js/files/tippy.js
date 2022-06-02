// Подключение функционала "Чертогов Фрилансера"
import { isMobile, FLS } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Подключение из node_modules
import tippy, {animateFill} from 'tippy.js';

// Подключение cтилей из src/scss/libs
import "../../scss/libs/tippy.scss";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/dist/backdrop.css';
// Подключение cтилей из node_modules
//import 'tippy.js/dist/tippy.css';

function tippyInit() {
  // Запускаем и добавляем в объект модулей
  flsModules.tippy = tippy('[data-tippy-content]', {
    theme: 'translucent',
  
  });
  const bottomTippies = document.querySelectorAll('[data-tippy-bottom]');
  if (bottomTippies.length) {
    bottomTippies.forEach(e => {
      let content = e.getAttribute('data-tippy-bottom');
      flsModules.tippy = tippy(e, {
        theme: 'translucent',
        placement: 'bottom',
        content: `${content}`,
      });
    })
  }

  
  const tippys = document.querySelectorAll('[data-tippy-discount]');
  if (tippys.length) {
    tippys.forEach(elem => {
      let firstText = elem.dataset.firstText;
      let secondText = elem.dataset.secondText;
      let firstDiscount = elem.dataset.firstDiscount;
      let secondDiscount = elem.dataset.secondDiscount;
      flsModules.tippy = tippy(elem, {
        content: `<div class="discount-tippy">
        <div class="discount-tippy__row">
          <div class="discount-tippy__text">${firstText}</div>
          <div class="discount-tippy__discount">${firstDiscount}%</div>
        </div>
        <div class="discount-tippy__row">
          <div class="discount-tippy__text">${secondText}</div>
          <div class="discount-tippy__discount">${secondDiscount}%</div>
        </div>
      </div>`,
        allowHTML: true,
        theme: 'translucent',
        interactive: true,
        placement: 'top-start',
      });
    })
  }
}
tippyInit()