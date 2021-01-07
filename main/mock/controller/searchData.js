module.exports = [
  {
    url: '/search_data',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data:  [
          { label: '条件1', val: '条件1' },
          { label: '条件2', val: '条件2' },
          { label: '条件3', val: '条件3' },
          { label: '条件4', val: '条件4' },
        ],
      }
    },
  },
]
