(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define("giraffe", ["vue"], factory);
	else if(typeof exports === 'object')
		exports["giraffe"] = factory(require("vue"));
	else
		root["giraffe"] = factory(root["Vue"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(8)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-undefined */

var throttle = __webpack_require__(14);

/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param  {Number}   delay         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}  [atBegin]     Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 * @param  {Function} callback      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                  to `callback` when the debounced-function is executed.
 *
 * @return {Function} A new, debounced function.
 */
module.exports = function ( delay, atBegin, callback ) {
	return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/button/button.vue
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//

/* harmony default export */ var button_button = ({
  name: "YButton",
  props: {
    buttonType: {
      default: "button",
      validator: function validator(value) {
        return ["button", "submit", "reset"].indexOf(value) >= 0;
      }
    },
    icon: String,
    type: {
      default: "default",
      validator: function validator(value) {
        return ["danger", "spirit", "assist", "gray", "link", "default", "plain"].indexOf(value) >= 0;
      }
    },
    disabled: Boolean,
    medium: { type: Boolean, default: false },
    mini: { type: Boolean, default: false },
    large: { type: Boolean, default: false }
  },
  computed: {
    classes: function classes() {
      var _ref;

      return ["k-button", (_ref = {}, _defineProperty(_ref, "k-button-" + this.type, !!this.type), _defineProperty(_ref, "is-mini", !!this.mini), _defineProperty(_ref, "is-medium", !!this.medium), _defineProperty(_ref, "is-large", !!this.large), _ref)];
    }
  },
  methods: {
    click: function click(e) {
      this.$emit('click', e);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-657a0adb","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/button/button.vue
var button_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('button', { class: _vm.classes, attrs: { "type": _vm.buttonType, "disabled": _vm.disabled }, on: { "click": _vm.click } }, [_vm.icon ? _c('i', { class: _vm.icon }) : _vm._e(), _vm._v(" "), _c('span', [_vm._t("default")], 2)]);
};
var staticRenderFns = [];
var esExports = { render: button_render, staticRenderFns: staticRenderFns };
/* harmony default export */ var selectortype_template_index_0_packages_button_button = (esExports);
// CONCATENATED MODULE: ./packages/button/button.vue
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  button_button,
  selectortype_template_index_0_packages_button_button,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var packages_button_button = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/button/buttonGroup.vue
//
//
//
//
//

/* harmony default export */ var buttonGroup = ({
  name: "YButtonGroup",
  props: {
    mini: Boolean,
    circle: Boolean
  },
  data: function data() {
    return {};
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-356d8341","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/button/buttonGroup.vue
var buttonGroup_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: ['k-btn-group', _vm.mini ? 'k-btn-group-mini' : '', _vm.circle ? 'k-btn-group-circle' : ''] }, [_vm._t("default")], 2);
};
var buttonGroup_staticRenderFns = [];
var buttonGroup_esExports = { render: buttonGroup_render, staticRenderFns: buttonGroup_staticRenderFns };
/* harmony default export */ var button_buttonGroup = (buttonGroup_esExports);
// CONCATENATED MODULE: ./packages/button/buttonGroup.vue
var buttonGroup_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var buttonGroup___vue_template_functional__ = false
/* styles */
var buttonGroup___vue_styles__ = null
/* scopeId */
var buttonGroup___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var buttonGroup___vue_module_identifier__ = null
var buttonGroup_Component = buttonGroup_normalizeComponent(
  buttonGroup,
  button_buttonGroup,
  buttonGroup___vue_template_functional__,
  buttonGroup___vue_styles__,
  buttonGroup___vue_scopeId__,
  buttonGroup___vue_module_identifier__
)

/* harmony default export */ var packages_button_buttonGroup = (buttonGroup_Component.exports);

// CONCATENATED MODULE: ./packages/button/index.js




// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/breadcrumb/breadcrumb.vue
//
//
//
//
//

/* harmony default export */ var breadcrumb = ({
    name: 'YBreadcrumb'
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-35cec00a","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/breadcrumb/breadcrumb.vue
var breadcrumb_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "k-breadcrumb" }, [_vm._t("default")], 2);
};
var breadcrumb_staticRenderFns = [];
var breadcrumb_esExports = { render: breadcrumb_render, staticRenderFns: breadcrumb_staticRenderFns };
/* harmony default export */ var breadcrumb_breadcrumb = (breadcrumb_esExports);
// CONCATENATED MODULE: ./packages/breadcrumb/breadcrumb.vue
var breadcrumb_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var breadcrumb___vue_template_functional__ = false
/* styles */
var breadcrumb___vue_styles__ = null
/* scopeId */
var breadcrumb___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var breadcrumb___vue_module_identifier__ = null
var breadcrumb_Component = breadcrumb_normalizeComponent(
  breadcrumb,
  breadcrumb_breadcrumb,
  breadcrumb___vue_template_functional__,
  breadcrumb___vue_styles__,
  breadcrumb___vue_scopeId__,
  breadcrumb___vue_module_identifier__
)

/* harmony default export */ var packages_breadcrumb_breadcrumb = (breadcrumb_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/breadcrumb/breadcrumbItem.vue
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var breadcrumbItem = ({
  name: 'YBreadcrumbItem',
  props: {
    separator: { type: String, default: '>' },
    to: String,
    replace: Boolean
  },
  methods: {
    toPath: function toPath() {
      this.to && this.replace ? this.$router.replace({ path: this.replace }) : this.$router.push({ path: this.to });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-c188ddd2","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/breadcrumb/breadcrumbItem.vue
var breadcrumbItem_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { staticClass: "k-breadcrumb-item" }, [_c('span', { class: ['k-breadcrumb-link', _vm.to ? 'is-link' : ''], on: { "click": _vm.toPath } }, [_vm._t("default")], 2), _vm._v(" "), _c('span', { staticClass: "k-breadcrumb-separator" }, [_vm._v(_vm._s(_vm.separator))])]);
};
var breadcrumbItem_staticRenderFns = [];
var breadcrumbItem_esExports = { render: breadcrumbItem_render, staticRenderFns: breadcrumbItem_staticRenderFns };
/* harmony default export */ var breadcrumb_breadcrumbItem = (breadcrumbItem_esExports);
// CONCATENATED MODULE: ./packages/breadcrumb/breadcrumbItem.vue
var breadcrumbItem_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var breadcrumbItem___vue_template_functional__ = false
/* styles */
var breadcrumbItem___vue_styles__ = null
/* scopeId */
var breadcrumbItem___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var breadcrumbItem___vue_module_identifier__ = null
var breadcrumbItem_Component = breadcrumbItem_normalizeComponent(
  breadcrumbItem,
  breadcrumb_breadcrumbItem,
  breadcrumbItem___vue_template_functional__,
  breadcrumbItem___vue_styles__,
  breadcrumbItem___vue_scopeId__,
  breadcrumbItem___vue_module_identifier__
)

/* harmony default export */ var packages_breadcrumb_breadcrumbItem = (breadcrumbItem_Component.exports);

// CONCATENATED MODULE: ./packages/breadcrumb/index.js



// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/page/src/page.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var page = ({
  name: 'YPagination',
  data: function data() {
    return {
      current: this.currentPage,
      options: [{ value: 10 }, { value: 50 }, { value: 100 }],
      jumpTos: this.jumpTo,
      page_size: this.pageSize,
      show: false
    };
  },

  props: {
    total: { // 数据总条数
      type: Number,
      default: 0
    },
    pageSize: { // 每页显示条数
      type: Number,
      default: 10
    },
    currentPage: { // 当前页码
      type: [Number, String],
      default: 1
    },
    jumpTo: { // 跳转到
      type: Number,
      default: 1
    },
    pagegroup: { // 分页条数
      type: Number,
      default: 5,
      coerce: function coerce(v) {
        v = v > 0 ? v : 5;
        return v % 2 === 1 ? v : v + 1;
      }
    }
  },
  computed: {
    page: function page() {
      // 总页数
      return Math.ceil(this.total / this.page_size);
    },
    grouplist: function grouplist() {
      // 获取分页页码
      var len = this.page,
          temp = [],
          list = [],
          count = Math.floor(this.pagegroup / 2),
          center = this.current;
      if (len <= this.pagegroup) {
        while (len--) {
          temp.push({
            text: this.page - len,
            val: this.page - len
          });
        }
        ;
        return temp;
      }
      while (len--) {
        temp.push(this.page - len);
      }
      ;
      var idx = temp.indexOf(center);
      idx < count && (center = center + count - idx);
      this.current > this.page - count && (center = this.page - count);
      temp = temp.splice(center - count - 1, this.pagegroup);
      do {
        var t = temp.shift();
        list.push({
          text: t,
          val: t
        });
      } while (temp.length);
      if (this.page > this.pagegroup) {
        this.current > count + 1 && list.unshift({
          text: '...',
          val: list[0].val - 1
        });
        this.current < this.page - count && list.push({
          text: '...',
          val: list[list.length - 1].val + 1
        });
      }
      return list;
    }
  },
  methods: {
    setCurrent: function setCurrent(idx, index) {
      //设置当前的页码
      if (this.current != idx && idx > 0 && idx < this.page + 1) {
        this.current = idx - 0;
        this.$emit('pagechangeparent', [this.current, this.page_size]);
      } else if (idx < 0 || idx > this.page) {
        this.current = 1;
        this.jumpTos = this.current;
        this.$emit('pagechangeparent', [this.current, this.page_size]);
      } else if (String(idx).indexOf(".") > -1) {
        this.current = Math.ceil(idx);
        this.jumpTos = this.current;
        this.$emit('pagechangeparent', [this.current, this.page_size]);
      } else {
        this.current = 1;
        this.jumpTos = this.current;
        this.$emit('pagechangeparent', [this.current, this.page_size]);
      }
      this.show = false;
    },
    showPages: function showPages(index) {
      var pageNum = this.$refs.pagenumSelect[index].innerText;
      this.page_size = pageNum;
      this.current = 1;
      this.show = false;
      this.$emit('pagechangeparent', [this.current, this.page_size]);
    },
    pageIndex: function pageIndex(value) {
      this.current = value;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5c224e6a","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/page/src/page.vue
var page_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('nav', { staticClass: "pagination-box" }, [_c('ul', { staticClass: "pagination" }, [_c('li', { staticClass: "pageNum page-item" }, [_vm._v("\n      共 " + _vm._s(_vm.total) + " 条记录 每页显示\n      "), _c('div', { staticClass: "page-display" }, [_c('span', { staticClass: "select-icon", class: { 'icon-tri-up': _vm.show, 'icon-tri-down': !_vm.show } }), _vm._v(" "), _c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.page_size, expression: "page_size" }], staticClass: "select-num", attrs: { "readonly": "readonly" }, domProps: { "value": _vm.page_size }, on: { "click": function click($event) {
        _vm.show = !_vm.show;
      }, "input": function input($event) {
        if ($event.target.composing) {
          return;
        }_vm.page_size = $event.target.value;
      } } }), _vm._v(" "), _c('transition', { attrs: { "name": "fade" } }, [_vm.show ? _c('ul', { staticClass: "display-select" }, _vm._l(_vm.options, function (option, index) {
    return _c('li', { ref: "pagenumSelect", refInFor: true, on: { "click": function click($event) {
          _vm.showPages(index);
        } } }, [_vm._v(_vm._s(option.value) + "\n            ")]);
  })) : _vm._e()])], 1), _vm._v("\n      条记录\n    ")]), _vm._v(" "), _c('li', { staticClass: "page-item", class: { 'disabled': _vm.current == 1 } }, [_c('a', { staticClass: "prve", attrs: { "href": "javascript:;" }, on: { "click": function click($event) {
        _vm.setCurrent(_vm.current - 1, 1);
      } } }, [_vm._v("上一页 ")])]), _vm._v(" "), _c('li', { staticClass: "page-item", class: { 'disabled': _vm.current == 1 } }, [_c('a', { staticClass: "start", attrs: { "href": "javascript:;" }, on: { "click": function click($event) {
        _vm.setCurrent(1, 1);
      } } }, [_vm._v(" 首页 ")])]), _vm._v(" "), _vm._l(_vm.grouplist, function (p) {
    return _c('li', { staticClass: "page-item", class: { 'active': _vm.current == p.val } }, [_c('a', { staticClass: "page", attrs: { "href": "javascript:;" }, on: { "click": function click($event) {
          _vm.setCurrent(p.val, 1);
        } } }, [_vm._v(" " + _vm._s(p.text) + " ")])]);
  }), _vm._v(" "), _c('li', { staticClass: "page-item", class: { 'disabled': _vm.current == _vm.page } }, [_c('a', { staticClass: "end", attrs: { "href": "javascript:;" }, on: { "click": function click($event) {
        _vm.setCurrent(_vm.page, 1);
      } } }, [_vm._v(" 尾页 ")])]), _vm._v(" "), _c('li', { staticClass: "page-item", class: { 'disabled': _vm.current == _vm.page } }, [_c('a', { staticClass: "next", attrs: { "href": "javascript:;" }, on: { "click": function click($event) {
        _vm.setCurrent(_vm.current + 1, 1);
      } } }, [_vm._v(" 下一页")])]), _vm._v(" "), _c('li', { staticClass: "jump-cont page-item" }, [_vm._v("\n      跳至"), _c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.jumpTos, expression: "jumpTos" }], staticClass: "jump-page", attrs: { "type": "text" }, domProps: { "value": _vm.jumpTos }, on: { "input": function input($event) {
        if ($event.target.composing) {
          return;
        }_vm.jumpTos = $event.target.value;
      } } }), _vm._v("页\n      "), _c('a', { staticClass: "jump-to", on: { "click": function click($event) {
        _vm.setCurrent(_vm.jumpTos, 2);
      } } }, [_vm._v("确定")])])], 2)]);
};
var page_staticRenderFns = [];
var page_esExports = { render: page_render, staticRenderFns: page_staticRenderFns };
/* harmony default export */ var src_page = (page_esExports);
// CONCATENATED MODULE: ./packages/page/src/page.vue
var page_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var page___vue_template_functional__ = false
/* styles */
var page___vue_styles__ = null
/* scopeId */
var page___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var page___vue_module_identifier__ = null
var page_Component = page_normalizeComponent(
  page,
  src_page,
  page___vue_template_functional__,
  page___vue_styles__,
  page___vue_scopeId__,
  page___vue_module_identifier__
)

/* harmony default export */ var page_src_page = (page_Component.exports);

// CONCATENATED MODULE: ./packages/page/index.js


page_src_page.install = function (Vue) {
  Vue.component(page_src_page.name, page_src_page);
};

/* harmony default export */ var packages_page = (page_src_page);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/progress/src/progress.vue
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var progress = ({
  name: "YProgress",
  props: {
    percent: {
      type: Number,
      default: 0,
      required: true,
      validator: function validator(val) {
        return val >= 0 && val <= 100;
      }
    },
    status: {
      type: Boolean,
      default: true
    }

  },
  computed: {
    strokeWidth: function strokeWidth() {
      return this.percent + '%';
    }
  }

});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3ae60bb0","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/progress/src/progress.vue
var progress_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "progress" }, [_c('div', { staticClass: "progress_outer" }, [_c('div', { staticClass: "progress_in", style: { width: _vm.strokeWidth } })]), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.status, expression: "status" }], staticClass: "percent" }, [_c('span', [_vm._v(_vm._s(_vm.percent))]), _vm._v("%\n  ")])]);
};
var progress_staticRenderFns = [];
var progress_esExports = { render: progress_render, staticRenderFns: progress_staticRenderFns };
/* harmony default export */ var src_progress = (progress_esExports);
// CONCATENATED MODULE: ./packages/progress/src/progress.vue
var progress_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var progress___vue_template_functional__ = false
/* styles */
var progress___vue_styles__ = null
/* scopeId */
var progress___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var progress___vue_module_identifier__ = null
var progress_Component = progress_normalizeComponent(
  progress,
  src_progress,
  progress___vue_template_functional__,
  progress___vue_styles__,
  progress___vue_scopeId__,
  progress___vue_module_identifier__
)

/* harmony default export */ var progress_src_progress = (progress_Component.exports);

// CONCATENATED MODULE: ./packages/progress/index.js
/**
 * @author monkeywang
 * Date: 17/11/9
 */


progress_src_progress.install = function (Vue) {
  Vue.component(progress_src_progress.name, progress_src_progress);
};

/* harmony default export */ var packages_progress = (progress_src_progress);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/icon/icon.vue
//
//
//

