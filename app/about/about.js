'use strict'

angular.module('antismash.ui.bacterial.as_about', [])
    .controller('AsAboutCtrl', [
        function () {
            var vm = this;
            vm.logos = [
                {filename: 'dtu_logo.svg', description: 'Technical University of Denmark'},
                {filename: 'cfb_logo.svg', description: 'Novo Nordisk Foundation Center for Biosustainability'},
                {filename: 'wur-logo.png', description: 'Wageningen University'},
                {filename: 'tueblogo.gif', description: 'Tübingen University'},
                {filename: 'uwm-logo.png', description: 'University of Wisconsin, Madison'},
                {filename: 'jena-logo.png', description: 'Jena University'},
                {filename: 'ilogo_horz_bold.gif', description: 'University of Illinois'},
                {filename: 'ul-logo.png', description: 'Lisbon University'},
                {filename: 'ucsflogo.gif', description: 'University of California, San Francisco'},
                {filename: 'hips-logo.png', description: 'Helmholtz Institute for Pharmaceutical Research'},
                {filename: 'ruglogo.gif', description: 'Groningen University'},
                {filename: 'uomlogo.jpg', description: 'University of Manchester'}
            ];
        }]);
