const inquirer = require("inquirer")

const formatProcesses = (processes) => {
  const formattedProcesses = processes.map((process) => {
    return process.message
  })
  formattedProcesses.push("exit")
  return formattedProcesses
}

const getKillProcname = (processes) => {
  return inquirer.prompt({
    name: "message",
    type: "list",
    message: "Which process would you like to kill?",
    choices: formatProcesses(processes),
  })
}

module.exports = { getKillProcname }
