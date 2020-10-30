const inquirer = require('inquirer')

const formatProcesses = (items) => {
  return items.map((item) => {
    return `${item['procname']} on port .${item['port']}`;
  })
}

const getKillProcname = (processes) => {
  return inquirer.prompt({
    name: 'process',
    type: 'list',
    message: 'What process would you like to kill?',
    choices: formatProcesses(processes)
  })
}

module.exports = { getKillProcname }
