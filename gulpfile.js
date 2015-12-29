'use strict';

require('babel-core/register');

/*===============================
=            Loaders            =
===============================*/
var gulp          = require('gulp');
var htmlValidator = require('gulp-html-validator');
var scss          = require('gulp-sass');
var concat        = require('gulp-concat');
var jshint        = require('gulp-jshint');
var browserSync   = require('browser-sync').create();
var runSequence   = require('run-sequence');
var del           = require('del');
var fs            = require('fs');
var clean         = require('gulp-dest-clean');
var usemin        = require('gulp-usemin');
var htmlmin       = require('gulp-htmlmin');
var uglify        = require('gulp-uglify');
var replace       = require('gulp-replace');
var spawn         = require('child_process').spawn;
var livereload    = require('gulp-livereload');
var Jasmine       = require('gulp-jasmine');
var Reporter      = require('jasmine-terminal-reporter');
var node;
/*=====  End of Loaders  ======*/


/*==================================
=            References            =
==================================*/
var dev        = './dev/';
var app       = './app/';

var htmlFiles  = dev + '**/*.html';
var scssFiles  = dev + 'assets/scss/**/*.scss';
var jsFiles    = dev + 'assets/js/**/*.js';
var gulpFile   = './gulpfile.js';

var validationFolder  = './validation';
var syncFolder        = './';

var files = ['./server.js', './api/**/*.js'];
var specs = ['./tests/**/*-specs.js'];

var reporter = new Reporter({
    isVerbose: false,
    showColors: true,
    includeStackTrace: false
});

/*=====  End of References  ======*/


/*======================================
=            Register tasks            =
======================================*/
gulp.task('default', function () {
    console.log('========================================================================');
    console.log('                                                                        ');
    console.log('                         Use gulp web|api|watch                         ');
    console.log('                                                                        ');
    console.log('========================================================================');
});

gulp.task('web', function () {
    gulp.watch(htmlFiles, ['html']);
    gulp.watch(scssFiles, ['scss']);
    gulp.watch(jsFiles,   ['js']);
    gulp.watch(gulpFile,  ['gulpfile']);
});

gulp.task('api', ['hint', 'specs', 'server'], function () {

    livereload.listen();

    gulp.watch(files, ['hint', 'specs', 'server', 'files']);
    gulp.watch(specs, ['specs']);
});

gulp.task('watch', function () {

    browserSync.init({
        server: syncFolder
    });

    gulp.watch(htmlFiles, ['html']);
    gulp.watch(scssFiles, ['scss-dev']);
    gulp.watch(jsFiles,   ['js']);
    gulp.watch(gulpFile,  ['gulpfile']);

    gulp.watch(htmlFiles).on('change', browserSync.reload);
    gulp.watch(jsFiles).on('change', browserSync.reload);
});

gulp.task('dist', function () {

    runSequence('clean', 'copy', 'usemin', 'minify', 'scss-app', 'uglify');
});

gulp.task('server', function () {
    if (node) {
        node.kill();
    }

    node = spawn('node', ['--harmony', 'server.js'], {stdio: 'inherit'});
    node.on('close', function (code) {

        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});
/*=====  End of Register tasks  ======*/

/*====================================
=            Config tasks            =
====================================*/
gulp.task('html', function () {
    return gulp.src(htmlFiles)
        .pipe(htmlValidator({format: 'html'}))
        .pipe(gulp.dest(validationFolder));
});

gulp.task('scss-dev', function () {
    return gulp.src(dev + 'assets/scss/app/**/*.scss')
        .pipe(scss())
        .pipe(gulp.dest(dev + 'assets/css'));
});

gulp.task('js', function () {
    return gulp.src(jsFiles)
        .pipe(jshint());
});

gulp.task('clean', function () {
    return gulp.src(app)
        .pipe(clean(app));
});

gulp.task('copy', function () {
    gulp.src(dev + '.htaccess')
        .pipe(gulp.dest(app));

    gulp.src(dev + 'assets/css/wizard/fonts/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest(app + 'assets/css/wizard/fonts/'));

    gulp.src(dev + 'assets/imgs/**/*')
        .pipe(gulp.dest(app + 'assets/imgs'));

    gulp.src(dev + 'assets/templates/**/*')
        .pipe(gulp.dest(app + 'assets/templates'));
});

gulp.task('usemin', function () {
    return gulp.src(htmlFiles)
        .pipe(usemin())
        .pipe(gulp.dest('./app'));
});

gulp.task('minify', function() {
  return gulp.src(app + '**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(app))
});

gulp.task('scss-app', function () {
    return gulp.src(dev + 'assets/scss/main.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(gulp.dest(app + 'assets/css'));
});

gulp.task('uglify', function () {
    return gulp.src(app + 'assets/js/main.js')
        .pipe(uglify())
        .pipe(replace(/http:\/\/localhost:8080\/api\/apps\//g, 'http://bond.levelup.com.br/api/apps/'))
        .pipe(gulp.dest(app + 'assets/js'));
});

gulp.task('gulpfile', function () {

    return gulp.src(gulpFile)
        .pipe(jshint());
});

gulp.task('files', function () {
    return gulp.src(files).pipe(livereload());
});

gulp.task('hint', function () {
    return gulp.src(files)
        .pipe(jshint({esnext: true, node: true }))
        .pipe(jshint.reporter('default'));
});

gulp.task('specs', function () {
    return gulp.src(specs)
        .pipe(new Jasmine({ reporter: reporter }));
});
/*=====  End of Config tasks  ======*/