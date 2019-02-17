"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
require('./css/numberPicker.css');
/**
 * The public NumberPicker Object
 */
var NumberPicker = /** @class */ (function () {
    function NumberPicker(targetProperty, config, context, shouldFocus) {
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.targetProperty = targetProperty;
        this.shouldFocus = shouldFocus;
        this.properties = {
            key: "myNumberPicker",
            context: context,
            onRender: this.render.bind(this),
            onDispose: this.dispose.bind(this)
        };
        this.config = config;
    }
    /**
     * Drawing of the control
     * @param element the element of the PropertyPane where this control will be drawn
     * @param context the webpart context (if we passe it to the NumberPicker Object)
     * @param changeCallback the callbakk to apply the property changes
     */
    NumberPicker.prototype.render = function (element, context, changeCallback) {
        var currentValue = this.config.properties[this.targetProperty] || this.config.min;
        var html = "<div class=\"number-picker\"> \n      <label class=\"ms-Label\">" + this.config.label + "</label>\n      <div class=\"wrapper\"> \n        <div class=\"picker\">\n          <input type=\"text\" value=\"" + currentValue + "\"></input>   \n          <button type=\"button\" class=\"up-arrow\">\n            <i class=\"ms-Icon ms-Icon--CaretSolidUp\"></i>\n          </button>\n          <button type=\"button\" class=\"down-arrow\">\n            <i class=\"ms-Icon ms-Icon--CaretSolidDown\"></i>\n          </button>    \n        </div>\n      ";
        if (this.config.applyOnClick) {
            html += "\n        <div class=\"apply-wrapper\">\n          <button type=\"button\" class=\"apply-btn\">Apply</button>\n        </div>";
        }
        html += "\n      </div>\n      <span class=\"error-msg\"></span>\n      <span class=\"description\">" + (this.config.description || "") + "</span>\n    </div>";
        element.innerHTML = html;
        var arrowUpbutton = element.getElementsByClassName('up-arrow')[0];
        var arrowDownbutton = element.getElementsByClassName('down-arrow')[0];
        if (currentValue - 1 < this.config.min) {
            arrowDownbutton.disabled = true;
        }
        if (currentValue + 1 > this.config.max) {
            arrowUpbutton.disabled = true;
        }
        this.addEvents(element, changeCallback);
    };
    NumberPicker.prototype.addEvents = function (element, callback) {
        var _this = this;
        var inputTextElement = element.getElementsByTagName('input')[0];
        var arrowUpbutton = element.getElementsByClassName('up-arrow')[0];
        var arrowDownbutton = element.getElementsByClassName('down-arrow')[0];
        var applyButton = element.getElementsByClassName('apply-btn')[0];
        arrowUpbutton.onclick = function () {
            var oldValue = parseInt(inputTextElement.value);
            if (isNaN(oldValue))
                oldValue = _this.config.min;
            if (oldValue + 1 <= _this.config.max) {
                inputTextElement.value = "" + (oldValue + 1);
                arrowDownbutton.disabled = false;
                if (oldValue + 1 == _this.config.max)
                    arrowUpbutton.disabled = true;
                if (!_this.config.applyOnClick)
                    _this.applyChanges(element, inputTextElement, callback);
            }
            else {
                arrowUpbutton.disabled = true;
            }
        };
        arrowDownbutton.onclick = function () {
            var oldValue = parseInt(inputTextElement.value);
            if (isNaN(oldValue))
                oldValue = _this.config.min + 1;
            if (oldValue - 1 >= _this.config.min) {
                inputTextElement.value = "" + (oldValue - 1);
                arrowUpbutton.disabled = false;
                if (oldValue - 1 == _this.config.min)
                    arrowDownbutton.disabled = true;
                if (!_this.config.applyOnClick)
                    _this.applyChanges(element, inputTextElement, callback);
            }
            else {
                arrowDownbutton.disabled = true;
            }
        };
        if (this.config.applyOnClick) {
            applyButton.onclick = function () {
                _this.applyChanges(element, inputTextElement, callback);
            };
        }
        else {
            inputTextElement.oninput = function () {
                _this.applyChanges(element, inputTextElement, callback);
            };
        }
    };
    NumberPicker.prototype.applyChanges = function (element, inputTextElement, callback) {
        var _this = this;
        var newValue = parseInt(inputTextElement.value);
        if (!newValue || isNaN(newValue))
            newValue = this.config.min;
        var errorSpan = element.getElementsByClassName('error-msg')[0];
        var time = this.config.deferredValidationTime || 0;
        if (time < 0 || this.config.applyOnClick)
            time = 0;
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(function () {
            if (_this.validateValue(newValue)) {
                errorSpan.style.display = 'none';
                callback(_this.targetProperty, newValue);
            }
            else {
                _this.renderValidationError(errorSpan);
            }
        }, time);
    };
    NumberPicker.prototype.validateValue = function (value) {
        return value >= this.config.min && value <= this.config.max;
    };
    NumberPicker.prototype.renderValidationError = function (errorSpan) {
        errorSpan.textContent = "Invalid number: min:" + this.config.min + ", max:" + this.config.max;
        errorSpan.style.display = 'block';
    };
    NumberPicker.prototype.dispose = function (element) {
        element.innerHTML = "";
    };
    return NumberPicker;
}());
exports.NumberPicker = NumberPicker;
//# sourceMappingURL=numberPicker.js.map