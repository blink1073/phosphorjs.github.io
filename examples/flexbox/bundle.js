(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\n| Copyright (c) 2014-2015, PhosphorJS Contributors\n|\n| Distributed under the terms of the BSD 3-Clause License.\n|\n| The full license is in the file LICENSE, distributed with this software.\n|----------------------------------------------------------------------------*/\nbody {\n  margin: 0;\n  padding: 0;\n  background: #F5F6F7;\n}\n#main {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  right: 10px;\n  bottom: 10px;\n}\n.my-vbox {\n  display: flex;\n  flex-direction: column;\n  padding: 10px;\n}\n.my-vbox > .p-Widget {\n  flex-grow: 1;\n  margin-bottom: 5px;\n}\n.my-vbox > .p-Widget:last-child {\n  margin-bottom: 0;\n}\n.my-vbox > .p-Widget.p-SplitPanel {\n  flex-grow: 2;\n}\n.content {\n  min-width: 100px;\n  min-height: 100px;\n}\n.p-TabBar {\n  min-height: 24px;\n}\n.p-TabBar-body {\n  bottom: 1px;\n}\n.p-TabBar-footer {\n  display: block;\n  height: 1px;\n  background: #C0C0C0;\n}\n.p-TabBar-content {\n  align-items: flex-end;\n}\n.p-Tab {\n  flex-basis: 125px;\n  max-height: 21px;\n  margin-left: -1px;\n  border: 1px solid #C0C0C0;\n  border-bottom: none;\n  padding: 0px 10px;\n  background: #E5E5E5;\n  font: 12px Helvetica, Arial, sans-serif;\n}\n.p-Tab.p-mod-first {\n  margin-left: 0;\n}\n.p-Tab.p-mod-current {\n  min-height: 24px;\n  background: white;\n  transform: translateY(1px);\n}\n.p-Tab:hover:not(.p-mod-current) {\n  background: #F0F0F0;\n}\n.p-Tab-icon,\n.p-Tab-text,\n.p-Tab-close {\n  line-height: 21px;\n}\n.p-TabPanel > .p-StackedPanel {\n  background: white;\n  border: 1px solid #C0C0C0;\n  border-top: none;\n}\n.red {\n  background: #E74C3C;\n}\n.yellow {\n  background: #F1C40F;\n}\n.green {\n  background: #27AE60;\n}\n.blue {\n  background: #3498DB;\n}\n"; (require("browserify-css").createStyle(css, { "href": "flexbox/index.css"})); module.exports = css;
},{"browserify-css":3}],2:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_splitpanel_1 = require('phosphor-splitpanel');
var phosphor_tabs_1 = require('phosphor-tabs');
var phosphor_widget_1 = require('phosphor-widget');
require('./index.css');
/**
 * A widget which uses CSS flexbox to layout its children.
 */
var MyVBox = (function (_super) {
    __extends(MyVBox, _super);
    function MyVBox() {
        _super.call(this);
        this.addClass('my-vbox');
    }
    return MyVBox;
})(phosphor_widget_1.Panel);
/**
 * A widget which logs its resize messages.
 */
var MyResizeWidget = (function (_super) {
    __extends(MyResizeWidget, _super);
    function MyResizeWidget() {
        _super.apply(this, arguments);
    }
    // All widgets will receive a resize message when their parent
    // determines that they have likely been resized. If the current
    // size of the widget is known, it will be passed as part of the
    // message. Otherwise, the size parameters will be `-1`, and the
    // the node will need to be measured to get the current size.
    //
    // The current size will typically be known when the parent of
    // the widget is an absolute Phosphor layout panel, and will be
    // unknown when the parent is a widget which uses CSS to layout
    // its children.
    MyResizeWidget.prototype.onResize = function (msg) {
        var w = msg.width;
        var h = msg.height;
        console.log(this.node.className, 'width:', w, 'height:', h);
    };
    return MyResizeWidget;
})(phosphor_widget_1.Widget);
/**
 * A widget which hosts a CodeMirror editor.
 */
var CodeMirrorWidget = (function (_super) {
    __extends(CodeMirrorWidget, _super);
    function CodeMirrorWidget(config) {
        _super.call(this);
        this.addClass('CodeMirrorWidget');
        this._editor = CodeMirror(this.node, config);
    }
    Object.defineProperty(CodeMirrorWidget.prototype, "editor", {
        get: function () {
            return this._editor;
        },
        enumerable: true,
        configurable: true
    });
    CodeMirrorWidget.prototype.loadTarget = function (target) {
        var doc = this._editor.getDoc();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', target);
        xhr.onreadystatechange = function () { return doc.setValue(xhr.responseText); };
        xhr.send();
    };
    CodeMirrorWidget.prototype.onAfterAttach = function (msg) {
        this._editor.refresh();
    };
    CodeMirrorWidget.prototype.onResize = function (msg) {
        if (msg.width < 0 || msg.height < 0) {
            this._editor.refresh();
        }
        else {
            this._editor.setSize(msg.width, msg.height);
        }
    };
    return CodeMirrorWidget;
})(phosphor_widget_1.Widget);
/**
 * Create a placeholder content widget.
 */
function createContent(name) {
    var widget = new MyResizeWidget();
    widget.addClass('content');
    widget.addClass(name);
    return widget;
}
/**
 * The main application entry point.
 */
function main() {
    var red = createContent('red');
    var yellow = createContent('yellow');
    var green = createContent('green');
    var blue1 = createContent('blue');
    var blue2 = createContent('blue');
    var blue3 = createContent('blue');
    var blue4 = createContent('blue');
    var split = new phosphor_splitpanel_1.SplitPanel();
    split.children.assign([blue1, blue2, blue3, blue4]);
    var box = new MyVBox();
    box.children.assign([red, split, yellow, green]);
    box.title.text = 'Demo';
    var cmSource = new CodeMirrorWidget({
        mode: 'text/typescript',
        lineNumbers: true,
        tabSize: 2,
    });
    cmSource.loadTarget('./index.ts');
    cmSource.title.text = 'Source';
    var cmCss = new CodeMirrorWidget({
        mode: 'text/css',
        lineNumbers: true,
        tabSize: 2,
    });
    cmCss.loadTarget('./index.css');
    cmCss.title.text = 'CSS';
    var panel = new phosphor_tabs_1.TabPanel();
    panel.id = 'main';
    panel.widgets.assign([box, cmSource, cmCss]);
    phosphor_widget_1.Widget.attach(panel, document.body);
    window.onresize = function () { return panel.update(); };
}
window.onload = main;

},{"./index.css":1,"phosphor-splitpanel":16,"phosphor-tabs":20,"phosphor-widget":26}],3:[function(require,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }
        
        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            head.appendChild(style);
        } else if (style.styleSheet) { // for IE8 and below
            head.appendChild(style);
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            head.appendChild(style);
        }
    }
};

},{}],4:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * Execute a callback for each element in an array.
 *
 * @param array - The array of values to iterate.
 *
 * @param callback - The callback to invoke for the array elements.
 *
 * @param fromIndex - The starting index for iteration.
 *
 * @param wrap - Whether iteration wraps around at the end of the array.
 *
 * @returns The first value returned by `callback` which is not
 *   equal to `undefined`, or `undefined` if the callback does
 *   not return a value or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function logger(value: number): void {
 *   console.log(value);
 * }
 *
 * let data = [1, 2, 3, 4];
 * arrays.forEach(data, logger);           // logs 1, 2, 3, 4
 * arrays.forEach(data, logger, 2);        // logs 3, 4
 * arrays.forEach(data, logger, 2, true);  // logs 3, 4, 1, 2
 * arrays.forEach(data, (v, i) => {        // 2
 *   if (v === 3) return i;
 * });
 * ```
 *
 * **See also** [[rforEach]]
 */
function forEach(array, callback, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = 0; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return void 0;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start + i) % n;
            var result = callback(array[j], j);
            if (result !== void 0)
                return result;
        }
    }
    else {
        for (var i = start, n = array.length; i < n; ++i) {
            var result = callback(array[i], i);
            if (result !== void 0)
                return result;
        }
    }
    return void 0;
}
exports.forEach = forEach;
/**
 * Execute a callback for each element in an array, in reverse.
 *
 * @param array - The array of values to iterate.
 *
 * @param callback - The callback to invoke for the array elements.
 *
 * @param fromIndex - The starting index for iteration.
 *
 * @param wrap - Whether iteration wraps around at the end of the array.
 *
 * @returns The first value returned by `callback` which is not
 *   equal to `undefined`, or `undefined` if the callback does
 *   not return a value or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function logger(value: number): void {
 *   console.log(value);
 * }
 *
 * let data = [1, 2, 3, 4];
 * arrays.rforEach(data, logger);           // logs 4, 3, 2, 1
 * arrays.rforEach(data, logger, 2);        // logs 3, 2, 1
 * arrays.rforEach(data, logger, 2, true);  // logs 3, 2, 1, 4
 * arrays.rforEach(data, (v, i) => {        // 2
 *   if (v === 3) return i;
 * });
 * ```
 * **See also** [[forEach]]
 */
function rforEach(array, callback, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = array.length - 1; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return void 0;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start - i + n) % n;
            var result = callback(array[j], j);
            if (result !== void 0)
                return result;
        }
    }
    else {
        for (var i = start; i >= 0; --i) {
            var result = callback(array[i], i);
            if (result !== void 0)
                return result;
        }
    }
    return void 0;
}
exports.rforEach = rforEach;
/**
 * Find the index of the first value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the end of the array.
 *
 * @returns The index of the first matching value, or `-1` if no value
 *   matches the predicate or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * let data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.findIndex(data, isEven);           // 1
 * arrays.findIndex(data, isEven, 4);        // 5
 * arrays.findIndex(data, isEven, 6);        // -1
 * arrays.findIndex(data, isEven, 6, true);  // 1
 * ```
 *
 * **See also** [[rfindIndex]].
 */
function findIndex(array, pred, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = 0; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return -1;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start + i) % n;
            if (pred(array[j], j))
                return j;
        }
    }
    else {
        for (var i = start, n = array.length; i < n; ++i) {
            if (pred(array[i], i))
                return i;
        }
    }
    return -1;
}
exports.findIndex = findIndex;
/**
 * Find the index of the last value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the front of the array.
 *
 * @returns The index of the last matching value, or `-1` if no value
 *   matches the predicate or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * let data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.rfindIndex(data, isEven);           // 5
 * arrays.rfindIndex(data, isEven, 4);        // 3
 * arrays.rfindIndex(data, isEven, 0);        // -1
 * arrays.rfindIndex(data, isEven, 0, true);  // 5
 * ```
 *
 * **See also** [[findIndex]].
 */
function rfindIndex(array, pred, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = array.length - 1; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return -1;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start - i + n) % n;
            if (pred(array[j], j))
                return j;
        }
    }
    else {
        for (var i = start; i >= 0; --i) {
            if (pred(array[i], i))
                return i;
        }
    }
    return -1;
}
exports.rfindIndex = rfindIndex;
/**
 * Find the first value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the end of the array.
 *
 * @returns The first matching value, or `undefined` if no value matches
 *   the predicate or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * let data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.find(data, isEven);           // 2
 * arrays.find(data, isEven, 4);        // 2
 * arrays.find(data, isEven, 6);        // undefined
 * arrays.find(data, isEven, 6, true);  // 2
 * ```
 *
 * **See also** [[rfind]].
 */
function find(array, pred, fromIndex, wrap) {
    var i = findIndex(array, pred, fromIndex, wrap);
    return i !== -1 ? array[i] : void 0;
}
exports.find = find;
/**
 * Find the last value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the front of the array.
 *
 * @returns The last matching value, or `undefined` if no value matches
 *   the predicate or if the start index is out of range.
 *
 * #### Notes
 * The range of visited indices is set before the first invocation of
 * `pred`. It is not safe for `pred` to change the length of `array`.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * let data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.rfind(data, isEven);           // 2
 * arrays.rfind(data, isEven, 4);        // 4
 * arrays.rfind(data, isEven, 0);        // undefined
 * arrays.rfind(data, isEven, 0, true);  // 2
 * ```
 *
 * **See also** [[find]].
 */
function rfind(array, pred, fromIndex, wrap) {
    var i = rfindIndex(array, pred, fromIndex, wrap);
    return i !== -1 ? array[i] : void 0;
}
exports.rfind = rfind;
/**
 * Insert an element into an array at a specified index.
 *
 * @param array - The array of values to modify.
 *
 * @param index - The index at which to insert the value. This value
 *   is clamped to the bounds of the array.
 *
 * @param value - The value to insert into the array.
 *
 * @returns The index at which the value was inserted.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * let data = [0, 1, 2, 3, 4];
 * arrays.insert(data, 0, 12);  // 0
 * arrays.insert(data, 3, 42);  // 3
 * arrays.insert(data, -9, 9);  // 0
 * arrays.insert(data, 12, 8);  // 8
 * console.log(data);           // [9, 12, 0, 1, 42, 2, 3, 4, 8]
 * ```
 *
 * **See also** [[removeAt]] and [[remove]]
 */
function insert(array, index, value) {
    var j = Math.max(0, Math.min(index | 0, array.length));
    for (var i = array.length; i > j; --i) {
        array[i] = array[i - 1];
    }
    array[j] = value;
    return j;
}
exports.insert = insert;
/**
 * Move an element in an array from one index to another.
 *
 * @param array - The array of values to modify.
 *
 * @param fromIndex - The index of the element to move.
 *
 * @param toIndex - The target index of the element.
 *
 * @returns `true` if the element was moved, or `false` if either
 *   index is out of range.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * let data = [0, 1, 2, 3, 4];
 * arrays.move(data, 1, 2);   // true
 * arrays.move(data, -1, 0);  // false
 * arrays.move(data, 4, 2);   // true
 * arrays.move(data, 10, 0);  // false
 * console.log(data);         // [0, 2, 4, 1, 3]
 * ```
 */
function move(array, fromIndex, toIndex) {
    var j = fromIndex | 0;
    if (j < 0 || j >= array.length) {
        return false;
    }
    var k = toIndex | 0;
    if (k < 0 || k >= array.length) {
        return false;
    }
    var value = array[j];
    if (j > k) {
        for (var i = j; i > k; --i) {
            array[i] = array[i - 1];
        }
    }
    else if (j < k) {
        for (var i = j; i < k; ++i) {
            array[i] = array[i + 1];
        }
    }
    array[k] = value;
    return true;
}
exports.move = move;
/**
 * Remove an element from an array at a specified index.
 *
 * @param array - The array of values to modify.
 *
 * @param index - The index of the element to remove.
 *
 * @returns The removed value, or `undefined` if the index is out
 *   of range.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * let data = [0, 1, 2, 3, 4];
 * arrays.removeAt(data, 1);   // 1
 * arrays.removeAt(data, 3);   // 4
 * arrays.removeAt(data, 10);  // undefined
 * console.log(data);          // [0, 2, 3]
 * ```
 *
 * **See also** [[remove]] and [[insert]]
 */
function removeAt(array, index) {
    var j = index | 0;
    if (j < 0 || j >= array.length) {
        return void 0;
    }
    var value = array[j];
    for (var i = j + 1, n = array.length; i < n; ++i) {
        array[i - 1] = array[i];
    }
    array.length -= 1;
    return value;
}
exports.removeAt = removeAt;
/**
 * Remove the first occurrence of a value from an array.
 *
 * @param array - The array of values to modify.
 *
 * @param value - The value to remove from the array.
 *
 * @returns The index where the value was located, or `-1` if the
 *   value is not the array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * let data = [0, 1, 2, 3, 4];
 * arrays.remove(data, 1);  // 1
 * arrays.remove(data, 3);  // 2
 * arrays.remove(data, 7);  // -1
 * console.log(data);       // [0, 2, 4]
 * ```
 *
 * **See also** [[removeAt]] and [[insert]]
 */
function remove(array, value) {
    var j = -1;
    for (var i = 0, n = array.length; i < n; ++i) {
        if (array[i] === value) {
            j = i;
            break;
        }
    }
    if (j === -1) {
        return -1;
    }
    for (var i = j + 1, n = array.length; i < n; ++i) {
        array[i - 1] = array[i];
    }
    array.length -= 1;
    return j;
}
exports.remove = remove;
/**
 * Reverse an array in-place subject to an optional range.
 *
 * @param array - The array to reverse.
 *
 * @param fromIndex - The index of the first element of the range.
 *   This value will be clamped to the array bounds.
 *
 * @param toIndex - The index of the last element of the range.
 *   This value will be clamped to the array bounds.
 *
 * @returns A reference to the original array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * let data = [0, 1, 2, 3, 4];
 * arrays.reverse(data, 1, 3);    // [0, 3, 2, 1, 4]
 * arrays.reverse(data, 3);       // [0, 3, 2, 4, 1]
 * arrays.reverse(data);          // [1, 4, 2, 3, 0]
 * ```
 *
 * **See also** [[rotate]]
 */
function reverse(array, fromIndex, toIndex) {
    if (fromIndex === void 0) { fromIndex = 0; }
    if (toIndex === void 0) { toIndex = array.length; }
    var i = Math.max(0, Math.min(fromIndex | 0, array.length - 1));
    var j = Math.max(0, Math.min(toIndex | 0, array.length - 1));
    if (j < i)
        i = j + (j = i, 0);
    while (i < j) {
        var tmpval = array[i];
        array[i++] = array[j];
        array[j--] = tmpval;
    }
    return array;
}
exports.reverse = reverse;
/**
 * Rotate the elements of an array by a positive or negative delta.
 *
 * @param array - The array to rotate.
 *
 * @param delta - The amount of rotation to apply to the elements. A
 *   positive delta will shift the elements to the left. A negative
 *   delta will shift the elements to the right.
 *
 * @returns A reference to the original array.
 *
 * #### Notes
 * This executes in `O(n)` time and `O(1)` space.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * let data = [0, 1, 2, 3, 4];
 * arrays.rotate(data, 2);    // [2, 3, 4, 0, 1]
 * arrays.rotate(data, -2);   // [0, 1, 2, 3, 4]
 * arrays.rotate(data, 10);   // [0, 1, 2, 3, 4]
 * arrays.rotate(data, 9);    // [4, 0, 1, 2, 3]
 * ```
 *
 * **See also** [[reverse]]
 */
function rotate(array, delta) {
    var n = array.length;
    if (n <= 1) {
        return array;
    }
    var d = delta | 0;
    if (d > 0) {
        d = d % n;
    }
    else if (d < 0) {
        d = ((d % n) + n) % n;
    }
    if (d === 0) {
        return array;
    }
    reverse(array, 0, d - 1);
    reverse(array, d, n - 1);
    reverse(array, 0, n - 1);
    return array;
}
exports.rotate = rotate;
/**
 * Using a binary search, find the index of the first element in an
 * array which compares `>=` to a value.
 *
 * @param array - The array of values to be searched. It must be sorted
 *   in ascending order.
 *
 * @param value - The value to locate in the array.
 *
 * @param cmp - The comparison function which returns `true` if an
 *   array element is less than the given value.
 *
 * @returns The index of the first element in `array` which compares
 *   `>=` to `value`, or `array.length` if there is no such element.
 *
 * #### Notes
 * It is not safe for the comparison function to modify the array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function numberCmp(a: number, b: number): boolean {
 *   return a < b;
 * }
 *
 * let data = [0, 3, 4, 7, 7, 9];
 * arrays.lowerBound(data, 0, numberCmp);   // 0
 * arrays.lowerBound(data, 6, numberCmp);   // 3
 * arrays.lowerBound(data, 7, numberCmp);   // 3
 * arrays.lowerBound(data, -1, numberCmp);  // 0
 * arrays.lowerBound(data, 10, numberCmp);  // 6
 * ```
 *
 * **See also** [[upperBound]]
 */
function lowerBound(array, value, cmp) {
    var begin = 0;
    var half;
    var middle;
    var n = array.length;
    while (n > 0) {
        half = n >> 1;
        middle = begin + half;
        if (cmp(array[middle], value)) {
            begin = middle + 1;
            n -= half + 1;
        }
        else {
            n = half;
        }
    }
    return begin;
}
exports.lowerBound = lowerBound;
/**
 * Using a binary search, find the index of the first element in an
 * array which compares `>` than a value.
 *
 * @param array - The array of values to be searched. It must be sorted
 *   in ascending order.
 *
 * @param value - The value to locate in the array.
 *
 * @param cmp - The comparison function which returns `true` if the
 *   the given value is less than an array element.
 *
 * @returns The index of the first element in `array` which compares
 *   `>` than `value`, or `array.length` if there is no such element.
 *
 * #### Notes
 * It is not safe for the comparison function to modify the array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function numberCmp(a: number, b: number): number {
 *   return a < b;
 * }
 *
 * let data = [0, 3, 4, 7, 7, 9];
 * arrays.upperBound(data, 0, numberCmp);   // 1
 * arrays.upperBound(data, 6, numberCmp);   // 3
 * arrays.upperBound(data, 7, numberCmp);   // 5
 * arrays.upperBound(data, -1, numberCmp);  // 0
 * arrays.upperBound(data, 10, numberCmp);  // 6
 * ```
 *
 * **See also** [[lowerBound]]
 */
function upperBound(array, value, cmp) {
    var begin = 0;
    var half;
    var middle;
    var n = array.length;
    while (n > 0) {
        half = n >> 1;
        middle = begin + half;
        if (cmp(value, array[middle])) {
            n = half;
        }
        else {
            begin = middle + 1;
            n -= half + 1;
        }
    }
    return begin;
}
exports.upperBound = upperBound;

},{}],5:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * The sizer object for the [[boxCalc]] function.
 *
 * A box sizer holds the geometry information for an object along the
 * layout orientation. An array of box sizers representing a line of
 * objects is passed to [[boxCalc]] along with the amount of space
 * available for layout. The algorithm will update the [[size]] of
 * each box sizer with its computed size.
 *
 * #### Notes
 * For best performance, this class should be treated as a raw data
 * struct. It should not typically be subclassed.
 */
var BoxSizer = (function () {
    function BoxSizer() {
        /**
         * The preferred size for the sizer.
         *
         * The sizer will be given this initial size subject to its size
         * bounds. The sizer will not deviate from this size unless such
         * deviation is required to fit into the available layout space.
         *
         * #### Notes
         * There is no limit to this value, but it will be clamped to the
         * bounds defined by [[minSize]] and [[maxSize]].
         *
         * The default value is `0`.
         */
        this.sizeHint = 0;
        /**
         * The minimum size of the sizer.
         *
         * The sizer will never be sized less than this value, even if
         * it means the sizer will overflow the available layout space.
         *
         * #### Notes
         * It is assumed that this value lies in the range `[0, Infinity)`
         * and that it is `<=` to [[maxSize]]. Failure to adhere to this
         * constraint will yield undefined results.
         *
         * The default value is `0`.
         */
        this.minSize = 0;
        /**
         * The maximum size of the sizer.
         *
         * The sizer will never be sized greater than this value, even if
         * it means the sizer will underflow the available layout space.
         *
         * #### Notes
         * It is assumed that this value lies in the range `[0, Infinity]`
         * and that it is `>=` to [[minSize]]. Failure to adhere to this
         * constraint will yield undefined results.
         *
         * The default value is `Infinity`.
         */
        this.maxSize = Infinity;
        /**
         * The stretch factor for the sizer.
         *
         * This controls how much the sizer stretches relative to its sibling
         * sizers when layout space is distributed. A stretch factor of zero
         * is special and will cause the sizer to only be resized after all
         * other sizers with a stretch factor greater than zero have been
         * resized to their limits.
         *
         * #### Notes
         * It is assumed that this value is an integer that lies in the range
         * `[0, Infinity)`. Failure to adhere to this constraint will yield
         * undefined results.
         *
         * The default value is `1`.
         */
        this.stretch = 1;
        /**
         * The computed size of the sizer.
         *
         * This value is the output of a call to [[boxCalc]]. It represents
         * the computed size for the object along the layout orientation,
         * and will always lie in the range `[minSize, maxSize]`.
         *
         * #### Notes
         * This value is output only. Changing the value will have no effect.
         */
        this.size = 0;
        /**
         * An internal storage property for the layout algorithm.
         *
         * #### Notes
         * This value is used as temporary storage by the layout algorithm.
         * Changing the value will have no effect.
         */
        this.done = false;
    }
    return BoxSizer;
})();
exports.BoxSizer = BoxSizer;
/**
 * Compute the optimal layout sizes for an array of box sizers.
 *
 * This distributes the available layout space among the box sizers
 * according to the following algorithm:
 *
 * 1. Initialize the sizers's size to its size hint and compute the
 *    sums for each of size hint, min size, and max size.
 *
 * 2. If the total size hint equals the available space, return.
 *
 * 3. If the available space is less than the total min size, set all
 *    sizers to their min size and return.
 *
 * 4. If the available space is greater than the total max size, set
 *    all sizers to their max size and return.
 *
 * 5. If the layout space is less than the total size hint, distribute
 *    the negative delta as follows:
 *
 *    a. Shrink each sizer with a stretch factor greater than zero by
 *       an amount proportional to the negative space and the sum of
 *       stretch factors. If the sizer reaches its min size, remove
 *       it and its stretch factor from the computation.
 *
 *    b. If after adjusting all stretch sizers there remains negative
 *       space, distribute the space equally among the sizers with a
 *       stretch factor of zero. If a sizer reaches its min size,
 *       remove it from the computation.
 *
 * 6. If the layout space is greater than the total size hint,
 *    distribute the positive delta as follows:
 *
 *    a. Expand each sizer with a stretch factor greater than zero by
 *       an amount proportional to the postive space and the sum of
 *       stretch factors. If the sizer reaches its max size, remove
 *       it and its stretch factor from the computation.
 *
 *    b. If after adjusting all stretch sizers there remains positive
 *       space, distribute the space equally among the sizers with a
 *       stretch factor of zero. If a sizer reaches its max size,
 *       remove it from the computation.
 *
 * 7. return
 *
 * @param sizers - The sizers for a particular layout line.
 *
 * @param space - The available layout space for the sizers.
 *
 * #### Notes
 * This function can be called at any time to recompute the layout
 * sizing for an existing array of sizers. The previously computed
 * results will have no effect on the new output. It is therefore
 * not necessary to create new sizers on each resize event.
 */
