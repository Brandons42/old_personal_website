var autoprefixer = require("gulp-autoprefixer");
var babel = require("gulp-babel");
var browserSync = require("browser-sync").create();
var cssnano = require("gulp-cssnano");
var ghPages = require("gulp-gh-pages");
var gulp = require("gulp");
var gulpUtil = require("gulp-util");
var htmlmin = require("gulp-htmlmin");
var inline = require("gulp-inline");
var jasmine = require("gulp-jasmine-phantom");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var webpack = require("webpack");

gulp.task("default", ["img", "styles", "webpack", "scripts", "html", "tests"], function() {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch("sass/**/*.scss", ["styles"]);
    gulp.watch("./index.html", ["html"]);
    gulp.watch("./img", ["img"]);
    gulp.watch("./index.html").on("change", browserSync.reload);
});
gulp.task("webpack", function(done) {
  webpack(require("./webpack.config.js")).run(
    function (error, stats){
      var gulpUtilError;
      if (error) {
        gulpUtilError = new gulpUtil.PluginError("webpack", error);
        if (done) {
          done(gulpUtilError);
        }
        else {
          gulpUtil.log("[webpack]", gulpUtilError);
        }
        return;
      }
      else {
        console.log(stats.toString());
      }
      if (done) {
        done();
      }
    });
});
gulp.task("scripts", function() {
  gulp.src("js/bundle.js")
      .pipe(babel())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("dist/js"));
});
gulp.task("styles", function() {
    gulp.src("sass/**/!(inline|inline-lg|inline-md|inline-sm|inline-xs).scss")
      .pipe(sass({
        precision: 8
      }).on("error", sass.logError))
      .pipe(autoprefixer({
        browsers: [
          "Android 2.3",
          "Android >= 4",
          "Chrome >= 20",
          "Firefox >= 24",
          "Explorer >= 8",
          "iOS >= 6",
          "Opera >= 12",
          "Safari >= 6"
        ]
      }))
      .pipe(sourcemaps.init())
      .pipe(cssnano())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("dist/css"))
      .pipe(browserSync.stream());
    gulp.src("sass/inline/*.scss")
      .pipe(sass({
        precision: 8
      }).on("error", sass.logError))
      .pipe(autoprefixer({
        browsers: ["last 2 versions"]
      }))
      .pipe(cssnano())
      .pipe(gulp.dest("dist/css/inline"))
      .pipe(browserSync.stream());
});
gulp.task("tests", function() {
  gulp.src("spec/spec.js")
    .pipe(jasmine({
      integration: true,
      vendor: "js/**/*.js"
    }));
});
gulp.task("html", function() {
  gulp.src("./index.html")
    .pipe(gulp.dest("./dist"))
    .pipe(inline({
      base: "./",
      disabledTypes: ["img", "svg", "js"],
      ignore: ""
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("./dist"));
});
gulp.task("img", function() {
  gulp.src("img/*")
    .pipe(gulp.dest("dist/img"));
});
gulp.task("copy-analytics", function() {
  gulp.src("js/analytics.js")
    .pipe(gulp.dest("dist/js"));
});
gulp.task("deploy", function() {
  return gulp.src("./dist/**/*")
    .pipe(ghPages());
});
