const gulp = require('gulp')
const del = require('del')
const cache = require('gulp-cached')
const tslint = require('gulp-tslint')
const exec = require('child_process').exec
const argv = require('yargs')
  .boolean('failOnError')
  .default('failOnError', false)
  .argv

const PATHS = {
  src: ['./index.ts', './src/**/*.ts'],
  bundle: 'bundle',
  typings: 'typings/index.d.ts',
  tsInline: 'temp/inline/',
}

gulp.task('lint', () => gulp.src(PATHS.src)
  .pipe(cache('lint'))
  .pipe(tslint({ formatter: 'prose' }))
  .pipe(tslint.report({
    emitError: argv.failOnError,
    summarizeFailureOutput: true,
  })))

gulp.task('compile', done => {
  exec(`tsc -p ./tsconfig.json`, err => err ? console.log(err) : done())
    .stdout
    .on('data', data => console.log(data))
})

gulp.task('build:clean', () => del([PATHS.bundle]))

gulp.task('build', gulp.series('lint', 'compile'))
gulp.task('build:watch', () => gulp.watch([PATHS.src], gulp.series('lint', 'compile')))

gulp.task('default', gulp.series('build'))

