const chalk = require('chalk')

const port = (port) => {
  return port.split('.').pop()
}

const processes = (processesString, searchTerm) => {
  const parsedProcesses = []
  const processLines = processesString.split('\n').filter((el) => {
    return el != ''
  })
  processLines.forEach(line => {
    const splitLine = line.split(' ').filter((el) => {
      return el != ''
    })

    const proto = splitLine[0]
    const pid = splitLine[2]
    const procname = splitLine[3]

    if (line.includes(searchTerm)) {
      parsedProcesses.push({
        proto,
        port: port(splitLine[1]),
        pid,
        procname,
        message: `Process ${chalk.magenta(procname)} on port: ${chalk.magenta(port(splitLine[1]))}, pid: ${chalk.magenta(pid)}`
      })
    }
  })
  return parsedProcesses
}

module.exports = {
  port, processes
}