/* harmony default export */ var icon = ({
  name: "Icon",
  props: {
    type: String,
    size: [String, Number],
    color: [String]
  },
  computed: {
    classes: function classes() {
      return "" + this.type;
    },
    styles: function styles() {
      var style = {};
      if (this.size) {
        style["font-size"] = this.size + "px";
      }
      if (this.color) {
        style.color = this.color;
      }
      return style;
    }
  },
  methods: {
    click: function click(e) {
      this.$emit('click', e);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-afd44db8","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/icon/icon.vue
var icon_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('i', { class: _vm.classes, style: _vm.styles, on: { "click": _vm.click } });
};
var icon_staticRenderFns = [];
var icon_esExports = { render: icon_render, staticRenderFns: icon_staticRenderFns };
/* harmony default export */ var icon_icon = (icon_esExports);
// CONCATENATED MODULE: ./packages/icon/icon.vue
var icon_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var icon___vue_template_functional__ = false
/* styles */
var icon___vue_styles__ = null
/* scopeId */
var icon___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var icon___vue_module_identifier__ = null
var icon_Component = icon_normalizeComponent(
  icon,
  icon_icon,
  icon___vue_template_functional__,
  icon___vue_styles__,
  icon___vue_scopeId__,
  icon___vue_module_identifier__
)

/* harmony default export */ var packages_icon_icon = (icon_Component.exports);

// CONCATENATED MODULE: ./packages/icon/index.js

/* harmony default export */ var packages_icon = (packages_icon_icon);
// CONCATENATED MODULE: ./src/directives/winScroll.js
/* harmony default export */ var winScroll = ({
    bind: function bind(el, binding) {
        var scroll = function scroll(e) {
            if (binding.expression) {
                binding.value(e);
            }
        };
        el._scroll = scroll;
        el._resize = scroll;
        el._mousewhell = scroll;
        window.addEventListener('resize', scroll);
        window.addEventListener('mousewheel', scroll);
        document.addEventListener('scroll', scroll);
    },
    unbind: function unbind(el, bind) {
        window.removeEventListener('resize', el._scroll);
        document.removeEventListener('scroll', el._resize);
        window.removeEventListener('mousewheel', el._mousewhell);
        delete el._scroll;
        delete el._resize;
        delete el._mousewhell;
    }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/tabs/tabs.vue
function tabs__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var tabs = ({
  directives: { scroll: winScroll },
  components: { Icon: packages_icon },
  name: "YTabs",
  props: {
    value: [String, Number],
    card: Boolean,
    closable: Boolean,
    mini: Boolean,
    simple: Boolean,
    animated: Boolean
  },
  data: function data() {
    return {
      children: [],
      active: false,
      paneLeft: 0,
      tabLeft: 0,
      activeName: this.value,
      activeTab: null,
      scrollable: false,
      listWidth: 0,
      itemWidth: 0
    };
  },

  computed: {
    styles: function styles() {
      return {
        transform: "translateX(" + this.paneLeft * this.itemWidth * -1 + "px)",
        width: this.listWidth + "px"
      };
    },
    classes: function classes() {
      var _ref;

      return ["k-tabs", (_ref = {}, tabs__defineProperty(_ref, "k-tabs-mini", this.mini), tabs__defineProperty(_ref, "k-tabs-card", this.card && !this.simple), tabs__defineProperty(_ref, "k-tabs-simple", this.simple && !this.card), _ref)];
    },
    inkStyles: function inkStyles() {
      return this.activeTab ? {
        width: this.activeTab.offsetWidth + "px",
        left: this.activeTab.offsetLeft + "px"
      } : {};
    },
    scrollStyle: function scrollStyle() {
      return {
        transform: "translateX(" + this.tabLeft + "px)"
      };
    }
  },
  watch: {
    value: function value(v) {
      this.activeName = v;
      this.handelClick();
    },
    itemWidth: function itemWidth(w) {
      this.listWidth = w * this.children.length;
      this.children.forEach(function (child) {
        child.width = w;
      });
    },
    children: function children() {
      var _this = this;

      this.$nextTick(function () {
        _this.setScroll();
      });
    }
  },

  created: function created() {
    this.$on("tabs-add", this.add);
    this.$on("tabs-remove", this.remove);
  },
  mounted: function mounted() {
    var _this2 = this;

    var index = 0;
    if (this.activeName === undefined) {
      this.activeName = this.children[0].activeName;
      this.children[0].active = true;
      index = 0;
    } else {
      this.children.forEach(function (child, i) {
        if (child.active) {
          child.name == _this2.activeName;
          index = i;
        }
      });
    }
    this.$nextTick(function () {
      _this2.activeTab = _this2.$refs.tabs.children[index + 1];
    });
    this.left = index;
    this.paneLeft = index;
    this.itemWidth = this.$refs.root.offsetWidth;
    // console.log(this.itemWidth);
    this.listWidth = this.itemWidth * this.children.length;
  },

  methods: {
    scroll: function scroll(t) {
      var boxWidth = this.$refs.scroll.offsetWidth;
      var scrollWidth = this.$refs.scroll.scrollWidth;
      if (t == "next") {
        var last = scrollWidth + this.tabLeft - boxWidth; //剩余的要偏移的长度
        if (last == 0) return;
        this.tabLeft -= last > boxWidth ? boxWidth : last;
      } else {
        if (this.tabLeft == 0) return;
        this.tabLeft += -this.tabLeft > boxWidth ? boxWidth : -this.tabLeft;
      }
    },
    setScroll: function setScroll() {
      var boxWidth = this.$refs.scroll.offsetWidth;
      var scrollWidth = this.$refs.scroll.scrollWidth;
      var extraWidth = this.$refs.extra.offsetWidth;
      // console.log(boxWidth,scrollWidth,extraWidth)
      // let s = this.scrollable ? 39 * 2 - 10 : 0;
      this.scrollable = scrollWidth - extraWidth > boxWidth;
      //重置滚动
      if (this.tabLeft < 0) {
        if (-this.tabLeft + boxWidth > scrollWidth) {
          this.tabLeft = -(scrollWidth - boxWidth);
        }
      }
      this.itemWidth = this.$refs.root.offsetWidth;
      this.listWidth = this.itemWidth * this.children.length;
    },
    close: function close(index, item) {
      this.$emit("close", this.activeName);
      this.children.splice(index, 1);
      this.$refs.panes.removeChild(this.$refs.panes.children[index]);
      if (this.children.length && this.activeName == item.activeName) {
        this.activeName = this.children[index - 1].activeName;
        this.children[index - 1].active = true;
        this.paneLeft = index - 1;
      } else if (index < this.paneLeft) {
        this.paneLeft--;
      }
    },
    handelClick: function handelClick(item) {
      var _this3 = this;

      if (item && item.disabled) return;
      if (item) {
        this.activeName = item.activeName;
      }
      this.children.forEach(function (child, index) {
        if (child.activeName == _this3.activeName) {
          _this3.paneLeft = index;
          !_this3.card && (_this3.activeTab = _this3.$refs.tabs.children[index + 1]);
          child.active = true;
        } else {
          child.active = false;
        }
      });
      this.$emit("click", this.activeName);
    },
    add: function add(obj) {
      if (obj.activeName === undefined) obj.activeName = this.children.length;else obj.active = obj.activeName == this.value;
      obj.width = this.itemWidth;
      this.children.push(obj);
    },
    remove: function remove(obj) {
      this.children.splice(this.children.indexOf(obj), 1);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-16ba8000","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/tabs/tabs.vue
var tabs_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "scroll", rawName: "v-scroll", value: _vm.setScroll, expression: "setScroll" }], ref: "root", class: _vm.classes }, [_c('div', { staticClass: "k-tabs-bar" }, [_c('div', { ref: "extra", staticClass: "k-tabs-extra" }, [_vm._t("extra")], 2), _vm._v(" "), _c('div', { class: ['k-tabs-nav-container', (_obj = {}, _obj['k-tabs-nav-container-scroll'] = this.scrollable, _obj)] }, [_c('span', { staticClass: "k-tabs-tab-prev", on: { "click": function click($event) {
        _vm.scroll('prev');
      } } }, [_c('Icon', { attrs: { "type": "ios-arrow-back" } })], 1), _vm._v(" "), _c('span', { staticClass: "k-tabs-tab-next", on: { "click": function click($event) {
        _vm.scroll('next');
      } } }, [_c('Icon', { attrs: { "type": "ios-arrow-forward" } })], 1), _vm._v(" "), _c('div', { staticClass: "k-tabs-nav-wrap" }, [_c('div', { ref: "scroll", staticClass: "k-tabs-nav-scroll", style: _vm.scrollStyle }, [_c('div', { ref: "tabs", staticClass: "k-tabs-nav" }, [!_vm.card ? _c('div', { staticClass: "k-tabs-ink-bar", style: _vm.inkStyles }) : _vm._e(), _vm._v(" "), _vm._l(_vm.children, function (item, index) {
    return _c('div', { key: index, class: ['k-tabs-tab', (_obj = {}, _obj['k-tabs-tab-active'] = item.active, _obj['k-tabs-tab-disabled'] = item.disabled, _obj)], on: { "click": function click($event) {
          _vm.handelClick(item);
        } } }, [item.icon ? _c('Icon', { attrs: { "type": item.icon } }) : _vm._e(), _vm._v(_vm._s(item.label) + "\n              "), item.closable && _vm.card && _vm.closable ? _c('Icon', { attrs: { "type": "md-close" }, on: { "click": function click($event) {
          $event.stopPropagation();_vm.close(index, item);
        } } }) : _vm._e()], 1);
    var _obj;
  })], 2)])])])]), _vm._v(" "), _c('div', { ref: "panes", staticClass: "k-tabs-content", style: _vm.styles }, [_vm._t("default")], 2)]);
  var _obj;
};
var tabs_staticRenderFns = [];
var tabs_esExports = { render: tabs_render, staticRenderFns: tabs_staticRenderFns };
/* harmony default export */ var tabs_tabs = (tabs_esExports);
// CONCATENATED MODULE: ./packages/tabs/tabs.vue
var tabs_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var tabs___vue_template_functional__ = false
/* styles */
var tabs___vue_styles__ = null
/* scopeId */
var tabs___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var tabs___vue_module_identifier__ = null
var tabs_Component = tabs_normalizeComponent(
  tabs,
  tabs_tabs,
  tabs___vue_template_functional__,
  tabs___vue_styles__,
  tabs___vue_scopeId__,
  tabs___vue_module_identifier__
)

/* harmony default export */ var packages_tabs_tabs = (tabs_Component.exports);

// CONCATENATED MODULE: ./src/mixins/emitter.js
function _broadcast(componentName, eventName, params) {
    this.$children.forEach(function (child) {
        var name = child.$options.name;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            // todo 如果 params 是空数组，接收到的会是 undefined
            _broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}
/* harmony default export */ var emitter = ({
    methods: {
        getChilds: function getChilds(context, componentName) {
            var _this = this;

            return context.$children.reduce(function (components, child) {
                if (child.$options.name === componentName) components.push(child);
                var foundChilds = _this.getChilds(child, componentName);
                return components.concat(foundChilds);
            }, []);
        },
        getParent: function getParent(componentName) {
            var parent = this.$parent || this.$root;
            var name = parent.$options.name;
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                if (parent) {
                    name = parent.$options.name;
                }
            }
            return parent;
        },
        dispatch: function dispatch(componentName, eventName, params) {
            var parent = this.getParent(componentName);
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        broadcast: function broadcast(componentName, eventName, params) {
            _broadcast.call(this, componentName, eventName, params);
        },
        getElementPos: function getElementPos(element) {
            var pos = { left: 0, top: 0, width: 0, height: 0 };

            //
            if (!element) return pos;

            return element.getBoundingClientRect();

            // 父级 为 overflow hidden， 就掉水沟了， 取值不准
            // if (!element) return pos;
            // pos.left = element.offsetLeft;
            // pos.top = element.offsetTop;

            // var parent = element.offsetParent;
            // while (parent !== null) {
            //     pos.left += parent.offsetLeft;
            //     pos.top += parent.offsetTop;
            //     parent = parent.offsetParent;
            // }
            // return pos;
        }
    }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/tabs/tabpane.vue
//
//
//
//
//


/* harmony default export */ var tabpane = ({
  name: "YTabpane",
  mixins: [emitter],
  props: {
    name: [String, Number],
    label: [String, Number],
    icon: String,
    disabled: Boolean,
    closable: { type: Boolean, default: true }
  },
  data: function data() {
    return {
      activeName: this.name,
      active: false,
      width: 0 //ie9
    };
  },

  computed: {
    styles: function styles() {
      return this.width ? { width: this.width + "px" } : {};
    }
  },
  mounted: function mounted() {
    console.log(this);
    console.log("11");
    this.dispatch("YTabs", "tabs-add", this);
  },
  beforeDestroy: function beforeDestroy() {
    this.dispatch("YTabs", "tabs-remove", this);
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-03741e3b","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/tabs/tabpane.vue
var tabpane_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "k-tabs-tabpane", style: _vm.styles }, [_vm._t("default")], 2);
};
var tabpane_staticRenderFns = [];
var tabpane_esExports = { render: tabpane_render, staticRenderFns: tabpane_staticRenderFns };
/* harmony default export */ var tabs_tabpane = (tabpane_esExports);
// CONCATENATED MODULE: ./packages/tabs/tabpane.vue
var tabpane_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var tabpane___vue_template_functional__ = false
/* styles */
var tabpane___vue_styles__ = null
/* scopeId */
var tabpane___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var tabpane___vue_module_identifier__ = null
var tabpane_Component = tabpane_normalizeComponent(
  tabpane,
  tabs_tabpane,
  tabpane___vue_template_functional__,
  tabpane___vue_styles__,
  tabpane___vue_scopeId__,
  tabpane___vue_module_identifier__
)

/* harmony default export */ var packages_tabs_tabpane = (tabpane_Component.exports);

// CONCATENATED MODULE: ./packages/tabs/index.js



// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/steps/steps.vue
function steps__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//

/* harmony default export */ var steps = ({
    name: 'YSteps',
    props: {
        current: [String, Number],
        vertical: Boolean,
        mini: Boolean,
        status: {
            validator: function validator(v) {
                return ['wait', 'process', 'finish', 'error'].indexOf(v) >= 0;
            },
            default: 'process'
        }
    },
    data: function data() {
        return {
            children: []
        };
    },

    watch: {
        current: function current(v) {
            this.setState();
        }
    },
    computed: {
        classes: function classes() {
            var _ref;

            return ['k-steps', (_ref = {}, steps__defineProperty(_ref, 'k-steps-vertical', this.vertical), steps__defineProperty(_ref, 'k-steps-mini', this.mini), _ref)];
        }
    },
    created: function created() {
        this.$on('steps-add', this.add);
        this.$on('steps-remove', this.remove);
    },
    mounted: function mounted() {
        this.setState();
    },

    methods: {
        setState: function setState() {
            var _this = this;

            this.children.forEach(function (child, index) {
                child.width = !_this.vertical ? 100 / _this.children.length : 0;
                if (index == _this.current) {
                    child.state = _this.status == 'error' ? 'error' : 'process';
                } else if (index > _this.current) {
                    child.state = 'wait';
                } else if (index < _this.current) {
                    child.state = 'finish';
                }
            });
        },
        add: function add(obj) {
            this.children.push(obj);
            obj.step = this.children.length;
        },
        remove: function remove(obj) {
            this.children.splice(this.children.indexOf(obj), 1);
        }
    }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6368f420","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/steps/steps.vue
var steps_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes }, [_vm._t("default")], 2);
};
var steps_staticRenderFns = [];
var steps_esExports = { render: steps_render, staticRenderFns: steps_staticRenderFns };
/* harmony default export */ var steps_steps = (steps_esExports);
// CONCATENATED MODULE: ./packages/steps/steps.vue
var steps_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var steps___vue_template_functional__ = false
/* styles */
var steps___vue_styles__ = null
/* scopeId */
var steps___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var steps___vue_module_identifier__ = null
var steps_Component = steps_normalizeComponent(
  steps,
  steps_steps,
  steps___vue_template_functional__,
  steps___vue_styles__,
  steps___vue_scopeId__,
  steps___vue_module_identifier__
)

/* harmony default export */ var packages_steps_steps = (steps_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/steps/step.vue
function step__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var step = ({
  name: 'YStep',
  components: { Icon: packages_icon },
  mixins: [emitter],
  props: {
    title: String,
    description: String,
    status: {
      validator: function validator(v) {
        return ['wait', 'process', 'finish', 'error'].indexOf(v) >= 0;
      },
      default: 'wait'
    },
    icon: String
  },
  data: function data() {
    return {
      width: 0,
      step: 0,
      state: this.status
    };
  },

  computed: {
    styles: function styles() {
      return this.width > 0 ? { width: this.width + '%' } : {};
    },
    classes: function classes() {
      return ['k-step-item', step__defineProperty({}, 'k-steps-' + this.state, this.state)];
    }
  },
  mounted: function mounted() {
    this.dispatch('YSteps', 'steps-add', this);
  },
  beforeDestory: function beforeDestory() {
    this.dispatch('YStep', 'steps-remove', this);
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-85795cd6","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/steps/step.vue
var step_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes, style: _vm.styles }, [_c('div', { staticClass: "k-step-head" }, [_vm._m(0), _vm._v(" "), _c('div', { staticClass: "k-step-icon" }, [_vm.icon ? _c('Icon', { attrs: { "type": _vm.icon } }) : _vm._e(), _vm._v(" "), !_vm.icon ? _c('div', { staticClass: "k-step-icon-inner" }, [_vm.state != 'finish' && !_vm.icon && _vm.state != 'error' ? _c('span', [_vm._v(_vm._s(_vm.step))]) : _vm._e(), _vm._v(" "), !_vm.icon && _vm.state == 'finish' ? _c('Icon', { attrs: { "type": "icon-success" } }) : _vm._e(), _vm._v(" "), !_vm.icon && _vm.state == 'error' ? _c('Icon', { attrs: { "type": "icon-failure" } }) : _vm._e()], 1) : _vm._e()], 1)]), _vm._v(" "), _c('div', { staticClass: "k-step-main" }, [_c('div', { staticClass: "k-step-title" }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', { staticClass: "k-step-description" }, [_vm._v(_vm._s(_vm.description))])])]);
};
var step_staticRenderFns = [function () {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "k-step-tail" }, [_c('i')]);
}];
var step_esExports = { render: step_render, staticRenderFns: step_staticRenderFns };
/* harmony default export */ var steps_step = (step_esExports);
// CONCATENATED MODULE: ./packages/steps/step.vue
var step_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var step___vue_template_functional__ = false
/* styles */
var step___vue_styles__ = null
/* scopeId */
var step___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var step___vue_module_identifier__ = null
var step_Component = step_normalizeComponent(
  step,
  steps_step,
  step___vue_template_functional__,
  step___vue_styles__,
  step___vue_scopeId__,
  step___vue_module_identifier__
)

/* harmony default export */ var packages_steps_step = (step_Component.exports);

// CONCATENATED MODULE: ./packages/steps/index.js




// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/collapse/collapse.vue
function collapse__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//

/* harmony default export */ var collapse = ({
    name: 'Collapse',
    props: {
        value: { type: [Array, String] },
        accrodion: Boolean,
        sample: { type: Boolean, default: false }
    },
    data: function data() {
        return {
            children: []
        };
    },

    watch: {
        value: function value() {
            this.setActive();
        }
    },
    computed: {
        classes: function classes() {
            return ['k-collapse', collapse__defineProperty({}, 'k-collaplse-sample', this.sample)];
        }
    },
    created: function created() {
        this.$on('collapse-add', this.add);
        this.$on('collapse-remove', this.remove);
        this.$on('collapse-accrodion', this.handelAccrodion);
    },
    mounted: function mounted() {
        this.setActive();
    },

    methods: {
        handelAccrodion: function handelAccrodion(obj) {
            this.$emit('change', obj.active);
            this.accrodion && this.children.forEach(function (child) {
                child != obj && (child.active = child == obj);
            });
        },
        setActive: function setActive() {
            var _this = this;

            this.children.forEach(function (child) {
                child.active = Array.isArray(_this.value) ? _this.value.indexOf(child.name) >= 0 : _this.value != undefined && _this.value === child.name;
            });
        },
        add: function add(obj) {
            this.children.push(obj);
        },
        remove: function remove(obj) {
            this.children.splice(this.children.indexOf(obj), 1);
        }
    }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-46358dc9","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/collapse/collapse.vue
var collapse_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes }, [_vm._t("default")], 2);
};
var collapse_staticRenderFns = [];
var collapse_esExports = { render: collapse_render, staticRenderFns: collapse_staticRenderFns };
/* harmony default export */ var collapse_collapse = (collapse_esExports);
// CONCATENATED MODULE: ./packages/collapse/collapse.vue
var collapse_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var collapse___vue_template_functional__ = false
/* styles */
var collapse___vue_styles__ = null
/* scopeId */
var collapse___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var collapse___vue_module_identifier__ = null
var collapse_Component = collapse_normalizeComponent(
  collapse,
  collapse_collapse,
  collapse___vue_template_functional__,
  collapse___vue_styles__,
  collapse___vue_scopeId__,
  collapse___vue_module_identifier__
)

/* harmony default export */ var packages_collapse_collapse = (collapse_Component.exports);

// CONCATENATED MODULE: ./packages/collapse/collapse.js
//利用vue 的状态管理 结合 vue transition 和 css3 的 transition 实现 Jqeury toggle
//给需要的 元素加上 css  transition: height .2s ease-in-out;
//

var on = {
    beforeEnter: function beforeEnter(el) {
        el.style.height = 0;
        el.style.opacity = 0.1;
    },
    enter: function enter(el) {
        if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + 'px';
            el.style.opacity = 1;
        } else {
            el.style.height = '';
            el.style.opacity = '';
        }
    },
    afterEnter: function afterEnter(el) {
        el.style.height = '';
        el.style.opacity = '';
    },
    beforeLeave: function beforeLeave(el) {
        el.style.height = el.scrollHeight + 'px';
        el.style.opacity = 1;
    },
    leave: function leave(el) {
        if (el.scrollHeight !== 0) {
            el.style.height = 0;el.style.opacity = 0.1;
        }
    },
    afterLeave: function afterLeave(el) {
        el.style.height = '';
        el.style.opacity = '';
    }
};

// https://cn.vuejs.org/v2/guide/render-function.html#函数式组件

/* harmony default export */ var packages_collapse_collapse_0 = ({
    name: 'Collapse',
    functional: true, //为true 表示 无状态 data 无 无实例 没有this
    render: function render(h, context) {
        return h('transition', { on: on }, context.children);
    }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/collapse/panel.vue
function panel__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var panel = ({
    name: 'Panel',
    mixins: [emitter],
    components: { Collapse: packages_collapse_collapse_0, Icon: packages_icon },
    props: {
        title: { type: String, required: true },
        name: String
    },
    data: function data() {
        return {
            active: false
        };
    },

    computed: {
        classes: function classes() {
            return ['k-collapse-item', panel__defineProperty({}, 'k-collapse-item-active', this.active)];
        }
    },
    methods: {
        handelClick: function handelClick() {
            this.active = !this.active;
            this.dispatch('Collapse', 'collapse-accrodion', this);
        }
    },
    mounted: function mounted() {
        this.dispatch('Collapse', 'collapse-add', this);
    },
    beforeDestroy: function beforeDestroy() {
        this.dispatch('Collapse', 'collapse-remove', this);
    }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-209f4e46","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/collapse/panel.vue
var panel_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes }, [_c('div', { staticClass: "k-collapse-header", on: { "click": _vm.handelClick } }, [_c('Icon', { attrs: { "type": "ios-arrow-forward" } }), _vm._v(_vm._s(_vm.title))], 1), _vm._v(" "), _c('Collapse', [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.active, expression: "active" }], staticClass: "k-collapse-content" }, [_c('div', { staticClass: "k-collapse-content-box" }, [_vm._t("default")], 2)])])], 1);
};
var panel_staticRenderFns = [];
var panel_esExports = { render: panel_render, staticRenderFns: panel_staticRenderFns };
/* harmony default export */ var collapse_panel = (panel_esExports);
// CONCATENATED MODULE: ./packages/collapse/panel.vue
var panel_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var panel___vue_template_functional__ = false
/* styles */
var panel___vue_styles__ = null
/* scopeId */
var panel___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var panel___vue_module_identifier__ = null
var panel_Component = panel_normalizeComponent(
  panel,
  collapse_panel,
  panel___vue_template_functional__,
  panel___vue_styles__,
  panel___vue_scopeId__,
  panel___vue_module_identifier__
)

/* harmony default export */ var packages_collapse_panel = (panel_Component.exports);

// CONCATENATED MODULE: ./packages/collapse/index.js



// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/menu/menu.vue
function menu__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//


/* harmony default export */ var menu = ({
  name: "YMenu",
  mixins: [emitter],
  props: {
    theme: { type: String, default: "light" },
    mode: { type: String, default: "vertical" },
    activeName: String,
    openName: String,
    accordion: Boolean,
    width: { type: [Number, String], default: 198 }
  },
  data: function data() {
    return {
      activeIndex: this.activeName,
      openIndex: this.openName,
      items: [],
      submenus: []
    };
  },

  watch: {
    activeIndex: function activeIndex(name) {
      this.broadcast('YMenuItem', 'menu-item-update', name);
      this.broadcast('YSubMenu', 'menu-submenu-close', name);
    },
    openIndex: function openIndex(name) {
      console.log(name);
      this.broadcast('YSubMenu', 'menu-submenu-update', name);
    }
  },
  computed: {
    classes: function classes() {
      var _ref;

      return ["k-menu", (_ref = {}, menu__defineProperty(_ref, "k-menu-" + this.theme, this.theme), menu__defineProperty(_ref, "k-menu-" + this.mode, this.mode), _ref)];
    },
    styles: function styles() {
      return this.mode == "vertical" ? { width: this.width > 0 ? this.width + "px" : this.width } : {};
    }
  },
  methods: {
    setAccordion: function setAccordion(name) {
      this.openIndex = name;
      if (this.accordion) {
        this.broadcast('YSubMenu', 'menu-submenu-update', name);
      }
    },
    itemSelect: function itemSelect(name) {
      this.activeIndex = name;
      this.$emit("select", name);
    }
  },
  mounted: function mounted() {
    this.$on('menu-select', this.itemSelect);
    this.$on('menu-accordion', this.setAccordion);
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-719698c9","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/menu/menu.vue
var menu_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { class: _vm.classes, style: _vm.styles }, [_vm._t("default")], 2);
};
var menu_staticRenderFns = [];
var menu_esExports = { render: menu_render, staticRenderFns: menu_staticRenderFns };
/* harmony default export */ var menu_menu = (menu_esExports);
// CONCATENATED MODULE: ./packages/menu/menu.vue
var menu_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var menu___vue_template_functional__ = false
/* styles */
var menu___vue_styles__ = null
/* scopeId */
var menu___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var menu___vue_module_identifier__ = null
var menu_Component = menu_normalizeComponent(
  menu,
  menu_menu,
  menu___vue_template_functional__,
  menu___vue_styles__,
  menu___vue_scopeId__,
  menu___vue_module_identifier__
)

/* harmony default export */ var packages_menu_menu = (menu_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/menu/menugroup.vue
//
//
//
//
//
//
//
//

/* harmony default export */ var menugroup = ({
  name: "YMenuGroup",
  props: {
    title: { type: String, required: true }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-558f4471","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/menu/menugroup.vue
var menugroup_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "k-menu-item-group" }, [_c('div', { staticClass: "k-menu-item-group-title" }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('ul', [_vm._t("default")], 2)]);
};
var menugroup_staticRenderFns = [];
var menugroup_esExports = { render: menugroup_render, staticRenderFns: menugroup_staticRenderFns };
/* harmony default export */ var menu_menugroup = (menugroup_esExports);
// CONCATENATED MODULE: ./packages/menu/menugroup.vue
var menugroup_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var menugroup___vue_template_functional__ = false
/* styles */
var menugroup___vue_styles__ = null
/* scopeId */
var menugroup___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var menugroup___vue_module_identifier__ = null
var menugroup_Component = menugroup_normalizeComponent(
  menugroup,
  menu_menugroup,
  menugroup___vue_template_functional__,
  menugroup___vue_styles__,
  menugroup___vue_scopeId__,
  menugroup___vue_module_identifier__
)

/* harmony default export */ var packages_menu_menugroup = (menugroup_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/menu/menuitem.vue
function menuitem__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//


/* harmony default export */ var menuitem = ({
  name: "YMenuItem",
  mixins: [emitter],
  props: {
    name: { type: String, required: true }
  },
  data: function data() {
    return {
      active: false
      // index:0,
    };
  },

  computed: {
    classes: function classes() {
      return ["k-menu-item", menuitem__defineProperty({}, "k-menu-item-active", this.active)];
    }
  },
  beforDistory: function beforDistory() {},
  mounted: function mounted() {
    this.active = this.getParent('YMenu').activeName == this.name;
    this.$on('menu-item-update', this.update);
  },

  methods: {
    update: function update(name) {
      this.active = this.name == name;
    },
    handle: function handle() {
      this.active = true;
      this.dispatch('YMenu', 'menu-select', this.name);
      this.dispatch('YSubMenu', 'menu-submenu-close', this.name);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0a545e0a","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/menu/menuitem.vue
var menuitem_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { class: _vm.classes, on: { "click": function click($event) {
        $event.stopPropagation();return _vm.handle($event);
      } } }, [_vm._t("default"), _vm._v(" "), _vm._t("title")], 2);
};
var menuitem_staticRenderFns = [];
var menuitem_esExports = { render: menuitem_render, staticRenderFns: menuitem_staticRenderFns };
/* harmony default export */ var menu_menuitem = (menuitem_esExports);
// CONCATENATED MODULE: ./packages/menu/menuitem.vue
var menuitem_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var menuitem___vue_template_functional__ = false
/* styles */
var menuitem___vue_styles__ = null
/* scopeId */
var menuitem___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var menuitem___vue_module_identifier__ = null
var menuitem_Component = menuitem_normalizeComponent(
  menuitem,
  menu_menuitem,
  menuitem___vue_template_functional__,
  menuitem___vue_styles__,
  menuitem___vue_scopeId__,
  menuitem___vue_module_identifier__
)

/* harmony default export */ var packages_menu_menuitem = (menuitem_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/menu/submenu.vue
function submenu__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var submenu = ({
  name: "YSubMenu",
  mixins: [emitter],
  components: { Collapse: packages_collapse_collapse_0 },
  props: {
    name: { type: String, required: true }
  },
  data: function data() {
    return {
      active: false,
      visible: false,
      height: 0,
      hideTime: null,
      rootMenu: this.getParent("YMenu")
    };
  },

  computed: {
    classes: function classes() {
      var _ref;

      return ["k-menu-submenu", (_ref = {}, submenu__defineProperty(_ref, "k-menu-item-active", this.active), submenu__defineProperty(_ref, "k-menu-item-opened", this.visible), _ref)];
    }
  },
  mounted: function mounted() {
    this.visible = this.rootMenu.openIndex == this.name && this.rootMenu.mode != 'horizontal';
    this.$on('menu-submenu-update', this.update);
    this.$on('menu-submenu-close', this.close);
  },

  methods: {
    close: function close() {
      if (this.rootMenu.mode == "vertical") return;
      this.visible = false;
      var childs = this.getChilds(this, 'YMenuItem');
      this.active = childs.filter(function (c) {
        return c.active;
      }).length > 0;
    },
    update: function update(name) {
      if (name != this.name && this.visible) {
        //其他的折叠
        this.visible = !this.visible;
      }
    },
    accordion: function accordion() {
      this.visible = !this.visible;
      this.dispatch('YMenu', 'menu-accordion', this.name);
    },
    openMenu: function openMenu() {
      var _this = this;

      if (this.rootMenu.mode == "vertical") return;
      this.$nextTick(function () {
        return _this.visible = true;
      });
    },
    closeMenu: function closeMenu() {
      var _this2 = this;

      if (this.rootMenu.mode == "vertical") return;
      this.$nextTick(function () {
        return _this2.visible = false;
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-04ea4a24","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/menu/submenu.vue
var submenu_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { class: _vm.classes, on: { "mouseover": _vm.openMenu, "mouseout": _vm.closeMenu } }, [_c('div', { staticClass: "k-menu-title", on: { "click": function click($event) {
        $event.stopPropagation();return _vm.accordion($event);
      } } }, [_vm._t("title"), _vm._v(" "), _c('i', { staticClass: "icon-arrow_down_small icon-arrow" })], 2), _vm._v(" "), _c('Collapse', [_c('ul', { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "k-menu-dropdown" }, [_vm._t("default")], 2)])], 1);
};
var submenu_staticRenderFns = [];
var submenu_esExports = { render: submenu_render, staticRenderFns: submenu_staticRenderFns };
/* harmony default export */ var menu_submenu = (submenu_esExports);
// CONCATENATED MODULE: ./packages/menu/submenu.vue
var submenu_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var submenu___vue_template_functional__ = false
/* styles */
var submenu___vue_styles__ = null
/* scopeId */
var submenu___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var submenu___vue_module_identifier__ = null
var submenu_Component = submenu_normalizeComponent(
  submenu,
  menu_submenu,
  submenu___vue_template_functional__,
  submenu___vue_styles__,
  submenu___vue_scopeId__,
  submenu___vue_module_identifier__
)

/* harmony default export */ var packages_menu_submenu = (submenu_Component.exports);

// CONCATENATED MODULE: ./packages/menu/index.js





// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/input/input.vue
function input__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var input = ({
  name: "YInput",
  mixins: [emitter],
  props: {
    autofocus: [Boolean, String, Number],
    spellcheck: Boolean,
    elementId: String,
    clearable: Boolean,
    mini: { type: Boolean, default: false },
    type: {
      validator: function validator(value) {
        return ["text", "textarea", "password", "url", "email", "date"].indexOf(value) >= 0;
      },

      default: 'text'
    },
    icon: String,
    iconAlign: { type: String, default: 'right' },
    value: { type: [String, Number], default: "" },
    placeholder: { type: String, default: "" },
    maxlength: { type: Number },
    disabled: { type: Boolean, default: false },
    rows: { type: Number, default: 2 },
    readonly: { type: Boolean, default: false },
    name: { type: String },
    number: { type: Boolean, default: false },
    autocomplete: {
      validator: function validator(value) {
        return ["on", "off"].indexOf(value) >= 0;
      },

      default: "off"
    },
    Id: { type: String },
    width: { type: [Number, String] }
  },
  data: function data() {
    return {
      currentValue: this.value,
      clearableShow: false,
      isFocus: false,
      isMove: false
    };
  },

  watch: {
    value: function value(val) {
      this.setCurrentValue(val);
    }
  },
  mounted: function mounted() {
    this.currentValue = this.value;
  },

  computed: {
    iconClasses: function iconClasses() {
      return ["" + this.icon];
    },
    classes: function classes() {
      var _ref;

      return ["k-input-wp", (_ref = {}, input__defineProperty(_ref, "k-input-mini", this.mini), input__defineProperty(_ref, "k-input-icon-left", this.icon && this.iconAlign == 'left'), _ref)];
    },
    styles: function styles() {
      return this.width && this.width > 0 ? { width: this.width + "px" } : {};
    },
    inputClasses: function inputClasses() {
      var _ref2;

      return ["k-input", (_ref2 = {}, input__defineProperty(_ref2, "k-input-mini", !!this.mini), input__defineProperty(_ref2, "k-input-disabled", this.disabled), _ref2)];
    },
    textareaClasses: function textareaClasses() {
      var _ref3;

      return ["k-input", (_ref3 = {}, input__defineProperty(_ref3, "k-input-mini", !!this.mini), input__defineProperty(_ref3, "k-input-disabled", this.disabled), input__defineProperty(_ref3, "k-textarea", this.type == "textarea"), _ref3)];
    }
  },
  methods: {
    clear: function clear() {
      this.setCurrentValue("");
      this.clearableShow = false;
    },
    handleMove: function handleMove() {
      this.clearableShow = this.currentValue && this.currentValue.length > 0;
      this.isMove = true;
    },
    handleOut: function handleOut() {
      this.isMove = false;
      if (!this.isFocus) {
        this.clearableShow = false;
      }
    },
    iconClick: function iconClick() {
      !this.disabled && this.$emit("iconClick");
    },
    handleEnter: function handleEnter(event) {
      this.$emit("enter", event);
    },
    handleKeydown: function handleKeydown(event) {
      this.$emit("keydown", event);
    },
    handleKeypress: function handleKeypress(event) {
      this.$emit("keypress", event);
    },
    handleKeyup: function handleKeyup(event) {
      this.$emit("keyup", event);
    },
    handleFocus: function handleFocus(event) {
      this.clearableShow = this.currentValue && this.currentValue.length > 0;
      this.$emit("focus", event);
      this.isFocus = true;
    },
    handleBlur: function handleBlur(event) {
      if (!this.isMove) {
        this.clearableShow = false;
      }
      this.isFocus = false;
      this.$emit("blur", event);
      this.dispatch('FormItem', 'form-item-blur', this.currentValue);
    },
    handleInput: function handleInput(event) {
      var value = event.target.value;
      this.clearableShow = value && value.length > 0;
      if (this.number) value = Number.isNaN(Number(value)) ? value : Number(value);
      this.$emit("input", value);
      this.setCurrentValue(value);
    },
    handleChange: function handleChange(event) {
      this.$emit("change", event.target.value);
    },
    setCurrentValue: function setCurrentValue(value) {
      if (value === this.currentValue) return;
      this.currentValue = value;
      this.dispatch('FormItem', 'form-item-change', this.currentValue);
    },
    focus: function focus() {
      if (this.type === "textarea") {
        this.$refs.textarea.focus();
      } else {
        this.$refs.input.focus();
      }
      this.isFocus = true;
    },
    blur: function blur() {
      if (this.type === "textarea") {
        this.$refs.textarea.blur();
      } else {
        this.$refs.input.blur();
      }
      this.isFocus = false;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2aa594b8","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/input/input.vue
var input_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes, style: _vm.styles, on: { "mousemove": _vm.handleMove, "mouseout": _vm.handleOut } }, [_vm.type !== 'textarea' ? [_vm.icon && _vm.type !== 'textarea' ? _c('i', { class: _vm.iconClasses, on: { "click": _vm.iconClick } }) : _vm._e(), _vm._v(" "), _c('input', { ref: "input", class: _vm.inputClasses, attrs: { "id": _vm.elementId, "autocomplete": _vm.autocomplete, "spellcheck": _vm.spellcheck, "type": _vm.type, "placeholder": _vm.placeholder, "disabled": _vm.disabled, "maxlength": _vm.maxlength, "readonly": _vm.readonly, "name": _vm.name, "number": _vm.number, "autofocus": _vm.autofocus }, domProps: { "value": _vm.currentValue }, on: { "keyup": [function ($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }return _vm.handleEnter($event);
      }, _vm.handleKeyup], "keypress": _vm.handleKeypress, "keydown": _vm.handleKeydown, "focus": _vm.handleFocus, "blur": _vm.handleBlur, "input": _vm.handleInput, "change": _vm.handleChange } }), _vm._v(" "), _vm.type != 'textarea' && _vm.clearable && _vm.clearableShow ? _c('span', { staticClass: "k-input-clearable", on: { "click": function click($event) {
        $event.stopPropagation();return _vm.clear($event);
      } } }) : _vm._e()] : _c('textarea', { ref: "textarea", class: _vm.textareaClasses, attrs: { "id": _vm.elementId, "autocomplete": _vm.autocomplete, "spellcheck": _vm.spellcheck, "placeholder": _vm.placeholder, "disabled": _vm.disabled, "rows": _vm.rows, "maxlength": _vm.maxlength, "readonly": _vm.readonly, "name": _vm.name, "autofocus": _vm.autofocus }, domProps: { "value": _vm.currentValue }, on: { "keyup": [function ($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }return _vm.handleEnter($event);
      }, _vm.handleKeyup], "keypress": _vm.handleKeypress, "keydown": _vm.handleKeydown, "focus": _vm.handleFocus, "blur": _vm.handleBlur, "input": _vm.handleInput } })], 2);
};
var input_staticRenderFns = [];
var input_esExports = { render: input_render, staticRenderFns: input_staticRenderFns };
/* harmony default export */ var input_input = (input_esExports);
// CONCATENATED MODULE: ./packages/input/input.vue
var input_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var input___vue_template_functional__ = false
/* styles */
var input___vue_styles__ = null
/* scopeId */
var input___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var input___vue_module_identifier__ = null
var input_Component = input_normalizeComponent(
  input,
  input_input,
  input___vue_template_functional__,
  input___vue_styles__,
  input___vue_scopeId__,
  input___vue_module_identifier__
)

/* harmony default export */ var packages_input_input = (input_Component.exports);

// CONCATENATED MODULE: ./packages/input/index.js

/* harmony default export */ var packages_input = (packages_input_input);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/radio/radio.vue
function radio__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//


/* harmony default export */ var radio_radio = ({
  name: "YRadio",
  mixins: [emitter],
  props: {
    value: { type: [String, Number, Boolean], default: false },
    disabled: { type: Boolean, default: false },
    name: { type: String },
    label: { type: String }
  },
  computed: {
    wpclasses: function wpclasses() {
      return ["k-radio-wp", radio__defineProperty({}, "k-radio-disabled", this.disable)];
    },
    classes: function classes() {
      return ["k-radio", radio__defineProperty({}, "k-radio-checked", this.checked)];
    }
  },
  data: function data() {
    return {
      checked: this.value,
      group: false,
      disable: this.disabled
    };
  },

  methods: {
    changed: function changed(event) {
      if (this.disable) {
        return false;
      }
      var checked = event.target.checked;
      this.checked = checked;
      this.$emit("input", checked);

      if (this.group && this.label !== undefined) {
        this.dispatch('YRadioGroup', 'radio-group-change', {
          value: this.label
        });
      }
      if (!this.group) {
        this.$emit("change", checked);
      }
    }
  },
  watch: {
    value: function value(v) {
      this.checked = v;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3cb38750","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/radio/radio.vue
var radio_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('label', { class: _vm.wpclasses }, [_c('span', { class: _vm.classes }, [_c('span', { staticClass: "k-radio-inner" }), _vm._v(" "), _c('input', { staticClass: "k-radio-input", attrs: { "type": "radio", "name": _vm.name, "disabled": _vm.disable }, domProps: { "checked": _vm.disabled }, on: { "change": function change($event) {
        _vm.changed($event);
      } } })]), _vm._v(" "), _vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2);
};
var radio_staticRenderFns = [];
var radio_esExports = { render: radio_render, staticRenderFns: radio_staticRenderFns };
/* harmony default export */ var selectortype_template_index_0_packages_radio_radio = (radio_esExports);
// CONCATENATED MODULE: ./packages/radio/radio.vue
var radio_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var radio___vue_template_functional__ = false
/* styles */
var radio___vue_styles__ = null
/* scopeId */
var radio___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var radio___vue_module_identifier__ = null
var radio_Component = radio_normalizeComponent(
  radio_radio,
  selectortype_template_index_0_packages_radio_radio,
  radio___vue_template_functional__,
  radio___vue_styles__,
  radio___vue_scopeId__,
  radio___vue_module_identifier__
)

/* harmony default export */ var packages_radio_radio = (radio_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/radio/radioGroup.vue
//
//
//
//
//


/* harmony default export */ var radioGroup = ({
  name: "YRadioGroup",
  mixins: [emitter],
  props: {
    value: { type: [String, Number], default: "" },
    disabled: Boolean,
    mini: Boolean
  },
  watch: {
    value: function value(v) {
      this.update({ value: this.value });
    }
  },
  mounted: function mounted() {
    this.update({ value: this.value, group: true });
    this.$on('radio-group-change', this.change);
  },

  methods: {
    update: function update(data) {
      var _this = this;

      console.log(this.disabled);
      this.$children.map(function (child) {
        var disabled = child.disabled || _this.disabled;
        var name = child.$options.name;
        if (name == 'YRadioButton') {
          child.disabled = disabled;
          child.mini = _this.mini;
          child.actived = data.value == child.label;
        }
        if (name == 'YRadio') {
          child.disable = disabled;
          child.checked = data.value == child.label;
        }
        child.group = true;
      });
    },
    change: function change(data) {
      this.$emit("input", data.value);
      this.$emit("change", data.value);
      this.update(data);
      this.dispatch('FormItem', 'form-item-change', data.value);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-977535ce","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/radio/radioGroup.vue
var radioGroup_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "k-radio-group" }, [_vm._t("default")], 2);
};
var radioGroup_staticRenderFns = [];
var radioGroup_esExports = { render: radioGroup_render, staticRenderFns: radioGroup_staticRenderFns };
/* harmony default export */ var radio_radioGroup = (radioGroup_esExports);
// CONCATENATED MODULE: ./packages/radio/radioGroup.vue
var radioGroup_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var radioGroup___vue_template_functional__ = false
/* styles */
var radioGroup___vue_styles__ = null
/* scopeId */
var radioGroup___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var radioGroup___vue_module_identifier__ = null
var radioGroup_Component = radioGroup_normalizeComponent(
  radioGroup,
  radio_radioGroup,
  radioGroup___vue_template_functional__,
  radioGroup___vue_styles__,
  radioGroup___vue_scopeId__,
  radioGroup___vue_module_identifier__
)

/* harmony default export */ var packages_radio_radioGroup = (radioGroup_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/radio/radioButton.vue
//
//
//
//
//



/* harmony default export */ var radioButton = ({
  name: 'YRadioButton',
  components: { Button: packages_button_button },
  mixins: [emitter],
  props: {
    label: String
  },
  data: function data() {
    return {
      disabled: false,
      mini: false,
      actived: false
    };
  },

  methods: {
    click: function click() {
      !this.selected && this.dispatch('YRadioGroup', 'radio-group-change', {
        value: this.label
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-e0f371fa","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/radio/radioButton.vue
var radioButton_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('Button', { attrs: { "type": _vm.actived ? 'default' : 'gray', "disabled": _vm.disabled, "mini": _vm.mini }, on: { "click": _vm.click } }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2);
};
var radioButton_staticRenderFns = [];
var radioButton_esExports = { render: radioButton_render, staticRenderFns: radioButton_staticRenderFns };
/* harmony default export */ var radio_radioButton = (radioButton_esExports);
// CONCATENATED MODULE: ./packages/radio/radioButton.vue
var radioButton_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var radioButton___vue_template_functional__ = false
/* styles */
var radioButton___vue_styles__ = null
/* scopeId */
var radioButton___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var radioButton___vue_module_identifier__ = null
var radioButton_Component = radioButton_normalizeComponent(
  radioButton,
  radio_radioButton,
  radioButton___vue_template_functional__,
  radioButton___vue_styles__,
  radioButton___vue_scopeId__,
  radioButton___vue_module_identifier__
)

/* harmony default export */ var packages_radio_radioButton = (radioButton_Component.exports);

// CONCATENATED MODULE: ./packages/radio/index.js




// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/checkbox/checkbox.vue
function checkbox__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//


/* harmony default export */ var checkbox_checkbox = ({
  name: "YCheckbox",
  mixins: [emitter],
  props: {
    value: { type: [String, Number, Boolean], default: false },
    disabled: { type: Boolean, default: false },
    name: { type: String },
    label: { type: String },
    trueValue: { type: [String, Number, Boolean], default: true },
    falseValue: { type: [String, Number, Boolean], default: false },
    indeterminate: Boolean
  },
  computed: {
    wpclasses: function wpclasses() {
      return ["k-checkbox-wp", checkbox__defineProperty({}, "k-checkbox-disabled", this.disabled)];
    },
    classes: function classes() {
      var _ref2;

      return ["k-checkbox", (_ref2 = {}, checkbox__defineProperty(_ref2, "k-checkbox-checked", this.checked && !this.indeterminate), checkbox__defineProperty(_ref2, "k-checkbox-indeterminate", this.indeterminate), _ref2)];
    }
  },
  data: function data() {
    return {
      checked: this.value,
      group: false
    };
  },

  watch: {
    value: function value(v) {
      this.checked = v;
    }
  },
  mounted: function mounted() {
    this.$on('checkbox-update', this.update);
    // this.dispatch('CheckboxGroup', 'checkbox-group-update')
  },

  methods: {
    update: function update(params) {
      this.checked = params.value.indexOf(this.label) >= 0;
      this.group = params.group;
    },
    change: function change(event) {
      if (this.disabled) {
        return false;
      }

      var checked = event.target.checked;
      this.checked = checked;
      // const value = checked ? this.trueValue : this.falseValue
      this.$emit("input", checked);

      if (this.group && this.label !== undefined) {
        this.dispatch('YCheckboxGroup', 'checkbox-group-change', { value: this.label, checked: checked });
      }
      if (!this.group) {
        this.$emit("change", checked);
      }
    }
  }

});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4f3389f2","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/checkbox/checkbox.vue
var checkbox_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('label', { class: _vm.wpclasses }, [_c('span', { class: _vm.classes }, [_c('span', { staticClass: "k-checkbox-inner" }), _vm._v(" "), _c('input', { staticClass: "k-checkbox-input", attrs: { "type": "checkbox", "name": _vm.name, "disabled": _vm.disabled }, domProps: { "checked": _vm.checked }, on: { "change": function change($event) {
        _vm.change($event);
      } } })]), _vm._v(" "), _vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2);
};
var checkbox_staticRenderFns = [];
var checkbox_esExports = { render: checkbox_render, staticRenderFns: checkbox_staticRenderFns };
/* harmony default export */ var selectortype_template_index_0_packages_checkbox_checkbox = (checkbox_esExports);
// CONCATENATED MODULE: ./packages/checkbox/checkbox.vue
var checkbox_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var checkbox___vue_template_functional__ = false
/* styles */
var checkbox___vue_styles__ = null
/* scopeId */
var checkbox___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var checkbox___vue_module_identifier__ = null
var checkbox_Component = checkbox_normalizeComponent(
  checkbox_checkbox,
  selectortype_template_index_0_packages_checkbox_checkbox,
  checkbox___vue_template_functional__,
  checkbox___vue_styles__,
  checkbox___vue_scopeId__,
  checkbox___vue_module_identifier__
)

/* harmony default export */ var packages_checkbox_checkbox = (checkbox_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/checkbox/checkboxGroup.vue
//
//
//
//
//


/* harmony default export */ var checkboxGroup = ({
  name: "YCheckboxGroup",
  mixins: [emitter],
  props: {
    value: { type: Array, default: function _default() {
        return [];
      } }
  },
  data: function data() {
    return {
      childrens: []
    };
  },

  watch: {
    value: function value(v) {
      this.update();
    }
  },
  mounted: function mounted() {
    this.update();
    this.$on('checkbox-group-update', this.update);
    this.$on('checkbox-group-change', this.change);
  },

  methods: {
    update: function update() {
      this.broadcast('YCheckbox', 'checkbox-update', {
        value: this.value,
        group: true
      });
    },
    change: function change(data) {
      var length = this.value.indexOf(data.value);
      if (data.checked && length < 0) {
        this.value.push(data.value);
      } else {
        this.value.splice(length, 1);
      }
      this.$emit("input", this.value);
      this.$emit("change", this.value);
      this.dispatch('FormItem', 'form-item-change', { field: this.value });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6cb28cd2","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/checkbox/checkboxGroup.vue
var checkboxGroup_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "k-checkbox-group" }, [_vm._t("default")], 2);
};
var checkboxGroup_staticRenderFns = [];
var checkboxGroup_esExports = { render: checkboxGroup_render, staticRenderFns: checkboxGroup_staticRenderFns };
/* harmony default export */ var checkbox_checkboxGroup = (checkboxGroup_esExports);
// CONCATENATED MODULE: ./packages/checkbox/checkboxGroup.vue
var checkboxGroup_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var checkboxGroup___vue_template_functional__ = false
/* styles */
var checkboxGroup___vue_styles__ = null
/* scopeId */
var checkboxGroup___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var checkboxGroup___vue_module_identifier__ = null
var checkboxGroup_Component = checkboxGroup_normalizeComponent(
  checkboxGroup,
  checkbox_checkboxGroup,
  checkboxGroup___vue_template_functional__,
  checkboxGroup___vue_styles__,
  checkboxGroup___vue_scopeId__,
  checkboxGroup___vue_module_identifier__
)

/* harmony default export */ var packages_checkbox_checkboxGroup = (checkboxGroup_Component.exports);

// CONCATENATED MODULE: ./packages/checkbox/index.js



// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/switch/switch.vue
function switch__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//

/* harmony default export */ var switch_switch = ({
  name: "YSwitch",
  props: {
    value: { type: Boolean, default: false },
    type: { type: String },
    disabled: { type: Boolean, default: false },
    trueText: { type: String },
    falseText: { type: String }
  },
  data: function data() {
    return {
      checked: this.value
    };
  },

  watch: {
    value: function value(val) {
      this.checked = val;
    }
  },
  computed: {
    classes: function classes() {
      var _ref;

      return ["k-switch", (_ref = {}, switch__defineProperty(_ref, "k-switch-checked", this.checked), switch__defineProperty(_ref, "k-switch-disabled", this.disabled), switch__defineProperty(_ref, "k-switch-" + this.type, !!this.type), _ref)];
    }
  },
  methods: {
    change: function change(e) {
      e.preventDefault();

      if (this.disabled) {
        return false;
      }
      var checked = !this.checked;
      this.checked = checked;
      this.$emit("input", checked);
      this.$emit("change", checked);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-37f0519e","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/switch/switch.vue
var switch_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { class: _vm.classes, on: { "click": _vm.change } }, [_c('span', { staticClass: "k-switch-inner" }, [_c('span', [_vm._v(_vm._s(_vm.checked ? _vm.trueText : _vm.falseText))])]), _vm._v(" "), _c('span', { staticClass: "k-switch-button" })]);
};
var switch_staticRenderFns = [];
var switch_esExports = { render: switch_render, staticRenderFns: switch_staticRenderFns };
/* harmony default export */ var selectortype_template_index_0_packages_switch_switch = (switch_esExports);
// CONCATENATED MODULE: ./packages/switch/switch.vue
var switch_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var switch___vue_template_functional__ = false
/* styles */
var switch___vue_styles__ = null
/* scopeId */
var switch___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var switch___vue_module_identifier__ = null
var switch_Component = switch_normalizeComponent(
  switch_switch,
  selectortype_template_index_0_packages_switch_switch,
  switch___vue_template_functional__,
  switch___vue_styles__,
  switch___vue_scopeId__,
  switch___vue_module_identifier__
)

/* harmony default export */ var packages_switch_switch = (switch_Component.exports);

// CONCATENATED MODULE: ./packages/switch/index.js

/* harmony default export */ var packages_switch = (packages_switch_switch);
// CONCATENATED MODULE: ./src/directives/transferDom.js
/* harmony default export */ var transferDom = ({
  inserted: function inserted(el, binding, vnode) {
    var transfer = el.getAttribute ? el.getAttribute('data-transfer') : el.dataset.transfer;
    if (transfer !== 'true') return false;
    var id = 'k-transfer-' + new Date() * 1;
    var box = document.getElementById('k-transfer') || document.createElement('span');
    box.id = id;
    el.data = { id: id };
    box.appendChild(el);
    document.body.appendChild(box);
  },
  componentUpdated: function componentUpdated(el, binding) {
    // if (el.dataset.transfer !== 'true') return false;
  },
  unbind: function unbind(el) {
    // 父组件被移除时，把自己归位，不然会造成 父子组件不同步
    var transfer = el.getAttribute ? el.getAttribute('data-transfer') : el.dataset.transfer;
    if (transfer !== 'true') return false;
    document.body.removeChild(document.getElementById(el.data.id));
  }
});
// CONCATENATED MODULE: ./src/directives/docClick.js
/* harmony default export */ var docClick = ({
    bind: function bind(el, binding) {
        var docClick = function docClick(e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        };
        el._docClick = docClick;
        document.addEventListener('click', docClick);
    },
    unbind: function unbind(el, bind) {
        document.removeEventListener('click', el._docClick);
        delete el._docClick;
    }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/select/select.vue
function select__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var select_select = ({
  name: "YSelect",
  directives: { docClick: docClick, transferDom: transferDom, winScroll: winScroll },
  mixins: [emitter],
  props: {
    filterable: Boolean,
    transfer: { type: Boolean, default: true },
    width: { type: [Number, String], default: 0 },
    value: { type: [String, Number], default: "" },
    clearable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  watch: {
    value: function value(v, v2) {
      console.log(v, v2);
      this.updateSelect(v);
    },
    visible: function visible(val) {
      var _this = this;

      if (this.filterable) {
        if (!val) {
          this.$nextTick(function () {
            _this.children.forEach(function (x) {
              return x.visible = true;
            });
          });

          this.$refs.input.blur();
          this.label = this.selectItem && this.selectItem.label || "";
        }
      }
      this.$emit('open-change', val);
    }
  },
  data: function data() {
    return {
      visible: false,
      dropdownWith: 0,
      left: 0,
      fadeInBottom: false,
      top: 0,
      label: "",
      children: [],
      queryCount: 0,
      selectItem: null
    };
  },
  created: function created() {
    this.$on("select-change", this.change);
    this.$on("select-add", this.add);
    this.$on("select-remove", this.remove);
  },
  mounted: function mounted() {
    var value = this.value;
    if (value === null || value === "" || value === undefined) {
      this.label = "";
      this.selectItem = null;
    }
  },

  computed: {
    classes: function classes() {
      var _ref;

      return ["k-select", (_ref = {}, select__defineProperty(_ref, "k-select-disabled", this.disabled), select__defineProperty(_ref, "k-select-open", this.visible), _ref)];
    },
    selectClass: function selectClass() {
      return ["k-select-selection", select__defineProperty({}, "k-select-isclearable", this.clearable && this.label)];
    },
    selectStyles: function selectStyles() {
      return this.width > 0 ? { width: this.width + "px" } : {};
    },
    dropdownStyles: function dropdownStyles() {
      var style = {};
      style.width = this.dropdownWith + "px";
      style.left = this.left + "px";
      style.top = this.top + "px";
      if (this.fadeInBottom) {
        style["transform-origin"] = "center bottom";
      }
      return style;
    }
  },
  updated: function updated() {
    this.handleScroll();
  },

  methods: {
    remove: function remove(obj) {
      this.children.splice(this.children.indexOf(obj), 1);
    },
    add: function add(child) {
      this.queryCount++;
      child.index = this.children.length;
      var value = this.value;
      child.selected = child.value == value && value !== "" && value != undefined && value !== null;
      if (child.selected) {
        this.label = child.label === undefined ? child.$el.innerHTML : child.label;
        this.selectItem = { label: this.label, value: child.value };
      }
      this.children.push(child);
    },
    handleKeyup: function handleKeyup(e) {
      if (!this.filterable) return;
      this.children.forEach(function (x) {
        return x.query(e.target.value);
      });
      this.queryCount = this.children.filter(function (x) {
        return x.visible;
      }).length;
      this.handleScroll();
    },
    close: function close() {
      this.visible = false;
    },
    updateSelect: function updateSelect(value) {
      var _this2 = this;

      var isNotValue = value !== "" && value != undefined && value !== null;
      this.children.forEach(function (child) {
        child.selected = isNotValue && value == child.value;
        if (child.selected) _this2.label = child.label === undefined ? child.$el.innerHTML : child.label;
      });
      if (value === "" || value === undefined || value === null) this.label = '';
    },
    toggleDrop: function toggleDrop() {
      if (this.disabled) {
        return false;
      }

      this.dropdownWith = this.$refs.rel.offsetWidth;
      this.visible = !this.visible;

      this.handleScroll();
    },
    handleScroll: function handleScroll() {
      var _this3 = this;

      this.$nextTick(function () {
        return _this3.setPosition();
      });
    },
    setPosition: function setPosition() {
      var m = 0;
      var rel = this.$refs.rel;
      var dom = this.$refs.dom;
      if (!dom) return;
      this.dropdownWith = rel.offsetWidth;
      var relPos = this.getElementPos(rel);
      var clientH = window.innerHeight;
      var clientW = window.innerWidth;
      // console.log(relPos)
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;

      var domH = dom.offsetHeight;
      var relH = rel.offsetHeight;
      if (this.transfer) this.left = relPos.left + scrollLeft;
      //new
      if (clientH - relPos.top - relH - m < domH) {
        //空出来的高度不足以放下dom
        this.fadeInBottom = true;
        this.top = this.transfer ? relPos.top - m - domH + scrollTop : -(domH + m);
      } else {
        this.fadeInBottom = false;
        this.top = this.transfer ? relPos.top + relH + m + scrollTop : relH + m;
      }
      // console.log(this.top)
      //console.log(this.fadeInBottom, clientH, relPos.y, relH, m, domH)
      //old
      // if (h - (pos.y - s) - rh < dh) {
      //   this.fadeInBottom = true;
      //   this.top = !this.transfer ? -dh - m : pos.y - dh - m;
      // } else {
      //   this.fadeInBottom = false;
      //   this.top = !this.transfer ? rh + m : pos.y + rh + m;
      // }
    },
    change: function change(item) {
      var _this4 = this;

      this.selectItem = item;
      this.label = item.label;
      //针对value没有定义的情况
      this.$emit("input", item.value);
      if (this.value === '') {
        this.children.forEach(function (child) {
          child.selected = item.value == child.value;
        });
      }
      this.$emit("change", item);

      this.dispatch("FormItem", "form-item-change", item.value);
      this.$nextTick(function () {
        return _this4.visible = false;
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0106d2c6","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/select/select.vue
var select_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "docClick", rawName: "v-docClick", value: _vm.close, expression: "close" }, { name: "winScroll", rawName: "v-winScroll", value: _vm.handleScroll, expression: "handleScroll" }], class: _vm.classes, style: _vm.selectStyles }, [_c('div', { ref: "rel", class: _vm.selectClass, on: { "click": _vm.toggleDrop } }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.label, expression: "label" }], ref: "input", staticClass: "k-select-label", attrs: { "type": "text", "placeholder": "请选择", "readonly": !_vm.filterable || _vm.disabled, "disabled": _vm.disabled }, domProps: { "value": _vm.label }, on: { "keyup": _vm.handleKeyup, "input": function input($event) {
        if ($event.target.composing) {
          return;
        }_vm.label = $event.target.value;
      } } }), _vm._v(" "), _c('span', { staticClass: "k-select-arrow" })]), _vm._v(" "), _c('transition', { attrs: { "name": "dropdown" } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }, { name: "transferDom", rawName: "v-transferDom" }], ref: "dom", staticClass: "k-select-dropdown", style: _vm.dropdownStyles, attrs: { "data-transfer": _vm.transfer } }, [_c('ul', [_vm._t("default"), _vm._v(" "), _vm.children.length == 0 || _vm.queryCount == 0 ? _c('li', { staticClass: "k-select-item" }, [_vm._v("暂无数据...")]) : _vm._e()], 2)])])], 1);
};
var select_staticRenderFns = [];
var select_esExports = { render: select_render, staticRenderFns: select_staticRenderFns };
/* harmony default export */ var selectortype_template_index_0_packages_select_select = (select_esExports);
// CONCATENATED MODULE: ./packages/select/select.vue
var select_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var select___vue_template_functional__ = false
/* styles */
var select___vue_styles__ = null
/* scopeId */
var select___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var select___vue_module_identifier__ = null
var select_Component = select_normalizeComponent(
  select_select,
  selectortype_template_index_0_packages_select_select,
  select___vue_template_functional__,
  select___vue_styles__,
  select___vue_scopeId__,
  select___vue_module_identifier__
)

/* harmony default export */ var packages_select_select = (select_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/select/option.vue
function option__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//


/* harmony default export */ var select_option = ({
  name: "YOption",
  mixins: [emitter],
  props: {
    value: { type: [String, Number], required: true },
    label: { type: [String, Number] },
    disabled: { type: Boolean, default: false }
  },
  data: function data() {
    return {
      selected: false,
      index: 0,
      visible: true
    };
  },

  computed: {
    itemClasses: function itemClasses() {
      var _ref;

      return ["k-select-item", (_ref = {}, option__defineProperty(_ref, "k-select-item-selected", this.selected), option__defineProperty(_ref, "k-select-item-disabled", this.disabled), _ref)];
    }
  },
  methods: {
    select: function select() {
      if (this.disabled) return;
      this.selected = true;
      this.dispatch('YSelect', 'select-change', {
        value: this.value,
        label: this.label === undefined ? this.$el.innerHTML : this.label
      });
    },
    query: function query(_query) {
      // query 转义查询里面的正则
      var label = this.label === undefined ? this.$el.innerHTML : this.label;
      var parsedQuery = String(_query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, "\\$1");
      this.visible = new RegExp(parsedQuery, "i").test(label);
    }
  },
  mounted: function mounted() {
    this.dispatch('YSelect', 'select-add', this);
  },
  beforeDestroy: function beforeDestroy() {
    this.dispatch('YSelect', 'select-remove', this);
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-c5c92c6e","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/select/option.vue
var option_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], class: _vm.itemClasses, on: { "click": function click($event) {
        $event.stopPropagation();return _vm.select($event);
      } } }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2);
};
var option_staticRenderFns = [];
var option_esExports = { render: option_render, staticRenderFns: option_staticRenderFns };
/* harmony default export */ var selectortype_template_index_0_packages_select_option = (option_esExports);
// CONCATENATED MODULE: ./packages/select/option.vue
var option_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var option___vue_template_functional__ = false
/* styles */
var option___vue_styles__ = null
/* scopeId */
var option___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var option___vue_module_identifier__ = null
var option_Component = option_normalizeComponent(
  select_option,
  selectortype_template_index_0_packages_select_option,
  option___vue_template_functional__,
  option___vue_styles__,
  option___vue_scopeId__,
  option___vue_module_identifier__
)

/* harmony default export */ var packages_select_option = (option_Component.exports);

// CONCATENATED MODULE: ./packages/select/index.js



// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/digitalInput/digital.vue
function digital__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//

/* harmony default export */ var digital = ({
	name: 'YDigital',
	props: {
		disabled: { type: Boolean, default: false },
		value: {
			default: 0,
			type: Number,
			validator: function validator(val) {
				return val >= 0;
			}
		},
		mode: { type: String, default: "" },
		step: {
			default: 1,
			type: Number
		},
		min: {
			default: 1,
			type: Number
		},
		max: {
			default: Number.MAX_SAFE_INTEGER,
			type: Number
		},
		name: {
			type: String
		}
	},
	data: function data() {
		return {
			myvalue: this.value
		};
	},

	watch: {
		value: function value(val) {
			this.myvalue = val;
		}
	},
	computed: {
		classes: function classes() {
			var _ref;

			return ["k-digital", (_ref = {}, digital__defineProperty(_ref, "k-digital-disabled", this.disabled), digital__defineProperty(_ref, "k-digital-" + this.mode, this.mode), _ref)];
		}
	},
	methods: {
		increase: function increase() {
			this.myvalue = this.myvalue + this.step;
			if (this.myvalue > this.max) {
				this.myvalue = this.max;
			}
		},
		decrease: function decrease() {
			this.myvalue = this.myvalue - this.step;
			if (this.myvalue < this.min) {
				this.myvalue = this.min;
			}
		}
	}
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-b0d2490c","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/digitalInput/digital.vue
var digital_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes }, [_c('button', { staticClass: "k-digital-btn k-digital-left icon-reduce", attrs: { "type": "button", "disabled": _vm.disabled }, on: { "click": _vm.decrease } }), _vm._v(" "), _c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.myvalue, expression: "myvalue" }], staticClass: "k-digital-input", attrs: { "type": "text", "name": _vm.name, "disabled": _vm.disabled }, domProps: { "value": _vm.myvalue }, on: { "input": function input($event) {
        if ($event.target.composing) {
          return;
        }_vm.myvalue = $event.target.value;
      } } }), _vm._v(" "), _c('button', { staticClass: "k-digital-btn k-digital-right icon-add", attrs: { "type": "button", "disabled": _vm.disabled }, on: { "click": _vm.increase } })]);
};
var digital_staticRenderFns = [];
var digital_esExports = { render: digital_render, staticRenderFns: digital_staticRenderFns };
/* harmony default export */ var digitalInput_digital = (digital_esExports);
// CONCATENATED MODULE: ./packages/digitalInput/digital.vue
var digital_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var digital___vue_template_functional__ = false
/* styles */
var digital___vue_styles__ = null
/* scopeId */
var digital___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var digital___vue_module_identifier__ = null
var digital_Component = digital_normalizeComponent(
  digital,
  digitalInput_digital,
  digital___vue_template_functional__,
  digital___vue_styles__,
  digital___vue_scopeId__,
  digital___vue_module_identifier__
)

/* harmony default export */ var packages_digitalInput_digital = (digital_Component.exports);

// CONCATENATED MODULE: ./packages/digitalInput/index.js


/* harmony default export */ var digitalInput = (packages_digitalInput_digital);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/scrollbar/src/scrollbar.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var scrollbar = ({
  name: "YScrollbar",
  data: function data() {
    return {
      sizeHeight: '0',
      sizeWidth: '0',
      moveY: 0,
      moveX: 0,
      translate: ''
    };
  },

  computed: {
    wrap: function wrap() {
      return this.$refs.wrap;
    }
  },
  methods: {
    handleScroll: function handleScroll() {
      var wrap = this.wrap;

      this.moveY = wrap.scrollTop * 100 / wrap.clientHeight;
      this.translate = 'translateY(' + this.moveY + '%)';
      this.moveX = wrap.scrollLeft * 100 / wrap.clientWidth;
    },
    update: function update() {
      var heightPercentage = void 0,
          widthPercentage = void 0;
      var wrap = this.wrap;
      if (!wrap) return;
      heightPercentage = wrap.clientHeight * 100 / wrap.scrollHeight;
      widthPercentage = wrap.clientWidth * 100 / wrap.scrollWidth;
      this.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : '';
      this.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : '';
    }
  },
  mounted: function mounted() {
    var wrap = this.wrap;
    wrap.addEventListener('scroll', this.handleScroll);
    this.$nextTick(this.update);
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7073290a","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/scrollbar/src/scrollbar.vue
var scrollbar_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "k-scrollbar" }, [_c('div', { ref: "wrap", staticClass: "k-scrollbar-wrap" }, [_c('div', { staticClass: "k-scrollbar-view" }, [_vm._t("default")], 2)]), _vm._v(" "), _c('div', { staticClass: "k-scrollbar-bar" }, [_c('div', { staticClass: "k-scrollbar-thumb", style: { height: _vm.sizeHeight, transform: _vm.translate } })])]);
};
var scrollbar_staticRenderFns = [];
var scrollbar_esExports = { render: scrollbar_render, staticRenderFns: scrollbar_staticRenderFns };
/* harmony default export */ var src_scrollbar = (scrollbar_esExports);
// CONCATENATED MODULE: ./packages/scrollbar/src/scrollbar.vue
function injectStyle (ssrContext) {
  __webpack_require__(6)
}
var scrollbar_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var scrollbar___vue_template_functional__ = false
/* styles */
var scrollbar___vue_styles__ = injectStyle
/* scopeId */
var scrollbar___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var scrollbar___vue_module_identifier__ = null
var scrollbar_Component = scrollbar_normalizeComponent(
  scrollbar,
  src_scrollbar,
  scrollbar___vue_template_functional__,
  scrollbar___vue_styles__,
  scrollbar___vue_scopeId__,
  scrollbar___vue_module_identifier__
)

/* harmony default export */ var scrollbar_src_scrollbar = (scrollbar_Component.exports);

// CONCATENATED MODULE: ./packages/scrollbar/index.js
/**
 * author LQF
 * date:18/09/03
 */


scrollbar_src_scrollbar.install = function (Vue) {
  Vue.component(scrollbar_src_scrollbar.name, scrollbar_src_scrollbar);
};

/* harmony default export */ var packages_scrollbar = (scrollbar_src_scrollbar);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/datePicker/datecalendar.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var datecalendar = ({
  name: "Calendar",
  props: {
    value: null,
    left: false,
    right: false
  },
  data: function data() {
    var time = this.get(this.value);
    return {
      pre: "k-calendar",
      m: "D",
      showYears: false,
      showMonths: false,
      showHours: false,
      showMinutes: false,
      showSeconds: false,
      year: time.year,
      month: time.month,
      day: time.day,
      hour: time.hour,
      minute: time.minute,
      second: time.second
    };
  },

  watch: {
    value: function value(val) {
      var time = this.get(val);
      this.year = time.year;
      this.month = time.month;
      this.day = time.day;
      this.hour = time.hour;
      this.minute = time.minute;
      this.second = time.second;
    }
  },
  computed: {
    local: function local() {
      return this.$parent.local;
    },
    format: function format() {
      return this.$parent.format;
    },
    start: function start() {
      return this.parse(this.$parent.dates[0]);
    },
    end: function end() {
      return this.parse(this.$parent.dates[1]);
    },
    ys: function ys() {
      return parseInt(this.year / 10) * 10;
    },
    ye: function ye() {
      return this.ys + 10;
    },
    years: function years() {
      var arr = [];
      var start = this.ys;
      while (arr.length < 11) {
        arr.push(start++);
      }
      return arr;
    },
    days: function days() {
      var days = [];
      var year = this.year;
      var month = this.month;
      var time = new Date(year, month, 1);
      var dow = this.local.dow || 7;
      time.setDate(0); // switch to the last day of last month
      var lastDay = time.getDate();
      var week = time.getDay() || 7;
      var count = dow <= week ? week - dow + 1 : week + (7 - dow + 1);
      while (count > 0) {
        days.push({
          i: lastDay - count + 1,
          y: month > 0 ? year : year - 1,
          m: month > 0 ? month - 1 : 11,
          p: true
        });
        count--;
      }
      time.setMonth(time.getMonth() + 2, 0); // switch to the last day of the current month
      lastDay = time.getDate();
      var i = 1;
      for (i = 1; i <= lastDay; i++) {
        days.push({ i: i, y: year, m: month });
      }
      for (i = 1; days.length < 42; i++) {
        days.push({
          i: i,
          y: month < 11 ? year : year + 1,
          m: month < 11 ? month + 1 : 0,
          n: true
        });
      }
      return days;
    }
  },
  filters: {
    dd: function dd(val) {
      return ("0" + val).slice(-2);
    }
  },
  methods: {
    get: function get(time) {
      if (!time) {
        var d1 = this.$parent.dates[0];
        time = new Date();
        if (this.right && !d1) {
          var d2 = new Date();
          d2.setMonth(d2.getMonth() + 1);
          time = d2;
        }
      }
      return {
        year: time.getFullYear(),
        month: time.getMonth(),
        day: time.getDate(),
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
      };
    },
    parse: function parse(num) {
      return parseInt(num / 1000);
    },
    status: function status(year, month, day, hour, minute, second, format) {
      var maxDay = new Date(year, month + 1, 0).getDate();
      var time = new Date(year, month, day > maxDay ? maxDay : day, hour, minute, second);
      var today = new Date();

      var t = this.parse(time);
      var f = this.$parent.formatDate;
      var classObj = {};
      var flag = false;
      var istoday = false;
      if (format == 'YYYYMMDD') {
        istoday = today.getFullYear() == year && today.getMonth() == month && today.getDate() == day;
      }
      if (format === "YYYY") {
        flag = year === this.year;
      } else if (format === "YYYYMM") {
        flag = month === this.month;
      } else {
        flag = f(this.value, format) === f(time, format);
      }
      classObj[this.pre + "-date"] = true;
      classObj[this.pre + "-date-disabled"] = this.right && t < this.start || this.left && t > this.end || this.$parent.disabledDate(time);
      classObj[this.pre + "-date-on"] = this.left && t > this.start || this.right && t < this.end;
      classObj[this.pre + "-date-selected"] = flag;
      classObj[this.pre + "-date-today"] = istoday;
      return classObj;
    },
    nextMonth: function nextMonth() {
      if (this.month < 11) {
        this.month++;
      } else {
        this.month = 0;
        this.year++;
      }
    },
    prevMonth: function prevMonth() {
      if (this.month > 0) {
        this.month--;
      } else {
        this.month = 11;
        this.year--;
      }
    },
    is: function is(e) {
      return e.target.className.indexOf(this.pre + "-date-disabled") === -1;
    },
    ok: function ok(info) {
      var year = "";
      var month = "";
      info && info.n && this.nextMonth();
      info && info.p && this.prevMonth();
      if (info === "h") {
        var time = this.get(this.value);
        year = time.year;
        month = time.month;
      }
      var d = new Date(year || this.year, month || this.month, this.day, this.hour, this.minute, this.second);
      this.$emit("input", d);
      var d1 = this.$parent.dates[0];
      if (d1 && this.right || !this.$parent.range) {
        this.$parent.ok();
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    var is = function is(c) {
      return _this.format.indexOf(c) !== -1;
    };
    if (is("s") && is("m") && (is("h") || is("H"))) {
      this.m = "H";
    } else if (is("D")) {
      this.m = "D";
    } else if (is("M")) {
      this.m = "M";
      this.showMonths = true;
    } else if (is("Y")) {
      this.m = "Y";
      this.showYears = true;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-09ce37d6","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/datePicker/datecalendar.vue
var datecalendar_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: "" + _vm.pre }, [_c('div', { class: _vm.pre + "-head" }, [_c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.showYears, expression: "showYears" }], class: _vm.pre + "-prev-decade-btn", on: { "click": function click($event) {
        _vm.year -= 10;
      } } }, [_vm._v("«")]), _vm._v(" "), _c('span', { directives: [{ name: "show", rawName: "v-show", value: !_vm.showYears, expression: "!showYears" }], class: _vm.pre + "-prev-year-btn", on: { "click": function click($event) {
        _vm.year--;
      } } }, [_vm._v("«")]), _vm._v(" "), _c('span', { directives: [{ name: "show", rawName: "v-show", value: !_vm.showYears && !_vm.showMonths, expression: "!showYears&&!showMonths" }], class: _vm.pre + "-prev-month-btn", on: { "click": _vm.prevMonth } }, [_vm._v("‹")]), _vm._v(" "), _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.showYears, expression: "showYears" }], class: _vm.pre + "-year-select" }, [_vm._v(_vm._s(_vm.ys + ' - ' + _vm.ye))]), _vm._v(" "), _vm.local.yearSuffix ? [_c('span', { directives: [{ name: "show", rawName: "v-show", value: !_vm.showYears, expression: "!showYears" }], class: _vm.pre + "-year-select", on: { "click": function click($event) {
        _vm.showYears = !_vm.showYears;
      } } }, [_vm._v(_vm._s(_vm.year) + _vm._s(_vm.local.yearSuffix))]), _vm._v(" "), _c('span', { directives: [{ name: "show", rawName: "v-show", value: !_vm.showYears && !_vm.showMonths, expression: "!showYears&&!showMonths" }], class: _vm.pre + "-month-select", on: { "click": function click($event) {
        _vm.showMonths = !_vm.showMonths;
      } } }, [_vm._v(_vm._s(_vm.local.monthsHead[_vm.month]))])] : [_c('span', { directives: [{ name: "show", rawName: "v-show", value: !_vm.showYears && !_vm.showMonths, expression: "!showYears&&!showMonths" }], class: _vm.pre + "-month-select", on: { "click": function click($event) {
        _vm.showMonths = !_vm.showMonths;
      } } }, [_vm._v(_vm._s(_vm.local.monthsHead[_vm.month]))]), _vm._v(" "), _c('span', { directives: [{ name: "show", rawName: "v-show", value: !_vm.showYears, expression: "!showYears" }], class: _vm.pre + "-year-select", on: { "click": function click($event) {
        _vm.showYears = !_vm.showYears;
      } } }, [_vm._v(_vm._s(_vm.year))])], _vm._v(" "), _c('span', { directives: [{ name: "show", rawName: "v-show", value: !_vm.showYears && !_vm.showMonths, expression: "!showYears&&!showMonths" }], class: _vm.pre + "-next-month-btn", on: { "click": _vm.nextMonth } }, [_vm._v("›")]), _vm._v(" "), _c('span', { directives: [{ name: "show", rawName: "v-show", value: !_vm.showYears, expression: "!showYears" }], class: _vm.pre + "-next-year-btn", on: { "click": function click($event) {
        _vm.year++;
      } } }, [_vm._v("»")]), _vm._v(" "), _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.showYears, expression: "showYears" }], class: _vm.pre + "-next-decade-btn", on: { "click": function click($event) {
        _vm.year += 10;
      } } }, [_vm._v("»")])], 2), _vm._v(" "), _c('div', { class: _vm.pre + "-body" }, [_c('div', { class: _vm.pre + "-days" }, [_vm._l(_vm.local.weeks, function (i) {
    return _c('span', { key: i, class: _vm.pre + "-week" }, [_vm._v(_vm._s(i))]);
  }), _vm._v(" "), _vm._l(_vm.days, function (j, x) {
    return _c('span', { key: x, class: [j.p || j.n ? _vm.pre + "-date-out" : '', _vm.status(j.y, j.m, j.i, _vm.hour, _vm.minute, _vm.second, 'YYYYMMDD')], on: { "click": function click($event) {
          _vm.is($event) && (_vm.day = j.i, _vm.ok(j));
        } } }, [_vm._v(_vm._s(j.i))]);
  })], 2), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showMonths, expression: "showMonths" }], class: _vm.pre + "-months" }, _vm._l(_vm.local.months, function (i, j) {
    return _c('span', { key: j, class: [_vm.status(_vm.year, j, _vm.day, _vm.hour, _vm.minute, _vm.second, 'YYYYMM')], on: { "click": function click($event) {
          _vm.is($event) && (_vm.showMonths = _vm.m === 'M', _vm.month = j, _vm.m === 'M' && _vm.ok());
        } } }, [_vm._v(_vm._s(i))]);
  })), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showYears, expression: "showYears" }], class: _vm.pre + "-years" }, _vm._l(_vm.years, function (i, j) {
    return _c('span', { key: j, class: [j === 12 ? _vm.pre + "-date-out" : '', _vm.status(i, _vm.month, _vm.day, _vm.hour, _vm.minute, _vm.second, 'YYYY')], on: { "click": function click($event) {
          _vm.is($event) && (_vm.showYears = _vm.m === 'Y', _vm.year = i, _vm.m === 'Y' && _vm.ok());
        } } }, [_vm._v(_vm._s(i))]);
  })), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showHours, expression: "showHours" }], class: _vm.pre + "-hours" }, [_c('div', { class: _vm.pre + "-title" }, [_vm._v(_vm._s(_vm.local.hourTip))]), _vm._v(" "), _vm._l(24, function (j, i) {
    return _c('span', { key: i, class: [_vm.status(_vm.year, _vm.month, _vm.day, i, _vm.minute, _vm.second, 'YYYYMMDDHH')], on: { "click": function click($event) {
          _vm.is($event) && (_vm.showHours = false, _vm.hour = i, _vm.ok('h'));
        } } }, [_vm._v(_vm._s(i))]);
  })], 2), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showMinutes, expression: "showMinutes" }], class: _vm.pre + "-minutes" }, [_c('div', { class: _vm.pre + "-title" }, [_vm._v(_vm._s(_vm.local.minuteTip))]), _vm._v(" "), _vm._l(60, function (j, i) {
    return _c('span', { key: i, class: [_vm.status(_vm.year, _vm.month, _vm.day, _vm.hour, i, _vm.second, 'YYYYMMDDHHmm')], on: { "click": function click($event) {
          _vm.is($event) && (_vm.showMinutes = false, _vm.minute = i, _vm.ok('h'));
        } } }, [_vm._v(_vm._s(i))]);
  })], 2), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showSeconds, expression: "showSeconds" }], class: _vm.pre + "-seconds" }, [_c('div', { class: _vm.pre + "-title" }, [_vm._v(_vm._s(_vm.local.secondTip))]), _vm._v(" "), _vm._l(60, function (j, i) {
    return _c('span', { key: i, class: [_vm.status(_vm.year, _vm.month, _vm.day, _vm.hour, _vm.minute, i, 'YYYYMMDDHHmmss')], on: { "click": function click($event) {
          _vm.is($event) && (_vm.showSeconds = false, _vm.second = i, _vm.ok('h'));
        } } }, [_vm._v(_vm._s(i))]);
  })], 2)]), _vm._v(" "), _vm.m === 'H' ? _c('div', { class: _vm.pre + "-foot" }, [_c('div', { class: _vm.pre + "-hour" }, [_c('span', { class: { on: _vm.showHours }, attrs: { "title": _vm.local.hourTip }, on: { "click": function click($event) {
        _vm.showHours = !_vm.showHours, _vm.showMinutes = _vm.showSeconds = false;
      } } }, [_vm._v(_vm._s(_vm._f("dd")(_vm.hour)))]), _vm._v(" "), _c('span', [_vm._v(":")]), _vm._v(" "), _c('span', { class: { on: _vm.showMinutes }, attrs: { "title": _vm.local.minuteTip }, on: { "click": function click($event) {
        _vm.showMinutes = !_vm.showMinutes, _vm.showHours = _vm.showSeconds = false;
      } } }, [_vm._v(_vm._s(_vm._f("dd")(_vm.minute)))]), _vm._v(" "), _c('span', [_vm._v(":")]), _vm._v(" "), _c('span', { class: { on: _vm.showSeconds }, attrs: { "title": _vm.local.secondTip }, on: { "click": function click($event) {
        _vm.showSeconds = !_vm.showSeconds, _vm.showHours = _vm.showMinutes = false;
      } } }, [_vm._v(_vm._s(_vm._f("dd")(_vm.second)))])])]) : _vm._e()]);
};
var datecalendar_staticRenderFns = [];
var datecalendar_esExports = { render: datecalendar_render, staticRenderFns: datecalendar_staticRenderFns };
/* harmony default export */ var datePicker_datecalendar = (datecalendar_esExports);
// CONCATENATED MODULE: ./packages/datePicker/datecalendar.vue
var datecalendar_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var datecalendar___vue_template_functional__ = false
/* styles */
var datecalendar___vue_styles__ = null
/* scopeId */
var datecalendar___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var datecalendar___vue_module_identifier__ = null
var datecalendar_Component = datecalendar_normalizeComponent(
  datecalendar,
  datePicker_datecalendar,
  datecalendar___vue_template_functional__,
  datecalendar___vue_styles__,
  datecalendar___vue_scopeId__,
  datecalendar___vue_module_identifier__
)

