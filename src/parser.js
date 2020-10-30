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

    if (line.includes(searchTerm)) {
      parsedUsers.push({
        proto: splitLine[0],
        port: port(splitLine[1]),
        pid: splitLine[2],
        procname: splitLine[3]
      })
    }
  })
  return parsedUsers
}

module.exports = {
  port, processes
}
