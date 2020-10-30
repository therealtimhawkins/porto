#! /usr/bin/env node

const { getKillProcname } = require('./src/prompts')
const { killPort, getProcesses }= require('./src/bash')

const run = async (searchTerm = process.argv[2] || '') => {
  const stdout = await getProcesses()
  const parsedStdout = parseProcesses(stdout, searchTerm)
  if (parsedStdout.length) {
    const { process } = await getKillProcname(parsedStdout)
    killPort(process, parsedStdout)
  } else {
    console.log('No processes matched your search.')
  }
}

const parsePort = (port) => {
  return port.split('.').pop()
}

const parseProcesses = (users, searchTerm) => {
  const parsedUsers = []
  const lines = users.split('\n').filter((el) => {
    return el != ''
  })
  lines.forEach(line => {
    const splitLine = line.split(' ').filter((el) => {
      return el != ''
    })

    if (line.includes(searchTerm)) {
      parsedUsers.push({
        proto: splitLine[0],
        port: parsePort(splitLine[1]),
        pid: splitLine[2],
        procname: splitLine[3]
      })
    }
  })
  return parsedUsers
}

run()
