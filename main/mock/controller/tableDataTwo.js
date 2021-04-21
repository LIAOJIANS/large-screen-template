// 模拟大部分后端返回数据
const data = []

let i = j = 0
while(i <= 10) {
  j = 0
  while(j < 4) {
    data[i] = {
      ...data[i],
      [`column${i+1}-${j+1}`]:  `行${i + 1}列${j + 1}`
    }
    j++
  }
  i++
}

module.exports = [
  {
    url: '/table_data_two',
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
