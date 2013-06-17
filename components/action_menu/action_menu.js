
'use strict';

var utils = this.utils || {};

utils.ActionMenus = (function() {

  // This constant is essential to resolve what is the path of the CSS file
  // that defines the animations
  var FILE_NAME = 'action_menu';

  function getPath() {
    var path = document.querySelector('[src*="' + FILE_NAME + '.js"]').src;
    return path.substring(0, path.lastIndexOf('/') + 1);
  }

  var actionMenus = [];
  var actionMenusById = {};

  /*
   * ActionMenu constructor
   *
   * @param{Object} DOMElement with data type action
   *
   */
  var ActionMenu = function(container) {
    this.container = container;
    this.callbacks = {};

    container.addEventListener('click', this);
    container.addEventListener('animationend', this);
  };

  ActionMenu.prototype = {
    /*
     * Returns the identifier
     */
    get id() {
      return this.container.id;
    },

    /*
     * Shows the action menu
     */
    show: function show() {
      this.container.classList.remove('hidden');
      this.container.classList.add('onviewport');
    },

    /*
     * Hides the action menu
     */
    hide: function hide() {
      this.container.classList.remove('onviewport');
    },

    /*
     * Thrid-parties can add a event listener in order to know when the
     * component was clicked. Moreover, a method called onclick can be added as
     * well as alternative mechanism
     *
     * @param{String} Event type (only implemented "click" event)
     *
     * @param{Function} Callback that will be invoked when the event occurs
     *
     */
    addEventListener: function addEventListener(type, callback) {
      if (type !== 'click' || typeof callback !== 'function') {
        return;
      }

      this.callbacks[callback] = callback;
    },

    /*
     * Thrid-parties can remove a event listener
     *
     * @param{String} Event type (only implemented "click" event)
     *
     * @param{Function} Callback that will be removed
     *
     */
    removeEventListener: function removeEventListener(type, callback) {
      if (type === 'click' && typeof callback === 'function') {
        delete this.callbacks[callback];
      }
    },

    /*
     * This method is called whenever a "click" and "animationend" events occur
     *
     * @param{Object} The DOM Event to register
     */
    handleEvent: function slider_handleEvent(evt) {
      switch (evt.type) {
        case 'click':
          evt.stopPropagation();
          evt.preventDefault();

          if (evt.target.tagName !== 'BUTTON') {
            return;
          }

          // The component is auto-closed
          window.setTimeout(this.hide.bind(this));

          typeof this.onclick === 'function' && this.onclick(evt);
          var callbacks = this.callbacks;
          Object.keys(callbacks).forEach(function(callback) {
            callbacks[callback](evt);
          });

          break;

        case 'animationend':
          if (evt.animationName !== 'hide') {
            return;
          }

          this.container.classList.add('hidden');

          break;
      }
    },

    /*
     * Deletes variables and unregister listeners
     */
    destroy: function destroy() {
      if (!this.container) {
        return;
      }

      this.container.removeEventListener('click', this);
      this.container.removeEventListener('animationend', this);
      this.container.parentNode.removeChild(this.container);
      this.container = this.callbacks = this.onclick = null;
    }
  };

  function initialize() {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = getPath() + 'action_menu_behavior.css';
    document.head.appendChild(link);

    // Looking for all actions in the DOM
    var elements =
              document.querySelectorAll('[role="dialog"][data-type="action"]');
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].dataset.created !== 'automatically') {
        utils.ActionMenus.bind(elements[i]);
      }
    }
  }

  // Initializing the library
  if (document.readyState === 'complete') {
    initialize();
  } else {
    document.addEventListener('DOMContentLoaded', function loaded() {
      document.removeEventListener('DOMContentLoaded', loaded);
      initialize();
    });
  }

  function destroy() {
    actionMenus.forEach(function destroying(actionMenu) {
      actionMenu.destroy();
    });
    actionMenus = [];
    actionMenusById = {};
  }

  return {
    /*
     * Returns an action menu object
     */
    get: function get(id) {
      return actionMenusById[id];
    },

    /*
     * Binds to an UI component
     *
     * @param{Object} DOMElement o selector that represents the action menu form
     */
    bind: function bind(elem) {
      elem = typeof elem === 'object' ? elem : document.querySelector(elem);
      var actionMenu = new ActionMenu(elem);
      actionMenus.push(actionMenu);
      if (actionMenu.id) {
        actionMenusById[actionMenu.id] = actionMenu;
      }

      return actionMenu;
    },

    /*
     * Creates a new action menu UI component
     *
     * @param{String} The title of the action menu
     *
     * @param{Array} List of action descriptors composed by id and title text
     */
    create: function create(descriptor) {
      descriptor = descriptor || {};

      var form = document.createElement('form');
      form.setAttribute('role', 'dialog');
      form.dataset.type = 'action';
      form.dataset.created = 'automatically';
      form.classList.add('hidden');
      if (descriptor.id) {
        form.id = descriptor.id;
      }

      var section = document.createElement('section');
      var h1 = document.createElement('h1');
      h1.textContent = descriptor.title || '';
      section.appendChild(h1);
      form.appendChild(section);

      var actions = descriptor.actions;
      if (actions) {
        var menu = document.createElement('menu');
        menu.classList.add('actions');

        actions.forEach(function(action) {
          var button = document.createElement('button');
          button.id = action.id;
          button.textContent = action.title;
          menu.appendChild(button);
        });

        form.appendChild(menu);
      }

      return form;
    },

    /*
     * Releases memory removing listeners and deleting variables
     */
    destroy: destroy
  };

})();
