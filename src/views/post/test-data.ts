export const testData = `
<h2>v8 事件循环（event loop）</h2>

<p>提到事件循环我们就不得不说js中的函数、回调函数、异步回调函数、promise、generator、async/await，这些常用回调函数以及 消息队列、micro、macro、主线程，我们会在下面一一说到</p>

<p>我们在使用<code>javascript</code>写代码的难免会使用到回调函数。同步回调函数<code>Array.map</code>、<code>Array.filter</code>对数组进行一些操作；异步回调函数比如我们用到的网络请求 <code>XMLHttpRequest</code>请求后端接口、请求静态资源等，<code>NodeJs</code>中的<code>fs</code>系统对文件进行一些异步操作</p>

<blockquote>
<p>目标</p>
</blockquote>

<ol>
<li>了解event loop帮助我们解决面试中的一些笔试题</li>
<li>帮助我们解决工作中的一些难题</li>
<li>…</li>
</ol>

<h3>回调函数</h3>

<blockquote>
<p>什么是回调函数？</p>
</blockquote>

<p>简单来说回调函数也是函数，只不过在<code>Javascript</code>中函数作为一等公民，可以作为参数传递给另一个函数，被另一个函数所调用。</p>

<blockquote>
<p>同步回调</p>
</blockquote>

<pre><code>const arr = [&#39;同步&#39;, &#39;数组&#39;, &#39;调用&#39;]

function forEach(array, callback) {
    for (let i = 0; i &lt; array.length; i++) {
        callback(array[i], i, array)
    }
}

const callback = (...args) =&gt; {
    console.log(&#39;同步回调执行&#39;, ...args)
}
forEach(arr, callback)
console.log(&#39;证明callback是在函数内部调用的&#39;)
</code></pre>

<p>同步回调函数，也就是回调函数在调用函数内部被执行，比如上面代码</p>

<ol>
<li>创建全局上下文并入栈</li>
<li>执行forEach函数并推入栈中</li>
<li>每次for循环都会执行callback入栈，callback执行完都会出栈</li>
<li>forEach出栈</li>
</ol>

<blockquote>
<p>异步回调</p>
</blockquote>

<pre><code>function test() {
    setTimeout(function () {
        console.log(&#39;异步回调任务&#39;)
    }, 2000)
    console.log(&#39;证明异步是在函数外被调用的&#39;)
}
test()
</code></pre>

<p>异步回调函数，回调函数不会在调用函数内部执行，<code>setTimeout</code>会创建一个事件，放入事件队列中，由主线程一个一个去拿来执行</p>

<ol>
<li>创建全局上下文入栈</li>
<li>执行test函数，并并使test函数入栈</li>
<li>setTimeout创建事件放入消息队列</li>
<li>test函数出栈</li>
<li>主线程不断从消息队列取出事件进行执行，最终执行到setTimeout创建的事件，异步回调被执行</li>
</ol>

<h3>栈和队列</h3>

<p>栈和队列是两种常用的数据结构</p>

<blockquote>
<p>栈</p>
</blockquote>

<p>栈的特点是先进后出（FILO），常用的就是js中的函数调用栈、数组上的方法</p>

<pre><code>const stack = [1, 2, 3]
// push方法是一个典型的入栈，在尾部追加一个数据
stack.push(4) // [1, 2, 3, 4]

// pop方法是一个典型的出栈，从尾部弹出一个数据
stack.pop() // [1, 2, 3]
</code></pre>

<blockquote>
<p>队列</p>
</blockquote>

<p>队列（queue）这个概念就比较好理解，它的特点是先进先出(FIFO)，就像我们平时排队一样。队列在我们js中也是常用的，消息队列、广度优先遍历、数组</p>

<pre><code>const queue = [1, 2, 3]
// push方法是一个典型的入栈，在尾部追加一个数据
queue.unshift(4) // [4, 1, 2, 3]

// pop方法是一个典型的出栈，从尾部弹出一个数据
queue.pop() // [4, 1, 2]
</code></pre>

<p>经过上面的概念，我们了解了栈和队列的基本概念，我们思考下面例子</p>

<p>例一</p>

<pre><code>function foo(){
    foo()
}
foo()
</code></pre>

<p>例二</p>

<pre><code>function foo(){
    setTimeout(foo, 0)
}
foo()
</code></pre>

<p>在第一个例子中由于栈内存得不到释放必然会得到页面卡死/栈爆炸的报错的现象</p>

<p><img src="./assets/stack-boom.jpg" alt=""/></p>

<p>第二个例子因为setTimeout会创建事件到消息队列，所以能够解决一部分栈溢出的问题，但是由于setTimeout并不能精准的按时执行</p>

<p><img src="./assets/jiegou.jpg" alt=""/></p>

<pre><code>function foo(){
    const startTimeStamp = Date.now()
    setTimeout(function () {
        console.log(&#39;foo 执行&#39;, Date.now() - startTimeStamp)
        foo()
    }, 0)
    let i = 0
    while (i &lt; 100000000) {
        i++
    }
}

foo()
</code></pre>

<p>因为主线程需要从执行完当前任务才回去消息队列取出新的任务去执行的，所以如果当前任务阻塞（如上），它的执行时机就不准确，而且在不活跃的tab中setTimeout的延时大概是1000，因此我们想要精准的控制执行顺序，就需要微任务</p>

<h3>微任务&amp;宏任务</h3>

<blockquote>
<p>宏任务</p>
</blockquote>

<p>类似于<code>setTimeout</code>、<code>click</code>这些事件都是宏任务，他们都会创建事件然后放到消息队列，在主线程执行完当前代码时去消息队列取</p>

<blockquote>
<p>微任务</p>
</blockquote>

<p><code>Promise</code>、<code>MutationObserver</code>等这些都是微任务，那么微任务是怎么执行的？</p>

<pre><code>function bar(){
  console.log(&#39;bar&#39;)
  Promise.resolve().then(
    (str) =&gt;console.log(&#39;micro-bar&#39;)
  ) 
  setTimeout((str) =&gt;console.log(&#39;macro-bar&#39;),0)
}

function foo() {
  console.log(&#39;foo&#39;)
  Promise.resolve().then(
    (str) =&gt;console.log(&#39;micro-foo&#39;)
  ) 
  setTimeout((str) =&gt;console.log(&#39;macro-foo&#39;),0)
  
  bar()
}
foo()
console.log(&#39;global&#39;)
Promise.resolve().then(
  (str) =&gt;console.log(&#39;micro-global&#39;)
) 
setTimeout((str) =&gt;console.log(&#39;macro-global&#39;),0)
// 输出顺序
// foo
// bar
// global
// micro-foo
// micro-bar
// micro-global
// macro-foo
// macro-bar
// macro-global
</code></pre>

<p>浏览器在执行上面代码时会创建一个全局上下文压入栈底，同时创建一个微任务队列,当当前任务执行完乘之后，会再micro队列中按顺序取出微任务，去执行</p>

<p><img src="./assets/promise-exec1.webp" alt=""/>
<img src="./assets/promise-exec2.webp" alt=""/>
<img src="./assets/promise-exec3.webp" alt=""/>
<img src="./assets/promise-exec4.webp" alt=""/>
<img src="./assets/promise-exec5.webp" alt=""/></p>

<p><code>MutationObserver</code>实现了对dom的监听，那么它是如何实现的？</p>

<p>微任务(promise)能够让我们精细化的控制任务同时也解决了回调地狱的问题</p>

<h3>async/await</h3>

<p><code>Javascript</code>在<code>es7</code>引入了<code>async/await</code>使我们的代码逻辑处理起来更加的线性，他在不阻塞主线程的情况下使用同步代码进行资源访问</p>

<pre><code>async function test() {
    try {
        const id = await getId()
        const name = await getName(id)
        console.log(name)
    } catch (e) {
        console.log(&#39;请求出错&#39;)
    }
}

function getName(id) {
    return new Promise((resolve) =&gt; setTimeout(() =&gt; {resolve(&#39;thankslyh&#39;)}, 2000))
}

function getId() {
    return new Promise((resolve) =&gt; setTimeout(() =&gt; {resolve(&#39;lyh&#39;)}, 2000))
}
</code></pre>

<p>那么我们先来看看async是什么</p>

<p><code>MDN</code>定义<code>async</code>关键字返回的是一个<code>promise</code>，这个 promise 要么会通过一个由 async 函数返回的值被解决，要么会通过一个从 async 函数中抛出的（或其中没有被捕获到的）异常被拒绝。这句话的意思是什么呢？我们看下面例子</p>

<blockquote>
<p>async</p>
</blockquote>

<pre><code>async function testAsync() {
    return 1
}

const testAsyncResult = testAsync()
</code></pre>

<p>也就是说<code>async</code>后的函数会被自动转为<code>promise</code>函数，函数的返回值就是该函数被解决的返回值</p>

<blockquote>
<p>await</p>
</blockquote>

<pre><code>async function run() {
    const data = await test()
    console.log(data) // 1
}

function test() {
    return 1
}

run()
</code></pre>

<p><code>await</code>后面跟的函数也会被默认转为promise，并且return值就是promise被resolve返回值；如果跟的就是一个promise，得到的值就是该promise resolve后的值。await只能在async内部使用，否则会报语法错误</p>

<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function" rel="nofollow">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function</a></p>

<blockquote>
<p>区别
1. <code>callback</code>回调函数形式异步编程模型需要我们写大量的回调函数，大量的回调函数其实会打乱代码的原有顺序，让代码读起来不够线性
2. <code>promise</code>链式调用能很好解决回调地狱的问题但是充满的.then的链式调用，代码不能准确表示执行流程
3. <code>async/await</code>同步的形式实现异步调用，让我们的代码更加的线性，但是需要注意的是由于每个await后的代码都要等之前的代码执行完才会执行，会使代码进行阻塞，所以要合理使用</p>
</blockquote>

<h3>总结</h3>

<ol>
<li>浏览器有一个UI主线程，不断从消息队列取出任务执行（消息事件队列、timer消息队列等）</li>
<li>取出该任务之后会会创建一个空的js调用栈（js call stack）</li>
<li>由V8虚拟机编译代码（JIT）执行，创建一些必要的环境入栈（全局上下文、宿主环境）</li>
<li>执行代码入栈先进后出，遇到宏任务时会创建事件放入消息队列，遇到微任务时会放到该宏任务的微任务队列</li>
</ol>
`
