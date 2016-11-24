'use strict';
var gulp = require('gulp');

var sources = 'app/images/**';

gulp.task('static', function() {
  return gulp.src(sources)
    .pipe(gulp.dest('dist/images/'));
})
