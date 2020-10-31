const util = require('util')

const exec = util.promisify(require('child_process').exec)

const runBash = async (command) => {
  return await exec(command)
}

const getPid = (processes, message) => {
  const process = processes.filter(process => {
    return process.message === message
  })
  return process[0]
}

const killPort = async (message, processes) => {
  try {
    const pidObject = getPid(processes, message)
    await runBash(`kill -9 ${pidObject.pid}`)
    return pidObject
  } catch (err) {
    console.log(err)
  }
}

const getProcesses = async () => {
  try {
    const { stdout } = await runBash(`
      netstat -Watnlv | grep -E 'LISTEN' | awk '{"ps -o comm= -p " $9 | getline procname; print cred "" $1 " | " $4 " | " $9  " | " procname;  }' | column -t -s " |"`)
    return stdout
  } catch (err) {
    console.log(err)
  }
}

module.exports = { killPort, getProcesses }
