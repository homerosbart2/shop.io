export type Mapped<T> = {
    [tObjectId: string]: T | undefined,
}