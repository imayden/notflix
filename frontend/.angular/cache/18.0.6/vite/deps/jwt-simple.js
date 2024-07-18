import {
  __commonJS
} from "./chunk-WKYGNSYM.js";

// browser-external:crypto
var require_crypto = __commonJS({
  "browser-external:crypto"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "crypto" has been externalized for browser compatibility. Cannot access "crypto.${key}" in client code. See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/jwt-simple/lib/jwt.js
var require_jwt = __commonJS({
  "node_modules/jwt-simple/lib/jwt.js"(exports, module) {
    var crypto = require_crypto();
    var algorithmMap = {
      HS256: "sha256",
      HS384: "sha384",
      HS512: "sha512",
      RS256: "RSA-SHA256"
    };
    var typeMap = {
      HS256: "hmac",
      HS384: "hmac",
      HS512: "hmac",
      RS256: "sign"
    };
    var jwt = module.exports;
    jwt.version = "0.5.6";
    jwt.decode = function jwt_decode(token, key, noVerify, algorithm) {
      if (!token) {
        throw new Error("No token supplied");
      }
      var segments = token.split(".");
      if (segments.length !== 3) {
        throw new Error("Not enough or too many segments");
      }
      var headerSeg = segments[0];
      var payloadSeg = segments[1];
      var signatureSeg = segments[2];
      var header = JSON.parse(base64urlDecode(headerSeg));
      var payload = JSON.parse(base64urlDecode(payloadSeg));
      if (!noVerify) {
        if (!algorithm && /BEGIN( RSA)? PUBLIC KEY/.test(key.toString())) {
          algorithm = "RS256";
        }
        var signingMethod = algorithmMap[algorithm || header.alg];
        var signingType = typeMap[algorithm || header.alg];
        if (!signingMethod || !signingType) {
          throw new Error("Algorithm not supported");
        }
        var signingInput = [headerSeg, payloadSeg].join(".");
        if (!verify(signingInput, key, signingMethod, signingType, signatureSeg)) {
          throw new Error("Signature verification failed");
        }
        if (payload.nbf && Date.now() < payload.nbf * 1e3) {
          throw new Error("Token not yet active");
        }
        if (payload.exp && Date.now() > payload.exp * 1e3) {
          throw new Error("Token expired");
        }
      }
      return payload;
    };
    jwt.encode = function jwt_encode(payload, key, algorithm, options) {
      if (!key) {
        throw new Error("Require key");
      }
      if (!algorithm) {
        algorithm = "HS256";
      }
      var signingMethod = algorithmMap[algorithm];
      var signingType = typeMap[algorithm];
      if (!signingMethod || !signingType) {
        throw new Error("Algorithm not supported");
      }
      var header = { typ: "JWT", alg: algorithm };
      if (options && options.header) {
        assignProperties(header, options.header);
      }
      var segments = [];
      segments.push(base64urlEncode(JSON.stringify(header)));
      segments.push(base64urlEncode(JSON.stringify(payload)));
      segments.push(sign(segments.join("."), key, signingMethod, signingType));
      return segments.join(".");
    };
    function assignProperties(dest, source) {
      for (var attr in source) {
        if (source.hasOwnProperty(attr)) {
          dest[attr] = source[attr];
        }
      }
    }
    function verify(input, key, method, type, signature) {
      if (type === "hmac") {
        return signature === sign(input, key, method, type);
      } else if (type == "sign") {
        return crypto.createVerify(method).update(input).verify(key, base64urlUnescape(signature), "base64");
      } else {
        throw new Error("Algorithm type not recognized");
      }
    }
    function sign(input, key, method, type) {
      var base64str;
      if (type === "hmac") {
        base64str = crypto.createHmac(method, key).update(input).digest("base64");
      } else if (type == "sign") {
        base64str = crypto.createSign(method).update(input).sign(key, "base64");
      } else {
        throw new Error("Algorithm type not recognized");
      }
      return base64urlEscape(base64str);
    }
    function base64urlDecode(str) {
      return Buffer.from(base64urlUnescape(str), "base64").toString();
    }
    function base64urlUnescape(str) {
      str += new Array(5 - str.length % 4).join("=");
      return str.replace(/\-/g, "+").replace(/_/g, "/");
    }
    function base64urlEncode(str) {
      return base64urlEscape(Buffer.from(str).toString("base64"));
    }
    function base64urlEscape(str) {
      return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }
  }
});

// node_modules/jwt-simple/index.js
var require_jwt_simple = __commonJS({
  "node_modules/jwt-simple/index.js"(exports, module) {
    module.exports = require_jwt();
  }
});
export default require_jwt_simple();
//# sourceMappingURL=jwt-simple.js.map
