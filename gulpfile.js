const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const spawn = require('child_process').spawn;
const os = require('os');

// Jekyll build paths
const BUILD_SITE = '_site';
const BUILD_DEV = '_dev';

// npm command
var npm = 'npm';
if (os.platform() === 'win32') {
  npm = 'npm.cmd';
}

// npm build task
gulp.task('build', function () {
  return spawn(npm, ['run', 'build']);
});

// deploy task to push to build dir to 'gh-pages' branch
gulp.task('_deploy_site', function () {
  return gulp.src('./' + BUILD_SITE + '/**/*')
    .pipe(ghPages());
});

// Helper function to copy dependencies
const keep_files = function (dest) {
  // Any 'keep_files' listed in '_config.yml' should be included here
  return gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/**/*'], {
      base: 'node_modules'
    })
    .pipe(gulp.dest(dest + '/node_modules'));
};

// 'node_modules' contains both production and development modules.
// But the exclude/include settings in '_config.yml' don't allow a sub-dir to be retained in an excluded parent dir.
// Therefore there is the need to copy the files from 'node_modules' that we only require for production.
gulp.task('copy', function () {
  return keep_files(BUILD_SITE);
});

gulp.task('copy:dev', function () {
  return keep_files(BUILD_DEV);
});

// first copy any required files and then deploy site
gulp.task('deploy', gulp.series('build', 'copy', '_deploy_site'));