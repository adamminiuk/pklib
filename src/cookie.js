/**
 * Cookie service manager.
 * @package cookie
 */
(function (win) {
    'use strict';
    var pklib = win.pklib || {},
        document = win.document || {};

    pklib.cookie = {

        /**
         * Create cookie file with name, value and day expired.
         * @param name {String}
         * @param value {String}
         * @param days {Number}
         * @return {string}
         */
        create: function (name, value, days) {
            value = value || null;
            var expires = "",
                date = new Date();

            if (typeof days !== "undefined") {
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }

            document.cookie = name + "=" + value + expires + "; path=/";

            return this.read(name);
        },
        /**
         * Read cookie by it name.
         * @param name {String}
         * @return {Null or String}
         */
        read: function (name) {
            if (typeof name === "undefined") {
                return null;
            }
            name = name + "=";
            var i,
                c,
                ca = document.cookie.split(";"),
                len = ca.length;

            for (i = 0; i < len; i += 1) {
                c = ca[i];
                while (c.charAt(0) === " ") {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
        },
        /**
         * Delete cookie by it name.
         * @param name {String}
         * @return {String}
         */
        erase: function (name) {
            return this.create(name, undefined, -1);
        }
    };
}(this));