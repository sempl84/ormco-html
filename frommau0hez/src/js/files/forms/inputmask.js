/* Маски для полей (в работе) */

// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей
import { flsModules } from "../modules.js";

// Подключение модуля
import "inputmask/dist/inputmask.min.js";

export function inputmaslFirstInit() {
	const inputMasks = document.querySelectorAll('[data-inputmask]');
	if (inputMasks.length) {
		flsModules.inputmask = Inputmask({
      positionCaretOnClick: 'none',
    }).mask(inputMasks);
	}
}
inputmaslFirstInit();