/* harmony default export */ var packages_datePicker_datecalendar = (datecalendar_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/datePicker/datepicker.vue
function datepicker__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var datepicker = ({
  name: "YDatePicker",
  directives: { docClick: docClick, transferDom: transferDom, winScroll: winScroll },
  components: {
    Calendar: packages_datePicker_datecalendar
  },
  mixins: [emitter],
  props: {
    transfer: { type: Boolean, default: true },
    width: [String, Number],
    mini: Boolean,
    name: [String],
    value: [Date, Array, String],
    disabled: [Boolean],
    rangeSeparator: { type: String, default: "~" },
    clearable: { type: Boolean, default: false },
    placeholder: [String],
    lang: {
      type: String,
      default: "zh",
      validator: function validator(value) {
        return ["zh", "en"].indexOf(value) >= 0;
      }
    },
    disabledDate: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    format: { type: String, default: "YYYY-MM-DD" }
  },
  data: function data() {
    return {
      text: "",
      visible: false,
      left: 0,
      fadeInBottom: false,
      top: 0,
      dates: this.vi(this.value),
      local: {}
    };
  },

  computed: {
    styles: function styles() {
      return this.width > 0 ? { width: this.width + "px" } : {};
    },
    classes: function classes() {
      var _ref;

      return ["k-datepicker", (_ref = {}, datepicker__defineProperty(_ref, "k-datepicker-range", this.rangeSeparator), datepicker__defineProperty(_ref, "k-datepicker-clearable", this.clearable && !this.disabled), datepicker__defineProperty(_ref, "k-datepicker-mini", this.mini), _ref)];
    },
    inputClass: function inputClass() {
      return ["k-datepicker-input", datepicker__defineProperty({}, "focus", this.visible)];
    },
    popupStyle: function popupStyle() {
      var style = {};
      this.range && (style.width = "563px");
      style.left = this.left + "px";
      style.top = this.top + "px";
      if (this.fadeInBottom) {
        style["transform-origin"] = "center bottom 0px";
      }
      return style;
    },
    range: function range() {
      // return this.dates.length === 2;
      // console.log(Array.isArray(this.dates),)
      return Array.isArray(this.value);
    }
  },
  /* boforeCreated(){
    this.local = require(`./lang/${this.lang}.js`);
  }, */
  created: function created() {
    this.local = __webpack_require__(9)("./" + this.lang + ".js");
    this.value != "" && this.value != [] && this.setText();
  },

  watch: {
    value: function value(val) {
      var d = Array.isArray(val) ? val.join(this.rangeSeparator) : val;
      this.text = d;
      this.$emit("change", this.text);
    },
    dates: function dates(val) {
      var _this = this;

      var date = this.dates.map(function (date) {
        return _this.formatDate(date);
      });
      var txt = date.join(" " + this.rangeSeparator + " ");
      var text = date.length == 1 ? date[0] : txt;
      this.$emit("change", text);
    }
  },
  methods: {
    close: function close(e) {
      if (this.$refs.dom && !this.$refs.dom.contains(e.target)) {
        this.visible = false;
      }
      // if (!this.transfer) {
      //   this.visible = false;
      // } else {
      //   this.visible = this.$refs.dom.contains(e.target);
      // }
    },
    toggleDrop: function toggleDrop() {
      var _this2 = this;

      if (!this.disabled) {
        this.visible = !this.visible;
        this.$nextTick(function () {
          return _this2.setPosition();
        });
      }
    },
    handleScroll: function handleScroll() {
      var _this3 = this;

      this.$nextTick(function () {
        return _this3.setPosition();
      });
    },
    setPosition: function setPosition() {
      var m = 0;
      var rel = this.$refs.rel;
      var dom = this.$refs.dom;
      if (!dom) return;
      var relPos = this.getElementPos(rel);
      var clientH = window.innerHeight;
      var clientW = window.innerWidth;

      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;

      var domH = dom.offsetHeight;
      var relH = rel.offsetHeight;
      if (this.transfer) this.left = relPos.left + scrollLeft;
      //new
      if (clientH - relPos.top - relH - m < domH) {
        //空出来的高度不足以放下dom
        this.fadeInBottom = true;
        this.top = this.transfer ? relPos.top - m - domH + scrollTop : -(domH + m);
      } else {
        this.fadeInBottom = false;
        this.top = this.transfer ? relPos.top + relH + m + scrollTop : relH + m;
      }
    },
    setText: function setText() {
      var _this4 = this;

      var date = this.dates.map(function (date) {
        return _this4.formatDate(date);
      });
      var txt = date.join(" " + this.rangeSeparator + " ");
      this.text = this.value ? date.length == 1 ? date[0] : txt : "";
    },
    clear: function clear() {
      this.dates = [];
      this.$emit("input", this.range ? [] : "");
      this.setText();
      this.dispatch("FormItem", "form-item-change", this.range ? [] : "");
    },
    vi: function vi(val) {
      //在ie浏览器里面new Date() 格式必须为yyy/MM/dd 其他格式均不识别
      if (Array.isArray(val)) {
        return val.length > 1 ? val.map(function (item, i) {
          return item ? new Date(item.toString().replace(/-/g, "/")) : '';
        }) : [];
      } else {
        return val ? new Array(new Date(val.toString().replace(/-/g, "/"))) : [];
      }
    },
    ok: function ok() {
      var _this5 = this;

      var date = this.dates.map(function (date) {
        return _this5.formatDate(date);
      });
      var txt = date.join(" " + this.rangeSeparator + " ");
      this.text = date.length == 1 ? date[0] : txt;

      this.$emit("input", date.length == 1 ? date[0] : date);
      this.dispatch("FormItem", "form-item-change", date.length == 1 ? date[0] : date);
      this.visible = false;
    },
    formatDate: function formatDate(time, format) {
      if (!time) return '';
      var year = time.getFullYear();
      var month = time.getMonth();
      var day = time.getDate();
      var hours24 = time.getHours();
      var hours = hours24 % 12 === 0 ? 12 : hours24 % 12;
      var minutes = time.getMinutes();
      var seconds = time.getSeconds();
      var milliseconds = time.getMilliseconds();
      var dd = function dd(t) {
        return ("0" + t).slice(-2);
      };
      var map = {
        YYYY: year,
        MM: dd(month + 1),
        MMM: this.local.months[month],
        MMMM: this.local.monthsHead[month],
        M: month + 1,
        DD: dd(day),
        D: day,
        HH: dd(hours24),
        H: hours24,
        hh: dd(hours),
        h: hours,
        mm: dd(minutes),
        m: minutes,
        ss: dd(seconds),
        s: seconds,
        S: milliseconds
      };
      return (format || this.format).replace(/Y+|M+|D+|H+|h+|m+|s+|S+/g, function (str) {
        return map[str];
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4de3806b","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/datePicker/datepicker.vue
var datepicker_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "docClick", rawName: "v-docClick", value: _vm.close, expression: "close" }, { name: "winScroll", rawName: "v-winScroll", value: _vm.handleScroll, expression: "handleScroll" }], class: _vm.classes, style: _vm.styles }, [_c('input', { ref: "rel", class: _vm.inputClass, attrs: { "readonly": "", "type": "text", "disabled": _vm.disabled, "placeholder": _vm.placeholder, "name": _vm.name }, domProps: { "value": _vm.text }, on: { "click": _vm.toggleDrop } }), _vm._v(" "), _vm.clearable && !_vm.disabled ? _c('a', { staticClass: "k-datepicker-close", on: { "click": function click($event) {
        $event.stopPropagation();return _vm.clear($event);
      } } }) : _vm._e(), _vm._v(" "), _c('transition', { attrs: { "name": "dropdown" } }, [_vm.visible ? _c('div', { directives: [{ name: "transferDom", rawName: "v-transferDom" }], ref: "dom", staticClass: "k-datepicker-popup", style: _vm.popupStyle, attrs: { "tabindex": "-1", "data-transfer": _vm.transfer } }, [_vm.range ? [_c('Calendar', { staticClass: "k-calendar-left", attrs: { "left": true }, model: { value: _vm.dates[0], callback: function callback($$v) {
        _vm.$set(_vm.dates, 0, $$v);
      }, expression: "dates[0]" } }), _vm._v(" "), _c('Calendar', { staticClass: "k-calendar-right", attrs: { "right": true }, model: { value: _vm.dates[1], callback: function callback($$v) {
        _vm.$set(_vm.dates, 1, $$v);
      }, expression: "dates[1]" } })] : [_c('Calendar', { model: { value: _vm.dates[0], callback: function callback($$v) {
        _vm.$set(_vm.dates, 0, $$v);
      }, expression: "dates[0]" } })]], 2) : _vm._e()])], 1);
};
var datepicker_staticRenderFns = [];
var datepicker_esExports = { render: datepicker_render, staticRenderFns: datepicker_staticRenderFns };
/* harmony default export */ var datePicker_datepicker = (datepicker_esExports);
// CONCATENATED MODULE: ./packages/datePicker/datepicker.vue
var datepicker_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var datepicker___vue_template_functional__ = false
/* styles */
var datepicker___vue_styles__ = null
/* scopeId */
var datepicker___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var datepicker___vue_module_identifier__ = null
var datepicker_Component = datepicker_normalizeComponent(
  datepicker,
  datePicker_datepicker,
  datepicker___vue_template_functional__,
  datepicker___vue_styles__,
  datepicker___vue_scopeId__,
  datepicker___vue_module_identifier__
)

/* harmony default export */ var packages_datePicker_datepicker = (datepicker_Component.exports);

// CONCATENATED MODULE: ./packages/datePicker/index.js

/* harmony default export */ var datePicker = (packages_datePicker_datepicker);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/form/form.vue
function form__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//



/* harmony default export */ var form_form = ({
  name: "Form",
  mixins: [emitter],
  props: {
    labelAlign: { type: String, default: 'right' },
    model: { type: Object },
    rules: { type: Object },
    labelWidth: { type: [Number, String], default: 80 }
  },
  data: function data() {
    return {
      fields: []
    };
  },

  computed: {
    classes: function classes() {
      return ["k-form", form__defineProperty({}, 'k-form-' + this.labelAlign, this.labelAlign)];
    }
  },
  created: function created() {
    this.$on('form-reset-field', this.resetField);
    this.$on('form-add-field', this.addField);
    this.$on('form-remove-field', this.removeField);
  },

  methods: {
    resetField: function resetField(key) {
      if (this.model && this.model[key]) {
        var type = Object.prototype.toString.call(this.model[key]);
        if (type === '[object Object]') this.model[key] = {};else if (type === '[object Array]') this.model[key] = [];else this.model[key] = '';
      }
    },
    resetFields: function resetFields() {
      // this.broadcast('FormItem', 'form-item-reset')
      this.fields.forEach(function (child) {
        return child.reset();
      });
    },
    removeField: function removeField(field) {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
    },
    addField: function addField(field) {
      if (field.prop) {
        field.fieldValue = this.getProp(this.model, field.prop).value;
        if (!field.Rules && this.rules) {
          field.Rules = this.getProp(this.rules, field.prop).value;
        }
        field.required = field.Rules && field.Rules.filter(function (field) {
          return field.required;
        }).length > 0;
        this.fields.push(field);
      }
    },
    getProp: function getProp(model, path) {
      path = path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');
      var keys = path.split('.');
      var newModel = model;
      var len = keys.length - 1;
      for (var i = 0; i < len; i++) {
        var key = keys[i];
        if (key in newModel) {
          newModel = newModel[key];
        } else {
          throw new Error('请传入正确的prop值');
        }
      }
      return {
        model: newModel,
        key: keys[len],
        value: newModel[keys[len]]
      };
    },
    validate: function validate(callback) {
      var isValid = true;
      this.fields.forEach(function (field) {
        field.validates(null, function (valid) {
          if (!valid) isValid = valid;
        });
      });
      if (typeof callback == 'function') {
        callback(isValid);
      }
    },
    validateField: function validateField(key) {
      var field = this.fields.filter(function (x) {
        return x.prop == key;
      })[0];
      if (field) {
        field.validates();
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-21d41c87","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/form/form.vue
var form_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_c('form', { class: _vm.classes, attrs: { "autocomplete": "off" } }, [_vm._t("default")], 2)]);
};
var form_staticRenderFns = [];
var form_esExports = { render: form_render, staticRenderFns: form_staticRenderFns };
/* harmony default export */ var selectortype_template_index_0_packages_form_form = (form_esExports);
// CONCATENATED MODULE: ./packages/form/form.vue
var form_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var form___vue_template_functional__ = false
/* styles */
var form___vue_styles__ = null
/* scopeId */
var form___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var form___vue_module_identifier__ = null
var form_Component = form_normalizeComponent(
  form_form,
  selectortype_template_index_0_packages_form_form,
  form___vue_template_functional__,
  form___vue_styles__,
  form___vue_scopeId__,
  form___vue_module_identifier__
)

/* harmony default export */ var packages_form_form = (form_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/form/formitem.vue
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var formitem = ({
  name: "FormItem",
  mixins: [emitter],
  props: {
    label: String,
    rules: { type: Array },
    prop: String,
    labelWidth: [String, Number]
  },
  data: function data() {
    return {
      form: this.getParent('Form'),
      formitem: this.getParent('FormItem'),
      required: false,
      valid: true,
      fieldValue: '',
      errorTip: '',
      Rules: this.rules,
      width: this.labelWidth
    };
  },

  computed: {
    classes: function classes() {
      return ["k-form-item", {
        "k-form-item-required": this.required,
        "k-form-item-error": !this.valid
      }];
    },
    labelStyles: function labelStyles() {
      var formitem = this.getParent('FormItem');
      var width = this.width || this.form && this.form.labelWidth || 0;
      return width && !formitem ? { width: width + 'px' } : {};
    },
    contentStyles: function contentStyles() {
      var formitem = this.getParent('FormItem');
      var width = this.width || this.form && this.form.labelWidth || 0;
      return width && this.form.labelAlign != 'top' && !formitem ? { marginLeft: width + 'px' } : {};
    }
  },
  created: function created() {
    this.$on('form-item-change', this.change);
    this.$on('form-item-blur', this.blur);
    this.$on('form-item-reset', this.reset);
  },
  mounted: function mounted() {
    this.prop && this.dispatch('Form', 'form-add-field', this);
  },
  beforeDestroy: function beforeDestroy() {
    this.dispatch('Form', 'form-remove-field', this);
  },

  methods: {
    change: function change(value) {
      //对于select，checkbox ，radio 类型传值
      this.fieldValue = Object.prototype.toString.call(value) == '[object Object]' ? value.field : value;
      this.validates('change');
    },
    blur: function blur(value) {
      //目前只对于input ，textarea 有blur 事件
      this.fieldValue = value;
      this.validates('blur');
    },
    reset: function reset() {
      if (this.prop) {
        this.dispatch('Form', 'form-reset-field', this.prop);
        this.valid = true;
        // let prop = this.form.getProp(this.form.model, this.prop)
        if (Array.isArray(this.fieldValue)) {
          // prop.model[prop.key] = []
          this.fieldValue = [];
        } else {
          // prop.model[prop.key] = ''
          this.fieldValue = '';
        }
      }
    },
    test: function test(rule, trigger) {
      var valid = true;
      var message = rule.message || '此项是必填项';
      var type = Object.prototype.toString.call(this.fieldValue);
      if (this.fieldValue === '' && type == '[object String]' && rule.required) {
        valid = false;
      } else if (this.fieldValue.length == 0 && type == '[object Array]' && rule.required) {
        valid = false;
      } else if (rule.min && this.fieldValue.length < rule.min) {
        valid = false;
        message = rule.message || (type == '[object Array]' ? 'Choose at least ' + rule.min + ' item' : 'Introduce no less than ' + rule.min + ' words');
      } else if (rule.max && this.fieldValue.length > rule.max) {
        valid = false;
        message = rule.message || (type == '[object Array]' ? 'Choose ' + rule.max + ' items at best' : 'Introduce no more than ' + rule.max + ' words');
      } else if (rule.pattner) {
        valid = rule.pattner.test(this.fieldValue);
        message = rule.message || '不正确的邮箱格式';
      } else if (rule.type == 'mail') {
        valid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.fieldValue);
        message = rule.message || '不正确的邮箱格式';
      } else if (rule.type == 'mobile') {
        valid = /^[1][3,4,5,7,8][0-9]{9}$/.test(this.fieldValue);
        message = rule.message || '不正确的手机格式';
      } else if (rule.type == 'number') {
        valid = typeof value === 'number' && isNaN(value);
        message = rule.message || 'Incorrect number format';
      } else if (rule.validator && typeof rule.validator == 'function') {
        rule.validator(this.rule, this.fieldValue, function (error) {
          if (error) {
            valid = false;
            message = error.message;
          }
        });
      }

      this.valid = valid;
      this.errorTip = message;
      return valid;
    },
    validates: function validates(trigger) {
      var _this = this;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      if (this.prop && this.Rules && this.Rules.length) {
        var valid = true;
        this.Rules.forEach(function (rule) {
          trigger = !trigger ? rule.trigger || 'blur' : trigger;
          if (rule.trigger == trigger) {
            if (!valid) {
              callback(valid);
              return false;
            }
            valid = _this.test(rule, trigger);
            callback(valid);
          }
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0d8ff298","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/form/formitem.vue
var formitem_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes }, [this.label ? _c('label', { staticClass: "k-form-item-label", style: _vm.labelStyles }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "k-form-item-content", style: _vm.contentStyles }, [_vm._t("default"), _vm._v(" "), _c('transition', { attrs: { "name": "dropdown" } }, [!_vm.valid ? _c('div', { staticClass: "k-form-item-error-tip" }, [_vm._v(_vm._s(_vm.errorTip))]) : _vm._e()])], 2)]);
};
var formitem_staticRenderFns = [];
var formitem_esExports = { render: formitem_render, staticRenderFns: formitem_staticRenderFns };
/* harmony default export */ var form_formitem = (formitem_esExports);
// CONCATENATED MODULE: ./packages/form/formitem.vue
var formitem_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var formitem___vue_template_functional__ = false
/* styles */
var formitem___vue_styles__ = null
/* scopeId */
var formitem___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var formitem___vue_module_identifier__ = null
var formitem_Component = formitem_normalizeComponent(
  formitem,
  form_formitem,
  formitem___vue_template_functional__,
  formitem___vue_styles__,
  formitem___vue_scopeId__,
  formitem___vue_module_identifier__
)

/* harmony default export */ var packages_form_formitem = (formitem_Component.exports);

// CONCATENATED MODULE: ./packages/form/index.js



// EXTERNAL MODULE: external {"root":"Vue","commonjs":"vue","commonjs2":"vue","amd":"vue"}
var external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue__ = __webpack_require__(1);
var external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default = /*#__PURE__*/__webpack_require__.n(external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue__);

// CONCATENATED MODULE: ./src/utils/assist.js


// 判断参数是否是其中之一
function oneOf(value, validList) {
    for (var i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/grid/row.vue
function row__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//


/* harmony default export */ var grid_row = ({
  name: "YRow",
  props: {
    gutter: {
      type: [Number, String],
      default: 0
    },
    type: {
      validator: function validator(value) {
        return oneOf(value, ['flex']);
      }
    },
    align: {
      validator: function validator(value) {
        return oneOf(value, ['top', 'middle', 'bottom']);
      }
    },
    justify: {
      validator: function validator(value) {
        return oneOf(value, ['start', 'end', 'center', 'space-around', 'space-between']);
      }
    }
  },
  data: function data() {
    return {};
  },

  computed: {
    classes: function classes() {
      var _ref;

      return [(_ref = {}, row__defineProperty(_ref, 'k-row', !this.type), row__defineProperty(_ref, 'k-row-' + this.type, !!this.type), row__defineProperty(_ref, 'k-row-' + this.type + '-' + this.align, !!this.align), row__defineProperty(_ref, 'k-row-' + this.type + '-' + this.justify, !!this.justify), _ref)];
    },
    styles: function styles() {
      var style = {};
      if (this.gutter !== 0) {
        style = {
          marginLeft: this.gutter / -2 + "px",
          marginRight: this.gutter / -2 + "px"
        };
      }
      return style;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7d22dc79","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/grid/row.vue
var row_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes, style: _vm.styles }, [_vm._t("default")], 2);
};
var row_staticRenderFns = [];
var row_esExports = { render: row_render, staticRenderFns: row_staticRenderFns };
/* harmony default export */ var selectortype_template_index_0_packages_grid_row = (row_esExports);
// CONCATENATED MODULE: ./packages/grid/row.vue
var row_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var row___vue_template_functional__ = false
/* styles */
var row___vue_styles__ = null
/* scopeId */
var row___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var row___vue_module_identifier__ = null
var row_Component = row_normalizeComponent(
  grid_row,
  selectortype_template_index_0_packages_grid_row,
  row___vue_template_functional__,
  row___vue_styles__,
  row___vue_scopeId__,
  row___vue_module_identifier__
)

/* harmony default export */ var packages_grid_row = (row_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/grid/col.vue
function col__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//

/* harmony default export */ var col = ({
  name: "YCol",
  props: {
    span: [Number, String],
    offset: [Number, String]
  },
  data: function data() {
    return {};
  },

  computed: {
    styles: function styles() {
      var style = {};
      var p = this.$parent.gutter;
      if (p !== 0) {
        style = { paddingLeft: p / 2 + "px", paddingRight: p / 2 + "px" };
      }
      return style;
    },
    classes: function classes() {
      var _ref;

      return ["k-col", (_ref = {}, col__defineProperty(_ref, "k-col-" + this.span, this.span), col__defineProperty(_ref, "k-col-offset-" + this.offset, this.offset > 0 && this.offset <= 24), _ref)];
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-cfa80fec","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/grid/col.vue
var col_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes, style: _vm.styles }, [_vm._t("default")], 2);
};
var col_staticRenderFns = [];
var col_esExports = { render: col_render, staticRenderFns: col_staticRenderFns };
/* harmony default export */ var grid_col = (col_esExports);
// CONCATENATED MODULE: ./packages/grid/col.vue
var col_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var col___vue_template_functional__ = false
/* styles */
var col___vue_styles__ = null
/* scopeId */
var col___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var col___vue_module_identifier__ = null
var col_Component = col_normalizeComponent(
  col,
  grid_col,
  col___vue_template_functional__,
  col___vue_styles__,
  col___vue_scopeId__,
  col___vue_module_identifier__
)

/* harmony default export */ var packages_grid_col = (col_Component.exports);

// CONCATENATED MODULE: ./packages/grid/index.js




// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/card/card.vue
function card__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var card = ({
  name: 'YCard',
  computed: {
    classes: function classes() {
      return ['k-card', card__defineProperty({}, 'k-card-bordered', this.bordered)];
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7b0340b9","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/card/card.vue
var card_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes }, [_c('div', { staticClass: "k-card-img" }, [_vm._t("img")], 2), _vm._v(" "), _c('div', { staticClass: "k-card-body" }, [_c('div', { staticClass: "k-card-title" }, [_vm._t("title")], 2), _vm._v(" "), _c('div', { staticClass: "k-card-desc" }, [_vm._t("desc")], 2), _vm._v(" "), _c('div', { staticClass: "k-card-date" }, [_vm._t("date")], 2)])]);
};
var card_staticRenderFns = [];
var card_esExports = { render: card_render, staticRenderFns: card_staticRenderFns };
/* harmony default export */ var card_card = (card_esExports);
// CONCATENATED MODULE: ./packages/card/card.vue
var card_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var card___vue_template_functional__ = false
/* styles */
var card___vue_styles__ = null
/* scopeId */
var card___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var card___vue_module_identifier__ = null
var card_Component = card_normalizeComponent(
  card,
  card_card,
  card___vue_template_functional__,
  card___vue_styles__,
  card___vue_scopeId__,
  card___vue_module_identifier__
)

/* harmony default export */ var packages_card_card = (card_Component.exports);

// CONCATENATED MODULE: ./packages/card/index.js

/* harmony default export */ var packages_card = (packages_card_card);
// CONCATENATED MODULE: ./node_modules/element-ui/src/utils/util.js


const util_hasOwnProperty = Object.prototype.hasOwnProperty;

function noop() {};

function hasOwn(obj, key) {
  return util_hasOwnProperty.call(obj, key);
};

function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
};

function toObject(arr) {
  var res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

const getValueByPath = function(object, prop) {
  prop = prop || '';
  const paths = prop.split('.');
  let current = object;
  let result = null;
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

function getPropByPath(obj, path, strict) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  let keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};

const generateId = function() {
  return Math.floor(Math.random() * 10000);
};

const valueEquals = (a, b) => {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const escapeRegexpString = (value = '') => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

// TODO: use native Array.find, Array.findIndex when IE support is dropped
const arrayFindIndex = function(arr, pred) {
  for (let i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return -1;
};

const arrayFind = function(arr, pred) {
  const idx = arrayFindIndex(arr, pred);
  return idx !== -1 ? arr[idx] : undefined;
};

// coerce truthy value to array
const coerceTruthyValueToArray = function(val) {
  if (Array.isArray(val)) {
    return val;
  } else if (val) {
    return [val];
  } else {
    return [];
  }
};

const util_isIE = function() {
  return !external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.prototype.$isServer && !isNaN(Number(document.documentMode));
};

const util_isEdge = function() {
  return !external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1;
};

// CONCATENATED MODULE: ./packages/table/src/util.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var getCell = function getCell(event) {
  var cell = event.target;

  while (cell && cell.tagName.toUpperCase() !== 'HTML') {
    if (cell.tagName.toUpperCase() === 'TD') {
      return cell;
    }
    cell = cell.parentNode;
  }

  return null;
};

var isObject = function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
};

var util_orderBy = function orderBy(array, sortKey, reverse, sortMethod, sortBy) {
  if (!sortKey && !sortMethod && (!sortBy || Array.isArray(sortBy) && !sortBy.length)) {
    return array;
  }
  if (typeof reverse === 'string') {
    reverse = reverse === 'descending' ? -1 : 1;
  } else {
    reverse = reverse && reverse < 0 ? -1 : 1;
  }
  var getKey = sortMethod ? null : function (value, index) {
    if (sortBy) {
      if (!Array.isArray(sortBy)) {
        sortBy = [sortBy];
      }
      return sortBy.map(function (by) {
        if (typeof by === 'string') {
          return getValueByPath(value, by);
        } else {
          return by(value, index, array);
        }
      });
    }
    if (sortKey !== '$key') {
      if (isObject(value) && '$value' in value) value = value.$value;
    }
    return [isObject(value) ? getValueByPath(value, sortKey) : value];
  };
  var compare = function compare(a, b) {
    if (sortMethod) {
      return sortMethod(a.value, b.value);
    }
    for (var i = 0, len = a.key.length; i < len; i++) {
      if (a.key[i] < b.key[i]) {
        return -1;
      }
      if (a.key[i] > b.key[i]) {
        return 1;
      }
    }
    return 0;
  };
  return array.map(function (value, index) {
    return {
      value: value,
      index: index,
      key: getKey ? getKey(value, index) : null
    };
  }).sort(function (a, b) {
    var order = compare(a, b);
    if (!order) {
      // make stable https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
      order = a.index - b.index;
    }
    return order * reverse;
  }).map(function (item) {
    return item.value;
  });
};

var getColumnById = function getColumnById(table, columnId) {
  var column = null;
  table.columns.forEach(function (item) {
    if (item.id === columnId) {
      column = item;
    }
  });
  return column;
};

var getColumnByCell = function getColumnByCell(table, cell) {
  var matches = (cell.className || '').match(/el-table_[^\s]+/gm);
  if (matches) {
    return getColumnById(table, matches[0]);
  }
  return null;
};

var getRowIdentity = function getRowIdentity(row, rowKey) {
  if (!row) throw new Error('row is required when get row identity');
  if (typeof rowKey === 'string') {
    if (rowKey.indexOf('.') < 0) {
      return row[rowKey];
    }
    var key = rowKey.split('.');
    var current = row;
    for (var i = 0; i < key.length; i++) {
      current = current[key[i]];
    }
    return current;
  } else if (typeof rowKey === 'function') {
    return rowKey.call(null, row);
  }
};
// CONCATENATED MODULE: ./src/utils/dom.js
var dom__typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* istanbul ignore next */



var isServer = external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.prototype.$isServer;
var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;
var ieVersion = isServer ? 0 : Number(document.documentMode);

/* istanbul ignore next */
var trim = function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
/* istanbul ignore next */
var camelCase = function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/* istanbul ignore next */
var dom_on = function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
}();

/* istanbul ignore next */
var off = function () {
  if (!isServer && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
}();

/* istanbul ignore next */
var once = function once(el, event, fn) {
  var listener = function listener() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  dom_on(el, event, listener);
};

/* istanbul ignore next */
function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

/* istanbul ignore next */
function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

/* istanbul ignore next */
function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

/* istanbul ignore next */
var getStyle = ieVersion < 9 ? function (element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'styleFloat';
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null;
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function (element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

/* istanbul ignore next */
function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if ((typeof styleName === 'undefined' ? 'undefined' : dom__typeof(styleName)) === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
};
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/tooltip/tooltip.vue
function tooltip__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var tooltip_tooltip = ({
  directives: { transferDom: transferDom, winScroll: winScroll },
  mixins: [emitter],
  name: "YTooltip",
  props: {
    transfer: { type: Boolean, default: true },
    breaked: { type: Boolean },
    trigger: { type: String, default: "hover" },
    width: [String, Number],
    content: [String, Number],
    placement: {
      validator: function validator(value) {
        return ["top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right", "left", "left-bottom", "left-top", "right", "right-top", "right-bottom"].indexOf(value) >= 0;
      },

      default: "top"
    },
    disabled: Boolean,
    effect: { type: String, default: 'light' // 样式 dark/light
    } },
  data: function data() {
    return {
      visible: false,
      left: 0,
      top: 0
    };
  },

  computed: {
    classes: function classes() {
      return ['k-tooltip-content', tooltip__defineProperty({}, 'k-tooltip-content-breaked', this.breaked)];
    },
    styles: function styles() {
      var style = {};
      style.width = this.width + "px";
      style.top = this.top + "px";
      style.left = this.left + "px";
      return style;
    }
  },
  methods: {
    handleScroll: function handleScroll() {
      var _this = this;

      this.$nextTick(function () {
        return _this.setPostion();
      });
    },
    setPostion: function setPostion() {
      var pos = { left: 0, top: 0 };
      var rel = this.$refs.rel.children[0] || this.$refs.rel;
      // if (this.transfer) {
      pos = this.getElementPos(rel);
      // }
      var x = this.placement;
      var dom = this.$refs.dom;
      if (!dom) return;
      // console.log(this.$children)
      //取子元素的margin,计算的时候要进行运算
      // let child = this.$children[0] && this.$children[0].$el || rel
      // let mr = 0//document.defaultView.getComputedStyle(rel, null)['margin-right'].replace('px', '')
      // let mb = 0//document.defaultView.getComputedStyle(rel, null)['margin-bottom'].replace('px', '')
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
      var top = pos.top + scrollTop;
      var left = pos.left + scrollLeft;
      // console.log(mr, mb)
      switch (x) {
        case "top":
          this.top = top - dom.offsetHeight - 10;
          this.left = left - (dom.offsetWidth - rel.offsetWidth) / 2;
          break;
        case "top-left":
          this.top = top - dom.offsetHeight - 10;
          this.left = left;
          break;
        case "top-right":
          this.top = top - dom.offsetHeight - 10;
          this.left = left - (dom.offsetWidth - rel.offsetWidth);
          break;
        case "bottom":
          this.top = top + rel.offsetHeight + 10;
          this.left = left - (dom.offsetWidth - rel.offsetWidth) / 2;
          break;
        case "bottom-right":
          this.top = top + rel.offsetHeight - 10;
          this.left = left - (dom.offsetWidth - rel.offsetWidth) + 40;
          break;
        case "bottom-left":
          this.top = top + rel.offsetHeight + 10;
          this.left = left;
          break;
        case "left":
          this.left = left - dom.offsetWidth - 10;
          this.top = top - (dom.offsetHeight - rel.offsetHeight) / 2;
          break;
        case "left-top":
          this.left = left - dom.offsetWidth - 10;
          this.top = top;
          break;
        case "left-bottom":
          this.left = left - dom.offsetWidth - 10;
          this.top = top - (dom.offsetHeight - rel.offsetHeight);
          break;
        case "right":
          this.left = left + rel.offsetWidth + 10;
          this.top = top - (dom.offsetHeight - rel.offsetHeight) / 2;
          break;
        case "right-top":
          this.left = left + rel.offsetWidth + 10;
          this.top = top;
          break;
        case "right-bottom":
          this.left = left + rel.offsetWidth + 10;
          this.top = top - (dom.offsetHeight - rel.offsetHeight);
          break;
      }
    },
    mouseEnter: function mouseEnter() {
      if (this.trigger == "hover") this.visible = true;
      this.handleScroll();
    },
    mouseLeave: function mouseLeave(e) {
      if (this.trigger == "hover") {
        this.visible = false;
        // console.log(e)
        // !this.$refs.dom.contains(e.target) && ()
      }
    },
    relClick: function relClick() {
      if (this.trigger == "click") {
        this.visible = !this.visible;
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-04f257d2","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/tooltip/tooltip.vue
var tooltip_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "winScroll", rawName: "v-winScroll", value: _vm.handleScroll, expression: "handleScroll" }], staticClass: "k-tooltip", on: { "mouseenter": _vm.mouseEnter, "mouseleave": _vm.mouseLeave } }, [_c('div', { ref: "rel", staticClass: "k-tooltip-rel", on: { "click": _vm.relClick } }, [_vm._t("default")], 2), _vm._v(" "), _c('transition', { attrs: { "name": "fade" } }, [_vm.visible ? _c('div', { directives: [{ name: "transferDom", rawName: "v-transferDom" }], ref: "dom", class: ['k-tooltip-dom', 'is-' + this.effect], style: _vm.styles, attrs: { "k-placement": _vm.placement, "data-transfer": _vm.transfer } }, [_c('div', { staticClass: "k-poptip-arrow" }), _vm._v(" "), _c('div', { class: _vm.classes }, [_vm._t("content", [_vm._v(_vm._s(_vm.content))])], 2)]) : _vm._e()])], 1);
};
var tooltip_staticRenderFns = [];
var tooltip_esExports = { render: tooltip_render, staticRenderFns: tooltip_staticRenderFns };
/* harmony default export */ var selectortype_template_index_0_packages_tooltip_tooltip = (tooltip_esExports);
// CONCATENATED MODULE: ./packages/tooltip/tooltip.vue
var tooltip_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var tooltip___vue_template_functional__ = false
/* styles */
var tooltip___vue_styles__ = null
/* scopeId */
var tooltip___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var tooltip___vue_module_identifier__ = null
var tooltip_Component = tooltip_normalizeComponent(
  tooltip_tooltip,
  selectortype_template_index_0_packages_tooltip_tooltip,
  tooltip___vue_template_functional__,
  tooltip___vue_styles__,
  tooltip___vue_scopeId__,
  tooltip___vue_module_identifier__
)

/* harmony default export */ var packages_tooltip_tooltip = (tooltip_Component.exports);

// CONCATENATED MODULE: ./packages/tooltip/index.js

/* harmony default export */ var packages_tooltip = (packages_tooltip_tooltip);
// CONCATENATED MODULE: ./packages/table/src/layout-observer.js
/* harmony default export */ var layout_observer = ({
  created: function created() {
    this.tableLayout.addObserver(this);
  },
  destroyed: function destroyed() {
    this.tableLayout.removeObserver(this);
  },


  computed: {
    tableLayout: function tableLayout() {
      var layout = this.layout;
      if (!layout && this.table) {
        layout = this.table.layout;
      }
      if (!layout) {
        throw new Error('Can not find table layout.');
      }
      return layout;
    }
  },

  mounted: function mounted() {
    this.onColumnsChange(this.tableLayout);
    this.onScrollableChange(this.tableLayout);
  },
  updated: function updated() {
    if (this.__updated__) return;
    this.onColumnsChange(this.tableLayout);
    this.onScrollableChange(this.tableLayout);
    this.__updated__ = true;
  },


  methods: {
    onColumnsChange: function onColumnsChange() {
      var cols = this.$el.querySelectorAll('colgroup > col');
      if (!cols.length) return;
      var flattenColumns = this.tableLayout.getFlattenColumns();
      var columnsMap = {};
      flattenColumns.forEach(function (column) {
        columnsMap[column.id] = column;
      });
      for (var i = 0, j = cols.length; i < j; i++) {
        var col = cols[i];
        var name = col.getAttribute('name');
        var column = columnsMap[name];
        if (column) {
          col.setAttribute('width', column.realWidth || column.width);
        }
      }
    },
    onScrollableChange: function onScrollableChange(layout) {
      var cols = this.$el.querySelectorAll('colgroup > col[name=gutter]');
      for (var i = 0, j = cols.length; i < j; i++) {
        var col = cols[i];
        col.setAttribute('width', layout.scrollY ? layout.gutterWidth : '0');
      }
      var ths = this.$el.querySelectorAll('th.gutter');
      for (var _i = 0, _j = ths.length; _i < _j; _i++) {
        var th = ths[_i];
        th.style.width = layout.scrollY ? layout.gutterWidth + 'px' : '0';
        th.style.display = layout.scrollY ? '' : 'none';
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/table/src/table-body.js
var table_body__typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



// import ElCheckbox from 'element-ui/packages/checkbox';

// import debounce from 'throttle-debounce/debounce';


/* harmony default export */ var table_body = ({
  name: 'YTableBody',

  mixins: [layout_observer],

  components: { YTooltip: packages_tooltip },

  props: {
    store: {
      required: true
    },
    stripe: Boolean,
    context: {},
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    fixed: String,
    highlight: Boolean
  },
  data: function data() {
    return {
      tooltipContent: ''
    };
  },
  created: function created() {
    // this.activateTooltip = debounce(50, tooltip => tooltip.handleShowPopper());
  },
  render: function render(h) {
    var _this = this;

    // this.columns = this.store.states.columns
    var columnsHidden = this.columns.map(function (column, index) {
      return _this.isColumnHidden(index);
    });
    // return (<table><tr><td>3333333333333</td></tr></table>)
    return h(
      'table',
      {
        'class': 'el-table__body',
        attrs: { cellspacing: '0',
          cellpadding: '0',
          border: '0' }
      },
      [h('colgroup', [this._l(this.columns, function (column) {
        return h('col', {
          attrs: { name: column.id }
        });
      })]), h('tbody', [this._l(this.data, function (row, $index) {
        return [h(
          'tr',
          {
            style: _this.rowStyle ? _this.getRowStyle(row, $index) : null,
            key: _this.table.rowKey ? _this.getKeyOfRow(row, $index) : $index,
            on: {
              'dblclick': function dblclick($event) {
                return _this.handleDoubleClick($event, row);
              },
              'click': function click($event) {
                return _this.handleClick($event, row);
              },
              'contextmenu': function contextmenu($event) {
                return _this.handleContextMenu($event, row);
              },
              'mouseenter': function mouseenter(_) {
                return _this.handleMouseEnter($index);
              },
              'mouseleave': function mouseleave(_) {
                return _this.handleMouseLeave();
              }
            },

            'class': [_this.getRowClass(row, $index)] },
          [_this._l(_this.columns, function (column, cellIndex) {
            var _getSpan = _this.getSpan(row, column, $index, cellIndex),
                rowspan = _getSpan.rowspan,
                colspan = _getSpan.colspan;

            if (!rowspan || !colspan) {
              return '';
            } else {
              return h(
                'td',
                {
                  style: _this.getCellStyle($index, cellIndex, row, column),
                  'class': _this.getCellClass($index, cellIndex, row, column),
                  attrs: { rowspan: rowspan,
                    colspan: colspan
                  },
                  on: {
                    'mouseenter': function mouseenter($event) {
                      return _this.handleCellMouseEnter($event, row);
                    },
                    'mouseleave': _this.handleCellMouseLeave
                  }
                },
                [
                // table-column里的方法
                column.renderCell.call(_this._renderProxy, h, {
                  row: row,
                  column: column,
                  $index: $index,
                  store: _this.store,
                  _self: _this.context || _this.table.$vnode.context
                }, columnsHidden[cellIndex])]
              );
            }
          })]
        )];
      })])]
    );
  },

  /* ,
              this.store.isRowExpanded(row)
                ? (<tr>
                  <td colspan={ this.columns.length } class="el-table__expanded-cell">
                    { this.table.renderExpanded ? this.table.renderExpanded(h, { row, $index, store: this.store }) : ''}
                  </td>
                </tr>)
                : ''
            .concat(
              <el-tooltip effect={ this.table.tooltipEffect } placement="top" ref="tooltip" content={ this.tooltipContent }></el-tooltip>
            ) */
  watch: {},

  computed: {
    table: function table() {
      // table.vue的vue实例
      return this.$parent;
    },
    data: function data() {
      return this.store.states.data;
    },
    columnsCount: function columnsCount() {
      return this.store.states.columns.length;
    },
    leftFixedLeafCount: function leftFixedLeafCount() {
      return this.store.states.fixedLeafColumnsLength;
    },
    rightFixedLeafCount: function rightFixedLeafCount() {
      return this.store.states.rightFixedLeafColumnsLength;
    },
    leftFixedCount: function leftFixedCount() {
      return this.store.states.fixedColumns.length;
    },
    rightFixedCount: function rightFixedCount() {
      return this.store.states.rightFixedColumns.length;
    },
    columns: function columns() {
      return this.store.states.columns;
    }
  },

  methods: {
    getKeyOfRow: function getKeyOfRow(row, index) {
      var rowKey = this.table.rowKey;
      if (rowKey) {
        return getRowIdentity(row, rowKey);
      }
      return index;
    },
    isColumnHidden: function isColumnHidden(index) {
      if (this.fixed === true || this.fixed === 'left') {
        return index >= this.leftFixedLeafCount; // 左fixed列右边的col
      } else if (this.fixed === 'right') {
        // 右fixed列左边的col
        return index < this.columnsCount - this.rightFixedLeafCount;
      } else {
        // 没有fixed时，左fixed的左边，右fixed的右边
        return index < this.leftFixedLeafCount || index >= this.columnsCount - this.rightFixedLeafCount;
      }
    },
    getSpan: function getSpan(row, column, rowIndex, columnIndex) {
      var rowspan = 1;
      var colspan = 1;

      var fn = this.table.spanMethod;
      if (typeof fn === 'function') {
        var result = fn({
          row: row,
          column: column,
          rowIndex: rowIndex,
          columnIndex: columnIndex
        });

        if (Array.isArray(result)) {
          rowspan = result[0];
          colspan = result[1];
        } else if ((typeof result === 'undefined' ? 'undefined' : table_body__typeof(result)) === 'object') {
          rowspan = result.rowspan;
          colspan = result.colspan;
        }
      }

      return {
        rowspan: rowspan,
        colspan: colspan
      };
    },
    getRowStyle: function getRowStyle(row, rowIndex) {
      var rowStyle = this.table.rowStyle;
      if (typeof rowStyle === 'function') {
        return rowStyle.call(null, {
          row: row,
          rowIndex: rowIndex
        });
      }
      return rowStyle;
    },
    getRowClass: function getRowClass(row, rowIndex) {
      var classes = ['el-table__row'];
      if (this.table.highlightCurrentRow && row === this.store.states.currentRow) {
        classes.push('current-row');
      }

      if (this.stripe && rowIndex % 2 === 1) {
        classes.push('el-table__row--striped');
      }
      var rowClassName = this.table.rowClassName;
      if (typeof rowClassName === 'string') {
        classes.push(rowClassName);
      } else if (typeof rowClassName === 'function') {
        classes.push(rowClassName.call(null, {
          row: row,
          rowIndex: rowIndex
        }));
      }

      if (this.store.states.expandRows.indexOf(row) > -1) {
        classes.push('expanded');
      }

      return classes.join(' ');
    },
    getCellStyle: function getCellStyle(rowIndex, columnIndex, row, column) {
      var cellStyle = this.table.cellStyle;
      if (typeof cellStyle === 'function') {
        return cellStyle.call(null, {
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          row: row,
          column: column
        });
      }
      return cellStyle;
    },
    getCellClass: function getCellClass(rowIndex, columnIndex, row, column) {
      var classes = [column.id, column.align, column.className];

      if (this.isColumnHidden(columnIndex)) {
        classes.push('is-hidden');
      }

      var cellClassName = this.table.cellClassName;
      if (typeof cellClassName === 'string') {
        classes.push(cellClassName);
      } else if (typeof cellClassName === 'function') {
        classes.push(cellClassName.call(null, {
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          row: row,
          column: column
        }));
      }

      return classes.join(' ');
    },
    handleCellMouseEnter: function handleCellMouseEnter(event, row) {
      var table = this.table;
      var cell = getCell(event);

      if (cell) {
        var column = getColumnByCell(table, cell);
        var hoverState = table.hoverState = { cell: cell, column: column, row: row };
        table.$emit('cell-mouse-enter', hoverState.row, hoverState.column, hoverState.cell, event);
      }

      // 判断是否text-overflow, 如果是就显示tooltip
      var cellChild = event.target.querySelector('.cell');
      if (!hasClass(cellChild, 'k-tooltip')) {
        return;
      }
      // use range width instead of scrollWidth to determine whether the text is overflowing
      // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
      var range = document.createRange();
      range.setStart(cellChild, 0);
      range.setEnd(cellChild, cellChild.childNodes.length);
      var rangeWidth = range.getBoundingClientRect().width;
      var padding = (parseInt(getStyle(cellChild, 'paddingLeft'), 10) || 0) + (parseInt(getStyle(cellChild, 'paddingRight'), 10) || 0);
      if ((rangeWidth + padding > cellChild.offsetWidth || cellChild.scrollWidth > cellChild.offsetWidth) && this.$refs.tooltip) {
        var tooltip = this.$refs.tooltip;
        // TODO 会引起整个 Table 的重新渲染，需要优化
        console.log(cell.textContent || cell.innerText, 'handleCellMouseEnter');
        this.tooltipContent = cell.textContent || cell.innerText;
        // tooltip.referenceElm = cell;
        // tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none');
        // tooltip.doDestroy();
        // tooltip.setExpectedState(true);
        // this.activateTooltip(tooltip);
      }
    },
    handleCellMouseLeave: function handleCellMouseLeave(event) {
      var tooltip = this.$refs.tooltip;
      if (tooltip) {
        // tooltip.setExpectedState(false);
        // tooltip.handleClosePopper();
      }
      var cell = getCell(event);
      if (!cell) return;

      var oldHoverState = this.table.hoverState || {};
      this.table.$emit('cell-mouse-leave', oldHoverState.row, oldHoverState.column, oldHoverState.cell, event);
    },
    handleMouseEnter: function handleMouseEnter(index) {
      this.store.commit('setHoverRow', index);
    },
    handleMouseLeave: function handleMouseLeave() {
      this.store.commit('setHoverRow', null);
    },
    handleContextMenu: function handleContextMenu(event, row) {
      this.handleEvent(event, row, 'contextmenu');
    },
    handleDoubleClick: function handleDoubleClick(event, row) {
      this.handleEvent(event, row, 'dblclick');
    },
    handleClick: function handleClick(event, row) {
      this.store.commit('setCurrentRow', row);
      this.handleEvent(event, row, 'click');
    },
    handleEvent: function handleEvent(event, row, name) {
      var table = this.table;
      var cell = getCell(event);
      var column = void 0;
      if (cell) {
        column = getColumnByCell(table, cell);
        if (column) {
          table.$emit('cell-' + name, row, column, cell, event);
        }
      }
      table.$emit('row-' + name, row, event, column);
    },
    handleExpandClick: function handleExpandClick(row, e) {
      e.stopPropagation();
      this.store.toggleRowExpansion(row);
    }
  }
});
// CONCATENATED MODULE: ./packages/table/src/table-header.js

// import ElCheckbox from 'element-ui/packages/checkbox';
// import ElTag from 'element-ui/packages/tag';


// import FilterPanel from './filter-panel.vue';


// 把一级，二级的所有column都返回
var getAllColumns = function getAllColumns(columns) {
  var result = [];
  columns.forEach(function (column) {
    if (column.children) {
      result.push(column);
      result.push.apply(result, getAllColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};

// 把column转成rows
var convertToRows = function convertToRows(originColumns) {
  var maxLevel = 1;
  var traverse = function traverse(column, parent) {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.children) {
      var colSpan = 0;
      column.children.forEach(function (subColumn) {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach(function (column) {
    column.level = 1;
    traverse(column);
  });

  var rows = [];
  for (var i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  var allColumns = getAllColumns(originColumns);

  allColumns.forEach(function (column) {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }
    rows[column.level - 1].push(column);
  });

  return rows;
};

/* harmony default export */ var table_header = ({
  name: 'YTableHeader',

  mixins: [layout_observer],

  render: function render(h) {
    var _this = this;

    var originColumns = this.store.states.originColumns;
    var columnRows = convertToRows(originColumns, this.columns);
    // 是否拥有多级表头
    var isGroup = columnRows.length > 1;
    if (isGroup) this.$parent.isGroup = true;
    // const isGroup = false
    return h(
      'table',
      {
        'class': 'el-table__header',
        attrs: { cellspacing: '0',
          cellpadding: '0',
          border: '0' }
      },
      [h('colgroup', [this._l(this.columns, function (column) {
        return h('col', {
          attrs: { name: column.id }
        });
      }), this.hasGutter ? h('col', {
        attrs: { name: 'gutter' }
      }) : '']), h(
        'thead',
        { 'class': [{ 'is-group': isGroup, 'has-gutter': this.hasGutter }] },
        [this._l(columnRows, function (columns, rowIndex) {
          return h(
            'tr',
            {
              style: _this.getHeaderRowStyle(rowIndex),
              'class': _this.getHeaderRowClass(rowIndex)
            },
            [_this._l(columns, function (column, cellIndex) {
              return h(
                'th',
                {
                  attrs: {
                    colspan: column.colSpan,
                    rowspan: column.rowSpan
                  },
                  on: {
                    'mousemove': function mousemove($event) {
                      return _this.handleMouseMove($event, column);
                    },
                    'mouseout': _this.handleMouseOut,
                    'mousedown': function mousedown($event) {
                      return _this.handleMouseDown($event, column);
                    },
                    'click': function click($event) {
                      return _this.handleHeaderClick($event, column);
                    },
                    'contextmenu': function contextmenu($event) {
                      return _this.handleHeaderContextMenu($event, column);
                    }
                  },

                  style: _this.getHeaderCellStyle(rowIndex, cellIndex, columns, column),
                  'class': _this.getHeaderCellClass(rowIndex, cellIndex, columns, column),
                  key: column.id },
                [h(
                  'div',
                  { 'class': ['cell', column.filteredValue && column.filteredValue.length > 0 ? 'highlight' : '', column.labelClassName] },
                  [column.renderHeader ? column.renderHeader.call(_this._renderProxy, h, { column: column, $index: cellIndex, store: _this.store, _self: _this.$parent.$vnode.context, ddd: 111 }) : column.label]
                )]
              );
            }), _this.hasGutter ? h('th', { 'class': 'gutter' }) : '']
          );
        })]
      )]
    );
  },


  // {
  //   column.filterable
  //     ? <span class="el-table__column-filter-trigger" on-click={ ($event) => this.handleFilterClick($event, column) }><i class={ ['el-icon-arrow-down', column.filterOpened ? 'el-icon-arrow-up' : ''] }></i></span>
  //     : ''
  // }
  props: {
    fixed: String,
    store: {
      required: true
    },
    border: Boolean,
    defaultSort: {
      type: Object,
      default: function _default() {
        return {
          prop: '',
          order: ''
        };
      }
    }
  },

  components: { YTooltip: packages_tooltip },

  computed: {
    table: function table() {
      return this.$parent;
    },
    isAllSelected: function isAllSelected() {
      return this.store.states.isAllSelected;
    },
    columnsCount: function columnsCount() {
      return this.store.states.columns.length;
    },
    leftFixedCount: function leftFixedCount() {
      return this.store.states.fixedColumns.length;
    },
    rightFixedCount: function rightFixedCount() {
      return this.store.states.rightFixedColumns.length;
    },
    leftFixedLeafCount: function leftFixedLeafCount() {
      return this.store.states.fixedLeafColumnsLength;
    },
    rightFixedLeafCount: function rightFixedLeafCount() {
      return this.store.states.rightFixedLeafColumnsLength;
    },
    columns: function columns() {
      return this.store.states.columns;
    },
    hasGutter: function hasGutter() {
      return !this.fixed && this.tableLayout.gutterWidth;
    }
  },

  created: function created() {
    // this.filterPanels = {};
  },
  mounted: function mounted() {
    // const { prop, order } = this.defaultSort;
    // this.store.commit('sort', { prop, order });
  },
  beforeDestroy: function beforeDestroy() {
    /* const panels = this.filterPanels;
    for (let prop in panels) {
      if (panels.hasOwnProperty(prop) && panels[prop]) {
        panels[prop].$destroy(true);
      }
    } */
  },


  methods: {
    isCellHidden: function isCellHidden(index, columns) {
      var start = 0;
      for (var i = 0; i < index; i++) {
        start += columns[i].colSpan;
      }
      var after = start + columns[index].colSpan - 1;
      if (this.fixed === true || this.fixed === 'left') {
        return after >= this.leftFixedLeafCount;
      } else if (this.fixed === 'right') {
        return start < this.columnsCount - this.rightFixedLeafCount;
      } else {
        return after < this.leftFixedLeafCount || start >= this.columnsCount - this.rightFixedLeafCount;
      }
    },
    getHeaderRowStyle: function getHeaderRowStyle(rowIndex) {
      var headerRowStyle = this.table.headerRowStyle;
      if (typeof headerRowStyle === 'function') {
        return headerRowStyle.call(null, { rowIndex: rowIndex });
      }
      return headerRowStyle;
    },
    getHeaderRowClass: function getHeaderRowClass(rowIndex) {
      var classes = [];

      var headerRowClassName = this.table.headerRowClassName;
      if (typeof headerRowClassName === 'string') {
        classes.push(headerRowClassName);
      } else if (typeof headerRowClassName === 'function') {
        classes.push(headerRowClassName.call(null, { rowIndex: rowIndex }));
      }

      return classes.join(' ');
    },
    getHeaderCellStyle: function getHeaderCellStyle(rowIndex, columnIndex, row, column) {
      var headerCellStyle = this.table.headerCellStyle;
      if (typeof headerCellStyle === 'function') {
        return headerCellStyle.call(null, {
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          row: row,
          column: column
        });
      }
      return headerCellStyle;
    },
    getHeaderCellClass: function getHeaderCellClass(rowIndex, columnIndex, row, column) {
      var classes = [column.id, column.order, column.headerAlign, column.className, column.labelClassName];

      if (rowIndex === 0 && this.isCellHidden(columnIndex, row)) {
        classes.push('is-hidden');
      }

      if (!column.children) {
        classes.push('is-leaf');
      }

      // if (column.sortable) {
      //   classes.push('is-sortable');
      // }

      var headerCellClassName = this.table.headerCellClassName;
      if (typeof headerCellClassName === 'string') {
        classes.push(headerCellClassName);
      } else if (typeof headerCellClassName === 'function') {
        classes.push(headerCellClassName.call(null, {
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          row: row,
          column: column
        }));
      }

      return classes.join(' ');
    },
    toggleAllSelection: function toggleAllSelection() {
      this.store.commit('toggleAllSelection');
    },


    /* handleFilterClick(event, column) {
      event.stopPropagation();
      const target = event.target;
      let cell = target.tagName === 'TH' ? target : target.parentNode;
      cell = cell.querySelector('.el-table__column-filter-trigger') || cell;
      const table = this.$parent;
        let filterPanel = this.filterPanels[column.id];
        if (filterPanel && column.filterOpened) {
        filterPanel.showPopper = false;
        return;
      }
        if (!filterPanel) {
        filterPanel = new Vue(FilterPanel);
        this.filterPanels[column.id] = filterPanel;
        if (column.filterPlacement) {
          filterPanel.placement = column.filterPlacement;
        }
        filterPanel.table = table;
        filterPanel.cell = cell;
        filterPanel.column = column;
        !this.$isServer && filterPanel.$mount(document.createElement('div'));
      }
        setTimeout(() => {
        filterPanel.showPopper = true;
      }, 16);
    }, */

    handleHeaderClick: function handleHeaderClick(event, column) {
      if (!column.filters && column.sortable) {
        this.handleSortClick(event, column);
      } else if (column.filterable && !column.sortable) {
        this.handleFilterClick(event, column);
      }

      this.$parent.$emit('header-click', column, event);
    },
    handleHeaderContextMenu: function handleHeaderContextMenu(event, column) {
      this.$parent.$emit('header-contextmenu', column, event);
    },

    // 按下鼠标
    handleMouseDown: function handleMouseDown(event, column) {
      var _this2 = this;

      if (this.$isServer) return;
      if (column.children && column.children.length > 0) return;
      /* istanbul ignore if */
      if (this.draggingColumn && this.border) {
        this.dragging = true;

        this.$parent.resizeProxyVisible = true;

        var table = this.$parent;
        var tableEl = table.$el;
        var tableLeft = tableEl.getBoundingClientRect().left;
        var columnEl = this.$el.querySelector('th.' + column.id);
        var columnRect = columnEl.getBoundingClientRect();
        var minLeft = columnRect.left - tableLeft + 30;

        addClass(columnEl, 'noclick');

        this.dragState = {
          startMouseLeft: event.clientX,
          startLeft: columnRect.right - tableLeft,
          startColumnLeft: columnRect.left - tableLeft,
          tableLeft: tableLeft
        };

        var resizeProxy = table.$refs.resizeProxy;
        resizeProxy.style.left = this.dragState.startLeft + 'px';

        document.onselectstart = function () {
          return false;
        };
        document.ondragstart = function () {
          return false;
        };
        // 设置 拖动线条
        var handleMouseMove = function handleMouseMove(event) {
          var deltaLeft = event.clientX - _this2.dragState.startMouseLeft;
          var proxyLeft = _this2.dragState.startLeft + deltaLeft;

          resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';
        };
        // 拖动取消
        var handleMouseUp = function handleMouseUp() {
          if (_this2.dragging) {
            var _dragState = _this2.dragState,
                startColumnLeft = _dragState.startColumnLeft,
                startLeft = _dragState.startLeft;

            var finalLeft = parseInt(resizeProxy.style.left, 10);
            var columnWidth = finalLeft - startColumnLeft;
            column.width = column.realWidth = columnWidth;
            table.$emit('header-dragend', column.width, startLeft - startColumnLeft, column, event);

            _this2.store.scheduleLayout();

            document.body.style.cursor = '';
            _this2.dragging = false;
            _this2.draggingColumn = null;
            _this2.dragState = {};

            table.resizeProxyVisible = false;
          }

          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          document.onselectstart = null;
          document.ondragstart = null;

          setTimeout(function () {
            removeClass(columnEl, 'noclick');
          }, 0);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
    },
    handleMouseMove: function handleMouseMove(event, column) {
      if (column.children && column.children.length > 0) return;
      var target = event.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }
      // console.log(target.querySelector('.k-tooltip').length, 'tool')
      // target.querySelector('.k-tooltip')[0].style.display = 'block'
      if (!column || !column.resizable) return;
      // 拖动改变列宽 设置拖动手势
      if (!this.dragging && this.border) {
        var rect = target.getBoundingClientRect();

        var bodyStyle = document.body.style;
        if (rect.width > 12 && rect.right - event.pageX < 8) {
          bodyStyle.cursor = 'col-resize';
          if (hasClass(target, 'is-sortable')) {
            target.style.cursor = 'col-resize';
          }
          this.draggingColumn = column;
        } else if (!this.dragging) {
          bodyStyle.cursor = '';
          if (hasClass(target, 'is-sortable')) {
            target.style.cursor = 'pointer';
          }
          this.draggingColumn = null;
        }
      }
    },

    // 放开鼠标
    handleMouseOut: function handleMouseOut() {
      if (this.$isServer) return;
      document.body.style.cursor = '';
    }

    // toggleOrder({ order, sortOrders }) {
    //   if (order === '') return sortOrders[0];
    //   const index = sortOrders.indexOf(order || null);
    //   return sortOrders[index > sortOrders.length - 2 ? 0 : index + 1];
    // },

    // handleSortClick(event, column, givenOrder) {
    //   event.stopPropagation();
    //   let order = givenOrder || this.toggleOrder(column);

    //   let target = event.target;
    //   while (target && target.tagName !== 'TH') {
    //     target = target.parentNode;
    //   }

    //   if (target && target.tagName === 'TH') {
    //     if (hasClass(target, 'noclick')) {
    //       removeClass(target, 'noclick');
    //       return;
    //     }
    //   }

    //   if (!column.sortable) return;

    //   const states = this.store.states;
    //   let sortProp = states.sortProp;
    //   let sortOrder;
    //   const sortingColumn = states.sortingColumn;

    //   if (sortingColumn !== column || (sortingColumn === column && sortingColumn.order === null)) {
    //     if (sortingColumn) {
    //       sortingColumn.order = null;
    //     }
    //     states.sortingColumn = column;
    //     sortProp = column.property;
    //   }

    //   if (!order) {
    //     sortOrder = column.order = null;
    //     states.sortingColumn = null;
    //     sortProp = null;
    //   } else {
    //     sortOrder = column.order = order;
    //   }

    //   states.sortProp = sortProp;
    //   states.sortOrder = sortOrder;

    //   this.store.commit('changeSortCondition');
    // }

  },

  data: function data() {
    return {
      draggingColumn: null,
      dragging: false,
      dragState: {}
    };
  }
});
// EXTERNAL MODULE: ./node_modules/throttle-debounce/debounce.js
var debounce = __webpack_require__(4);
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);

// CONCATENATED MODULE: ./src/utils/merge.js
/* harmony default export */ var merge = (function (target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i] || {};
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
});;
// CONCATENATED MODULE: ./packages/table/src/table-store.js






var table_store_sortData = function sortData(data, states) {
  var sortingColumn = states.sortingColumn;
  if (!sortingColumn || typeof sortingColumn.sortable === 'string') {
    return data;
  }
  return util_orderBy(data, states.sortProp, states.sortOrder, sortingColumn.sortMethod, sortingColumn.sortBy);
};

var table_store_getKeysMap = function getKeysMap(array, rowKey) {
  var arrayMap = {};
  (array || []).forEach(function (row, index) {
    arrayMap[getRowIdentity(row, rowKey)] = { row: row, index: index };
  });
  return arrayMap;
};

var toggleRowSelection = function toggleRowSelection(states, row, selected) {
  var changed = false;
  var selection = states.selection;
  var index = selection.indexOf(row);
  if (typeof selected === 'undefined') {
    if (index === -1) {
      selection.push(row);
      changed = true;
    } else {
      selection.splice(index, 1);
      changed = true;
    }
  } else {
    if (selected && index === -1) {
      selection.push(row);
      changed = true;
    } else if (!selected && index > -1) {
      selection.splice(index, 1);
      changed = true;
    }
  }

  return changed;
};

var toggleRowExpansion = function toggleRowExpansion(states, row, expanded) {
  var changed = false;
  var expandRows = states.expandRows;
  if (typeof expanded !== 'undefined') {
    var index = expandRows.indexOf(row);
    if (expanded) {
      if (index === -1) {
        expandRows.push(row);
        changed = true;
      }
    } else {
      if (index !== -1) {
        expandRows.splice(index, 1);
        changed = true;
      }
    }
  } else {
    var _index = expandRows.indexOf(row);
    if (_index === -1) {
      expandRows.push(row);
      changed = true;
    } else {
      expandRows.splice(_index, 1);
      changed = true;
    }
  }

  return changed;
};

var TableStore = function TableStore(table) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!table) {
    throw new Error('Table is required.');
  }
  this.table = table;

  this.states = {
    rowKey: null,
    _columns: [],
    originColumns: [],
    columns: [],
    fixedColumns: [],
    rightFixedColumns: [],
    leafColumns: [],
    fixedLeafColumns: [],
    rightFixedLeafColumns: [],
    leafColumnsLength: 0,
    fixedLeafColumnsLength: 0,
    rightFixedLeafColumnsLength: 0,
    isComplex: false,
    filteredData: null,
    data: null,
    sortingColumn: null,
    sortProp: null,
    sortOrder: null,
    isAllSelected: false,
    selection: [],
    reserveSelection: false,
    selectable: null,
    currentRow: null,
    hoverRow: null,
    filters: {},
    expandRows: [],
    defaultExpandAll: false,
    selectOnIndeterminate: false
  };

  for (var prop in initialState) {
    if (initialState.hasOwnProperty(prop) && this.states.hasOwnProperty(prop)) {
      this.states[prop] = initialState[prop];
    }
  }
};

TableStore.prototype.mutations = {
  setData: function setData(states, data) {
    var _this = this;

    var dataInstanceChanged = states._data !== data;
    states._data = data;

    Object.keys(states.filters).forEach(function (columnId) {
      var values = states.filters[columnId];
      if (!values || values.length === 0) return;
      var column = getColumnById(_this.states, columnId);
      if (column && column.filterMethod) {
        data = data.filter(function (row) {
          return values.some(function (value) {
            return column.filterMethod.call(null, value, row, column);
          });
        });
      }
    });

    states.filteredData = data;
    states.data = table_store_sortData(data || [], states);

    this.updateCurrentRow();

    var rowKey = states.rowKey;

    if (!states.reserveSelection) {
      if (dataInstanceChanged) {
        this.clearSelection();
      } else {
        this.cleanSelection();
      }
      this.updateAllSelected();
    } else {
      if (rowKey) {
        var selection = states.selection;
        var selectedMap = table_store_getKeysMap(selection, rowKey);

        states.data.forEach(function (row) {
          var rowId = getRowIdentity(row, rowKey);
          var rowInfo = selectedMap[rowId];
          if (rowInfo) {
            selection[rowInfo.index] = row;
          }
        });

        this.updateAllSelected();
      } else {
        console.warn('WARN: rowKey is required when reserve-selection is enabled.');
      }
    }

    var defaultExpandAll = states.defaultExpandAll;
    if (defaultExpandAll) {
      this.states.expandRows = (states.data || []).slice(0);
    } else if (rowKey) {
      // update expandRows to new rows according to rowKey
      var ids = table_store_getKeysMap(this.states.expandRows, rowKey);
      var expandRows = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = states.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var row = _step.value;

          var rowId = getRowIdentity(row, rowKey);
          if (ids[rowId]) {
            expandRows.push(row);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.states.expandRows = expandRows;
    } else {
      // clear the old rows
      this.states.expandRows = [];
    }

    external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.nextTick(function () {
      return _this.table.updateScrollY();
    });
  },


  // changeSortCondition(states, options) {
  //   states.data = sortData((states.filteredData || states._data || []), states);

  //   const { $el, highlightCurrentRow } = this.table;
  //   if ($el && highlightCurrentRow) {
  //     const data = states.data;
  //     const tr = $el.querySelector('tbody').children;
  //     const rows = [].filter.call(tr, row => hasClass(row, 'el-table__row'));
  //     const row = rows[data.indexOf(states.currentRow)];

  //     [].forEach.call(rows, row => removeClass(row, 'current-row'));
  //     addClass(row, 'current-row');
  //   }

  //   if (!options || !options.silent) {
  //     this.table.$emit('sort-change', {
  //       column: this.states.sortingColumn,
  //       prop: this.states.sortProp,
  //       order: this.states.sortOrder
  //     });
  //   }

  //   Vue.nextTick(() => this.table.updateScrollY());
  // },

  // sort(states, options) {
  //   const { prop, order } = options;
  //   if (prop) {
  //     states.sortProp = prop;
  //     states.sortOrder = order || 'ascending';
  //     Vue.nextTick(() => {
  //       for (let i = 0, length = states.columns.length; i < length; i++) {
  //         let column = states.columns[i];
  //         if (column.property === states.sortProp) {
  //           column.order = states.sortOrder;
  //           states.sortingColumn = column;
  //           break;
  //         }
  //       }

  //       if (states.sortingColumn) {
  //         this.commit('changeSortCondition');
  //       }
  //     });
  //   }
  // },

  // filterChange(states, options) {
  //   let { column, values, silent } = options;
  //   if (values && !Array.isArray(values)) {
  //     values = [values];
  //   }

  //   const prop = column.property;
  //   const filters = {};

  //   if (prop) {
  //     states.filters[column.id] = values;
  //     filters[column.columnKey || column.id] = values;
  //   }

  //   let data = states._data;

  //   Object.keys(states.filters).forEach((columnId) => {
  //     const values = states.filters[columnId];
  //     if (!values || values.length === 0) return;
  //     const column = getColumnById(this.states, columnId);
  //     if (column && column.filterMethod) {
  //       data = data.filter((row) => {
  //         return values.some(value => column.filterMethod.call(null, value, row, column));
  //       });
  //     }
  //   });

  //   states.filteredData = data;
  //   states.data = sortData(data, states);

  //   if (!silent) {
  //     this.table.$emit('filter-change', filters);
  //   }

  //   Vue.nextTick(() => this.table.updateScrollY());
  // },

  insertColumn: function insertColumn(states, column, index, parent) {
    var array = states._columns;
    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }

    if (typeof index !== 'undefined') {
      array.splice(index, 0, column);
    } else {
      array.push(column);
    }

    if (column.type === 'selection') {
      states.selectable = column.selectable;
      states.reserveSelection = column.reserveSelection;
    }

    if (this.table.$ready) {
      this.updateColumns(); // hack for dynamics insert column
      this.scheduleLayout();
    }
  },
  removeColumn: function removeColumn(states, column, parent) {
    var array = states._columns;
    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }
    if (array) {
      array.splice(array.indexOf(column), 1);
    }

    if (this.table.$ready) {
      this.updateColumns(); // hack for dynamics remove column
      this.scheduleLayout();
    }
  },
  setHoverRow: function setHoverRow(states, row) {
    states.hoverRow = row;
    console.log(states.hoverRow, 'setHoverRow');
  },
  setCurrentRow: function setCurrentRow(states, row) {
    var oldCurrentRow = states.currentRow;
    states.currentRow = row;

    if (oldCurrentRow !== row) {
      this.table.$emit('current-change', row, oldCurrentRow);
    }
  },
  rowSelectedChanged: function rowSelectedChanged(states, row) {
    var changed = toggleRowSelection(states, row);
    var selection = states.selection;

    if (changed) {
      var table = this.table;
      table.$emit('selection-change', selection ? selection.slice() : []);
      table.$emit('select', selection, row);
    }

    this.updateAllSelected();
  },


  toggleAllSelection: debounce_default()(10, function (states) {
    var data = states.data || [];
    if (data.length === 0) return;
    var selection = this.states.selection;
    // when only some rows are selected (but not all), select or deselect all of them
    // depending on the value of selectOnIndeterminate
    var value = states.selectOnIndeterminate ? !states.isAllSelected : !(states.isAllSelected || selection.length);
    var selectionChanged = false;

    data.forEach(function (item, index) {
      if (states.selectable) {
        if (states.selectable.call(null, item, index) && toggleRowSelection(states, item, value)) {
          selectionChanged = true;
        }
      } else {
        if (toggleRowSelection(states, item, value)) {
          selectionChanged = true;
        }
      }
    });

    var table = this.table;
    if (selectionChanged) {
      table.$emit('selection-change', selection ? selection.slice() : []);
    }
    table.$emit('select-all', selection);
    states.isAllSelected = value;
  })
};

var doFlattenColumns = function doFlattenColumns(columns) {
  var result = [];
  columns.forEach(function (column) {
    if (column.children) {
      result.push.apply(result, doFlattenColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};

TableStore.prototype.updateColumns = function () {
  var states = this.states;
  var _columns = states._columns || [];
  states.fixedColumns = _columns.filter(function (column) {
    return column.fixed === true || column.fixed === 'left';
  });
  states.rightFixedColumns = _columns.filter(function (column) {
    return column.fixed === 'right';
  });

  if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
    _columns[0].fixed = true;
    states.fixedColumns.unshift(_columns[0]);
  }

  var notFixedColumns = _columns.filter(function (column) {
    return !column.fixed;
  });
  states.originColumns = [].concat(states.fixedColumns).concat(notFixedColumns).concat(states.rightFixedColumns);

  var leafColumns = doFlattenColumns(notFixedColumns);
  var fixedLeafColumns = doFlattenColumns(states.fixedColumns);
  var rightFixedLeafColumns = doFlattenColumns(states.rightFixedColumns);

  states.leafColumnsLength = leafColumns.length;
  states.fixedLeafColumnsLength = fixedLeafColumns.length;
  states.rightFixedLeafColumnsLength = rightFixedLeafColumns.length;

  states.columns = [].concat(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns);
  // 显示行的hover样式
  states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0;
};

TableStore.prototype.isSelected = function (row) {
  return (this.states.selection || []).indexOf(row) > -1;
};

TableStore.prototype.clearSelection = function () {
  var states = this.states;
  states.isAllSelected = false;
  var oldSelection = states.selection;
  if (states.selection.length) {
    states.selection = [];
  }
  if (oldSelection.length > 0) {
    this.table.$emit('selection-change', states.selection ? states.selection.slice() : []);
  }
};

// TableStore.prototype.setExpandRowKeys = function(rowKeys) {
//   const expandRows = [];
//   const data = this.states.data;
//   const rowKey = this.states.rowKey;
//   if (!rowKey) throw new Error('[Table] prop row-key should not be empty.');
//   const keysMap = getKeysMap(data, rowKey);
//   rowKeys.forEach((key) => {
//     const info = keysMap[key];
//     if (info) {
//       expandRows.push(info.row);
//     }
//   });

//   this.states.expandRows = expandRows;
// };

TableStore.prototype.toggleRowSelection = function (row, selected) {
  var changed = toggleRowSelection(this.states, row, selected);
  if (changed) {
    this.table.$emit('selection-change', this.states.selection ? this.states.selection.slice() : []);
  }
};

// TableStore.prototype.toggleRowExpansion = function(row, expanded) {
//   const changed = toggleRowExpansion(this.states, row, expanded);
//   if (changed) {
//     this.table.$emit('expand-change', row, this.states.expandRows);
//     this.scheduleLayout();
//   }
// };

// TableStore.prototype.isRowExpanded = function(row) {
//   const { expandRows = [], rowKey } = this.states;
//   if (rowKey) {
//     const expandMap = getKeysMap(expandRows, rowKey);
//     return !!expandMap[getRowIdentity(row, rowKey)];
//   }
//   return expandRows.indexOf(row) !== -1;
// };

TableStore.prototype.cleanSelection = function () {
  var selection = this.states.selection || [];
  var data = this.states.data;
  var rowKey = this.states.rowKey;
  var deleted = void 0;
  if (rowKey) {
    deleted = [];
    var selectedMap = table_store_getKeysMap(selection, rowKey);
    var dataMap = table_store_getKeysMap(data, rowKey);
    for (var key in selectedMap) {
      if (selectedMap.hasOwnProperty(key) && !dataMap[key]) {
        deleted.push(selectedMap[key].row);
      }
    }
  } else {
    deleted = selection.filter(function (item) {
      return data.indexOf(item) === -1;
    });
  }

  deleted.forEach(function (deletedItem) {
    selection.splice(selection.indexOf(deletedItem), 1);
  });

  if (deleted.length) {
    this.table.$emit('selection-change', selection ? selection.slice() : []);
  }
};

// TableStore.prototype.clearFilter = function() {
//   const states = this.states;
//   const { tableHeader, fixedTableHeader, rightFixedTableHeader } = this.table.$refs;
//   let panels = {};

//   if (tableHeader) panels = merge(panels, tableHeader.filterPanels);
//   if (fixedTableHeader) panels = merge(panels, fixedTableHeader.filterPanels);
//   if (rightFixedTableHeader) panels = merge(panels, rightFixedTableHeader.filterPanels);

//   const keys = Object.keys(panels);
//   if (!keys.length) return;

//   keys.forEach(key => {
//     panels[key].filteredValue = [];
//   });

//   states.filters = {};

//   this.commit('filterChange', {
//     column: {},
//     values: [],
//     silent: true
//   });
// };

// TableStore.prototype.clearSort = function() {
//   const states = this.states;
//   if (!states.sortingColumn) return;
//   states.sortingColumn.order = null;
//   states.sortProp = null;
//   states.sortOrder = null;

//   this.commit('changeSortCondition', {
//     silent: true
//   });
// };

TableStore.prototype.updateAllSelected = function () {
  var states = this.states;
  var selection = states.selection,
      rowKey = states.rowKey,
      selectable = states.selectable,
      data = states.data;

  if (!data || data.length === 0) {
    states.isAllSelected = false;
    return;
  }

  var selectedMap = void 0;
  if (rowKey) {
    selectedMap = table_store_getKeysMap(states.selection, rowKey);
  }

  var isSelected = function isSelected(row) {
    if (selectedMap) {
      return !!selectedMap[getRowIdentity(row, rowKey)];
    } else {
      return selection.indexOf(row) !== -1;
    }
  };

  var isAllSelected = true;
  var selectedCount = 0;
  for (var i = 0, j = data.length; i < j; i++) {
    var item = data[i];
    var isRowSelectable = selectable && selectable.call(null, item, i);
    if (!isSelected(item)) {
      if (!selectable || isRowSelectable) {
        isAllSelected = false;
        break;
      }
    } else {
      selectedCount++;
    }
  }

  if (selectedCount === 0) isAllSelected = false;

  states.isAllSelected = isAllSelected;
};

TableStore.prototype.scheduleLayout = function (updateColumns) {
  if (updateColumns) {
    this.updateColumns();
  }
  this.table.debouncedUpdateLayout();
};

TableStore.prototype.setCurrentRowKey = function (key) {
  var states = this.states;
  var rowKey = states.rowKey;
  if (!rowKey) throw new Error('[Table] row-key should not be empty.');
  var data = states.data || [];
  var keysMap = table_store_getKeysMap(data, rowKey);
  var info = keysMap[key];
  states.currentRow = info ? info.row : null;
};

TableStore.prototype.updateCurrentRow = function () {
  var states = this.states;
  var table = this.table;
  var data = states.data || [];
  var oldCurrentRow = states.currentRow;

  if (data.indexOf(oldCurrentRow) === -1) {
    states.currentRow = null;

    if (states.currentRow !== oldCurrentRow) {
      table.$emit('current-change', null, oldCurrentRow);
    }
  }
};

TableStore.prototype.commit = function (name) {
  var mutations = this.mutations;
  if (mutations[name]) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    mutations[name].apply(this, [this.states].concat(args));
  } else {
    throw new Error('Action not found: ' + name);
  }
};

/* harmony default export */ var table_store = (TableStore);
// CONCATENATED MODULE: ./node_modules/element-ui/src/utils/scrollbar-width.js


let scrollBarWidth;

/* harmony default export */ var scrollbar_width = (function() {
  if (external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.prototype.$isServer) return 0;
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  const outer = document.createElement('div');
  outer.className = 'el-scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
});;

// CONCATENATED MODULE: ./packages/table/src/table-layout.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var table_layout_TableLayout = function () {
  function TableLayout(options) {
    _classCallCheck(this, TableLayout);

    this.observers = [];
    this.table = null;
    this.store = null;
    this.columns = null;
    this.fit = true;
    this.showHeader = true;

    this.height = null;
    this.scrollX = false;
    this.scrollY = false;
    this.bodyWidth = null;
    this.fixedWidth = null;
    this.rightFixedWidth = null;
    this.tableHeight = null;
    this.headerHeight = 44; // Table Header Height
    this.appendHeight = 0; // Append Slot Height
    this.footerHeight = 44; // Table Footer Height
    this.viewportHeight = null; // Table Height - Scroll Bar Height
    this.bodyHeight = null; // Table Height - Table Header Height
    this.fixedBodyHeight = null; // Table Height - Table Header Height - Scroll Bar Height
    this.gutterWidth = scrollbar_width();

    for (var name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }
    if (!this.table) {
      throw new Error('table is required for Table Layout');
    }
    if (!this.store) {
      throw new Error('store is required for Table Layout');
    }
  }

  _createClass(TableLayout, [{
    key: 'updateScrollY',
    value: function updateScrollY() {
      var height = this.height;
      if (typeof height !== 'string' && typeof height !== 'number') return;
      var bodyWrapper = this.table.bodyWrapper;
      if (this.table.$el && bodyWrapper) {
        var body = bodyWrapper.querySelector('.el-table__body');
        this.scrollY = body.offsetHeight > this.bodyHeight;
        console.log(2222);
      }
    }
  }, {
    key: 'setHeight',
    value: function setHeight(value) {
      var _this = this;

      var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'height';

      if (external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.prototype.$isServer) return;
      var el = this.table.$el;
      if (typeof value === 'string' && /^\d+$/.test(value)) {
        value = Number(value);
      }
      console.log(value, 'setHeight');
      this.height = value;

      if (!el && (value || value === 0)) return external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.nextTick(function () {
        return _this.setHeight(value, prop);
      });

      if (typeof value === 'number') {
        el.style[prop] = value + 'px';

        this.updateElsHeight();
      } else if (typeof value === 'string') {
        el.style[prop] = value;
        this.updateElsHeight();
      }
    }
  }, {
    key: 'setMaxHeight',
    value: function setMaxHeight(value) {
      return this.setHeight(value, 'max-height');
    }
  }, {
    key: 'updateElsHeight',
    value: function updateElsHeight() {
      var _this2 = this;

      if (!this.table.$ready) return external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.nextTick(function () {
        return _this2.updateElsHeight();
      });
      var _table$$refs = this.table.$refs,
          headerWrapper = _table$$refs.headerWrapper,
          appendWrapper = _table$$refs.appendWrapper,
          footerWrapper = _table$$refs.footerWrapper;

      this.appendHeight = appendWrapper ? appendWrapper.offsetHeight : 0;

      if (this.showHeader && !headerWrapper) return;
      var headerHeight = this.headerHeight = !this.showHeader ? 0 : headerWrapper.offsetHeight;
      if (this.showHeader && headerWrapper.offsetWidth > 0 && (this.table.columns || []).length > 0 && headerHeight < 2) {
        return external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.nextTick(function () {
          return _this2.updateElsHeight();
        });
      }
      console.log(headerHeight, 'headerHeight');
      var tableHeight = this.tableHeight = this.table.$el.clientHeight;
      console.log(this.height, this.height !== null && (!isNaN(this.height) || typeof this.height === 'string'), 'this.height');
      if (this.height !== null && (!isNaN(this.height) || typeof this.height === 'string')) {
        var footerHeight = this.footerHeight = footerWrapper ? footerWrapper.offsetHeight : 0;
        this.bodyHeight = tableHeight - headerHeight - footerHeight + (footerWrapper ? 1 : 0);
        console.log(this.bodyHeight);
      }
      console.log(this.bodyHeight, 'bodyHeight');
      this.fixedBodyHeight = this.scrollX ? this.bodyHeight - this.gutterWidth : this.bodyHeight;

      var noData = !this.table.data || this.table.data.length === 0;
      this.viewportHeight = this.scrollX ? tableHeight - (noData ? 0 : this.gutterWidth) : tableHeight;

      this.updateScrollY();
      this.notifyObservers('scrollable');
    }
  }, {
    key: 'getFlattenColumns',
    value: function getFlattenColumns() {
      var flattenColumns = [];
      var columns = this.table.columns;
      columns.forEach(function (column) {
        if (column.isColumnGroup) {
          flattenColumns.push.apply(flattenColumns, column.columns);
        } else {
          flattenColumns.push(column);
        }
      });

      return flattenColumns;
    }
  }, {
    key: 'updateColumnsWidth',
    value: function updateColumnsWidth() {
      if (external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.prototype.$isServer) return;
      var fit = this.fit;
      var bodyWidth = this.table.$el.clientWidth;
      var bodyMinWidth = 0;

      var flattenColumns = this.getFlattenColumns();
      var flexColumns = flattenColumns.filter(function (column) {
        return typeof column.width !== 'number';
      });

      flattenColumns.forEach(function (column) {
        // Clean those columns whose width changed from flex to unflex
        if (typeof column.width === 'number' && column.realWidth) column.realWidth = null;
      });

      if (flexColumns.length > 0 && fit) {
        flattenColumns.forEach(function (column) {
          bodyMinWidth += column.width || column.minWidth || 80;
        });

        var scrollYWidth = this.scrollY ? this.gutterWidth : 0;

        if (bodyMinWidth <= bodyWidth - scrollYWidth) {
          // DON'T HAVE SCROLL BAR
          this.scrollX = false;

          var totalFlexWidth = bodyWidth - scrollYWidth - bodyMinWidth;

          if (flexColumns.length === 1) {
            flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth;
          } else {
            var allColumnsWidth = flexColumns.reduce(function (prev, column) {
              return prev + (column.minWidth || 80);
            }, 0);
            var flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
            var noneFirstWidth = 0;

            flexColumns.forEach(function (column, index) {
              if (index === 0) return;
              var flexWidth = Math.floor((column.minWidth || 80) * flexWidthPerPixel);
              noneFirstWidth += flexWidth;
              column.realWidth = (column.minWidth || 80) + flexWidth;
            });

            flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth - noneFirstWidth;
          }
        } else {
          // HAVE HORIZONTAL SCROLL BAR
          this.scrollX = true;
          flexColumns.forEach(function (column) {
            column.realWidth = column.minWidth;
          });
        }

        this.bodyWidth = Math.max(bodyMinWidth, bodyWidth);
        this.table.resizeState.width = this.bodyWidth;
      } else {
        flattenColumns.forEach(function (column) {
          if (!column.width && !column.minWidth) {
            column.realWidth = 80;
          } else {
            column.realWidth = column.width || column.minWidth;
          }

          bodyMinWidth += column.realWidth;
        });
        this.scrollX = bodyMinWidth > bodyWidth;

        this.bodyWidth = bodyMinWidth;
      }

      var fixedColumns = this.store.states.fixedColumns;

      if (fixedColumns.length > 0) {
        var fixedWidth = 0;
        fixedColumns.forEach(function (column) {
          fixedWidth += column.realWidth || column.width;
        });

        this.fixedWidth = fixedWidth;
      }

      var rightFixedColumns = this.store.states.rightFixedColumns;
      if (rightFixedColumns.length > 0) {
        var rightFixedWidth = 0;
        rightFixedColumns.forEach(function (column) {
          rightFixedWidth += column.realWidth || column.width;
        });

        this.rightFixedWidth = rightFixedWidth;
      }

      this.notifyObservers('columns');
    }
  }, {
    key: 'addObserver',
    value: function addObserver(observer) {
      this.observers.push(observer);
    }
  }, {
    key: 'removeObserver',
    value: function removeObserver(observer) {
      var index = this.observers.indexOf(observer);
      if (index !== -1) {
        this.observers.splice(index, 1);
      }
    }
  }, {
    key: 'notifyObservers',
    value: function notifyObservers(event) {
      var _this3 = this;

      var observers = this.observers;
      observers.forEach(function (observer) {
        switch (event) {
          case 'columns':
            observer.onColumnsChange(_this3);
            break;
          case 'scrollable':
            observer.onScrollableChange(_this3);
            break;
          default:
            throw new Error('Table Layout don\'t have event ' + event + '.');
        }
      });
    }
  }]);

  return TableLayout;
}();

/* harmony default export */ var table_layout = (table_layout_TableLayout);
// EXTERNAL MODULE: ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
var ResizeObserver_es = __webpack_require__(15);

// CONCATENATED MODULE: ./src/utils/resize-event.js


var resize_event_isServer = typeof window === 'undefined';
// 在尺寸发生变化时通知元素

/* istanbul ignore next */
var resizeHandler = function resizeHandler(entries) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entry = _step.value;

      var listeners = entry.target.__resizeListeners__ || [];
      if (listeners.length) {
        listeners.forEach(function (fn) {
          fn();
        });
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

/* istanbul ignore next */
var resize_event_addResizeListener = function addResizeListener(element, fn) {
  if (resize_event_isServer) return;
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    element.__ro__ = new ResizeObserver_es["a" /* default */](resizeHandler);
    element.__ro__.observe(element);
  }
  element.__resizeListeners__.push(fn);
};

/* istanbul ignore next */
var removeResizeListener = function removeResizeListener(element, fn) {
  if (!element || !element.__resizeListeners__) return;
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect();
  }
};
// EXTERNAL MODULE: ./node_modules/normalize-wheel/index.js
var normalize_wheel = __webpack_require__(17);
var normalize_wheel_default = /*#__PURE__*/__webpack_require__.n(normalize_wheel);

// CONCATENATED MODULE: ./src/directives/mousewheel.js


var isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

var mousewheel_mousewheel = function mousewheel(element, callback) {
  if (element && element.addEventListener) {
    element.addEventListener(isFirefox ? 'DOMMouseScroll' : 'mousewheel', function (event) {
      var normalized = normalize_wheel_default()(event);
      callback && callback.apply(this, [event, normalized]);
    });
  }
};

/* harmony default export */ var directives_mousewheel = ({
  bind: function bind(el, binding) {
    mousewheel_mousewheel(el, binding.value);
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/table/src/table.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








// import TableColumn from './table-column';
var tableIdSeed = 1;
/* harmony default export */ var src_table = ({
  name: 'YTable',
  directives: { Mousewheel: directives_mousewheel },
  props: {
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    border: Boolean,
    height: [String, Number],
    rowStyle: [Object, Function],
    rowClassName: [String, Function],
    highlightCurrentRow: { type: Boolean, default: true },
    prop: String,
    fit: {
      type: Boolean,
      default: true
    },
    stripe: Boolean,
    spanMethod: Function,
    showHeader: {
      type: Boolean,
      default: true
    },
    emptyText: { type: String, default: '暂无数据' },
    emptyType: String,
    tooltipEffect: { type: String, default: 'dark' }
  },
  methods: {
    getMigratingConfig: function getMigratingConfig() {
      return {
        events: {
          expand: 'expand is renamed to expand-change'
        }
      };
    },
    setCurrentRow: function setCurrentRow(row) {
      this.store.commit('setCurrentRow', row);
    },
    toggleRowSelection: function toggleRowSelection(row, selected) {
      this.store.toggleRowSelection(row, selected);
      this.store.updateAllSelected();
    },


    /* toggleRowExpansion(row, expanded) {
      this.store.toggleRowExpansion(row, expanded);
    },*/

    clearSelection: function clearSelection() {
      this.store.clearSelection();
    },


    /* clearFilter() {
      this.store.clearFilter();
    },
      clearSort() {
      this.store.clearSort();
    }, */

    handleMouseLeave: function handleMouseLeave() {
      this.store.commit('setHoverRow', null);
      if (this.hoverState) this.hoverState = null;
    },
    updateScrollY: function updateScrollY() {
      this.layout.updateScrollY();
      this.layout.updateColumnsWidth();
    },

    // 固定列表鼠标滚动事件
    handleFixedMousewheel: function handleFixedMousewheel(event, data) {
      var bodyWrapper = this.bodyWrapper;
      if (Math.abs(data.spinY) > 0) {
        var currentScrollTop = bodyWrapper.scrollTop;
        if (data.pixelY < 0 && currentScrollTop !== 0) {
          event.preventDefault();
        }
        if (data.pixelY > 0 && bodyWrapper.scrollHeight - bodyWrapper.clientHeight > currentScrollTop) {
          event.preventDefault();
        }
        bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5);
      } else {
        bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5);
      }
    },
    handleHeaderFooterMousewheel: function handleHeaderFooterMousewheel(event, data) {
      var pixelX = data.pixelX,
          pixelY = data.pixelY;

      if (Math.abs(pixelX) >= Math.abs(pixelY)) {
        event.preventDefault();
        this.bodyWrapper.scrollLeft += data.pixelX / 5;
      }
    },
    bindEvents: function bindEvents() {
      var _$refs = this.$refs,
          headerWrapper = _$refs.headerWrapper,
          footerWrapper = _$refs.footerWrapper;

      var refs = this.$refs;
      var self = this;

      this.bodyWrapper.addEventListener('scroll', function () {
        if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
        if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft;
        if (refs.fixedBodyWrapper) refs.fixedBodyWrapper.scrollTop = this.scrollTop;
        if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
        var maxScrollLeftPosition = this.scrollWidth - this.offsetWidth - 1;
        var scrollLeft = this.scrollLeft;
        if (scrollLeft >= maxScrollLeftPosition) {
          self.scrollPosition = 'right';
        } else if (scrollLeft === 0) {
          self.scrollPosition = 'left';
        } else {
          self.scrollPosition = 'middle';
        }
      });

      if (this.fit) {
        resize_event_addResizeListener(this.$el, this.resizeListener);
      }
    },
    resizeListener: function resizeListener() {
      if (!this.$ready) return;
      var shouldUpdateLayout = false;
      var el = this.$el;
      var _resizeState = this.resizeState,
          oldWidth = _resizeState.width,
          oldHeight = _resizeState.height;


      var width = el.offsetWidth;
      if (oldWidth !== width) {
        shouldUpdateLayout = true;
      }

      var height = el.offsetHeight;
      if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
        shouldUpdateLayout = true;
      }

      if (shouldUpdateLayout) {
        this.resizeState.width = width;
        this.resizeState.height = height;
        this.doLayout();
      }
    },
    doLayout: function doLayout() {
      this.layout.updateColumnsWidth();
      if (this.shouldUpdateHeight) {
        this.layout.updateElsHeight();
      }
    },


    /* sort(prop, order) {
      this.store.commit('sort', { prop, order });
    },*/

    toggleAllSelection: function toggleAllSelection() {
      this.store.commit('toggleAllSelection');
    }
  },

  created: function created() {
    var _this = this;

    this.tableId = 'el-table_' + tableIdSeed++;
    this.debouncedUpdateLayout = debounce_default()(50, function () {
      return _this.doLayout();
    });
  },


  computed: {
    tableSize: function tableSize() {
      return this.size || (this.$ELEMENT || {}).size;
    },
    bodyWrapper: function bodyWrapper() {
      return this.$refs.bodyWrapper;
    },
    shouldUpdateHeight: function shouldUpdateHeight() {
      return this.height || this.maxHeight || this.fixedColumns.length > 0 || this.rightFixedColumns.length > 0;
    },
    selection: function selection() {
      return this.store.states.selection;
    },
    columns: function columns() {
      return this.store.states.columns;
    },
    tableData: function tableData() {
      return this.store.states.data;
    },
    fixedColumns: function fixedColumns() {
      return this.store.states.fixedColumns;
    },
    rightFixedColumns: function rightFixedColumns() {
      return this.store.states.rightFixedColumns;
    },
    bodyWidth: function bodyWidth() {
      var _layout = this.layout,
          bodyWidth = _layout.bodyWidth,
          scrollY = _layout.scrollY,
          gutterWidth = _layout.gutterWidth;

      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
    },
    bodyHeight: function bodyHeight() {
      if (this.height) {
        console.log(this.height, this.layout.bodyHeight, 'height');
        return {
          height: this.layout.bodyHeight ? this.layout.bodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        return {
          'max-height': (this.showHeader ? this.maxHeight - this.layout.headerHeight - this.layout.footerHeight : this.maxHeight - this.layout.footerHeight) + 'px'
        };
      }
      return {};
    },
    fixedBodyHeight: function fixedBodyHeight() {
      if (this.height) {
        return {
          height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        var maxHeight = this.layout.scrollX ? this.maxHeight - this.layout.gutterWidth : this.maxHeight;

        if (this.showHeader) {
          maxHeight -= this.layout.headerHeight;
        }

        maxHeight -= this.layout.footerHeight;

        return {
          'max-height': maxHeight + 'px'
        };
      }

      return {};
    },
    fixedHeight: function fixedHeight() {
      if (this.maxHeight) {
        if (this.showSummary) {
          return {
            bottom: 0
          };
        }
        return {
          bottom: this.layout.scrollX && this.data.length ? this.layout.gutterWidth + 'px' : ''
        };
      } else {
        if (this.showSummary) {
          return {
            height: this.layout.tableHeight ? this.layout.tableHeight + 'px' : ''
          };
        }
        return {
          height: this.layout.viewportHeight ? this.layout.viewportHeight + 'px' : ''
        };
      }
    }
  },

  watch: {

    data: {
      immediate: true,
      handler: function handler(value) {
        var _this2 = this;

        this.store.commit('setData', value);
        if (this.$ready) {
          this.$nextTick(function () {
            _this2.doLayout();
          });
        }
      }
    },
    height: {
      immediate: true,
      handler: function handler(value) {
        this.layout.setHeight(value);
      }
    },

    maxHeight: {
      immediate: true,
      handler: function handler(value) {
        this.layout.setMaxHeight(value);
      }
    }
  },

  destroyed: function destroyed() {
    if (this.resizeListener) removeResizeListener(this.$el, this.resizeListener);
  },
  mounted: function mounted() {
    this.bindEvents();
    this.store.updateColumns();
    this.doLayout();

    this.resizeState = {
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    };

    // init filters
    /* this.store.states.columns.forEach(column => {
      if (column.filteredValue && column.filteredValue.length) {
        this.store.commit('filterChange', {
          column,
          values: column.filteredValue,
          silent: true
        });
      }
    }); */

    this.$ready = true;
  },
  data: function data() {
    var store = new table_store(this, {
      rowKey: this.rowKey,
      defaultExpandAll: this.defaultExpandAll,
      selectOnIndeterminate: this.selectOnIndeterminate
    });
    var layout = new table_layout({
      store: store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader
    });
    return {
      layout: layout,
      store: store,
      isHidden: false,
      renderExpanded: null,
      resizeProxyVisible: false,
      resizeState: {
        width: null,
        height: null
      },
      // 是否拥有多级表头
      isGroup: false,
      scrollPosition: 'left'
    };
  },

  components: { TableBody: table_body, TableHeader: table_header }

});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4d62c4fe","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/table/src/table.vue
var table_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "el-table", class: [{
      'el-table--fit': _vm.fit,
      'el-table--striped': _vm.stripe,
      'el-table--border': _vm.border,
      'el-table--scrollable-x': _vm.layout.scrollX,
      'el-table--scrollable-y': _vm.layout.scrollY,
      'el-table--enable-row-hover': !_vm.store.states.isComplex }] }, [_c('div', { ref: "hiddenColumns", staticClass: "hidden-columns" }, [_vm._t("default")], 2), _vm._v(" "), _vm.showHeader ? _c('div', { ref: "headerWrapper", staticClass: "el-table__header-wrapper" }, [_c('table-header', { ref: "tableHeader", style: {
      width: _vm.layout.bodyWidth ? _vm.layout.bodyWidth + 'px' : ''
    }, attrs: { "store": _vm.store, "border": _vm.border } })], 1) : _vm._e(), _vm._v(" "), _c('div', { ref: "bodyWrapper", staticClass: "el-table__body-wrapper", class: [_vm.layout.scrollX ? "is-scrolling-" + _vm.scrollPosition : 'is-scrolling-none'], style: [_vm.bodyHeight] }, [_c('table-body', { style: {
      width: _vm.bodyWidth
    }, attrs: { "store": _vm.store, "stripe": _vm.stripe } })], 1), _vm._v(" "), !_vm.data || _vm.data.length === 0 ? _c('div', { ref: "emptyBlock", class: ['el-table__empty-block', 'is-' + _vm.emptyType], style: {
      width: _vm.bodyWidth
    } }, [_vm.emptyType !== 'pic' ? _c('span', { staticClass: "el-table__empty-text" }, [_vm._t("empty", [_vm._v(_vm._s(_vm.emptyText || _vm.t('el.table.emptyText')))])], 2) : _c('span', [_c('img', { attrs: { "src": __webpack_require__(22) } }), _vm._v(" "), _vm._t("empty", [_vm._v(_vm._s(_vm.emptyText || _vm.t('el.table.emptyText')))])], 2)]) : _vm._e(), _vm._v(" "), _vm.fixedColumns.length > 0 ? _c('div', { directives: [{ name: "mousewheel", rawName: "v-mousewheel", value: _vm.handleFixedMousewheel, expression: "handleFixedMousewheel" }], ref: "fixedWrapper", staticClass: "el-table__fixed", style: [{
      width: _vm.layout.fixedWidth ? _vm.layout.fixedWidth + 'px' : ''
    }, _vm.fixedHeight] }, [_vm.showHeader ? _c('div', { ref: "fixedHeaderWrapper", staticClass: "el-table__fixed-header-wrapper" }, [_c('table-header', { ref: "fixedTableHeader", style: {
      width: _vm.bodyWidth
    }, attrs: { "fixed": "left", "border": _vm.border, "store": _vm.store } })], 1) : _vm._e(), _vm._v(" "), _c('div', { ref: "fixedBodyWrapper", staticClass: "el-table__fixed-body-wrapper", style: [{
      top: _vm.layout.headerHeight + 'px'
    }, _vm.fixedBodyHeight] }, [_c('table-body', { style: {
      width: _vm.bodyWidth
    }, attrs: { "fixed": "left", "store": _vm.store, "stripe": _vm.stripe, "highlight": _vm.highlightCurrentRow, "row-class-name": _vm.rowClassName, "row-style": _vm.rowStyle } }), _vm._v(" "), _vm.$slots.append ? _c('div', { staticClass: "el-table__append-gutter", style: {
      height: _vm.layout.appendHeight + 'px'
    } }) : _vm._e()], 1)]) : _vm._e(), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.resizeProxyVisible, expression: "resizeProxyVisible" }], ref: "resizeProxy", staticClass: "el-table__column-resize-proxy" })]);
};
var table_staticRenderFns = [];
var table_esExports = { render: table_render, staticRenderFns: table_staticRenderFns };
/* harmony default export */ var table_src_table = (table_esExports);
// CONCATENATED MODULE: ./packages/table/src/table.vue
function table_injectStyle (ssrContext) {
  __webpack_require__(12)
}
var table_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var table___vue_template_functional__ = false
/* styles */
var table___vue_styles__ = table_injectStyle
/* scopeId */
var table___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var table___vue_module_identifier__ = null
var table_Component = table_normalizeComponent(
  src_table,
  table_src_table,
  table___vue_template_functional__,
  table___vue_styles__,
  table___vue_scopeId__,
  table___vue_module_identifier__
)

/* harmony default export */ var packages_table_src_table = (table_Component.exports);

// CONCATENATED MODULE: ./packages/table/index.js

/* harmony default export */ var packages_table = (packages_table_src_table);
// CONCATENATED MODULE: ./src/utils/util.js


var utils_util_hasOwnProperty = Object.prototype.hasOwnProperty;

function util_noop() {};

function util_hasOwn(obj, key) {
  return utils_util_hasOwnProperty.call(obj, key);
};

function util_extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
};

function util_toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      util_extend(res, arr[i]);
    }
  }
  return res;
};

var util_getValueByPath = function getValueByPath(object, prop) {
  prop = prop || '';
  var paths = prop.split('.');
  var current = object;
  var result = null;
  for (var i = 0, j = paths.length; i < j; i++) {
    var path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

function util_getPropByPath(obj, path, strict) {
  var tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  var keyArr = path.split('.');
  var i = 0;
  for (var len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    var key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};

var util_generateId = function generateId() {
  return Math.floor(Math.random() * 10000);
};

var util_valueEquals = function valueEquals(a, b) {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

var util_escapeRegexpString = function escapeRegexpString() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
};

// TODO: use native Array.find, Array.findIndex when IE support is dropped
var util_arrayFindIndex = function arrayFindIndex(arr, pred) {
  for (var i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return -1;
};

var util_arrayFind = function arrayFind(arr, pred) {
  var idx = util_arrayFindIndex(arr, pred);
  return idx !== -1 ? arr[idx] : undefined;
};

// coerce truthy value to array
var util_coerceTruthyValueToArray = function coerceTruthyValueToArray(val) {
  if (Array.isArray(val)) {
    return val;
  } else if (val) {
    return [val];
  } else {
    return [];
  }
};

var utils_util_isIE = function isIE() {
  return !external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.prototype.$isServer && !isNaN(Number(document.documentMode));
};

var utils_util_isEdge = function isEdge() {
  return !external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1;
};
// CONCATENATED MODULE: ./packages/table/src/table-column.js

// import ElTag from 'y-ui/packages/tag';



var columnIdSeed = 1;

var defaults = {
  default: {
    order: ''
  },
  selection: {
    width: 50,
    minWidth: 50,
    realWidth: 50,
    order: '',
    className: 'el-table-column--selection'
  },
  // expand: {
  //   width: 50,
  //   minWidth: 50,
  //   realWidth: 50,
  //   order: ''
  // },
  index: {
    width: 50,
    minWidth: 50,
    realWidth: 50,
    order: ''
  }
};

var forced = {
  selection: {
    renderHeader: function renderHeader(h, _ref) {
      var store = _ref.store;

      console.log(this, 11);
      return h('y-checkbox', {
        attrs: {
          disabled: store.states.data && store.states.data.length === 0,
          indeterminate: store.states.selection.length > 0 && !this.isAllSelected,

          value: this.isAllSelected },
        nativeOn: {
          'click': this.toggleAllSelection
        }
      });
    },
    // this指向 this._renderProxy,
    renderCell: function renderCell(h, _ref2) {
      var row = _ref2.row,
          column = _ref2.column,
          store = _ref2.store,
          $index = _ref2.$index;

      return h('y-checkbox', {
        nativeOn: {
          'click': function click(event) {
            return event.stopPropagation();
          }
        },
        attrs: {
          value: store.isSelected(row),
          disabled: column.selectable ? !column.selectable.call(null, row, $index) : false
        },
        on: {
          'input': function input() {
            store.commit('rowSelectedChanged', row);
          }
        }
      });
    },
    sortable: false,
    resizable: false
  },
  index: {
    renderHeader: function renderHeader(h, _ref3) {
      var column = _ref3.column;

      return column.label || '#';
    },
    renderCell: function renderCell(h, _ref4) {
      var $index = _ref4.$index,
          column = _ref4.column;

      var i = $index + 1;
      var index = column.index;

      if (typeof index === 'number') {
        i = $index + index;
      } else if (typeof index === 'function') {
        i = index($index);
      }

      return h('div', [i]);
    },
    sortable: false
  }
  /* expand: {
    renderHeader: function(h, { column }) {
      return column.label || '';
    },
    renderCell: function(h, { row, store }, proxy) {
      const expanded = store.states.expandRows.indexOf(row) > -1;
      return <div class={ 'el-table__expand-icon ' + (expanded ? 'el-table__expand-icon--expanded' : '') }
        on-click={ e => proxy.handleExpandClick(row, e) }>
        <i class='el-icon el-icon-arrow-right'></i>
      </div>;
    },
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column'
  } */
};

var table_column_getDefaultColumn = function getDefaultColumn(type, options) {
  var column = {};

  merge(column, defaults[type || 'default']);

  for (var name in options) {
    if (options.hasOwnProperty(name)) {
      var value = options[name];
      if (typeof value !== 'undefined') {
        column[name] = value;
      }
    }
  }

  if (!column.minWidth) {
    column.minWidth = 80;
  }

  column.realWidth = column.width === undefined ? column.minWidth : column.width;

  return column;
};

var table_column_DEFAULT_RENDER_CELL = function DEFAULT_RENDER_CELL(h, _ref5) {
  var row = _ref5.row,
      column = _ref5.column,
      $index = _ref5.$index;

  var property = column.property;
  var value = property && util_getPropByPath(row, property).v;
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index);
  }
  return value;
};

var parseWidth = function parseWidth(width) {
  if (width !== undefined) {
    width = parseInt(width, 10);
    if (isNaN(width)) {
      width = null;
    }
  }
  return width;
};

var parseMinWidth = function parseMinWidth(minWidth) {
  if (minWidth !== undefined) {
    minWidth = parseInt(minWidth, 10);
    if (isNaN(minWidth)) {
      minWidth = 80;
    }
  }
  return minWidth;
};

/* harmony default export */ var table_column = ({
  name: 'YTableColumn',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    label: String,
    className: String,
    labelClassName: String,
    property: String,
    prop: String,
    width: {},
    minWidth: {},
    renderHeader: Function,
    sortable: {
      type: [String, Boolean],
      default: false
    },
    sortMethod: Function,
    sortBy: [String, Function, Array],
    resizable: {
      type: Boolean,
      default: true
    },
    context: {},
    columnKey: String,
    align: String,
    headerAlign: String,
    showTooltipWhenOverflow: Boolean,
    showOverflowTooltip: Boolean,
    fixed: [Boolean, String],
    formatter: Function,
    selectable: Function,
    reserveSelection: Boolean,
    filterMethod: Function,
    filteredValue: Array,
    filters: Array,
    filterPlacement: String,
    filterMultiple: {
      type: Boolean,
      default: true
    },
    index: [Number, Function],
    sortOrders: {
      type: Array,
      default: function _default() {
        return ['ascending', 'descending', null];
      },
      validator: function validator(val) {
        return val.every(function (order) {
          return ['ascending', 'descending', null].indexOf(order) > -1;
        });
      }
    }
  },

  data: function data() {
    return {
      isSubColumn: false,
      columns: []
    };
  },
  beforeCreate: function beforeCreate() {
    this.row = {};
    this.column = {};
    this.$index = 0;
  },


  components: { YCheckbox: packages_checkbox_checkbox
  },

  computed: {
    owner: function owner() {
      var parent = this.$parent;
      while (parent && !parent.tableId) {
        // 一级column,父亲是y-table
        parent = parent.$parent;
      }
      return parent;
    },
    columnOrTableParent: function columnOrTableParent() {
      var parent = this.$parent;
      while (parent && !parent.tableId && !parent.columnId) {
        // 二级column 父亲是column
        parent = parent.$parent;
      }
      return parent;
    }
  },

  created: function created() {
    var _this = this;

    var h = this.$createElement;

    this.customRender = this.$options.render;
    this.$options.render = function (h) {
      return h('div', _this.$slots.default);
    };

    var parent = this.columnOrTableParent;
    var owner = this.owner;
    this.isSubColumn = owner !== parent;
    this.columnId = (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++;

    var type = this.type;
    var width = parseWidth(this.width);
    var minWidth = parseMinWidth(this.minWidth);

    var isColumnGroup = false;

    var column = table_column_getDefaultColumn(type, {
      id: this.columnId,
      columnKey: this.columnKey,
      label: this.label,
      className: this.className,
      labelClassName: this.labelClassName,
      property: this.prop || this.property,
      type: type,
      renderCell: null,
      renderHeader: this.renderHeader,
      minWidth: minWidth,
      width: width,
      isColumnGroup: isColumnGroup,
      context: this.context,
      align: this.align ? 'is-' + this.align : null,
      headerAlign: this.headerAlign ? 'is-' + this.headerAlign : this.align ? 'is-' + this.align : null,
      sortable: this.sortable === '' ? true : this.sortable,
      sortMethod: this.sortMethod,
      sortBy: this.sortBy,
      resizable: this.resizable,
      showOverflowTooltip: this.showOverflowTooltip || this.showTooltipWhenOverflow,
      formatter: this.formatter,
      selectable: this.selectable,
      reserveSelection: this.reserveSelection,
      fixed: this.fixed === '' ? true : this.fixed,
      filterMethod: this.filterMethod,
      filters: this.filters,
      filterable: this.filters || this.filterMethod,
      filterMultiple: this.filterMultiple,
      filterOpened: false,
      filteredValue: this.filteredValue || [],
      filterPlacement: this.filterPlacement || '',
      index: this.index,
      sortOrders: this.sortOrders
    });

    var source = forced[type] || {};
    Object.keys(source).forEach(function (prop) {
      var value = source[prop];
      if (value !== undefined) {
        if (prop === 'renderHeader') {
          if (type === 'selection' && column[prop]) {
            console.warn('[Element Warn][TableColumn]Selection column doesn\'t allow to set render-header function.');
          } else {
            value = column[prop] || value;
          }
        }
        column[prop] = prop === 'className' ? column[prop] + ' ' + value : value;
      }
    });

    this.columnConfig = column;

    var renderCell = column.renderCell;
    var _self = this;

    /* if (type === 'expand') {
      owner.renderExpanded = function(h, data) {
        return _self.$scopedSlots.default
          ? _self.$scopedSlots.default(data)
          : _self.$slots.default;
      };
        column.renderCell = function(h, data) {
        return <div class="cell">{ renderCell(h, data, this._renderProxy) }</div>;
      };
        return;
    } */

    column.renderCell = function (h, data) {
      if (_self.$scopedSlots.default) {
        renderCell = function renderCell() {
          return _self.$scopedSlots.default(data);
        };
      }

      if (!renderCell) {
        renderCell = table_column_DEFAULT_RENDER_CELL;
      }
      return _self.showOverflowTooltip || _self.showTooltipWhenOverflow ? h(
        'y-tooltip',
        {
          attrs: { effect: this.table.tooltipEffect, placement: 'bottom-right', content: data.column.label },
          ref: 'tooltip' },
        [h(
          'div',
          { 'class': 'cell k-tooltip', style: { width: (data.column.realWidth || data.column.width) - 1 + 'px' } },
          [renderCell(h, data)]
        )]
      ) : h(
        'div',
        { 'class': 'cell' },
        [renderCell(h, data)]
      );
    };
  },
  destroyed: function destroyed() {
    if (!this.$parent) return;
    var parent = this.$parent;
    this.owner.store.commit('removeColumn', this.columnConfig, this.isSubColumn ? parent.columnConfig : null);
  },


  watch: {
    label: function label(newVal) {
      if (this.columnConfig) {
        this.columnConfig.label = newVal;
      }
    },
    prop: function prop(newVal) {
      if (this.columnConfig) {
        this.columnConfig.property = newVal;
      }
    },
    property: function property(newVal) {
      if (this.columnConfig) {
        this.columnConfig.property = newVal;
      }
    },
    filters: function filters(newVal) {
      if (this.columnConfig) {
        this.columnConfig.filters = newVal;
      }
    },
    filterMultiple: function filterMultiple(newVal) {
      if (this.columnConfig) {
        this.columnConfig.filterMultiple = newVal;
      }
    },
    align: function align(newVal) {
      if (this.columnConfig) {
        this.columnConfig.align = newVal ? 'is-' + newVal : null;

        if (!this.headerAlign) {
          this.columnConfig.headerAlign = newVal ? 'is-' + newVal : null;
        }
      }
    },
    headerAlign: function headerAlign(newVal) {
      if (this.columnConfig) {
        this.columnConfig.headerAlign = 'is-' + (newVal ? newVal : this.align);
      }
    },
    width: function width(newVal) {
      if (this.columnConfig) {
        this.columnConfig.width = parseWidth(newVal);
        this.owner.store.scheduleLayout();
      }
    },
    minWidth: function minWidth(newVal) {
      if (this.columnConfig) {
        this.columnConfig.minWidth = parseMinWidth(newVal);
        this.owner.store.scheduleLayout();
      }
    },
    fixed: function fixed(newVal) {
      if (this.columnConfig) {
        this.columnConfig.fixed = newVal;
        this.owner.store.scheduleLayout(true);
      }
    },
    sortable: function sortable(newVal) {
      if (this.columnConfig) {
        this.columnConfig.sortable = newVal;
      }
    },
    index: function index(newVal) {
      if (this.columnConfig) {
        this.columnConfig.index = newVal;
      }
    },
    formatter: function formatter(newVal) {
      if (this.columnConfig) {
        this.columnConfig.formatter = newVal;
      }
    },
    className: function className(newVal) {
      if (this.columnConfig) {
        this.columnConfig.className = newVal;
      }
    },
    labelClassName: function labelClassName(newVal) {
      if (this.columnConfig) {
        this.columnConfig.labelClassName = newVal;
      }
    }
  },

  mounted: function mounted() {
    var owner = this.owner;
    var parent = this.columnOrTableParent;
    var columnIndex = void 0;

    if (!this.isSubColumn) {
      columnIndex = [].indexOf.call(parent.$refs.hiddenColumns.children, this.$el);
    } else {
      columnIndex = [].indexOf.call(parent.$el.children, this.$el);
    }

    owner.store.commit('insertColumn', this.columnConfig, columnIndex, this.isSubColumn ? parent.columnConfig : null);
  }
});
// CONCATENATED MODULE: ./packages/tableColumn/index.js

/* harmony default export */ var tableColumn = (table_column);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/alert/alert.vue
function alert__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var alert_alert = ({
  components: { Icon: packages_icon },
  name: "YAlert",
  props: {
    type: { type: String, default: "warning" },
    closable: Boolean,
    showIcon: Boolean,
    title: {
      type: String,
      default: '',
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      closed: false
    };
  },

  computed: {
    icon: function icon() {
      var icons = {
        info: "icon-info_normal",
        error: "icon-info_danger",
        success: "icon-info_success",
        warning: "icon-info_warn"
      };
      return icons[this.type];
    },
    classes: function classes() {
      return ["k-alert", alert__defineProperty({}, "k-alert-" + this.type, this.type)];
    }
  },
  methods: {
    close: function close() {
      this.closed = true;
      this.$emit("close");
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-19cb4c5d","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/alert/alert.vue
var alert_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return !_vm.closed ? _c('transition', { attrs: { "name": "dropdown" } }, [_c('div', { class: _vm.classes }, [_vm.showIcon ? _c('Icon', { attrs: { "type": _vm.icon } }) : _vm._e(), _vm._v(" "), _vm.closable ? _c('a', { staticClass: "k-alert-close", on: { "click": _vm.close } }) : _vm._e(), _vm._v(" "), _vm.title ? _c('span', [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), _vm._t("default", [_vm.description ? _c('p', { staticClass: "k-desc" }, [_vm._v(_vm._s(_vm.description))]) : _vm._e()])], 2)]) : _vm._e();
};
var alert_staticRenderFns = [];
var alert_esExports = { render: alert_render, staticRenderFns: alert_staticRenderFns };
/* harmony default export */ var selectortype_template_index_0_packages_alert_alert = (alert_esExports);
// CONCATENATED MODULE: ./packages/alert/alert.vue
var alert_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var alert___vue_template_functional__ = false
/* styles */
var alert___vue_styles__ = null
/* scopeId */
var alert___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var alert___vue_module_identifier__ = null
var alert_Component = alert_normalizeComponent(
  alert_alert,
  selectortype_template_index_0_packages_alert_alert,
  alert___vue_template_functional__,
  alert___vue_styles__,
  alert___vue_scopeId__,
  alert___vue_module_identifier__
)

/* harmony default export */ var packages_alert_alert = (alert_Component.exports);

// CONCATENATED MODULE: ./packages/alert/index.js

/* harmony default export */ var packages_alert = (packages_alert_alert);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/message/notice.vue
function notice__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var message_notice = ({
  props: {
    type: { type: String, default: "info" },
    title: String,
    content: String,
    name: String,
    closable: { type: Boolean, default: false },
    transitionName: { type: String, default: "fadedown" },
    noticeType: { type: String, default: "message" },
    close: Function
  },
  data: function data() {
    return {
      closeTimer: null
    };
  },

  computed: {
    icon: function icon() {
      var icons = {
        info: "icon-info_normal",
        error: "icon-info_danger",
        success: "icon-info_success",
        warning: "icon-info_warn"
      };
      return "" + icons[this.type];
    },
    classes: function classes() {
      return ["k-" + this.noticeType + "-notice", notice__defineProperty({}, "k-" + this.noticeType + "-" + this.type, this.type)];
    }
  },
  methods: {
    enter: function enter(e) {
      //e.style.height = e.scrollHeight - 15 + "px";
    },
    leave: function leave(e) {
      e.style.height = 0;
      e.style.paddingTop = 0;
      e.style.paddingBottom = 0;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0ad41a24","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/message/notice.vue
var notice_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": _vm.transitionName }, on: { "enter": _vm.enter, "leave": _vm.leave } }, [_vm.noticeType == 'message' ? _c('div', { class: _vm.classes }, [_c('div', { staticClass: "k-message-notice-content" }, [_c('i', { class: _vm.icon }), _vm._v(" "), _c('span', { domProps: { "innerHTML": _vm._s(_vm.content) } }), _vm._v(" "), _vm.closable ? _c('a', { staticClass: "k-message-close", on: { "click": _vm.close } }) : _vm._e()])]) : _c('div', { class: _vm.classes }, [_c('div', { staticClass: "k-notice-notice-content" }, [_c('div', { staticClass: "k-notice-title" }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', { staticClass: "k-notice-desc", domProps: { "innerHTML": _vm._s(_vm.content) } }), _vm._v(" "), _c('a', { staticClass: "k-notice-close", on: { "click": _vm.close } })])])]);
};
var notice_staticRenderFns = [];
var notice_esExports = { render: notice_render, staticRenderFns: notice_staticRenderFns };
/* harmony default export */ var selectortype_template_index_0_packages_message_notice = (notice_esExports);
// CONCATENATED MODULE: ./packages/message/notice.vue
var notice_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var notice___vue_template_functional__ = false
/* styles */
var notice___vue_styles__ = null
/* scopeId */
var notice___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var notice___vue_module_identifier__ = null
var notice_Component = notice_normalizeComponent(
  message_notice,
  selectortype_template_index_0_packages_message_notice,
  notice___vue_template_functional__,
  notice___vue_styles__,
  notice___vue_scopeId__,
  notice___vue_module_identifier__
)

/* harmony default export */ var packages_message_notice = (notice_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/message/notices.vue
//
//
//
//
//
//
//


/* harmony default export */ var notices = ({
  components: { "k-notice": packages_message_notice },
  props: { type: String },
  data: function data() {
    return {
      notices: []
    };
  },

  methods: {
    add: function add(notice) {
      var _this = this;

      notice.name = Math.floor(Math.random() * 99999);
      notice.transitionName = notice.noticeType == "message" ? "fadedown" : "fadeleft";
      notice.duration = isNaN(Number(notice.duration)) ? 3 : notice.duration;
      var time = void 0;
      var close = function close() {
        notice.onClose && notice.onClose();
        var index = _this.notices.indexOf(notice);
        _this.notices.splice(index, 1);
        clearTimeout(time);
        time = null;
      };
      notice.duration > 0 && (time = setTimeout(close, notice.duration * 1000));
      (notice.closable === true && notice.noticeType == "message" || notice.noticeType == "notice") && (notice.close = close);
      this.notices.push(notice);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-74adaa55","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/message/notices.vue
var notices_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: "k-" + _vm.type }, _vm._l(_vm.notices, function (item) {
    return _c('k-notice', { key: item.name, attrs: { "type": item.type, "title": item.title, "transition-name": item.transitionName, "content": item.content, "closable": item.closable, "close": item.close, "noticeType": item.noticeType } });
  }));
};
var notices_staticRenderFns = [];
var notices_esExports = { render: notices_render, staticRenderFns: notices_staticRenderFns };
/* harmony default export */ var message_notices = (notices_esExports);
// CONCATENATED MODULE: ./packages/message/notices.vue
var notices_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var notices___vue_template_functional__ = false
/* styles */
var notices___vue_styles__ = null
/* scopeId */
var notices___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var notices___vue_module_identifier__ = null
var notices_Component = notices_normalizeComponent(
  notices,
  message_notices,
  notices___vue_template_functional__,
  notices___vue_styles__,
  notices___vue_scopeId__,
  notices___vue_module_identifier__
)

/* harmony default export */ var packages_message_notices = (notices_Component.exports);

// CONCATENATED MODULE: ./packages/message/index.js



packages_message_notices.Instance = function (properties) {
   var _props = properties || {};
   var Instance = new external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a({
      render: function render(h) {
         return h(packages_message_notices, {
            props: _props
         });
      }
   });

   var component = Instance.$mount();
   document.body.appendChild(component.$el);
   var notice = Instance.$children[0];
   return notice;
};

var messageInstance = void 0;
var noticeInstance = void 0;

var message_getInstance = function getInstance(type) {
   if (type == 'message') {
      messageInstance = messageInstance || packages_message_notices.Instance({ type: type });
      return messageInstance;
   } else {
      noticeInstance = noticeInstance || packages_message_notices.Instance({ type: type });
      return noticeInstance;
   }
};
var message = function message(noticeType, type, title, content, duration, onClose) {
   message_getInstance(noticeType).add({
      title: title,
      noticeType: noticeType,
      duration: duration,
      content: content,
      type: type,
      onClose: onClose
   });
};

var Message = {
   name: 'Message',
   info: function info(content, duration, onClose) {
      message('message', 'info', null, content, duration, onClose);
   },
   success: function success(content, duration, onClose) {
      message('message', 'success', null, content, duration, onClose);
   },
   warning: function warning(content, duration, onClose) {
      message('message', 'warning', null, content, duration, onClose);
   },
   error: function error(content, duration, onClose) {
      message('message', 'error', null, content, duration, onClose);
   },
   config: function config(options) {
      options.noticeType = 'message';
      message_getInstance('message').add(options);
   },
   destroy: function destroy() {
      Instance = null;
      document.body.removeChild(document.getElementsByClassName('k-message'));
   }
};
var Notice = {
   name: 'Notice',
   info: function info(options) {
      options.type = 'info';
      options.noticeType = 'notice';
      message_getInstance('notice').add(options);
   },
   success: function success(options) {
      options.type = 'success';
      options.noticeType = 'notice';
      message_getInstance('notice').add(options);
   },
   warning: function warning(options) {
      options.type = 'warning';
      options.noticeType = 'notice';
      message_getInstance('notice').add(options);
   },
   error: function error(options) {
      options.type = 'error';
      options.noticeType = 'notice';
      message_getInstance('notice').add(options);
   },
   open: function open(options) {
      options.noticeType = 'notice';
      options.type = null;
      message_getInstance('notice').add(options);
   },
   destroy: function destroy() {
      noticeInstance = null;
      document.body.removeChild(document.getElementsByClassName('k-notice'));
   }
};


// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/poptip/poptip.vue
function poptip__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var poptip = ({
  compontes: { "y-button": packages_button_button },
  directives: { docClick: docClick, transferDom: transferDom, resize: winScroll },
  mixins: [emitter],
  name: "YPoptip",
  props: {
    trigger: { type: String, default: "click" },
    confirm: Boolean,
    transfer: { type: Boolean, default: true },
    title: String,
    content: String,
    width: [String, Number],
    placement: {
      validator: function validator(value) {
        return ["top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right", "left", "left-bottom", "left-top", "right", "right-top", "right-bottom"].indexOf(value) >= 0;
      },

      default: "top"
    },
    okText: { type: String, default: "确定" },
    cancelText: { type: String, default: "取消" }
  },
  data: function data() {
    return {
      visible: false,
      left: 0,
      top: 0
    };
  },

  computed: {
    classes: function classes() {
      return ["k-poptip-dom", poptip__defineProperty({}, "k-poptip-confirm", this.confirm)];
    },
    styles: function styles() {
      var style = {};
      this.width && (style.width = this.width + "px");
      style.top = this.top + "px";
      style.left = this.left + "px";
      return style;
    }
  },
  watch: {
    visible: function visible(v) {
      var _this = this;

      if (v) {
        this.$nextTick(function () {
          return _this.setPosition();
        });
      }
    }
  },
  methods: {
    handleScroll: function handleScroll() {
      var _this2 = this;

      this.$nextTick(function () {
        return _this2.setPosition();
      });
    },
    setPosition: function setPosition() {
      var pos = { left: 0, top: 0 };
      var rel = this.$children[0] && this.$children[0].$el || this.$refs.rel;
      if (this.transfer) {
        pos = this.getElementPos(rel);
      }

      var x = this.placement;
      // let rel = this.$refs.rel;
      var dom = this.$refs.dom;
      if (!dom) return;
      //取子元素的margin,计算的时候要进行运算
      // let child = this.$children[0] && this.$children[0].$el || rel
      // let mr = 0//document.defaultView.getComputedStyle(child, null)['margin-right'].replace('px', '')
      // let mb = 0//document.defaultView.getComputedStyle(child, null)['margin-bottom'].replace('px', '')
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
      var top = pos.top + scrollTop;
      var left = pos.left + scrollLeft;
      // console.log(mr, mb)
      switch (x) {
        case "top":
          this.top = top - dom.offsetHeight - 10;
          this.left = left - (dom.offsetWidth - rel.offsetWidth) / 2;
          break;
        case "top-left":
          this.top = top - dom.offsetHeight - 10;
          this.left = left;
          break;
        case "top-right":
          this.top = top - dom.offsetHeight - 10;
          this.left = left - (dom.offsetWidth - rel.offsetWidth);
          break;
        case "bottom":
          this.top = top + rel.offsetHeight + 10;
          this.left = left - (dom.offsetWidth - rel.offsetWidth) / 2;
          break;
        case "bottom-right":
          this.top = top + rel.offsetHeight + 10;
          this.left = left - (dom.offsetWidth - rel.offsetWidth);
          break;
        case "bottom-left":
          this.top = top + rel.offsetHeight + 10;
          this.left = left;
          break;
        case "left":
          this.left = left - dom.offsetWidth - 10;
          this.top = top - (dom.offsetHeight - rel.offsetHeight) / 2;
          break;
        case "left-top":
          this.left = left - dom.offsetWidth - 10;
          this.top = top;
          break;
        case "left-bottom":
          this.left = left - dom.offsetWidth - 10;
          this.top = top - (dom.offsetHeight - rel.offsetHeight);
          break;
        case "right":
          this.left = left + rel.offsetWidth + 10;
          this.top = top - (dom.offsetHeight - rel.offsetHeight) / 2;
          break;
        case "right-top":
          this.left = left + rel.offsetWidth + 10;
          this.top = top;
          break;
        case "right-bottom":
          this.left = left + rel.offsetWidth + 10;
          this.top = top - (dom.offsetHeight - rel.offsetHeight);
          break;
      }
    },
    close: function close(e) {
      if (this.transfer) {
        if (this.$refs.dom && !this.$refs.dom.contains(e.target) && !this.$refs.rel.contains(e.target)) {
          this.visible = false;
        }
      }
    },
    ok: function ok() {
      this.visible = false;
      this.$emit("ok");
    },
    cancel: function cancel() {
      this.visible = false;
      this.$emit("cancel");
    },
    mouseHandle: function mouseHandle() {
      if (this.trigger == "hover") {
        this.visible = !this.visible;
      }
    },
    relClick: function relClick() {
      if (this.trigger == "click") {
        this.visible = !this.visible;
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-b67e58a0","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/poptip/poptip.vue
var poptip_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "docClick", rawName: "v-docClick", value: _vm.close, expression: "close" }, { name: "resize", rawName: "v-resize", value: _vm.handleScroll, expression: "handleScroll" }], staticClass: "k-poptip", on: { "mouseenter": _vm.mouseHandle, "mouseleave": _vm.mouseHandle } }, [_c('div', { ref: "rel", staticClass: "k-poptip-rel", on: { "click": _vm.relClick } }, [_vm._t("default")], 2), _vm._v(" "), _c('transition', { attrs: { "name": "fade" } }, [_vm.visible ? _c('div', { directives: [{ name: "transferDom", rawName: "v-transferDom" }], ref: "dom", class: _vm.classes, style: _vm.styles, attrs: { "k-placement": _vm.placement, "data-transfer": _vm.transfer } }, [_c('div', { staticClass: "k-poptip-arrow" }), _vm._v(" "), _vm.title ? _c('div', { staticClass: "k-poptip-title" }, [_vm.confirm ? _c('i', { staticClass: "icon-info_warn" }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.title))])]) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "k-poptip-content" }, [_vm._t("content", [_c('p', [_vm._v(_vm._s(_vm.content))])])], 2), _vm._v(" "), _vm.confirm ? _c('div', { staticClass: "k-poptip-footer" }, [_c('y-button', { attrs: { "type": "gray", "mini": "" }, on: { "click": function click($event) {
        $event.stopPropagation();return _vm.cancel($event);
      } } }, [_vm._v(_vm._s(_vm.cancelText))]), _vm._v(" "), _c('y-button', { attrs: { "type": "default", "mini": "" }, on: { "click": function click($event) {
        $event.stopPropagation();return _vm.ok($event);
      } } }, [_vm._v(_vm._s(_vm.okText))])], 1) : _vm._e()]) : _vm._e()])], 1);
};
var poptip_staticRenderFns = [];
var poptip_esExports = { render: poptip_render, staticRenderFns: poptip_staticRenderFns };
/* harmony default export */ var poptip_poptip = (poptip_esExports);
// CONCATENATED MODULE: ./packages/poptip/poptip.vue
var poptip_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var poptip___vue_template_functional__ = false
/* styles */
var poptip___vue_styles__ = null
/* scopeId */
var poptip___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var poptip___vue_module_identifier__ = null
var poptip_Component = poptip_normalizeComponent(
  poptip,
  poptip_poptip,
  poptip___vue_template_functional__,
  poptip___vue_styles__,
  poptip___vue_scopeId__,
  poptip___vue_module_identifier__
)

/* harmony default export */ var packages_poptip_poptip = (poptip_Component.exports);

// CONCATENATED MODULE: ./packages/poptip/index.js

/* harmony default export */ var packages_poptip = (packages_poptip_poptip);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/dialog/dialog.vue
function dialog__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var dialog = ({
  name: "YDialog",
  components: {
    "y-button": packages_button_button, Icon: packages_icon
  },
  props: {
    type: { type: String, default: "modal" },
    color: String,
    icon: { type: String, default: "success" },
    value: { type: Boolean, default: false },
    title: { default: "我是一个标题", type: String },
    width: { default: 400, type: [Number, String] },
    okText: { type: String, default: "确定" },
    cancelText: { type: String, default: "取消" },
    isMove: { type: Boolean, default: false }
  },
  computed: {
    classes: function classes() {
      return ["k-modal", dialog__defineProperty({}, "k-toast", this.type == "toast")];
    },
    headerStyle: function headerStyle() {
      var style = {};
      style.cursor = this.isMove ? "move" : "";
      return style;
    },
    styles: function styles() {
      var style = {};
      style.left = this.left + "px";
      style.top = this.top + "px";
      return style;
    },
    iconClasses: function iconClasses() {
      var _ref2;

      var icons = {
        info: "icon-info_normal",
        error: "icon-info_danger",
        success: "icon-info_success",
        warning: "icon-info_warn"
      };
      return ["k-toast-icon", (_ref2 = {}, dialog__defineProperty(_ref2, "" + icons[this.icon], icons[this.icon] && this.icon), dialog__defineProperty(_ref2, "" + this.icon, !icons[this.icon] && this.icon), _ref2)];
    },
    iconStyles: function iconStyles() {
      return this.color ? { color: this.color } : {};
    }
  },
  data: function data() {
    return {
      visible: this.value,
      left: 0,
      top: 100,
      startPos: { x: 0, y: 0 },
      isMouseDown: false
    };
  },
  created: function created() {
    // window.addEventListener("keyup", this.dc);
    window.addEventListener('keyup', this.onKeyUp);
  },
  beforeDestory: function beforeDestory() {
    window.removeEventListener("keyup", this.onKeyUp);
  },

  watch: {
    value: function value(v) {
      if (v) {
        this.visible = v;
        document.body.style.overflow = 'hidden';
        this.left = 0;
        this.top = 100;
      } else {
        document.body.style.overflow = '';
        this.close();
      }
    }
  },
  mounted: function mounted() {
    this.visible = this.value;
    if (this.visible) {
      document.body.style.overflow = 'hidden';
    }
  },

  methods: {
    clickMastToClose: function clickMastToClose(e) {
      if (!this.$refs.modal.contains(e.target) && !this.isMove) {
        this.close();
      }
    },
    handelMouseDown: function handelMouseDown(e) {
      if (e.button == 0) {
        this.isMouseDown = true;
        this.startPos = { x: e.clientX, y: e.clientY };
      }
    },
    handelMouseMove: function handelMouseMove(e) {
      if (this.isMouseDown && this.isMove) {
        this.left += e.clientX - this.startPos.x;
        this.top += e.clientY - this.startPos.y;
        this.startPos = { x: e.clientX, y: e.clientY };
      }
    },
    handelMouseUp: function handelMouseUp() {
      this.isMouseDown = false;
    },
    ok: function ok() {
      this.$emit("ok");
      this.close();
    },
    onKeyUp: function onKeyUp(e) {
      if (this.visible) {
        if (e.keyCode == 27) this.close();
      }
    },
    cancel: function cancel() {
      this.$emit("cancel");
      this.close();
    },
    close: function close() {
      this.visible = false;
      this.$emit("input", false);
      this.$emit("close");
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-f385f4c2","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/dialog/dialog.vue
var dialog_render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes, on: { "mousemove": function mousemove($event) {
        _vm.handelMouseMove($event);
      }, "mouseup": function mouseup($event) {
        _vm.handelMouseUp($event);
      } } }, [_c('transition', { attrs: { "name": "fade" } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], ref: "mask", staticClass: "k-modal-mask" })]), _vm._v(" "), _c('transition', { attrs: { "name": "fadeease" } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "k-modal-wrap", on: { "click": _vm.clickMastToClose } }, [_c('div', { ref: "modal", staticClass: "modal", style: _vm.styles }, [_c('div', { staticClass: "k-modal-content" }, [_c('a', { staticClass: "k-modal-close", on: { "click": _vm.close } }, [_c('Icon', { attrs: { "type": "icon-close" } })], 1), _vm._v(" "), _vm.type == 'modal' ? _c('div', { staticClass: "k-modal-header", style: _vm.headerStyle, on: { "mousedown": function mousedown($event) {
        _vm.handelMouseDown($event);
      } } }, [_c('div', { staticClass: "k-modal-header-inner" }, [_vm._v(_vm._s(_vm.title))])]) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "k-modal-body" }, [_vm.type == 'modal' ? [_vm._t("default", [_vm._v("我是内容")])] : _vm._e(), _vm._v(" "), _vm.type == 'toast' ? [_c('div', { staticClass: "k-pull-center" }, [_c('span', { class: _vm.iconClasses, style: _vm.iconStyles }), _vm._v(" "), _c('p', { staticClass: "k-toast-title" }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', { staticClass: "k-toast-content" }, [_vm._t("default", [_vm._v("我是内容")])], 2)])] : _vm._e()], 2), _vm._v(" "), _c('div', { staticClass: "k-modal-footer" }, [_vm._t("footer", [_vm.type == 'modal' ? _c('div', { staticClass: "k-pull-right" }, [_c('y-button', { attrs: { "medium": "", "type": "gray" }, on: { "click": _vm.cancel } }, [_vm._v(_vm._s(_vm.cancelText))]), _vm._v(" "), _c('y-button', { attrs: { "medium": "", "type": "default" }, on: { "click": _vm.ok } }, [_vm._v(_vm._s(_vm.okText))])], 1) : _vm._e(), _vm._v(" "), _vm.type == 'toast' ? _c('div', { staticClass: "k-pull-center" }, [_c('y-button', { staticStyle: { "width": "120px" }, attrs: { "medium": "", "type": "default", "hollow": "" }, on: { "click": _vm.ok } }, [_vm._v(_vm._s(_vm.okText))])], 1) : _vm._e()])], 2)])])])])], 1);
};
var dialog_staticRenderFns = [];
var dialog_esExports = { render: dialog_render, staticRenderFns: dialog_staticRenderFns };
/* harmony default export */ var dialog_dialog = (dialog_esExports);
// CONCATENATED MODULE: ./packages/dialog/dialog.vue
var dialog_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var dialog___vue_template_functional__ = false
/* styles */
var dialog___vue_styles__ = null
/* scopeId */
var dialog___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var dialog___vue_module_identifier__ = null
var dialog_Component = dialog_normalizeComponent(
  dialog,
  dialog_dialog,
  dialog___vue_template_functional__,
  dialog___vue_styles__,
  dialog___vue_scopeId__,
  dialog___vue_module_identifier__
)

/* harmony default export */ var packages_dialog_dialog = (dialog_Component.exports);

// CONCATENATED MODULE: ./packages/dialog/index.js

/* harmony default export */ var packages_dialog = (packages_dialog_dialog);
// CONCATENATED MODULE: ./node_modules/element-ui/src/locale/lang/zh-CN.js
/* harmony default export */ var zh_CN = ({
  el: {
    colorpicker: {
      confirm: '确定',
      clear: '清空'
    },
    datepicker: {
      now: '此刻',
      today: '今天',
      cancel: '取消',
      clear: '清空',
      confirm: '确定',
      selectDate: '选择日期',
      selectTime: '选择时间',
      startDate: '开始日期',
      startTime: '开始时间',
      endDate: '结束日期',
      endTime: '结束时间',
      prevYear: '前一年',
      nextYear: '后一年',
      prevMonth: '上个月',
      nextMonth: '下个月',
      year: '年',
      month1: '1 月',
      month2: '2 月',
      month3: '3 月',
      month4: '4 月',
      month5: '5 月',
      month6: '6 月',
      month7: '7 月',
      month8: '8 月',
      month9: '9 月',
      month10: '10 月',
      month11: '11 月',
      month12: '12 月',
      // week: '周次',
      weeks: {
        sun: '日',
        mon: '一',
        tue: '二',
        wed: '三',
        thu: '四',
        fri: '五',
        sat: '六'
      },
      months: {
        jan: '一月',
        feb: '二月',
        mar: '三月',
        apr: '四月',
        may: '五月',
        jun: '六月',
        jul: '七月',
        aug: '八月',
        sep: '九月',
        oct: '十月',
        nov: '十一月',
        dec: '十二月'
      }
    },
    select: {
      loading: '加载中',
      noMatch: '无匹配数据',
      noData: '无数据',
      placeholder: '请选择'
    },
    cascader: {
      noMatch: '无匹配数据',
      loading: '加载中',
      placeholder: '请选择'
    },
    pagination: {
      goto: '前往',
      pagesize: '条/页',
      total: '共 {total} 条',
      pageClassifier: '页'
    },
    messagebox: {
      title: '提示',
      confirm: '确定',
      cancel: '取消',
      error: '输入的数据不合法!'
    },
    upload: {
      deleteTip: '按 delete 键可删除',
      delete: '删除',
      preview: '查看图片',
      continue: '继续上传'
    },
    table: {
      emptyText: '暂无数据',
      confirmFilter: '筛选',
      resetFilter: '重置',
      clearFilter: '全部',
      sumText: '合计'
    },
    tree: {
      emptyText: '暂无数据'
    },
    transfer: {
      noMatch: '无匹配数据',
      noData: '无数据',
      titles: ['列表 1', '列表 2'],
      filterPlaceholder: '请输入搜索内容',
      noCheckedFormat: '共 {total} 项',
      hasCheckedFormat: '已选 {checked}/{total} 项'
    }
  }
});

// EXTERNAL MODULE: ./node_modules/deepmerge/dist/cjs.js
var cjs = __webpack_require__(23);
var cjs_default = /*#__PURE__*/__webpack_require__.n(cjs);

// CONCATENATED MODULE: ./node_modules/element-ui/src/locale/format.js


const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */
/* harmony default export */ var format = (function(Vue) {

  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */

  function template(string, ...args) {
    if (args.length === 1 && typeof args[0] === 'object') {
      args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    return string.replace(RE_NARGS, (match, prefix, i, index) => {
      let result;

      if (string[index - 1] === '{' &&
        string[index + match.length] === '}') {
        return i;
      } else {
        result = hasOwn(args, i) ? args[i] : null;
        if (result === null || result === undefined) {
          return '';
        }

        return result;
      }
    });
  }

  return template;
});

// CONCATENATED MODULE: ./node_modules/element-ui/src/locale/index.js





const locale_format = format(external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a);
let lang = zh_CN;
let merged = false;
let i18nHandler = function() {
  const vuei18n = Object.getPrototypeOf(this || external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a).$t;
  if (typeof vuei18n === 'function' && !!external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.locale) {
    if (!merged) {
      merged = true;
      external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.locale(
        external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.config.lang,
        cjs_default()(lang, external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.locale(external___root___Vue___commonjs___vue___commonjs2___vue___amd___vue___default.a.config.lang) || {}, { clone: true })
      );
    }
    return vuei18n.apply(this, arguments);
  }
};

const locale_t = function(path, options) {
  let value = i18nHandler.apply(this, arguments);
  if (value !== null && value !== undefined) return value;

  const array = path.split('.');
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1) return locale_format(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
};

const use = function(l) {
  lang = l || lang;
};

const i18n = function(fn) {
  i18nHandler = fn || i18nHandler;
};

/* harmony default export */ var locale = ({ use, t: locale_t, i18n });

// CONCATENATED MODULE: ./src/mixins/locale.js


/* harmony default export */ var mixins_locale = ({
  methods: {
    t: function t() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return locale_t.apply(this, args);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/upload/src/upload-list.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var upload_list = ({

  name: 'YUploadList',

  mixins: [mixins_locale],

  data: function data() {
    return {
      focusing: false
    };
  },

  components: { YProgress: packages_progress },

  props: {
    files: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    handlePreview: Function,
    listType: String
  },
  methods: {
    parsePercentage: function parsePercentage(val) {
      return parseInt(val, 10);
    },
    handleClick: function handleClick(file) {
      this.handlePreview && this.handlePreview(file);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?sourceMap!./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4e5283d7","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./packages/upload/src/upload-list.vue
var upload_list_render = function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition-group', { class: ['k-upload-list', 'k-upload-list--' + _vm.listType, { 'is-disabled': _vm.disabled }], attrs: { "tag": "ul", "name": "k-list" } }, _vm._l(_vm.files, function (file) {
            return _c('li', { key: file.uid, class: ['k-upload-list__item', 'is-' + file.status, _vm.focusing ? 'focusing' : ''], attrs: { "tabindex": "0" }, on: { "keydown": function keydown($event) {
                              if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46], $event.key, ["Backspace", "Delete"])) {
                                    return null;
                              }!_vm.disabled && _vm.$emit('remove', file);
                        }, "focus": function focus($event) {
                              _vm.focusing = true;
                        }, "blur": function blur($event) {
                              _vm.focusing = false;
                        }, "click": function click($event) {
                              _vm.focusing = false;
                        } } }, [_c('a', { staticClass: "k-upload-list__item-name", on: { "click": function click($event) {
                              _vm.handleClick(file);
                        } } }, [_c('i', { staticClass: "icon-huixingzhen" }), _vm._v(" "), _c('div', { staticClass: "k-upload-list__item-wrap" }, [_vm._v("\n        " + _vm._s(file.name) + "\n        "), file.status == 'success' ? _c('div', [_c('span', { staticClass: "k-upload-list__item-thumbnail" }, [_c('div', { staticClass: "tri-up" }, [_c('span')]), _vm._v(" "), _c('img', { staticClass: "k-upload-list__item-pic", attrs: { "src": file.url } })])]) : _vm._e()])]), _vm._v(" "), file.status == 'success' ? _c('label', { staticClass: "k-upload-list__item-status-label" }, [_c('i', { class: {
                        'icon-info_success': true
                  } })]) : _c('label', { staticClass: "k-upload-list__item-status-label k-upload-list__item-status-error" }, [_c('i', { staticClass: "red-tip" }, [_vm._v("上传失败")]), _vm._v(" "), _c('a', { attrs: { "href": "javascript:;" }, on: { "click": function click($event) {
                              _vm.$emit('retry', file);
                        } } }, [_vm._v("重试")])]), _vm._v(" "), !_vm.disabled && file.status == 'success' ? _c('i', { staticClass: "icon-close", on: { "click": function click($event) {
                              _vm.$emit('remove', file);
                        } } }) : _vm._e(), _vm._v(" "), file.status === 'uploading' ? _c('y-progress', { attrs: { "percent": _vm.parsePercentage(file.percentage) } }) : _vm._e()], 1);
      }));
};
var upload_list_staticRenderFns = [];
var upload_list_esExports = { render: upload_list_render, staticRenderFns: upload_list_staticRenderFns };
/* harmony default export */ var src_upload_list = (upload_list_esExports);
// CONCATENATED MODULE: ./packages/upload/src/upload-list.vue
var upload_list_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var upload_list___vue_template_functional__ = false
/* styles */
var upload_list___vue_styles__ = null
/* scopeId */
var upload_list___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var upload_list___vue_module_identifier__ = null
var upload_list_Component = upload_list_normalizeComponent(
  upload_list,
  src_upload_list,
  upload_list___vue_template_functional__,
  upload_list___vue_styles__,
  upload_list___vue_scopeId__,
  upload_list___vue_module_identifier__
)

/* harmony default export */ var upload_src_upload_list = (upload_list_Component.exports);

// EXTERNAL MODULE: ./node_modules/babel-helper-vue-jsx-merge-props/index.js
var babel_helper_vue_jsx_merge_props = __webpack_require__(24);
var babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props);

// CONCATENATED MODULE: ./packages/upload/src/ajax.js
function getError(action, option, xhr) {
  var msg = void 0;
  if (xhr.response) {
    msg = '' + (xhr.response.error || xhr.response);
  } else if (xhr.responseText) {
    msg = '' + xhr.responseText;
  } else {
    msg = 'fail to post ' + action + ' ' + xhr.status;
  }

  var err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = action;
  return err;
}

function getBody(xhr) {
  var text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function upload(option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }

  var xhr = new XMLHttpRequest();
  var action = option.action;

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      option.onProgress(e);
    };
  }

  var formData = new FormData();

  if (option.data) {
    Object.keys(option.data).forEach(function (key) {
      formData.append(key, option.data[key]);
    });
  }

  formData.append(option.filename, option.file, option.file.name);

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }

    option.onSuccess(getBody(xhr));
  };

  xhr.open('post', action, true);

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  var headers = option.headers || {};

  for (var item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
  xhr.send(formData);
  return xhr;
}
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/upload/src/upload.vue



// import UploadDragger from './upload-dragger.vue';

/* harmony default export */ var src_upload = ({
  inject: ['uploader'],
  components: {
    // UploadDragger
  },
  props: {
    type: String,
    action: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'file'
    },
    data: Object,
    headers: Object,
    withCredentials: Boolean,
    multiple: Boolean,
    accept: String,
    onStart: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    beforeUpload: Function,
    drag: Boolean,
    onPreview: {
      type: Function,
      default: function _default() {}
    },
    onRemove: {
      type: Function,
      default: function _default() {}
    },
    fileList: Array,
    autoUpload: Boolean,
    listType: String,
    httpRequest: {
      type: Function,
      default: upload
    },
    disabled: Boolean,
    limit: Number,
    onExceed: Function,
    retryfile: Boolean
  },

  data: function data() {
    return {
      mouseover: false,
      reqs: {}
    };
  },

  watch: {
    retryFile: function retryFile(val) {
      console.log(val, this.retryFile);
      if (this.retryFile) {
        this.handleClick();
      }
    }
  },

  methods: {
    isImage: function isImage(str) {
      return str.indexOf('image') !== -1;
    },
    handleChange: function handleChange(ev) {
      var files = ev.target.files;

      if (!files) return;
      this.uploadFiles(files);
    },
    uploadFiles: function uploadFiles(files) {
      var _this = this;

      if (this.limit && this.fileList.length + files.length > this.limit) {
        this.onExceed && this.onExceed(files, this.fileList);
        return;
      }

      var postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }

      if (postFiles.length === 0) {
        return;
      }

      postFiles.forEach(function (rawFile) {
        _this.onStart(rawFile);
        if (_this.autoUpload) _this.upload(rawFile);
      });
    },
    upload: function upload(rawFile) {
      var _this2 = this;

      this.$refs.input.value = null;

      if (!this.beforeUpload) {
        return this.post(rawFile);
      }

      var before = this.beforeUpload(rawFile);
      if (before && before.then) {
        before.then(function (processedFile) {
          var fileType = Object.prototype.toString.call(processedFile);

          if (fileType === '[object File]' || fileType === '[object Blob]') {
            if (fileType === '[object Blob]') {
              processedFile = new File([processedFile], rawFile.name, {
                type: rawFile.type
              });
            }
            for (var p in rawFile) {
              if (rawFile.hasOwnProperty(p)) {
                processedFile[p] = rawFile[p];
              }
            }
            _this2.post(processedFile);
          } else {
            _this2.post(rawFile);
          }
        }, function () {
          _this2.onRemove(null, rawFile);
        });
      } else if (before !== false) {
        this.post(rawFile);
      } else {
        this.onRemove(null, rawFile);
      }
    },
    abort: function abort(file) {
      var reqs = this.reqs;

      if (file) {
        var uid = file;
        if (file.uid) uid = file.uid;
        if (reqs[uid]) {
          reqs[uid].abort();
        }
      } else {
        Object.keys(reqs).forEach(function (uid) {
          if (reqs[uid]) reqs[uid].abort();
          delete reqs[uid];
        });
      }
    },
    post: function post(rawFile) {
      var _this3 = this;

      var uid = rawFile.uid;

      var options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: function onProgress(e) {
          _this3.onProgress(e, rawFile);
        },
        onSuccess: function onSuccess(res) {
          console.log(res, '请求返回');
          if (res.code !== 1000) {
            // yt一般以1000为请求成功标志
            _this3.onError(res, rawFile);
          } else {
            _this3.onSuccess(res, rawFile);
          }
          delete _this3.reqs[uid];
        },
        onError: function onError(err) {
          _this3.onError(err, rawFile);
          delete _this3.reqs[uid];
        }
      };
      var req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    },
    handleClick: function handleClick() {
      if (!this.disabled) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },
    handleKeydown: function handleKeydown(e) {
      if (e.target !== e.currentTarget) return;
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.handleClick();
      }
    }
  },

  render: function render(h) {
    var handleClick = this.handleClick,
        drag = this.drag,
        name = this.name,
        handleChange = this.handleChange,
        multiple = this.multiple,
        accept = this.accept,
        listType = this.listType,
        uploadFiles = this.uploadFiles,
        disabled = this.disabled,
        handleKeydown = this.handleKeydown;

    var data = {
      class: {
        'k-upload': true
      },
      on: {
        click: handleClick,
        keydown: handleKeydown
      }
    };
    data.class['k-upload--' + listType] = true;
    return h(
      'div',
      babel_helper_vue_jsx_merge_props_default()([data, {
        attrs: { tabindex: '0' }
      }]),
      [this.$slots.default, h('input', { 'class': 'k-upload__input', attrs: { type: 'file', name: name, multiple: multiple, accept: accept },
        ref: 'input', on: {
          'change': handleChange
        }
      })]
    );
  }
});
// CONCATENATED MODULE: ./packages/upload/src/upload.vue
var upload_normalizeComponent = __webpack_require__(0)
/* script */


/* template */
var __vue_template__ = null
/* template functional */
var upload___vue_template_functional__ = false
/* styles */
var upload___vue_styles__ = null
/* scopeId */
var upload___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var upload___vue_module_identifier__ = null
var upload_Component = upload_normalizeComponent(
  src_upload,
  __vue_template__,
  upload___vue_template_functional__,
  upload___vue_styles__,
  upload___vue_scopeId__,
  upload___vue_module_identifier__
)

/* harmony default export */ var upload_src_upload = (upload_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./packages/upload/src/index.vue




// import Migrating from '../../../../src/mixins/migrating';

function src_noop() {}

/* harmony default export */ var src = ({
  name: 'YUpload',

  // mixins: [Migrating],

  components: {
    ElProgress: packages_progress,
    UploadList: upload_src_upload_list,
    Upload: upload_src_upload
  },

  provide: function provide() {
    return {
      uploader: this
    };
  },


  inject: {
    elForm: {
      default: ''
    }
  },

  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    data: Object,
    multiple: Boolean,
    name: {
      type: String,
      default: 'file'
    },
    drag: Boolean,
    dragger: Boolean,
    withCredentials: Boolean,
    showFileList: {
      type: Boolean,
      default: true
    },
    accept: String,
    type: {
      type: String,
      default: 'select'
    },
    beforeUpload: Function,
    beforeRemove: Function,
    onRemove: {
      type: Function,
      default: src_noop
    },
    onChange: {
      type: Function,
      default: src_noop
    },
    onPreview: {
      type: Function
    },
    onSuccess: {
      type: Function,
      default: src_noop
    },
    onProgress: {
      type: Function,
      default: src_noop
    },
    onError: {
      type: Function,
      default: src_noop
    },
    fileList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: 'text' // text,picture,picture-card
    },
    httpRequest: Function,
    disabled: Boolean,
    limit: Number,
    onExceed: {
      type: Function,
      default: src_noop
    }
  },

  data: function data() {
    return {
      uploadFiles: [],
      dragOver: false,
      draging: false,
      tempIndex: 1
    };
  },


  computed: {
    uploadDisabled: function uploadDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },

  watch: {
    fileList: {
      immediate: true,
      handler: function handler(fileList) {
        var _this = this;

        this.uploadFiles = fileList.map(function (item) {
          item.uid = item.uid || Date.now() + _this.tempIndex++;
          item.status = item.status || 'success';
          return item;
        });
      }
    }
  },

  methods: {
    handleStart: function handleStart(rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++;
      var file = {
        status: 'ready',
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      };

      if (this.listType === 'picture-card' || this.listType === 'picture') {
        try {
          file.url = URL.createObjectURL(rawFile);
        } catch (err) {
          console.error('[Element Error][Upload]', err);
          return;
        }
      }

      this.uploadFiles.push(file);
      this.onChange(file, this.uploadFiles);
    },
    handleProgress: function handleProgress(ev, rawFile) {
      var file = this.getFile(rawFile);
      this.onProgress(ev, file, this.uploadFiles);
      file.status = 'uploading';
      file.percentage = ev.percent || 0;
    },
    handleSuccess: function handleSuccess(res, rawFile) {
      console.log(res, rawFile, 'success');
      var file = this.getFile(rawFile);

      if (file) {
        file.status = 'success';
        file.response = res;

        this.onSuccess(res, file, this.uploadFiles);
        this.onChange(file, this.uploadFiles);
      }
    },
    handleError: function handleError(err, rawFile) {
      console.log(err, rawFile, 'error');
      var file = this.getFile(rawFile);
      var fileList = this.uploadFiles;

      file.status = 'fail';

      // fileList.splice(fileList.indexOf(file), 1);

      this.onError(err, file, this.uploadFiles);
      this.onChange(file, this.uploadFiles);
    },
    handleRemove: function handleRemove(file, raw) {
      var _this2 = this;

      if (raw) {
        file = this.getFile(raw);
      }
      var doRemove = function doRemove() {
        _this2.abort(file);
        var fileList = _this2.uploadFiles;
        fileList.splice(fileList.indexOf(file), 1);
        _this2.onRemove(file, fileList);
      };

      if (!this.beforeRemove) {
        doRemove();
      } else if (typeof this.beforeRemove === 'function') {
        var before = this.beforeRemove(file, this.uploadFiles);
        if (before && before.then) {
          before.then(function () {
            doRemove();
          }, src_noop);
        } else if (before !== false) {
          doRemove();
        }
      }
    },

    // 重试
    handleRetry: function handleRetry(file) {
      this.$refs['upload-inner'].upload(file.raw);
    },
    getFile: function getFile(rawFile) {
      var fileList = this.uploadFiles;
      var target = void 0;
      fileList.every(function (item) {
        target = rawFile.uid === item.uid ? item : null;
        return !target;
      });
      return target;
    },
    abort: function abort(file) {
      this.$refs['upload-inner'].abort(file);
    },
    clearFiles: function clearFiles() {
      this.uploadFiles = [];
    },
    submit: function submit() {
      var _this3 = this;

      this.uploadFiles.filter(function (file) {
        return file.status === 'ready';
      }).forEach(function (file) {
        _this3.$refs['upload-inner'].upload(file.raw);
      });
    },
    getMigratingConfig: function getMigratingConfig() {
      return {
        props: {
          'default-file-list': 'default-file-list is renamed to file-list.',
          'show-upload-list': 'show-upload-list is renamed to show-file-list.',
          'thumbnail-mode': 'thumbnail-mode has been deprecated, you can implement the same effect according to this case: http://element.eleme.io/#/zh-CN/component/upload#yong-hu-tou-xiang-shang-chuan'
        }
      };
    }
  },

  beforeDestroy: function beforeDestroy() {
    this.uploadFiles.forEach(function (file) {
      if (file.url && file.url.indexOf('blob:') === 0) {
        URL.revokeObjectURL(file.url);
      }
    });
  },
  render: function render(h) {
    var uploadList = void 0;

    if (this.showFileList) {
      uploadList = h(upload_src_upload_list, {
        attrs: {
          disabled: this.uploadDisabled,
          listType: this.listType,
          files: this.uploadFiles,

          handlePreview: this.onPreview },
        on: {
          'remove': this.handleRemove,
          'retry': this.handleRetry
        }
      });
    }

    var uploadData = {
      props: {
        type: this.type,
        drag: this.drag,
        action: this.action,
        multiple: this.multiple,
        'before-upload': this.beforeUpload,
        'with-credentials': this.withCredentials,
        headers: this.headers,
        name: this.name,
        data: this.data,
        accept: this.accept,
        fileList: this.uploadFiles,
        autoUpload: this.autoUpload,
        listType: this.listType,
        disabled: this.uploadDisabled,
        limit: this.limit,
        'on-exceed': this.onExceed,
        'on-start': this.handleStart,
        'on-progress': this.handleProgress,
        'on-success': this.handleSuccess,
        'on-error': this.handleError,
        'on-preview': this.onPreview,
        'on-remove': this.handleRemove,
        'http-request': this.httpRequest
      },
      ref: 'upload-inner'
    };

    var trigger = this.$slots.trigger || this.$slots.default;
    var uploadComponent = h(
      'upload',
      uploadData,
      [trigger]
    );

    return h('div', [this.$slots.trigger ? [uploadComponent, this.$slots.default] : uploadComponent, this.$slots.tip, this.listType !== 'picture-card' ? uploadList : '']);
  }
});
// CONCATENATED MODULE: ./packages/upload/src/index.vue
var src_normalizeComponent = __webpack_require__(0)
/* script */


/* template */
var src___vue_template__ = null
/* template functional */
var src___vue_template_functional__ = false
/* styles */
var src___vue_styles__ = null
/* scopeId */
var src___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var src___vue_module_identifier__ = null
var src_Component = src_normalizeComponent(
  src,
  src___vue_template__,
  src___vue_template_functional__,
  src___vue_styles__,
  src___vue_scopeId__,
  src___vue_module_identifier__
)

/* harmony default export */ var upload_src = (src_Component.exports);

// CONCATENATED MODULE: ./packages/upload/index.js
// import Upload from './upload'
// export default Upload



/* istanbul ignore next */
// Upload.install = function(Vue) {
//   Vue.component(Upload.name, Upload);
// };

/* harmony default export */ var packages_upload = (upload_src);
// CONCATENATED MODULE: ./packages/index.js
var _install$Button$Butto;

function packages__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






























var components = [packages_button_button, packages_button_buttonGroup, packages_breadcrumb_breadcrumb, packages_breadcrumb_breadcrumbItem, packages_page, packages_progress, packages_tabs_tabs, packages_tabs_tabpane, packages_steps_steps, packages_steps_step, packages_collapse_collapse, packages_collapse_panel, packages_menu_menu, packages_menu_menugroup, packages_menu_menuitem, packages_menu_submenu, packages_icon, packages_input, packages_radio_radio, packages_radio_radioGroup, packages_radio_radioButton, packages_checkbox_checkbox, packages_checkbox_checkboxGroup, packages_switch, packages_select_select, packages_select_option, digitalInput, packages_scrollbar, datePicker, packages_form_form, packages_form_formitem, packages_grid_row, packages_grid_col, packages_card, packages_table, tableColumn, packages_alert, Message, Notice, packages_poptip, packages_tooltip, packages_dialog, packages_upload];

var packages_install = function install(Vue) {
  if (install.installed) return;
  components.map(function (component) {
    return Vue.component(component.name, component);
  });
  Vue.prototype.$Message = Message;
  Vue.prototype.$Notice = Notice;
};

if (typeof window !== 'undefined' && window.Vue) {
  packages_install(window.Vue);
}

/* harmony default export */ var packages_0 = __webpack_exports__["default"] = (_install$Button$Butto = {
  install: packages_install,
  Button: packages_button_button, ButtonGroup: packages_button_buttonGroup,
  Breadcrumb: packages_breadcrumb_breadcrumb, BreadcrumbItem: packages_breadcrumb_breadcrumbItem,
  Page: packages_page,
  Progress: packages_progress,
  Tabs: packages_tabs_tabs, TabPane: packages_tabs_tabpane,
  Steps: packages_steps_steps,
  Step: packages_steps_step,
  Collapse: packages_collapse_collapse,
  Panel: packages_collapse_panel,
  Menu: packages_menu_menu, MenuGroup: packages_menu_menugroup, MenuItem: packages_menu_menuitem, SubMenu: packages_menu_submenu,
  Icon: packages_icon,
  Input: packages_input,
  Radio: packages_radio_radio, RadioGroup: packages_radio_radioGroup, RadioButton: packages_radio_radioButton,
  Checkbox: packages_checkbox_checkbox, CheckboxGroup: packages_checkbox_checkboxGroup,
  Switch: packages_switch,
  Select: packages_select_select, Option: packages_select_option,
  Digital: digitalInput,
  Scrollbar: packages_scrollbar,
  DatePicker: datePicker,
  Form: packages_form_form, FormItem: packages_form_formitem,
  Row: packages_grid_row, Col: packages_grid_col,
  Tooltip: packages_tooltip,
  Card: packages_card,
  Table: packages_table,
  TableColumn: tableColumn,
  Alert: packages_alert,
  Message: Message, Notice: Notice,
  Poptip: packages_poptip
}, packages__defineProperty(_install$Button$Butto, 'Tooltip', packages_tooltip), packages__defineProperty(_install$Button$Butto, 'Dialog', packages_dialog), packages__defineProperty(_install$Button$Butto, 'Upload', packages_upload), _install$Button$Butto);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("126f807c", content, true, {});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "\n.k-scrollbar {\n  overflow: hidden;\n  position: relative;\n}\n.k-scrollbar-wrap{\n  overflow: scroll;\n  height: 100%;\n  margin-bottom: -17px;\n  margin-right: -17px;\n}\n.k-scrollbar-bar {\n  position: absolute;\n  right: 2px;\n  bottom: 2px;\n  z-index: 1;\n  border-radius: 4px;\n  opacity: 1;\n  -webkit-transition: opacity .12s ease-out;\n  transition: opacity .12s ease-out;\n  width: 6px;\n  top: 2px;\n}\n.k-scrollbar-thumb {\n  position: relative;\n  display: block;\n  width: 100%;\n  height: 0;\n  cursor: pointer;\n  border-radius: inherit;\n  background-color: #9092984d;\n  -webkit-transition: background-color .3s;\n  transition: background-color .3s;\n  height: 2%;\n  -webkit-transform: translateY(0%);\n          transform: translateY(0%);\n}\n", "", {"version":3,"sources":["E:/project/12-----标准化/giraffe-vue/packages/scrollbar/src/scrollbar.vue"],"names":[],"mappings":";AACA;EACE,iBAAiB;EACjB,mBAAmB;CACpB;AACD;EACE,iBAAiB;EACjB,aAAa;EACb,qBAAqB;EACrB,oBAAoB;CACrB;AACD;EACE,mBAAmB;EACnB,WAAW;EACX,YAAY;EACZ,WAAW;EACX,mBAAmB;EACnB,WAAW;EACX,0CAA0C;EAC1C,kCAAkC;EAClC,WAAW;EACX,SAAS;CACV;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,YAAY;EACZ,UAAU;EACV,gBAAgB;EAChB,uBAAuB;EACvB,4BAA4B;EAC5B,yCAAyC;EACzC,iCAAiC;EACjC,WAAW;EACX,kCAAkC;UAC1B,0BAA0B;CACnC","file":"scrollbar.vue","sourcesContent":["\n.k-scrollbar {\n  overflow: hidden;\n  position: relative;\n}\n.k-scrollbar-wrap{\n  overflow: scroll;\n  height: 100%;\n  margin-bottom: -17px;\n  margin-right: -17px;\n}\n.k-scrollbar-bar {\n  position: absolute;\n  right: 2px;\n  bottom: 2px;\n  z-index: 1;\n  border-radius: 4px;\n  opacity: 1;\n  -webkit-transition: opacity .12s ease-out;\n  transition: opacity .12s ease-out;\n  width: 6px;\n  top: 2px;\n}\n.k-scrollbar-thumb {\n  position: relative;\n  display: block;\n  width: 100%;\n  height: 0;\n  cursor: pointer;\n  border-radius: inherit;\n  background-color: #9092984d;\n  -webkit-transition: background-color .3s;\n  transition: background-color .3s;\n  height: 2%;\n  -webkit-transform: translateY(0%);\n          transform: translateY(0%);\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en.js": 10,
	"./zh.js": 11
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 9;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var lang = {
   dow: 0, // Sunday is the first day of the week
   hourTip: "Select Hour", // tip of select hour
   minuteTip: "Select Minute", // tip of select minute
   secondTip: "Select Second", // tip of select second
   yearSuffix: "", // suffix of head
   monthsHead: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), // months of head
   months: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), // months of panel
   weeks: "Su_Mo_Tu_We_Th_Fr_Sa".split("_") // weeks
};
module.exports = lang;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var lang = {
   dow: 1, // Monday is the first day of the week
   hourTip: "选择小时", // tip of select hour
   minuteTip: "选择分钟", // tip of select minute
   secondTip: "选择秒数", // tip of select second
   yearSuffix: "年", // format of head
   monthsHead: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), // months of head
   months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), // months of panel
   weeks: "一_二_三_四_五_六_日".split("_") // weeks
};
module.exports = lang;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("37276099", content, true, {});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"table.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   [noTrailing]   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   [debounceMode] If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
module.exports = function ( delay, noTrailing, callback, debounceMode ) {

	// After wrapper has stopped being called, this timeout ensures that
	// `callback` is executed at the proper times in `throttle` and `end`
	// debounce modes.
	var timeoutID;

	// Keep track of the last time `callback` was executed.
	var lastExec = 0;

	// `noTrailing` defaults to falsy.
	if ( typeof noTrailing !== 'boolean' ) {
		debounceMode = callback;
		callback = noTrailing;
		noTrailing = undefined;
	}

	// The `wrapper` function encapsulates all of the throttling / debouncing
	// functionality and when executed will limit the rate at which `callback`
	// is executed.
	function wrapper () {

		var self = this;
		var elapsed = Number(new Date()) - lastExec;
		var args = arguments;

		// Execute `callback` and update the `lastExec` timestamp.
		function exec () {
			lastExec = Number(new Date());
			callback.apply(self, args);
		}

		// If `debounceMode` is true (at begin) this is used to clear the flag
		// to allow future `callback` executions.
		function clear () {
			timeoutID = undefined;
		}

		if ( debounceMode && !timeoutID ) {
			// Since `wrapper` is being called for the first time and
			// `debounceMode` is true (at begin), execute `callback`.
			exec();
		}

		// Clear any existing timeout.
		if ( timeoutID ) {
			clearTimeout(timeoutID);
		}

		if ( debounceMode === undefined && elapsed > delay ) {
			// In throttle mode, if `delay` time has been exceeded, execute
			// `callback`.
			exec();

		} else if ( noTrailing !== true ) {
			// In trailing throttle mode, since `delay` time has not been
			// exceeded, schedule `callback` to execute `delay` ms after most
			// recent execution.
			//
			// If `debounceMode` is true (at begin), schedule `clear` to execute
			// after `delay` ms.
			//
			// If `debounceMode` is false (at end), schedule `callback` to
			// execute after `delay` ms.
			timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
		}

	}

	// Return the wrapper function.
	return wrapper;

};


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }

    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;

        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;

                return true;
            }

            return false;
        });

        return result;
    }

    return (function () {
        function anonymous() {
            this.__entries__ = [];
        }

        var prototypeAccessors = { size: { configurable: true } };

        /**
         * @returns {boolean}
         */
        prototypeAccessors.size.get = function () {
            return this.__entries__.length;
        };

        /**
         * @param {*} key
         * @returns {*}
         */
        anonymous.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];

            return entry && entry[1];
        };

        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        anonymous.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);

            if (~index) {
                this.__entries__[index][1] = value;
            } else {
                this.__entries__.push([key, value]);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);

            if (~index) {
                entries.splice(index, 1);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };

        /**
         * @returns {void}
         */
        anonymous.prototype.clear = function () {
            this.__entries__.splice(0);
        };

        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        anonymous.prototype.forEach = function (callback, ctx) {
            var this$1 = this;
            if ( ctx === void 0 ) ctx = null;

            for (var i = 0, list = this$1.__entries__; i < list.length; i += 1) {
                var entry = list[i];

                callback.call(ctx, entry[1], entry[0]);
            }
        };

        Object.defineProperties( anonymous.prototype, prototypeAccessors );

        return anonymous;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }

    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }

    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }

    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }

    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;

/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
var throttle = function (callback, delay) {
    var leadingCall = false,
        trailingCall = false,
        lastCallTime = 0;

    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;

            callback();
        }

        if (trailingCall) {
            proxy();
        }
    }

    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }

    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();

        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }

            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        } else {
            leadingCall = true;
            trailingCall = false;

            setTimeout(timeoutCallback, delay);
        }

        lastCallTime = timeStamp;
    }

    return proxy;
};

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;

// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];

// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';

/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = function() {
    this.connected_ = false;
    this.mutationEventsAdded_ = false;
    this.mutationsObserver_ = null;
    this.observers_ = [];

    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
};

/**
 * Adds observer to observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be added.
 * @returns {void}
 */


/**
 * Holds reference to the controller's instance.
 *
 * @private {ResizeObserverController}
 */


/**
 * Keeps reference to the instance of MutationObserver.
 *
 * @private {MutationObserver}
 */

/**
 * Indicates whether DOM listeners have been added.
 *
 * @private {boolean}
 */
ResizeObserverController.prototype.addObserver = function (observer) {
    if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
    }

    // Add listeners if they haven't been added yet.
    if (!this.connected_) {
        this.connect_();
    }
};

/**
 * Removes observer from observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be removed.
 * @returns {void}
 */
ResizeObserverController.prototype.removeObserver = function (observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer);

    // Remove observer if it's present in registry.
    if (~index) {
        observers.splice(index, 1);
    }

    // Remove listeners if controller has no connected observers.
    if (!observers.length && this.connected_) {
        this.disconnect_();
    }
};

/**
 * Invokes the update of observers. It will continue running updates insofar
 * it detects changes.
 *
 * @returns {void}
 */
ResizeObserverController.prototype.refresh = function () {
    var changesDetected = this.updateObservers_();

    // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.
    if (changesDetected) {
        this.refresh();
    }
};

/**
 * Updates every observer from observers list and notifies them of queued
 * entries.
 *
 * @private
 * @returns {boolean} Returns "true" if any observer has detected changes in
 *  dimensions of it's elements.
 */
ResizeObserverController.prototype.updateObservers_ = function () {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function (observer) {
        return observer.gatherActive(), observer.hasActive();
    });

    // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.
    activeObservers.forEach(function (observer) { return observer.broadcastActive(); });

    return activeObservers.length > 0;
};

/**
 * Initializes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.connect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
        return;
    }

    // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.
    document.addEventListener('transitionend', this.onTransitionEnd_);

    window.addEventListener('resize', this.refresh);

    if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);

        this.mutationsObserver_.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMSubtreeModified', this.refresh);

        this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
};

/**
 * Removes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.disconnect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
        return;
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);

    if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
    }

    if (this.mutationEventsAdded_) {
        document.removeEventListener('DOMSubtreeModified', this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
};

/**
 * "Transitionend" event handler.
 *
 * @private
 * @param {TransitionEvent} event
 * @returns {void}
 */
ResizeObserverController.prototype.onTransitionEnd_ = function (ref) {
        var propertyName = ref.propertyName; if ( propertyName === void 0 ) propertyName = '';

    // Detect whether transition may affect dimensions of an element.
    var isReflowProperty = transitionKeys.some(function (key) {
        return !!~propertyName.indexOf(key);
    });

    if (isReflowProperty) {
        this.refresh();
    }
};

/**
 * Returns instance of the ResizeObserverController.
 *
 * @returns {ResizeObserverController}
 */
ResizeObserverController.getInstance = function () {
    if (!this.instance_) {
        this.instance_ = new ResizeObserverController();
    }

    return this.instance_;
};

ResizeObserverController.instance_ = null;

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var i = 0, list = Object.keys(props); i < list.length; i += 1) {
        var key = list[i];

        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }

    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;

    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);

