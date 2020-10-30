const { getKillProcname } = require('./prompts')
const util = require('util')

const exec = util.promisify(require('child_process').exec)

const runBash = async (command) => {
  return await exec(command)
}

const run = async (searchTerm) => {
  const stdout = await getPortUsers()
  const parsedStdout = parseUsers(stdout, searchTerm)
  const procname = await getKillProcname(formatProcesses(parsedStdout))
}

const formatProcesses = (items) => {
  return items.map((item) => {
    return `${item['procname']} on port ${item['port']}`;
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
        port: splitLine[1],
        pid: splitLine[2],
        procname: splitLine[3]
      })
    }
  })
  console.log(parsedUsers)
  return parsedUsers
}

run('mysql')


// netstat -Watnlv | grep LISTEN | awk '{"ps -o comm= -p " $9 | getline procname; print cred "proto: " colclr $1 colred " | addr.port: " colclr $4 colred " | pid: " colclr $9 colred " | name: " colclr procname;  }' | column -t -s "|"
