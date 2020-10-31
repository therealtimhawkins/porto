const inquirer = require('inquirer')

const formatProcesses = (items) => {
  return items.map((item) => {
    return item.message;
  })
}

const getKillProcname = (processes) => {
  return inquirer.prompt({
    name: 'message',
    type: 'list',
    message: 'What process would you like to kill?',
    choices: formatProcesses(processes)
  })
}

module.exports = { getKillProcname }
