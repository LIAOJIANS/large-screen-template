
const data = [
  {
    name: '周口',
    value: 55
  },
  {
    name: '南阳',
    value: 120
  },
  {
    name: '西峡',
    value: 78
  },
  {
    name: '驻马店',
    value: 66
  },
  {
    name: '新乡',
    value: 80
  },
  {
    name: '信阳',
    value: 45
  },
  {
    name: '漯河',
    value: 29
  }
]


module.exports = [
  {
    url: '/ranking_data_one',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: data,
      }
    },
  },
]
