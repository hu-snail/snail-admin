import ejs from 'ejs'
import logger from '../shared/logger.js'
import { projRoot, dirname } from '../shared/path.js'
import { glob } from '../shared/fs.js'
import { kebabCase } from '@snail-admin/utils'
import { resolve } from 'path'
import inquirer from 'inquirer'
import fse from 'fs-extra'

const { pathExistsSync, copySync, readFileSync, writeFileSync, removeSync } = fse
const { prompt } = inquirer

type PackageStyle = 'compontent' | 'plugin'

export interface PackageCommandOptions {
  name?: string
  fullName?: string
  description?: string
}

interface RenderData {
  namespace?: string
  kebabCaseName?: string
  name?: string
  fullName?: string
  style: PackageStyle
  description?: string
}

async function renderTemplates(componentFolder: string, componentFolderName: string, renderData: RenderData) {
  const templates = await glob(`${componentFolder}/**/*.ejs`)
  templates.forEach((template) => {
    const templateCode = readFileSync(template, { encoding: 'utf-8' })
    const tempName = renderData.style === 'plugin' ? 'plugin' : 'comp'
    const filename = resolve(dirname, `../../../template/package/${tempName}_package.ejs`)
    const code = ejs.render(templateCode, renderData, { filename })
    const file = template.replace('.ejs', '')

    writeFileSync(file, code)
    removeSync(template)
  })
}

export async function createPackage(options: PackageCommandOptions) {
  logger.title('\n 🍀🍀Create a package ! \n')
  const namespace = 'snail'
  const renderData: RenderData = {
    namespace,
    kebabCaseName: 'component-name',
    style: 'compontent',
  }

  const { style } = await prompt({
    name: 'style',
    type: 'list',
    message: 'Switch the type of package to create ?',
    choices: [
      { name: 'compontent', value: 'compontent' },
      { name: 'plugin', value: 'plugin' },
    ],
    default: 'compontent',
  })

  const { name } = options.name
    ? options
    : await prompt({
        name: 'name',
        message: `Name of the ${style} package: `,
        default: renderData.kebabCaseName,
      })
  const kebabCaseName = kebabCase(name)
  const fullName = `${namespace}-${name}`

  const { description } = options.description
    ? options
    : await prompt({
        name: 'description',
        message: `description of the ${style} package: `,
        default: renderData.description,
      })

  Object.assign(renderData, { name, kebabCaseName, fullName, style, description })
  const componentFolder = resolve(projRoot, fullName)

  if (pathExistsSync(componentFolder)) {
    logger.warning(`${kebabCaseName} already exist and cannot be recreated...`)
    return
  }

  copySync(resolve(dirname, '../../../template/package'), componentFolder)
  await renderTemplates(componentFolder, kebabCaseName, renderData)

  removeSync(resolve(componentFolder, 'comp_package'))
  removeSync(resolve(componentFolder, 'plugin_package'))

  logger.success(`Create ${kebabCaseName} package success!`)
}
