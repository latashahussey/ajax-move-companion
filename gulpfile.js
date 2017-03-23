var gulp = require('gulp'),
  rename = require('gulp-rename'),
  minifyCSS = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  responsive = require('gulp-responsive-images'),
  paths = {
    imgSrc: 'src/img/',
    imgDest: 'dest/img',
    cssSrc: 'src/css/',
    cssDest: 'dest/css/'
  },
  watch = require('gulp-watch');


/* GULP TASKS */

//Check gulpfile for errors
gulp.task('jshint', function() {
  return gulp.src('gulpfile.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

//Grab all css files then minify, merge, and move  them to destination
gulp.task('minifyCSS', function() {
  gulp.src(paths.cssSrc + '*.css')
    .pipe(minifyCSS())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest(paths.cssDest));
});

//Resize and compress images, then move them to the destination
gulp.task('responsiveImages', function() {
  gulp.src(paths.imgSrc + '/**/*')
    .pipe(responsive({
      '*.jpeg': [{
        width: 300,
        height: 200,
        crop: true,
        suffix: '-small',
        quality: 60
      }],
      '*.jpg': [{
        width: 300,
        height: 200,
        crop: true,
        suffix: '-small',
        quality: 60
      }],
      'code-display-image.jpg': [{
        suffix: '-large',
        width: 1000,
        quality: 60
      }],
      'jd-logo.jpg': [{
        width: 150,
        crop: true,
        suffix: '-normal'
      }, {
        width: 75,
        crop: true,
        suffix: '-small'
      }]
    }))
    .pipe(gulp.dest(paths.imgDest));
});

//Watch for css or changes to images, then run tasks
gulp.task('watch', function() {
  // Endless stream mode
  gulp.watch(paths.cssSrc + '**/*.css', ['minifyCSS']);
  gulp.watch(paths.imgSrc + '**/*.*', ['responsiveImages']);
});

//Run all gulp tasks
gulp.task('default', ['jshint', 'minifyCSS', 'responsiveImages', 'watch']);
