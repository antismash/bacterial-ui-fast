'use strict';
var gulp = require('gulp');

var sources = 'app/favicon.ico';

gulp.task('favicon', function() {
  return gulp.src(sources)
    .pipe(gulp.dest('dist/'));
})
