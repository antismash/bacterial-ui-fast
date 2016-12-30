'use strict';

(function () {
  var app = angular.module('antismash.ui.bacterial', [
    'ngAnimate',
    'ui.bootstrap',
    'ui.router',
    'yaru22.angular-timeago',
    'toggle-switch',
    'antismash.ui.bacterial.routing',
    'antismash.ui.bacterial.as_job',
    'antismash.ui.bacterial.as_news',
    'antismash.ui.bacterial.as_stats'
  ]);
  app.value('bowser', bowser);
})();
