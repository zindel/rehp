/**
 * Buffer
 * @providesModule Buffer
 */
"use strict";
var Bytes = require('Bytes.js');
var Pervasives = require('Pervasives.js');
var String_ = require('String_.js');
var Sys = require('Sys.js');
var Uchar = require('Uchar.js');
var Not_found = require('Not_found.js');
var End_of_file = require('End_of_file.js');
var Assert_failure = require('Assert_failure.js');
var runtime = require('runtime.js');

let joo_global_object = global;


var runtime = joo_global_object.jsoo_runtime;
var caml_bytes_unsafe_set = runtime.caml_bytes_unsafe_set;
var caml_create_bytes = runtime.caml_create_bytes;
var caml_ml_bytes_length = runtime.caml_ml_bytes_length;
var caml_ml_string_length = runtime.caml_ml_string_length;
var caml_new_string = runtime.caml_new_string;
var caml_string_get = runtime.caml_string_get;

function caml_call1(f, a0) {
  return f.length == 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
}

function caml_call3(f, a0, a1, a2) {
  return f.length == 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0,a1,a2]);
}

function caml_call4(f, a0, a1, a2, a3) {
  return f.length == 4 ?
    f(a0, a1, a2, a3) :
    runtime.caml_call_gen(f, [a0,a1,a2,a3]);
}

function caml_call5(f, a0, a1, a2, a3, a4) {
  return f.length == 5 ?
    f(a0, a1, a2, a3, a4) :
    runtime.caml_call_gen(f, [a0,a1,a2,a3,a4]);
}

var global_data = runtime.caml_get_global_data();
var cst_Buffer_truncate = caml_new_string("Buffer.truncate");
var cst_Buffer_add_channel = caml_new_string("Buffer.add_channel");
var cst_Buffer_add_substring_add_subbytes = caml_new_string(
  "Buffer.add_substring/add_subbytes"
);
var cst_Buffer_add_cannot_grow_buffer = caml_new_string(
  "Buffer.add: cannot grow buffer"
);
var cst_Buffer_nth = caml_new_string("Buffer.nth");
var cst_Buffer_blit = caml_new_string("Buffer.blit");
var cst_Buffer_sub = caml_new_string("Buffer.sub");
var Pervasives = global_data.Pervasives;
var End_of_file = global_data.End_of_file;
var Not_found = global_data.Not_found;
var String = global_data.String;
var Assert_failure = global_data.Assert_failure;
var Sys = global_data.Sys;
var Bytes = global_data.Bytes;
var Uchar = global_data.Uchar;
var hq = [0,caml_new_string("buffer.ml"),205,9];
var hp = [0,caml_new_string("buffer.ml"),141,19];
var ho = [0,caml_new_string("buffer.ml"),159,8];
var hn = [0,caml_new_string("buffer.ml"),120,19];
var hm = [0,caml_new_string("buffer.ml"),138,8];
var hl = [0,caml_new_string("buffer.ml"),84,19];
var hk = [0,caml_new_string("buffer.ml"),117,8];

function create(n) {
  var n__0 = 1 <= n ? n : 1;
  var n__1 = Sys[13] < n__0 ? Sys[13] : n__0;
  var s = caml_create_bytes(n__1);
  return [0,s,0,n__1,s];
}

function contents(b) {return caml_call3(Bytes[8], b[1], 0, b[2]);}

function to_bytes(b) {return caml_call3(Bytes[7], b[1], 0, b[2]);}

function sub(b, ofs, len) {
  if (0 <= ofs) {
    if (0 <= len) {
      if (! ((b[2] - len | 0) < ofs)) {
        return caml_call3(Bytes[8], b[1], ofs, len);
      }
    }
  }
  return caml_call1(Pervasives[1], cst_Buffer_sub);
}

function blit(src, srcoff, dst, dstoff, len) {
  if (0 <= len) {
    if (0 <= srcoff) {
      if (! ((src[2] - len | 0) < srcoff)) {
        if (0 <= dstoff) {
          if (! ((caml_ml_bytes_length(dst) - len | 0) < dstoff)) {
            return runtime.caml_blit_bytes(src[1], srcoff, dst, dstoff, len);
          }
        }
      }
    }
  }
  return caml_call1(Pervasives[1], cst_Buffer_blit);
}

function nth(b, ofs) {
  if (0 <= ofs) {
    if (! (b[2] <= ofs)) {return runtime.caml_bytes_unsafe_get(b[1], ofs);}
  }
  return caml_call1(Pervasives[1], cst_Buffer_nth);
}

