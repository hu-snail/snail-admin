import { src, series, parallel, dest } from 'gulp'
import { loginRoot } from '../shared/path'
import autoprefixer from 'gulp-autoprefixer'
import { run } from './src/utils/run'
import { resolve } from 'path'

const sass = require('gulp-sass')(require('sass'))

const buildPath = resolve(__dirname, '.')

export const buildStyle = () =>
  src(`${loginRoot}/src/**/**/style/**.scss`)
    .pipe(sass())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(dest(`${loginRoot}/lib/src`))
    .pipe(dest(`${loginRoot}/es/src`))

export const buildComponent = async () => {
  await run('pnpm build', buildPath)
}

const runTask: any = series(
  parallel(
    async () => buildComponent(),
    async () => buildStyle(),
  ),
)

export default runTask
