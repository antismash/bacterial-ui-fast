'use strict'

angular.module('antismash.ui.bacterial.as_contact', [])
    .controller('AsContactCtrl', [ '$http',
        function ($http) {
            var vm = this;
            vm.sent_successfully = false;
            vm.sending_failed = false;

            vm.sendEmail = function () {
                var data = {
                    email : vm.email,
                    message: vm.message
                };
                $http.post("/api/v1.0/email/send", data)
                    .then(function (resp) {
                        vm.sent_successfully = true;
                    }, function (resp) {
                        console.log("failed sending mails");
                        vm.sending_failed = true;
                    });
            }

            vm.invalidForm = function () {
                if (!vm.email || !vm.message) {
                    return true;
                }
                return false;
            }
        }])
    .component('asContact', {
        templateUrl: 'contact/contact.html',
        controller: 'AsContactCtrl'
    });
