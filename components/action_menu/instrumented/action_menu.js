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
__$coverInit("action_menu.js", "\n'use strict';\n\nvar utils = this.utils || {};\n\nutils.ActionMenus = (function() {\n\n  // This constant is essential to resolve what is the path of the CSS file\n  // that defines the animations\n  var FILE_NAME = 'action_menu';\n\n  function getPath() {\n    var path = document.querySelector('[src*=\"' + FILE_NAME + '.js\"]').src;\n    return path.substring(0, path.lastIndexOf('/') + 1);\n  }\n\n  var actionMenus = [];\n  var actionMenusById = {};\n\n  /*\n   * ActionMenu constructor\n   *\n   * @param{Object} DOMElement with data type action\n   *\n   */\n  var ActionMenu = function(container) {\n    this.container = container;\n    this.callbacks = {};\n\n    container.addEventListener('click', this);\n    container.addEventListener('animationend', this);\n  };\n\n  ActionMenu.prototype = {\n    /*\n     * Returns the identifier\n     */\n    get id() {\n      return this.container.id;\n    },\n\n    /*\n     * Shows the action menu\n     */\n    show: function show() {\n      this.container.classList.remove('hidden');\n      this.container.classList.add('onviewport');\n    },\n\n    /*\n     * Hides the action menu\n     */\n    hide: function hide() {\n      this.container.classList.remove('onviewport');\n    },\n\n    /*\n     * Thrid-parties can add a event listener in order to know when the\n     * component was clicked. Moreover, a method called onclick can be added as\n     * well as alternative mechanism\n     *\n     * @param{String} Event type (only implemented \"click\" event)\n     *\n     * @param{Function} Callback that will be invoked when the event occurs\n     *\n     */\n    addEventListener: function addEventListener(type, callback) {\n      if (type !== 'click' || typeof callback !== 'function') {\n        return;\n      }\n\n      this.callbacks[callback] = callback;\n    },\n\n    /*\n     * Thrid-parties can remove a event listener\n     *\n     * @param{String} Event type (only implemented \"click\" event)\n     *\n     * @param{Function} Callback that will be removed\n     *\n     */\n    removeEventListener: function removeEventListener(type, callback) {\n      if (type === 'click' && typeof callback === 'function') {\n        delete this.callbacks[callback];\n      }\n    },\n\n    /*\n     * This method is called whenever a \"click\" and \"animationend\" events occur\n     *\n     * @param{Object} The DOM Event to register\n     */\n    handleEvent: function slider_handleEvent(evt) {\n      switch (evt.type) {\n        case 'click':\n          evt.stopPropagation();\n          evt.preventDefault();\n\n          if (evt.target.tagName !== 'BUTTON') {\n            return;\n          }\n\n          // The component is auto-closed\n          window.setTimeout(this.hide.bind(this));\n\n          typeof this.onclick === 'function' && this.onclick(evt);\n          var callbacks = this.callbacks;\n          Object.keys(callbacks).forEach(function(callback) {\n            callbacks[callback](evt);\n          });\n\n          break;\n\n        case 'animationend':\n          if (evt.animationName !== 'hide') {\n            return;\n          }\n\n          this.container.classList.add('hidden');\n\n          break;\n      }\n    },\n\n    /*\n     * Deletes variables and unregister listeners\n     */\n    destroy: function destroy() {\n      if (!this.container) {\n        return;\n      }\n\n      this.container.removeEventListener('click', this);\n      this.container.removeEventListener('animationend', this);\n      this.container.parentNode.removeChild(this.container);\n      this.container = this.callbacks = this.onclick = null;\n    }\n  };\n\n  function initialize() {\n    var link = document.createElement('link');\n    link.type = 'text/css';\n    link.rel = 'stylesheet';\n    link.href = getPath() + 'action_menu_behavior.css';\n    document.head.appendChild(link);\n\n    // Looking for all actions in the DOM\n    var elements =\n              document.querySelectorAll('[role=\"dialog\"][data-type=\"action\"]');\n    for (var i = 0; i < elements.length; i++) {\n      if (elements[i].dataset.created !== 'automatically') {\n        utils.ActionMenus.bind(elements[i]);\n      }\n    }\n  }\n\n  // Initializing the library\n  if (document.readyState === 'complete') {\n    initialize();\n  } else {\n    document.addEventListener('DOMContentLoaded', function loaded() {\n      document.removeEventListener('DOMContentLoaded', loaded);\n      initialize();\n    });\n  }\n\n  function destroy() {\n    actionMenus.forEach(function destroying(actionMenu) {\n      actionMenu.destroy();\n    });\n    actionMenus = [];\n    actionMenusById = {};\n  }\n\n  return {\n    /*\n     * Returns an action menu object\n     */\n    get: function get(id) {\n      return actionMenusById[id];\n    },\n\n    /*\n     * Binds to an UI component\n     *\n     * @param{Object} DOMElement o selector that represents the action menu form\n     */\n    bind: function bind(elem) {\n      elem = typeof elem === 'object' ? elem : document.querySelector(elem);\n      var actionMenu = new ActionMenu(elem);\n      actionMenus.push(actionMenu);\n      if (actionMenu.id) {\n        actionMenusById[actionMenu.id] = actionMenu;\n      }\n\n      return actionMenu;\n    },\n\n    /*\n     * Creates a new action menu UI component\n     *\n     * @param{String} The title of the action menu\n     *\n     * @param{Array} List of action descriptors composed by id and title text\n     */\n    create: function create(descriptor) {\n      descriptor = descriptor || {};\n\n      var form = document.createElement('form');\n      form.setAttribute('role', 'dialog');\n      form.dataset.type = 'action';\n      form.dataset.created = 'automatically';\n      form.classList.add('hidden');\n      if (descriptor.id) {\n        form.id = descriptor.id;\n      }\n\n      var section = document.createElement('section');\n      var h1 = document.createElement('h1');\n      h1.textContent = descriptor.title || '';\n      section.appendChild(h1);\n      form.appendChild(section);\n\n      var actions = descriptor.actions;\n      if (actions) {\n        var menu = document.createElement('menu');\n        menu.classList.add('actions');\n\n        actions.forEach(function(action) {\n          var button = document.createElement('button');\n          button.id = action.id;\n          button.textContent = action.title;\n          menu.appendChild(button);\n        });\n\n        form.appendChild(menu);\n      }\n\n      return form;\n    },\n\n    /*\n     * Releases memory removing listeners and deleting variables\n     */\n    destroy: destroy\n  };\n\n})();\n");
__$coverInitRange("action_menu.js", "1:13");
__$coverInitRange("action_menu.js", "16:44");
__$coverInitRange("action_menu.js", "47:6382");
__$coverInitRange("action_menu.js", "193:222");
__$coverInitRange("action_menu.js", "227:383");
__$coverInitRange("action_menu.js", "388:408");
__$coverInitRange("action_menu.js", "412:436");
__$coverInitRange("action_menu.js", "543:744");
__$coverInitRange("action_menu.js", "749:3488");
__$coverInitRange("action_menu.js", "3493:4026");
__$coverInitRange("action_menu.js", "4061:4296");
__$coverInitRange("action_menu.js", "4301:4466");
__$coverInitRange("action_menu.js", "4471:6375");
__$coverInitRange("action_menu.js", "252:322");
__$coverInitRange("action_menu.js", "328:379");
__$coverInitRange("action_menu.js", "586:612");
__$coverInitRange("action_menu.js", "618:637");
__$coverInitRange("action_menu.js", "644:685");
__$coverInitRange("action_menu.js", "691:739");
__$coverInitRange("action_menu.js", "840:864");
__$coverInitRange("action_menu.js", "952:993");
__$coverInitRange("action_menu.js", "1001:1043");
__$coverInitRange("action_menu.js", "1131:1176");
__$coverInitRange("action_menu.js", "1625:1705");
__$coverInitRange("action_menu.js", "1714:1749");
__$coverInitRange("action_menu.js", "1691:1697");
__$coverInitRange("action_menu.js", "2042:2147");
__$coverInitRange("action_menu.js", "2108:2139");
__$coverInitRange("action_menu.js", "2365:3073");
__$coverInitRange("action_menu.js", "2417:2438");
__$coverInitRange("action_menu.js", "2450:2470");
__$coverInitRange("action_menu.js", "2483:2552");
__$coverInitRange("action_menu.js", "2607:2646");
__$coverInitRange("action_menu.js", "2659:2714");
__$coverInitRange("action_menu.js", "2726:2756");
__$coverInitRange("action_menu.js", "2768:2870");
__$coverInitRange("action_menu.js", "2883:2888");
__$coverInitRange("action_menu.js", "2534:2540");
__$coverInitRange("action_menu.js", "2832:2856");
__$coverInitRange("action_menu.js", "2930:2996");
__$coverInitRange("action_menu.js", "3009:3047");
__$coverInitRange("action_menu.js", "3060:3065");
__$coverInitRange("action_menu.js", "2978:2984");
__$coverInitRange("action_menu.js", "3188:3233");
__$coverInitRange("action_menu.js", "3242:3291");
__$coverInitRange("action_menu.js", "3299:3355");
__$coverInitRange("action_menu.js", "3363:3416");
__$coverInitRange("action_menu.js", "3424:3477");
__$coverInitRange("action_menu.js", "3219:3225");
__$coverInitRange("action_menu.js", "3521:3562");
__$coverInitRange("action_menu.js", "3568:3590");
__$coverInitRange("action_menu.js", "3596:3619");
__$coverInitRange("action_menu.js", "3625:3675");
__$coverInitRange("action_menu.js", "3681:3712");
__$coverInitRange("action_menu.js", "3761:3854");
__$coverInitRange("action_menu.js", "3860:4022");
__$coverInitRange("action_menu.js", "3910:4016");
__$coverInitRange("action_menu.js", "3973:4008");
__$coverInitRange("action_menu.js", "4107:4119");
__$coverInitRange("action_menu.js", "4136:4292");
__$coverInitRange("action_menu.js", "4208:4264");
__$coverInitRange("action_menu.js", "4272:4284");
__$coverInitRange("action_menu.js", "4326:4414");
__$coverInitRange("action_menu.js", "4420:4436");
__$coverInitRange("action_menu.js", "4442:4462");
__$coverInitRange("action_menu.js", "4386:4406");
__$coverInitRange("action_menu.js", "4566:4592");
__$coverInitRange("action_menu.js", "4775:4844");
__$coverInitRange("action_menu.js", "4852:4889");
__$coverInitRange("action_menu.js", "4897:4925");
__$coverInitRange("action_menu.js", "4933:5013");
__$coverInitRange("action_menu.js", "5022:5039");
__$coverInitRange("action_menu.js", "4962:5005");
__$coverInitRange("action_menu.js", "5301:5330");
__$coverInitRange("action_menu.js", "5339:5380");
__$coverInitRange("action_menu.js", "5388:5423");
__$coverInitRange("action_menu.js", "5431:5459");
__$coverInitRange("action_menu.js", "5467:5505");
__$coverInitRange("action_menu.js", "5513:5541");
__$coverInitRange("action_menu.js", "5549:5609");
__$coverInitRange("action_menu.js", "5618:5665");
__$coverInitRange("action_menu.js", "5673:5710");
__$coverInitRange("action_menu.js", "5718:5757");
__$coverInitRange("action_menu.js", "5765:5788");
__$coverInitRange("action_menu.js", "5796:5821");
__$coverInitRange("action_menu.js", "5830:5862");
__$coverInitRange("action_menu.js", "5870:6241");
__$coverInitRange("action_menu.js", "6250:6261");
__$coverInitRange("action_menu.js", "5578:5601");
__$coverInitRange("action_menu.js", "5893:5934");
__$coverInitRange("action_menu.js", "5944:5973");
__$coverInitRange("action_menu.js", "5984:6200");
__$coverInitRange("action_menu.js", "6211:6233");
__$coverInitRange("action_menu.js", "6029:6074");
__$coverInitRange("action_menu.js", "6086:6107");
__$coverInitRange("action_menu.js", "6119:6152");
__$coverInitRange("action_menu.js", "6164:6188");
__$coverCall('action_menu.js', '1:13');
'use strict';
__$coverCall('action_menu.js', '16:44');
var utils = this.utils || {};
__$coverCall('action_menu.js', '47:6382');
utils.ActionMenus = function () {
    __$coverCall('action_menu.js', '193:222');
    var FILE_NAME = 'action_menu';
    __$coverCall('action_menu.js', '227:383');
    function getPath() {
        __$coverCall('action_menu.js', '252:322');
        var path = document.querySelector('[src*="' + FILE_NAME + '.js"]').src;
        __$coverCall('action_menu.js', '328:379');
        return path.substring(0, path.lastIndexOf('/') + 1);
    }
    __$coverCall('action_menu.js', '388:408');
    var actionMenus = [];
    __$coverCall('action_menu.js', '412:436');
    var actionMenusById = {};
    __$coverCall('action_menu.js', '543:744');
    var ActionMenu = function (container) {
        __$coverCall('action_menu.js', '586:612');
        this.container = container;
        __$coverCall('action_menu.js', '618:637');
        this.callbacks = {};
        __$coverCall('action_menu.js', '644:685');
        container.addEventListener('click', this);
        __$coverCall('action_menu.js', '691:739');
        container.addEventListener('animationend', this);
    };
    __$coverCall('action_menu.js', '749:3488');
    ActionMenu.prototype = {
        get id() {
            __$coverCall('action_menu.js', '840:864');
            return this.container.id;
        },
        show: function show() {
            __$coverCall('action_menu.js', '952:993');
            this.container.classList.remove('hidden');
            __$coverCall('action_menu.js', '1001:1043');
            this.container.classList.add('onviewport');
        },
        hide: function hide() {
            __$coverCall('action_menu.js', '1131:1176');
            this.container.classList.remove('onviewport');
        },
        addEventListener: function addEventListener(type, callback) {
            __$coverCall('action_menu.js', '1625:1705');
            if (type !== 'click' || typeof callback !== 'function') {
                __$coverCall('action_menu.js', '1691:1697');
                return;
            }
            __$coverCall('action_menu.js', '1714:1749');
            this.callbacks[callback] = callback;
        },
        removeEventListener: function removeEventListener(type, callback) {
            __$coverCall('action_menu.js', '2042:2147');
            if (type === 'click' && typeof callback === 'function') {
                __$coverCall('action_menu.js', '2108:2139');
                delete this.callbacks[callback];
            }
        },
        handleEvent: function slider_handleEvent(evt) {
            __$coverCall('action_menu.js', '2365:3073');
            switch (evt.type) {
            case 'click':
                __$coverCall('action_menu.js', '2417:2438');
                evt.stopPropagation();
                __$coverCall('action_menu.js', '2450:2470');
                evt.preventDefault();
                __$coverCall('action_menu.js', '2483:2552');
                if (evt.target.tagName !== 'BUTTON') {
                    __$coverCall('action_menu.js', '2534:2540');
                    return;
                }
                __$coverCall('action_menu.js', '2607:2646');
                window.setTimeout(this.hide.bind(this));
                __$coverCall('action_menu.js', '2659:2714');
                typeof this.onclick === 'function' && this.onclick(evt);
                __$coverCall('action_menu.js', '2726:2756');
                var callbacks = this.callbacks;
                __$coverCall('action_menu.js', '2768:2870');
                Object.keys(callbacks).forEach(function (callback) {
                    __$coverCall('action_menu.js', '2832:2856');
                    callbacks[callback](evt);
                });
                __$coverCall('action_menu.js', '2883:2888');
                break;
            case 'animationend':
                __$coverCall('action_menu.js', '2930:2996');
                if (evt.animationName !== 'hide') {
                    __$coverCall('action_menu.js', '2978:2984');
                    return;
                }
                __$coverCall('action_menu.js', '3009:3047');
                this.container.classList.add('hidden');
                __$coverCall('action_menu.js', '3060:3065');
                break;
            }
        },
        destroy: function destroy() {
            __$coverCall('action_menu.js', '3188:3233');
            if (!this.container) {
                __$coverCall('action_menu.js', '3219:3225');
                return;
            }
            __$coverCall('action_menu.js', '3242:3291');
            this.container.removeEventListener('click', this);
            __$coverCall('action_menu.js', '3299:3355');
            this.container.removeEventListener('animationend', this);
            __$coverCall('action_menu.js', '3363:3416');
            this.container.parentNode.removeChild(this.container);
            __$coverCall('action_menu.js', '3424:3477');
            this.container = this.callbacks = this.onclick = null;
        }
    };
    __$coverCall('action_menu.js', '3493:4026');
    function initialize() {
        __$coverCall('action_menu.js', '3521:3562');
        var link = document.createElement('link');
        __$coverCall('action_menu.js', '3568:3590');
        link.type = 'text/css';
        __$coverCall('action_menu.js', '3596:3619');
        link.rel = 'stylesheet';
        __$coverCall('action_menu.js', '3625:3675');
        link.href = getPath() + 'action_menu_behavior.css';
        __$coverCall('action_menu.js', '3681:3712');
        document.head.appendChild(link);
        __$coverCall('action_menu.js', '3761:3854');
        var elements = document.querySelectorAll('[role="dialog"][data-type="action"]');
        __$coverCall('action_menu.js', '3860:4022');
        for (var i = 0; i < elements.length; i++) {
            __$coverCall('action_menu.js', '3910:4016');
            if (elements[i].dataset.created !== 'automatically') {
                __$coverCall('action_menu.js', '3973:4008');
                utils.ActionMenus.bind(elements[i]);
            }
        }
    }
    __$coverCall('action_menu.js', '4061:4296');
    if (document.readyState === 'complete') {
        __$coverCall('action_menu.js', '4107:4119');
        initialize();
    } else {
        __$coverCall('action_menu.js', '4136:4292');
        document.addEventListener('DOMContentLoaded', function loaded() {
            __$coverCall('action_menu.js', '4208:4264');
            document.removeEventListener('DOMContentLoaded', loaded);
            __$coverCall('action_menu.js', '4272:4284');
            initialize();
        });
    }
    __$coverCall('action_menu.js', '4301:4466');
    function destroy() {
        __$coverCall('action_menu.js', '4326:4414');
        actionMenus.forEach(function destroying(actionMenu) {
            __$coverCall('action_menu.js', '4386:4406');
            actionMenu.destroy();
        });
        __$coverCall('action_menu.js', '4420:4436');
        actionMenus = [];
        __$coverCall('action_menu.js', '4442:4462');
        actionMenusById = {};
    }
    __$coverCall('action_menu.js', '4471:6375');
    return {
        get: function get(id) {
            __$coverCall('action_menu.js', '4566:4592');
            return actionMenusById[id];
        },
        bind: function bind(elem) {
            __$coverCall('action_menu.js', '4775:4844');
            elem = typeof elem === 'object' ? elem : document.querySelector(elem);
            __$coverCall('action_menu.js', '4852:4889');
            var actionMenu = new ActionMenu(elem);
            __$coverCall('action_menu.js', '4897:4925');
            actionMenus.push(actionMenu);
            __$coverCall('action_menu.js', '4933:5013');
            if (actionMenu.id) {
                __$coverCall('action_menu.js', '4962:5005');
                actionMenusById[actionMenu.id] = actionMenu;
            }
            __$coverCall('action_menu.js', '5022:5039');
            return actionMenu;
        },
        create: function create(descriptor) {
            __$coverCall('action_menu.js', '5301:5330');
            descriptor = descriptor || {};
            __$coverCall('action_menu.js', '5339:5380');
            var form = document.createElement('form');
            __$coverCall('action_menu.js', '5388:5423');
            form.setAttribute('role', 'dialog');
            __$coverCall('action_menu.js', '5431:5459');
            form.dataset.type = 'action';
            __$coverCall('action_menu.js', '5467:5505');
            form.dataset.created = 'automatically';
            __$coverCall('action_menu.js', '5513:5541');
            form.classList.add('hidden');
            __$coverCall('action_menu.js', '5549:5609');
            if (descriptor.id) {
                __$coverCall('action_menu.js', '5578:5601');
                form.id = descriptor.id;
            }
            __$coverCall('action_menu.js', '5618:5665');
            var section = document.createElement('section');
            __$coverCall('action_menu.js', '5673:5710');
            var h1 = document.createElement('h1');
            __$coverCall('action_menu.js', '5718:5757');
            h1.textContent = descriptor.title || '';
            __$coverCall('action_menu.js', '5765:5788');
            section.appendChild(h1);
            __$coverCall('action_menu.js', '5796:5821');
            form.appendChild(section);
            __$coverCall('action_menu.js', '5830:5862');
            var actions = descriptor.actions;
            __$coverCall('action_menu.js', '5870:6241');
            if (actions) {
                __$coverCall('action_menu.js', '5893:5934');
                var menu = document.createElement('menu');
                __$coverCall('action_menu.js', '5944:5973');
                menu.classList.add('actions');
                __$coverCall('action_menu.js', '5984:6200');
                actions.forEach(function (action) {
                    __$coverCall('action_menu.js', '6029:6074');
                    var button = document.createElement('button');
                    __$coverCall('action_menu.js', '6086:6107');
                    button.id = action.id;
                    __$coverCall('action_menu.js', '6119:6152');
                    button.textContent = action.title;
                    __$coverCall('action_menu.js', '6164:6188');
                    menu.appendChild(button);
                });
                __$coverCall('action_menu.js', '6211:6233');
                form.appendChild(menu);
            }
            __$coverCall('action_menu.js', '6250:6261');
            return form;
        },
        destroy: destroy
    };
}();