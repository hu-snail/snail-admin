import { src, series, parallel, dest } from 'gulp'
import { Transform } from 'stream'
import { pkgRoot } from '../shared/path.js'
import autoprefixer from 'gulp-autoprefixer'
import cssnano from 'cssnano'
import postcss from 'postcss'
import { resolve, basename } from 'path'
import chalk from 'chalk'
import consola from 'consola'
import fse from 'fs-extra'
import { build as buildVite } from 'vite'
import { buildFullConfig } from './build.full.config'
import buildConfig from './build.config'

const { removeSync } = fse
const sass = require('gulp-sass')(require('sass'))

function compressWithCssnano() {
  const processor = postcss([
    cssnano({
      preset: [
        'default',
        {
          // avoid color transform
          colormin: false,
          // avoid font transform
          minifyFontValues: false,
        },
      ],
    }),
  ])
  return new Transform({
    objectMode: true,
    transform(chunk, _encoding, callback) {
      const file = chunk as any
      if (file.isNull()) {
        callback(null, file)
        return
      }
      if (file.isStream()) {
        callback(new Error('Streaming not supported'))
        return
      }
      const cssString = file.contents!.toString()
      processor.process(cssString, { from: file.path }).then((result) => {
        const name = basename(file.path)
        file.contents = Buffer.from(result.css)
        consola.success(
          `${chalk.cyan(name)}: ${chalk.yellow(
            cssString.length / 1000,
          )} KB -> ${chalk.green(result.css.length / 1000)} KB`,
        )
        callback(null, file)
      })
    },
  })
}

const ROOT_PATH = `/${pkgRoot}/${process.env.COMP_NAME}`

const reomveFile = async () => {
  await removeSync(`${ROOT_PATH}/lib`)
  await removeSync(`${ROOT_PATH}/es`)
  await removeSync(`${ROOT_PATH}/dist`)
}
export const buildStyle = () =>
  src(`${ROOT_PATH}/src/**/**/style/**.scss`)
    .pipe(sass())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(compressWithCssnano())
    .pipe(dest(`${ROOT_PATH}/lib/src`))
    .pipe(dest(`${ROOT_PATH}/es/src`))

export const buildComponent = async () => {
  await reomveFile()
  await buildVite(buildConfig)
  await buildVite(buildFullConfig(true))
  await buildVite(buildFullConfig(false))
}

const runTask: any = series(
  parallel(
    async () => buildComponent(),
    async () => buildStyle(),
  ),
)

export default runTask
