# 🤪 Metalevel 

<p align="center">
    <a href="https://github.com/mvoloskov/metalevel/blob/master/package.json"><img src="https://img.shields.io/badge/dependencies-0-brightgreen" alt="Dependencies"></a>
    <a href="https://www.npmjs.com/package/metalevel"><img alt="npm" src="https://img.shields.io/npm/v/metalevel"></a>
    <img alt="License" src="https://img.shields.io/github/license/mvoloskov/metalevel?color=brightgreen">
    <a href="https://www.buymeacoffee.com/mvoloskov"><img alt="Sponsor this project" src="https://img.shields.io/badge/-sponsor-ffdd00?logo=buy-me-a-coffee&logoColor=black"></a>
    <a href="https://github.com/mvoloskov"><img alt="My github" src="https://img.shields.io/github/followers/mvoloskov?style=social"></a>
    <a href="https://twitter.com/intent/user?screen_name=mvoloskov"><img alt="My twitter" src="https://img.shields.io/twitter/follow/mvoloskov?style=social"></a>
</p>
<p align="center">
    <a href="https://miloslav.website/metalevel">Demo</a>
    &nbsp;&nbsp;&bull;&nbsp;&nbsp;
    <a href="#usage">Usage</a>
    &nbsp;&nbsp;&bull;&nbsp;&nbsp;
    <a href="https://miloslav.website">Author</a>
</p>


> Dude, i'm feeling like i've just transitioned to the meta level...
>
>— <cite>me, while hackatoning at Hogan Coffee with [@m0rtyn](https://github.com/m0rtyn)</cite>

Metalevel is an alternative runtime for JavaScript. It basically stores the whole execution queue as an array, pulling out the first one in row, executing it and goes to the next one until there's no one left.

Speaking of conceptions, metalevel is _an alternative JS runtime written in JS_. So, get ready to push yourself up to the meta-level.

## Usage

```
npm install metalevel --save
```

or

```HTML
<script src="https://cdn.jsdelivr.net/gh/mvoloskov/metalevel/metalevel.min.js" type="module"></script>
<script type="module">
  import Metalevel from './metalevel.js'
  const meta = new Metalevel()

  meta.push(alert, ['Hello World!'])
</script>
```

## Crash course

```JS
// options object is optional, here are the defaults

const meta = new Metalevel({
  interval: 20, // how much to wait in between executions, milliseconds
  bias: 50      // how much functions to execute in one async iteration
})

// schedule the function to run
meta.push(alert, ['hello!'])
// alerts 'hello!'

// if chains parameter is true, the function will receive the previous result as the first argument
meta.push(() => 4)
meta.push(console.log, true)
// prints out 4

meta.push(prompt, ['Enter your name'])
meta.push(alert, true)
// alerts whatever you've entered


meta.push(x => x + 3, [1])
// prev will be 4, that's the result of the previous execution which'll be passed as the first argument
meta.push((prev, x) => prev + x + 2, [4], true)
meta.push(console.log, true)
// prints out 10
```

## Why?
Because it's faster. For example, if you need to render tons of DOM elements from, say, json, metalevel will render them in the background, fast and asynchronously, taking by 50 or by whatever you like.

Being used properly, Metalevel drastically reduces [time to interactive](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive).

## Complete API guide

### The meta-flow

Once in `interval`, metalevel unshifts the function tuple from the queue. It looks like this:
```JS
[fn, [args], false]
```

or this:
```JS
[fn, false]
```

The first element is a function to execute. The second is either its arguments or chaining flag. The third is chaining flag, passed explicitly when you want to chain a function call with arguments.

Chaining is disabled by default.

When enabled, arguments will transform from, say `[a, b]` to `[prev, a, b]` — the result of the previous execution will be passed as the first parameter.

Once the queue is empty, execution stops. If the queue was empty and a new execution was scheduled, execution starts immediately.


### Runtime management

You can start and stop the execution explicitly:
```JS
meta.start()
meta.stop()
```

You can also clear the whole queue. It will stop the execution and the whole old queue will be lost%
```JS
meta.clear()
```

### Getting execution context

You can get execution options and the queue itself:
```JS
meta.getOptions()
// returns something like { interval: 20, bias: 50 }

meta.getQueue()
// returns the queue
```

### Events
You can subscribe to events like this:
```JS
meta.on('event', cb)
```

To unsubscribe, call `off`:
```JS
meta.off('event')
```

Events available:
 - `tick` — fired on every execution and receives the previous result and the next tuple as parameters  
 - `start` — fired when execution starts. Receives nothing  
 - `stop` — you guessed it. Receives `true` if the queue was empty when execution stopped, `false` otherwise  
 - `push` — fired when new execution was scheduled. Receives the actual function scheduled and `true` if this specific push led to execution start. It happens when the queue was empty before, and this execution was first in line  
 - `clear`— fired on queue wiping. Receives nothing  


## Cheatsheet
```JS
// standard parameters: interval is 20 ms, bias is 50
const meta = new Metalevel()

// passing options
const meta = new Metalevel({
  interval: 100,
  bias: 1
})

// scheduling function execution
meta.push(() => console.log('hi'))

// scheduling with parameters
meta.push(console.log, ['hello ', 'world!'])

// chaining functions — the latter will receive the result of previous execution as the first parameter
meta.push(x => x + 2, [1])
meta.push(alert, true) // that boolean argument

// chaining with parameters
meta.push(x => x + 2, [1])
meta.push((prev, x) => x + prev, [4], true)
// (prev, x) function will receive (1, 4) as parameters

// stopping
meta.stop()

// resuming
meta.start()

// clearing queue
meta.clear()

// getting options and queue
meta.getOptions()
meta.getQueue()

// subscribing to events
meta.on('start', () => console.log('started'))

// unsubscribing
meta.off('start')
```

## Credits
- [@m0rtyn](https://github.com/m0rtyn), [@ai](https://github.com/ai) — inspiration 
