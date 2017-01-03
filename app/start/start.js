'use strict'

angular.module('antismash.ui.bacterial.as_start', ['ngFileUpload'])
    .controller('AsStartCtrl', ['$state', '$window', 'Upload',
        function ($state, $window, Upload) {
            var vm = this;

            vm.valid_endings = '.gbk,.gb,.gbff,.emb,.embl,.fa,.fasta,.fna';

            // Default values
            vm.submission = {
                knownclusterblast: true,
                subclusterblast: true,
                smcogs: true,
                asf: true,
            }
            vm.cf_threshold = 0.6;

            vm.submit = function (form) {
                if (vm.upload_file) {
                    vm.submission.seq = vm.file;
                } else {
                    vm.submission.ncbi = vm.ncbi;
                }

                if (vm.email) {
                    vm.submission.email = vm.email;
                }

                if (vm.clusterfinder) {
                    vm.submission.inclusive = true;
                    vm.submission.cf_threshold = vm.cf_threshold;
                    vm.submission.cf_cdsnr = vm.cf_cdsnr;
                    vm.submission.cf_npfams = vm.cf_npfams;
                }

                if (vm.limit) {
                    vm.submission.from = vm.from;
                    vm.submission.to = vm.to;
                }

                Upload.upload({
                    url: '/api/v1.0/submit',
                    data: vm.submission,
                }).then(function (resp) {
                    $state.go('show.job', { id: resp.data.id });
                }, function (resp) {
                    console.log(resp);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    if (!evt.config.data.seq) {
                        return;
                    }
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.seq.name);
                });
            }

            vm.validJob = function () {
                if (vm.upload_file) {
                    if (!vm.file) {
                        return false;
                    }
                } else {
                    if (!vm.ncbi) {
                        return false;
                    }
                }
                return true;
            }

            vm.loadSampleInput = function () {
                vm.upload_file = false;
                vm.ncbi = "Y16952";
            }

            vm.openSampleOutput = function () {
                $window.location.href = "/upload/example/index.html";
            }

            vm.loadJob = function () {
                console.log(vm.job_id);
                if (vm.job_id.substr(0, 8).toLowerCase() == 'bacteria') {
                    $state.go('show.job', { id: vm.job_id });
                }
                else if (vm.job_id.substr(0, 5).toLowerCase() == 'fungi') {
                    $window.location.href = "http://fungismash.secondarymetabolites.org/#!/show/job/" + vm.job_id;
                }
                else if (vm.job_id.substr(0, 6).toLowerCase() == 'plants') {
                    $window.location.href = "http://plantismash.secondarymetabolites.org/#!/show/job/" + vm.job_id;
                }
            }
        }]);
