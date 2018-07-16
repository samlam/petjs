if (!Function.constructor.name) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function() {
            var name = (this.toString().match(/^function\s*([^\s(]+)/) || [])[1];
            // For better performance only parse once, and then cache the
            // result through a new accessor for repeated access.
            Object.defineProperty(this, 'name', { value: name });
            return name;
        }
    });
}

if (! (<any>Object).assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(target) {
        'use strict';
        if (target === undefined || target === null) {
          throw new TypeError('Cannot convert first argument to object');
        }
  
        var to = Object(target);
        for (var i = 1; i < arguments.length; i++) {
          var nextSource = arguments[i];
          if (nextSource === undefined || nextSource === null) {
            continue;
          }
          nextSource = Object(nextSource);
  
          var keysArray = Object.keys(Object(nextSource));
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
        return to;
      }
    });
  }

// let getClassName = obj => {
//     if (obj.constructor.name) {
//       return obj.constructor.name;
//     }
//     const regex = new RegExp(/^\s*function\s*(\S*)\s*\(/);
//     getClassName = obj => obj.constructor.toString().match(regex)[1];
//     return getClassName(obj);
// };