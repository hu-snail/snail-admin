import ejs from 'ejs'
import logger from '../shared/logger.js'
import { loginTemplateRoot, layoutTemplateRoot, dirname } from '../shared/path.js'
import { glob } from '../shared/fs.js'
import { bigCamelize, kebabCase, camelize } from '@snail-admin/utils'
import { resolve } from 'path'
import inquirer from 'inquirer'
import fse from 'fs-extra'

const { pathExistsSync, copySync, readFileSync, writeFileSync, removeSync } = fse
const { prompt } = inquirer

type CodingStyle = 'tsx' | 'vue'

export interface CreateCommandOptions {
  internal?: boolean
  name?: string
  locale?: boolean
  sfc?: boolean
  tsx?: boolean
}

interface RenderData {
  kebabCaseName: string
  bigCamelizeName: string
  camelizeName: string
  locale?: boolean
  style: CodingStyle
  namespace: string
  bigCamelizeNamespace: string
  createType: string
}

async function renderTemplates(
  type: string,
  componentFolder: string,
  componentFolderName: string,
  renderData: RenderData,
) {
  const templates = await glob(`${componentFolder}/**/*.ejs`)
  if (type !== 'login') renderData.createType = ''
  templates.forEach((template) => {
    const templateCode = readFileSync(template, { encoding: 'utf-8' })
    const code = ejs.render(templateCode, renderData)
    const file = template
      .replace('[componentName]', componentFolderName)
      .replace('[ComponentName]', componentFolderName)
      .replace('.ejs', '')

    writeFileSync(file, code)
    removeSync(template)
  })
}

export async function create(options: CreateCommandOptions) {
  logger.title('\n 🍀🍀Create a component ! \n')
  const namespace = 'sn'
  const renderData: RenderData = {
    namespace,
    bigCamelizeNamespace: bigCamelize(namespace),
    kebabCaseName: 'component-name',
    bigCamelizeName: 'ComponentName',
    camelizeName: 'componentName',
    style: 'vue',
    createType: 'login',
  }

  const { type } = await prompt({
    name: 'type',
    type: 'list',
    message: 'Which create type ?',
    choices: [
      { name: 'login', value: 'login' },
      { name: 'layout', value: 'layout' },
    ],
    default: 'login',
  })

  const { name } = options.name
    ? options
    : await prompt({
        name: 'name',
        message: 'Name of the component created: ',
        default: renderData.kebabCaseName,
      })

  const kebabCaseName = kebabCase(name)
  const bigCamelizeName = bigCamelize(name)
  const camelizeName = camelize(name)
  const createType = bigCamelize(type)

  Object.assign(renderData, { kebabCaseName, bigCamelizeName, camelizeName, createType, type })
  let componentFolder = ''
  switch (type) {
    case 'login':
      componentFolder = resolve(loginTemplateRoot, kebabCaseName)
      break
    case 'layout':
      componentFolder = resolve(layoutTemplateRoot, kebabCaseName)
      break
    default:
      break
  }

  if (pathExistsSync(componentFolder)) {
    logger.warning(`${kebabCaseName} already exist and cannot be recreated...`)
    return
  }

  if (options.sfc || options.tsx) {
    renderData.style = options.sfc ? 'vue' : 'tsx'
  } else {
    const { style } = await prompt({
      name: 'style',
      type: 'list',
      message: 'Which style do you use to write your component ?',
      choices: [
        { name: 'sfc', value: 'vue' },
        { name: 'tsx', value: 'tsx' },
      ],
      default: 'vue',
    })

    renderData.style = style
  }
  copySync(resolve(dirname, '../../../template/create'), componentFolder)
  await renderTemplates(type, componentFolder, kebabCaseName, renderData)
  if (renderData.style !== 'vue') {
    removeSync(resolve(componentFolder, `${renderData.kebabCaseName}.vue`))
  }

  if (renderData.style !== 'tsx') {
    removeSync(resolve(componentFolder, `${renderData.kebabCaseName}.tsx`))
  }

  logger.success(`Create ${kebabCaseName} component success!`)
}
