type promises<T> = (() => Promise<T>)[]

interface Middleware<T> {
    (ctx: T, index: number): void
}

interface EndFn<T> {
    (ctx: T[], index: number): void
}

export default class OrderPromise<T = any> {
    result: T[] = []
    private promises: promises<T> = []
    private middlewares: Middleware<T>[] = []
    private endFn: EndFn<T> = (ctx: T[], index) => {}
    constructor(promises: promises<T>) {
        this.promises = promises
    }
    start() {
        this.dispatch()
        return this
    }
    private dispatch(index = 0) {
        if (index === this.promises.length) {
            this.endFn(this.result, index)
            return
        }
        this.promises[index]().then(res => {
            this.middlewares.forEach(middleware => middleware(res, index))
            this.result.push(res)
            this.dispatch(++index)
        })
    }
    end(fn: EndFn<T>) {
        this.endFn = fn
        return this
    }
    use(fn: Middleware<T>) {
        this.middlewares.push(fn)
        return this
    }
}

// function test() {
//     const p1 = () => new Promise((resolve) => {
//         setTimeout(() => resolve('p1'), 2000)
//     })
//     const p2 = () => new Promise((resolve) => {
//         setTimeout(() => resolve('p2'), 1000)
//     })
//     const p3 = () => new Promise((resolve) => {
//         setTimeout(() => resolve('p3'), 0)
//     })
//     const p4 = () => new Promise((resolve) => {
//         setTimeout(() => resolve('p4'), 4000)
//     })
//
//     const op = new OrderPromise([p1, p2, p3, p4])
//     op.use((res, index) => {
//         console.log(res, index)
//     }).start().end(() => {
//         console.log('end')
//     })
// }
//
// test()
