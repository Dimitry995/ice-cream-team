'use strict';

var gulp = require('gulp');

var prompt = require('gulp-prompt');
var log = require('fancy-log');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var cleanCSS = require('gulp-clean-css');

var concat = require('gulp-concat');
var minify = require('gulp-minify');
var clean = require('gulp-clean');

var watch = require('gulp-watch');

var theme_input='sunstar';

gulp.task('css', function() {
    var importFrom = require('gulp/themes/'+theme_input+'.js');
    return gulp.src(importFrom.css_arr,{base: '.'})
      .pipe(concatCss(importFrom.destination_css))
      .pipe(minifyCSS({keepSpecialComments: 0}))
      .pipe(gulp.dest('.'));
  });

gulp.task('scripts', function() {
    var importFrom = require('gulp/themes/'+theme_input+'.js');
    return gulp.src(importFrom.js_arr)
      .pipe(concat(importFrom.destination_js))
      .pipe(minify({keepSpecialComments: 0}))
      .pipe(gulp.dest('.'));
  });


gulp.task('choose', function(){
    log('Please enter THEME name, then type of task [js/css].');
    return gulp.src('*')
    .pipe(prompt.prompt([{
        type: 'input',
        name: 'theme_input',
        message: 'Please enter THEME name?'
    },{
        type: 'input',
        name: 'task',
        message: 'Please enter task Type?'
    }], function(res){
        theme_input = res.theme_input;
        var importFrom = require('gulp/themes/'+theme_input+'.js');
        if(res.task == 'css'){
            gulp.src(importFrom.css_arr,{base: '.'})
            .pipe(concatCss(importFrom.destination_css))
            .pipe(minifyCSS({keepSpecialComments: 0}))
            .pipe(gulp.dest('.'));
        }else if(res.task == 'js'){
            gulp.src(importFrom.js_arr)
            .pipe(concat(importFrom.destination_js))
            .pipe(minify({keepSpecialComments: 0}))
            .pipe(gulp.dest('.'));
        }
    }));
});

gulp.task('default',['choose','css','scripts']);