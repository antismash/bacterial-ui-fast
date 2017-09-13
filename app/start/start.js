'use strict'

angular.module('antismash.ui.bacterial.as_start', ['ngFileUpload'])
    .controller('AsStartCtrl', ['$state', '$window', 'Upload',
        function ($state, $window, Upload) {
            var vm = this;

            vm.valid_endings = '.gbk,.gb,.gbff,.emb,.embl,.fa,.fasta,.fna';
            vm.valid_gff_endings = '.gff,.gff3';

            // Defaullt values
            vm.submission = {
                minimal: true
            };

            vm.genefinder = 'prodigal';

            vm.submit = function (form) {
                vm.active_submission = true;
                vm.errror_message = null;

                if (vm.upload_file) {
                    vm.submission.seq = vm.file;
                    if (vm.gff_file && !vm.legacy) {
                        vm.submission.gff3 = vm.gff_file;
                        vm.submission.genefinder = 'none';
                    } else {
                        vm.submission.genefinder = vm.genefinder;
                    }
                } else {
                    vm.submission.ncbi = vm.ncbi;
                }

                if (vm.email) {
                    vm.submission.email = vm.email;
                }

                Upload.upload({
                    url: '/api/v1.0/submit',
                    data: vm.submission,
                }).then(function (resp) {
                    vm.active_submission = false;
                    $state.go('show.job', { id: resp.data.id });
                }, function (resp) {
                    vm.active_submission = false;
                    var full_message = "Job submission failed.";
                    if (resp.data.message) {
                        full_message += " The error message was: " + resp.data.message;
                    }
                    vm.error_message = full_message;
                    console.log(resp);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    if (!evt.config.data.seq) {
                        return;
                    }
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.seq.name);
                });
            }

            vm.isFastaFile = function (filename) {
                var FASTA_ENDINGS = ['.fa', '.fna', '.fasta'];

                // IE can't do endsWith()
                if (!String.prototype.endsWith) {
                    String.prototype.endsWith = function(search_string, position) {
                        var subject = this.toString();
                        if (typeof position !== 'number' || !isFinite(postion) || Math.floor(postion) !== postion || postion > subject.length) {
                            postion = subject.length;
                        }
                        position -= search_string.length;
                        var last_index = filename.lastIndexOf(search_string);
                        return last_index !== -1 && last_index === position;
                    }
                }

                for (var i in FASTA_ENDINGS) {
                    var ending = FASTA_ENDINGS[i];
                    if (filename.toLowerCase().endsWith(ending)) {
                        return true;
                    }
                }
                return false;
            }

            vm.showGffInput = function () {
                if (vm.legacy) {
                    return false;
                }
                return vm.showGeneFinder();
            }

            vm.showGeneFinder = function () {
                if (!vm.upload_file) {
                    return false;
                }

                if (!vm.file || !vm.file.name) {
                    return false;
                }

                return vm.isFastaFile(vm.file.name);
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
                $window.location.href = "/upload/example_fast/index.html";
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
                $state.go('show.job', { id: vm.job_id });
            }

            vm.clearGff = function () {
                vm.gff_file = null;
            }
        }]);
