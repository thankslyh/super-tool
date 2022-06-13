namespace hook {
    declare type Service<T, U extends any[]> = (...args: U) => Promise<T>
}