function length(b) {return b[2];}

function clear(b) {b[2] = 0;return 0;}

function reset(b) {
  b[2] = 0;
  b[1] = b[4];
  b[3] = caml_ml_bytes_length(b[1]);
  return 0;
}

function resize(b, more) {
  var len = b[3];
  var new_len = [0,len];
  for (; ; ) {
    if (new_len[1] < (b[2] + more | 0)) {
      new_len[1] = 2 * new_len[1] | 0;
      continue;
    }
    if (Sys[13] < new_len[1]) {
      if ((b[2] + more | 0) <= Sys[13]) new_len[1] = Sys[13];
      else caml_call1(Pervasives[2], cst_Buffer_add_cannot_grow_buffer);
    }
    var new_buffer = caml_create_bytes(new_len[1]);
    caml_call5(Bytes[11], b[1], 0, new_buffer, 0, b[2]);
    b[1] = new_buffer;
    b[3] = new_len[1];
    return 0;
  }
}

function add_char(b, c) {
  var pos = b[2];
  if (b[3] <= pos) {resize(b, 1);}
  caml_bytes_unsafe_set(b[1], pos, c);
  b[2] = pos + 1 | 0;
  return 0;
}

function add_utf_8_uchar(b, u) {
  var u__0 = caml_call1(Uchar[10], u);
  if (0 <= u__0) {
    if (127 < u__0) {
      if (2047 < u__0) {
        if (65535 < u__0) {
          if (1114111 < u__0) {
            throw runtime.caml_wrap_thrown_exception([0,Assert_failure,hk]);
          }
          var pos = b[2];
          if (b[3] < (pos + 4 | 0)) {resize(b, 4);}
          caml_bytes_unsafe_set(b[1], pos, 240 | u__0 >>> 18 | 0);
          caml_bytes_unsafe_set(
            b[1],
            pos + 1 | 0,
            128 | (u__0 >>> 12 | 0) & 63
          );
          caml_bytes_unsafe_set(b[1], pos + 2 | 0, 128 | (u__0 >>> 6 | 0) & 63
          );
          caml_bytes_unsafe_set(b[1], pos + 3 | 0, 128 | u__0 & 63);
          b[2] = pos + 4 | 0;
          return 0;
        }
        var pos__0 = b[2];
        if (b[3] < (pos__0 + 3 | 0)) {resize(b, 3);}
        caml_bytes_unsafe_set(b[1], pos__0, 224 | u__0 >>> 12 | 0);
        caml_bytes_unsafe_set(
          b[1],
          pos__0 + 1 | 0,
          128 | (u__0 >>> 6 | 0) & 63
        );
        caml_bytes_unsafe_set(b[1], pos__0 + 2 | 0, 128 | u__0 & 63);
        b[2] = pos__0 + 3 | 0;
        return 0;
      }
      var pos__1 = b[2];
      if (b[3] < (pos__1 + 2 | 0)) {resize(b, 2);}
      caml_bytes_unsafe_set(b[1], pos__1, 192 | u__0 >>> 6 | 0);
      caml_bytes_unsafe_set(b[1], pos__1 + 1 | 0, 128 | u__0 & 63);
      b[2] = pos__1 + 2 | 0;
      return 0;
    }
    return add_char(b, u__0);
  }
  throw runtime.caml_wrap_thrown_exception([0,Assert_failure,hl]);
}

function add_utf_16be_uchar(b, u) {
  var u__0 = caml_call1(Uchar[10], u);
  if (0 <= u__0) {
    if (65535 < u__0) {
      if (1114111 < u__0) {
        throw runtime.caml_wrap_thrown_exception([0,Assert_failure,hm]);
      }
      var u__1 = u__0 + -65536 | 0;
      var hi = 55296 | u__1 >>> 10 | 0;
      var lo = 56320 | u__1 & 1023;
      var pos = b[2];
      if (b[3] < (pos + 4 | 0)) {resize(b, 4);}
      caml_bytes_unsafe_set(b[1], pos, hi >>> 8 | 0);
      caml_bytes_unsafe_set(b[1], pos + 1 | 0, hi & 255);
      caml_bytes_unsafe_set(b[1], pos + 2 | 0, lo >>> 8 | 0);
      caml_bytes_unsafe_set(b[1], pos + 3 | 0, lo & 255);
      b[2] = pos + 4 | 0;
      return 0;
    }
    var pos__0 = b[2];
    if (b[3] < (pos__0 + 2 | 0)) {resize(b, 2);}
    caml_bytes_unsafe_set(b[1], pos__0, u__0 >>> 8 | 0);
    caml_bytes_unsafe_set(b[1], pos__0 + 1 | 0, u__0 & 255);
    b[2] = pos__0 + 2 | 0;
    return 0;
  }
  throw runtime.caml_wrap_thrown_exception([0,Assert_failure,hn]);
}

