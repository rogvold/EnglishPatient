/**
 * Created by sabir on 16.08.15.
 */
var gulp = require('gulp');
var jsx = require('gulp-jsx');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var uglify = require('gulp-uglify');

//var gulp = require('gulp');
//var browserify = require('gulp-browserify');
//var reactify = require('reactify');

gulp.task('browserify', function(){



    browserify('./src/features/apps/patient/App.js')
        .transform('reactify')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('features/js'));

    //browserify('./src/features/apps/patient/front/App.js')
    //    .transform('reactify')
    //    .bundle()
    //    .pipe(source('frontApp.js'))
    //    .pipe(gulp.dest('features/js'));

});

//gulp.task('compress', function() {
//    return gulp.src('dist/js/*.js')
//        .pipe(uglify())
//        .pipe(gulp.dest('dist/js/min'));
//});

gulp.task('copy', function(){



    //gulp.src('src/features/index.html')
    //    .pipe(gulp.dest('test'));
    //
    //
    //gulp.src('src/assets/**/*.*')
    //    .pipe(gulp.dest('test/assets'));



    gulp.src('src/features/components.html')
        .pipe(gulp.dest('features'));

    gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('features/assets'));

});

gulp.task('default', ['browserify', 'copy'], function(){
    //gulp.watch('src/**/*.*', ['browserify']);
});