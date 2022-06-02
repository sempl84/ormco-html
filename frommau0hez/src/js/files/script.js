// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

const iframes = document.querySelectorAll('iframe'); {
  iframes.forEach(e => {
    e.loading = 'lazy';
  });
}
document.addEventListener('DOMContentLoaded', () => {
  // const headerScrollBox = document.querySelector('.catpopup .swiper.scrollbox');
  // if (headerScrollBox && window.innerWidth >= 992) {
  //   console.log(headerScrollBox);
  //   setTimeout(() => {
  //     headerScrollBox.style.height = '368px';
  //   }, 500);
  // }
  const filtersItems = document.querySelectorAll('.filters-catalog__item');
  if (filtersItems.length) {
    let checkfilters = document.querySelector('.checkfilters');
    filtersActions(filtersItems, checkfilters);
  }
  const shortModel = document.querySelector('.short-model');
  if (shortModel) {
    document.getElementById('ontop').remove();
    window.addEventListener('scroll', () => {
      if (window.innerWidth < 767 && window.scrollY > 650) {
        shortModel.hidden = false;
      } else {
        shortModel.hidden = true;
      }
    })
  }


  document.addEventListener('click', (e) => {
    if (filtersItems.length) {
      let checkfilters = document.querySelector('.checkfilters');
      filtersActions(filtersItems, checkfilters);
      if (e.target.classList.contains('spollers-breckets__reset')) {
        setTimeout(() => {
          filtersActions(filtersItems, checkfilters);
        }, 100);
      }
    }
  })
})


function filtersActions(filtersItems, checkfilters) {
  let checkfiltersText = '';
  const checkedInputs = document.querySelectorAll('.filters-catalog input:checked');
  if (checkedInputs.length) {
    document.querySelector('.spollers-breckets__quantity span').innerHTML = checkedInputs.length;
    document.querySelector('._gray').innerHTML = checkedInputs.length;
    filtersItems.forEach(element => {
      let title = element.querySelector('.filters-catalog__head').textContent;
      let inps = element.querySelectorAll('input:checked');
      if (inps.length) {
        inps.forEach(e => {
          let text = element.querySelector(`label[for="${e.id}"]`).textContent;
          checkfiltersText += `
          <div class="checkfilters__item">
            <div class="checkfilters__key">${title}</div>:
            <div class="checkfilters__value">${text}</div>
            <div class="checkfilters__close">
              <span></span>
            </div>
          </div>
          `
          checkfilters.innerHTML = checkfiltersText;
        })
      }
    });
  } else {
    document.querySelector('.spollers-breckets__quantity span').innerHTML = '0';
    document.querySelector('._gray').innerHTML = '';
    checkfilters.innerHTML = '';
  }

  filtersListeners(filtersItems)
}

function filtersListeners(filtersItems) {
  const checkfiltersItems = document.querySelectorAll('.checkfilters__item');
  checkfiltersItems.forEach(e => {
    let checkfilterClose = e.querySelector('.checkfilters__close');
    checkfilterClose.addEventListener('click', () => {
      let key = e.querySelector('.checkfilters__key').textContent;
      let value = e.querySelector('.checkfilters__value').textContent;
      filtersItems.forEach(el => {
        let title = el.querySelector('.filters-catalog__head').textContent;
        if (title === key) {
          let labels = el.querySelectorAll('label')
          labels.forEach(e => {
            if (e.textContent === value) {
              e.click();
            }
          })
        }
      })
    })
  })
}


document.addEventListener("afterPopupOpen", function (e) {
	// Попап
  const currentPopup = e.detail.popup;
  let itemTube = currentPopup.previousActiveElement.closest('.item-tubes');
  let currentPopupElement = currentPopup.targetOpen.element;
  if (itemTube) {
    let itemImage = itemTube.querySelector('.item-tubes__image').innerHTML;
    let itemName = itemTube.querySelector('.item-tubes__name').textContent;
    let itemArticle = itemTube.querySelector('.item-tubes__art').textContent;
    let itemPrice = itemTube.querySelector('.price-tubes__actual').innerHTML;
    let popupImage = currentPopupElement.querySelector('.buyPopup__image');
    let popupName = currentPopupElement.querySelector('.buyPopup__name');
    let popupArticle = currentPopupElement.querySelector('.buyPopup__art');
    let popupPrice = currentPopupElement.querySelector('.buyPopup__price>div');
    popupImage.innerHTML = itemImage;
    popupName.innerHTML = itemName;
    popupArticle.innerHTML = itemArticle;
    popupPrice.innerHTML = itemPrice;
  }
});