/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}

/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [], len = arguments.length - 1;
    while ( len-- > 0 ) positions[ len ] = arguments[ len + 1 ];

    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];

        return size + toFloat(value);
    }, 0);
}

/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};

    for (var i = 0, list = positions; i < list.length; i += 1) {
        var position = list[i];

        var value = styles['padding-' + position];

        paddings[position] = toFloat(value);
    }

    return paddings;
}

/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();

    return createRectInit(0, 0, bbox.width, bbox.height);
}

/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth;
    var clientHeight = target.clientHeight;

    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }

    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;

    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width),
        height = toFloat(styles.height);

    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }

        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }

    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;

        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }

        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }

    return createRectInit(paddings.left, paddings.top, width, height);
}

/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }

    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function'; };
})();

/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}

/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }

    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }

    return getHTMLElementContentRect(target);
}

/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(ref) {
    var x = ref.x;
    var y = ref.y;
    var width = ref.width;
    var height = ref.height;

    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);

    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });

    return rect;
}

/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = function(target) {
    this.broadcastWidth = 0;
    this.broadcastHeight = 0;
    this.contentRect_ = createRectInit(0, 0, 0, 0);

    this.target = target;
};

/**
 * Updates content rectangle and tells whether it's width or height properties
 * have changed since the last broadcast.
 *
 * @returns {boolean}
 */


