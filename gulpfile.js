var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass  = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect');

gulp.task('log', function() {
  gutil.log('== My Log Task ==')
});

gulp.task('html', function() {
  gulp.src('src/*.html')
  .pipe(gulp.dest('dist'))
});

gulp.task('sass', function() {
  gulp.src('src/stylesheets/*.scss')
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(gulp.dest('dist/stylesheets'))
});

gulp.task('js', function() {
  gulp.src('src/javascripts/*.js')
  .pipe(uglify())
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('dist/javascripts'))
});

gulp.task('watch', function() {
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/javascripts/*.js', ['js']);
  gulp.watch('src/stylesheets/*.scss', ['sass']);
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

gulp.task('default', ['html', 'sass', 'js', 'watch', 'connect']);
