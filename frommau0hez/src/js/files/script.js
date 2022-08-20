// Подключение функционала "Чертогов Фрилансера"
import { isMobile, _slideToggle, bodyLockToggle, bodyUnlock, bodyLock } from "./functions.js";
import { _slideUp } from "./functions.js";
import { _slideDown } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
import { inputmaslFirstInit } from "./forms/inputmask.js";
import { tippyInit } from "./tippy.js";
import '../libs/datepicker-full.min.js';
/* Модуль работы с select. */
import '../libs/select.js';
import * as clipboard from "clipboard-polyfill/text";


const iframes = document.querySelectorAll('iframe');
if (iframes.length) {
  iframes.forEach(e => {
    e.loading = 'lazy';
  });
}
let x = window.matchMedia("(max-width: 767px)");

document.addEventListener('DOMContentLoaded', () => {

  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  const filtersItems = document.querySelectorAll('.filters-catalog__item');
  if (filtersItems.length) {
    let checkfilters = document.querySelector('.checkfilters');
    filtersActions(filtersItems, checkfilters);
  }
  const shortModel = document.querySelector('.short-model');
  if (shortModel) {
    document.getElementById('ontop').remove();
    shortModelShow(shortModel);
    window.addEventListener('scroll', () => {
      shortModelShow(shortModel);
    })
  }

  const legalFaceInput = document.querySelector('[data-legalface-checked]');
  if (legalFaceInput) {
    legalFaceCheck(legalFaceInput)
  }

  const cartElement = document.querySelector('.cart');
  if (cartElement && document.querySelector('.page_cart')) {
    cartActions(cartElement);
  }
  const orderingAdresses = document.querySelectorAll('.popupAddress__radio');
  if (orderingAdresses.length || document.querySelectorAll('.item-cabinet__line')) {
    orderingAdressesActions(orderingAdresses);
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
  const datePickers = document.querySelectorAll('[data-datepicker]');
  if (datePickers.length) {
    customDatePickerInit(datePickers);
  }

  const orderingCart = document.querySelector('.ordering-cart');
  if (orderingCart) {
    orderingCart.querySelector('.ordering-cart__link').addEventListener('click', (e) => {
      e.preventDefault();
      checkOrderingStatus()
    })
  }

  const cabinet = document.querySelector('section.cabinet');
  cabinet ? cabinetActions(cabinet) : null;

  const cabinetOrders = document.querySelectorAll('.ordersCabinet__order');
  cabinetOrders.length ? cabinetOrdersActions(cabinetOrders) : null;

  const popupContents = document.querySelectorAll('.popup');
  popupContents.length ? popupContentsActions(popupContents) : null;

  const cabinetInfo = document.querySelector('.info-cabinet__body');
  if (cabinetInfo) {
    const cabinetInfoInputs = document.querySelectorAll('.info-cabinet__input');
    if (cabinetInfoInputs.length) {
      cabinetInfoInputs.forEach(cabinetInfoInput=>{
        cabinetInfoInput.addEventListener('change', () => {
          cabinetInfo.querySelector('button[type="submit"]').click();
        })
      })
    }
  }

  const find = document.querySelector('.find');
  find && findClinics && findCities && findRegions ? findActions() : null;
  
  const contacts = document.querySelector('.contacts');
  contacts ? contactsActions() : null;

  const configuratorEl = document.querySelector('.configurator');
  configuratorEl ? configuratorActions(configuratorEl) : null
})


function copyTextToClipboard(text) {
  clipboard.writeText(text).then(
    () => {
      console.log("success!");
      alert('Текст скопирован в буфер обмена');
    },
    () => {
      console.log("error!");
      alert('Что-то пошло не так, не удалось скопировать');
    }
  );
}

function popupContentsActions(popupContents) {
  if (window.innerWidth <= 767) {
    popupContents.forEach(popupContent => {
      const popupContentCloseSpan = popupContent.querySelector('span[data-close]');
      if (popupContentCloseSpan) {
        let touchStartPoint = null;
        popupContentCloseSpan.addEventListener('touchstart', e => touchStartPoint = e.touches[0].clientY);
        popupContentCloseSpan.addEventListener('touchmove', e => {
          if (!touchStartPoint) return;
          let touchPoint = e.touches[0].clientY - touchStartPoint;
          popupContent.style.transition = `none`;
          popupContent.style.transform = `translateY(${touchPoint}px)`;
          if (Math.abs(touchPoint - touchStartPoint) > 50) {
            flsModules.popup.close(popupContent)
          }
        });
        popupContentCloseSpan.addEventListener('touchend', (e) => { 
          touchStartPoint = null;
          popupContent.style = '';
        });
      }
    })
  }
}

function cabinetActions() {
  const cabinetPersonalDatas = document.querySelectorAll('[data-cabinet-personaldata]');
  if (cabinetPersonalDatas.length) {
    cabinetPersonalDatas.forEach(cabinetPersonalData => {
      const cabinetPersonalDataChange = cabinetPersonalData.querySelector('[data-cabinet-changepersonaldata]');
      cabinetPersonalDataChange.addEventListener('click', (e) => {
        e.preventDefault();
        cabinetPersonalData.classList.toggle('main-cabinet__row_change');
        checkPersonalDataStatus(cabinetPersonalData);
      })
    })
  }
  const cabinetDelButtons = document.querySelectorAll('.popupAddress__del');
  if (cabinetDelButtons.length) {
    cabinetDelButtons.forEach(cabinetDelButton => {
      cabinetDelButton.addEventListener('click', (e)=>{
        e.preventDefault();
        const cabinetItem = cabinetDelButton.closest('[data-cabinet-adress]') || cabinetDelButton.closest('[data-cabinet-legalface]');
        if (cabinetItem) {
          _slideUp(cabinetItem);
          setTimeout(() => {
            cabinetItem.remove();
          }, 500);
        }
      })
    })
  }

  const cabinetArrows = document.querySelectorAll('.popupAddress__arrow');
  if (cabinetArrows.length && isMobile.any()) {
    cabinetArrows.forEach(cabinetArrow => {
      cabinetArrow.addEventListener('click', (e)=>{
        e.preventDefault();
        const cabinetArrowParent = cabinetArrow.closest('.info-cabinet__row') || cabinetArrow.closest('.item-cabinet__line');
        if (cabinetArrowParent && cabinetArrowParent.classList.contains('info-cabinet__row')) {
          const input = cabinetArrowParent.querySelector('.info-cabinet__input');
          cabinetArrowParent.classList.toggle('info-cabinet__row_change');
          _slideToggle(input)
          // if (cabinetArrowParent.classList.contains('info-cabinet__row_change')) {
          //   _slideDown(input);
          // } else {
          //   _slideUp(input)
          // }
        } else if (cabinetArrowParent && cabinetArrowParent.classList.contains('item-cabinet__line')) {
          cabinetArrowParent.classList.toggle('item-cabinet__line_deledit')
        }
      })
    })
  }
  
  function checkPersonalDataStatus(cabinetPersonalData) {
    const cabinetPersonalDataInputs = document.querySelectorAll('.info-cabinet__input');
    if (cabinetPersonalData.classList.contains('main-cabinet__row_change')) {
      cabinetPersonalDataInputs.forEach(e => {
        _slideDown(e)
        inputmaslFirstInit()
      });
      cabinetPersonalDataInputs[0].focus();
    } else {
      cabinetPersonalDataInputs.forEach(e => {
        _slideUp(e)
      });
    }
    cabinetPersonalDataInputs.forEach(e => {
      e.addEventListener('change', () => {
        e.closest('form').querySelector('button[type="submit"]').click();
      })
    })
  }

}

function cabinetOrdersActions(cabinetOrders) {
  cabinetOrders.forEach(cabinetOrder=>{
    const cabinetOrderMobile = cabinetOrder.querySelector('.mobile-ordersCabinet');
    cabinetOrder.querySelector('.head-ordersCabinet').addEventListener('click', () => {
      if (window.innerWidth <= 767) {
        cabinetOrderMobile.classList.add('_show');
      }
    })
    const cabinetOrderMobileBack = cabinetOrderMobile.querySelector('.mobile-ordersCabinet__back');
    if (cabinetOrderMobileBack) {
      cabinetOrderMobileBack.addEventListener('click', () => {
        if (window.innerWidth <= 767) {
          cabinetOrderMobile.classList.remove('_show');
        }
      })
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        cabinetOrderMobile.classList.remove('_show');
      }
    })
  })
}


function shortModelShow(shortModel) {
  if (window.innerWidth < 767 && window.scrollY > 650 && document.querySelector('.page_model')) {
    shortModel.hidden = false;
  } else if ((document.querySelector('.page_cart') || document.querySelector('.page_ordering')) && window.innerWidth < 767) {
    shortModel.hidden = false;
  } else {
    shortModel.hidden = true;
  }
}

function legalFaceCheck(legalFaceInput) {
  const orderingPayRadios = document.querySelectorAll('.ordering-cart__radio');
  const legalFaceAttrs = document.querySelector('[data-legalface]');
  if (legalFaceInput.checked) {
    legalFaceAttrs.hidden = false;
  } else {
    legalFaceAttrs.hidden = true;
  } 
  orderingPayRadios.forEach(e => {
    e.addEventListener('change', () => {
      setTimeout(() => {
        if (legalFaceInput.checked) {
          _slideDown(legalFaceAttrs, 200);
        } else {
          _slideUp(legalFaceAttrs, 200);
        }
      }, 200);
    })
  })
}


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

