'use strict';
var gulp = require('gulp');
var server = require('karma').Server;

gulp.task('test', function(done) {
  new server({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:watch', function(done) {
  new server({
    configFile: __dirname + '/../karma.conf.js',
  }, done).start();
});
