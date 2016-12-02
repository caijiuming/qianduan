
var del=require('del');
var gulp=require('gulp');
var jshint=require('gulp-jshint');//1)js校验
var uglify=require('gulp-uglify');//2)压缩js
var mincss=require('gulp-clean-css');//2)css压缩
var imagemin=require('gulp-imagemin');//3)图片压缩
var spriter=require('gulp-css-spriter');//3)图片合并
var useref=require('gulp-useref');//4)css js合并
var inline=require('gulp-inline-source'); //5)资源嵌入
var include=require('gulp-include'); //5)资源前途
var connect=require('gulp-connect'); //6)本地调试服务器自动刷新
var sequence=require('gulp-sequence');
var gulpif=require('gulp-if');
var print=require('gulp-print'); 




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
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
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
        .pipe(gulp.dest('dist/www'));
});

gulp.task('images',function(){
    return gulp.src('./src/www/img/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/www/img'));
});

gulp.task('spriter',function(){
    return gulp.src('./src/www/css/*.css')
        .pipe(spriter({
            sprite:"sprite.png",
            slice:"./src/www/img",
            outpath:"./dist/www/img"
        }))
        .pipe(gulp.dest('./dist/www/css'));
})

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
    sequence('clean','images','spriter',['mincss','minjs','html','connect'],'watch')(cb)
});



