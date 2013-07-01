suite('Test Image Loader', function() {

  var imageLoader, container, items = [], imageSrc;

  function createItem(num) {
    var item = document.createElement('li');
    item.id = 'i' + num;

    var span = document.createElement('span');
    span.textContent = 'Item ' + num;
    item.appendChild(span);

    var img = document.createElement('img');
    img.dataset.src = imageSrc;
    item.appendChild(img);

    items.push(item);
    return item;
  }

  suiteSetup(function() {
    imageSrc = document.querySelector('#imageSrc').textContent;
    container = document.querySelector('#test_section');
    container.scrollTop = 0;

    Array.prototype.forEach.call(document.querySelectorAll('#test_section li'),
      function(item) {
        item.querySelector('img').dataset.src = imageSrc;
        items.push(item);
      }
    );

    imageLoader = new ImageLoader('#test_section', 'li');
  });

  test('Image loader was initialized correctly > It should be visited ',
    function(done) {
      var firstItem = items[0];
      firstItem.querySelector('img').onload = function() {
        assert.equal(firstItem.dataset.visited, 'true');
        assert.isUndefined(items[1].dataset.visited);
        assert.isUndefined(items[2].dataset.visited);

        assert.equal(this.dataset.src, this.src);

        done();
      };
    }
  );

  test('Scrolling to second item > It should be visited ',
    function(done) {
      var secondItem = items[1];
      secondItem.querySelector('img').onload = function() {
        assert.equal(secondItem.dataset.visited, 'true');
        assert.isUndefined(items[2].dataset.visited);

        assert.equal(this.dataset.src, this.src);

        done();
      };

      container.scrollTop = secondItem.offsetHeight;
    }
  );

  test('Scrolling to third item > It should be visited ',
    function(done) {
      var thirdItem = items[2];
      thirdItem.querySelector('img').onload = function() {
        assert.equal(thirdItem.dataset.visited, 'true');

        assert.equal(this.dataset.src, this.src);

        done();
      };

      container.scrollTop = container.scrollTop + thirdItem.offsetHeight;
    }
  );

  test('Adding a new item and scrolling to this one > It should be visited ',
    function(done) {
      var fourthItem = createItem(4);
      container.querySelector('ol').appendChild(fourthItem);

      fourthItem.querySelector('img').onload = function() {
        assert.equal(fourthItem.dataset.visited, 'true');

        assert.equal(this.dataset.src, this.src);

        done();
      };

      imageLoader.reload();
      container.scrollTop = container.scrollTop + fourthItem.offsetHeight;
    }
  );

});
