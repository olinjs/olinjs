terminus
=====

[![NPM](https://nodei.co/npm/terminus.png)](https://nodei.co/npm/terminus/)

`terminus` makes it easier to create streams2 Writable streams. You can either use it like `through2` to eliminate subclassing boilerplate, or use one of the provided helper terminus streams.

```javascript
var terminus = require("terminus")
var through2 = require("through2")
var spigot = require("stream-spigot")

// Streams2 all the way down...

function uc(chunk, encoding, callback) {
  this.push(chunk.toString().toUpperCase())
  callback()
}

function log(chunk, encoding, callback) {
  // This example is very contrived, you're likely better off directly piping to `process.stdout`
  console.log(chunk.toString())
  callback()
}

spigot(["my ", "dog ", "has ", "fleas"])
  .pipe(through2(uc))
  .pipe(terminus(log))

/*
MY
DOG
HAS
FLEAS
*/

// devnull

var spy = require("through2-spy")

spigot(["my ", "dog ", "has ", "fleas"])
  .pipe(spy({highWaterMark: 2}, function (buf) {console.log(buf.toString())}))
  .pipe(terminus.devnull())

/*
my
dog
has
fleas
*/

// concat

function reverse(contents) {
  console.log(contents.toString().split("").reverse().join(""))
}

spigot(["my ", "dog ", "has ", "fleas"])
  .pipe(terminus.concat(reverse))

/*
saelf sah god ym
*/

// tail

var chunkLengths = []
function logLength(chunk) {
  chunkLengths.push(chunk.length)
}

var ws = terminus.tail(logLength)
ws.on("finish", function () {
  console.log(chunkLengths)
})

spigot(["my ", "dog ", "has ", "fleas"])
  .pipe(ws)

/*
[ 3, 4, 4, 5 ]
*/

// objectMode

var s = spigot({objectMode: true}, [
  {foo: 1},
  {foo: 2},
  {foo: 3},
  {foo: 4},
])

function timesTwo(record, encoding, callback) {
  record.foo *= 2
  this.push(record)
  callback()
}

function logRecords(records) {
  console.log(records)
}

s.pipe(through2({objectMode: true}, timesTwo))
 .pipe(terminus.concat({objectMode: true}, logRecords))

/*
[ { foo: 2 }, { foo: 4 }, { foo: 6 }, { foo: 8 } ]
*/
```

API
===

`terminus([options,] _writeFunction)`
---

Create a `streams.Writable` instance that will call `_writeFunction` on every chunk. Consult the [stream.Writable](http://nodejs.org/api/stream.html#stream_class_stream_writable_1) documentation for instructions on creating a `_write` function.

`terminus.ctor([options,] _writeFunction)`
---

Create a `streams.Writable` Subclass that can be used to re-create stream.Writable instances with the same _writeFunction.

`terminus.devnull([options])`
---

Create a `stream.Writable` instance that is akin to writing to `dev/null` i.e. it doesn't do anything except give your stream somewhere to go.

Why? Because if your pipeline doesn't terminate on a Writable stream, it will get paused at the High Water Mark with nothing to unpause it. I've most often seen this when people are using PassThrough streams, or Transforms that incorporate all required behavior.

`terminus.concat([options], fn)`
---

Collect the entire stream and when it is done, call `fn(contents)`. This is similar to the stream behavior of [concat-stream](http://npm.im/concat-stream) without the extra Array/Buffer concat behavior and entirely in streams2.

`terminus.tail([options], fn)`
---

A slightly less complicated version of `terminus([options,] _writeFunction)` that only requries you to provide a function that operates as `fn(chunk, encoding)`.

options
---

All functions accept standard `streams.Writable` options, that is:

  * highWaterMark `[Number]` Buffer level when write() starts returning false. `Default=16kb`
  * decodeStrings `[Boolean]` Whether not to decode strings into Buffers before passing them to _write() `Default=true`
  * objectMode `[Boolean]` If the content is Javascript objects versus strings/buffers. `Default=false`

objectMode
---

The most common option you'll be setting is `objectMode` which will enable you to stream Javascript objects, e.g. records. Unfortunately this is currently required and **ALL** streams2 parts of your stream pipeline must be in `objectMode` or you'll get errors. It's annoying, I know.

LICENSE
=======

MIT
