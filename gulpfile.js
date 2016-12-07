'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

/**
* Execute all tests.
*/
gulp.task('run-tests', function () {
	return gulp.src('test/**/*.js', { read: false })
		.pipe(mocha({ timeout: 30000, reporter: 'spec' }));
});
