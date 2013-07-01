if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("image_loader.js", "/**\n *  Module: Image Loader\n *\n *  Product: Open Web Device\n *\n *  Copyright(c) 2012 Telefónica I+D S.A.U.\n *\n *  LICENSE: Apache 2.0\n *\n *  @author Telefonica Digital\n *\n */\n\n'use strict';\n\nif (!window.ImageLoader) {\n\n  /**\n    *  The constructor of the ImageLoader Object\n    *\n    *  @param{String} Selector that defines the scrollable container\n    *\n    *  @param{Object} Selector that defines the list of items that contains\n    *                 the images\n    *\n    */\n  var ImageLoader = function ImageLoader(pContainer, pItems) {\n    var container, items, itemsSelector, scrollLatency = 100, scrollTimer,\n        lastViewTop = 0, itemHeight, total, imgsLoading = 0;\n\n    var forEach = Array.prototype.forEach;\n\n    init(pContainer, pItems);\n\n    /**\n     *  Initializer\n     *\n     *  @param{String} Selector that defines the scrollable container\n     *\n     *  @param{Object} Selector that defines the list of items that contains\n     *                 the images\n     *\n     */\n    function init(pContainer, pItems) {\n      itemsSelector = pItems;\n      container = document.querySelector(pContainer);\n\n      container.addEventListener('scroll', onScroll);\n      document.addEventListener('onupdate', function(evt) {\n        evt.stopPropagation();\n        onScroll();\n      });\n\n      load();\n    }\n\n    /**\n     *  This function is invoked when we change the list of items\n     *\n     */\n    function load() {\n      window.clearTimeout(scrollTimer);\n      items = container.querySelectorAll(itemsSelector);\n      // All items have the same height\n      itemHeight = items[0] ? items[0].offsetHeight : 1;\n      total = items.length;\n      // Initial check if items should appear\n      window.setTimeout(update, 0);\n    }\n\n    /**\n     *  This function is invoked when the scrollable container is translated\n     *\n     */\n    function onScroll() {\n      window.clearTimeout(scrollTimer);\n      if (imgsLoading > 0) {\n        // Stop the pending images load\n        window.stop();\n        imgsLoading = 0;\n      }\n      scrollTimer = window.setTimeout(update, scrollLatency);\n    }\n\n    /**\n     *  Loads the image contained in a DOM Element.\n     */\n    function loadImage(item) {\n      var image = item.querySelector('img[data-src]');\n      if (!image) {\n        return;\n      }\n\n      ++imgsLoading;\n      var tmp = new Image();\n      var src = tmp.src = image.dataset.src;\n      tmp.onload = function onload() {\n        --imgsLoading;\n        image.src = src;\n        if (tmp.complete) {\n          item.dataset.visited = 'true';\n        }\n        tmp = null;\n      };\n\n      tmp.onabort = tmp.onerror = function onerror() {\n        item.dataset.visited = 'false';\n        tmp = null;\n      }\n    }\n\n    /**\n     *  Calculates the set of items that are in the current viewport\n     *\n     */\n    function update() {\n      if (total === 0) {\n        return;\n      }\n\n      var viewTop = container.scrollTop;\n      // Index is always inside or below viewport\n      var index = Math.floor(viewTop / itemHeight);\n      var containerHeight = container.offsetHeight;\n\n      // Goes backward\n      for (var i = index; i >= 0; i--) {\n        var item = items[i];\n        if (item) {\n          if (item.offsetTop + itemHeight < viewTop) {\n            break; // Over\n          }\n\n          if (item.dataset.visited !== 'true' &&\n              item.offsetTop <= viewTop + containerHeight) {\n            loadImage(item); // Inside\n          }\n        }\n      }\n\n      // Goes forward\n      for (var j = index + 1; j < total; j++) {\n        var item = items[j];\n        if (!item) {\n          // Returning because of index out of bound\n          return;\n        }\n\n        if (item.offsetTop > viewTop + containerHeight) {\n          return; // Below\n        }\n\n        if (item.dataset.visited !== 'true') {\n          loadImage(item);\n        }\n      }\n    } // update\n\n    /**\n     *  This function is public and it should be performed when the list of\n     *  items has changed\n     *\n     */\n    this.reload = load;\n  };\n}\n");
__$coverInitRange("image_loader.js", "177:189");
__$coverInitRange("image_loader.js", "192:4026");
__$coverInitRange("image_loader.js", "480:4024");
__$coverInitRange("image_loader.js", "545:675");
__$coverInitRange("image_loader.js", "682:719");
__$coverInitRange("image_loader.js", "726:750");
__$coverInitRange("image_loader.js", "995:1310");
__$coverInitRange("image_loader.js", "1406:1732");
__$coverInitRange("image_loader.js", "1839:2092");
__$coverInitRange("image_loader.js", "2167:2712");
__$coverInitRange("image_loader.js", "2811:3859");
__$coverInitRange("image_loader.js", "4001:4019");
__$coverInitRange("image_loader.js", "1037:1059");
__$coverInitRange("image_loader.js", "1067:1113");
__$coverInitRange("image_loader.js", "1122:1168");
__$coverInitRange("image_loader.js", "1176:1289");
__$coverInitRange("image_loader.js", "1298:1304");
__$coverInitRange("image_loader.js", "1238:1259");
__$coverInitRange("image_loader.js", "1269:1279");
__$coverInitRange("image_loader.js", "1430:1462");
__$coverInitRange("image_loader.js", "1470:1519");
__$coverInitRange("image_loader.js", "1567:1616");
__$coverInitRange("image_loader.js", "1624:1644");
__$coverInitRange("image_loader.js", "1698:1726");
__$coverInitRange("image_loader.js", "1867:1899");
__$coverInitRange("image_loader.js", "1907:2024");
__$coverInitRange("image_loader.js", "2032:2086");
__$coverInitRange("image_loader.js", "1978:1991");
__$coverInitRange("image_loader.js", "2001:2016");
__$coverInitRange("image_loader.js", "2200:2247");
__$coverInitRange("image_loader.js", "2255:2291");
__$coverInitRange("image_loader.js", "2300:2313");
__$coverInitRange("image_loader.js", "2321:2342");
__$coverInitRange("image_loader.js", "2350:2387");
__$coverInitRange("image_loader.js", "2395:2582");
__$coverInitRange("image_loader.js", "2591:2711");
__$coverInitRange("image_loader.js", "2277:2283");
__$coverInitRange("image_loader.js", "2436:2449");
__$coverInitRange("image_loader.js", "2459:2474");
__$coverInitRange("image_loader.js", "2484:2553");
__$coverInitRange("image_loader.js", "2563:2573");
__$coverInitRange("image_loader.js", "2514:2543");
__$coverInitRange("image_loader.js", "2648:2678");
__$coverInitRange("image_loader.js", "2688:2698");
__$coverInitRange("image_loader.js", "2837:2878");
__$coverInitRange("image_loader.js", "2887:2920");
__$coverInitRange("image_loader.js", "2978:3022");
__$coverInitRange("image_loader.js", "3030:3074");
__$coverInitRange("image_loader.js", "3106:3462");
__$coverInitRange("image_loader.js", "3493:3853");
__$coverInitRange("image_loader.js", "2864:2870");
__$coverInitRange("image_loader.js", "3149:3168");
__$coverInitRange("image_loader.js", "3178:3454");
__$coverInitRange("image_loader.js", "3200:3282");
__$coverInitRange("image_loader.js", "3295:3444");
__$coverInitRange("image_loader.js", "3257:3262");
__$coverInitRange("image_loader.js", "3407:3422");
__$coverInitRange("image_loader.js", "3543:3562");
__$coverInitRange("image_loader.js", "3572:3664");
__$coverInitRange("image_loader.js", "3675:3760");
__$coverInitRange("image_loader.js", "3771:3845");
__$coverInitRange("image_loader.js", "3648:3654");
__$coverInitRange("image_loader.js", "3735:3741");
__$coverInitRange("image_loader.js", "3820:3835");
__$coverCall('image_loader.js', '177:189');
'use strict';
__$coverCall('image_loader.js', '192:4026');
if (!window.ImageLoader) {
    __$coverCall('image_loader.js', '480:4024');
    var ImageLoader = function ImageLoader(pContainer, pItems) {
        __$coverCall('image_loader.js', '545:675');
        var container, items, itemsSelector, scrollLatency = 100, scrollTimer, lastViewTop = 0, itemHeight, total, imgsLoading = 0;
        __$coverCall('image_loader.js', '682:719');
        var forEach = Array.prototype.forEach;
        __$coverCall('image_loader.js', '726:750');
        init(pContainer, pItems);
        __$coverCall('image_loader.js', '995:1310');
        function init(pContainer, pItems) {
            __$coverCall('image_loader.js', '1037:1059');
            itemsSelector = pItems;
            __$coverCall('image_loader.js', '1067:1113');
            container = document.querySelector(pContainer);
            __$coverCall('image_loader.js', '1122:1168');
            container.addEventListener('scroll', onScroll);
            __$coverCall('image_loader.js', '1176:1289');
            document.addEventListener('onupdate', function (evt) {
                __$coverCall('image_loader.js', '1238:1259');
                evt.stopPropagation();
                __$coverCall('image_loader.js', '1269:1279');
                onScroll();
            });
            __$coverCall('image_loader.js', '1298:1304');
            load();
        }
        __$coverCall('image_loader.js', '1406:1732');
        function load() {
            __$coverCall('image_loader.js', '1430:1462');
            window.clearTimeout(scrollTimer);
            __$coverCall('image_loader.js', '1470:1519');
            items = container.querySelectorAll(itemsSelector);
            __$coverCall('image_loader.js', '1567:1616');
            itemHeight = items[0] ? items[0].offsetHeight : 1;
            __$coverCall('image_loader.js', '1624:1644');
            total = items.length;
            __$coverCall('image_loader.js', '1698:1726');
            window.setTimeout(update, 0);
        }
        __$coverCall('image_loader.js', '1839:2092');
        function onScroll() {
            __$coverCall('image_loader.js', '1867:1899');
            window.clearTimeout(scrollTimer);
            __$coverCall('image_loader.js', '1907:2024');
            if (imgsLoading > 0) {
                __$coverCall('image_loader.js', '1978:1991');
                window.stop();
                __$coverCall('image_loader.js', '2001:2016');
                imgsLoading = 0;
            }
            __$coverCall('image_loader.js', '2032:2086');
            scrollTimer = window.setTimeout(update, scrollLatency);
        }
        __$coverCall('image_loader.js', '2167:2712');
        function loadImage(item) {
            __$coverCall('image_loader.js', '2200:2247');
            var image = item.querySelector('img[data-src]');
            __$coverCall('image_loader.js', '2255:2291');
            if (!image) {
                __$coverCall('image_loader.js', '2277:2283');
                return;
            }
            __$coverCall('image_loader.js', '2300:2313');
            ++imgsLoading;
            __$coverCall('image_loader.js', '2321:2342');
            var tmp = new Image();
            __$coverCall('image_loader.js', '2350:2387');
            var src = tmp.src = image.dataset.src;
            __$coverCall('image_loader.js', '2395:2582');
            tmp.onload = function onload() {
                __$coverCall('image_loader.js', '2436:2449');
                --imgsLoading;
                __$coverCall('image_loader.js', '2459:2474');
                image.src = src;
                __$coverCall('image_loader.js', '2484:2553');
                if (tmp.complete) {
                    __$coverCall('image_loader.js', '2514:2543');
                    item.dataset.visited = 'true';
                }
                __$coverCall('image_loader.js', '2563:2573');
                tmp = null;
            };
            __$coverCall('image_loader.js', '2591:2711');
            tmp.onabort = tmp.onerror = function onerror() {
                __$coverCall('image_loader.js', '2648:2678');
                item.dataset.visited = 'false';
                __$coverCall('image_loader.js', '2688:2698');
                tmp = null;
            };
        }
        __$coverCall('image_loader.js', '2811:3859');
        function update() {
            __$coverCall('image_loader.js', '2837:2878');
            if (total === 0) {
                __$coverCall('image_loader.js', '2864:2870');
                return;
            }
            __$coverCall('image_loader.js', '2887:2920');
            var viewTop = container.scrollTop;
            __$coverCall('image_loader.js', '2978:3022');
            var index = Math.floor(viewTop / itemHeight);
            __$coverCall('image_loader.js', '3030:3074');
            var containerHeight = container.offsetHeight;
            __$coverCall('image_loader.js', '3106:3462');
            for (var i = index; i >= 0; i--) {
                __$coverCall('image_loader.js', '3149:3168');
                var item = items[i];
                __$coverCall('image_loader.js', '3178:3454');
                if (item) {
                    __$coverCall('image_loader.js', '3200:3282');
                    if (item.offsetTop + itemHeight < viewTop) {
                        __$coverCall('image_loader.js', '3257:3262');
                        break;
                    }
                    __$coverCall('image_loader.js', '3295:3444');
                    if (item.dataset.visited !== 'true' && item.offsetTop <= viewTop + containerHeight) {
                        __$coverCall('image_loader.js', '3407:3422');
                        loadImage(item);
                    }
                }
            }
            __$coverCall('image_loader.js', '3493:3853');
            for (var j = index + 1; j < total; j++) {
                __$coverCall('image_loader.js', '3543:3562');
                var item = items[j];
                __$coverCall('image_loader.js', '3572:3664');
                if (!item) {
                    __$coverCall('image_loader.js', '3648:3654');
                    return;
                }
                __$coverCall('image_loader.js', '3675:3760');
                if (item.offsetTop > viewTop + containerHeight) {
                    __$coverCall('image_loader.js', '3735:3741');
                    return;
                }
                __$coverCall('image_loader.js', '3771:3845');
                if (item.dataset.visited !== 'true') {
                    __$coverCall('image_loader.js', '3820:3835');
                    loadImage(item);
                }
            }
        }
        __$coverCall('image_loader.js', '4001:4019');
        this.reload = load;
    };
}