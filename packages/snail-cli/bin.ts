#!/usr/bin/env node
import { Command } from 'commander'
import fse from 'fs-extra'

const { readJsonSync } = fse
const { version } = readJsonSync('./package.json')

const program = new Command()
program.version(`snail-cli ${version}`).usage('<command> [options]')

program
  .command('build')
  .description('Build snail-admin form production')
  .action(async (options) => {
    const { build } = await import('./src/commands/build.js')

    return build(options)
  })

program
  .command('lint')
  .description('Lint code')
  .action(async () => {
    const { lint } = await import('./src/commands/lint.js')

    return lint()
  })

program
  .command('create:pck')
  .description('Create a package directory')
  .option('-n, --name <componentName>', 'Component name')
  .action(async (options) => {
    const { createPackage } = await import('./src/commands/package.js')
    return createPackage(options)
  })

program
  .command('create')
  .description('Create a component directory')
  .option('-i, --internal', 'snail internal mode')
  .option('-n, --name <componentName>', 'Component name')
  .option('-s, --sfc', 'Generate files in sfc format')
  .option('-t, --tsx', 'Generate files in tsx format')
  .option('-l, --locale', 'Generator internationalized files')
  .action(async (options) => {
    const { create } = await import('./src/commands/create.js')
    return create(options)
  })

program.parse()
