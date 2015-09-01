var gulp = require('gulp');

var alljs = 'src/javascript/**/*.js';

var jshint = require('gulp-jshint'),
    usemin = require('gulp-usemin'),
    minifyCss = require('gulp-minify-css'),
    debug = require('gulp-debug'),
    concat = require('gulp-concat');

gulp.task('lint', function() {
    return gulp.src(alljs)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build-site', function() {
    return gulp.src('./src/index.html')
    .pipe(debug({title: 'dbg'}))
    .pipe(usemin({
        js: ['concat'],
        jsd: ['concat'],
        cssd: ['concat'],
        css: ['concat']
    }))
    .pipe(debug({title: 'after'}))
    .pipe(gulp.dest('public/'));
});

gulp.watch('src/*', ['lint', 'build-site']);


gulp.task('default', ['lint', 'build-site']);
