var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var jasmine = require("gulp-jasmine-phantom");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var ghPages = require("gulp-gh-pages");
var webpack = require("webpack-stream");
var babel = require("gulp-babel");
var cssnano = require("gulp-cssnano");
var sourcemaps = require("gulp-sourcemaps");
var htmlmin = require("gulp-htmlmin");
var inline = require("gulp-inline");
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
  "scripts",
  "copy-html"
]);
gulp.task("scripts", function() {
  gulp.src("js/**/!(Layout|index).js")
    .pipe(babel({
      presets: ["es2015", "react"]
    }))
    .pipe(sourcemaps.init())
    .pipe(concat("concat.js"))
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
        browsers: ["last 2 versions"]
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
gulp.task("copy-html", function() {
  gulp.src("./index.html")
    .pipe(gulp.dest("./dist"));
  gulp.src("dist/index.html")
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
gulp.task("copy-img", function() {
  gulp.src("img/*")
    .pipe(gulp.dest("dist/img"));
});
gulp.task("copy-analytics", function() {
  gulp.src("./analytics.js")
    .pipe(gulp.dest("dist/js"));
});
gulp.task("deploy", function() {
  return gulp.src("./dist/**/*")
    .pipe(ghPages());
});
