/**
 * Utils method related css on tags in DOM tree.
 * @package css
 * @dependence string
 */
(function (win) {
    'use strict';
    var pklib = win.pklib || {};

    pklib.css = {
        /**
         * Add CSS class to element define in second parameter.
         * @param element {HTMLElement}
         * @param cssClass {String}
         */
        addClass: function (cssClass, element) {
            if (typeof element === "undefined" || element === null || typeof cssClass === "undefined") {
                throw new TypeError("pklib.css.addClass: Element is undefined/null or cssClass is undefined");
            }
            var classElement = element.className;
            if (!this.hasClass(cssClass, element)) {
                if (classElement.length) {
                    classElement += " " + cssClass;
                } else {
                    classElement = cssClass;
                }
            }
            element.className = classElement;
        },
        /**
         * Remove CSS class from element define in second parameter.
         * @param element {HTMLElement}
         * @param cssClass {String}
         */
        removeClass: function (cssClass, element) {
            if (typeof element === "undefined" || element === null || typeof cssClass === "undefined") {
                throw new TypeError("pklib.css.removeClass: Element is undefined/null or cssClass is undefined");
            }
            var regexp = new RegExp("(\\s" + cssClass + ")|(" + cssClass + "\\s)|" + cssClass, "i");
            element.className = pklib.string.trim(element.className.replace(regexp, ""));
        },
        /**
         * Check if element has CSS class
         * @param element {HTMLElement}
         * @param cssClass {String}
         * @return {Boolean}
         */
        hasClass: function (cssClass, element) {
            if (typeof element === "undefined" || element === null || typeof cssClass === "undefined") {
                throw new TypeError("pklib.css.hasClass: Element is undefined/null or cssClass is undefined");
            }
            var regexp = new RegExp("(\\s" + cssClass + ")|(" + cssClass + "\\s)|" + cssClass, "i");
            return regexp.test(element.className);
        }
    };
}(this));