/**
 * Reference to the last observed content rectangle.
 *
 * @private {DOMRectInit}
 */


/**
 * Broadcasted width of content rectangle.
 *
 * @type {number}
 */
ResizeObservation.prototype.isActive = function () {
    var rect = getContentRect(this.target);

    this.contentRect_ = rect;

    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
};

/**
 * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
 * from the corresponding properties of the last observed content rectangle.
 *
 * @returns {DOMRectInit} Last observed content rectangle.
 */
ResizeObservation.prototype.broadcastRect = function () {
    var rect = this.contentRect_;

    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;

    return rect;
};

var ResizeObserverEntry = function(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit);

    // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.
    defineConfigurable(this, { target: target, contentRect: contentRect });
};

var ResizeObserverSPI = function(callback, controller, callbackCtx) {
    this.activeObservations_ = [];
    this.observations_ = new MapShim();

    if (typeof callback !== 'function') {
        throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
};

/**
 * Starts observing provided element.
 *
 * @param {Element} target - Element to be observed.
 * @returns {void}
 */


/**
 * Registry of the ResizeObservation instances.
 *
 * @private {Map<Element, ResizeObservation>}
 */


/**
 * Public ResizeObserver instance which will be passed to the callback
 * function and used as a value of it's "this" binding.
 *
 * @private {ResizeObserver}
 */

/**
 * Collection of resize observations that have detected changes in dimensions
 * of elements.
 *
 * @private {Array<ResizeObservation>}
 */
ResizeObserverSPI.prototype.observe = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is already being observed.
    if (observations.has(target)) {
        return;
    }

    observations.set(target, new ResizeObservation(target));

    this.controller_.addObserver(this);

    // Force the update of observations.
    this.controller_.refresh();
};

