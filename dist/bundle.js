/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/firebase.js":
/*!*****************************!*\
  !*** ./src/app/firebase.js ***!
  \*****************************/
/***/ ((module) => {

eval("const cons = 'hello world from firebase module';\r\nmodule.exports = {cons}\n\n//# sourceURL=webpack://book-store/./src/app/firebase.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/firebase */ \"./src/app/firebase.js\");\n/* harmony import */ var _app_firebase__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_app_firebase__WEBPACK_IMPORTED_MODULE_0__);\n//import e from \"express\";\r\n\r\n//import { button } from \"./app/getbooks\" \r\nconsole.log('from bindel.js');\r\nconsole.log('from compiled with live reloding devserver');\r\n\r\nconst themeSwitch = document.getElementById('darkThemeToggle');\r\nconst root = document.querySelector(':root');\r\nlet darkTheme = localStorage.getItem(\"darkTheme\")\r\nconst enableDarkTheme = () => {\r\n    document.body.classList.add(\"darkTheme\");\r\n    localStorage.setItem('darkTheme', 'enabled');\r\n}\r\nconst disableDarkTheme = () => {\r\n    document.body.classList.remove(\"darkTheme\");\r\n    localStorage.setItem('darkTheme', null);\r\n}\r\n\r\nif (darkTheme === \"enabled\") {\r\n    enableDarkTheme();\r\n    themeSwitch.innerHTML = \"<ion-icon name='sunny-outline'></ion-icon>\"\r\n} else {\r\n    themeSwitch.innerHTML = \"<ion-icon name='moon-outline'></ion-icon>\"\r\n}\r\n\r\nthemeSwitch.addEventListener('click', () => {\r\n    darkTheme = localStorage.getItem(\"darkTheme\");\r\n    if (darkTheme !== 'enabled') {\r\n        enableDarkTheme();\r\n        themeSwitch.innerHTML = \"<ion-icon name='sunny-outline'></ion-icon>\"\r\n    } else if (darkTheme !== null) {\r\n        disableDarkTheme();\r\n        themeSwitch.innerHTML = \"<ion-icon name='moon-outline'></ion-icon>\"\r\n    }\r\n})\r\n\r\n\r\nconst signUpBtn = document.getElementById('signUp');\r\nconst logInBtn = document.getElementById('logIn');\r\nconst signUpForm = document.getElementById('si-form-section');\r\nconst logInForm = document.getElementById('lo-form-section');\r\nconst closeBtn = document.getElementsByClassName('form__close');\r\n\r\nsignUpBtn.addEventListener('click', (e) => {\r\n    e.preventDefault();\r\n    signUpForm.classList.remove('hide-form');\r\n    signUpForm.classList.add('show-form');\r\n})\r\n\r\nlogInBtn.addEventListener('click', (e) => {\r\n    e.preventDefault();\r\n    logInForm.classList.remove('hide-form');\r\n    logInForm.classList.add('show-form');\r\n})\r\n\r\nfor (let i = 0; i < closeBtn.length; i++) {\r\n    closeBtn[i].addEventListener('click', () => {\r\n        logInForm.classList.remove('show-form');\r\n        logInForm.classList.add('hide-form');\r\n        signUpForm.classList.remove('show-form');\r\n        signUpForm.classList.add('hide-form');\r\n    })\r\n}\n\n//# sourceURL=webpack://book-store/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;