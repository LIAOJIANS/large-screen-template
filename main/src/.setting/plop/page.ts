const PAGE_PATH = 'pages'

module.exports = {
  description: '创建文件，注意必须符合项目约束规范',
  prompts: [
    {
      type: 'input',
      name: 'pageName',
      message: '请输入页面文件夹名称'
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
    const { pageName, cssType, isModel } = data
    const toUpperFirstName = pageName.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
    
    const actions = []
    // const name = '{{pageName}}'
    const path = `src/${PAGE_PATH}/{{ pageName }}/`
    if (pageName) {
      actions.push({
        type: 'add',
        path: `${path}/index.tsx`,
        templateFile: 'src/.setting/template/view/page.hbs',
        data: {
          name: pageName,
          toUpperFirstName
        }
      })
    }
    if (cssType !== '手动') {
      actions.push({
        type: 'add',
        path: `${path}/${pageName}.${cssType}`,
        templateFile: 'src/.setting/template/view/css.hbs'
      })
    }

    if (isModel) {
      actions.push({
        type: 'add',
        path: `${path}/model.ts`,
        templateFile: 'src/.setting/template/view/model.hbs',
        data: {
          name: pageName,
          toUpperFirstName
        }
      })
    }
    actions.push({
      type: 'append',
      path: 'src/module/routerLink.tsx',
      pattern: /\= \[/,
      templateFile: 'src/.setting/template/router/config.hbs',
      data: {
        name: pageName,
        toUpperFirstName
      }
    })

    actions.push({
      type: 'append',
      path: 'src/module/routerLink.tsx',
      pattern: /[\\s\\S]*?/,
      templateFile: 'src/.setting/template/router/import.hbs',
      data: {
        name: pageName,
        toUpperFirstName
      }
    })


    return actions
  }
}
