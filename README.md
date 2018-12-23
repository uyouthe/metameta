# 🤔 Metameta

> dude, i'm feeling like i've just pushed myself up to the meta level...
>
>— <cite>me, while hackatoning at Hogan Coffee with [@martyns0n](https://github.com/martyns0n)</cite>

Metameta is an alternative runtime for JavaScript. It basically stores the whole execution queue as an array, pulling out the first one in row, executing it and goes to the next one until there's no one left.

Speaking of conceptions, metameta is _an alternative JS interpreter written in JS_. So, get ready to push yourself up to the meta-level.


## Crash course
```JS
// options object is optional, here are the defaults

const meta = new Metameta({
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
Because it's faster. For example, if you need to render tons of DOM elements from, say, json, metameta will render them in the background, fast and asynchronously, taking by 50 or by whatever you like.

Being used properly, Metameta drastically reduces [time to interactive](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive).

## Complete API guide

### The meta-flow



### Runtime management

### Events

### Cheatsheet
```JS

```

## Credits
[@martyns0n](https://github.com/martyns0n), [@ai](https://github.com/ai) — inspiration  
[Monetochka](https://vk.com/lisamonetka) — naming
