const {series, parallel, watch, src, dest} = require('gulp')
, del = require('del')
, sourcemaps = require('gulp-sourcemaps')
, sass = require('gulp-sass')
, concat = require('gulp-concat')
, print = require('gulp-print')
, babel = require('gulp-babel')
, uglify = require('gulp-uglify')
, CacheBuster = require('gulp-cachebust')
, browserSync = require('browser-sync').create();

var cachebust = new CacheBuster();

function buildCss() {
  return src('./public/assets/styles/*.*')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(cachebust.resources())
  .pipe(concat('styles.css'))
  .pipe(sourcemaps.write('./maps'))
  .pipe(dest('./dist'));
}

function buildAppJs() {
  return src('./public/app/**/*.js')
  .pipe(dest('./dist/js'));
}

function buildImages() {
  return src('./public/assets/images/**/*.*')
    .pipe(dest('./dist/assets/images'))
}

function getJson(){
  return src('./package.json')
  .pipe(dest('dist'))
}

function buildPages(){
  return src('./public/app/views/*.html')
  .pipe(cachebust.references())
  .pipe(dest('./dist/views'));
}

function buildIndex(){
  return src('./public/index.html')
  .pipe(cachebust.references())
  .pipe(dest('dist'));
}

function browserRefresh() {
  browserSync.init({
        server: "./dist"
    });
}

const build = series(buildAppJs, buildPages, buildIndex, buildCss, buildImages, getJson);

function watchFiles() {
  return watch(['./public/index.html','./partials/*.html', './public/assets/styles/*.*', './public/app/**/*.js', './public/app/views/*.html', '.public/assets/images/**/*.*', './*.json'], {events: 'all'}, series('build')).on('change', browserSync.reload);
}

exports.buildImages = buildImages;
exports.getJson = getJson;
exports.buildPages = buildPages;
exports.browserRefresh = browserRefresh;
exports.watchFiles = watchFiles;
exports.watch = watch;
exports.build = build;
exports.default = parallel(build, watchFiles, series(browserRefresh));
