'use strict';
var gulp = require('gulp');

var sources = 'app/**/*.html';

gulp.task('html', function() {
  return gulp.src([sources])
    .pipe(gulp.dest('dist/'));
});

gulp.task('html:watch', ['html'], function() {
  return gulp.watch(sources, ['html']);
});
