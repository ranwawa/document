# HandBook

## Object Types

### properties modifiers

```typescript
interface Shape {
  // optional properties
  name?: string;
  // read-only properties
  readonly: age;
  // index signatures
  [index: string]: string | number;
}
```

### combine types

```typescript
interface Shape {
  name: string;
  age: number;
}

// extending types
interface ShapeWithSex extends Shape {
  sex: boolean;
}

// interaction types
type ShapeWithSchool = Shape & {
  school: string;
};
```

### generic types

```typescript
interface Shape<T> {
  name: T;
}

type NullOrT<T> = null | T;
```

### array types

```typescript
// Array<string>
type StringArray = string[];

// ReadonlyArray<string>
type StringReadonlyArray = readonly string[];

// tips: string[] 可以赋值给readonly string[]; 反过来则不行
```

### tuple types

```typescript
type StringNumberTuple = [string, number];
type StringNumberWithOptionalBooleanTuple = [string, number, boolean?];
type StringNumberWithRestBooleanTuple = [string, number, ...boolean[]];
type StringNumberReadonlyTuple = readonly [string, number];

// tips: StringNumberWithOptionalBoolean可选项不会增加长度,所以长度是2
// [1, 2] as const 等价于 readonly [number, number]
```

## Function Types

### Function Type Expressions

```typescript
type Func = (name: string) => void;
function Func1(): void

interface Func2 {
  description: string;
  // call signature
  (name: string): void;
  // constructor signature
  new (name: string): object:
}
```

### Generic Functions

```typescript
function func<T>(arg: T) {
  return arg;
}

// inference: 会自动推导返回的是数值型
func(1);

type Cons = T extends { length: number };
function func1<Cons>(arg: Cons): Cons {
  return arg;
}

// constraint: 入参没有length属性
func1(10);

// constraint: 返回类型必须是Cons或子类,不能只是鸭式判型
function func2<Cons>(arg: Cons):Cons {
return { length: arg.length }
}

// 原则:
// 1. 能不用extends就尽量别用
// 2. 类型参数能用1个就别用2个
// 3. 类型参数如果只出现一次,就别用
```

### Function overloads

```typescript
// overloads signature
function Func(): void;
// implementation signature: 一个函数实现最少需要2个重载签名,否则会报错
function Func() {}

function Func1(name: string): void;
function Func1(name: string, age: number, sex: boolean): void;
function Func1(name: string, age?: number, sex?: boolean) {}
// 函数调用是由overloads signature决定的,重载上没有2个参数,所以报错
Func1('ranwawa', 28);

// 原则:
// 1. 能用联合参数时就尽量别用函数重载
```
