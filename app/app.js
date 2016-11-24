'use strict';

(function () {
  var app = angular.module('antismash.ui.bacterial', [
    'ngAnimate',
    'ui.bootstrap',
    'ui.router',
    'antismash.ui.bacterial.routing'
  ]);
  app.value('bowser', bowser);
})();
