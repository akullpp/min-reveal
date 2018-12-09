const gulp = require('gulp')

const fileInclude = require('gulp-file-include')
const connect = require('gulp-connect')
const plumber = require('gulp-plumber')
const useref = require('gulp-useref')
const replace = require('gulp-replace')

const del = require('del')
const runSequence = require('run-sequence')

gulp.task('serve', () =>
  connect.server({
    port: 3210,
    livereload: true,
    root: ['./build/', './node_modules/'],
  })
)

gulp.task('watch', function() {
  gulp.watch(['**/*.html'], { cwd: './src/' }, ['compile'])
  gulp.watch(['**/*'], { cwd: './src/assets/' }, ['assets'])
})

gulp.task('compile', () =>
  gulp
    .src(['./src/index.html'])
    .pipe(plumber())
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(gulp.dest('./build/'))
    .pipe(connect.reload())
)

gulp.task('assets', () =>
  gulp.src(['./src/assets/**/*']).pipe(gulp.dest('./build/assets/'))
)

gulp.task('clean', () => del('./build/'))

gulp.task('dist', () =>
  gulp
    .src('build/index.html')
    .pipe(useref({ searchPath: 'node_modules' }))
    .pipe(replace('reveal.js/plugin/highlight/highlight.js', 'assets/main.js'))
    .pipe(gulp.dest('build'))
)

gulp.task('build', () => runSequence('clean', 'assets', 'compile', 'dist'))

gulp.task('default', () =>
  runSequence('clean', 'assets', 'compile', 'serve', 'watch')
)
