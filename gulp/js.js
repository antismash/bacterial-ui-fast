'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');

var sources = ['app/**/*.js', '!app/**/*.spec.js'];

gulp.task('js', function () {
  return gulp.src(sources)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('js:watch', ['js'], function() {
  gulp.watch(sources, ['js']);
});
