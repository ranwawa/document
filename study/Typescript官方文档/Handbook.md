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
