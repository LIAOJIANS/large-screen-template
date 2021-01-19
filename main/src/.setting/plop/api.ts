
const API_PATH = 'api'

module.exports = {
  description: '创建文件，注意必须符合项目约束规范',
  prompts: [
    {
      type: 'input',
      name: 'apiName',
      message: '请输入api文件名称'
    }
  ],
  actions: data => {
    const { apiName } = data
    const toUpperFirstName = apiName.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
    const actions = []
    const path = `src/${API_PATH}`
    if (apiName) {
      actions.push({
        type: 'add',
        path: `${path}/{{ apiName }}.ts`,
        templateFile: 'src/.setting/template/api/api.hbs',
        data: {
          name: apiName,
          toUpperFirstName
        }
      })
    }
    return actions
  }
}
