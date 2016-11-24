'use strict';
var gulp = require('gulp');
var lite = require('lite-server');

gulp.task('server', ['build', 'watch'], function(done) {
  lite.server({}, done);
});
