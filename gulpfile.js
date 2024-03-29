const deployFolder = "dist";
const devFolder = "src";

let fileSystem = require("fs");

const path = {
  build: {
    html: `${deployFolder}/`,
    css: `${deployFolder}/css/`,
    js: `${deployFolder}/js/`,
    img: `${deployFolder}/img/`,
    fonts: `${deployFolder}/fonts/`,
    libs: `${deployFolder}/libs/`,
  },
  src: {
    html: `${devFolder}/*.html`,
    css: `${devFolder}/scss/style.scss`,
    js: `${devFolder}/js/script.js`,
    img: `${devFolder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
    fonts: `${devFolder}/fonts/*.ttf`,
    libs: `${devFolder}/libs/**/*.*`,
  },
  watch: {
    html: `${devFolder}/**/*.html`,
    css: `${devFolder}/scss/**/*.scss`,
    js: `${devFolder}/js/**/*.js`,
    img: `${devFolder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
  },
  clean: `./${deployFolder}/`,
};

let {
  src,
  dest
} = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  del = require("del"),
  scss = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  gcmq = require("gulp-group-css-media-queries"),
  cleanCss = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify-es").default,
  concat = require("gulp-concat"),
  babel = require("gulp-babel"),
  imagemin = require("gulp-imagemin"),
  webp = require("gulp-webp"),
  // webphtml = require("gulp-webp-html"),
  // webpcss = require("gulp-webpcss"),
  svgsprite = require("gulp-svg-sprite"),
  cheerio = require("gulp-cheerio"),
  ttf2woff = require("gulp-ttf2woff"),
  ttf2woff2 = require("gulp-ttf2woff2"),
  fonter = require("gulp-fonter"),
  cache = require("gulp-cache"),
  sourcemaps = require('gulp-sourcemaps');

const browserSync = () => {
  browsersync.init({
    server: {
      baseDir: `./${deployFolder}/`,
    },
    port: 3000,
    notify: true,
  });
};

const html = () => {
  return (
    src(path.src.html)
    .pipe(fileinclude())
    // .pipe(webphtml())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
  );
};

const css = () => {
  return (
    src(path.src.css)
    .pipe(sourcemaps.init())
    .pipe(scss().on("error", scss.logError))
    .pipe(gcmq())
    .pipe(
      autoprefixer(["last 5 versions"], {
        cascade: true,
      })
    )
    .pipe(sourcemaps.write('./'))
    // .pipe(webpcss())
    .pipe(dest(path.build.css))
    .pipe(cleanCss())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
  );
};

const js = () => {
  src([
      // js libs uncomment what you need
      "node_modules/jquery/dist/jquery.min.js",
      // "node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js", // no jQuery needed
      "src/libs/jquery-ui-1.13.2.custom/jquery-ui-1.13.2.custom/jquery-ui.min.js",
      // "src/libs/stickySidebar.js",
      "src/libs/odometer/odometer.min.js",
      "src/libs/fancybox/jquery.fancybox.min.js",

      // "src/libs/slick/slick/slick.min.js",

      // svg support in all browsers
      "node_modules/svg4everybody/dist/svg4everybody.min.js", // no jQuery needed

      // modal
      // "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js",
      "node_modules/sticky-sidebar/dist/jquery.sticky-sidebar.min.js",
      // swiper slider
      // "node_modules/swiper/swiper-bundle.min.js.map",
      "node_modules/swiper/swiper-bundle.min.js",

    ])
    .pipe(sourcemaps.init())
    .pipe(concat("libs.min.js"))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(path.build.js));
  return src(path.src.js)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
};

const img = () => {
  return (
    src(path.src.img)
    .pipe(webp({
      quality: 70,
    }))
    .pipe(
      cache(
        imagemin({
          interlaced: true,
        })
      )
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(
      cache(
        imagemin({
          interlaced: true,
        })
      )
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
  );
};

const svgSprite = () => {
  return src(`${devFolder}/img/svg/*.svg`) // svg files for sprite
    .pipe(
      svgsprite({
        mode: {
          stack: {
            sprite: "../sprite.svg", //sprite file name
          },
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
          $("[class]").removeAttr("class");
          $("[width]").removeAttr("width");
          $("[height]").removeAttr("height");
          $("style").remove();
        },
        parserOptions: {
          xmlMode: true,
        },
      })
    )
    .pipe(gulp.dest(`${deployFolder}/img/svg/`));
};

const fonts = () => {
  src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));
  return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
};

const libs = () => {
  return src(path.src.libs).pipe(dest(path.build.libs));
};

// let filesToMove = [
//   './src/libs/**/*.*',
// ];

// gulp.task('move', ['clean'], function () {
//   // the base option sets the relative root for the set of files,
//   // preserving the folder structure
//   gulp.src(filesToMove, { base: './' })
//     .pipe(gulp.dest('dist'));
// });

gulp.task("otf2ttf", function () {
  return src([devFolder + "/fonts/*.otf"])
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(dest(devFolder + "/fonts/"));
});

const fontStyle = async () => {
  let fileContent = fileSystem.readFileSync(
    devFolder + "/scss/base/fonts.scss"
  );
  if (fileContent == "") {
    fileSystem.writeFile(devFolder + "/scss/base/fonts.scss", "", cb);
    return fileSystem.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let convertedFontName;
        for (var i = 0; i < items.length; i++) {
          let fontName = items[i].split(".");
          fontName = fontName[0];
          if (convertedFontName != fontName) {
            fileSystem.appendFile(
              devFolder + "/scss/base/fonts.scss",
              '@include font("' +
              fontName +
              '", "' +
              fontName +
              '", "400", "normal");\r\n',
              cb
            );
          }
          convertedFontName = fontName;
        }
      }
    });
  }
};

function cb() {}

const clearCache = () => {
  return cache.clearAll();
};

const clean = () => {
  return del(path.clean);
};

const watchFiles = () => {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], img);
};

const build = gulp.series(
  clean,
  gulp.parallel(libs, html, css, js, img, svgSprite, fonts)
);
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.svgSprite = svgSprite;
exports.fonts = fonts;
exports.clean = clean;
// exports.filesToMove = filesToMove;
exports.libs = libs;

exports.fontStyle = fontStyle;
exports.build = build;
exports.watch = watch;
exports.default = watch;