function cartActions(cartElement) {
  function cartCheckboxes() {
    const checkboxAll = cartElement.querySelector('.products-cart__checkboxall');
    const checkboxes = cartElement.querySelectorAll('.products-cart__checkbox');
    setTimeout(() => {
    if (cartElement.querySelector('.products-cart__delquan')) {
        const checkboxesChecked = document.querySelectorAll('.products-cart__checkbox:checked');
        if (checkboxesChecked.length) {
          document.querySelector('.products-cart__delquan').innerHTML = `(${checkboxesChecked.length})`;
        } else {
          document.querySelector('.products-cart__delquan').innerHTML = ``;
        }
      }
    }, 600);
    if (checkboxes.length) {
      checkboxes.forEach(el => {
        el.addEventListener('change', () => {
          const checkboxesChecked = cartElement.querySelectorAll('.products-cart__checkbox:checked');
          if (document.querySelector('.products-cart__delquan')) {
            if (checkboxesChecked.length) {
              document.querySelector('.products-cart__delquan').innerHTML = `(${checkboxesChecked.length})`;
            } else {
              document.querySelector('.products-cart__delquan').innerHTML = ``;
            }
          }
          if (checkboxes.length === checkboxesChecked.length) {
            checkboxAll.checked = true;
          } else {
            checkboxAll.checked = false;
          }
        })
      })
    } else {
      if (cartElement.querySelector('.products-cart__head')) {
        cartElement.querySelector('.products-cart__head').remove();
      }
    }
    if (checkboxAll) {
      checkboxAll.addEventListener('change', () => {
        if (checkboxAll.checked) {
          checkboxes.forEach(e => {
            e.checked = true;
          })
        } else {
          checkboxes.forEach(e => {
            e.checked = false;
          })
        }
        if (document.querySelector('.products-cart__delquan')) {
          const checkboxesChecked = document.querySelectorAll('.products-cart__checkbox:checked');
          if (checkboxesChecked.length) {
            document.querySelector('.products-cart__delquan').innerHTML = `(${checkboxesChecked.length})`;
          } else {
            document.querySelector('.products-cart__delquan').innerHTML = ``;
          }
        }
      })
    }
  }
  cartCheckboxes();
  function cartDel() {
    const delAllAvaiableBtn = cartElement.querySelector('.products-cart__delall_avaiable');
    if (delAllAvaiableBtn) {
      delAllAvaiableBtn.addEventListener('click', () => {
        const checkboxesChecked = cartElement.querySelectorAll('.products-cart__checkbox:checked');
        if (checkboxesChecked.length) {
          checkboxesChecked.forEach(el => {
            const product = el.closest('[data-product]');
            _slideUp(product);
            setTimeout(() => {
              product.remove();
            }, 500);
          })
        }
        setTimeout(() => {
          cartCheckboxes();
          cartPrices();
        }, 600);
      })
    }
    const delAllUnavaiableBtn = cartElement.querySelector('.products-cart__delall_unavaiable');
    if (delAllUnavaiableBtn) {
      delAllUnavaiableBtn.addEventListener('click', () => {
        _slideUp(delAllUnavaiableBtn.closest('.products-cart__item'));
        setTimeout(() => {
          delAllUnavaiableBtn.closest('.products-cart__item').remove();
        }, 600);
        setTimeout(() => {
          cartCheckboxes();
          cartPrices();
        }, 600);
      })
    }
    const delProductBtn = cartElement.querySelectorAll('.products-cart__del');
    if (delProductBtn.length) {
      delProductBtn.forEach(el => {
        el.addEventListener('click', () => {
          const product = el.closest('[data-product]');
          _slideUp(product);
          setTimeout(() => {
            product.remove();
          }, 500);
        setTimeout(() => {
          cartCheckboxes();
          cartPrices();
        }, 600);
        })
      })
    }
    const delSubProductBtn = cartElement.querySelectorAll('.spollers-cart__del');
    if (delSubProductBtn.length) {
      delSubProductBtn.forEach(el => {
        el.addEventListener('click', () => {
          if (cartElement.querySelectorAll('.spollers-cart__del').length <= 1) {
            _slideUp(el.closest('[data-spollers]'));
            setTimeout(() => {
              el.closest('[data-spollers]').remove();
            }, 500);
          } else {
            const product = el.closest('[data-subproduct]');
            _slideUp(product);
            setTimeout(() => {
              product.remove();
            }, 500);
          }
          setTimeout(() => {
            cartCheckboxes();
            cartPrices();
          }, 600);
        })
      })
    }
  }
  cartDel();
  function cartPrices() {
    let cartProducts = cartElement.querySelectorAll('[data-product]');
    cartElement.querySelector('.ordering-cart__span').innerHTML = `(${cartProducts.length})`;
    let cartTotalPriceWithoutDiscountEl = cartElement.querySelector('.ordering-cart__totalprice');
    let cartTotalPriceEl = cartElement.querySelector('.ordering-cart__bothprice');
    let cartTotalDiscountEl = cartElement.querySelector('.ordering-cart__discount');
    let cartTotalPriceShortEl = document.querySelector('.short-model__actprice');
    let cartTotalPrice = 0;
    let cartTotalPriceWithoutDiscount = 0;
    let cartTotalDiscount = 0;
    if (cartProducts.length) {
      cartProducts.forEach(cartProduct => {
        let cartProductNewPrice = cartProduct.querySelector('[data-newprice]');
        let cartProductQuantity = parseInt(cartProduct.querySelector('.quantity__input input').value);
        let cartProductSubProducts = cartProduct.querySelectorAll('[data-subproduct]');
        if (!cartProductSubProducts.length) {
          if (cartProductNewPrice) {
            let cartOldPriceEl = cartProduct.querySelector('[data-price]');
            let cartPriceEl = cartProduct.querySelector('[data-newprice]');
            let cartOldPrice = cartOldPriceEl.dataset.price * cartProductQuantity;
            let cartPrice = cartPriceEl.dataset.newprice * cartProductQuantity;
            if (cartPrice.toString().length > 4) {
              cartPriceEl.querySelector('span').innerHTML = cartPrice.toLocaleString();
            } else {
              cartPriceEl.querySelector('span').innerHTML = cartPrice;
            }
            if (cartOldPrice.toString().length > 4) {
              cartOldPriceEl.querySelector('span').innerHTML = cartOldPrice.toLocaleString();
            } else {
              cartOldPriceEl.querySelector('span').innerHTML = cartOldPrice;
            }
            let cartDiscount = cartOldPrice - cartPrice;
            cartTotalDiscount += cartDiscount;
            cartTotalPriceWithoutDiscount += cartOldPrice;
            cartTotalPrice += cartPrice;
          } else {
            let cartPriceEl = cartProduct.querySelector('[data-price]');
            let cartPrice = cartPriceEl.dataset.price * cartProductQuantity;
            if (cartPrice.toString().length > 4) {
              cartPriceEl.querySelector('span').innerHTML = cartPrice.toLocaleString();
            } else {
              cartPriceEl.querySelector('span').innerHTML = cartPrice;
            }
            cartTotalPrice += cartPrice;
            cartTotalPriceWithoutDiscount += cartPrice;
          }
        } else {
          let cartPriceEl = cartProduct.querySelector('[data-price]');
          let cartPrice = cartPriceEl.dataset.price * cartProductQuantity;
          cartProductSubProducts.forEach(cartProductSubProduct => {
            let cartSubProductQuantity = cartProductSubProduct.querySelector('.quantity__input input').value;
            let cartSubPriceEl = cartProductSubProduct.querySelector('[data-subprice]');
            let cartSubPrice = cartSubPriceEl.dataset.subprice * cartSubProductQuantity;
            if (cartSubPrice.toString().length > 4) {
              cartSubPriceEl.querySelector('span').innerHTML = cartSubPrice.toLocaleString();
            } else {
              cartSubPriceEl.querySelector('span').innerHTML = cartSubPrice;
            }
            cartPrice += cartSubPrice;
          })
          if (cartPrice.toString().length > 4) {
            cartPriceEl.querySelector('span').innerHTML = cartPrice.toLocaleString();
          } else {
            cartPriceEl.querySelector('span').innerHTML = cartPrice;
          }
          cartTotalPrice += cartPrice;
          cartTotalPriceWithoutDiscount += cartPrice;
        }
      })
      if (cartTotalPriceWithoutDiscount.toString().length > 4) {
        cartTotalPriceWithoutDiscountEl.innerHTML = cartTotalPriceWithoutDiscount.toLocaleString();
      } else {
        cartTotalPriceWithoutDiscountEl.innerHTML = cartTotalPriceWithoutDiscount;
      }
      if (cartTotalPrice.toString().length > 4) {
        cartTotalPriceEl.innerHTML = cartTotalPrice.toLocaleString();
      } else {
        cartTotalPriceEl.innerHTML = cartTotalPrice;
      }
      if (cartTotalPrice.toString().length > 4) {
        cartTotalPriceShortEl.innerHTML = cartTotalPrice.toLocaleString() + ` <font class="rub">i</font>`;
      } else {
        cartTotalPriceShortEl.innerHTML = cartTotalPrice + ` <font class="rub">i</font>`;
      }
      if (cartTotalDiscount == 0) {
        cartTotalDiscountEl.innerHTML = '0';
      } else {
        if (cartTotalDiscount.toString().length > 4) {
          cartTotalDiscountEl.innerHTML = (cartTotalDiscount * -1).toLocaleString();
        } else {
          cartTotalDiscountEl.innerHTML = (cartTotalDiscount * -1).toString();
        }
      }
    } else {
      cartTotalPriceWithoutDiscountEl.innerHTML = '0';
      cartTotalPriceEl.innerHTML = '0';
      cartTotalDiscountEl.innerHTML = '0';
      cartTotalPriceShortEl.innerHTML = '0';
    }
  }
  cartPrices();
  function cartQuantity() {
    const cartBtnQuantity = cartElement.querySelectorAll('.quantity__button');
    const cartInputQuantity = cartElement.querySelectorAll('.quantity');
    cartBtnQuantity.forEach(el => {
      el.addEventListener('click', () => {
        setTimeout(() => {
          cartPrices();
        }, 50);
      })
    })
    cartInputQuantity.forEach(el => {
      el.querySelector('input').addEventListener('change', () => {
        let max = parseInt(el.querySelector('input').getAttribute('max'));
        let min = parseInt(el.querySelector('input').getAttribute('min'));
        if (max && parseInt(el.querySelector('input').value) > max) {
          el.querySelector('input').value = max;
          el.querySelector('.quantity__button_plus').classList.add('quantity__button_disabled');
        } else if ((min && parseInt(el.querySelector('input').value) < min) || parseInt(el.querySelector('input').value) < 1) {
          if (parseInt(el.querySelector('input').value) < min) {
            el.querySelector('input').value = min;
          }
          if (parseInt(el.querySelector('input').value) < 1) {
            el.querySelector('input').value = 1;
          }
          el.querySelector('.quantity__button_minus').classList.add('quantity__button_disabled');
        } else {
          el.querySelector('.quantity__button_minus').classList.remove('quantity__button_disabled');
          el.querySelector('.quantity__button_plus').classList.remove('quantity__button_disabled');
        }
        setTimeout(() => {
          cartPrices();
        }, 50);
      })
    })
  }
  cartQuantity();
}


function customDatePickerInit(datePickers = document.querySelectorAll('[data-datepicker]')) {
  let picker;
  datePickers.forEach(el => {
    picker = datepicker(el, {
      position: 'tl',
      startDay: 1,
      customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      customOverlayMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт ', 'Ноя', 'Дек'],
      defaultView: 'overlay',
      dateSelected: new Date(), // Today is selected.
      disableYearOverlay: true, // Clicking the year or month will *not* bring up the year overlay.
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString('ru-RU', { weekday: 'long', month: 'long', day: 'numeric' })
        const shortValue = date.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })
        input.value = date.toLocaleDateString();
        input.parentElement.querySelector('[data-date]').innerHTML = value;
        input.closest('.buyers-ordering__item').querySelector('.buyers-ordering__dateshort').innerHTML = shortValue;
      }
    })
  })
}

