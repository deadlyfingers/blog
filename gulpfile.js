var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

// deploy task to push to build dir to 'gh-pages' branch
gulp.task('deploy', function () {
  return gulp.src('./_site/**/*')
    .pipe(ghPages());
});