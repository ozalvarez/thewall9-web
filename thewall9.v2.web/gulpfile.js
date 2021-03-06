﻿"use strict";
const gulp = require("gulp");
var gutil = require('gulp-util');
const del = require("del");
const less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var svgstore = require('gulp-svgstore');
var path = require('path');

/**
 * CSS
 */
gulp.task('less', function () {
    return gulp.src('./src/css/app.less')
        .pipe(less())
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});
gulp.task('cssmin', ['postcss'], function () {
    //app
    return gulp.src('./src/css/app.css')
        .pipe(cssmin())
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('./build/css'));
});
gulp.task('cssmin:vendors', function () {
    //vendors
    return gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/font-awesome/css/font-awesome.min.css',
        './node_modules/toastr/build/toastr.min.css'
    ])
        .pipe(concat('vendors.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./build/css'));

});
gulp.task('postcss', ['less'], function () {
    return gulp.src('./src/**/*.css')
        .pipe(postcss([autoprefixer({ browsers: ['last 5 versions'] })]))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});
/**
 * JS
 */
gulp.task('minify:vendors', function () {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/granim/dist/granim.min.js',
        './node_modules/toastr/build/toastr.min.js',
        './node_modules/reframe.js/dist/reframe.js',
        './node_modules/progressbar.js/dist/progressbar.min.js',
        './src/js/others/*.js',
    ])
        .pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'))
});
gulp.task('minify', ['minify:home'], function () {
    return gulp.src([
        './src/js/app.js',
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'))
});
gulp.task('minify:home', function () {
    return gulp.src([
        './src/js/app.home.js',
    ])
        .pipe(concat('app.home.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'))
});
/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del.sync(["build"], cb);
});
/**
 * SVG
 */
gulp.task('svg', function () {
    //return gulp
    //    .src('src/svg/**/*.svg')
    //    .pipe(svgstore())
    //    .pipe(rename('icons.svg'))
    //    .pipe(gulp.dest('build/svg/'));
});
/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", ['less'], () => {
    gulp.src(["./src/**/*", "!**/*.less", "!./src/js/*", "!./src/css/*"])
        .pipe(gulp.dest("build"));
    gulp.src([
        "./node_modules/font-awesome/fonts/*",
        "./node_modules/bootstrap/dist/fonts/*"
    ])
        .pipe(gulp.dest("build/fonts/"));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch(["./src/css/**/*.less"], ['cssmin']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
    gulp.watch(["./src/js/**/*.js"], ['minify']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});

/**
 * Build the project.
 */
gulp.task("build", ['clean', 'resources', 'minify:vendors', 'minify', 'cssmin:vendors', 'cssmin', 'svg'], () => {
    console.log("Building the project ...");
});
gulp.task("build-watch", ['clean', 'resources', 'minify:vendors', 'minify', 'cssmin:vendors', 'cssmin','svg', 'watch'], () => {
    console.log("Building the project ...");
});