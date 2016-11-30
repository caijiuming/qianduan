
var del=require('del');
var gulp=require('gulp');
var uglify=require('gulp-uglify');
var mincss=require('gulp-clean-css');
var inline=require('gulp-inline-source'); 
var include=require('gulp-include'); 
var sequence=require('gulp-sequence');
var useref=require('gulp-useref'); 
var gulpif=require('gulp-if');
var print=require('gulp-print'); 
var connect=require('gulp-connect'); 



gulp.task('clean',function (cb) {
    del(['dist']).then(function () {
        cb()
    })
});



gulp.task('mincss',function () {
    return gulp.src('./src/www/css/*.css')
        .pipe(mincss())
        .pipe(gulp.dest('dist/www/css'))
});

gulp.task('minjs',function () {
    return gulp.src('./src/www/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/www/js'))
});


gulp.task('html', function () {
    return gulp.src('./src/www/*.html')
        .pipe(inline())
        .pipe(include())
        .pipe(useref())
        .pipe(gulpif('*.js',uglify()))
        .pipe(gulpif('*.css',mincss()))
        .pipe(connect.reload())
        .pipe(gulp.dest('dist'));
});



gulp.task('connect', function() {
    connect.server({
        root: './dist', 
        port:8080,
        livereload: true
    });
});


gulp.task('watchlist',function (cb) {
    sequence('clean',['mincss','minjs','html'])(cb)
});

gulp.task('watch',function () {
    gulp.watch(['./src/**'],['watchlist']);
});



gulp.task('default',function (cb) {
    sequence('clean',['mincss','minjs','html','connect'],'watch')(cb)
});



