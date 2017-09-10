var gulp = require('gulp'),
	inject = require('gulp-inject-string'),
	textTransformation = require('gulp-text-simple'),
	shell = require('gulp-shell'),
	path = require('path'),
	template = require('gulp-template'),
	swPrecache = require('sw-precache'),
	runSequence = require('run-sequence'),
	rootDir = 'src';





gulp.task('generate-sw', function(){
	swPrecache.write(path.join(rootDir, 'service-worker.js'), {
		staticFileGlobs: [rootDir + '/**/*.{js}'],
		stripPrefix: rootDir
	});
});

gulp.task('build-site', function(){
	runSequence('inject-pwa', 'generate-sw');
});

gulp.task('default', ['build-site'], function() {
});


// function getComma(n){
// 	let stuff = rem => {
// 		if(n > 100)return;
// 		if(n > 10) return "0"+n;
// 		return "00"+n;
// 	};
// 	return n < 1000 ?  n+"" : parseInt(n/1000) + "," + stuff(n%1000);
// }