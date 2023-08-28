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

/***/ "./src/reactivity.ts":
/*!***************************!*\
  !*** ./src/reactivity.ts ***!
  \***************************/
/***/ (() => {

eval("var functionCal = null;\nvar testObj = makeSubScribe({\n    testA: 1,\n    testB: 2\n});\nconsole.log(testObj.testA);\nvar subScribe = function (fn) {\n    functionCal = fn;\n    fn();\n    functionCal = null;\n};\nsubScribe(function () {\n    console.log('testObj.testA', testObj.testA);\n});\n//  (prevValue === prevValue || newValue === newValue) проверка на NaN\nvar isChanged = function (prevValue, newValue) {\n    return prevValue !== newValue && (prevValue === prevValue || newValue === newValue);\n};\nfunction makeSubScribe(obj) {\n    return Object.entries(obj).reduce(function (acc, _a) {\n        var key = _a[0], val = _a[1];\n        var value = val;\n        var deps = new Set();\n        Object.defineProperty(acc, key, {\n            get: function () {\n                if (functionCal && !deps.has(functionCal))\n                    deps.add(functionCal);\n                return value;\n            },\n            set: function (newValue) {\n                if (isChanged(val, newValue)) {\n                    value = newValue;\n                    //  @ts-ignore\n                    deps.forEach(function (f) { return f(); });\n                }\n            },\n            enumerable: true,\n        });\n        return acc;\n    }, {});\n}\n\n\n//# sourceURL=webpack:///./src/reactivity.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/reactivity.ts"]();
/******/ 	
/******/ })()
;