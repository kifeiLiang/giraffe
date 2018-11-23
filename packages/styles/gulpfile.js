'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');


gulp.task('compile', function() {
  return gulp.src('./src/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./lib'));
});

gulp.task('copyfont', function() {
  return gulp.src('./src/fonts/**')
    .pipe(gulp.dest('./lib/fonts'));
});


gulp.task('go', ['compile','copyfont']);
