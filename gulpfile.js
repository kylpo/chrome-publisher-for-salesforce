var gulp = require("gulp");
var browserify = require("gulp-browserify");
var concat = require("gulp-concat");

gulp.task("scripts", function() {
    gulp.src(["./src/main.js"])
        .pipe(browserify({
            transform: ["reactify"]
        }))
        .pipe(concat("main.js"))
        .pipe(gulp.dest("./build"));
});

gulp.task("watch", function() {
    gulp.watch("src/**/*.js", function() {
        gulp.run("scripts");
    });
});

gulp.task("default", function() {
    gulp.run("scripts");
});