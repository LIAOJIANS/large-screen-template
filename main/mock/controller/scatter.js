const data = [
  {
    id: "5fe1d6e47fce68bd45417b18",
    d2: "59",
    d3: "1112.7",
    d6: null,
    d1: "袁州区人民政府",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b19",
    d2: "34",
    d3: "27459.2",
    d6: null,
    d1: "市综合行政执法局",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b1a",
    d2: "29",
    d3: "16.2",
    d6: null,
    d1: "丰城市人民政府",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b1b",
    d2: "28",
    d3: "567.4",
    d6: null,
    d1: "高安市人民政府",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b1c",
    d2: "17",
    d3: "14890.9",
    d6: null,
    d1: "宜阳新区管委会",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b1d",
    d2: "12",
    d3: "8.4",
    d6: null,
    d1: "樟树市人民政府",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b1e",
    d2: "10",
    d3: "53.6",
    d6: null,
    d1: "靖安县人民政府",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b1f",
    d2: "8",
    d3: "1976.6",
    d6: null,
    d1: "万载县人民政府",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b20",
    d2: "6",
    d3: "2669.6",
    d6: null,
    d1: "奉新县人民政府",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b21",
    d2: "3",
    d3: "229.4",
    d6: null,
    d1: "国家税务总局宜春市税务局",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b22",
    d2: "3",
    d3: "2.2",
    d6: null,
    d1: "市住建局",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b23",
    d2: "3",
    d3: "1568",
    d6: null,
    d1: "移动宜春分公司",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b24",
    d2: "3",
    d3: "34054.6",
    d6: null,
    d1: "市公安局",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b25",
    d2: "3",
    d3: "5.1",
    d6: null,
    d1: "宜丰县人民政府",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b26",
    d2: "3",
    d3: "5906.2",
    d6: null,
    d1: "铜鼓县人民政府",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b27",
    d2: "3",
    d3: "22084.2",
    d6: null,
    d1: "明月山温泉风景名胜区管委会",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b28",
    d2: "3",
    d3: "1.6",
    d6: null,
    d1: "上高县人民政府",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b29",
    d2: "2",
    d3: "15950.7",
    d6: null,
    d1: "市卫生健康委员会",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b2a",
    d2: "1",
    d3: "336",
    d6: null,
    d1: "国网宜春供电公司",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b2b",
    d2: "1",
    d3: "10.4",
    d6: null,
    d1: "宜春交通投资集团有限公司",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b2c",
    d2: "1",
    d3: "0",
    d6: null,
    d1: "市110指挥中心",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b2d",
    d2: "1",
    d3: "88.2",
    d6: null,
    d1: "市教育体育局",
    d4: null,
    d5: null
  },
  {
    id: "5fe1d6e47fce68bd45417b2e",
    d2: "1",
    d3: "3.9",
    d6: null,
    d1: "宜春经开区管委会",
    d4: null,
    d5: null
  }
]

const finayData = {
  data
}


module.exports = [
  {
    url: '/page_scatter',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: finayData,
      }
    },
  },
]
