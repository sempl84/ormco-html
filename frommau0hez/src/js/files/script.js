// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
import { _slideUp } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
import '../libs/datepicker-full.min.js'
// import '@scss/libs/datepicker.scss';


const iframes = document.querySelectorAll('iframe');
if (iframes.length) {
  iframes.forEach(e => {
    e.loading = 'lazy';
  });
}
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
    window.addEventListener('scroll', () => {
      if (window.innerWidth < 767 && window.scrollY > 650 && document.querySelector('.page_model')) {
        shortModel.hidden = false;
      } else if (document.querySelector('.page_model')) {
        shortModel.hidden = true;
      }
    })
  }

  const cartElement = document.querySelector('.cart');
  if (cartElement && document.querySelector('.page_cart')) {
    cartActions(cartElement);
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
    cartElement.querySelector('.ordering-cart__span').innerHTML = cartProducts.length;
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
        cartTotalPriceShortEl.innerHTML = cartTotalPrice.toLocaleString() + ` ₽`;
      } else {
        cartTotalPriceShortEl.innerHTML = cartTotalPrice + ` ₽`;
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


function customDatePickerInit(datePickers) {
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
        input.value = date.toLocaleDateString();
        input.parentElement.querySelector('[data-date]').innerHTML = value;
      }
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