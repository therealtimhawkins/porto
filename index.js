#! /usr/bin/env node

const { getKillProcname } = require('./src/prompts')
const { killPort, getProcesses } = require('./src/bash')
const parse = require('./src/parser')

const run = async (searchTerm = process.argv[2] || '') => {
  const stdout = await getProcesses()
  const parsedStdout = parse.processes(stdout, searchTerm)
  if (parsedStdout.length) {
    const { process } = await getKillProcname(parsedStdout)
    killPort(process, parsedStdout)
  } else {
    console.log('No processes matched your search.')
  }
}

run()