function boxCalc(sizers, space) {
    // Bail early if there is nothing to do.
    var count = sizers.length;
    if (count === 0) {
        return;
    }
    // Setup the size and stretch counters.
    var totalMin = 0;
    var totalMax = 0;
    var totalSize = 0;
    var totalStretch = 0;
    var stretchCount = 0;
    // Setup the sizers and compute the totals.
    for (var i = 0; i < count; ++i) {
        var sizer = sizers[i];
        initSizer(sizer);
        totalSize += sizer.size;
        totalMin += sizer.minSize;
        totalMax += sizer.maxSize;
        if (sizer.stretch > 0) {
            totalStretch += sizer.stretch;
            stretchCount++;
        }
    }
    // If the space is equal to the total size, return.
    if (space === totalSize) {
        return;
    }
    // If the space is less than the total min, minimize each sizer.
    if (space <= totalMin) {
        for (var i = 0; i < count; ++i) {
            var sizer = sizers[i];
            sizer.size = sizer.minSize;
        }
        return;
    }
    // If the space is greater than the total max, maximize each sizer.
    if (space >= totalMax) {
        for (var i = 0; i < count; ++i) {
            var sizer = sizers[i];
            sizer.size = sizer.maxSize;
        }
        return;
    }
    // The loops below perform sub-pixel precision sizing. A near zero
    // value is used for compares instead of zero to ensure that the
    // loop terminates when the subdivided space is reasonably small.
    var nearZero = 0.01;
    // A counter which is decremented each time a sizer is resized to
    // its limit. This ensures the loops terminate even if there is
    // space remaining to distribute.
    var notDoneCount = count;
    // Distribute negative delta space.
    if (space < totalSize) {
        // Shrink each stretchable sizer by an amount proportional to its
        // stretch factor. If a sizer reaches its min size it's marked as
        // done. The loop progresses in phases where each sizer is given
        // a chance to consume its fair share for the pass, regardless of
        // whether a sizer before it reached its limit. This continues
        // until the stretchable sizers or the free space is exhausted.
        var freeSpace = totalSize - space;
        while (stretchCount > 0 && freeSpace > nearZero) {
            var distSpace = freeSpace;
            var distStretch = totalStretch;
            for (var i = 0; i < count; ++i) {
                var sizer = sizers[i];
                if (sizer.done || sizer.stretch === 0) {
                    continue;
                }
                var amt = sizer.stretch * distSpace / distStretch;
                if (sizer.size - amt <= sizer.minSize) {
                    freeSpace -= sizer.size - sizer.minSize;
                    totalStretch -= sizer.stretch;
                    sizer.size = sizer.minSize;
                    sizer.done = true;
                    notDoneCount--;
                    stretchCount--;
                }
                else {
                    freeSpace -= amt;
                    sizer.size -= amt;
                }
            }
        }
        // Distribute any remaining space evenly among the non-stretchable
        // sizers. This progresses in phases in the same manner as above.
        while (notDoneCount > 0 && freeSpace > nearZero) {
            var amt = freeSpace / notDoneCount;
            for (var i = 0; i < count; ++i) {
                var sizer = sizers[i];
                if (sizer.done) {
                    continue;
                }
                if (sizer.size - amt <= sizer.minSize) {
                    freeSpace -= sizer.size - sizer.minSize;
                    sizer.size = sizer.minSize;
                    sizer.done = true;
                    notDoneCount--;
                }
                else {
                    freeSpace -= amt;
                    sizer.size -= amt;
                }
            }
        }
    }
    else {
        // Expand each stretchable sizer by an amount proportional to its
        // stretch factor. If a sizer reaches its max size it's marked as
        // done. The loop progresses in phases where each sizer is given
        // a chance to consume its fair share for the pass, regardless of
        // whether a sizer before it reached its limit. This continues
        // until the stretchable sizers or the free space is exhausted.
        var freeSpace = space - totalSize;
        while (stretchCount > 0 && freeSpace > nearZero) {
            var distSpace = freeSpace;
            var distStretch = totalStretch;
            for (var i = 0; i < count; ++i) {
                var sizer = sizers[i];
                if (sizer.done || sizer.stretch === 0) {
                    continue;
                }
                var amt = sizer.stretch * distSpace / distStretch;
                if (sizer.size + amt >= sizer.maxSize) {
                    freeSpace -= sizer.maxSize - sizer.size;
                    totalStretch -= sizer.stretch;
                    sizer.size = sizer.maxSize;
                    sizer.done = true;
                    notDoneCount--;
                    stretchCount--;
                }
                else {
                    freeSpace -= amt;
                    sizer.size += amt;
                }
            }
        }
        // Distribute any remaining space evenly among the non-stretchable
        // sizers. This progresses in phases in the same manner as above.
        while (notDoneCount > 0 && freeSpace > nearZero) {
            var amt = freeSpace / notDoneCount;
            for (var i = 0; i < count; ++i) {
                var sizer = sizers[i];
                if (sizer.done) {
                    continue;
                }
                if (sizer.size + amt >= sizer.maxSize) {
                    freeSpace -= sizer.maxSize - sizer.size;
                    sizer.size = sizer.maxSize;
                    sizer.done = true;
                    notDoneCount--;
                }
                else {
                    freeSpace -= amt;
                    sizer.size += amt;
                }
            }
        }
    }
}
exports.boxCalc = boxCalc;
/**
 * (Re)initialize a box sizer's data for a layout pass.
 */
function initSizer(sizer) {
    sizer.size = Math.max(sizer.minSize, Math.min(sizer.sizeHint, sizer.maxSize));
    sizer.done = false;
}

},{}],6:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * A disposable object which delegates to a callback.
 */
