var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var cssGlobbing = require('gulp-css-globbing');

var paths = {
  images: 'assets/imgs/**/*'
};

gulp.task('default', ['watch']);

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('css', function() {
  gulp.src('assets/scss/main.scss')
    .pipe(cssGlobbing({
      extensions: ['.css', '.scss'],
      ignoreFolders: ['../styles'],
      autoReplaceBlock: {
        onOff: false,
        globBlockBegin: 'cssGlobbingBegin',
        globBlockEnd: 'cssGlobbingEnd',
        globBlockContents: '../**/*.scss'
      },
      scssImportPath: {
        leading_underscore: false,
        filename_extension: false
      }
    }))
    .pipe(sass())
    .pipe(autoprefixer('last 15 versions'))
    .pipe(minifycss())
    .pipe(gulp.dest('../build/assets/css'))
    .pipe(notify({ message : 'Gulp Complete'}));
});

gulp.task('js', function() {
  gulp.src('assets/js/main.js')
    .pipe(browserify({ debug : true }))
    .pipe(gulp.dest('../build/assets/js'))
    .pipe(notify({ message : 'Gulp Complete'}));
});

gulp.task('compressjs', function() {
  gulp.src('../build/assets/js/main.js')
    .pipe(uglify())
    .pipe(rename('min.js'))
    .pipe(gulp.dest('../build/assets/js'))
    .pipe(notify({ message : 'Gulp Complete'}));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 7}))
    .pipe(gulp.dest('../build/assets/imgs'));
});

gulp.task('watch', function() {
  gulp.watch('assets/scss/**/*.scss', ['css']);
  gulp.watch('assets/js/**/*.js', ['js']);
});