
const COMPONENT_PATH = 'components'

module.exports = {
  description: '创建文件，注意必须符合项目约束规范',
  prompts: [
    {
      type: 'input',
      name: 'componentName',
      message: '请输入组件文件夹名称'
    },
    {
      type: 'list',
      name: 'cssType',
      default: 'scss',
      choices: ['手动', 'sass', 'scss'],
      message: '请选择需要创建的sass类型?'
    },
    {
      type: 'confirm',
      name: 'isModel',
      default: true,
      message: '请选择需要创建Model?'
    }
  ],
  actions: data => {
    const { componentName, cssType, isModel } = data
    const toUpperFirstName = componentName.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
    const actions = []
    const path = `src/${COMPONENT_PATH}/{{ componentName }}/`
    if (componentName) {
      actions.push({
        type: 'add',
        path: `${path}/{{ componentName }}.tsx`,
        templateFile: 'src/.setting/template/view/component.hbs',
        data: {
          name: componentName,
          toUpperFirstName
        }
      })
    }
    if (cssType !== '手动') {
      actions.push({
        type: 'add',
        path: `${path}/${componentName}.${cssType}`,
        templateFile: 'src/.setting/template/view/css.hbs'
      })
    }

    if (isModel) {
      actions.push({
        type: 'add',
        path: `${path}/model.ts`,
        templateFile: 'src/.setting/template/view/model.hbs',
        data: {
          name: componentName,
          toUpperFirstName
        }
      })
    }
    return actions
  }
}
