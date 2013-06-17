function click(evt) {
  if (evt.target.textContent !== 'Cancel')
    alert(evt.target.textContent);
}

// Fruits

var actionMenus = utils.ActionMenus;

var fruitsElement = actionMenus.create({
  id: 1,
  title: 'Fruits',
  actions: [
    { id: 'oranges', title: 'Oranges' },
    { id: 'grapes', title: 'Grapes' },
    { id: 'strawberries', title: 'Strawberries' },
    { id: 'bananas', title: 'Bananas' },
    { id: 'cancel', title: 'Cancel' }
  ]
});

document.body.appendChild(fruitsElement);

var fruitsAction = actionMenus.bind(fruitsElement);

fruitsAction.onclick = click;

document.getElementById('fruits').onclick = function() {
  fruitsAction.show();
};

// Soccer players

var soccerElement = actionMenus.create({
  id: 2,
  title: 'Soccer Players',
  actions: [
    { id: 'ronaldo', title: 'Cristiano Ronaldo' },
    { id: 'messi', title: 'Lionel Messi' },
    { id: 'falcao', title: 'Radamel Falcao' },
    { id: 'luis', title: 'Luis Suarez' },
    { id: 'iniesta', title: 'Andrés Iniesta' },
    { id: 'cancel', title: 'Cancel' }
  ]
});

document.body.appendChild(soccerElement);

var soccerAction = actionMenus.bind(soccerElement);

document.getElementById('soccer').onclick = function() {
  soccerAction.show();
};

soccerAction.addEventListener('click', click);

document.addEventListener('DOMContentLoaded', function loaded() {
  var exampleAction = actionMenus.get('template');

  document.removeEventListener('DOMContentLoaded', loaded);
  document.getElementById('template').onclick = function() {
    exampleAction.show();
  }

  exampleAction.addEventListener('click', click);
});
