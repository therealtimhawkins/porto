const inquirer = require('inquirer')

const formatProcesses = (processes) => {
  return processes.map((process) => {
    return process.message;
  })
}

const getKillProcname = (processes) => {
  return inquirer.prompt({
    name: 'message',
    type: 'list',
    message: 'Which process would you like to kill?',
    choices: formatProcesses(processes)
  })
}

module.exports = { getKillProcname }
