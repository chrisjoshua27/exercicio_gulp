const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');
//Corrigido
function comprimeImagem(){
    return gulp.src('./source/images/*',{encoding: false})
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}


function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));
}


function compilaSass(){
    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}



exports.watch = function(){
    gulp.watch('./source/styles/*.scss', gulp.series(compilaSass));
}
exports.javascript = comprimeJavaScript;
exports.images = comprimeImagem;