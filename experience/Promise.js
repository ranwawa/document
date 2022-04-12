/*
 * @Author: ranwawa <ranwawa.ran@huolala.cn>
 * @Date: 2022-04-09 21:21:24
 * @Description:
 * @see Promise/A+ {@link https://promisesaplus.com/}
 * @see Promise/A+规范翻译 {@link https://www.ituring.com.cn/article/66566}
 * @see 测试用例 {@link https://github.com/promises-aplus/promises-tests}
 */
const promisesAPlusTest = require('promises-aplus-tests');

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {
  _status = PENDING;

  get status() {
    return this._status;
  }

  set status(status) {
    this._status = status;

    process.nextTick(() => {
      switch (status) {
        case FULFILLED:
          // 执行所有onFulfilled函数
          for (let index = 0; index < this.onFulfilledQueue.length; index++) {
            const element = this.onFulfilledQueue[index];
            element(this.value);
          }
          break;
        case REJECTED:
          // 执行所胡onRejected函数
          for (let index = 0; index < this.onRejectedQueue.length; index++) {
            const element = this.onRejectedQueue[index];
            element(this.reason);
          }
          break;
        default:
          break;
      }
    });
  }

  value = undefined;
  reason = undefined;

  onFulfilledQueue = [];
  onRejectedQueue = [];

  constructor(fn) {
    this.status = PENDING;

    if (typeof fn !== 'function') {
      reject.bind(this)(new TypeError('fn不是一个函数'));
    } else {
      // 状态改变的时机由用户决定
      fn(this.resolve.bind(this), this.reject.bind(this));
    }
  }

  _resolve(promise2, x, fulfilled, rejected) {
    // 如果x与promise2指向同一对象,以TypeError拒绝执行
    if (x === promise2) {
      onRejected2(new TypeError());
      return;
    }

    // 如果x是一个promise,则以x的值执行/拒绝promise2
    if (x instanceof Promise) {
      x.then(
        (value) => fulfilled(value),
        (reason) => rejected(reason)
      );
      return;
    }

    // 如果x为对象或者函数
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        const then = x.then;
        // 如果then是函数,以x为作用域调用then
        if (typeof then === 'function') {
          const called = false;
          const resolvePromise = process.nextTick(
            (y) => called || this._resolve(promise2, y)
          );
          const rejectPromise = process.nextTick((r) => called || rejected(r));
          then.call(x, resolvePromise, rejectPromise);
        } else {
          // 如果then不是函数,以x为参数执行promise
          fulfilled(x);
        }
      } catch (error) {
        // 如果取then或者调用then抛离异常时,则以error拒绝promise2
        rejected(error);
      }
    } else {
      // 如果x不是对象或函数,以x为参数执行promise
      fulfilled(x);
    }
  }

  resolve(value) {
    process.nextTick(() => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
      }
    });
  }

  reject(reason) {
    process.nextTick(() => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
      }
    });
  }

  // 必须包含一个then方法,接收2个可选参数
  then(onFulfilled, onRejected) {
    // on执行/on拒绝必须是微任务 - 这个在翻译的文档中没有体现出来
    const promise2 = new Promise((fulfilled, rejected) => {
      switch (this.status) {
        case FULFILLED:
          try {
            // 如果onFulfilled不是一个函数,promise2成功执行,返回相同值
            if (typeof onFulfilled !== 'function') {
              fulfilled(this.value);
            } else {
              // 如果onFulfilled返回一个值,则运行Promise解决过程
              const x = onFulfilled(this.value);
              this._resolve(promise2, x, fulfilled, rejected);
            }
          } catch (error) {
            // 如果onFulfilled抛出异常,promise2拒绝执行,返回拒因error
            rejected(error);
          }
          break;
        case REJECTED:
          try {
            // 如果onRejected不是一个函数,promise2拒绝执行,返回相同原因
            if (typeof onRejected !== 'function') {
              rejected(this.reason);
            } else {
              // 如果onRejected返回一个值,则运行Promise解决过程
              const x = onRejected(this.reason);
              this._resolve(promise2, x, fulfilled, rejected);
            }
          } catch (error) {
            // 如果onRejected抛出异常,promise2拒绝执行,返回拒因error
            rejected(error);
          }
          break;
        default:
          // then可以执行多次
          this.onFulfilledQueue.push(onFulfilled);
          this.onRejectedQueue.push(onRejected);
          break;
      }
    });
    // then方法必须返回一个promise
    return promise2;
  }
}

module.exports.resolved = (value) => {
  const promise = new Promise((fulfill) => fulfill(value));
  return promise;
};

module.exports.rejected = (reason) => {
  const promise = new Promise((fulfill, reject) => reject(reason));
  return promise;
};

const d = function () {
  return {
    promise: new Promise(() => {}),
    resolve(value) {
      this.promise.resolve(value);
    },
    reject(reason) {
      this.promise.reject(reason);
    },
  };
};

module.exports.deferred = d;

promisesAPlusTest(module.exports, (err, res) =>
  console.log('运行结果:', typeof err)
);
