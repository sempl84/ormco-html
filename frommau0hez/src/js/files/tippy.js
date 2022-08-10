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
      let tippyTexts = elem.dataset.text;
      let tippyDiscounts = elem.dataset.discount;
      
      let firstRow = ``;
      let secondRow = ``;
      let tippyContent = ``;
      if (tippyTexts && tippyDiscounts) {
        tippyTexts = tippyTexts.split('||');
        tippyDiscounts = tippyDiscounts.split('||');
        for (let i = 0; i < tippyTexts.length; i++) {
          let row = `
          <div class="discount-tippy__row">
            <div class="discount-tippy__text">${tippyTexts[i]}</div>
            <div class="discount-tippy__discount">${tippyDiscounts[i]}</div>
          </div>`;
          tippyContent += row;
        }
      } else if (firstText && firstDiscount && secondText && secondDiscount) {
        if (firstText && firstDiscount) {
          firstRow = `
          <div class="discount-tippy__row">
            <div class="discount-tippy__text">${firstText}</div>
            <div class="discount-tippy__discount">${firstDiscount}</div>
          </div>
          `
        } else {
          firstRow = ``;
        }
        if (secondText && secondDiscount) {
          secondRow = `
          <div class="discount-tippy__row">
            <div class="discount-tippy__text">${secondText}</div>
            <div class="discount-tippy__discount">${secondDiscount}</div>
          </div>
          `
        } else {
          secondRow = ``;
        }
        tippyContent = `
        <div class="discount-tippy">
          ${firstRow}
          ${secondRow}
        </div>`;
      }
      flsModules.tippy = tippy(elem, {
        content: tippyContent,
        allowHTML: true,
        theme: 'translucent',
        interactive: true,
        placement: 'top-start',
      });
    })
  }
}
tippyInit()