# event-bus

> 事件处理器(广播/订阅)，可设置分组，按分组取消订阅

### 通过npm安装
```
npm i @lllllxt/event-bus
```

```
import EventBus from '@lllllxt/event-bus'

const EventBus = request('@lllllxt/event-bus')
```


### 通过```<script>```标签引用
[event-bus.min.js](https://github.com/lllllxt/event-bus/blob/master/event-bus.min.js)

此方法是向window对象中注册一个 ```EventBus``` 对象

#### 说明
方法 | 描述
---|---
EventBus.on(eventName: String, fn: Function, group?: String = 'default') | 订阅
EventBus.once(eventName: String, fn: Function, group?: String = 'default') | 订阅一次
[EventBus.off(eventName?: String, fnOrGroup?: Function  String, group?: String)](#EventBus.off)| 取消订阅
EventBus.emit(eventName: String, ...args: any[]) | 广播事件

###### EventBus.off
*渐进式精准取消订阅*

1. eventName为空时取消全部订阅；
1. fnOrGroup为空时取消所有eventName订阅；
1. group为空时取消匹配到fnOrGroup的所有eventName订阅。
## License
This project is licensed under the MIT License
