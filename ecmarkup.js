"use strict";

function Menu() {
  this.$toggle = document.getElementById('menu-toggle');
  this.$menu = document.getElementById('menu');

  this.$toggle.addEventListener('click', this.toggle.bind(this));

  var tocItems = this.$menu.querySelectorAll('#menu-toc li');
  for (var i = 0; i < tocItems.length; i++) {
    var $item = tocItems[i];
    $item.addEventListener('click', function($item, event) {
      $item.classList.toggle('active');
      event.stopPropagation();
    }.bind(null, $item));
  }

  var tocLinks = this.$menu.querySelectorAll('#menu-toc li > a');
  for (var i = 0; i < tocLinks.length; i++) {
    var $link = tocLinks[i];
    $link.addEventListener('click', function(event) {
      this.toggle();
      event.stopPropagation();
    }.bind(this));
  }
}

Menu.prototype.toggle = function () {
  this.$menu.classList.toggle("active");
}

function init() {
  var menu = new Menu();
}

document.addEventListener('DOMContentLoaded', init);
function findLocalReferences ($elem) {
  var name = $elem.innerHTML;
  var parentAlg = $elem.parentNode;
  var references = [];

  while (parentAlg && parentAlg.nodeName !== 'EMU-ALG') {
    parentAlg = parentAlg.parentNode;
  }

  if(!parentAlg) return;

  var vars = parentAlg.querySelectorAll('var');

  for (var i = 0; i < vars.length; i++) {
    var $var = vars[i];

    if ($var.innerHTML === name) {
      references.push($var);
    }
  }

  return references;
}

function toggleFindLocalReferences($elem) {
  var references = findLocalReferences($elem);
  if ($elem.classList.contains('referenced')) {
    references.forEach(function ($reference) {
      $reference.classList.remove('referenced');
    });
  } else {
    references.forEach(function ($reference) {
      $reference.classList.add('referenced');
    });
  }
}

function installFindLocalReferences () {
  var vars = document.querySelectorAll('emu-alg var');

  for (var i = 0; i < vars.length; i++) {
    var $var = vars[i];

    $var.addEventListener('click', toggleFindLocalReferences.bind(null, $var));
  }
}

document.addEventListener('DOMContentLoaded', installFindLocalReferences);
