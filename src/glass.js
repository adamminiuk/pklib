/**
 * Glass Adapter.
 * Show this on dimensions on browser. 
 * @package glass
 * @dependence browser, dom, event, utils
 */
(function (win) {
    'use strict';
    var pklib = win.pklib || {},
        document = win.document || {},
        id = "pklib-glass-wrapper",
        settings = {
            container: null,
            style: {
                position: "absolute",
                left: 0,
                top: 0,
                background: "#000",
                opacity: 0.5,
                zIndex: 1000
            }
        };

    pklib.glass = {

        /**
         * @type {String}
         */
        objId: id,

        /**
         * @param config {Object}
         * @param callback {Function}
         */
        show: function (config, callback) {
            var that = this,
                glass = document.createElement("div"),
                glassStyle = glass.style,
                style;
            settings.container = document.body;
            settings = pklib.array.mixin(settings, config);
            settings.style.filter = "alpha(opacity=" + parseFloat(settings.style.opacity, 10) * 100 + ")";

            glass.setAttribute("id", this.objId);
            for (style in settings.style) {
                if (settings.style.hasOwnProperty(style)) {
                    glassStyle[style] = settings.style[style];
                }
            }

            settings.container.appendChild(glass);

            pklib.dom.maximize(glass, settings.container);

            pklib.event.add(win, "resize", function () {
                that.close();
                that.show(config, callback);
                pklib.dom.maximize(glass, settings.container);
            });
            if (typeof callback === "function") {
                callback();
            }
            return glass;
        },
        /**
         * @param callback {Function}
         * @return {Boolean}
         */
        close: function (callback) {
            var glass = pklib.dom.byId(this.objId),
                result = false;
            if (glass !== null) {
                glass.parentNode.removeChild(glass);
                this.close(callback);
                result = true;
            }
            if (typeof callback === "function") {
                callback();
            }
            return result;
        }
    };
}(this));
