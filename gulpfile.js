'use strict';

const path = require('path');
const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const reactify = require('reactify');
const envify = require('envify/custom');
const del = require('del');

const minifier = require('gulp-uglify/minifier');
const uglifyJS = require('uglify-js');

const packager = require('electron-packager');


gulp.task('clean', function (cb) {
    del(['dist', 'release'], cb);
});

gulp.task('bundle-index', function () {
    const b = browserify({
        entries: './src/index.js',
        debug: false,
        node: true,
        bundleExternal: false,
        transform: [reactify, envify({
            NODE_ENV: 'production'
        })]
    });

    const options = {
        preserveComments: 'license',
        mangle: true
    };

    return b.bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(minifier(options, uglifyJS))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('bundle-worker', function () {
    const b = browserify({
        entries: './src/worker.js',
        debug: false,
        node: true,
        bundleExternal: false,
        transform: [reactify, envify({
            NODE_ENV: 'production'
        })]
    });

    const options = {
        preserveComments: 'license',
        mangle: true
    };

    return b.bundle()
        .pipe(source('worker.js'))
        .pipe(buffer())
        .pipe(minifier(options, uglifyJS))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('html', function () {
    return gulp.src(['./src/index.html', './src/splash.html', './src/worker.html'])
        .pipe(gulp.dest('dist'));
});

gulp.task('assets', function () {
    return gulp.src('./src/assets/**/*', {"base": "./src"})
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['html', 'assets', 'bundle-index', 'bundle-worker']);


// PACKAGING

const pack = (opts) => {
    const options = Object.assign({
        dir: '.',
        asar: false,
        version: '1.4.13',
        //platform: '',
        //arch: '',
        out: 'release',
        overwrite: true,
        prune: true,
        ignore: [
            '^/.idea',
            '^/release',
            '^/src',
            '^/test',
            '^/.gitignore',
            '^/gulpfile.js',
            '^/readme-res',
            '^/README.md'
        ]
    }, opts);

    return packager(options, (err, appPaths) => {
        (err) ? console.error(err) : console.log('Done', appPaths)
    });
};

gulp.task('pack-mac', function () {
    return pack({
        platform: 'darwin',
        arch: 'x64',
    });
});

gulp.task('pack-win', function () {
    return pack({
        platform: 'win32',
        arch: 'x64',
    });
});

gulp.task('pack-lin', function () {
    return pack({
        platform: 'linux',
        arch: 'x64',
    });
});
