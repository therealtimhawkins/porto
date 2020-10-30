const util = require('util')

const exec = util.promisify(require('child_process').exec)

const runBash = async (command) => {
  return await exec(command)
}

const getPid = (array, port) => {
  const result = array.filter(obj => {
    return obj.port === port
  })
  return result[0]
}

const killPort = async (procname, array) => {
  try {
    const port = parsePort(procname)
    const pidObject = getPid(array, port)
    await runBash(`kill -9 ${pidObject.pid}`)
  } catch (err) {
    console.log(err)
  }
}

const getProcesses = async (path) => {
  try {
    const { stdout } = await runBash(`netstat -Watnlv | grep -E 'LISTEN' | awk '{"ps -o comm= -p " $9 | getline procname; print cred "" $1 " | " $4 " | " $9  " | " procname;  }' | column -t -s " |"`)
    return stdout
  } catch (err) {
    console.log(err)
  }
}

module.exports = { killPort, getProcesses }
