'use strict';
var fs = require('fs');
var gulp = require('gulp');

fs.readdirSync(__dirname + '/gulp').forEach(function (module) {
  if(module.endsWith('.js')){
    require(__dirname + '/gulp/' + module);
  }
})

gulp.task('build', ['vendor', 'js', 'html', 'less', 'css', 'static', 'favicon']);
gulp.task('watch', ['html:watch', 'js:watch', 'less:watch']);

gulp.task('default', ['server', 'test:watch']);
