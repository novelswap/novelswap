/* ==================
  TASKS
  * SASS
  * Imagemin
  * uglify
  * browserSync
  * watch
  * CleanCSS
  * uglify
  * Notify
  * Babel
=================== */

// ==============
// I M P O R T S
// ==============
const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');

// ==============
// S A S S
// ==============
gulp.task('sass', () => {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./sass/*.scss', ['sass']);
});

// ==============
// J S
// ==============
gulp.task('es6-to-es5', () => {
  return gulp.src('./src/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('js:watch', () => {
  gulp.watch('./src/js/*.js', ['es6-to-es5']);
});

// ==============
// I M A G E S (place all images in the src/img folder.)
// ==============
gulp.task('imagemin', () => {
  return gulp.src('./src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/img'));
});
