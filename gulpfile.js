var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require("gulp-autoprefixer");
var jasmine = require("gulp-jasmine-phantom");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
gulp.task("default", ["styles", "copy-html", "copy-img", "tests"], function() {
    gulp.watch("sass/**/*.scss", ["sass"]);
    gulp.watch("./index.html", ["copy-html"]);
    gulp.watch("./img", ["copy-img"]);
    gulp.watch("./index.html").on("change", browserSync.reload);
    browserSync.init({
        server: "./dist"
    });
});
gulp.task("dist", [
  "copy-html",
  "copy-img",
  "styles",
  "scripts-dist"
]);
gulp.task("scripts", function() {
  gulp.src("js/**/*.js")
    .pipe(concat("concat.js"))
    .pipe(gulp.dest("dist/js"));
});
gulp.task("scripts-dist", function() {
  gulp.src("js/**/*.js")
    .pipe(concat("concat.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});
gulp.task("styles", function() {
    return gulp.src("sass/**/*.scss")
        .pipe(sass({
          outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(autoprefixer({
          browsers: ["last 2 versions"]
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});
gulp.task("tests", function() {
  gulp.src("spec/spec.js")
    .pipe(jasmine({
      integration: true,
      vendor: "js/**/*.js"
    }));
});
gulp.task("copy-html", function() {
  gulp.src("./index.html")
    .pipe(gulp.dest("./dist"));
});
gulp.task("copy-img", function() {
  gulp.src("img/*")
    .pipe(gulp.dest("dist/img"));
});
