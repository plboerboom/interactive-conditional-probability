var gulp = require('gulp');

var jshint = require('gulp-jshint');

gulp.task('lint', function() {
    return gulp.src('src/javascript/**/*.js')
                         .pipe(jshint())
                         .pipe(jshint.reporter('default'));
});

gulp.task('copyhtml', function() {
    gulp.src('src/*.html').pipe(gulp.dest('public'));
});

//gulp.watch('src/javascript/**/*.js', ['lint']);

gulp.task('default', ['lint', 'copyhtml']);
