var gulp = require('gulp'),
	inject = require('gulp-inject-string'),
	textTransformation = require('gulp-text-simple'),
	shell = require('gulp-shell'),
	path = require('path'),
	template = require('gulp-template'),
	swPrecache = require('sw-precache'),
	runSequence = require('run-sequence'),
	rootDir = 'src';



gulp.task('inject-pwa', function() {
	
	gulp.src('PWA/index.html').pipe((textTransformation(function(str){
		gulp.src('src/index.html')
			.pipe(inject.after('</title>', str))
			.pipe(template({
				img_120: "img/apple-icon-120x120.png",
				img_192: "img/android-icon-192x192.png",
				title: "Splat Gears 2",
				description: "Splatoon 2 Gear App",
				theme_color: "#F67896",
				favicon: "img/favicon.ico",
				manifest:"manifest.json"
			}))
			.pipe(gulp.dest('src'));
		return str;
	}))());
});

gulp.task('generate-sw', function(){
	swPrecache.write(path.join(rootDir, 'service-worker.js'), {
		staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,json}'],
		stripPrefix: rootDir
	});
});

gulp.task('build-site', function(){
	runSequence('inject-pwa', 'generate-sw');
});

gulp.task('default', ['build-site'], function() {
});