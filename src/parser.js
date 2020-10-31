const port = (port) => {
  return port.split('.').pop()
}

const  processes = (users, searchTerm) => {
  const parsedUsers = []
  const lines = users.split('\n').filter((el) => {
    return el != ''
  })
  lines.forEach(line => {
    const splitLine = line.split(' ').filter((el) => {
      return el != ''
    })

    const proto = splitLine[0]
    const pid = splitLine[2]
    const procname = splitLine[3]

    if (line.includes(searchTerm)) {
      parsedUsers.push({
        proto,
        port: port(splitLine[1]),
        pid,
        procname,
        message: `Process ${procname} on port: ${port(splitLine[1])}, pid: ${pid}`
      })
    }
  })
  return parsedUsers
}

module.exports = {
  port, processes
}
