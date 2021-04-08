const tokens = {
  admin: {
    token: 'admin-token'
  }
}

const users = {
  "admin-token": {
    roles: ['admin'],
    avatar: '',
    name: 'super admin'
  }
}

module.exports = [
  {
    url: '/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      if(!token) {
        return {
          code: 0,
          messages: '登录失败'
        }
      }

      return {
        code: 200,
        msg: '登录成功',
        data: token
      }
    }
  },

  {
    url: '/user/info',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      if (!info) {
        return {
          code: 50008,
          message: '未登录'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  }
]