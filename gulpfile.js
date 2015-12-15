'use strict';

require('babel-core/register');

/*===============================
=            Loaders            =
===============================*/
var gulp          = require('gulp');
var gulpsync      = require('gulp-sync')(gulp);
var htmlValidator = require('gulp-html-validator');
var sass          = require('gulp-sass');
var jshint        = require('gulp-jshint');
var browserSync   = require('browser-sync').create();
var clean         = require('gulp-dest-clean');
var htmlusemin    = require('gulp-usemin-html')
var spawn         = require('child_process').spawn;
var livereload    = require('gulp-livereload');
var Jasmine       = require('gulp-jasmine');
var Reporter      = require('jasmine-terminal-reporter');
var node;
/*=====  End of Loaders  ======*/


/*==================================
=            References            =
==================================*/
var devFolder  = './dev/';
var distFolder = './dist/';
var htmlFiles  = devFolder + '**/*.html';
var sassFiles  = devFolder + 'assets/sass/**/*.scss';
var jsFiles    = devFolder + 'assets/js/**/*.js';
var gulpFile   = './gulpfile.js';

var cssFolder         = devFolder + '/assets/css';
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
    console.log('                         Use gulp web|api|dev                           ');
    console.log('                                                                        ');
    console.log('========================================================================');
});

gulp.task('web', function () {
    gulp.watch(htmlFiles, ['html']);
    gulp.watch(sassFiles, ['sass']);
    gulp.watch(jsFiles,   ['js']);
    gulp.watch(gulpFile,  ['gulpfile']);
});

gulp.task('api', ['hint', 'specs', 'server'], function () {

    livereload.listen();

    gulp.watch(files, ['hint', 'specs', 'server', 'files']);
    gulp.watch(specs, ['specs']);
});

gulp.task('dev', function () {

    browserSync.init({
        server: syncFolder
    });

    gulp.watch(htmlFiles, ['html']);
    gulp.watch(sassFiles, ['sass']);
    gulp.watch(jsFiles,   ['js']);
    gulp.watch(gulpFile,  ['gulpfile']);

    gulp.watch(htmlFiles).on('change', browserSync.reload);
    gulp.watch(jsFiles).on('change', browserSync.reload);
});

gulp.task('dist', gulpsync.async(['clean', 'copy']));

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

gulp.task('sass', function () {
    return gulp.src(sassFiles)
        .pipe(sass())
        .pipe(gulp.dest(cssFolder))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src(jsFiles)
        .pipe(jshint());
});

gulp.task('clean', function () {
    return gulp.src(distFolder)
        .pipe(clean(distFolder));
});

gulp.task('copy', function () {
    gulp.src(devFolder + 'assets/css/wizard/fonts/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest(distFolder + 'assets/css/wizard/fonts/'));

    gulp.src(devFolder + '.htaccess')
        .pipe(gulp.dest(distFolder));
});

gulp.task('htmlusemin', function () {

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