/**
 * Stops observing provided element.
 *
 * @param {Element} target - Element to stop observing.
 * @returns {void}
 */
ResizeObserverSPI.prototype.unobserve = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is not being observed.
    if (!observations.has(target)) {
        return;
    }

    observations.delete(target);

    if (!observations.size) {
        this.controller_.removeObserver(this);
    }
};

/**
 * Stops observing all elements.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.disconnect = function () {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
};

/**
 * Collects observation instances the associated element of which has changed
 * it's content rectangle.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.gatherActive = function () {
        var this$1 = this;

    this.clearActive();

    this.observations_.forEach(function (observation) {
        if (observation.isActive()) {
            this$1.activeObservations_.push(observation);
        }
    });
};

/**
 * Invokes initial callback function with a list of ResizeObserverEntry
 * instances collected from active resize observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.broadcastActive = function () {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
        return;
    }

    var ctx = this.callbackCtx_;

    // Create ResizeObserverEntry instance for every active observation.
    var entries = this.activeObservations_.map(function (observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
    });

    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
};

/**
 * Clears the collection of active observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.clearActive = function () {
    this.activeObservations_.splice(0);
};

/**
 * Tells whether observer has active observations.
 *
 * @returns {boolean}
 */
ResizeObserverSPI.prototype.hasActive = function () {
    return this.activeObservations_.length > 0;
};

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();

