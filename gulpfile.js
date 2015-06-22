'use strict'

var del = require('del')
var gulp = require('gulp')
var react = require('gulp-react')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var vinylPaths = require('vinyl-paths')
var runSequence = require('run-sequence')
var nodemon = require('gulp-nodemon')
var sass = require('gulp-sass');


gulp.task('cleanPublic', function() {
  return gulp.src('public/js/behavior.*js').pipe(vinylPaths(del))
})

gulp.task('cleanBuild', function() {
  return gulp.src('build').pipe(vinylPaths(del))
})

gulp.task('buildjs', function() {
  return gulp.src('app/components/*.jsx').pipe(react()).pipe(gulp.dest('build/components'))
})

gulp.task('copydeps', function() {
  return gulp.src([
    './app/stores/*.*',
    './app/actions/*.*'
  ], {base: './app'}).pipe(gulp.dest('build'))
})

gulp.task('bundle', function() {
  return browserify('./build/components/App.js').bundle().pipe(source('behavior.js')).pipe(gulp.dest('public/js'))
})

gulp.task('bundlemin', function() {
  return gulp.src('public/js/behavior.js').pipe(uglify()).pipe(rename('behavior.min.js')).pipe(gulp.dest('public/js'))
})

gulp.task('develop', function () {
  nodemon({ script: 'bin/www'})
    .on('restart', function () {
      console.log('restarted!')
    })
})

gulp.task('sass', function () {
  gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('default', function() {
  return runSequence('cleanPublic','cleanBuild','buildjs','copydeps','bundle','bundlemin','sass','develop','sass:watch')
})
