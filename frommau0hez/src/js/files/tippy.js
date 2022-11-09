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

flsModules.tippy = [];
export function tippyInit() {
  // Запускаем и добавляем в объект модулей
  const tippies =document.querySelectorAll('[data-tippy-content]');
  if (tippies.length) {
    tippies.forEach(tipp=>{
      let thisTippy = null;
      const place = tipp.dataset.position ? tipp.dataset.position : 'top-end'
      thisTippy = tippy(tipp, {
        allowHTML: true,
        theme: 'translucent',
        placement: place,
      });
      flsModules.tippy.push(thisTippy);
    })
  }
  const bottomTippies = document.querySelectorAll('[data-tippy-bottom]');
  if (bottomTippies.length) {
    bottomTippies.forEach(e => {
      let content = e.getAttribute('data-tippy-bottom');
      let thisTippy = null;
      thisTippy = tippy(e, {
        theme: 'translucent',
        placement: 'bottom',
        content: `${content}`,
      });
      flsModules.tippy.push(thisTippy);
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
      
      let thisTippy = null;
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
      thisTippy = tippy(elem, {
        content: tippyContent,
        allowHTML: true,
        theme: 'translucent',
        interactive: true,
        placement: 'top-start',
      });
      
      flsModules.tippy.push(thisTippy);
    })
  }

  const tippysConfirm =document.querySelectorAll('[data-tippy-confirm]');
  if (tippysConfirm.length) {
    tippysConfirm.forEach(tippyConfirm=>{
      tippyConfirm.addEventListener('click', (e)=>{
        e.preventDefault();
      });
      let tippyConfirmTitle = tippyConfirm.getAttribute('data-tippy-confirm');
      let tippyConfirmOnclick = tippyConfirm.getAttribute('data-onclick');
      let tippyConfirmThis = null;
      tippyConfirmThis = tippy(tippyConfirm, {
        trigger: 'click',
        interactive: true,
        allowHTML: true,
        content: `
        <div class="confirm-tippy">
          <div class="confirm-tippy__title">${tippyConfirmTitle}</div>
          <div class="confirm-tippy__buttons">
          <button type="button" class="confirm-tippy__yes" onclick="${tippyConfirmOnclick}">Подтвердить</button>
          <button type="button" class="confirm-tippy__no">Закрыть</button>
          </div>
        </div>`
      });
      flsModules.tippy.push(tippyConfirmThis);
    })
  }
}
tippyInit()