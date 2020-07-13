(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.EventBus = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var EventBus = /*#__PURE__*/function () {
    function EventBus(entries) {
      _classCallCheck(this, EventBus);

      this.listener = new Map(entries);
    }

    _createClass(EventBus, [{
      key: "on",
      value: function on(eventName, fn) {
        var group = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';
        if (typeof fn !== 'function') return;
        if (!this.listener.has(eventName)) this.listener.set(eventName, []); // 初始化事件列表

        this.listener.get(eventName).push({
          fn: fn,
          group: group
        });
      }
    }, {
      key: "once",
      value: function once(eventName, fn) {
        var group = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';
        if (typeof fn !== 'function') return;
        var that = this;

        function onceFn() {
          that.off(eventName, onceFn, group);
          fn.apply(that, arguments);
        }

        this.on(eventName, onceFn, group);
      }
    }, {
      key: "off",
      value: function off(eventName, fnOrGroup, group) {
        var _lser = this.listener.get(eventName) || [];

        var _filterLser = null;

        if (!eventName) {
          // 取消所有订阅
          this.listener.clear();
          return;
        }

        if (!fnOrGroup) {
          // 取消所有eventName订阅
          this.listener.delete(eventName);
          return;
        }

        if (!group) {
          // 取消eventName+fn/group订阅
          _filterLser = _lser.filter(function (listener) {
            return listener.fn !== fnOrGroup && listener.group !== fnOrGroup;
          });
        } else {
          // 取消eventName+fn+group订阅
          _filterLser = _lser.filter(function (listener) {
            return listener.group !== group || listener.fn !== fnOrGroup;
          });
        }

        if (_filterLser.length > 0) {
          this.listener.set(eventName, _filterLser);
        } else {
          this.listener.delete(eventName);
        }
      }
    }, {
      key: "emit",
      value: function emit(eventName) {
        var _this = this;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var _lser = this.listener.get(eventName) || [];

        _lser.forEach(function (listener) {
          var _listener$fn;

          (_listener$fn = listener.fn).call.apply(_listener$fn, [_this].concat(args));
        });
      }
    }]);

    return EventBus;
  }();

  var eventBus = new EventBus();

  return eventBus;

})));