function add_utf_16le_uchar(b, u) {
  var u__0 = caml_call1(Uchar[10], u);
  if (0 <= u__0) {
    if (65535 < u__0) {
      if (1114111 < u__0) {
        throw runtime.caml_wrap_thrown_exception([0,Assert_failure,ho]);
      }
      var u__1 = u__0 + -65536 | 0;
      var hi = 55296 | u__1 >>> 10 | 0;
      var lo = 56320 | u__1 & 1023;
      var pos = b[2];
      if (b[3] < (pos + 4 | 0)) {resize(b, 4);}
      caml_bytes_unsafe_set(b[1], pos, hi & 255);
      caml_bytes_unsafe_set(b[1], pos + 1 | 0, hi >>> 8 | 0);
      caml_bytes_unsafe_set(b[1], pos + 2 | 0, lo & 255);
      caml_bytes_unsafe_set(b[1], pos + 3 | 0, lo >>> 8 | 0);
      b[2] = pos + 4 | 0;
      return 0;
    }
    var pos__0 = b[2];
    if (b[3] < (pos__0 + 2 | 0)) {resize(b, 2);}
    caml_bytes_unsafe_set(b[1], pos__0, u__0 & 255);
    caml_bytes_unsafe_set(b[1], pos__0 + 1 | 0, u__0 >>> 8 | 0);
    b[2] = pos__0 + 2 | 0;
    return 0;
  }
  throw runtime.caml_wrap_thrown_exception([0,Assert_failure,hp]);
}

function add_substring(b, s, offset, len) {
  var hv = offset < 0 ? 1 : 0;
  if (hv) var hw = hv;
  else {
    var hx = len < 0 ? 1 : 0;
    var hw = hx || ((caml_ml_string_length(s) - len | 0) < offset ? 1 : 0);
  }
  if (hw) {caml_call1(Pervasives[1], cst_Buffer_add_substring_add_subbytes);}
  var new_position = b[2] + len | 0;
  if (b[3] < new_position) {resize(b, len);}
  caml_call5(Bytes[12], s, offset, b[1], b[2], len);
  b[2] = new_position;
  return 0;
}

function add_subbytes(b, s, offset, len) {
  return add_substring(b, caml_call1(Bytes[42], s), offset, len);
}

function add_string(b, s) {
  var len = caml_ml_string_length(s);
  var new_position = b[2] + len | 0;
  if (b[3] < new_position) {resize(b, len);}
  caml_call5(Bytes[12], s, 0, b[1], b[2], len);
  b[2] = new_position;
  return 0;
}

function add_bytes(b, s) {return add_string(b, caml_call1(Bytes[42], s));}

function add_buffer(b, bs) {return add_subbytes(b, bs[1], 0, bs[2]);}

function add_channel_rec(b, ic, len) {
  var len__0 = len;
  for (; ; ) {
    var hu = 0 < len__0 ? 1 : 0;
    if (hu) {
      var n = caml_call4(Pervasives[72], ic, b[1], b[2], len__0);
      b[2] = b[2] + n | 0;
      if (0 === n) {throw runtime.caml_wrap_thrown_exception(End_of_file);}
      var len__1 = len__0 - n | 0;
      var len__0 = len__1;
      continue;
    }
    return hu;
  }
}

function add_channel(b, ic, len) {
  var hs = len < 0 ? 1 : 0;
  var ht = hs || (Sys[13] < len ? 1 : 0);
  if (ht) {caml_call1(Pervasives[1], cst_Buffer_add_channel);}
  if (b[3] < (b[2] + len | 0)) {resize(b, len);}
  return add_channel_rec(b, ic, len);
}

function output_buffer(oc, b) {
  return caml_call4(Pervasives[56], oc, b[1], 0, b[2]);
}

function closing(param) {
  if (40 === param) {return 41;}
  if (123 === param) {return 125;}
  throw runtime.caml_wrap_thrown_exception([0,Assert_failure,hq]);
}

