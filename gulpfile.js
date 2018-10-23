const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const spawn = require('child_process').spawn;
const os = require('os');
const fs = require('fs');
const path = require('path');

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

// list category values from posts front matter
gulp.task('list:categories', function () {
  return readDir("_posts", getCategories).then(values => {
    console.log("categories:", values);
  });
});

// list tag values from posts front matter
gulp.task('list:tags', function () {
  return readDir("_posts", getTags).then(values => {
    console.log("tags:", values);
  });
});

// generate tag md files for building
gulp.task('generate:tags', function () {
  var promises = [];
  var tags = [];
  var regexp = /\-\s?([a-zA-Z0-9\- ]+)/gi;
  return readDir("_posts", getTags).then(values => {
    values.forEach(value => {
      if (value.indexOf('[') === 0) {
        // tag array from tags string using '[,]' format
        var str = value.substring(1, value.length - 1);
        var arr = str.split(',').map(s => s.replace(/"([^"]+(?="))"/g, '$1').trim());
        if (arr.length >= 1) {
          tags = tags.concat(arr);
        }
      } else {
        // tag from tags string using newline '-\s' format
        while (match = regexp.exec(value)) {
          if (match.length >= 2) {
            tags.push(match[1]);
          }
        }
      }
    });
    var uniqueTags = [...new Set(tags)];
    //console.log(uniqueTags, uniqueTags.length);
    var i = uniqueTags.length;
    var filePath = "./";
    var md = "";
    var tag = "";
    var slug = "";
    while (i--) {
      tag = uniqueTags[i];
      slug = slugify(tag);
      filePath = path.join("./_tag/", slug + ".md");
      md = generateTagFrontMatter(tag);
      promises.push(writeFileWithDir(filePath, md));
    }
    return Promise.all(promises);
  });
});

// build everything but don't do live deploy
gulp.task('deploy:soft', gulp.series('build', 'copy', 'generate:tags'));

// first build and copy any required files, generate tags and then deploy site
gulp.task('deploy', gulp.series('build', 'copy', 'generate:tags', '_deploy_site'));

// slugify tag url
const slugify = function (name) {
  return name.toLowerCase().replace(/\s+/g, '-');
};

const generateTagFrontMatter = function (tag) {
  return `---\ntag: ${tag}\nlayout: tag\n---`;
};

const getTags = function (posts) {
  return getFrontMatter(posts, "tags");
};

const getCategories = function (posts) {
  return getFrontMatter(posts, "categories");
};

const getFrontMatter = function (posts, key) {
  var results = [];
  var pattern = `^${key}\\s*:\\s*([a-zA-Z0-9 ]+|\\[(("|')?[A-z0-9\\- ]+("|')?,?\\s?)+\\]|(-\\s([A-z0-9\\- ]+)\\s*)+)`;
  var regexp = new RegExp(pattern, 'mi');
  var matches = 0;
  var match = null;
  var value = "";
  posts.forEach(post => {
    matches = post.match(regexp);
    if (matches.length >= 1) {
      match = matches[0];
      value = match.replace(new RegExp(`^${key}\\s*:\\s*`), '');
      results.push(value);
    }
  });
  return results;
};

const readDir = function (sourceDir, fn) {
  return new Promise((resolve, reject) => {
    fs.readdir(sourceDir, function (err, files) {
      if (err) return reject(err);
      var filePaths = files.map(f => path.join(sourceDir, f));
      readFiles(filePaths).then(values => {
        resolve(fn(values));
      });
    });
  });
};

const readFiles = function (files) {
  var promises = [];
  var i = files.length;
  while (i--) {
    promises.push(readFile(files[i]));
  }
  return Promise.all(promises);
};

const readFile = function (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, {
      encoding: 'utf8'
    }, function (err, data) {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

// only creates a new file if it doesn't already exist
const newFile = function (filePath, data) {
  return new Promise((resolve, reject) => {
    fs.exists(filePath, function (exists) {
      if (!exists) {
        return writeFileWithDir(filePath, data).then(() => {
          resolve();
        }).catch(err => {
          reject(err);
        });
      } else {
        reject("File path exists: " + filePath);
      }
    });
  });
};

// writes to file path (and creates new directories as required)
const writeFileWithDir = function (filePath, data) {
  return new Promise((resolve, reject) => {
    makeFileDirectory(filePath).then(() => {
      writeFile(filePath, data).then(() => {
        resolve();
      }).catch(err => {
        reject(err);
      });
    }).catch(err => {
      reject(err);
    });
  });
};

const writeFile = function (filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
};

const makeFileDirectory = function (filePath) {
  return new Promise((resolve, reject) => {
    var dirname = path.dirname(filePath);
    fs.exists(dirname, function (exists) {
      if (!exists) {
        fs.mkdir(dirname, function (err) {
          if (err) return reject(err);
          resolve("created dir:" + dirname);
        });
      } else {
        resolve("dir exists:" + dirname);
      }
    });
  });
};