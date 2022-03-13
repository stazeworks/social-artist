

const o = function() {
  function t() {}
  return t.hash = function(e, n) {
    (n = void 0 === n || n) && (e = r.encode(e));
    var o = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]
      , i = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
    e += String.fromCharCode(128);
    for (var a = Math.ceil((e.length / 4 + 2) / 16), s = new Array(a), c = 0; c < a; c++) {
      s[c] = new Array(16);
      for (var u = 0; u < 16; u++)
        s[c][u] = e.charCodeAt(64 * c + 4 * u) << 24 | e.charCodeAt(64 * c + 4 * u + 1) << 16 | e.charCodeAt(64 * c + 4 * u + 2) << 8 | e.charCodeAt(64 * c + 4 * u + 3);
    }
    s[a - 1][14] = 8 * (e.length - 1) / Math.pow(2, 32),
    s[a - 1][14] = Math.floor(s[a - 1][14]),
    s[a - 1][15] = 8 * (e.length - 1) & 4294967295;
    var p, l, f, d, h, m, g, _, y = new Array(64);
    for (c = 0; c < a; c++) {
      for (var v = 0; v < 16; v++)
        y[v] = s[c][v];
      for (v = 16; v < 64; v++)
        y[v] = t.sigma1(y[v - 2]) + y[v - 7] + t.sigma0(y[v - 15]) + y[v - 16] & 4294967295;
      for (p = i[0],
      l = i[1],
      f = i[2],
      d = i[3],
      h = i[4],
      m = i[5],
      g = i[6],
      _ = i[7],
      v = 0; v < 64; v++) {
        var b = _ + t.Sigma1(h) + t.Ch(h, m, g) + o[v] + y[v]
          , C = t.Sigma0(p) + t.Maj(p, l, f);
        _ = g,
        g = m,
        m = h,
        h = d + b & 4294967295,
        d = f,
        f = l,
        l = p,
        p = b + C & 4294967295;
      }
      i[0] = i[0] + p & 4294967295,
      i[1] = i[1] + l & 4294967295,
      i[2] = i[2] + f & 4294967295,
      i[3] = i[3] + d & 4294967295,
      i[4] = i[4] + h & 4294967295,
      i[5] = i[5] + m & 4294967295,
      i[6] = i[6] + g & 4294967295,
      i[7] = i[7] + _ & 4294967295;
    }
    return t.toHexStr(i[0]) + t.toHexStr(i[1]) + t.toHexStr(i[2]) + t.toHexStr(i[3]) + t.toHexStr(i[4]) + t.toHexStr(i[5]) + t.toHexStr(i[6]) + t.toHexStr(i[7]);
  }
  ,
  t.ROTR = function(t, e) {
    return e >>> t | e << 32 - t;
  }
  ,
  t.Sigma0 = function(e) {
    return t.ROTR(2, e) ^ t.ROTR(13, e) ^ t.ROTR(22, e);
  }
  ,
  t.Sigma1 = function(e) {
    return t.ROTR(6, e) ^ t.ROTR(11, e) ^ t.ROTR(25, e);
  }
  ,
  t.sigma0 = function(e) {
    return t.ROTR(7, e) ^ t.ROTR(18, e) ^ e >>> 3;
  }
  ,
  t.sigma1 = function(e) {
    return t.ROTR(17, e) ^ t.ROTR(19, e) ^ e >>> 10;
  }
  ,
  t.Ch = function(t, e, n) {
    return t & e ^ ~t & n;
  }
  ,
  t.Maj = function(t, e, n) {
    return t & e ^ t & n ^ e & n;
  }
  ,
  t.toHexStr = function(t) {
    for (var e = '', n = 7; n >= 0; n--)
      e += (t >>> 4 * n & 15).toString(16);
    return e;
  }
  ,
  t;
}();
const r = function() {
  function t() {}
  return t.encode = function(t) {
    return t.replace(/[\u0080-\u07ff]/g, (function(t) {
      var e = t.charCodeAt(0);
      return String.fromCharCode(192 | e >> 6, 128 | 63 & e);
    }
    )).replace(/[\u0800-\uffff]/g, (function(t) {
      var e = t.charCodeAt(0);
      return String.fromCharCode(224 | e >> 12, 128 | e >> 6 & 63, 128 | 63 & e);
    }
    ));
  }
  ,
  t.decode = function(t) {
    return t.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, (function(t) {
      var e = (15 & t.charCodeAt(0)) << 12 | (63 & t.charCodeAt(1)) << 6 | 63 & t.charCodeAt(2);
      return String.fromCharCode(e);
    }
    )).replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, (function(t) {
      var e = (31 & t.charCodeAt(0)) << 6 | 63 & t.charCodeAt(1);
      return String.fromCharCode(e);
    }
    ));
  }
  ,
  t;
}();

module.exports = (unixTimestamp, csrfToken) => o.hash(`${unixTimestamp}:${csrfToken}`);

