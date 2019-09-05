import gulp from 'gulp';
import append from 'gulp-add-src';
import babel from 'gulp-babel';
import del from 'del';

var config = {
  paths: {
    js: {
      src: 'src/**/*.js',
      dist: 'dist/'
    }
  }
};

gulp.task('clean', () => {
  return del(config.paths.js.dist);
});

gulp.task('babel', () => {
  return gulp.src(config.paths.js.src)
    .pipe(babel())
    .pipe(append('src/resources.json'))
    .pipe(gulp.dest(config.paths.js.dist));
});

gulp.task('watch', () => {
  gulp.watch(config.paths.js.src, ['babel']);
});

gulp.task('default', gulp.series('clean', 'babel'));
