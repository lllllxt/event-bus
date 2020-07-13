class ListenerOpts {
  fn: Function
  group: String
}

class EventBus {
  listener: Map<String, Array<ListenerOpts>>
  constructor(entries?: Array<[String, Array<ListenerOpts>]>) {
    this.listener = new Map(entries)
  }
  on(eventName: String, fn: Function, group: String = 'default') {
    if (typeof fn !== 'function') return false
    if (!this.listener.has(eventName)) this.listener.set(eventName, []) // 初始化事件列表
    this.listener.get(eventName).push({ fn, group })
  }
  once(eventName: String, fn: Function, group: String = 'default') {
    if (typeof fn !== 'function') return false
    const that = this
    function onceFn() {
      that.off(eventName, onceFn, group)
      fn.apply(that, arguments)
    }
    this.on(eventName, onceFn, group)
  }
  off(eventName: String, fnOrGroup: Function | String, group: String) {
    const _lser = this.listener.get(eventName) || []
    let _filterLser = null
    if (!eventName) {
      // 取消所有订阅
      this.listener.clear()
      return
    }
    if (!fnOrGroup) {
      // 取消所有eventName订阅
      this.listener.delete(eventName)
      return
    }
    if (!group) {
      // 取消eventName+fn/group订阅
      _filterLser = _lser.filter((listener) => listener.fn !== fnOrGroup && listener.group !== fnOrGroup)
    } else {
      // 取消eventName+fn+group订阅
      _filterLser = _lser.filter((listener) => listener.group !== group || listener.fn !== fnOrGroup)
    }
    if (_filterLser.length > 0) {
      this.listener.set(eventName, _filterLser)
    } else {
      this.listener.delete(eventName)
    }
  }
  emit(eventName: String, ...args: any[]) {
    const _lser = this.listener.get(eventName) || []
    _lser.forEach((listener) => {
      listener.fn.call(this, ...args)
    })
  }
}

export default new EventBus()
