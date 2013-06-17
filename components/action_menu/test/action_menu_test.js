suite('Action Menu Tests', function() {

  var actionMenuElement, actionMenuObject;

  var noop = function() {
    // Do nothing...
  };

  suite('Action Menu ', function() {
    suiteSetup(function() {
      actionMenuElement = utils.ActionMenus.create({
        id: 'fru',
        title: 'Fruits',
        actions: [
          { id: 'oranges', title: 'Oranges' },
          { id: 'grapes', title: 'Grapes' },
          { id: 'strawberries', title: 'Strawberries' },
          { id: 'bananas', title: 'Bananas' },
          { id: 'cancel', title: 'Cancel' }
        ]
      });
      document.getElementById('test_section').appendChild(actionMenuElement);
      actionMenuObject = utils.ActionMenus.bind(actionMenuElement);
    });

    test('The component is initialized correctly ', function() {
      assert.equal(actionMenuObject.id, 'fru');
      assert.equal(actionMenuElement.id, 'fru');
      assert.equal(actionMenuElement.querySelector('h1').textContent, 'Fruits');
      assert.equal(actionMenuElement.querySelectorAll('button').length, 5);
      assert.isTrue(actionMenuElement.classList.contains('hidden'));
      assert.isFalse(actionMenuElement.classList.contains('onviewport'));
    });

    test('The component is displayed correctly ', function(done) {
      actionMenuElement.addEventListener('animationend', function end(e) {
        actionMenuElement.removeEventListener('animationend', end);
        assert.isFalse(actionMenuElement.classList.contains('hidden'));
        assert.isTrue(actionMenuElement.classList.contains('onviewport'));
        done();
      });

      actionMenuObject.show();
    });

    test('The component is hidden correctly ', function(done) {
      actionMenuElement.addEventListener('animationend', function end(e) {
        actionMenuElement.removeEventListener('animationend', end);
        assert.isTrue(actionMenuElement.classList.contains('hidden'));
        assert.isFalse(actionMenuElement.classList.contains('onviewport'));
        done();
      });

      actionMenuObject.hide();
    });

    test('The component is clickable ', function(done) {
      actionMenuElement.addEventListener('animationend', function end(e) {
        actionMenuElement.removeEventListener('animationend', end);
        actionMenuObject.addEventListener('click', function clicked(evt) {
          actionMenuObject.removeEventListener('click', clicked);
          assert.equal(evt.target.id, 'grapes');
          assert.equal(evt.target.textContent, 'Grapes');
          done();
        });

        actionMenuElement.querySelector('h1').click(); // No event dispatched
        actionMenuElement.querySelector('#grapes').click();
      });

      actionMenuObject.show();
    });

    test('Listeners for events different than click are not added ', function() {
      assert.equal(Object.keys(actionMenuObject.callbacks).length, 0);
      actionMenuObject.addEventListener('click', noop);
      assert.equal(Object.keys(actionMenuObject.callbacks).length, 1);
      actionMenuObject.removeEventListener('banana', noop);
      assert.equal(Object.keys(actionMenuObject.callbacks).length, 1);
      actionMenuObject.removeEventListener('click', noop);
      assert.equal(Object.keys(actionMenuObject.callbacks).length, 0);
    });

    test('Listeners for click event are not added when they are not functions '
         , function() {
      assert.equal(Object.keys(actionMenuObject.callbacks).length, 0);
      actionMenuObject.addEventListener('click', 'banana');
      assert.equal(Object.keys(actionMenuObject.callbacks).length, 0);
    });

    test('Library returns the component providing with an id ', function() {
      var tmp = utils.ActionMenus.get('fru');
      assert.equal(actionMenuObject, tmp);

      tmp = utils.ActionMenus.get('fru2');
      assert.isUndefined(tmp);
    });

    test('The component will be destroyed ', function() {
      utils.ActionMenus.destroy();
      assert.isFalse(document.getElementById('test_section').
                                                   contains(actionMenuElement));
      actionMenuObject.destroy(); // Here was destroyed but not fails
    });

  });

});
