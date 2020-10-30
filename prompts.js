const inquirer = require('inquirer')

const getKillProcname = (processes) => {
  return inquirer.prompt({
    name: 'process',
    type: 'list',
    message: 'What process would you like to kill?',
    choices: processes
  })
}

module.exports = { getKillProcname }
