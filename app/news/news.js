'use strict'

angular.module('antismash.ui.bacterial.as_news', [])
    .controller('AsNewsCtrl', ['AsNewsService',
        function (AsNewsService) {
            var vm = this;
            vm.alerts = AsNewsService.news.alerts;

            vm.closeAlert = function (index) {
                vm.alerts.splice(index, 1);
            }
        }])
    .controller('AsErrorCtrl', ['AsNewsService',
        function (AsNewsService) {
            var vm = this;
            vm.errors = AsNewsService.news.errors;

            vm.close = function (index) {
                vm.errors.splice(index, 1);
            }
        }])
    .factory('AsNewsService', function ($http) {
        var news = {
            errors: [],
            alerts: []
        };


        $http.get("/api/v1.0/news")
            .then(function (resp) {
                for (var i = 0; i < resp.data.notices.length; i++) {
                    var notice = resp.data.notices[i];
                    switch (notice.category) {
                        case 'info': // fall through
                        case 'warning': news.alerts.push(notice); break;
                        case 'error': news.errors.push(notice); break;
                        // no default case
                    }
                }
            })
            .catch(function (resp) {
                news.errors = []
            });
        return {
            news: news
        }
    })
    .directive('asNews', function () {
        return {
            scope: {},
            templateUrl: 'news/news.html',
            controller: 'AsNewsCtrl',
            controllerAs: 'ctrl'
        }
    })
    .directive('asErrors', function () {
        return {
            scope: {},
            templateUrl: 'news/errors.html',
            controller: 'AsErrorCtrl',
            controllerAs: 'ctrl'
        }
    });
