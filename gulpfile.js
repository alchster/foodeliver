var gulp = require('gulp'),
	concat = require('gulp-concat'),	
	include = require('gulp-include'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch');

function buildJS() {
	setTimeout(function (){
		gulp.src('./js/api.js')
			.pipe(include())
			.on('error', console.log)
			.pipe(concat('api.js'))
			.pipe(uglify())
			.pipe(gulp.dest('static/js'));}, 1000);
}

gulp.task('default', buildJS);

gulp.task('watch', function() {
	gulp.start('default');
	return watch('./js/**/*.js', function() {
		gulp.start('default');
	});
});