/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = function(callback) {
    if (!(this instanceof ResizeObserver)) {
        throw new TypeError('Cannot call a class as a function.');
    }
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    var controller = ResizeObserverController.getInstance();
    var observer = new ResizeObserverSPI(callback, controller, this);

    observers.set(this, observer);
};

// Expose public methods of ResizeObserver.
['observe', 'unobserve', 'disconnect'].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        return (ref = observers.get(this))[method].apply(ref, arguments);
        var ref;
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }

    return ResizeObserver;
})();

/* harmony default export */ __webpack_exports__["a"] = (index);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(16)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule normalizeWheel
 * @typechecks
 */



var UserAgent_DEPRECATED = __webpack_require__(19);

var isEventSupported = __webpack_require__(20);


// Reasonable defaults
var PIXEL_STEP  = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;

/**
 * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
 * complicated, thus this doc is long and (hopefully) detailed enough to answer
 * your questions.
 *
 * If you need to react to the mouse wheel in a predictable way, this code is
 * like your bestest friend. * hugs *
 *
 * As of today, there are 4 DOM event types you can listen to:
 *
 *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
 *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
 *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
 *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
 *
 * So what to do?  The is the best:
 *
 *   normalizeWheel.getEventType();
 *
 * In your event callback, use this code to get sane interpretation of the
 * deltas.  This code will return an object with properties:
 *
 *   spinX   -- normalized spin speed (use for zoom) - x plane
 *   spinY   -- " - y plane
 *   pixelX  -- normalized distance (to pixels) - x plane
 *   pixelY  -- " - y plane
 *
 * Wheel values are provided by the browser assuming you are using the wheel to
 * scroll a web page by a number of lines or pixels (or pages).  Values can vary
 * significantly on different platforms and browsers, forgetting that you can
 * scroll at different speeds.  Some devices (like trackpads) emit more events
 * at smaller increments with fine granularity, and some emit massive jumps with
 * linear speed or acceleration.
 *
 * This code does its best to normalize the deltas for you:
 *
 *   - spin is trying to normalize how far the wheel was spun (or trackpad
 *     dragged).  This is super useful for zoom support where you want to
 *     throw away the chunky scroll steps on the PC and make those equal to
 *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
 *     resolve a single slow step on a wheel to 1.
 *
 *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
 *     get the crazy differences between browsers, but at least it'll be in
 *     pixels!
 *
 *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
 *     should translate to positive value zooming IN, negative zooming OUT.
 *     This matches the newer 'wheel' event.
 *
 * Why are there spinX, spinY (or pixels)?
 *
 *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
 *     with a mouse.  It results in side-scrolling in the browser by default.
 *
 *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
 *
 *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
 *     probably is by browsers in conjunction with fancy 3D controllers .. but
 *     you know.
 *
 * Implementation info:
 *
 * Examples of 'wheel' event if you scroll slowly (down) by one step with an
 * average mouse:
 *
 *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
 *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
 *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
 *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
 *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
 *
 * On the trackpad:
 *
 *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
 *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
 *
 * On other/older browsers.. it's more complicated as there can be multiple and
 * also missing delta values.
 *
 * The 'wheel' event is more standard:
 *
 * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
 *
 * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
 * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
 * backward compatibility with older events.  Those other values help us
 * better normalize spin speed.  Example of what the browsers provide:
 *
 *                          | event.wheelDelta | event.detail
 *        ------------------+------------------+--------------
 *          Safari v5/OS X  |       -120       |       0
 *          Safari v5/Win7  |       -120       |       0
 *         Chrome v17/OS X  |       -120       |       0
 *         Chrome v17/Win7  |       -120       |       0
 *                IE9/Win7  |       -120       |   undefined
 *         Firefox v4/OS X  |     undefined    |       1
 *         Firefox v4/Win7  |     undefined    |       3
 *
 */
