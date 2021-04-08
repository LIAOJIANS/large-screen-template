
export interface InterUser {
  userInfo: InterUserInfo,
  token: string
}

export interface InterUserInfo {
  roles?: string,
  avatar?: string,
  name?: string
}
