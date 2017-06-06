var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require("gulp-autoprefixer");
var jasmine = require("gulp-jasmine-phantom");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var ghPages = require("gulp-gh-pages");
var inlinesource = require('gulp-inline-source');
gulp.task("default", ["dist", "copy-analytics", "tests"], function() {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch("sass/**/*.scss", ["sass"]);
    gulp.watch("./index.html", ["copy-html"]);
    gulp.watch("./img", ["copy-img"]);
    gulp.watch("./index.html").on("change", browserSync.reload);
});
gulp.task("dist", [
  "copy-img",
  "styles",
  "scripts-dist",
  "copy-html"
]);
gulp.task("scripts", function() {
  gulp.src("js/**/*.js")
    .pipe(concat("concat.js"))
    .pipe(gulp.dest("dist/js"));
});
gulp.task("scripts-dist", function() {
  gulp.src("js/**/!(inline).js")
    .pipe(concat("concat.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
  gulp.src("js/inline.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});
gulp.task("styles", function() {
    gulp.src("sass/**/*.scss")
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
  gulp.src("dist/index.html")
    .pipe(inlinesource());
});
gulp.task("copy-img", function() {
  gulp.src("img/*")
    .pipe(gulp.dest("dist/img"));
});
gulp.task("copy-analytics", function() {
  gulp.src("./analytics.js")
    .pipe(gulp.dest("dist/js"));
});
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});
