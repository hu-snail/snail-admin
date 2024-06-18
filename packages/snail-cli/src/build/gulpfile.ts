import { src, series, parallel, dest } from 'gulp'
import { Transform } from 'stream'
import { pkgRoot } from '../shared/path.js'
import autoprefixer from 'gulp-autoprefixer'
import cssnano from 'cssnano'
import postcss from 'postcss'
import { run } from './src/utils/run.js'
import { resolve, basename } from 'path'
import chalk from 'chalk'
import consola from 'consola'

const sass = require('gulp-sass')(require('sass'))

const buildPath = resolve(__dirname, '.')

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

export const buildStyle = () =>
  src(`${ROOT_PATH}/src/**/**/style/**.scss`)
    .pipe(sass())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(compressWithCssnano())
    .pipe(dest(`${ROOT_PATH}/lib/src`))
    .pipe(dest(`${ROOT_PATH}/es/src`))

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
