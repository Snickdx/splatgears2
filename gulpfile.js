var gulp = require('gulp'),
	path = require('path'),
	swPrecache = require('sw-precache'),
	rootDir = 'src';

// rootDir+"/lib/ionic/js/ionic.bundle.js"
// rootDir+"/bundle.js"

gulp.task('generate-sw', function(){
	swPrecache.write(path.join(rootDir, 'service-worker.js'), {
		staticFileGlobs: [rootDir + '/**/*.{html,css,png,jpg,gif,svg,eot,ttf,woff,json}'],
		stripPrefix: rootDir
	});
});

gulp.task('default', ['generate-sw'], function() {

});