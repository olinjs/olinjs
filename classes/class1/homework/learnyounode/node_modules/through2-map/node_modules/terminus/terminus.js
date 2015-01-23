module.exports = make
module.exports.ctor = ctor

module.exports.devnull = devnull
module.exports.concat = concat
module.exports.tail = tail

const Writable = require("stream").Writable || require("readable-stream/writable")
    , inherits = require("util").inherits
    , xtend    = require("xtend")

function noop (chunk, enc, callback) {
  callback()
}

function ctor (options, _write) {
  if (typeof options == "function") {
    _write    = options
    options   = {}
  }

  if (typeof _write != "function")
    _write = noop

  function Terminus (override) {
    if (!(this instanceof Terminus))
      return new Terminus(override)

    this.options = xtend(options, override)
    Writable.call(this, this.options)
  }

  inherits(Terminus, Writable)

  Terminus.prototype._write = _write

  return Terminus
}

function make(options, _write) {
  return ctor(options, _write)()
}

function devnull(options) {
  return make(options, noop)
}

function concat(options, fn) {
  if (typeof options == "function") {
    fn = options
    options = {}
  }
  var terminus = make(options, function (chunk, encoding, callback) {
    this._collection.push(chunk)
    callback()
  })
  terminus._collection = []

  terminus.on("finish", function () {
    if (options.objectMode)
      fn.call(this, this._collection)
    else
      fn.call(this, Buffer.concat(this._collection))
  })

  return terminus
}

function tail(options, fn) {
  if (typeof options == "function") {
    fn = options
    options = {}
  }
  return make(options, function (chunk, encoding, callback) {
    fn.call(this, chunk, encoding)
    return callback()
  })
}