function orderingAdressesActions(orderingAdresses) {
  const editAdresses = document.querySelectorAll('.popupAddress__edit');
  if (editAdresses.length) {
    const editPopup = document.querySelector('.popupAddressEdit');
    const editLegalPopup = document.querySelector('.popupLegalfaceEdit');
    editAdresses.forEach(e => {
      e.addEventListener('click', () => {
        let editInputs;
        const editableAdress = e.closest('.popupAddress__item') || e.closest('.item-cabinet__line');
        const values = editableAdress.querySelectorAll('[data-value]');
        if (e.closest('.popupAddress') || e.closest('[data-cabinet-adress]')) {
          editInputs = editPopup.querySelectorAll('[data-name]');
        } else if (e.closest('.popupLegalface') || e.closest('[data-cabinet-legalface]')) { 
          editInputs = editLegalPopup.querySelectorAll('[data-name]');
        }
        
        editInputs.forEach(input => {
          let name = input.dataset.name;
          values.forEach(elem => {
            let value = elem.dataset.value;
            if (value === name) {
              input.parentElement.classList.add('_form-input')
              input.value = elem.innerText;
            }
          })
        })
      })
    })
  }
  document.addEventListener('beforePopupClose', function (e) {
    const currentPopup = e.detail.popup;
    let currentPopupElement = currentPopup.targetOpen.element;
    if (currentPopupElement.classList.contains('popupAddress') && !currentPopupElement.classList.contains('popupLegalface')) {
      const currentAdress = currentPopupElement.querySelector('.popupAddress__radio:checked');
      if (currentAdress) {
        const currentAdressEl = currentAdress.parentElement;
        let adress;
        let flat;
        let entrance;
        let floor;
        let intercom;
        let comment;
        if (currentAdressEl.querySelector('[data-value="adress"]')) {
          adress = currentAdressEl.querySelector('[data-value="adress"]').innerText;
        } else {
          adress = ''
        }
        if (currentAdressEl.querySelector('[data-value="flat"]')) {
          flat = currentAdressEl.querySelector('[data-value="flat"]').innerText;
        } else {
          flat = ''
        }
        if (currentAdressEl.querySelector('[data-value="entrance"]')) {
          entrance = currentAdressEl.querySelector('[data-value="entrance"]').innerText;
        } else {
          entrance = ''
        }
        if (currentAdressEl.querySelector('[data-value="floor"]')) {
          floor = currentAdressEl.querySelector('[data-value="floor"]').innerText;
        } else {
          floor = ''
        }
        if (currentAdressEl.querySelector('[data-value="intercom"]')) {
          intercom = currentAdressEl.querySelector('[data-value="intercom"]').innerText;
        } else {
          intercom = ''
        }
        if (currentAdressEl.querySelector('[data-value="comment"]')) {
          comment = currentAdressEl.querySelector('[data-value="comment"]').innerText;
        } else {
          comment = ''
        }
        if (document.querySelector('[data-adress]')) {
          document.querySelector('[data-adress]').innerHTML = `
          <div class="buyers-ordering__head">
            <div class="buyers-ordering__title">Доставка <span class="buyers-ordering__dateshort">${new Date().toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })}</span>, бесплатно</div>
            <a href="#" data-popup="#popupAddress" class="buyers-ordering__edit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 10.5V19.125C18 19.3712 17.9515 19.615 17.8573 19.8425C17.763 20.07 17.6249 20.2767 17.4508 20.4508C17.2767 20.6249 17.07 20.763 16.8425 20.8573C16.615 20.9515 16.3712 21 16.125 21H4.875C4.37772 21 3.90081 20.8025 3.54917 20.4508C3.19754 20.0992 3 19.6223 3 19.125V7.875C3 7.37772 3.19754 6.90081 3.54917 6.54917C3.90081 6.19754 4.37772 6 4.875 6H12.7256" stroke="#2CA5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21.5597 2.49611C21.4912 2.42085 21.4082 2.36025 21.3156 2.31799C21.2231 2.27573 21.1229 2.25267 21.0211 2.25022C20.9194 2.24777 20.8182 2.26596 20.7237 2.30371C20.6292 2.34147 20.5434 2.39799 20.4713 2.46986L19.8915 3.04689C19.8212 3.11721 19.7817 3.21255 19.7817 3.31197C19.7817 3.41138 19.8212 3.50673 19.8915 3.57705L20.423 4.10767C20.4579 4.14268 20.4993 4.17046 20.5449 4.18941C20.5905 4.20837 20.6394 4.21812 20.6888 4.21812C20.7382 4.21812 20.7871 4.20837 20.8327 4.18941C20.8783 4.17046 20.9197 4.14268 20.9546 4.10767L21.5199 3.54517C21.8058 3.2597 21.8326 2.7947 21.5597 2.49611ZM18.7191 4.21877L10.2572 12.6656C10.2059 12.7167 10.1686 12.7802 10.149 12.8499L9.75756 14.0156C9.74818 14.0473 9.74752 14.0809 9.75564 14.1128C9.76375 14.1448 9.78035 14.174 9.80368 14.1973C9.82701 14.2207 9.85621 14.2373 9.88818 14.2454C9.92016 14.2535 9.95374 14.2528 9.98537 14.2435L11.1502 13.8521C11.2199 13.8324 11.2833 13.7951 11.3344 13.7438L19.7813 5.28095C19.8595 5.20197 19.9033 5.09535 19.9033 4.98423C19.9033 4.87312 19.8595 4.7665 19.7813 4.68752L19.3149 4.21877C19.2358 4.1399 19.1287 4.09562 19.017 4.09562C18.9053 4.09562 18.7982 4.1399 18.7191 4.21877Z" fill="#2CA5F5"/>
            </svg>
              <span>Изменить</span>
            </a>
          </div>
          <div class="buyers-ordering__body">
            <div class="buyers-ordering__addresss addresss-ordering">
              <div class="addresss-ordering__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.25 19.5V22.5V19.5ZM3.75 1.5H12.75C13.1478 1.5 13.5294 1.65804 13.8107 1.93934C14.092 2.22064 14.25 2.60218 14.25 3V22.3125C14.25 22.3622 14.2302 22.4099 14.1951 22.4451C14.1599 22.4802 14.1122 22.5 14.0625 22.5H2.25V3C2.25 2.60218 2.40804 2.22064 2.68934 1.93934C2.97064 1.65804 3.35218 1.5 3.75 1.5V1.5ZM15 9H20.25C20.6478 9 21.0294 9.15804 21.3107 9.43934C21.592 9.72064 21.75 10.1022 21.75 10.5V22.5H14.25V9.75C14.25 9.55109 14.329 9.36032 14.4697 9.21967C14.6103 9.07902 14.8011 9 15 9Z" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.59726 20.2439C4.44193 20.2642 4.28414 20.2354 4.14603 20.1615C4.00792 20.0875 3.89643 19.9722 3.8272 19.8317C3.75798 19.6911 3.73449 19.5325 3.76004 19.3779C3.7856 19.2234 3.8589 19.0807 3.96967 18.9699C4.08044 18.8591 4.22312 18.7858 4.37767 18.7603C4.53223 18.7347 4.6909 18.7582 4.83143 18.8274C4.97196 18.8967 5.08728 19.0082 5.16121 19.1463C5.23515 19.2844 5.26398 19.4422 5.24367 19.5975C5.22223 19.7614 5.14723 19.9137 5.03033 20.0306C4.91343 20.1475 4.76118 20.2225 4.59726 20.2439ZM4.59726 16.4939C4.44193 16.5142 4.28414 16.4854 4.14603 16.4115C4.00792 16.3375 3.89643 16.2222 3.8272 16.0817C3.75798 15.9411 3.73449 15.7825 3.76004 15.6279C3.7856 15.4734 3.8589 15.3307 3.96967 15.2199C4.08044 15.1091 4.22312 15.0358 4.37767 15.0103C4.53223 14.9847 4.6909 15.0082 4.83143 15.0774C4.97196 15.1467 5.08728 15.2582 5.16121 15.3963C5.23515 15.5344 5.26398 15.6922 5.24367 15.8475C5.22223 16.0114 5.14723 16.1637 5.03033 16.2806C4.91343 16.3975 4.76118 16.4725 4.59726 16.4939ZM4.59726 12.7439C4.44193 12.7642 4.28414 12.7354 4.14603 12.6615C4.00792 12.5875 3.89643 12.4722 3.8272 12.3317C3.75798 12.1911 3.73449 12.0325 3.76004 11.8779C3.7856 11.7234 3.8589 11.5807 3.96967 11.4699C4.08044 11.3591 4.22312 11.2858 4.37767 11.2603C4.53223 11.2347 4.6909 11.2582 4.83143 11.3274C4.97196 11.3967 5.08728 11.5082 5.16121 11.6463C5.23515 11.7844 5.26398 11.9422 5.24367 12.0975C5.22223 12.2614 5.14723 12.4137 5.03033 12.5306C4.91343 12.6475 4.76118 12.7225 4.59726 12.7439ZM4.59726 8.99391C4.44193 9.01422 4.28414 8.98539 4.14603 8.91146C4.00792 8.83752 3.89643 8.7222 3.8272 8.58167C3.75798 8.44115 3.73449 8.28247 3.76004 8.12791C3.7856 7.97336 3.8589 7.83068 3.96967 7.71991C4.08044 7.60914 4.22312 7.53584 4.37767 7.51029C4.53223 7.48474 4.6909 7.50822 4.83143 7.57745C4.97196 7.64667 5.08728 7.75816 5.16121 7.89627C5.23515 8.03438 5.26398 8.19217 5.24367 8.3475C5.22223 8.51143 5.14723 8.66367 5.03033 8.78057C4.91343 8.89747 4.76118 8.97247 4.59726 8.99391ZM4.59726 5.24391C4.44193 5.26423 4.28414 5.23539 4.14603 5.16146C4.00792 5.08753 3.89643 4.9722 3.8272 4.83167C3.75798 4.69115 3.73449 4.53247 3.76004 4.37792C3.7856 4.22336 3.8589 4.08069 3.96967 3.96991C4.08044 3.85914 4.22312 3.78584 4.37767 3.76029C4.53223 3.73474 4.6909 3.75822 4.83143 3.82745C4.97196 3.89667 5.08728 4.00817 5.16121 4.14627C5.23515 4.28438 5.26398 4.44218 5.24367 4.59751C5.22223 4.76143 5.14723 4.91368 5.03033 5.03057C4.91343 5.14747 4.76118 5.22247 4.59726 5.24391ZM8.34726 16.4939C8.19193 16.5142 8.03414 16.4854 7.89603 16.4115C7.75792 16.3375 7.64643 16.2222 7.5772 16.0817C7.50798 15.9411 7.48449 15.7825 7.51004 15.6279C7.53559 15.4734 7.6089 15.3307 7.71967 15.2199C7.83044 15.1091 7.97311 15.0358 8.12767 15.0103C8.28222 14.9847 8.4409 15.0082 8.58143 15.0774C8.72195 15.1467 8.83728 15.2582 8.91121 15.3963C8.98515 15.5344 9.01398 15.6922 8.99366 15.8475C8.97222 16.0114 8.89723 16.1637 8.78033 16.2806C8.66343 16.3975 8.51118 16.4725 8.34726 16.4939ZM8.34726 12.7439C8.19193 12.7642 8.03414 12.7354 7.89603 12.6615C7.75792 12.5875 7.64643 12.4722 7.5772 12.3317C7.50798 12.1911 7.48449 12.0325 7.51004 11.8779C7.53559 11.7234 7.6089 11.5807 7.71967 11.4699C7.83044 11.3591 7.97311 11.2858 8.12767 11.2603C8.28222 11.2347 8.4409 11.2582 8.58143 11.3274C8.72195 11.3967 8.83728 11.5082 8.91121 11.6463C8.98515 11.7844 9.01398 11.9422 8.99366 12.0975C8.97222 12.2614 8.89723 12.4137 8.78033 12.5306C8.66343 12.6475 8.51118 12.7225 8.34726 12.7439ZM8.34726 8.99391C8.19193 9.01422 8.03414 8.98539 7.89603 8.91146C7.75792 8.83752 7.64643 8.7222 7.5772 8.58167C7.50798 8.44115 7.48449 8.28247 7.51004 8.12791C7.53559 7.97336 7.6089 7.83068 7.71967 7.71991C7.83044 7.60914 7.97311 7.53584 8.12767 7.51029C8.28222 7.48474 8.4409 7.50822 8.58143 7.57745C8.72195 7.64667 8.83728 7.75816 8.91121 7.89627C8.98515 8.03438 9.01398 8.19217 8.99366 8.3475C8.97222 8.51143 8.89723 8.66367 8.78033 8.78057C8.66343 8.89747 8.51118 8.97247 8.34726 8.99391ZM8.34726 5.24391C8.19193 5.26423 8.03414 5.23539 7.89603 5.16146C7.75792 5.08753 7.64643 4.9722 7.5772 4.83167C7.50798 4.69115 7.48449 4.53247 7.51004 4.37792C7.53559 4.22336 7.6089 4.08069 7.71967 3.96991C7.83044 3.85914 7.97311 3.78584 8.12767 3.76029C8.28222 3.73474 8.4409 3.75822 8.58143 3.82745C8.72195 3.89667 8.83728 4.00817 8.91121 4.14627C8.98515 4.28438 9.01398 4.44218 8.99366 4.59751C8.97222 4.76143 8.89723 4.91368 8.78033 5.03057C8.66343 5.14747 8.51118 5.22247 8.34726 5.24391ZM12.0973 20.2439C11.9419 20.2642 11.7841 20.2354 11.646 20.1615C11.5079 20.0875 11.3964 19.9722 11.3272 19.8317C11.258 19.6911 11.2345 19.5325 11.26 19.3779C11.2856 19.2234 11.3589 19.0807 11.4697 18.9699C11.5804 18.8591 11.7231 18.7858 11.8777 18.7603C12.0322 18.7347 12.1909 18.7582 12.3314 18.8274C12.472 18.8967 12.5873 19.0082 12.6612 19.1463C12.7351 19.2844 12.764 19.4422 12.7437 19.5975C12.7222 19.7614 12.6472 19.9137 12.5303 20.0306C12.4134 20.1475 12.2612 20.2225 12.0973 20.2439ZM12.0973 16.4939C11.9419 16.5142 11.7841 16.4854 11.646 16.4115C11.5079 16.3375 11.3964 16.2222 11.3272 16.0817C11.258 15.9411 11.2345 15.7825 11.26 15.6279C11.2856 15.4734 11.3589 15.3307 11.4697 15.2199C11.5804 15.1091 11.7231 15.0358 11.8777 15.0103C12.0322 14.9847 12.1909 15.0082 12.3314 15.0774C12.472 15.1467 12.5873 15.2582 12.6612 15.3963C12.7351 15.5344 12.764 15.6922 12.7437 15.8475C12.7222 16.0114 12.6472 16.1637 12.5303 16.2806C12.4134 16.3975 12.2612 16.4725 12.0973 16.4939ZM12.0973 12.7439C11.9419 12.7642 11.7841 12.7354 11.646 12.6615C11.5079 12.5875 11.3964 12.4722 11.3272 12.3317C11.258 12.1911 11.2345 12.0325 11.26 11.8779C11.2856 11.7234 11.3589 11.5807 11.4697 11.4699C11.5804 11.3591 11.7231 11.2858 11.8777 11.2603C12.0322 11.2347 12.1909 11.2582 12.3314 11.3274C12.472 11.3967 12.5873 11.5082 12.6612 11.6463C12.7351 11.7844 12.764 11.9422 12.7437 12.0975C12.7222 12.2614 12.6472 12.4137 12.5303 12.5306C12.4134 12.6475 12.2612 12.7225 12.0973 12.7439Z" fill="#111111"/>
                <path d="M12.5313 8.78092C12.8232 8.48895 12.822 8.01437 12.5286 7.72093C12.2352 7.42749 11.7606 7.4263 11.4686 7.71828C11.1766 8.01025 11.1778 8.48483 11.4713 8.77827C11.7647 9.07171 12.2393 9.0729 12.5313 8.78092Z" fill="#111111"/>
                <path d="M12.0973 5.24391C11.9419 5.26423 11.7841 5.23539 11.646 5.16146C11.5079 5.08753 11.3964 4.9722 11.3272 4.83167C11.258 4.69115 11.2345 4.53247 11.26 4.37792C11.2856 4.22336 11.3589 4.08069 11.4697 3.96991C11.5804 3.85914 11.7231 3.78584 11.8777 3.76029C12.0322 3.73474 12.1909 3.75822 12.3314 3.82745C12.472 3.89667 12.5873 4.00817 12.6612 4.14627C12.7351 4.28438 12.764 4.44218 12.7437 4.59751C12.7222 4.76143 12.6472 4.91368 12.5303 5.03057C12.4134 5.14747 12.2612 5.22247 12.0973 5.24391ZM18.7498 18.75C18.6014 18.75 18.4564 18.794 18.3331 18.8764C18.2097 18.9588 18.1136 19.0759 18.0569 19.213C18.0001 19.35 17.9852 19.5008 18.0142 19.6463C18.0431 19.7918 18.1145 19.9254 18.2194 20.0303C18.3243 20.1352 18.458 20.2066 18.6034 20.2356C18.7489 20.2645 18.8997 20.2497 19.0368 20.1929C19.1738 20.1361 19.291 20.04 19.3734 19.9167C19.4558 19.7933 19.4998 19.6483 19.4998 19.5C19.4998 19.3011 19.4207 19.1103 19.2801 18.9697C19.1394 18.829 18.9487 18.75 18.7498 18.75ZM18.7498 15C18.6014 15 18.4564 15.044 18.3331 15.1264C18.2097 15.2088 18.1136 15.3259 18.0569 15.463C18.0001 15.6 17.9852 15.7508 18.0142 15.8963C18.0431 16.0418 18.1145 16.1754 18.2194 16.2803C18.3243 16.3852 18.458 16.4567 18.6034 16.4856C18.7489 16.5145 18.8997 16.4997 19.0368 16.4429C19.1738 16.3861 19.291 16.29 19.3734 16.1667C19.4558 16.0433 19.4998 15.8983 19.4998 15.75C19.4998 15.5511 19.4207 15.3603 19.2801 15.2197C19.1394 15.079 18.9487 15 18.7498 15ZM18.7498 11.25C18.6014 11.25 18.4564 11.294 18.3331 11.3764C18.2097 11.4588 18.1136 11.5759 18.0569 11.713C18.0001 11.85 17.9852 12.0008 18.0142 12.1463C18.0431 12.2918 18.1145 12.4254 18.2194 12.5303C18.3243 12.6352 18.458 12.7067 18.6034 12.7356C18.7489 12.7645 18.8997 12.7497 19.0368 12.6929C19.1738 12.6361 19.291 12.54 19.3734 12.4167C19.4558 12.2933 19.4998 12.1483 19.4998 12C19.4998 11.8011 19.4207 11.6103 19.2801 11.4697C19.1394 11.329 18.9487 11.25 18.7498 11.25ZM15.7498 18.75C15.6014 18.75 15.4564 18.794 15.3331 18.8764C15.2097 18.9588 15.1136 19.0759 15.0569 19.213C15.0001 19.35 14.9852 19.5008 15.0142 19.6463C15.0431 19.7918 15.1145 19.9254 15.2194 20.0303C15.3243 20.1352 15.458 20.2066 15.6034 20.2356C15.7489 20.2645 15.8997 20.2497 16.0368 20.1929C16.1738 20.1361 16.291 20.04 16.3734 19.9167C16.4558 19.7933 16.4998 19.6483 16.4998 19.5C16.4998 19.3011 16.4207 19.1103 16.2801 18.9697C16.1394 18.829 15.9487 18.75 15.7498 18.75ZM15.7498 15C15.6014 15 15.4564 15.044 15.3331 15.1264C15.2097 15.2088 15.1136 15.3259 15.0569 15.463C15.0001 15.6 14.9852 15.7508 15.0142 15.8963C15.0431 16.0418 15.1145 16.1754 15.2194 16.2803C15.3243 16.3852 15.458 16.4567 15.6034 16.4856C15.7489 16.5145 15.8997 16.4997 16.0368 16.4429C16.1738 16.3861 16.291 16.29 16.3734 16.1667C16.4558 16.0433 16.4998 15.8983 16.4998 15.75C16.4998 15.5511 16.4207 15.3603 16.2801 15.2197C16.1394 15.079 15.9487 15 15.7498 15ZM15.7498 11.25C15.6014 11.25 15.4564 11.294 15.3331 11.3764C15.2097 11.4588 15.1136 11.5759 15.0569 11.713C15.0001 11.85 14.9852 12.0008 15.0142 12.1463C15.0431 12.2918 15.1145 12.4254 15.2194 12.5303C15.3243 12.6352 15.458 12.7067 15.6034 12.7356C15.7489 12.7645 15.8997 12.7497 16.0368 12.6929C16.1738 12.6361 16.291 12.54 16.3734 12.4167C16.4558 12.2933 16.4998 12.1483 16.4998 12C16.4998 11.8011 16.4207 11.6103 16.2801 11.4697C16.1394 11.329 15.9487 11.25 15.7498 11.25Z" fill="#111111"/>
              </svg>
              </div>
              <div class="addresss-ordering__body">
                <div class="addresss-ordering__main">${adress}, кв./офис ${flat}</div>
                <div class="addresss-ordering__comment">${entrance} подъезд, ${floor} этаж, домофон ${intercom}, «${comment}»</div>
              </div>
            </div>
            <div class="buyers-ordering__date date-ordering">
              <input data-datepicker type="text" id="date-ordering__input" class="date-ordering__input">
              <label for="date-ordering__input" class="date-ordering__label">
                <div class="date-ordering__body">
                  <div class="date-ordering__gray">Дата доставки</div>
                  <div class="date-ordering__black" data-date>Понедельник, 25 апреля</div>
                </div>
                <div class="date-ordering__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 3.75H4.5C3.25736 3.75 2.25 4.75736 2.25 6V19.5C2.25 20.7426 3.25736 21.75 4.5 21.75H19.5C20.7426 21.75 21.75 20.7426 21.75 19.5V6C21.75 4.75736 20.7426 3.75 19.5 3.75Z" stroke="#8E8E93" stroke-width="1.5" stroke-linejoin="round"/>
                    <path d="M13.875 12C14.4963 12 15 11.4963 15 10.875C15 10.2537 14.4963 9.75 13.875 9.75C13.2537 9.75 12.75 10.2537 12.75 10.875C12.75 11.4963 13.2537 12 13.875 12Z" fill="#8E8E93"/>
                    <path d="M17.625 12C18.2463 12 18.75 11.4963 18.75 10.875C18.75 10.2537 18.2463 9.75 17.625 9.75C17.0037 9.75 16.5 10.2537 16.5 10.875C16.5 11.4963 17.0037 12 17.625 12Z" fill="#8E8E93"/>
                    <path d="M13.875 15.75C14.4963 15.75 15 15.2463 15 14.625C15 14.0037 14.4963 13.5 13.875 13.5C13.2537 13.5 12.75 14.0037 12.75 14.625C12.75 15.2463 13.2537 15.75 13.875 15.75Z" fill="#8E8E93"/>
                    <path d="M17.625 15.75C18.2463 15.75 18.75 15.2463 18.75 14.625C18.75 14.0037 18.2463 13.5 17.625 13.5C17.0037 13.5 16.5 14.0037 16.5 14.625C16.5 15.2463 17.0037 15.75 17.625 15.75Z" fill="#8E8E93"/>
                    <path d="M6.375 15.75C6.99632 15.75 7.5 15.2463 7.5 14.625C7.5 14.0037 6.99632 13.5 6.375 13.5C5.75368 13.5 5.25 14.0037 5.25 14.625C5.25 15.2463 5.75368 15.75 6.375 15.75Z" fill="#8E8E93"/>
                    <path d="M10.125 15.75C10.7463 15.75 11.25 15.2463 11.25 14.625C11.25 14.0037 10.7463 13.5 10.125 13.5C9.50368 13.5 9 14.0037 9 14.625C9 15.2463 9.50368 15.75 10.125 15.75Z" fill="#8E8E93"/>
                    <path d="M6.375 19.5C6.99632 19.5 7.5 18.9963 7.5 18.375C7.5 17.7537 6.99632 17.25 6.375 17.25C5.75368 17.25 5.25 17.7537 5.25 18.375C5.25 18.9963 5.75368 19.5 6.375 19.5Z" fill="#8E8E93"/>
                    <path d="M10.125 19.5C10.7463 19.5 11.25 18.9963 11.25 18.375C11.25 17.7537 10.7463 17.25 10.125 17.25C9.50368 17.25 9 17.7537 9 18.375C9 18.9963 9.50368 19.5 10.125 19.5Z" fill="#8E8E93"/>
                    <path d="M13.875 19.5C14.4963 19.5 15 18.9963 15 18.375C15 17.7537 14.4963 17.25 13.875 17.25C13.2537 17.25 12.75 17.7537 12.75 18.375C12.75 18.9963 13.2537 19.5 13.875 19.5Z" fill="#8E8E93"/>
                    <path d="M18 2.25V3.75M6 2.25V3.75V2.25Z" stroke="#8E8E93" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21.75 7.5H2.25" stroke="#8E8E93" stroke-width="1.5" stroke-linejoin="round"/>
                  </svg>
                </div>
              </label>
            </div>
            <div class="buyers-ordering__time time-ordering">
              <div class="time-ordering__item">
                <input checked type="radio" name="time-ordering__radio" id="time-ordering__radio_1" class="time-ordering__radio">
                <label for="time-ordering__radio_1" class="time-ordering__label">10:00 - 12:00</label>
              </div>
              <div class="time-ordering__item">
                <input type="radio" name="time-ordering__radio" id="time-ordering__radio_2" class="time-ordering__radio">
                <label for="time-ordering__radio_2" class="time-ordering__label">12:00 - 14:00</label>
              </div>
              <div class="time-ordering__item">
                <input type="radio" name="time-ordering__radio" id="time-ordering__radio_3" class="time-ordering__radio">
                <label for="time-ordering__radio_3" class="time-ordering__label">14:00 - 16:00</label>
              </div>
              <div class="time-ordering__item">
                <input type="radio" name="time-ordering__radio" id="time-ordering__radio_4" class="time-ordering__radio">
                <label for="time-ordering__radio_4" class="time-ordering__label">16:00 - 18:00</label>
              </div>
            </div>
            <div class="buyers-ordering__comment comment-ordering">
              <input checked type="checkbox" id="comment-ordering__checkbox" class="comment-ordering__checkbox">
              <label for="comment-ordering__checkbox" class="comment-ordering__label">
                <div class="comment-ordering__head">
                  <div class="comment-ordering__switch">
                    <div class="comment-ordering__ball"></div>
                  </div>
                    <div class="comment-ordering__name">Комментарий к заказу</div>
                </div>
                  <textarea placeholder="Комментарий к заказу" class="comment-ordering__textarea"></textarea>
                </label>
            </div>
          </div>
        `
        }
      }
      customDatePickerInit();
      checkOrderingStatus();
    } else if (currentPopupElement.classList.contains('popupLegalface')) {
      const currentLegalfaceEl = currentPopupElement.querySelector('.popupAddress__radio:checked').parentElement;
      if (currentLegalfaceEl) {
        let companyname;
        let phone;
        let inn;
        let bik;
        let checkingacc;
        if (currentPopupElement.querySelector('[data-value="companyname"]')) {
          companyname = currentPopupElement.querySelector('[data-value="companyname"]').innerText;
        } else {
          companyname = '';
        }
        if (currentPopupElement.querySelector('[data-value="phone"]')) {
          phone = currentPopupElement.querySelector('[data-value="phone"]').innerText;
        } else {
          phone = '';
        }
        if (currentPopupElement.querySelector('[data-value="inn"]')) {
          inn = currentPopupElement.querySelector('[data-value="inn"]').innerText;
        } else {
          inn = '';
        }
        if (currentPopupElement.querySelector('[data-value="bik"]')) {
          bik = currentPopupElement.querySelector('[data-value="bik"]').innerText;
        } else {
          bik = '';
        }
        if (currentPopupElement.querySelector('[data-value="checkingacc"]')) {
          checkingacc = currentPopupElement.querySelector('[data-value="checkingacc"]').innerText;
        } else {
          checkingacc = '';
        }
        if (document.querySelector('[data-legalface]')) {
          document.querySelector('[data-legalface]').innerHTML = `
          <div class="buyers-ordering__head">
            <div class="buyers-ordering__title">Юридическое лицо</div>
            <a href="#" data-popup="#popupLegalface" class="buyers-ordering__edit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 10.5V19.125C18 19.3712 17.9515 19.615 17.8573 19.8425C17.763 20.07 17.6249 20.2767 17.4508 20.4508C17.2767 20.6249 17.07 20.763 16.8425 20.8573C16.615 20.9515 16.3712 21 16.125 21H4.875C4.37772 21 3.90081 20.8025 3.54917 20.4508C3.19754 20.0992 3 19.6223 3 19.125V7.875C3 7.37772 3.19754 6.90081 3.54917 6.54917C3.90081 6.19754 4.37772 6 4.875 6H12.7256" stroke="#2CA5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21.5597 2.49611C21.4912 2.42085 21.4082 2.36025 21.3156 2.31799C21.2231 2.27573 21.1229 2.25267 21.0211 2.25022C20.9194 2.24777 20.8182 2.26596 20.7237 2.30371C20.6292 2.34147 20.5434 2.39799 20.4713 2.46986L19.8915 3.04689C19.8212 3.11721 19.7817 3.21255 19.7817 3.31197C19.7817 3.41138 19.8212 3.50673 19.8915 3.57705L20.423 4.10767C20.4579 4.14268 20.4993 4.17046 20.5449 4.18941C20.5905 4.20837 20.6394 4.21812 20.6888 4.21812C20.7382 4.21812 20.7871 4.20837 20.8327 4.18941C20.8783 4.17046 20.9197 4.14268 20.9546 4.10767L21.5199 3.54517C21.8058 3.2597 21.8326 2.7947 21.5597 2.49611ZM18.7191 4.21877L10.2572 12.6656C10.2059 12.7167 10.1686 12.7802 10.149 12.8499L9.75756 14.0156C9.74818 14.0473 9.74752 14.0809 9.75564 14.1128C9.76375 14.1448 9.78035 14.174 9.80368 14.1973C9.82701 14.2207 9.85621 14.2373 9.88818 14.2454C9.92016 14.2535 9.95374 14.2528 9.98537 14.2435L11.1502 13.8521C11.2199 13.8324 11.2833 13.7951 11.3344 13.7438L19.7813 5.28095C19.8595 5.20197 19.9033 5.09535 19.9033 4.98423C19.9033 4.87312 19.8595 4.7665 19.7813 4.68752L19.3149 4.21877C19.2358 4.1399 19.1287 4.09562 19.017 4.09562C18.9053 4.09562 18.7982 4.1399 18.7191 4.21877Z" fill="#2CA5F5"/>
            </svg>
              <span>Изменить</span>
            </a>
          </div>
          <div class="buyers-ordering__body">
            <div class="buyers-ordering__legal legal-ordering">
              <div class="legal-ordering__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.25 6H3.75C2.50736 6 1.5 7.00736 1.5 8.25V18.75C1.5 19.9926 2.50736 21 3.75 21H20.25C21.4926 21 22.5 19.9926 22.5 18.75V8.25C22.5 7.00736 21.4926 6 20.25 6Z" stroke="#111111" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M15 11.25V12.375C15 12.4745 14.9605 12.5698 14.8902 12.6402C14.8198 12.7105 14.7245 12.75 14.625 12.75H9.375C9.27554 12.75 9.18016 12.7105 9.10983 12.6402C9.03951 12.5698 9 12.4745 9 12.375V11.25M6.75 6V4.5C6.75 4.10218 6.90804 3.72064 7.18934 3.43934C7.47064 3.15804 7.85218 3 8.25 3H15.75C16.1478 3 16.5294 3.15804 16.8107 3.43934C17.092 3.72064 17.25 4.10218 17.25 4.5V6H6.75ZM22.5 11.25H1.5H22.5Z" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </div>
              <div class="legal-ordering__body">
                <div class="legal-ordering__name">${companyname}</div>
                <div class="legal-ordering__number">${phone}</div>
              </div>
            </div>
            <div class="buyers-ordering__requisites requisites-ordering">
              <div class="requisites-ordering__row _gray">ИНН ${inn}</div>
              <div class="requisites-ordering__row _gray">БИК ${bik}</div>
              <div class="requisites-ordering__row _gray">Р.сч ${checkingacc}</div>
            </div>
          </div>
          `
        }
      }
      checkOrderingStatus();
    }
  })

  orderingAdresses.forEach(e => {
    e.addEventListener('change', () => {
      orderingAdresses.forEach(el => {
        if (el.checked) {
          el.parentElement.classList.add('popupAddress__item_active');
        } else {
          el.parentElement.classList.remove('popupAddress__item_active');
        }
      })
    })
  })

}

