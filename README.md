# 🤔 Metameta

> dude, i'm feeling like i've just pushed yourself up to the meta level...
>
>— <cite>me, while hackatoning at Hogan Coffee with @martyns0n</cite>

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
  meta.push(text => alert(text), ['hello!'])
  
  // if third parameter is true, the function will receive the previous result as the first argument
  meta.push(() => 4)
  meta.push(value => console.log(value), [], true)
  // prints out 4
```

## Complete API guide
TODO

## Credits
@martyns0n, @ai — inspiration
