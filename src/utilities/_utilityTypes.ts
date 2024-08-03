/* 
    PickRequired:
    Accepts an objectType and a union of key strings. 
    Returns a partial objectType with only required keys in the union if they existed on the objectType.
*/
export type PickRequired<
    T extends Record<string, unknown>,
    U extends string
> = {
    [K in Extract<keyof T, U>]: NonNullable<T[K]>;
} & {
    [K in Exclude<keyof T, U>]?: T[K];
};

export type TypeObject = { id: number };

export type UnwrapArray<T> = T extends (infer U)[] ? U : never;
