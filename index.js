#! /usr/bin/env node

const chalk = require('chalk')
const { getKillProcname } = require('./src/prompts')
const { killPort, getProcesses } = require('./src/bash')
const parse = require('./src/parser')

const run = async (searchTerm = process.argv[2] || '') => {
  const stdout = await getProcesses()
  const parsedStdout = parse.processes(stdout, searchTerm)
  if (parsedStdout.length) {
    if (parsedStdout.length === 1) {
      console.log(chalk.cyan(`🕵️‍♂️  Found ${chalk.magenta(parsedStdout.length)} process...`))
    } else {
      console.log(chalk.cyan(`🕵️‍♂️  Found ${chalk.magenta(parsedStdout.length)} processes...`))
    }
    const { message } = await getKillProcname(parsedStdout)
    const process = await killPort(message, parsedStdout)
    console.log(chalk.cyan(`🔫 Killed process ${chalk.magenta(process.procname)} on port ${chalk.magenta(process.port)}`))
  } else {
    console.log(chalk.cyan('🙈 No processes matched your search'))
  }
}

run()
