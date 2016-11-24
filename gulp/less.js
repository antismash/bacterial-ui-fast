'use strict';
var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');

var sources = 'app/**/*.less';

gulp.task('less', function() {
  return gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/'));
});

gulp.task('less:watch', ['less'], function() {
  return gulp.watch(sources, ['less']);
});