var DisposableDelegate = (function () {
    /**
     * Construct a new disposable delegate.
     *
     * @param callback - The function to invoke when the delegate is
     *   disposed.
     */
    function DisposableDelegate(callback) {
        this._callback = callback || null;
    }
    Object.defineProperty(DisposableDelegate.prototype, "isDisposed", {
        /**
         * Test whether the delegate has been disposed.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         */
        get: function () {
            return this._callback === null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose of the delegate and invoke its callback.
     *
     * #### Notes
     * If this method is called more than once, all calls made after the
     * first will be a no-op.
     */
    DisposableDelegate.prototype.dispose = function () {
        if (this._callback === null) {
            return;
        }
        var callback = this._callback;
        this._callback = null;
        callback();
    };
    return DisposableDelegate;
})();
exports.DisposableDelegate = DisposableDelegate;
/**
 * An object which manages a collection of disposable items.
 */
var DisposableSet = (function () {
    /**
     * Construct a new disposable set.
     *
     * @param items - The initial disposable items for the set.
     */
    function DisposableSet(items) {
        var _this = this;
        this._set = new Set();
        if (items)
            items.forEach(function (item) { _this._set.add(item); });
    }
    Object.defineProperty(DisposableSet.prototype, "isDisposed", {
        /**
         * Test whether the set has been disposed.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         */
        get: function () {
            return this._set === null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose of the set and dispose the items it contains.
     *
     * #### Notes
     * Items are disposed in the order they are added to the set.
     *
     * It is unsafe to use the set after it has been disposed.
     *
     * If this method is called more than once, all calls made after the
     * first will be a no-op.
     */
    DisposableSet.prototype.dispose = function () {
        if (this._set === null) {
            return;
        }
        var set = this._set;
        this._set = null;
        set.forEach(function (item) { item.dispose(); });
    };
    /**
     * Add a disposable item to the set.
     *
     * @param item - The disposable item to add to the set. If the item
     *   is already contained in the set, this is a no-op.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    DisposableSet.prototype.add = function (item) {
        if (this._set === null) {
            throw new Error('object is disposed');
        }
        this._set.add(item);
    };
    /**
     * Remove a disposable item from the set.
     *
     * @param item - The disposable item to remove from the set. If the
     *   item does not exist in the set, this is a no-op.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    DisposableSet.prototype.remove = function (item) {
        if (this._set === null) {
            throw new Error('object is disposed');
        }
        this._set.delete(item);
    };
    /**
     * Clear all disposable items from the set.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    DisposableSet.prototype.clear = function () {
        if (this._set === null) {
            throw new Error('object is disposed');
        }
        this._set.clear();
    };
    return DisposableSet;
})();
exports.DisposableSet = DisposableSet;

},{}],7:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\nbody.p-mod-override-cursor * {\n  cursor: inherit !important;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-domutil/lib/index.css"})); module.exports = css;
},{"browserify-css":3}],8:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphor_disposable_1 = require('phosphor-disposable');
require('./index.css');
/**
 * The class name added to the document body during cursor override.
 */
var OVERRIDE_CURSOR_CLASS = 'p-mod-override-cursor';
/**
 * The id for the active cursor override.
 */
var overrideID = 0;
/**
 * Override the cursor for the entire document.
 *
 * @param cursor - The string representing the cursor style.
 *
 * @returns A disposable which will clear the override when disposed.
 *
 * #### Notes
 * The most recent call to `overrideCursor` takes precedence. Disposing
 * an old override is a no-op and will not effect the current override.
 *
 * #### Example
 * ```typescript
 * import { overrideCursor } from 'phosphor-domutil';
 *
 * // force the cursor to be 'wait' for the entire document
 * let override = overrideCursor('wait');
 *
 * // clear the override by disposing the return value
 * override.dispose();
 * ```
 */
function overrideCursor(cursor) {
    var id = ++overrideID;
    var body = document.body;
    body.style.cursor = cursor;
    body.classList.add(OVERRIDE_CURSOR_CLASS);
    return new phosphor_disposable_1.DisposableDelegate(function () {
        if (id === overrideID) {
            body.style.cursor = '';
            body.classList.remove(OVERRIDE_CURSOR_CLASS);
        }
    });
}
exports.overrideCursor = overrideCursor;
/**
 * Test whether a client position lies within a node.
 *
 * @param node - The DOM node of interest.
 *
 * @param clientX - The client X coordinate of interest.
 *
 * @param clientY - The client Y coordinate of interest.
 *
 * @returns `true` if the node covers the position, `false` otherwise.
 *
 * #### Example
 * ```typescript
 * import { hitTest } from 'phosphor-domutil';
 *
 * let div = document.createElement('div');
 * div.style.position = 'absolute';
 * div.style.left = '0px';
 * div.style.top = '0px';
 * div.style.width = '100px';
 * div.style.height = '100px';
 * document.body.appendChild(div);
 *
 * hitTest(div, 50, 50);   // true
 * hitTest(div, 150, 150); // false
 * ```
 */
function hitTest(node, clientX, clientY) {
    var rect = node.getBoundingClientRect();
    return (clientX >= rect.left &&
        clientX < rect.right &&
        clientY >= rect.top &&
        clientY < rect.bottom);
}
exports.hitTest = hitTest;
/**
 * Compute the box sizing for a DOM node.
 *
 * @param node - The DOM node for which to compute the box sizing.
 *
 * @returns The box sizing data for the specified DOM node.
 *
 * #### Example
 * ```typescript
 * import { boxSizing } from 'phosphor-domutil';
 *
 * let div = document.createElement('div');
 * div.style.borderTop = 'solid 10px black';
 * document.body.appendChild(div);
 *
 * let sizing = boxSizing(div);
 * sizing.borderTop;    // 10
 * sizing.paddingLeft;  // 0
 * // etc...
 * ```
 */
function boxSizing(node) {
    var cstyle = window.getComputedStyle(node);
    var bt = parseInt(cstyle.borderTopWidth, 10) || 0;
    var bl = parseInt(cstyle.borderLeftWidth, 10) || 0;
    var br = parseInt(cstyle.borderRightWidth, 10) || 0;
    var bb = parseInt(cstyle.borderBottomWidth, 10) || 0;
    var pt = parseInt(cstyle.paddingTop, 10) || 0;
    var pl = parseInt(cstyle.paddingLeft, 10) || 0;
    var pr = parseInt(cstyle.paddingRight, 10) || 0;
    var pb = parseInt(cstyle.paddingBottom, 10) || 0;
    var hs = bl + pl + pr + br;
    var vs = bt + pt + pb + bb;
    return {
        borderTop: bt,
        borderLeft: bl,
        borderRight: br,
        borderBottom: bb,
        paddingTop: pt,
        paddingLeft: pl,
        paddingRight: pr,
        paddingBottom: pb,
        horizontalSum: hs,
        verticalSum: vs,
    };
}
exports.boxSizing = boxSizing;
/**
 * Compute the size limits for a DOM node.
 *
 * @param node - The node for which to compute the size limits.
 *
 * @returns The size limit data for the specified DOM node.
 *
 * #### Example
 * ```typescript
 * import { sizeLimits } from 'phosphor-domutil';
 *
 * let div = document.createElement('div');
 * div.style.minWidth = '90px';
 * document.body.appendChild(div);
 *
 * let limits = sizeLimits(div);
 * limits.minWidth;   // 90
 * limits.maxHeight;  // Infinity
 * // etc...
 * ```
 */
function sizeLimits(node) {
    var cstyle = window.getComputedStyle(node);
    return {
        minWidth: parseInt(cstyle.minWidth, 10) || 0,
        minHeight: parseInt(cstyle.minHeight, 10) || 0,
        maxWidth: parseInt(cstyle.maxWidth, 10) || Infinity,
        maxHeight: parseInt(cstyle.maxHeight, 10) || Infinity,
    };
}
exports.sizeLimits = sizeLimits;

},{"./index.css":7,"phosphor-disposable":6}],9:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphor_queue_1 = require('phosphor-queue');
/**
 * A mesage which can be sent or posted to a message handler.
 *
 * #### Notes
 * This class may be subclassed to create complex message types.
 *
 * **See Also** [[postMessage]] and [[sendMessage]].
 */
var Message = (function () {
    /**
     * Construct a new message.
     *
     * @param type - The type of the message. Consumers of a message will
     *   use this value to cast the message to the appropriately derived
     *   message type.
     */
    function Message(type) {
        this._type = type;
    }
    Object.defineProperty(Message.prototype, "type", {
        /**
         * Get the type of the message.
         */
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return Message;
})();
exports.Message = Message;
/**
 * Send a message to the message handler to process immediately.
 *
 * @param handler - The handler which should process the message.
 *
 * @param msg - The message to send to the handler.
 *
 * #### Notes
 * Unlike [[postMessage]], [[sendMessage]] delivers the message to
 * the handler immediately. The handler will not have the opportunity
 * to compress the message, however the message will still be sent
 * through any installed message filters.
 *
 * **See Also** [[postMessage]].
 */
function sendMessage(handler, msg) {
    getDispatcher(handler).sendMessage(handler, msg);
}
exports.sendMessage = sendMessage;
/**
 * Post a message to the message handler to process in the future.
 *
 * @param handler - The handler which should process the message.
 *
 * @param msg - The message to post to the handler.
 *
 * #### Notes
 * Unlike [[sendMessage]], [[postMessage]] will schedule the deliver of
 * the message for the next cycle of the event loop. The handler will
 * have the opportunity to compress the message in order to optimize
 * its handling of similar messages. The message will be sent through
 * any installed message filters before being delivered to the handler.
 *
 * **See Also** [[sendMessage]].
 */
function postMessage(handler, msg) {
    getDispatcher(handler).postMessage(handler, msg);
}
exports.postMessage = postMessage;
/**
 * Test whether a message handler has posted messages pending delivery.
 *
 * @param handler - The message handler of interest.
 *
 * @returns `true` if the handler has pending posted messages, `false`
 *   otherwise.
 *
 * **See Also** [[sendPendingMessage]].
 */
function hasPendingMessages(handler) {
    return getDispatcher(handler).hasPendingMessages();
}
exports.hasPendingMessages = hasPendingMessages;
/**
 * Send the first pending posted message to the message handler.
 *
 * @param handler - The message handler of interest.
 *
 * #### Notes
 * If the handler has no pending messages, this is a no-op.
 *
 * **See Also** [[hasPendingMessages]].
 */
function sendPendingMessage(handler) {
    getDispatcher(handler).sendPendingMessage(handler);
}
exports.sendPendingMessage = sendPendingMessage;
/**
 * Install a message filter for a message handler.
 *
 * A message filter is invoked before the message handler processes a
 * message. If the filter returns `true` from its [[filterMessage]] method,
 * no other filters will be invoked, and the message will not be delivered.
 *
 * The most recently installed message filter is executed first.
 *
 * @param handler - The handler whose messages should be filtered.
 *
 * @param filter - The filter to install for the handler.
 *
 * #### Notes
 * It is possible to install the same filter multiple times. If the
 * filter should be unique, call [[removeMessageFilter]] first.
 *
 * **See Also** [[removeMessageFilter]].
 */
function installMessageFilter(handler, filter) {
    getDispatcher(handler).installMessageFilter(filter);
}
exports.installMessageFilter = installMessageFilter;
/**
 * Remove a previously installed message filter for a message handler.
 *
 * @param handler - The handler for which the filter is installed.
 *
 * @param filter - The filter to remove.
 *
 * #### Notes
 * This will remove **all** occurrences of the filter. If the filter is
 * not installed, this is a no-op.
 *
 * It is safe to call this function while the filter is executing.
 *
 * **See Also** [[installMessageFilter]].
 */
function removeMessageFilter(handler, filter) {
    getDispatcher(handler).removeMessageFilter(filter);
}
exports.removeMessageFilter = removeMessageFilter;
/**
 * Clear all message data associated with the message handler.
 *
 * @param handler - The message handler for which to clear the data.
 *
 * #### Notes
 * This will remove all pending messages and filters for the handler.
 */
function clearMessageData(handler) {
    var dispatcher = dispatcherMap.get(handler);
    if (dispatcher)
        dispatcher.clear();
    dispatchQueue.removeAll(handler);
}
exports.clearMessageData = clearMessageData;
/**
 * The internal mapping of message handler to message dispatcher
 */
var dispatcherMap = new WeakMap();
/**
 * The internal queue of pending message handlers.
 */
var dispatchQueue = new phosphor_queue_1.Queue();
/**
 * The internal animation frame id for the message loop wake up call.
 */
var frameId = void 0;
/**
 * A local reference to an event loop hook.
 */
var raf;
if (typeof requestAnimationFrame === 'function') {
    raf = requestAnimationFrame;
}
else {
    raf = setImmediate;
}
/**
 * Get or create the message dispatcher for a message handler.
 */
function getDispatcher(handler) {
    var dispatcher = dispatcherMap.get(handler);
    if (dispatcher)
        return dispatcher;
    dispatcher = new MessageDispatcher();
    dispatcherMap.set(handler, dispatcher);
    return dispatcher;
}
/**
 * Wake up the message loop to process any pending dispatchers.
 *
 * This is a no-op if a wake up is not needed or is already pending.
 */
function wakeUpMessageLoop() {
    if (frameId === void 0 && !dispatchQueue.empty) {
        frameId = raf(runMessageLoop);
    }
}
/**
 * Run an iteration of the message loop.
 *
 * This will process all pending dispatchers in the queue. Dispatchers
 * which are added to the queue while the message loop is running will
 * be processed on the next message loop cycle.
 */
function runMessageLoop() {
    // Clear the frame id so the next wake up call can be scheduled.
    frameId = void 0;
    // If the queue is empty, there is nothing else to do.
    if (dispatchQueue.empty) {
        return;
    }
    // Add a null sentinel value to the end of the queue. The queue
    // will only be processed up to the first null value. This means
    // that messages posted during this cycle will execute on the next
    // cycle of the loop. If the last value in the array is null, it
    // means that an exception was thrown by a message handler and the
    // loop had to be restarted.
    if (dispatchQueue.back !== null) {
        dispatchQueue.push(null);
    }
    // The message dispatch loop. If the dispatcher is the null sentinel,
    // the processing of the current block of messages is complete and
    // another loop is scheduled. Otherwise, the pending message is
    // dispatched to the message handler.
    while (!dispatchQueue.empty) {
        var handler = dispatchQueue.pop();
        if (handler === null) {
            wakeUpMessageLoop();
            return;
        }
        dispatchMessage(dispatcherMap.get(handler), handler);
    }
}
/**
 * Safely process the pending handler message.
 *
 * If the message handler throws an exception, the message loop will
 * be restarted and the exception will be rethrown.
 */
function dispatchMessage(dispatcher, handler) {
    try {
        dispatcher.sendPendingMessage(handler);
    }
    catch (ex) {
        wakeUpMessageLoop();
        throw ex;
    }
}
/**
 * An internal class which manages message dispatching for a handler.
 */
var MessageDispatcher = (function () {
    function MessageDispatcher() {
        this._filters = null;
        this._messages = null;
    }
    /**
     * Send a message to the handler immediately.
     *
     * The message will first be sent through installed filters.
     */
    MessageDispatcher.prototype.sendMessage = function (handler, msg) {
        if (!this._filterMessage(handler, msg)) {
            handler.processMessage(msg);
        }
    };
    /**
     * Post a message for delivery in the future.
     *
     * The message will first be compressed if possible.
     */
    MessageDispatcher.prototype.postMessage = function (handler, msg) {
        if (!this._compressMessage(handler, msg)) {
            this._enqueueMessage(handler, msg);
        }
    };
    /**
     * Test whether the dispatcher has messages pending delivery.
     */
    MessageDispatcher.prototype.hasPendingMessages = function () {
        return !!(this._messages && !this._messages.empty);
    };
    /**
     * Send the first pending message to the message handler.
     */
    MessageDispatcher.prototype.sendPendingMessage = function (handler) {
        if (this._messages && !this._messages.empty) {
            this.sendMessage(handler, this._messages.pop());
        }
    };
    /**
     * Install a message filter for the dispatcher.
     */
    MessageDispatcher.prototype.installMessageFilter = function (filter) {
        this._filters = { next: this._filters, filter: filter };
    };
    /**
     * Remove all occurrences of a message filter from the dispatcher.
     */
    MessageDispatcher.prototype.removeMessageFilter = function (filter) {
        var link = this._filters;
        var prev = null;
        while (link !== null) {
            if (link.filter === filter) {
                link.filter = null;
            }
            else if (prev === null) {
                this._filters = link;
                prev = link;
            }
            else {
                prev.next = link;
                prev = link;
            }
            link = link.next;
        }
        if (!prev) {
            this._filters = null;
        }
        else {
            prev.next = null;
        }
    };
    /**
     * Clear all messages and filters from the dispatcher.
     */
    MessageDispatcher.prototype.clear = function () {
        if (this._messages) {
            this._messages.clear();
        }
        for (var link = this._filters; link !== null; link = link.next) {
            link.filter = null;
        }
        this._filters = null;
    };
    /**
     * Run the installed message filters for the handler.
     *
     * Returns `true` if the message was filtered, `false` otherwise.
     */
    MessageDispatcher.prototype._filterMessage = function (handler, msg) {
        for (var link = this._filters; link !== null; link = link.next) {
            if (link.filter && link.filter.filterMessage(handler, msg)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Compress the mssage for the given handler.
     *
     * Returns `true` if the message was compressed, `false` otherwise.
     */
    MessageDispatcher.prototype._compressMessage = function (handler, msg) {
        if (!handler.compressMessage) {
            return false;
        }
        if (!this._messages || this._messages.empty) {
            return false;
        }
        return handler.compressMessage(msg, this._messages);
    };
    /**
     * Enqueue the message for future delivery to the handler.
     */
    MessageDispatcher.prototype._enqueueMessage = function (handler, msg) {
        (this._messages || (this._messages = new phosphor_queue_1.Queue())).push(msg);
        dispatchQueue.push(handler);
        wakeUpMessageLoop();
    };
    return MessageDispatcher;
})();

},{"phosphor-queue":13}],10:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * A base class for creating objects which wrap a DOM node.
 */
var NodeWrapper = (function () {
    function NodeWrapper() {
        this._node = this.constructor.createNode();
    }
    /**
     * Create the DOM node for a new node wrapper instance.
     *
     * @returns The DOM node to use with the node wrapper instance.
     *
     * #### Notes
     * The default implementation creates an empty `<div>`.
     *
     * This may be reimplemented by a subclass to create a custom node.
     */
    NodeWrapper.createNode = function () {
        return document.createElement('div');
    };
    Object.defineProperty(NodeWrapper.prototype, "node", {
        /**
         * Get the DOM node managed by the wrapper.
         *
         * #### Notes
         * This property is read-only.
         */
        get: function () {
            return this._node;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeWrapper.prototype, "id", {
        /**
         * Get the id of the wrapper's DOM node.
         */
        get: function () {
            return this._node.id;
        },
        /**
         * Set the id of the wrapper's DOM node.
         */
        set: function (value) {
            this._node.id = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Test whether the wrapper's DOM node has the given class name.
     *
     * @param name - The class name of interest.
     *
     * @returns `true` if the node has the class, `false` otherwise.
     */
    NodeWrapper.prototype.hasClass = function (name) {
        return this._node.classList.contains(name);
    };
    /**
     * Add a class name to the wrapper's DOM node.
     *
     * @param name - The class name to add to the node.
     *
     * #### Notes
     * If the class name is already added to the node, this is a no-op.
     */
    NodeWrapper.prototype.addClass = function (name) {
        this._node.classList.add(name);
    };
    /**
     * Remove a class name from the wrapper's DOM node.
     *
     * @param name - The class name to remove from the node.
     *
     * #### Notes
     * If the class name is not yet added to the node, this is a no-op.
     */
    NodeWrapper.prototype.removeClass = function (name) {
        this._node.classList.remove(name);
    };
    /**
     * Toggle a class name on the wrapper's DOM node.
     *
     * @param name - The class name to toggle on the node.
     *
     * @param force - Whether to force add the class (`true`) or force
     *   remove the class (`false`). If not provided, the presence of
     *   the class will be toggled from its current state.
     *
     * @returns `true` if the class is now present, `false` otherwise.
     */
    NodeWrapper.prototype.toggleClass = function (name, force) {
        var present;
        if (force === true) {
            this.addClass(name);
            present = true;
        }
        else if (force === false) {
            this.removeClass(name);
            present = false;
        }
        else if (this.hasClass(name)) {
            this.removeClass(name);
            present = false;
        }
        else {
            this.addClass(name);
            present = true;
        }
        return present;
    };
    return NodeWrapper;
})();
exports.NodeWrapper = NodeWrapper;

},{}],11:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var arrays = require('phosphor-arrays');
var phosphor_signaling_1 = require('phosphor-signaling');
/**
 * An enum of the change types which occur on an observable list.
 */
(function (ListChangeType) {
    /**
     * An item was added to the list.
     */
    ListChangeType[ListChangeType["Add"] = 0] = "Add";
    /**
     * An item was moved in the list.
     */
    ListChangeType[ListChangeType["Move"] = 1] = "Move";
    /**
     * An item was removed from the list.
     */
    ListChangeType[ListChangeType["Remove"] = 2] = "Remove";
    /**
     * Items were replaced in the list.
     */
    ListChangeType[ListChangeType["Replace"] = 3] = "Replace";
    /**
     * An item was set in the list.
     */
    ListChangeType[ListChangeType["Set"] = 4] = "Set";
})(exports.ListChangeType || (exports.ListChangeType = {}));
var ListChangeType = exports.ListChangeType;
/**
 * A concrete implementation of [[IObservableList]].
 */
var ObservableList = (function () {
    /**
     * Construct a new observable list.
     *
     * @param items - The initial items for the list.
     */
    function ObservableList(items) {
        this.internal = items ? items.slice() : [];
    }
    Object.defineProperty(ObservableList.prototype, "changed", {
        /**
         * A signal emitted when the list has changed.
         *
         * #### Notes
         * This is a pure delegate to the [[changedSignal]].
         */
        get: function () {
            return ObservableList.changedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObservableList.prototype, "length", {
        /**
         * The number of items in the list.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this.internal.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the item at a specific index in the list.
     *
     * @param index - The index of the item of interest. If this is
     *   negative, it is offset from the end of the list.
     *
     * @returns The item at the specified index, or `undefined` if the
     *   index is out of range.
     */
    ObservableList.prototype.get = function (index) {
        return this.internal[this._norm(index)];
    };
    /**
     * Test whether the list contains a specific item.
     *
     * @param item - The item of interest.
     *
     * @returns `true` if the list contains the item, `false` otherwise.
     */
    ObservableList.prototype.contains = function (item) {
        return this.internal.indexOf(item) !== -1;
    };
    /**
     * Get the index of the first occurence of an item in the list.
     *
     * @param item - The item of interest.
     *
     * @returns The index of the specified item or `-1` if the item is
     *   not contained in the list.
     */
    ObservableList.prototype.indexOf = function (item) {
        return this.internal.indexOf(item);
    };
    /**
     * Get a shallow copy of a portion of the list.
     *
     * @param start - The start index of the slice, inclusive. If this is
     *   negative, it is offset from the end of the list. If this is not
     *   provided, it defaults to `0`. In all cases, it is clamped to the
     *   bounds of the list.
     *
     * @param end - The end index of the slice, exclusive. If this is
     *   negative, it is offset from the end of the list. If this is not
     *   provided, it defaults to `length`. In all cases, it is clamped
     *   to the bounds of the list.
     *
     * @returns A new array containing the specified range of items.
     */
    ObservableList.prototype.slice = function (start, end) {
        return this.internal.slice(start, end);
    };
    /**
     * Set the item at a specific index.
     *
     * @param index - The index of interest. If this is negative, it is
     *   offset from the end of the list.
     *
     * @param item - The item to set at the index.
     *
     * @returns The item which occupied the index, or `undefined` if the
     *   index is out of range.
     */
    ObservableList.prototype.set = function (index, item) {
        var i = this._norm(index);
        if (!this._check(i))
            return void 0;
        return this.setItem(i, item);
    };
    /**
     * Replace the contents of the list with the specified items.
     *
     * @param items - The items to assign to the list.
     *
     * @returns An array of the previous list items.
     *
     * #### Notes
     * This is equivalent to `list.replace(0, list.length, items)`.
     */
    ObservableList.prototype.assign = function (items) {
        return this.replaceItems(0, this.internal.length, items);
    };
    /**
     * Add an item to the end of the list.
     *
     * @param item - The item to add to the list.
     *
     * @returns The index at which the item was added.
     */
    ObservableList.prototype.add = function (item) {
        return this.addItem(this.internal.length, item);
    };
    /**
     * Insert an item into the list at a specific index.
     *
     * @param index - The index at which to insert the item. If this is
     *   negative, it is offset from the end of the list. In all cases,
     *   it is clamped to the bounds of the list.
     *
     * @param item - The item to insert into the list.
     *
     * @returns The index at which the item was inserted.
     */
    ObservableList.prototype.insert = function (index, item) {
        return this.addItem(this._clamp(index), item);
    };
    /**
     * Move an item from one index to another.
     *
     * @param fromIndex - The index of the item of interest. If this is
     *   negative, it is offset from the end of the list.
     *
     * @param toIndex - The desired index for the item. If this is
     *   negative, it is offset from the end of the list.
     *
     * @returns `true` if the item was moved, `false` otherwise.
     */
    ObservableList.prototype.move = function (fromIndex, toIndex) {
        var i = this._norm(fromIndex);
        if (!this._check(i))
            return false;
        var j = this._norm(toIndex);
        if (!this._check(j))
            return false;
        return this.moveItem(i, j);
    };
    /**
     * Remove the first occurrence of a specific item from the list.
     *
     * @param item - The item to remove from the list.
     *
     * @return The index occupied by the item, or `-1` if the item is
     *   not contained in the list.
     */
    ObservableList.prototype.remove = function (item) {
        var i = this.internal.indexOf(item);
        if (i !== -1)
            this.removeItem(i);
        return i;
    };
    /**
     * Remove the item at a specific index.
     *
     * @param index - The index of the item of interest. If this is
     *   negative, it is offset from the end of the list.
     *
     * @returns The item at the specified index, or `undefined` if the
     *   index is out of range.
     */
    ObservableList.prototype.removeAt = function (index) {
        var i = this._norm(index);
        if (!this._check(i))
            return void 0;
        return this.removeItem(i);
    };
    /**
     * Replace items at a specific location in the list.
     *
     * @param index - The index at which to modify the list. If this is
     *   negative, it is offset from the end of the list. In all cases,
     *   it is clamped to the bounds of the list.
     *
     * @param count - The number of items to remove at the given index.
     *   This is clamped to the length of the list.
     *
     * @param items - The items to insert at the specified index.
     *
     * @returns An array of the items removed from the list.
     */
    ObservableList.prototype.replace = function (index, count, items) {
        return this.replaceItems(this._norm(index), this._limit(count), items);
    };
    /**
     * Remove all items from the list.
     *
     * @returns An array of the items removed from the list.
     *
     * #### Notes
     * This is equivalent to `list.replace(0, list.length, [])`.
     */
    ObservableList.prototype.clear = function () {
        return this.replaceItems(0, this.internal.length, []);
    };
    /**
     * Add an item to the list at the specified index.
     *
     * @param index - The index at which to add the item. This must be
     *   an integer in the range `[0, internal.length]`.
     *
     * @param item - The item to add at the specified index.
     *
     * @returns The index at which the item was added.
     *
     * #### Notes
     * This may be reimplemented by subclasses to customize the behavior.
     */
    ObservableList.prototype.addItem = function (index, item) {
        var i = arrays.insert(this.internal, index, item);
        this.changed.emit({
            type: ListChangeType.Add,
            newIndex: i,
            newValue: item,
            oldIndex: -1,
            oldValue: void 0,
        });
        return i;
    };
    /**
     * Move an item in the list from one index to another.
     *
     * @param fromIndex - The initial index of the item. This must be
     *   an integer in the range `[0, internal.length)`.
     *
     * @param toIndex - The desired index for the item. This must be
     *   an integer in the range `[0, internal.length)`.
     *
     * @returns `true` if the item was moved, `false` otherwise.
     *
     * #### Notes
     * This may be reimplemented by subclasses to customize the behavior.
     */
    ObservableList.prototype.moveItem = function (fromIndex, toIndex) {
        if (!arrays.move(this.internal, fromIndex, toIndex)) {
            return false;
        }
        var item = this.internal[toIndex];
        this.changed.emit({
            type: ListChangeType.Move,
            newIndex: toIndex,
            newValue: item,
            oldIndex: fromIndex,
            oldValue: item,
        });
        return true;
    };
    /**
     * Remove the item from the list at the specified index.
     *
     * @param index - The index of the item to remove. This must be
     *   an integer in the range `[0, internal.length)`.
     *
     * @returns The item removed from the list.
     *
     * #### Notes
     * This may be reimplemented by subclasses to customize the behavior.
     */
    ObservableList.prototype.removeItem = function (index) {
        var item = arrays.removeAt(this.internal, index);
        this.changed.emit({
            type: ListChangeType.Remove,
            newIndex: -1,
            newValue: void 0,
            oldIndex: index,
            oldValue: item,
        });
        return item;
    };
    /**
     * Replace items at a specific location in the list.
     *
     * @param index - The index at which to modify the list. This must
     *   be an integer in the range `[0, internal.length]`.
     *
     * @param count - The number of items to remove from the list. This
     *   must be an integer in the range `[0, internal.length]`.
     *
     * @param items - The items to insert at the specified index.
     *
     * @returns An array of the items removed from the list.
     *
     * #### Notes
     * This may be reimplemented by subclasses to customize the behavior.
     */
    ObservableList.prototype.replaceItems = function (index, count, items) {
        var old = (_a = this.internal).splice.apply(_a, [index, count].concat(items));
        this.changed.emit({
            type: ListChangeType.Replace,
            newIndex: index,
            newValue: items,
            oldIndex: index,
            oldValue: old,
        });
        return old;
        var _a;
    };
    /**
     * Set the item at a specific index in the list.
     *
     * @param index - The index of interest. This must be an integer in
     *   the range `[0, internal.length)`.
     *
     * @param item - The item to set at the index.
     *
     * @returns The item which previously occupied the specified index.
     *
     * #### Notes
     * This may be reimplemented by subclasses to customize the behavior.
     */
    ObservableList.prototype.setItem = function (index, item) {
        var old = this.internal[index];
        this.internal[index] = item;
        this.changed.emit({
            type: ListChangeType.Set,
            newIndex: index,
            newValue: item,
            oldIndex: index,
            oldValue: old,
        });
        return old;
    };
    /**
     * Normalize an index and offset negative values from the list end.
     */
    ObservableList.prototype._norm = function (i) {
        return i < 0 ? Math.floor(i) + this.internal.length : Math.floor(i);
    };
    /**
     * Check whether a normalized index is in range.
     */
    ObservableList.prototype._check = function (i) {
        return i >= 0 && i < this.internal.length;
    };
    /**
     * Normalize and clamp an index to the list bounds.
     */
    ObservableList.prototype._clamp = function (i) {
        return Math.max(0, Math.min(this._norm(i), this.internal.length));
    };
    /**
     * Normalize and limit a count to the length of the list.
     */
    ObservableList.prototype._limit = function (c) {
        return Math.max(0, Math.min(Math.floor(c), this.internal.length));
    };
    /**
     * A signal emitted when the list has changed.
     *
     * **See also:** [[changed]]
     */
    ObservableList.changedSignal = new phosphor_signaling_1.Signal();
    return ObservableList;
})();
exports.ObservableList = ObservableList;

},{"phosphor-arrays":4,"phosphor-signaling":14}],12:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * A property descriptor for a datum belonging to an object.
 *
 * Property descriptors can be used to expose a rich interface for an
 * object which encapsulates value creation, coercion, and notification.
 * They can also be used to extend the state of an object with semantic
 * data from an unrelated class.
 */
var Property = (function () {
    /**
     * Construct a new property descriptor.
     *
     * @param options - The options for initializing the property.
     */
    function Property(options) {
        this._pid = nextPID();
        this._name = options.name;
        this._value = options.value;
        this._create = options.create;
        this._coerce = options.coerce;
        this._compare = options.compare;
        this._changed = options.changed;
        this._notify = options.notify;
    }
    Object.defineProperty(Property.prototype, "name", {
        /**
         * Get the human readable name for the property.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Property.prototype, "notify", {
        /**
         * Get the notify signal for the property.
         *
         * #### Notes
         * This will be `undefined` if no notify signal was provided.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._notify;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the current value of the property for a given owner.
     *
     * @param owner - The property owner of interest.
     *
     * @returns The current value of the property.
     *
     * #### Notes
     * If the value has not yet been set, the default value will be
     * computed and assigned as the current value of the property.
     */
    Property.prototype.get = function (owner) {
        var value;
        var hash = lookupHash(owner);
        if (this._pid in hash) {
            value = hash[this._pid];
        }
        else {
            value = hash[this._pid] = this._createValue(owner);
        }
        return value;
    };
    /**
     * Set the current value of the property for a given owner.
     *
     * @param owner - The property owner of interest.
     *
     * @param value - The value for the property.
     *
     * #### Notes
     * If the value has not yet been set, the default value will be
     * computed and used as the previous value for the comparison.
     */
    Property.prototype.set = function (owner, value) {
        var oldValue;
        var hash = lookupHash(owner);
        if (this._pid in hash) {
            oldValue = hash[this._pid];
        }
        else {
            oldValue = hash[this._pid] = this._createValue(owner);
        }
        var newValue = this._coerceValue(owner, value);
        this._maybeNotify(owner, oldValue, hash[this._pid] = newValue);
    };
    /**
     * Explicitly coerce the current property value for a given owner.
     *
     * @param owner - The property owner of interest.
     *
     * #### Notes
     * If the value has not yet been set, the default value will be
     * computed and used as the previous value for the comparison.
     */
    Property.prototype.coerce = function (owner) {
        var oldValue;
        var hash = lookupHash(owner);
        if (this._pid in hash) {
            oldValue = hash[this._pid];
        }
        else {
            oldValue = hash[this._pid] = this._createValue(owner);
        }
        var newValue = this._coerceValue(owner, oldValue);
        this._maybeNotify(owner, oldValue, hash[this._pid] = newValue);
    };
    /**
     * Get or create the default value for the given owner.
     */
    Property.prototype._createValue = function (owner) {
        var create = this._create;
        return create ? create(owner) : this._value;
    };
    /**
     * Coerce the value for the given owner.
     */
    Property.prototype._coerceValue = function (owner, value) {
        var coerce = this._coerce;
        return coerce ? coerce(owner, value) : value;
    };
    /**
     * Compare the old value and new value for equality.
     */
    Property.prototype._compareValue = function (oldValue, newValue) {
        var compare = this._compare;
        return compare ? compare(oldValue, newValue) : oldValue === newValue;
    };
    /**
     * Run the change notification if the given values are different.
     */
    Property.prototype._maybeNotify = function (owner, oldValue, newValue) {
        var changed = this._changed;
        var notify = this._notify;
        if (!changed && !notify) {
            return;
        }
        if (this._compareValue(oldValue, newValue)) {
            return;
        }
        if (changed) {
            changed(owner, oldValue, newValue);
        }
        if (notify) {
            notify.bind(owner).emit({ name: this._name, oldValue: oldValue, newValue: newValue });
        }
    };
    return Property;
})();
exports.Property = Property;
/**
 * Clear the stored property data for the given property owner.
 *
 * @param owner - The property owner of interest.
 *
 * #### Notes
 * This will clear all property values for the owner, but it will
 * **not** run the change notification for any of the properties.
 */
function clearPropertyData(owner) {
    ownerData.delete(owner);
}
exports.clearPropertyData = clearPropertyData;
/**
 * A weak mapping of property owner to property hash.
 */
var ownerData = new WeakMap();
/**
 * A function which computes successive unique property ids.
 */
var nextPID = (function () { var id = 0; return function () { return 'pid-' + id++; }; })();
/**
 * Lookup the data hash for the property owner.
 *
 * This will create the hash if one does not already exist.
 */
function lookupHash(owner) {
    var hash = ownerData.get(owner);
    if (hash !== void 0)
        return hash;
    hash = Object.create(null);
    ownerData.set(owner, hash);
    return hash;
}

},{}],13:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * A generic FIFO queue data structure.
 *
 * #### Notes
 * This queue is implemented internally using a singly linked list and
 * can grow to arbitrary size.
 *
 * #### Example
 * ```typescript
 * var q = new Queue<number>([0, 1, 2]);
 * q.size;      // 3
 * q.empty;     // false
 * q.pop();     // 0
 * q.pop();     // 1
 * q.push(42);  // undefined
 * q.size;      // 2
 * q.pop();     // 2
 * q.pop();     // 42
 * q.pop();     // undefined
 * q.size;      // 0
 * q.empty;     // true
 * ```
 */
var Queue = (function () {
    /**
     * Construct a new queue.
     *
     * @param items - The initial items for the queue.
     */
    function Queue(items) {
        var _this = this;
        this._size = 0;
        this._front = null;
        this._back = null;
        if (items)
            items.forEach(function (item) { return _this.push(item); });
    }
    Object.defineProperty(Queue.prototype, "size", {
        /**
         * Get the number of elements in the queue.
         *
         * #### Notes
         * This has `O(1)` complexity.
         */
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "empty", {
        /**
         * Test whether the queue is empty.
         *
         * #### Notes
         * This has `O(1)` complexity.
         */
        get: function () {
            return this._size === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "front", {
        /**
         * Get the value at the front of the queue.
         *
         * #### Notes
         * This has `O(1)` complexity.
         *
         * If the queue is empty, this value will be `undefined`.
         */
        get: function () {
            return this._front !== null ? this._front.value : void 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "back", {
        /**
         * Get the value at the back of the queue.
         *
         * #### Notes
         * This has `O(1)` complexity.
         *
         * If the queue is empty, this value will be `undefined`.
         */
        get: function () {
            return this._back !== null ? this._back.value : void 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Push a value onto the back of the queue.
     *
     * @param value - The value to add to the queue.
     *
     * #### Notes
     * This has `O(1)` complexity.
     */
    Queue.prototype.push = function (value) {
        var link = { next: null, value: value };
        if (this._back === null) {
            this._front = link;
            this._back = link;
        }
        else {
            this._back.next = link;
            this._back = link;
        }
        this._size++;
    };
    /**
     * Pop and return the value at the front of the queue.
     *
     * @returns The value at the front of the queue.
     *
     * #### Notes
     * This has `O(1)` complexity.
     *
     * If the queue is empty, the return value will be `undefined`.
     */
    Queue.prototype.pop = function () {
        var link = this._front;
        if (link === null) {
            return void 0;
        }
        if (link.next === null) {
            this._front = null;
            this._back = null;
        }
        else {
            this._front = link.next;
        }
        this._size--;
        return link.value;
    };
    /**
     * Remove the first occurrence of a value from the queue.
     *
     * @param value - The value to remove from the queue.
     *
     * @returns `true` on success, `false` otherwise.
     *
     * #### Notes
     * This has `O(N)` complexity.
     */
    Queue.prototype.remove = function (value) {
        var link = this._front;
        var prev = null;
        while (link !== null) {
            if (link.value === value) {
                if (prev === null) {
                    this._front = link.next;
                }
                else {
                    prev.next = link.next;
                }
                if (link.next === null) {
                    this._back = prev;
                }
                this._size--;
                return true;
            }
            prev = link;
            link = link.next;
        }
        return false;
    };
    /**
     * Remove all occurrences of a value from the queue.
     *
     * @param value - The value to remove from the queue.
     *
     * @returns The number of occurrences removed.
     *
     * #### Notes
     * This has `O(N)` complexity.
     */
    Queue.prototype.removeAll = function (value) {
        var count = 0;
        var link = this._front;
        var prev = null;
        while (link !== null) {
            if (link.value === value) {
                count++;
                this._size--;
            }
            else if (prev === null) {
                this._front = link;
                prev = link;
            }
            else {
                prev.next = link;
                prev = link;
            }
            link = link.next;
        }
        if (!prev) {
            this._front = null;
            this._back = null;
        }
        else {
            prev.next = null;
            this._back = prev;
        }
        return count;
    };
    /**
     * Remove all values from the queue.
     *
     * #### Notes
     * This has `O(1)` complexity.
     */
    Queue.prototype.clear = function () {
        this._size = 0;
        this._front = null;
        this._back = null;
    };
    /**
     * Create an array from the values in the queue.
     *
     * @returns An array of all values in the queue.
     *
     * #### Notes
     * This has `O(N)` complexity.
     */
    Queue.prototype.toArray = function () {
        var result = new Array(this._size);
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            result[i] = link.value;
        }
        return result;
    };
    /**
     * Test whether any value in the queue passes a predicate function.
     *
     * @param pred - The predicate to apply to the values.
     *
     * @returns `true` if any value in the queue passes the predicate,
     *   or `false` otherwise.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the predicate to modify the queue while
     * iterating.
     */
    Queue.prototype.some = function (pred) {
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            if (pred(link.value, i))
                return true;
        }
        return false;
    };
    /**
     * Test whether all values in the queue pass a predicate function.
     *
     * @param pred - The predicate to apply to the values.
     *
     * @returns `true` if all values in the queue pass the predicate,
     *   or `false` otherwise.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the predicate to modify the queue while
     * iterating.
     */
    Queue.prototype.every = function (pred) {
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            if (!pred(link.value, i))
                return false;
        }
        return true;
    };
    /**
     * Create an array of the values which pass a predicate function.
     *
     * @param pred - The predicate to apply to the values.
     *
     * @returns The array of values which pass the predicate.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the predicate to modify the queue while
     * iterating.
     */
    Queue.prototype.filter = function (pred) {
        var result = [];
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            if (pred(link.value, i))
                result.push(link.value);
        }
        return result;
    };
    /**
     * Create an array of mapped values for the values in the queue.
     *
     * @param callback - The map function to apply to the values.
     *
     * @returns The array of values returned by the map function.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the callback to modify the queue while
     * iterating.
     */
    Queue.prototype.map = function (callback) {
        var result = new Array(this._size);
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            result[i] = callback(link.value, i);
        }
        return result;
    };
    /**
     * Execute a callback for each value in the queue.
     *
     * @param callback - The function to apply to the values.
     *
     * @returns The first value returned by the callback which is not
     *   `undefined`.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * Iteration will terminate immediately if the callback returns any
     * value other than `undefined`.
     *
     * It is **not** safe for the callback to modify the queue while
     * iterating.
     */
    Queue.prototype.forEach = function (callback) {
        for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
            var result = callback(link.value, i);
            if (result !== void 0)
                return result;
        }
        return void 0;
    };
    return Queue;
})();
exports.Queue = Queue;

},{}],14:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * An object used for type-safe inter-object communication.
 *
 * #### Notes
 * Signals provide a type-safe implementation of the publish-subscribe
 * pattern. An object (publisher) declares which signals it will emit,
 * and consumers connect callbacks (subscribers) to those signals. The
 * subscribers are invoked whenever the publisher emits the signal.
 *
 * A `Signal` object must be bound to a sender in order to be useful.
 * A common pattern is to declare a `Signal` object as a static class
 * member, along with a convenience getter which binds the signal to
 * the `this` instance on-demand.
 *
 * #### Example
 * ```typescript
 * import { ISignal, Signal } from 'phosphor-signaling';
 *
 * class MyClass {
 *
 *   static valueChangedSignal = new Signal<MyClass, number>();
 *
 *   constructor(name: string) {
 *     this._name = name;
 *   }
 *
 *   get valueChanged(): ISignal<MyClass, number> {
 *     return MyClass.valueChangedSignal.bind(this);
 *   }
 *
 *   get name(): string {
 *     return this._name;
 *   }
 *
 *   get value(): number {
 *     return this._value;
 *   }
 *
 *   set value(value: number) {
 *     if (value !== this._value) {
 *       this._value = value;
 *       this.valueChanged.emit(value);
 *     }
 *   }
 *
 *   private _name: string;
 *   private _value = 0;
 * }
 *
 * function logger(sender: MyClass, value: number): void {
 *   console.log(sender.name, value);
 * }
 *
 * let m1 = new MyClass('foo');
 * let m2 = new MyClass('bar');
 *
 * m1.valueChanged.connect(logger);
 * m2.valueChanged.connect(logger);
 *
 * m1.value = 42;  // logs: foo 42
 * m2.value = 17;  // logs: bar 17
 * ```
 */
var Signal = (function () {
    function Signal() {
    }
    /**
     * Bind the signal to a specific sender.
     *
     * @param sender - The sender object to bind to the signal.
     *
     * @returns The bound signal object which can be used for connecting,
     *   disconnecting, and emitting the signal.
     */
    Signal.prototype.bind = function (sender) {
        return new BoundSignal(this, sender);
    };
    return Signal;
})();
exports.Signal = Signal;
/**
 * Remove all connections where the given object is the sender.
 *
 * @param sender - The sender object of interest.
 *
 * #### Example
 * ```typescript
 * disconnectSender(someObject);
 * ```
 */
function disconnectSender(sender) {
    var list = senderMap.get(sender);
    if (!list) {
        return;
    }
    var conn = list.first;
    while (conn !== null) {
        removeFromSendersList(conn);
        conn.callback = null;
        conn.thisArg = null;
        conn = conn.nextReceiver;
    }
    senderMap.delete(sender);
}
exports.disconnectSender = disconnectSender;
/**
 * Remove all connections where the given object is the receiver.
 *
 * @param receiver - The receiver object of interest.
 *
 * #### Notes
 * If a `thisArg` is provided when connecting a signal, that object
 * is considered the receiver. Otherwise, the `callback` is used as
 * the receiver.
 *
 * #### Example
 * ```typescript
 * // disconnect a regular object receiver
 * disconnectReceiver(myObject);
 *
 * // disconnect a plain callback receiver
 * disconnectReceiver(myCallback);
 * ```
 */
function disconnectReceiver(receiver) {
    var conn = receiverMap.get(receiver);
    if (!conn) {
        return;
    }
    while (conn !== null) {
        var next = conn.nextSender;
        conn.callback = null;
        conn.thisArg = null;
        conn.prevSender = null;
        conn.nextSender = null;
        conn = next;
    }
    receiverMap.delete(receiver);
}
exports.disconnectReceiver = disconnectReceiver;
/**
 * Clear all signal data associated with the given object.
 *
 * @param obj - The object for which the signal data should be cleared.
 *
 * #### Notes
 * This removes all signal connections where the object is used as
 * either the sender or the receiver.
 *
 * #### Example
 * ```typescript
 * clearSignalData(someObject);
 * ```
 */
function clearSignalData(obj) {
    disconnectSender(obj);
    disconnectReceiver(obj);
}
exports.clearSignalData = clearSignalData;
/**
 * A concrete implementation of ISignal.
 */
var BoundSignal = (function () {
    /**
     * Construct a new bound signal.
     */
    function BoundSignal(signal, sender) {
        this._signal = signal;
        this._sender = sender;
    }
    /**
     * Connect a callback to the signal.
     */
    BoundSignal.prototype.connect = function (callback, thisArg) {
        return connect(this._sender, this._signal, callback, thisArg);
    };
    /**
     * Disconnect a callback from the signal.
     */
    BoundSignal.prototype.disconnect = function (callback, thisArg) {
        return disconnect(this._sender, this._signal, callback, thisArg);
    };
    /**
     * Emit the signal and invoke the connected callbacks.
     */
    BoundSignal.prototype.emit = function (args) {
        emit(this._sender, this._signal, args);
    };
    return BoundSignal;
})();
/**
 * A struct which holds connection data.
 */
var Connection = (function () {
    function Connection() {
        /**
         * The signal for the connection.
         */
        this.signal = null;
        /**
         * The callback connected to the signal.
         */
        this.callback = null;
        /**
         * The `this` context for the callback.
         */
        this.thisArg = null;
        /**
         * The next connection in the singly linked receivers list.
         */
        this.nextReceiver = null;
        /**
         * The next connection in the doubly linked senders list.
         */
        this.nextSender = null;
        /**
         * The previous connection in the doubly linked senders list.
         */
        this.prevSender = null;
    }
    return Connection;
})();
/**
 * The list of receiver connections for a specific sender.
 */
var ConnectionList = (function () {
    function ConnectionList() {
        /**
         * The ref count for the list.
         */
        this.refs = 0;
        /**
         * The first connection in the list.
         */
        this.first = null;
        /**
         * The last connection in the list.
         */
        this.last = null;
    }
    return ConnectionList;
})();
/**
 * A mapping of sender object to its receiver connection list.
 */
var senderMap = new WeakMap();
/**
 * A mapping of receiver object to its sender connection list.
 */
var receiverMap = new WeakMap();
/**
 * Create a connection between a sender, signal, and callback.
 */
function connect(sender, signal, callback, thisArg) {
    // Coerce a `null` thisArg to `undefined`.
    thisArg = thisArg || void 0;
    // Search for an equivalent connection and bail if one exists.
    var list = senderMap.get(sender);
    if (list && findConnection(list, signal, callback, thisArg)) {
        return false;
    }
    // Create a new connection.
    var conn = new Connection();
    conn.signal = signal;
    conn.callback = callback;
    conn.thisArg = thisArg;
    // Add the connection to the receivers list.
    if (!list) {
        list = new ConnectionList();
        list.first = conn;
        list.last = conn;
        senderMap.set(sender, list);
    }
    else if (list.last === null) {
        list.first = conn;
        list.last = conn;
    }
    else {
        list.last.nextReceiver = conn;
        list.last = conn;
    }
    // Add the connection to the senders list.
    var receiver = thisArg || callback;
    var head = receiverMap.get(receiver);
    if (head) {
        head.prevSender = conn;
        conn.nextSender = head;
    }
    receiverMap.set(receiver, conn);
    return true;
}
/**
 * Break the connection between a sender, signal, and callback.
 */
function disconnect(sender, signal, callback, thisArg) {
    // Coerce a `null` thisArg to `undefined`.
    thisArg = thisArg || void 0;
    // Search for an equivalent connection and bail if none exists.
    var list = senderMap.get(sender);
    if (!list) {
        return false;
    }
    var conn = findConnection(list, signal, callback, thisArg);
    if (!conn) {
        return false;
    }
    // Remove the connection from the senders list. It will be removed
    // from the receivers list the next time the signal is emitted.
    removeFromSendersList(conn);
    // Clear the connection data so it becomes a dead connection.
    conn.callback = null;
    conn.thisArg = null;
    return true;
}
/**
 * Emit a signal and invoke the connected callbacks.
 */
function emit(sender, signal, args) {
    // If there is no connection list, there is nothing to do.
    var list = senderMap.get(sender);
    if (!list) {
        return;
    }
    // Prepare to dispatch the callbacks. Increment the reference count
    // on the list so that the list is cleaned only when the emit stack
    // is fully unwound.
    list.refs++;
    var dirty = false;
    var last = list.last;
    var conn = list.first;
    // Dispatch the callbacks. If a connection has a null callback, it
    // indicates the list is dirty. Connections which match the signal
    // are safely dispatched where all exceptions are logged. Dispatch
    // is stopped at the last connection for the current stack frame.
    while (conn !== null) {
        if (!conn.callback) {
            dirty = true;
        }
        else if (conn.signal === signal) {
            safeInvoke(conn, sender, args);
        }
        if (conn === last) {
            break;
        }
        conn = conn.nextReceiver;
    }
    // Decrement the reference count on the list.
    list.refs--;
    // Clean the list if it's dirty and the emit stack is fully unwound.
    if (dirty && list.refs === 0) {
        cleanList(list);
    }
}
/**
 * Safely invoke the callback for the given connection.
 *
 * Exceptions thrown by the callback will be caught and logged.
 */
function safeInvoke(conn, sender, args) {
    try {
        conn.callback.call(conn.thisArg, sender, args);
    }
    catch (err) {
        console.error('Exception in signal handler:', err);
    }
}
/**
 * Find a matching connection in the given connection list.
 *
 * Returns `null` if no matching connection is found.
 */
function findConnection(list, signal, callback, thisArg) {
    var conn = list.first;
    while (conn !== null) {
        if (conn.signal === signal &&
            conn.callback === callback &&
            conn.thisArg === thisArg) {
            return conn;
        }
        conn = conn.nextReceiver;
    }
    return null;
}
/**
 * Remove the dead connections from the given connection list.
 */
function cleanList(list) {
    var prev;
    var conn = list.first;
    while (conn !== null) {
        var next = conn.nextReceiver;
        if (!conn.callback) {
            conn.nextReceiver = null;
        }
        else if (!prev) {
            list.first = conn;
            prev = conn;
        }
        else {
            prev.nextReceiver = conn;
            prev = conn;
        }
        conn = next;
    }
    if (!prev) {
        list.first = null;
        list.last = null;
    }
    else {
        prev.nextReceiver = null;
        list.last = prev;
    }
}
/**
 * Remove a connection from the doubly linked list of senders.
 */
function removeFromSendersList(conn) {
    var receiver = conn.thisArg || conn.callback;
    if (!receiver) {
        return;
    }
    var prev = conn.prevSender;
    var next = conn.nextSender;
    if (prev === null && next === null) {
        receiverMap.delete(receiver);
    }
    else if (prev === null) {
        receiverMap.set(receiver, next);
        next.prevSender = null;
    }
    else if (next === null) {
        prev.nextSender = null;
    }
    else {
        prev.nextSender = next;
        next.prevSender = prev;
    }
    conn.prevSender = null;
    conn.nextSender = null;
}

},{}],15:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\n.p-SplitPanel {\n  position: relative;\n  z-index: 0;\n}\n.p-SplitPanel > .p-Widget {\n  position: absolute;\n  z-index: 0;\n}\n.p-SplitHandle {\n  box-sizing: border-box;\n  position: absolute;\n  z-index: 1;\n}\n.p-SplitHandle.p-mod-hidden {\n  display: none;\n}\n.p-SplitHandle.p-mod-horizontal {\n  cursor: ew-resize;\n}\n.p-SplitHandle.p-mod-vertical {\n  cursor: ns-resize;\n}\n.p-SplitHandle-overlay {\n  box-sizing: border-box;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.p-SplitHandle.p-mod-horizontal > .p-SplitHandle-overlay {\n  min-width: 7px;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.p-SplitHandle.p-mod-vertical > .p-SplitHandle-overlay {\n  min-height: 7px;\n  top: 50%;\n  transform: translateY(-50%);\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-splitpanel/lib/index.css"})); module.exports = css;
},{"browserify-css":3}],16:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var arrays = require('phosphor-arrays');
var phosphor_boxengine_1 = require('phosphor-boxengine');
var phosphor_domutil_1 = require('phosphor-domutil');
var phosphor_messaging_1 = require('phosphor-messaging');
var phosphor_nodewrapper_1 = require('phosphor-nodewrapper');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_widget_1 = require('phosphor-widget');
require('./index.css');
/**
 * The class name added to SplitPanel instances.
 */
var SPLIT_PANEL_CLASS = 'p-SplitPanel';
/**
 * The class name added to SplitHandle instances.
 */
var SPLIT_HANDLE_CLASS = 'p-SplitHandle';
/**
 * The class name added to a split handle overlay.
 */
var OVERLAY_CLASS = 'p-SplitHandle-overlay';
/**
 * The class name added to horizontal split panels and handles.
 */
var HORIZONTAL_CLASS = 'p-mod-horizontal';
/**
 * The class name added to vertical split panels and handles.
 */
var VERTICAL_CLASS = 'p-mod-vertical';
/**
 * The class name added to hidden split handles.
 */
var HIDDEN_CLASS = 'p-mod-hidden';
/**
 * The layout orientation of a split panel.
 */
(function (Orientation) {
    /**
     * Left-to-right horizontal orientation.
     */
    Orientation[Orientation["Horizontal"] = 0] = "Horizontal";
    /**
     * Top-to-bottom vertical orientation.
     */
    Orientation[Orientation["Vertical"] = 1] = "Vertical";
})(exports.Orientation || (exports.Orientation = {}));
var Orientation = exports.Orientation;
/**
 * A panel which arranges its children into resizable sections.
 */
var SplitPanel = (function (_super) {
    __extends(SplitPanel, _super);
    /**
     * Construct a new split panel.
     */
    function SplitPanel() {
        _super.call(this);
        this._fixedSpace = 0;
        this._pendingSizes = false;
        this._box = null;
        this._sizers = [];
        this._pressData = null;
        this.addClass(SPLIT_PANEL_CLASS);
        this.addClass(HORIZONTAL_CLASS);
    }
    /**
     * Get the split panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The split panel stretch factor for the widget.
     *
     * #### Notes
     * This is a pure delegate to the [[stretchProperty]].
     */
    SplitPanel.getStretch = function (widget) {
        return SplitPanel.stretchProperty.get(widget);
    };
    /**
     * Set the split panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the stretch factor.
     *
     * #### Notes
     * This is a pure delegate to the [[stretchProperty]].
     */
    SplitPanel.setStretch = function (widget, value) {
        SplitPanel.stretchProperty.set(widget, value);
    };
    /**
     * Dispose of the resources held by the panel.
     */
    SplitPanel.prototype.dispose = function () {
        this._releaseMouse();
        this._sizers.length = 0;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(SplitPanel.prototype, "orientation", {
        /**
         * Get the orientation of the split panel.
         *
         * #### Notes
         * This is a pure delegate to the [[orientationProperty]].
         */
        get: function () {
            return SplitPanel.orientationProperty.get(this);
        },
        /**
         * Set the orientation of the split panel.
         *
         * #### Notes
         * This is a pure delegate to the [[orientationProperty]].
         */
        set: function (value) {
            SplitPanel.orientationProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitPanel.prototype, "spacing", {
        /**
         * Get the inter-element spacing for the split panel.
         *
         * #### Notes
         * This is a pure delegate to the [[spacingProperty]].
         */
        get: function () {
            return SplitPanel.spacingProperty.get(this);
        },
        /**
         * Set the inter-element spacing for the split panel.
         *
         * #### Notes
         * This is a pure delegate to the [[spacingProperty]].
         */
        set: function (value) {
            SplitPanel.spacingProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the normalized sizes of the widgets in the panel.
     *
     * @returns The normalized sizes of the widgets in the panel.
     */
    SplitPanel.prototype.sizes = function () {
        return normalize(this._sizers.map(function (sizer) { return sizer.size; }));
    };
    /**
     * Set the relative sizes for the child widgets in the panel.
     *
     * @param sizes - The relative sizes for the children in the panel.
     *   These values will be normalized to the available layout space.
     *
     * #### Notes
     * Extra values are ignored, too few will yield an undefined layout.
     */
    SplitPanel.prototype.setSizes = function (sizes) {
        var normed = normalize(sizes);
        for (var i = 0, n = this._sizers.length; i < n; ++i) {
            var hint = Math.max(0, normed[i] || 0);
            var sizer = this._sizers[i];
            sizer.sizeHint = hint;
            sizer.size = hint;
        }
        this._pendingSizes = true;
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgUpdateRequest);
    };
    /**
     * Handle the DOM events for the split panel.
     *
     * @param event - The DOM event sent to the panel.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the panel's DOM node. It should
     * not be called directly by user code.
     */
    SplitPanel.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'mousemove':
                this._evtMouseMove(event);
                break;
            case 'mouseup':
                this._evtMouseUp(event);
                break;
        }
    };
    /**
     * A message handler invoked on a `'child-added'` message.
     */
    SplitPanel.prototype.onChildAdded = function (msg) {
        var sizer = createSizer(averageSize(this._sizers));
        arrays.insert(this._sizers, msg.currentIndex, sizer);
        this.node.appendChild(msg.child.node);
        this.node.appendChild(getHandle(msg.child).node);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.Widget.MsgAfterAttach);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Panel.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'child-moved'` message.
     */
    SplitPanel.prototype.onChildMoved = function (msg) {
        arrays.move(this._sizers, msg.previousIndex, msg.currentIndex);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Panel.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'child-removed'` message.
     */
    SplitPanel.prototype.onChildRemoved = function (msg) {
        arrays.removeAt(this._sizers, msg.previousIndex);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.Widget.MsgBeforeDetach);
        this.node.removeChild(msg.child.node);
        this.node.removeChild(getHandle(msg.child).node);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Panel.MsgLayoutRequest);
        resetGeometry(msg.child);
    };
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    SplitPanel.prototype.onAfterShow = function (msg) {
        _super.prototype.onAfterShow.call(this, msg);
        phosphor_messaging_1.sendMessage(this, phosphor_widget_1.Widget.MsgUpdateRequest);
    };
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    SplitPanel.prototype.onAfterAttach = function (msg) {
        _super.prototype.onAfterAttach.call(this, msg);
        this.node.addEventListener('mousedown', this);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Panel.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'before-detach'` message.
     */
    SplitPanel.prototype.onBeforeDetach = function (msg) {
        _super.prototype.onBeforeDetach.call(this, msg);
        this.node.removeEventListener('mousedown', this);
    };
    /**
     * A message handler invoked on a `'child-shown'` message.
     */
    SplitPanel.prototype.onChildShown = function (msg) {
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Panel.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'child-hidden'` message.
     */
    SplitPanel.prototype.onChildHidden = function (msg) {
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Panel.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'resize'` message.
     */
    SplitPanel.prototype.onResize = function (msg) {
        if (this.isVisible) {
            var width = msg.width < 0 ? this.node.offsetWidth : msg.width;
            var height = msg.height < 0 ? this.node.offsetHeight : msg.height;
            this._layoutChildren(width, height);
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    SplitPanel.prototype.onUpdateRequest = function (msg) {
        if (this.isVisible) {
            this._layoutChildren(this.node.offsetWidth, this.node.offsetHeight);
        }
    };
    /**
     * A message handler invoked on a `'layout-request'` message.
     */
    SplitPanel.prototype.onLayoutRequest = function (msg) {
        if (this.isAttached) {
            this._setupGeometry();
        }
    };
    /**
     * Update the size constraints of the panel.
     */
    SplitPanel.prototype._setupGeometry = function () {
        // Update the handles and track the visible widget count.
        var visibleCount = 0;
        var children = this.children;
        var orientation = this.orientation;
        var lastVisibleHandle = null;
        for (var i = 0, n = children.length; i < n; ++i) {
            var widget = children.get(i);
            var handle = getHandle(widget);
            handle.hidden = widget.hidden;
            handle.orientation = orientation;
            if (!handle.hidden) {
                lastVisibleHandle = handle;
                visibleCount++;
            }
        }
        // Hide the last visible handle and update the fixed space.
        if (lastVisibleHandle)
            lastVisibleHandle.hidden = true;
        this._fixedSpace = this.spacing * Math.max(0, visibleCount - 1);
        // Compute new size constraints for the split panel.
        var minW = 0;
        var minH = 0;
        var maxW = Infinity;
        var maxH = Infinity;
        if (orientation === Orientation.Horizontal) {
            minW = this._fixedSpace;
            maxW = visibleCount > 0 ? minW : maxW;
            for (var i = 0, n = children.length; i < n; ++i) {
                var widget = children.get(i);
                var sizer = this._sizers[i];
                if (sizer.size > 0) {
                    sizer.sizeHint = sizer.size;
                }
                if (widget.hidden) {
                    sizer.minSize = 0;
                    sizer.maxSize = 0;
                    continue;
                }
                var limits = phosphor_domutil_1.sizeLimits(widget.node);
                sizer.stretch = SplitPanel.getStretch(widget);
                sizer.minSize = limits.minWidth;
                sizer.maxSize = limits.maxWidth;
                minW += limits.minWidth;
                maxW += limits.maxWidth;
                minH = Math.max(minH, limits.minHeight);
                maxH = Math.min(maxH, limits.maxHeight);
            }
        }
        else {
            minH = this._fixedSpace;
            maxH = visibleCount > 0 ? minH : maxH;
            for (var i = 0, n = children.length; i < n; ++i) {
                var widget = children.get(i);
                var sizer = this._sizers[i];
                if (sizer.size > 0) {
                    sizer.sizeHint = sizer.size;
                }
                if (widget.hidden) {
                    sizer.minSize = 0;
                    sizer.maxSize = 0;
                    continue;
                }
                var limits = phosphor_domutil_1.sizeLimits(widget.node);
                sizer.stretch = SplitPanel.getStretch(widget);
                sizer.minSize = limits.minHeight;
                sizer.maxSize = limits.maxHeight;
                minH += limits.minHeight;
                maxH += limits.maxHeight;
                minW = Math.max(minW, limits.minWidth);
                maxW = Math.min(maxW, limits.maxWidth);
            }
        }
        // Update the box sizing and add it to the size constraints.
        this._box = phosphor_domutil_1.boxSizing(this.node);
        minW += this._box.horizontalSum;
        minH += this._box.verticalSum;
        maxW += this._box.horizontalSum;
        maxH += this._box.verticalSum;
        // Update the panel's size constraints.
        var style = this.node.style;
        style.minWidth = minW + 'px';
        style.minHeight = minH + 'px';
        style.maxWidth = maxW === Infinity ? 'none' : maxW + 'px';
        style.maxHeight = maxH === Infinity ? 'none' : maxH + 'px';
        // Notifiy the parent that it should relayout.
        if (this.parent)
            phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.Panel.MsgLayoutRequest);
        // Update the layout for the child widgets.
        phosphor_messaging_1.sendMessage(this, phosphor_widget_1.Widget.MsgUpdateRequest);
    };
    /**
     * Layout the children using the given offset width and height.
     */
    SplitPanel.prototype._layoutChildren = function (offsetWidth, offsetHeight) {
        // Bail early if their are no children to arrange.
        var children = this.children;
        if (children.length === 0) {
            return;
        }
        // Ensure the box sizing is created.
        var box = this._box || (this._box = phosphor_domutil_1.boxSizing(this.node));
        // Compute the actual layout bounds adjusted for border and padding.
        var top = box.paddingTop;
        var left = box.paddingLeft;
        var width = offsetWidth - box.horizontalSum;
        var height = offsetHeight - box.verticalSum;
        // Fetch whether the orientation is horizontal.
        var horizontal = this.orientation === Orientation.Horizontal;
        // Update the sizer hints if there is a pending `setSizes`.
        if (this._pendingSizes) {
            var space = horizontal ? width : height;
            var adjusted = Math.max(0, space - this._fixedSpace);
            for (var i = 0, n = this._sizers.length; i < n; ++i) {
                this._sizers[i].sizeHint *= adjusted;
            }
            this._pendingSizes = false;
        }
        // Distribute the layout space and layout the items.
        var spacing = this.spacing;
        if (horizontal) {
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, width - this._fixedSpace));
            for (var i = 0, n = children.length; i < n; ++i) {
                var widget = children.get(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                setGeometry(widget, left, top, size, height);
                getHandle(widget).setGeometry(left + size, top, spacing, height);
                left += size + spacing;
            }
        }
        else {
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, height - this._fixedSpace));
            for (var i = 0, n = children.length; i < n; ++i) {
                var widget = children.get(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                setGeometry(widget, left, top, width, size);
                getHandle(widget).setGeometry(left, top + size, width, spacing);
                top += size + spacing;
            }
        }
    };
    /**
     * Handle the `'mousedown'` event for the split panel.
     */
    SplitPanel.prototype._evtMouseDown = function (event) {
        if (event.button !== 0) {
            return;
        }
        var index = findHandleIndex(this, event.target);
        if (index === -1) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        document.addEventListener('mouseup', this, true);
        document.addEventListener('mousemove', this, true);
        var delta;
        var node = getHandle(this.children.get(index)).node;
        if (this.orientation === Orientation.Horizontal) {
            delta = event.clientX - node.getBoundingClientRect().left;
        }
        else {
            delta = event.clientY - node.getBoundingClientRect().top;
        }
        var override = phosphor_domutil_1.overrideCursor(window.getComputedStyle(node).cursor);
        this._pressData = { index: index, delta: delta, override: override };
    };
    /**
     * Handle the `'mousemove'` event for the split panel.
     */
    SplitPanel.prototype._evtMouseMove = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var pos;
        var data = this._pressData;
        var rect = this.node.getBoundingClientRect();
        if (this.orientation === Orientation.Horizontal) {
            pos = event.clientX - data.delta - rect.left;
        }
        else {
            pos = event.clientY - data.delta - rect.top;
        }
        this._moveHandle(data.index, pos);
    };
    /**
     * Handle the `'mouseup'` event for the split panel.
     */
    SplitPanel.prototype._evtMouseUp = function (event) {
        if (event.button !== 0) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this._releaseMouse();
    };
    /**
     * Release the mouse grab for the split panel.
     */
    SplitPanel.prototype._releaseMouse = function () {
        if (!this._pressData) {
            return;
        }
        this._pressData.override.dispose();
        this._pressData = null;
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('mousemove', this, true);
    };
    /**
     * Move a splitter handle to the specified client position.
     */
    SplitPanel.prototype._moveHandle = function (index, pos) {
        // Bail if the index is invalid.
        var widget = this.children.get(index);
        if (!widget) {
            return;
        }
        // Bail if the handle is hidden.
        var handle = getHandle(widget);
        if (handle.hidden) {
            return;
        }
        // Compute the delta movement for the handle.
        var delta;
        if (this.orientation === Orientation.Horizontal) {
            delta = pos - handle.node.offsetLeft;
        }
        else {
            delta = pos - handle.node.offsetTop;
        }
        // Bail if there is no handle movement.
        if (delta === 0) {
            return;
        }
        // Prevent item resizing unless needed.
        for (var i = 0, n = this._sizers.length; i < n; ++i) {
            var sizer = this._sizers[i];
            if (sizer.size > 0)
                sizer.sizeHint = sizer.size;
        }
        // Adjust the sizers to reflect the movement.
        if (delta > 0) {
            growSizer(this._sizers, index, delta);
        }
        else {
            shrinkSizer(this._sizers, index, -delta);
        }
        // Update the layout of the widgets. The message is posted instead
        // of sent because the mouse move event frequency can outpace the
        // browser's ability to layout, leading to choppy handle movement,
        // especially on IE. Posting ensures we don't try to layout faster
        // than the browser can handle.
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgUpdateRequest);
    };
    /**
     * The change handler for the [[orientationProperty]].
     */
    SplitPanel.prototype._onOrientationChanged = function (old, value) {
        this.toggleClass(HORIZONTAL_CLASS, value === Orientation.Horizontal);
        this.toggleClass(VERTICAL_CLASS, value === Orientation.Vertical);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Panel.MsgLayoutRequest);
    };
    /**
     * A convenience alias of the `Horizontal` [[Orientation]].
     */
    SplitPanel.Horizontal = Orientation.Horizontal;
    /**
     * A convenience alias of the `Vertical` [[Orientation]].
     */
    SplitPanel.Vertical = Orientation.Vertical;
    /**
     * The property descriptor for the split panel orientation.
     *
     * The controls whether the child widgets are arranged lef-to-right
     * (`Horizontal` the default) or top-to-bottom (`Vertical`).
     *
     * **See also:** [[orientation]]
     */
    SplitPanel.orientationProperty = new phosphor_properties_1.Property({
        name: 'orientation',
        value: Orientation.Horizontal,
        changed: function (owner, old, value) { return owner._onOrientationChanged(old, value); },
    });
    /**
     * The property descriptor for the split panel spacing.
     *
     * The controls the fixed spacing between the child widgets, in
     * pixels. The default value is `3`.
     *
     * **See also:** [[spacing]]
     */
    SplitPanel.spacingProperty = new phosphor_properties_1.Property({
        name: 'spacing',
        value: 3,
        coerce: function (owner, value) { return Math.max(0, value | 0); },
        changed: function (owner) { return phosphor_messaging_1.postMessage(owner, phosphor_widget_1.Panel.MsgLayoutRequest); },
    });
    /**
     * The property descriptor for a widget stretch factor.
     *
     * This is an attached property which controls how much a child widget
     * stretches or shrinks relative to its siblings when the split panel
     * is resized. The default value is `0`.
     *
     * **See also:** [[getStretch]], [[setStretch]]
     */
    SplitPanel.stretchProperty = new phosphor_properties_1.Property({
        name: 'stretch',
        value: 0,
        coerce: function (owner, value) { return Math.max(0, value | 0); },
        changed: onChildPropertyChanged,
    });
    return SplitPanel;
})(phosphor_widget_1.Panel);
exports.SplitPanel = SplitPanel;
/**
 * A class which manages a handle node for a split panel.
 */
var SplitHandle = (function (_super) {
    __extends(SplitHandle, _super);
    /**
     * Construct a new split handle.
     */
    function SplitHandle() {
        _super.call(this);
        this._hidden = false;
        this._orientation = Orientation.Horizontal;
        this.addClass(SPLIT_HANDLE_CLASS);
        this.addClass(HORIZONTAL_CLASS);
    }
    /**
     * Create the DOM node for a split handle.
     */
    SplitHandle.createNode = function () {
        var node = document.createElement('div');
        var overlay = document.createElement('div');
        overlay.className = OVERLAY_CLASS;
        node.appendChild(overlay);
        return node;
    };
    Object.defineProperty(SplitHandle.prototype, "hidden", {
        /**
         * Get whether the handle is hidden.
         */
        get: function () {
            return this._hidden;
        },
        /**
         * Set whether the handle is hidden.
         */
        set: function (hidden) {
            if (hidden === this._hidden) {
                return;
            }
            this._hidden = hidden;
            this.toggleClass(HIDDEN_CLASS, hidden);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitHandle.prototype, "orientation", {
        /**
         * Get the orientation of the handle.
         */
        get: function () {
            return this._orientation;
        },
        /**
         * Set the orientation of the handle.
         */
        set: function (value) {
            if (value === this._orientation) {
                return;
            }
            this._orientation = value;
            this.toggleClass(HORIZONTAL_CLASS, value === Orientation.Horizontal);
            this.toggleClass(VERTICAL_CLASS, value === Orientation.Vertical);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set the geometry for the handle.
     */
    SplitHandle.prototype.setGeometry = function (left, top, width, height) {
        var style = this.node.style;
        style.top = top + 'px';
        style.left = left + 'px';
        style.width = width + 'px';
        style.height = height + 'px';
    };
    return SplitHandle;
})(phosphor_nodewrapper_1.NodeWrapper);
/**
 * A private attached property for the split handle for a widget.
 */
var splitHandleProperty = new phosphor_properties_1.Property({
    name: 'splitHandle',
    create: function (owner) { return new SplitHandle(); },
});
/**
 * A private attached property which stores a widget offset rect.
 */
var rectProperty = new phosphor_properties_1.Property({
    name: 'rect',
    create: createRect,
});
/**
 * Lookup the split handle for the given widget.
 */
function getHandle(widget) {
    return splitHandleProperty.get(widget);
}
/**
 * Create a new offset rect filled with NaNs.
 */
function createRect() {
    return { top: NaN, left: NaN, width: NaN, height: NaN };
}
/**
 * Get the offset rect for a widget.
 */
function getRect(widget) {
    return rectProperty.get(widget);
}
/**
 * Find the index of the split handle which contains the given target.
 */
function findHandleIndex(panel, target) {
    var children = panel.children;
    for (var i = 0, n = children.length; i < n; ++i) {
        var handle = getHandle(children.get(i));
        if (handle.node.contains(target))
            return i;
    }
    return -1;
}
/**
 * Set the offset geometry for the given widget.
 *
 * A resize message will be dispatched to the widget if appropriate.
 */
function setGeometry(widget, left, top, width, height) {
    var resized = false;
    var rect = getRect(widget);
    var style = widget.node.style;
    if (rect.top !== top) {
        rect.top = top;
        style.top = top + 'px';
    }
    if (rect.left !== left) {
        rect.left = left;
        style.left = left + 'px';
    }
    if (rect.width !== width) {
        resized = true;
        rect.width = width;
        style.width = width + 'px';
    }
    if (rect.height !== height) {
        resized = true;
        rect.height = height;
        style.height = height + 'px';
    }
    if (resized) {
        phosphor_messaging_1.sendMessage(widget, new phosphor_widget_1.ResizeMessage(width, height));
    }
}
/**
 * Reset the inline geometry and rect cache for the given widget
 */
function resetGeometry(widget) {
    var rect = getRect(widget);
    var style = widget.node.style;
    rect.top = NaN;
    rect.left = NaN;
    rect.width = NaN;
    rect.height = NaN;
    style.top = '';
    style.left = '';
    style.width = '';
    style.height = '';
}
/**
 * The change handler for the attached child properties.
 */
function onChildPropertyChanged(child) {
    if (child.parent instanceof SplitPanel) {
        phosphor_messaging_1.postMessage(child.parent, phosphor_widget_1.Panel.MsgLayoutRequest);
    }
}
/**
 * Create a new box sizer with the given size hint.
 */
function createSizer(size) {
    var sizer = new phosphor_boxengine_1.BoxSizer();
    sizer.sizeHint = size | 0;
    return sizer;
}
/**
 * Compute the average size of the given box sizers.
 */
function averageSize(sizers) {
    var sum = sizers.reduce(function (v, s) { return v + s.size; }, 0);
    return sum > 0 ? sum / sizers.length : 0;
}
/**
 * Grow a sizer to the right by a positive delta and adjust neighbors.
 */
function growSizer(sizers, index, delta) {
    var growLimit = 0;
    for (var i = 0; i <= index; ++i) {
        var sizer = sizers[i];
        growLimit += sizer.maxSize - sizer.size;
    }
    var shrinkLimit = 0;
    for (var i = index + 1, n = sizers.length; i < n; ++i) {
        var sizer = sizers[i];
        shrinkLimit += sizer.size - sizer.minSize;
    }
    delta = Math.min(delta, growLimit, shrinkLimit);
    var grow = delta;
    for (var i = index; i >= 0 && grow > 0; --i) {
        var sizer = sizers[i];
        var limit = sizer.maxSize - sizer.size;
        if (limit >= grow) {
            sizer.sizeHint = sizer.size + grow;
            grow = 0;
        }
        else {
            sizer.sizeHint = sizer.size + limit;
            grow -= limit;
        }
    }
    var shrink = delta;
    for (var i = index + 1, n = sizers.length; i < n && shrink > 0; ++i) {
        var sizer = sizers[i];
        var limit = sizer.size - sizer.minSize;
        if (limit >= shrink) {
            sizer.sizeHint = sizer.size - shrink;
            shrink = 0;
        }
        else {
            sizer.sizeHint = sizer.size - limit;
            shrink -= limit;
        }
    }
}
/**
 * Shrink a sizer to the left by a positive delta and adjust neighbors.
 */
function shrinkSizer(sizers, index, delta) {
    var growLimit = 0;
    for (var i = index + 1, n = sizers.length; i < n; ++i) {
        var sizer = sizers[i];
        growLimit += sizer.maxSize - sizer.size;
    }
    var shrinkLimit = 0;
    for (var i = 0; i <= index; ++i) {
        var sizer = sizers[i];
        shrinkLimit += sizer.size - sizer.minSize;
    }
    delta = Math.min(delta, growLimit, shrinkLimit);
    var grow = delta;
    for (var i = index + 1, n = sizers.length; i < n && grow > 0; ++i) {
        var sizer = sizers[i];
        var limit = sizer.maxSize - sizer.size;
        if (limit >= grow) {
            sizer.sizeHint = sizer.size + grow;
            grow = 0;
        }
        else {
            sizer.sizeHint = sizer.size + limit;
            grow -= limit;
        }
    }
    var shrink = delta;
    for (var i = index; i >= 0 && shrink > 0; --i) {
        var sizer = sizers[i];
        var limit = sizer.size - sizer.minSize;
        if (limit >= shrink) {
            sizer.sizeHint = sizer.size - shrink;
            shrink = 0;
        }
        else {
            sizer.sizeHint = sizer.size - limit;
            shrink -= limit;
        }
    }
}
/**
 * Normalize an array of positive values.
 */
function normalize(values) {
    var n = values.length;
    if (n === 0) {
        return [];
    }
    var sum = 0;
    for (var i = 0; i < n; ++i) {
        sum += values[i];
    }
    var result = new Array(n);
    if (sum === 0) {
        for (var i = 0; i < n; ++i) {
            result[i] = 1 / n;
        }
    }
    else {
        for (var i = 0; i < n; ++i) {
            result[i] = values[i] / sum;
        }
    }
    return result;
}

},{"./index.css":15,"phosphor-arrays":4,"phosphor-boxengine":5,"phosphor-domutil":8,"phosphor-messaging":9,"phosphor-nodewrapper":10,"phosphor-properties":12,"phosphor-widget":26}],17:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\n.p-StackedPanel {\n  position: relative;\n}\n.p-StackedPanel > .p-Widget {\n  position: absolute;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-stackedpanel/lib/index.css"})); module.exports = css;
},{"browserify-css":3}],18:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_domutil_1 = require('phosphor-domutil');
var phosphor_messaging_1 = require('phosphor-messaging');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_signaling_1 = require('phosphor-signaling');
var phosphor_widget_1 = require('phosphor-widget');
require('./index.css');
/**
 * The class name added to StackedPanel instances.
 */
var STACKED_PANEL_CLASS = 'p-StackedPanel';
/**
 * A panel where only one child widget is visible at a time.
 */
var StackedPanel = (function (_super) {
    __extends(StackedPanel, _super);
    /**
     * Construct a new stacked panel.
     */
    function StackedPanel() {
        _super.call(this);
        this._box = null;
        this.addClass(STACKED_PANEL_CLASS);
    }
    Object.defineProperty(StackedPanel.prototype, "currentWidget", {
        /**
         * Get the current panel widget.
         *
         * #### Notes
         * This is a pure delegate to the [[currentWidgetProperty]].
         */
        get: function () {
            return StackedPanel.currentWidgetProperty.get(this);
        },
        /**
         * Set the current panel widget.
         *
         * #### Notes
         * This is a pure delegate to the [[currentWidgetProperty]].
         */
        set: function (widget) {
            StackedPanel.currentWidgetProperty.set(this, widget);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedPanel.prototype, "currentWidgetChanged", {
        /**
         * A signal emitted when the current widget is changed.
         *
         * #### Notes
         * This is the notify signal for the [[currentWidgetProperty]].
         */
        get: function () {
            return StackedPanel.currentWidgetProperty.notify.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * A message handler invoked on a `'child-added'` message.
     */
    StackedPanel.prototype.onChildAdded = function (msg) {
        msg.child.hidden = true;
        this.node.appendChild(msg.child.node);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.Widget.MsgAfterAttach);
    };
    /**
     * A message handler invoked on a `'child-moved'` message.
     */
    StackedPanel.prototype.onChildMoved = function (msg) { };
    /**
     * A message handler invoked on a `'child-removed'` message.
     */
    StackedPanel.prototype.onChildRemoved = function (msg) {
        if (msg.child === this.currentWidget)
            this.currentWidget = null;
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.Widget.MsgBeforeDetach);
        this.node.removeChild(msg.child.node);
        resetGeometry(msg.child);
    };
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    StackedPanel.prototype.onAfterShow = function (msg) {
        _super.prototype.onAfterShow.call(this, msg);
        phosphor_messaging_1.sendMessage(this, phosphor_widget_1.Widget.MsgUpdateRequest);
    };
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    StackedPanel.prototype.onAfterAttach = function (msg) {
        _super.prototype.onAfterAttach.call(this, msg);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Panel.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'resize'` message.
     */
    StackedPanel.prototype.onResize = function (msg) {
        if (this.isVisible) {
            var width = msg.width < 0 ? this.node.offsetWidth : msg.width;
            var height = msg.height < 0 ? this.node.offsetHeight : msg.height;
            this._layoutChildren(width, height);
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    StackedPanel.prototype.onUpdateRequest = function (msg) {
        if (this.isVisible) {
            this._layoutChildren(this.node.offsetWidth, this.node.offsetHeight);
        }
    };
    /**
     * A message handler invoked on a `'layout-request'` message.
     */
    StackedPanel.prototype.onLayoutRequest = function (msg) {
        if (this.isAttached) {
            this._setupGeometry();
        }
    };
    /**
     * Update the size constraints of the panel.
     */
    StackedPanel.prototype._setupGeometry = function () {
        // Compute the new size limits.
        var minW = 0;
        var minH = 0;
        var maxW = Infinity;
        var maxH = Infinity;
        var widget = this.currentWidget;
        if (widget) {
            var limits = phosphor_domutil_1.sizeLimits(widget.node);
            minW = limits.minWidth;
            minH = limits.minHeight;
            maxW = limits.maxWidth;
            maxH = limits.maxHeight;
        }
        // Update the box sizing and add it to the size constraints.
        this._box = phosphor_domutil_1.boxSizing(this.node);
        minW += this._box.horizontalSum;
        minH += this._box.verticalSum;
        maxW += this._box.horizontalSum;
        maxH += this._box.verticalSum;
        // Update the panel's size constraints.
        var style = this.node.style;
        style.minWidth = minW + 'px';
        style.minHeight = minH + 'px';
        style.maxWidth = maxW === Infinity ? 'none' : maxW + 'px';
        style.maxHeight = maxH === Infinity ? 'none' : maxH + 'px';
        // Notifiy the parent that it should relayout.
        if (this.parent)
            phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.Panel.MsgLayoutRequest);
        // Update the layout for the child widgets.
        phosphor_messaging_1.sendMessage(this, phosphor_widget_1.Widget.MsgUpdateRequest);
    };
    /**
     * Layout the children using the given offset width and height.
     */
    StackedPanel.prototype._layoutChildren = function (offsetWidth, offsetHeight) {
        // Bail early if there is no current widget.
        var widget = this.currentWidget;
        if (!widget) {
            return;
        }
        // Ensure the box sizing is created.
        var box = this._box || (this._box = phosphor_domutil_1.boxSizing(this.node));
        // Compute the actual layout bounds adjusted for border and padding.
        var top = box.paddingTop;
        var left = box.paddingLeft;
        var width = offsetWidth - box.horizontalSum;
        var height = offsetHeight - box.verticalSum;
        // Update the current widget's layout geometry.
        setGeometry(widget, left, top, width, height);
    };
    /**
     * The change handler for the [[currentWidgetProperty]].
     */
    StackedPanel.prototype._onCurrentWidgetChanged = function (old, val) {
        if (old)
            old.hidden = true;
        if (val)
            val.hidden = false;
        // Ideally, the layout request would be posted in order to take
        // advantage of message compression, but some browsers repaint
        // before the message gets processed, resulting in jitter. So,
        // the layout request is sent and processed immediately.
        phosphor_messaging_1.sendMessage(this, phosphor_widget_1.Panel.MsgLayoutRequest);
    };
    /**
     * The property descriptor for the current widget.
     *
     * This controls which child widget is currently visible.
     *
     * **See also:** [[currentWidget]]
     */
    StackedPanel.currentWidgetProperty = new phosphor_properties_1.Property({
        name: 'currentWidget',
        value: null,
        coerce: function (owner, val) { return (val && val.parent === owner) ? val : null; },
        changed: function (owner, old, val) { return owner._onCurrentWidgetChanged(old, val); },
        notify: new phosphor_signaling_1.Signal(),
    });
    return StackedPanel;
})(phosphor_widget_1.Panel);
exports.StackedPanel = StackedPanel;
/**
 * A private attached property which stores a widget offset rect.
 */
var rectProperty = new phosphor_properties_1.Property({
    name: 'rect',
    create: createRect,
});
/**
 * Create a new offset rect filled with NaNs.
 */
function createRect() {
    return { top: NaN, left: NaN, width: NaN, height: NaN };
}
/**
 * Get the offset rect for a widget.
 */
function getRect(widget) {
    return rectProperty.get(widget);
}
/**
 * Set the offset geometry for the given widget.
 *
 * A resize message will be dispatched to the widget if appropriate.
 */
function setGeometry(widget, left, top, width, height) {
    var resized = false;
    var rect = getRect(widget);
    var style = widget.node.style;
    if (rect.top !== top) {
        rect.top = top;
        style.top = top + 'px';
    }
    if (rect.left !== left) {
        rect.left = left;
        style.left = left + 'px';
    }
    if (rect.width !== width) {
        resized = true;
        rect.width = width;
        style.width = width + 'px';
    }
    if (rect.height !== height) {
        resized = true;
        rect.height = height;
        style.height = height + 'px';
    }
    if (resized) {
        phosphor_messaging_1.sendMessage(widget, new phosphor_widget_1.ResizeMessage(width, height));
    }
}
/**
 * Reset the inline geometry and rect cache for the given widget
 */
function resetGeometry(widget) {
    var rect = getRect(widget);
    var style = widget.node.style;
    rect.top = NaN;
    rect.left = NaN;
    rect.width = NaN;
    rect.height = NaN;
    style.top = '';
    style.left = '';
    style.width = '';
    style.height = '';
}

},{"./index.css":17,"phosphor-domutil":8,"phosphor-messaging":9,"phosphor-properties":12,"phosphor-signaling":14,"phosphor-widget":26}],19:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\n.p-TabBar {\n  position: relative;\n  z-index: 0;\n}\n.p-TabBar-header {\n  display: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 0;\n}\n.p-TabBar-body {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 2;\n}\n.p-TabBar-footer {\n  display: none;\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 1;\n}\n.p-TabBar-content {\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  display: flex;\n  flex-direction: row;\n  list-style-type: none;\n}\n.p-Tab {\n  display: flex;\n  flex-direction: row;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.p-Tab-icon,\n.p-Tab-close {\n  flex: 0 0 auto;\n}\n.p-Tab-text {\n  flex: 1 1 auto;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.p-TabBar.p-mod-dragging .p-Tab {\n  position: relative;\n  left: 0;\n  transition: left 150ms ease;\n}\n.p-TabBar.p-mod-dragging .p-Tab.p-mod-dragging {\n  transition: none;\n}\n.p-TabPanel {\n  z-index: 0;\n}\n.p-TabPanel > .p-TabBar {\n  z-index: 1;\n}\n.p-TabPanel > .p-StackedPanel {\n  z-index: 0;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-tabs/lib/index.css"})); module.exports = css;
},{"browserify-css":3}],20:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./tabbar'));
__export(require('./tabpanel'));
require('./index.css');

},{"./index.css":19,"./tabbar":21,"./tabpanel":22}],21:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var arrays = require('phosphor-arrays');
var phosphor_domutil_1 = require('phosphor-domutil');
var phosphor_messaging_1 = require('phosphor-messaging');
var phosphor_nodewrapper_1 = require('phosphor-nodewrapper');
var phosphor_observablelist_1 = require('phosphor-observablelist');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_signaling_1 = require('phosphor-signaling');
var phosphor_widget_1 = require('phosphor-widget');
/**
 * The class name added to TabBar instances.
 */
var TAB_BAR_CLASS = 'p-TabBar';
/**
 * The class name added to the tab bar header node.
 */
var HEADER_CLASS = 'p-TabBar-header';
/**
 * The class name added to the tab bar body node.
 */
var BODY_CLASS = 'p-TabBar-body';
/**
 * The class name added to the tab bar content node.
 */
var CONTENT_CLASS = 'p-TabBar-content';
/**
 * The class name added to the tab bar footer node.
 */
var FOOTER_CLASS = 'p-TabBar-footer';
/**
 * The class name added to Tab instances.
 */
var TAB_CLASS = 'p-Tab';
/**
 * The class name added to a tab text node.
 */
var TEXT_CLASS = 'p-Tab-text';
/**
 * The class name added to a tab icon node.
 */
var ICON_CLASS = 'p-Tab-icon';
/**
 * The class name added to a tab close node.
 */
var CLOSE_CLASS = 'p-Tab-close';
/**
 * The class name added to a tab bar and tab when dragging.
 */
var DRAGGING_CLASS = 'p-mod-dragging';
/**
 * The class name added to the current tab.
 */
var CURRENT_CLASS = 'p-mod-current';
/**
 * The class name added to a closable tab.
 */
var CLOSABLE_CLASS = 'p-mod-closable';
/**
 * A class name added to the first tab in the tab bar.
 */
var FIRST_CLASS = 'p-mod-first';
/**
 * A class name added to the last tab in the tab bar.
 */
var LAST_CLASS = 'p-mod-last';
/**
 * The start drag distance threshold.
 */
var DRAG_THRESHOLD = 5;
/**
 * The tear-off distance threshold.
 */
var TEAR_OFF_THRESHOLD = 20;
/**
 * The tab transition duration.
 */
var TRANSITION_DURATION = 150; // Keep in sync with CSS.
/**
 * A widget which displays a list of tab items as a row of tabs.
 */
var TabBar = (function (_super) {
    __extends(TabBar, _super);
    /**
     * Construct a new tab bar.
     */
    function TabBar() {
        _super.call(this);
        this._tabs = [];
        this._dragData = null;
        this.addClass(TAB_BAR_CLASS);
    }
    /**
     * Create the DOM node for a tab bar.
     */
    TabBar.createNode = function () {
        var node = document.createElement('div');
        var header = document.createElement('div');
        var body = document.createElement('div');
        var content = document.createElement('ul');
        var footer = document.createElement('div');
        header.className = HEADER_CLASS;
        body.className = BODY_CLASS;
        content.className = CONTENT_CLASS;
        footer.className = FOOTER_CLASS;
        body.appendChild(content);
        node.appendChild(header);
        node.appendChild(body);
        node.appendChild(footer);
        return node;
    };
    /**
     * Dispose of the resources held by the widget.
     */
    TabBar.prototype.dispose = function () {
        this._releaseMouse();
        this._tabs.forEach(function (tab) { tab.dispose(); });
        this._tabs.length = 0;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(TabBar.prototype, "itemCloseRequested", {
        /**
         * A signal emitted when the user clicks a tab item's close icon.
         *
         * #### Notes
         * This is a pure delegate to the [[itemCloseRequestedSignal]].
         */
        get: function () {
            return TabBar.itemCloseRequestedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "currentItem", {
        /**
         * Get the currently selected tab item.
         *
         * #### Notes
         * This is a pure delegate to the [[currentItemProperty]].
         */
        get: function () {
            return TabBar.currentItemProperty.get(this);
        },
        /**
         * Set the currently selected tab item.
         *
         * #### Notes
         * This is a pure delegate to the [[currentItemProperty]].
         */
        set: function (value) {
            TabBar.currentItemProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "currentItemChanged", {
        /**
         * A signal emitted when the current tab item is changed.
         *
         * #### Notes
         * This is the notify signal for the [[currentItemProperty]].
         */
        get: function () {
            return TabBar.currentItemProperty.notify.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "items", {
        /**
         * Get the list of tab items for the tab bar.
         *
         * #### Notes
         * This is a pure delegate to the [[itemsProperty]].
         */
        get: function () {
            return TabBar.itemsProperty.get(this);
        },
        /**
         * Set the list tab items for the tab bar.
         *
         * #### Notes
         * This is a pure delegate to the [[itemsProperty]].
         */
        set: function (value) {
            TabBar.itemsProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "tabsMovable", {
        /**
         * Get whether the tabs are movable by the user.
         *
         * #### Notes
         * This is a pure delegate to the [[tabsMovableProperty]].
         */
        get: function () {
            return TabBar.tabsMovableProperty.get(this);
        },
        /**
         * Set whether the tabs are movable by the user.
         *
         * #### Notes
         * This is a pure delegate to the [[tabsMovableProperty]].
         */
        set: function (value) {
            TabBar.tabsMovableProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "headerNode", {
        /**
         * Get the tab bar header node.
         *
         * #### Notes
         * This can be used to add extra header content.
         */
        get: function () {
            return this.node.getElementsByClassName(HEADER_CLASS)[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "bodyNode", {
        /**
         * Get the tab bar body node.
         *
         * #### Notes
         * This can be used to add extra body content.
         */
        get: function () {
            return this.node.getElementsByClassName(BODY_CLASS)[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "contentNode", {
        /**
         * Get the tab bar content node.
         *
         * #### Notes
         * This is the node which holds the tab nodes. Modifying the content
         * of this node indiscriminately can lead to undesired behavior.
         */
        get: function () {
            return this.node.getElementsByClassName(CONTENT_CLASS)[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar.prototype, "footerNode", {
        /**
         * Get the tab bar footer node.
         *
         * #### Notes
         * This can be used to add extra footer content.
         */
        get: function () {
            return this.node.getElementsByClassName(FOOTER_CLASS)[0];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Release the mouse and restore the non-dragged tab positions.
     *
     * #### Notes
     * This will cause the tab bar to stop handling mouse events and to
     * restore the tabs to their non-dragged positions. It is intended
     * to be called when implementing tear off tabs.
     *
     * **See also:** [[onTearOffRequest]]
     */
    TabBar.prototype.releaseMouse = function () {
        this._releaseMouse();
    };
    /**
     * Handle the DOM events for the tab bar.
     *
     * @param event - The DOM event sent to the tab bar.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the tab bar's DOM node. It should
     * not be called directly by user code.
     */
    TabBar.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'click':
                this._evtClick(event);
                break;
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'mousemove':
                this._evtMouseMove(event);
                break;
            case 'mouseup':
                this._evtMouseUp(event);
                break;
        }
    };
    /**
     * Process a message sent to the tab bar.
     *
     * @param msg - The message sent to the tab bar.
     *
     * #### Notes
     * Subclasses may reimplement this method as needed.
     */
    TabBar.prototype.processMessage = function (msg) {
        if (msg.type === 'tear-off-request') {
            this.onTearOffRequest(msg);
        }
        else {
            _super.prototype.processMessage.call(this, msg);
        }
    };
    /**
     * A message handler invoked on a `'tear-off-request'` message.
     *
     * #### Notes
     * This may be reimplemented by subclasses to support tear-off tabs.
     *
     * The reimplementation should take whatever action is necessary for
     * its use case to continue the drag from the given client position.
     * This will typically involve creating a new DOM node to represent
     * the drag item, and may or may not include removing the specified
     * item from the tab bar.
     *
     * If the reimplementation handles the tear-off, it should call the
     * [[releaseMouse]] method so that the tab bar ceases its handling
     * of mouse events.
     *
     * The default implementation of this handler is a no-op.
     */
    TabBar.prototype.onTearOffRequest = function (msg) { };
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    TabBar.prototype.onAfterAttach = function (msg) {
        this.node.addEventListener('click', this);
        this.node.addEventListener('mousedown', this);
    };
    /**
     * A message handler invoked on a `'before-detach'` message.
     */
    TabBar.prototype.onBeforeDetach = function (msg) {
        this.node.removeEventListener('click', this);
        this.node.removeEventListener('mousedown', this);
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     *
     * This handler updates the flex order and z-index of the tabs.
     */
    TabBar.prototype.onUpdateRequest = function (msg) {
        for (var i = 0, n = this._tabs.length, k = n - 1; i < n; ++i) {
            var tab = this._tabs[i];
            var style = tab.node.style;
            if (tab.hasClass(CURRENT_CLASS)) {
                style.zIndex = n + '';
            }
            else {
                style.zIndex = k-- + '';
            }
            style.order = i + '';
            tab.toggleClass(FIRST_CLASS, i === 0);
            tab.toggleClass(LAST_CLASS, i === n - 1);
        }
    };
    /**
     * Handle the `'click'` event for the tab bar.
     */
    TabBar.prototype._evtClick = function (event) {
        // Do nothing if it's not a left click.
        if (event.button !== 0) {
            return;
        }
        // Do nothing if the click is not on a tab.
        var index = hitTestTabs(this._tabs, event.clientX, event.clientY);
        if (index < 0) {
            return;
        }
        // Clicking on a tab stops the event propagation.
        event.preventDefault();
        event.stopPropagation();
        // Emit the close requested signal if the close icon was clicked.
        var tab = this._tabs[index];
        if (tab.closeNode.contains(event.target)) {
            this.itemCloseRequested.emit(tab.item);
        }
    };
    /**
     * Handle the `'mousedown'` event for the tab bar.
     */
    TabBar.prototype._evtMouseDown = function (event) {
        // Do nothing if it's not a left mouse press.
        if (event.button !== 0) {
            return;
        }
        // Bail if a previous drag is still transitioning.
        if (this._dragData) {
            return;
        }
        // Do nothing if the press is not on a tab.
        var index = hitTestTabs(this._tabs, event.clientX, event.clientY);
        if (index < 0) {
            return;
        }
        // Pressing on a tab stops the event propagation.
        event.preventDefault();
        event.stopPropagation();
        // Do nothing if the press was on a close icon node.
        var tab = this._tabs[index];
        if (tab.closeNode.contains(event.target)) {
            return;
        }
        // Setup the drag if the tabs are movable.
        if (this.tabsMovable) {
            var tabRect = tab.node.getBoundingClientRect();
            var data = this._dragData = new DragData();
            data.tab = tab;
            data.tabIndex = index;
            data.tabLeft = tab.node.offsetLeft;
            data.tabWidth = tabRect.width;
            data.pressX = event.clientX;
            data.pressY = event.clientY;
            data.tabPressX = event.clientX - tabRect.left;
            document.addEventListener('mouseup', this, true);
            document.addEventListener('mousemove', this, true);
        }
        // Update the current item to the pressed item.
        this.currentItem = tab.item;
    };
    /**
     * Handle the `'mousemove'` event for the tab bar.
     */
    TabBar.prototype._evtMouseMove = function (event) {
        // Mouse move events are never propagated since this handler
        // is only installed when during a left mouse drag operation.
        event.preventDefault();
        event.stopPropagation();
        // Bail if there is no drag in progress.
        var data = this._dragData;
        if (!data) {
            return;
        }
        // Check to see if the drag threshold has been exceeded, and
        // start the tab drag operation the first time that occurs.
        if (!data.dragActive) {
            var dx = Math.abs(event.clientX - data.pressX);
            var dy = Math.abs(event.clientY - data.pressY);
            if (dx < DRAG_THRESHOLD && dy < DRAG_THRESHOLD) {
                return;
            }
            // Fill in the remaining drag data.
            data.contentRect = this.contentNode.getBoundingClientRect();
            data.tabLayout = snapTabLayout(this._tabs);
            data.cursorGrab = phosphor_domutil_1.overrideCursor('default');
            data.dragActive = true;
            // Add the dragging style classes.
            data.tab.addClass(DRAGGING_CLASS);
            this.addClass(DRAGGING_CLASS);
        }
        // Check to see if the tear-off threshold has been exceeded.
        if (!data.tearOffRequested && tearOffExceeded(data.contentRect, event)) {
            // Only make the tear-off request once per drag action.
            data.tearOffRequested = true;
            // Send the tear-off request message to the tab bar.
            var item = data.tab.item;
            var node = data.tab.node;
            var clientX = event.clientX;
            var clientY = event.clientY;
            phosphor_messaging_1.sendMessage(this, new TearOffMessage(item, node, clientX, clientY));
            // Do nothing further if the mouse has been released.
            if (!this._dragData) {
                return;
            }
        }
        // Compute the target bounds of the drag tab.
        var offsetLeft = event.clientX - data.contentRect.left;
        var targetLeft = offsetLeft - data.tabPressX;
        var targetRight = targetLeft + data.tabWidth;
        // Reset the target tab index.
        data.tabTargetIndex = data.tabIndex;
        // Update the non-drag tab positions and the tab target index.
        var tabs = this._tabs;
        for (var i = 0, n = tabs.length; i < n; ++i) {
            var style = tabs[i].node.style;
            var layout = data.tabLayout[i];
            var threshold = layout.left + (layout.width >> 1);
            if (i < data.tabIndex && targetLeft < threshold) {
                style.left = data.tabWidth + data.tabLayout[i + 1].margin + 'px';
                data.tabTargetIndex = Math.min(data.tabTargetIndex, i);
            }
            else if (i > data.tabIndex && targetRight > threshold) {
                style.left = -data.tabWidth - layout.margin + 'px';
                data.tabTargetIndex = i;
            }
            else if (i !== data.tabIndex) {
                style.left = '';
            }
        }
        // Update the drag tab position.
        var idealLeft = event.clientX - data.pressX;
        var maxLeft = data.contentRect.width - (data.tabLeft + data.tabWidth);
        var adjustedLeft = Math.max(-data.tabLeft, Math.min(idealLeft, maxLeft));
        data.tab.node.style.left = adjustedLeft + 'px';
    };
    /**
     * Handle the `'mouseup'` event for the tab bar.
     */
    TabBar.prototype._evtMouseUp = function (event) {
        var _this = this;
        // Do nothing if the left mouse button is not released.
        if (event.button !== 0) {
            return;
        }
        // Mouse up events are never propagated since this handler
        // is only installed when during a left mouse drag operation.
        event.preventDefault();
        event.stopPropagation();
        // Bail if there is no drag in progress.
        var data = this._dragData;
        if (!data) {
            return;
        }
        // Remove the extra mouse handlers.
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('mousemove', this, true);
        // If the drag is not active, clear the reference and bail.
        if (!data.dragActive) {
            this._dragData = null;
            return;
        }
        // Compute the approximate final relative tab offset.
        var idealLeft;
        if (data.tabTargetIndex === data.tabIndex) {
            idealLeft = 0;
        }
        else if (data.tabTargetIndex > data.tabIndex) {
            var tl = data.tabLayout[data.tabTargetIndex];
            idealLeft = tl.left + tl.width - data.tabWidth - data.tabLeft;
        }
        else {
            var tl = data.tabLayout[data.tabTargetIndex];
            idealLeft = tl.left - data.tabLeft;
        }
        // Position the tab to its final position, subject to limits.
        var maxLeft = data.contentRect.width - (data.tabLeft + data.tabWidth);
        var adjustedLeft = Math.max(-data.tabLeft, Math.min(idealLeft, maxLeft));
        data.tab.node.style.left = adjustedLeft + 'px';
        // Remove the dragging class from the tab so it can be transitioned.
        data.tab.removeClass(DRAGGING_CLASS);
        // Complete the release on a timer to allow the tab to transition.
        setTimeout(function () {
            // Bail if the drag data has been changed or released.
            if (_this._dragData !== data) {
                return;
            }
            // Clear the drag data reference.
            _this._dragData = null;
            // Clear the relative tab positions.
            for (var i = 0, n = _this._tabs.length; i < n; ++i) {
                _this._tabs[i].node.style.left = '';
            }
            // Clear the cursor grab and drag styles.
            data.cursorGrab.dispose();
            _this.removeClass(DRAGGING_CLASS);
            // Finally, move the tab item to the new location.
            var fromIndex = data.tabIndex;
            var toIndex = data.tabTargetIndex;
            if (toIndex !== -1 && fromIndex !== toIndex) {
                _this.items.move(fromIndex, toIndex);
                // Force an update to prevent flicker on IE.
                phosphor_messaging_1.sendMessage(_this, phosphor_widget_1.Widget.MsgUpdateRequest);
            }
        }, TRANSITION_DURATION);
    };
    /**
     * Release the mouse and restore the non-dragged tab positions.
     */
    TabBar.prototype._releaseMouse = function () {
        // Bail early if there is no drag in progress.
        var data = this._dragData;
        if (!data) {
            return;
        }
        // Clear the drag data reference.
        this._dragData = null;
        // Remove the extra mouse listeners.
        document.removeEventListener('mouseup', this, true);
        document.removeEventListener('mousemove', this, true);
        // If the drag is not active, there's nothing left to do.
        if (!data.dragActive) {
            return;
        }
        // Reset the positions of the tabs.
        for (var i = 0, n = this._tabs.length; i < n; ++i) {
            this._tabs[i].node.style.left = '';
        }
        // Clear the cursor grab and drag styles.
        data.cursorGrab.dispose();
        data.tab.removeClass(DRAGGING_CLASS);
        this.removeClass(DRAGGING_CLASS);
    };
    /**
     * The coerce handler for the [[currentItemProperty]].
     */
    TabBar.prototype._coerceCurrentItem = function (item) {
        var list = this.items;
        return (item && list && list.contains(item)) ? item : null;
    };
    /**
     * The change handler for the [[currentItemProperty]].
     */
    TabBar.prototype._onCurrentItemChanged = function (oldItem, newItem) {
        var oldTab = arrays.find(this._tabs, function (tab) { return tab.item === oldItem; });
        var newTab = arrays.find(this._tabs, function (tab) { return tab.item === newItem; });
        if (oldTab)
            oldTab.removeClass(CURRENT_CLASS);
        if (newTab)
            newTab.addClass(CURRENT_CLASS);
        this.update();
    };
    /**
     * The change handler for the [[itemsProperty]].
     */
    TabBar.prototype._onItemsChanged = function (oldList, newList) {
        // Ensure the mouse is released.
        this._releaseMouse();
        // Disconnect the old list and dispose the old tabs.
        if (oldList) {
            oldList.changed.disconnect(this._onItemsListChanged, this);
            var content = this.contentNode;
            while (this._tabs.length) {
                var tab = this._tabs.pop();
                content.removeChild(tab.node);
                tab.dispose();
            }
        }
        // Create the new tabs and connect the new list.
        if (newList) {
            var content = this.contentNode;
            for (var i = 0, n = newList.length; i < n; ++i) {
                var tab = new Tab(newList.get(i));
                content.appendChild(tab.node);
                this._tabs.push(tab);
            }
            newList.changed.connect(this._onItemsListChanged, this);
        }
        // Update the current item.
        this.currentItem = newList && newList.get(0);
        // Update the tab node order.
        this.update();
    };
    /**
     * The change handler for the items list `changed` signal.
     */
    TabBar.prototype._onItemsListChanged = function (sender, args) {
        switch (args.type) {
            case phosphor_observablelist_1.ListChangeType.Add:
                this._onItemsListAdd(args);
                break;
            case phosphor_observablelist_1.ListChangeType.Move:
                this._onItemsListMove(args);
                break;
            case phosphor_observablelist_1.ListChangeType.Remove:
                this._onItemsListRemove(args);
                break;
            case phosphor_observablelist_1.ListChangeType.Replace:
                this._onItemsListReplace(args);
                break;
            case phosphor_observablelist_1.ListChangeType.Set:
                this._onItemsListSet(args);
                break;
        }
    };
    /**
     * The handler invoked on a items list change of type `Add`.
     */
    TabBar.prototype._onItemsListAdd = function (args) {
        // Ensure the mouse is released.
        this._releaseMouse();
        // Create the tab for the new tab item.
        var tab = new Tab(args.newValue);
        // Add the tab to the same location in the internal array.
        arrays.insert(this._tabs, args.newIndex, tab);
        // Add the tab node to the DOM. The position is irrelevant.
        this.contentNode.appendChild(tab.node);
        // Select the tab if no tab is currently selected.
        if (!this.currentItem)
            this.currentItem = tab.item;
        // Update the tab node order.
        this.update();
    };
    /**
     * The handler invoked on a items list change of type `Move`.
     */
    TabBar.prototype._onItemsListMove = function (args) {
        // Ensure the mouse is released.
        this._releaseMouse();
        // Move the tab in the array. DOM position is irrelevant.
        arrays.move(this._tabs, args.oldIndex, args.newIndex);
        // Update the tab node order.
        this.update();
    };
    /**
     * The handler invoked on a items list change of type `Remove`.
     */
    TabBar.prototype._onItemsListRemove = function (args) {
        // Ensure the mouse is released.
        this._releaseMouse();
        // Remove the tab from the internal array.
        var tab = arrays.removeAt(this._tabs, args.oldIndex);
        // Remove the tab node from the DOM.
        this.contentNode.removeChild(tab.node);
        // Patch up the current item if needed.
        if (this.currentItem === tab.item) {
            var list = this.items;
            this.currentItem = list.get(args.oldIndex) || list.get(-1);
        }
        // Dispose of the old tab.
        tab.dispose();
        // Update the tab node order.
        this.update();
    };
    /**
     * The handler invoked on a items list change of type `Replace`.
     */
    TabBar.prototype._onItemsListReplace = function (args) {
        // Ensure the mouse is released.
        this._releaseMouse();
        // Create the new tabs for the new tab items.
        var newItems = args.newValue;
        var newTabs = newItems.map(function (item) { return new Tab(item); });
        // Replace the tabs in the internal array.
        var oldItems = args.oldValue;
        var oldTabs = (_a = this._tabs).splice.apply(_a, [args.newIndex, oldItems.length].concat(newTabs));
        // Remove the old tabs from the DOM.
        var content = this.contentNode;
        oldTabs.forEach(function (tab) { content.removeChild(tab.node); });
        // Add the new tabs to the DOM. Their position is irrelevant.
        newTabs.forEach(function (tab) { content.appendChild(tab.node); });
        // Patch up the current item if needed.
        var curr = this.currentItem;
        if (oldItems.indexOf(curr) !== -1) {
            this.currentItem = null;
            if (newItems.indexOf(curr) !== -1) {
                this.currentItem = curr;
            }
            else {
                var list = this.items;
                this.currentItem = list.get(args.newIndex) || list.get(-1);
            }
        }
        // Dispose of the old tabs.
        oldTabs.forEach(function (tab) { tab.dispose(); });
        // Update the tab node order.
        this.update();
        var _a;
    };
    /**
     * The handler invoked on a items list change of type `Set`.
     */
    TabBar.prototype._onItemsListSet = function (args) {
        // If the item was not actually changed, there is nothing to do.
        if (args.oldValue === args.newValue) {
            return;
        }
        // Ensure the mouse is released.
        this._releaseMouse();
        // Create the tab for the new tab item.
        var newTab = new Tab(args.newValue);
        // Swap the new tab in the internal array.
        var oldTab = this._tabs[args.newIndex];
        this._tabs[args.newIndex] = newTab;
        // Swap the new tab node in the DOM.
        this.contentNode.replaceChild(newTab.node, oldTab.node);
        // Patch up the current item if needed.
        if (this.currentItem === oldTab.item) {
            this.currentItem = newTab.item;
        }
        // Dispose of the old tab.
        oldTab.dispose();
        // Update the tab node order.
        this.update();
    };
    /**
     * A signal emitted when the user clicks a tab item's close icon.
     *
     * **See also:** [[itemCloseRequested]]
     */
    TabBar.itemCloseRequestedSignal = new phosphor_signaling_1.Signal();
    /**
     * The property descriptor for the currently selected tab item.
     *
     * **See also:** [[currentItem]]
     */
    TabBar.currentItemProperty = new phosphor_properties_1.Property({
        name: 'currentItem',
        value: null,
        coerce: function (owner, value) { return owner._coerceCurrentItem(value); },
        changed: function (owner, old, value) { owner._onCurrentItemChanged(old, value); },
        notify: new phosphor_signaling_1.Signal(),
    });
    /**
     * The property descriptor for the observable list of tab items.
     *
     * **See also:** [[items]]
     */
    TabBar.itemsProperty = new phosphor_properties_1.Property({
        name: 'items',
        value: null,
        coerce: function (owner, value) { return value || null; },
        changed: function (owner, old, value) { owner._onItemsChanged(old, value); },
    });
    /**
     * The property descriptor for whether the tabs are user-movable.
     *
     * **See also:** [[tabsMovable]]
     */
    TabBar.tabsMovableProperty = new phosphor_properties_1.Property({
        name: 'tabsMovable',
        value: false,
        changed: function (owner) { owner._releaseMouse(); },
    });
    return TabBar;
})(phosphor_widget_1.Widget);
exports.TabBar = TabBar;
/**
 * A message class for `'tear-off-request'` messages.
 *
 * #### Notes
 * A message of this type is sent to a tab bar when the user drags
 * a tab beyond the tear-off threshold which surrounds the tab bar.
 */
var TearOffMessage = (function (_super) {
    __extends(TearOffMessage, _super);
    /**
     * Construct a new tear off request message.
     *
     * @param item - The tab item being dragged by the user.
     *
     * @param node - The DOM node for the item tab.
     *
     * @param clientX - The current client X position of the mouse.
     *
     * @param clientY - The current client Y position of the mouse.
     */
    function TearOffMessage(item, node, clientX, clientY) {
        _super.call(this, 'tear-off-request');
        this._item = item;
        this._node = node;
        this._clientX = clientX;
        this._clientY = clientY;
    }
    Object.defineProperty(TearOffMessage.prototype, "item", {
        /**
         * The tab item being dragged by the user.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._item;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TearOffMessage.prototype, "node", {
        /**
         * The DOM node which represents the tab.
         *
         * #### Notes
         * This node *must not* be removed from the DOM, but it can be cloned
         * for use as a ghost node which follows the cursor during dragging.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._node;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TearOffMessage.prototype, "clientX", {
        /**
         * The current client X position of the mouse.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._clientX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TearOffMessage.prototype, "clientY", {
        /**
         * The current client Y position of the mouse.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._clientY;
        },
        enumerable: true,
        configurable: true
    });
    return TearOffMessage;
})(phosphor_messaging_1.Message);
exports.TearOffMessage = TearOffMessage;
/**
 * An object which manages a tab node for a tab bar.
 */
var Tab = (function (_super) {
    __extends(Tab, _super);
    /**
     * Construct a new tab.
     *
     * @param item - The tab item to associate with the tab.
     */
    function Tab(item) {
        _super.call(this);
        this.addClass(TAB_CLASS);
        this._item = item;
        var title = item.title;
        this.textNode.textContent = title.text;
        this.toggleClass(CLOSABLE_CLASS, title.closable);
        if (title.icon)
            exAddClass(this.iconNode, title.icon);
        if (title.className)
            exAddClass(this.node, title.className);
        title.changed.connect(this._onTitleChanged, this);
    }
    /**
     * Create the DOM node for a tab.
     */
    Tab.createNode = function () {
        var node = document.createElement('li');
        var icon = document.createElement('span');
        var text = document.createElement('span');
        var close = document.createElement('span');
        icon.className = ICON_CLASS;
        text.className = TEXT_CLASS;
        close.className = CLOSE_CLASS;
        node.appendChild(icon);
        node.appendChild(text);
        node.appendChild(close);
        return node;
    };
    /**
     * Dispose of the resources held by the tab.
     */
    Tab.prototype.dispose = function () {
        this._item = null;
        phosphor_signaling_1.clearSignalData(this);
    };
    Object.defineProperty(Tab.prototype, "isDisposed", {
        /**
         * Test whether the tab is disposed.
         */
        get: function () {
            return this._item === null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "iconNode", {
        /**
         * Get the icon node for the tab.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this.node.childNodes[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "textNode", {
        /**
         * Get the text node for the tab.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this.node.childNodes[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "closeNode", {
        /**
         * Get the close icon node for the tab.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this.node.childNodes[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "item", {
        /**
         * Get the tab item associated with the tab.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._item;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The handler for the title `changed` signal.
     */
    Tab.prototype._onTitleChanged = function (sender, args) {
        switch (args.name) {
            case 'text':
                this._onTitleTextChanged(args);
                break;
            case 'icon':
                this._onTitleIconChanged(args);
                break;
            case 'closable':
                this._onTitleClosableChanged(args);
                break;
            case 'className':
                this._onTitleClassNameChanged(args);
                break;
        }
    };
    /**
     * A method invoked when the title text changes.
     */
    Tab.prototype._onTitleTextChanged = function (args) {
        this.textNode.textContent = args.newValue;
    };
    /**
     * A method invoked when the title icon changes.
     */
    Tab.prototype._onTitleIconChanged = function (args) {
        var node = this.iconNode;
        if (args.oldValue)
            exRemClass(node, args.oldValue);
        if (args.newValue)
            exAddClass(node, args.newValue);
    };
    /**
     * A method invoked when the title closable flag changes.
     */
    Tab.prototype._onTitleClosableChanged = function (args) {
        this.toggleClass(CLOSABLE_CLASS, args.newValue);
    };
    /**
     * A method invoked when the title class name changes.
     */
    Tab.prototype._onTitleClassNameChanged = function (args) {
        var node = this.node;
        if (args.oldValue)
            exRemClass(node, args.oldValue);
        if (args.newValue)
            exAddClass(node, args.newValue);
    };
    return Tab;
})(phosphor_nodewrapper_1.NodeWrapper);
/**
 * A struct which holds the drag data for a tab bar.
 */
var DragData = (function () {
    function DragData() {
        /**
         * The tab object being dragged.
         */
        this.tab = null;
        /**
         * The index of the tab being dragged.
         */
        this.tabIndex = -1;
        /**
         * The offset left of the tab being dragged.
         */
        this.tabLeft = -1;
        /**
         * The offset width of the tab being dragged.
         */
        this.tabWidth = -1;
        /**
         * The original mouse X position in tab coordinates.
         */
        this.tabPressX = -1;
        /**
         * The tab target index upon mouse release.
         */
        this.tabTargetIndex = -1;
        /**
         * The array of tab layout objects snapped at drag start.
         */
        this.tabLayout = null;
        /**
         * The mouse press client X position.
         */
        this.pressX = -1;
        /**
         * The mouse press client Y position.
         */
        this.pressY = -1;
        /**
         * The bounding client rect of the tab bar content node.
         */
        this.contentRect = null;
        /**
         * The disposable to clean up the cursor override.
         */
        this.cursorGrab = null;
        /**
         * Whether the drag is currently active.
         */
        this.dragActive = false;
        /**
         * Whether a tear-off request as been made.
         */
        this.tearOffRequested = false;
    }
    return DragData;
})();
/**
 * Add a whitespace separated class name to the given node.
 */
function exAddClass(node, name) {
    var list = node.classList;
    var parts = name.split(/\s+/);
    for (var i = 0, n = parts.length; i < n; ++i) {
        if (parts[i])
            list.add(parts[i]);
    }
}
/**
 * Remove a whitespace separated class name to the given node.
 */
function exRemClass(node, name) {
    var list = node.classList;
    var parts = name.split(/\s+/);
    for (var i = 0, n = parts.length; i < n; ++i) {
        if (parts[i])
            list.remove(parts[i]);
    }
}
/**
 * Perform a client position hit test an array of tabs.
 *
 * Returns the index of the first matching node, or `-1`.
 */
function hitTestTabs(tabs, clientX, clientY) {
    for (var i = 0, n = tabs.length; i < n; ++i) {
        if (phosphor_domutil_1.hitTest(tabs[i].node, clientX, clientY))
            return i;
    }
    return -1;
}
/**
 * Get a snapshot of the current tab layout values.
 */
function snapTabLayout(tabs) {
    var layout = new Array(tabs.length);
    for (var i = 0, n = tabs.length; i < n; ++i) {
        var node = tabs[i].node;
        var left = node.offsetLeft;
        var width = node.offsetWidth;
        var cstyle = window.getComputedStyle(node);
        var margin = parseInt(cstyle.marginLeft, 10) || 0;
        layout[i] = { margin: margin, left: left, width: width };
    }
    return layout;
}
/**
 * Test if a mouse position exceeds the tear-off threshold.
 */
function tearOffExceeded(rect, event) {
    return ((event.clientX < rect.left - TEAR_OFF_THRESHOLD) ||
        (event.clientX >= rect.right + TEAR_OFF_THRESHOLD) ||
        (event.clientY < rect.top - TEAR_OFF_THRESHOLD) ||
        (event.clientY >= rect.bottom + TEAR_OFF_THRESHOLD));
}

},{"phosphor-arrays":4,"phosphor-domutil":8,"phosphor-messaging":9,"phosphor-nodewrapper":10,"phosphor-observablelist":11,"phosphor-properties":12,"phosphor-signaling":14,"phosphor-widget":26}],22:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_boxpanel_1 = require('phosphor-boxpanel');
var phosphor_stackedpanel_1 = require('phosphor-stackedpanel');
var tabbar_1 = require('./tabbar');
/**
 * The class name added to TabPanel instances.
 */
var TAB_PANEL_CLASS = 'p-TabPanel';
/**
 * A panel which combines a `TabBar` and a `StackedPanel`.
 *
 * #### Notes
 * Children for this panel should be added to the [[widgets]] list.
 */
var TabPanel = (function (_super) {
    __extends(TabPanel, _super);
    /**
     * Construct a new tab panel.
     */
    function TabPanel() {
        _super.call(this);
        this.addClass(TAB_PANEL_CLASS);
        var ctor = this.constructor;
        this._tabs = ctor.createTabBar();
        this._stack = ctor.createStackedPanel();
        this._tabs.items = this._stack.children;
        this._tabs.currentItemChanged.connect(this.onCurrentItemChanged, this);
        this._tabs.itemCloseRequested.connect(this.onItemCloseRequested, this);
        phosphor_boxpanel_1.BoxPanel.setStretch(this._tabs, 0);
        phosphor_boxpanel_1.BoxPanel.setStretch(this._stack, 1);
        this.direction = phosphor_boxpanel_1.BoxPanel.TopToBottom;
        this.spacing = 0;
        this.children.add(this._tabs);
        this.children.add(this._stack);
    }
    /**
     * Create the `TabBar` for the tab panel.
     *
     * @returns The tab bar to use with the tab panel.
     *
     * #### Notes
     * This may be reimplemented by a subclass to create a custom
     * tab bar for use with the tab panel.
     */
    TabPanel.createTabBar = function () {
        return new tabbar_1.TabBar();
    };
    /**
     * Create the `StackedPanel` for the tab panel.
     *
     * @returns The stacked panel to use with the tab panel.
     *
     * #### Notes
     * This may be reimplemented by a subclass to create a custom
     * stacked panel for use with the tab panel.
     */
    TabPanel.createStackedPanel = function () {
        return new phosphor_stackedpanel_1.StackedPanel();
    };
    /**
     * Dispose of the resources held by the widget.
     */
    TabPanel.prototype.dispose = function () {
        this._tabs = null;
        this._stack = null;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(TabPanel.prototype, "currentWidget", {
        /**
         * Get the currently selected widget.
         *
         * #### Notes
         * This is a convenience alias to the `currentItem` property of the
         * tab bar.
         */
        get: function () {
            return this._tabs.currentItem;
        },
        /**
         * Set the currently selected widget.
         *
         * #### Notes
         * This is a convenience alias to the `currentItem` property of the
         * tab bar.
         */
        set: function (widget) {
            this._tabs.currentItem = widget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "tabsMovable", {
        /**
         * Get whether the tabs are movable by the user.
         *
         * #### Notes
         * This is a convenience alias to the `tabsMovable` property of the
         * tab bar.
         */
        get: function () {
            return this._tabs.tabsMovable;
        },
        /**
         * Set whether the tabs are movable by the user.
         *
         * #### Notes
         * This is a convenience alias to the `tabsMovable` property of the
         * tab bar.
         */
        set: function (movable) {
            this._tabs.tabsMovable = movable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "widgets", {
        /**
         * Get the observable list of widgets for the tab panel.
         *
         * #### Notes
         * Widgets to arrange in the tab panel should be added to this list.
         *
         * This is a read-only alias of the `children` property of the
         * stacked panel.
         */
        get: function () {
            return this._stack.children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "tabs", {
        /**
         * Get the tab bar associated with the tab panel.
         *
         * #### Notes
         * The items in the tab bar are automatically synchronized with the
         * children of the stacked panel.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._tabs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "stack", {
        /**
         * Get the stacked panel associated with the tab panel.
         *
         * #### Notes
         * The children of the stacked panel are automatically synchronized
         * with the items in the tab bar.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._stack;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handle the `currentItemChanged` signal from the tab bar.
     *
     * #### Notes
     * This can be reimplemented by subclasses as needed.
     *
     * The default implementation of this method synchronizes the current
     * tab item with current widget of the stacked panel.
     */
    TabPanel.prototype.onCurrentItemChanged = function (sender, args) {
        this._stack.currentWidget = args.newValue;
    };
    /**
     * Handle the `itemCloseRequested` signal from the tab bar.
     *
     * #### Notes
     * This can be reimplemented by subclasses as needed.
     *
     * The default implementation of this method closes the widget if the
     * widget's title object has its `closable` flag set to `true`.
     */
    TabPanel.prototype.onItemCloseRequested = function (sender, args) {
        if (args.title.closable)
            args.close();
    };
    return TabPanel;
})(phosphor_boxpanel_1.BoxPanel);
exports.TabPanel = TabPanel;

},{"./tabbar":21,"phosphor-boxpanel":24,"phosphor-stackedpanel":18}],23:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\n.p-BoxPanel {\n  position: relative;\n}\n.p-BoxPanel > .p-Widget {\n  position: absolute;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-tabs/node_modules/phosphor-boxpanel/lib/index.css"})); module.exports = css;
},{"browserify-css":3}],24:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var arrays = require('phosphor-arrays');
var phosphor_boxengine_1 = require('phosphor-boxengine');
var phosphor_domutil_1 = require('phosphor-domutil');
var phosphor_messaging_1 = require('phosphor-messaging');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_widget_1 = require('phosphor-widget');
require('./index.css');
/**
 * The class name added to BoxPanel instances.
 */
var BOX_PANEL_CLASS = 'p-BoxPanel';
/**
 * The class name added to left-to-right box panels.
 */
var LEFT_TO_RIGHT_CLASS = 'p-mod-left-to-right';
/**
 * The class name added to right-to-left box panels.
 */
var RIGHT_TO_LEFT_CLASS = 'p-mod-right-to-left';
/**
 * The class name added to top-to-bottom box panels.
 */
var TOP_TO_BOTTOM_CLASS = 'p-mod-top-to-bottom';
/**
 * The class name added to bottom-to-top box panels.
 */
var BOTTOM_TO_TOP_CLASS = 'p-mod-bottom-to-top';
/**
 * The layout direction of a box panel.
 */
(function (Direction) {
    /**
     * Left to right direction.
     */
    Direction[Direction["LeftToRight"] = 0] = "LeftToRight";
    /**
     * Right to left direction.
     */
    Direction[Direction["RightToLeft"] = 1] = "RightToLeft";
    /**
     * Top to bottom direction.
     */
    Direction[Direction["TopToBottom"] = 2] = "TopToBottom";
    /**
     * Bottom to top direction.
     */
    Direction[Direction["BottomToTop"] = 3] = "BottomToTop";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
/**
 * A widget which arranges its children in a single row or column.
 */
var BoxPanel = (function (_super) {
    __extends(BoxPanel, _super);
    /**
     * Construct a new box panel.
     */
    function BoxPanel() {
        _super.call(this);
        this._fixedSpace = 0;
        this._box = null;
        this._sizers = [];
        this.addClass(BOX_PANEL_CLASS);
        this.addClass(TOP_TO_BOTTOM_CLASS);
    }
    /**
     * Get the box panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The box panel stretch factor for the widget.
     *
     * #### Notes
     * This is a pure delegate to the [[stretchProperty]].
     */
    BoxPanel.getStretch = function (widget) {
        return BoxPanel.stretchProperty.get(widget);
    };
    /**
     * Set the box panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the stretch factor.
     *
     * #### Notes
     * This is a pure delegate to the [[stretchProperty]].
     */
    BoxPanel.setStretch = function (widget, value) {
        BoxPanel.stretchProperty.set(widget, value);
    };
    /**
     * Get the box panel size basis for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The box panel size basis for the widget.
     *
     * #### Notes
     * This is a pure delegate to the [[sizeBasisProperty]].
     */
    BoxPanel.getSizeBasis = function (widget) {
        return BoxPanel.sizeBasisProperty.get(widget);
    };
    /**
     * Set the box panel size basis for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the size basis.
     *
     * #### Notes
     * This is a pure delegate to the [[sizeBasisProperty]].
     */
    BoxPanel.setSizeBasis = function (widget, value) {
        BoxPanel.sizeBasisProperty.set(widget, value);
    };
    /**
     * Dispose of the resources held by the panel.
     */
    BoxPanel.prototype.dispose = function () {
        this._sizers.length = 0;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(BoxPanel.prototype, "direction", {
        /**
         * Get the layout direction for the box panel.
         *
         * #### Notes
         * This is a pure delegate to the [[directionProperty]].
         */
        get: function () {
            return BoxPanel.directionProperty.get(this);
        },
        /**
         * Set the layout direction for the box panel.
         *
         * #### Notes
         * This is a pure delegate to the [[directionProperty]].
         */
        set: function (value) {
            BoxPanel.directionProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoxPanel.prototype, "spacing", {
        /**
         * Get the inter-element spacing for the box panel.
         *
         * #### Notes
         * This is a pure delegate to the [[spacingProperty]].
         */
        get: function () {
            return BoxPanel.spacingProperty.get(this);
        },
        /**
         * Set the inter-element spacing for the box panel.
         *
         * #### Notes
         * This is a pure delegate to the [[spacingProperty]].
         */
        set: function (value) {
            BoxPanel.spacingProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * A message handler invoked on a `'child-added'` message.
     */
    BoxPanel.prototype.onChildAdded = function (msg) {
        arrays.insert(this._sizers, msg.currentIndex, new phosphor_boxengine_1.BoxSizer());
        this.node.appendChild(msg.child.node);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.Widget.MsgAfterAttach);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Panel.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'child-moved'` message.
     */
    BoxPanel.prototype.onChildMoved = function (msg) {
        arrays.move(this._sizers, msg.previousIndex, msg.currentIndex);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Widget.MsgUpdateRequest);
    };
    /**
     * A message handler invoked on a `'child-removed'` message.
     */
    BoxPanel.prototype.onChildRemoved = function (msg) {
        arrays.removeAt(this._sizers, msg.previousIndex);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, phosphor_widget_1.Widget.MsgBeforeDetach);
        this.node.removeChild(msg.child.node);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Panel.MsgLayoutRequest);
        resetGeometry(msg.child);
    };
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    BoxPanel.prototype.onAfterShow = function (msg) {
        _super.prototype.onAfterShow.call(this, msg);
        phosphor_messaging_1.sendMessage(this, phosphor_widget_1.Widget.MsgUpdateRequest);
    };
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    BoxPanel.prototype.onAfterAttach = function (msg) {
        _super.prototype.onAfterAttach.call(this, msg);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Panel.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'child-shown'` message.
     */
    BoxPanel.prototype.onChildShown = function (msg) {
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Panel.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'child-hidden'` message.
     */
    BoxPanel.prototype.onChildHidden = function (msg) {
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Panel.MsgLayoutRequest);
    };
    /**
     * A message handler invoked on a `'resize'` message.
     */
    BoxPanel.prototype.onResize = function (msg) {
        if (this.isVisible) {
            var width = msg.width < 0 ? this.node.offsetWidth : msg.width;
            var height = msg.height < 0 ? this.node.offsetHeight : msg.height;
            this._layoutChildren(width, height);
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    BoxPanel.prototype.onUpdateRequest = function (msg) {
        if (this.isVisible) {
            this._layoutChildren(this.node.offsetWidth, this.node.offsetHeight);
        }
    };
    /**
     * A message handler invoked on a `'layout-request'` message.
     */
    BoxPanel.prototype.onLayoutRequest = function (msg) {
        if (this.isAttached) {
            this._setupGeometry();
        }
    };
    /**
     * Update the size constraints of the panel.
     */
    BoxPanel.prototype._setupGeometry = function () {
        // Compute the visible item count.
        var visibleCount = 0;
        var children = this.children;
        for (var i = 0, n = children.length; i < n; ++i) {
            if (!children.get(i).hidden)
                visibleCount++;
        }
        // Update the fixed space for the visible items.
        this._fixedSpace = this.spacing * Math.max(0, visibleCount - 1);
        // Update the sizers and compute the new size limits.
        var minW = 0;
        var minH = 0;
        var maxW = Infinity;
        var maxH = Infinity;
        var dir = this.direction;
        if (dir === Direction.LeftToRight || dir === Direction.RightToLeft) {
            minW = this._fixedSpace;
            maxW = visibleCount > 0 ? minW : maxW;
            for (var i = 0, n = children.length; i < n; ++i) {
                var widget = children.get(i);
                var sizer = this._sizers[i];
                if (widget.hidden) {
                    sizer.minSize = 0;
                    sizer.maxSize = 0;
                    continue;
                }
                var limits = phosphor_domutil_1.sizeLimits(widget.node);
                sizer.sizeHint = BoxPanel.getSizeBasis(widget);
                sizer.stretch = BoxPanel.getStretch(widget);
                sizer.minSize = limits.minWidth;
                sizer.maxSize = limits.maxWidth;
                minW += limits.minWidth;
                maxW += limits.maxWidth;
                minH = Math.max(minH, limits.minHeight);
                maxH = Math.min(maxH, limits.maxHeight);
            }
        }
        else {
            minH = this._fixedSpace;
            maxH = visibleCount > 0 ? minH : maxH;
            for (var i = 0, n = children.length; i < n; ++i) {
                var widget = children.get(i);
                var sizer = this._sizers[i];
                if (widget.hidden) {
                    sizer.minSize = 0;
                    sizer.maxSize = 0;
                    continue;
                }
                var limits = phosphor_domutil_1.sizeLimits(widget.node);
                sizer.sizeHint = BoxPanel.getSizeBasis(widget);
                sizer.stretch = BoxPanel.getStretch(widget);
                sizer.minSize = limits.minHeight;
                sizer.maxSize = limits.maxHeight;
                minH += limits.minHeight;
                maxH += limits.maxHeight;
                minW = Math.max(minW, limits.minWidth);
                maxW = Math.min(maxW, limits.maxWidth);
            }
        }
        // Update the box sizing and add it to the size constraints.
        this._box = phosphor_domutil_1.boxSizing(this.node);
        minW += this._box.horizontalSum;
        minH += this._box.verticalSum;
        maxW += this._box.horizontalSum;
        maxH += this._box.verticalSum;
        // Update the panel's size constraints.
        var style = this.node.style;
        style.minWidth = minW + 'px';
        style.minHeight = minH + 'px';
        style.maxWidth = maxW === Infinity ? 'none' : maxW + 'px';
        style.maxHeight = maxH === Infinity ? 'none' : maxH + 'px';
        // Notifiy the parent that it should relayout.
        if (this.parent)
            phosphor_messaging_1.sendMessage(this.parent, phosphor_widget_1.Panel.MsgLayoutRequest);
        // Update the layout for the child widgets.
        phosphor_messaging_1.sendMessage(this, phosphor_widget_1.Widget.MsgUpdateRequest);
    };
    /**
     * Layout the children using the given offset width and height.
     */
    BoxPanel.prototype._layoutChildren = function (offsetWidth, offsetHeight) {
        // Bail early if their are no children to arrange.
        var children = this.children;
        if (children.length === 0) {
            return;
        }
        // Ensure the box sizing is created.
        var box = this._box || (this._box = phosphor_domutil_1.boxSizing(this.node));
        // Compute the actual layout bounds adjusted for border and padding.
        var top = box.paddingTop;
        var left = box.paddingLeft;
        var width = offsetWidth - box.horizontalSum;
        var height = offsetHeight - box.verticalSum;
        // Distribute the layout space and layout the items.
        var dir = this.direction;
        var spacing = this.spacing;
        if (dir === Direction.LeftToRight) {
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, width - this._fixedSpace));
            for (var i = 0, n = children.length; i < n; ++i) {
                var widget = children.get(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                setGeometry(widget, left, top, size, height);
                left += size + spacing;
            }
        }
        else if (dir === Direction.TopToBottom) {
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, height - this._fixedSpace));
            for (var i = 0, n = children.length; i < n; ++i) {
                var widget = children.get(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                setGeometry(widget, left, top, width, size);
                top += size + spacing;
            }
        }
        else if (dir === Direction.RightToLeft) {
            left += width;
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, width - this._fixedSpace));
            for (var i = 0, n = children.length; i < n; ++i) {
                var widget = children.get(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                setGeometry(widget, left - size, top, size, height);
                left -= size + spacing;
            }
        }
        else {
            top += height;
            phosphor_boxengine_1.boxCalc(this._sizers, Math.max(0, height - this._fixedSpace));
            for (var i = 0, n = children.length; i < n; ++i) {
                var widget = children.get(i);
                if (widget.hidden) {
                    continue;
                }
                var size = this._sizers[i].size;
                setGeometry(widget, left, top - size, width, size);
                top -= size + spacing;
            }
        }
    };
    /**
     * The change handler for the [[orientationProperty]].
     */
    BoxPanel.prototype._onDirectionChanged = function (old, value) {
        this.toggleClass(LEFT_TO_RIGHT_CLASS, value === Direction.LeftToRight);
        this.toggleClass(RIGHT_TO_LEFT_CLASS, value === Direction.RightToLeft);
        this.toggleClass(TOP_TO_BOTTOM_CLASS, value === Direction.TopToBottom);
        this.toggleClass(BOTTOM_TO_TOP_CLASS, value === Direction.BottomToTop);
        phosphor_messaging_1.postMessage(this, phosphor_widget_1.Panel.MsgLayoutRequest);
    };
    /**
     * A convenience alias of the `LeftToRight` [[Direction]].
     */
    BoxPanel.LeftToRight = Direction.LeftToRight;
    /**
     * A convenience alias of the `RightToLeft` [[Direction]].
     */
    BoxPanel.RightToLeft = Direction.RightToLeft;
    /**
     * A convenience alias of the `TopToBottom` [[Direction]].
     */
    BoxPanel.TopToBottom = Direction.TopToBottom;
    /**
     * A convenience alias of the `BottomToTop` [[Direction]].
     */
    BoxPanel.BottomToTop = Direction.BottomToTop;
    /**
     * The property descriptor for the box panel layout direction.
     *
     * The controls the arrangement of child widgets within the panel.
     * The default value is `TopToBottom`.
     *
     * **See also:** [[direction]]
     */
    BoxPanel.directionProperty = new phosphor_properties_1.Property({
        name: 'direction',
        value: Direction.TopToBottom,
        changed: function (owner, old, value) { return owner._onDirectionChanged(old, value); },
    });
    /**
     * The property descriptor for the box panel spacing.
     *
     * The controls the fixed spacing between the child widgets, in
     * pixels. The default value is `8`.
     *
     * **See also:** [[spacing]]
     */
    BoxPanel.spacingProperty = new phosphor_properties_1.Property({
        name: 'spacing',
        value: 8,
        coerce: function (owner, value) { return Math.max(0, value | 0); },
        changed: function (owner) { return phosphor_messaging_1.postMessage(owner, phosphor_widget_1.Panel.MsgLayoutRequest); },
    });
    /**
     * The property descriptor for a widget stretch factor.
     *
     * This is an attached property which controls how much a child widget
     * stretches or shrinks relative to its siblings when the box panel is
     * resized. The default value is `0`.
     *
     * **See also:** [[getStretch]], [[setStretch]]
     */
    BoxPanel.stretchProperty = new phosphor_properties_1.Property({
        name: 'stretch',
        value: 0,
        coerce: function (owner, value) { return Math.max(0, value | 0); },
        changed: onChildPropertyChanged,
    });
    /**
     * The property descriptor for a widget size basis.
     *
     * This is an attached property which controls the preferred size of
     * a child widget. The widget will be initialized to this size before
     * being expanded or shrunk to fit the available layout space. The
     * default value is `0`.
     *
     * **See also:** [[getSizeBasis]], [[setSizeBasis]]
     */
    BoxPanel.sizeBasisProperty = new phosphor_properties_1.Property({
        name: 'sizeBasis',
        value: 0,
        coerce: function (owner, value) { return Math.max(0, value | 0); },
        changed: onChildPropertyChanged,
    });
    return BoxPanel;
})(phosphor_widget_1.Panel);
exports.BoxPanel = BoxPanel;
/**
 * A private attached property which stores a widget offset rect.
 */
var rectProperty = new phosphor_properties_1.Property({
    name: 'rect',
    create: createRect,
});
/**
 * Create a new offset rect filled with NaNs.
 */
function createRect() {
    return { top: NaN, left: NaN, width: NaN, height: NaN };
}
/**
 * Get the offset rect for a widget.
 */
function getRect(widget) {
    return rectProperty.get(widget);
}
/**
 * Set the offset geometry for the given widget.
 *
 * A resize message will be dispatched to the widget if appropriate.
 */
function setGeometry(widget, left, top, width, height) {
    var resized = false;
    var rect = getRect(widget);
    var style = widget.node.style;
    if (rect.top !== top) {
        rect.top = top;
        style.top = top + 'px';
    }
    if (rect.left !== left) {
        rect.left = left;
        style.left = left + 'px';
    }
    if (rect.width !== width) {
        resized = true;
        rect.width = width;
        style.width = width + 'px';
    }
    if (rect.height !== height) {
        resized = true;
        rect.height = height;
        style.height = height + 'px';
    }
    if (resized) {
        phosphor_messaging_1.sendMessage(widget, new phosphor_widget_1.ResizeMessage(width, height));
    }
}
/**
 * Reset the inline geometry and rect cache for the given widget
 */
function resetGeometry(widget) {
    var rect = getRect(widget);
    var style = widget.node.style;
    rect.top = NaN;
    rect.left = NaN;
    rect.width = NaN;
    rect.height = NaN;
    style.top = '';
    style.left = '';
    style.width = '';
    style.height = '';
}
/**
 * The change handler for the attached child properties.
 */
function onChildPropertyChanged(child) {
    if (child.parent instanceof BoxPanel) {
        phosphor_messaging_1.postMessage(child.parent, phosphor_widget_1.Panel.MsgLayoutRequest);
    }
}

},{"./index.css":23,"phosphor-arrays":4,"phosphor-boxengine":5,"phosphor-domutil":8,"phosphor-messaging":9,"phosphor-properties":12,"phosphor-widget":26}],25:[function(require,module,exports){
var css = "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2015, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\n.p-Widget {\n  box-sizing: border-box;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  overflow: hidden;\n  cursor: default;\n}\n.p-Widget.p-mod-hidden {\n  display: none;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules/phosphor-widget/lib/index.css"})); module.exports = css;
},{"browserify-css":3}],26:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./messages'));
__export(require('./panel'));
__export(require('./title'));
__export(require('./widget'));
require('./index.css');

},{"./index.css":25,"./messages":27,"./panel":28,"./title":29,"./widget":30}],27:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_messaging_1 = require('phosphor-messaging');
/**
 * A message class for child related messages.
 */
var ChildMessage = (function (_super) {
    __extends(ChildMessage, _super);
    /**
     * Construct a new child message.
     *
     * @param type - The message type.
     *
     * @param child - The child widget for the message.
     *
     * @param previousIndex - The previous index of the child, if known.
     *   The default index is `-1` and indicates an unknown index.
     *
     * @param currentIndex - The current index of the child, if known.
     *   The default index is `-1` and indicates an unknown index.
     */
    function ChildMessage(type, child, previousIndex, currentIndex) {
        if (previousIndex === void 0) { previousIndex = -1; }
        if (currentIndex === void 0) { currentIndex = -1; }
        _super.call(this, type);
        this._child = child;
        this._currentIndex = currentIndex;
        this._previousIndex = previousIndex;
    }
    Object.defineProperty(ChildMessage.prototype, "child", {
        /**
         * The child widget for the message.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._child;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChildMessage.prototype, "currentIndex", {
        /**
         * The current index of the child.
         *
         * #### Notes
         * This will be `-1` if the current index is unknown.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._currentIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChildMessage.prototype, "previousIndex", {
        /**
         * The previous index of the child.
         *
         * #### Notes
         * This will be `-1` if the previous index is unknown.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._previousIndex;
        },
        enumerable: true,
        configurable: true
    });
    return ChildMessage;
})(phosphor_messaging_1.Message);
exports.ChildMessage = ChildMessage;
/**
 * A message class for `'resize'` messages.
 */
var ResizeMessage = (function (_super) {
    __extends(ResizeMessage, _super);
    /**
     * Construct a new resize message.
     *
     * @param width - The **offset width** of the widget, or `-1` if
     *   the width is not known.
     *
     * @param height - The **offset height** of the widget, or `-1` if
     *   the height is not known.
     */
    function ResizeMessage(width, height) {
        _super.call(this, 'resize');
        this._width = width;
        this._height = height;
    }
    Object.defineProperty(ResizeMessage.prototype, "width", {
        /**
         * The offset width of the widget.
         *
         * #### Notes
         * This will be `-1` if the width is unknown.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeMessage.prototype, "height", {
        /**
         * The offset height of the widget.
         *
         * #### Notes
         * This will be `-1` if the height is unknown.
         *
         * This is a read-only property.
         */
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * A singleton `'resize'` message with an unknown size.
     */
    ResizeMessage.UnknownSize = new ResizeMessage(-1, -1);
    return ResizeMessage;
})(phosphor_messaging_1.Message);
exports.ResizeMessage = ResizeMessage;

},{"phosphor-messaging":9}],28:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var arrays = require('phosphor-arrays');
var phosphor_messaging_1 = require('phosphor-messaging');
var phosphor_observablelist_1 = require('phosphor-observablelist');
var phosphor_signaling_1 = require('phosphor-signaling');
var messages_1 = require('./messages');
var widget_1 = require('./widget');
/**
 * The class name added to Panel instances.
 */
var PANEL_CLASS = 'p-Panel';
/**
 * A widget which acts as a layout container for child widgets.
 *
 * #### Notes
 * This class typically serves as a base class for more concrete layout
 * panels, but can be used directly in combination with CSS to achieve
 * any desired layout for a collection of widgets.
 */
var Panel = (function (_super) {
    __extends(Panel, _super);
    /**
     * Construct a new panel.
     */
    function Panel() {
        _super.call(this);
        this.addClass(PANEL_CLASS);
        this._children = new ChildWidgetList(this);
    }
    Object.defineProperty(Panel.prototype, "children", {
        /**
         * Get the observable list of child widgets for the panel.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Process a message sent to the panel.
     *
     * @param msg - The message sent to the panel.
     *
     * #### Notes
     * Subclasses may reimplement this method as needed.
     */
    Panel.prototype.processMessage = function (msg) {
        switch (msg.type) {
            case 'layout-request':
                this.onLayoutRequest(msg);
                break;
            case 'child-added':
                this.onChildAdded(msg);
                break;
            case 'child-moved':
                this.onChildMoved(msg);
                break;
            case 'child-removed':
                this.onChildRemoved(msg);
                break;
            case 'child-shown':
                this.onChildShown(msg);
                break;
            case 'child-hidden':
                this.onChildHidden(msg);
                break;
            default:
                _super.prototype.processMessage.call(this, msg);
        }
    };
    /**
     * Compress a message posted to the panel.
     *
     * @param msg - The message posted to the panel.
     *
     * @param pending - The queue of pending messages for the panel.
     *
     * @returns `true` if the message was compressed and should be
     *   dropped, or `false` if the message should be enqueued for
     *   delivery as normal.
     *
     * #### Notes
     * This compresses `'layout-request'` messages in addition to the
     * compression provided by the base `Widget` class.
     *
     * Subclasses may reimplement this method as needed.
     */
    Panel.prototype.compressMessage = function (msg, pending) {
        if (msg.type === 'layout-request') {
            return pending.some(function (other) { return other.type === 'layout-request'; });
        }
        return _super.prototype.compressMessage.call(this, msg, pending);
    };
    /**
     * A message handler invoked on a `'child-added'` message.
     *
     * #### Notes
     * The default implementation adds the child node to the panel node
     * at the proper location and sends an `'after-attach'` message to
     * the child if the panel is attached to the DOM.
     *
     * Subclasses may reimplement this method to control how the child
     * node is added to the panel node, but a reimplementation must send
     * an `'after-attach'` message to the child if the panel is attached
     * to the DOM.
     */
    Panel.prototype.onChildAdded = function (msg) {
        var next = this.children.get(msg.currentIndex + 1);
        this.node.insertBefore(msg.child.node, next && next.node);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, widget_1.Widget.MsgAfterAttach);
    };
    /**
     * A message handler invoked on a `'child-moved'` message.
     *
     * #### Notes
     * The default implementation moves the child node to the proper
     * location in the panel node and sends both `'before-detach'` and
     * `'after-attach'` message to the child if the panel is attached
     * to the DOM.
     *
     * Subclasses may reimplement this method to control how the child
     * node is moved in the panel node, but a reimplementation must send
     * both `'before-detach'` and `'after-attach'` message to the child
     * if the panel is attached to the DOM.
     */
    Panel.prototype.onChildMoved = function (msg) {
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, widget_1.Widget.MsgBeforeDetach);
        var next = this.children.get(msg.currentIndex + 1);
        this.node.insertBefore(msg.child.node, next && next.node);
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, widget_1.Widget.MsgAfterAttach);
    };
    /**
     * A message handler invoked on a `'child-removed'` message.
     *
     * #### Notes
     * The default implementation removes the child node from the panel
     * node and sends a `'before-detach'` message to the child if the
     * panel is attached to the DOM.
     *
     * Subclasses may reimplement this method to control how the child
     * node is removed from the panel node, but a reimplementation must
     * send a `'before-detach'` message to the child if the panel is
     * attached to the DOM.
     */
    Panel.prototype.onChildRemoved = function (msg) {
        if (this.isAttached)
            phosphor_messaging_1.sendMessage(msg.child, widget_1.Widget.MsgBeforeDetach);
        this.node.removeChild(msg.child.node);
    };
    /**
     * A message handler invoked on a `'resize'` message.
     *
     * #### Notes
     * The default implementation of this handler sends an [[UnknownSize]]
     * resize message to each child. This ensures that the resize messages
     * propagate through all widgets in the hierarchy.
     *
     * Subclasses may reimplement this method as needed, but they must
     * dispatch `'resize'` messages to their children as appropriate.
     */
    Panel.prototype.onResize = function (msg) {
        var children = this.children;
        for (var i = 0; i < children.length; ++i) {
            phosphor_messaging_1.sendMessage(children.get(i), messages_1.ResizeMessage.UnknownSize);
        }
    };
    /**
     * A message handler invoked on an `'update-request'` message.
     *
     * #### Notes
     * The default implementation of this handler sends an [[UnknownSize]]
     * resize message to each child. This ensures that the all widgets in
     * the hierarchy remain correctly sized on updates.
     *
     * Subclasses may reimplement this method as needed, but they should
     * dispatch `'resize'` messages to their children if appropriate.
     */
    Panel.prototype.onUpdateRequest = function (msg) {
        var children = this.children;
        for (var i = 0; i < children.length; ++i) {
            phosphor_messaging_1.sendMessage(children.get(i), messages_1.ResizeMessage.UnknownSize);
        }
    };
    /**
     * A message handler invoked on an `'after-show'` message.
     *
     * #### Notes
     * The default implementation of this handler forwards the message
     * to all of its non-hidden children.
     *
     * Subclasses may reimplement this method as needed, but they should
     * either call the superclass implementation or forward the message
     * to their non-hidden children as appropriate.
     */
    Panel.prototype.onAfterShow = function (msg) {
        var children = this.children;
        for (var i = 0; i < children.length; ++i) {
            var child = children.get(i);
            if (!child.hidden)
                phosphor_messaging_1.sendMessage(child, msg);
        }
    };
    /**
     * A message handler invoked on a `'before-hide'` message.
     *
     * #### Notes
     * The default implementation of this handler forwards the message
     * to all of its non-hidden children.
     *
     * Subclasses may reimplement this method as needed, but they should
     * either call the superclass implementation or forward the message
     * to their children as appropriate.
     */
    Panel.prototype.onBeforeHide = function (msg) {
        var children = this.children;
        for (var i = 0; i < children.length; ++i) {
            var child = children.get(i);
            if (!child.hidden)
                phosphor_messaging_1.sendMessage(child, msg);
        }
    };
    /**
     * A message handler invoked on an `'after-attach'` message.
     *
     * #### Notes
     * The default implementation of this handler forwards the message
     * to all of its children.
     *
     * Subclasses may reimplement this method as needed, but they should
     * either call the superclass implementation or forward the message
     * to their children as appropriate.
     */
    Panel.prototype.onAfterAttach = function (msg) {
        var children = this.children;
        for (var i = 0; i < children.length; ++i) {
            phosphor_messaging_1.sendMessage(children.get(i), msg);
        }
    };
    /**
     * A message handler invoked on a `'before-detach'` message.
     *
     * #### Notes
     * The default implementation of this handler forwards the message
     * to all of its children.
     *
     * Subclasses may reimplement this method as needed, but they should
     * either call the superclass implementation or forward the message
     * to their children as appropriate.
     */
    Panel.prototype.onBeforeDetach = function (msg) {
        var children = this.children;
        for (var i = 0; i < children.length; ++i) {
            phosphor_messaging_1.sendMessage(children.get(i), msg);
        }
    };
    /**
     * A message handler invoked on a `'layout-request'` message.
     *
     * The default implementation of this handler is a no-op.
     */
    Panel.prototype.onLayoutRequest = function (msg) { };
    /**
     * A message handler invoked on a `'child-shown'` message.
     *
     * The default implementation of this handler is a no-op.
     */
    Panel.prototype.onChildShown = function (msg) { };
    /**
     * A message handler invoked on a `'child-hidden'` message.
     *
     * The default implementation of this handler is a no-op.
     */
    Panel.prototype.onChildHidden = function (msg) { };
    /**
     * A singleton `'layout-request'` message.
     *
     * #### Notes
     * This message can be dispatched to supporting panels in order to
     * update their layout. Not all panels will respond to messages of
     * this type.
     *
     * This message is typically used to update the size constraints of
     * a panel and to update the position and size of its children.
     *
     * Messages of this type are compressed by default.
     *
     * **See also:** [[onLayoutRequest]]
     */
    Panel.MsgLayoutRequest = new phosphor_messaging_1.Message('layout-request');
    return Panel;
})(widget_1.Widget);
exports.Panel = Panel;
/**
 * A concrete implementation of IChildWidgetList.
 */
var ChildWidgetList = (function (_super) {
    __extends(ChildWidgetList, _super);
    /**
     * Construct a new child widget list.
     *
     * @param parent - The panel to use as the parent of the children.
     */
    function ChildWidgetList(parent) {
        _super.call(this);
        this._parent = parent;
    }
    /**
     * Dispose of the child widgets in the list.
     *
     * #### Notes
     * This will unparent, remove, and dispose of all child widgets.
     *
     * This will not emit change notifications or send messages to
     * the parent panel.
     */
    ChildWidgetList.prototype.dispose = function () {
        // Clear the signal data so prevent any further notifications.
        phosphor_signaling_1.clearSignalData(this);
        // Set the parent to `null` to indicate the list is destroyed.
        this._parent = null;
        // Remove all children, set their internal parent references to
        // `null`, and dispose them. The `any` cast is required to work
        // around the lack of `friend class` modifiers.
        while (this.internal.length > 0) {
            var child = this.internal.pop();
            child._parent = null;
            child.dispose();
        }
    };
    Object.defineProperty(ChildWidgetList.prototype, "isDisposed", {
        /**
         * Test whether the widget list is disposed.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._parent === null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChildWidgetList.prototype, "parent", {
        /**
         * The parent panel which owns the list.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add an item to the list at the specified index.
     *
     * @param index - The index at which to add the item. This must be
     *   an integer in the range `[0, internal.length]`.
     *
     * @param item - The item to add at the specified index.
     *
     * @returns The index at which the item was added.
     *
     * #### Notes
     * If the item is the parent panel, an error will be thrown.
     *
     * If the item is already a child widget, it will be moved.
     *
     * If the item has a foreign parent, it will first be removed.
     *
     * This will dispatch an appropriate child message to the parent.
     */
    ChildWidgetList.prototype.addItem = function (index, item) {
        // Throw an error if the item is the parent panel.
        if (item === this._parent) {
            throw new Error('invalid child widget');
        }
        // Move the item if it is already a child.
        if (item.parent === this._parent) {
            var i_1 = this.internal.indexOf(item);
            var j = i_1 < index ? index - 1 : index;
            this.moveItem(i_1, j);
            return j;
        }
        // Remove or detach the item if necessary.
        if (item.parent) {
            item.parent.children.remove(item);
        }
        else if (item.isAttached) {
            widget_1.Widget.detach(item);
        }
        // Update the internal parent reference of the item. The `any` cast
        // is required to work around the lack of `friend class` modifiers.
        item._parent = this._parent;
        // Insert the item into the internal array.
        var i = arrays.insert(this.internal, index, item);
        // Dispatch a `'child-added'` message to the parent.
        var msg = new messages_1.ChildMessage('child-added', item, -1, i);
        phosphor_messaging_1.sendMessage(this._parent, msg);
        // Emit the list changed signal.
        this.changed.emit({
            type: phosphor_observablelist_1.ListChangeType.Add,
            newIndex: i,
            newValue: item,
            oldIndex: -1,
            oldValue: void 0,
        });
        // Return the new index of the item.
        return i;
    };
    /**
     * Move an item in the list from one index to another.
     *
     * @param fromIndex - The initial index of the item. This must be
     *   an integer in the range `[0, internal.length)`.
     *
     * @param toIndex - The desired index for the item. This must be
     *   an integer in the range `[0, internal.length)`.
     *
     * @returns `true` if the item was moved, `false` otherwise.
     *
     * #### Notes
     * If the `from` and `to` indices are the same, this is a no-op.
     *
     * This will dispatch an appropriate child message to the parent.
     */
    ChildWidgetList.prototype.moveItem = function (fromIndex, toIndex) {
        // Do nothing if the `from` and `to` indices are the same.
        if (fromIndex === toIndex) {
            return true;
        }
        // Move the item in the internal array.
        if (!arrays.move(this.internal, fromIndex, toIndex)) {
            return false;
        }
        // Dispatch a `'child-moved'` message to the parent.
        var item = this.internal[toIndex];
        var msg = new messages_1.ChildMessage('child-moved', item, fromIndex, toIndex);
        phosphor_messaging_1.sendMessage(this._parent, msg);
        // Emit the list changed signal.
        this.changed.emit({
            type: phosphor_observablelist_1.ListChangeType.Move,
            newIndex: toIndex,
            newValue: item,
            oldIndex: fromIndex,
            oldValue: item,
        });
        // Return `true` for success.
        return true;
    };
    /**
     * Remove the item from the list at the specified index.
     *
     * @param index - The index of the item to remove. This must be
     *   an integer in the range `[0, internal.length)`.
     *
     * @returns The item removed from the list.
     *
     * #### Notes
     * This will dispatch an appropriate child message to the parent.
     */
    ChildWidgetList.prototype.removeItem = function (index) {
        // Remove the item from the internal array.
        var item = arrays.removeAt(this.internal, index);
        // Update the internal parent reference of the item. The `any` cast
        // is required to work around the lack of `friend class` modifiers.
        item._parent = null;
        // Dispatch a `'child-removed'` message to the parent.
        var msg = new messages_1.ChildMessage('child-removed', item, index, -1);
        phosphor_messaging_1.sendMessage(this._parent, msg);
        // Emit the list changed signal.
        this.changed.emit({
            type: phosphor_observablelist_1.ListChangeType.Remove,
            newIndex: -1,
            newValue: void 0,
            oldIndex: index,
            oldValue: item,
        });
        // Return the removed item.
        return item;
    };
    /**
     * Replace items at a specific location in the list.
     *
     * @param index - The index at which to modify the list. This must
     *   be an integer in the range `[0, internal.length]`.
     *
     * @param count - The number of items to remove from the list. This
     *   must be an integer in the range `[0, internal.length]`.
     *
     * @param items - The items to insert at the specified index.
     *
     * @returns An array of the items removed from the list.
     *
     * #### Notes
     * If any new item is the parent panel, an error will be thrown.
     *
     * This decomposes the operation into a sequence of remove + add.
     *
     * This will dispatch appropriate child messages to the parent.
     */
    ChildWidgetList.prototype.replaceItems = function (index, count, items) {
        var _this = this;
        // Throw an error if any item is the parent panel.
        if (items.some(function (item) { return item === _this._parent; })) {
            throw new Error('invalid child widget');
        }
        // Remove the old items from the list.
        var old = [];
        while (count-- > 0 && index < this.internal.length) {
            old.push(this.removeItem(index));
        }
        // Add the new items to the list and remove them from the old.
        for (var i = 0, n = items.length; i < n; ++i) {
            index = this.addItem(index, items[i]) + 1;
            arrays.remove(old, items[i]);
        }
        // Return the items which were removed.
        return old;
    };
    /**
     * Set the item at a specific index in the list.
     *
     * @param index - The index of interest. This must be an integer in
     *   the range `[0, internal.length)`.
     *
     * @param item - The item to set at the index.
     *
     * @returns The item which previously occupied the specified index.
     *
     * #### Notes
     * If the item is the parent panel, an error will be thrown.
     *
     * If old item is the same as the new item, this is a no-op.
     *
     * This decomposes the operation into an equivalent remove + add.
     *
     * This will dispatch appropriate child messages to the parent.
     */
    ChildWidgetList.prototype.setItem = function (index, item) {
        // Throw an error if the item is the parent panel.
        if (item === this._parent) {
            throw new Error('invalid child widget');
        }
        // Do nothing if the old item is the same as the new item.
        if (this.internal[index] === item) {
            return item;
        }
        // Remove the old item from the list.
        var old = this.removeItem(index);
        // Add the new item to the list.
        this.addItem(index, item);
        // Return the old item.
        return old;
    };
    return ChildWidgetList;
})(phosphor_observablelist_1.ObservableList);

},{"./messages":27,"./widget":30,"phosphor-arrays":4,"phosphor-messaging":9,"phosphor-observablelist":11,"phosphor-signaling":14}],29:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_signaling_1 = require('phosphor-signaling');
/**
 * An object which holds data related to a widget title.
 */
var Title = (function () {
    function Title() {
    }
    Object.defineProperty(Title.prototype, "changed", {
        /**
         * A signal emitted when the title state changes.
         *
         * #### Notes
         * This is a pure delegate to the [[changedSignal]].
         */
        get: function () {
            return Title.changedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "text", {
        /**
         * Get the text for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[textProperty]].
         */
        get: function () {
            return Title.textProperty.get(this);
        },
        /**
         * Set the text for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[textProperty]].
         */
        set: function (value) {
            Title.textProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "icon", {
        /**
         * Get the icon class for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[iconProperty]].
         */
        get: function () {
            return Title.iconProperty.get(this);
        },
        /**
         * Set the icon class for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[iconProperty]].
         */
        set: function (value) {
            Title.iconProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "editable", {
        /**
         * Get the editable state for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[editableProperty]].
         */
        get: function () {
            return Title.editableProperty.get(this);
        },
        /**
         * Set the editable state for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[editableProperty]].
         */
        set: function (value) {
            Title.editableProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "editHandler", {
        /**
         * Get the edit handler for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[editHandlerProperty]].
         */
        get: function () {
            return Title.editHandlerProperty.get(this);
        },
        /**
         * Set the edit handler for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[editHandlerProperty]].
         */
        set: function (value) {
            Title.editHandlerProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "closable", {
        /**
         * Get the closable state for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[closableProperty]].
         */
        get: function () {
            return Title.closableProperty.get(this);
        },
        /**
         * Set the closable state for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[closableProperty]].
         */
        set: function (value) {
            Title.closableProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Title.prototype, "className", {
        /**
         * Get the extra class name for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[classNameProperty]].
         */
        get: function () {
            return Title.classNameProperty.get(this);
        },
        /**
         * Set the extra class name for the title.
         *
         * #### Notes
         * This is a pure delegate to the [[classNameProperty]].
         */
        set: function (value) {
            Title.classNameProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * A signal emitted when the title state changes.
     *
     * **See also:** [[changed]]
     */
    Title.changedSignal = new phosphor_signaling_1.Signal();
    /**
     * The property descriptor for the title text.
     *
     * This will be used as the display text in title contexts.
     *
     * The default value is an empty string.
     *
     * **See also:** [[text]]
     */
    Title.textProperty = new phosphor_properties_1.Property({
        name: 'text',
        value: '',
        notify: Title.changedSignal,
    });
    /**
     * The property descriptor for the title icon class.
     *
     * This will be added to the class name of the title icon node.
     *
     * Multiple class names can be separated with whitespace.
     *
     * The default value is an empty string.
     *
     * **See also:** [[icon]]
     */
    Title.iconProperty = new phosphor_properties_1.Property({
        name: 'icon',
        value: '',
        notify: Title.changedSignal,
    });
    /**
     * The property descriptor for the title editable state.
     *
     * This controls whether the title is editable by the user.
     *
     * The default value is `false`.
     *
     * **See also:** [[editable]]
     */
    Title.editableProperty = new phosphor_properties_1.Property({
        name: 'editable',
        value: false,
        notify: Title.changedSignal,
    });
    /**
     * The property descriptor for the title edit handler.
     *
     * If the title is user editable, this handler will be invoked when
     * the text is edited by the user. The handler should update its own
     * internal state and then update the title text as appropriate. If
     * this is not provided, the title text will be updated directly.
     *
     * The default value is `null`.
     *
     * **See also:** [[editHandler]]
     */
    Title.editHandlerProperty = new phosphor_properties_1.Property({
        name: 'editHandler',
        value: null,
        notify: Title.changedSignal,
    });
    /**
     * The property descriptor for the title closable state.
     *
     * This controls whether the title area shows a close icon.
     *
     * The default value is `false`.
     *
     * **See also:** [[closable]]
     */
    Title.closableProperty = new phosphor_properties_1.Property({
        name: 'closable',
        value: false,
        notify: Title.changedSignal,
    });
    /**
     * The property descriptor for the title extra class name.
     *
     * This will be added to the class name of the title area node.
     *
     * Multiple class names can be separated with whitespace.
     *
     * The default value is an empty string.
     *
     * **See also:** [[className]]
     */
    Title.classNameProperty = new phosphor_properties_1.Property({
        name: 'className',
        value: '',
        notify: Title.changedSignal,
    });
    return Title;
})();
exports.Title = Title;

},{"phosphor-properties":12,"phosphor-signaling":14}],30:[function(require,module,exports){
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_messaging_1 = require('phosphor-messaging');
var phosphor_nodewrapper_1 = require('phosphor-nodewrapper');
var phosphor_properties_1 = require('phosphor-properties');
var phosphor_signaling_1 = require('phosphor-signaling');
var messages_1 = require('./messages');
var panel_1 = require('./panel');
var title_1 = require('./title');
/**
 * The class name added to Widget instances.
 */
var WIDGET_CLASS = 'p-Widget';
/**
 * The class name added to hidden widgets.
 */
var HIDDEN_CLASS = 'p-mod-hidden';
/**
 * The base class of the Phosphor widget hierarchy.
 *
 * #### Notes
 * This class will typically be subclassed in order to create a useful
 * widget. However, it can be used by itself to host externally created
 * content. Simply instantiate an empty widget and add the DOM content
 * directly to the widget's `node`. The widget and its content can be
 * inserted into any Phosphor widget hierarchy.
 */
var Widget = (function (_super) {
    __extends(Widget, _super);
    /**
     * Construct a new widget.
     */
    function Widget() {
        _super.call(this);
        // friend class ChildWidgetList
        this._flags = 0;
        this._parent = null;
        this.addClass(WIDGET_CLASS);
    }
    /**
     * Attach a widget to a host DOM node.
     *
     * @param widget - The widget to attach to the DOM.
     *
     * @param host - The node to use as the widget's host.
     *
     * @throws Will throw an error if the widget is not a root widget,
     *   if the widget is already attached to the DOM, or if the host
     *   is not attached to the DOM.
     *
     * #### Notes
     * The function should be used in lieu of manual DOM attachment. It
     * ensures that an `'after-attach'` message is properly dispatched
     * to the widget hierarchy.
     */
    Widget.attach = function (widget, host) {
        if (widget.parent) {
            throw new Error('only a root widget can be attached to the DOM');
        }
        if (widget.isAttached || document.body.contains(widget.node)) {
            throw new Error('widget is already attached to the DOM');
        }
        if (!document.body.contains(host)) {
            throw new Error('host is not attached to the DOM');
        }
        host.appendChild(widget.node);
        phosphor_messaging_1.sendMessage(widget, Widget.MsgAfterAttach);
    };
    /**
     * Detach a widget from its host DOM node.
     *
     * @param widget - The widget to detach from the DOM.
     *
     * @throws Will throw an error if the widget is not a root widget,
     *   or if the widget is not attached to the DOM.
     *
     * #### Notes
     * The function should be used in lieu of manual DOM detachment. It
     * ensures that a `'before-detach'` message is properly dispatched
     * to the widget hierarchy.
     */
    Widget.detach = function (widget) {
        if (widget.parent) {
            throw new Error('only a root widget can be detached from the DOM');
        }
        if (!widget.isAttached || !document.body.contains(widget.node)) {
            throw new Error('widget is not attached to the DOM');
        }
        phosphor_messaging_1.sendMessage(widget, Widget.MsgBeforeDetach);
        widget.node.parentNode.removeChild(widget.node);
    };
    /**
     * Dispose of the widget and its descendants.
     *
     * #### Notes
     * It is generally unsafe to use the widget after it is disposed.
     *
     * If this method is called more than once, all calls made after
     * the first will be a no-op.
     */
    Widget.prototype.dispose = function () {
        // Do nothing if the widget is already disposed.
        if (this.isDisposed) {
            return;
        }
        // Set the disposed flag and emit the disposed signal.
        this._flags |= 4 /* IsDisposed */;
        this.disposed.emit(void 0);
        // Unparent or detach the widget if necessary.
        if (this.parent) {
            this.parent.children.remove(this);
        }
        else if (this.isAttached) {
            Widget.detach(this);
        }
        // Dispose of the children if the widget is a panel.
        //
        // The children are disposed here, instead of in a `dispose` method
        // on the Panel, so that children are disposed after the `disposed`
        // signal is emitted, and after their ancestor is detached.
        //
        // Workaround: https://github.com/Microsoft/TypeScript/issues/5534
        var that = this;
        if (that instanceof panel_1.Panel) {
            that.children.dispose();
        }
        // Clear the extra data associated with the widget.
        phosphor_signaling_1.clearSignalData(this);
        phosphor_messaging_1.clearMessageData(this);
        phosphor_properties_1.clearPropertyData(this);
    };
    Object.defineProperty(Widget.prototype, "disposed", {
        /**
         * A signal emitted when the widget is disposed.
         *
         * #### Notes
         * This is a pure delegate to the [[disposedSignal]].
         */
        get: function () {
            return Widget.disposedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "isAttached", {
        /**
         * Test whether the widget's node is attached to the DOM.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         *
         * **See also:** [[attach]], [[detach]]
         */
        get: function () {
            return (this._flags & 1 /* IsAttached */) !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "isDisposed", {
        /**
         * Test whether the widget has been disposed.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         *
         * **See also:** [[disposed]]
         */
        get: function () {
            return (this._flags & 4 /* IsDisposed */) !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "isVisible", {
        /**
         * Test whether the widget is visible.
         *
         * #### Notes
         * A widget is visible when it is attached to the DOM, is not
         * explicitly hidden, and has no explicitly hidden ancestors.
         *
         * This is a read-only property which is always safe to access.
         *
         * **See also:** [[hidden]]
         */
        get: function () {
            return (this._flags & 2 /* IsVisible */) !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "hidden", {
        /**
         * Get whether the widget is explicitly hidden.
         *
         * #### Notes
         * This is a pure delegate to the [[hiddenProperty]].
         *
         * **See also:** [[isVisible]]
         */
        get: function () {
            return Widget.hiddenProperty.get(this);
        },
        /**
         * Set whether the widget is explicitly hidden.
         *
         * #### Notes
         * This is a pure delegate to the [[hiddenProperty]].
         *
         * **See also:** [[isVisible]]
         */
        set: function (value) {
            Widget.hiddenProperty.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "title", {
        /**
         * Get the title data object for the widget.
         *
         * #### Notes
         * The title data is used by some container widgets when displaying
         * the widget along with a title, such as a tab panel or dock panel.
         *
         * Not all widgets will make use of the title data, so it is created
         * on-demand the first time it is accessed.
         */
        get: function () {
            return getTitle(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "parent", {
        /**
         * Get the parent panel of the widget.
         *
         * #### Notes
         * This will be `null` if the widget does not have a parent.
         */
        get: function () {
            return this._parent;
        },
        /**
         * Set the parent panel of the widget.
         *
         * #### Notes
         * If the panel is the current parent, this is no-op. Otherwise, the
         * widget will be removed from its current parent and added as the
         * last child of the given panel.
         *
         * Setting this to `null` or `undefined` will unparent the widget.
         */
        set: function (value) {
            if (value && value !== this._parent) {
                value.children.add(this);
            }
            else if (!value && this._parent) {
                this._parent.children.remove(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Post an `'update-request'` message to the widget.
     *
     * #### Notes
     * This is a simple convenience method for posting the message.
     *
     * **See also:** [[MsgUpdateRequest]], [[onUpdateRequest]]
     */
    Widget.prototype.update = function () {
        phosphor_messaging_1.postMessage(this, Widget.MsgUpdateRequest);
    };
    /**
     * Send a `'close-request'` message to the widget.
     *
     * #### Notes
     * This is a simple convenience method for sending the message.
     *
     * **See also:** [[MsgCloseRequest]], [[onCloseRequest]]
     */
    Widget.prototype.close = function () {
        phosphor_messaging_1.sendMessage(this, Widget.MsgCloseRequest);
    };
    /**
     * Process a message sent to the widget.
     *
     * @param msg - The message sent to the widget.
     *
     * #### Notes
     * Subclasses may reimplement this method as needed.
     */
    Widget.prototype.processMessage = function (msg) {
        switch (msg.type) {
            case 'resize':
                this.onResize(msg);
                break;
            case 'update-request':
                this.onUpdateRequest(msg);
                break;
            case 'after-show':
                this._flags |= 2 /* IsVisible */;
                this.onAfterShow(msg);
                break;
            case 'before-hide':
                this.onBeforeHide(msg);
                this._flags &= ~2 /* IsVisible */;
                break;
            case 'after-attach':
                var visible = !this.hidden && (!this.parent || this.parent.isVisible);
                if (visible)
                    this._flags |= 2 /* IsVisible */;
                this._flags |= 1 /* IsAttached */;
                this.onAfterAttach(msg);
                break;
            case 'before-detach':
                this.onBeforeDetach(msg);
                this._flags &= ~2 /* IsVisible */;
                this._flags &= ~1 /* IsAttached */;
                break;
            case 'close-request':
                this.onCloseRequest(msg);
                break;
        }
    };
    /**
     * Compress a message posted to the widget.
     *
     * @param msg - The message posted to the widget.
     *
     * @param pending - The queue of pending messages for the widget.
     *
     * @returns `true` if the message was compressed and should be
     *   dropped, or `false` if the message should be enqueued for
     *   delivery as normal.
     *
     * #### Notes
     * The default implementation compresses `'update-request'`.
     *
     * Subclasses may reimplement this method as needed.
     */
    Widget.prototype.compressMessage = function (msg, pending) {
        if (msg.type === 'update-request') {
            return pending.some(function (other) { return other.type === 'update-request'; });
        }
        return false;
    };
    /**
     * A message handler invoked on a `'close-request'` message.
     *
     * #### Notes
     * The default implementation of this handler will unparent or detach
     * the widget as appropriate.
     *
     * Subclasses may reimplement this handler for custom close behavior.
     *
     * **See also:** [[close]], [[MsgCloseRequest]]
     */
    Widget.prototype.onCloseRequest = function (msg) {
        if (this.parent) {
            this.parent.children.remove(this);
        }
        else if (this.isAttached) {
            Widget.detach(this);
        }
    };
    /**
     * A message handler invoked on a `'resize'` message.
     *
     * The default implementation of this handler is a no-op.
     */
    Widget.prototype.onResize = function (msg) { };
    /**
     * A message handler invoked on an `'update-request'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[update]], [[MsgUpdateRequest]]
     */
    Widget.prototype.onUpdateRequest = function (msg) { };
    /**
     * A message handler invoked on an `'after-show'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[MsgAfterShow]]
     */
    Widget.prototype.onAfterShow = function (msg) { };
    /**
     * A message handler invoked on a `'before-hide'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[MsgBeforeHide]]
     */
    Widget.prototype.onBeforeHide = function (msg) { };
    /**
     * A message handler invoked on an `'after-attach'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[MsgAfterAttach]]
     */
    Widget.prototype.onAfterAttach = function (msg) { };
    /**
     * A message handler invoked on a `'before-detach'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[MsgBeforeDetach]]
     */
    Widget.prototype.onBeforeDetach = function (msg) { };
    /**
     * A singleton `'update-request'` message.
     *
     * #### Notes
     * This message can be dispatched to supporting widgets in order to
     * update their content. Not all widgets will respond to messages of
     * this type.
     *
     * This message is typically used to update the position and size of
     * a panel's children, or to update a widget's content to reflect the
     * current widget state.
     *
     * Messages of this type are compressed by default.
     *
     * **See also:** [[update]], [[onUpdateRequest]]
     */
    Widget.MsgUpdateRequest = new phosphor_messaging_1.Message('update-request');
    /**
     * A singleton `'close-request'` message.
     *
     * #### Notes
     * This message should be dispatched to a widget when it should close
     * and remove itself from the widget hierarchy.
     *
     * Messages of this type are compressed by default.
     *
     * **See also:** [[close]], [[onCloseRequest]]
     */
    Widget.MsgCloseRequest = new phosphor_messaging_1.Message('close-request');
    /**
     * A singleton `'after-show'` message.
     *
     * #### Notes
     * This message is sent to a widget after it becomes visible.
     *
     * This message is **not** sent when the widget is attached.
     *
     * **See also:** [[isVisible]], [[onAfterShow]]
     */
    Widget.MsgAfterShow = new phosphor_messaging_1.Message('after-show');
    /**
     * A singleton `'before-hide'` message.
     *
     * #### Notes
     * This message is sent to a widget before it becomes not-visible.
     *
     * This message is **not** sent when the widget is detached.
     *
     * **See also:** [[isVisible]], [[onBeforeHide]]
     */
    Widget.MsgBeforeHide = new phosphor_messaging_1.Message('before-hide');
    /**
     * A singleton `'after-attach'` message.
     *
     * #### Notes
     * This message is sent to a widget after it is attached to the DOM.
     *
     * **See also:** [[isAttached]], [[onAfterAttach]]
     */
    Widget.MsgAfterAttach = new phosphor_messaging_1.Message('after-attach');
    /**
     * A singleton `'before-detach'` message.
     *
     * #### Notes
     * This message is sent to a widget before it is detached from the DOM.
     *
     * **See also:** [[isAttached]], [[onBeforeDetach]]
     */
    Widget.MsgBeforeDetach = new phosphor_messaging_1.Message('before-detach');
    /**
     * A signal emitted when the widget is disposed.
     *
     * **See also:** [[disposed]], [[isDisposed]]
     */
    Widget.disposedSignal = new phosphor_signaling_1.Signal();
    /**
     * A property descriptor which controls the hidden state of a widget.
     *
     * #### Notes
     * This controls whether a widget is explicitly hidden.
     *
     * Hiding a widget will cause the widget and all of its descendants
     * to become not-visible.
     *
     * This will toggle the presence of `'p-mod-hidden'` on a widget. It
     * will also dispatch `'after-show'` and `'before-hide'` messages as
     * appropriate.
     *
     * The default value is `false`.
     *
     * **See also:** [[hidden]], [[isVisible]]
     */
    Widget.hiddenProperty = new phosphor_properties_1.Property({
        name: 'hidden',
        value: false,
        changed: onHiddenChanged,
    });
    return Widget;
})(phosphor_nodewrapper_1.NodeWrapper);
exports.Widget = Widget;
/**
 * A private attached property for the title data for a widget.
 */
var titleProperty = new phosphor_properties_1.Property({
    name: 'title',
    create: function () { return new title_1.Title(); },
});
/**
 * Lookup the title data for the given widget.
 */
function getTitle(widget) {
    return titleProperty.get(widget);
}
/**
 * The change handler for the [[hiddenProperty]].
 */
function onHiddenChanged(owner, old, hidden) {
    if (hidden) {
        if (owner.isAttached && (!owner.parent || owner.parent.isVisible)) {
            phosphor_messaging_1.sendMessage(owner, Widget.MsgBeforeHide);
        }
        owner.addClass(HIDDEN_CLASS);
        if (owner.parent) {
            phosphor_messaging_1.sendMessage(owner.parent, new messages_1.ChildMessage('child-hidden', owner));
        }
    }
    else {
        owner.removeClass(HIDDEN_CLASS);
        if (owner.isAttached && (!owner.parent || owner.parent.isVisible)) {
            phosphor_messaging_1.sendMessage(owner, Widget.MsgAfterShow);
        }
        if (owner.parent) {
            phosphor_messaging_1.sendMessage(owner.parent, new messages_1.ChildMessage('child-shown', owner));
        }
    }
}

},{"./messages":27,"./panel":28,"./title":29,"phosphor-messaging":9,"phosphor-nodewrapper":10,"phosphor-properties":12,"phosphor-signaling":14}]},{},[2]);
