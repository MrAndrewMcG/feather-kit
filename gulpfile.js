var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass  = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect');
    concatCss = require('gulp-concat-css');

gulp.task('log', function() {
  gutil.log('== My Log Task ==')
});

gulp.task('html', function() {
  gulp.src('src/*.html')
  .pipe(gulp.dest('dist'))
});

gulp.task('sass', function() {
  gulp.src(['src/stylesheets/grid.scss',
           'src/stylesheets/typography.scss',
           'src/stylesheets/forms.scss',
           'src/stylesheets/buttons.scss',
           'src/stylesheets/navigation.scss',
           'src/stylesheets/main.scss'])
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(concatCss("styles.css"))
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
