'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var compress_sources = [
  'vendor/angular-bootstrap-toggle-switch/angular-toggle-switch.js',
  'vendor/bowser/src/bowser.js',
  'vendor/jsTree-directive/jsTree.directive.js'
];

var copy_sources = [
  'vendor/**/*min.js',
  'vendor/**/*min.css',
  'vendor/**/*map',
  'vendor/**/themes/default/**',
  'vendor/angular-bootstrap-toggle-switch/style/bootstrap3/angular-toggle-switch-bootstrap-3.css',
  'vendor/**/fonts/**'
];

gulp.task('vendor:compress', function () {
  return gulp.src(compress_sources)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/vendor/'));
});

gulp.task('vendor:copy', function () {
  return gulp.src(copy_sources)
    .pipe(gulp.dest('dist/vendor/'));
});

gulp.task('vendor', ['vendor:compress', 'vendor:copy']);
