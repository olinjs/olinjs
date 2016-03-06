//Based off of gulpfile by Ben Lewis
// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');

// Build Dependencies
var babel= require('gulp-babel');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Style Dependencies
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// Babel
gulp.task('babel', function() {
    return gulp.src('client/**/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});

// Browserify
gulp.task('browserify', ['babel'], function() {
    return gulp.src('client/main.js')
    .pipe(browserify({
        insertGlobals: true
    }))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/javascripts'));
});

// Styles
gulp.task('styles', function() {
    return gulp.src('client/sass/main.scss')
    .pipe(sass())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('built.css))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/stylesheets'));
});


// Build
gulp.task('minify', ['styles'], function() {
    return gulp.src('build/main.css')
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('uglify', ['browserify'], function() {
    return gulp.src('build/main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('public/javascripts'));
});


gulp.task('watch', function() {
    gulp.watch('client/**/*.js', ['browserify']);
    gulp.watch('client/**/*.less', ['styles']);
});

// Tasks
gulp.task('build', ['uglify', 'minify']);
gulp.task('default', ['build', 'watch']);
