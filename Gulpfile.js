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
var fabricate = require('gulp-fabricate');
var todo = require('gulp-todo');

var paths = {
  images: 'src/assets/imgs/**/*'
};

gulp.task('default', ['watch']);

gulp.task('clean', function(cb) {
  del(['build/**/*'], cb);
});

// ----------------------------------------------------------------

gulp.task('pages', function () {
  var fabopts = {
    layout: 'default',
    layouts: 'src/views/layouts/**/*',
    materials: 'src/partials/**/*',
    data: 'src/data/**/*.json',
    docs: 'src/docs/**/*.md'
  };
  gulp.src('src/views/pages/**/*')
    .pipe(fabricate(fabopts))
    .pipe(rename(function (path) {
        path.extname = ".html"
    }))
    .pipe(gulp.dest('build/'));
});

// ----------------------------------------------------------------

gulp.task('css', function() {
  gulp.src('src/assets/scss/main.scss')
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
    .pipe(autoprefixer('last 5 versions'))
    //.pipe(minifycss())
    .pipe(gulp.dest('build/assets/css'))
    .pipe(notify({ message : 'Gulp Complete'}));
});

gulp.task('js', function() {
  gulp.src('src/assets/js/libs/**/*')
    .pipe(gulp.dest('build/assets/js/libs'))
  gulp.src('src/assets/js/main.js')
    .pipe(browserify({ debug : true }))
    .pipe(gulp.dest('build/assets/js'))
    .pipe(notify({ message : 'Gulp Complete'}));
});

gulp.task('compressjs', function() {
  gulp.src('build/assets/js/main.js')
    .pipe(uglify())
    .pipe(rename('min.js'))
    .pipe(gulp.dest('build/assets/js'))
    .pipe(notify({ message : 'Gulp Complete'}));
});

// Copy all static images
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 7}))
    .pipe(gulp.dest('build/assets/imgs'));
});

gulp.task('fonts', function() {
  return gulp.src('src/assets/fonts')
    .pipe(gulp.dest('build/assets/'));
});

// ----------------------------------------------------------------

// generate a todo.md from your javascript files 
gulp.task('todo', function() {
  gulp.src('src/assets/js/**/*.js')
    .pipe(todo({ fileName: 'todo-js.md'}))
    .pipe(gulp.dest('./todo'));
  gulp.src('src/assets/scss/**/*.scss')
    .pipe(todo({ fileName: 'todo-scss.md'}))
    .pipe(gulp.dest('./todo'));
  gulp.src('src/views/**/*.hbs')
    .pipe(todo({ fileName: 'todo-pages.md'}))
    .pipe(gulp.dest('./todo'));
});

// ----------------------------------------------------------------

gulp.task('build', ['clean'], function() {
  gulp.run('images');
  gulp.run('css');
  gulp.run('js');
  gulp.run('pages');
  gulp.run('fonts');
});

// ----------------------------------------------------------------

gulp.task('watch', function() {
  gulp.watch('src/views/pages/**/*', ['pages']);
  gulp.watch('src/assets/scss/**/*.scss', ['css']);
  gulp.watch('src/assets/js/**/*.js', ['js']);
});