function advance_to_closing(opening, closing, k, s, start) {
  function advance(k, i, lim) {
    var k__0 = k;
    var i__0 = i;
    for (; ; ) {
      if (lim <= i__0) {throw runtime.caml_wrap_thrown_exception(Not_found);}
      if (caml_string_get(s, i__0) === opening) {
        var i__1 = i__0 + 1 | 0;
        var k__1 = k__0 + 1 | 0;
        var k__0 = k__1;
        var i__0 = i__1;
        continue;
      }
      if (caml_string_get(s, i__0) === closing) {
        if (0 === k__0) {return i__0;}
        var i__2 = i__0 + 1 | 0;
        var k__2 = k__0 + -1 | 0;
        var k__0 = k__2;
        var i__0 = i__2;
        continue;
      }
      var i__3 = i__0 + 1 | 0;
      var i__0 = i__3;
      continue;
    }
  }
  return advance(k, start, caml_ml_string_length(s));
}

function advance_to_non_alpha(s, start) {
  function advance(i, lim) {
    var i__0 = i;
    for (; ; ) {
      if (lim <= i__0) {return lim;}
      var match = caml_string_get(s, i__0);
      var switch__0 = 91 <= match ?
        97 <= match ? 123 <= match ? 0 : 1 : 95 === match ? 1 : 0 :
        58 <= match ? 65 <= match ? 1 : 0 : 48 <= match ? 1 : 0;
      if (switch__0) {var i__1 = i__0 + 1 | 0;var i__0 = i__1;continue;}
      return i__0;
    }
  }
  return advance(start, caml_ml_string_length(s));
}

function find_ident(s, start, lim) {
  if (lim <= start) {throw runtime.caml_wrap_thrown_exception(Not_found);}
  var c = caml_string_get(s, start);
  if (40 !== c) {
    if (123 !== c) {
      var stop__0 = advance_to_non_alpha(s, start + 1 | 0);
      return [0,caml_call3(String[4], s, start, stop__0 - start | 0),stop__0];
    }
  }
  var new_start = start + 1 | 0;
  var stop = advance_to_closing(c, closing(c), 0, s, new_start);
  return [
    0,
    caml_call3(String[4], s, new_start, (stop - start | 0) + -1 | 0),
    stop + 1 | 0
  ];
}

function add_substitute(b, f, s) {
  var lim = caml_ml_string_length(s);
  function subst(previous, i) {
    var previous__0 = previous;
    var i__0 = i;
    for (; ; ) {
      if (i__0 < lim) {
        var current = caml_string_get(s, i__0);
        if (36 === current) {
          if (92 === previous__0) {
            add_char(b, current);
            var i__1 = i__0 + 1 | 0;
            var previous__0 = 32;
            var i__0 = i__1;
            continue;
          }
          var j = i__0 + 1 | 0;
          var match = find_ident(s, j, lim);
          var i__2 = match[2];
          var ident = match[1];
          add_string(b, caml_call1(f, ident));
          var previous__0 = 32;
          var i__0 = i__2;
          continue;
        }
        if (92 === previous__0) {
          add_char(b, 92);
          add_char(b, current);
          var i__3 = i__0 + 1 | 0;
          var previous__0 = 32;
          var i__0 = i__3;
          continue;
        }
        if (92 === current) {
          var i__4 = i__0 + 1 | 0;
          var previous__0 = current;
          var i__0 = i__4;
          continue;
        }
        add_char(b, current);
        var i__5 = i__0 + 1 | 0;
        var previous__0 = current;
        var i__0 = i__5;
        continue;
      }
      var hr = 92 === previous__0 ? 1 : 0;
      return hr ? add_char(b, previous__0) : hr;
    }
  }
  return subst(32, 0);
}

function truncate(b, len) {
  if (0 <= len) {if (! (length(b) < len)) {b[2] = len;return 0;}}
  return caml_call1(Pervasives[1], cst_Buffer_truncate);
}

var Buffer = [
  0,
  create,
  contents,
  to_bytes,
  sub,
  blit,
  nth,
  length,
  clear,
  reset,
  add_char,
  add_utf_8_uchar,
  add_utf_16le_uchar,
  add_utf_16be_uchar,
  add_string,
  add_bytes,
  add_substring,
  add_subbytes,
  add_substitute,
  add_buffer,
  add_channel,
  output_buffer,
  truncate
];

runtime.caml_register_global(22, Buffer, "Buffer");


module.exports = global.jsoo_runtime.caml_get_global_data().Buffer;