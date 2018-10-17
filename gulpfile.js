var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

const BUILD_SITE = '_site';
const BUILD_DEV = '_dev';

// deploy task to push to build dir to 'gh-pages' branch
gulp.task('_deploy_site', function () {
  return gulp.src('./' + BUILD_SITE + '/**/*')
    .pipe(ghPages());
});

// copy 'keep_files' helper
// 'node_modules' contains both production and development modules
// but the exclude/include config settings result in all or nothing.
// therefore this helper function is required to copy 
// only the files from 'node_modules' that we need for production.
gulp.task('copy', function () {
  return keep_files(BUILD_SITE);
});

gulp.task('copy:dev', function () {
  return keep_files(BUILD_DEV);
});

// 'keep_files' listed in _config.yml should be included here
const keep_files = function (dest) {
  return gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/**/*'], {
      base: 'node_modules'
    })
    .pipe(gulp.dest(dest + '/node_modules'));
};

// first copy any required files and then deploy site
gulp.task('deploy', gulp.series('copy', '_deploy_site'));