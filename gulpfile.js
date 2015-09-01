var gulp = require('gulp');

var alljs = 'src/javascript/**/*.js';

var jshint = require('gulp-jshint'),
    concat = require('gulp-concat');

gulp.task('lint', function() {
    return gulp.src(alljs)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('copyhtml', function() {
    gulp.src('src/*.html').pipe(gulp.dest('public'));
});

//gulp.watch('src/javascript/**/*.js', ['lint']);

gulp.task('build-js', function() {
    return gulp.src(alljs)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public/javascript'))
} )

gulp.task('default', ['lint', 'copyhtml', 'build-js']);
