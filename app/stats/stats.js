'use strict'

angular.module('antismash.ui.bacterial.as_stats', [])
    .controller('AsStatsCtrl', ['$scope', 'AsStatsService',
        function ($scope, AsStatsService) {
            var vm = this;

            vm.stats = AsStatsService.stats;
            AsStatsService.getStats();

            $scope.$on('$destroy', function () {
                AsStatsService.cancelTimer();
            });

        }])
    .factory('AsStatsService', function ($http, $timeout) {
        var delay = 10000,
            errorCount = 0,
            promise; // promise returned by $timeout

        var stats = {
            status: "Loading",
            running_jobs: 0,
            fast_jobs: 0,
            queued_jobs: 0,
            ts_queued: "",
            ts_fast: "",
            total_jobs: 0
        }

        var getStats = function () {
            $http.get("/api/v1.0/stats")
                .then(function (resp) {
                    stats.status = resp.data.status;
                    stats.running_jobs = resp.data.running;
                    stats.fast_jobs = resp.data.fast;
                    stats.queued_jobs = resp.data.queue_length;
                    stats.total_jobs = resp.data.total_jobs;
                    stats.ts_queued = resp.data.ts_queued_m;
                    stats.ts_fast = resp.data.ts_fast_m;
                    loadNext();
                })
                .catch(function (resp) {
                    stats.status = "Error loading stats"
                    errorCount += 1;
                    loadNext(errorCount * 2 * delay);
                });
        };

        var cancelTimer = function () {
            $timeout.cancel(promise);
        };

        var loadNext = function (millis) {
            millis = millis || delay;
            cancelTimer();
            promise = $timeout(getStats, millis)
        };

        return {
            stats: stats,
            getStats: getStats,
            cancelTimer: cancelTimer
        }
    })
    .directive('asStats', function () {
        return {
            scope: {},
            templateUrl: 'stats/stats.html',
            controller: 'AsStatsCtrl',
            controllerAs: 'ctrl'
        }
    });
