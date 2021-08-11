import './messages.scss'

export enum enumMessageType {
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  ERROR = 'error'
}

export interface InterMessagesProps {
  title: string, // 提示内容
  type: enumMessageType, // 类型（只允许传枚举中的一种）
  duration?: number, // 间隔时间
  showClose?: boolean, // 是否显示关闭icon
  center?: boolean, // 是否剧中
  offset?: number // 偏移量
}

export default class Messages {
  private options: InterMessagesProps;

  private colorObj = {
    [enumMessageType.SUCCESS]: {
      color: '#67C284',
      bg: '#F0F9EB',
      icon: 'icon-xiaoxi-chenggong'
    },

    [enumMessageType.WARNING]: {
      bg: '#FDF6EC',
      color: '#E6A242',
      icon: 'icon-jinggao'
    },

    [enumMessageType.INFO]: {
      bg: '#EDF2FC',
      color: '#909399',
      icon: 'icon-jinggao'
    },

    [enumMessageType.ERROR]: {
      bg: '#FEF0F0',
      color: '#F66E6C',
      icon: 'icon-shibai'
    }
  }

  constructor(options: InterMessagesProps) {
    this.options = {
      duration: 3000,
      showClose: false,
      center: false,
      offset: 20,
      ...options
    }

    this.initMessages()
  }

  initMessages() {
    this.getEleDom('#root')?.appendChild(this.messageDom())
  }

  messageDom() {
    const { offset, type, duration } = this.options
    const { bg, color, icon } = this.colorObj[type]
    const MessageDom = document.createElement('div')
    MessageDom.className = 'large_message'
    MessageDom.style.top = `${offset}px`
    MessageDom.style.background = `${bg}`
    MessageDom.style.color = `${color}`
    MessageDom.style.border = `1px solid ${color}`

    const timersNow = setTimeout(() => {
      MessageDom.style.opacity = `1`
      MessageDom.style.right = `5%`
      clearTimeout(timersNow)
    }, 0)

    const timer = setTimeout(() => {
      MessageDom.style.opacity = `0`
      MessageDom.style.right = `-100%`
      clearTimeout(timer)
    }, duration)

    const clearDom = setTimeout(() => {
      this.close()
      clearTimeout(clearDom)
    }, duration as number + 400)

    MessageDom.appendChild(this.childDom())
    MessageDom.insertBefore(this.iconDom(icon), MessageDom.firstChild)
    return MessageDom
  }

  iconDom(icon: string) {
    const iconDom = document.createElement('i')
    iconDom.className = `iconfont ${icon}`

    return iconDom
  }

  close() {
    this.getEleDom('.large_message')?.remove()
  }

  childDom() {
    const { title, center } = this.options
    const childDom = document.createElement('p')
    childDom.className = 'large_message_child'
    childDom.innerHTML = title
    childDom.style.textAlign = center ? 'center' : 'left'
    return childDom
  }

  getEleDom(dom: string) {
    return document.querySelector(dom)
  }
}
