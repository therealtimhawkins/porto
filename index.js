#! /usr/bin/env node

const { getKillProcname } = require('./prompts')
const util = require('util')

const exec = util.promisify(require('child_process').exec)

const runBash = async (command) => {
  return await exec(command)
}

const run = async (searchTerm = process.argv[2] || '') => {
  const stdout = await getPortUsers()
  const parsedStdout = parseUsers(stdout, searchTerm)
  const response = await getKillProcname(formatProcesses(parsedStdout))
  killPort(response.process, parsedStdout)
}

const killPort = async (procname, array) => {
  const port = parsePort(procname)
  const pidObject = getPid(array, port)
  try {
    await runBash(`kill -9 ${pidObject.pid}`)
  } catch (err) {
    console.log(err)
  }
}

const getPid = (array, port) => {
  const result = array.filter(obj => {
    return obj.port === port
  })
  return result[0]
}

const formatProcesses = (items) => {
  return items.map((item) => {
    return `${item['procname']} on port .${item['port']}`;
  })
}

const getPortUsers = async (path) => {
  try {
    const { stdout } = await runBash(`netstat -Watnlv | grep -E 'LISTEN' | awk '{"ps -o comm= -p " $9 | getline procname; print cred "" $1 " | " $4 " | " $9  " | " procname;  }' | column -t -s " |"`)
    return stdout
  } catch (err) {
    console.log(err)
  }
}

const parsePort = (port) => {
  return port.split('.').pop()
}

const parseUsers = (users, searchTerm) => {
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
