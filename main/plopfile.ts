const createPageTemplate = require('./src/.setting/plop/page.ts')
const createApiTemplate = require('./src/.setting/plop/api.ts')
const createComponentTemplate = require('./src/.setting/plop/component.ts')

function cli(plop) {
  plop.setGenerator('page', createPageTemplate) // 创建页面模板
  plop.setGenerator('api', createApiTemplate) // 创建api模块文件
  plop.setGenerator('component', createComponentTemplate) // 创建组件模板
}

module.exports = cli
