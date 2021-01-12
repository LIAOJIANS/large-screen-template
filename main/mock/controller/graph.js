const fs = require('fs')
const path = require('path')

const gexf= fs.readFileSync(path.resolve(__dirname, "../data/les-miserables.gexf"))

module.exports = [
  {
    url: '/page_graph',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: String(gexf),
      }
    },
  },
]