function checkOrderingStatus() {
  const orderingCart = document.querySelector('.ordering-cart');
  if (orderingCart) {
    const buyersAdress = document.querySelector('[data-adress]');
    const buyersLegalface = document.querySelector('[data-legalface]');
    if ((buyersAdress && buyersAdress.offsetHeight > 0 && buyersAdress.querySelector('.buyers-ordering__link')) || (buyersLegalface && buyersLegalface.offsetHeight > 0 && buyersLegalface.querySelector('.buyers-ordering__link'))) {
      orderingCart.classList.add('ordering-cart_error');
    } else {
      orderingCart.classList.remove('ordering-cart_error');
    }
  }
}

function findActions() {

  if (findRegions && findCities) {
    findCities.forEach(findCity => {
      findRegions.forEach(e => {
        if (e.id === findCity.region_id) {
          findCity.regionTitle = e.title;
        }
      })
    })
  }

    let findMap;
    let findObjects = {
      type: 'FeatureCollection',
      features: []
    }
  document.addEventListener('selectCallback', (e) => {
    const select = e.detail.select;
    const originalSelect = e.detail.originalSelect;
    findObjectConstructor();
    if ('selectRegion' in originalSelect.dataset) {
      selectCityHide(select, originalSelect);
    }
    setRegionCenter(select, originalSelect);
    
  });
  if (document.querySelectorAll('[data-find-checkbox]').length) {
    document.querySelectorAll('[data-find-checkbox]').forEach(e => {
      e.addEventListener('change', findObjectConstructor)
    });
  }

    try {
      ymaps.ready(init);
    } catch (err) {
      console.error(err)
    }

    let findObjectManager;

    function init() {
        // Создание экземпляра карты и его привязка к контейнеру с
        findMap = new ymaps.Map('find__map', {
            // При инициализации карты обязательно нужно указать
            // её центр и коэффициент масштабирования.
            center: [55.010251, 82.958437],
            zoom: 3
        }, {
            searchControlProvider: 'yandex#search',
        });
      findObjectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32,
            clusterDisableClickZoom: false,
      });
      findObjectManager.clusters.options.set('preset', 'islands#invertedGreenClusterIcons');
      findObjectManager.clusters.events.add('add', function (e) {
          var cluster = findObjectManager.clusters.getById(e.get('objectId')),
      
          objects = cluster.properties.geoObjects;
          cluster.options.clusterIcons = [{
              href: `img/icons/map_pin.svg`,
              size: [40, 40],
              offset: [-20, -20]
          }];
      });
      findObjectManager.objects.events.add(['balloonclose', 'balloonopen'], function (e) {
        var objectId = e.get('objectId');
        if (e.get('type') == 'balloonopen') {
            // Метод setObjectOptions позволяет задавать опции объекта "на лету".
            findObjectManager.objects.setObjectOptions(objectId, {
              iconImageHref: 'img/icons/map_object_active.svg',
            });
        } else {
            findObjectManager.objects.setObjectOptions(objectId, {
              iconImageHref: 'img/icons/map_object.svg',
            });
        }
      });
      // if (window.innerWidth <= 767) {
      //   findObjectManager.objects.options.set({
      //     balloonPanelMaxMapArea: 'Infinity'
      //   })
      // }
      findMap.geoObjects.add(findObjectManager);
      findObjectConstructor();
    }
  
  function findObjectsAdd() {

        // Создание макета балуна на основе Twitter Bootstrap.
      let MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
        `
            <div class="popover top" style="min-width: 320px; max-width: 320px">
              <div class="find-baloon baloon-find">
                <a class="close" href="#">&times;</a>
                <div class="arrow"></div>
                <div class="popover-inner">
                  $[[options.contentLayout observeSize minWidth=296 maxWidth=296 panelMaxMapArea=767 maxHeight=350]]
                </div>
              </div>
            </div>
            ` , {
        /**
         * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
         * @function
         * @name build
         */
        build: function () {
          this.constructor.superclass.build.call(this);

          this._$element = $('.popover', this.getParentElement());

          this.applyElementOffset();

          this._$element.find('.close')
            .on('click', $.proxy(this.onCloseClick, this));
        },

        /**
         * Удаляет содержимое макета из DOM.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
         * @function
         * @name clear
         */
        clear: function () {
          this._$element.find('.close')
            .off('click');

          this.constructor.superclass.clear.call(this);
        },

        /**
         * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name onSublayoutSizeChange
         */
        onSublayoutSizeChange: function () {
          MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

          if (!this._isElement(this._$element)) {
            return;
          }

          this.applyElementOffset();

          this.events.fire('shapechange');
        },

        /**
         * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name applyElementOffset
         */
        applyElementOffset: function () {
          this._$element.css({
            left: -(this._$element[0].offsetWidth / 2),
            top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
          });
        },

        /**
         * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name onCloseClick
         */
        onCloseClick: function (e) {
          e.preventDefault();

          this.events.fire('userclose');
        },

        /**
         * Используется для автопозиционирования (balloonAutoPan).
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
         * @function
         * @name getClientBounds
         * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
         */
        getShape: function () {
          if (!this._isElement(this._$element)) {
            return MyBalloonLayout.superclass.getShape.call(this);
          }

          var position = this._$element.position();

          return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
            [position.left, position.top], [
              position.left + this._$element[0].offsetWidth,
              position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
            ]
          ]));
        },

        /**
         * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
         * @function
         * @private
         * @name _isElement
         * @param {jQuery} [element] Элемент.
         * @returns {Boolean} Флаг наличия.
         */
        _isElement: function (element) {
          return element && element[0] && element.find('.arrow')[0];
        }
      });
      
    let MyBalloonContentLayout;

        // Создание вложенного макета содержимого балуна.
    if (document.querySelector('.find_dealers')) {
      MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
        `
        <div class="baloon-find__find">
          <div class="baloon-find__head">
              <div class="baloon-find__title">$[properties.title]</div>
          </div>
          <div class="baloon-find__body">
              <div class="baloon-find__location">
                  <span class="baloon-find__city">г. $[properties.city]</span>, 
                  <span class="baloon-find__address">$[properties.address]</span>
              </div>
              <button class="baloon-find__copy">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.8984 5H7.22656C5.99687 5 5 5.99687 5 7.22656V15.8984C5 17.1281 5.99687 18.125 7.22656 18.125H15.8984C17.1281 18.125 18.125 17.1281 18.125 15.8984V7.22656C18.125 5.99687 17.1281 5 15.8984 5Z" stroke="#8E8E93" stroke-linejoin="round"/>
                      <path d="M14.9805 5L15 4.0625C14.9984 3.48285 14.7674 2.9274 14.3575 2.51753C13.9476 2.10765 13.3922 1.87665 12.8125 1.875H4.375C3.71256 1.87696 3.07781 2.14098 2.6094 2.6094C2.14098 3.07781 1.87696 3.71256 1.875 4.375V12.8125C1.87665 13.3922 2.10765 13.9476 2.51753 14.3575C2.9274 14.7674 3.48285 14.9984 4.0625 15H5" stroke="#8E8E93" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </button>
          </div>
          <a href="tel:$[properties.phone]" class="baloon-find__link">$[properties.phone]</a>
        </div>
            `
      );
    } else {
      MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
        `
        <div class="baloon-find__find">
          <div class="baloon-find__head">
              <div class="baloon-find__type">$[properties.type]</div>
              <div class="baloon-find__title">$[properties.title]</div>
          </div>
          <div class="baloon-find__body">
              <div class="baloon-find__location">
                  <span class="baloon-find__city">г. $[properties.city]</span>, 
                  <span class="baloon-find__address">$[properties.address]</span>
              </div>
              <button class="baloon-find__copy">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.8984 5H7.22656C5.99687 5 5 5.99687 5 7.22656V15.8984C5 17.1281 5.99687 18.125 7.22656 18.125H15.8984C17.1281 18.125 18.125 17.1281 18.125 15.8984V7.22656C18.125 5.99687 17.1281 5 15.8984 5Z" stroke="#8E8E93" stroke-linejoin="round"/>
                      <path d="M14.9805 5L15 4.0625C14.9984 3.48285 14.7674 2.9274 14.3575 2.51753C13.9476 2.10765 13.3922 1.87665 12.8125 1.875H4.375C3.71256 1.87696 3.07781 2.14098 2.6094 2.6094C2.14098 3.07781 1.87696 3.71256 1.875 4.375V12.8125C1.87665 13.3922 2.10765 13.9476 2.51753 14.3575C2.9274 14.7674 3.48285 14.9984 4.0625 15H5" stroke="#8E8E93" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </button>
          </div>
          <a href="tel:$[properties.phone]" class="baloon-find__link">$[properties.phone]</a>
        </div>
            `
      );
    }

      findObjectManager.removeAll();
      findObjectManager.add(findObjects);
      
      findObjectManager.objects.options.set({
        balloonShadow: false,
        balloonLayout: MyBalloonLayout,
        balloonContentLayout: MyBalloonContentLayout,
        hideIconOnBalloonOpen: false,
        iconLayout: 'default#image',
        iconImageHref: 'img/icons/map_object.svg',
        iconImageSize: [24, 24],
        iconImageOffset: [-12, -12]
      });
    
    function setBalloonPanelMaxMapArea(x) {
      if (x.matches) { 
        findObjectManager.objects.options.set({
          balloonPanelMaxMapArea: 'Infinity'
        })
      } else {
        findObjectManager.objects.options.set({
          balloonPanelMaxMapArea: 0
        })
      }
    }

    setBalloonPanelMaxMapArea(x);
    x.addListener(function (e) {
      setBalloonPanelMaxMapArea(x);
    });

    mapCopyClick()
  }

  function mapCopyClick() {
    document.addEventListener('click', (e)=>{
      let target = e.target;
      if (target.classList.contains('baloon-find__copy') || target.closest('.baloon-find__copy')) {
        let text = '';
        let baloon = target.closest('.baloon-find__find');
        // text += baloon.querySelector('.baloon-find__type').textContent + '\n';
        // text += baloon.querySelector('.baloon-find__title').textContent + '\n';
        // text += baloon.querySelector('.baloon-find__location').textContent + '\n';
        text += baloon.querySelector('.baloon-find__link').textContent;
        copyTextToClipboard(text);
      }
    })
    
  }

  function findObjectConstructor() {
    let findFeatureArr = [];
    findClinics.forEach(findClinic => {
      let city;
      let region;
      findCities.forEach(e => {
        if (e.id === findClinic.city_id) {
          city = e.title;
          region = e.regionTitle;
        }
      })
      findRegions.forEach(e => {
        if (e.id === findClinic.city_id) {
          city = e.title;
        }
      })
      let findFeature = {
        type: 'Feature',
        id: findClinic.id,
        geometry: {
          type: "Point",
          coordinates: [findClinic.lat, findClinic.lng]
        },
        properties: {
          id: findClinic.id ? findClinic.id : '',
          title: findClinic.title ? findClinic.title : '',
          address: findClinic.address ? findClinic.address : '',
          phone: findClinic.phone ? findClinic.phone : '',
          url: findClinic.url ? findClinic.url : '',
          type: findClinic.type ? findClinic.type: '',
          city: city ? city: '',
          region: region ? region : '',
          email: findClinic.email ? findClinic.email : '',
          postindex: findClinic.postindex ? findClinic.postindex : ''
        }
      };
      findCheck(findFeature, findFeatureArr)
    });
    findObjects.features = findFeatureArr;
    findObjectsAdd();

    const findDealers = document.querySelector('.find_dealers');
    findDealers ? findDealersTableRender(findDealers, findFeatureArr) : null
  }

  function findCheck(findFeature, findFeatureArr) {
    const checkedBoxes = document.querySelectorAll('[data-find-checkbox]:checked');
    const regionElement = document.querySelector('.select_region .select__value .select__content');
    const cityElement = document.querySelector('.select_city .select__value .select__content');
    if (checkedBoxes.length) {
      checkedBoxes.forEach(checkedBox => {
        let findType = checkedBox.dataset.findCheckbox;
        if (findFeature.properties.type === findType) {
          findFeatureArr.push(findFeature);
        }
      })
    } else {
      document.querySelector('.find_dealers') ? findFeatureArr.push(findFeature) : null
    }
    for (let i = 0; i < findFeatureArr.length; i++) {
      let findFeature = findFeatureArr[i];
      if (!regionElement.classList.contains('selectRegionAll')) {
        if (findFeature.properties.region !== regionElement.textContent) {
          findFeatureArr.splice(i, 1);
        }
      }
      if (!cityElement.classList.contains('selectCityAll')) {
        if (findFeature.properties.city !== cityElement.textContent) {
          findFeatureArr.splice(i, 1);
        }
      }
    }
    return findFeatureArr;
  }
  
  function selectCityHide(select, originalSelect) {
    const findCitySelectOptions = document.querySelectorAll('.select_city .select__option');
    document.querySelector('.select_city').classList.add('_edit');
    let findRegion = select.querySelector('span.select__content');
    if (!findRegion.classList.contains('selectRegionAll')) {
      document.querySelector('.select_city .select__title .select__content').click();
      document.querySelector('.select_city .select__options .selectCityAll').click();
      document.querySelector('.select_city._select-open').classList.remove('_select-open');
      document.querySelector('.select_city .select__options').hidden = true;
      let findRegionId = null;
      findRegions.forEach(region => {
        if (findRegion.textContent === region.title) {
          findRegionId = region.id
        }
      })
      let wrongCities = [];
      findCities.forEach(city => {
        if (city.region_id !== findRegionId) {
          wrongCities.push(city.title)
        }
      })
      findCitySelectOptions.forEach(findCitySelectOption => {
        findCitySelectOption.hidden = false;
        findCitySelectOption.style = '';
      })
      wrongCities.forEach(wrongCity => {
        findCitySelectOptions.forEach(findCitySelectOption => {
          if (!findCitySelectOption.classList.contains('selectCityAll')) {
            if (findCitySelectOption.textContent === wrongCity) {
              findCitySelectOption.hidden = true;
              findCitySelectOption.style.display = 'none';
            }
          }
        })
      })
    } else {
      findCitySelectOptions.forEach(findCitySelectOption => {
        findCitySelectOption.hidden = false;
        findCitySelectOption.style = '';
      })
    }
    setTimeout(() => {
      document.querySelector('.select_city').classList.remove('_edit');
    }, 1000);
  }

  function setRegionCenter(select, originalSelect) {
    if (!select.classList.contains('_edit')) {
      let region = select.querySelector('.select__content');
      if (region.classList.contains('selectRegionAll') || region.classList.contains('selectCityAll')) {
        findMap.setCenter([55.010251, 82.958437], 3, {duration: 700});
      } else {
        let options = originalSelect.querySelectorAll('[data-center]')
        if (options.length) {
          options.forEach(option => {
            if (option.textContent === region.textContent) {
              let center = option.dataset.center.replaceAll(' ', '').split(',');
              let zoom = option.dataset.zoom;
              findMap.setCenter(center, zoom, {duration: 700});
            }
          })
        }
      }
    }
  }

  let mapMedia = window.matchMedia("(max-width: 767px)");
  mapHideShowListener(mapMedia);
  mapMedia.addListener(mapHideShowListener)
  function mapHideShowListener() {
    if (mapMedia.matches) {
      if (document.documentElement.classList.contains('find-map-open')) {
        bodyLock();
      }
      const mapShowButton = document.querySelector('.search-find__button');
      const mapHideButton = document.querySelector('.map-find__back');
      mapShowButton.addEventListener('click', (e)=>{
        e.preventDefault();
        document.documentElement.classList.add('find-map-open');
        bodyLockToggle();
      });
      mapHideButton.addEventListener('click', (e)=>{
        document.documentElement.classList.remove('find-map-open');
        bodyLockToggle();
      });
    } else {
      bodyUnlock();
    }
  }

  function findDealersTableRender(findDealers, findFeatureArr) {
    let findDealerRow = `
                  <div class="list-dealers__row list-dealers__row_first">
                    <div class="list-dealers__item list-dealers__item_country">Страна</div>
                    <div class="list-dealers__item list-dealers__item_name">Диллеры</div>
                    <div class="list-dealers__item list-dealers__item_adress">Адрес</div>
                    <div class="list-dealers__item list-dealers__item_phone">Телефон</div>
                    <div class="list-dealers__item list-dealers__item_email">Email</div>
                  </div>
                  `;
    findFeatureArr.forEach(findFeature => {
      let obj = findFeature.properties;
      let region ='';
      let title ='';
      let city ='';
      let phone ='';
      let email = '';
      let address = '';
      let postindex = '';
      region = obj.region ? obj.region : '';
      title = obj.title ? obj.title : '';
      title = obj.title ? obj.title : '';
      city = obj.city ? obj.city : '';
      address = obj.address ? obj.address : '';
      postindex = obj.postindex ? `${obj.postindex}, ` : '';

      if (obj.phone.indexOf(',') !== -1) {
        obj.phone.split(', ', '; ').forEach(e => {
          let link = `<a href="tel:${e.trim()}">${e.trim()}</a>`;
          phone += link;
        })
      } else {
        phone = `<a href="tel:${obj.phone.trim()}">${obj.phone.trim()}</a>`
      }

      if (obj.email.indexOf(',') !== -1) {
        obj.email.split(', ').forEach(e => {
          let link = `<a href="tel:${e.trim()}">${e.trim()}</a>`;
          email += link;
        })
      } else {
        email = `<a href="mailto:${obj.email.trim()}">${obj.email.trim()}</a>`
      }
      let str = `
                  <div class="list-dealers__row">
                    <div class="list-dealers__item list-dealers__item_country">${region}</div>
                    <div class="list-dealers__item list-dealers__item_name">${title}</div>
                    <div class="list-dealers__item list-dealers__item_adress">${postindex}г. ${city}, ${address}</div>
                    <div class="list-dealers__item list-dealers__item_phone">${phone}</div>
                    <div class="list-dealers__item list-dealers__item_email">${email}</div>
                  </div>
      `;
      findDealerRow += str;
    })
    document.querySelector('[data-dealers-table]').innerHTML = findDealerRow;
    findDealersHeightSet(document.querySelector('.list-dealers__body'), document.querySelector('[data-dealers-table]'));
  }
  function findDealersHeightSet(tableParent, table) {
    const height = table.scrollHeight;
    const maxHeight = window.innerWidth >= 767 ? 444 : 600;
    tableParent.style.height = '0px';
    if (height < maxHeight) {
      tableParent.style.height = `${height}px`;
    } else {
      tableParent.style.height = `${maxHeight}px`;
      tableParent.style.overflow = ``
    }
  }
}