function normalizeWheel(/*object*/ event) /*object*/ {
  var sX = 0, sY = 0,       // spinX, spinY
      pX = 0, pY = 0;       // pixelX, pixelY

  // Legacy
  if ('detail'      in event) { sY = event.detail; }
  if ('wheelDelta'  in event) { sY = -event.wheelDelta / 120; }
  if ('wheelDeltaY' in event) { sY = -event.wheelDeltaY / 120; }
  if ('wheelDeltaX' in event) { sX = -event.wheelDeltaX / 120; }

  // side scrolling on FF with DOMMouseScroll
  if ( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in event) { pY = event.deltaY; }
  if ('deltaX' in event) { pX = event.deltaX; }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode == 1) {          // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else {                             // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) { sX = (pX < 1) ? -1 : 1; }
  if (pY && !sY) { sY = (pY < 1) ? -1 : 1; }

  return { spinX  : sX,
           spinY  : sY,
           pixelX : pX,
           pixelY : pY };
}


/**
 * The best combination if you prefer spinX + spinY normalization.  It favors
 * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
 * 'wheel' event, making spin speed determination impossible.
 */
normalizeWheel.getEventType = function() /*string*/ {
  return (UserAgent_DEPRECATED.firefox())
           ? 'DOMMouseScroll'
           : (isEventSupported('wheel'))
               ? 'wheel'
               : 'mousewheel';
};

module.exports = normalizeWheel;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule UserAgent_DEPRECATED
 */

/**
 *  Provides entirely client-side User Agent and OS detection. You should prefer
 *  the non-deprecated UserAgent module when possible, which exposes our
 *  authoritative server-side PHP-based detection to the client.
 *
 *  Usage is straightforward:
 *
 *    if (UserAgent_DEPRECATED.ie()) {
 *      //  IE
 *    }
 *
 *  You can also do version checks:
 *
 *    if (UserAgent_DEPRECATED.ie() >= 7) {
 *      //  IE7 or better
 *    }
 *
 *  The browser functions will return NaN if the browser does not match, so
 *  you can also do version compares the other way:
 *
 *    if (UserAgent_DEPRECATED.ie() < 7) {
 *      //  IE6 or worse
 *    }
 *
 *  Note that the version is a float and may include a minor version number,
 *  so you should always use range operators to perform comparisons, not
 *  strict equality.
 *
 *  **Note:** You should **strongly** prefer capability detection to browser
 *  version detection where it's reasonable:
 *
 *    http://www.quirksmode.org/js/support.html
 *
 *  Further, we have a large number of mature wrapper functions and classes
 *  which abstract away many browser irregularities. Check the documentation,
 *  grep for things, or ask on javascript@lists.facebook.com before writing yet
 *  another copy of "event || window.event".
 *
 */

var _populated = false;

// Browsers
var _ie, _firefox, _opera, _webkit, _chrome;

// Actual IE browser for compatibility mode
var _ie_real_version;

// Platforms
var _osx, _windows, _linux, _android;

// Architectures
var _win64;

// Devices
var _iphone, _ipad, _native;

var _mobile;

function _populate() {
  if (_populated) {
    return;
  }

  _populated = true;

  // To work around buggy JS libraries that can't handle multi-digit
  // version numbers, Opera 10's user agent string claims it's Opera
  // 9, then later includes a Version/X.Y field:
  //
  // Opera/9.80 (foo) Presto/2.2.15 Version/10.10
  var uas = navigator.userAgent;
  var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
  var os    = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);

  _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
  _ipad = /\b(iP[ao]d)/.exec(uas);
  _android = /Android/i.exec(uas);
  _native = /FBAN\/\w+;/i.exec(uas);
  _mobile = /Mobile/i.exec(uas);

  // Note that the IE team blog would have you believe you should be checking
  // for 'Win64; x64'.  But MSDN then reveals that you can actually be coming
  // from either x64 or ia64;  so ultimately, you should just check for Win64
  // as in indicator of whether you're in 64-bit IE.  32-bit IE on 64-bit
  // Windows will send 'WOW64' instead.
  _win64 = !!(/Win64/.exec(uas));

  if (agent) {
    _ie = agent[1] ? parseFloat(agent[1]) : (
          agent[5] ? parseFloat(agent[5]) : NaN);
    // IE compatibility mode
    if (_ie && document && document.documentMode) {
      _ie = document.documentMode;
    }
    // grab the "true" ie version from the trident token if available
    var trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
    _ie_real_version = trident ? parseFloat(trident[1]) + 4 : _ie;

    _firefox = agent[2] ? parseFloat(agent[2]) : NaN;
    _opera   = agent[3] ? parseFloat(agent[3]) : NaN;
    _webkit  = agent[4] ? parseFloat(agent[4]) : NaN;
    if (_webkit) {
      // We do not add the regexp to the above test, because it will always
      // match 'safari' only since 'AppleWebKit' appears before 'Chrome' in
      // the userAgent string.
      agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
      _chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
    } else {
      _chrome = NaN;
    }
  } else {
    _ie = _firefox = _opera = _chrome = _webkit = NaN;
  }

  if (os) {
    if (os[1]) {
      // Detect OS X version.  If no version number matches, set _osx to true.
      // Version examples:  10, 10_6_1, 10.7
      // Parses version number as a float, taking only first two sets of
      // digits.  If only one set of digits is found, returns just the major
      // version number.
      var ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);

      _osx = ver ? parseFloat(ver[1].replace('_', '.')) : true;
    } else {
      _osx = false;
    }
    _windows = !!os[2];
    _linux   = !!os[3];
  } else {
    _osx = _windows = _linux = false;
  }
}

var UserAgent_DEPRECATED = {

  /**
   *  Check if the UA is Internet Explorer.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  ie: function() {
    return _populate() || _ie;
  },

  /**
   * Check if we're in Internet Explorer compatibility mode.
   *
   * @return bool true if in compatibility mode, false if
   * not compatibility mode or not ie
   */
  ieCompatibilityMode: function() {
    return _populate() || (_ie_real_version > _ie);
  },


  /**
   * Whether the browser is 64-bit IE.  Really, this is kind of weak sauce;  we
   * only need this because Skype can't handle 64-bit IE yet.  We need to remove
   * this when we don't need it -- tracked by #601957.
   */
  ie64: function() {
    return UserAgent_DEPRECATED.ie() && _win64;
  },

  /**
   *  Check if the UA is Firefox.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  firefox: function() {
    return _populate() || _firefox;
  },


  /**
   *  Check if the UA is Opera.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  opera: function() {
    return _populate() || _opera;
  },


  /**
   *  Check if the UA is WebKit.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  webkit: function() {
    return _populate() || _webkit;
  },

  /**
   *  For Push
   *  WILL BE REMOVED VERY SOON. Use UserAgent_DEPRECATED.webkit
   */
  safari: function() {
    return UserAgent_DEPRECATED.webkit();
  },

  /**
   *  Check if the UA is a Chrome browser.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  chrome : function() {
    return _populate() || _chrome;
  },


  /**
   *  Check if the user is running Windows.
   *
   *  @return bool `true' if the user's OS is Windows.
   */
  windows: function() {
    return _populate() || _windows;
  },


  /**
   *  Check if the user is running Mac OS X.
   *
   *  @return float|bool   Returns a float if a version number is detected,
   *                       otherwise true/false.
   */
  osx: function() {
    return _populate() || _osx;
  },

  /**
   * Check if the user is running Linux.
   *
   * @return bool `true' if the user's OS is some flavor of Linux.
   */
  linux: function() {
    return _populate() || _linux;
  },

  /**
   * Check if the user is running on an iPhone or iPod platform.
   *
   * @return bool `true' if the user is running some flavor of the
   *    iPhone OS.
   */
  iphone: function() {
    return _populate() || _iphone;
  },

  mobile: function() {
    return _populate() || (_iphone || _ipad || _android || _mobile);
  },

  nativeApp: function() {
    // webviews inside of the native apps
    return _populate() || _native;
  },

  android: function() {
    return _populate() || _android;
  },

  ipad: function() {
    return _populate() || _ipad;
  }
};

module.exports = UserAgent_DEPRECATED;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isEventSupported
 */



var ExecutionEnvironment = __webpack_require__(21);

var useHasFeature;
if (ExecutionEnvironment.canUseDOM) {
  useHasFeature =
    document.implementation &&
    document.implementation.hasFeature &&
    // always returns true in newer browsers as per the standard.
    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
    document.implementation.hasFeature('', '') !== true;
}

/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported(eventNameSuffix, capture) {
  if (!ExecutionEnvironment.canUseDOM ||
      capture && !('addEventListener' in document)) {
    return false;
  }

  var eventName = 'on' + eventNameSuffix;
  var isSupported = eventName in document;

  if (!isSupported) {
    var element = document.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}

module.exports = isEventSupported;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ExecutionEnvironment
 */

/*jslint evil: true */



var canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners:
    canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAABjCAYAAAAB4ffpAAAG8UlEQVR4nO2cB2/bOhRGGWfvvfdA5v//IUH2bvbee7Y5BNg6frIdS7yWmMcDFG1cR6I+Xd5FSiW/P1Ee66TiHsBPxQsrhBdWCC+sEF5YIbywQnhhhSiLewBheHl5UScnJ+rp6UlVVFSo9vZ2VV1dHfewvuCcxX58fKidnR2VSqVUZ2enqqqqUru7u+r5+TnuoX3BOYu9urpS5eXlqqenR/9cX1+v3t/f1eXlperq6op5dP9wzmJfX1//M+35mc+ThHPCYq2Pj49fPuNnPk8Szgnb1NSkrfPg4EDd3t7qIMbfzc3NcQ/tCyUudrdcyAqcFNYFnHMFruCFFSJFDvjw8KD9lfcK/yBALiwshP79FIEAQRE4ablgnJyenurqLizeFWQBg4tSyZW8vb39ps7m7lRWVqqSkhKLw/v/kiotLVU1NTW6mSEpKjfv6OhI7Pi2wFIXFxfVp8FFOk7RmjC/fv3Sf9OdMg2UJLK3t6fHiMFFQdzHcudXVlb0v/v6+nT5eXZ2Jn3aUNzd3ekuWW9vb+TZKy4svVL898jIiKqtrdXinp+f6ywkaeAG6EXY6DuIl7RYLI1pUjlEZao1NjYmqncqQdF6BcYd0DBpaWkpxim/zebmpr7Zra2t1o5ZtOA1NDSkXUAUUcksDg8P1c3NjZqenlZlZWV/bxhTmGMX2pfFp/Kno6Mj9LiCKFqBQI4cJRugmb28vKwuLi5UXV3d36jNDWN5hs9pJRYC0Z8Y0NbWpo9pE2fWvLBWcu3h4WHdgzWYGxbmpuH/uUH4ftv8uH7s/f29dhdjY2NZv0P0x6+SpfT394uMw5leAauz6+vreb+HBeOD6dYFQR69tLSk0z0CqRTOCEugur6+1sLk+x7+EssNgrUyfPLU1JR2LVI45QrIAMiHZ2ZmclZGiIcfJijFhTMWCwQuwEfmgkCWLiq2Q2EyPz8vOr50nLJYAyKRfhHNg1ZnCV7ks4iLr93Y2NBZBYJLVHyMBReUnkM7ZbEGojkNE4IQIhqOj491gKM9aeyFQMZF41MlRCUIkg9nthmdyWPToUmCpZpNG93d3foCEdYUDlRiQEVlu6oy4JIQFbiRzApuImNw0hXkgmwAgemmSYKFBu1wJKiycPDjhC0mxmKZLQiKpRqLddIVJAVSOkQ1wlKcGJwMXkEw/WmoFBusk0Y+lprOjxAWX2eKgjggkGa2K8V87NzcXN5EPi7IbwcHB0XPIepjSYMk63HD/v6+FivdxwWBL2SZiMb2wMCA6HK/iLAk5frgn34n38WGhWhMIcCs+G5qZZJ4xkVj3OZSTCYiPpZ9T5LgU9mnQPUVRhyWcKSX4K0Ly3SjvScJxyca05ShBVgoLBxSSEjGAOvCYq3U8rb9F2LSB6CpQolK8An7QAeugBtS6BpZIVgXlpVYmw9a4EvpZtFsIRDaSqkYI35WCqvC4vNoRDc0NFg7JtMVKyXDoE0YZc9qOlgss4oMQQKrWQFugK5SVDdAcKKSwkKZ9rkWBqPAWAliEo8yWbNYpiwLflEHyfTc2trS4tIlkoSx0naMumUzCGvC4lvJWaMWBLgTojYR3/YmikwIfpxDIj20JqytKUVFhD/NbGpIwZgxCttYEZY1HwKM6dq7hHl6PN+yeqFYEZapxPS1FbGLCYGWsdt2B5GVoDlGwEnaQ8KFQIlL4LW5GTqysIiKP5SO4JIQdOmp2uwfRI4Q2YIWlpxtwS0uclmkCWK8DsUGkYSlKqKZkW0bZPqaf5LgpmcWMfhZxsvjrzZmXyRhcfhE1czUCCtF9ImJiUS9+QJB2bxMBpBZdhN4yWq4JhurC5F8bLaGC43uoHWguMFKMQTTiM+Ea6F3YGO1KrSwRFEI6ocycJuNGJswrmw5qzEGGwVDaGGzBS1cAAUDPiuJUMLS16B0DoJrspEdhBKWaI9VBlVaWAPpS1xL0fnAl+ZyB1yTeX9DpPOE+SWzShAkXpLdgCGXO2DJh/+PWokVvK8Aa52dnY100qyD+QwuPL9VSD/XPE8gAVs/w6ZeBadbZtsiJ7W9rrW6uqr983cvhrQOu5AYC2lZlD5t6DyWCGr7Yox/+66wfJdpK1FOJ/7p70IgIuPbvmMpTH9WWZPa/EmUsFgfaRob3PJB+YmlJu2BZ0OihAXKSVZ6eXIwaEMFn21vb2s3wHO0SSVxG4/JMycnJ/VGt7W1NW3B5iVA5Jakc0z/0dHRyK8XkSRxwgLi8owr+7Ko3U2yjsDj4+M6h046iRTWgA91tYGeOB/7U/DCCuGFFcILK4QXVggvrBBeWCG8sEJ4YYXwwgoRuqSl0/+T344cdW9BaGFZa/Jkx78IQgjvY4XwwgrhhRXCCyuEF1YIL6wQXlghvLBCeGGF+AOEHX4VkrsdSgAAAABJRU5ErkJggg=="

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function(key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function(key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    if (!sourceAndTargetTypesMatch) {
        return cloneIfNecessary(source, optionsArgument)
    } else if (sourceIsArray) {
        var arrayMerge = options.arrayMerge || defaultArrayMerge;
        return arrayMerge(target, source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var nestRE = /^(attrs|props|on|nativeOn|class|style|hook)$/

module.exports = function mergeJSXProps (objs) {
  return objs.reduce(function (a, b) {
    var aa, bb, key, nestedKey, temp
    for (key in b) {
      aa = a[key]
      bb = b[key]
      if (aa && nestRE.test(key)) {
        // normalize class
        if (key === 'class') {
          if (typeof aa === 'string') {
            temp = aa
            a[key] = aa = {}
            aa[temp] = true
          }
          if (typeof bb === 'string') {
            temp = bb
            b[key] = bb = {}
            bb[temp] = true
          }
        }
        if (key === 'on' || key === 'nativeOn' || key === 'hook') {
          // merge functions
          for (nestedKey in bb) {
            aa[nestedKey] = mergeFn(aa[nestedKey], bb[nestedKey])
          }
        } else if (Array.isArray(aa)) {
          a[key] = aa.concat(bb)
        } else if (Array.isArray(bb)) {
          a[key] = [aa].concat(bb)
        } else {
          for (nestedKey in bb) {
            aa[nestedKey] = bb[nestedKey]
          }
        }
      } else {
        a[key] = b[key]
      }
    }
    return a
  }, {})
}

function mergeFn (a, b) {
  return function () {
    a && a.apply(this, arguments)
    b && b.apply(this, arguments)
  }
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=giraffe.js.map