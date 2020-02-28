function chunk(array = [], size = 1) {
  const { length } = array;
  const target = [];
  const targetLength = Math.ceil(length / size);
  // 这里换成while会快很多
  for (let i = 0; i < targetLength; i += 1) {
    target.push(array.slice(size * i, size * (i + 1)));
  }
  return target;
}
// begging 02:11
// end 02:16
function compact(array = []) {
  const { length } = array;
  const target = [];
  // 这里换成for of会快很多
  for (let i = 0; i < length; i += 1) {
    const value = array[i];
    if (value) {
      target.push(value);
    }
  }
  return target;
}
// begging 02:16
// end 02:27
function contact(array = [], ...paramList) {
  const target = array.slice();
  const { length } = paramList;
  for (let i = 0; i < length; i += 1) {
    const value = paramList[i];
    if (Array.isArray(value)) {
      target.push(...value);
    } else {
      target.push(value);
    }
  }
  return target;
}
// begin 02:18
// end 02:40
function difference(array = [], ...paramList) {
  // 先contact
  // 然后遍历push
  const source = contact(array, ...paramList);
  const target = [];
  const { length } = source;
  for (let i = 0; i < length; i += 1) {
    const value = source[i];
    if (target.includes(value)) {
      continue;
    }
    target.push(value);
  }
  return target;
}