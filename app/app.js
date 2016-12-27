'use strict';

(function () {
  var app = angular.module('antismash.ui.bacterial', [
    'ngAnimate',
    'ui.bootstrap',
    'ui.router',
    'yaru22.angular-timeago',
    'antismash.ui.bacterial.routing',
    'antismash.ui.bacterial.as_news',
    'antismash.ui.bacterial.as_stats'
  ]);
  app.value('bowser', bowser);
})();