function contactsActions() {
  const contactsMaps = document.querySelectorAll('[data-contacts-map]');
  if (contactsMaps.length) {
    ymaps.ready(init)
  }

  function init() {
    contactsMaps.forEach(contactsMapItem => {
      let contactsMap = null;
      let center = contactsMapItem.dataset.center.replaceAll(' ', '').split(',');
          // Создание экземпляра карты и его привязка к контейнеру с
          contactsMap = new ymaps.Map(contactsMapItem, {
              // При инициализации карты обязательно нужно указать
              // её центр и коэффициент масштабирования.
              center: center,
              zoom: 12,
              controls: [],
          }, {
          });
      let myPlacemark = new ymaps.Placemark(center, {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/contacts_map_pin.png',
        iconImageSize: [32, 32],
        iconImageOffset: [-16, -16]
      });
      contactsMap.geoObjects.add(myPlacemark);
      contactsMap.behaviors.disable('drag');
      contactsMap.behaviors.disable('scrollZoom');
      contactsMapItem.addEventListener('click', () => {
        window.open(`https://yandex.ru/maps/?rtext=~${center[0]}%2C${center[1]}`, '_blank');
      })
      })
    }
}

function configuratorActions(configuratorEl) {
  const toothSwitcher = configuratorEl.querySelector('[data-switch-tooth]');
  let toothItems = configuratorEl.querySelectorAll(`[data-tooth]`);
  if (toothSwitcher && toothItems) {
    toothSwitchCheck()
    toothSwitcher.addEventListener('change', toothSwitchCheck)
  }

  function toothSwitchCheck() {
    if (toothSwitcher.checked) {
      toothItems.forEach(el=>{
        if (el.getAttribute('data-tooth') == 'all') {
          el.classList.add('item-stepConfigurator__tooth_hidden');
        } else {
          el.classList.remove('item-stepConfigurator__tooth_hidden');
          el.querySelectorAll('input[type="checkbox"]').forEach(e=>{
            if (!e.closest('[data-tippy-content]') && !e.closest('.tooth-stepConfigurator__item_disabled')) {
              e.checked = false;
            }
          })
        }
      })
    } else {
      toothItems.forEach(el=>{
        if (el.getAttribute('data-tooth') == 'all') {
          el.classList.remove('item-stepConfigurator__tooth_hidden');
          el.querySelectorAll('input[type="checkbox"]').forEach(e=>{
            if (!e.closest('[data-tippy-content]') && !e.closest('.tooth-stepConfigurator__item_disabled')) {
              e.checked = false;
            }
          })
        } else {
          el.classList.add('item-stepConfigurator__tooth_hidden')
        }
      })
    }
  }

  
  let options = {};

  const configuratorTork = document.querySelector('[data-step="tork"]');
  if (configuratorTork) {
    options = {
      jawsAttribute: 'data-jaw',
      btnsAttribute: 'data-teeth-button',
      toothAttribute: 'data-tooth',
      toothParentAttribute: 'data-tooth-parent',
      teethDataset: 'data-teeth',
      torkAttribute: 'data-tork',
      torkParentAttribute: 'data-tork-parent',
      torksDataset: 'data-torks',
      greyTextAttribute: 'data-grey-text',
      unavTextAttribute: 'data-unavaiable-text',
      tippyAttribute: 'data-tippy-content',
      timeOutDataset: 'data-timeout'
    };
    toothItems = configuratorEl.querySelectorAll(`${options.toothAttribute}`);
    configuratorTorkActions(configuratorTork, options)
  }
  const configuratorBias = document.querySelector('[data-step="bias"]');
  if (configuratorBias) {
    options = {
      jawsAttribute: 'data-jaw',
      btnsAttribute: 'data-teeth-button',
      toothAttribute: 'data-tooth',
      toothParentAttribute: 'data-tooth-parent',
      teethDataset: 'data-teeth',
      torkAttribute: 'data-bias',
      torkParentAttribute: 'data-bias-parent',
      torksDataset: 'data-biases',
      greyTextAttribute: 'data-grey-text',
      unavTextAttribute: 'data-unavaiable-text',
      tippyAttribute: 'data-tippy-content',
      timeOutDataset: 'data-timeout'
    };
    toothItems = configuratorEl.querySelectorAll(`${options.toothAttribute}`);
    configuratorTorkActions(configuratorBias, options);
  }
  
  const configuratorHook = document.querySelector('[data-step="hook"]');
  if (configuratorHook) {
    options = {
      jawsAttribute: 'data-jaw',
      btnsAttribute: 'data-teeth-button',
      toothAttribute: 'data-tooth',
      toothParentAttribute: 'data-tooth-parent',
      teethDataset: 'data-teeth',
      torkAttribute: 'data-hook',
      torkParentAttribute: 'data-hook-parent',
      torksDataset: 'data-hooks',
      greyTextAttribute: 'data-grey-text',
      unavTextAttribute: 'data-unavaiable-text',
      tippyAttribute: 'data-tippy-content',
      timeOutDataset: 'data-timeout'
    };
    toothItems = configuratorEl.querySelectorAll(`${options.toothAttribute}`);
    configuratorTorkActions(configuratorHook, options);
  }
  const configuratorTube = document.querySelector('[data-step="tubes"]');
  if (configuratorTube) {
    options = {
      jawsAttribute: 'data-jaw',
      btnsAttribute: 'data-teeth-button',
      toothAttribute: 'data-tooth',
      toothParentAttribute: 'data-tooth-parent',
      teethDataset: 'data-teeth',
      torkAttribute: 'data-tube',
      torkParentAttribute: 'data-tubes-parent',
      torksDataset: 'data-tubes',
      greyTextAttribute: 'data-grey-text',
      unavTextAttribute: 'data-unavaiable-text',
      tippyAttribute: 'data-tippy-content',
      imageAttribute: 'data-image',
      tippyParentAttribute: 'data-tippy',
      timeOutDataset: 'data-timeout'
    };
    toothItems = configuratorEl.querySelectorAll(`${options.toothAttribute}`);
    configuratorTubesActions(configuratorTube, options);
  }
  configuratorBiasActions();
  function configuratorTorkActions(configuratorTork, options) {

    let teethArr = [];
    let jaws = configuratorTork.querySelectorAll(`[${options.jawsAttribute}]`);
    let buttons = configuratorTork.querySelectorAll(`[${options.btnsAttribute}]`);

    if (configuratorTork.querySelectorAll(`[${options.toothAttribute}]`).length) {
      configuratorTork.querySelectorAll(`[${options.toothAttribute}]`).forEach(e=>{
        e.disabled === false ? teethArr.push(e) : null;
      })
    } else {
      alert(`Зубы не найдены (атрибут ${options.toothAttribute} на каждом зубе)`);
      return;
    }

    const torks =configuratorTork.querySelectorAll(`[${options.torkAttribute}]`);
    if (torks.length) {
      torksActions(torks)
      checkTorks(torks)
    } else {
      alert(`Торки не найдены (атрибут ${options.torkAttribute} на каждом торке)`);
      return
    }

    if (buttons.length) {
      configuratorTorkButtons(buttons)
    }

    if (teethArr.length) {
      teethArr.forEach(tooth=>{
        tooth.addEventListener('change', ()=>{
          if (torks.length) {
            checkTorks(torks)
          }
        })
      })
    }

    function torksActions(torks = configuratorTork.querySelectorAll(`[${options.torkAttribute}]`)) {
      torks.forEach(tork=>{
        let torkParent = tork.closest(`[${options.torkParentAttribute}]`);
        torkParent.addEventListener('mouseenter', (e)=>{
          const checkedTeeth = configuratorTork.querySelectorAll(`[${options.toothAttribute}]:checked`);
          if (!checkedTeeth.length) {
            torkParent.querySelector('label').classList.add('_pen');
            configuratorTork.querySelector(`[${options.greyTextAttribute}]`).hidden = false;
          } else {
            checkOneTork(torkParent, tork, checkedTeeth, false);
            checkTorks(torks)
          }
        });
        torkParent.addEventListener('mouseleave', (e)=>{
          let timeout = parseInt(configuratorTork.querySelector(`[${options.timeOutDataset}]`).getAttribute(options.timeOutDataset)) * 1000
          setTimeout(() => {
            configuratorTork.querySelector(`[${options.greyTextAttribute}]`).hidden = true;
            configuratorTork.querySelector(`[${options.unavTextAttribute}]`).hidden = true;
          }, timeout);

          torkParent.querySelector('label').classList.remove('_pen');
          checkTorks(torks)
        })
        tork.addEventListener('change', ()=>{
          const checkedTeeth = configuratorTork.querySelectorAll(`[${options.toothAttribute}]:checked`);
          if (checkedTeeth.length) {
            checkOneTork(torkParent, tork, checkedTeeth, true);
            checkTorks(torks)
          }
        })
      })
    }

    function checkOneTork(torkParent, tork, checkedTeeth, check = false) {
      torkParent.querySelector('label').classList.remove('_pen');
      configuratorTork.querySelector(`[${options.greyTextAttribute}]`).hidden = true;
      const torkTeeth = tork.getAttribute(`${options.teethDataset}`);
      const torkName = torkParent.querySelector('label span').innerText;
      const torkImageSrc = torkParent.querySelector('label img').getAttribute('src');
      let unavArr = [];

      checkedTeeth.forEach(tooth=>{
        const hiddenInput = tooth.closest(`[${options.toothParentAttribute}]`).querySelector('input[type="hidden"]');
        const toothNumber = tooth.getAttribute(`${options.toothAttribute}`);
        const toothLabel = tooth.closest(`[${options.toothParentAttribute}]`).querySelector('label');
        if (torkTeeth !== 'all') {
          if (torkTeeth.replaceAll(' ', '').indexOf(toothNumber.replaceAll(' ', '')) !== -1) {
            if (toothLabel) {
              toothLabel.querySelector(`[${options.tippyAttribute}]`).setAttribute(`${options.tippyAttribute}`, torkName);
              toothLabel.querySelector(`[${options.tippyAttribute}] img`).setAttribute('src', torkImageSrc);
              flsModules.tippy.forEach(e=>{
                e._tippy.destroy()
              })
              tippyInit();
              if (check === true) {
                tooth.checked = false;
                hiddenInput.value = tork.getAttribute(`${options.torkAttribute}`);
              }
            }
          } else {
            unavArr.push(toothNumber)
            unavArr = Array.from(new Set(unavArr))
          }
        } else {
          if (toothLabel) {
            toothLabel.querySelector(`[${options.tippyAttribute}]`).setAttribute(`${options.tippyAttribute}`, torkName);
            toothLabel.querySelector(`[${options.tippyAttribute}] img`).setAttribute('src', torkImageSrc);
            flsModules.tippy.forEach(e=>{
              e._tippy.destroy()
            })
            tippyInit();
            if (check === true) {
              tooth.checked = false;
              hiddenInput.value = tork.getAttribute(`${options.torkAttribute}`);
            }
          }
        }
        if (unavArr.length) {
          configuratorTork.querySelectorAll(`[${options.unavTextAttribute}] span`).forEach(e=>{
            e.innerHTML = unavArr.join(', ');
          });
          configuratorTork.querySelector(`[${options.unavTextAttribute}]`).hidden = false;
        }
      })
    }

    function configuratorTorkButtons(buttons) {
      buttons.forEach(button=>{
        button.addEventListener('click', (e)=>{
          e.preventDefault();
          let buttonKind = button.getAttribute(`${options.btnsAttribute}`);
          if (buttonKind === 'all') {
            if (teethArr.length === configuratorTork.querySelectorAll(`[${options.toothAttribute}]:checked`).length) {
              teethArr.forEach(el=>{
                el.checked = false;
              })
            } else {
              teethArr.forEach(el=>{
                el.checked = true;
              })
            }
          } else {
            jaws.forEach(e=>{
              const jawKind = e.getAttribute(`${options.jawsAttribute}`);
              e.querySelectorAll(`[${options.toothAttribute}]`).forEach(tooth => {
                if (!tooth.disabled) {
                  tooth.checked = false;
                }
              })
              if (jawKind === buttonKind) {
                e.querySelectorAll(`[${options.toothAttribute}]`).forEach(tooth => {
                  if (!tooth.disabled) {
                    tooth.checked = true;
                  }
                })
              } 
            })
          }
          checkTorks()
        })
      })
    }

    function checkTorks(torks = configuratorTork.querySelectorAll(`[${options.torkAttribute}]`)) {
      const checkedTeeth =configuratorTork.querySelectorAll(`[${options.toothAttribute}]:checked`);
      if (checkedTeeth.length) {
        torks.forEach(tork=>{
          tork.closest(`[${options.torkParentAttribute}]`).hidden = true;
        })
        checkedTeeth.forEach(tooth=>{
          let toothTorks = tooth.getAttribute(`${options.torksDataset}`);
          torks.forEach(tork=>{
            let torkName = tork.getAttribute(`${options.torkAttribute}`);
            if (toothTorks.replaceAll(' ', '').toUpperCase().indexOf(torkName.replaceAll(' ', '').toUpperCase()) !== -1) {
              tork.closest(`[${options.torkParentAttribute}]`).hidden = false;
            }
          })
        })
      } else {
        torks.forEach(tork=>{
          tork.closest(`[${options.torkParentAttribute}]`).hidden = false;
        })
      }
    }
  }

//========================================================================================================================================================

  function configuratorTubesActions(configuratorTork, options) {
    let teethArr = [];
    let index = 1;
    let jaws = configuratorTork.querySelectorAll(`[${options.jawsAttribute}]`);
    let buttons = configuratorTork.querySelectorAll(`[${options.btnsAttribute}]`);

    if (configuratorTork.querySelectorAll(`[${options.toothAttribute}]`).length) {
      configuratorTork.querySelectorAll(`[${options.toothAttribute}]`).forEach(e=>{
        e.disabled === false ? teethArr.push(e) : null;
      })
    } else {
      alert(`Зубы не найдены (атрибут ${options.toothAttribute} на каждом зубе)`);
      return;
    }

    const tubes = configuratorTork.querySelectorAll(`button[${options.torkAttribute}]`);
    if (tubes.length) {
      tubesActions(tubes)
      checkTorks(tubes)
    } else {
      alert(`Трубки не найдены (атрибут ${options.torkAttribute} на каждой трубке)`);
      return
    }

    if (buttons.length) {
      configuratorTorkButtons(buttons)
    }

    if (teethArr.length) {
      teethArr.forEach(tooth=>{
        tooth.addEventListener('change', ()=>{
          if (tubes.length) {
            tubesActions();
            checkTorks()
          }
        })
      })
    }

    
    function configuratorTorkButtons(buttons) {
      buttons.forEach(button=>{
        button.addEventListener('click', (e)=>{
          e.preventDefault();
          let buttonKind = button.getAttribute(`${options.btnsAttribute}`);
          if (buttonKind === 'all') {
            if (teethArr.length === configuratorTork.querySelectorAll(`[${options.toothAttribute}]:checked`).length) {
              teethArr.forEach(el=>{
                el.checked = false;
              })
            } else {
              teethArr.forEach(el=>{
                el.checked = true;
              })
            }
          } else {
            jaws.forEach(e=>{
              const jawKind = e.getAttribute(`${options.jawsAttribute}`);
              e.querySelectorAll(`[${options.toothAttribute}]`).forEach(tooth => {
                if (!tooth.disabled) {
                  tooth.checked = false;
                }
              })
              if (jawKind === buttonKind) {
                e.querySelectorAll(`[${options.toothAttribute}]`).forEach(tooth => {
                  if (!tooth.disabled) {
                    tooth.checked = true;
                  }
                })
              } 
            })
          }
          tubesActions();
          checkTorks();
        })
      })
    }

    function tubesActions() {
      const tubesParent = document.querySelector(`[${options.torkParentAttribute}]`);
      const checkedTeeth = document.querySelectorAll(`[${options.toothAttribute}]:checked`);
      if (checkedTeeth.length) {
        if (index <= 1) {
          configuratorTork.querySelector(`.select__title .select__content`).innerHTML = configuratorTork.querySelector('.select__option._select-selected').innerHTML;
        }
        tubesParent.classList.remove('_pen');
        const timeout = document.querySelector(`[${options.timeOutDataset}]`) ? parseInt(document.querySelector(`[${options.timeOutDataset}]`).getAttribute(`${options.timeOutDataset}`)) * 1000 : 3000;
        setTimeout(() => {
          configuratorTork.querySelector(`[${options.greyTextAttribute}]`).hidden = true;
        }, timeout);
        tubes.forEach(tube=>{
          tube.addEventListener('mouseenter', (e)=>{
            tube.insertAdjacentHTML('beforeend', `
            <span class="option-unavaiable"></span>
            `)
            checkOneTork(tubesParent, tube, checkedTeeth, false, e);
            checkTorks();
          })
          tube.addEventListener('mouseleave', ()=>{
            let timeout = parseInt(configuratorTork.querySelector(`[${options.timeOutDataset}]`).getAttribute(options.timeOutDataset)) * 1000
            setTimeout(() => {
              configuratorTork.querySelector(`[${options.greyTextAttribute}]`).hidden = true;
              configuratorTork.querySelector(`[${options.unavTextAttribute}]`).hidden = true;
            }, timeout);
            tube.querySelector('.option-unavaiable') ? tube.querySelector('.option-unavaiable').remove() : null;
            checkTorks();
          })
          tube.addEventListener('click', (e)=>{
            e.preventDefault();
            tube.querySelector('.option-unavaiable') ? tube.querySelector('.option-unavaiable').remove() : null;
            checkOneTork(tubesParent, tube, checkedTeeth, true, e);
            checkTorks();
          })
        })
      } else {
        configuratorTork.querySelector(`[${options.greyTextAttribute}]`).hidden = false;
        if (index <= 1) {
          configuratorTork.querySelector(`.select__title .select__content`).innerHTML = 'Зубы не выбраны';
        }
        tubesParent.classList.add('_pen');
        checkTorks()
      }
    }

    
    function checkOneTork(torkParent, tube, checkedTeeth, check = false, e) {
      configuratorTork.querySelector(`[${options.greyTextAttribute}]`).hidden = true;
      const tubeTeeth = tube.getAttribute(`${options.teethDataset}`);
      const tubeTippy = tube.getAttribute(`${options.tippyParentAttribute}`);
      const tubeImage = tube.getAttribute(`${options.imageAttribute}`);
      let unavArr = [];
      const checkedTeethh = document.querySelectorAll(`[${options.toothAttribute}]:checked`);

      checkedTeethh.forEach(tooth=>{
        const hiddenInput = tooth.closest(`[${options.toothParentAttribute}]`).querySelector('input[type="hidden"]');
        const toothNumber = tooth.getAttribute(`${options.toothAttribute}`);
        const toothLabel = tooth.closest(`[${options.toothParentAttribute}]`).querySelector('label');
        if (tubeTeeth !== 'all') {
          if (tubeTeeth.replaceAll(' ', '').indexOf(toothNumber.replaceAll(' ', '')) !== -1) {
            if (toothLabel) {
              toothLabel.querySelector(`[${options.tippyAttribute}]`).setAttribute(`${options.tippyAttribute}`, tubeTippy);
              toothLabel.querySelector(`[${options.tippyAttribute}] img`).setAttribute('src', tubeImage);
              flsModules.tippy.forEach(e=>{
                e._tippy.destroy()
              })
              tippyInit();
              if (check === true) {
                tooth.checked = false;
                hiddenInput.value = tube.getAttribute(`${options.torkAttribute}`);
                tubesActions();
                // document.documentElement.click();
                index++;
              }
            }
          } else {
            unavArr.push(toothNumber)
            unavArr = Array.from(new Set(unavArr))
          }
        } else {
          if (toothLabel) {
            toothLabel.querySelector(`[${options.tippyAttribute}]`).setAttribute(`${options.tippyAttribute}`, tubeTippy);
            toothLabel.querySelector(`[${options.tippyAttribute}] img`).setAttribute('src', tubeImage);
            flsModules.tippy.forEach(e=>{
              e._tippy.destroy()
            })
            tippyInit();
            if (check === true) {
              tooth.checked = false;
              hiddenInput.value = tube.getAttribute(`${options.torkAttribute}`);
              tubesActions()
              // document.documentElement.click();
              index++;
            }
          }
        }
        if (unavArr.length) {
          configuratorTork.querySelectorAll(`[${options.unavTextAttribute}] span`).forEach(e=>{
            e.innerHTML = unavArr.join(', ');
          });
          if (e.type === 'mouseenter' && !isMobile.any()) {
            tube.querySelector('.option-unavaiable').innerHTML = `Недоступно для ${unavArr.join(', ')} зубов`
          }
          configuratorTork.querySelector(`[${options.unavTextAttribute}]`).hidden = false;
        }
      })
    }

    
    function checkTorks(torks = configuratorTork.querySelectorAll(`button[${options.torkAttribute}]`)) {
      const checkedTeeth =configuratorTork.querySelectorAll(`[${options.toothAttribute}]:checked`);
      if (checkedTeeth.length) {
        torks.forEach(tork=>{
          tork.hidden = true;
        })
        checkedTeeth.forEach(tooth=>{
          let toothTorks = tooth.getAttribute(`${options.torksDataset}`);
          torks.forEach(tork=>{
            let torkName = tork.getAttribute(`${options.torkAttribute}`);
            if (toothTorks.replaceAll(' ', '').indexOf(torkName.replaceAll(' ', '')) !== -1) {
              tork.hidden = false;
            }
          })
        })
      } else {
        torks.forEach(tork=>{
          tork.hidden = false;
        })
      }
    }
  }
//========================================================================================================================================================
  function configuratorBiasActions() {
    const biasCheckboxes =document.querySelectorAll('.teeth-torkConfigurator__checkbox');
    if (biasCheckboxes.length) {
      x.addListener(function(e) {
        biasCheckboxes.forEach(biasCheckbox=>{
          if (biasCheckbox.disabled && x.matches) {
            biasCheckbox.closest('[data-tooth-parent]').hidden = true;
          } else {
            biasCheckbox.closest('[data-tooth-parent]').hidden = false;
          }
        })
      })
      biasCheckboxes.forEach(biasCheckbox=>{
        if (biasCheckbox.disabled && x.matches) {
          biasCheckbox.closest('[data-tooth-parent]').hidden = true;
        } else {
          biasCheckbox.closest('[data-tooth-parent]').hidden = false;
        }
      })
    }
    stepsLineScroll(x);
    x.addListener(function(e) {
      stepsLineScroll(x);
    })
    function stepsLineScroll(x) {
      const targetBlock = document.querySelector('.stepsline');
      const targetBlockElement = document.querySelector('.stepsline_item.active');
      if (targetBlock && targetBlockElement) {
        let headerItem = '';
        let offsetLeft = targetBlockElement.offsetLeft;
        let options = {
          speedAsDuration: false,
          speed: 500,
          header: headerItem,
          offset: offsetLeft,
          easing: 'easeOutQuad',
        };
        if (x.matches) {
          if (typeof SmoothScroll !== 'undefined') {
            new SmoothScroll().animateScroll(targetBlockElement, '', options);
          } else {
            let targetBlockElementPosition = (targetBlockElement.getBoundingClientRect().left + scrollY - (window.innerWidth / 2) + (targetBlockElement.offsetWidth / 2));
            targetBlock.scrollTo({
              left: targetBlockElementPosition,
              behavior: "smooth"
            });
          }
        }
      }
    }

    const allFilltersBtn = document.querySelector('.js-allfilters');
    if (allFilltersBtn) {
      $(document).on('afterShow.fb', function( e, instance, slide ) {
        slide.$slide[0].classList.add('fancybox-slide--allfilters');
        bodyLock();
        filtersCrutch(x);
        filtersCheckedCount();
        const filtersChecboxes = document.querySelectorAll('.fancybox-slide input[type="checkbox"]');
        if (filtersChecboxes.length) {
          filtersChecboxes.forEach(e=>{
            e.addEventListener('change', ()=>{
              filtersCheckedCount()
            })
          })
        }
      });
      $(document).on('beforeClose.fb', function( e, instance, slide ) {
        bodyUnlock();
      });
    }

    function filtersCrutch(x) {
      const filtersItemTitles =document.querySelectorAll('.filters_item_title');
      if (filtersItemTitles.length && x.matches) {
        filtersItemTitles.forEach(filtersItemTitle=>{
          !filtersItemTitle.classList.contains('opened') ? filtersItemTitle.click() : null;
        })
      }
    }
    function filtersCheckedCount() {
      const checkedBoxes =document.querySelectorAll('.fancybox-slide input:checked');
      const count = document.querySelector('.fancybox-slide .filters-count span');
      const countOut = document.querySelector('.filtersButton__body .counter');
      count.innerHTML = checkedBoxes.length;
      countOut.innerHTML = checkedBoxes.length;
    }
  }
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