'use strict'

angular.module('antismash.ui.bacterial.as_job', [])
    .controller('AsJobCtrl', ['AsJobService',
        function (AsJobService) {
            var vm = this;
            vm.$onInit = function () {
                console.log(vm.jobId);
                AsJobService.getStatus(vm.jobId);
                vm.job = AsJobService.job_info;
            }

            vm.$onDestroy = function () {
                AsJobService.cancelTimer();
            }

        }])
    .factory('AsJobService', function ($http, $timeout) {
        var delay = 10000,
            errorCount = 0,
            promise; // promise returned by $timeout

        var job_info = {};

        var job_id = null;

        var getStatus = function (id) {
            if (id) {
                job_id = id;
            }

            $http.get("/api/v1.0/status/" + job_id)
                .then(function (resp) {
                    job_info.filename = resp.data.filename;
                    job_info.status = resp.data.status;
                    job_info.short_status = resp.data.short_status;
                    job_info.result_url = resp.data.result_url;
                    job_info.submitted = Date.parse(resp.data.added_ts);
                    job_info.last_changed = Date.parse(resp.data.last_changed_ts);
                    if (job_info.short_status == "done" || job_info.short_status == "failed") {
                        return;
                    }
                    // If status is neither 'done' nor 'failed', trigger a refresh.
                    loadNext();
                })
                .catch(function (resp) {
                    job_info.status = "Error loading stats"
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
            promise = $timeout(getStatus, millis)
        };

        return {
            job_info: job_info,
            job_id: job_id,
            getStatus: getStatus,
            cancelTimer: cancelTimer
        }
    })
    .component('asJob', {
        bindings: {
            jobId: '@'
        },
        templateUrl: 'job/job.html',
        controller: 'AsJobCtrl as ctrl'
    });
