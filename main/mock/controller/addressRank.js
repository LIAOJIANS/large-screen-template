
const data = {
  square: [],
  capsule: [],
  progress: []
}

let i = 0
while(i < 5) {
  data.square.push({
    name: '山西省',
    value: Math.floor(Math.random(0, 1) * 10000)
  })

  data.capsule.push({
    name: `南阳${i + 1}`,
    value: Math.floor(Math.random(0, 1) * 1000)
  })

  data.progress.push({
    name: '平遥古城',
    value: Math.floor(Math.random(0, 1) * 100)
  })

  i++
}


module.exports = [
  {
    url: '/page_address_rank',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data
      }
    }
  }
]