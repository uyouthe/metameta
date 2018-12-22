export default class Metameta {
  constructor (options) {
    super (options)

    this._runtime = this._runtime.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.push = this.push.bind(this)
    this.clear = this.clear.bind(this)
    this.getQueue = this.getQueue.bind(this)
    this.on = this.on.bind(this)
    this.off = this.off.bind(this)
    this.getOptions = this.getOptions.bind(this)

    this.options = {
      interval: options.interval || 20,
      bias: options.bias || 50
    }
    this.queue = []
    this.clock = null
    this.previousResult = undefined

    this.events = {
      // called on every function being executed
      tick: (previousResult, next) => {},

      // called on execution start
      start: () => {},

      // called on execution stop and
      // notifies you whether there were function to execute or not
      stop: (isFinished) => {},

      // called on push. Receives the whole queue,
      // the new function and whether this push has started the execution
      push: (queue, fn, wasStarted) => {},

      // called on queue wiping
      clear: () => {}
    }
  }

  _runtime () {
    for (let i = 0; i < this.options.bias; i++) {
      // destructurize next function
      const next = this.queue.pop()

      if (next) {
        const nextFunction = next[0]
        const nextArgs = next[1]

        // pass previous execution result as the first argument
        nextArgs.unshift(previousResult)

        // call the actual function
        this.previousResult = nextFunction.apply(nextArgs)
        this.events['tick'](previousResult, next)
      } else {
        this.stop()
        this.events['stop'](true)
      }
    }
  }

  start () {
    this.clock = setInterval(this.options.interval || 20, this._runtime)
    this.events['start']()
  }

  stop () {
    if (this.clock) {
      clearInterval(this.clock)

      // notify whether there's actually was the execution process
      this.events['stop'](false)
    }
    this.events['stop'](true)
  }

  push (args) {
    const prevLength = this.queue.length
    const fn = [args[0], [...args.slice(1)]]
    this.queue.push(fn)

    if (prevLength === 0) {
      this.start()
    }

    this.events['push'](queue, fn, prevLength === 0)
  }

  clear () {
    this.queue = []
    this.events['clear']()
  }

  getQueue () {
    return this.queue
  }

  getOptions () {
    return this.options
  }

  on (event, cb) {
    this.events[event] = cb
  }

  off (event) {
    this.events[event] = () => {}
  }
}
