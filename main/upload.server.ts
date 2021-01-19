const serInfo = JSON.parse(process.env.npm_config_argv).cooked
const server = {
  host: serInfo[2], // 服务器ip
  port: '22', // 端口一般默认22
  username: serInfo[3] || 'root', // 用户名
  password: serInfo[4] || 'root', // 密码
  pathNmae: '/usr/soft/cloudadmin/static', // 上传到服务器的位置
  locaPath: './dist/' // 本地打包文件的位置
}

const argv1 = process.argv
console.log(argv1)
console.log(serInfo)
// 引入scp2
const client = require('scp2')
const ora = require('ora')
const spinner = ora('正在发布到服务器...')

const Client = require('ssh2').Client
const conn = new Client()

console.log('正在建立连接')
conn.on('ready', function() {
  console.log('已连接')
  if (!server.pathNmae) {
    console.log('连接已关闭')
    conn.end()
    return false
  }

  conn.exec('rm -rf' + server.pathNmae + '/*', function(err, stream) {
    console.log(err + '删除文件')
    stream.on('close', function(code, signal) {
      console.log('开始上传')
      spinner.start()
      client.scp(server.locaPath, {
        'host': server.host,
        'port': server.port,
        'username': server.username,
        'password': server.password,
        'path': server.pathNmae
      // eslint-disable-next-line max-nested-callbacks
      }, err => {
        spinner.stop()
        if (!err) {
          console.log('项目发布完毕')
        } else {
          console.log('err', err)
        }
        conn.end()
      })
    })
  })
}).connect({
  host: server.host,
  port: server.port,
  username: server.username,
  password: server.password
  // privateKey: '' // 私秘钥
})
