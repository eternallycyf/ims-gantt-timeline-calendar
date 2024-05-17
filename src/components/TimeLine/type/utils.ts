// // 获取枚举的 value
// type EnumValues = `${StorageEnum}`

// // 获取枚举的 key
// type EnumKeys<T> = keyof typeof StorageEnum

/** https://github.com/Microsoft/TypeScript/issues/29729 */
export type LiteralUnion<T extends string> = T | (string & {});

export type ValuesOf<T> = T[keyof T];

export type AddStringPrefix<
  Str extends string,
  String extends string = '',
> = Str extends `${infer Rest}` ? `${String}${Rest}` : Str;
