const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const beautify = require('gulp-html-beautify');
const browserSync = require("browser-sync");
const changed = require("gulp-changed");
const data = require('gulp-data');
const glob = require("gulp-sass-glob");
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const notify = require("gulp-notify");
const nunjucks = require('gulp-nunjucks-render');
const sass = require("gulp-sass");
const ssi = require("connect-ssi");
const plumber = require("gulp-plumber");
const pngquant = require("imagemin-pngquant");
const ts = require('gulp-typescript');
const uglify = require("gulp-uglify-es").default;
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const vueify = require('gulp-vueify');
const imageminJpg = require('imagemin-jpeg-recompress');
const imageminPng = require('imagemin-pngquant');

const paths = {
    'src': {
        'root': './src/',
        'template': './src/template/',
        'html': './src/template/page/',
        'json': './src/template/data/site.json',
        'scssSrc': './src/scss/**/*.scss',
        'jsSrc': './src/js/**/*.js',
        'imgSrc': './src/img/**/*',
        'tsSrc': './src/ts/**/*.ts',
        'vueSrc': './src/vue/**/*.vue'
    },
    'dest': {
        'rootDir': './dest/',
        'root': './dest/assets/html/',
        'outCss': 'dest/assets/html/css',
        'outImg': './dest/assets/html/img',
        'outTs': './src/js/',
        'outJs': './dest/assets/html/js'
    }
};

// browser sync
function browserSyncFunc(done) {
    browserSync.init({
        server: {
            baseDir: paths.dest.root,
            middleware: [
                ssi({
                    baseDir: paths.dest.root,
                    notify: false, //通知
                    ext: ".html"
                })
            ]
        },
        port: 4000,
        reloadOnRestart: true
    });
    done();
}

// sass
function sassFunc() {
    return gulp.src(paths.src.scssSrc, {
        sourcemaps: true
    })
        .pipe(plumber({
            errorHandler: notify.onError('<%= error.message %>'),
        }))
        .pipe(glob())
        .pipe(sass({
            outputStyle: 'nested'
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest(paths.dest.outCss, {
            sourcemaps: './sourcemaps'
        }))
        .pipe(browserSync.stream());
}

function sassFunc_prod() {
    return gulp.src(paths.src.scssSrc, {
        sourcemaps: true
    })
        .pipe(plumber({
            errorHandler: notify.onError('<%= error.message %>'),
        }))
        .pipe(glob())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(browserSync.stream());
}



// img
function imgFunc() {
    return gulp.src(paths.src.imgSrc)
        .pipe(changed(paths.dest.outImg))
        .pipe(imagemin(
            [mozjpeg({
                quality: 80 //画像圧縮率
            }),
            pngquant()
            ], {
            verbose: true
        }
        ))
        .pipe(gulp.dest(paths.dest.outImg))
}

// nunjucks
const beautify_option = {
    'indent_size': 4
}

function nunjucksFunc() {
    return gulp.src(paths.src.html + '**/*.njk')
        .pipe(data(function () {
            return require(paths.src.json);
        }))
        .pipe(nunjucks({
            path: paths.src.template
        }))
        .pipe(beautify(beautify_option))
        .pipe(gulp.dest(paths.dest.root))
};

// typescript
function tsFunc() {
    return gulp.src(paths.src.tsSrc)
        .pipe(ts({
            module: 'commonjs',
            target: 'ES5',
            noImplicitAny: true,
            removeComments: true
        }))
        .pipe(gulp.dest(paths.dest.outTs))
};
// js
function jsFunc() {
    return plumber({
        errorHandler: notify.onError('<%= error.message %>'),
    })
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(babel())
        .pipe(uglify({}))
        .pipe(gulp.dest(paths.dest.outJs));
}

function tsFunc_prod() {
    return gulp.src(paths.src.tsSrc)
        .pipe(ts({
            module: 'commonjs',
            target: 'ES5',
            noImplicitAny: true,
            removeComments: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest.outJs))
};

// vue
function vueifyFunc(done) {
    return gulp.src(paths.src.vueSrc)
        .pipe(vueify())
        .pipe(gulp.dest(paths.dest.outJs))
    done();
};

// reload
function reload(done) {
    browserSync.reload();
    done();
};

// watch
function watchFunc(done) {
    gulp.watch(paths.src.vueSrc, gulp.parallel(vueifyFunc));
    gulp.watch(paths.src.scssSrc, gulp.parallel(sassFunc));
    gulp.watch(paths.src.imgSrc, gulp.parallel(imgFunc));
    gulp.watch(paths.src.tsSrc, gulp.parallel(tsFunc));
    gulp.watch(paths.src.jsSrc, gulp.parallel(jsFunc));
    gulp.watch(paths.src.template + '**/*.njk', gulp.parallel(nunjucksFunc));
    gulp.watch(paths.src.template + '**/*.json', gulp.parallel(nunjucksFunc));
    gulp.watch(paths.src.template + 'data/site.json', gulp.parallel(reload));
    gulp.watch(paths.src.template + 'data/site.json', gulp.parallel(nunjucksFunc));
    gulp.watch(paths.dest.root + '**/*.html', gulp.parallel(reload));
    gulp.watch(paths.dest.outCss + '**/*.css', gulp.parallel(reload));
    gulp.watch(paths.dest.outJs + '**/*.js', gulp.parallel(reload));
    done();
}

function watchFiles(done) {
    const browserReload = () => {
        browserSync.reload();
        done();
    };
    watch(paths.src.tsSrc).on('change', series(tsFunc, browserReload));
};

// scripts tasks
gulp.task('default',
    gulp.parallel(
        watchFunc, sassFunc, imgFunc, nunjucksFunc, vueifyFunc, tsFunc, jsFunc, browserSyncFunc
    ),
    gulp.series(
        watchFiles
    )
);

gulp.task('development',
    gulp.parallel(
        watchFunc, sassFunc, imgFunc, nunjucksFunc, vueifyFunc, tsFunc, jsFunc, browserSyncFunc
    ),
    gulp.series(
        watchFiles
    )
);

//CSSとJSを圧縮
gulp.task('production',
    gulp.parallel(
        watchFunc, sassFunc_prod, imgFunc, nunjucksFunc, vueifyFunc, tsFunc_prod, browserSyncFunc
    ),
    gulp.series(
        watchFiles
    )
);

gulp.task('sass',
    gulp.parallel(
        sassFunc
    )
);

gulp.task('nunjucks',
    gulp.parallel(
        nunjucksFunc
    )
);

gulp.task('ts',
    gulp.parallel(
        tsFunc
    )
);

gulp.task('img',
    gulp.parallel(
        imgFunc
    )
);