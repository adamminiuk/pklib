pklib = this.pklib || {};

pklib.loader = (function() {
	
	return {

        // Class name to new layer
		objClass: 'pklib-loader-wrapper',

        // Class name to new layer
        objClassPercent: this.objClass + '-percent',

        // Time to auto close loader
        autoclosetime: 500,

        // Time to close loader
        closetime: 500,

        // Time to animate fade loader in browser
        showtime: 500,

        // Url to loader image
        loaderImage: 'http://pklib.com/img/icons/loader.gif',
        
        // Alternative text
        loaderImageAlt: 'loader', 

        // Show loader in browser. Default will be show in body. 
        // Default not be centered. Add object to DOM
        show: function(config, callback) {
            var settings = {
                place: 'body',
                holder: null,
                center: false,
                percent: false,
                percentMargin: 0
            };
            jQuery.extend(settings, config);
            settings.holder = (settings.place === 'body') ? window : settings.place;
            
            var placeHolderChildrens = jQuery(settings.holder).children(),
                insideLoaders = placeHolderChildrens.filter('.' + this.objClass),
                insideLoaderPercents = placeHolderChildrens.filter('.' + this.objClassPercent);
                
            if (!pklib.validate.empty(insideLoaders.length)){
                this.showtime += 300;
                insideLoaders.remove();
                insideLoaderPercents.remove();
            }
            
            var loader = jQuery('<img />').attr({
                src: this.loaderImage,
                alt: this.loaderImageAlt
            }).css({
                position: 'absolute',
                width: 32,
                height: 32,
                opacity: 0,
                zIndex: 2000
            }).addClass(this.objClass);
            
            jQuery(settings.place).append(loader);
            
            var leftCssVal = 0,
                topCssVal = 0;
            
            if (settings.center) {
                leftCssVal = (jQuery(settings.holder).width() - loader.width()) / 2;
                topCssVal = (jQuery(settings.holder).height() - loader.height() ) / 2;
            }
            
            jQuery('.' + this.objClass).css({
                left: leftCssVal,
                top: topCssVal
            }).animate({
                opacity: 1
            }, this.showtime, function(){
                if (typeof callback != 'undefined'){
                    callback();
                }
            });
            
            if (settings.percent){
                var percentCssClass = this.objClassPercent,
                    percent = jQuery('<span />').css({
                    position: 'absolute',
                    width: loader.width(),
                    textAlign: 'center',
                    opacity: 0,
                    zIndex: 2002
                }).addClass(percentCssClass);
                
                jQuery(settings.place).append(percent);
                
                var percentProgress = 0,
                    percentProgressInterval = setInterval(function(){
                    if (percentProgress <= 100) {
                        jQuery('.' + percentCssClass).text(percentProgress + '%');
                        percentProgress += 1;
                    } else {
                        clearInterval(percentProgressInterval);
                    }
                }, 100);
                
                var topMargin = ((loader.height() - parseInt(percent.css('line-height'), 10)) / 2 );
                
                jQuery('.' + percentCssClass).css({
                    left: leftCssVal,
                    top: topCssVal + topMargin + settings.percentMargin
                }).animate({
                    opacity: 1
                }, this.showtime);
            }
            
            // release memory in IE
            loader = null;
            percent = null;
        },

        // Auto close loader. 
        // Remove object from DOM
        autoclose: function(config) {
            var settings = config || {},
                Loader = this;
            setTimeout(function(){
                Loader.close(settings);
            }, this.autoclosetime);
        },

        // Close loader. Remove object from DOM
        close: function(config) {
            var settings = {
                    place: 'body'
                },
                Loader = this;
            jQuery.extend(settings, config);
            
            var className = settings.place + ' .' + this.objClass,
                classNamePercent = settings.place + ' .' + this.objClassPercent,
                loaderElementCssClass = [className, classNamePercent],
                animationComplete = function() {
                    jQuery.each(loaderElementCssClass, function(i,val){
                        jQuery(val).remove();
                    });
                };
            
            jQuery.each(loaderElementCssClass, function(i,val){
                jQuery(val).animate({
                    opacity: 0
                }, Loader.closetime, animationComplete);
            });
        }
        
	};

})();