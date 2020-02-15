### 取整数运算的时候,能用-号,就别用Math函数
- toInteger.js
```
function toInteger(value) {
  const result = toFinite(value)
  const remainder = result % 1
  // 因为可能是负数,所以用减法是最安全的,效率最高的
  // 否则负数用ceil 正数用floor就得多加判断了
  // 负数取余也是负数 减法运算相当于是加
  return remainder ? result - remainder : result
}
```

### 判断类型时,能用typeof,就别用toString
- isSymbol.js
```
import getTag from './.internal/getTag.js'

function isSymbol(value) {
  const type = typeof value
  // typeof比toString的效率高4倍,所以这里优先使用typeof 可通过console.time进行判断
  // 虽然无法直接通过原始数据类型即Symbol创建包装对象,但可以通过Object(symbol)来创建包装对象
  // 所以也有可能typeof 会出现为object
  // 判断类型时,能用typeof就别用toString
  return type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]')
}
```

### 循环时,能用while,就别用for循环
- chunk.js
```
function chunk(array, size = 1) {
  // 函数入参时,最起码要主动跑出期望值异常,最好是处理各种边界情况
  size = Math.max(toInteger(size), 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  // 循环时,能用while就别用for,要少2步操作啊
  while (index < length) {
    // todo 计算一下 下标添加和push的时间差
    result[resIndex++] = slice(array, index, (index += size))
  }
  return result
}
```