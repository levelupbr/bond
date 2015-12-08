'use strict';

/*===============================
=            Loaders            =
===============================*/
var gulp          = require('gulp');
var htmlValidator = require('gulp-html-validator');
var sass          = require('gulp-sass');
var jshint        = require('gulp-jshint');
var jslint        = require('gulp-jslint');
var browserSync   = require('browser-sync').create();
/*=====  End of Loaders  ======*/


/*==================================
=            References            =
==================================*/
var htmlFiles = './dev/**/*.html';
var sassFiles = './dev/assets/sass/**/*.scss';
var jsFiles   = './dev/assets/js/**/*.js';
var gulpFile  = './gulpfile.js';

var cssFolder         = './dev/assets/css';
var validationFolder  = './validation';
var developmentFolder = './';
/*=====  End of References  ======*/


/*======================================
=            Register tasks            =
======================================*/
gulp.task('default', function () {

    gulp.watch(htmlFiles, ['html']);
    gulp.watch(sassFiles, ['sass']);
    gulp.watch(jsFiles,   ['js']);
    gulp.watch(gulpFile,  ['gulpfile']);
});

gulp.task('dev', function () {

    browserSync.init({
        server: developmentFolder
    });

    gulp.watch(htmlFiles, ['html']);
    gulp.watch(sassFiles, ['sass']);
    gulp.watch(jsFiles,   ['js']);
    gulp.watch(gulpFile,  ['gulpfile']);

    gulp.watch(htmlFiles).on('change', browserSync.reload);
    gulp.watch(jsFiles).on('change', browserSync.reload);
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
        .pipe(jshint())
        .pipe(jslint({
            node: true,
            browser: true
        }));
});

gulp.task('gulpfile', function () {

    return gulp.src(gulpFile)
        .pipe(jshint())
        .pipe(jslint({
            node: true,
            browser: true
        }));
});
/*=====  End of Config tasks  ======*/