'use strict';
var gulp = require('gulp');

var sources = 'app/css/*.min.css';

gulp.task('css', function() {
  return gulp.src(sources)
    .pipe(gulp.dest('dist/css/'));
})
