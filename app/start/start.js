'use strict'

angular.module('antismash.ui.bacterial.as_start', ['ngFileUpload'])
    .controller('AsStartCtrl', ['$state', '$window', 'Upload',
        function ($state, $window, Upload) {
            var vm = this;

            vm.valid_endings = '.gbk,.gb,.gbff,.emb,.embl,.fa,.fasta,.fna';

            // Defaullt values
            vm.submission = {};
            vm.extra_features = [
                { id: 'knownclusterblast', description: 'KnownClusterBlast', default: true },
                { id: 'clusterblast', description: 'ClusterBlast', default: false },
                { id: 'subclusterblast', description: 'SubClusterBlast', default: true },
                { id: 'smcogs', description: 'smCoG analysis', default: true },
                { id: 'asf', description: 'ActiveSiteFinder', default: true },
                { id: 'tta', description: 'Detect TTA codons', default: false },
                { id: 'transatpks_da', description: 'Align Trans-AT PKS domains', default: false },
                { id: 'fullhmmer', description: 'Whole-genome PFAM analysis', default: false },
            ];

            for (var i = 0; i < vm.extra_features.length; i++) {
                var feature = vm.extra_features[i];
                vm.submission[feature.id] = feature.default;
            }

            vm.cf_threshold = 0.6;

            vm.submit = function (form) {
                vm.active_submission = true;

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

                Upload.upload({
                    url: '/api/v1.0/submit',
                    data: vm.submission,
                }).then(function (resp) {
                    vm.active_submission = false;
                    $state.go('show.job', { id: resp.data.id });
                }, function (resp) {
                    vm.active_submission = false;
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

            vm.allOff = function () {
                for (var i = 0; i < vm.extra_features.length; i++) {
                    var feature = vm.extra_features[i];
                    vm.submission[feature.id] = false;
                }
            }

            vm.allOn = function () {
                for (var i = 0; i < vm.extra_features.length; i++) {
                    var feature = vm.extra_features[i];
                    vm.submission[feature.id] = true;
                }
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
