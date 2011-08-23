/**
 * @package pklib.file
 */
pklib = this.pklib || {};
pklib.file = (function() {

    var doc = document;

    return {

        /**
         * @param {string} src
         * @param {function} callback
         */
        load : function(src, callback) {
            var script = doc.createElement("script");
            script.type = "text/javascript";
            script.src = src;

            if (script.readyState) {
                script.onreadystatechange = function() {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        (typeof callback === "function") && callback(script);
                    }
                };
            } else {
                script.onload = function() {
                    (typeof callback === "function") && callback(script);
                };
            }

            doc.getElementsByTagName("head")[0].appendChild(script);

        }

    };

})();
