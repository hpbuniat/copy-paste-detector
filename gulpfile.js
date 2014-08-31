var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    coffee = require('gulp-coffee'),
    shell = require('gulp-shell'),
    coffeelint = require('gulp-coffeelint'),
    mocha = require('gulp-mocha'),
    sources = {
        coffee: 'src/**/*.coffee',
        lib: 'lib/**/*.js',
        tests: 'test/**/*.js'
    },
    destinations = {
        build: ''
    };
/*BUILD COFFEE*/
gulp.task('coffee:build', function (event) {
    return gulp.src(sources.coffee)
        .pipe(plumber())
        .pipe(coffee())
        .pipe(gulp.dest(destinations.build));
});

/*UNIT TESTS*/
gulp.task('unit', ['coffee:build'], function () {
    return gulp.src(sources.tests, {read: false})
        .pipe(plumber())
        .pipe(mocha({reporter: 'nyan'}));
});

/*LINT COFFEESCRIPT*/
gulp.task('lint', function () {
    return gulp.src(sources.coffee)
        .pipe(plumber())
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
});

/*WATCH COFFEE*/
gulp.task('coffee:watch', ['coffee:build'], function (event) {
    gulp.watch(sources.coffee, ['all']);
});

/*DEV TASK*/
gulp.task('dev', ['coffee:build', 'coffee:watch']);
gulp.task('all', ['coffee:build', 'lint', 'unit']);

/*DEFAULT TASK*/
gulp.task('default', ['dev']);
