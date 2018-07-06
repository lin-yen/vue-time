const EventEmitter = require('events')
const dateformat = require('dateformat')

function Time() {
  this._date = new Date()
  this._timer = setInterval(this.tick.bind(this), 1000)
  this._events = new EventEmitter()
}

Time.prototype.tick = function () {
  const next = this._date.getTime() + 1000
  this._date.setTime(next)
  this._events.emit('tick', this.getTime())
}

Time.prototype.getTime = function () {
  return Math.floor(this._date.getTime() / 1000)
}

Time.prototype.format = function (...args) {
  return dateformat.apply(null, [this._date, ...args])
}

Time.prototype.update = function (updateTime) {
  // TODO: 待設定更新時間方式
}

Time.prototype.on = function (evnetName, listener) {
  this._events.on(evnetName, listener)
}

Time.prototype.off = function (evnetName, listener) {
  this._events.removeListener(evnetName, listener)
}

module.exports = Time
