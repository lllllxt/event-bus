import EventBus from '../src/event-bus.ts'
const fn1 = jest.fn()
const fn1_1 = jest.fn()
const fn2 = jest.fn()
const fn3 = jest.fn()

describe('test EventBus', () => {
  test('', () => {
    EventBus.on('eve1', fn1)
    EventBus.on('eve1', fn1, 'g2') // 1
    EventBus.on('eve1', fn1, 'g3')
    EventBus.on('eve1', fn1, 'g4') // 2
    EventBus.on('eve1', fn1_1, 'g2') // 1

    EventBus.emit('eve1')
    expect(fn1).toHaveBeenCalledTimes(4)
    expect(fn1_1).toHaveBeenCalledTimes(1)
    EventBus.off('eve1', 'g2')
    EventBus.emit('eve1')
    expect(fn1).toHaveBeenCalledTimes(7)
    expect(fn1_1).toHaveBeenCalledTimes(1)
    EventBus.off('eve1', fn1, 'g3')
    EventBus.emit('eve1')
    expect(fn1).toHaveBeenCalledTimes(9)
    expect(fn1_1).toHaveBeenCalledTimes(1)
    EventBus.off('eve1', fn1)
    EventBus.emit('eve1')
    expect(fn1).toHaveBeenCalledTimes(9)
    expect(fn1_1).toHaveBeenCalledTimes(1)

    EventBus.once('eve2', fn2)
    EventBus.emit('eve2')
    EventBus.emit('eve2')
    expect(fn2).toHaveBeenCalledTimes(1)
  })

  test('delete by group', () => {
    EventBus.on('eve1', fn3, 'g1')
    EventBus.on('eve1', fn3, 'g1')
    EventBus.on('eve1', fn3, 'g1')
    EventBus.on('eve1', fn3, 'g1')
    EventBus.on('eve1', fn3, 'g1')
    EventBus.removeGroup('g1')
    console.log(EventBus.listener)
    EventBus.emit('eve1')
    expect(fn3).toHaveBeenCalledTimes(0)
  })
})
