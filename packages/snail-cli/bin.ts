#!/usr/bin/env node
import { Command } from 'commander'
import fse from 'fs-extra'
import logger from './src/shared/logger.js'

const { readJsonSync } = fse
const { version } = readJsonSync('./package.json')

const program = new Command()
logger.title('\n 🍀🍀snail-cli tools ! \n')
program.version(`snail-cli ${version}`).usage('<command> [options]')

program
  .command('create')
  .description('Create a component directory')
  .option('-i, --internal', 'varlet internal mode')
  .option('-n, --name <componentName>', 'Component name')
  .option('-s, --sfc', 'Generate files in sfc format')
  .option('-t, --tsx', 'Generate files in tsx format')
  .option('-l, --locale', 'Generator internationalized files')
  .action(async (options) => {
    const { create } = await import('./src/commands/create.js')

    return create(options)
  })

program.parse()
