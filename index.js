const util = require('util')

const exec = util.promisify(require('child_process').exec)

const runBash = async (command) => {
  return await exec(command)
}

const getPortUsers = async (path) => {
  try {
    const { stdout } = await runBash(`netstat -Watnlv | grep LISTEN | awk '{"ps -o comm= -p " $9 | getline procname; print cred "" $1 " | " $4 " | " $9  " | " procname;  }' | column -t -s " |"`)
    return parseUsers(stdout)
  } catch (err) {
    console.log(err)
  }
}

const parseUsers = (users) => {
  const parsedUsers = []
  const lines = users.split('\n').filter((el) => {
    return el != ''
  })
  lines.forEach(line => {
    const splitLine = line.split(' ').filter((el) => {
      return el != ''
    })
    console.log(splitLine)
    parsedUsers.push({
      proto: splitLine[0],
      port: splitLine[1],
      pid: splitLine[2],
      procname: splitLine[3]
    })
    console.log(parsedUsers)
  })
}

getPortUsers()


// netstat -Watnlv | grep LISTEN | awk '{"ps -o comm= -p " $9 | getline procname; print cred "proto: " colclr $1 colred " | addr.port: " colclr $4 colred " | pid: " colclr $9 colred " | name: " colclr procname;  }' | column -t -s "|"
