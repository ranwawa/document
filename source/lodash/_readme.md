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
    return [ ]
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

- [ ] add.js
- [ ] after.js
- [ ] at.js
- [ ] attempt.js
- [ ] before.js
- [ ] camelCase.js
- [ ] capitalize.js
- [ ] castArray.js
- [ ] ceil.js
- [ ] CHANGELOG
- [ ] chunk.js
- [ ] clamp.js
- [ ] clone.js
- [ ] cloneDeep.js
- [ ] cloneDeepWith.js
- [ ] cloneWith.js
- [ ] compact.js
- [ ] cond.js
- [ ] conforms.js
- [ ] conformsTo.js
- [ ] countBy.js
- [ ] create.js
- [ ] debounce.js
- [ ] deburr.js
- [ ] defaults.js
- [ ] defaultsDeep.js
- [ ] defaultTo.js
- [ ] defaultToAny.js
- [ ] defer.js
- [ ] delay.js
- [x] difference.js
- [x] differenceBy.js
- [x] differenceWith.js
- [ ] divide.js
- [x] drop.js
- [x] dropRight.js
- [x] dropRightWhile.js
- [x] dropWhile.js
- [ ] each.js
- [ ] eachRight.js
- [ ] endsWith.js
- [ ] eq.js
- [ ] eqDeep.js
- [ ] escape.js
- [ ] escapeRegExp.js
- [ ] every.js
- [ ] everyValue.js
- [ ] filter.js
- [ ] filterObject.js
- [ ] findKey.js
- [ ] findLast.js
- [ ] findLastIndex.js
- [ ] findLastKey.js
- [ ] first.js
- [ ] flatMap.js
- [ ] flatMapDeep.js
- [ ] flatMapDepth.js
- [ ] flatten.js
- [ ] flattenDeep.js
- [ ] flattenDepth.js
- [ ] flip.js
- [ ] floor.js
- [ ] flow.js
- [ ] flowRight.js
- [ ] forEach.js
- [ ] forEachRight.js
- [ ] forOwn.js
- [ ] forOwnRight.js
- [ ] fromEntries.js
- [ ] functions.js
- [ ] get.js
- [ ] groupBy.js
- [ ] gt.js
- [ ] gte.js
- [ ] has.js
- [ ] hasIn.js
- [ ] hasPath.js
- [ ] hasPathIn.js
- [ ] head.js
- [ ] indexOf.js
- [ ] initial.js
- [ ] inRange.js
- [ ] intersection.js
- [ ] intersectionBy.js
- [ ] intersectionWith.js
- [ ] invert.js
- [ ] invertBy.js
- [ ] invoke.js
- [ ] invokeMap.js
- [x] isArguments.js
- [ ] isArrayBuffer.js
- [x] isArrayLike.js
- [x] isArrayLikeObject.js
- [ ] isBoolean.js
- [ ] isBuffer.js
- [ ] isDate.js
- [ ] isElement.js
- [ ] isEmpty.js
- [ ] isEqualWith.js
- [ ] isError.js
- [ ] isFunction.js
- [x] isLength.js
- [ ] isMap.js
- [ ] isMatch.js
- [ ] isMatchWith.js
- [ ] isNative.js
- [ ] isNil.js
- [ ] isNull.js
- [ ] isNumber.js
- [x] isObject.js
- [x] isObjectLike.js
- [ ] isPlainObject.js
- [ ] isRegExp.js
- [ ] isSet.js
- [ ] isString.js
- [x] isSymbol.js
- [ ] isTypedArray.js
- [ ] isUndefined.js
- [ ] isWeakMap.js
- [ ] isWeakSet.js
- [ ] kebabCase.js
- [ ] keyBy.js
- [ ] keys.js
- [ ] keysIn.js
- [x] last.js
- [ ] lastIndexOf.js
- [ ] LICENSE
- [ ] lowerCase.js
- [ ] lowerFirst.js
- [ ] lt.js
- [ ] lte.js
- [x] map.js
- [ ] mapKey.js
- [ ] mapObject.js
- [ ] mapValue.js
- [ ] matches.js
- [ ] matchesProperty.js
- [ ] maxBy.js
- [ ] mean.js
- [ ] meanBy.js
- [ ] memoize.js
- [ ] merge.js
- [ ] mergeWith.js
- [ ] method.js
- [ ] methodOf.js
- [ ] minBy.js
- [ ] multiply.js
- [ ] negate.js
- [ ] nth.js
- [ ] nthArg.js
- [ ] once.js
- [ ] orderBy.js
- [ ] over.js
- [ ] overArgs.js
- [ ] overEvery.js
- [ ] overSome.js
- [ ] package-lock.json
- [ ] package.json
- [ ] pad.js
- [ ] padEnd.js
- [ ] padStart.js
- [ ] parseInt.js
- [ ] partition.js
- [ ] pick.js
- [ ] pickBy.js
- [ ] property.js
- [ ] propertyOf.js
- [ ] pull.js
- [ ] pullAll.js
- [ ] pullAllBy.js
- [ ] pullAllWith.js
- [ ] pullAt.js
- [ ] random.js
- [ ] range.js
- [ ] rangeRight.js
- [ ] README.md
- [ ] reduce.js
- [ ] reduceRight.js
- [ ] reject.js
- [ ] remove.js
- [ ] repeat.js
- [ ] replace.js
- [ ] result.js
- [ ] round.js
- [ ] sample.js
- [ ] sampleSize.js
- [ ] SECURITY.md
- [ ] set.js
- [ ] setWith.js
- [ ] shuffle.js
- [ ] size.js
- [x] slice.js
- [ ] snakeCase.js
- [ ] some.js
- [ ] someValue.js
- [ ] sortedIndex.js
- [ ] sortedIndexBy.js
- [ ] sortedIndexOf.js
- [ ] sortedLastIndex.js
- [ ] sortedLastIndexBy.js
- [ ] sortedLastIndexOf.js
- [ ] sortedUniq.js
- [ ] sortedUniqBy.js
- [ ] split.js
- [ ] startCase.js
- [ ] startsWith.js
- [ ] subtract.js
- [ ] sum.js
- [ ] sumBy.js
- [ ] tail.js
- [ ] take.js
- [ ] takeRight.js
- [ ] takeRightWhile.js
- [ ] takeWhile.js
- [ ] test.html
- [ ] throttle.js
- [ ] times.js
- [ ] toArray.js
- [x] toFinite.js
- [x] toInteger.js
- [ ] toLength.js
- [x] toNumber.js
- [ ] toPath.js
- [ ] toPlainObject.js
- [ ] toSafeInteger.js
- [ ] toString.js
- [ ] transform.js
- [ ] trim.js
- [ ] trimEnd.js
- [ ] trimStart.js
- [ ] truncate.js
- [ ] unescape.js
- [ ] union.js
- [ ] unionBy.js
- [ ] unionWith.js
- [ ] uniq.js
- [ ] uniqBy.js
- [ ] uniqueId.js
- [ ] uniqWith.js
- [ ] unset.js
- [ ] unzip.js
- [ ] unzipWith.js
- [ ] update.js
- [ ] updateWith.js
- [ ] upperCase.js
- [ ] upperFirst.js
- [ ] values.js
- [ ] without.js
- [ ] words.js
- [ ] xor.js
- [ ] xorBy.js
- [ ] xorWith.js
- [ ] zip.js
- [ ] zipObject.js
- [ ] zipObjectDeep.js
- [ ] zipWith.js
- [ ] .internal
  - [ ] addMapEntry.js
  - [ ] addSetEntry.js
  - [ ] arrayEach.js
  - [ ] arrayEachRight.js
  - [ ] arrayIncludes.js
  - [x] arrayIncludesWith.js
  - [ ] arrayLikeKeys.js
  - [ ] arrayReduce.js
  - [ ] arrayReduceRight.js
  - [ ] asciiSize.js
  - [ ] asciiToArray.js
  - [ ] assignMergeValue.js
  - [ ] assignValue.js
  - [ ] assocIndexOf.js
  - [ ] baseAssignValue.js
  - [ ] baseAt.js
  - [ ] baseClone.js
  - [ ] baseConforms.js
  - [ ] baseConformsTo.js
  - [x] baseDifference.js
  - [ ] baseEach.js
  - [ ] baseEachRight.js
  - [x] baseFindIndex.js
  - [ ] baseFindKey.js
  - [x] baseFlatten.js
  - [ ] baseFor.js
  - [ ] baseForOwn.js
  - [ ] baseForOwnRight.js
  - [ ] baseForRight.js
  - [ ] baseGet.js
  - [x] baseIndexOf.js
  - [ ] baseIndexOfWith.js
  - [ ] baseInRange.js
  - [ ] baseIntersection.js
  - [ ] baseIsEqual.js
  - [ ] baseIsEqualDeep.js
  - [ ] baseIsMatch.js
  - [x] baseIsNaN.js
  - [ ] baseMatches.js
  - [ ] baseMatchesProperty.js
  - [ ] baseMerge.js
  - [ ] baseMergeDeep.js
  - [ ] baseOrderBy.js
  - [ ] basePick.js
  - [ ] basePickBy.js
  - [ ] baseProperty.js
  - [ ] basePropertyDeep.js
  - [ ] basePropertyOf.js
  - [ ] basePullAll.js
  - [ ] basePullAt.js
  - [ ] baseRange.js
  - [ ] baseReduce.js
  - [ ] baseSet.js
  - [ ] baseSortBy.js
  - [ ] baseSortedIndex.js
  - [ ] baseSortedIndexBy.js
  - [ ] baseSortedUniq.js
  - [ ] baseSum.js
  - [ ] baseToNumber.js
  - [ ] baseToString.js
  - [ ] baseUniq.js
  - [ ] baseUnset.js
  - [ ] baseUpdate.js
  - [ ] baseValues.js
  - [x] baseWhile.js
  - [ ] baseXor.js
  - [ ] baseZipObject.js
  - [x] cacheHas.js
  - [ ] castArrayLikeObject.js
  - [ ] castPath.js
  - [ ] castSlice.js
  - [ ] charsEndIndex.js
  - [ ] charsStartIndex.js
  - [ ] cloneArrayBuffer.js
  - [ ] cloneBuffer.js
  - [ ] cloneDataView.js
  - [ ] cloneRegExp.js
  - [ ] cloneSymbol.js
  - [ ] cloneTypedArray.js
  - [ ] compareAscending.js
  - [ ] compareMultiple.js
  - [ ] composeArgs.js
  - [ ] composeArgsRight.js
  - [ ] copyArray.js
  - [ ] copyObject.js
  - [ ] copySymbols.js
  - [ ] copySymbolsIn.js
  - [ ] createAssigner.js
  - [ ] createCaseFirst.js
  - [ ] createMathOperation.js
  - [ ] createPadding.js
  - [ ] createRange.js
  - [ ] createRound.js
  - [ ] createSet.js
  - [ ] customDefaultsMerge.js
  - [ ] deburrLetter.js
  - [ ] equalArrays.js
  - [ ] equalByTag.js
  - [ ] equalObjects.js
  - [ ] freeGlobal.js
  - [ ] getAllKeys.js
  - [ ] getAllKeysIn.js
  - [ ] getHolder.js
  - [ ] getMatchData.js
  - [ ] getSymbols.js
  - [ ] getSymbolsIn.js
  - [x] getTag.js
  - [ ] Hash.js
  - [ ] hasUnicode.js
  - [ ] initCloneObject.js
  - [x] isFlattenable.js
  - [ ] isIndex.js
  - [ ] isIterateeCall.js
  - [ ] isKey.js
  - [ ] isPrototype.js
  - [ ] isStrictComparable.js
  - [ ] iteratorToArray.js
  - [ ] ListCache.js
  - [ ] MapCache.js
  - [ ] mapToArray.js
  - [ ] matchesStrictComparable.js
  - [ ] memoizeCapped.js
  - [ ] metaMap.js
  - [ ] nodeTypes.js
  - [ ] parent.js
  - [ ] reEscape.js
  - [ ] reEvaluate.js
  - [ ] reInterpolate.js
  - [ ] root.js
  - [x] SetCache.js
  - [ ] setToArray.js
  - [ ] setToPairs.js
  - [ ] setToString.js
  - [ ] Stack.js
  - [x] strictIndexOf.js
  - [ ] strictLastIndexOf.js
  - [ ] stringSize.js
  - [ ] stringToArray.js
  - [ ] stringToPath.js
  - [ ] toKey.js
  - [ ] unicodeSize.js
  - [ ] unicodeToArray.js
  - [ ] unicodeWords.js

### 取默认值时,别用等号

baseFlatten.js
```
function baseFlatten(array, depth, predicate, isStrict, result) {
  // 如果是 predicate = predicate || isFlattenable
  // 即使有值时,也会进行一次赋值操作,而下面这种方式则会跳过赋值这一步
  predicate || (predicate = isFlattenable)
  result || (result = [])
```

### 调用函数时,能用浏览器原生实现的就用原生,别用lodash函数

测试发现,lodash实现的和原生一样的功能函数,时间都会长一些,所以功能一样,或者能简单用原生复合写出来的函数,就别用lodash了

arrayIncludes.js
```
function arrayIncludes(array, value) {
  const length = array == null ? 0 : array.length
  return !!length && baseIndexOf(array, value, 0) > -1
}
```

### 查找大量数据的元素时,用map,别用循环比对

baseDifference.js
```
else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas
    isCommon = false
    values = new SetCache(values)
  }
```