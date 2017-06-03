var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require("gulp-autoprefixer");
var jasmine = require("gulp-jasmine-phantom");
gulp.task("serve", ["sass"], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("sass/**/*.scss", ["sass"]);
    gulp.watch("index.html").on("change", browserSync.reload);
});
gulp.task("sass", function() {
    return gulp.src("sass/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
          browsers: ["last 2 versions"]
        }))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});
gulp.task("tests", function() {
  gulp.src("spec/spec.js")
    .pipe(jasmine({
      integration: true,
      vendor: "js/**/*.js"
    }));
});
gulp.task('default', ['serve']);
