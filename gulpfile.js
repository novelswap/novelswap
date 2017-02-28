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
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const mustache = require("gulp-mustache-plus");
const nodemon = require('gulp-nodemon');

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

// ==============
// O T H E R
// ==============
gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init({
    proxy: 'http://localhost:6969',
    port: '3001',
    notify: true,
    open: true,
    injectChanges: true,
  });
});

gulp.task('nodemon', (cb) => {
  let called = false;
  return nodemon({
    script: 'server.js',
  })
  .on('start', () => {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', () => {
    setTimeout(() => {
      reload({ stream: false });
    }, 1000);
  });
});


// ==============
// R U N
// ==============
gulp.task('watch:dev', ['build:dev', 'browser-sync'], () => {
  gulp.watch('./sass/*.scss', ['sass', reload]);
  gulp.watch('./src/js/*.js', ['es6-to-es5', reload]);
});

gulp.task('build:dev', ['sass', 'es6-to-es5']);
