import {
  createKyselyAdapter,
  diffSchema,
  formatSchemaFinding,
  getKyselyDatabaseType,
  getMssqlSchema,
  getPostgresSchema,
  introspectPostgresTables,
  invalidateSchemaChecks,
  runtimeSchemaCheckFor,
  schemaCheckFor,
  toIntrospectedTables,
  toPhysicalSchema
} from "./chunk-CP5Q7T5A.mjs";
import {
  APIError,
  APIError2,
  ATTR_CONTEXT,
  ATTR_DB_COLLECTION_NAME,
  ATTR_HOOK_TYPE,
  ATTR_HTTP_RESPONSE_STATUS_CODE,
  ATTR_HTTP_ROUTE,
  ATTR_OPERATION_ID,
  BASE_ERROR_CODES,
  BetterAuthError,
  BetterCallError,
  ENV,
  ValidationError,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodString,
  __getBetterAuthGlobal,
  __getCurrentEndpointContext,
  _coercedBigint,
  _coercedBoolean,
  _coercedDate,
  _coercedNumber,
  _coercedString,
  _enum,
  abytes,
  aexists,
  ahash,
  anumber,
  any,
  aoutput,
  array,
  base64,
  base64Url,
  boolean,
  bytesToHex,
  clean,
  createAdapterFactory,
  createHasher,
  createLogger,
  createRandomStringGenerator,
  createView,
  createWithSpan,
  date,
  email,
  encodeDeterministicId,
  env,
  generateId,
  getAuthTables,
  getAuthTablesWithResolvedIndexes,
  getBetterAuthVersion,
  getBooleanEnvVar,
  getDatabaseFieldIndexName,
  getDatabaseIndexStringLength,
  getEnvVar,
  getPortableDatabaseIdentifierKey,
  getRuntimeName,
  hex,
  initGetFieldName,
  initGetModelName,
  ipv4,
  ipv6,
  isDevelopment,
  isProduction,
  isTest,
  isWorkerd,
  kAPIErrorHeaderSymbol,
  literal,
  logger,
  looseObject,
  number,
  object,
  oidNist,
  optional,
  record,
  resolveDatabaseTableIndexes,
  rotr,
  safeJSONParse,
  shouldPublishLog,
  strictObject,
  string,
  toBufferSource,
  union,
  unknown,
  utf8ToBytes,
  validate
} from "./chunk-LC2AGRHH.mjs";
import "./chunk-HQMQQQT6.mjs";
import "./chunk-WTC3CQCW.mjs";
import {
  sql
} from "./chunk-FZ4KF7GL.mjs";
import {
  __export
} from "./chunk-7P6ASYW6.mjs";

// api/index.ts
import dotenv from "dotenv";

// src/app.ts
import express2 from "express";
import cors from "cors";

// node_modules/set-cookie-parser/lib/set-cookie.js
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false,
  split: "auto"
  // auto = split strings but not arrays
};
function isForbiddenKey(key) {
  return typeof key !== "string" || key in {};
}
function createNullObj() {
  return /* @__PURE__ */ Object.create(null);
}
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";");
  var nameValuePairStr = parts.shift();
  if (!isNonEmptyString(nameValuePairStr)) {
    return null;
  }
  var parsed = parseNameValuePair(nameValuePairStr);
  var name = parsed.name;
  var value = parsed.value;
  if (!name && !value) {
    return null;
  }
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (isForbiddenKey(name)) {
    if (!options.silent) {
      console.warn("set-cookie-parser: dropping cookie due to name:", name);
    }
    return null;
  }
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e) {
    if (!options.silent) {
      console.error(
        "set-cookie-parser: failed to decode cookie value. Set options.decodeValues=false to disable decoding.",
        e
      );
    }
  }
  var cookie = createNullObj();
  cookie.name = name;
  cookie.value = value;
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key = sides.shift().trim().toLowerCase();
    if (isForbiddenKey(key) || key === "name" || key === "value") {
      if (!options.silent) {
        console.warn("set-cookie-parser: ignoring attribute:", part);
      }
      return;
    }
    var value2 = sides.join("=").trim();
    if (key === "expires") {
      var expires = new Date(value2);
      if (Number.isNaN(expires.getTime())) {
        if (!options.silent) {
          console.error(
            "set-cookie-parser: failed to parse expires time:",
            value2
          );
        }
      } else {
        cookie.expires = expires;
      }
    } else if (key === "max-age") {
      if (/^-?\d+$/.test(value2)) {
        cookie.maxAge = parseInt(value2, 10);
      } else if (!options.silent) {
        console.error("set-cookie-parser: failed to parse max-age:", value2);
      }
    } else if (key === "secure") {
      cookie.secure = true;
    } else if (key === "httponly") {
      cookie.httpOnly = true;
    } else if (key === "samesite") {
      cookie.sameSite = value2;
    } else if (key === "partitioned") {
      cookie.partitioned = true;
    } else if (key) {
      cookie[key] = value2;
    }
  });
  return cookie;
}
function parseNameValuePair(nameValuePairStr) {
  var name = "";
  var value = "";
  var nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name: trimWsp(name), value: trimWsp(value) };
}
function trimWsp(str) {
  var start = 0;
  var end = str.length;
  while (start < end && isWsp(str.charCodeAt(start))) {
    start += 1;
  }
  while (end > start && isWsp(str.charCodeAt(end - 1))) {
    end -= 1;
  }
  return str.substring(start, end);
}
function isWsp(code) {
  return code === 32 || code === 9;
}
function parseSetCookie(input, options) {
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return createNullObj();
    }
  }
  if (input.headers) {
    if (typeof input.headers.getSetCookie === "function") {
      input = input.headers.getSetCookie();
    } else if (input.headers["set-cookie"]) {
      input = input.headers["set-cookie"];
    } else {
      var sch = input.headers[Object.keys(input.headers).find(function(key) {
        return key.toLowerCase() === "set-cookie";
      })];
      if (!sch && input.headers.cookie && !options.silent) {
        console.warn(
          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests."
        );
      }
      input = sch;
    }
  }
  var split = options.split;
  var isArray = Array.isArray(input);
  if (split === "auto") {
    split = !isArray;
  }
  if (!isArray) {
    input = [input];
  }
  input = input.filter(isNonEmptyString);
  if (split) {
    input = input.map(splitCookiesString).flat();
  }
  if (!options.map) {
    return input.map(function(str) {
      return parseString(str, options);
    }).filter(Boolean);
  } else {
    var cookies = createNullObj();
    return input.reduce(function(cookies2, str) {
      var cookie = parseString(str, options);
      if (cookie) {
        cookies2[cookie.name] = cookie;
      }
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
parseSetCookie.parseSetCookie = parseSetCookie;
parseSetCookie.parse = parseSetCookie;
parseSetCookie.parseString = parseString;
parseSetCookie.splitCookiesString = splitCookiesString;

// node_modules/better-call/dist/adapters/node/request.mjs
var getFirstHeaderValue = (header) => {
  if (Array.isArray(header)) return header[0];
  return header;
};
var hasFormUrlEncodedContentType = (headers) => {
  const contentType = getFirstHeaderValue(headers["content-type"]);
  if (!contentType) return false;
  return contentType.toLowerCase().startsWith("application/x-www-form-urlencoded");
};
var isPlainObject = (value) => {
  if (typeof value !== "object" || value === null) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};
var appendFormValue = (params, key, value) => {
  if (value === void 0) return;
  if (Array.isArray(value)) {
    for (const item of value) appendFormValue(params, key, item);
    return;
  }
  if (value === null) {
    params.append(key, "");
    return;
  }
  if (isPlainObject(value)) {
    params.append(key, JSON.stringify(value));
    return;
  }
  params.append(key, `${value}`);
};
var toFormUrlEncodedBody = (body) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(body)) appendFormValue(params, key, value);
  return params.toString();
};
var canReadRawBody = (request) => {
  return !request.destroyed && request.readableEnded !== true && request.readable;
};
var serializeParsedBody = (parsedBody, isFormUrlEncoded) => {
  if (typeof parsedBody === "string") return parsedBody;
  if (parsedBody instanceof URLSearchParams) return parsedBody.toString();
  if (isFormUrlEncoded && isPlainObject(parsedBody)) return toFormUrlEncodedBody(parsedBody);
  return JSON.stringify(parsedBody);
};
function get_raw_body(req, body_size_limit) {
  const h = req.headers;
  if (!h["content-type"]) return null;
  const content_length = Number(h["content-length"]);
  if (req.httpVersionMajor === 1 && isNaN(content_length) && h["transfer-encoding"] == null || content_length === 0) return null;
  let length = content_length;
  if (body_size_limit) {
    if (!length) length = body_size_limit;
    else if (length > body_size_limit) throw Error(`Received content-length of ${length}, but only accept up to ${body_size_limit} bytes.`);
  }
  if (req.destroyed) {
    const readable = new ReadableStream();
    readable.cancel();
    return readable;
  }
  let size = 0;
  let cancelled = false;
  return new ReadableStream({
    start(controller) {
      req.on("error", (error2) => {
        cancelled = true;
        controller.error(error2);
      });
      req.on("end", () => {
        if (cancelled) return;
        controller.close();
      });
      req.on("data", (chunk) => {
        if (cancelled) return;
        size += chunk.length;
        if (size > length) {
          cancelled = true;
          controller.error(/* @__PURE__ */ new Error(`request body size exceeded ${content_length ? "'content-length'" : "BODY_SIZE_LIMIT"} of ${length}`));
          return;
        }
        controller.enqueue(chunk);
        if (controller.desiredSize === null || controller.desiredSize <= 0) req.pause();
      });
    },
    pull() {
      req.resume();
    },
    cancel(reason) {
      cancelled = true;
      req.destroy(reason);
    }
  });
}
function constructRelativeUrl(req) {
  const baseUrl = req.baseUrl;
  const originalUrl = req.originalUrl;
  if (!baseUrl || !originalUrl) return baseUrl ? baseUrl + req.url : req.url;
  if (baseUrl + req.url === originalUrl) return baseUrl + req.url;
  return originalUrl.split("?")[0].at(-1) === "/" ? baseUrl + req.url : baseUrl;
}
function getRequest({ request, base, bodySizeLimit }) {
  const maybeConsumedReq = request;
  const isFormUrlEncoded = hasFormUrlEncodedContentType(request.headers);
  let body = void 0;
  const method = request.method;
  if (method !== "GET" && method !== "HEAD") {
    if (canReadRawBody(request)) body = get_raw_body(request, bodySizeLimit);
    else if (maybeConsumedReq.body !== void 0) {
      const parsedBody = maybeConsumedReq.body;
      const bodyContent = serializeParsedBody(parsedBody, isFormUrlEncoded);
      body = new ReadableStream({ start(controller) {
        controller.enqueue(new TextEncoder().encode(bodyContent));
        controller.close();
      } });
    }
  }
  return new Request(base + constructRelativeUrl(request), {
    duplex: "half",
    method: request.method,
    body,
    headers: request.headers
  });
}
async function setResponse(res, response) {
  for (const [key, value] of response.headers) try {
    res.setHeader(key, key === "set-cookie" ? splitCookiesString(response.headers.get(key)) : value);
  } catch (error2) {
    res.getHeaderNames().forEach((name) => res.removeHeader(name));
    res.writeHead(500).end(String(error2));
    return;
  }
  res.statusCode = response.status;
  res.writeHead(response.status);
  if (!response.body) {
    res.end();
    return;
  }
  if (response.body.locked) {
    res.end("Fatal error: Response body is locked. This can happen when the response was already read (for example through 'response.json()' or 'response.text()').");
    return;
  }
  const reader = response.body.getReader();
  if (res.destroyed) {
    reader.cancel();
    return;
  }
  const cancel = (error2) => {
    res.off("close", cancel);
    res.off("error", cancel);
    reader.cancel(error2).catch(() => {
    });
    if (error2) res.destroy(error2);
  };
  res.on("close", cancel);
  res.on("error", cancel);
  next();
  async function next() {
    try {
      for (; ; ) {
        const { done, value } = await reader.read();
        if (done) break;
        if (!res.write(value)) {
          if (process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT) continue;
          else {
            res.once("drain", next);
            return;
          }
        }
      }
      res.end();
    } catch (error2) {
      cancel(error2 instanceof Error ? error2 : new Error(String(error2)));
    }
  }
}

// node_modules/better-call/dist/node.mjs
function toNodeHandler(handler) {
  return async (req, res) => {
    const base = `${req.headers["x-forwarded-proto"] || (req.socket.encrypted ? "https" : "http")}://${req.headers[":authority"] || req.headers.host}`;
    const response = await handler(getRequest({
      base,
      request: req
    }));
    return setResponse(res, response);
  };
}

// node_modules/better-auth/dist/integrations/node.mjs
var toNodeHandler2 = (auth2) => {
  return "handler" in auth2 ? toNodeHandler(auth2.handler) : toNodeHandler(auth2);
};
function fromNodeHeaders(nodeHeaders) {
  const webHeaders = new Headers();
  for (const [key, value] of Object.entries(nodeHeaders)) if (value !== void 0) {
    if (Array.isArray(value)) value.forEach((v) => webHeaders.append(key, v));
    else webHeaders.set(key, value);
  }
  return webHeaders;
}

// src/config/auth.ts
import dns from "dns";
import { MongoClient } from "mongodb";

// node_modules/better-auth/dist/utils/wildcard.mjs
function escapeRegExpChar(char) {
  if (char === "-" || char === "^" || char === "$" || char === "+" || char === "." || char === "(" || char === ")" || char === "|" || char === "[" || char === "]" || char === "{" || char === "}" || char === "*" || char === "?" || char === "\\") return `\\${char}`;
  else return char;
}
function escapeRegExpString(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) result += escapeRegExpChar(str[i]);
  return result;
}
function transform(pattern, separator = true) {
  if (Array.isArray(pattern)) return `(?:${pattern.map((p) => `^${transform(p, separator)}$`).join("|")})`;
  let separatorSplitter = "";
  let separatorMatcher = "";
  let wildcard = ".";
  if (separator === true) {
    separatorSplitter = "/";
    separatorMatcher = "[/\\\\]";
    wildcard = "[^/\\\\]";
  } else if (separator) {
    separatorSplitter = separator;
    separatorMatcher = escapeRegExpString(separatorSplitter);
    if (separatorMatcher.length > 1) {
      separatorMatcher = `(?:${separatorMatcher})`;
      wildcard = `((?!${separatorMatcher}).)`;
    } else wildcard = `[^${separatorMatcher}]`;
  }
  const requiredSeparator = separator ? `${separatorMatcher}+?` : "";
  const optionalSeparator = separator ? `${separatorMatcher}*?` : "";
  const segments = separator ? pattern.split(separatorSplitter) : [pattern];
  let result = "";
  for (let s = 0; s < segments.length; s++) {
    const segment = segments[s];
    const nextSegment = segments[s + 1];
    let currentSeparator = "";
    if (!segment && s > 0) continue;
    if (separator) {
      if (s === segments.length - 1) currentSeparator = optionalSeparator;
      else if (nextSegment !== "**") currentSeparator = requiredSeparator;
      else currentSeparator = "";
    }
    if (separator && segment === "**") {
      if (currentSeparator) {
        result += s === 0 ? "" : currentSeparator;
        result += `(?:${wildcard}*?${currentSeparator})*?`;
      }
      continue;
    }
    for (let c = 0; c < segment.length; c++) {
      const char = segment[c];
      if (char === "\\") {
        if (c < segment.length - 1) {
          result += escapeRegExpChar(segment[c + 1]);
          c++;
        }
      } else if (char === "?") result += wildcard;
      else if (char === "*") result += `${wildcard}*?`;
      else result += escapeRegExpChar(char);
    }
    result += currentSeparator;
  }
  return result;
}
function isMatch(regexp, sample) {
  if (typeof sample !== "string") throw new TypeError(`Sample must be a string, but ${typeof sample} given`);
  return regexp.test(sample);
}
function wildcardMatch(pattern, options) {
  if (typeof pattern !== "string" && !Array.isArray(pattern)) throw new TypeError(`The first argument must be a single pattern string or an array of patterns, but ${typeof pattern} given`);
  if (typeof options === "string" || typeof options === "boolean") options = { separator: options };
  if (arguments.length === 2 && !(typeof options === "undefined" || typeof options === "object" && options !== null && !Array.isArray(options))) throw new TypeError(`The second argument must be an options object or a string/boolean separator, but ${typeof options} given`);
  options = options || {};
  if (options.separator === "\\") throw new Error("\\ is not a valid separator because it is used for escaping. Try setting the separator to `true` instead");
  const regexpPattern = transform(pattern, options.separator);
  const regexp = new RegExp(`^${regexpPattern}$`, options.flags);
  const fn = isMatch.bind(null, regexp);
  fn.options = options;
  fn.pattern = pattern;
  fn.regexp = regexp;
  return fn;
}

// node_modules/better-auth/dist/utils/url.mjs
var SLASH_CHAR_CODE = "/".charCodeAt(0);
function isLoopbackForDevScheme(host) {
  const hostname = host.replace(/:\d+$/, "").replace(/^\[|\]$/g, "").toLowerCase();
  return hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "::1" || hostname.startsWith("127.");
}
function trimTrailingSlashes(value) {
  let end = value.length;
  while (end > 0 && value.charCodeAt(end - 1) === SLASH_CHAR_CODE) end--;
  return end === value.length ? value : value.slice(0, end);
}
function checkHasPath(url) {
  try {
    return (trimTrailingSlashes(new URL(url).pathname) || "/") !== "/";
  } catch {
    throw new BetterAuthError(`Invalid base URL: ${url}. Please provide a valid base URL.`);
  }
}
function assertHasProtocol(url) {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") throw new BetterAuthError(`Invalid base URL: ${url}. URL must include 'http://' or 'https://'`);
  } catch (error2) {
    if (error2 instanceof BetterAuthError) throw error2;
    throw new BetterAuthError(`Invalid base URL: ${url}. Please provide a valid base URL.`, { cause: error2 });
  }
}
function withPath(url, path2 = "/api/auth") {
  assertHasProtocol(url);
  if (checkHasPath(url)) return url;
  const trimmedUrl = trimTrailingSlashes(url);
  if (!path2 || path2 === "/") return trimmedUrl;
  path2 = path2.startsWith("/") ? path2 : `/${path2}`;
  return `${trimmedUrl}${path2}`;
}
function validateProxyHeader(header, type) {
  if (!header || header.trim() === "") return false;
  if (type === "proto") return header === "http" || header === "https";
  if (type === "host") {
    if ([
      /\.\./,
      /\0/,
      /[\s]/,
      /^[.]/,
      /[<>'"]/,
      /javascript:/i,
      /file:/i,
      /data:/i
    ].some((pattern) => pattern.test(header))) return false;
    return /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(:[0-9]{1,5})?$/.test(header) || /^(\d{1,3}\.){3}\d{1,3}(:[0-9]{1,5})?$/.test(header) || /^\[[0-9a-fA-F:]+\](:[0-9]{1,5})?$/.test(header) || /^localhost(:[0-9]{1,5})?$/i.test(header);
  }
  return false;
}
function getBaseURL(url, path2, request, loadEnv, trustedProxyHeaders) {
  if (url) return withPath(url, path2);
  if (loadEnv !== false) {
    const fromEnv = env.BETTER_AUTH_URL || env.NEXT_PUBLIC_BETTER_AUTH_URL || env.PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_AUTH_URL || (env.BASE_URL !== "/" ? env.BASE_URL : void 0);
    if (fromEnv) return withPath(fromEnv, path2);
  }
  const fromRequest = request?.headers.get("x-forwarded-host");
  const fromRequestProto = request?.headers.get("x-forwarded-proto");
  if (fromRequest && fromRequestProto && trustedProxyHeaders) {
    if (validateProxyHeader(fromRequestProto, "proto") && validateProxyHeader(fromRequest, "host")) try {
      return withPath(`${fromRequestProto}://${fromRequest}`, path2);
    } catch (_error) {
    }
  }
  if (request) {
    const url2 = getOrigin(request.url);
    if (!url2) throw new BetterAuthError("Could not get origin from request. Please provide a valid base URL.");
    return withPath(url2, path2);
  }
  if (typeof window !== "undefined" && window.location) return withPath(window.location.origin, path2);
}
function getOrigin(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.origin === "null" ? null : parsedUrl.origin;
  } catch {
    return null;
  }
}
function getProtocol(url) {
  try {
    return new URL(url).protocol;
  } catch {
    return null;
  }
}
function getHost(url) {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}
function isDynamicBaseURLConfig(config2) {
  return typeof config2 === "object" && config2 !== null && "allowedHosts" in config2 && Array.isArray(config2.allowedHosts);
}
function isRequestLike(value) {
  if (value instanceof Request) return true;
  if (typeof value !== "object" || value === null || Object.prototype.toString.call(value) !== "[object Request]") return false;
  const v = value;
  return typeof v.url === "string" && typeof v.headers === "object" && v.headers !== null && typeof v.headers.get === "function";
}
function getHostFromSource(source, trustedProxyHeaders) {
  const headers = isRequestLike(source) ? source.headers : source;
  if (trustedProxyHeaders) {
    const forwardedHost = headers.get("x-forwarded-host");
    if (forwardedHost && validateProxyHeader(forwardedHost, "host")) return forwardedHost;
  }
  const host = headers.get("host");
  if (host && validateProxyHeader(host, "host")) return host;
  if (isRequestLike(source)) try {
    return new URL(source.url).host;
  } catch {
    return null;
  }
  return null;
}
function getProtocolFromSource(source, configProtocol, trustedProxyHeaders) {
  if (configProtocol === "http" || configProtocol === "https") return configProtocol;
  const headers = isRequestLike(source) ? source.headers : source;
  if (trustedProxyHeaders) {
    const forwardedProto = headers.get("x-forwarded-proto");
    if (forwardedProto && validateProxyHeader(forwardedProto, "proto")) return forwardedProto;
  }
  if (isRequestLike(source)) try {
    const url = new URL(source.url);
    if (url.protocol === "http:" || url.protocol === "https:") return url.protocol.slice(0, -1);
  } catch {
  }
  const host = getHostFromSource(source, trustedProxyHeaders);
  if (host && isLoopbackForDevScheme(host)) return "http";
  return "https";
}
var matchesHostPattern = (host, pattern) => {
  if (!host || !pattern) return false;
  const normalizedHost = host.replace(/^https?:\/\//, "").split("/")[0].toLowerCase();
  const normalizedPattern = pattern.replace(/^https?:\/\//, "").split("/")[0].toLowerCase();
  if (normalizedPattern.includes("*") || normalizedPattern.includes("?")) return wildcardMatch(normalizedPattern)(normalizedHost);
  return normalizedHost.toLowerCase() === normalizedPattern.toLowerCase();
};
function resolveDynamicBaseURL(config2, source, basePath, trustedProxyHeaders) {
  const host = getHostFromSource(source, trustedProxyHeaders);
  if (!host) {
    if (config2.fallback) return withPath(config2.fallback, basePath);
    throw new BetterAuthError("Could not determine host from request headers. Please provide a fallback URL in your baseURL config.");
  }
  if (config2.allowedHosts.some((pattern) => matchesHostPattern(host, pattern))) return withPath(`${getProtocolFromSource(source, config2.protocol, trustedProxyHeaders)}://${host}`, basePath);
  if (config2.fallback) return withPath(config2.fallback, basePath);
  throw new BetterAuthError(`Host "${host}" is not in the allowed hosts list. Allowed hosts: ${config2.allowedHosts.join(", ")}. Add this host to your allowedHosts config or provide a fallback URL.`);
}
function resolveBaseURL(config2, basePath, source, loadEnv, trustedProxyHeaders) {
  if (isDynamicBaseURLConfig(config2)) {
    if (source) return resolveDynamicBaseURL(config2, source, basePath, trustedProxyHeaders);
    if (config2.fallback) return withPath(config2.fallback, basePath);
    return getBaseURL(void 0, basePath, void 0, loadEnv, trustedProxyHeaders);
  }
  const request = isRequestLike(source) ? source : void 0;
  if (typeof config2 === "string") return getBaseURL(config2, basePath, request, loadEnv, trustedProxyHeaders);
  return getBaseURL(void 0, basePath, request, loadEnv, trustedProxyHeaders);
}

// node_modules/better-auth/dist/crypto/random.mjs
var generateRandomString = createRandomStringGenerator("a-z", "0-9", "A-Z", "-_");

// node_modules/better-auth/dist/context/store-capabilities.mjs
function hasServerSessionStore(options) {
  return !!options.database || !!options.secondaryStorage;
}
function hasServerAccountStore(options) {
  return !!options.database;
}
function shouldBindAccountCookieToSessionUser(options) {
  return hasServerAccountStore(options);
}

// node_modules/@noble/hashes/hmac.js
var _HMAC = class {
  oHash;
  iHash;
  blockLen;
  outputLen;
  canXOF = false;
  finished = false;
  destroyed = false;
  constructor(hash, key) {
    ahash(hash);
    abytes(key, void 0, "key");
    this.iHash = hash.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("expected Hash instance");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash.create();
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54 ^ 92;
    this.oHash.update(pad);
    clean(pad);
  }
  update(buf) {
    aexists(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const buf = out.subarray(0, this.outputLen);
    this.iHash.digestInto(buf);
    this.oHash.update(buf);
    this.oHash.digestInto(buf);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to ||= Object.create(Object.getPrototypeOf(this), {});
    const { oHash, iHash, finished, destroyed, blockLen, outputLen, canXOF } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.canXOF = canXOF;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac = /* @__PURE__ */ (() => {
  const hmac_ = ((hash, key, message2) => new _HMAC(hash, key).update(message2).digest());
  hmac_.create = (hash, key) => new _HMAC(hash, key);
  return hmac_;
})();

// node_modules/@noble/hashes/hkdf.js
var HKDF_COUNTER = /* @__PURE__ */ Uint8Array.of(0);
var EMPTY_BUFFER = /* @__PURE__ */ Uint8Array.of();
function expand(hash, prk, info2, length = 32, _recycled) {
  ahash(hash);
  anumber(length, "length");
  abytes(prk, void 0, "prk");
  const olen = hash.outputLen;
  if (prk.length < olen)
    throw new Error('"prk" must be at least HashLen octets');
  if (length > 255 * olen)
    throw new Error("Length must be <= 255*HashLen");
  const blocks = Math.ceil(length / olen);
  if (info2 === void 0)
    info2 = EMPTY_BUFFER;
  else
    abytes(info2, void 0, "info");
  if (!blocks) {
    if (_recycled)
      clean(prk);
    return new Uint8Array();
  }
  const okm = _recycled && blocks === 1 ? prk : new Uint8Array(blocks * olen);
  const { iHash, oHash } = hmac.create(hash, prk);
  const T = _recycled ? prk : new Uint8Array(olen);
  const worker = blocks > 1 ? _recycled?.iHash || hash.create() : void 0;
  for (let counter = 0; counter < blocks - 1; counter++) {
    HKDF_COUNTER[0] = counter + 1;
    const iWork = iHash._cloneInto(worker);
    if (counter)
      iWork.update(T);
    iWork.update(info2).update(HKDF_COUNTER).digestInto(T);
    oHash._cloneInto(worker).update(T).digestInto(T);
    okm.set(T, olen * counter);
  }
  HKDF_COUNTER[0] = blocks;
  if (blocks > 1)
    iHash.update(T);
  iHash.update(info2).update(HKDF_COUNTER).digestInto(T);
  oHash.update(T).digestInto(T);
  okm.set(T, olen * (blocks - 1));
  iHash.destroy();
  oHash.destroy();
  worker?.destroy();
  if (T !== okm)
    clean(T);
  clean(HKDF_COUNTER);
  if (length === okm.length)
    return okm;
  const res = okm.slice(0, length);
  clean(okm);
  return res;
}
var hkdf = (hash, ikm, salt2, info2, length) => {
  ahash(hash);
  if (salt2 === void 0)
    salt2 = new Uint8Array(hash.outputLen);
  const HMAC = hmac.create(hash, salt2).update(ikm);
  return expand(hash, HMAC.digest(), info2, length, HMAC);
};

// node_modules/@noble/hashes/_u64.js
var fromNumH = (n) => n / 2 ** 32 | 0;
var fromNumL = (n) => n >>> 0;
function setU64FromNum(view, byteOffset, n, isLE2) {
  const h = fromNumH(n);
  const l = fromNumL(n);
  view.setUint32(byteOffset, isLE2 ? l : h, isLE2);
  view.setUint32(byteOffset + 4, isLE2 ? h : l, isLE2);
}

// node_modules/@noble/hashes/_md.js
function Chi(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
var HashMD = class {
  blockLen;
  outputLen;
  canXOF = false;
  padOffset;
  isLE;
  // For partial updates less than block size
  buffer;
  view;
  finished = false;
  length = 0;
  pos = 0;
  destroyed = false;
  constructor(blockLen, outputLen, padOffset, isLE2) {
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    abytes(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    let processed = false;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        processed = true;
        continue;
      }
      buffer.set(pos === 0 && take === len ? data : data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
        processed = true;
      }
    }
    this.length += data.length;
    if (processed)
      this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    buffer.fill(0, pos);
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      buffer.fill(0);
    }
    setU64FromNum(view, blockLen - 8, this.length * 8, isLE2);
    this.process(view, 0);
    this.roundClean();
    const oview = out === buffer ? view : createView(out);
    const len = this.outputLen;
    const outLen = len / 4;
    const state = this.get();
    if (len % 4 || outLen > state.length)
      throw new Error("invalid outputLen");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneIntoMeta(to) {
    const { buffer, length, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length;
    to.pos = pos;
    if (pos)
      to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
};
var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);

// node_modules/@noble/hashes/sha2.js
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA2_32B = class extends HashMD {
  // We cannot use array here since array allows indexing by variable
  // which means optimizer/compiler cannot use registers.
  // Numeric initializers matter: starting the fields as `undefined` changes
  // V8's field representation and makes sha256 3x slower (measured).
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  F = 0;
  G = 0;
  H = 0;
  constructor(outputLen, IV) {
    super(64, outputLen, 8, false);
    this.A = IV[0] | 0;
    this.B = IV[1] | 0;
    this.C = IV[2] | 0;
    this.D = IV[3] | 0;
    this.E = IV[4] | 0;
    this.F = IV[5] | 0;
    this.G = IV[6] | 0;
    this.H = IV[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  _cloneInto(to) {
    (to ||= new this.constructor()).set(...this.get());
    return this._cloneIntoMeta(to);
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    clean(SHA256_W);
  }
  destroy() {
    this.destroyed = true;
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var _SHA256 = class extends SHA2_32B {
  constructor() {
    super(32, SHA256_IV);
  }
};
var sha256 = /* @__PURE__ */ createHasher(
  () => new _SHA256(),
  /* @__PURE__ */ oidNist(1)
);

// node_modules/jose/dist/webapi/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var strictDecoder = new TextDecoder("utf-8", { fatal: true });
var UINT32_RANGE = 2 ** 32;
function concat(...buffers) {
  const size = buffers.reduce((acc, { length }) => acc + length, 0), buf = new Uint8Array(size);
  let i = 0;
  for (const buffer of buffers)
    buf.set(buffer, i), i += buffer.length;
  return buf;
}
function writeUInt32BE(buf, value, offset) {
  if (value < 0 || value >= UINT32_RANGE)
    throw new RangeError(`value must be >= 0 and <= ${UINT32_RANGE - 1}. Received ${value}`);
  buf.set([value >>> 24, value >>> 16, value >>> 8, value & 255], offset);
}
function uint64be(value) {
  const high = Math.floor(value / UINT32_RANGE), low = value % UINT32_RANGE, buf = new Uint8Array(8);
  return writeUInt32BE(buf, high, 0), writeUInt32BE(buf, low, 4), buf;
}
function uint32be(value) {
  const buf = new Uint8Array(4);
  return writeUInt32BE(buf, value), buf;
}
var NON_ASCII = /[^\x00-\x7f]/;
function encode(string3) {
  if (typeof string3 == "string" && string3.length >= 128) {
    if (NON_ASCII.test(string3))
      throw new TypeError("non-ASCII string encountered in encode()");
    return encoder.encode(string3);
  }
  const bytes = new Uint8Array(string3.length);
  for (let i = 0; i < string3.length; i++) {
    const code = string3.charCodeAt(i);
    if (code > 127)
      throw new TypeError("non-ASCII string encountered in encode()");
    bytes[i] = code;
  }
  return bytes;
}
function encodeBase64(input, url = false) {
  if (Uint8Array.prototype.toBase64)
    return input.toBase64({ alphabet: url ? "base64url" : "base64", omitPadding: url });
  const CHUNK_SIZE = 32768, arr = [];
  for (let i = 0; i < input.length; i += CHUNK_SIZE)
    arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
  const encoded = btoa(arr.join(""));
  return url ? encoded.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_") : encoded;
}
function decodeBase64(encoded, url = false) {
  if (Uint8Array.fromBase64)
    return Uint8Array.fromBase64(encoded, { alphabet: url ? "base64url" : "base64" });
  if (url) {
    if (encoded.includes("+") || encoded.includes("/"))
      throw new TypeError("Invalid base64url");
    encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
  }
  const binary2 = atob(encoded), bytes = new Uint8Array(binary2.length);
  for (let i = 0; i < binary2.length; i++)
    bytes[i] = binary2.charCodeAt(i);
  return bytes;
}
async function digest(algorithm2, data) {
  const subtleDigest = `SHA-${algorithm2.slice(-3)}`;
  return new Uint8Array(await crypto.subtle.digest(subtleDigest, data));
}

// node_modules/jose/dist/webapi/util/errors.js
var JOSEError = class extends Error {
  static code = "ERR_JOSE_GENERIC";
  code = "ERR_JOSE_GENERIC";
  constructor(message2, options) {
    super(message2, options), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
  }
};
var JWTClaimValidationFailed = class extends JOSEError {
  static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  claim;
  reason;
  payload;
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } }), this.claim = claim, this.reason = reason, this.payload = payload;
  }
};
var JWTExpired = class extends JOSEError {
  static code = "ERR_JWT_EXPIRED";
  code = "ERR_JWT_EXPIRED";
  claim;
  reason;
  payload;
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } }), this.claim = claim, this.reason = reason, this.payload = payload;
  }
};
var JOSEAlgNotAllowed = class extends JOSEError {
  static code = "ERR_JOSE_ALG_NOT_ALLOWED";
  code = "ERR_JOSE_ALG_NOT_ALLOWED";
};
var JOSENotSupported = class extends JOSEError {
  static code = "ERR_JOSE_NOT_SUPPORTED";
  code = "ERR_JOSE_NOT_SUPPORTED";
};
var JWEDecryptionFailed = class extends JOSEError {
  static code = "ERR_JWE_DECRYPTION_FAILED";
  code = "ERR_JWE_DECRYPTION_FAILED";
  constructor(message2 = "decryption operation failed", options) {
    super(message2, options);
  }
};
var JWEInvalid = class extends JOSEError {
  static code = "ERR_JWE_INVALID";
  code = "ERR_JWE_INVALID";
};
var JWSInvalid = class extends JOSEError {
  static code = "ERR_JWS_INVALID";
  code = "ERR_JWS_INVALID";
};
var JWTInvalid = class extends JOSEError {
  static code = "ERR_JWT_INVALID";
  code = "ERR_JWT_INVALID";
};
var JWKInvalid = class extends JOSEError {
  static code = "ERR_JWK_INVALID";
  code = "ERR_JWK_INVALID";
};
var JWKSInvalid = class extends JOSEError {
  static code = "ERR_JWKS_INVALID";
  code = "ERR_JWKS_INVALID";
};
var JWKSNoMatchingKey = class extends JOSEError {
  static code = "ERR_JWKS_NO_MATCHING_KEY";
  code = "ERR_JWKS_NO_MATCHING_KEY";
  constructor(message2 = "no applicable key found in the JSON Web Key Set", options) {
    super(message2, options);
  }
};
var JWKSMultipleMatchingKeys = class extends JOSEError {
  [Symbol.asyncIterator] = async function* () {
  };
  static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  constructor(message2 = "multiple matching keys found in the JSON Web Key Set", options) {
    super(message2, options);
  }
};
var JWKSTimeout = class extends JOSEError {
  static code = "ERR_JWKS_TIMEOUT";
  code = "ERR_JWKS_TIMEOUT";
  constructor(message2 = "request timed out", options) {
    super(message2, options);
  }
};
var JWSSignatureVerificationFailed = class extends JOSEError {
  static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  constructor(message2 = "signature verification failed", options) {
    super(message2, options);
  }
};

// node_modules/jose/dist/webapi/util/base64url.js
var base64url_exports = {};
__export(base64url_exports, {
  decode: () => decode,
  encode: () => encode2
});
var invalid = "The input to be decoded is not correctly encoded.";
function decode(input) {
  try {
    return decodeBase64(typeof input == "string" ? input : decoder.decode(input), true);
  } catch (cause) {
    throw new TypeError(invalid, { cause });
  }
}
function encode2(input) {
  return encodeBase64(typeof input == "string" ? encoder.encode(input) : input, true);
}

// node_modules/jose/dist/webapi/lib/validate.js
function assertUint8Array(input, label) {
  if (!(input instanceof Uint8Array))
    throw new TypeError(`${label} must be an instance of Uint8Array`);
}
function isObject(input) {
  if (typeof input != "object" || input === null || Object.prototype.toString.call(input) !== "[object Object]")
    return false;
  const prototype = Object.getPrototypeOf(input);
  return prototype === null || Object.getPrototypeOf(prototype) === null;
}
function isJwkSet(input) {
  return isObject(input) && Array.isArray(input.keys) && Array.from(input.keys).every(isObject);
}
function isDisjoint(...headers) {
  const parameters = /* @__PURE__ */ new Set();
  for (const header of headers)
    if (header)
      for (const parameter of Object.keys(header)) {
        if (parameters.has(parameter))
          return false;
        parameters.add(parameter);
      }
  return true;
}
function assertNotSet(value, name) {
  if (value !== void 0)
    throw new TypeError(`${name} can only be called once`);
}
function decodeBase64url(value, label, ErrorClass) {
  try {
    return decode(value);
  } catch (cause) {
    throw new ErrorClass(`Failed to base64url decode the ${label}`, { cause });
  }
}
function encodeAsciiMember(value, label, ErrorClass) {
  try {
    return encode(value);
  } catch (cause) {
    throw new ErrorClass(`The ${label} is not a valid base64url string`, { cause });
  }
}
function parseJoseHeader(encodedProtectedHeader, ErrorClass, message2) {
  let parsed;
  try {
    parsed = JSON.parse(strictDecoder.decode(decode(encodedProtectedHeader)));
  } catch (cause) {
    throw new ErrorClass(message2, { cause });
  }
  if (!isObject(parsed))
    throw new ErrorClass(message2);
  return parsed;
}
var JWS_RECOGNIZED = { __proto__: null, b64: true };
var JWE_RECOGNIZED = { __proto__: null };
function validateAlgorithms(option, algorithms) {
  if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s != "string")))
    throw new TypeError(`"${option}" option must be an array of strings`);
  return algorithms === void 0 ? void 0 : new Set(algorithms);
}
function validateCritDuplicates(Err, protectedHeader) {
  const { crit } = protectedHeader ?? {};
  if (Array.isArray(crit) && new Set(crit).size !== crit.length)
    throw new Err('"crit" (Critical) Header Parameter MUST NOT contain duplicate values');
}
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
  if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0)
    throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
  if (!protectedHeader || protectedHeader.crit === void 0)
    return [];
  if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input != "string" || input.length === 0))
    throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  const recognized = recognizedOption === void 0 ? recognizedDefault : { __proto__: null, ...recognizedOption, ...recognizedDefault };
  for (const parameter of protectedHeader.crit) {
    if (!(parameter in recognized))
      throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
    if (!Object.hasOwn(joseHeader, parameter) || joseHeader[parameter] === void 0)
      throw new Err(`Extension Header Parameter "${parameter}" is missing`);
    if (recognized[parameter] && (!Object.hasOwn(protectedHeader, parameter) || protectedHeader[parameter] === void 0))
      throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
  }
  return protectedHeader.crit;
}
function validateB64(protectedHeader, extensions) {
  if (extensions.includes("b64")) {
    const b64 = protectedHeader.b64;
    if (typeof b64 != "boolean")
      throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    return b64;
  }
  return true;
}
function serializeJoseHeader(Err, header) {
  let serialized, parsed;
  try {
    serialized = JSON.stringify(header), parsed = JSON.parse(serialized);
  } catch (cause) {
    throw new Err("JOSE Header is not valid JSON", { cause });
  }
  if (!isObject(parsed))
    throw new Err("JOSE Header is not a JSON object");
  return [parsed, serialized];
}

// node_modules/jose/dist/webapi/lib/key.js
var tag = (key) => key[Symbol.toStringTag];
var jwkMatchesOp = (entry, key, usage) => {
  const { alg: alg2 } = entry;
  if (key.use !== void 0) {
    const expected = usage === "sign" || usage === "verify" ? "sig" : "enc";
    if (key.use !== expected)
      throw new TypeError(`Invalid key for this operation, its "use" must be "${expected}" when present`);
  }
  if (key.kty === "AKP" && key.alg === void 0)
    throw new TypeError('missing "alg" (Algorithm) Parameter value');
  if (key.alg !== void 0 && key.alg !== alg2)
    throw new TypeError(`Invalid key for this operation, its "alg" must be "${alg2}" when present`);
  if (Array.isArray(key.key_ops)) {
    const expectedKeyOp = usage === "encrypt" || usage === "decrypt" ? entry.ops?.[usage === "encrypt" ? 0 : 1] : usage;
    if (expectedKeyOp && !key.key_ops.includes(expectedKeyOp))
      throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${expectedKeyOp}" when present`);
  }
};
async function prepareKey(entry, key, usage) {
  const { alg: alg2, secret } = entry, requiresPrivateKey = usage === "decrypt" || usage === "sign";
  if (secret && key instanceof Uint8Array)
    return key;
  let normalized, keyObject;
  if (isObject(key)) {
    if (normalized = normalizeJwk(key), typeof normalized.kty != "string")
      throw invalidKeyType(alg2, key, secret);
    if (!(secret ? normalized.kty === "oct" && typeof normalized.k == "string" : normalized.kty !== "oct" && (requiresPrivateKey ? normalized.kty === "AKP" && typeof normalized.priv == "string" || typeof normalized.d == "string" : normalized.d === void 0 && normalized.priv === void 0)))
      throw new TypeError(secret ? 'JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present' : `JSON Web Key for this operation must be a ${requiresPrivateKey ? "private" : "public"} JWK`);
    if (jwkMatchesOp(entry, normalized, usage), normalized.kty === "oct")
      return decode(normalized.k);
    if (!Object.isFrozen(key)) {
      const { key_ops } = key;
      Array.isArray(key_ops) && Object.freeze(key_ops), Object.freeze(key);
    }
  } else {
    if (!isKeyLike(key))
      throw invalidKeyType(alg2, key, secret);
    const expectedType = secret ? "secret" : requiresPrivateKey ? "private" : "public";
    if (key.type !== expectedType && (secret || ["secret", "public", "private"].includes(key.type)))
      throw new TypeError(`${tag(key)} instances must be of type "${expectedType}" for the ${alg2} algorithm`);
    if (isCryptoKey(key))
      return key;
    if (keyObject = key, keyObject.type === "secret")
      return keyObject.export();
  }
  cache ||= /* @__PURE__ */ new WeakMap();
  const cacheKey = key;
  let cached2 = cache.get(cacheKey);
  if (cached2?.[alg2])
    return cached2[alg2];
  if (cached2 || cache.set(cacheKey, cached2 = {}), keyObject && typeof keyObject.toCryptoKey == "function") {
    const isPublic = keyObject.type === "public", crv = nist[keyObject.asymmetricKeyDetails?.namedCurve], params = entry.resolve?.({ crv, asymmetricKeyType: keyObject.asymmetricKeyType }) ?? entry.subtle;
    return cached2[alg2] = keyObject.toCryptoKey(params, isPublic, entry.usages[isPublic ? 0 : 1]);
  }
  return normalized ??= keyObject.export({ format: "jwk" }), normalized.alg = alg2, cached2[alg2] = await jwkToKey(entry, normalized);
}
var cache;
var nist = {
  __proto__: null,
  prime256v1: "P-256",
  secp384r1: "P-384",
  secp521r1: "P-521"
};
function assertCryptoKey(key) {
  if (!isCryptoKey(key))
    throw new Error("CryptoKey instance expected");
}
var isCryptoKey = (key) => {
  if (key?.[Symbol.toStringTag] === "CryptoKey")
    return true;
  try {
    return key instanceof CryptoKey;
  } catch {
    return false;
  }
};
var isKeyObject = (key) => key?.[Symbol.toStringTag] === "KeyObject";
var isKeyLike = (key) => isCryptoKey(key) || isKeyObject(key);
function message(msg, actual, ...types) {
  if (types.length > 2) {
    const last = types.pop();
    msg += `one of type ${types.join(", ")}, or ${last}.`;
  } else types.length === 2 ? msg += `one of type ${types[0]} or ${types[1]}.` : msg += `of type ${types[0]}.`;
  return actual == null ? msg += ` Received ${actual}` : typeof actual == "function" && actual.name ? msg += ` Received function ${actual.name}` : typeof actual == "object" && actual != null && actual.constructor?.name && (msg += ` Received an instance of ${actual.constructor.name}`), msg;
}
var invalidKeyInput = (actual, ...types) => message("Key must be ", actual, ...types);
function invalidKeyType(alg2, actual, secret) {
  const types = ["CryptoKey", "KeyObject", "JSON Web Key"];
  return secret && types.push("Uint8Array"), new TypeError(message(`Key for the ${alg2} algorithm must be `, actual, ...types));
}
var unusable = (name, prop = "algorithm.name") => new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
function checkUsage(key, usage) {
  if (usage && !key.usages.includes(usage))
    throw new TypeError(`CryptoKey does not support this operation, its usages must include ${usage}.`);
}
function checkModulusLength(alg2, key) {
  const { modulusLength } = key.algorithm;
  if (typeof modulusLength != "number" || modulusLength < 2048)
    throw new TypeError(`${alg2} requires key modulusLength to be 2048 bits or larger`);
}
function checkCryptoKey(key, expected, usage) {
  const algorithm2 = key.algorithm;
  if (algorithm2.name !== expected.name)
    throw unusable(expected.name);
  if (expected.hash && algorithm2.hash?.name !== expected.hash)
    throw unusable(expected.hash, "algorithm.hash");
  if (expected.namedCurve && algorithm2.namedCurve !== expected.namedCurve)
    throw unusable(expected.namedCurve, "algorithm.namedCurve");
  if (expected.length !== void 0 && algorithm2.length !== expected.length)
    throw unusable(expected.length, "algorithm.length");
  checkUsage(key, usage);
}
function snapshotJwk(jwk) {
  return { __proto__: null, ...jwk };
}
function normalizeJwk(jwk) {
  const normalized = snapshotJwk(jwk);
  if (normalized.ext !== void 0 && typeof normalized.ext != "boolean")
    throw new TypeError('"ext" (Extractable) Parameter must be a boolean');
  if (normalized.key_ops !== void 0) {
    const value = normalized.key_ops, keyOps = Array.isArray(value) ? [...value] : void 0;
    if (!keyOps || keyOps.some((operation) => typeof operation != "string") || new Set(keyOps).size !== keyOps.length)
      throw new TypeError('"key_ops" (Key Operations) Parameter must be an array of unique strings');
    normalized.key_ops = keyOps;
  }
  return normalized;
}
function validateExtractableOption(extractable) {
  if (extractable !== void 0 && typeof extractable != "boolean")
    throw new TypeError('"extractable" option must be a boolean');
  return extractable;
}
async function jwkToKey(entry, jwk, extractable) {
  if (!entry.kty.includes(jwk.kty))
    throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
  const algorithm2 = entry.resolve?.({ kty: jwk.kty, crv: jwk.crv }) ?? entry.subtle, isPrivate = !!(jwk.d || jwk.priv), keyData = { ...jwk, ext: extractable ?? jwk.ext };
  return keyData.kty !== "AKP" && delete keyData.alg, delete keyData.use, crypto.subtle.importKey("jwk", keyData, algorithm2, keyData.ext ?? !isPrivate, jwk.key_ops ?? entry.usages[isPrivate ? 1 : 0]);
}
async function rawKey(key, expected, usage, extractable = false) {
  return key instanceof Uint8Array && (key = await crypto.subtle.importKey("raw", key, expected, extractable, [usage])), checkCryptoKey(key, expected, usage), key;
}

// node_modules/jose/dist/webapi/lib/content_encryption.js
var generateCek = (enc2) => crypto.getRandomValues(new Uint8Array(enc2.cekBits >> 3));
function checkCekLength(cek, expected) {
  const actual = cek.byteLength << 3;
  if (actual !== expected)
    throw new JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
}
var generateIv = (enc2) => crypto.getRandomValues(new Uint8Array(enc2.ivBits >> 3));
function checkIvLength(enc2, iv) {
  if (iv.length << 3 !== enc2.ivBits)
    throw new JWEInvalid("Invalid Initialization Vector length");
}
async function cbcKeySetup(enc2, cek, usage) {
  if (!(cek instanceof Uint8Array))
    throw new TypeError(invalidKeyInput(cek, "Uint8Array"));
  const keyLengthBits = enc2.cekBits >> 1, encKey = await crypto.subtle.importKey("raw", cek.subarray(keyLengthBits >> 3), "AES-CBC", false, [usage]), macKey = await crypto.subtle.importKey("raw", cek.subarray(0, keyLengthBits >> 3), {
    hash: `SHA-${keyLengthBits << 1}`,
    name: "HMAC"
  }, false, ["sign"]);
  return [encKey, macKey, keyLengthBits];
}
async function cbcHmacTag(macKey, macData, keyLengthBits) {
  return new Uint8Array((await crypto.subtle.sign("HMAC", macKey, macData)).slice(0, keyLengthBits >> 3));
}
async function cbcEncrypt(enc2, plaintext, cek, iv, aad) {
  const [encKey, macKey, keyLengthBits] = await cbcKeySetup(enc2, cek, "encrypt"), ciphertext = new Uint8Array(await crypto.subtle.encrypt({
    iv,
    name: "AES-CBC"
  }, encKey, plaintext)), al = uint64be(aad.length * 8), macData = concat(aad, iv, ciphertext, al), tag2 = await cbcHmacTag(macKey, macData, keyLengthBits);
  return { ciphertext, tag: tag2, iv };
}
async function timingSafeEqual(a, b) {
  const algorithm2 = { name: "HMAC", hash: "SHA-256" }, key = await crypto.subtle.generateKey(algorithm2, false, ["sign", "verify"]), aHmac = await crypto.subtle.sign(algorithm2, key, a);
  return crypto.subtle.verify(algorithm2, key, aHmac, b);
}
async function cbcDecrypt(enc2, cek, ciphertext, iv, tag2, aad) {
  const [encKey, macKey, keyLengthBits] = await cbcKeySetup(enc2, cek, "decrypt"), al = uint64be(aad.length * 8), macData = concat(aad, iv, ciphertext, al), expectedTag = await cbcHmacTag(macKey, macData, keyLengthBits);
  try {
    if (await timingSafeEqual(tag2, expectedTag))
      return new Uint8Array(await crypto.subtle.decrypt({ iv, name: "AES-CBC" }, encKey, ciphertext));
  } catch {
  }
  throw new JWEDecryptionFailed();
}
async function encrypt(enc2, plaintext, cek, iv, aad) {
  if (!isCryptoKey(cek) && !(cek instanceof Uint8Array))
    throw new TypeError(invalidKeyInput(cek, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
  if (iv ? checkIvLength(enc2, iv) : iv = generateIv(enc2), cek instanceof Uint8Array && checkCekLength(cek, enc2.cekBits), enc2.cbc)
    return cbcEncrypt(enc2, plaintext, cek, iv, aad);
  const encKey = await rawKey(cek, enc2.subtle, "encrypt"), encrypted = new Uint8Array(await crypto.subtle.encrypt({
    additionalData: aad,
    iv,
    name: "AES-GCM",
    tagLength: 128
  }, encKey, plaintext));
  return { ciphertext: encrypted.subarray(0, -16), tag: encrypted.subarray(-16), iv };
}
async function decrypt(enc2, cek, ciphertext, iv, tag2, aad) {
  if (!isCryptoKey(cek) && !(cek instanceof Uint8Array))
    throw new TypeError(invalidKeyInput(cek, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
  if (!iv)
    throw new JWEInvalid("JWE Initialization Vector missing");
  if (!tag2)
    throw new JWEInvalid("JWE Authentication Tag missing");
  if (!enc2.cbc && tag2.length !== 16)
    throw new JWEInvalid("Invalid Authentication Tag length");
  if (checkIvLength(enc2, iv), cek instanceof Uint8Array && checkCekLength(cek, enc2.cekBits), enc2.cbc)
    return cbcDecrypt(enc2, cek, ciphertext, iv, tag2, aad);
  const encKey = await rawKey(cek, enc2.subtle, "decrypt");
  try {
    return new Uint8Array(await crypto.subtle.decrypt({
      additionalData: aad,
      iv,
      name: "AES-GCM",
      tagLength: 128
    }, encKey, concat(ciphertext, tag2)));
  } catch {
    throw new JWEDecryptionFailed();
  }
}

// node_modules/jose/dist/webapi/lib/key_descriptor.js
function table(entries) {
  const out = { __proto__: null };
  for (const alg2 in entries)
    out[alg2] = { ...entries[alg2], alg: alg2 };
  return out;
}

// node_modules/jose/dist/webapi/lib/jwe_algorithms.js
var wrap = [
  ["encrypt", "wrapKey"],
  ["decrypt", "unwrapKey"]
];
var derive = [[], ["deriveBits"]];
var none = [[], []];
function rsaes(bits) {
  return {
    kty: ["RSA"],
    mode: "key-encryption",
    subtle: { name: "RSA-OAEP", hash: `SHA-${bits}` },
    usages: wrap,
    ops: ["wrapKey", "unwrapKey"]
  };
}
function ecdh(mode) {
  return {
    kty: ["EC", "OKP"],
    mode,
    subtle: { name: "ECDH" },
    resolve: ({ kty, crv, asymmetricKeyType }) => {
      if (crv === "X25519" || asymmetricKeyType === "x25519")
        return { name: "X25519" };
      if (kty === "OKP")
        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      return { name: "ECDH", namedCurve: crv };
    },
    usages: derive,
    ops: [void 0, "deriveBits"]
  };
}
function aeskw(bits, gcm = false) {
  return {
    kty: ["oct"],
    mode: "key-wrapping",
    secret: true,
    subtle: { name: gcm ? "AES-GCM" : "AES-KW", length: bits },
    usages: none,
    ops: gcm ? ["encrypt", "decrypt"] : ["wrapKey", "unwrapKey"]
  };
}
function pbes2() {
  return {
    kty: ["oct"],
    mode: "key-wrapping",
    secret: true,
    subtle: { name: "PBKDF2" },
    usages: none,
    ops: ["deriveBits", "deriveBits"]
  };
}
var JWE = table({
  dir: {
    kty: ["oct"],
    mode: "direct-encryption",
    secret: true,
    subtle: { name: "AES-GCM" },
    usages: none,
    ops: ["encrypt", "decrypt"]
  },
  "RSA-OAEP": rsaes(1),
  "RSA-OAEP-256": rsaes(256),
  "RSA-OAEP-384": rsaes(384),
  "RSA-OAEP-512": rsaes(512),
  "ECDH-ES": ecdh("direct-key-agreement"),
  "ECDH-ES+A128KW": ecdh("key-agreement-with-key-wrapping"),
  "ECDH-ES+A192KW": ecdh("key-agreement-with-key-wrapping"),
  "ECDH-ES+A256KW": ecdh("key-agreement-with-key-wrapping"),
  A128KW: aeskw(128),
  A192KW: aeskw(192),
  A256KW: aeskw(256),
  A128GCMKW: aeskw(128, true),
  A192GCMKW: aeskw(192, true),
  A256GCMKW: aeskw(256, true),
  "PBES2-HS256+A128KW": pbes2(),
  "PBES2-HS384+A192KW": pbes2(),
  "PBES2-HS512+A256KW": pbes2()
});
var contentOps = ["encrypt", "decrypt"];
function contentEncryption(bits, cbc = false) {
  return {
    kty: ["oct"],
    secret: true,
    subtle: { name: cbc ? "AES-CBC" : "AES-GCM", length: bits },
    usages: none,
    ops: contentOps,
    cekBits: bits,
    ivBits: cbc ? 128 : 96,
    cbc
  };
}
var ENC = table({
  A128GCM: contentEncryption(128),
  A192GCM: contentEncryption(192),
  A256GCM: contentEncryption(256),
  "A128CBC-HS256": contentEncryption(256, true),
  "A192CBC-HS384": contentEncryption(384, true),
  "A256CBC-HS512": contentEncryption(512, true)
});
function unsupported(parameter, name) {
  throw new JOSENotSupported(`Invalid or unsupported "${parameter}" (JWE ${name}) header value`);
}
function jweAlgorithm(alg2) {
  return (typeof alg2 == "string" ? JWE[alg2] : void 0) ?? unsupported("alg", "Algorithm");
}
function isJWECEKTransport(algorithm2) {
  return algorithm2.mode === "key-wrapping" || algorithm2.mode === "key-encryption" || algorithm2.mode === "key-agreement-with-key-wrapping";
}
function jweEncryption(enc2) {
  return (typeof enc2 == "string" ? ENC[enc2] : void 0) ?? unsupported("enc", "Encryption Algorithm");
}

// node_modules/jose/dist/webapi/lib/key_management.js
function checkEcdhCryptoKey(key, usage) {
  if (key.algorithm.name !== "ECDH" && key.algorithm.name !== "X25519")
    throw new TypeError("CryptoKey does not support this operation, its algorithm.name must be ECDH or X25519");
  checkUsage(key, usage);
}
async function aeskwWrap(alg2, key, cek) {
  const cryptoKey = await rawKey(key, jweAlgorithm(alg2).subtle, "wrapKey", true), cryptoKeyCek = await crypto.subtle.importKey("raw", cek, { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
  return new Uint8Array(await crypto.subtle.wrapKey("raw", cryptoKeyCek, cryptoKey, "AES-KW"));
}
async function aeskwUnwrap(alg2, key, encryptedKey) {
  const cryptoKey = await rawKey(key, jweAlgorithm(alg2).subtle, "unwrapKey", true), cryptoKeyCek = await crypto.subtle.unwrapKey("raw", encryptedKey, cryptoKey, "AES-KW", { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
  return new Uint8Array(await crypto.subtle.exportKey("raw", cryptoKeyCek));
}
function checkRsaKey(alg2, key, usage) {
  checkCryptoKey(key, jweAlgorithm(alg2).subtle, usage), checkModulusLength(alg2, key);
}
async function deriveKey(p2s, alg2, p2c, key) {
  if (!(p2s instanceof Uint8Array) || p2s.length < 8)
    throw new JWEInvalid("PBES2 Salt Input must be 8 or more octets");
  if (!Number.isSafeInteger(p2c) || Math.sign(p2c) !== 1)
    throw new JWEInvalid("PBES2 Count Input must be a positive integer");
  const salt2 = concat(encode(alg2), Uint8Array.of(0), p2s), keyLengthBits = parseInt(alg2.slice(13, 16), 10), subtleAlg = {
    hash: `SHA-${alg2.slice(8, 11)}`,
    iterations: p2c,
    name: "PBKDF2",
    salt: salt2
  }, cryptoKey = await rawKey(key, jweAlgorithm(alg2).subtle, "deriveBits");
  return new Uint8Array(await crypto.subtle.deriveBits(subtleAlg, cryptoKey, keyLengthBits));
}
function lengthAndInput(input) {
  return concat(uint32be(input.length), input);
}
async function concatKdf(Z, keyDataLength, OtherInfo) {
  const dkLen = keyDataLength >> 3, hashLen = 32, reps = Math.ceil(dkLen / hashLen), dk = new Uint8Array(reps * hashLen);
  for (let i = 1; i <= reps; i++) {
    const hashResult = await digest("sha256", concat(uint32be(i), Z, OtherInfo));
    dk.set(hashResult, (i - 1) * hashLen);
  }
  return dk.slice(0, dkLen);
}
async function ecdhesDeriveKey(publicKey, privateKey, algorithmId, keyDataLength, apu = new Uint8Array(), apv = new Uint8Array()) {
  checkEcdhCryptoKey(publicKey), checkEcdhCryptoKey(privateKey, "deriveBits");
  const otherInfo = concat(lengthAndInput(encode(algorithmId)), lengthAndInput(apu), lengthAndInput(apv), uint32be(keyDataLength)), Z = new Uint8Array(await crypto.subtle.deriveBits({
    name: publicKey.algorithm.name,
    public: publicKey
  }, privateKey, publicKey.algorithm.name === "X25519" ? 256 : Math.ceil(parseInt(publicKey.algorithm.namedCurve.slice(-3), 10) / 8) << 3));
  return concatKdf(Z, keyDataLength, otherInfo);
}
function assertEcdhKey(key) {
  assertCryptoKey(key);
  const curve = key.algorithm.namedCurve;
  if (curve !== "P-256" && curve !== "P-384" && curve !== "P-521" && key.algorithm.name !== "X25519")
    throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
}
function partyInfo(joseHeader, name) {
  const value = joseHeader[name];
  if (value !== void 0) {
    if (typeof value != "string")
      throw new JWEInvalid(`JOSE Header "${name}" (Agreement Party${name === "apu" ? "U" : "V"}Info) invalid`);
    return decodeBase64url(value, name, JWEInvalid);
  }
}
function checkPartyInfo(apu, apv) {
  if (!(apu === void 0 || apv === void 0 || apu.byteLength !== apv.byteLength)) {
    for (let i = 0; i < apu.byteLength; i++)
      if (apu[i] !== apv[i])
        return;
    throw new JWEInvalid('JOSE Header "apu" and "apv" values must be distinct');
  }
}
function assertEncryptedKey(encryptedKey) {
  if (encryptedKey === void 0)
    throw new JWEInvalid("JWE Encrypted Key missing");
}
function assertNoEncryptedKey(encryptedKey) {
  if (encryptedKey !== void 0)
    throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
}
function validateMaxPBES2Count(value) {
  if (value !== void 0 && value !== 1 / 0 && (!Number.isSafeInteger(value) || value < 1))
    throw new TypeError("maxPBES2Count must be a positive safe integer or Infinity");
}
async function decryptKeyManagement(entry, enc2, key, encryptedKey, joseHeader, maxPBES2Count) {
  const { alg: alg2 } = entry, mode = entry.mode;
  if (mode === "direct-encryption")
    return assertNoEncryptedKey(encryptedKey), key;
  const direct = mode === "direct-key-agreement";
  switch (direct ? assertNoEncryptedKey(encryptedKey) : assertEncryptedKey(encryptedKey), entry.subtle.name) {
    case "ECDH": {
      const { epk } = joseHeader;
      if (!isObject(epk) || ["d", "k", "p", "q", "dp", "dq", "qi", "oth", "priv"].some((parameter) => Object.hasOwn(epk, parameter)))
        throw new JWEInvalid('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
      assertEcdhKey(key);
      const ephemeralPublicKey = await jwkToKey(entry, epk), partyUInfo = partyInfo(joseHeader, "apu"), partyVInfo = partyInfo(joseHeader, "apv");
      checkPartyInfo(partyUInfo, partyVInfo);
      const derivedKey = await ecdhesDeriveKey(ephemeralPublicKey, key, direct ? enc2.alg : alg2, direct ? enc2.cekBits : parseInt(alg2.slice(-5, -2), 10), partyUInfo, partyVInfo);
      if (direct)
        return derivedKey;
      key = derivedKey;
      break;
    }
    case "RSA-OAEP":
      return assertCryptoKey(key), checkRsaKey(alg2, key, "decrypt"), new Uint8Array(await crypto.subtle.decrypt("RSA-OAEP", key, encryptedKey));
    case "PBKDF2": {
      if (typeof joseHeader.p2c != "number")
        throw new JWEInvalid('JOSE Header "p2c" (PBES2 Count) missing or invalid');
      const p2cLimit = maxPBES2Count ?? 1e4;
      if (joseHeader.p2c > p2cLimit)
        throw new JWEInvalid('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
      if (typeof joseHeader.p2s != "string")
        throw new JWEInvalid('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
      const p2s = decodeBase64url(joseHeader.p2s, "p2s", JWEInvalid);
      key = await deriveKey(p2s, alg2, joseHeader.p2c, key);
      break;
    }
    case "AES-GCM": {
      if (typeof joseHeader.iv != "string")
        throw new JWEInvalid('JOSE Header "iv" (Initialization Vector) missing or invalid');
      if (typeof joseHeader.tag != "string")
        throw new JWEInvalid('JOSE Header "tag" (Authentication Tag) missing or invalid');
      const iv = decodeBase64url(joseHeader.iv, "iv", JWEInvalid), tag2 = decodeBase64url(joseHeader.tag, "tag", JWEInvalid);
      if (iv.byteLength !== 12)
        throw new JWEInvalid("Invalid Initialization Vector length");
      if (tag2.byteLength !== 16)
        throw new JWEInvalid("Invalid Authentication Tag length");
      return decrypt(jweEncryption(alg2.slice(0, -2)), key, encryptedKey, iv, tag2, new Uint8Array());
    }
  }
  return aeskwUnwrap(alg2.slice(-6), key, encryptedKey);
}
async function encryptKeyManagement(entry, enc2, inputKey, joseHeader, providedCek, providedParameters = {}) {
  const { alg: alg2, mode } = entry, transport = isJWECEKTransport(entry);
  if (providedCek !== void 0 && !transport)
    throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${alg2}`);
  let key = await prepareKey(mode === "direct-encryption" ? enc2 : entry, inputKey, "encrypt");
  if (mode === "direct-encryption")
    return [key, void 0, void 0];
  const cek = transport ? providedCek ?? generateCek(enc2) : void 0;
  cek && checkCekLength(cek, enc2.cekBits);
  let encryptedKey, parameters;
  switch (entry.subtle.name) {
    case "ECDH": {
      assertEcdhKey(key);
      const { apu: providedApu, apv: providedApv } = providedParameters;
      providedApu !== void 0 && assertUint8Array(providedApu, '"apu"'), providedApv !== void 0 && assertUint8Array(providedApv, '"apv"');
      const apu = providedApu ?? partyInfo(joseHeader, "apu"), apv = providedApv ?? partyInfo(joseHeader, "apv");
      checkPartyInfo(apu, apv);
      let ephemeralPrivateKey;
      providedParameters.epk !== void 0 ? ephemeralPrivateKey = await prepareKey(entry, providedParameters.epk, "decrypt") : ephemeralPrivateKey = (await crypto.subtle.generateKey(key.algorithm, true, ["deriveBits"])).privateKey;
      const subtle = crypto.subtle;
      let exportableEpk = ephemeralPrivateKey;
      if (!exportableEpk.extractable) {
        if (typeof subtle.getPublicKey != "function")
          throw new TypeError('CryptoKey for "epk" must be extractable');
        exportableEpk = await subtle.getPublicKey(ephemeralPrivateKey, []);
      }
      const { x, y, crv, kty } = await subtle.exportKey("jwk", exportableEpk), direct = mode === "direct-key-agreement", derivedKey = await ecdhesDeriveKey(key, ephemeralPrivateKey, direct ? enc2.alg : alg2, direct ? enc2.cekBits : parseInt(alg2.slice(-5, -2), 10), apu, apv), epk = { x, crv, kty };
      if (kty === "EC" && (epk.y = y), parameters = { epk }, providedApu !== void 0 && (parameters.apu = encode2(providedApu)), providedApv !== void 0 && (parameters.apv = encode2(providedApv)), direct)
        return [derivedKey, void 0, parameters];
      key = derivedKey;
      break;
    }
    case "RSA-OAEP": {
      assertCryptoKey(key), checkRsaKey(alg2, key, "encrypt"), encryptedKey = new Uint8Array(await crypto.subtle.encrypt("RSA-OAEP", key, cek));
      break;
    }
    case "PBKDF2": {
      const { p2c = 2048, p2s = crypto.getRandomValues(new Uint8Array(16)) } = providedParameters;
      key = await deriveKey(p2s, alg2, p2c, key), parameters = { p2c, p2s: encode2(p2s) };
      break;
    }
    case "AES-GCM": {
      const iv = providedParameters.iv === void 0 ? crypto.getRandomValues(new Uint8Array(12)) : providedParameters.iv;
      if (!(iv instanceof Uint8Array))
        throw new TypeError('"iv" must be an instance of Uint8Array');
      const wrapped = await encrypt(jweEncryption(alg2.slice(0, -2)), cek, key, iv, new Uint8Array());
      encryptedKey = wrapped.ciphertext, parameters = { iv: encode2(wrapped.iv), tag: encode2(wrapped.tag) };
    }
  }
  if (encryptedKey ??= await aeskwWrap(alg2.slice(-6), key, cek), !(encryptedKey instanceof Uint8Array) || !encryptedKey.byteLength)
    throw new TypeError("JWE key management algorithm did not produce an Encrypted Key");
  return [cek, encryptedKey, parameters];
}

// node_modules/jose/dist/webapi/lib/deflate.js
function validateZip(joseHeader, protectedHeader) {
  if (joseHeader.zip !== void 0 && joseHeader.zip !== "DEF")
    throw new JOSENotSupported('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value.');
  if (joseHeader.zip !== void 0 && !protectedHeader?.zip)
    throw new JWEInvalid('JWE "zip" (Compression Algorithm) Header Parameter MUST be in a protected header.');
}
function supported(name) {
  if (typeof globalThis[name] > "u")
    throw new JOSENotSupported(`JWE "zip" (Compression Algorithm) Header Parameter requires the ${name} API.`);
}
async function transform2(stream, input, maxLength = 1 / 0) {
  const writer = stream.writable.getWriter();
  writer.write(input).catch(() => {
  }), writer.close().catch(() => {
  });
  const chunks = [];
  let length = 0;
  const reader = stream.readable.getReader();
  for (; ; ) {
    const { value, done } = await reader.read();
    if (done)
      break;
    if (chunks.push(value), length += value.byteLength, maxLength !== 1 / 0 && length > maxLength)
      throw await reader.cancel().catch(() => {
      }), new JWEInvalid("Decompressed plaintext exceeded the configured limit");
  }
  return concat(...chunks);
}
async function compress(input) {
  return supported("CompressionStream"), transform2(new CompressionStream("deflate-raw"), input);
}
async function decompress(input, maxLength) {
  return supported("DecompressionStream"), transform2(new DecompressionStream("deflate-raw"), input, maxLength);
}

// node_modules/jose/dist/webapi/lib/jwe_decrypt.js
function shareJWE(jwe) {
  const { protected: encodedProtected, ciphertext, iv, tag: tag2, aad } = jwe;
  let protectedHeader;
  return encodedProtected !== void 0 && (protectedHeader = parseJoseHeader(encodedProtected, JWEInvalid, "JWE Protected Header is invalid")), [
    protectedHeader,
    decodeBase64url(ciphertext, "ciphertext", JWEInvalid),
    iv !== void 0 ? decodeBase64url(iv, "iv", JWEInvalid) : void 0,
    tag2 !== void 0 ? decodeBase64url(tag2, "tag", JWEInvalid) : void 0,
    encodeAsciiMember((encodedProtected ?? "") + (aad !== void 0 ? `.${aad}` : ""), "aad", JWEInvalid)
  ];
}
function prepareDecrypt(options) {
  const keyManagementAlgorithms = options && validateAlgorithms("keyManagementAlgorithms", options.keyManagementAlgorithms), contentEncryptionAlgorithms = options && validateAlgorithms("contentEncryptionAlgorithms", options.contentEncryptionAlgorithms), { crit, maxPBES2Count, maxDecompressedLength } = options ?? {};
  validateMaxPBES2Count(maxPBES2Count);
  const decompressionLimit = maxDecompressedLength ?? 25e4;
  if (decompressionLimit !== 0 && decompressionLimit !== 1 / 0 && (!Number.isSafeInteger(decompressionLimit) || decompressionLimit < 1))
    throw new TypeError("maxDecompressedLength must be 0, a positive safe integer, or Infinity");
  return [
    keyManagementAlgorithms,
    contentEncryptionAlgorithms,
    crit,
    maxPBES2Count,
    maxDecompressedLength
  ];
}
async function decryptJWE(jwe, shared, key, token = shareJWE(jwe)) {
  const [protectedHeader, ciphertext, iv, tag2, additionalAuthenticatedData] = token, { header, unprotected, aad } = jwe;
  let joseHeader;
  if (header !== void 0 || unprotected !== void 0) {
    if (!isDisjoint(protectedHeader, header, unprotected))
      throw new JWEInvalid("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
    joseHeader = { ...protectedHeader, ...header, ...unprotected };
  } else
    joseHeader = protectedHeader ?? {};
  const [keyManagementAlgorithms, contentEncryptionAlgorithms, crit, maxPBES2Count, maxDecompressedLength] = shared, { encrypted_key: encodedKey } = jwe;
  validateCrit(JWEInvalid, JWE_RECOGNIZED, crit, protectedHeader, joseHeader), validateZip(joseHeader, protectedHeader);
  const { alg: alg2, enc: enc2 } = joseHeader;
  if (typeof alg2 != "string" || !alg2)
    throw new JWEInvalid("missing JWE Algorithm (alg) in JWE Header");
  const selected = JWE[alg2];
  if (encodedKey === "" && (!selected || !isJWECEKTransport(selected)))
    throw new JWEInvalid("JWE Encrypted Key incorrect type");
  const integrated = selected?.mode === "integrated-encryption";
  if (!integrated && (typeof enc2 != "string" || !enc2))
    throw new JWEInvalid("missing JWE Encryption Algorithm (enc) in JWE Header");
  if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg2) || !keyManagementAlgorithms && alg2.startsWith("PBES2"))
    throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
  let encEntry;
  if (integrated) {
    if (enc2 !== void 0)
      throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter must not be present for integrated encryption');
    if (iv?.byteLength)
      throw new JWEInvalid("JWE Initialization Vector must be empty for integrated encryption");
    if (tag2?.byteLength)
      throw new JWEInvalid("JWE Authentication Tag must be empty for integrated encryption");
  } else {
    if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc2))
      throw new JOSEAlgNotAllowed('"enc" (Encryption Algorithm) Header Parameter value not allowed');
    encEntry = jweEncryption(enc2);
  }
  let encryptedKey;
  if (encodedKey !== void 0)
    try {
      encryptedKey = decodeBase64url(encodedKey, "encrypted_key", JWEInvalid);
    } catch (error2) {
      if (!selected || !isJWECEKTransport(selected))
        throw error2;
      encryptedKey = new Uint8Array();
    }
  let resolvedKey = false;
  typeof key == "function" && (key = await key(protectedHeader, jwe), resolvedKey = true);
  const algEntry = selected ?? jweAlgorithm(alg2);
  isJWECEKTransport(algEntry) && encryptedKey === void 0 && (encryptedKey = new Uint8Array());
  const k = await prepareKey(algEntry.mode === "direct-encryption" ? encEntry : algEntry, key, "decrypt");
  let plaintext;
  if (algEntry.mode === "integrated-encryption")
    plaintext = await algEntry.decrypt(k, encryptedKey, ciphertext, additionalAuthenticatedData, protectedHeader, joseHeader);
  else {
    const encryption = encEntry;
    let cek;
    try {
      cek = await decryptKeyManagement(algEntry, encryption, k, encryptedKey, joseHeader, maxPBES2Count), isJWECEKTransport(algEntry) && cek instanceof Uint8Array && cek.byteLength << 3 !== encryption.cekBits && (cek = generateCek(encryption));
    } catch (err) {
      if (err instanceof TypeError || err instanceof JWEInvalid || err instanceof JOSENotSupported)
        throw err;
      cek = generateCek(encryption);
    }
    plaintext = await decrypt(encryption, cek, ciphertext, iv, tag2, additionalAuthenticatedData);
  }
  if (joseHeader.zip === "DEF") {
    const decompressionLimit = maxDecompressedLength ?? 25e4;
    if (decompressionLimit === 0)
      throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
    plaintext = await decompress(plaintext, decompressionLimit).catch((cause) => {
      throw cause instanceof JWEInvalid || cause instanceof JOSENotSupported ? cause : new JWEInvalid("Failed to decompress plaintext", { cause });
    });
  }
  return {
    plaintext,
    ...protectedHeader && { protectedHeader },
    ...aad !== void 0 && {
      additionalAuthenticatedData: decodeBase64url(aad, "aad", JWEInvalid)
    },
    ...unprotected && { sharedUnprotectedHeader: unprotected },
    ...header && { unprotectedHeader: header },
    ...resolvedKey && { key: k }
  };
}
async function decryptCompact(jwe, shared, key) {
  if (jwe instanceof Uint8Array && (jwe = decoder.decode(jwe)), typeof jwe != "string")
    throw new JWEInvalid("Compact JWE must be a string or Uint8Array");
  const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag2, length } = jwe.split(".");
  if (length !== 5)
    throw new JWEInvalid("Invalid Compact JWE");
  return decryptJWE({
    ciphertext,
    iv: iv || void 0,
    protected: protectedHeader,
    tag: tag2 || void 0,
    encrypted_key: encryptedKey || void 0
  }, shared, key);
}

// node_modules/jose/dist/webapi/lib/jwe_encrypt.js
function checkDisjoint(protectedHeader, unprotectedHeader, sharedUnprotectedHeader) {
  if (!isDisjoint(protectedHeader, unprotectedHeader, sharedUnprotectedHeader))
    throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
}
function checkEncryptHeaders(input, options, sharedHeadersNormalized = false) {
  if (!input[1] && !input[2] && !input[3])
    throw new JWEInvalid("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
  options !== void 0 && (input[8] = options?.crit);
  let [, protectedHeader, unprotectedHeader, sharedUnprotectedHeader, aad, cek, iv, keyManagementParameters, crit] = input;
  if (aad !== void 0 && assertUint8Array(aad, "JWE Additional Authenticated Data"), cek !== void 0 && assertUint8Array(cek, "JWE Content Encryption Key"), iv !== void 0 && assertUint8Array(iv, "JWE Initialization Vector"), !sharedHeadersNormalized && protectedHeader !== void 0 && (protectedHeader = serializeJoseHeader(JWEInvalid, protectedHeader)[0], input[1] = protectedHeader), unprotectedHeader !== void 0 && (unprotectedHeader = serializeJoseHeader(JWEInvalid, unprotectedHeader)[0], input[2] = unprotectedHeader), !sharedHeadersNormalized && sharedUnprotectedHeader !== void 0 && (sharedUnprotectedHeader = serializeJoseHeader(JWEInvalid, sharedUnprotectedHeader)[0], input[3] = sharedUnprotectedHeader), keyManagementParameters !== void 0 && !isObject(keyManagementParameters))
    throw new TypeError("JWE Key Management Parameters must be an object");
  checkDisjoint(protectedHeader, unprotectedHeader, sharedUnprotectedHeader);
  const joseHeader = {
    ...protectedHeader,
    ...unprotectedHeader,
    ...sharedUnprotectedHeader
  };
  validateCritDuplicates(JWEInvalid, protectedHeader), validateCrit(JWEInvalid, JWE_RECOGNIZED, crit, protectedHeader, joseHeader), validateZip(joseHeader, protectedHeader);
  const { alg: alg2, enc: enc2 } = joseHeader;
  if (typeof alg2 != "string" || !alg2)
    throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
  const algEntry = JWE[alg2];
  if (algEntry?.mode === "integrated-encryption") {
    if (enc2 !== void 0)
      throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter must not be present for integrated encryption');
    if (cek !== void 0)
      throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${alg2}`);
    if (iv !== void 0)
      throw new TypeError(`setInitializationVector cannot be called with JWE "alg" (Algorithm) Header ${alg2}`);
    return [joseHeader, void 0, algEntry];
  }
  if (typeof enc2 != "string" || !enc2)
    throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
  return [joseHeader, jweEncryption(enc2), algEntry];
}
async function encryptJWE(input, checked, key) {
  const [joseHeader, encEntry, selected] = checked, [inputPlaintext, inputProtectedHeader, inputUnprotectedHeader, sharedUnprotectedHeader, aad, providedCek, inputIv, keyManagementParameters, , unprotectedParameters] = input;
  let protectedHeader = inputProtectedHeader, unprotectedHeader = inputUnprotectedHeader;
  const algEntry = selected ?? jweAlgorithm(joseHeader.alg);
  let encryptedKey, parameters, cek;
  algEntry.mode === "integrated-encryption" ? cek = await prepareKey(algEntry, key, "encrypt") : [cek, encryptedKey, parameters] = await encryptKeyManagement(algEntry, encEntry, key, joseHeader, providedCek, keyManagementParameters), parameters && (unprotectedParameters ? unprotectedHeader = unprotectedHeader ? { ...unprotectedHeader, ...parameters } : parameters : protectedHeader = protectedHeader ? { ...protectedHeader, ...parameters } : parameters, checkDisjoint(protectedHeader, unprotectedHeader, sharedUnprotectedHeader));
  const encodedProtectedHeader = protectedHeader ? encode2(JSON.stringify(protectedHeader)) : "", encodedAad = aad?.byteLength ? encode2(aad) : void 0, additionalAuthenticatedData = encode(encodedAad ? `${encodedProtectedHeader}.${encodedAad}` : encodedProtectedHeader);
  let plaintext = inputPlaintext;
  joseHeader.zip === "DEF" && (plaintext = await compress(plaintext).catch((cause) => {
    throw cause instanceof JOSENotSupported ? cause : new JWEInvalid("Failed to compress plaintext", { cause });
  }));
  let ciphertext, tag2, iv;
  algEntry.mode === "integrated-encryption" ? [encryptedKey, ciphertext] = await algEntry.encrypt(cek, plaintext, additionalAuthenticatedData, protectedHeader, joseHeader, keyManagementParameters) : { ciphertext, tag: tag2, iv } = await encrypt(encEntry, plaintext, cek, inputIv, additionalAuthenticatedData);
  const jwe = {
    ciphertext: encode2(ciphertext)
  };
  return iv && (jwe.iv = encode2(iv)), tag2 && (jwe.tag = encode2(tag2)), encryptedKey?.byteLength && (jwe.encrypted_key = encode2(encryptedKey)), encodedAad && (jwe.aad = encodedAad), protectedHeader && (jwe.protected = encodedProtectedHeader), sharedUnprotectedHeader && (jwe.unprotected = sharedUnprotectedHeader), unprotectedHeader && (jwe.header = unprotectedHeader), jwe;
}
async function createJWE(input, key, options) {
  return encryptJWE(input, checkEncryptHeaders(input, options), key);
}
function compactJWE(jwe) {
  return [jwe.protected, jwe.encrypted_key, jwe.iv, jwe.ciphertext, jwe.tag].join(".");
}

// node_modules/jose/dist/webapi/lib/jws_algorithms.js
var sig = [["verify"], ["sign"]];
function hmac2(bits) {
  const subtle = { name: "HMAC", hash: `SHA-${bits}` };
  return { kty: ["oct"], secret: true, subtle, signing: subtle, usages: sig };
}
function rsa(bits, saltLength) {
  const subtle = { name: saltLength ? "RSA-PSS" : "RSASSA-PKCS1-v1_5", hash: `SHA-${bits}` };
  return {
    kty: ["RSA"],
    subtle,
    signing: saltLength ? { ...subtle, saltLength } : subtle,
    usages: sig,
    minRsaBits: 2048
  };
}
function ecdsa(crv, bits) {
  return {
    kty: ["EC"],
    crv,
    subtle: { name: "ECDSA", namedCurve: crv },
    signing: { name: "ECDSA", hash: `SHA-${bits}` },
    usages: sig
  };
}
function eddsa() {
  const subtle = { name: "Ed25519" };
  return {
    kty: ["OKP"],
    crv: "Ed25519",
    subtle,
    signing: subtle,
    usages: sig
  };
}
function mldsa(parameterSet) {
  const subtle = { name: `ML-DSA-${parameterSet}` };
  return {
    kty: ["AKP"],
    subtle,
    signing: subtle,
    usages: sig
  };
}
var JWS = table({
  HS256: hmac2(256),
  HS384: hmac2(384),
  HS512: hmac2(512),
  RS256: rsa(256),
  RS384: rsa(384),
  RS512: rsa(512),
  PS256: rsa(256, 32),
  PS384: rsa(384, 48),
  PS512: rsa(512, 64),
  ES256: ecdsa("P-256", 256),
  ES384: ecdsa("P-384", 384),
  ES512: ecdsa("P-521", 512),
  EdDSA: eddsa(),
  Ed25519: eddsa(),
  "ML-DSA-44": mldsa(44),
  "ML-DSA-65": mldsa(65),
  "ML-DSA-87": mldsa(87)
});
function jwsAlgorithm(alg2) {
  const entry = typeof alg2 == "string" ? JWS[alg2] : void 0;
  if (!entry)
    throw new JOSENotSupported(`alg ${alg2} is not supported either by JOSE or your javascript runtime`);
  return entry;
}

// node_modules/jose/dist/webapi/lib/jws_verify.js
function prepareVerify(options) {
  return [options && validateAlgorithms("algorithms", options.algorithms), options?.crit];
}
function parseProtectedHeader(encodedProtectedHeader) {
  return encodedProtectedHeader === void 0 ? {} : parseJoseHeader(encodedProtectedHeader, JWSInvalid, "JWS Protected Header is invalid");
}
function encodeCompactUnencodedPayload(payload) {
  try {
    return encode(payload);
  } catch (cause) {
    throw new JWSInvalid("JWS Compact Serialization payload must use only ASCII characters", {
      cause
    });
  }
}
async function verifySignature(jws, shared, key, encodeUnencodedPayload, parsedProtected) {
  const { protected: encodedProtectedHeader, header, payload: inputPayload } = jws, protectedHeader = parsedProtected ?? parseProtectedHeader(encodedProtectedHeader);
  if (!isDisjoint(protectedHeader, header))
    throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  const joseHeader = { ...protectedHeader, ...header }, b64 = validateB64(protectedHeader, validateCrit(JWSInvalid, JWS_RECOGNIZED, shared[1], protectedHeader, joseHeader)), { alg: alg2 } = joseHeader;
  if (typeof alg2 != "string" || !alg2)
    throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  if (shared[0] && !shared[0].has(alg2))
    throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
  if (b64) {
    if (typeof inputPayload != "string")
      throw new JWSInvalid("JWS Payload must be a string");
  } else if (typeof inputPayload != "string" && !(inputPayload instanceof Uint8Array))
    throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
  const signingPayload = b64 || typeof inputPayload != "string" ? inputPayload : encodeUnencodedPayload(inputPayload);
  let resolvedKey = false;
  typeof key == "function" && (key = await key(protectedHeader, jws), resolvedKey = true);
  const entry = jwsAlgorithm(alg2), signingInput = concat(encodedProtectedHeader !== void 0 ? encode(encodedProtectedHeader) : new Uint8Array(), encode("."), typeof signingPayload == "string" ? shared[2] ??= encodeAsciiMember(signingPayload, "payload", JWSInvalid) : signingPayload), signature = decodeBase64url(jws.signature, "signature", JWSInvalid), verificationKey = await prepareKey(entry, key, "verify"), cryptoKey = await rawKey(verificationKey, entry.subtle, "verify");
  entry.minRsaBits && checkModulusLength(entry.alg, cryptoKey);
  let verified = false;
  try {
    verified = await crypto.subtle.verify(entry.signing, cryptoKey, signature, signingInput);
  } catch (cause) {
    throw new JWSSignatureVerificationFailed(void 0, { cause });
  }
  if (!verified)
    throw new JWSSignatureVerificationFailed();
  const result = { payload: typeof signingPayload == "string" ? decodeBase64url(signingPayload, "payload", JWSInvalid) : signingPayload };
  return encodedProtectedHeader !== void 0 && (result.protectedHeader = protectedHeader), header !== void 0 && (result.unprotectedHeader = header), resolvedKey ? [{ ...result, key: verificationKey }, b64] : [result, b64];
}
async function verifyCompact(jws, shared, key) {
  if (jws instanceof Uint8Array && (jws = decoder.decode(jws)), typeof jws != "string")
    throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
  const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
  if (length !== 3)
    throw new JWSInvalid("Invalid Compact JWS");
  return verifySignature({ payload, protected: protectedHeader, signature }, shared, key, encodeCompactUnencodedPayload);
}

// node_modules/jose/dist/webapi/lib/jwt_claims_set.js
var epoch = (date3) => Math.floor(date3.getTime() / 1e3);
var multipliers = {
  s: 1,
  m: 60,
  h: 3600,
  d: 86400,
  w: 604800,
  y: 31557600
};
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
var checkFailed = "check_failed";
function invalidDuration() {
  throw new TypeError("Invalid time period format");
}
function secs(str) {
  typeof str != "string" && invalidDuration();
  const matched = REGEX.exec(str);
  (!matched || matched[4] && matched[1]) && invalidDuration();
  const value = parseFloat(matched[2]), durationSeconds = Math.round(value * multipliers[matched[3][0].toLowerCase()]);
  return Number.isFinite(durationSeconds) || invalidDuration(), matched[1] === "-" || matched[4]?.toLowerCase() === "ago" ? -durationSeconds : durationSeconds;
}
function validateInput(label, input) {
  if (!Number.isFinite(input))
    throw new TypeError(`Invalid ${label} input`);
  return input;
}
function validateStringClaim(claim, value) {
  if (typeof value != "string")
    throw new TypeError(`"${claim}" claim must be a string`);
}
function validateAudienceClaim(value) {
  if (typeof value != "string" && (!Array.isArray(value) || Array.from(value).some((member) => typeof member != "string")))
    throw new TypeError('"aud" claim must be a string or an array of strings');
}
function numericDate(value, label) {
  return typeof value == "number" ? validateInput(label, value) : value instanceof Date ? validateInput(label, epoch(value)) : epoch(/* @__PURE__ */ new Date()) + secs(value);
}
var normalizeTyp = (value) => {
  const normalized = value.toLowerCase();
  return value.includes("/") ? normalized : `application/${normalized}`;
};
var checkAudiencePresence = (audPayload, audOption) => typeof audPayload == "string" ? audOption.includes(audPayload) : Array.isArray(audPayload) ? audOption.some((aud) => audPayload.includes(aud)) : false;
function validateNumericDate(claimsSet, claim, required = false) {
  const value = claimsSet[claim];
  if (!(value === void 0 && !required)) {
    if (typeof value != "number")
      throw new JWTClaimValidationFailed(`"${claim}" claim must be a number`, claimsSet, claim, "invalid");
    return value;
  }
}
function unexpectedClaim(claimsSet, claim) {
  throw new JWTClaimValidationFailed(`unexpected "${claim}" claim value`, claimsSet, claim, checkFailed);
}
function validateClaimsSet(protectedHeader, claimsSetBytes, options = {}) {
  let claimsSet;
  try {
    claimsSet = JSON.parse(strictDecoder.decode(claimsSetBytes));
  } catch (cause) {
    throw new JWTInvalid("JWT Claims Set must be a top-level JSON object", { cause });
  }
  if (!isObject(claimsSet))
    throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
  const { typ } = options;
  if (typ !== void 0 && (typeof protectedHeader.typ != "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ)))
    throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', claimsSet, "typ", checkFailed);
  const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options, presenceCheck = [...requiredClaims];
  maxTokenAge !== void 0 && presenceCheck.push("iat"), audience !== void 0 && presenceCheck.push("aud"), subject !== void 0 && presenceCheck.push("sub"), issuer !== void 0 && presenceCheck.push("iss");
  for (const claim of new Set(presenceCheck.reverse()))
    if (!Object.hasOwn(claimsSet, claim))
      throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, claimsSet, claim, "missing");
  issuer !== void 0 && !(Array.isArray(issuer) ? issuer : [issuer]).includes(claimsSet.iss) && unexpectedClaim(claimsSet, "iss"), subject !== void 0 && claimsSet.sub !== subject && unexpectedClaim(claimsSet, "sub"), audience !== void 0 && !checkAudiencePresence(claimsSet.aud, typeof audience == "string" ? [audience] : audience) && unexpectedClaim(claimsSet, "aud");
  const { clockTolerance } = options;
  let tolerance = 0;
  if (typeof clockTolerance == "string")
    tolerance = secs(clockTolerance);
  else if (clockTolerance !== void 0) {
    if (typeof clockTolerance != "number")
      throw new TypeError("Invalid clockTolerance option type");
    tolerance = clockTolerance;
  }
  if (validateInput("clockTolerance option", tolerance), tolerance < 0)
    throw new TypeError("Invalid clockTolerance option input");
  const { currentDate } = options, now2 = validateInput("currentDate option", epoch(currentDate === void 0 ? /* @__PURE__ */ new Date() : currentDate)), iat = validateNumericDate(claimsSet, "iat", maxTokenAge !== void 0), nbf = validateNumericDate(claimsSet, "nbf");
  if (nbf !== void 0 && nbf > now2 + tolerance)
    throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', claimsSet, "nbf", checkFailed);
  const exp = validateNumericDate(claimsSet, "exp");
  if (exp !== void 0 && exp <= now2 - tolerance)
    throw new JWTExpired('"exp" claim timestamp check failed', claimsSet, "exp", checkFailed);
  if (maxTokenAge !== void 0) {
    const age = now2 - iat, max = validateInput("maxTokenAge option", typeof maxTokenAge == "number" ? maxTokenAge : secs(maxTokenAge));
    if (max < 0)
      throw new TypeError("Invalid maxTokenAge option input");
    if (age - tolerance > max)
      throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', claimsSet, "iat", checkFailed);
    if (age < -tolerance)
      throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', claimsSet, "iat", checkFailed);
  }
  return claimsSet;
}
var producerClaimsSets;
function producerClaimsSet(producer) {
  return producerClaimsSets.get(producer);
}
function jwtClaimsSetBytes(producer) {
  const claimsSet = producerClaimsSet(producer);
  for (const claim of ["iat", "nbf", "exp"]) {
    const value = claimsSet[claim];
    if (typeof value == "number" && !Number.isFinite(value))
      throw new TypeError(`"${claim}" claim must be a finite number`);
  }
  return encoder.encode(JSON.stringify(claimsSet));
}
function jwtClaim(producer, claim) {
  return producerClaimsSet(producer)[claim];
}
var JWTClaimsBuilder = class {
  constructor(claimsSet = {}) {
    if (!isObject(claimsSet))
      throw new TypeError("JWT Claims Set MUST be an object");
    (producerClaimsSets ||= /* @__PURE__ */ new WeakMap()).set(this, structuredClone(claimsSet));
  }
  setIssuer(value) {
    return validateStringClaim("iss", value), producerClaimsSet(this).iss = value, this;
  }
  setSubject(value) {
    return validateStringClaim("sub", value), producerClaimsSet(this).sub = value, this;
  }
  setAudience(value) {
    return validateAudienceClaim(value), producerClaimsSet(this).aud = value, this;
  }
  setJti(value) {
    return validateStringClaim("jti", value), producerClaimsSet(this).jti = value, this;
  }
  setNotBefore(value) {
    return producerClaimsSet(this).nbf = numericDate(value, "setNotBefore"), this;
  }
  setExpirationTime(value) {
    return producerClaimsSet(this).exp = numericDate(value, "setExpirationTime"), this;
  }
  setIssuedAt(value) {
    const claimsSet = producerClaimsSet(this);
    return value === void 0 ? claimsSet.iat = epoch(/* @__PURE__ */ new Date()) : typeof value == "string" ? claimsSet.iat = validateInput("setIssuedAt", epoch(/* @__PURE__ */ new Date()) + secs(value)) : claimsSet.iat = numericDate(value, "setIssuedAt"), this;
  }
};

// node_modules/jose/dist/webapi/jwt/verify.js
async function jwtVerify(jwt, key, options) {
  const [verified, b64] = await verifyCompact(jwt, prepareVerify(options), key);
  if (!b64)
    throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
  const payload = validateClaimsSet(verified.protectedHeader, verified.payload, options);
  return { ...verified, payload };
}

// node_modules/jose/dist/webapi/jwt/decrypt.js
async function jwtDecrypt(jwt, key, options) {
  const { plaintext, ...result } = await decryptCompact(jwt, prepareDecrypt(options), key), { protectedHeader } = result, payload = validateClaimsSet(protectedHeader, plaintext, options);
  for (const claim of ["iss", "sub", "aud"])
    if (protectedHeader[claim] !== void 0 && (claim === "aud" ? JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud) : protectedHeader[claim] !== payload[claim]))
      throw new JWTClaimValidationFailed(`replicated "${claim}" claim header parameter mismatch`, payload, claim, "mismatch");
  return { payload, ...result };
}

// node_modules/jose/dist/webapi/lib/jws_sign.js
async function createSignature(input, key, rejectUnencoded) {
  let [payload, protectedHeader, unprotectedHeader, crit] = input, encodedProtectedHeader = "";
  if (protectedHeader !== void 0) {
    const normalized = serializeJoseHeader(JWSInvalid, protectedHeader);
    protectedHeader = normalized[0], encodedProtectedHeader = encode2(normalized[1]);
  }
  if (unprotectedHeader !== void 0 && (unprotectedHeader = serializeJoseHeader(JWSInvalid, unprotectedHeader)[0]), !protectedHeader && !unprotectedHeader)
    throw new JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
  if (!isDisjoint(protectedHeader, unprotectedHeader))
    throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  const joseHeader = { ...protectedHeader, ...unprotectedHeader };
  validateCritDuplicates(JWSInvalid, protectedHeader);
  const b64 = validateB64(protectedHeader, validateCrit(JWSInvalid, JWS_RECOGNIZED, crit, protectedHeader, joseHeader));
  b64 || rejectUnencoded?.();
  const { alg: alg2 } = joseHeader;
  if (typeof alg2 != "string" || !alg2)
    throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  const entry = jwsAlgorithm(alg2);
  let encodedPayload = "", signingPayload = payload, signingInput;
  if (b64) {
    const encodedPayloadCache = input[4];
    encodedPayloadCache ? (encodedPayload = encodedPayloadCache[0] ??= encode2(payload), signingPayload = encodedPayloadCache[1] ??= encode(encodedPayload)) : (encodedPayload = encode2(payload), signingInput = encoder.encode(`${encodedProtectedHeader}.${encodedPayload}`));
  }
  signingInput ??= concat(encode(encodedProtectedHeader), encode("."), signingPayload);
  const signingKey = await rawKey(await prepareKey(entry, key, "sign"), entry.subtle, "sign");
  entry.minRsaBits && checkModulusLength(entry.alg, signingKey);
  const jws = {
    signature: encode2(new Uint8Array(await crypto.subtle.sign(entry.signing, signingKey, signingInput))),
    payload: encodedPayload
  };
  return protectedHeader && (jws.protected = encodedProtectedHeader), unprotectedHeader && (jws.header = unprotectedHeader), [jws, b64];
}
async function createCompactSignature(payload, protectedHeader, crit, key, rejectUnencoded) {
  const [jws] = await createSignature([payload, protectedHeader, void 0, crit], key, rejectUnencoded);
  return `${jws.protected}.${jws.payload}.${jws.signature}`;
}

// node_modules/jose/dist/webapi/jwt/sign.js
var SignJWT_base = JWTClaimsBuilder;
var SignJWT = class extends SignJWT_base {
  #protectedHeader;
  setProtectedHeader(protectedHeader) {
    return assertNotSet(this.#protectedHeader, "setProtectedHeader"), this.#protectedHeader = protectedHeader, this;
  }
  async sign(key, options) {
    return createCompactSignature(jwtClaimsSetBytes(this), this.#protectedHeader, options?.crit, key, () => {
      throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
    });
  }
};

// node_modules/jose/dist/webapi/jwt/encrypt.js
var EncryptJWT_base = JWTClaimsBuilder;
var EncryptJWT = class extends EncryptJWT_base {
  #input = [void 0];
  #replicateIssuerAsHeader;
  #replicateSubjectAsHeader;
  #replicateAudienceAsHeader;
  setProtectedHeader(protectedHeader) {
    return assertNotSet(this.#input[1], "setProtectedHeader"), this.#input[1] = protectedHeader, this;
  }
  setKeyManagementParameters(parameters) {
    return assertNotSet(this.#input[7], "setKeyManagementParameters"), this.#input[7] = parameters, this;
  }
  setContentEncryptionKey(cek) {
    return assertNotSet(this.#input[5], "setContentEncryptionKey"), this.#input[5] = cek, this;
  }
  setInitializationVector(iv) {
    return assertNotSet(this.#input[6], "setInitializationVector"), this.#input[6] = iv, this;
  }
  replicateIssuerAsHeader() {
    return this.#replicateIssuerAsHeader = true, this;
  }
  replicateSubjectAsHeader() {
    return this.#replicateSubjectAsHeader = true, this;
  }
  replicateAudienceAsHeader() {
    return this.#replicateAudienceAsHeader = true, this;
  }
  async encrypt(key, options) {
    const input = [...this.#input];
    if (input[0] = jwtClaimsSetBytes(this), input[1] && (this.#replicateIssuerAsHeader || this.#replicateSubjectAsHeader || this.#replicateAudienceAsHeader)) {
      const header = { ...input[1] };
      this.#replicateIssuerAsHeader && (header.iss = jwtClaim(this, "iss")), this.#replicateSubjectAsHeader && (header.sub = jwtClaim(this, "sub")), this.#replicateAudienceAsHeader && (header.aud = jwtClaim(this, "aud")), input[1] = header;
    }
    return compactJWE(await createJWE(input, key, options));
  }
};

// node_modules/jose/dist/webapi/lib/key_algorithm.js
function unsupportedAlg(source = 'JWK "alg" (Algorithm) Parameter') {
  throw new JOSENotSupported(`Invalid or unsupported ${source} value`);
}
function keyAlgorithm(alg2, source) {
  return (typeof alg2 == "string" ? JWS[alg2] ?? JWE[alg2] : void 0) ?? unsupportedAlg(source);
}

// node_modules/jose/dist/webapi/key/export.js
async function exportJWK(key) {
  if (isKeyObject(key))
    if (key.type === "secret")
      key = key.export();
    else
      return key.export({ format: "jwk" });
  if (key instanceof Uint8Array)
    return {
      kty: "oct",
      k: encode2(key)
    };
  if (!isCryptoKey(key))
    throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "Uint8Array"));
  if (!key.extractable)
    throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
  const jwk = await crypto.subtle.exportKey("jwk", key);
  delete jwk.ext, delete jwk.key_ops, delete jwk.use, jwk.kty !== "AKP" && delete jwk.alg;
  for (const parameter of Object.keys(jwk))
    jwk[parameter] === void 0 && delete jwk[parameter];
  return jwk;
}

// node_modules/jose/dist/webapi/jwk/thumbprint.js
var check = (value, description) => {
  if (typeof value != "string" || !value)
    throw new JWKInvalid(`${description} missing or invalid`);
};
async function calculateJwkThumbprint(key, digestAlgorithm) {
  let jwk;
  if (isObject(key)) {
    if (jwk = snapshotJwk(key), typeof jwk.kty != "string")
      throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "JSON Web Key"));
  } else if (isKeyLike(key))
    jwk = snapshotJwk(await exportJWK(key));
  else
    throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "JSON Web Key"));
  if (digestAlgorithm ??= "sha256", digestAlgorithm !== "sha256" && digestAlgorithm !== "sha384" && digestAlgorithm !== "sha512")
    throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
  let requiredMembers;
  switch (jwk.kty) {
    case "AKP":
      check(jwk.alg, '"alg" (Algorithm) Parameter'), check(jwk.pub, '"pub" (Public key) Parameter'), requiredMembers = { alg: jwk.alg, kty: jwk.kty, pub: jwk.pub };
      break;
    case "EC":
      check(jwk.crv, '"crv" (Curve) Parameter'), check(jwk.x, '"x" (X Coordinate) Parameter'), check(jwk.y, '"y" (Y Coordinate) Parameter'), requiredMembers = { crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y };
      break;
    case "OKP":
      check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter'), check(jwk.x, '"x" (Public Key) Parameter'), requiredMembers = { crv: jwk.crv, kty: jwk.kty, x: jwk.x };
      break;
    case "RSA":
      check(jwk.e, '"e" (Exponent) Parameter'), check(jwk.n, '"n" (Modulus) Parameter'), requiredMembers = { e: jwk.e, kty: jwk.kty, n: jwk.n };
      break;
    case "oct":
      if (typeof jwk.k != "string")
        throw new JWKInvalid('"k" (Key Value) Parameter missing or invalid');
      requiredMembers = { k: jwk.k, kty: jwk.kty };
      break;
    default:
      throw new JOSENotSupported('"kty" (Key Type) Parameter missing or unsupported');
  }
  const thumbprintInput = encode(JSON.stringify(requiredMembers));
  return encode2(await digest(digestAlgorithm, thumbprintInput));
}

// node_modules/jose/dist/webapi/jwks/local.js
function isUsableJWK(jwk, entry, alg2, kid) {
  const { kty, key_ops: keyOps, ext, kid: jwkKid, alg: jwkAlg, use, crv } = jwk;
  return (ext === void 0 || typeof ext == "boolean") && (keyOps === void 0 || Array.isArray(keyOps) && keyOps.every((operation, index) => typeof operation == "string" && keyOps.indexOf(operation) === index) && keyOps.includes("verify")) && entry.kty.includes(kty) && (kid === void 0 || typeof kid == "string" && kid === jwkKid) && (jwkAlg === void 0 ? kty !== "AKP" : alg2 === jwkAlg) && (use === void 0 || use === "sig") && (!entry.crv || crv === entry.crv);
}
async function importWithAlgCache(cache3, jwk, entry) {
  const cached2 = cache3.get(jwk) || cache3.set(jwk, {}).get(jwk), { alg: alg2 } = entry;
  if (cached2[alg2] === void 0) {
    const pending = jwkToKey(entry, jwk, true).then((key) => {
      if (key.type !== "public")
        throw new JWKSInvalid("JSON Web Key Set members must be public keys");
      return cached2[alg2] = key, key;
    }).catch((error2) => {
      throw cached2[alg2] === pending && delete cached2[alg2], error2;
    });
    cached2[alg2] = pending;
  }
  return cached2[alg2];
}
function createLocalJWKSet(jwks) {
  let snapshot;
  try {
    snapshot = structuredClone(jwks);
  } catch (cause) {
    throw new JWKSInvalid("JSON Web Key Set malformed", { cause });
  }
  if (!isJwkSet(snapshot))
    throw new JWKSInvalid("JSON Web Key Set malformed");
  const metadata = snapshot.keys.map((jwk) => {
    const normalized = snapshotJwk(jwk);
    return Array.isArray(normalized.key_ops) && (normalized.key_ops = [...normalized.key_ops]), normalized;
  }), cached2 = /* @__PURE__ */ new WeakMap();
  return Object.defineProperty(async (protectedHeader, token) => {
    const { alg: alg2, kid } = { ...protectedHeader, ...token?.header }, entry = typeof alg2 == "string" ? JWS[alg2] : void 0;
    if (!entry || entry.secret)
      throw new JOSENotSupported('Unsupported "alg" value for a JSON Web Key Set');
    const candidates = snapshot.keys.filter((_, index) => isUsableJWK(metadata[index], entry, alg2, kid)), { 0: jwk, length } = candidates;
    if (!length)
      throw new JWKSNoMatchingKey();
    if (length !== 1) {
      const error2 = new JWKSMultipleMatchingKeys();
      throw error2[Symbol.asyncIterator] = async function* () {
        for (const jwk2 of candidates)
          try {
            yield await importWithAlgCache(cached2, jwk2, entry);
          } catch {
          }
      }, error2;
    }
    return importWithAlgCache(cached2, jwk, entry);
  }, "jwks", {
    value: () => structuredClone(snapshot)
  });
}

// node_modules/jose/dist/webapi/jwks/remote.js
function isCloudflareWorkers() {
  return typeof WebSocketPair < "u" || typeof navigator < "u" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime < "u" && EdgeRuntime === "vercel";
}
var USER_AGENT;
(typeof navigator > "u" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) && (USER_AGENT = "jose/v6.2.18");
var customFetch = /* @__PURE__ */ Symbol();
async function fetchJwks(url, headers, signal, fetchImpl = fetch) {
  const response = await fetchImpl(url, {
    method: "GET",
    signal,
    redirect: "manual",
    headers
  }).catch((err) => {
    throw err.name === "TimeoutError" ? new JWKSTimeout(void 0, { cause: err }) : err;
  });
  if (response.status !== 200)
    throw new JOSEError("Expected 200 OK from the JSON Web Key Set HTTP response");
  try {
    return await response.json();
  } catch (cause) {
    throw signal.aborted ? new JWKSTimeout(void 0, { cause }) : new JOSEError("Failed to parse the JSON Web Key Set HTTP response as JSON", { cause });
  }
}
var jwksCache = /* @__PURE__ */ Symbol();
function isFreshFor(timestamp, duration) {
  return Number.isFinite(timestamp) && Date.now() < timestamp + duration;
}
function validateDuration(value, fallback, option) {
  if (Number.isNaN(value))
    throw new TypeError(`"${option}" option must not be NaN`);
  if (typeof value == "number" && value < 0)
    throw new TypeError(`"${option}" option must not be negative`);
  return typeof value == "number" ? value : fallback;
}
function createRemoteJWKSet(url, options) {
  if (!(url instanceof URL))
    throw new TypeError("url must be an instance of URL");
  const href = new URL(url.href).href, opts = options ?? {}, timeoutOption = opts.timeoutDuration;
  if (typeof timeoutOption == "number" && (!Number.isInteger(timeoutOption) || timeoutOption < 0))
    throw new TypeError('"timeoutDuration" option must be a non-negative integer');
  const timeoutDuration = typeof timeoutOption == "number" ? timeoutOption : 5e3, cooldownDuration = validateDuration(opts.cooldownDuration, 3e4, "cooldownDuration"), cacheMaxAge = validateDuration(opts.cacheMaxAge, 6e5, "cacheMaxAge"), headers = new Headers(opts.headers);
  USER_AGENT && !headers.has("User-Agent") && headers.set("User-Agent", USER_AGENT), headers.has("accept") || headers.set("accept", "application/json, application/jwk-set+json");
  const fetchImpl = opts[customFetch], cache3 = opts[jwksCache];
  let jwksTimestamp, pendingFetch, reloadSequence = 0, appliedSequence = 0, local;
  if (cache3 && typeof cache3 == "object") {
    const { uat, jwks } = cache3;
    isFreshFor(uat, cacheMaxAge) && isJwkSet(jwks) && (jwksTimestamp = uat, local = createLocalJWKSet(jwks));
  }
  const reload = async () => {
    if (pendingFetch && isCloudflareWorkers() && (pendingFetch = void 0), !pendingFetch) {
      const sequence = ++reloadSequence, current = pendingFetch = fetchJwks(href, headers, AbortSignal.timeout(timeoutDuration), fetchImpl).then((json) => {
        const next = createLocalJWKSet(json);
        if (sequence <= appliedSequence)
          return;
        local = next;
        const updatedAt = Date.now();
        cache3 && (cache3.uat = updatedAt, cache3.jwks = json), jwksTimestamp = updatedAt, appliedSequence = sequence;
      }).finally(() => {
        pendingFetch === current && (pendingFetch = void 0);
      });
    }
    await pendingFetch;
  };
  return Object.defineProperties(async (protectedHeader, token) => {
    (!local || !isFreshFor(jwksTimestamp, cacheMaxAge)) && await reload();
    try {
      return await local(protectedHeader, token);
    } catch (err) {
      if (err instanceof JWKSNoMatchingKey && !isFreshFor(jwksTimestamp, cooldownDuration))
        return await reload(), local(protectedHeader, token);
      throw err;
    }
  }, {
    coolingDown: {
      get: () => isFreshFor(jwksTimestamp, cooldownDuration),
      enumerable: true
    },
    fresh: {
      get: () => isFreshFor(jwksTimestamp, cacheMaxAge),
      enumerable: true
    },
    reload: {
      value: reload,
      enumerable: true
    },
    reloading: {
      get: () => !!pendingFetch,
      enumerable: true
    },
    jwks: {
      value: () => local?.jwks(),
      enumerable: true
    }
  });
}

// node_modules/jose/dist/webapi/key/import.js
async function importJWK(jwk, alg2, options) {
  if (!isObject(jwk))
    throw new TypeError("JWK must be an object");
  const normalized = normalizeJwk(jwk), extractable = validateExtractableOption(options?.extractable), { alg: jwkAlg } = normalized;
  if (alg2 ??= jwkAlg, normalized.kty !== "oct" && !alg2)
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  switch (normalized.kty) {
    case "oct":
      if (typeof normalized.k != "string")
        throw new TypeError('missing "k" (Key Value) Parameter value');
      return decode(normalized.k);
    case "AKP": {
      if (typeof jwkAlg != "string" || !jwkAlg)
        throw new TypeError('missing "alg" (Algorithm) Parameter value');
      if (alg2 !== jwkAlg)
        throw new TypeError("JWK alg and alg option value mismatch");
      return jwkToKey(keyAlgorithm(alg2), normalized, extractable);
    }
    case "RSA":
    case "EC":
    case "OKP":
      return jwkToKey(keyAlgorithm(alg2), normalized, extractable);
    default:
      throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
  }
}

// node_modules/jose/dist/webapi/util/decode_protected_header.js
function decodeProtectedHeader(token) {
  let encodedProtectedHeader;
  if (typeof token == "string") {
    const parts = token.split(".");
    (parts.length === 3 || parts.length === 5) && ([encodedProtectedHeader] = parts);
  } else if (typeof token == "object" && token)
    if ("protected" in token)
      encodedProtectedHeader = token.protected;
    else
      throw new TypeError("Token does not contain a Protected Header");
  const invalid2 = "Invalid Token or Protected Header formatting";
  if (typeof encodedProtectedHeader != "string" || !encodedProtectedHeader)
    throw new TypeError(invalid2);
  return parseJoseHeader(encodedProtectedHeader, TypeError, invalid2);
}

// node_modules/jose/dist/webapi/util/decode_jwt.js
function decodeJwt(jwt) {
  if (typeof jwt != "string")
    throw new JWTInvalid("JWTs must use Compact JWS serialization, JWT must be a string");
  const { 1: encodedPayload, length } = jwt.split(".");
  if (length === 5)
    throw new JWTInvalid("Only JWTs using Compact JWS serialization can be decoded");
  if (length !== 3)
    throw new JWTInvalid("Invalid JWT");
  if (!encodedPayload)
    throw new JWTInvalid("JWTs must contain a payload");
  let claimsSetBytes;
  try {
    claimsSetBytes = decode(encodedPayload);
  } catch (cause) {
    throw new JWTInvalid("Failed to base64url decode the payload", { cause });
  }
  let claimsSet;
  try {
    claimsSet = JSON.parse(strictDecoder.decode(claimsSetBytes));
  } catch (cause) {
    throw new JWTInvalid("Failed to parse the decoded payload as JSON", { cause });
  }
  if (!isObject(claimsSet))
    throw new JWTInvalid("Invalid JWT Claims Set");
  return claimsSet;
}

// node_modules/better-auth/dist/crypto/jwt.mjs
async function signJWT(payload, secret, expiresIn = 3600) {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(Math.floor(Date.now() / 1e3) + expiresIn).sign(new TextEncoder().encode(secret));
}
async function verifyJWT(token, secret) {
  try {
    return (await jwtVerify(token, new TextEncoder().encode(secret))).payload;
  } catch {
    return null;
  }
}
var info = new Uint8Array([
  66,
  101,
  116,
  116,
  101,
  114,
  65,
  117,
  116,
  104,
  46,
  106,
  115,
  32,
  71,
  101,
  110,
  101,
  114,
  97,
  116,
  101,
  100,
  32,
  69,
  110,
  99,
  114,
  121,
  112,
  116,
  105,
  111,
  110,
  32,
  75,
  101,
  121
]);
var now = () => Date.now() / 1e3 | 0;
var alg = "dir";
var enc = "A256CBC-HS512";
function deriveEncryptionSecret(secret, salt2) {
  return hkdf(sha256, new TextEncoder().encode(secret), new TextEncoder().encode(salt2), info, 64);
}
function getCurrentSecret(secret) {
  if (typeof secret === "string") return secret;
  const value = secret.keys.get(secret.currentVersion);
  if (!value) throw new Error(`Secret version ${secret.currentVersion} not found in keys`);
  return value;
}
function getAllSecrets(secret) {
  if (typeof secret === "string") return [{
    version: 0,
    value: secret
  }];
  const result = [];
  for (const [version2, value] of secret.keys) result.push({
    version: version2,
    value
  });
  if (secret.legacySecret && !result.some((s) => s.value === secret.legacySecret)) result.push({
    version: -1,
    value: secret.legacySecret
  });
  return result;
}
async function symmetricEncodeJWT(payload, secret, salt2, expiresIn = 3600) {
  const encryptionSecret = deriveEncryptionSecret(getCurrentSecret(secret), salt2);
  const thumbprint = await calculateJwkThumbprint({
    kty: "oct",
    k: base64url_exports.encode(encryptionSecret)
  }, "sha256");
  return await new EncryptJWT(payload).setProtectedHeader({
    alg,
    enc,
    kid: thumbprint
  }).setIssuedAt().setExpirationTime(now() + expiresIn).setJti(crypto.randomUUID()).encrypt(encryptionSecret);
}
var jwtDecryptOpts = {
  clockTolerance: 15,
  keyManagementAlgorithms: [alg],
  contentEncryptionAlgorithms: [enc, "A256GCM"]
};
async function symmetricDecodeJWT(token, secret, salt2) {
  if (!token) return null;
  let hasKid = false;
  try {
    hasKid = decodeProtectedHeader(token).kid !== void 0;
  } catch {
    return null;
  }
  try {
    const secrets = getAllSecrets(secret);
    const { payload } = await jwtDecrypt(token, async (protectedHeader) => {
      const kid = protectedHeader.kid;
      if (kid !== void 0) {
        for (const s of secrets) {
          const encryptionSecret = deriveEncryptionSecret(s.value, salt2);
          if (kid === await calculateJwkThumbprint({
            kty: "oct",
            k: base64url_exports.encode(encryptionSecret)
          }, "sha256")) return encryptionSecret;
        }
        throw new Error("no matching decryption secret");
      }
      if (secrets.length === 1) return deriveEncryptionSecret(secrets[0].value, salt2);
      return deriveEncryptionSecret(secrets[0].value, salt2);
    }, jwtDecryptOpts);
    return payload;
  } catch {
    if (hasKid) return null;
    const secrets = getAllSecrets(secret);
    if (secrets.length <= 1) return null;
    for (let i = 1; i < secrets.length; i++) try {
      const s = secrets[i];
      const encryptionSecret = deriveEncryptionSecret(s.value, salt2);
      const { payload } = await jwtDecrypt(token, encryptionSecret, jwtDecryptOpts);
      return payload;
    } catch {
      continue;
    }
    return null;
  }
}

// node_modules/zod/v4/classic/coerce.js
var coerce_exports = {};
__export(coerce_exports, {
  bigint: () => bigint,
  boolean: () => boolean2,
  date: () => date2,
  number: () => number2,
  string: () => string2
});
function string2(params) {
  return _coercedString(ZodString, params);
}
function number2(params) {
  return _coercedNumber(ZodNumber, params);
}
function boolean2(params) {
  return _coercedBoolean(ZodBoolean, params);
}
function bigint(params) {
  return _coercedBigint(ZodBigInt, params);
}
function date2(params) {
  return _coercedDate(ZodDate, params);
}

// node_modules/@better-auth/core/dist/db/schema/shared.mjs
var coreSchema = object({
  id: string(),
  createdAt: date().default(() => /* @__PURE__ */ new Date()),
  updatedAt: date().default(() => /* @__PURE__ */ new Date())
});

// node_modules/@better-auth/core/dist/db/schema/session.mjs
var sessionSchema = coreSchema.extend({
  userId: coerce_exports.string(),
  expiresAt: date(),
  token: string(),
  ipAddress: string().nullish(),
  userAgent: string().nullish()
});

// node_modules/@better-auth/core/dist/db/schema/user.mjs
var userSchema = coreSchema.extend({
  email: string().transform((val) => val.toLowerCase()),
  emailVerified: boolean().default(false),
  name: string(),
  image: string().nullish()
});

// node_modules/@better-auth/core/dist/utils/db.mjs
function filterOutputFields(data, additionalFields) {
  if (!data || !additionalFields) return data;
  const returnFiltered = Object.entries(additionalFields).filter(([, { returned }]) => returned === false).map(([key]) => key);
  return Object.entries(structuredClone(data)).filter(([key]) => !returnFiltered.includes(key)).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: value
  }), {});
}

// node_modules/better-auth/dist/db/schema.mjs
var cache2 = /* @__PURE__ */ new WeakMap();
function getFields(options, modelName, mode) {
  const cacheKey = `${modelName}:${mode}`;
  if (!cache2.has(options)) cache2.set(options, /* @__PURE__ */ new Map());
  const tableCache = cache2.get(options);
  if (tableCache.has(cacheKey)) return tableCache.get(cacheKey);
  const coreSchema2 = mode === "output" ? getAuthTables(options)[modelName]?.fields ?? {} : {};
  const additionalFields = modelName === "user" || modelName === "session" || modelName === "account" ? options[modelName]?.additionalFields : void 0;
  let schema2 = {
    ...coreSchema2,
    ...additionalFields ?? {}
  };
  for (const plugin of options.plugins || []) if (plugin.schema && plugin.schema[modelName]) schema2 = {
    ...schema2,
    ...plugin.schema[modelName].fields
  };
  tableCache.set(cacheKey, schema2);
  return schema2;
}
function parseUserOutput(options, user) {
  const schema2 = getFields(options, "user", "output");
  return filterOutputFields(user, schema2);
}
function buildSyntheticUserOutput(options, data) {
  const schema2 = getFields(options, "user", "output");
  const result = {};
  for (const key in schema2) {
    const fieldAttr = schema2[key];
    if (fieldAttr.returned === false) continue;
    if (key in data && data[key] !== void 0) result[key] = data[key];
    else if (fieldAttr.defaultValue !== void 0) result[key] = typeof fieldAttr.defaultValue === "function" ? fieldAttr.defaultValue() : fieldAttr.defaultValue;
    else if (!fieldAttr.required) result[key] = null;
  }
  if ("id" in data) result.id = data.id;
  return result;
}
function parseSessionOutput(options, session) {
  const schema2 = getFields(options, "session", "output");
  return filterOutputFields(session, schema2);
}
function parseAccountOutput(options, account) {
  const schema2 = getFields(options, "account", "output");
  const { accessToken: _accessToken, refreshToken: _refreshToken, idToken: _idToken, accessTokenExpiresAt: _accessTokenExpiresAt, refreshTokenExpiresAt: _refreshTokenExpiresAt, password: _password, ...rest } = filterOutputFields(account, schema2);
  return rest;
}
function parseInputData(data, schema2) {
  const action = schema2.action || "create";
  const fields = schema2.fields;
  const parsedData = /* @__PURE__ */ Object.create(null);
  for (const key in fields) {
    if (key in data) {
      if (fields[key].input === false) {
        if (fields[key].defaultValue !== void 0) {
          if (action !== "update") {
            parsedData[key] = fields[key].defaultValue;
            continue;
          }
        }
        if (data[key]) throw APIError2.from("BAD_REQUEST", {
          ...BASE_ERROR_CODES.FIELD_NOT_ALLOWED,
          message: `${key} is not allowed to be set`
        });
        continue;
      }
      if (fields[key].validator?.input && data[key] !== void 0) {
        const result = fields[key].validator.input["~standard"].validate(data[key]);
        if (result instanceof Promise) throw APIError2.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.ASYNC_VALIDATION_NOT_SUPPORTED);
        if ("issues" in result && result.issues) throw APIError2.from("BAD_REQUEST", {
          ...BASE_ERROR_CODES.VALIDATION_ERROR,
          message: result.issues[0]?.message || "Validation Error"
        });
        parsedData[key] = result.value;
        continue;
      }
      if (fields[key].transform?.input && data[key] !== void 0) {
        parsedData[key] = fields[key].transform?.input(data[key]);
        continue;
      }
      parsedData[key] = data[key];
      continue;
    }
    if (fields[key].defaultValue !== void 0 && action === "create") {
      if (typeof fields[key].defaultValue === "function") {
        parsedData[key] = fields[key].defaultValue();
        continue;
      }
      parsedData[key] = fields[key].defaultValue;
      continue;
    }
    if (fields[key].required && action === "create") throw APIError2.from("BAD_REQUEST", {
      ...BASE_ERROR_CODES.MISSING_FIELD,
      message: `${key} is required`
    });
  }
  return parsedData;
}
function parseUserInput(options, user = {}, action) {
  return parseInputData(user, {
    fields: getFields(options, "user", "input"),
    action
  });
}
function parseAdditionalUserInputFromProviderProfile(options, profile = {}, action) {
  const schema2 = getFields(options, "user", "input");
  const allowedProfileFields = /* @__PURE__ */ Object.create(null);
  for (const key of Object.keys(profile)) {
    if (schema2[key]?.input === false) continue;
    allowedProfileFields[key] = profile[key];
  }
  return parseInputData(allowedProfileFields, {
    fields: schema2,
    action
  });
}
function parseSessionInput(options, session, action) {
  return parseInputData(session, {
    fields: getFields(options, "session", "input"),
    action
  });
}
function getSessionDefaultFields(options) {
  const fields = getFields(options, "session", "input");
  const defaults = {};
  for (const key in fields) if (fields[key].defaultValue !== void 0) defaults[key] = typeof fields[key].defaultValue === "function" ? fields[key].defaultValue() : fields[key].defaultValue;
  return defaults;
}

// node_modules/better-auth/dist/utils/date.mjs
var getDate = (span, unit = "ms") => {
  return new Date(Date.now() + (unit === "sec" ? span * 1e3 : span));
};

// node_modules/better-auth/dist/utils/is-promise.mjs
function isPromise(obj) {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}

// node_modules/better-auth/dist/utils/time.mjs
var SEC = 1e3;
var MIN = SEC * 60;
var HOUR = MIN * 60;
var DAY = HOUR * 24;
var WEEK = DAY * 7;
var MONTH = DAY * 30;
var YEAR = DAY * 365.25;
var REGEX2 = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|y)(?: (ago|from now))?$/i;
function parse(value) {
  const match = REGEX2.exec(value);
  if (!match || match[4] && match[1]) throw new TypeError(`Invalid time string format: "${value}". Use formats like "7d", "30m", "1 hour", etc.`);
  const n = parseFloat(match[2]);
  const unit = match[3].toLowerCase();
  let result;
  switch (unit) {
    case "years":
    case "year":
    case "yrs":
    case "yr":
    case "y":
      result = n * YEAR;
      break;
    case "months":
    case "month":
    case "mo":
      result = n * MONTH;
      break;
    case "weeks":
    case "week":
    case "w":
      result = n * WEEK;
      break;
    case "days":
    case "day":
    case "d":
      result = n * DAY;
      break;
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      result = n * HOUR;
      break;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      result = n * MIN;
      break;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "s":
      result = n * SEC;
      break;
    default:
      throw new TypeError(`Unknown time unit: "${unit}"`);
  }
  if (match[1] === "-" || match[4] === "ago") return -result;
  return result;
}
function sec(value) {
  return Math.round(parse(value) / 1e3);
}

// node_modules/better-auth/dist/cookies/cache.mjs
var cookieCachePayloadSchema = looseObject({
  session: sessionSchema.loose(),
  user: userSchema.loose(),
  updatedAt: number(),
  version: string().optional()
});
var compactCookieCacheSchema = object({
  session: record(string(), unknown()),
  expiresAt: number(),
  signature: string()
});
function parseCookieCachePayload(value) {
  const parsed = safeJSONParse(value);
  if (parsed === null) return null;
  const result = cookieCachePayloadSchema.safeParse(parsed);
  if (result.success) return result.data;
  logger.warn("Cookie cache payload failed schema validation", { issues: result.error.issues.map(({ code, path: path2 }) => ({
    code,
    path: path2
  })) });
  return null;
}
function parseCompactCookieCache(value) {
  const result = compactCookieCacheSchema.safeParse(value);
  return result.success ? result.data : null;
}

// node_modules/better-auth/dist/cookies/cookie-utils.mjs
function tryDecode(str) {
  if (str.indexOf("%") === -1) return str;
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}
var SECURE_COOKIE_PREFIX = "__Secure-";
function splitSetCookieHeader(setCookie) {
  if (!setCookie) return [];
  const result = [];
  let start = 0;
  let i = 0;
  while (i < setCookie.length) {
    if (setCookie[i] === ",") {
      let j = i + 1;
      while (j < setCookie.length && setCookie[j] === " ") j++;
      while (j < setCookie.length && setCookie[j] !== "=" && setCookie[j] !== ";" && setCookie[j] !== ",") j++;
      if (j < setCookie.length && setCookie[j] === "=") {
        const part = setCookie.slice(start, i).trim();
        if (part) result.push(part);
        start = i + 1;
        while (start < setCookie.length && setCookie[start] === " ") start++;
        i = start;
        continue;
      }
    }
    i++;
  }
  const last = setCookie.slice(start).trim();
  if (last) result.push(last);
  return result;
}
function parseSetCookieHeader(setCookie) {
  const cookies = /* @__PURE__ */ new Map();
  splitSetCookieHeader(setCookie).forEach((cookieString) => {
    const [nameValue, ...attributes] = cookieString.split(";").map((part) => part.trim());
    const [name, ...valueParts] = (nameValue || "").split("=");
    const value = unquoteCookieValue(valueParts.join("="));
    if (!name) return;
    const attrObj = { value: tryDecode(value) };
    attributes.forEach((attribute) => {
      const [attrName, ...attrValueParts] = attribute.split("=");
      const attrValue = attrValueParts.join("=");
      const normalizedAttrName = attrName.trim().toLowerCase();
      switch (normalizedAttrName) {
        case "max-age":
          attrObj["max-age"] = attrValue ? parseInt(attrValue.trim(), 10) : void 0;
          break;
        case "expires":
          attrObj.expires = attrValue ? new Date(attrValue.trim()) : void 0;
          break;
        case "domain":
          attrObj.domain = attrValue ? attrValue.trim() : void 0;
          break;
        case "path":
          attrObj.path = attrValue ? attrValue.trim() : void 0;
          break;
        case "secure":
          attrObj.secure = true;
          break;
        case "httponly":
          attrObj.httponly = true;
          break;
        case "samesite":
          attrObj.samesite = attrValue ? attrValue.trim().toLowerCase() : void 0;
          break;
        case "partitioned":
          attrObj.partitioned = true;
          break;
        default:
          attrObj[normalizedAttrName] = attrValue ? attrValue.trim() : true;
      }
    });
    cookies.set(name, attrObj);
  });
  return cookies;
}
var cookieNameRegex = /^[\x21\x23-\x27\x2A\x2B\x2D\x2E\x30-\x39\x41-\x5A\x5E\x5F\x60\x61-\x7A\x7C\x7E]+$/;
var cookieValueRegex = /^[\x20\x21\x23-\x3A\x3C-\x5B\x5D-\x7E]*$/;
function unquoteCookieValue(value) {
  if (value.length < 2 || !value.startsWith('"') || !value.endsWith('"')) return value;
  return value.slice(1, -1);
}
function trimOWS(s) {
  let start = 0;
  let end = s.length;
  while (start < end) {
    const c = s.charCodeAt(start);
    if (c !== 32 && c !== 9) break;
    start++;
  }
  while (end > start) {
    const c = s.charCodeAt(end - 1);
    if (c !== 32 && c !== 9) break;
    end--;
  }
  return start === 0 && end === s.length ? s : s.slice(start, end);
}
function parseCookies(cookie) {
  const cookieMap = /* @__PURE__ */ new Map();
  if (cookie.length < 2) return cookieMap;
  for (const chunk of cookie.split(";")) {
    const eq = chunk.indexOf("=");
    if (eq === -1) continue;
    const key = trimOWS(chunk.slice(0, eq));
    const val = unquoteCookieValue(trimOWS(chunk.slice(eq + 1)));
    if (cookieNameRegex.test(key) && cookieValueRegex.test(val)) cookieMap.set(key, tryDecode(val));
  }
  return cookieMap;
}
function setRequestCookie(headers, name, value) {
  const cookieMap = parseCookies(headers.get("cookie") || "");
  if (cookieNameRegex.test(name)) cookieMap.set(name, value);
  headers.set("cookie", Array.from(cookieMap, ([k, v]) => `${k}=${encodeURIComponent(v)}`).join("; "));
}

// node_modules/@better-auth/utils/dist/index.mjs
function getWebcryptoSubtle() {
  const cr = typeof globalThis !== "undefined" && globalThis.crypto;
  if (cr && typeof cr.subtle === "object" && cr.subtle != null) return cr.subtle;
  throw new Error("crypto.subtle must be defined");
}

// node_modules/better-call/dist/crypto.mjs
var algorithm = {
  name: "HMAC",
  hash: "SHA-256"
};
var getCryptoKey = async (secret) => {
  const secretBuf = typeof secret === "string" ? new TextEncoder().encode(secret) : secret;
  return await getWebcryptoSubtle().importKey("raw", secretBuf, algorithm, false, ["sign", "verify"]);
};
var verifySignature2 = async (base64Signature, value, secret) => {
  try {
    const signatureBinStr = atob(base64Signature);
    const signature = new Uint8Array(signatureBinStr.length);
    for (let i = 0, len = signatureBinStr.length; i < len; i++) signature[i] = signatureBinStr.charCodeAt(i);
    return await getWebcryptoSubtle().verify(algorithm, secret, signature, new TextEncoder().encode(value));
  } catch {
    return false;
  }
};
var makeSignature = async (value, secret) => {
  const key = await getCryptoKey(secret);
  const signature = await getWebcryptoSubtle().sign(algorithm.name, key, new TextEncoder().encode(value));
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
};
var signCookieValue = async (value, secret) => {
  const signature = await makeSignature(value, secret);
  value = `${value}.${signature}`;
  value = encodeURIComponent(value);
  return value;
};

// node_modules/better-call/dist/utils.mjs
var jsonContentTypeRegex = /^application\/([a-z0-9.+-]*\+)?json/i;
async function getBody(request, allowedMediaTypes) {
  const contentType = request.headers.get("content-type") || "";
  const normalizedContentType = contentType.toLowerCase();
  if (!request.body) return;
  if (allowedMediaTypes && allowedMediaTypes.length > 0) {
    if (!allowedMediaTypes.some((allowed) => {
      return normalizedContentType.split(";")[0].trim() === allowed.toLowerCase().trim();
    })) {
      if (!normalizedContentType) {
        const reader = request.body.getReader();
        const first = await reader.read().catch(() => null);
        reader.releaseLock();
        if (first?.done) return;
        throw new APIError(415, {
          message: `Content-Type is required. Allowed types: ${allowedMediaTypes.join(", ")}`,
          code: "UNSUPPORTED_MEDIA_TYPE"
        });
      }
      throw new APIError(415, {
        message: `Content-Type "${contentType}" is not allowed. Allowed types: ${allowedMediaTypes.join(", ")}`,
        code: "UNSUPPORTED_MEDIA_TYPE"
      });
    }
  }
  if (jsonContentTypeRegex.test(normalizedContentType)) try {
    return await request.json();
  } catch (e) {
    if (e instanceof SyntaxError) throw new APIError(400, {
      message: "Invalid JSON in request body",
      code: "BAD_REQUEST"
    });
    throw e;
  }
  if (normalizedContentType.includes("application/x-www-form-urlencoded")) {
    const formData = await request.formData();
    const result = {};
    formData.forEach((value, key) => {
      result[key] = value.toString();
    });
    return result;
  }
  if (normalizedContentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const result = {};
    formData.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
  if (normalizedContentType.includes("text/plain")) return await request.text();
  if (normalizedContentType.includes("application/octet-stream")) return await request.arrayBuffer();
  if (normalizedContentType.includes("application/pdf") || normalizedContentType.includes("image/") || normalizedContentType.includes("video/")) return await request.blob();
  if (normalizedContentType.includes("application/stream") || request.body instanceof ReadableStream) return request.body;
  return await request.text();
}
function isAPIError(error2) {
  return error2 instanceof APIError || error2?.name === "APIError";
}
function tryDecode2(str) {
  try {
    return str.includes("%") ? decodeURIComponent(str) : str;
  } catch {
    return str;
  }
}
async function tryCatch(promise) {
  try {
    return {
      data: await promise,
      error: null
    };
  } catch (error2) {
    return {
      data: null,
      error: error2
    };
  }
}
function isRequest(obj) {
  return obj instanceof Request || Object.prototype.toString.call(obj) === "[object Request]";
}

// node_modules/better-call/dist/cookies.mjs
var COOKIE_PREFIXES = {
  secure: "__Secure-",
  host: "__Host-"
};
var getCookieKey = (key, prefix) => {
  if (!prefix) return key;
  if (prefix !== "secure" && prefix !== "host") return void 0;
  return COOKIE_PREFIXES[prefix] + key;
};
function parseCookies2(str) {
  if (typeof str !== "string") throw new TypeError("argument str must be a string");
  const cookies = /* @__PURE__ */ new Map();
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) break;
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) endIdx = str.length;
    else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (!cookies.has(key)) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) val = val.slice(1, -1);
      cookies.set(key, tryDecode2(val));
    }
    index = endIdx + 1;
  }
  return cookies;
}
function resolveCookie(name, value, options = {}) {
  const resolvedName = getCookieKey(name, options.prefix) ?? name;
  const resolvedOptions = { ...options };
  const lowerName = resolvedName.toLowerCase();
  if (lowerName.startsWith("__host-")) {
    resolvedOptions.secure = true;
    resolvedOptions.path = "/";
    resolvedOptions.domain = void 0;
  } else if (lowerName.startsWith("__secure-")) resolvedOptions.secure = true;
  if (resolvedOptions.partitioned === true || resolvedOptions.sameSite?.toLowerCase() === "none") resolvedOptions.secure = true;
  return {
    name: resolvedName,
    value,
    options: resolvedOptions
  };
}
function serializeCookieValue({ name, value, options }) {
  let cookie = `${name}=${value}`;
  if (typeof options.maxAge === "number" && options.maxAge >= 0) {
    if (options.maxAge > 3456e4) throw new Error("Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.");
    cookie += `; Max-Age=${Math.floor(options.maxAge)}`;
  }
  if (options.domain) cookie += `; Domain=${options.domain}`;
  if (options.path) cookie += `; Path=${options.path}`;
  if (options.expires) {
    if (options.expires.getTime() - Date.now() > 3456e7) throw new Error("Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.");
    cookie += `; Expires=${options.expires.toUTCString()}`;
  }
  if (options.httpOnly) cookie += "; HttpOnly";
  if (options.secure) cookie += "; Secure";
  if (options.sameSite) cookie += `; SameSite=${options.sameSite.charAt(0).toUpperCase() + options.sameSite.slice(1)}`;
  if (options.partitioned) cookie += "; Partitioned";
  return cookie;
}
var serializeCookie = (key, value, opt) => {
  value = encodeURIComponent(value);
  return serializeCookieValue(resolveCookie(key, value, opt));
};
var serializeSignedCookie = async (key, value, secret, opt) => {
  value = await signCookieValue(value, secret);
  return serializeCookieValue(resolveCookie(key, value, opt));
};

// node_modules/better-call/dist/to-response.mjs
function isJSONSerializable(value) {
  if (value === void 0) return false;
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) return true;
  if (t !== "object") return false;
  if (Array.isArray(value)) return true;
  if (value.buffer) return false;
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
function safeStringify(obj) {
  const parents = /* @__PURE__ */ new WeakMap();
  const ids = /* @__PURE__ */ new WeakMap();
  let id = 0;
  const isAncestor = (value, holder) => {
    let curr = holder;
    while (curr) {
      if (curr === value) return true;
      curr = parents.get(curr);
    }
    return false;
  };
  return JSON.stringify(obj, function(_key, value) {
    if (typeof value === "bigint") return value.toString();
    if (typeof value === "object" && value !== null) {
      if (isAncestor(value, this)) return `[Circular ref-${ids.get(value)}]`;
      parents.set(value, this);
      if (!ids.has(value)) ids.set(value, id++);
    }
    return value;
  });
}
function isJSONResponse(value) {
  if (!value || typeof value !== "object") return false;
  return "_flag" in value && value._flag === "json";
}
var REQUEST_ONLY_HEADERS = /* @__PURE__ */ new Set([
  "host",
  "user-agent",
  "referer",
  "from",
  "expect",
  "authorization",
  "proxy-authorization",
  "cookie",
  "origin",
  "accept-charset",
  "accept-encoding",
  "accept-language",
  "if-match",
  "if-none-match",
  "if-modified-since",
  "if-unmodified-since",
  "if-range",
  "range",
  "max-forwards",
  "connection",
  "keep-alive",
  "transfer-encoding",
  "te",
  "upgrade",
  "trailer",
  "proxy-connection",
  "content-length"
]);
function stripRequestOnlyHeaders(headers) {
  for (const name of REQUEST_ONLY_HEADERS) headers.delete(name);
}
function copyHeaders(target, source) {
  if (!source) return;
  for (const [key, value] of new Headers(source).entries()) if (key.toLowerCase() === "set-cookie") target.append(key, value);
  else target.set(key, value);
}
function toResponse(data, init2) {
  if (data instanceof Response) {
    if (init2?.headers) {
      const safeHeaders = new Headers(init2.headers);
      stripRequestOnlyHeaders(safeHeaders);
      copyHeaders(data.headers, safeHeaders);
    }
    return data;
  }
  if (isJSONResponse(data)) {
    const body2 = data.body;
    const routerResponse = data.routerResponse;
    if (routerResponse instanceof Response) return routerResponse;
    const headers2 = new Headers();
    copyHeaders(headers2, routerResponse?.headers);
    copyHeaders(headers2, data.headers);
    if (init2?.headers) {
      const safeHeaders = new Headers(init2.headers);
      stripRequestOnlyHeaders(safeHeaders);
      copyHeaders(headers2, safeHeaders);
    }
    headers2.set("Content-Type", "application/json");
    const status = data.status ?? init2?.status ?? routerResponse?.status;
    const statusText = init2?.statusText ?? routerResponse?.statusText;
    return new Response(JSON.stringify(body2), {
      ...routerResponse,
      headers: headers2,
      ...status === void 0 ? {} : { status },
      ...statusText === void 0 ? {} : { statusText }
    });
  }
  if (isAPIError(data)) return toResponse(data.body, {
    status: init2?.status ?? data.statusCode,
    statusText: data.status.toString(),
    headers: init2?.headers || data.headers
  });
  let body = data;
  const headers = new Headers(init2?.headers);
  stripRequestOnlyHeaders(headers);
  if (!data) {
    if (data === null) body = JSON.stringify(null);
    headers.set("content-type", "application/json");
  } else if (typeof data === "string") {
    body = data;
    headers.set("Content-Type", "text/plain");
  } else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
    body = data;
    headers.set("Content-Type", "application/octet-stream");
  } else if (data instanceof Blob) {
    body = data;
    headers.set("Content-Type", data.type || "application/octet-stream");
  } else if (data instanceof FormData) body = data;
  else if (data instanceof URLSearchParams) {
    body = data;
    headers.set("Content-Type", "application/x-www-form-urlencoded");
  } else if (data instanceof ReadableStream) {
    body = data;
    headers.set("Content-Type", "application/octet-stream");
  } else if (isJSONSerializable(data)) {
    body = safeStringify(data);
    headers.set("Content-Type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers
  });
}

// node_modules/better-call/dist/validator.mjs
async function runValidation(options, context = {}) {
  const request = {
    body: context.body,
    query: context.query
  };
  if (options.body) {
    const result = await options.body["~standard"].validate(context.body);
    if (result.issues) return {
      data: null,
      error: fromError(result.issues, "body")
    };
    request.body = result.value;
  }
  if (options.query) {
    const result = await options.query["~standard"].validate(context.query);
    if (result.issues) return {
      data: null,
      error: fromError(result.issues, "query")
    };
    request.query = result.value;
  }
  if (options.requireHeaders && !context.headers) return {
    data: null,
    error: {
      message: "Headers is required",
      issues: []
    }
  };
  if (options.requireRequest && !context.request) return {
    data: null,
    error: {
      message: "Request is required",
      issues: []
    }
  };
  return {
    data: request,
    error: null
  };
}
function fromError(error2, validating) {
  return {
    message: error2.map((e) => {
      return `[${e.path?.length ? `${validating}.` + e.path.map((x) => typeof x === "object" ? x.key : x).join(".") : validating}] ${e.message}`;
    }).join("; "),
    issues: error2
  };
}

// node_modules/better-call/dist/context.mjs
var createInternalContext = async (context, { options, path: path2 }) => {
  const headers = new Headers();
  let responseStatus = void 0;
  const { data, error: error2 } = await runValidation(options, context);
  if (error2) throw new ValidationError(error2.message, error2.issues);
  const requestHeaders = context.headers !== void 0 ? context.headers instanceof Headers ? context.headers : new Headers(context.headers) : "request" in context && isRequest(context.request) ? context.request.headers : null;
  const requestCookies = requestHeaders?.get("cookie");
  const parsedCookies = requestCookies ? parseCookies2(requestCookies) : void 0;
  const internalContext = {
    ...context,
    body: data.body,
    query: data.query,
    path: context.path || path2 || "virtual:",
    context: "context" in context && context.context ? context.context : {},
    returned: void 0,
    headers: context?.headers,
    request: context?.request,
    params: "params" in context ? context.params : void 0,
    method: context.method ?? (Array.isArray(options.method) ? options.method[0] : options.method === "*" ? "GET" : options.method),
    setHeader: (key, value) => {
      headers.set(key, value);
    },
    getHeader: (key) => {
      if (!requestHeaders) return null;
      return requestHeaders.get(key);
    },
    getCookie: (key, prefix) => {
      const finalKey = getCookieKey(key, prefix);
      if (!finalKey) return null;
      return parsedCookies?.get(finalKey) || null;
    },
    getSignedCookie: async (key, secret, prefix) => {
      const finalKey = getCookieKey(key, prefix);
      if (!finalKey) return null;
      const value = parsedCookies?.get(finalKey);
      if (!value) return null;
      const signatureStartPos = value.lastIndexOf(".");
      if (signatureStartPos < 1) return null;
      const signedValue = value.substring(0, signatureStartPos);
      const signature = value.substring(signatureStartPos + 1);
      if (signature.length !== 44 || !signature.endsWith("=")) return null;
      const secretKey = await getCryptoKey(secret);
      return await verifySignature2(signature, signedValue, secretKey) ? signedValue : false;
    },
    setCookie: (key, value, options2) => {
      const cookie = serializeCookie(key, value, options2);
      headers.append("set-cookie", cookie);
      return cookie;
    },
    setSignedCookie: async (key, value, secret, options2) => {
      const cookie = await serializeSignedCookie(key, value, secret, options2);
      headers.append("set-cookie", cookie);
      return cookie;
    },
    redirect: (url) => {
      headers.set("location", url);
      return new APIError("FOUND", void 0, headers);
    },
    error: (status, body, headers2) => {
      return new APIError(status, body, headers2);
    },
    setStatus: (status) => {
      responseStatus = status;
    },
    json: (json, routerResponse) => {
      if (!context.asResponse) return json;
      return {
        body: routerResponse?.body || json,
        routerResponse,
        _flag: "json"
      };
    },
    responseHeaders: headers,
    get responseStatus() {
      return responseStatus;
    }
  };
  for (const middleware of options.use || []) {
    const response = await middleware({
      ...internalContext,
      returnHeaders: true,
      asResponse: false
    });
    if (response.response) Object.assign(internalContext.context, response.response);
    copyHeaders(internalContext.responseHeaders, response.headers);
  }
  return internalContext;
};

// node_modules/better-call/dist/endpoint.mjs
function createEndpoint(pathOrOptions, handlerOrOptions, handlerOrNever) {
  const path2 = typeof pathOrOptions === "string" ? pathOrOptions : void 0;
  const options = typeof handlerOrOptions === "object" ? handlerOrOptions : pathOrOptions;
  const handler = typeof handlerOrOptions === "function" ? handlerOrOptions : handlerOrNever;
  if ((options.method === "GET" || options.method === "HEAD") && options.body) throw new BetterCallError("Body is not allowed with GET or HEAD methods");
  if (path2 && /\/{2,}/.test(path2)) throw new BetterCallError("Path cannot contain consecutive slashes");
  const internalHandler = async (...inputCtx) => {
    const context = inputCtx[0] || {};
    const { data: internalContext, error: validationError } = await tryCatch(createInternalContext(context, {
      options,
      path: path2
    }));
    if (validationError) {
      if (!(validationError instanceof ValidationError)) throw validationError;
      if (options.onValidationError) await options.onValidationError({
        message: validationError.message,
        issues: validationError.issues
      });
      throw new APIError(400, {
        message: validationError.message,
        code: "VALIDATION_ERROR"
      });
    }
    const response = await handler(internalContext).catch(async (e) => {
      if (isAPIError(e)) {
        const onAPIError = options.onAPIError;
        if (onAPIError) await onAPIError(e);
        if (context.asResponse) return e;
      }
      throw e;
    });
    const headers = internalContext.responseHeaders;
    const status = internalContext.responseStatus;
    return context.asResponse ? toResponse(response, status === void 0 ? { headers } : {
      headers,
      status
    }) : context.returnHeaders ? context.returnStatus ? {
      headers,
      response,
      status
    } : {
      headers,
      response
    } : context.returnStatus ? {
      response,
      status
    } : response;
  };
  internalHandler.options = options;
  internalHandler.path = path2;
  return internalHandler;
}
function combineMiddleware(local, configured) {
  return [...local ?? [], ...configured ?? []];
}
createEndpoint.create = (opts) => {
  function createConfiguredEndpoint(...args) {
    if (args.length === 3) {
      const [path2, options2, handler2] = args;
      return createEndpoint(path2, {
        ...options2,
        use: combineMiddleware(options2.use, opts?.use)
      }, handler2);
    }
    const [options, handler] = args;
    return createEndpoint({
      ...options,
      use: combineMiddleware(options.use, opts?.use)
    }, handler);
  }
  return createConfiguredEndpoint;
};

// node_modules/better-call/dist/middleware.mjs
function createMiddleware(optionsOrHandler, handler) {
  const internalHandler = async (inputCtx) => {
    const context = inputCtx;
    const _handler = typeof optionsOrHandler === "function" ? optionsOrHandler : handler;
    const internalContext = await createInternalContext(context, {
      options: typeof optionsOrHandler === "function" ? {} : optionsOrHandler,
      path: "/"
    });
    if (!_handler) throw new Error("handler must be defined");
    try {
      const response = await _handler(internalContext);
      const headers = internalContext.responseHeaders;
      return context.returnHeaders ? {
        headers,
        response
      } : response;
    } catch (e) {
      if (isAPIError(e)) Object.defineProperty(e, kAPIErrorHeaderSymbol, {
        enumerable: false,
        configurable: true,
        get() {
          return internalContext.responseHeaders;
        }
      });
      throw e;
    }
  };
  internalHandler.options = typeof optionsOrHandler === "function" ? {} : optionsOrHandler;
  return internalHandler;
}
createMiddleware.create = (opts) => {
  function fn(optionsOrHandler, handler) {
    if (typeof optionsOrHandler === "function") return createMiddleware({ use: opts?.use }, optionsOrHandler);
    if (!handler) throw new Error("Middleware handler is required");
    return createMiddleware({
      ...optionsOrHandler,
      method: "*",
      use: [...opts?.use || [], ...optionsOrHandler.use || []]
    }, handler);
  }
  return fn;
};

// node_modules/better-call/dist/openapi.mjs
var paths = {};
function getTypeFromZodType(zodType) {
  switch (zodType.constructor.name) {
    case "ZodString":
      return "string";
    case "ZodNumber":
      return "number";
    case "ZodBoolean":
      return "boolean";
    case "ZodObject":
      return "object";
    case "ZodArray":
      return "array";
    default:
      return "string";
  }
}
function getParameters(options) {
  const parameters = [];
  if (options.metadata?.openapi?.parameters) {
    parameters.push(...options.metadata.openapi.parameters);
    return parameters;
  }
  if (options.query instanceof ZodObject) Object.entries(options.query.shape).forEach(([key, value]) => {
    if (value instanceof ZodObject) parameters.push({
      name: key,
      in: "query",
      schema: {
        type: getTypeFromZodType(value),
        ..."minLength" in value && value.minLength ? { minLength: value.minLength } : {},
        description: value.description
      }
    });
  });
  return parameters;
}
function getRequestBody(options) {
  if (options.metadata?.openapi?.requestBody) return options.metadata.openapi.requestBody;
  if (!options.body) return void 0;
  if (options.body instanceof ZodObject || options.body instanceof ZodOptional) {
    const shape = options.body.shape;
    if (!shape) return void 0;
    const properties = {};
    const required = [];
    Object.entries(shape).forEach(([key, value]) => {
      if (value instanceof ZodObject) {
        properties[key] = {
          type: getTypeFromZodType(value),
          description: value.description
        };
        if (!(value instanceof ZodOptional)) required.push(key);
      }
    });
    return {
      required: options.body instanceof ZodOptional ? false : options.body ? true : false,
      content: { "application/json": { schema: {
        type: "object",
        properties,
        required
      } } }
    };
  }
}
function getResponse(responses) {
  return {
    "400": {
      content: { "application/json": { schema: {
        type: "object",
        properties: { message: { type: "string" } },
        required: ["message"]
      } } },
      description: "Bad Request. Usually due to missing parameters, or invalid parameters."
    },
    "401": {
      content: { "application/json": { schema: {
        type: "object",
        properties: { message: { type: "string" } },
        required: ["message"]
      } } },
      description: "Unauthorized. Due to missing or invalid authentication."
    },
    "403": {
      content: { "application/json": { schema: {
        type: "object",
        properties: { message: { type: "string" } }
      } } },
      description: "Forbidden. You do not have permission to access this resource or to perform this action."
    },
    "404": {
      content: { "application/json": { schema: {
        type: "object",
        properties: { message: { type: "string" } }
      } } },
      description: "Not Found. The requested resource was not found."
    },
    "429": {
      content: { "application/json": { schema: {
        type: "object",
        properties: { message: { type: "string" } }
      } } },
      description: "Too Many Requests. You have exceeded the rate limit. Try again later."
    },
    "500": {
      content: { "application/json": { schema: {
        type: "object",
        properties: { message: { type: "string" } }
      } } },
      description: "Internal Server Error. This is a problem with the server that you cannot fix."
    },
    ...responses
  };
}
async function generator(endpoints, config2) {
  const components = { schemas: {} };
  Object.entries(endpoints).forEach(([_, value]) => {
    const options = value.options;
    if (!value.path || options.metadata?.SERVER_ONLY) return;
    if (options.method === "GET") paths[value.path] = { get: {
      tags: ["Default", ...options.metadata?.openapi?.tags || []],
      description: options.metadata?.openapi?.description,
      operationId: options.metadata?.openapi?.operationId,
      security: [{ bearerAuth: [] }],
      parameters: getParameters(options),
      responses: getResponse(options.metadata?.openapi?.responses)
    } };
    if (options.method === "POST") {
      const body = getRequestBody(options);
      paths[value.path] = { post: {
        tags: ["Default", ...options.metadata?.openapi?.tags || []],
        description: options.metadata?.openapi?.description,
        operationId: options.metadata?.openapi?.operationId,
        security: [{ bearerAuth: [] }],
        parameters: getParameters(options),
        ...body ? { requestBody: body } : { requestBody: { content: { "application/json": { schema: {
          type: "object",
          properties: {}
        } } } } },
        responses: getResponse(options.metadata?.openapi?.responses)
      } };
    }
  });
  return {
    openapi: "3.1.1",
    info: {
      title: "Better Auth",
      description: "API Reference for your Better Auth Instance",
      version: "1.1.0"
    },
    components,
    security: [{ apiKeyCookie: [] }],
    servers: [{ url: config2?.url }],
    tags: [{
      name: "Default",
      description: "Default endpoints that are included with Better Auth by default. These endpoints are not part of any plugin."
    }],
    paths
  };
}
var getHTML = (apiReference, config2) => `<!doctype html>
<html>
  <head>
    <title>Scalar API Reference</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <script
      id="api-reference"
      type="application/json">
    ${JSON.stringify(apiReference)}
    </script>
	 <script>
      var configuration = {
	  	favicon: ${config2?.logo ? `data:image/svg+xml;utf8,${encodeURIComponent(config2.logo)}` : void 0} ,
	   	theme: ${config2?.theme || "saturn"},
        metaData: {
			title: ${config2?.title || "Open API Reference"},
			description: ${config2?.description || "Better Call Open API"},
		}
      }
      document.getElementById('api-reference').dataset.configuration =
        JSON.stringify(configuration)
    </script>
	  <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
  </body>
</html>`;

// node_modules/rou3/dist/index.mjs
var NullProtoObj = /* @__PURE__ */ (() => {
  const e = function() {
  };
  return e.prototype = /* @__PURE__ */ Object.create(null), Object.freeze(e.prototype), e;
})();
function createRouter() {
  return {
    root: { key: "" },
    static: new NullProtoObj()
  };
}
function scanFirstGroup(path2) {
  let i = 0;
  let depth = 0;
  for (; i < path2.length; i++) {
    const c = path2.charCodeAt(i);
    if (c === 92) i++;
    else if (c === 40) depth++;
    else if (c === 41 && depth > 0) depth--;
    else if (c === 123 && depth === 0) break;
  }
  if (i >= path2.length) return;
  let j = i + 1;
  depth = 0;
  for (; j < path2.length; j++) {
    const c = path2.charCodeAt(j);
    if (c === 92) j++;
    else if (c === 40) depth++;
    else if (c === 41 && depth > 0) depth--;
    else if (c === 125 && depth === 0) break;
  }
  if (j >= path2.length) return;
  const mod = path2[j + 1];
  const hasMod = mod === "?" || mod === "+" || mod === "*";
  return [
    path2.slice(0, i),
    path2.slice(i + 1, j),
    path2.slice(j + (hasMod ? 2 : 1)),
    hasMod ? mod : void 0
  ];
}
function expandGroupDelimiters(path2) {
  if (!path2.includes("{")) return;
  const group = scanFirstGroup(path2);
  if (!group) return;
  const [pre, body, suf, mod] = group;
  if (!mod) return [pre + body + suf];
  if (mod === "?") return [pre + body + suf, pre + suf];
  if (body.includes("/")) throw new Error("unsupported group repetition across segments");
  return [`${pre}(?:${body})${mod}${suf}`];
}
var UNNAMED_GROUP_PREFIX = "__rou3_unnamed_";
var ESCAPED_GROUP_PREFIX = "__rou3_esc_";
function toUnnamedGroupKey(index) {
  return `${UNNAMED_GROUP_PREFIX}${index}`;
}
function toGroupName(name) {
  return /^(?!__rou3_|_\d)[A-Za-z_]\w*$/.test(name) ? name : ESCAPED_GROUP_PREFIX + name.replace(/[_-]/g, (c) => c === "_" ? "__" : "_h");
}
function fromGroupName(key) {
  if (key.charCodeAt(0) !== 95) return key;
  if (key.startsWith("__rou3_esc_")) return key.slice(11).replace(/__|_h/g, (c) => c === "__" ? "_" : "-");
  return key.startsWith("__rou3_unnamed_") ? key.slice(15) : key;
}
function hasSegmentWildcard(segment) {
  let depth = 0;
  for (let i = 0; i < segment.length; i++) {
    const ch = segment.charCodeAt(i);
    if (ch === 92) {
      i++;
      continue;
    }
    if (ch === 40) {
      depth++;
      continue;
    }
    if (ch === 41 && depth > 0) {
      depth--;
      continue;
    }
    if (ch === 42 && depth === 0) return true;
  }
  return false;
}
function replaceSegmentWildcards(segment, unnamedStart, toGroupKey = toUnnamedGroupKey) {
  let depth = 0;
  let nextIndex = unnamedStart;
  let replaced = "";
  for (let i = 0; i < segment.length; i++) {
    const ch = segment.charCodeAt(i);
    if (ch === 92) {
      replaced += segment[i];
      if (i + 1 < segment.length) replaced += segment[++i];
      continue;
    }
    if (ch === 40) {
      depth++;
      replaced += segment[i];
      continue;
    }
    if (ch === 41 && depth > 0) {
      depth--;
      replaced += segment[i];
      continue;
    }
    if (ch === 42 && depth === 0) {
      replaced += `(?<${toGroupKey(nextIndex++)}>[^/]*)`;
      continue;
    }
    replaced += segment[i];
  }
  return [replaced, nextIndex];
}
function encodeEscapes(path2) {
  if (!path2.includes("\\")) return path2;
  return path2.replace(/\\([:(){}])/g, (_, c) => "\uFFFD" + "ABCDE"[":(){}".indexOf(c)]);
}
function segmentKey(segment) {
  if (segment.startsWith("**")) return 2;
  if (segment === "*" || segment.includes(":") || segment.includes("(") || hasSegmentWildcard(segment)) return 1;
  if (segment === "\\*") return "*";
  if (segment === "\\*\\*") return "**";
  if (!segment.includes("\uFFFD")) return segment;
  return segment.replace(/\uFFFD([A-E])/g, (_, c) => c === "A" ? ":" : c === "B" ? "(" : c === "C" ? ")" : c === "D" ? "{" : "}");
}
function expandModifiers(segments) {
  for (let i = 0; i < segments.length; i++) {
    const last = segments[i].charCodeAt(segments[i].length - 1);
    if (last !== 63 && last !== 43 && last !== 42) continue;
    const m = segments[i].match(/^(.*:[\w-]+(?:\([^)]*\))?)([?+*])$/);
    if (!m) continue;
    const pre = segments.slice(0, i);
    const suf = segments.slice(i + 1);
    if (m[2] === "?") return ["/" + pre.concat(m[1]).concat(suf).join("/"), "/" + pre.concat(suf).join("/")];
    const name = m[1].match(/:([\w-]+)/)?.[1] || "_";
    const wc = "/" + [
      ...pre,
      `**:${name}`,
      ...suf
    ].join("/");
    const without = "/" + [...pre, ...suf].join("/");
    return m[2] === "+" ? [wc] : [wc, without];
  }
}
function normalizePath(path2) {
  if (!path2.includes("/.")) return path2;
  const r = [];
  for (const s of path2.split("/")) if (s === ".") continue;
  else if (s === ".." && r.length > 1) r.pop();
  else r.push(s);
  return r.join("/") || "/";
}
function splitPath(path2) {
  const s = path2.split("/");
  s.shift();
  if (s[s.length - 1] === "") s.pop();
  return s;
}
function splitRoute(path2) {
  const s = splitPath(path2);
  while (s[s.length - 1] === "") s.pop();
  return s;
}
function getMatchParams(segments, paramsMap) {
  const params = new NullProtoObj();
  for (const [index, name] of paramsMap) {
    const segment = index < 0 ? segments.slice(-(index + 1)).join("/") : segments[index];
    if (typeof name === "string") params[name] = segment;
    else {
      const match = segment.match(name);
      if (match) for (const key in match.groups) params[fromGroupName(key)] = match.groups[key];
    }
  }
  return params;
}
function addRoute(ctx, method = "", path2, data) {
  method = method.toUpperCase();
  if (path2.charCodeAt(0) !== 47) path2 = `/${path2}`;
  const groupExpanded = expandGroupDelimiters(path2);
  if (groupExpanded) {
    for (const expandedPath of groupExpanded) addRoute(ctx, method, expandedPath, data);
    return;
  }
  path2 = encodeEscapes(path2);
  const segments = splitRoute(path2);
  const expanded = expandModifiers(segments);
  if (expanded) {
    for (const p of expanded) addRoute(ctx, method, p, data);
    return;
  }
  let node = ctx.root;
  let _unnamedParamIndex = 0;
  const paramsMap = [];
  const paramsRegexp = [];
  for (let i = 0; i < segments.length; i++) {
    let segment = segments[i];
    const key = segmentKey(segment);
    if (key === 2) {
      if (!node.wildcard) node.wildcard = { key: "**" };
      node = node.wildcard;
      paramsMap.push([
        -(i + 1),
        segment.split(":")[1] || "_",
        segment.length === 2
      ]);
      break;
    }
    if (key === 1) {
      if (!node.param) node.param = { key: "*" };
      node = node.param;
      if (segment === "*") paramsMap.push([
        i,
        String(_unnamedParamIndex++),
        true
      ]);
      else if (segment.includes("(") || segment.includes(":", 1) || !/^:[\w-]+$/.test(segment)) {
        const [regexp, nextIndex] = getParamRegexp(segment, _unnamedParamIndex);
        _unnamedParamIndex = nextIndex;
        paramsRegexp[i] = regexp;
        node.hasRegexParam = true;
        paramsMap.push([
          i,
          regexp,
          false
        ]);
      } else paramsMap.push([
        i,
        segment.slice(1),
        false
      ]);
      continue;
    }
    segment = segments[i] = key;
    const child = node.static?.[segment];
    if (child) node = child;
    else {
      const staticNode = { key: segment };
      if (!node.static) node.static = new NullProtoObj();
      node.static[segment] = staticNode;
      node = staticNode;
    }
  }
  const hasParams = paramsMap.length > 0;
  const methods2 = node.methods ??= new NullProtoObj();
  (methods2[method] ??= []).push({
    data: data || null,
    paramsRegexp,
    paramsMap: hasParams ? paramsMap : void 0
  });
  if (!hasParams) ctx.static["/" + segments.join("/")] = node;
}
function getParamRegexp(segment, unnamedStart = 0) {
  let _i = unnamedStart;
  let _s = "", _d = 0;
  for (let j = 0; j < segment.length; j++) {
    const c = segment.charCodeAt(j);
    if (c === 40) _d++;
    else if (c === 41 && _d > 0) _d--;
    else if (c === 92 && _d === 0 && j + 1 < segment.length) {
      const n = segment[j + 1];
      if (n !== ":" && n !== "(" && n !== "*" && n !== "\\") {
        _s += "\uFFFE" + n;
        j++;
        continue;
      }
    } else if (c === 46 && _d === 0) {
      _s += "\\.";
      continue;
    }
    _s += segment[j];
  }
  [_s, _i] = replaceSegmentWildcards(_s, _i);
  const regex = _s.replace(/:([\w-]+)(?:\(([^)]*)\))?/g, (_, id, p) => `(?<${toGroupName(id)}>${p || "[^/]+"})`).replace(/\((?![?<])/g, () => `(?<${toUnnamedGroupKey(_i++)}>`).replace(/\uFFFE(.)/g, (_, c) => /[.*+?^${}()|[\]\\]/.test(c) ? `\\${c}` : c);
  return [new RegExp(`^${regex}$`), _i];
}
function findRoute(ctx, method = "", path2, opts) {
  if (opts?.normalize) path2 = normalizePath(path2);
  if (path2.charCodeAt(path2.length - 1) === 47) path2 = path2.slice(0, -1);
  const staticNode = ctx.static[path2];
  if (staticNode && staticNode.methods) {
    const staticMatch = staticNode.methods[method] || staticNode.methods[""];
    if (staticMatch !== void 0) return staticMatch[0];
  }
  const segments = splitPath(path2);
  const match = _lookupTree(ctx.root, method, segments, 0);
  if (match === void 0) return;
  if (opts?.params === false) return match;
  return {
    data: match.data,
    params: match.paramsMap ? getMatchParams(segments, match.paramsMap) : void 0
  };
}
function _lookupTree(node, method, segments, index) {
  if (index === segments.length) {
    if (node.methods) {
      const match = _selectMatcher(node.methods, method, segments, node.key === "*", false);
      if (match) return match;
    }
    return node.param?.methods && _selectMatcher(node.param.methods, method, segments, true, true) || node.wildcard?.methods && _selectMatcher(node.wildcard.methods, method, segments, true, true) || void 0;
  }
  const segment = segments[index];
  if (node.static) {
    const staticChild = node.static[segment];
    if (staticChild) {
      const match = _lookupTree(staticChild, method, segments, index + 1);
      if (match) return match;
    }
  }
  if (node.param) {
    const match = _lookupTree(node.param, method, segments, index + 1);
    if (match) return match;
  }
  if (node.wildcard && node.wildcard.methods) return _selectMatcher(node.wildcard.methods, method, segments, true, false);
}
function _selectMatcher(methods2, method, segments, dynamicTerminal, optionalOnly) {
  const match = methods2[method] || methods2[""];
  if (!match) return;
  const first = match[0];
  if (match.length === 1 && first.paramsRegexp.length === 0) {
    if (!optionalOnly) return first;
    const pMap = first.paramsMap;
    return pMap?.[pMap.length - 1]?.[2] ? first : void 0;
  }
  let best;
  let bestWeight = -1;
  for (const m of match) {
    const pMap = m.paramsMap;
    const lastOptional = pMap?.[pMap.length - 1]?.[2];
    if (optionalOnly && !lastOptional) continue;
    let weight = dynamicTerminal && pMap && !lastOptional ? 1 : 0;
    const regexps = m.paramsRegexp;
    for (let i = 0; i < regexps.length; i++) if (regexps[i]) {
      if (!regexps[i].test(segments[i])) {
        weight = -1;
        break;
      }
      weight++;
    }
    if (weight > bestWeight) {
      best = m;
      bestWeight = weight;
    }
  }
  return best;
}
function findAllRoutes(ctx, method = "", path2, opts) {
  if (opts?.normalize) path2 = normalizePath(path2);
  if (path2.charCodeAt(path2.length - 1) === 47) path2 = path2.slice(0, -1);
  const segments = splitPath(path2);
  const matches = _findAll(ctx.root, method, segments, 0);
  if (opts?.params === false) return matches;
  return matches.map((m) => {
    return {
      data: m.data,
      params: m.paramsMap ? getMatchParams(segments, m.paramsMap) : void 0
    };
  });
}
function _findAll(node, method, segments, index, matches = []) {
  const segment = segments[index];
  if (node.wildcard && node.wildcard.methods) {
    const match = node.wildcard.methods[method] || node.wildcard.methods[""];
    if (match) if (index < segments.length) pushSorted(matches, match, true);
    else {
      const optional2 = [];
      for (const m of match) {
        const pMap = m.paramsMap;
        if (pMap?.[pMap.length - 1]?.[2]) optional2.push(m);
      }
      pushSorted(matches, optional2, true);
    }
  }
  if (node.param) {
    if (index < segments.length) {
      const start = matches.length;
      _findAll(node.param, method, segments, index + 1, matches);
      if (node.param.hasRegexParam) {
        for (let r = matches.length - 1; r >= start; r--) if (matches[r].paramsRegexp[index]?.test(segment) === false) matches.splice(r, 1);
      }
    } else if (node.param.methods) {
      const match = node.param.methods[method] || node.param.methods[""];
      if (match) {
        const optional2 = [];
        for (const m of match) {
          const pMap = m.paramsMap;
          if (pMap?.[pMap.length - 1]?.[2]) optional2.push(m);
        }
        pushSorted(matches, optional2, true);
      }
    }
  }
  if (index < segments.length) {
    const staticChild = node.static?.[segment];
    if (staticChild) _findAll(staticChild, method, segments, index + 1, matches);
  }
  if (index === segments.length && node.methods) {
    const match = node.methods[method] || node.methods[""];
    if (match) pushSorted(matches, match, node.key === "*");
  }
  return matches;
}
function pushSorted(matches, match, dynamicTerminal) {
  if (match.length > 1) match = match.map((m) => {
    let w = 0;
    const { paramsRegexp: rx, paramsMap: pm } = m;
    for (let i = 0; i < rx.length; i++) if (rx[i]) w++;
    if (dynamicTerminal && pm && !pm[pm.length - 1][2]) w++;
    return [m, w];
  }).sort((a, b) => a[1] - b[1]).map((e) => e[0]);
  for (const m of match) matches.push(m);
}

// node_modules/better-call/dist/router.mjs
var createRouter$1 = (endpoints, config2) => {
  if (!config2?.openapi?.disabled) {
    const openapi = {
      path: "/api/reference",
      ...config2?.openapi
    };
    endpoints["openapi"] = createEndpoint(openapi.path, { method: "GET" }, async (c) => {
      const schema2 = await generator(endpoints);
      return new Response(getHTML(schema2, openapi.scalar), { headers: { "Content-Type": "text/html" } });
    });
  }
  const router9 = createRouter();
  const middlewareRouter = createRouter();
  for (const endpoint of Object.values(endpoints)) {
    if (!endpoint.options || !endpoint.path) continue;
    if (endpoint.options?.metadata?.SERVER_ONLY) continue;
    const methods2 = Array.isArray(endpoint.options?.method) ? endpoint.options.method : [endpoint.options?.method];
    for (const method of methods2) addRoute(router9, method, endpoint.path, endpoint);
  }
  if (config2?.routerMiddleware?.length) for (const { path: path2, middleware } of config2.routerMiddleware) addRoute(middlewareRouter, "*", path2, middleware);
  const basePath = config2?.basePath && config2.basePath !== "/" ? config2.basePath.replace(/\/+$/, "") : "";
  const processRequest = async (request) => {
    const url = new URL(request.url);
    const pathname = url.pathname;
    let path2;
    if (basePath) {
      if (!pathname.startsWith(`${basePath}/`)) return new Response(null, {
        status: 404,
        statusText: "Not Found"
      });
      path2 = pathname.slice(basePath.length);
    } else path2 = pathname;
    if (path2.length === 0 || /\/{2,}/.test(path2)) return new Response(null, {
      status: 404,
      statusText: "Not Found"
    });
    const route = findRoute(router9, request.method, path2);
    if (path2.endsWith("/") !== route?.data?.path?.endsWith("/") && !config2?.skipTrailingSlashes) return new Response(null, {
      status: 404,
      statusText: "Not Found"
    });
    if (!route?.data) return new Response(null, {
      status: 404,
      statusText: "Not Found"
    });
    const query = {};
    url.searchParams.forEach((value, key) => {
      if (key in query) {
        if (Array.isArray(query[key])) query[key].push(value);
        else query[key] = [query[key], value];
      } else query[key] = value;
    });
    const handler = route.data;
    try {
      const allowedMediaTypes = handler.options.metadata?.allowedMediaTypes || config2?.allowedMediaTypes;
      const context = {
        path: path2,
        method: request.method,
        headers: request.headers,
        params: route.params ? { ...route.params } : {},
        request,
        body: handler.options.disableBody ? void 0 : await getBody(handler.options.cloneRequest ? request.clone() : request, allowedMediaTypes),
        query,
        _flag: "router",
        asResponse: true,
        context: { ...config2?.routerContext }
      };
      const middlewareRoutes = findAllRoutes(middlewareRouter, "*", path2);
      if (middlewareRoutes?.length) for (const { data: middleware, params } of middlewareRoutes) {
        const res = await middleware({
          ...context,
          params: params ? { ...params } : {},
          asResponse: false
        });
        if (res instanceof Response) return res;
      }
      return await handler(context);
    } catch (error2) {
      if (config2?.onError) try {
        const errorResponse = await config2.onError(error2, request);
        if (errorResponse instanceof Response) return toResponse(errorResponse);
      } catch (error3) {
        if (isAPIError(error3)) return toResponse(error3);
        throw error3;
      }
      if (config2?.throwError) throw error2;
      if (isAPIError(error2)) return toResponse(error2);
      console.error(`# SERVER_ERROR: `, error2);
      return new Response(null, {
        status: 500,
        statusText: "Internal Server Error"
      });
    }
  };
  return {
    handler: async (request) => {
      const onReq = await config2?.onRequest?.(request);
      if (onReq instanceof Response) return onReq;
      const req = isRequest(onReq) ? onReq : request;
      const res = await processRequest(req);
      const onRes = await config2?.onResponse?.(res, req);
      if (onRes instanceof Response) return onRes;
      return res;
    },
    endpoints
  };
};

// node_modules/better-auth/dist/cookies/session-store.mjs
var MAX_COOKIE_SIZE = 4050;
var MAX_COOKIE_CHUNKS = 100;
function getMaxCookieValueSize(name, options) {
  const overhead = serializeCookie(name, "", { ...options }).length;
  return MAX_COOKIE_SIZE - overhead;
}
function parseCookieChunkIndex(cookieName, name) {
  const prefix = `${cookieName}.`;
  if (!name.startsWith(prefix)) return null;
  const suffix = name.slice(prefix.length);
  const index = Number(suffix);
  if (!Number.isSafeInteger(index) || index < 0 || String(index) !== suffix) return null;
  return index;
}
function readExistingChunks(cookieName, ctx) {
  const chunks = {};
  const cookies = parseCookies(ctx.headers?.get("cookie") || "");
  for (const [name, value] of cookies) {
    if (name !== cookieName && parseCookieChunkIndex(cookieName, name) === null) continue;
    chunks[name] = value;
  }
  return chunks;
}
function chunkCookie(storeName, cookie, chunks, logger2) {
  const chunkSize = getMaxCookieValueSize(`${cookie.name}.99`, cookie.attributes);
  const chunkCount = chunkSize > 0 ? Math.ceil(cookie.value.length / chunkSize) : Infinity;
  if (chunkCount <= 1) {
    chunks[cookie.name] = cookie.value;
    return [cookie];
  }
  if (chunkCount > MAX_COOKIE_CHUNKS) {
    logger2.warn(`${storeName} cookie is too large to store even after chunking, so the cookie cache was skipped. Reduce the cached data size or avoid storing this data in cookies.`);
    return [];
  }
  const cookies = [];
  for (let i = 0; i < chunkCount; i++) {
    const name = `${cookie.name}.${i}`;
    const start = i * chunkSize;
    const value = cookie.value.substring(start, start + chunkSize);
    cookies.push({
      ...cookie,
      name,
      value
    });
    chunks[name] = value;
  }
  logger2.debug(`CHUNKING_${storeName.toUpperCase()}_COOKIE`, {
    message: `${storeName} cookie exceeds the ${MAX_COOKIE_SIZE} byte limit and was split into ${chunkCount} chunks.`,
    valueSize: cookie.value.length,
    chunkCount,
    chunkSizes: cookies.map((c) => c.value.length)
  });
  return cookies;
}
function getCleanCookies(chunks, cookieOptions) {
  const cleanedChunks = {};
  for (const name in chunks) cleanedChunks[name] = {
    name,
    value: "",
    attributes: {
      ...cookieOptions,
      maxAge: 0
    }
  };
  return cleanedChunks;
}
var storeFactory = (storeName) => (cookieName, cookieOptions, ctx) => {
  const chunks = readExistingChunks(cookieName, ctx);
  const logger2 = ctx.context.logger;
  const expireExistingChunks = () => {
    const expired = getCleanCookies(chunks, cookieOptions);
    for (const name in chunks) delete chunks[name];
    return expired;
  };
  return {
    chunk(value, options) {
      const cookies = expireExistingChunks();
      const chunked = chunkCookie(storeName, {
        name: cookieName,
        value,
        attributes: {
          ...cookieOptions,
          ...options
        }
      }, chunks, logger2);
      for (const chunk of chunked) cookies[chunk.name] = chunk;
      return Object.values(cookies);
    },
    clean() {
      return Object.values(expireExistingChunks());
    },
    setCookies(cookies) {
      for (const cookie of cookies) ctx.setCookie(cookie.name, cookie.value, cookie.attributes);
    }
  };
};
var createSessionStore = storeFactory("Session");
var createAccountStore = storeFactory("Account");
function getChunkedCookie(ctx, cookieName) {
  const value = ctx.getCookie(cookieName);
  if (value) return value;
  const chunks = [];
  const cookieHeader = ctx.headers?.get("cookie");
  if (!cookieHeader) return null;
  for (const [name, val] of parseCookies(cookieHeader)) {
    const index = parseCookieChunkIndex(cookieName, name);
    if (index === null) continue;
    chunks.push({
      index,
      value: val
    });
  }
  if (chunks.length > 0) {
    chunks.sort((a, b) => a.index - b.index);
    return chunks.map((c) => c.value).join("");
  }
  return null;
}
async function setAccountCookie(c, accountData) {
  const accountDataCookie = c.context.authCookies.accountData;
  const options = {
    maxAge: 300,
    ...accountDataCookie.attributes
  };
  const data = await symmetricEncodeJWT(accountData, c.context.secretConfig, "better-auth-account", options.maxAge);
  const accountStore = createAccountStore(accountDataCookie.name, options, c);
  accountStore.setCookies(accountStore.chunk(data, options));
}
async function getAccountCookie(c) {
  const accountCookie = getChunkedCookie(c, c.context.authCookies.accountData.name);
  if (accountCookie) {
    const accountData = safeJSONParse(await symmetricDecodeJWT(accountCookie, c.context.secretConfig, "better-auth-account"));
    if (accountData) return accountData;
  }
  return null;
}
var getSessionQuerySchema = optional(object({
  /**
  * If cookie cache is enabled, it will disable the cache
  * and fetch the session from the database
  */
  disableCookieCache: coerce_exports.boolean().meta({ description: "Disable cookie cache and fetch session from database" }).optional(),
  disableRefresh: coerce_exports.boolean().meta({ description: "Disable session refresh. Useful for checking session status, without updating the session" }).optional()
}));

// node_modules/@better-auth/utils/dist/binary.mjs
var decoders = /* @__PURE__ */ new Map();
var encoder2 = new TextEncoder();
var binary = {
  decode: (data, encoding = "utf-8") => {
    if (!decoders.has(encoding)) decoders.set(encoding, new TextDecoder(encoding));
    return decoders.get(encoding).decode(data);
  },
  encode: (input) => encoder2.encode(input)
};

// node_modules/@better-auth/utils/dist/hmac.mjs
var createHMAC = (algorithm2 = "SHA-256", encoding = "none") => {
  const hmac3 = {
    importKey: async (key, keyUsage) => {
      return getWebcryptoSubtle().importKey("raw", toBufferSource(key), {
        name: "HMAC",
        hash: { name: algorithm2 }
      }, false, [keyUsage]);
    },
    sign: async (hmacKey, data) => {
      if (typeof hmacKey === "string") hmacKey = await hmac3.importKey(hmacKey, "sign");
      const signature = await getWebcryptoSubtle().sign("HMAC", hmacKey, toBufferSource(data));
      if (encoding === "hex") return hex.encode(signature);
      if (encoding === "base64") return base64.encode(signature);
      if (encoding === "base64url" || encoding === "base64urlnopad") return base64Url.encode(signature, { padding: encoding !== "base64urlnopad" });
      return signature;
    },
    verify: async (hmacKey, data, signature) => {
      if (typeof hmacKey === "string") hmacKey = await hmac3.importKey(hmacKey, "verify");
      if (encoding === "hex") signature = typeof signature === "string" ? hex.toBytes(signature) : signature;
      if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") signature = await base64.decode(signature);
      return getWebcryptoSubtle().verify("HMAC", hmacKey, toBufferSource(signature), toBufferSource(data));
    }
  };
  return hmac3;
};

// node_modules/better-auth/dist/cookies/index.mjs
function createCookieGetter(options) {
  const baseURLString = typeof options.baseURL === "string" ? options.baseURL : void 0;
  const dynamicProtocol = typeof options.baseURL === "object" && options.baseURL !== null ? options.baseURL.protocol : void 0;
  const secureCookiePrefix = (options.advanced?.useSecureCookies !== void 0 ? options.advanced?.useSecureCookies : dynamicProtocol === "https" ? true : dynamicProtocol === "http" ? false : baseURLString ? baseURLString.startsWith("https://") : isProduction) ? SECURE_COOKIE_PREFIX : "";
  const crossSubdomainEnabled = !!options.advanced?.crossSubDomainCookies?.enabled;
  const domain = crossSubdomainEnabled ? options.advanced?.crossSubDomainCookies?.domain || (baseURLString ? new URL(baseURLString).hostname : void 0) : void 0;
  if (crossSubdomainEnabled && !domain && !isDynamicBaseURLConfig(options.baseURL)) throw new BetterAuthError("baseURL is required when crossSubdomainCookies are enabled.");
  function createCookie(cookieName, overrideAttributes = {}) {
    const prefix = options.advanced?.cookiePrefix || "better-auth";
    const name = options.advanced?.cookies?.[cookieName]?.name || `${prefix}.${cookieName}`;
    const attributes = options.advanced?.cookies?.[cookieName]?.attributes ?? {};
    return {
      name: `${secureCookiePrefix}${name}`,
      attributes: {
        secure: !!secureCookiePrefix,
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        ...crossSubdomainEnabled ? { domain } : {},
        ...options.advanced?.defaultCookieAttributes,
        ...overrideAttributes,
        ...attributes
      }
    };
  }
  return createCookie;
}
function getCookies(options) {
  const createCookie = createCookieGetter(options);
  const sessionToken = createCookie("session_token", { maxAge: options.session?.expiresIn || sec("7d") });
  const sessionData = createCookie("session_data", { maxAge: options.session?.cookieCache?.maxAge || 300 });
  const accountData = createCookie("account_data", { maxAge: options.session?.cookieCache?.maxAge || 300 });
  const dontRememberToken = createCookie("dont_remember");
  return {
    sessionToken: {
      name: sessionToken.name,
      attributes: sessionToken.attributes
    },
    /**
    * This cookie is used to store the session data in the cookie
    * This is useful for when you want to cache the session in the cookie
    */
    sessionData: {
      name: sessionData.name,
      attributes: sessionData.attributes
    },
    dontRememberToken: {
      name: dontRememberToken.name,
      attributes: dontRememberToken.attributes
    },
    accountData: {
      name: accountData.name,
      attributes: accountData.attributes
    }
  };
}
async function setCookieCache(ctx, session, dontRememberMe) {
  if (!ctx.context.options.session?.cookieCache?.enabled) return;
  const filteredSession = filterOutputFields(session.session, ctx.context.options.session?.additionalFields);
  const filteredUser = parseUserOutput(ctx.context.options, session.user);
  const versionConfig = ctx.context.options.session?.cookieCache?.version;
  let version2 = "1";
  if (versionConfig) {
    if (typeof versionConfig === "string") version2 = versionConfig;
    else if (typeof versionConfig === "function") {
      const result = versionConfig(session.session, session.user);
      version2 = isPromise(result) ? await result : result;
    }
  }
  const sessionData = {
    session: filteredSession,
    user: filteredUser,
    updatedAt: Date.now(),
    version: version2
  };
  const options = {
    ...ctx.context.authCookies.sessionData.attributes,
    maxAge: dontRememberMe ? void 0 : ctx.context.authCookies.sessionData.attributes.maxAge
  };
  const expiresAtDate = getDate(options.maxAge || 60, "sec").getTime();
  const strategy = ctx.context.options.session?.cookieCache?.strategy || "compact";
  let data;
  if (strategy === "jwe") data = await symmetricEncodeJWT(sessionData, ctx.context.secretConfig, "better-auth-session", options.maxAge || 300);
  else if (strategy === "jwt") {
    const cookieCacheSigner = ctx.context.sessionConfig.cookieCacheSigner;
    data = cookieCacheSigner ? await cookieCacheSigner.sign(ctx, sessionData, options.maxAge || 300) : await signJWT(sessionData, ctx.context.secret, options.maxAge || 300);
  } else data = base64Url.encode(JSON.stringify({
    session: sessionData,
    expiresAt: expiresAtDate,
    signature: await createHMAC("SHA-256", "base64urlnopad").sign(ctx.context.secret, JSON.stringify({
      ...sessionData,
      expiresAt: expiresAtDate
    }))
  }), { padding: false });
  const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, options, ctx);
  sessionStore.setCookies(sessionStore.chunk(data, options));
  if (ctx.context.options.account?.storeAccountCookie && !hasPendingSetCookie(ctx, ctx.context.authCookies.accountData.name)) {
    const accountData = await getAccountCookie(ctx);
    if (accountData) {
      if (!shouldBindAccountCookieToSessionUser(ctx.context.options) || accountData.userId === session.user.id) await setAccountCookie(ctx, accountData);
      else {
        expireCookie(ctx, ctx.context.authCookies.accountData);
        const accountStore = createAccountStore(ctx.context.authCookies.accountData.name, ctx.context.authCookies.accountData.attributes, ctx);
        accountStore.setCookies(accountStore.clean());
      }
    }
  }
}
async function decodeCookieCache(ctx, value) {
  const strategy = ctx.context.options.session?.cookieCache?.strategy || "compact";
  if (strategy === "jwe") {
    const decoded = await symmetricDecodeJWT(value, ctx.context.secretConfig, "better-auth-session");
    const payload2 = parseCookieCachePayload(decoded);
    if (!payload2) return null;
    return {
      session: payload2,
      expiresAt: decoded?.exp ? decoded.exp * 1e3 : Date.now()
    };
  }
  if (strategy === "jwt") {
    const cookieCacheSigner = ctx.context.sessionConfig.cookieCacheSigner;
    if (cookieCacheSigner) {
      const verified = await cookieCacheSigner.verify(ctx, value);
      if (!verified) return null;
      return {
        session: verified.payload,
        expiresAt: verified.expiresAt
      };
    }
    const decoded = await verifyJWT(value, ctx.context.secret);
    const payload2 = parseCookieCachePayload(decoded);
    if (!payload2) return null;
    return {
      session: payload2,
      expiresAt: decoded?.exp ? decoded.exp * 1e3 : Date.now()
    };
  }
  const parsed = parseCompactCookieCache(safeJSONParse(binary.decode(base64Url.decode(value))));
  if (!parsed) return null;
  if (!await createHMAC("SHA-256", "base64urlnopad").verify(ctx.context.secret, JSON.stringify({
    ...parsed.session,
    expiresAt: parsed.expiresAt
  }), parsed.signature)) return null;
  const payload = parseCookieCachePayload(parsed.session);
  return payload ? {
    session: payload,
    expiresAt: parsed.expiresAt
  } : null;
}
async function setSessionCookie(ctx, session, dontRememberMe, overrides) {
  const dontRememberMeCookie = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
  dontRememberMe = dontRememberMe !== void 0 ? dontRememberMe : !!dontRememberMeCookie;
  const options = ctx.context.authCookies.sessionToken.attributes;
  const maxAge = dontRememberMe ? void 0 : ctx.context.sessionConfig.expiresIn;
  await ctx.setSignedCookie(ctx.context.authCookies.sessionToken.name, session.session.token, ctx.context.secret, {
    ...options,
    maxAge,
    ...overrides
  });
  if (dontRememberMe) await ctx.setSignedCookie(ctx.context.authCookies.dontRememberToken.name, "true", ctx.context.secret, ctx.context.authCookies.dontRememberToken.attributes);
  else if (dontRememberMeCookie) expireCookie(ctx, ctx.context.authCookies.dontRememberToken);
  await setCookieCache(ctx, session, dontRememberMe);
  ctx.context.setNewSession(session);
}
function removeSetCookieEntries(ctx, cookieName) {
  const scoped = ctx;
  const targets = /* @__PURE__ */ new Set();
  if (scoped.responseHeaders) targets.add(scoped.responseHeaders);
  if (scoped.context?.responseHeaders) targets.add(scoped.context.responseHeaders);
  const exact = `${cookieName}=`;
  const chunk = `${cookieName}.`;
  for (const headers of targets) {
    const existing = typeof headers.getSetCookie === "function" ? headers.getSetCookie() : splitSetCookieHeader(headers.get("set-cookie") || "");
    if (!existing.length) continue;
    const survivors = existing.filter((entry) => !entry.startsWith(exact) && !entry.startsWith(chunk));
    if (survivors.length === existing.length) continue;
    headers.delete("set-cookie");
    for (const entry of survivors) headers.append("set-cookie", entry);
  }
}
function hasPendingSetCookie(ctx, cookieName) {
  const scoped = ctx;
  const targets = /* @__PURE__ */ new Set();
  if (scoped.responseHeaders) targets.add(scoped.responseHeaders);
  if (scoped.context?.responseHeaders) targets.add(scoped.context.responseHeaders);
  const exact = `${cookieName}=`;
  const chunk = `${cookieName}.`;
  for (const headers of targets) if ((typeof headers.getSetCookie === "function" ? headers.getSetCookie() : splitSetCookieHeader(headers.get("set-cookie") || "")).some((entry) => entry.startsWith(exact) || entry.startsWith(chunk))) return true;
  return false;
}
function expireCookie(ctx, cookie) {
  removeSetCookieEntries(ctx, cookie.name);
  ctx.setCookie(cookie.name, "", {
    ...cookie.attributes,
    maxAge: 0
  });
}
function deleteSessionCookie(ctx, skipDontRememberMe) {
  expireCookie(ctx, ctx.context.authCookies.sessionToken);
  expireCookie(ctx, ctx.context.authCookies.sessionData);
  if (ctx.context.options.account?.storeAccountCookie) {
    expireCookie(ctx, ctx.context.authCookies.accountData);
    const accountStore = createAccountStore(ctx.context.authCookies.accountData.name, ctx.context.authCookies.accountData.attributes, ctx);
    const cleanCookies2 = accountStore.clean();
    accountStore.setCookies(cleanCookies2);
  }
  if (ctx.context.oauthConfig.storeStateStrategy === "cookie") expireCookie(ctx, ctx.context.createAuthCookie("oauth_state"));
  const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, ctx.context.authCookies.sessionData.attributes, ctx);
  const cleanCookies = sessionStore.clean();
  sessionStore.setCookies(cleanCookies);
  if (!skipDontRememberMe) expireCookie(ctx, ctx.context.authCookies.dontRememberToken);
}

// node_modules/@better-auth/utils/dist/password.node.mjs
import { randomBytes, scrypt } from "crypto";
var config = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64
};
function generateKey(password, salt2) {
  return new Promise((resolve, reject) => {
    scrypt(password.normalize("NFKC"), salt2, config.dkLen, {
      N: config.N,
      r: config.r,
      p: config.p,
      maxmem: 128 * config.N * config.r * 2
    }, (err, key) => {
      if (err) reject(err);
      else resolve(key);
    });
  });
}
async function hashPassword(password) {
  const salt2 = randomBytes(16).toString("hex");
  return `${salt2}:${(await generateKey(password, salt2)).toString("hex")}`;
}
async function verifyPassword(hash, password) {
  const [salt2, key] = hash.split(":");
  if (!salt2 || !key) throw new Error("Invalid password hash");
  return (await generateKey(password, salt2)).toString("hex") === key;
}

// node_modules/better-auth/dist/crypto/password.mjs
var hashPassword$1 = hashPassword;
var verifyPassword$1 = async ({ hash, password }) => {
  return verifyPassword(hash, password);
};

// node_modules/@better-auth/utils/dist/hash.mjs
function createHash(algorithm2, encoding) {
  return { digest: async (input) => {
    const data = toBufferSource(input);
    const hashBuffer = await getWebcryptoSubtle().digest(algorithm2, data);
    if (encoding === "hex") return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
    if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") {
      if (encoding.includes("url")) return base64Url.encode(hashBuffer, { padding: encoding !== "base64urlnopad" });
      return base64.encode(hashBuffer);
    }
    return hashBuffer;
  } };
}

// node_modules/@noble/ciphers/utils.js
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in a && a.BYTES_PER_ELEMENT === 1;
}
var atitle = (title) => title ? `"${title}" ` : "";
function abool(value, title = "") {
  if (typeof value !== "boolean")
    throw new TypeError(atitle(title) + "expected boolean, got type=" + typeof value);
  return value;
}
function anumber2(n, title = "") {
  if (typeof n !== "number")
    throw new TypeError(atitle(title) + "expected number, got " + typeof n);
  if (!Number.isSafeInteger(n) || n < 0)
    throw new RangeError(atitle(title) + "expected integer >= 0, got " + n);
  return n;
}
function abytes2(value, length, title = "") {
  if (isBytes(value) && (length === void 0 || value.length === length))
    return value;
  if (length !== void 0)
    anumber2(length, "length");
  const bytes = isBytes(value);
  const ofLen = length !== void 0 ? ` of length ${length}` : "";
  const got = bytes ? `length=${value.length}` : `type=${typeof value}`;
  const message2 = atitle(title) + "expected Uint8Array" + ofLen + ", got " + got;
  if (!bytes)
    throw new TypeError(message2);
  throw new RangeError(message2);
}
var aobject = (value, label) => {
  if (value === null || typeof value !== "object" || Array.isArray(value))
    throw new TypeError(label === "object" ? "expected valid options object" : `"${label}" expected object, got type=${typeof value}`);
};
function aexists2(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("hash was destroyed");
  if (checkFinished && instance.finished)
    throw new Error("digest() was already called");
}
function aoutput2(out, instance) {
  abytes2(out, void 0, "output");
  const min = instance.outputLen;
  if (!(out.length >= min)) {
    throw new RangeError('"output" expected length >= ' + min);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean2(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView2(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
var isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = byteSwap(arr[i]);
  }
  return arr;
}
var swap32IfBE = isLE ? (u) => u : byteSwap32;
var hasHexBuiltin = /* @__PURE__ */ (() => (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
))();
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex2(bytes) {
  abytes2(bytes);
  if (hasHexBuiltin)
    return bytes.toHex();
  let hex2 = "";
  for (let i = 0; i < bytes.length; i++) {
    hex2 += hexes[bytes[i]];
  }
  return hex2;
}
function asciiToBase16(ch) {
  return ch >= 48 && ch <= 57 ? ch - 48 : ch >= 65 && ch <= 70 ? ch - (65 - 10) : ch >= 97 && ch <= 102 ? ch - (97 - 10) : void 0;
}
function hexToBytes(hex2) {
  if (typeof hex2 !== "string")
    throw new TypeError("hex string expected, got " + typeof hex2);
  if (hasHexBuiltin) {
    try {
      return Uint8Array.fromHex(hex2);
    } catch (error2) {
      if (error2 instanceof SyntaxError)
        throw new RangeError(error2.message);
      throw error2;
    }
  }
  const hl = hex2.length;
  const al = hl / 2;
  if (hl % 2)
    throw new RangeError("hex string expected, got unpadded hex of length " + hl);
  const array2 = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex2.charCodeAt(hi));
    const n2 = asciiToBase16(hex2.charCodeAt(hi + 1));
    if (n1 === void 0 || n2 === void 0) {
      const char = hex2[hi] + hex2[hi + 1];
      throw new RangeError('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array2[ai] = n1 * 16 + n2;
  }
  return array2;
}
function utf8ToBytes2(str) {
  if (typeof str !== "string")
    throw new TypeError("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function overlapBytes(a, b) {
  if (!a.byteLength || !b.byteLength)
    return false;
  return a.buffer === b.buffer && // best we can do, may fail with an obscure Proxy
  a.byteOffset < b.byteOffset + b.byteLength && // a starts before b end
  b.byteOffset < a.byteOffset + a.byteLength;
}
function complexOverlapBytes(input, output) {
  if (overlapBytes(input, output) && input.byteOffset < output.byteOffset)
    throw new Error("complex overlap of input and output is not supported");
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    abytes2(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad);
    pad += a.length;
  }
  return res;
}
function checkOpts(defaults, opts) {
  aobject(defaults, "defaults");
  aobject(opts, "opts");
  const merged = Object.assign(defaults, opts);
  return merged;
}
function equalBytes(a, b) {
  a = abytes2(a);
  b = abytes2(b);
  if (a.length !== b.length)
    return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++)
    diff |= a[i] ^ b[i];
  return diff === 0;
}
function wrapMacConstructor(keyLen, macCons, fromMsg) {
  const mac = macCons;
  const getArgs = fromMsg || (() => []);
  const macC = (msg, key) => mac(key, ...getArgs(msg)).update(msg).digest();
  const tmp = mac(new Uint8Array(keyLen), ...getArgs(new Uint8Array(0)));
  macC.outputLen = tmp.outputLen;
  macC.blockLen = tmp.blockLen;
  macC.create = (key, ...args) => mac(key, ...args);
  return macC;
}
var wrapCipher = /* @__NO_SIDE_EFFECTS__ */ (params, constructor) => {
  function wrappedCipher(key, ...args) {
    abytes2(key, void 0, "key");
    if (params.nonceLength !== void 0) {
      const nonce = args[0];
      abytes2(nonce, params.varSizeNonce ? void 0 : params.nonceLength, "nonce");
    }
    const tagl = params.tagLength;
    const aadStart = params.nonceLength !== void 0 ? 1 : 0;
    if (!params.withAAD) {
      for (let i = aadStart; i < args.length; i++)
        if (isBytes(args[i]))
          throw new Error("AAD not supported");
    }
    if (params.withAAD && args[aadStart] !== void 0)
      abytes2(args[aadStart], void 0, "AAD");
    const cipher = constructor(key, ...args);
    const checkOutput = (fnLength, output) => {
      if (output !== void 0) {
        if (fnLength !== 2)
          throw new Error("cipher output not supported");
        abytes2(output, void 0, "output");
      }
    };
    let called = false;
    const wrCipher = {
      encrypt(data, output) {
        if (called)
          throw new Error("cannot encrypt() twice with same key + nonce");
        called = true;
        abytes2(data, void 0, "data");
        checkOutput(cipher.encrypt.length, output);
        return cipher.encrypt(data, output);
      },
      decrypt(data, output) {
        abytes2(data, void 0, "data");
        if (tagl && data.length < tagl)
          throw new Error('"ciphertext" expected length >= tagLength=' + tagl);
        checkOutput(cipher.decrypt.length, output);
        return cipher.decrypt(data, output);
      }
    };
    return wrCipher;
  }
  Object.assign(wrappedCipher, params);
  return wrappedCipher;
};
function getOutput(expectedLength, out, onlyAligned = true) {
  if (out === void 0)
    return new Uint8Array(expectedLength);
  abytes2(out, expectedLength, "output");
  if (onlyAligned && !isAligned32(out))
    throw new Error("invalid output, must be aligned");
  return out;
}
function u64Lengths(dataLength, aadLength, isLE2) {
  anumber2(dataLength);
  anumber2(aadLength);
  abool(isLE2);
  const num = new Uint8Array(16);
  const view = createView2(num);
  view.setBigUint64(0, BigInt(aadLength), isLE2);
  view.setBigUint64(8, BigInt(dataLength), isLE2);
  return num;
}
function isAligned32(bytes) {
  return bytes.byteOffset % 4 === 0;
}
function copyBytes(bytes) {
  return Uint8Array.from(abytes2(bytes));
}
function randomBytes2(bytesLength = 32) {
  anumber2(bytesLength, "bytesLength");
  const cr = typeof globalThis === "object" ? globalThis.crypto : null;
  if (typeof cr?.getRandomValues !== "function")
    throw new Error("crypto.getRandomValues must be defined");
  if (bytesLength > 65536)
    throw new RangeError(`"bytesLength" expected <= 65536, got ${bytesLength}`);
  return cr.getRandomValues(new Uint8Array(bytesLength));
}
function managedNonce(fn, randomBytes_ = randomBytes2) {
  if (typeof fn !== "function")
    throw new TypeError('"fn" expected cipher constructor, got type=' + typeof fn);
  if (typeof randomBytes_ !== "function")
    throw new TypeError('"randomBytes_" expected function, got type=' + typeof randomBytes_);
  const { nonceLength } = fn;
  anumber2(nonceLength, "fn.nonceLength");
  const addNonce = (nonce, ciphertext, plaintext) => {
    const out = concatBytes(nonce, ciphertext);
    if (!overlapBytes(plaintext, ciphertext))
      ciphertext.fill(0);
    return out;
  };
  const res = ((key, ...args) => ({
    encrypt(plaintext) {
      abytes2(plaintext, void 0, "data");
      const nonce = randomBytes_(nonceLength);
      const encrypted = fn(key, nonce, ...args).encrypt(plaintext);
      if (encrypted instanceof Promise)
        return encrypted.then((ct) => addNonce(nonce, ct, plaintext));
      return addNonce(nonce, encrypted, plaintext);
    },
    decrypt(ciphertext) {
      abytes2(ciphertext, void 0, "data");
      const nonce = ciphertext.subarray(0, nonceLength);
      const decrypted = ciphertext.subarray(nonceLength);
      return fn(key, nonce, ...args).decrypt(decrypted);
    }
  }));
  if ("blockSize" in fn)
    res.blockSize = fn.blockSize;
  if ("tagLength" in fn)
    res.tagLength = fn.tagLength;
  if ("withAAD" in fn)
    res.withAAD = fn.withAAD;
  return res;
}

// node_modules/@noble/ciphers/_arx.js
var encodeStr = (str) => Uint8Array.from(str.split(""), (c) => c.charCodeAt(0));
var sigma16_32 = /* @__PURE__ */ (() => swap32IfBE(u32(encodeStr("expand 16-byte k"))))();
var sigma32_32 = /* @__PURE__ */ (() => swap32IfBE(u32(encodeStr("expand 32-byte k"))))();
function rotl(a, b) {
  return a << b | a >>> 32 - b;
}
var BLOCK_LEN = 64;
var BLOCK_LEN32 = 16;
var MAX_COUNTER = /* @__PURE__ */ (() => 2 ** 32 - 1)();
var U32_EMPTY = /* @__PURE__ */ Uint32Array.of();
function runCipher(core, sigma, key, nonce, data, output, counter, rounds) {
  const len = data.length;
  const block = new Uint8Array(BLOCK_LEN);
  const b32 = u32(block);
  const isAligned = isLE && isAligned32(data) && isAligned32(output);
  const d32 = isAligned ? u32(data) : U32_EMPTY;
  const o32 = isAligned ? u32(output) : U32_EMPTY;
  if (!isLE) {
    for (let pos = 0; pos < len; counter++) {
      core(sigma, key, nonce, b32, counter, rounds);
      swap32IfBE(b32);
      if (counter >= MAX_COUNTER)
        throw new Error("arx: counter overflow");
      const take = Math.min(BLOCK_LEN, len - pos);
      for (let j = 0, posj; j < take; j++) {
        posj = pos + j;
        output[posj] = data[posj] ^ block[j];
      }
      pos += take;
    }
    return;
  }
  for (let pos = 0; pos < len; counter++) {
    core(sigma, key, nonce, b32, counter, rounds);
    if (counter >= MAX_COUNTER)
      throw new Error("arx: counter overflow");
    const take = Math.min(BLOCK_LEN, len - pos);
    if (isAligned && take === BLOCK_LEN) {
      const pos32 = pos / 4;
      if (pos % 4 !== 0)
        throw new Error("arx: invalid block position");
      for (let j = 0, posj; j < BLOCK_LEN32; j++) {
        posj = pos32 + j;
        o32[posj] = d32[posj] ^ b32[j];
      }
      pos += BLOCK_LEN;
      continue;
    }
    for (let j = 0, posj; j < take; j++) {
      posj = pos + j;
      output[posj] = data[posj] ^ block[j];
    }
    pos += take;
  }
}
function createCipher(core, opts) {
  const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = checkOpts({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, opts);
  if (typeof core !== "function")
    throw new Error("core must be a function");
  anumber2(counterLength);
  anumber2(rounds);
  abool(counterRight);
  abool(allowShortKeys);
  return (key, nonce, data, output, counter = 0) => {
    abytes2(key, void 0, "key");
    abytes2(nonce, void 0, "nonce");
    abytes2(data, void 0, "data");
    const len = data.length;
    const hasOutput = output !== void 0;
    output = getOutput(len, output, false);
    if (hasOutput)
      complexOverlapBytes(data, output);
    anumber2(counter);
    if (counter < 0 || counter >= MAX_COUNTER)
      throw new Error("arx: counter overflow");
    const toClean = [];
    let l = key.length;
    let k;
    let sigma;
    if (l === 32) {
      toClean.push(k = copyBytes(key));
      sigma = sigma32_32;
    } else if (l === 16 && allowShortKeys) {
      k = new Uint8Array(32);
      k.set(key);
      k.set(key, 16);
      sigma = sigma16_32;
      toClean.push(k);
    } else {
      abytes2(key, 32, "arx key");
      throw new Error("invalid key size");
    }
    if (!isLE || !isAligned32(nonce))
      toClean.push(nonce = copyBytes(nonce));
    let k32 = u32(k);
    if (extendNonceFn) {
      if (nonce.length !== 24)
        throw new Error("arx: extended nonce must be 24 bytes");
      const n16 = nonce.subarray(0, 16);
      if (isLE)
        extendNonceFn(sigma, k32, u32(n16), k32);
      else {
        const sigmaRaw = swap32IfBE(Uint32Array.from(sigma));
        extendNonceFn(sigmaRaw, k32, u32(n16), k32);
        clean2(sigmaRaw);
        swap32IfBE(k32);
      }
      nonce = nonce.subarray(16);
    } else if (!isLE)
      swap32IfBE(k32);
    const nonceNcLen = 16 - counterLength;
    if (nonceNcLen !== nonce.length)
      throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
    if (nonceNcLen !== 12) {
      const nc = new Uint8Array(12);
      nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
      nonce = nc;
      toClean.push(nonce);
    }
    const n32 = swap32IfBE(u32(nonce));
    try {
      runCipher(core, sigma, k32, n32, data, output, counter, rounds);
      return output;
    } finally {
      clean2(...toClean);
    }
  };
}

// node_modules/@noble/ciphers/_poly1305.js
function u8to16(a, i) {
  return a[i++] & 255 | (a[i++] & 255) << 8;
}
var Poly1305 = class {
  blockLen = 16;
  outputLen = 16;
  buffer = new Uint8Array(16);
  r = new Uint16Array(10);
  // Allocating 1 array with .subarray() here is slower than 3
  h = new Uint16Array(10);
  pad = new Uint16Array(8);
  pos = 0;
  finished = false;
  destroyed = false;
  // Can be speed-up using BigUint64Array, at the cost of complexity
  constructor(key) {
    key = copyBytes(abytes2(key, 32, "key"));
    const t0 = u8to16(key, 0);
    const t1 = u8to16(key, 2);
    const t2 = u8to16(key, 4);
    const t3 = u8to16(key, 6);
    const t4 = u8to16(key, 8);
    const t5 = u8to16(key, 10);
    const t6 = u8to16(key, 12);
    const t7 = u8to16(key, 14);
    this.r[0] = t0 & 8191;
    this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
    this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
    this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
    this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
    this.r[5] = t4 >>> 1 & 8190;
    this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
    this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
    this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
    this.r[9] = t7 >>> 5 & 127;
    for (let i = 0; i < 8; i++)
      this.pad[i] = u8to16(key, 16 + 2 * i);
  }
  process(data, offset, isLast = false) {
    const hibit = isLast ? 0 : 1 << 11;
    const { h, r } = this;
    const r0 = r[0];
    const r1 = r[1];
    const r2 = r[2];
    const r3 = r[3];
    const r4 = r[4];
    const r5 = r[5];
    const r6 = r[6];
    const r7 = r[7];
    const r8 = r[8];
    const r9 = r[9];
    const t0 = u8to16(data, offset + 0);
    const t1 = u8to16(data, offset + 2);
    const t2 = u8to16(data, offset + 4);
    const t3 = u8to16(data, offset + 6);
    const t4 = u8to16(data, offset + 8);
    const t5 = u8to16(data, offset + 10);
    const t6 = u8to16(data, offset + 12);
    const t7 = u8to16(data, offset + 14);
    let h0 = h[0] + (t0 & 8191);
    let h1 = h[1] + ((t0 >>> 13 | t1 << 3) & 8191);
    let h2 = h[2] + ((t1 >>> 10 | t2 << 6) & 8191);
    let h3 = h[3] + ((t2 >>> 7 | t3 << 9) & 8191);
    let h4 = h[4] + ((t3 >>> 4 | t4 << 12) & 8191);
    let h5 = h[5] + (t4 >>> 1 & 8191);
    let h6 = h[6] + ((t4 >>> 14 | t5 << 2) & 8191);
    let h7 = h[7] + ((t5 >>> 11 | t6 << 5) & 8191);
    let h8 = h[8] + ((t6 >>> 8 | t7 << 8) & 8191);
    let h9 = h[9] + (t7 >>> 5 | hibit);
    let c = 0;
    let d0 = c + h0 * r0 + h1 * (5 * r9) + h2 * (5 * r8) + h3 * (5 * r7) + h4 * (5 * r6);
    c = d0 >>> 13;
    d0 &= 8191;
    d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r3) + h8 * (5 * r2) + h9 * (5 * r1);
    c += d0 >>> 13;
    d0 &= 8191;
    let d1 = c + h0 * r1 + h1 * r0 + h2 * (5 * r9) + h3 * (5 * r8) + h4 * (5 * r7);
    c = d1 >>> 13;
    d1 &= 8191;
    d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r3) + h9 * (5 * r2);
    c += d1 >>> 13;
    d1 &= 8191;
    let d2 = c + h0 * r2 + h1 * r1 + h2 * r0 + h3 * (5 * r9) + h4 * (5 * r8);
    c = d2 >>> 13;
    d2 &= 8191;
    d2 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r3);
    c += d2 >>> 13;
    d2 &= 8191;
    let d3 = c + h0 * r3 + h1 * r2 + h2 * r1 + h3 * r0 + h4 * (5 * r9);
    c = d3 >>> 13;
    d3 &= 8191;
    d3 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
    c += d3 >>> 13;
    d3 &= 8191;
    let d4 = c + h0 * r4 + h1 * r3 + h2 * r2 + h3 * r1 + h4 * r0;
    c = d4 >>> 13;
    d4 &= 8191;
    d4 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
    c += d4 >>> 13;
    d4 &= 8191;
    let d5 = c + h0 * r5 + h1 * r4 + h2 * r3 + h3 * r2 + h4 * r1;
    c = d5 >>> 13;
    d5 &= 8191;
    d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
    c += d5 >>> 13;
    d5 &= 8191;
    let d6 = c + h0 * r6 + h1 * r5 + h2 * r4 + h3 * r3 + h4 * r2;
    c = d6 >>> 13;
    d6 &= 8191;
    d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
    c += d6 >>> 13;
    d6 &= 8191;
    let d7 = c + h0 * r7 + h1 * r6 + h2 * r5 + h3 * r4 + h4 * r3;
    c = d7 >>> 13;
    d7 &= 8191;
    d7 += h5 * r2 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
    c += d7 >>> 13;
    d7 &= 8191;
    let d8 = c + h0 * r8 + h1 * r7 + h2 * r6 + h3 * r5 + h4 * r4;
    c = d8 >>> 13;
    d8 &= 8191;
    d8 += h5 * r3 + h6 * r2 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
    c += d8 >>> 13;
    d8 &= 8191;
    let d9 = c + h0 * r9 + h1 * r8 + h2 * r7 + h3 * r6 + h4 * r5;
    c = d9 >>> 13;
    d9 &= 8191;
    d9 += h5 * r4 + h6 * r3 + h7 * r2 + h8 * r1 + h9 * r0;
    c += d9 >>> 13;
    d9 &= 8191;
    c = (c << 2) + c | 0;
    c = c + d0 | 0;
    d0 = c & 8191;
    c = c >>> 13;
    d1 += c;
    h[0] = d0;
    h[1] = d1;
    h[2] = d2;
    h[3] = d3;
    h[4] = d4;
    h[5] = d5;
    h[6] = d6;
    h[7] = d7;
    h[8] = d8;
    h[9] = d9;
  }
  finalize() {
    const { h, pad } = this;
    const g = new Uint16Array(10);
    let c = h[1] >>> 13;
    h[1] &= 8191;
    for (let i = 2; i < 10; i++) {
      h[i] += c;
      c = h[i] >>> 13;
      h[i] &= 8191;
    }
    h[0] += c * 5;
    c = h[0] >>> 13;
    h[0] &= 8191;
    h[1] += c;
    c = h[1] >>> 13;
    h[1] &= 8191;
    h[2] += c;
    g[0] = h[0] + 5;
    c = g[0] >>> 13;
    g[0] &= 8191;
    for (let i = 1; i < 10; i++) {
      g[i] = h[i] + c;
      c = g[i] >>> 13;
      g[i] &= 8191;
    }
    g[9] -= 1 << 13;
    let mask = (c ^ 1) - 1;
    for (let i = 0; i < 10; i++)
      g[i] &= mask;
    mask = ~mask;
    for (let i = 0; i < 10; i++)
      h[i] = h[i] & mask | g[i];
    h[0] = (h[0] | h[1] << 13) & 65535;
    h[1] = (h[1] >>> 3 | h[2] << 10) & 65535;
    h[2] = (h[2] >>> 6 | h[3] << 7) & 65535;
    h[3] = (h[3] >>> 9 | h[4] << 4) & 65535;
    h[4] = (h[4] >>> 12 | h[5] << 1 | h[6] << 14) & 65535;
    h[5] = (h[6] >>> 2 | h[7] << 11) & 65535;
    h[6] = (h[7] >>> 5 | h[8] << 8) & 65535;
    h[7] = (h[8] >>> 8 | h[9] << 5) & 65535;
    let f = h[0] + pad[0];
    h[0] = f & 65535;
    for (let i = 1; i < 8; i++) {
      f = (h[i] + pad[i] | 0) + (f >>> 16) | 0;
      h[i] = f & 65535;
    }
    clean2(g);
  }
  update(data) {
    aexists2(this);
    abytes2(data);
    data = copyBytes(data);
    const { buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(data, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(buffer, 0, false);
        this.pos = 0;
      }
    }
    return this;
  }
  destroy() {
    this.destroyed = true;
    clean2(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(out) {
    aexists2(this);
    aoutput2(out, this);
    this.finished = true;
    const { buffer, h } = this;
    let { pos } = this;
    if (pos) {
      buffer[pos++] = 1;
      for (; pos < 16; pos++)
        buffer[pos] = 0;
      this.process(buffer, 0, true);
    }
    this.finalize();
    let opos = 0;
    for (let i = 0; i < 8; i++) {
      out[opos++] = h[i] >>> 0;
      out[opos++] = h[i] >>> 8;
    }
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
};
var poly1305 = /* @__PURE__ */ wrapMacConstructor(32, (key) => new Poly1305(key));

// node_modules/@noble/ciphers/chacha.js
function chachaCore(s, k, n, out, cnt, rounds = 20) {
  let y00 = s[0], y01 = s[1], y02 = s[2], y03 = s[3], y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3], y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7], y12 = cnt, y13 = n[0], y14 = n[1], y15 = n[2];
  let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
  for (let r = 0; r < rounds; r += 2) {
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 16);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 12);
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 8);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 7);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 16);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 12);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 8);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 7);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 16);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 12);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 8);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 7);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 16);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 12);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 8);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 7);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 16);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 12);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 8);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 7);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 16);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 12);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 8);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 7);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 16);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 12);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 8);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 7);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 16);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 12);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 8);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 7);
  }
  let oi = 0;
  out[oi++] = y00 + x00 | 0;
  out[oi++] = y01 + x01 | 0;
  out[oi++] = y02 + x02 | 0;
  out[oi++] = y03 + x03 | 0;
  out[oi++] = y04 + x04 | 0;
  out[oi++] = y05 + x05 | 0;
  out[oi++] = y06 + x06 | 0;
  out[oi++] = y07 + x07 | 0;
  out[oi++] = y08 + x08 | 0;
  out[oi++] = y09 + x09 | 0;
  out[oi++] = y10 + x10 | 0;
  out[oi++] = y11 + x11 | 0;
  out[oi++] = y12 + x12 | 0;
  out[oi++] = y13 + x13 | 0;
  out[oi++] = y14 + x14 | 0;
  out[oi++] = y15 + x15 | 0;
}
function hchacha(s, k, i, out) {
  const s2 = isLE ? s : swap32IfBE(s.slice(0, 4));
  const k2 = isLE ? k : swap32IfBE(k.slice(0, 8));
  const i2 = isLE ? i : swap32IfBE(i.slice(0, 4));
  const t = new Uint32Array(16);
  chachaCore(s2, k2, i2.subarray(1), t, i2[0]);
  let oi = 0;
  out[oi++] = t[0] - s2[0] | 0;
  out[oi++] = t[1] - s2[1] | 0;
  out[oi++] = t[2] - s2[2] | 0;
  out[oi++] = t[3] - s2[3] | 0;
  out[oi++] = t[12] - i2[0] | 0;
  out[oi++] = t[13] - i2[1] | 0;
  out[oi++] = t[14] - i2[2] | 0;
  out[oi++] = t[15] - i2[3] | 0;
  swap32IfBE(out);
  if (!isLE)
    clean2(s2, k2, i2);
  clean2(t);
}
var xchacha20 = /* @__PURE__ */ createCipher(chachaCore, {
  counterRight: false,
  counterLength: 8,
  extendNonceFn: hchacha,
  allowShortKeys: false
});
var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
var updatePadded = (h, msg) => {
  h.update(msg);
  const leftover = msg.length % 16;
  if (leftover)
    h.update(ZEROS16.subarray(leftover));
};
var ZEROS32 = /* @__PURE__ */ new Uint8Array(32);
function computeTag(fn, key, nonce, ciphertext, AAD) {
  if (AAD !== void 0)
    abytes2(AAD, void 0, "AAD");
  const authKey = fn(key, nonce, ZEROS32);
  const lengths = u64Lengths(ciphertext.length, AAD ? AAD.length : 0, true);
  const h = poly1305.create(authKey);
  if (AAD)
    updatePadded(h, AAD);
  updatePadded(h, ciphertext);
  h.update(lengths);
  const res = h.digest();
  clean2(authKey, lengths);
  return res;
}
var _poly1305_aead = (xorStream) => (key, nonce, AAD) => {
  const tagLength = 16;
  return {
    encrypt(plaintext, output) {
      const plength = plaintext.length;
      output = getOutput(plength + tagLength, output, false);
      output.set(plaintext);
      const oPlain = output.subarray(0, -tagLength);
      xorStream(key, nonce, oPlain, oPlain, 1);
      const tag2 = computeTag(xorStream, key, nonce, oPlain, AAD);
      output.set(tag2, plength);
      clean2(tag2);
      return output;
    },
    decrypt(ciphertext, output) {
      output = getOutput(ciphertext.length - tagLength, output, false);
      const data = ciphertext.subarray(0, -tagLength);
      const passedTag = ciphertext.subarray(-tagLength);
      const tag2 = computeTag(xorStream, key, nonce, data, AAD);
      if (!equalBytes(passedTag, tag2)) {
        clean2(tag2);
        throw new Error("invalid tag");
      }
      output.set(ciphertext.subarray(0, -tagLength));
      xorStream(key, nonce, output, output, 1);
      clean2(tag2);
      return output;
    }
  };
};
var xchacha20poly1305 = /* @__PURE__ */ wrapCipher(
  { blockSize: 64, nonceLength: 24, tagLength: 16, withAAD: true },
  /* @__PURE__ */ _poly1305_aead(xchacha20)
);

// node_modules/better-auth/dist/crypto/index.mjs
var ENVELOPE_PREFIX = "$ba$";
function parseEnvelope(data) {
  if (!data.startsWith(ENVELOPE_PREFIX)) return null;
  const firstSep = 4;
  const secondSep = data.indexOf("$", firstSep);
  if (secondSep === -1) return null;
  const version2 = parseInt(data.slice(firstSep, secondSep), 10);
  if (!Number.isInteger(version2) || version2 < 0) return null;
  return {
    version: version2,
    ciphertext: data.slice(secondSep + 1)
  };
}
function formatEnvelope(version2, ciphertext) {
  return `${ENVELOPE_PREFIX}${version2}$${ciphertext}`;
}
async function rawEncrypt(secret, data) {
  const keyAsBytes = await createHash("SHA-256").digest(secret);
  const dataAsBytes = utf8ToBytes2(data);
  const chacha = managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes));
  return bytesToHex2(chacha.encrypt(dataAsBytes));
}
async function rawDecrypt(secret, hex2) {
  const keyAsBytes = await createHash("SHA-256").digest(secret);
  const dataAsBytes = hexToBytes(hex2);
  const chacha = managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes));
  return new TextDecoder().decode(chacha.decrypt(dataAsBytes));
}
var symmetricEncrypt = async ({ key, data }) => {
  if (typeof key === "string") return rawEncrypt(key, data);
  const secret = key.keys.get(key.currentVersion);
  if (!secret) throw new Error(`Secret version ${key.currentVersion} not found in keys`);
  const ciphertext = await rawEncrypt(secret, data);
  return formatEnvelope(key.currentVersion, ciphertext);
};
var symmetricDecrypt = async ({ key, data }) => {
  if (typeof key === "string") return rawDecrypt(key, data);
  const envelope = parseEnvelope(data);
  if (envelope) {
    const secret = key.keys.get(envelope.version);
    if (!secret) throw new Error(`Secret version ${envelope.version} not found in keys (key may have been retired)`);
    return rawDecrypt(secret, envelope.ciphertext);
  }
  if (key.legacySecret) return rawDecrypt(key.legacySecret, data);
  throw new Error("Cannot decrypt legacy bare-hex payload: no legacy secret available. Set BETTER_AUTH_SECRET for backwards compatibility.");
};

// node_modules/better-auth/dist/crypto/purpose.mjs
var salt = utf8ToBytes("better-auth:oauth-encryption:v1");
function deriveSecret(secret, purpose) {
  return bytesToHex(hkdf(sha256, utf8ToBytes(secret), salt, utf8ToBytes(`better-auth:${purpose}:v1`), 32));
}
function derivePurposeKey(secret, purpose) {
  if (typeof secret === "string") return deriveSecret(secret, purpose);
  return {
    keys: new Map(Array.from(secret.keys, ([version2, value]) => [version2, deriveSecret(value, purpose)])),
    currentVersion: secret.currentVersion,
    ...secret.legacySecret && { legacySecret: deriveSecret(secret.legacySecret, purpose) }
  };
}

// node_modules/@better-auth/core/dist/utils/state.mjs
var getAuthStateVerificationIdentifier = (state) => `auth-state:${state}`;

// node_modules/better-auth/dist/state.mjs
var stateDataSchema = looseObject({
  callbackURL: string(),
  codeVerifier: string(),
  errorURL: string().optional(),
  newUserURL: string().optional(),
  expiresAt: number(),
  /**
  * CSRF nonce returned to the OAuth provider. When using cookie state storage,
  * this must match the callback `state` query parameter.
  */
  oauthState: string().optional(),
  link: object({
    email: string(),
    userId: coerce_exports.string(),
    encryptedSessionToken: string().optional()
  }).optional(),
  requestSignUp: boolean().optional(),
  /**
  * OIDC nonce sent as the authorization request `nonce` parameter when the
  * provider requires an ID token to be bound to this redirect flow.
  */
  idTokenNonce: string().optional(),
  /**
  * Server-controlled values that ride the state across the provider redirect.
  * Populated only by `generateState` from `addOAuthServerContext`, never from
  * the request body, so it is safe to trust on the callback.
  */
  serverContext: record(string(), unknown()).optional()
});
var INTERNAL_STATE_KEYS = new Set(Object.keys(stateDataSchema.shape));
var StateError = class extends BetterAuthError {
  code;
  details;
  /**
  * The per-flow `errorCallbackURL` recovered from the parsed state, when the
  * failure happened after the state was successfully parsed (for example a
  * nonce or state-cookie mismatch). It was origin-validated at sign-in, so
  * the callback can safely redirect there instead of the default error page.
  * Absent when the state could not be parsed at all.
  */
  errorURL;
  constructor(message2, options) {
    super(message2, options);
    this.code = options.code;
    this.details = options.details;
    this.errorURL = options.errorURL;
  }
};
async function generateGenericState(c, stateData, settings) {
  const state = generateRandomString(32);
  if (c.context.oauthConfig.storeStateStrategy === "cookie") {
    const payload = {
      ...stateData,
      oauthState: state
    };
    const encryptedData = await symmetricEncrypt({
      key: derivePurposeKey(c.context.secretConfig, "oauth-state-cookie"),
      data: JSON.stringify(payload)
    });
    const stateCookie2 = c.context.createAuthCookie(settings?.cookieName ?? "oauth_state", { maxAge: 600 });
    c.setCookie(stateCookie2.name, encryptedData, stateCookie2.attributes);
    return {
      state,
      codeVerifier: stateData.codeVerifier
    };
  }
  const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "state", { maxAge: 300 });
  await c.setSignedCookie(stateCookie.name, state, c.context.secret, stateCookie.attributes);
  const expiresAt = new Date(Date.now() + 6e5);
  if (!await c.context.internalAdapter.createVerificationValue({
    value: JSON.stringify({
      ...stateData,
      oauthState: state
    }),
    identifier: getAuthStateVerificationIdentifier(state),
    expiresAt
  })) throw new StateError("Unable to create verification. Make sure the database adapter is properly working and there is a verification table in the database", { code: "state_generation_error" });
  return {
    state,
    codeVerifier: stateData.codeVerifier
  };
}
async function parseGenericState(c, state, settings) {
  if (!state) throw new StateError("State not found in OAuth callback", { code: "state_not_found" });
  const storeStateStrategy = c.context.oauthConfig.storeStateStrategy;
  let parsedData;
  if (storeStateStrategy === "cookie") {
    const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "oauth_state");
    const encryptedData = c.getCookie(stateCookie.name);
    if (!encryptedData) throw new StateError("State mismatch: auth state cookie not found", {
      code: "state_mismatch",
      details: { state }
    });
    try {
      const decryptedData = await symmetricDecrypt({
        key: derivePurposeKey(c.context.secretConfig, "oauth-state-cookie"),
        data: encryptedData
      });
      parsedData = stateDataSchema.parse(JSON.parse(decryptedData));
    } catch (error2) {
      throw new StateError("State invalid: Failed to decrypt or parse auth state", {
        code: "state_invalid",
        details: { state },
        cause: error2
      });
    }
    if (!parsedData.oauthState || parsedData.oauthState !== state) throw new StateError("State mismatch: OAuth state parameter does not match stored state", {
      code: "state_security_mismatch",
      details: { state },
      errorURL: parsedData.errorURL
    });
    expireCookie(c, stateCookie);
  } else {
    const data = await c.context.internalAdapter.findVerificationValue(getAuthStateVerificationIdentifier(state));
    if (!data) throw new StateError("State mismatch: verification not found", {
      code: "state_mismatch",
      details: { state }
    });
    parsedData = stateDataSchema.parse(JSON.parse(data.value));
    if (parsedData.oauthState !== void 0 && parsedData.oauthState !== state) throw new StateError("State mismatch: OAuth state parameter does not match stored state", {
      code: "state_security_mismatch",
      details: { state },
      errorURL: parsedData.errorURL
    });
    const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "state");
    const stateCookieValue = await c.getSignedCookie(stateCookie.name, c.context.secret);
    if (!(settings?.skipStateCookieCheck ?? c.context.oauthConfig.skipStateCookieCheck) && (!stateCookieValue || stateCookieValue !== state)) throw new StateError("State mismatch: State not persisted correctly", {
      code: "state_security_mismatch",
      details: { state },
      errorURL: parsedData.errorURL
    });
    expireCookie(c, stateCookie);
    await c.context.internalAdapter.deleteVerificationByIdentifier(getAuthStateVerificationIdentifier(state));
  }
  if (parsedData.expiresAt < Date.now()) throw new StateError("Invalid state: request expired", {
    code: "state_mismatch",
    details: { expiresAt: parsedData.expiresAt },
    errorURL: parsedData.errorURL
  });
  return parsedData;
}

// node_modules/@better-auth/core/dist/async_hooks/index.mjs
var cachedAsyncLocalStorageConstructor;
var availabilityWarningLogged = false;
function getBuiltinAsyncLocalStorage() {
  try {
    return globalThis.process?.getBuiltinModule?.("node:async_hooks")?.AsyncLocalStorage;
  } catch {
    return;
  }
}
async function getAsyncLocalStorage() {
  if (cachedAsyncLocalStorageConstructor) return cachedAsyncLocalStorageConstructor;
  const builtinConstructor = getBuiltinAsyncLocalStorage();
  if (builtinConstructor) {
    cachedAsyncLocalStorageConstructor ??= builtinConstructor;
    return cachedAsyncLocalStorageConstructor;
  }
  try {
    const { AsyncLocalStorage: constructor } = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      "async_hooks"
    );
    cachedAsyncLocalStorageConstructor ??= constructor;
    return cachedAsyncLocalStorageConstructor;
  } catch (err) {
    const constructor = globalThis.AsyncLocalStorage;
    if (typeof constructor === "function") {
      cachedAsyncLocalStorageConstructor ??= constructor;
      return cachedAsyncLocalStorageConstructor;
    }
    if (typeof window !== "undefined") throw new Error("getAsyncLocalStorage is only available in server code");
    if (!availabilityWarningLogged) {
      availabilityWarningLogged = true;
      console.warn("[better-auth] Warning: AsyncLocalStorage is not available in this environment. Some features may not work as expected.");
      console.warn("[better-auth] Please read more about this warning at https://better-auth.com/docs/installation#mount-handler");
      console.warn("[better-auth] If you are using Cloudflare Workers, please see: https://better-auth.com/docs/guides/cloudflare#nodejs-compatibility");
    }
    throw err;
  }
}

// node_modules/@better-auth/core/dist/context/endpoint-context.mjs
var getExistingEndpointContextStorage = () => {
  return __getBetterAuthGlobal().context.endpointContextAsyncStorage;
};
var getOrCreateEndpointContextStorage = async () => {
  const existing = getExistingEndpointContextStorage();
  if (existing) return existing;
  const AsyncLocalStorage = await getAsyncLocalStorage();
  const globalContext = __getBetterAuthGlobal().context;
  return globalContext.endpointContextAsyncStorage ??= new AsyncLocalStorage();
};
function tryGetCurrentAuthEndpointContext() {
  return __getCurrentEndpointContext();
}
function getCurrentAuthEndpointContext() {
  const authEndpointContext = tryGetCurrentAuthEndpointContext();
  if (!authEndpointContext) throw new Error("No auth context found. Please make sure you are calling this function within a `runWithEndpointContext` callback.");
  return authEndpointContext;
}
async function runWithEndpointContext(authEndpointContext, fn) {
  return (await getOrCreateEndpointContextStorage()).run(authEndpointContext, fn);
}

// node_modules/@better-auth/core/dist/context/request-state.mjs
var ensureAsyncStorage = async () => {
  const betterAuthGlobal = __getBetterAuthGlobal();
  const existing = betterAuthGlobal.context.requestStateAsyncStorage;
  if (existing) return existing;
  const AsyncLocalStorage = await getAsyncLocalStorage();
  betterAuthGlobal.context.requestStateAsyncStorage ??= new AsyncLocalStorage();
  return betterAuthGlobal.context.requestStateAsyncStorage;
};
async function hasRequestState() {
  return (await ensureAsyncStorage()).getStore() !== void 0;
}
async function getCurrentRequestState() {
  const store = (await ensureAsyncStorage()).getStore();
  if (!store) throw new Error("No request state found. Please make sure you are calling this function within a `runWithRequestState` callback.");
  return store;
}
async function runWithRequestState(store, fn) {
  return (await ensureAsyncStorage()).run(store, fn);
}
function defineRequestState(initFn) {
  const ref = Object.freeze({});
  return {
    get ref() {
      return ref;
    },
    async get() {
      const store = await getCurrentRequestState();
      if (!store.has(ref)) {
        const initialValue = await initFn();
        store.set(ref, initialValue);
        return initialValue;
      }
      return store.get(ref);
    },
    async set(value) {
      (await getCurrentRequestState()).set(ref, value);
    }
  };
}

// node_modules/@better-auth/core/dist/context/transaction.mjs
var ensureAsyncStorage2 = async () => {
  const betterAuthGlobal = __getBetterAuthGlobal();
  const existing = betterAuthGlobal.context.adapterAsyncStorage;
  if (existing) return existing;
  const AsyncLocalStorage = await getAsyncLocalStorage();
  betterAuthGlobal.context.adapterAsyncStorage ??= new AsyncLocalStorage();
  return betterAuthGlobal.context.adapterAsyncStorage;
};
var getCurrentAdapter = async (fallback) => {
  return ensureAsyncStorage2().then((als) => {
    return als.getStore()?.adapter || fallback;
  }).catch(() => {
    return fallback;
  });
};
var runWithAdapter = async (adapter, fn) => {
  let called = false;
  return ensureAsyncStorage2().then(async (als) => {
    called = true;
    const pendingHooks = [];
    let result;
    let error2;
    let hasError = false;
    try {
      result = await als.run({
        adapter,
        pendingHooks,
        isTransactionActive: false
      }, fn);
    } catch (err) {
      error2 = err;
      hasError = true;
    }
    for (const hook of pendingHooks) await hook();
    if (hasError) throw error2;
    return result;
  }).catch((err) => {
    if (!called) return fn();
    throw err;
  });
};
var runWithTransaction = async (adapter, fn, options) => {
  let called = false;
  return ensureAsyncStorage2().then(async (als) => {
    called = true;
    if (als.getStore()?.isTransactionActive) return fn();
    const pendingSchemaCheck = runtimeSchemaCheckFor(adapter)?.();
    if (pendingSchemaCheck) await pendingSchemaCheck;
    let pendingHooks = [];
    let result;
    let error2;
    let hasError = false;
    try {
      result = await adapter.transaction(async (trx) => {
        pendingHooks = [];
        return als.run({
          adapter: trx,
          pendingHooks,
          isTransactionActive: true
        }, fn);
      });
    } catch (e) {
      hasError = true;
      error2 = e;
    }
    const runPendingHooks = async (unhandledErrors) => {
      for (const hook of pendingHooks) try {
        await hook();
      } catch (hookError) {
        if (!options?.onAfterCommitHookError) {
          if (unhandledErrors === "throw") throw hookError;
          try {
            logger.error("Failed to run an after-commit hook for work that could not roll back", hookError);
          } catch {
          }
          continue;
        }
        try {
          await options.onAfterCommitHookError(hookError);
        } catch {
        }
      }
    };
    if (hasError) {
      if (adapter.options?.adapterConfig.transaction === false) await runPendingHooks("log");
      throw error2;
    }
    await runPendingHooks("throw");
    return result;
  }).catch((err) => {
    if (!called) return fn();
    throw err;
  });
};
var queueAfterTransactionHook = async (hook, options) => {
  const executeHook = async () => {
    try {
      await hook();
    } catch (error2) {
      if (!options?.onError) throw error2;
      await options.onError(error2);
    }
  };
  let storage2;
  try {
    storage2 = await ensureAsyncStorage2();
  } catch {
    return executeHook();
  }
  const store = storage2.getStore();
  if (!store?.isTransactionActive) return executeHook();
  store.pendingHooks.push(executeHook);
};

// node_modules/better-auth/dist/api/state/oauth.mjs
var { get: getRawOAuthState, set: setOAuthState } = defineRequestState(() => null);
var { get: getOAuthServerContext, set: setOAuthServerContext } = defineRequestState(() => null);

// node_modules/@better-auth/core/dist/utils/url.mjs
function normalizePathname(requestUrl, basePath) {
  let pathname;
  try {
    pathname = new URL(requestUrl).pathname.replace(/\/+$/, "") || "/";
  } catch {
    return "/";
  }
  const normalizedBasePath = basePath.replace(/\/+$/, "");
  if (normalizedBasePath === "") return pathname;
  if (pathname === normalizedBasePath) return "/";
  if (pathname.startsWith(normalizedBasePath + "/")) return pathname.slice(normalizedBasePath.length).replace(/\/+$/, "") || "/";
  return pathname;
}
var URL_REFERENCE_ORIGIN = "https://better-auth.invalid";
function appendQueryParams(input, params) {
  const relative = input.startsWith("/");
  if (input.startsWith("//") || input.startsWith("/\\")) throw new TypeError("Expected an absolute or root-relative URL");
  const parsedURL = relative ? new URL(input, URL_REFERENCE_ORIGIN) : new URL(input);
  if (relative && parsedURL.origin !== URL_REFERENCE_ORIGIN) throw new TypeError("Expected an absolute or root-relative URL");
  const query = params.toString();
  if (!query) return input;
  const separator = parsedURL.search.endsWith("&") ? "" : "&";
  parsedURL.search = parsedURL.search ? `${parsedURL.search}${separator}${query}` : query;
  return relative ? parsedURL.href.slice(parsedURL.origin.length) : parsedURL.href;
}

// node_modules/better-auth/dist/oauth2/errors.mjs
var OAUTH_CALLBACK_ERROR_CODES = {
  NO_CODE: "no_code",
  PROVIDER_NOT_FOUND: "oauth_provider_not_found",
  ISSUER_MISSING: "issuer_missing",
  ISSUER_MISMATCH: "issuer_mismatch",
  INVALID_CODE: "invalid_code",
  NONCE_BINDING_MISSING: "nonce_binding_missing",
  UNABLE_TO_GET_USER_INFO: "unable_to_get_user_info",
  NO_CALLBACK_URL: "no_callback_url",
  UNABLE_TO_LINK_ACCOUNT: "unable_to_link_account",
  EMAIL_DOES_NOT_MATCH: "email_does_not_match",
  ACCOUNT_ALREADY_LINKED_TO_DIFFERENT_USER: "account_already_linked_to_different_user",
  EMAIL_NOT_FOUND: "email_not_found",
  EMAIL_NOT_VERIFIED: "email_not_verified"
};
var HANDLING_DOCS_URL = "https://www.better-auth.com/docs/concepts/oauth#handling-providers-without-email";
function redirectOnError(ctx, errorURL, error2, description) {
  const params = new URLSearchParams({ error: error2 });
  if (description) params.set("error_description", description);
  const redirectURL = appendQueryParams(errorURL, params);
  throw ctx.redirect(redirectURL);
}
function missingEmailLogMessage(providerId, options) {
  return `${options?.source === "generic" ? `Generic OAuth provider "${providerId}"` : `Provider "${providerId}"`} did not return an email${options?.source === "id_token" ? " in the id token" : ""}. Either request the provider's email scope, or create a placeholder via \`mapProfileToUser\`. See ${HANDLING_DOCS_URL}`;
}

// node_modules/better-auth/dist/oauth2/state.mjs
function generateIdTokenNonce(provider) {
  return provider.requiresIdTokenNonce ? generateRandomString(32) : void 0;
}
async function generateState(c, options) {
  const callbackURL = c.body?.callbackURL || c.context.options.baseURL;
  if (!callbackURL) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.CALLBACK_URL_REQUIRED);
  const codeVerifier = options?.codeVerifier ?? generateRandomString(128);
  const pendingServerContext = await getOAuthServerContext();
  const serverContext = pendingServerContext && Object.keys(pendingServerContext).length ? pendingServerContext : void 0;
  const stateData = {
    ...options?.additionalData ? options.additionalData : {},
    callbackURL,
    codeVerifier,
    errorURL: c.body?.errorCallbackURL,
    newUserURL: c.body?.newUserCallbackURL,
    link: options?.link,
    serverContext,
    expiresAt: Date.now() + 6e5,
    requestSignUp: c.body?.requestSignUp,
    idTokenNonce: options?.idTokenNonce
  };
  await setOAuthState(stateData);
  try {
    return generateGenericState(c, stateData);
  } catch (error2) {
    c.context.logger.error("Failed to create verification", error2);
    throw new APIError2("INTERNAL_SERVER_ERROR", {
      message: "Unable to create verification",
      cause: error2
    });
  }
}
async function parseState(c) {
  const state = c.query.state || c.body?.state;
  const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
  let parsedData;
  try {
    parsedData = await parseGenericState(c, state);
  } catch (error2) {
    c.context.logger.error("Failed to parse state", error2);
    let code = "internal_server_error";
    let redirectErrorURL = errorURL;
    if (error2 instanceof StateError) {
      code = error2.code === "state_security_mismatch" ? "state_mismatch" : error2.code;
      redirectErrorURL = error2.errorURL || errorURL;
    }
    redirectOnError(c, redirectErrorURL, code);
  }
  if (!parsedData.errorURL) parsedData.errorURL = errorURL;
  if (parsedData) await setOAuthState(parsedData);
  return parsedData;
}

// node_modules/@better-auth/core/dist/utils/is-api-error.mjs
function isAPIError2(error2) {
  return error2 instanceof APIError || error2 instanceof APIError2 || error2?.name === "APIError";
}

// node_modules/@better-auth/core/dist/api/index.mjs
var NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
  Pragma: "no-cache"
};
var HIDE_METADATA = { scope: "server" };
function attachResponseHeadersToAPIError(responseHeaders, e) {
  if (!isAPIError2(e) || !responseHeaders) return;
  Object.defineProperty(e, kAPIErrorHeaderSymbol, {
    enumerable: false,
    configurable: true,
    value: responseHeaders,
    writable: false
  });
}
var optionsMiddleware = createMiddleware(async () => {
  return {};
});
var createAuthMiddleware = createMiddleware.create({ use: [optionsMiddleware, createMiddleware(async () => {
  return {};
})] });
var createEndpointWithAuthContext = createEndpoint.create({ use: [optionsMiddleware] });
function wrapEndpointHandler(handler, options) {
  const noStore = options.metadata?.noStore === true;
  return async (context) => {
    if (noStore) for (const [name, value] of Object.entries(NO_STORE_HEADERS)) context.setHeader(name, value);
    try {
      return await runWithEndpointContext(context, () => handler(context));
    } catch (error2) {
      attachResponseHeadersToAPIError(context.responseHeaders, error2);
      throw error2;
    }
  };
}
function createAuthEndpoint(...args) {
  if (args.length === 3) {
    const [path2, options2, handler2] = args;
    return createEndpointWithAuthContext(path2, options2, wrapEndpointHandler(handler2, options2));
  }
  const [options, handler] = args;
  return createEndpointWithAuthContext(options, wrapEndpointHandler(handler, options));
}
function withServerOnly(options) {
  return {
    ...options,
    metadata: {
      ...options.metadata,
      SERVER_ONLY: true
    }
  };
}
createAuthEndpoint.serverOnly = (options, handler) => createAuthEndpoint(withServerOnly(options), handler);

// node_modules/better-auth/dist/db/adapter-base.mjs
async function getBaseAdapter(options, handleDirectDatabase) {
  let adapter;
  if (!options.database) {
    const tables = getAuthTables(options);
    const memoryDB = Object.keys(tables).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
    const { memoryAdapter } = await import("./dist-NUHRNVYN.mjs");
    adapter = memoryAdapter(memoryDB)(options);
  } else if (typeof options.database === "function") adapter = options.database(options);
  else adapter = await handleDirectDatabase(options);
  if (!adapter.transaction) {
    logger.warn("Adapter does not correctly implement transaction function, patching it automatically. Please update your adapter implementation.");
    adapter.transaction = async (cb) => {
      return cb(adapter);
    };
  }
  return adapter;
}

// node_modules/better-auth/dist/db/adapter-kysely.mjs
async function getAdapter(options) {
  return getBaseAdapter(options, async (opts) => {
    const { createKyselyAdapter: createKyselyAdapter2, kyselyAdapter } = await import("./kysely-adapter-BFVD4LU3.mjs");
    const { kysely, databaseType, transaction } = await createKyselyAdapter2(opts);
    if (!kysely) throw new BetterAuthError("Failed to initialize database adapter");
    return kyselyAdapter(kysely, {
      type: databaseType || "sqlite",
      debugLogs: opts.database && "debugLogs" in opts.database ? opts.database.debugLogs : false,
      transaction
    })(opts);
  });
}

// node_modules/better-auth/dist/db/get-schema.mjs
function buildSchema(config2) {
  const { indexesByTable, tables } = getAuthTablesWithResolvedIndexes(config2);
  const referenceKeys = /* @__PURE__ */ new Map();
  const schema2 = {};
  for (const key in tables) {
    const table2 = tables[key];
    const fields = table2.fields;
    const actualFields = {};
    Object.entries(fields).forEach(([key2, field]) => {
      const reference = field.references;
      const refTable = reference ? tables[reference.model] : void 0;
      const actualField = reference && refTable ? {
        ...field,
        references: {
          ...reference,
          model: refTable.modelName
        }
      } : field;
      actualFields[field.fieldName || key2] = actualField;
      if (reference) referenceKeys.set(actualField, {
        modelKey: reference.model,
        fieldKey: reference.field
      });
    });
    if (schema2[table2.modelName]) {
      schema2[table2.modelName].fields = {
        ...schema2[table2.modelName].fields,
        ...actualFields
      };
      if (table2.disableMigrations) schema2[table2.modelName].disableMigrations = true;
      continue;
    }
    schema2[table2.modelName] = {
      fields: actualFields,
      order: table2.order || Infinity,
      disableMigrations: table2.disableMigrations
    };
  }
  for (const [tableName, indexes] of indexesByTable) if (schema2[tableName]) schema2[tableName].indexes = indexes;
  return {
    schema: schema2,
    tables,
    referenceKeys
  };
}

// node_modules/better-auth/dist/db/get-migration.mjs
var map = {
  postgres: {
    string: [
      "character varying",
      "varchar",
      "text",
      "uuid"
    ],
    number: [
      "int4",
      "int8",
      "integer",
      "bigint",
      "smallint",
      "numeric",
      "real",
      "double precision"
    ],
    boolean: ["bool", "boolean"],
    date: [
      "timestamptz",
      "timestamp",
      "date"
    ],
    json: ["json", "jsonb"]
  },
  mysql: {
    string: [
      "varchar",
      "text",
      "uuid"
    ],
    number: [
      "integer",
      "int",
      "bigint",
      "smallint",
      "decimal",
      "float",
      "double"
    ],
    boolean: ["boolean", "tinyint"],
    date: [
      "timestamp",
      "datetime",
      "date"
    ],
    json: ["json"]
  },
  sqlite: {
    string: ["TEXT"],
    number: [
      "INTEGER",
      "REAL",
      "BIGINT"
    ],
    boolean: ["INTEGER", "BOOLEAN"],
    date: ["DATE", "INTEGER"],
    json: ["TEXT"]
  },
  mssql: {
    string: [
      "varchar",
      "nvarchar",
      "uniqueidentifier"
    ],
    number: [
      "int",
      "bigint",
      "smallint",
      "decimal",
      "float",
      "double"
    ],
    boolean: ["bit", "smallint"],
    date: [
      "datetime2",
      "date",
      "datetime"
    ],
    json: ["varchar", "nvarchar"]
  }
};
function createDatabaseIndexKey(tableName, indexName) {
  return `${getPortableDatabaseIdentifierKey(tableName)}\0${getPortableDatabaseIdentifierKey(indexName)}`;
}
function createDatabaseColumnKey(tableName, columnName) {
  return `${tableName}\0${columnName}`;
}
function databaseIndexMatches(existing, configured) {
  return existing.unique === (configured.unique ?? false) && existing.validFullColumns && existing.columns.length === configured.columns.length && existing.columns.every((column, position) => column === configured.columns[position]);
}
function databaseValueIsTrue(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  return value === "1" || value?.toLowerCase() === "true" || value === "t";
}
function toDatabaseIndexMap(indexes) {
  return new Map(indexes.map((index) => {
    const columns = [...index.columns].sort((left, right) => left.position - right.position);
    return [createDatabaseIndexKey(index.table, index.name), {
      columns: columns.flatMap((column) => column.name === null ? [] : [column.name]),
      name: index.name,
      table: index.table,
      unique: index.unique,
      validFullColumns: index.valid && !index.partial && columns.length > 0 && columns.every((column) => column.name !== null && column.fullLength)
    }];
  }));
}
async function getDatabaseIndexMap(db2, target, tableNames, introspectIndexes) {
  if (introspectIndexes) return toDatabaseIndexMap(await introspectIndexes(tableNames));
  let rows;
  switch (target.type) {
    case "sqlite":
      rows = (await sql`
				SELECT
					tables.name AS "tableName",
					index_list.name AS "indexName",
					index_info.name AS "columnName",
					index_list."unique" AS "isUnique",
					index_list.partial AS "isPartial",
					index_info.seqno AS "columnPosition"
				FROM sqlite_master AS tables
				INNER JOIN pragma_index_list(tables.name) AS index_list
				INNER JOIN pragma_index_info(index_list.name) AS index_info
				WHERE tables.type = 'table'
			`.execute(db2)).rows;
      break;
    case "postgres":
      rows = (await sql`
				SELECT
					table_class.relname AS "tableName",
					index_class.relname AS "indexName",
					index_attribute.attname AS "columnName",
					index_data.indisunique AS "isUnique",
					index_data.indisvalid AS "isValid",
					(index_data.indpred IS NOT NULL) AS "isPartial",
					index_column.ordinality AS "columnPosition"
				FROM pg_class AS table_class
				INNER JOIN pg_namespace AS table_namespace
					ON table_namespace.oid = table_class.relnamespace
				INNER JOIN pg_index AS index_data
					ON index_data.indrelid = table_class.oid
				INNER JOIN pg_class AS index_class
					ON index_class.oid = index_data.indexrelid
				INNER JOIN LATERAL unnest(index_data.indkey)
					WITH ORDINALITY AS index_column(attribute_number, ordinality)
					ON TRUE
				LEFT JOIN pg_attribute AS index_attribute
					ON index_attribute.attrelid = table_class.oid
					AND index_attribute.attnum = index_column.attribute_number
				WHERE table_namespace.nspname = ${target.schema}
					AND table_class.relkind = 'r'
					AND index_column.ordinality <= index_data.indnkeyatts
			`.execute(db2)).rows;
      break;
    case "mysql":
      rows = (await sql`
				SELECT
					table_name AS tableName,
					index_name AS indexName,
					column_name AS columnName,
					non_unique AS nonUnique,
					seq_in_index AS columnPosition,
					sub_part AS prefixLength,
					COALESCE(LOWER(comment) = 'disabled', FALSE) AS isDisabled
				FROM information_schema.statistics
				WHERE table_schema = DATABASE()
			`.execute(db2)).rows;
      break;
    case "mssql":
      rows = (await sql`
				SELECT
					tables.name AS "tableName",
					indexes.name AS "indexName",
					columns.name AS "columnName",
					indexes.is_unique AS "isUnique",
					indexes.is_disabled AS "isDisabled",
					indexes.is_hypothetical AS "isHypothetical",
					indexes.has_filter AS "isPartial",
					index_columns.key_ordinal AS "columnPosition"
				FROM sys.indexes AS indexes
				INNER JOIN sys.tables AS tables
					ON indexes.object_id = tables.object_id
				INNER JOIN sys.schemas AS table_schemas
					ON table_schemas.schema_id = tables.schema_id
				INNER JOIN sys.index_columns AS index_columns
					ON index_columns.object_id = indexes.object_id
					AND index_columns.index_id = indexes.index_id
				INNER JOIN sys.columns AS columns
					ON columns.object_id = index_columns.object_id
					AND columns.column_id = index_columns.column_id
				WHERE table_schemas.name = ${target.schema}
					AND indexes.name IS NOT NULL
					AND index_columns.key_ordinal > 0
			`.execute(db2)).rows;
  }
  const indexMetadata = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const table2 = row.tableName ?? row.table_name ?? row.TABLE_NAME ?? row.tablename ?? row.tbl_name;
    const name = row.indexName ?? row.index_name ?? row.INDEX_NAME ?? row.name;
    const column = row.columnName ?? row.column_name ?? row.COLUMN_NAME;
    if (!table2 || !name) continue;
    const key = createDatabaseIndexKey(table2, name);
    const nonUnique = row.nonUnique ?? row.non_unique ?? row.NON_UNIQUE;
    const unique = nonUnique === void 0 ? databaseValueIsTrue(row.isUnique ?? row.is_unique) : !databaseValueIsTrue(nonUnique);
    const position = Number(row.columnPosition ?? row.column_position ?? row.keyOrdinal ?? row.key_ordinal ?? row.ordinality ?? row.seqInIndex ?? row.seq_in_index ?? row.SEQ_IN_INDEX ?? row.seqno ?? 0);
    const indexColumn = {
      fullLength: column !== void 0 && column !== null && (row.prefixLength === void 0 || row.prefixLength === null),
      name: column ?? null,
      position
    };
    const partial = databaseValueIsTrue(row.isPartial);
    const valid = !databaseValueIsTrue(row.isDisabled) && !databaseValueIsTrue(row.isHypothetical) && (row.isValid === void 0 || databaseValueIsTrue(row.isValid));
    const existing = indexMetadata.get(key);
    indexMetadata.set(key, existing ? {
      ...existing,
      columns: [...existing.columns, indexColumn],
      partial: existing.partial || partial,
      valid: existing.valid && valid
    } : {
      columns: [indexColumn],
      name,
      partial,
      table: table2,
      unique,
      valid
    });
  }
  return toDatabaseIndexMap([...indexMetadata.values()]);
}
async function getDatabaseColumnBounds(db2, target) {
  let rows;
  switch (target.type) {
    case "postgres":
    case "sqlite":
      return /* @__PURE__ */ new Map();
    case "mysql":
      rows = (await sql`
				SELECT
					table_name AS tableName,
					column_name AS columnName,
					character_octet_length AS maxIndexBytes
				FROM information_schema.columns
				WHERE table_schema = DATABASE()
			`.execute(db2)).rows;
      break;
    case "mssql":
      rows = (await sql`
				SELECT
					tables.name AS "tableName",
					columns.name AS "columnName",
					columns.max_length AS "maxIndexBytes"
				FROM sys.columns AS columns
				INNER JOIN sys.tables AS tables
					ON tables.object_id = columns.object_id
				INNER JOIN sys.schemas AS table_schemas
					ON table_schemas.schema_id = tables.schema_id
				WHERE table_schemas.name = ${target.schema}
			`.execute(db2)).rows;
  }
  const bounds = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const table2 = row.tableName ?? row.TABLE_NAME;
    const column = row.columnName ?? row.COLUMN_NAME;
    if (!table2 || !column) continue;
    const maxIndexBytes = Number(row.maxIndexBytes ?? row.MAX_INDEX_BYTES ?? -1);
    bounds.set(createDatabaseColumnKey(table2, column), { maxIndexBytes: maxIndexBytes < 0 ? null : maxIndexBytes });
  }
  return bounds;
}
function assertExistingTableIndexFits({ columnBounds, dbType, existingColumns, fields, indexes, index, table: table2 }) {
  const byteBudget = dbType === "mysql" ? 3072 : 1700;
  let requiredBytes = 0;
  for (const column of index.columns) {
    const field = fields[column];
    if (!field) continue;
    if (field.type === "string" || Array.isArray(field.type)) {
      if (!existingColumns.has(column)) {
        const generatedLength = getDatabaseIndexStringLength({
          columnName: column,
          dialect: dbType,
          fields,
          indexes
        });
        requiredBytes += (generatedLength ?? 0) * (dbType === "mysql" ? 4 : 1);
        continue;
      }
      const bound = columnBounds.get(createDatabaseColumnKey(table2, column));
      if (!bound?.maxIndexBytes) throw new BetterAuthError(`Cannot create database index "${index.name}" on existing table "${table2}" because column "${column}" is not bounded for ${dbType === "mysql" ? "MySQL" : "SQL Server"}. Change it to a bounded string column, resolve oversized values, then run the migration again.`);
      requiredBytes += bound.maxIndexBytes;
    } else requiredBytes += 16;
  }
  if (requiredBytes > byteBudget) throw new BetterAuthError(`Cannot create database index "${index.name}" on existing table "${table2}" because its columns can exceed ${dbType === "mysql" ? "MySQL" : "SQL Server"}'s ${byteBudget}-byte index-key limit. Bound the indexed string columns to the generated schema lengths, resolve oversized values, then run the migration again.`);
}
var UnsafeMigrationError = class extends BetterAuthError {
};
function hasTimestampColumnDefault(field, dbType) {
  return field.type === "date" && typeof field.defaultValue === "function" && (dbType === "postgres" || dbType === "mysql" || dbType === "mssql");
}
function hasStaticColumnDefault(field) {
  return !(field.unique && field.required === false) && (field.type === "string" || field.type === "number" || field.type === "boolean") && field.defaultValue !== void 0 && field.defaultValue !== null && typeof field.defaultValue !== "function";
}
async function tableHasRows(db2, dbType, table2) {
  const probe = db2.selectFrom(table2).select(sql`1`.as("present"));
  return (await (dbType === "mssql" ? probe.top(1) : probe.limit(1)).execute()).length > 0;
}
function matchType(columnDataType, fieldType, dbType) {
  function normalize(type) {
    return type.toLowerCase().split("(")[0].trim();
  }
  if (fieldType === "string[]" || fieldType === "number[]") return columnDataType.toLowerCase().includes("json");
  const types = map[dbType];
  return (Array.isArray(fieldType) ? types["string"].map((t) => t.toLowerCase()) : types[fieldType].map((t) => t.toLowerCase())).includes(normalize(columnDataType));
}
async function getMigrations(config2, { throwOnUnsafe = true } = {}) {
  const { schema: betterAuthSchema, tables: authTables, referenceKeys } = buildSchema(config2);
  const logger2 = createLogger(config2.logger);
  const unsafeChanges = [];
  const reportUnsafeChange = (message2) => {
    if (throwOnUnsafe) throw new UnsafeMigrationError(message2);
    unsafeChanges.push(message2);
  };
  let { kysely: db2, databaseType: dbType, introspectIndexes, schemaName } = await createKyselyAdapter(config2);
  if (!dbType) {
    logger2.warn("Could not determine database type, defaulting to sqlite. Please provide a type in the database options to avoid this.");
    dbType = "sqlite";
  }
  if (!db2) {
    logger2.error("Only kysely adapter is supported for migrations. You can use `generate` command to generate the schema, if you're using a different adapter.");
    process.exit(1);
  }
  let target;
  let tableMetadata;
  switch (dbType) {
    case "postgres": {
      const schema2 = schemaName ?? await getPostgresSchema(db2);
      target = {
        type: "postgres",
        schema: schema2
      };
      logger2.debug(`PostgreSQL migration: Using schema '${schema2}' (${schemaName ? "from database.schemaName" : "from search_path"})`);
      try {
        if (!(await db2.introspection.getSchemas()).some(({ name }) => name === schema2)) {
          if (schemaName) logger2.debug(`Schema '${schema2}' does not exist yet. The migration creates it before creating tables.`);
          else logger2.warn(`Schema '${schema2}' does not exist. Create it before running migrations or check your database configuration.`);
        }
      } catch (error2) {
        logger2.debug(`Could not verify schema existence: ${error2 instanceof Error ? error2.message : String(error2)}`);
      }
      tableMetadata = (await introspectPostgresTables(db2, [schema2])).filter((table2) => !table2.isView && !table2.isForeign);
      logger2.debug(`Found ${tableMetadata.length} table(s) in schema '${schema2}': ${tableMetadata.map((table2) => table2.name).join(", ") || "(none)"}`);
      break;
    }
    case "mssql": {
      const schema2 = await getMssqlSchema(db2);
      target = {
        type: "mssql",
        schema: schema2
      };
      logger2.debug(`SQL Server migration: Using schema '${schema2}' (from the current user's default schema)`);
      tableMetadata = (await db2.introspection.getTables()).filter((table2) => table2.schema === schema2);
      break;
    }
    case "mysql":
      target = { type: "mysql" };
      tableMetadata = await db2.introspection.getTables();
      break;
    case "sqlite":
      target = { type: "sqlite" };
      tableMetadata = await db2.introspection.getTables();
  }
  const databaseIndexMap = await getDatabaseIndexMap(db2, target, tableMetadata.map((table2) => table2.name), introspectIndexes);
  const databaseColumnBounds = await getDatabaseColumnBounds(db2, target);
  const schemaProblems = diffSchema(toPhysicalSchema(db2, betterAuthSchema), toIntrospectedTables(tableMetadata)).filter((finding) => finding.kind === "unexpected-required-column").map((finding) => formatSchemaFinding(finding, "database"));
  const toBeCreated = [];
  const toBeAdded = [];
  const toBeAddedIndexes = [];
  const plannedIndexes = /* @__PURE__ */ new Map();
  for (const [key, value] of Object.entries(betterAuthSchema)) {
    if (value.disableMigrations) continue;
    const table2 = tableMetadata.find((table3) => table3.name === key);
    for (const index of value.indexes ?? []) {
      const name = index.name;
      const indexKey = createDatabaseIndexKey(key, name);
      const existingIndex = databaseIndexMap.get(indexKey);
      if (existingIndex) {
        if (!databaseIndexMatches(existingIndex, index)) throw new BetterAuthError(`Database index "${name}" on table "${key}" does not match the configured fields and uniqueness. Rename or replace the existing index, then run the migration again.`);
        continue;
      }
      if (dbType === "sqlite" || dbType === "postgres") {
        const indexOnAnotherTable = [...databaseIndexMap.values()].find((databaseIndex) => getPortableDatabaseIdentifierKey(databaseIndex.name) === getPortableDatabaseIdentifierKey(name) && getPortableDatabaseIdentifierKey(databaseIndex.table) !== getPortableDatabaseIdentifierKey(key));
        if (indexOnAnotherTable) throw new BetterAuthError(`Database index name "${name}" is already used by table "${indexOnAnotherTable.table}". Index names must be unique across the schema.`);
      }
      const plannedIndex = plannedIndexes.get(indexKey);
      if (plannedIndex) {
        if (!databaseIndexMatches({
          columns: plannedIndex.columns,
          name: plannedIndex.name,
          table: key,
          unique: plannedIndex.unique ?? false,
          validFullColumns: true
        }, index)) throw new BetterAuthError(`Database index name "${name}" identifies more than one index on table "${key}".`);
        continue;
      }
      if (table2 && (dbType === "mysql" || dbType === "mssql")) assertExistingTableIndexFits({
        columnBounds: databaseColumnBounds,
        dbType,
        existingColumns: new Set(table2.columns.map((column) => column.name)),
        fields: value.fields,
        index,
        indexes: value.indexes ?? [],
        table: key
      });
      plannedIndexes.set(indexKey, index);
      toBeAddedIndexes.push({
        table: key,
        index,
        name
      });
    }
    if (!table2) {
      const tIndex = toBeCreated.findIndex((t) => t.table === key);
      const tableData = {
        table: key,
        fields: value.fields,
        order: value.order || Infinity
      };
      const insertIndex = toBeCreated.findIndex((t) => (t.order || Infinity) > tableData.order);
      if (insertIndex === -1) {
        if (tIndex === -1) toBeCreated.push(tableData);
        else toBeCreated[tIndex].fields = {
          ...toBeCreated[tIndex].fields,
          ...value.fields
        };
      } else toBeCreated.splice(insertIndex, 0, tableData);
      continue;
    }
    const toBeAddedFields = {};
    for (const [fieldName, field] of Object.entries(value.fields)) {
      const column = table2.columns.find((c) => c.name === fieldName);
      if (!column) {
        toBeAddedFields[fieldName] = field;
        continue;
      }
      if (field.required !== false && column.isNullable) logger2.warn(`Column "${fieldName}" on table "${key}" stays nullable while the schema declares the field required, so existing rows can still hold null. Backfill every row for this column and enforce NOT NULL to remove the drift.`);
      if (matchType(column.dataType, field.type, dbType)) continue;
      else logger2.warn(`Field ${fieldName} in table ${key} has a different type in the database. Expected ${field.type} but got ${column.dataType}.`);
    }
    if (Object.keys(toBeAddedFields).length > 0) toBeAdded.push({
      table: key,
      fields: toBeAddedFields,
      order: value.order || Infinity
    });
  }
  const migrations = [];
  if (schemaName && toBeCreated.length > 0) migrations.push(db2.schema.createSchema(schemaName).ifNotExists());
  const useUUIDs = config2.advanced?.database?.generateId === "uuid";
  const useNumberId = config2.advanced?.database?.generateId === "serial";
  function getType(field, fieldName, tableIndexStringLength) {
    const type = field.type;
    const provider = dbType || "sqlite";
    const typeMap = {
      string: {
        sqlite: "text",
        postgres: "text",
        mysql: tableIndexStringLength ? `varchar(${tableIndexStringLength})` : field.unique ? "varchar(255)" : field.references ? "varchar(36)" : field.sortable ? "varchar(255)" : field.index ? "varchar(255)" : "text",
        mssql: tableIndexStringLength ? `varchar(${tableIndexStringLength})` : field.unique || field.sortable ? "varchar(255)" : field.references ? "varchar(36)" : "varchar(8000)"
      },
      boolean: {
        sqlite: "integer",
        postgres: "boolean",
        mysql: "boolean",
        mssql: "smallint"
      },
      number: {
        sqlite: field.bigint ? "bigint" : "integer",
        postgres: field.bigint ? "bigint" : "integer",
        mysql: field.bigint ? "bigint" : "integer",
        mssql: field.bigint ? "bigint" : "integer"
      },
      date: {
        sqlite: "date",
        postgres: "timestamptz",
        mysql: "timestamp(3)",
        mssql: sql`datetime2(3)`
      },
      json: {
        sqlite: "text",
        postgres: "jsonb",
        mysql: "json",
        mssql: "varchar(8000)"
      },
      id: {
        postgres: useNumberId ? sql`integer GENERATED BY DEFAULT AS IDENTITY` : useUUIDs ? "uuid" : "text",
        mysql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
        mssql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
        sqlite: useNumberId ? "integer" : "text"
      },
      foreignKeyId: {
        postgres: useNumberId ? "integer" : useUUIDs ? "uuid" : "text",
        mysql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
        mssql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
        sqlite: useNumberId ? "integer" : "text"
      },
      "string[]": {
        sqlite: "text",
        postgres: "jsonb",
        mysql: "json",
        mssql: "varchar(8000)"
      },
      "number[]": {
        sqlite: "text",
        postgres: "jsonb",
        mysql: "json",
        mssql: "varchar(8000)"
      }
    };
    if (fieldName === "id" || field.references?.field === "id") {
      if (fieldName === "id") return typeMap.id[provider];
      return typeMap.foreignKeyId[provider];
    }
    if (Array.isArray(type)) return "text";
    if (!(type in typeMap)) throw new Error(`Unsupported field type '${String(type)}' for field '${fieldName}'. Allowed types are: string, number, boolean, date, string[], number[]. If you need to store structured data, store it as a JSON string (type: "string") or split it into primitive fields. See https://better-auth.com/docs/advanced/schema#additional-fields`);
    return typeMap[type][provider];
  }
  const getModelName = initGetModelName({
    schema: authTables,
    usePlural: false
  });
  const getFieldName = initGetFieldName({
    schema: authTables,
    usePlural: false
  });
  function getReferencePath(field) {
    const reference = field.references;
    if (!reference) throw new BetterAuthError("Cannot resolve a field without references.");
    const keys = referenceKeys.get(field);
    if (!keys) throw new BetterAuthError(`Missing migration reference metadata for "${reference.model}.${reference.field}".`);
    try {
      return `${getModelName(keys.modelKey)}.${getFieldName({
        model: keys.modelKey,
        field: keys.fieldKey
      })}`;
    } catch {
      return `${reference.model}.${reference.field}`;
    }
  }
  const deferredIndexes = [];
  const getTableIndexStringLength = (tableName, fieldName) => {
    if (dbType !== "mysql" && dbType !== "mssql") return void 0;
    const table2 = betterAuthSchema[tableName];
    if (!table2) return void 0;
    return getDatabaseIndexStringLength({
      columnName: fieldName,
      dialect: dbType,
      fields: table2.fields,
      indexes: table2.indexes ?? []
    });
  };
  if (toBeAdded.length) {
    const populatedTables = /* @__PURE__ */ new Map();
    for (const table2 of toBeAdded) for (const [fieldName, field] of Object.entries(table2.fields)) {
      const timestampDefault = hasTimestampColumnDefault(field, dbType);
      const staticDefault = hasStaticColumnDefault(field);
      if (field.required !== false && !timestampDefault && !staticDefault) {
        let populated = populatedTables.get(table2.table);
        if (populated === void 0) {
          populated = await tableHasRows(db2, dbType, table2.table);
          populatedTables.set(table2.table, populated);
        }
        if (populated) {
          const textDetail = field.type === "string" ? " For a text column, every existing row ends up with the same empty string." : "";
          reportUnsafeChange(`Cannot add required column "${fieldName}" to populated table "${table2.table}": the schema declares no default value, so existing rows have no value to backfill. MySQL accepts this statement instead of rejecting it and fills every existing row with an implicit default for the column type, reporting a successful migration over corrupted data.${textDetail} Add the column as nullable, backfill a correct value for every row, then make it NOT NULL.`);
        }
      }
      const type = getType(field, fieldName, getTableIndexStringLength(table2.table, fieldName));
      const builder = db2.schema.alterTable(table2.table);
      if (field.index || field.unique) {
        const indexName = getDatabaseFieldIndexName(table2.table, fieldName, field.unique ?? false);
        let indexBuilder = db2.schema.createIndex(indexName).on(table2.table).columns([fieldName]);
        if (field.unique) {
          indexBuilder = indexBuilder.unique();
          if (field.required === false && dbType === "mssql") indexBuilder = indexBuilder.where(fieldName, "is not", null);
          if (field.required !== false && field.defaultValue !== void 0 && field.defaultValue !== null && typeof field.defaultValue !== "function") logger2.warn(`Adding unique column "${fieldName}" to existing table "${table2.table}" backfills every existing row with its default value. If the table has more than one row, creating the unique index "${indexName}" will fail; backfill distinct values manually, then re-run the migration or create the index yourself.`);
        }
        deferredIndexes.push(indexBuilder);
      }
      const built = builder.addColumn(fieldName, type, (col) => {
        col = field.required !== false ? col.notNull() : col;
        if (field.references) col = col.references(getReferencePath(field)).onDelete(field.references.onDelete || "cascade");
        if (timestampDefault) {
          if (dbType === "mysql") col = col.defaultTo(sql`CURRENT_TIMESTAMP(3)`);
          else col = col.defaultTo(sql`CURRENT_TIMESTAMP`);
        } else if (staticDefault) col = col.defaultTo(typeof field.defaultValue === "boolean" && (dbType === "sqlite" || dbType === "mssql") ? field.defaultValue ? 1 : 0 : field.defaultValue);
        return col;
      });
      migrations.push(built);
    }
  }
  if (toBeCreated.length) for (const table2 of toBeCreated) {
    const idType = getType({ type: useNumberId ? "number" : "string" }, "id");
    let dbT = db2.schema.createTable(table2.table).addColumn("id", idType, (col) => {
      if (useNumberId) {
        if (dbType === "postgres") return col.primaryKey().notNull();
        else if (dbType === "sqlite") return col.primaryKey().notNull();
        else if (dbType === "mssql") return col.identity().primaryKey().notNull();
        return col.autoIncrement().primaryKey().notNull();
      }
      if (useUUIDs) {
        if (dbType === "postgres") return col.primaryKey().defaultTo(sql`pg_catalog.gen_random_uuid()`).notNull();
        return col.primaryKey().notNull();
      }
      return col.primaryKey().notNull();
    });
    for (const [fieldName, field] of Object.entries(table2.fields)) {
      const type = getType(field, fieldName, getTableIndexStringLength(table2.table, fieldName));
      dbT = dbT.addColumn(fieldName, type, (col) => {
        col = field.required !== false ? col.notNull() : col;
        if (field.references) col = col.references(getReferencePath(field)).onDelete(field.references.onDelete || "cascade");
        if (field.unique) col = col.unique();
        if (field.type === "date" && typeof field.defaultValue === "function" && (dbType === "postgres" || dbType === "mysql" || dbType === "mssql")) {
          if (dbType === "mysql") col = col.defaultTo(sql`CURRENT_TIMESTAMP(3)`);
          else col = col.defaultTo(sql`CURRENT_TIMESTAMP`);
        }
        return col;
      });
      if (field.index && !field.unique) {
        const builder = db2.schema.createIndex(getDatabaseFieldIndexName(table2.table, fieldName, false)).on(table2.table).columns([fieldName]);
        deferredIndexes.push(builder);
      }
    }
    migrations.push(dbT);
  }
  for (const { table: table2, index, name } of toBeAddedIndexes) {
    let builder = db2.schema.createIndex(name).on(table2).columns([...index.columns]);
    if (index.unique) builder = builder.unique();
    deferredIndexes.push(builder);
  }
  for (const index of deferredIndexes) migrations.push(index);
  async function runMigrations() {
    try {
      for (const migration of migrations) await migration.execute();
    } finally {
      if (migrations.length && config2.database) invalidateSchemaChecks(config2.database);
    }
  }
  async function compileMigrations() {
    return migrations.map((m) => m.compile().sql).join(";\n\n") + ";";
  }
  return {
    toBeCreated,
    toBeAdded,
    toBeAddedIndexes,
    unsafeChanges,
    schemaProblems,
    runMigrations,
    compileMigrations
  };
}

// node_modules/better-auth/dist/auth/trusted-origins.mjs
var CONTROL_CHARACTER_PATTERN = /[\u0000-\u001f\u007f-\u009f]/;
var RELATIVE_URL_PARSER_ORIGIN = "https://better-auth.invalid";
var ENCODED_PATH_SEPARATOR_PATTERN = /%2[fF]|%5[cC]/;
var IP_WILDCARD_HOST_PATTERN = /^(?=.*\d)[\d*?.]+$/;
var ipv4Schema = ipv4();
var isAllowedIPv4Host = (patternAuthority, authority) => {
  const [patternHost = ""] = patternAuthority.split(":");
  if (!IP_WILDCARD_HOST_PATTERN.test(patternHost)) return true;
  const [host = ""] = authority.split(":");
  return validate(ipv4Schema, host);
};
var normalizePath2 = (path2) => {
  let decoded = path2;
  try {
    decoded = decodeURIComponent(path2);
  } catch {
  }
  const segments = [];
  for (const segment of decoded.split("/")) if (segment === "..") segments.pop();
  else if (segment !== "." && segment !== "") segments.push(segment);
  return segments.length > 0 ? `/${segments.join("/")}` : "";
};
var parseCustomSchemeOrigin = (value, wildcardPattern = false) => {
  if (CONTROL_CHARACTER_PATTERN.test(value)) return null;
  const schemeEnd = value.indexOf(":");
  if (schemeEnd <= 0) return null;
  const scheme = value.slice(0, schemeEnd).toLowerCase();
  let rest = value.slice(schemeEnd + 1);
  let authority = "";
  if (rest.startsWith("//")) {
    rest = rest.slice(2);
    const authorityEnd = rest.search(wildcardPattern ? /[/#]/ : /[/?#]/);
    if (authorityEnd === -1) {
      authority = rest;
      rest = "";
    } else {
      authority = rest.slice(0, authorityEnd);
      rest = rest.slice(authorityEnd);
    }
  }
  const pathEnd = rest.search(wildcardPattern ? /#/ : /[?#]/);
  const path2 = normalizePath2(pathEnd === -1 ? rest : rest.slice(0, pathEnd));
  return {
    scheme,
    authority: authority.toLowerCase(),
    path: path2
  };
};
var isSafeRelativeURL = (value) => {
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\") || CONTROL_CHARACTER_PATTERN.test(value)) return false;
  const pathEnd = value.search(/[?#]/);
  const path2 = pathEnd === -1 ? value : value.slice(0, pathEnd);
  if (ENCODED_PATH_SEPARATOR_PATTERN.test(path2)) return false;
  try {
    return new URL(value, RELATIVE_URL_PARSER_ORIGIN).origin === RELATIVE_URL_PARSER_ORIGIN;
  } catch {
    return false;
  }
};
var matchesOriginPattern = (url, pattern, settings) => {
  if (url.startsWith("/")) return settings?.allowRelativePaths === true && isSafeRelativeURL(url);
  const hasWildcard = pattern.includes("*") || pattern.includes("?");
  if (hasWildcard && !pattern.includes("://")) {
    const host = getHost(url);
    if (!host) return false;
    return wildcardMatch(pattern)(host) && isAllowedIPv4Host(pattern, host);
  }
  const protocol = getProtocol(url);
  if (protocol === "http:" || protocol === "https:" || !protocol) {
    if (!hasWildcard) return pattern === getOrigin(url);
    const origin = getOrigin(url);
    if (origin === null || !wildcardMatch(pattern)(origin)) return false;
    return isAllowedIPv4Host(pattern.slice(pattern.indexOf("://") + 3), origin.slice(origin.indexOf("://") + 3));
  }
  const parsed = parseCustomSchemeOrigin(url);
  const parsedPattern = parseCustomSchemeOrigin(pattern, hasWildcard);
  if (!parsed || !parsedPattern || parsed.scheme !== parsedPattern.scheme) return false;
  if (hasWildcard) {
    if (parsed.authority.includes("@")) return false;
    if (parsedPattern.authority && !(wildcardMatch(parsedPattern.authority)(parsed.authority) && isAllowedIPv4Host(parsedPattern.authority, parsed.authority))) return false;
    return !parsedPattern.path || wildcardMatch(parsedPattern.path)(parsed.path || "/");
  }
  if (parsedPattern.authority && parsed.authority !== parsedPattern.authority) return false;
  if (!parsedPattern.path) return true;
  return parsed.path === parsedPattern.path || parsed.path.startsWith(`${parsedPattern.path}/`);
};

// node_modules/@better-auth/core/dist/utils/deprecate.mjs
function deprecate(fn, message2, logger2) {
  let warned = false;
  return function(...args) {
    if (!warned) {
      (logger2?.warn ?? console.warn)(`[Deprecation] ${message2}`);
      warned = true;
    }
    return fn.apply(this, args);
  };
}

// node_modules/better-auth/dist/api/middlewares/origin-check.mjs
function shouldSkipCSRFForBackwardCompat(ctx) {
  return ctx.context.skipOriginCheck === true && ctx.context.options.advanced?.disableCSRFCheck === void 0;
}
function shouldSkipOriginCheck(ctx) {
  const skipOriginCheck = ctx.context.skipOriginCheck;
  if (skipOriginCheck === true) return true;
  if (Array.isArray(skipOriginCheck) && ctx.request) try {
    const basePath = new URL(ctx.context.baseURL).pathname;
    const currentPath = normalizePathname(ctx.request.url, basePath);
    return skipOriginCheck.some((skipPath) => {
      const normalizedSkipPath = skipPath.replace(/\/+$/, "");
      return currentPath === normalizedSkipPath || currentPath.startsWith(`${normalizedSkipPath}/`);
    });
  } catch {
  }
  return false;
}
var logBackwardCompatWarning = deprecate(function logBackwardCompatWarning2() {
}, "disableOriginCheck: true currently also disables CSRF checks. In a future version, disableOriginCheck will ONLY disable URL validation. To keep CSRF disabled, add disableCSRFCheck: true to your config.");
var originCheckMiddleware = createAuthMiddleware(async (ctx) => {
  if (ctx.request?.method === "GET" || ctx.request?.method === "OPTIONS" || ctx.request?.method === "HEAD" || !ctx.request) return;
  await validateOrigin(ctx);
  if (shouldSkipOriginCheck(ctx)) return;
  const { body, query } = ctx;
  const callbackURL = body?.callbackURL || query?.callbackURL;
  const redirectURL = body?.redirectTo;
  const errorCallbackURL = body?.errorCallbackURL;
  const newUserCallbackURL = body?.newUserCallbackURL;
  const validateURL = (url, label) => {
    if (!url) return;
    if (typeof url !== "string") throw APIError2.fromStatus("BAD_REQUEST", { message: `Invalid ${label}: expected a string` });
    if (!ctx.context.isTrustedOrigin(url, { allowRelativePaths: label !== "origin" })) {
      ctx.context.logger.error(`Invalid ${label}: ${url}`);
      ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config
`, `Current list of trustedOrigins: ${ctx.context.trustedOrigins}`);
      if (label === "origin") throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ORIGIN);
      if (label === "callbackURL") throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_CALLBACK_URL);
      if (label === "redirectURL") throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_REDIRECT_URL);
      if (label === "errorCallbackURL") throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ERROR_CALLBACK_URL);
      if (label === "newUserCallbackURL") throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_NEW_USER_CALLBACK_URL);
      throw APIError2.fromStatus("FORBIDDEN", { message: `Invalid ${label}` });
    }
  };
  callbackURL && validateURL(callbackURL, "callbackURL");
  redirectURL && validateURL(redirectURL, "redirectURL");
  errorCallbackURL && validateURL(errorCallbackURL, "errorCallbackURL");
  newUserCallbackURL && validateURL(newUserCallbackURL, "newUserCallbackURL");
});
var originCheck = (getValue) => createAuthMiddleware(async (ctx) => {
  if (!ctx.request) return;
  if (shouldSkipOriginCheck(ctx)) return;
  const callbackURL = getValue(ctx);
  const validateURL = (url, label) => {
    if (!url) return;
    if (!ctx.context.isTrustedOrigin(url, { allowRelativePaths: label !== "origin" })) {
      ctx.context.logger.error(`Invalid ${label}: ${url}`);
      ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config
`, `Current list of trustedOrigins: ${ctx.context.trustedOrigins}`);
      if (label === "origin") throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ORIGIN);
      if (label === "callbackURL") throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_CALLBACK_URL);
      if (label === "redirectURL") throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_REDIRECT_URL);
      if (label === "errorCallbackURL") throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ERROR_CALLBACK_URL);
      if (label === "newUserCallbackURL") throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_NEW_USER_CALLBACK_URL);
      throw APIError2.fromStatus("FORBIDDEN", { message: `Invalid ${label}` });
    }
  };
  const callbacks = Array.isArray(callbackURL) ? callbackURL : [callbackURL];
  for (const url of callbacks) validateURL(url, "callbackURL");
});
async function validateOrigin(ctx, forceValidate = false) {
  const headers = ctx.request?.headers;
  if (!headers || !ctx.request) return;
  const origin = headers.get("origin");
  const originHeader = origin || headers.get("referer") || "";
  const useCookies = headers.has("cookie");
  if (ctx.context.skipCSRFCheck) return;
  if (shouldSkipCSRFForBackwardCompat(ctx)) {
    ctx.context.options.advanced?.disableOriginCheck === true && logBackwardCompatWarning();
    return;
  }
  if (shouldSkipOriginCheck(ctx)) return;
  if (!(forceValidate || useCookies)) return;
  const inferredBaseURL = origin === "null" && headers.get("sec-fetch-site") === "same-origin" ? getBaseURL(void 0, ctx.context.options.basePath, ctx.request, false, ctx.context.options.advanced?.trustedProxyHeaders) : void 0;
  const originToValidate = (inferredBaseURL ? getOrigin(inferredBaseURL) : void 0) ?? originHeader;
  if (!originToValidate || originToValidate === "null") throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.MISSING_OR_NULL_ORIGIN);
  const trustedOrigins = Array.isArray(ctx.context.options.trustedOrigins) ? ctx.context.trustedOrigins : [...ctx.context.trustedOrigins, ...(await ctx.context.options.trustedOrigins?.(ctx.request))?.filter((v) => Boolean(v)) || []];
  if (!trustedOrigins.some((origin2) => matchesOriginPattern(originToValidate, origin2))) {
    ctx.context.logger.error(`Invalid origin: ${originToValidate}`);
    ctx.context.logger.info(`If it's a valid URL, please add ${originToValidate} to trustedOrigins in your auth config
`, `Current list of trustedOrigins: ${trustedOrigins}`);
    throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ORIGIN);
  }
}
var formCsrfMiddleware = createAuthMiddleware(async (ctx) => {
  if (!ctx.request) return;
  await validateFormCsrf(ctx);
});
async function validateFormCsrf(ctx) {
  const req = ctx.request;
  if (!req) return;
  if (ctx.context.skipCSRFCheck) return;
  if (shouldSkipCSRFForBackwardCompat(ctx)) return;
  const headers = req.headers;
  if (headers.has("cookie")) return await validateOrigin(ctx);
  const site = headers.get("Sec-Fetch-Site");
  const mode = headers.get("Sec-Fetch-Mode");
  const dest = headers.get("Sec-Fetch-Dest");
  if (Boolean(site && site.trim() || mode && mode.trim() || dest && dest.trim())) {
    if (site === "cross-site" && mode === "navigate") {
      ctx.context.logger.error("Blocked cross-site navigation login attempt (CSRF protection)", {
        secFetchSite: site,
        secFetchMode: mode,
        secFetchDest: dest
      });
      throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.CROSS_SITE_NAVIGATION_LOGIN_BLOCKED);
    }
    return await validateOrigin(ctx, true);
  }
  if (headers.get("origin") || headers.get("referer")) return await validateOrigin(ctx, true);
}

// node_modules/@better-auth/core/dist/utils/ip.mjs
var ipv4Schema2 = ipv4();
var ipv6Schema = ipv6();
function isValidIP(ip) {
  return isIPv4(ip) || isIPv6(ip);
}
function isIPv4(ip) {
  return validate(ipv4Schema2, ip);
}
function isIPv6(ip) {
  return validate(ipv6Schema, ip);
}
function extractIPv4FromMapped(ipv62) {
  const lower = ipv62.toLowerCase();
  if (lower.startsWith("::ffff:")) {
    const ipv4Part = lower.substring(7);
    if (isIPv4(ipv4Part)) return ipv4Part;
  }
  const parts = ipv62.split(":");
  if (parts.length === 7 && parts[5]?.toLowerCase() === "ffff") {
    const ipv4Part = parts[6];
    if (ipv4Part && isIPv4(ipv4Part)) return ipv4Part;
  }
  if (lower.includes("::ffff:") || lower.includes(":ffff:")) {
    const groups = expandIPv6(ipv62);
    if (groups.length === 8 && groups[0] === "0000" && groups[1] === "0000" && groups[2] === "0000" && groups[3] === "0000" && groups[4] === "0000" && groups[5] === "ffff" && groups[6] && groups[7]) return `${Number.parseInt(groups[6].substring(0, 2), 16)}.${Number.parseInt(groups[6].substring(2, 4), 16)}.${Number.parseInt(groups[7].substring(0, 2), 16)}.${Number.parseInt(groups[7].substring(2, 4), 16)}`;
  }
  return null;
}
function replaceDottedIPv4Tail(ipv62) {
  const tailStart = ipv62.lastIndexOf(":") + 1;
  const tail = ipv62.slice(tailStart);
  if (!isIPv4(tail)) return ipv62;
  const [a = 0, b = 0, c = 0, d = 0] = tail.split(".").map(Number);
  const high = (a << 8 | b).toString(16);
  const low = (c << 8 | d).toString(16);
  return `${ipv62.slice(0, tailStart)}${high}:${low}`;
}
function expandIPv6(input) {
  const ipv62 = replaceDottedIPv4Tail(input);
  if (ipv62.includes("::")) {
    const sides = ipv62.split("::");
    const left = sides[0] ? sides[0].split(":") : [];
    const right = sides[1] ? sides[1].split(":") : [];
    const missingGroups = 8 - left.length - right.length;
    const zeros = Array(missingGroups).fill("0000");
    const paddedLeft = left.map((g) => g.padStart(4, "0"));
    const paddedRight = right.map((g) => g.padStart(4, "0"));
    return [
      ...paddedLeft,
      ...zeros,
      ...paddedRight
    ];
  }
  return ipv62.split(":").map((g) => g.padStart(4, "0"));
}
function normalizeIPv6(ipv62, subnetPrefix) {
  const groups = expandIPv6(ipv62);
  if (subnetPrefix !== void 0 && subnetPrefix < 128) {
    let bitsRemaining = Math.max(0, Math.floor(subnetPrefix));
    return groups.map((group) => {
      if (bitsRemaining <= 0) return "0000";
      if (bitsRemaining >= 16) {
        bitsRemaining -= 16;
        return group;
      }
      const masked = Number.parseInt(group, 16) & (65535 << 16 - bitsRemaining & 65535);
      bitsRemaining = 0;
      return masked.toString(16).padStart(4, "0");
    }).join(":").toLowerCase();
  }
  return groups.join(":").toLowerCase();
}
function normalizeIP(ip, options = {}) {
  if (isIPv4(ip)) return ip.toLowerCase();
  if (!isIPv6(ip)) return ip.toLowerCase();
  const ipv42 = extractIPv4FromMapped(ip);
  if (ipv42) return ipv42.toLowerCase();
  return normalizeIPv6(ip, options.ipv6Subnet ?? 64);
}
function ipToBytes(ip) {
  if (isIPv4(ip)) return Uint8Array.from(ip.split(".").map((octet) => Number(octet)));
  if (!isIPv6(ip)) return null;
  const mapped = extractIPv4FromMapped(ip);
  if (mapped) return Uint8Array.from(mapped.split(".").map((octet) => Number(octet)));
  const groups = expandIPv6(ip);
  const bytes = /* @__PURE__ */ new Uint8Array(16);
  for (let i = 0; i < 8; i++) {
    const group = Number.parseInt(groups[i] ?? "0", 16);
    bytes[i * 2] = group >> 8 & 255;
    bytes[i * 2 + 1] = group & 255;
  }
  return bytes;
}
var CIDR_PREFIX_PATTERN = /^\d+$/;
function parseCIDR(value) {
  const slash = value.lastIndexOf("/");
  const bytes = ipToBytes(slash === -1 ? value : value.slice(0, slash));
  if (!bytes) return null;
  const maxBits = bytes.length * 8;
  if (slash === -1) return {
    bytes,
    prefix: maxBits
  };
  const prefixPart = value.slice(slash + 1);
  if (!CIDR_PREFIX_PATTERN.test(prefixPart)) return null;
  const prefix = Number(prefixPart);
  return prefix <= maxBits ? {
    bytes,
    prefix
  } : null;
}
function matchesCIDR(ipBytes, net) {
  if (ipBytes.length !== net.bytes.length) return false;
  let bitsRemaining = net.prefix;
  for (let i = 0; i < ipBytes.length && bitsRemaining > 0; i++) {
    const take = bitsRemaining >= 8 ? 8 : bitsRemaining;
    const mask = take === 8 ? 255 : 255 << 8 - take & 255;
    if (((ipBytes[i] ?? 0) & mask) !== ((net.bytes[i] ?? 0) & mask)) return false;
    bitsRemaining -= 8;
  }
  return true;
}
function findInvalidTrustedProxies(entries) {
  return entries.filter((entry) => parseCIDR(entry) === null);
}
function getIPFromHeader(value, options = {}) {
  const forwardedIps = value.split(",").map((ip) => ip.trim()).filter(Boolean);
  if (forwardedIps.length === 0) return null;
  const trustedProxies = (options.trustedProxies ?? []).map(parseCIDR).filter((proxy) => {
    return proxy !== null;
  });
  if (trustedProxies.length > 0) {
    for (let i = forwardedIps.length - 1; i >= 0; i--) {
      const ip = forwardedIps[i];
      const ipBytes = ip ? ipToBytes(ip) : null;
      if (!ip || !ipBytes) return null;
      if (trustedProxies.some((proxy) => matchesCIDR(ipBytes, proxy))) continue;
      return normalizeIP(ip, { ipv6Subnet: options.ipv6Subnet });
    }
    return null;
  }
  if (forwardedIps.length !== 1) return null;
  const selectedIp = forwardedIps[0];
  if (!selectedIp || !isValidIP(selectedIp)) return null;
  return normalizeIP(selectedIp, { ipv6Subnet: options.ipv6Subnet });
}
var LOCALHOST_IP = "127.0.0.1";
var DEFAULT_IP_HEADERS = ["x-forwarded-for"];
function getIP(req, options) {
  if (options.advanced?.ipAddress?.disableIpTracking) return null;
  const headers = "headers" in req ? req.headers : req;
  const ipHeaders = options.advanced?.ipAddress?.ipAddressHeaders || DEFAULT_IP_HEADERS;
  for (const key of ipHeaders) {
    const value = "get" in headers ? headers.get(key) : headers[key];
    if (typeof value === "string") {
      const ip = getIPFromHeader(value, {
        ipv6Subnet: options.advanced?.ipAddress?.ipv6Subnet,
        trustedProxies: options.advanced?.ipAddress?.trustedProxies
      });
      if (ip) return ip;
    }
  }
  if (isTest() || isDevelopment()) return LOCALHOST_IP;
  return null;
}
function createRateLimitKey(ip, path2) {
  return `${ip}|${path2}`;
}

// node_modules/better-auth/dist/api/rate-limiter/index.mjs
var memory = /* @__PURE__ */ new Map();
var MEMORY_STORE_MAX_ENTRIES = 1e5;
function pruneMemoryStore() {
  const now2 = Date.now();
  for (const [key, entry] of memory) if (now2 >= entry.expiresAt) memory.delete(key);
  if (memory.size <= MEMORY_STORE_MAX_ENTRIES) return;
  const overflow = memory.size - MEMORY_STORE_MAX_ENTRIES;
  let removed = 0;
  for (const key of memory.keys()) {
    memory.delete(key);
    if (++removed >= overflow) break;
  }
}
function decideConsume(data, rule, now2) {
  const windowInMs = rule.window * 1e3;
  if (!data) return {
    next: {
      key: "",
      count: 1,
      lastRequest: now2
    },
    update: false,
    allowed: true,
    retryAfter: null
  };
  if (now2 - data.lastRequest >= windowInMs) return {
    next: {
      ...data,
      count: 1,
      lastRequest: now2
    },
    update: true,
    allowed: true,
    retryAfter: null
  };
  if (data.count >= rule.max) return {
    next: data,
    update: true,
    allowed: false,
    retryAfter: getRetryAfter(data.lastRequest, rule.window)
  };
  return {
    next: {
      ...data,
      count: data.count + 1,
      lastRequest: now2
    },
    update: true,
    allowed: true,
    retryAfter: null
  };
}
function rateLimitResponse(retryAfter) {
  return new Response(JSON.stringify({ message: "Too many requests. Please try again later." }), {
    status: 429,
    statusText: "Too Many Requests",
    headers: {
      "Content-Type": "application/json",
      "X-Retry-After": retryAfter.toString()
    }
  });
}
function getRetryAfter(lastRequest, window2) {
  const now2 = Date.now();
  const windowInMs = window2 * 1e3;
  return Math.ceil((lastRequest + windowInMs - now2) / 1e3);
}
function createDatabaseStorageWrapper(ctx) {
  const model = "rateLimit";
  const db2 = ctx.adapter;
  let longestObservedWindow = Math.max(...getConfiguredRateLimitWindows(ctx));
  const readRow = async (key) => {
    const data = (await db2.findMany({
      model,
      where: [{
        field: "key",
        value: key
      }]
    }))[0];
    if (data) data.lastRequest = Number(data.lastRequest);
    return data;
  };
  const consume = async (key, rule) => {
    if (rule.window > longestObservedWindow) longestObservedWindow = rule.window;
    const windowInMs = rule.window * 1e3;
    const data = await readRow(key);
    const now2 = Date.now();
    if (!data) try {
      await db2.create({
        model,
        data: {
          key,
          count: 1,
          lastRequest: now2
        }
      });
      return {
        allowed: true,
        retryAfter: null
      };
    } catch (error2) {
      if (!await readRow(key)) throw error2;
      return consume(key, rule);
    }
    if (now2 - data.lastRequest >= windowInMs) {
      if (await db2.incrementOne({
        model,
        where: [{
          field: "key",
          value: key
        }, {
          field: "lastRequest",
          operator: "lte",
          value: data.lastRequest
        }],
        increment: {},
        set: {
          count: 1,
          lastRequest: now2
        }
      })) {
        await deleteExpiredRows(now2);
        return {
          allowed: true,
          retryAfter: null
        };
      }
      return consume(key, rule);
    }
    const windowStart = now2 - windowInMs;
    if (await db2.incrementOne({
      model,
      where: [
        {
          field: "key",
          value: key
        },
        {
          field: "lastRequest",
          operator: "gt",
          value: windowStart
        },
        {
          field: "count",
          operator: "lt",
          value: rule.max
        }
      ],
      increment: { count: 1 },
      set: { lastRequest: now2 }
    })) return {
      allowed: true,
      retryAfter: null
    };
    const fresh = await readRow(key);
    if (!fresh) return consume(key, rule);
    if (now2 - fresh.lastRequest >= windowInMs) return consume(key, rule);
    return {
      allowed: false,
      retryAfter: getRetryAfter(fresh.lastRequest, rule.window)
    };
  };
  const deleteExpiredRows = async (now2) => {
    const cutoff = now2 - longestObservedWindow * 1e3;
    await ctx.runInBackgroundOrAwait(db2.deleteMany({
      model,
      where: [{
        field: "lastRequest",
        operator: "lt",
        value: cutoff
      }]
    }).then(() => void 0).catch((e) => ctx.logger.error("Error pruning rate limit rows", e)));
  };
  return { consume };
}
function getConfiguredRateLimitWindows(ctx) {
  const windows = [ctx.rateLimit.window, ...getDefaultSpecialRules().map((rule) => rule.window)];
  for (const plugin of ctx.options.plugins || []) if (plugin.rateLimit) windows.push(...plugin.rateLimit.map((rule) => rule.window));
  if (ctx.rateLimit.customRules) {
    for (const customRule of Object.values(ctx.rateLimit.customRules)) if (customRule && typeof customRule !== "function") windows.push(customRule.window);
  }
  const validWindows = windows.filter((window2) => Number.isFinite(window2) && window2 > 0);
  return validWindows.length > 0 ? validWindows : [ctx.rateLimit.window];
}
function getRateLimitStorage(ctx, rateLimitSettings) {
  if (ctx.options.rateLimit?.customStorage) return ctx.options.rateLimit.customStorage;
  const storage2 = ctx.rateLimit.storage;
  if (storage2 === "secondary-storage") {
    const ttlFor = (window2) => window2 ?? ctx.options.rateLimit?.window ?? 10;
    const increment = ctx.options.secondaryStorage?.increment;
    if (!increment) throw new BetterAuthError("Secondary-storage rate limiting requires SecondaryStorage.increment.");
    return { consume: async (key, rule) => {
      if (await increment(key, ttlFor(rule.window)) <= rule.max) return {
        allowed: true,
        retryAfter: null
      };
      return {
        allowed: false,
        retryAfter: rule.window
      };
    } };
  } else if (storage2 === "memory") {
    const ttlFor = (window2) => window2 ?? ctx.options.rateLimit?.window ?? 10;
    return { async consume(key, rule) {
      pruneMemoryStore();
      const now2 = Date.now();
      const entry = memory.get(key);
      const decision = decideConsume(entry && now2 < entry.expiresAt ? entry.data : void 0, rule, now2);
      if (decision.allowed) memory.set(key, {
        data: {
          ...decision.next,
          key
        },
        expiresAt: now2 + ttlFor(rule.window) * 1e3
      });
      return {
        allowed: decision.allowed,
        retryAfter: decision.retryAfter
      };
    } };
  }
  return createDatabaseStorageWrapper(ctx);
}
var ipWarningLogged = false;
var NO_TRUSTED_IP_KEY = "no-trusted-ip";
async function resolveRateLimitConfig(req, ctx) {
  const basePath = new URL(ctx.baseURL).pathname;
  const path2 = normalizePathname(req.url, basePath);
  let currentWindow = ctx.rateLimit.window;
  let currentMax = ctx.rateLimit.max;
  const ip = getIP(req, ctx.options);
  if (!ip && ctx.options.advanced?.ipAddress?.disableIpTracking) return null;
  if (!ip && !ipWarningLogged) {
    ctx.logger.warn("Rate limiting could not determine a client IP and is falling back to a single shared per-path bucket. Ensure your runtime forwards a trusted client IP header, then set `advanced.ipAddress.ipAddressHeaders` or `advanced.ipAddress.trustedProxies` so the address can be resolved.");
    ipWarningLogged = true;
  }
  const key = createRateLimitKey(ip ?? NO_TRUSTED_IP_KEY, path2);
  const specialRule = getDefaultSpecialRules().find((rule) => rule.pathMatcher(path2));
  if (specialRule) {
    currentWindow = specialRule.window;
    currentMax = specialRule.max;
  }
  for (const plugin of ctx.options.plugins || []) if (plugin.rateLimit) {
    const matchedRule = plugin.rateLimit.find((rule) => rule.pathMatcher(path2));
    if (matchedRule) {
      currentWindow = matchedRule.window;
      currentMax = matchedRule.max;
      break;
    }
  }
  if (ctx.rateLimit.customRules) {
    const _path = Object.keys(ctx.rateLimit.customRules).find((p) => {
      if (p.includes("*")) return wildcardMatch(p)(path2);
      return p === path2;
    });
    if (_path) {
      const customRule = ctx.rateLimit.customRules[_path];
      const resolved = typeof customRule === "function" ? await customRule(req, {
        window: currentWindow,
        max: currentMax
      }) : customRule;
      if (resolved) {
        currentWindow = resolved.window;
        currentMax = resolved.max;
      }
      if (resolved === false) return null;
    }
  }
  return {
    key,
    currentWindow,
    currentMax
  };
}
async function onRequestRateLimit(req, ctx) {
  if (!ctx.rateLimit.enabled) return;
  const config2 = await resolveRateLimitConfig(req, ctx);
  if (!config2) return;
  const { key, currentWindow, currentMax } = config2;
  const storage2 = getRateLimitStorage(ctx, { window: currentWindow });
  const rule = {
    window: currentWindow,
    max: currentMax
  };
  const { allowed, retryAfter } = await storage2.consume(key, rule);
  if (!allowed) return rateLimitResponse(retryAfter ?? currentWindow);
}
function getDefaultSpecialRules() {
  return [{
    pathMatcher(path2) {
      return path2.startsWith("/sign-in") || path2.startsWith("/sign-up") || path2.startsWith("/change-password") || path2.startsWith("/change-email");
    },
    window: 10,
    max: 3
  }, {
    pathMatcher(path2) {
      return path2 === "/request-password-reset" || path2 === "/send-verification-email" || path2.startsWith("/forget-password") || path2 === "/email-otp/send-verification-otp" || path2 === "/email-otp/request-password-reset";
    },
    window: 60,
    max: 3
  }];
}

// node_modules/better-auth/dist/utils/validate-user-info.mjs
function assertValidUserInfoSource(source) {
  if (!source?.method) throw new APIError2("FORBIDDEN", {
    code: "validation_source_missing",
    message: "User validation source is required"
  });
  if (source.method === "oauth" && !source.oauth?.providerId) throw new APIError2("FORBIDDEN", {
    code: "validation_source_missing",
    message: "OAuth user validation source requires oauth.providerId"
  });
  if ((source.method === "sso-oidc" || source.method === "sso-saml") && !source.sso?.providerId) throw new APIError2("FORBIDDEN", {
    code: "validation_source_missing",
    message: "SSO user validation source requires sso.providerId"
  });
}
async function assertValidUserInfo(ctx, data) {
  const validate2 = ctx.context.options.user?.validateUserInfo;
  if (!validate2) return;
  assertValidUserInfoSource(data.source);
  let result;
  try {
    result = await validate2(data, ctx);
  } catch (error2) {
    ctx.context.logger.error("validateUserInfo callback threw", error2);
    throw new APIError2("FORBIDDEN", {
      code: "validation_failed",
      message: "User validation failed"
    });
  }
  if (result?.error) throw new APIError2("FORBIDDEN", {
    code: result.error,
    message: result.errorDescription || result.error
  });
}

// node_modules/better-auth/dist/db/verification-token-storage.mjs
var defaultKeyHasher = async (identifier) => {
  const hash = await createHash("SHA-256").digest(new TextEncoder().encode(identifier));
  return base64Url.encode(new Uint8Array(hash), { padding: false });
};
async function processIdentifier(identifier, option) {
  if (!option || option === "plain") return identifier;
  if (option === "hashed") return defaultKeyHasher(identifier);
  if (typeof option === "object" && "hash" in option) return option.hash(identifier);
  return identifier;
}
function getStorageOption(identifier, config2) {
  if (!config2) return;
  if (typeof config2 === "object" && "default" in config2) {
    if (config2.overrides) {
      for (const [prefix, option] of Object.entries(config2.overrides)) if (identifier.startsWith(prefix)) return option;
    }
    return config2.default;
  }
  return config2;
}

// node_modules/better-auth/dist/db/with-hooks.mjs
function getWithHooks(adapter, ctx) {
  const withSpan = createWithSpan(ctx.options);
  const hooksEntries = ctx.hooks;
  async function createWithHooks(data, model, customCreateFn) {
    const context = tryGetCurrentAuthEndpointContext();
    let actualData = data;
    for (const { source, hooks } of hooksEntries) {
      const toRun = hooks[model]?.create?.before;
      if (toRun) {
        const result = await withSpan(`db create.before ${model}`, {
          [ATTR_HOOK_TYPE]: "create.before",
          [ATTR_DB_COLLECTION_NAME]: model,
          [ATTR_CONTEXT]: source
        }, () => toRun(actualData, context));
        if (result === false) return null;
        if (typeof result === "object" && "data" in result) actualData = {
          ...actualData,
          ...result.data
        };
      }
    }
    let created = null;
    if (!customCreateFn || customCreateFn.executeMainFn) created = await (await getCurrentAdapter(adapter)).create({
      model,
      data: actualData,
      forceAllowId: true
    });
    if (customCreateFn?.fn) created = await customCreateFn.fn(created ?? actualData);
    for (const { source, hooks } of hooksEntries) {
      const toRun = hooks[model]?.create?.after;
      if (toRun) await queueAfterTransactionHook(async () => {
        await withSpan(`db create.after ${model}`, {
          [ATTR_HOOK_TYPE]: "create.after",
          [ATTR_DB_COLLECTION_NAME]: model,
          [ATTR_CONTEXT]: source
        }, () => toRun(created, context));
      });
    }
    return created;
  }
  async function updateWithHooks(data, where, model, customUpdateFn) {
    const context = tryGetCurrentAuthEndpointContext();
    let actualData = data;
    for (const { source, hooks } of hooksEntries) {
      const toRun = hooks[model]?.update?.before;
      if (toRun) {
        const result = await withSpan(`db update.before ${model}`, {
          [ATTR_HOOK_TYPE]: "update.before",
          [ATTR_DB_COLLECTION_NAME]: model,
          [ATTR_CONTEXT]: source
        }, () => toRun(data, context));
        if (result === false) return null;
        if (typeof result === "object" && "data" in result) actualData = {
          ...actualData,
          ...result.data
        };
      }
    }
    const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
    const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (await getCurrentAdapter(adapter)).update({
      model,
      update: actualData,
      where
    }) : customUpdated;
    for (const { source, hooks } of hooksEntries) {
      const toRun = hooks[model]?.update?.after;
      if (toRun) await queueAfterTransactionHook(async () => {
        await withSpan(`db update.after ${model}`, {
          [ATTR_HOOK_TYPE]: "update.after",
          [ATTR_DB_COLLECTION_NAME]: model,
          [ATTR_CONTEXT]: source
        }, () => toRun(updated, context));
      });
    }
    return updated;
  }
  async function updateManyWithHooks(data, where, model, customUpdateFn) {
    const context = tryGetCurrentAuthEndpointContext();
    let actualData = data;
    for (const { source, hooks } of hooksEntries) {
      const toRun = hooks[model]?.update?.before;
      if (toRun) {
        const result = await withSpan(`db updateMany.before ${model}`, {
          [ATTR_HOOK_TYPE]: "updateMany.before",
          [ATTR_DB_COLLECTION_NAME]: model,
          [ATTR_CONTEXT]: source
        }, () => toRun(data, context));
        if (result === false) return null;
        if (typeof result === "object" && "data" in result) actualData = {
          ...actualData,
          ...result.data
        };
      }
    }
    const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
    const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (await getCurrentAdapter(adapter)).updateMany({
      model,
      update: actualData,
      where
    }) : customUpdated;
    for (const { source, hooks } of hooksEntries) {
      const toRun = hooks[model]?.update?.after;
      if (toRun) await queueAfterTransactionHook(async () => {
        await withSpan(`db updateMany.after ${model}`, {
          [ATTR_HOOK_TYPE]: "updateMany.after",
          [ATTR_DB_COLLECTION_NAME]: model,
          [ATTR_CONTEXT]: source
        }, () => toRun(updated, context));
      });
    }
    return updated;
  }
  async function deleteWithHooks(where, model, customDeleteFn) {
    const context = tryGetCurrentAuthEndpointContext();
    let entityToDelete = null;
    try {
      entityToDelete = (await (await getCurrentAdapter(adapter)).findMany({
        model,
        where,
        limit: 1
      }))[0] || null;
    } catch {
    }
    if (entityToDelete) for (const { source, hooks } of hooksEntries) {
      const toRun = hooks[model]?.delete?.before;
      if (toRun) {
        if (await withSpan(`db delete.before ${model}`, {
          [ATTR_HOOK_TYPE]: "delete.before",
          [ATTR_DB_COLLECTION_NAME]: model,
          [ATTR_CONTEXT]: source
        }, () => toRun(entityToDelete, context)) === false) return null;
      }
    }
    const customDeleted = customDeleteFn ? await customDeleteFn.fn(where) : null;
    const deleted = (!customDeleteFn || customDeleteFn.executeMainFn) && entityToDelete ? await (await getCurrentAdapter(adapter)).delete({
      model,
      where
    }) : customDeleted;
    if (entityToDelete) for (const { source, hooks } of hooksEntries) {
      const toRun = hooks[model]?.delete?.after;
      if (toRun) await queueAfterTransactionHook(async () => {
        await withSpan(`db delete.after ${model}`, {
          [ATTR_HOOK_TYPE]: "delete.after",
          [ATTR_DB_COLLECTION_NAME]: model,
          [ATTR_CONTEXT]: source
        }, () => toRun(entityToDelete, context));
      });
    }
    return deleted;
  }
  async function deleteManyWithHooks(where, model, customDeleteFn) {
    const context = tryGetCurrentAuthEndpointContext();
    let entitiesToDelete = [];
    try {
      entitiesToDelete = await (await getCurrentAdapter(adapter)).findMany({
        model,
        where
      });
    } catch {
    }
    for (const entity of entitiesToDelete) for (const { source, hooks } of hooksEntries) {
      const toRun = hooks[model]?.delete?.before;
      if (toRun) {
        if (await withSpan(`db delete.before ${model}`, {
          [ATTR_HOOK_TYPE]: "delete.before",
          [ATTR_DB_COLLECTION_NAME]: model,
          [ATTR_CONTEXT]: source
        }, () => toRun(entity, context)) === false) return null;
      }
    }
    const customDeleted = customDeleteFn ? await customDeleteFn.fn(where) : null;
    const deleted = !customDeleteFn || customDeleteFn.executeMainFn ? await (await getCurrentAdapter(adapter)).deleteMany({
      model,
      where
    }) : customDeleted;
    for (const entity of entitiesToDelete) for (const { source, hooks } of hooksEntries) {
      const toRun = hooks[model]?.delete?.after;
      if (toRun) await queueAfterTransactionHook(async () => {
        await withSpan(`db delete.after ${model}`, {
          [ATTR_HOOK_TYPE]: "delete.after",
          [ATTR_DB_COLLECTION_NAME]: model,
          [ATTR_CONTEXT]: source
        }, () => toRun(entity, context));
      });
    }
    return deleted;
  }
  async function consumeOneWithHooks(model, hookWhere, consumeFn, preSnapshot) {
    const context = tryGetCurrentAuthEndpointContext();
    const beforeHooks = hooksEntries.flatMap(({ source, hooks }) => {
      const fn = hooks[model]?.delete?.before;
      return fn ? [{
        source,
        fn
      }] : [];
    });
    let snapshot = preSnapshot ?? null;
    if (beforeHooks.length) {
      if (!snapshot) try {
        snapshot = (await (await getCurrentAdapter(adapter)).findMany({
          model,
          where: hookWhere,
          limit: 1
        }))[0] || null;
      } catch {
      }
      if (snapshot) {
        for (const { source, fn } of beforeHooks) if (await withSpan(`db delete.before ${model}`, {
          [ATTR_HOOK_TYPE]: "delete.before",
          [ATTR_DB_COLLECTION_NAME]: model,
          [ATTR_CONTEXT]: source
        }, () => fn(snapshot, context)) === false) return null;
      }
    }
    const consumed = await consumeFn();
    if (!consumed) return null;
    for (const { source, hooks } of hooksEntries) {
      const toRun = hooks[model]?.delete?.after;
      if (toRun) await queueAfterTransactionHook(async () => {
        await withSpan(`db delete.after ${model}`, {
          [ATTR_HOOK_TYPE]: "delete.after",
          [ATTR_DB_COLLECTION_NAME]: model,
          [ATTR_CONTEXT]: source
        }, () => toRun(consumed, context));
      });
    }
    return consumed;
  }
  return {
    createWithHooks,
    updateWithHooks,
    updateManyWithHooks,
    deleteWithHooks,
    deleteManyWithHooks,
    consumeOneWithHooks
  };
}

// node_modules/better-auth/dist/db/internal-adapter.mjs
function getTTLSeconds(expiresAt, now2 = Date.now()) {
  const expiresMs = typeof expiresAt === "number" ? expiresAt : expiresAt.getTime();
  return Math.max(Math.floor((expiresMs - now2) / 1e3), 0);
}
var VERIFICATION_CLEANUP_INTERVAL_MS = 6e4;
var createInternalAdapter = (adapter, ctx) => {
  const logger2 = ctx.logger;
  const options = ctx.options;
  const secondaryStorage = options.secondaryStorage;
  const verificationConsumeLocks = /* @__PURE__ */ new Map();
  let nextVerificationCleanupAt = 0;
  const sessionExpiration = options.session?.expiresIn || 604800;
  const databaseSessionFallbackEnabled = !!secondaryStorage && options.session?.storeSessionInDatabase === true && options.session?.preserveSessionInDatabase !== true;
  const { createWithHooks, updateWithHooks, updateManyWithHooks, deleteWithHooks, deleteManyWithHooks, consumeOneWithHooks } = getWithHooks(adapter, ctx);
  const endPreservedSessions = (where, afterEnd) => {
    const liveSessions = [...where, {
      field: "expiresAt",
      value: /* @__PURE__ */ new Date(),
      operator: "gt"
    }];
    return deleteManyWithHooks(liveSessions, "session", {
      fn: async () => {
        await (await getCurrentAdapter(adapter)).updateMany({
          model: "session",
          where: liveSessions,
          update: { expiresAt: /* @__PURE__ */ new Date() }
        });
        await afterEnd?.();
      },
      executeMainFn: false
    });
  };
  async function refreshUserSessions(user) {
    if (!secondaryStorage) return;
    const listRaw = await secondaryStorage.get(`active-sessions-${user.id}`);
    if (!listRaw) return;
    const now2 = Date.now();
    const validSessions = (safeJSONParse(listRaw) || []).filter((s) => s.expiresAt > now2);
    await Promise.all(validSessions.map(async ({ token }) => {
      const cached2 = await secondaryStorage.get(token);
      if (!cached2) return;
      const parsed = safeJSONParse(cached2);
      if (!parsed) return;
      const sessionTTL = getTTLSeconds(parsed.session.expiresAt, now2);
      await secondaryStorage.set(token, JSON.stringify({
        session: parsed.session,
        user
      }), Math.floor(sessionTTL));
    }));
  }
  async function getActiveSessionReferences(userId) {
    if (!secondaryStorage) return [];
    const activeSessions = await secondaryStorage.get(`active-sessions-${userId}`);
    return activeSessions ? safeJSONParse(activeSessions) || [] : [];
  }
  async function setActiveSessionReferences(userId, sessionReferences, now2) {
    if (!secondaryStorage) return;
    const sorted = [...sessionReferences].sort((a, b) => a.expiresAt - b.expiresAt);
    const ttl = getTTLSeconds(sorted.at(-1)?.expiresAt ?? 0, now2);
    if (ttl > 0) {
      await secondaryStorage.set(`active-sessions-${userId}`, JSON.stringify(sorted), ttl);
      return;
    }
    await secondaryStorage.delete(`active-sessions-${userId}`);
  }
  const revokedBeforeKey = (userId) => `revoked-sessions-before-${userId}`;
  const revokedBeforeTTL = Math.max(sessionExpiration, 86400, Number(options.plugins?.find((plugin) => plugin.id === "admin")?.options?.impersonationSessionDuration) || 0);
  async function isRevokedSession(session, revokedBeforeByUser) {
    if (!secondaryStorage) return false;
    const revokedBefore = revokedBeforeByUser?.get(session.userId) ?? Number(await secondaryStorage.get(revokedBeforeKey(session.userId)));
    revokedBeforeByUser?.set(session.userId, revokedBefore);
    return new Date(session.createdAt).getTime() < revokedBefore;
  }
  async function deleteCachedUserSessions(userId, sessionReferences, revokedAt) {
    if (!secondaryStorage) return;
    const previousRevokedBefore = Number(await secondaryStorage.get(revokedBeforeKey(userId)));
    await secondaryStorage.set(revokedBeforeKey(userId), String(Math.max(revokedAt, previousRevokedBefore || 0)), revokedBeforeTTL);
    const deletedTokens = new Set(sessionReferences.map((session) => session.token));
    for (const token of deletedTokens) await secondaryStorage.delete(token);
    const currentSessionReferences = await getActiveSessionReferences(userId);
    const now2 = Date.now();
    await setActiveSessionReferences(userId, currentSessionReferences.filter((session) => session.expiresAt > now2 && !deletedTokens.has(session.token)), now2);
  }
  async function queueCachedUserSessionDeletion(userId, sessionReferences) {
    if (!secondaryStorage) return;
    const references = sessionReferences ?? await getActiveSessionReferences(userId);
    const revokedAt = Date.now();
    await queueAfterTransactionHook(() => deleteCachedUserSessions(userId, references, revokedAt), { onError(error2) {
      logger2.error("Failed to delete committed user sessions from secondary storage", error2);
    } });
  }
  async function withVerificationConsumeLock(key, fn) {
    if (isWorkerd()) return fn();
    const previous = verificationConsumeLocks.get(key) ?? Promise.resolve();
    let release;
    const current = new Promise((resolve) => {
      release = resolve;
    });
    const next = previous.catch(() => {
    }).then(() => current);
    verificationConsumeLocks.set(key, next);
    await previous.catch(() => {
    });
    try {
      return await fn();
    } finally {
      release();
      if (verificationConsumeLocks.get(key) === next) verificationConsumeLocks.delete(key);
    }
  }
  return {
    createOAuthUser: async (user, account) => {
      return runWithTransaction(adapter, async () => {
        const createdUser = await createWithHooks({
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          ...user,
          email: user.email?.toLowerCase()
        }, "user", void 0);
        if (!createdUser) throw new APIError2("BAD_REQUEST", { message: "Failed to create user" });
        return {
          user: createdUser,
          account: await createWithHooks({
            ...account,
            userId: createdUser.id,
            createdAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          }, "account", void 0)
        };
      });
    },
    createUser: async (user, source) => {
      const data = {
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...user,
        email: user.email?.toLowerCase()
      };
      if (options.user?.validateUserInfo) {
        const validationSource = {
          ...source,
          action: "create-user"
        };
        assertValidUserInfoSource(validationSource);
        let endpointContext;
        try {
          endpointContext = getCurrentAuthEndpointContext();
        } catch (error2) {
          logger2.error("Unable to run validateUserInfo: missing endpoint context", error2);
          throw new APIError2("FORBIDDEN", {
            code: "validation_context_missing",
            message: "User validation requires an endpoint context"
          });
        }
        await assertValidUserInfo(endpointContext, {
          user: data,
          source: validationSource
        });
      }
      return await createWithHooks(data, "user", void 0);
    },
    createAccount: async (account) => {
      return await createWithHooks({
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...account
      }, "account", void 0);
    },
    listSessions: async (userId, options2) => {
      if (databaseSessionFallbackEnabled) return (await (await getCurrentAdapter(adapter)).findMany({
        model: "session",
        where: [{
          field: "userId",
          value: userId
        }, {
          field: "expiresAt",
          value: /* @__PURE__ */ new Date(),
          operator: "gt"
        }]
      })).map((session) => parseSessionOutput(ctx.options, session));
      if (secondaryStorage) {
        const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
        if (!currentList) return [];
        const list = safeJSONParse(currentList) || [];
        const now2 = Date.now();
        const seenTokens = /* @__PURE__ */ new Set();
        const sessions = [];
        const revokedBeforeByUser = /* @__PURE__ */ new Map();
        for (const { token, expiresAt } of list) {
          if (expiresAt <= now2 || seenTokens.has(token)) continue;
          seenTokens.add(token);
          const data = await secondaryStorage.get(token);
          if (!data) continue;
          try {
            const parsed = typeof data === "string" ? JSON.parse(data) : data;
            if (!parsed?.session || await isRevokedSession(parsed.session, revokedBeforeByUser)) continue;
            sessions.push(parseSessionOutput(ctx.options, {
              ...parsed.session,
              expiresAt: new Date(parsed.session.expiresAt)
            }));
          } catch {
            continue;
          }
        }
        return sessions;
      }
      return await (await getCurrentAdapter(adapter)).findMany({
        model: "session",
        where: [{
          field: "userId",
          value: userId
        }, ...options2?.onlyActiveSessions ? [{
          field: "expiresAt",
          value: /* @__PURE__ */ new Date(),
          operator: "gt"
        }] : []]
      });
    },
    listUsers: async (limit, offset, sortBy, where) => {
      return await (await getCurrentAdapter(adapter)).findMany({
        model: "user",
        limit,
        offset,
        sortBy,
        where
      });
    },
    countTotalUsers: async (where) => {
      const total = await (await getCurrentAdapter(adapter)).count({
        model: "user",
        where
      });
      if (typeof total === "string") return parseInt(total);
      return total;
    },
    deleteUser: async (userId) => {
      const sessionReferences = await getActiveSessionReferences(userId);
      if (!secondaryStorage || options.session?.storeSessionInDatabase) await deleteManyWithHooks([{
        field: "userId",
        value: userId
      }], "session", void 0);
      await deleteManyWithHooks([{
        field: "userId",
        value: userId
      }], "account", void 0);
      if (await deleteWithHooks([{
        field: "id",
        value: userId
      }], "user", void 0) !== null) await queueCachedUserSessionDeletion(userId, sessionReferences);
    },
    createSession: async (userId, dontRememberMe, override, overrideAll, storageOptions) => {
      const headers = await (async () => {
        const ctx2 = tryGetCurrentAuthEndpointContext();
        return ctx2?.headers || ctx2?.request?.headers;
      })();
      const storeInDb = options.session?.storeSessionInDatabase;
      const deferMirror = storageOptions?.deferSecondaryStorageWrites === true && databaseSessionFallbackEnabled;
      const { id: _, ...rest } = override || {};
      let sessionId;
      if (secondaryStorage && !storeInDb) {
        const generatedId = ctx.generateId({ model: "session" });
        sessionId = generatedId !== false ? generatedId : generateId();
      }
      const defaultAdditionalFields = getSessionDefaultFields(options);
      const data = {
        ...sessionId ? { id: sessionId } : {},
        ipAddress: headers ? getIP(headers, options) || "" : "",
        userAgent: headers?.get("user-agent") || "",
        ...rest,
        /**
        * If the user doesn't want to be remembered
        * set the session to expire in 1 day.
        * The cookie will be set to expire at the end of the session
        */
        expiresAt: dontRememberMe ? getDate(86400, "sec") : getDate(sessionExpiration, "sec"),
        userId,
        token: generateId(32),
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...defaultAdditionalFields,
        ...overrideAll ? rest : {}
      };
      const mirrorSessionToSecondaryStorage = async (sessionData) => {
        if (!secondaryStorage) return sessionData;
        const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
        let list = [];
        const now2 = Date.now();
        if (currentList) {
          list = safeJSONParse(currentList) || [];
          list = list.filter((session) => session.expiresAt > now2 && session.token !== data.token);
        }
        await setActiveSessionReferences(userId, [...list, {
          token: data.token,
          expiresAt: data.expiresAt.getTime()
        }], now2);
        const user = await (await getCurrentAdapter(adapter)).findOne({
          model: "user",
          where: [{
            field: "id",
            value: userId
          }]
        });
        const sessionTTL = getTTLSeconds(data.expiresAt, now2);
        if (sessionTTL > 0) await secondaryStorage.set(data.token, JSON.stringify({
          session: {
            ...sessionData,
            createdAt: data.createdAt
          },
          user
        }), sessionTTL);
        return sessionData;
      };
      return await createWithHooks(data, "session", secondaryStorage ? {
        fn: async (sessionData) => {
          if (!deferMirror) return mirrorSessionToSecondaryStorage(sessionData);
          await queueAfterTransactionHook(async () => {
            await mirrorSessionToSecondaryStorage(sessionData);
          }, { onError(error2) {
            logger2.error("Failed to mirror committed session to secondary storage", error2);
          } });
          return sessionData;
        },
        executeMainFn: storeInDb
      } : void 0);
    },
    findSession: async (token) => {
      if (secondaryStorage) {
        const sessionStringified = await secondaryStorage.get(token);
        if (!sessionStringified && (!options.session?.storeSessionInDatabase || ctx.options.session?.preserveSessionInDatabase)) return null;
        if (sessionStringified) {
          const s = safeJSONParse(sessionStringified);
          if (!s || await isRevokedSession(s.session)) return null;
          return {
            session: parseSessionOutput(ctx.options, {
              ...s.session,
              expiresAt: new Date(s.session.expiresAt),
              createdAt: new Date(s.session.createdAt),
              updatedAt: new Date(s.session.updatedAt)
            }),
            user: parseUserOutput(ctx.options, {
              ...s.user,
              createdAt: new Date(s.user.createdAt),
              updatedAt: new Date(s.user.updatedAt)
            })
          };
        }
      }
      const result = await (await getCurrentAdapter(adapter)).findOne({
        model: "session",
        where: [{
          value: token,
          field: "token"
        }],
        join: { user: true }
      });
      if (!result) return null;
      const { user, ...session } = result;
      if (!user) return null;
      return {
        session: parseSessionOutput(ctx.options, session),
        user: parseUserOutput(ctx.options, user)
      };
    },
    findSessions: async (sessionTokens, options2) => {
      const uniqueTokens = [...new Set(sessionTokens)];
      const sessionsByToken = /* @__PURE__ */ new Map();
      const missingTokens = [];
      const revokedBeforeByUser = /* @__PURE__ */ new Map();
      if (secondaryStorage) for (const sessionToken of uniqueTokens) {
        const sessionStringified = await secondaryStorage.get(sessionToken);
        if (sessionStringified) try {
          const s = typeof sessionStringified === "string" ? JSON.parse(sessionStringified) : sessionStringified;
          if (!s || await isRevokedSession(s.session, revokedBeforeByUser)) continue;
          const expiresAt = new Date(s.session.expiresAt);
          if (options2?.onlyActiveSessions && expiresAt <= /* @__PURE__ */ new Date()) continue;
          const session = {
            session: {
              ...s.session,
              expiresAt: new Date(s.session.expiresAt)
            },
            user: {
              ...s.user,
              createdAt: new Date(s.user.createdAt),
              updatedAt: new Date(s.user.updatedAt)
            }
          };
          sessionsByToken.set(sessionToken, session);
        } catch {
          continue;
        }
        else missingTokens.push(sessionToken);
      }
      const databaseTokens = secondaryStorage ? missingTokens : uniqueTokens;
      if (databaseTokens.length > 0 && (!secondaryStorage || databaseSessionFallbackEnabled)) {
        const databaseSessions = await (await getCurrentAdapter(adapter)).findMany({
          model: "session",
          limit: databaseTokens.length,
          where: [{
            field: "token",
            value: databaseTokens,
            operator: "in"
          }, ...options2?.onlyActiveSessions ? [{
            field: "expiresAt",
            value: /* @__PURE__ */ new Date(),
            operator: "gt"
          }] : []],
          join: { user: true }
        });
        for (const { user, ...session } of databaseSessions) if (user) sessionsByToken.set(session.token, {
          session,
          user
        });
      }
      return uniqueTokens.flatMap((token) => {
        const session = sessionsByToken.get(token);
        return session ? [session] : [];
      });
    },
    updateSession: async (sessionToken, session) => {
      return await updateWithHooks(session, [{
        field: "token",
        value: sessionToken
      }], "session", secondaryStorage ? {
        async fn(data) {
          const currentSession = await secondaryStorage.get(sessionToken);
          if (!currentSession) return null;
          const parsedSession = safeJSONParse(currentSession);
          if (!parsedSession) return null;
          const mergedSession = {
            ...parsedSession.session,
            ...data,
            expiresAt: new Date(data.expiresAt ?? parsedSession.session.expiresAt),
            createdAt: new Date(parsedSession.session.createdAt),
            updatedAt: new Date(data.updatedAt ?? parsedSession.session.updatedAt)
          };
          const updatedSession = parseSessionOutput(ctx.options, mergedSession);
          const now2 = Date.now();
          const expiresMs = new Date(updatedSession.expiresAt).getTime();
          const sessionTTL = getTTLSeconds(expiresMs, now2);
          if (sessionTTL > 0) {
            await secondaryStorage.set(sessionToken, JSON.stringify({
              session: updatedSession,
              user: parsedSession.user
            }), sessionTTL);
            const listKey = `active-sessions-${updatedSession.userId}`;
            const listRaw = await secondaryStorage.get(listKey);
            const filtered = (listRaw ? safeJSONParse(listRaw) || [] : []).filter((s) => s.token !== sessionToken && s.expiresAt > now2).concat([{
              token: sessionToken,
              expiresAt: expiresMs
            }]);
            await setActiveSessionReferences(updatedSession.userId, filtered, now2);
          }
          return updatedSession;
        },
        executeMainFn: options.session?.storeSessionInDatabase
      } : void 0);
    },
    deleteSession: async (token) => {
      if (secondaryStorage) {
        const data = await secondaryStorage.get(token);
        if (data) {
          const { session } = safeJSONParse(data) ?? {};
          if (!session) {
            logger2.error("Session not found in secondary storage");
            return;
          }
          const userId = session.userId;
          const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
          if (currentList) {
            const list = safeJSONParse(currentList) || [];
            const now2 = Date.now();
            await setActiveSessionReferences(userId, list.filter((session2) => session2.expiresAt > now2 && session2.token !== token), now2);
          } else logger2.error("Active sessions list not found in secondary storage");
        }
        await secondaryStorage.delete(token);
        if (!options.session?.storeSessionInDatabase) return;
        if (ctx.options.session?.preserveSessionInDatabase) {
          await endPreservedSessions([{
            field: "token",
            value: token
          }]);
          return;
        }
      }
      await deleteWithHooks([{
        field: "token",
        value: token
      }], "session", void 0);
    },
    deleteAccounts: async (userId) => {
      await deleteManyWithHooks([{
        field: "userId",
        value: userId
      }], "account", void 0);
    },
    /**
    * Delete an account by its primary key.
    *
    * @param id - The account row's primary key, not its accountId.
    */
    deleteAccount: async (id) => {
      await deleteWithHooks([{
        field: "id",
        value: id
      }], "account", void 0);
    },
    deleteUserSessions: async (userId) => {
      const sessionReferences = await getActiveSessionReferences(userId);
      if (!secondaryStorage) {
        await deleteManyWithHooks([{
          field: "userId",
          value: userId
        }], "session", void 0);
        return;
      }
      if (!options.session?.storeSessionInDatabase) {
        await queueCachedUserSessionDeletion(userId, sessionReferences);
        return;
      }
      const revokeCachedSessions = async () => queueCachedUserSessionDeletion(userId, [...sessionReferences, ...await getActiveSessionReferences(userId)]);
      if (ctx.options.session?.preserveSessionInDatabase) {
        await endPreservedSessions([{
          field: "userId",
          value: userId
        }], revokeCachedSessions);
        return;
      }
      await deleteManyWithHooks([{
        field: "userId",
        value: userId
      }], "session", {
        fn: async (where) => {
          const deleted = await (await getCurrentAdapter(adapter)).deleteMany({
            model: "session",
            where
          });
          await revokeCachedSessions();
          return deleted;
        },
        executeMainFn: false
      });
    },
    deleteSessions: async (sessionTokens) => {
      if (secondaryStorage) {
        await Promise.all(sessionTokens.map((token) => secondaryStorage.delete(token)));
        if (!options.session?.storeSessionInDatabase) return;
        if (ctx.options.session?.preserveSessionInDatabase) {
          await endPreservedSessions([{
            field: "token",
            value: sessionTokens,
            operator: "in"
          }]);
          return;
        }
      }
      await deleteManyWithHooks([{
        field: "token",
        value: sessionTokens,
        operator: "in"
      }], "session", void 0);
    },
    findAccountOwnerByKey: async ({ providerId, accountId }) => {
      const accountsWithUsers = await (await getCurrentAdapter(adapter)).findMany({
        model: "account",
        where: [{
          field: "providerId",
          value: providerId
        }, {
          field: "accountId",
          value: accountId
        }],
        limit: 2,
        join: { user: true }
      });
      if (accountsWithUsers.length > 1) throw new BetterAuthError(`Multiple accounts match the same accountId for provider ${JSON.stringify(providerId)}. Resolve duplicate account identities before continuing.`);
      const accountWithUser = accountsWithUsers[0];
      if (!accountWithUser) return null;
      const { user, ...account } = accountWithUser;
      return user ? {
        kind: "owned",
        user,
        account
      } : {
        kind: "orphaned",
        account
      };
    },
    findUserByEmail: async (email2, options2) => {
      const result = await (await getCurrentAdapter(adapter)).findOne({
        model: "user",
        where: [{
          value: email2.toLowerCase(),
          field: "email"
        }],
        join: { ...options2?.includeAccounts ? { account: true } : {} }
      });
      if (!result) return null;
      const normalize = (value) => value.normalize("NFC").toLowerCase();
      if (normalize(result.email) !== normalize(email2)) return null;
      const { account: accounts, ...user } = result;
      return {
        user,
        accounts: accounts ?? []
      };
    },
    findUserById: async (userId) => {
      if (!userId) return null;
      return await (await getCurrentAdapter(adapter)).findOne({
        model: "user",
        where: [{
          field: "id",
          value: userId
        }]
      });
    },
    linkAccount: async (account) => {
      return await createWithHooks({
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...account
      }, "account", void 0);
    },
    updateUser: async (userId, data) => {
      const user = await updateWithHooks({
        ...data,
        ...data.email ? { email: data.email.toLowerCase() } : {}
      }, [{
        field: "id",
        value: userId
      }], "user", void 0);
      await queueAfterTransactionHook(() => refreshUserSessions(user), { onError(error2) {
        logger2.error("Failed to refresh committed user sessions in secondary storage", error2);
      } });
      return user;
    },
    updateUserByEmail: async (email2, data) => {
      const user = await updateWithHooks({
        ...data,
        ...data.email ? { email: data.email.toLowerCase() } : {}
      }, [{
        field: "email",
        value: email2.toLowerCase()
      }], "user", void 0);
      await queueAfterTransactionHook(() => refreshUserSessions(user), { onError(error2) {
        logger2.error("Failed to refresh committed user sessions in secondary storage", error2);
      } });
      return user;
    },
    updatePassword: async (userId, password) => {
      await updateManyWithHooks({ password }, [
        {
          field: "userId",
          value: userId
        },
        {
          field: "providerId",
          value: "credential"
        },
        {
          field: "accountId",
          value: userId
        }
      ], "account", void 0);
    },
    findAccounts: async (userId) => {
      return await (await getCurrentAdapter(adapter)).findMany({
        model: "account",
        where: [{
          field: "userId",
          value: userId
        }]
      });
    },
    findCredentialAccount: async (userId) => {
      return (await getCurrentAdapter(adapter)).findOne({
        model: "account",
        where: [
          {
            field: "userId",
            value: userId
          },
          {
            field: "providerId",
            value: "credential"
          },
          {
            field: "accountId",
            value: userId
          }
        ]
      });
    },
    findAccountByKey: async ({ providerId, accountId }) => {
      const accounts = await (await getCurrentAdapter(adapter)).findMany({
        model: "account",
        limit: 2,
        where: [{
          field: "providerId",
          value: providerId
        }, {
          field: "accountId",
          value: accountId
        }]
      });
      if (accounts.length > 1) throw new BetterAuthError(`Multiple accounts match the same accountId for provider ${JSON.stringify(providerId)}. Resolve duplicate account identities before continuing.`);
      return accounts[0] ?? null;
    },
    findAccountByUserId: async (userId) => {
      return await (await getCurrentAdapter(adapter)).findMany({
        model: "account",
        where: [{
          field: "userId",
          value: userId
        }]
      });
    },
    updateAccount: async (id, data) => {
      return await updateWithHooks(data, [{
        field: "id",
        value: id
      }], "account", void 0);
    },
    createVerificationValue: async (data) => {
      const storageOption = getStorageOption(data.identifier, options.verification?.storeIdentifier);
      const storedIdentifier = await processIdentifier(data.identifier, storageOption);
      return await createWithHooks({
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...data,
        identifier: storedIdentifier
      }, "verification", secondaryStorage ? {
        async fn(verificationData) {
          const ttl = getTTLSeconds(verificationData.expiresAt);
          if (ttl > 0) await secondaryStorage.set(`verification:${storedIdentifier}`, JSON.stringify(verificationData), ttl);
          return verificationData;
        },
        executeMainFn: options.verification?.storeInDatabase
      } : void 0);
    },
    findVerificationValue: async (identifier) => {
      const storageOption = getStorageOption(identifier, options.verification?.storeIdentifier);
      const storedIdentifier = await processIdentifier(identifier, storageOption);
      if (secondaryStorage) {
        const cached2 = await secondaryStorage.get(`verification:${storedIdentifier}`);
        if (cached2) {
          const parsed = safeJSONParse(cached2);
          if (parsed) return parsed;
        }
        if (storageOption && storageOption !== "plain") {
          const plainCached = await secondaryStorage.get(`verification:${identifier}`);
          if (plainCached) {
            const parsed = safeJSONParse(plainCached);
            if (parsed) return parsed;
          }
        }
        if (!options.verification?.storeInDatabase) return null;
      }
      const currentAdapter = await getCurrentAdapter(adapter);
      async function findByIdentifier(id) {
        return currentAdapter.findMany({
          model: "verification",
          where: [{
            field: "identifier",
            value: id
          }],
          sortBy: {
            field: "createdAt",
            direction: "desc"
          },
          limit: 1
        });
      }
      let verification = await findByIdentifier(storedIdentifier);
      if (!verification.length && storageOption && storageOption !== "plain") verification = await findByIdentifier(identifier);
      const found = verification[0] ?? null;
      const now2 = Date.now();
      if (options.verification?.disableCleanup) return found;
      if (now2 >= nextVerificationCleanupAt) {
        nextVerificationCleanupAt = now2 + VERIFICATION_CLEANUP_INTERVAL_MS;
        await deleteManyWithHooks([{
          field: "expiresAt",
          value: new Date(now2),
          operator: "lt"
        }], "verification", void 0);
      } else if (found && new Date(found.expiresAt).getTime() < now2) await deleteManyWithHooks([{
        field: "identifier",
        value: found.identifier
      }, {
        field: "expiresAt",
        value: new Date(now2),
        operator: "lt"
      }], "verification", void 0);
      return found;
    },
    deleteVerificationByIdentifier: async (identifier) => {
      const storageOption = getStorageOption(identifier, options.verification?.storeIdentifier);
      const storedIdentifier = await processIdentifier(identifier, storageOption);
      if (secondaryStorage) await secondaryStorage.delete(`verification:${storedIdentifier}`);
      if (!secondaryStorage || options.verification?.storeInDatabase) await deleteWithHooks([{
        field: "identifier",
        value: storedIdentifier
      }], "verification", void 0);
    },
    /**
    * Atomically consume a single-use verification row by `identifier` and
    * return it. The first concurrent caller receives the latest row for the
    * identifier; every other caller racing against it receives `null`.
    *
    * Race-safe replacement for the `findVerificationValue` then
    * `deleteVerificationByIdentifier` pair. Callers MUST gate any state
    * change (issue session, mint token, change password) on a non-null
    * return value, because consuming one row invalidates the whole
    * identifier and stale rows cannot be replayed.
    *
    * Rows past their `expiresAt` are treated as already invalid: the row
    * is still deleted (so it cannot be replayed later) but `null` is
    * returned. Callers do not need their own `expiresAt` gate.
    *
    * The secondary-storage-only path (`storeInDatabase: false`) consumes
    * through `getAndDelete`, which is required on `SecondaryStorage` so
    * single-use values are not read and deleted as separate operations.
    */
    consumeVerificationValue: async (identifier) => {
      const storageOption = getStorageOption(identifier, options.verification?.storeIdentifier);
      const storedIdentifier = await processIdentifier(identifier, storageOption);
      const identifiersToTry = storageOption && storageOption !== "plain" ? [storedIdentifier, identifier] : [storedIdentifier];
      const hydrateCachedVerification = (raw) => {
        if (!raw) return null;
        const candidate = typeof raw === "string" ? safeJSONParse(raw) : typeof raw === "object" ? raw : null;
        if (!candidate) return null;
        const expiresAt = new Date(candidate.expiresAt);
        if (!Number.isFinite(expiresAt.getTime())) return null;
        return {
          ...candidate,
          expiresAt
        };
      };
      let consumed = null;
      if (secondaryStorage && !options.verification?.storeInDatabase) {
        const consumeCacheKey = async (key) => {
          return hydrateCachedVerification(await secondaryStorage.getAndDelete(key));
        };
        for (const stored of identifiersToTry) {
          const cached2 = await consumeCacheKey(`verification:${stored}`);
          if (!cached2) continue;
          await Promise.all(identifiersToTry.filter((candidate) => candidate !== stored).map((candidate) => secondaryStorage.delete(`verification:${candidate}`)));
          consumed = cached2;
          break;
        }
      } else {
        const consumeByIdentifier = async (id) => withVerificationConsumeLock(`verification:${id}`, () => runWithTransaction(adapter, async () => {
          const txAdapter = await getCurrentAdapter(adapter);
          const where = [{
            field: "identifier",
            value: id
          }];
          const latest = (await txAdapter.findMany({
            model: "verification",
            where,
            sortBy: {
              field: "createdAt",
              direction: "desc"
            },
            limit: 1
          }))[0] ?? null;
          if (!latest) return null;
          return consumeOneWithHooks("verification", [{
            field: "id",
            value: latest.id
          }], async () => {
            await txAdapter.deleteMany({
              model: "verification",
              where: [
                ...where,
                {
                  field: "id",
                  operator: "ne",
                  value: latest.id
                },
                {
                  field: "createdAt",
                  operator: "lte",
                  value: latest.createdAt
                }
              ]
            });
            return txAdapter.consumeOne({
              model: "verification",
              where: [{
                field: "id",
                value: latest.id
              }]
            });
          }, latest);
        }));
        for (const stored of identifiersToTry) {
          consumed = await consumeByIdentifier(stored);
          if (consumed) break;
        }
        if (consumed && secondaryStorage) await Promise.all(identifiersToTry.map((stored) => secondaryStorage.delete(`verification:${stored}`)));
      }
      if (!consumed || consumed.expiresAt < /* @__PURE__ */ new Date()) return null;
      return consumed;
    },
    /**
    * First-writer-wins create keyed by a deterministic primary key derived
    * from `identifier`. Returns `true` when this caller created the row and
    * `false` when a row for the same identifier already existed.
    *
    * The dual of `consumeVerificationValue`: where consume races to delete a
    * marker exactly once, reserve races to create a marker exactly once. Use
    * it for replay tombstones (a SAML assertion id, a JWT `jti`) where the
    * first caller wins and every later caller must observe that the marker is
    * already taken.
    *
    * The `verification.identifier` column is non-unique, so uniqueness comes
    * from a deterministic primary key (`SHA-256` of `reserve:<identifier>`,
    * encoded by `encodeDeterministicId` so the configured id strategy keeps
    * it; see its note on `generateId: "serial"`).
    * The database path is atomic: the primary key turns the INSERT into the
    * first-writer-wins gate, and a duplicate is detected portably by
    * re-reading the row rather than matching adapter-specific errors.
    * Secondary-storage-only verification cannot enforce the deterministic
    * primary-key gate, so this operation fails closed unless verification is
    * backed by the database.
    *
    * The atomic guarantee requires the configured adapter to reject a
    * duplicate primary key on insert, which every real database enforces. The
    * in-memory adapter does not enforce primary-key uniqueness, so reservation
    * is best-effort there (it is intended for development and tests).
    */
    reserveVerificationValue: async (data) => {
      const reservationId = encodeDeterministicId(new Uint8Array(await createHash("SHA-256").digest(new TextEncoder().encode("reserve:" + data.identifier))), options, {
        adapter,
        model: "verification"
      });
      const storageOption = getStorageOption(data.identifier, options.verification?.storeIdentifier);
      const storedIdentifier = await processIdentifier(data.identifier, storageOption);
      if (secondaryStorage && !options.verification?.storeInDatabase) throw new BetterAuthError("reserveVerificationValue requires database-backed verification storage. Set verification.storeInDatabase to true for flows that reserve verification values.");
      try {
        await adapter.create({
          model: "verification",
          data: {
            id: reservationId,
            identifier: storedIdentifier,
            value: data.value,
            expiresAt: data.expiresAt,
            createdAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          },
          forceAllowId: true
        });
      } catch (error2) {
        if (await adapter.findOne({
          model: "verification",
          where: [{
            field: "id",
            value: reservationId
          }]
        })) return false;
        throw error2;
      }
      if (secondaryStorage) {
        const ttl = getTTLSeconds(data.expiresAt);
        if (ttl > 0) await secondaryStorage.set(`verification:${storedIdentifier}`, JSON.stringify({
          id: reservationId,
          identifier: storedIdentifier,
          value: data.value,
          expiresAt: data.expiresAt
        }), ttl);
      }
      return true;
    },
    updateVerificationByIdentifier: async (identifier, data) => {
      const storageOption = getStorageOption(identifier, options.verification?.storeIdentifier);
      const storedIdentifier = await processIdentifier(identifier, storageOption);
      if (secondaryStorage) {
        const cached2 = await secondaryStorage.get(`verification:${storedIdentifier}`);
        if (cached2) {
          const parsed = safeJSONParse(cached2);
          if (parsed) {
            const updated = {
              ...parsed,
              ...data
            };
            const expiresAt = updated.expiresAt ?? parsed.expiresAt;
            const ttl = getTTLSeconds(expiresAt instanceof Date ? expiresAt : new Date(expiresAt));
            if (ttl > 0) await secondaryStorage.set(`verification:${storedIdentifier}`, JSON.stringify(updated), ttl);
            if (!options.verification?.storeInDatabase) return updated;
          }
        }
      }
      if (!secondaryStorage || options.verification?.storeInDatabase) return await updateWithHooks(data, [{
        field: "identifier",
        value: storedIdentifier
      }], "verification", void 0);
      return data;
    },
    refreshUserSessions
  };
};

// node_modules/defu/dist/defu.mjs
function isPlainObject2(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject2(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object2 = { ...defaults };
  for (const key of Object.keys(baseObject)) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object2, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object2[key])) {
      object2[key] = [...value, ...object2[key]];
    } else if (isPlainObject2(value) && isPlainObject2(object2[key])) {
      object2[key] = _defu(
        value,
        object2[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object2[key] = value;
    }
  }
  return object2;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
var defu = createDefu();
var defuFn = createDefu((object2, key, currentValue) => {
  if (object2[key] !== void 0 && typeof currentValue === "function") {
    object2[key] = currentValue(object2[key]);
    return true;
  }
});
var defuArrayFn = createDefu((object2, key, currentValue) => {
  if (Array.isArray(object2[key]) && typeof currentValue === "function") {
    object2[key] = currentValue(object2[key]);
    return true;
  }
});

// node_modules/@better-auth/core/dist/utils/host.mjs
var CLOUD_METADATA_HOSTS = /* @__PURE__ */ new Set([
  "metadata.google.internal",
  "metadata.goog",
  "metadata",
  "instance-data",
  "instance-data.ec2.internal"
]);
function stripBrackets(host) {
  if (host.length >= 2 && host.startsWith("[") && host.endsWith("]")) return host.slice(1, -1);
  return host;
}
function stripPort(host) {
  if (host.startsWith("[")) {
    const end = host.indexOf("]");
    if (end === -1) return host;
    return host.slice(0, end + 1);
  }
  const firstColon = host.indexOf(":");
  if (firstColon === -1) return host;
  if (host.indexOf(":", firstColon + 1) !== -1) return host;
  return host.slice(0, firstColon);
}
function stripZoneId(host) {
  const zone = host.indexOf("%");
  if (zone === -1) return host;
  return host.slice(0, zone);
}
function stripTrailingDot(host) {
  return host.replace(/\.+$/, "");
}
function looksLikeIPv4(host) {
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host);
}
function ipv4ToUint32(ip) {
  const parts = ip.split(".");
  return (Number(parts[0]) << 24 | Number(parts[1]) << 16 | Number(parts[2]) << 8 | Number(parts[3])) >>> 0;
}
function inIPv4Range(value, prefix, length) {
  if (length === 0) return true;
  const mask = length === 32 ? 4294967295 : -1 << 32 - length >>> 0;
  return (value & mask) === (prefix & mask);
}
function classifyIPv4(ip) {
  if (ip === "0.0.0.0") return "unspecified";
  if (ip === "255.255.255.255") return "broadcast";
  const n = ipv4ToUint32(ip);
  if (inIPv4Range(n, ipv4ToUint32("127.0.0.0"), 8)) return "loopback";
  if (inIPv4Range(n, ipv4ToUint32("10.0.0.0"), 8)) return "private";
  if (inIPv4Range(n, ipv4ToUint32("172.16.0.0"), 12)) return "private";
  if (inIPv4Range(n, ipv4ToUint32("192.168.0.0"), 16)) return "private";
  if (inIPv4Range(n, ipv4ToUint32("169.254.0.0"), 16)) return "linkLocal";
  if (inIPv4Range(n, ipv4ToUint32("100.64.0.0"), 10)) return "sharedAddressSpace";
  if (inIPv4Range(n, ipv4ToUint32("192.0.2.0"), 24)) return "documentation";
  if (inIPv4Range(n, ipv4ToUint32("198.51.100.0"), 24)) return "documentation";
  if (inIPv4Range(n, ipv4ToUint32("203.0.113.0"), 24)) return "documentation";
  if (inIPv4Range(n, ipv4ToUint32("198.18.0.0"), 15)) return "benchmarking";
  if (inIPv4Range(n, ipv4ToUint32("224.0.0.0"), 4)) return "multicast";
  if (inIPv4Range(n, ipv4ToUint32("0.0.0.0"), 8)) return "reserved";
  if (inIPv4Range(n, ipv4ToUint32("192.0.0.0"), 24)) return "reserved";
  if (inIPv4Range(n, ipv4ToUint32("192.88.99.0"), 24)) return "reserved";
  if (inIPv4Range(n, ipv4ToUint32("240.0.0.0"), 4)) return "reserved";
  return "public";
}
function extractEmbedded6to4IPv4(expanded) {
  const g1 = Number.parseInt(expanded.slice(5, 9), 16);
  const g2 = Number.parseInt(expanded.slice(10, 14), 16);
  if (!Number.isFinite(g1) || !Number.isFinite(g2)) return null;
  const combined = (g1 << 16 | g2) >>> 0;
  return `${combined >>> 24 & 255}.${combined >>> 16 & 255}.${combined >>> 8 & 255}.${combined & 255}`;
}
function extractEmbeddedTrailingIPv4(expanded) {
  const g1 = Number.parseInt(expanded.slice(30, 34), 16);
  const g2 = Number.parseInt(expanded.slice(35, 39), 16);
  if (!Number.isFinite(g1) || !Number.isFinite(g2)) return null;
  const combined = (g1 << 16 | g2) >>> 0;
  return `${combined >>> 24 & 255}.${combined >>> 16 & 255}.${combined >>> 8 & 255}.${combined & 255}`;
}
function classifyIPv6(expanded) {
  if (expanded === "0000:0000:0000:0000:0000:0000:0000:0000") return "unspecified";
  if (expanded === "0000:0000:0000:0000:0000:0000:0000:0001") return "loopback";
  const firstByte = Number.parseInt(expanded.slice(0, 2), 16);
  const secondByte = Number.parseInt(expanded.slice(2, 4), 16);
  if (firstByte === 255) return "multicast";
  if (firstByte === 254 && (secondByte & 192) === 128) return "linkLocal";
  if ((firstByte & 254) === 252) return "private";
  if (expanded.startsWith("0064:ff9b:0000:0000:0000:0000:")) {
    const embedded = extractEmbeddedTrailingIPv4(expanded);
    return embedded && classifyIPv4(embedded) === "public" ? "public" : "reserved";
  }
  if ((firstByte & 224) !== 32) return "reserved";
  if (expanded.startsWith("2001:0db8:")) return "documentation";
  if (expanded.startsWith("3fff:0")) return "documentation";
  if (expanded.startsWith("2001:0002:0000:")) return "benchmarking";
  if (expanded.startsWith("2001:0000:")) return "reserved";
  if (expanded.startsWith("2002:")) {
    const embedded = extractEmbedded6to4IPv4(expanded);
    if (embedded && classifyIPv4(embedded) !== "public") return "reserved";
  }
  return "public";
}
function classifyHost(host) {
  const lowered = stripTrailingDot(stripZoneId(stripBrackets(stripPort(host.trim())))).toLowerCase();
  if (lowered === "") return {
    kind: "reserved",
    literal: "fqdn",
    canonical: ""
  };
  if (!isValidIP(lowered)) {
    if (lowered === "localhost" || lowered.endsWith(".localhost")) return {
      kind: "localhost",
      literal: "fqdn",
      canonical: lowered
    };
    if (CLOUD_METADATA_HOSTS.has(lowered)) return {
      kind: "cloudMetadata",
      literal: "fqdn",
      canonical: lowered
    };
    return {
      kind: "public",
      literal: "fqdn",
      canonical: lowered
    };
  }
  if (looksLikeIPv4(lowered)) return {
    kind: classifyIPv4(lowered),
    literal: "ipv4",
    canonical: lowered
  };
  const canonical = normalizeIP(lowered, { ipv6Subnet: 128 });
  if (looksLikeIPv4(canonical)) return {
    kind: classifyIPv4(canonical),
    literal: "ipv4",
    canonical
  };
  return {
    kind: classifyIPv6(canonical),
    literal: "ipv6",
    canonical
  };
}
function isLoopbackHost(host) {
  const kind = classifyHost(host).kind;
  return kind === "loopback" || kind === "localhost";
}

// node_modules/better-auth/dist/context/helpers.mjs
async function runPluginInit(context) {
  let options = context.options;
  const plugins = options.plugins || [];
  const pluginTrustedOrigins = [];
  const dbHooks = [];
  for (const plugin of plugins) if (plugin.init) {
    const initPromise = plugin.init(context);
    let result;
    if (isPromise(initPromise)) result = await initPromise;
    else result = initPromise;
    if (typeof result === "object") {
      if (result.options) {
        const { databaseHooks, trustedOrigins, ...restOpts } = result.options;
        if (databaseHooks) dbHooks.push({
          source: `plugin:${plugin.id}`,
          hooks: databaseHooks
        });
        if (trustedOrigins) pluginTrustedOrigins.push(trustedOrigins);
        options = defu(options, restOpts);
      }
      if (result.context) Object.assign(context, result.context);
    }
  }
  if (pluginTrustedOrigins.length > 0) {
    const allSources = [...options.trustedOrigins ? [options.trustedOrigins] : [], ...pluginTrustedOrigins];
    const staticOrigins = allSources.filter(Array.isArray).flat();
    const dynamicOrigins = allSources.filter((s) => typeof s === "function");
    if (dynamicOrigins.length > 0) options.trustedOrigins = async (request) => {
      const resolved = await Promise.all(dynamicOrigins.map((fn) => fn(request)));
      return [...staticOrigins, ...resolved.flat()].filter((v) => typeof v === "string" && v !== "");
    };
    else options.trustedOrigins = staticOrigins;
  }
  if (options.databaseHooks) dbHooks.push({
    source: "user",
    hooks: options.databaseHooks
  });
  context.internalAdapter = createInternalAdapter(context.adapter, {
    options,
    logger: context.logger,
    hooks: dbHooks,
    generateId: context.generateId
  });
  context.options = options;
}
function getInternalPlugins(options) {
  const plugins = [];
  if (options.advanced?.crossSubDomainCookies?.enabled) {
  }
  return plugins;
}
async function getTrustedOrigins(options, request) {
  const trustedOrigins = [];
  if (isDynamicBaseURLConfig(options.baseURL)) {
    const allowedHosts = options.baseURL.allowedHosts;
    const proto = options.baseURL.protocol;
    for (const host of allowedHosts) if (!host.includes("://")) {
      if (!proto || proto === "https" || proto === "auto") trustedOrigins.push(`https://${host}`);
      if (proto === "http" || proto === "auto" || isLoopbackHost(host)) trustedOrigins.push(`http://${host}`);
    } else trustedOrigins.push(host);
    if (options.baseURL.fallback) try {
      trustedOrigins.push(new URL(options.baseURL.fallback).origin);
    } catch {
    }
  } else {
    const baseURL = getBaseURL(typeof options.baseURL === "string" ? options.baseURL : void 0, options.basePath, request);
    if (baseURL) trustedOrigins.push(new URL(baseURL).origin);
  }
  if (options.trustedOrigins) {
    if (Array.isArray(options.trustedOrigins)) trustedOrigins.push(...options.trustedOrigins);
    if (typeof options.trustedOrigins === "function") {
      const validOrigins = await options.trustedOrigins(request);
      trustedOrigins.push(...validOrigins);
    }
  }
  const envTrustedOrigins = env.BETTER_AUTH_TRUSTED_ORIGINS;
  if (envTrustedOrigins) trustedOrigins.push(...envTrustedOrigins.split(","));
  return trustedOrigins.filter((v) => Boolean(v));
}
function pickSource(input) {
  if (isRequestLike(input?.request)) return input.request;
  if (!input?.headers) return void 0;
  const headers = input.headers instanceof Headers ? input.headers : new Headers(input.headers);
  if (!headers.has("host") && !headers.has("x-forwarded-host")) return;
  return headers;
}
function resolveDynamicTrustedProxyHeaders(options) {
  return options.advanced?.trustedProxyHeaders ?? false;
}
async function resolveRequestContext(ctx, source, trustedProxyHeaders) {
  const dynamicBaseURLConfig = ctx.options.baseURL;
  const basePath = ctx.options.basePath || "/api/auth";
  const baseURL = resolveBaseURL(dynamicBaseURLConfig, basePath, source, void 0, trustedProxyHeaders);
  if (!baseURL) throw new BetterAuthError("Could not resolve base URL from request. Check your allowedHosts config.");
  const resolved = Object.create(Object.getPrototypeOf(ctx), Object.getOwnPropertyDescriptors(ctx));
  resolved.baseURL = baseURL;
  resolved.options = {
    ...ctx.options,
    baseURL: getOrigin(baseURL) || void 0
  };
  const trustedOriginOptions = {
    ...resolved.options,
    baseURL: dynamicBaseURLConfig
  };
  const needsRequest = typeof ctx.options.trustedOrigins === "function" || typeof ctx.options.account?.accountLinking?.trustedProviders === "function";
  let callbackRequest;
  if (needsRequest) {
    if (isRequestLike(source)) callbackRequest = source;
    else if (source) callbackRequest = new Request(baseURL, { headers: source });
    else callbackRequest = void 0;
  } else callbackRequest = void 0;
  resolved.trustedOrigins = await getTrustedOrigins(trustedOriginOptions, callbackRequest);
  resolved.trustedProviders = await getTrustedProviders(resolved.options, callbackRequest);
  if (ctx.options.advanced?.crossSubDomainCookies?.enabled) {
    resolved.authCookies = getCookies(resolved.options);
    resolved.createAuthCookie = createCookieGetter(resolved.options);
  }
  return resolved;
}
async function getAwaitableValue(arr, item) {
  if (!arr) return void 0;
  for (const val of arr) {
    const value = typeof val === "function" ? await val() : val;
    if (value[item.field ?? "id"] === item.value) return value;
  }
}
async function getTrustedProviders(options, request) {
  const trustedProviders = options.account?.accountLinking?.trustedProviders;
  if (!trustedProviders) return [];
  if (Array.isArray(trustedProviders)) return trustedProviders.filter((v) => Boolean(v));
  return (await trustedProviders(request) ?? []).filter((v) => Boolean(v));
}

// node_modules/better-auth/dist/oauth2/account-fields.mjs
var RESERVED_ACCOUNT_FIELDS = /* @__PURE__ */ new Set([
  "id",
  "userId",
  "providerId",
  "accountId",
  "accessToken",
  "refreshToken",
  "idToken",
  "accessTokenExpiresAt",
  "refreshTokenExpiresAt",
  "scope",
  "password",
  "createdAt",
  "updatedAt"
]);
async function resolveOAuthAccountFields(c, provider, tokens, userInfo) {
  const getAccountFields = provider.options?.getAccountFields;
  if (!getAccountFields) return;
  const fields = await getAccountFields(tokens, userInfo);
  if (!fields) return;
  const declaredFields = c.context.tables.account?.fields ?? {};
  const accepted = Object.entries(fields).filter(([key, value]) => value !== void 0 && !RESERVED_ACCOUNT_FIELDS.has(key) && Object.hasOwn(declaredFields, key) && declaredFields[key]?.input !== false);
  if (accepted.length === 0) return;
  const validationFields = Object.fromEntries(Object.entries(declaredFields).map(([key, field]) => [key, {
    ...field,
    transform: void 0
  }]));
  const parsed = parseInputData(Object.fromEntries(accepted), {
    fields: validationFields,
    action: "update"
  });
  return Object.keys(parsed).length > 0 ? parsed : void 0;
}

// node_modules/better-auth/dist/oauth2/account-key.mjs
function toOAuthProfileRecord(profile) {
  return profile;
}
async function resolveOAuthAccountKey(provider, tokens, profile) {
  const accountKeyContext = {
    tokens,
    profile
  };
  const accountSubject = provider.accountSubject;
  const resolvedSubject = await accountSubject(accountKeyContext);
  const accountId = String(resolvedSubject);
  if (typeof resolvedSubject === "number" && !Number.isFinite(resolvedSubject) || accountId.trim().length === 0 || accountId === "undefined" || accountId === "null") throw new BetterAuthError("OAUTH_ACCOUNT_SUBJECT_INVALID");
  return {
    providerId: provider.id,
    accountId
  };
}
async function resolveOAuthAccountKeyForAPI(provider, tokens, profile) {
  try {
    return await resolveOAuthAccountKey(provider, tokens, profile);
  } catch {
    throw APIError2.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO);
  }
}

// node_modules/better-auth/dist/utils/request.mjs
function safeCloneRequest(request) {
  if (!request) return;
  try {
    return request.clone();
  } catch {
    return new Request(request.url, {
      cache: request.cache,
      credentials: request.credentials,
      headers: request.headers,
      integrity: request.integrity,
      keepalive: request.keepalive,
      method: request.method,
      mode: request.mode,
      redirect: request.redirect,
      referrer: request.referrer,
      referrerPolicy: request.referrerPolicy,
      signal: request.signal
    });
  }
}

// node_modules/better-auth/dist/api/state/should-session-refresh.mjs
var { get: getShouldSkipSessionRefresh, set: setShouldSkipSessionRefresh } = defineRequestState(() => false);

// node_modules/better-auth/dist/api/routes/session.mjs
var getSession = () => createAuthEndpoint("/get-session", {
  method: ["GET", "POST"],
  operationId: "getSession",
  query: getSessionQuerySchema,
  requireHeaders: true,
  disableBody: true,
  metadata: { openapi: {
    operationId: "getSession",
    description: "Get the current session",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: ["object", "null"],
        properties: {
          session: { $ref: "#/components/schemas/Session" },
          user: { $ref: "#/components/schemas/User" }
        },
        required: ["session", "user"]
      } } }
    } }
  } }
}, async (ctx) => {
  ctx.setHeader("cache-control", "no-store");
  ctx.setHeader("pragma", "no-cache");
  ctx.context.session = null;
  const deferSessionRefresh = ctx.context.options.session?.deferSessionRefresh;
  const isPostRequest = ctx.method === "POST";
  if (isPostRequest && !deferSessionRefresh) throw APIError2.from("METHOD_NOT_ALLOWED", BASE_ERROR_CODES.METHOD_NOT_ALLOWED_DEFER_SESSION_REQUIRED);
  try {
    const cookieCacheEnabled = ctx.context.options.session?.cookieCache?.enabled === true;
    const sessionCookieToken = await ctx.getSignedCookie(ctx.context.authCookies.sessionToken.name, ctx.context.secret);
    if (!sessionCookieToken && cookieCacheEnabled) return null;
    const sessionDataCookie = getChunkedCookie(ctx, ctx.context.authCookies.sessionData.name);
    if (sessionDataCookie && !cookieCacheEnabled) {
      const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, ctx.context.authCookies.sessionData.attributes, ctx);
      sessionStore.setCookies(sessionStore.clean());
    }
    if (!sessionCookieToken) return null;
    const shouldUseCookieCache = cookieCacheEnabled && !ctx.query?.disableCookieCache;
    const sessionDataPayload = shouldUseCookieCache && sessionDataCookie ? await decodeCookieCache(ctx, sessionDataCookie) : null;
    if (shouldUseCookieCache && sessionDataCookie && !sessionDataPayload) expireCookie(ctx, ctx.context.authCookies.sessionData);
    const dontRememberMe = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
    if (sessionDataPayload?.session) {
      const session2 = sessionDataPayload.session;
      let shouldExpireCookieCache = session2.session.token !== sessionCookieToken;
      if (!shouldExpireCookieCache) {
        const versionConfig = ctx.context.options.session?.cookieCache?.version;
        let expectedVersion = "1";
        if (versionConfig) {
          if (typeof versionConfig === "string") expectedVersion = versionConfig;
          else if (typeof versionConfig === "function") {
            const result = versionConfig(session2.session, session2.user);
            expectedVersion = result instanceof Promise ? await result : result;
          }
        }
        shouldExpireCookieCache = (session2.version || "1") !== expectedVersion;
      }
      if (!shouldExpireCookieCache) {
        const now2 = Date.now();
        const cachedSessionExpiresAt = new Date(session2.session.expiresAt).getTime();
        shouldExpireCookieCache = sessionDataPayload.expiresAt < now2 || !Number.isFinite(cachedSessionExpiresAt) || cachedSessionExpiresAt < now2;
      }
      if (shouldExpireCookieCache) expireCookie(ctx, ctx.context.authCookies.sessionData);
      else {
        const cookieRefreshCache = ctx.context.sessionConfig.cookieRefreshCache;
        if (cookieRefreshCache === false) {
          ctx.context.session = session2;
          const parsedSession3 = parseSessionOutput(ctx.context.options, {
            ...session2.session,
            expiresAt: new Date(session2.session.expiresAt),
            createdAt: new Date(session2.session.createdAt),
            updatedAt: new Date(session2.session.updatedAt)
          });
          const parsedUser3 = parseUserOutput(ctx.context.options, {
            ...session2.user,
            createdAt: new Date(session2.user.createdAt),
            updatedAt: new Date(session2.user.updatedAt)
          });
          return ctx.json({
            session: parsedSession3,
            user: parsedUser3
          });
        }
        const timeUntilExpiry = sessionDataPayload.expiresAt - Date.now();
        const updateAge2 = cookieRefreshCache.updateAge * 1e3;
        const shouldSkipSessionRefresh2 = await getShouldSkipSessionRefresh();
        if (timeUntilExpiry < updateAge2 && !shouldSkipSessionRefresh2) {
          const refreshedSession = {
            session: { ...session2.session },
            user: session2.user,
            updatedAt: Date.now()
          };
          await setCookieCache(ctx, refreshedSession, false);
          const sessionTokenOptions = ctx.context.authCookies.sessionToken.attributes;
          const sessionTokenMaxAge = dontRememberMe ? void 0 : ctx.context.sessionConfig.expiresIn;
          await ctx.setSignedCookie(ctx.context.authCookies.sessionToken.name, session2.session.token, ctx.context.secret, {
            ...sessionTokenOptions,
            maxAge: sessionTokenMaxAge
          });
          const parsedRefreshedSession = parseSessionOutput(ctx.context.options, {
            ...refreshedSession.session,
            expiresAt: new Date(refreshedSession.session.expiresAt),
            createdAt: new Date(refreshedSession.session.createdAt),
            updatedAt: new Date(refreshedSession.session.updatedAt)
          });
          const parsedRefreshedUser = parseUserOutput(ctx.context.options, {
            ...refreshedSession.user,
            createdAt: new Date(refreshedSession.user.createdAt),
            updatedAt: new Date(refreshedSession.user.updatedAt)
          });
          ctx.context.session = {
            session: parsedRefreshedSession,
            user: parsedRefreshedUser
          };
          return ctx.json({
            session: parsedRefreshedSession,
            user: parsedRefreshedUser
          });
        }
        const parsedSession2 = parseSessionOutput(ctx.context.options, {
          ...session2.session,
          expiresAt: new Date(session2.session.expiresAt),
          createdAt: new Date(session2.session.createdAt),
          updatedAt: new Date(session2.session.updatedAt)
        });
        const parsedUser2 = parseUserOutput(ctx.context.options, {
          ...session2.user,
          createdAt: new Date(session2.user.createdAt),
          updatedAt: new Date(session2.user.updatedAt)
        });
        ctx.context.session = {
          session: parsedSession2,
          user: parsedUser2
        };
        return ctx.json({
          session: parsedSession2,
          user: parsedUser2
        });
      }
    }
    const session = await ctx.context.internalAdapter.findSession(sessionCookieToken);
    if (!session || session.session.expiresAt < /* @__PURE__ */ new Date()) {
      deleteSessionCookie(ctx);
      if (session) {
        if (!deferSessionRefresh || isPostRequest) await ctx.context.internalAdapter.deleteSession(session.session.token);
      }
      return ctx.json(null);
    }
    ctx.context.session = session;
    if (dontRememberMe || ctx.query?.disableRefresh) {
      const parsedSession2 = parseSessionOutput(ctx.context.options, session.session);
      const parsedUser2 = parseUserOutput(ctx.context.options, session.user);
      return ctx.json({
        session: parsedSession2,
        user: parsedUser2
      });
    }
    const expiresIn = ctx.context.sessionConfig.expiresIn;
    const updateAge = ctx.context.sessionConfig.updateAge;
    const shouldBeUpdated = session.session.expiresAt.valueOf() - expiresIn * 1e3 + updateAge * 1e3 <= Date.now();
    const disableRefresh = ctx.query?.disableRefresh || ctx.context.options.session?.disableSessionRefresh;
    const shouldSkipSessionRefresh = await getShouldSkipSessionRefresh();
    const needsRefresh = shouldBeUpdated && !disableRefresh && !shouldSkipSessionRefresh;
    if (deferSessionRefresh && !isPostRequest) {
      await setCookieCache(ctx, session, !!dontRememberMe);
      const parsedSession2 = parseSessionOutput(ctx.context.options, session.session);
      const parsedUser2 = parseUserOutput(ctx.context.options, session.user);
      return ctx.json({
        session: parsedSession2,
        user: parsedUser2,
        needsRefresh
      });
    }
    if (needsRefresh) {
      const updatedSession = await ctx.context.internalAdapter.updateSession(session.session.token, {
        expiresAt: getDate(ctx.context.sessionConfig.expiresIn, "sec"),
        updatedAt: /* @__PURE__ */ new Date()
      });
      if (!updatedSession) {
        deleteSessionCookie(ctx);
        throw APIError2.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_SESSION);
      }
      const maxAge = ctx.context.sessionConfig.expiresIn;
      await setSessionCookie(ctx, {
        session: updatedSession,
        user: session.user
      }, false, { maxAge });
      const parsedUpdatedSession = parseSessionOutput(ctx.context.options, updatedSession);
      const parsedUser2 = parseUserOutput(ctx.context.options, session.user);
      return ctx.json({
        session: parsedUpdatedSession,
        user: parsedUser2
      });
    }
    await setCookieCache(ctx, session, !!dontRememberMe);
    const parsedSession = parseSessionOutput(ctx.context.options, session.session);
    const parsedUser = parseUserOutput(ctx.context.options, session.user);
    return ctx.json({
      session: parsedSession,
      user: parsedUser
    });
  } catch (error2) {
    ctx.context.session = null;
    if (isAPIError2(error2)) throw error2;
    ctx.context.logger.error("INTERNAL_SERVER_ERROR", error2);
    throw APIError2.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_GET_SESSION, { cause: error2 });
  }
});
var isStateful = (ctx) => hasServerSessionStore(ctx.context.options);
var getSessionFromCtx = async (ctx, config2) => {
  if (ctx.context.session) return ctx.context.session;
  const session = await getSession()({
    ...ctx,
    method: "GET",
    asResponse: false,
    headers: ctx.headers,
    returnHeaders: true,
    returnStatus: false,
    query: {
      ...config2,
      ...ctx.query,
      disableCookieCache: config2?.disableCookieCache || ctx.query?.disableCookieCache,
      disableRefresh: config2?.disableRefresh || ctx.query?.disableRefresh
    }
  }).catch(() => {
    return null;
  });
  if (!session) {
    ctx.context.session = null;
    return null;
  }
  if (session.headers) session.headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey === "cache-control" || lowerKey === "pragma") return;
    if (lowerKey === "set-cookie") ctx.responseHeaders.append(key, value);
    else ctx.responseHeaders.set(key, value);
  });
  ctx.context.session = session.response;
  return session.response;
};
var getAuthoritativeSessionFromCtx = async (ctx) => {
  if (!isStateful(ctx)) return getSessionFromCtx(ctx);
  ctx.context.session = null;
  return getSessionFromCtx(ctx, { disableCookieCache: true });
};
var sessionMiddleware = createAuthMiddleware(async (ctx) => {
  const session = await getSessionFromCtx(ctx);
  if (!session?.session) throw APIError2.from("UNAUTHORIZED", {
    message: "Unauthorized",
    code: "UNAUTHORIZED"
  });
  return { session };
});
var sensitiveSessionMiddleware = createAuthMiddleware(async (ctx) => {
  const session = await getAuthoritativeSessionFromCtx(ctx);
  if (!session?.session) throw APIError2.from("UNAUTHORIZED", {
    message: "Unauthorized",
    code: "UNAUTHORIZED"
  });
  return { session };
});
var requestOnlySessionMiddleware = createAuthMiddleware(async (ctx) => {
  const session = await getSessionFromCtx(ctx);
  if (!session?.session && (ctx.request || ctx.headers)) throw APIError2.from("UNAUTHORIZED", {
    message: "Unauthorized",
    code: "UNAUTHORIZED"
  });
  return { session };
});
var freshSessionMiddleware = createAuthMiddleware(async (ctx) => {
  const session = await getSessionFromCtx(ctx);
  if (!session?.session) throw APIError2.from("UNAUTHORIZED", {
    message: "Unauthorized",
    code: "UNAUTHORIZED"
  });
  if (ctx.context.sessionConfig.freshAge !== 0) {
    const createdAt = new Date(session.session.createdAt).getTime();
    const freshAge = ctx.context.sessionConfig.freshAge * 1e3;
    if (Date.now() - createdAt >= freshAge) throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.SESSION_NOT_FRESH);
  }
  return { session };
});
var listSessions = () => createAuthEndpoint("/list-sessions", {
  method: "GET",
  operationId: "listUserSessions",
  use: [freshSessionMiddleware],
  requireHeaders: true,
  metadata: { openapi: {
    operationId: "listUserSessions",
    description: "List all active sessions for the user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "array",
        items: { $ref: "#/components/schemas/Session" }
      } } }
    } }
  } }
}, async (ctx) => {
  try {
    const activeSessions = (await ctx.context.internalAdapter.listSessions(ctx.context.session.user.id, { onlyActiveSessions: true })).filter((session) => {
      return session.expiresAt > /* @__PURE__ */ new Date();
    });
    return ctx.json(activeSessions.map((session) => parseSessionOutput(ctx.context.options, session)));
  } catch (e) {
    ctx.context.logger.error(e);
    throw ctx.error("INTERNAL_SERVER_ERROR");
  }
});
var revokeSession = createAuthEndpoint("/revoke-session", {
  method: "POST",
  body: object({ token: string().meta({ description: "The token to revoke" }) }),
  use: [sensitiveSessionMiddleware],
  requireHeaders: true,
  metadata: { openapi: {
    description: "Revoke a single session",
    requestBody: { content: { "application/json": { schema: {
      type: "object",
      properties: { token: {
        type: "string",
        description: "The token to revoke"
      } },
      required: ["token"]
    } } } },
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: {
          type: "boolean",
          description: "Indicates if the session was revoked successfully"
        } },
        required: ["status"]
      } } }
    } }
  } }
}, async (ctx) => {
  const token = ctx.body.token;
  if ((await ctx.context.internalAdapter.findSession(token))?.session.userId === ctx.context.session.user.id) try {
    await ctx.context.internalAdapter.deleteSession(token);
  } catch (error2) {
    ctx.context.logger.error(error2 && typeof error2 === "object" && "name" in error2 ? error2.name : "", error2);
    throw APIError2.from("INTERNAL_SERVER_ERROR", {
      message: "Internal Server Error",
      code: "INTERNAL_SERVER_ERROR"
    });
  }
  if (token === ctx.context.session.session.token) deleteSessionCookie(ctx);
  return ctx.json({ status: true });
});
var revokeSessions = createAuthEndpoint("/revoke-sessions", {
  method: "POST",
  use: [sensitiveSessionMiddleware],
  requireHeaders: true,
  metadata: { openapi: {
    description: "Revoke all sessions for the user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: {
          type: "boolean",
          description: "Indicates if all sessions were revoked successfully"
        } },
        required: ["status"]
      } } }
    } }
  } }
}, async (ctx) => {
  try {
    await ctx.context.internalAdapter.deleteUserSessions(ctx.context.session.user.id);
  } catch (error2) {
    ctx.context.logger.error(error2 && typeof error2 === "object" && "name" in error2 ? error2.name : "", error2);
    throw APIError2.from("INTERNAL_SERVER_ERROR", {
      message: "Internal Server Error",
      code: "INTERNAL_SERVER_ERROR"
    });
  }
  deleteSessionCookie(ctx);
  return ctx.json({ status: true });
});
var revokeOtherSessions = createAuthEndpoint("/revoke-other-sessions", {
  method: "POST",
  requireHeaders: true,
  use: [sensitiveSessionMiddleware],
  metadata: { openapi: {
    description: "Revoke all other sessions for the user except the current one",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: {
          type: "boolean",
          description: "Indicates if all other sessions were revoked successfully"
        } },
        required: ["status"]
      } } }
    } }
  } }
}, async (ctx) => {
  const session = ctx.context.session;
  if (!session.user) throw APIError2.from("UNAUTHORIZED", {
    message: "Unauthorized",
    code: "UNAUTHORIZED"
  });
  const otherSessions = (await ctx.context.internalAdapter.listSessions(session.user.id)).filter((session2) => {
    return session2.expiresAt > /* @__PURE__ */ new Date();
  }).filter((session2) => session2.token !== ctx.context.session.session.token);
  await Promise.all(otherSessions.map((session2) => ctx.context.internalAdapter.deleteSession(session2.token)));
  return ctx.json({ status: true });
});

// node_modules/better-auth/dist/api/routes/email-verification.mjs
async function createEmailVerificationToken(secret, email2, updateTo, expiresIn = 3600, extraPayload) {
  return await signJWT({
    email: email2.toLowerCase(),
    updateTo: updateTo?.toLowerCase(),
    ...extraPayload
  }, secret, expiresIn);
}
async function sendVerificationEmailFn(ctx, user) {
  if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
    ctx.context.logger.error("Verification email isn't enabled.");
    throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.VERIFICATION_EMAIL_NOT_ENABLED);
  }
  const token = await createEmailVerificationToken(ctx.context.secret, user.email, void 0, ctx.context.options.emailVerification?.expiresIn, { userId: user.id });
  const callbackURL = ctx.body.callbackURL ? encodeURIComponent(ctx.body.callbackURL) : encodeURIComponent("/");
  const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
  await ctx.context.options.emailVerification.sendVerificationEmail({
    user,
    url,
    token
  }, ctx.request);
}
var sendVerificationEmail = createAuthEndpoint("/send-verification-email", {
  method: "POST",
  operationId: "sendVerificationEmail",
  cloneRequest: true,
  body: object({
    email: email().meta({ description: "The email to send the verification email to" }),
    callbackURL: string().meta({ description: "The URL to use for email verification callback" }).optional()
  }),
  metadata: { openapi: {
    operationId: "sendVerificationEmail",
    description: "Send a verification email to the user",
    requestBody: { content: { "application/json": { schema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "The email to send the verification email to",
          example: "user@example.com"
        },
        callbackURL: {
          type: "string",
          description: "The URL to use for email verification callback",
          example: "https://example.com/callback",
          nullable: true
        }
      },
      required: ["email"]
    } } } },
    responses: {
      "200": {
        description: "Success",
        content: { "application/json": { schema: {
          type: "object",
          properties: { status: {
            type: "boolean",
            description: "Indicates if the email was sent successfully",
            example: true
          } }
        } } }
      },
      "400": {
        description: "Bad Request",
        content: { "application/json": { schema: {
          type: "object",
          properties: { message: {
            type: "string",
            description: "Error message",
            example: "Verification email isn't enabled"
          } }
        } } }
      }
    }
  } }
}, async (ctx) => {
  if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
    ctx.context.logger.error("Verification email isn't enabled.");
    throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.VERIFICATION_EMAIL_NOT_ENABLED);
  }
  const { email: email2 } = ctx.body;
  const session = await getSessionFromCtx(ctx);
  if (!session) {
    const MINIMUM_MS = 500;
    const start = Date.now();
    const user = await ctx.context.internalAdapter.findUserByEmail(email2);
    let error2;
    if (!user || user.user.emailVerified) await createEmailVerificationToken(ctx.context.secret, email2, void 0, ctx.context.options.emailVerification?.expiresIn);
    else try {
      await sendVerificationEmailFn(ctx, user.user);
    } catch (e) {
      error2 = e;
    }
    const remaining = MINIMUM_MS - (Date.now() - start);
    if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining));
    if (error2) throw error2;
    return ctx.json({ status: true });
  }
  if (session?.user.email.toLowerCase() !== email2.toLowerCase()) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.EMAIL_MISMATCH);
  if (session?.user.emailVerified) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.EMAIL_ALREADY_VERIFIED);
  await sendVerificationEmailFn(ctx, session.user);
  return ctx.json({ status: true });
});
var verifyEmail = createAuthEndpoint("/verify-email", {
  method: "GET",
  operationId: "verifyEmail",
  query: object({
    token: string().meta({ description: "The token to verify the email" }),
    callbackURL: string().meta({ description: "The URL to redirect to after email verification" }).optional()
  }),
  use: [originCheck((ctx) => ctx.query.callbackURL)],
  metadata: { openapi: {
    description: "Verify the email of the user",
    parameters: [{
      name: "token",
      in: "query",
      description: "The token to verify the email",
      required: true,
      schema: { type: "string" }
    }, {
      name: "callbackURL",
      in: "query",
      description: "The URL to redirect to after email verification",
      required: false,
      schema: { type: "string" }
    }],
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          user: {
            type: "object",
            $ref: "#/components/schemas/User"
          },
          status: {
            type: "boolean",
            description: "Indicates if the email was verified successfully"
          }
        },
        required: ["user", "status"]
      } } }
    } }
  } }
}, async (ctx) => {
  function redirectOnError2(error2) {
    if (ctx.query.callbackURL) {
      const params = new URLSearchParams({ error: error2.code });
      const redirectURL = appendQueryParams(ctx.query.callbackURL, params);
      throw ctx.redirect(redirectURL);
    }
    throw APIError2.from("UNAUTHORIZED", error2);
  }
  const { token } = ctx.query;
  let jwt;
  try {
    jwt = await jwtVerify(token, new TextEncoder().encode(ctx.context.secret), { algorithms: ["HS256"] });
  } catch (e) {
    if (e instanceof JWTExpired) return redirectOnError2(BASE_ERROR_CODES.TOKEN_EXPIRED);
    return redirectOnError2(BASE_ERROR_CODES.INVALID_TOKEN);
  }
  const parsed = object({
    email: email(),
    updateTo: string().optional(),
    requestType: string().optional(),
    userId: string().optional()
  }).parse(jwt.payload);
  if (parsed.updateTo) {
    if (!parsed.userId) return redirectOnError2(BASE_ERROR_CODES.INVALID_TOKEN);
    const boundUser = await ctx.context.internalAdapter.findUserById(parsed.userId);
    if (!boundUser) return redirectOnError2(BASE_ERROR_CODES.USER_NOT_FOUND);
    if (boundUser.email.toLowerCase() !== parsed.email) return redirectOnError2(BASE_ERROR_CODES.INVALID_TOKEN);
    const session = await getSessionFromCtx(ctx);
    if (session && session.user.id !== boundUser.id) return redirectOnError2(BASE_ERROR_CODES.INVALID_USER);
    switch (parsed.requestType) {
      /**
      * User clicks confirmation -> sends verification to new email
      */
      case "change-email-confirmation": {
        const newToken = await createEmailVerificationToken(ctx.context.secret, parsed.email, parsed.updateTo, ctx.context.options.emailVerification?.expiresIn, {
          requestType: "change-email-verification",
          userId: boundUser.id
        });
        const updateCallbackURL = ctx.query.callbackURL ? encodeURIComponent(ctx.query.callbackURL) : encodeURIComponent("/");
        const url = `${ctx.context.baseURL}/verify-email?token=${newToken}&callbackURL=${updateCallbackURL}`;
        if (ctx.context.options.emailVerification?.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
          user: {
            ...boundUser,
            email: parsed.updateTo
          },
          url,
          token: newToken
        }, safeCloneRequest(ctx.request)));
        if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
        return ctx.json({ status: true });
      }
      /**
      * User clicks verification -> updates email
      */
      case "change-email-verification": {
        const emailVerified = boundUser.emailVerified;
        const updatedUser2 = await ctx.context.internalAdapter.updateUser(boundUser.id, {
          email: parsed.updateTo,
          emailVerified
        });
        if (emailVerified && ctx.context.options.emailVerification?.afterEmailVerification) await ctx.context.options.emailVerification.afterEmailVerification(updatedUser2, ctx.request);
        if (session) await setSessionCookie(ctx, {
          session: session.session,
          user: {
            ...session.user,
            email: parsed.updateTo,
            emailVerified
          }
        });
        if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
        return ctx.json({
          status: true,
          user: parseUserOutput(ctx.context.options, updatedUser2)
        });
      }
      /**
      * Legacy flow
      *
      * - skips two-step verification
      * - updates email immediately
      */
      default: {
        const updatedUser2 = await ctx.context.internalAdapter.updateUser(boundUser.id, {
          email: parsed.updateTo,
          emailVerified: false
        });
        const newToken = await createEmailVerificationToken(ctx.context.secret, parsed.updateTo, void 0, void 0, { userId: boundUser.id });
        const updateCallbackURL = ctx.query.callbackURL ? encodeURIComponent(ctx.query.callbackURL) : encodeURIComponent("/");
        if (ctx.context.options.emailVerification?.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
          user: updatedUser2,
          url: `${ctx.context.baseURL}/verify-email?token=${newToken}&callbackURL=${updateCallbackURL}`,
          token: newToken
        }, safeCloneRequest(ctx.request)));
        if (session) await setSessionCookie(ctx, {
          session: session.session,
          user: {
            ...session.user,
            email: parsed.updateTo,
            emailVerified: false
          }
        });
        if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
        return ctx.json({
          status: true,
          user: parseUserOutput(ctx.context.options, updatedUser2)
        });
      }
    }
  }
  const user = await ctx.context.internalAdapter.findUserByEmail(parsed.email);
  if (!user) return redirectOnError2(BASE_ERROR_CODES.USER_NOT_FOUND);
  if (parsed.userId && parsed.userId !== user.user.id) return redirectOnError2(BASE_ERROR_CODES.INVALID_TOKEN);
  if (user.user.emailVerified) {
    if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
    return ctx.json({
      status: true,
      user: null
    });
  }
  if (ctx.context.options.emailVerification?.beforeEmailVerification) await ctx.context.options.emailVerification.beforeEmailVerification(user.user, ctx.request);
  const updatedUser = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, { emailVerified: true });
  if (ctx.context.options.emailVerification?.afterEmailVerification) await ctx.context.options.emailVerification.afterEmailVerification(updatedUser, ctx.request);
  if (ctx.context.options.emailVerification?.autoSignInAfterVerification) {
    const currentSession = await getSessionFromCtx(ctx);
    if (!currentSession || currentSession.user.email !== parsed.email) {
      const session = await ctx.context.internalAdapter.createSession(user.user.id);
      if (!session) throw APIError2.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
      await setSessionCookie(ctx, {
        session,
        user: {
          ...user.user,
          emailVerified: true
        }
      });
    } else await setSessionCookie(ctx, {
      session: currentSession.session,
      user: {
        ...currentSession.user,
        emailVerified: true
      }
    });
  }
  if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
  return ctx.json({
    status: true,
    user: null
  });
});

// node_modules/better-auth/dist/oauth2/utils.mjs
function isLikelyEncrypted(token) {
  if (token.startsWith("$ba$")) return true;
  return token.length % 2 === 0 && /^[0-9a-f]+$/i.test(token);
}
function decryptOAuthToken(token, ctx) {
  if (!token) return token;
  if (ctx.options.account?.encryptOAuthTokens) {
    if (!isLikelyEncrypted(token)) return token;
    return symmetricDecrypt({
      key: ctx.secretConfig,
      data: token
    });
  }
  return token;
}
function setTokenUtil(token, ctx) {
  if (ctx.options.account?.encryptOAuthTokens && token) return symmetricEncrypt({
    key: ctx.secretConfig,
    data: token
  });
  return token;
}
function getOAuthCallbackPath(provider) {
  if (!provider.callbackPath) return `/callback/${provider.id}`;
  return provider.callbackPath.startsWith("/") ? provider.callbackPath : `/${provider.callbackPath}`;
}

// node_modules/@better-auth/core/dist/oauth2/utils.mjs
function parseScopeField(scope) {
  if (Array.isArray(scope)) return scope.map((s) => typeof s === "string" ? s.trim() : "").filter(Boolean);
  if (typeof scope === "string") return scope.trim().split(/\s+/).filter(Boolean);
  return [];
}
function getOAuth2Tokens(data) {
  const getDate2 = (seconds) => {
    return new Date((/* @__PURE__ */ new Date()).getTime() + seconds * 1e3);
  };
  return {
    tokenType: data.token_type,
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    accessTokenExpiresAt: data.expires_in ? getDate2(data.expires_in) : void 0,
    refreshTokenExpiresAt: data.refresh_token_expires_in ? getDate2(data.refresh_token_expires_in) : void 0,
    scopes: parseScopeField(data.scope),
    idToken: data.id_token,
    raw: data
  };
}
function mergeScopes(stored, incoming) {
  const existing = stored ? stored.split(",").map((scope) => scope.trim()).filter(Boolean) : [];
  const next = (incoming ?? []).map((scope) => scope.trim()).filter(Boolean);
  return [.../* @__PURE__ */ new Set([...existing, ...next])].join(",");
}
function parseStringBoolean(value) {
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
}
function getPrimaryClientId(clientId) {
  const value = Array.isArray(clientId) ? clientId[0] : clientId;
  return typeof value === "string" && value.length > 0 ? value : void 0;
}
async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return base64Url.encode(new Uint8Array(hash), { padding: false });
}

// node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs
var RESERVED_AUTHORIZATION_PARAMS = [
  "state",
  "client_id",
  "redirect_uri",
  "response_type",
  "code_challenge",
  "code_challenge_method",
  "nonce",
  "scope"
];
var RESERVED_AUTHORIZATION_PARAMS_SET = new Set(RESERVED_AUTHORIZATION_PARAMS);
function withQueryParams(endpoint, params) {
  const url = new URL(endpoint);
  const query = url.search.slice(1);
  const kept = query ? query.split("&").filter((pair) => {
    if (pair === "") return true;
    const [name = ""] = new URLSearchParams(`&${pair}`).keys();
    return !params.has(name);
  }) : [];
  const added = params.toString();
  const search = (added ? [...kept, added] : kept).join("&");
  url.search = search ? `?${search}` : "";
  return url.href;
}
async function createAuthorizationURL({ id, options, authorizationEndpoint: authorizationEndpoint3, state, codeVerifier, scopes, claims, redirectURI, duration, prompt, accessType, responseType, display, loginHint, nonce, hd, responseMode, additionalParams, scopeJoiner }) {
  options = typeof options === "function" ? await options() : options;
  const params = new URLSearchParams();
  params.set("response_type", responseType || "code");
  const primaryClientId = getPrimaryClientId(options.clientId);
  if (!primaryClientId) throw new Error("OAuth provider requires clientId");
  params.set("client_id", primaryClientId);
  params.set("state", state);
  if (scopes?.length) params.set("scope", scopes.join(scopeJoiner || " "));
  params.set("redirect_uri", options.redirectURI || redirectURI);
  duration && params.set("duration", duration);
  display && params.set("display", display);
  loginHint && params.set("login_hint", loginHint);
  nonce && params.set("nonce", nonce);
  prompt && params.set("prompt", prompt);
  hd && params.set("hd", hd);
  accessType && params.set("access_type", accessType);
  responseMode && params.set("response_mode", responseMode);
  if (codeVerifier) {
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    params.set("code_challenge_method", "S256");
    params.set("code_challenge", codeChallenge);
  }
  if (claims) {
    const claimsObj = claims.reduce((acc, claim) => {
      acc[claim] = null;
      return acc;
    }, {});
    params.set("claims", JSON.stringify({ id_token: {
      email: null,
      email_verified: null,
      ...claimsObj
    } }));
  }
  if (additionalParams) for (const [key, value] of Object.entries(additionalParams)) {
    if (RESERVED_AUTHORIZATION_PARAMS_SET.has(key)) continue;
    params.set(key, value);
  }
  return new URL(withQueryParams(options.authorizationEndpoint || authorizationEndpoint3, params));
}

// node_modules/@better-auth/core/dist/oauth2/authorization-params.mjs
var additionalAuthorizationParamsSchema = record(string(), string()).refine((value) => !Object.keys(value).some((key) => RESERVED_AUTHORIZATION_PARAMS_SET.has(key)), { message: `additionalParams cannot include reserved OAuth parameters: ${RESERVED_AUTHORIZATION_PARAMS.join(", ")}` }).meta({ description: "Extra query parameters to append to the provider authorization URL (e.g. Cognito identity_provider, Google hd)." }).optional();

// node_modules/@better-auth/core/dist/oauth2/basic-credentials.mjs
function formUrlEncode(value) {
  return new URLSearchParams({ v: value }).toString().slice(2);
}
function encodeBasicCredentials(clientId, clientSecret) {
  const payload = `${formUrlEncode(clientId)}:${formUrlEncode(clientSecret)}`;
  return `Basic ${base64.encode(payload)}`;
}

// node_modules/@better-auth/core/dist/oauth2/client-assertion.mjs
var CLIENT_ASSERTION_TYPE = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
async function resolveClientAssertionParams({ getClientAssertion, context }) {
  return {
    client_assertion: await getClientAssertion(context),
    client_assertion_type: CLIENT_ASSERTION_TYPE
  };
}

// node_modules/@better-fetch/fetch/dist/index.js
var BetterFetchError = class extends Error {
  constructor(status, statusText, error2) {
    super(statusText || status.toString(), { cause: error2 });
    this.status = status;
    this.statusText = statusText;
    this.error = error2;
    Error.captureStackTrace(this, this.constructor);
  }
};
var initializePlugins = async (url, options) => {
  let opts = options || {};
  const hooks = {
    onRequest: [options === null || options === void 0 ? void 0 : options.onRequest],
    onResponse: [options === null || options === void 0 ? void 0 : options.onResponse],
    onSuccess: [options === null || options === void 0 ? void 0 : options.onSuccess],
    onError: [options === null || options === void 0 ? void 0 : options.onError],
    onRetry: [options === null || options === void 0 ? void 0 : options.onRetry]
  };
  if (!options || !(options === null || options === void 0 ? void 0 : options.plugins)) return {
    url,
    options: opts,
    hooks
  };
  for (const plugin of (options === null || options === void 0 ? void 0 : options.plugins) || []) {
    var _plugin$hooks, _plugin$hooks2, _plugin$hooks3, _plugin$hooks4, _plugin$hooks5;
    if (plugin.init) {
      var _plugin$init;
      const pluginRes = await ((_plugin$init = plugin.init) === null || _plugin$init === void 0 ? void 0 : _plugin$init.call(plugin, url.toString(), opts));
      opts = pluginRes.options || opts;
      url = pluginRes.url;
    }
    hooks.onRequest.push((_plugin$hooks = plugin.hooks) === null || _plugin$hooks === void 0 ? void 0 : _plugin$hooks.onRequest);
    hooks.onResponse.push((_plugin$hooks2 = plugin.hooks) === null || _plugin$hooks2 === void 0 ? void 0 : _plugin$hooks2.onResponse);
    hooks.onSuccess.push((_plugin$hooks3 = plugin.hooks) === null || _plugin$hooks3 === void 0 ? void 0 : _plugin$hooks3.onSuccess);
    hooks.onError.push((_plugin$hooks4 = plugin.hooks) === null || _plugin$hooks4 === void 0 ? void 0 : _plugin$hooks4.onError);
    hooks.onRetry.push((_plugin$hooks5 = plugin.hooks) === null || _plugin$hooks5 === void 0 ? void 0 : _plugin$hooks5.onRetry);
  }
  return {
    url,
    options: opts,
    hooks
  };
};
var LinearRetryStrategy = class {
  constructor(options) {
    this.options = options;
  }
  shouldAttemptRetry(attempt, response) {
    if (this.options.shouldRetry) return Promise.resolve(attempt < this.options.attempts && this.options.shouldRetry(response));
    return Promise.resolve(attempt < this.options.attempts);
  }
  getDelay() {
    return this.options.delay;
  }
};
var ExponentialRetryStrategy = class {
  constructor(options) {
    this.options = options;
  }
  shouldAttemptRetry(attempt, response) {
    if (this.options.shouldRetry) return Promise.resolve(attempt < this.options.attempts && this.options.shouldRetry(response));
    return Promise.resolve(attempt < this.options.attempts);
  }
  getDelay(attempt) {
    return Math.min(this.options.maxDelay, this.options.baseDelay * 2 ** attempt);
  }
};
function createRetryStrategy(options) {
  if (typeof options === "number") return new LinearRetryStrategy({
    type: "linear",
    attempts: options,
    delay: 1e3
  });
  switch (options.type) {
    case "linear":
      return new LinearRetryStrategy(options);
    case "exponential":
      return new ExponentialRetryStrategy(options);
    default:
      throw new Error("Invalid retry strategy");
  }
}
var methods = [
  "get",
  "post",
  "put",
  "patch",
  "delete"
];
function parseMethodModifier(path2) {
  if (!path2.startsWith("@")) return {
    method: void 0,
    path: path2
  };
  const separator = path2.indexOf("/");
  const method = path2.slice(1, separator === -1 ? void 0 : separator);
  if (!methods.includes(method)) return {
    method: void 0,
    path: path2
  };
  return {
    method,
    path: separator === -1 ? path2 : path2.slice(separator + 1)
  };
}
var ORIGIN_RE = /^[a-z][a-z\d+.-]*:\/\/[^/?#]+/i;
var LEADING_SLASHES_RE = /^\/+/;
function withoutTrailingSlashes(value) {
  let end = value.length;
  while (end > 0 && value[end - 1] === "/") end--;
  return value.slice(0, end);
}
function splitOnce(value, separator) {
  const index = value.indexOf(separator);
  if (index === -1) return [value, void 0];
  return [value.slice(0, index), value.slice(index + 1)];
}
var isReservedPathSegment = (value) => value === "." || value === "..";
var encodeLiteralPathSegment = (segment) => segment.split(":").map((part) => encodeURIComponent(part)).join(":");
function resolvePathSegment(segment, pathParams) {
  const pathParam = pathParams.get(segment);
  if (pathParam === void 0) return encodeLiteralPathSegment(segment);
  if (isReservedPathSegment(pathParam)) throw new TypeError("Path parameters cannot be reserved path segments");
  return encodeURIComponent(pathParam);
}
function getPathParams(path2, params) {
  const pathParams = /* @__PURE__ */ new Map();
  if (params) if (Array.isArray(params)) {
    const paramPaths = path2.split("/").filter((p) => p.startsWith(":"));
    for (const [index, key] of paramPaths.entries()) {
      const value = params[index];
      pathParams.set(key, String(value));
    }
  } else for (const [key, value] of Object.entries(params)) pathParams.set(`:${key}`, String(value));
  return pathParams;
}
function fillPath(path2, params) {
  const pathParams = getPathParams(path2, params);
  return path2.split("/").map((segment) => resolvePathSegment(segment, pathParams)).join("/");
}
function serializeQuery(urlQuery, query) {
  const queryParams = new URLSearchParams(urlQuery);
  for (const [key, value] of Object.entries(query || {})) {
    if (value == null) continue;
    let serializedValue;
    if (typeof value === "string") serializedValue = value;
    else if (Array.isArray(value)) {
      for (const val of value) queryParams.append(key, val);
      continue;
    } else serializedValue = JSON.stringify(value);
    queryParams.set(key, serializedValue);
  }
  const queryParamString = queryParams.toString();
  return queryParamString.length > 0 ? `?${queryParamString}`.replace(/\+/g, "%20") : "";
}
function withoutBase(input, baseURL) {
  if (!baseURL) return input;
  const basePath = `${withoutTrailingSlashes(baseURL)}/`;
  return input.startsWith(basePath) ? input.slice(basePath.length) : input;
}
function joinURL(base, path2, urlQuery, query) {
  const [baseWithoutHash] = splitOnce(base, "#");
  const [basePath, baseQuery = ""] = splitOnce(baseWithoutHash, "?");
  const relativePath = path2.replace(LEADING_SLASHES_RE, "");
  const search = serializeQuery(`${baseQuery}&${urlQuery !== null && urlQuery !== void 0 ? urlQuery : ""}`, query);
  const href = `${withoutTrailingSlashes(basePath)}/${relativePath}${search}`;
  return ORIGIN_RE.test(href) ? new URL(href) : href;
}
function getURL$1(url, option) {
  var _input$match, _ref;
  const { baseURL, params, query } = option || {
    query: {},
    params: {},
    baseURL: ""
  };
  const { path: requestPath } = parseMethodModifier(url);
  const input = requestPath === url ? url : `/${requestPath}`;
  const origin = (_input$match = input.match(ORIGIN_RE)) === null || _input$match === void 0 ? void 0 : _input$match[0];
  const [path2, urlQuery] = splitOnce(origin ? input.slice(origin.length) : withoutBase(input, baseURL), "?");
  const filledPath = fillPath(path2, params);
  return joinURL((_ref = origin !== null && origin !== void 0 ? origin : baseURL) !== null && _ref !== void 0 ? _ref : "", filledPath, urlQuery, query);
}
var getAuthHeader = async (options) => {
  const headers = {};
  const getValue = async (value) => typeof value === "function" ? await value() : value;
  if (options === null || options === void 0 ? void 0 : options.auth) {
    if (options.auth.type === "Bearer") {
      const token = await getValue(options.auth.token);
      if (!token) return headers;
      headers["authorization"] = `Bearer ${token}`;
    } else if (options.auth.type === "Basic") {
      const [username, password] = await Promise.all([getValue(options.auth.username), getValue(options.auth.password)]);
      if (!username || !password) return headers;
      headers["authorization"] = `Basic ${btoa(`${username}:${password}`)}`;
    } else if (options.auth.type === "Custom") {
      const [prefix, value] = await Promise.all([getValue(options.auth.prefix), getValue(options.auth.value)]);
      if (!value) return headers;
      headers["authorization"] = `${prefix !== null && prefix !== void 0 ? prefix : ""} ${value}`;
    }
  }
  return headers;
};
var JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(request) {
  const _contentType = request.headers.get("content-type");
  const textTypes = /* @__PURE__ */ new Set([
    "image/svg",
    "application/xml",
    "application/xhtml",
    "application/html"
  ]);
  if (!_contentType) return "json";
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) return "json";
  if (textTypes.has(contentType) || contentType.startsWith("text/")) return "text";
  return "blob";
}
function isJSONParsable(value) {
  try {
    JSON.parse(value);
    return true;
  } catch (error2) {
    return false;
  }
}
function isJSONSerializable2(value) {
  if (value === void 0) return false;
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) return true;
  if (t !== "object") return false;
  if (Array.isArray(value)) return true;
  if (value.buffer) return false;
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
function jsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (error2) {
    return text;
  }
}
function isFunction(value) {
  return typeof value === "function";
}
function getFetch(options) {
  if (options === null || options === void 0 ? void 0 : options.customFetchImpl) return options.customFetchImpl;
  if (typeof globalThis !== "undefined" && isFunction(globalThis.fetch)) return globalThis.fetch;
  if (typeof window !== "undefined" && isFunction(window.fetch)) return window.fetch;
  throw new Error("No fetch implementation found");
}
function mergeHeaders(...sources) {
  const merged = {};
  for (const source of sources) {
    if (!source) continue;
    if (source instanceof Headers) source.forEach((value, key) => {
      merged[key] = value;
    });
    else {
      const entries = Array.isArray(source) ? source : Object.entries(source);
      for (const [key, value] of entries) if (value !== null && value !== void 0) merged[key] = value;
    }
  }
  return merged;
}
async function getHeaders(opts) {
  const headers = new Headers(mergeHeaders(opts === null || opts === void 0 ? void 0 : opts.headers, await getAuthHeader(opts)));
  if (!headers.has("content-type")) {
    const contentType = detectContentType(opts === null || opts === void 0 ? void 0 : opts.body);
    if (contentType) headers.set("content-type", contentType);
  }
  return headers;
}
function detectContentType(body) {
  if (isJSONSerializable2(body)) return "application/json";
  return null;
}
function getMediaType(headers) {
  const contentType = headers.get("content-type");
  return contentType ? contentType.split(";")[0].trim().toLowerCase() : null;
}
function getBody2(options, headers) {
  const { body } = options;
  if (!body) return null;
  if (!isJSONSerializable2(body)) return body;
  if (typeof body === "string") return body;
  if (getMediaType(headers) === "application/x-www-form-urlencoded") return new URLSearchParams(body).toString();
  return JSON.stringify(body);
}
function getMethod(url, options) {
  if (options === null || options === void 0 ? void 0 : options.method) return options.method.toUpperCase();
  const { method } = parseMethodModifier(url);
  if (method) return method.toUpperCase();
  return (options === null || options === void 0 ? void 0 : options.body) ? "POST" : "GET";
}
function getTimeout(options, controller) {
  let abortTimeout;
  if (!(options === null || options === void 0 ? void 0 : options.signal) && (options === null || options === void 0 ? void 0 : options.timeout)) abortTimeout = setTimeout(() => controller === null || controller === void 0 ? void 0 : controller.abort(), options === null || options === void 0 ? void 0 : options.timeout);
  return {
    abortTimeout,
    clearTimeout: () => {
      if (abortTimeout) clearTimeout(abortTimeout);
    }
  };
}
var ValidationError2 = class ValidationError3 extends Error {
  constructor(issues, message2) {
    super(message2 || JSON.stringify(issues, null, 2));
    this.issues = issues;
    Object.setPrototypeOf(this, ValidationError3.prototype);
  }
};
async function parseStandardSchema(schema2, input) {
  const result = await schema2["~standard"].validate(input);
  if (result.issues) throw new ValidationError2(result.issues);
  return result.value;
}
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var betterFetch = async (url, options) => {
  var _opts$signal, _options$body, _options$jsonParser;
  const { hooks, url: __url, options: opts } = await initializePlugins(url, options);
  const fetch2 = getFetch(opts);
  const controller = new AbortController();
  const signal = (_opts$signal = opts.signal) !== null && _opts$signal !== void 0 ? _opts$signal : controller.signal;
  const _url = getURL$1(__url, opts);
  const headers = await getHeaders(opts);
  const body = getBody2(opts, headers);
  const method = getMethod(__url, opts);
  const context = _objectSpread2(_objectSpread2({}, opts), {}, {
    url: _url,
    headers,
    body,
    method,
    signal
  });
  for (const onRequest of hooks.onRequest) if (onRequest) {
    const res = await onRequest(context);
    if (typeof res === "object" && res !== null) Object.assign(context, res);
  }
  if ("pipeTo" in context && typeof context.pipeTo === "function" || typeof (options === null || options === void 0 || (_options$body = options.body) === null || _options$body === void 0 ? void 0 : _options$body.pipe) === "function") {
    if (!("duplex" in context)) context.duplex = "half";
  }
  const { clearTimeout: clearTimeout2 } = getTimeout(opts, controller);
  let response = await fetch2(context.url, context);
  clearTimeout2();
  const responseContext = {
    response,
    request: context
  };
  for (const onResponse of hooks.onResponse) if (onResponse) {
    var _options$hookOptions;
    const r = await onResponse(_objectSpread2(_objectSpread2({}, responseContext), {}, { response: (options === null || options === void 0 || (_options$hookOptions = options.hookOptions) === null || _options$hookOptions === void 0 ? void 0 : _options$hookOptions.cloneResponse) ? response.clone() : response }));
    if (r instanceof Response) response = r;
    else if (typeof r === "object" && r !== null) response = r.response;
  }
  if (response.ok) {
    if (!(context.method !== "HEAD")) return {
      data: "",
      error: null
    };
    const responseType = detectResponseType(response);
    const successContext = {
      data: null,
      response,
      request: context
    };
    if (responseType === "json" || responseType === "text") {
      var _context$jsonParser;
      const text = await response.text();
      successContext.data = await ((_context$jsonParser = context.jsonParser) !== null && _context$jsonParser !== void 0 ? _context$jsonParser : jsonParse)(text);
    } else successContext.data = await response[responseType]();
    if (context === null || context === void 0 ? void 0 : context.output) {
      if (context.output && !context.disableValidation) successContext.data = await parseStandardSchema(context.output, successContext.data);
    }
    for (const onSuccess of hooks.onSuccess) if (onSuccess) {
      var _options$hookOptions2;
      await onSuccess(_objectSpread2(_objectSpread2({}, successContext), {}, { response: (options === null || options === void 0 || (_options$hookOptions2 = options.hookOptions) === null || _options$hookOptions2 === void 0 ? void 0 : _options$hookOptions2.cloneResponse) ? response.clone() : response }));
    }
    if (options === null || options === void 0 ? void 0 : options.throw) return successContext.data;
    return {
      data: successContext.data,
      error: null
    };
  }
  const parser = (_options$jsonParser = options === null || options === void 0 ? void 0 : options.jsonParser) !== null && _options$jsonParser !== void 0 ? _options$jsonParser : jsonParse;
  const responseText = await response.text();
  const isJSONResponse2 = isJSONParsable(responseText);
  const errorObject = isJSONResponse2 ? await parser(responseText) : null;
  const errorContext = {
    response,
    responseText,
    request: context,
    error: _objectSpread2(_objectSpread2({}, errorObject), {}, {
      status: response.status,
      statusText: response.statusText
    })
  };
  for (const onError of hooks.onError) if (onError) {
    var _options$hookOptions3;
    await onError(_objectSpread2(_objectSpread2({}, errorContext), {}, { response: (options === null || options === void 0 || (_options$hookOptions3 = options.hookOptions) === null || _options$hookOptions3 === void 0 ? void 0 : _options$hookOptions3.cloneResponse) ? response.clone() : response }));
  }
  if (options === null || options === void 0 ? void 0 : options.retry) {
    var _options$retryAttempt;
    const retryStrategy = createRetryStrategy(options.retry);
    const _retryAttempt = (_options$retryAttempt = options.retryAttempt) !== null && _options$retryAttempt !== void 0 ? _options$retryAttempt : 0;
    if (await retryStrategy.shouldAttemptRetry(_retryAttempt, response)) {
      for (const onRetry of hooks.onRetry) if (onRetry) await onRetry(responseContext);
      const delay = retryStrategy.getDelay(_retryAttempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return await betterFetch(url, _objectSpread2(_objectSpread2({}, options), {}, { retryAttempt: _retryAttempt + 1 }));
    }
  }
  if (options === null || options === void 0 ? void 0 : options.throw) throw new BetterFetchError(response.status, response.statusText, isJSONResponse2 ? errorObject : responseText);
  return {
    data: null,
    error: _objectSpread2(_objectSpread2({}, errorObject), {}, {
      status: response.status,
      statusText: response.statusText
    })
  };
};

// node_modules/@better-auth/core/dist/oauth2/reject-redirects.mjs
var httpRedirectStatuses = /* @__PURE__ */ new Set([
  301,
  302,
  303,
  307,
  308
]);
function isRedirectResponse(response) {
  return response.type === "opaqueredirect" || httpRedirectStatuses.has(response.status);
}
function redirectRefused(endpoint) {
  return new BetterAuthError(`The OAuth endpoint "${endpoint}" returned an HTTP redirect. Server-side OAuth fetches refuse redirects to prevent SSRF; configure the final endpoint URL.`);
}
async function fetchRefusingRedirects(url, options) {
  let redirected = false;
  const onError = options?.onError;
  const result = await betterFetch(url, {
    ...options,
    redirect: "manual",
    async onError(context) {
      if (isRedirectResponse(context.response)) redirected = true;
      await onError?.(context);
    }
  }).catch((error2) => {
    if (redirected) throw redirectRefused(url);
    throw error2;
  });
  if (redirected) throw redirectRefused(url);
  return result;
}

// node_modules/@better-auth/core/dist/oauth2/token-endpoint-auth.mjs
function getDefaultTokenEndpointAuth(options, authentication) {
  if (authentication === "basic") return { method: "client_secret_basic" };
  if (options.clientSecret) return { method: "client_secret_post" };
  return { method: "none" };
}
function assertNoClientSecret(method, options, body) {
  if (options.clientSecret || body.has("client_secret")) throw new Error(`${method} token endpoint authentication cannot be combined with clientSecret`);
}
function setClientId(body, clientId) {
  if (clientId) body.set("client_id", clientId);
}
function assertClientSecretConfigured(method, options) {
  if (!options.clientSecret) throw new Error(`${method} token endpoint authentication requires clientSecret`);
}
function assertClientIdConfigured(method, clientId) {
  if (!clientId) throw new Error(`${method} token endpoint authentication requires clientId`);
}
function setClientSecretPostAuth({ body, options, clientId, requireClientSecret }) {
  if (requireClientSecret) assertClientSecretConfigured("client_secret_post", options);
  if (options.clientSecret) {
    assertClientIdConfigured("client_secret_post", clientId);
    setClientId(body, clientId);
    body.set("client_secret", options.clientSecret);
  }
}
function setClientSecretBasicAuth({ headers, options, clientId, body }) {
  if (body.has("client_secret")) throw new Error("client_secret_basic token endpoint authentication cannot be combined with client_secret body parameters");
  assertClientSecretConfigured("client_secret_basic", options);
  assertClientIdConfigured("client_secret_basic", clientId);
  headers.authorization = encodeBasicCredentials(clientId, options.clientSecret);
}
function assertCompleteManualClientAssertion(body) {
  if (body.has("client_assertion") !== body.has("client_assertion_type")) throw new Error("client_assertion and client_assertion_type must both be provided");
}
function caseInsensitiveHeaders(headers) {
  const lower = (key) => typeof key === "string" ? key.toLowerCase() : key;
  const existing = (key) => Object.prototype.hasOwnProperty.call(headers, lower(key)) ? lower(key) : key;
  return new Proxy(headers, {
    get: (target, key) => Reflect.get(target, existing(key)),
    set: (target, key, value) => Reflect.set(target, lower(key), value),
    has: (target, key) => Reflect.has(target, existing(key)),
    deleteProperty: (target, key) => Reflect.deleteProperty(target, lower(key)),
    getOwnPropertyDescriptor: (target, key) => Reflect.getOwnPropertyDescriptor(target, existing(key))
  });
}
async function applyTokenEndpointAuth({ body, headers, options, tokenEndpoint: tokenEndpoint3, grantType, tokenEndpointAuth, authentication }) {
  assertCompleteManualClientAssertion(body);
  const clientId = getPrimaryClientId(options.clientId);
  if (body.has("client_assertion")) {
    if (tokenEndpointAuth) throw new Error("client_assertion body parameters cannot be combined with tokenEndpointAuth");
    assertNoClientSecret("private_key_jwt", options, body);
    setClientId(body, clientId);
    return;
  }
  const auth2 = tokenEndpointAuth ?? getDefaultTokenEndpointAuth(options, authentication);
  if (auth2.method === "custom") {
    await auth2.customizeRequest({
      body,
      headers: caseInsensitiveHeaders(headers),
      options,
      tokenEndpoint: tokenEndpoint3,
      grantType
    });
    assertCompleteManualClientAssertion(body);
    return;
  }
  if (auth2.method === "private_key_jwt") {
    assertNoClientSecret(auth2.method, options, body);
    assertClientIdConfigured(auth2.method, clientId);
    if (!tokenEndpoint3) throw new Error("private_key_jwt token endpoint authentication requires tokenEndpoint");
    const assertionParams = await resolveClientAssertionParams({
      getClientAssertion: auth2.getClientAssertion,
      context: {
        clientId,
        tokenEndpoint: tokenEndpoint3,
        grantType
      }
    });
    setClientId(body, clientId);
    for (const [key, value] of Object.entries(assertionParams)) body.set(key, value);
    return;
  }
  if (auth2.method === "none") {
    assertNoClientSecret(auth2.method, options, body);
    if (grantType === "client_credentials") throw new Error("none token endpoint authentication cannot be used with client_credentials grant");
    assertClientIdConfigured(auth2.method, clientId);
    setClientId(body, clientId);
    return;
  }
  if (auth2.method === "client_secret_basic") {
    setClientSecretBasicAuth({
      headers,
      options,
      clientId,
      body
    });
    return;
  }
  setClientSecretPostAuth({
    body,
    options,
    clientId,
    requireClientSecret: tokenEndpointAuth?.method === "client_secret_post"
  });
}

// node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs
var BLOCKED_REFRESH_TOKEN_PARAMS_SET = /* @__PURE__ */ new Set([
  "grant_type",
  "refresh_token",
  "__proto__",
  "constructor",
  "prototype"
]);
async function refreshAccessTokenRequest({ refreshToken: refreshToken2, options, authentication, tokenEndpointAuth, tokenEndpoint: tokenEndpoint3, extraParams, resource, headers }) {
  options = typeof options === "function" ? await options() : options;
  const request = buildRefreshAccessTokenRequest({
    refreshToken: refreshToken2,
    options,
    extraParams,
    resource,
    headers
  });
  await applyTokenEndpointAuth({
    body: request.body,
    headers: request.headers,
    options,
    tokenEndpoint: tokenEndpoint3 ?? "",
    grantType: "refresh_token",
    tokenEndpointAuth,
    authentication
  });
  return request;
}
function applyRefreshExtraParams(body, extraParams) {
  if (!extraParams) return;
  for (const [key, value] of Object.entries(extraParams)) {
    if (BLOCKED_REFRESH_TOKEN_PARAMS_SET.has(key)) continue;
    body.set(key, value);
  }
}
function buildRefreshAccessTokenRequest({ refreshToken: refreshToken2, options, extraParams, resource, headers: extraHeaders }) {
  const body = new URLSearchParams();
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    accept: "application/json"
  };
  for (const [key, value] of Object.entries(extraHeaders ?? {})) headers[key.toLowerCase()] = value;
  body.set("grant_type", "refresh_token");
  body.set("refresh_token", refreshToken2);
  if (resource) {
    if (typeof resource === "string") body.append("resource", resource);
    else for (const _resource of resource) body.append("resource", _resource);
  }
  if (extraParams) applyRefreshExtraParams(body, extraParams);
  return {
    body,
    headers
  };
}
async function refreshAccessToken({ refreshToken: refreshToken2, options, tokenEndpoint: tokenEndpoint3, authentication, tokenEndpointAuth, extraParams, resource, headers: extraHeaders }) {
  const { body, headers } = await refreshAccessTokenRequest({
    refreshToken: refreshToken2,
    options,
    authentication,
    tokenEndpointAuth,
    tokenEndpoint: tokenEndpoint3,
    extraParams,
    resource,
    headers: extraHeaders
  });
  const { data, error: error2 } = await fetchRefusingRedirects(tokenEndpoint3, {
    method: "POST",
    body,
    headers
  });
  if (error2) throw error2;
  if (typeof data.access_token !== "string" || !data.access_token) throw data;
  const tokens = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    tokenType: data.token_type,
    scopes: parseScopeField(data.scope),
    idToken: data.id_token
  };
  if (data.expires_in) tokens.accessTokenExpiresAt = new Date((/* @__PURE__ */ new Date()).getTime() + data.expires_in * 1e3);
  if (data.refresh_token_expires_in) tokens.refreshTokenExpiresAt = new Date((/* @__PURE__ */ new Date()).getTime() + data.refresh_token_expires_in * 1e3);
  return tokens;
}

// node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs
async function authorizationCodeRequest({ code, codeVerifier, redirectURI, options, authentication, tokenEndpointAuth, tokenEndpoint: tokenEndpoint3, deviceId, headers, additionalParams = {}, resource }) {
  options = typeof options === "function" ? await options() : options;
  const request = buildAuthorizationCodeRequest({
    code,
    codeVerifier,
    redirectURI,
    options,
    deviceId,
    headers,
    additionalParams,
    resource
  });
  await applyTokenEndpointAuth({
    body: request.body,
    headers: request.headers,
    options,
    tokenEndpoint: tokenEndpoint3 ?? "",
    grantType: "authorization_code",
    tokenEndpointAuth,
    authentication
  });
  return request;
}
function buildAuthorizationCodeRequest({ code, codeVerifier, redirectURI, options, deviceId, headers, additionalParams = {}, resource }) {
  const body = new URLSearchParams();
  const requestHeaders = {
    "content-type": "application/x-www-form-urlencoded",
    accept: "application/json"
  };
  for (const [key, value] of Object.entries(headers ?? {})) requestHeaders[key.toLowerCase()] = value;
  body.set("grant_type", "authorization_code");
  body.set("code", code);
  codeVerifier && body.set("code_verifier", codeVerifier);
  options.clientKey && body.set("client_key", options.clientKey);
  deviceId && body.set("device_id", deviceId);
  body.set("redirect_uri", options.redirectURI || redirectURI);
  if (resource) {
    if (typeof resource === "string") body.append("resource", resource);
    else for (const _resource of resource) body.append("resource", _resource);
  }
  for (const [key, value] of Object.entries(additionalParams)) if (!body.has(key)) body.append(key, value);
  return {
    body,
    headers: requestHeaders
  };
}
async function validateAuthorizationCode({ code, codeVerifier, redirectURI, options, tokenEndpoint: tokenEndpoint3, authentication, tokenEndpointAuth, deviceId, headers, additionalParams = {}, resource }) {
  const { body, headers: requestHeaders } = await authorizationCodeRequest({
    code,
    codeVerifier,
    redirectURI,
    options,
    authentication,
    tokenEndpointAuth,
    tokenEndpoint: tokenEndpoint3,
    deviceId,
    headers,
    additionalParams,
    resource
  });
  const { data, error: error2 } = await fetchRefusingRedirects(tokenEndpoint3, {
    method: "POST",
    body,
    headers: requestHeaders
  });
  if (error2) throw error2;
  return getOAuth2Tokens(data);
}

// node_modules/@better-auth/core/dist/oauth2/verify-id-token.mjs
var ID_TOKEN_CLOCK_TOLERANCE_SECONDS = 30;
var ID_TOKEN_REQUIRED_CLAIMS = [
  "iss",
  "sub",
  "aud",
  "exp",
  "iat"
];
function getIdTokenVerifyOptions(options) {
  return {
    issuer: options.issuer,
    audience: options.audience,
    algorithms: options.algorithms,
    maxTokenAge: options.maxTokenAge,
    requiredClaims: ID_TOKEN_REQUIRED_CLAIMS,
    clockTolerance: ID_TOKEN_CLOCK_TOLERANCE_SECONDS
  };
}
async function sha256Hex(value) {
  const data = new TextEncoder().encode(value);
  const digest2 = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest2)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
async function nonceMatches(claimNonce, nonce, comparison = "exact") {
  if (typeof claimNonce !== "string") return false;
  if (claimNonce === nonce) return true;
  if (comparison === "exact-or-sha256") return claimNonce === await sha256Hex(nonce);
  return false;
}
async function verifyIdToken(token, config2, nonce) {
  if (![config2.audience].flat().some(Boolean)) throw new Error("ID token audience is not configured");
  const verified = await jwtVerify(token, config2.jwks, getIdTokenVerifyOptions(config2));
  if (nonce && !await nonceMatches(verified.payload.nonce, nonce, config2.nonceComparison)) throw new Error("ID token nonce does not match");
  if (config2.verifyClaims && !config2.verifyClaims(verified.payload)) throw new Error("ID token claims were rejected");
  return verified;
}
function supportsIdTokenSignIn(provider) {
  const options = provider.options ?? {};
  if (options.disableIdTokenSignIn) return false;
  return Boolean(provider.idToken || options.verifyIdToken);
}
async function verifyProviderIdToken(provider, token, nonce, ctx) {
  const options = provider.options ?? {};
  if (options.disableIdTokenSignIn) return false;
  try {
    if (options.verifyIdToken) return await options.verifyIdToken(token, nonce, ctx);
    const config2 = provider.idToken;
    if (!config2) return false;
    if ("verify" in config2) return await config2.verify(token, nonce, ctx);
    if (token.split(".").length !== 3) return config2.allowOpaqueToken === true;
    await verifyIdToken(token, config2, nonce);
    return true;
  } catch {
    return false;
  }
}

// node_modules/better-auth/dist/oauth2/link-account.mjs
function linkOAuthAccountFailure(code, message2) {
  return {
    linked: false,
    error: {
      code,
      message: message2
    }
  };
}
async function isLinkSessionLive(c, link) {
  if (!link.encryptedSessionToken || !isStateful(c)) return true;
  const sessionToken = await symmetricDecrypt({
    key: derivePurposeKey(c.context.secretConfig, "oauth-link-session-token"),
    data: link.encryptedSessionToken
  }).catch(() => null);
  if (!sessionToken) return false;
  const source = await c.context.internalAdapter.findSession(sessionToken);
  if (!source) return false;
  return source.session.userId === link.userId && source.session.expiresAt > /* @__PURE__ */ new Date();
}
async function linkOAuthAccount(c, opts) {
  const { link, account, profile, scopes, accountFields } = opts;
  const userInfo = {
    ...opts.userInfo,
    emailVerified: parseStringBoolean(opts.userInfo.emailVerified) ?? false
  };
  if (!await isLinkSessionLive(c, link)) return linkOAuthAccountFailure(OAUTH_CALLBACK_ERROR_CODES.UNABLE_TO_LINK_ACCOUNT);
  try {
    await assertValidUserInfo(c, {
      user: {
        ...userInfo,
        id: link.userId,
        email: userInfo.email ?? void 0
      },
      source: {
        action: "link-account",
        method: "oauth",
        oauth: {
          providerId: account.providerId,
          profile
        }
      }
    });
  } catch (error2) {
    if (!isAPIError2(error2) || !error2.body?.code) throw error2;
    return linkOAuthAccountFailure(error2.body.code, error2.body.message);
  }
  if (!c.context.trustedProviders.includes(account.providerId) && !userInfo.emailVerified || c.context.options.account?.accountLinking?.enabled === false) {
    c.context.logger.error("Unable to link account - untrusted provider");
    return linkOAuthAccountFailure(OAUTH_CALLBACK_ERROR_CODES.UNABLE_TO_LINK_ACCOUNT);
  }
  if (userInfo.email?.toLowerCase() !== link.email.toLowerCase() && c.context.options.account?.accountLinking?.allowDifferentEmails !== true) return linkOAuthAccountFailure(OAUTH_CALLBACK_ERROR_CODES.EMAIL_DOES_NOT_MATCH);
  const existingAccount = await c.context.internalAdapter.findAccountByKey(account);
  if (existingAccount) {
    if (existingAccount.userId.toString() !== link.userId.toString()) return linkOAuthAccountFailure(OAUTH_CALLBACK_ERROR_CODES.ACCOUNT_ALREADY_LINKED_TO_DIFFERENT_USER);
    const mergedScope = mergeScopes(existingAccount.scope, scopes);
    const updateData = Object.fromEntries(Object.entries({
      ...accountFields,
      providerId: account.providerId,
      accessToken: await setTokenUtil(account.accessToken, c.context),
      refreshToken: await setTokenUtil(account.refreshToken, c.context),
      idToken: account.idToken,
      accessTokenExpiresAt: account.accessTokenExpiresAt,
      refreshTokenExpiresAt: account.refreshTokenExpiresAt,
      scope: mergedScope || void 0
    }).filter(([_, value]) => value !== void 0));
    await c.context.internalAdapter.updateAccount(existingAccount.id, updateData);
  } else if (!await c.context.internalAdapter.createAccount({
    ...accountFields,
    userId: link.userId,
    ...account,
    accessToken: await setTokenUtil(account.accessToken, c.context),
    refreshToken: await setTokenUtil(account.refreshToken, c.context),
    scope: scopes?.join(",") ?? account.scope
  })) return linkOAuthAccountFailure(OAUTH_CALLBACK_ERROR_CODES.UNABLE_TO_LINK_ACCOUNT);
  await applyUpdateUserInfoOnLink(c, link.userId, userInfo);
  return { linked: true };
}
async function handleOAuthUserInfo(c, opts) {
  const { account, callbackURL, disableSignUp, overrideUserInfo, accountFields } = opts;
  const userInfo = {
    ...opts.userInfo,
    emailVerified: parseStringBoolean(opts.userInfo.emailVerified) ?? false
  };
  const source = opts.source ?? {
    method: "oauth",
    oauth: { providerId: account.providerId }
  };
  const requireExactAccountBinding = !!opts.selectedUser || opts.requireExactAccountBinding === true;
  let pendingAccountCookie = null;
  const accountOwner = await c.context.internalAdapter.findAccountOwnerByKey({
    providerId: account.providerId,
    accountId: account.accountId
  }).catch((e) => {
    c.context.logger.error("Better auth was unable to query your database.\nError: ", e);
    const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
    redirectOnError(c, errorURL, "internal_server_error");
  });
  if (accountOwner?.kind === "orphaned") {
    c.context.logger.error("OAuth account references a missing user. Repair the account before retrying authentication.");
    return {
      error: "unable to link account",
      data: null,
      isRegister: false
    };
  }
  const dbUser = await (async () => {
    if (accountOwner?.kind === "owned") {
      if (opts.selectedUser && accountOwner.user.id !== opts.selectedUser.userId) throw new APIError2("CONFLICT", {
        code: "account_ownership_conflict",
        message: "Account is already linked to another user"
      });
      return {
        user: accountOwner.user,
        linkedAccount: accountOwner.account,
        accounts: [accountOwner.account]
      };
    }
    if (opts.selectedUser) {
      const selectedUser = await c.context.internalAdapter.findUserById(opts.selectedUser.userId);
      if (!selectedUser) throw new APIError2("NOT_FOUND", {
        code: "user_not_found",
        message: "User not found"
      });
      return {
        user: selectedUser,
        linkedAccount: null,
        accounts: []
      };
    }
    const emailMatch = await c.context.internalAdapter.findUserByEmail(userInfo.email.toLowerCase(), { includeAccounts: true });
    if (!emailMatch) return null;
    return {
      user: emailMatch.user,
      linkedAccount: null,
      accounts: emailMatch.accounts
    };
  })().catch((e) => {
    if (isAPIError2(e)) throw e;
    c.context.logger.error("Better auth was unable to query your database.\nError: ", e);
    const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
    redirectOnError(c, errorURL, "internal_server_error");
  });
  let user = dbUser?.user;
  const isRegister = !user;
  if (dbUser) {
    const linkedAccount = dbUser.linkedAccount ?? dbUser.accounts.find((acc) => acc.providerId === account.providerId && acc.accountId === account.accountId);
    if (!linkedAccount) {
      const accountLinking = c.context.options.account?.accountLinking;
      const isTrustedProvider = opts.isTrustedProvider || opts.trustProviderByName !== false && c.context.trustedProviders.includes(account.providerId);
      const requireLocalEmailVerified = accountLinking?.requireLocalEmailVerified ?? true;
      if (!opts.selectedUser && (!isTrustedProvider && !userInfo.emailVerified || requireLocalEmailVerified && !dbUser.user.emailVerified || accountLinking?.enabled === false || accountLinking?.disableImplicitLinking === true)) {
        if (isDevelopment()) c.context.logger.warn(`User already exist but account isn't linked to ${account.providerId}. To read more about how account linking works in Better Auth see https://www.better-auth.com/docs/concepts/users-accounts#account-linking.`);
        return {
          error: "account not linked",
          data: null
        };
      }
      try {
        const { id: _accountId, ...providerUserInfo } = userInfo;
        await assertValidUserInfo(c, {
          user: {
            ...providerUserInfo,
            id: dbUser.user.id,
            email: userInfo.email.toLowerCase()
          },
          source: {
            ...source,
            action: "link-account"
          }
        });
        const createdAccount = await c.context.internalAdapter.linkAccount({
          ...accountFields,
          providerId: account.providerId,
          accountId: account.accountId,
          userId: dbUser.user.id,
          accessToken: await setTokenUtil(account.accessToken, c.context),
          refreshToken: await setTokenUtil(account.refreshToken, c.context),
          idToken: account.idToken,
          accessTokenExpiresAt: account.accessTokenExpiresAt,
          refreshTokenExpiresAt: account.refreshTokenExpiresAt,
          scope: account.scope
        });
        if (!createdAccount) return {
          error: "unable to link account",
          data: null
        };
        if (requireExactAccountBinding && (createdAccount.accountId !== account.accountId || createdAccount.providerId !== account.providerId || createdAccount.userId !== dbUser.user.id)) throw new APIError2("CONFLICT", {
          code: "account_hook_binding_conflict",
          message: "Account hook changed the selected authentication binding"
        });
        if (c.context.options.account?.storeAccountCookie) {
          if (opts.deferNonDatabaseWrites) pendingAccountCookie = createdAccount;
          else await setAccountCookie(c, createdAccount);
        }
      } catch (e) {
        if (isAPIError2(e)) throw e;
        c.context.logger.error("Unable to link account", e);
        return {
          error: "unable to link account",
          data: null
        };
      }
      if (!opts.selectedUser && userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) await c.context.internalAdapter.updateUser(dbUser.user.id, { emailVerified: true });
      if (!opts.selectedUser) user = await applyUpdateUserInfoOnLink(c, dbUser.user.id, userInfo) ?? user;
    } else {
      const { id: _accountId, ...providerUserInfo } = userInfo;
      await assertValidUserInfo(c, {
        user: {
          ...providerUserInfo,
          id: dbUser.user.id,
          email: userInfo.email.toLowerCase()
        },
        source: {
          ...source,
          action: "sign-in"
        }
      });
      const updateAccountOnSignIn = c.context.options.account?.updateAccountOnSignIn !== false;
      const freshTokens = updateAccountOnSignIn ? Object.fromEntries(Object.entries({
        providerId: account.providerId,
        idToken: account.idToken,
        accessToken: await setTokenUtil(account.accessToken, c.context),
        refreshToken: await setTokenUtil(account.refreshToken, c.context),
        accessTokenExpiresAt: account.accessTokenExpiresAt,
        refreshTokenExpiresAt: account.refreshTokenExpiresAt
      }).filter(([_, value]) => value !== void 0)) : {};
      const freshAccount = updateAccountOnSignIn ? {
        ...accountFields,
        ...freshTokens
      } : freshTokens;
      if (c.context.options.account?.storeAccountCookie) {
        const accountCookie = {
          ...linkedAccount,
          ...freshAccount
        };
        if (opts.deferNonDatabaseWrites) pendingAccountCookie = accountCookie;
        else await setAccountCookie(c, accountCookie);
      }
      if (Object.keys(freshAccount).length > 0) {
        const updatedAccount = await c.context.internalAdapter.updateAccount(linkedAccount.id, freshAccount);
        if (!updatedAccount) return {
          error: "unable to update account",
          data: null
        };
        if (requireExactAccountBinding && (updatedAccount.accountId !== account.accountId || updatedAccount.providerId !== account.providerId || updatedAccount.userId !== dbUser.user.id)) throw new APIError2("CONFLICT", {
          code: "account_hook_binding_conflict",
          message: "Account hook changed the selected authentication binding"
        });
        if (opts.deferNonDatabaseWrites && pendingAccountCookie) pendingAccountCookie = updatedAccount;
      }
      if (!opts.selectedUser && userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) await c.context.internalAdapter.updateUser(dbUser.user.id, { emailVerified: true });
    }
    if (opts.selectedUser ? opts.selectedUser.profile === "update" : overrideUserInfo) {
      const { id: _id, email: _email, emailVerified: _emailVerified, name, image, ...providerProfile } = userInfo;
      const additionalUserFields = parseAdditionalUserInputFromProviderProfile(c.context.options, providerProfile, "update");
      const updatedUser = await c.context.internalAdapter.updateUser(dbUser.user.id, {
        name,
        image,
        ...additionalUserFields,
        email: userInfo.email.toLowerCase(),
        emailVerified: userInfo.email.toLowerCase() === dbUser.user.email ? dbUser.user.emailVerified || userInfo.emailVerified : userInfo.emailVerified
      });
      if (updatedUser == null) c.context.logger.warn("Could not update user info during OAuth sign in; preserving existing user for session.");
      if (opts.selectedUser && updatedUser && updatedUser.id !== opts.selectedUser.userId) throw new APIError2("CONFLICT", {
        code: "user_hook_selection_conflict",
        message: "User hook changed the selected user"
      });
      user = updatedUser ?? user;
    }
  } else {
    if (disableSignUp) return {
      error: "signup disabled",
      data: null,
      isRegister: false
    };
    try {
      const { id: _id, email: _email, emailVerified: _emailVerified, name, image, ...providerProfile } = userInfo;
      const additionalUserFields = parseAdditionalUserInputFromProviderProfile(c.context.options, providerProfile, "create");
      const accountData = {
        ...accountFields,
        accessToken: await setTokenUtil(account.accessToken, c.context),
        refreshToken: await setTokenUtil(account.refreshToken, c.context),
        idToken: account.idToken,
        accessTokenExpiresAt: account.accessTokenExpiresAt,
        refreshTokenExpiresAt: account.refreshTokenExpiresAt,
        scope: account.scope,
        providerId: account.providerId,
        accountId: account.accountId
      };
      const created = await runWithTransaction(c.context.adapter, async () => {
        const createdUser2 = await c.context.internalAdapter.createUser({
          name,
          image,
          ...additionalUserFields,
          email: userInfo.email.toLowerCase(),
          emailVerified: userInfo.emailVerified
        }, source);
        if (!createdUser2) return null;
        return {
          createdUser: createdUser2,
          createdAccount: await c.context.internalAdapter.createAccount({
            ...accountData,
            userId: createdUser2.id
          })
        };
      });
      if (!created) return {
        error: "unable to create user",
        data: null,
        isRegister: false
      };
      const { createdUser, createdAccount } = created;
      if (requireExactAccountBinding && (createdAccount.accountId !== account.accountId || createdAccount.providerId !== account.providerId || createdAccount.userId !== createdUser.id)) throw new APIError2("CONFLICT", {
        code: "account_hook_binding_conflict",
        message: "Account hook changed the selected authentication binding"
      });
      user = createdUser;
      if (c.context.options.account?.storeAccountCookie) {
        if (opts.deferNonDatabaseWrites) pendingAccountCookie = createdAccount;
        else await setAccountCookie(c, createdAccount);
      }
    } catch (e) {
      if (isAPIError2(e)) throw e;
      c.context.logger.error("Unable to create OAuth user", e);
      return {
        error: "unable to create user",
        data: null,
        isRegister: false
      };
    }
  }
  if (!user) return {
    error: "unable to create user",
    data: null,
    isRegister: false
  };
  const requireEmailVerification = c.context.socialProviders.find((p) => p.id === account.providerId)?.options?.requireEmailVerification;
  if (isRegister && !user.emailVerified && (c.context.options.emailVerification?.sendOnSignUp ?? requireEmailVerification)) await dispatchVerificationEmail(c, user, callbackURL, opts.deferNonDatabaseWrites);
  if (requireEmailVerification && !user.emailVerified) {
    if (!isRegister && c.context.options.emailVerification?.sendOnSignIn) await dispatchVerificationEmail(c, user, callbackURL, opts.deferNonDatabaseWrites);
    return {
      error: OAUTH_CALLBACK_ERROR_CODES.EMAIL_NOT_VERIFIED,
      data: null,
      isRegister
    };
  }
  const session = await c.context.internalAdapter.createSession(user.id, void 0, void 0, void 0, { deferSecondaryStorageWrites: opts.deferNonDatabaseWrites === true });
  if (!session) return {
    error: "unable to create session",
    data: null,
    isRegister: false
  };
  if (requireExactAccountBinding && session.userId !== (opts.selectedUser?.userId ?? user.id)) throw new APIError2("CONFLICT", {
    code: "session_hook_user_conflict",
    message: "Session hook changed the selected user"
  });
  return {
    data: {
      session,
      user
    },
    error: null,
    isRegister,
    accountCookie: pendingAccountCookie
  };
}
async function dispatchVerificationEmail(c, user, callbackURL, deferUntilAfterTransaction) {
  const sendVerificationEmail2 = c.context.options.emailVerification?.sendVerificationEmail;
  if (!sendVerificationEmail2) return;
  const send = async () => {
    try {
      const token = await createEmailVerificationToken(c.context.secret, user.email, void 0, c.context.options.emailVerification?.expiresIn, { userId: user.id });
      const url = `${c.context.baseURL}/verify-email?token=${token}&callbackURL=${encodeURIComponent(callbackURL || "/")}`;
      await c.context.runInBackgroundOrAwait(sendVerificationEmail2({
        user,
        url,
        token
      }, c.request));
    } catch (e) {
      c.context.logger.error("Failed to send OAuth verification email", e);
    }
  };
  if (deferUntilAfterTransaction) await queueAfterTransactionHook(send);
  else await send();
}
async function applyUpdateUserInfoOnLink(c, userId, userInfo) {
  if (c.context.options.account?.accountLinking?.updateUserInfoOnLink !== true) return;
  try {
    const { email: _email, emailVerified: _emailVerified, name, image, ...providerProfile } = userInfo;
    const additionalUserFields = parseAdditionalUserInputFromProviderProfile(c.context.options, providerProfile, "update");
    return await c.context.internalAdapter.updateUser(userId, {
      name,
      image,
      ...additionalUserFields
    });
  } catch (e) {
    c.context.logger.warn("Could not update user info on account link", e);
    return;
  }
}

// node_modules/@better-auth/core/dist/social-providers/apple.mjs
var apple = (options) => {
  const tokenEndpoint3 = "https://appleid.apple.com/auth/token";
  return {
    id: "apple",
    name: "Apple",
    accountSubject: ({ profile }) => profile.sub,
    async createAuthorizationURL({ state, scopes, redirectURI, additionalParams, codeVerifier }) {
      if (!getPrimaryClientId(options.clientId) || !options.clientSecret) {
        logger.error("Client ID and client secret are required for Apple. Make sure to provide them in the options.");
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      const _scope = options.disableDefaultScope ? [] : ["email", "name"];
      if (options.scope) _scope.push(...options.scope);
      if (scopes) _scope.push(...scopes);
      return await createAuthorizationURL({
        id: "apple",
        options,
        authorizationEndpoint: "https://appleid.apple.com/auth/authorize",
        scopes: _scope,
        state,
        redirectURI,
        codeVerifier,
        responseMode: "form_post",
        responseType: "code id_token",
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    idToken: {
      jwks: (header) => getApplePublicKey(header.kid),
      issuer: "https://appleid.apple.com",
      algorithms: ["RS256"],
      audience: options.audience && options.audience.length ? options.audience : options.appBundleIdentifier ? options.appBundleIdentifier : options.clientId,
      maxTokenAge: "1h",
      nonceComparison: "exact-or-sha256"
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      if (!token.idToken) return null;
      const profile = decodeJwt(token.idToken);
      if (!profile) return null;
      let name;
      if (token.user?.name) name = `${token.user.name.firstName || ""} ${token.user.name.lastName || ""}`.trim();
      else name = profile.name || "";
      const emailVerified = parseStringBoolean(profile.email_verified) ?? false;
      const enrichedProfile = {
        ...profile,
        name
      };
      const userMap = await options.mapProfileToUser?.(enrichedProfile);
      return {
        user: {
          name: enrichedProfile.name,
          emailVerified,
          email: profile.email,
          ...userMap
        },
        data: enrichedProfile
      };
    },
    options
  };
};
var getApplePublicKey = async (kid) => {
  const { data } = await fetchRefusingRedirects(`https://appleid.apple.com/auth/keys`);
  if (!data?.keys) throw new APIError2("BAD_REQUEST", { message: "Keys not found" });
  const jwk = data.keys.find((key) => key.kid === kid);
  if (!jwk) throw new Error(`JWK with kid ${kid} not found`);
  return await importJWK(jwk, jwk.alg);
};

// node_modules/@better-auth/core/dist/social-providers/atlassian.mjs
var atlassian = (options) => {
  const tokenEndpoint3 = "https://auth.atlassian.com/oauth/token";
  return {
    id: "atlassian",
    name: "Atlassian",
    accountSubject: ({ profile }) => profile.account_id,
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI, additionalParams }) {
      if (!options.clientId || !options.clientSecret) {
        logger.error("Client Id and Secret are required for Atlassian");
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (!codeVerifier) throw new BetterAuthError("codeVerifier is required for Atlassian");
      const _scopes = options.disableDefaultScope ? [] : ["read:jira-user", "offline_access"];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "atlassian",
        options,
        authorizationEndpoint: "https://auth.atlassian.com/authorize",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        additionalParams: {
          ...additionalParams ?? {},
          audience: "api.atlassian.com"
        },
        prompt: options.prompt
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      if (!token.accessToken) return null;
      try {
        const { data: profile } = await betterFetch("https://api.atlassian.com/me", { headers: { Authorization: `Bearer ${token.accessToken}` } });
        if (!profile) return null;
        const userMap = await options.mapProfileToUser?.(profile);
        return {
          user: {
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            emailVerified: false,
            ...userMap
          },
          data: profile
        };
      } catch (error2) {
        logger.error("Failed to fetch user info from Atlassian:", error2);
        return null;
      }
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/cloudflare.mjs
var authorizationEndpoint = "https://dash.cloudflare.com/oauth2/auth";
var tokenEndpoint = "https://dash.cloudflare.com/oauth2/token";
var userEndpoint = "https://api.cloudflare.com/client/v4/user";
var getTokenEndpointAuth = (options) => {
  return options.tokenEndpointAuth ?? { method: options.tokenEndpointAuthMethod ?? (options.clientSecret ? "client_secret_basic" : "none") };
};
var cloudflare = (options) => {
  return {
    id: "cloudflare",
    name: "Cloudflare",
    accountSubject: ({ profile }) => profile.id,
    createAuthorizationURL({ state, scopes, codeVerifier, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["user-details.read"];
      if (options.scope?.length) _scopes.push(...options.scope);
      if (scopes?.length) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "cloudflare",
        options,
        authorizationEndpoint,
        scopes: _scopes.length ? [...new Set(_scopes)] : void 0,
        state,
        codeVerifier,
        redirectURI
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint,
        tokenEndpointAuth: getTokenEndpointAuth(options)
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint,
        tokenEndpointAuth: getTokenEndpointAuth(options)
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data, error: error2 } = await betterFetch(userEndpoint, { headers: { authorization: `Bearer ${token.accessToken}` } });
      if (error2 || !data?.success || !data.result) {
        logger.error("Failed to fetch user info from Cloudflare:", error2 ?? data?.errors);
        return null;
      }
      const profile = data.result;
      const name = [profile.first_name, profile.last_name].filter(Boolean).join(" ") || profile.email;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name,
          email: profile.email,
          emailVerified: false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/cognito.mjs
var cognito = (options) => {
  if (!options.domain || !options.region || !options.userPoolId) {
    logger.error("Domain, region and userPoolId are required for Amazon Cognito. Make sure to provide them in the options.");
    throw new BetterAuthError("DOMAIN_AND_REGION_REQUIRED");
  }
  const cleanDomain = options.domain.replace(/^https?:\/\//, "");
  const authorizationEndpoint3 = `https://${cleanDomain}/oauth2/authorize`;
  const tokenEndpoint3 = `https://${cleanDomain}/oauth2/token`;
  const userInfoEndpoint = `https://${cleanDomain}/oauth2/userinfo`;
  return {
    id: "cognito",
    name: "Cognito",
    accountSubject: ({ profile }) => profile.sub,
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI, additionalParams }) {
      if (!getPrimaryClientId(options.clientId)) {
        logger.error("ClientId is required for Amazon Cognito. Make sure to provide them in the options.");
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (options.requireClientSecret && !options.clientSecret) {
        logger.error("Client Secret is required when requireClientSecret is true. Make sure to provide it in the options.");
        throw new BetterAuthError("CLIENT_SECRET_REQUIRED");
      }
      const _scopes = options.disableDefaultScope ? [] : [
        "openid",
        "profile",
        "email"
      ];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      const url = await createAuthorizationURL({
        id: "cognito",
        options: { ...options },
        authorizationEndpoint: authorizationEndpoint3,
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        prompt: options.prompt,
        additionalParams: {
          ...options.identityProvider ? { identity_provider: options.identityProvider } : {},
          ...additionalParams ?? {}
        }
      });
      const scopeValue = url.searchParams.get("scope");
      if (scopeValue) {
        url.searchParams.delete("scope");
        const encodedScope = encodeURIComponent(scopeValue);
        const urlString = url.toString();
        const separator = urlString.includes("?") ? "&" : "?";
        return new URL(`${urlString}${separator}scope=${encodedScope}`);
      }
      return url;
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    idToken: {
      jwks: (header) => getCognitoPublicKey(header.kid, options.region, options.userPoolId),
      issuer: `https://cognito-idp.${options.region}.amazonaws.com/${options.userPoolId}`,
      audience: options.clientId,
      algorithms: ["RS256"],
      maxTokenAge: "1h"
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      if (token.idToken) try {
        const profile = decodeJwt(token.idToken);
        if (!profile) return null;
        const name = profile.name || profile.given_name || profile.username || "";
        const enrichedProfile = {
          ...profile,
          name
        };
        const userMap = await options.mapProfileToUser?.(enrichedProfile);
        return {
          user: {
            name: enrichedProfile.name,
            email: profile.email,
            image: profile.picture,
            emailVerified: profile.email_verified,
            ...userMap
          },
          data: enrichedProfile
        };
      } catch (error2) {
        logger.error("Failed to decode ID token:", error2);
      }
      if (token.accessToken) try {
        const { data: userInfo } = await betterFetch(userInfoEndpoint, { headers: { Authorization: `Bearer ${token.accessToken}` } });
        if (userInfo) {
          const userMap = await options.mapProfileToUser?.(userInfo);
          return {
            user: {
              name: userInfo.name || userInfo.given_name || userInfo.username || "",
              email: userInfo.email,
              image: userInfo.picture,
              emailVerified: parseStringBoolean(userInfo.email_verified) ?? false,
              ...userMap
            },
            data: userInfo
          };
        }
      } catch (error2) {
        logger.error("Failed to fetch user info from Cognito:", error2);
      }
      return null;
    },
    options
  };
};
var getCognitoPublicKey = async (kid, region, userPoolId) => {
  const COGNITO_JWKS_URI = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;
  try {
    const { data } = await fetchRefusingRedirects(COGNITO_JWKS_URI);
    if (!data?.keys) throw new APIError2("BAD_REQUEST", { message: "Keys not found" });
    const jwk = data.keys.find((key) => key.kid === kid);
    if (!jwk) throw new Error(`JWK with kid ${kid} not found`);
    return await importJWK(jwk, jwk.alg);
  } catch (error2) {
    logger.error("Failed to fetch Cognito public key:", error2);
    throw error2;
  }
};

// node_modules/@better-auth/core/dist/social-providers/discord.mjs
var discord = (options) => {
  const tokenEndpoint3 = "https://discord.com/api/oauth2/token";
  return {
    id: "discord",
    name: "Discord",
    accountSubject: ({ profile }) => profile.id,
    createAuthorizationURL({ state, scopes, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : ["identify", "email"];
      if (scopes) _scopes.push(...scopes);
      if (options.scope) _scopes.push(...options.scope);
      const hasBotScope = _scopes.includes("bot");
      return createAuthorizationURL({
        id: "discord",
        options,
        authorizationEndpoint: "https://discord.com/api/oauth2/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        prompt: options.prompt || "none",
        additionalParams: {
          ...hasBotScope && options.permissions !== void 0 ? { permissions: String(options.permissions) } : {},
          ...additionalParams ?? {}
        }
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://discord.com/api/users/@me", { headers: { authorization: `Bearer ${token.accessToken}` } });
      if (error2) return null;
      if (profile.avatar === null) profile.image_url = `https://cdn.discordapp.com/embed/avatars/${profile.discriminator === "0" ? Number(BigInt(profile.id) >> BigInt(22)) % 6 : parseInt(profile.discriminator) % 5}.png`;
      else {
        const format = profile.avatar.startsWith("a_") ? "gif" : "png";
        profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.global_name || profile.username || "",
          email: profile.email,
          emailVerified: profile.verified,
          image: profile.image_url,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/dropbox.mjs
var dropbox = (options) => {
  const tokenEndpoint3 = "https://api.dropboxapi.com/oauth2/token";
  return {
    id: "dropbox",
    name: "Dropbox",
    accountSubject: ({ profile }) => profile.account_id,
    createAuthorizationURL: async ({ state, scopes, codeVerifier, redirectURI, additionalParams }) => {
      const _scopes = options.disableDefaultScope ? [] : ["account_info.read"];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return await createAuthorizationURL({
        id: "dropbox",
        options,
        authorizationEndpoint: "https://www.dropbox.com/oauth2/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        codeVerifier,
        additionalParams: {
          ...options.accessType ? { token_access_type: options.accessType } : {},
          ...additionalParams ?? {}
        }
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return await validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://api.dropboxapi.com/2/users/get_current_account", {
        method: "POST",
        headers: { Authorization: `Bearer ${token.accessToken}` }
      });
      if (error2) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.name?.display_name,
          email: profile.email,
          emailVerified: profile.email_verified || false,
          image: profile.profile_photo_url,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/facebook.mjs
async function verifyFacebookAccessToken(accessToken, options) {
  const primaryClientId = getPrimaryClientId(options.clientId);
  if (!primaryClientId || !options.clientSecret) return null;
  const clientIds = Array.isArray(options.clientId) ? options.clientId : [options.clientId];
  const appAccessToken = `${primaryClientId}|${options.clientSecret}`;
  const { data, error: error2 } = await fetchRefusingRedirects("https://graph.facebook.com/debug_token", { query: {
    input_token: accessToken,
    access_token: appAccessToken
  } });
  if (error2 || !data?.data) return null;
  const { is_valid, app_id, user_id } = data.data;
  if (is_valid !== true || !app_id || !clientIds.includes(app_id) || !user_id) return null;
  return user_id;
}
var facebook = (options) => {
  return {
    id: "facebook",
    name: "Facebook",
    accountSubject: ({ profile }) => "sub" in profile ? profile.sub : profile.id,
    async createAuthorizationURL({ state, scopes, redirectURI, loginHint, additionalParams }) {
      if (!getPrimaryClientId(options.clientId) || !options.clientSecret) {
        logger.error("Client ID and client secret are required for Facebook. Make sure to provide them in the options.");
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      const _scopes = options.disableDefaultScope ? [] : ["email", "public_profile"];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return await createAuthorizationURL({
        id: "facebook",
        options,
        authorizationEndpoint: "https://www.facebook.com/v24.0/dialog/oauth",
        scopes: _scopes,
        state,
        redirectURI,
        loginHint,
        additionalParams: {
          ...options.configId ? { config_id: options.configId } : {},
          ...additionalParams ?? {}
        }
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://graph.facebook.com/v24.0/oauth/access_token"
      });
    },
    idToken: {
      jwks: createRemoteJWKSet(new URL("https://limited.facebook.com/.well-known/oauth/openid/jwks/")),
      issuer: "https://www.facebook.com",
      audience: options.clientId,
      algorithms: ["RS256"],
      allowOpaqueToken: true
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://graph.facebook.com/v24.0/oauth/access_token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        const isOpaqueIdToken = !!token.idToken && token.idToken.split(".").length !== 3;
        const clientToken = token.accessToken || (isOpaqueIdToken ? token.idToken : void 0);
        if (clientToken && !await verifyFacebookAccessToken(clientToken, options)) return null;
        return options.getUserInfo(token);
      }
      if (token.idToken && token.idToken.split(".").length === 3) {
        const profile2 = decodeJwt(token.idToken);
        const userMap2 = await options.mapProfileToUser?.(profile2);
        return {
          user: {
            name: profile2.name,
            email: profile2.email,
            image: profile2.picture,
            emailVerified: false,
            ...userMap2
          },
          data: profile2
        };
      }
      const accessToken = token.accessToken;
      if (!accessToken) return null;
      const tokenUserId = await verifyFacebookAccessToken(accessToken, options);
      if (!tokenUserId) return null;
      const fields = [
        "id",
        "name",
        "email",
        "picture",
        ...options?.fields || []
      ];
      const { data: profile, error: error2 } = await betterFetch("https://graph.facebook.com/me?fields=" + fields.join(","), { auth: {
        type: "Bearer",
        token: accessToken
      } });
      if (error2) return null;
      if (profile.id !== tokenUserId) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.name,
          email: profile.email,
          image: profile.picture.data.url,
          emailVerified: profile.email_verified ?? false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/figma.mjs
var figma = (options) => {
  const tokenEndpoint3 = "https://api.figma.com/v1/oauth/token";
  return {
    id: "figma",
    name: "Figma",
    accountSubject: ({ profile }) => profile.id,
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI, additionalParams }) {
      if (!options.clientId || !options.clientSecret) {
        logger.error("Client Id and Client Secret are required for Figma. Make sure to provide them in the options.");
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (!codeVerifier) throw new BetterAuthError("codeVerifier is required for Figma");
      const _scopes = options.disableDefaultScope ? [] : ["current_user:read"];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return await createAuthorizationURL({
        id: "figma",
        options,
        authorizationEndpoint: "https://www.figma.com/oauth",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3,
        authentication: "basic"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3,
        authentication: "basic"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      try {
        const { data: profile } = await betterFetch("https://api.figma.com/v1/me", { headers: { Authorization: `Bearer ${token.accessToken}` } });
        if (!profile) {
          logger.error("Failed to fetch user from Figma");
          return null;
        }
        const userMap = await options.mapProfileToUser?.(profile);
        return {
          user: {
            name: profile.handle,
            email: profile.email,
            image: profile.img_url,
            emailVerified: false,
            ...userMap
          },
          data: profile
        };
      } catch (error2) {
        logger.error("Failed to fetch user info from Figma:", error2);
        return null;
      }
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/github.mjs
var github = (options) => {
  const tokenEndpoint3 = "https://github.com/login/oauth/access_token";
  return {
    id: "github",
    name: "GitHub",
    accountSubject: ({ profile }) => profile.id,
    createAuthorizationURL({ state, scopes, loginHint, codeVerifier, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : ["read:user", "user:email"];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "github",
        options,
        authorizationEndpoint: "https://github.com/login/oauth/authorize",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        loginHint,
        prompt: options.prompt,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      const { body, headers: requestHeaders } = await authorizationCodeRequest({
        code,
        codeVerifier,
        redirectURI,
        options
      });
      const { data, error: error2 } = await fetchRefusingRedirects(tokenEndpoint3, {
        method: "POST",
        body,
        headers: requestHeaders
      });
      if (error2) {
        logger.error("GitHub OAuth token exchange failed:", error2);
        return null;
      }
      if ("error" in data) {
        logger.error("GitHub OAuth token exchange failed:", data);
        return null;
      }
      return getOAuth2Tokens(data);
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://api.github.com/user", { headers: {
        "User-Agent": "better-auth",
        authorization: `Bearer ${token.accessToken}`
      } });
      if (error2) return null;
      const { data: emails } = await betterFetch("https://api.github.com/user/emails", { headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "User-Agent": "better-auth"
      } });
      if (!profile.email && emails) profile.email = (emails.find((e) => e.primary) ?? emails[0])?.email;
      const emailVerified = emails?.find((e) => e.email === profile.email)?.verified ?? false;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.name || profile.login || "",
          email: profile.email,
          image: profile.avatar_url,
          emailVerified,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/gitlab.mjs
var cleanDoubleSlashes = (input = "") => {
  return input.split("://").map((str) => str.replace(/\/{2,}/g, "/")).join("://");
};
var issuerToEndpoints = (issuer) => {
  const baseUrl = issuer || "https://gitlab.com";
  return {
    authorizationEndpoint: cleanDoubleSlashes(`${baseUrl}/oauth/authorize`),
    tokenEndpoint: cleanDoubleSlashes(`${baseUrl}/oauth/token`),
    userinfoEndpoint: cleanDoubleSlashes(`${baseUrl}/api/v4/user`)
  };
};
var gitlab = (options) => {
  const { authorizationEndpoint: authorizationEndpoint3, tokenEndpoint: tokenEndpoint3, userinfoEndpoint: userinfoEndpoint2 } = issuerToEndpoints(options.issuer);
  const issuerId = "gitlab";
  return {
    id: issuerId,
    name: "Gitlab",
    accountSubject: ({ profile }) => profile.id,
    createAuthorizationURL: async ({ state, scopes, codeVerifier, loginHint, redirectURI, additionalParams }) => {
      const _scopes = options.disableDefaultScope ? [] : ["read_user"];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return await createAuthorizationURL({
        id: issuerId,
        options,
        authorizationEndpoint: authorizationEndpoint3,
        scopes: _scopes,
        state,
        redirectURI,
        codeVerifier,
        loginHint,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI, codeVerifier }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        codeVerifier,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch(userinfoEndpoint2, { headers: { authorization: `Bearer ${token.accessToken}` } });
      if (error2 || profile.state !== "active" || profile.locked) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.name ?? profile.username ?? "",
          email: profile.email,
          image: profile.avatar_url,
          emailVerified: profile.email_verified ?? false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/google.mjs
var GOOGLE_ID_TOKEN_MAX_AGE = "1h";
var GOOGLE_ID_TOKEN_ALGORITHM = "RS256";
var GOOGLE_ID_TOKEN_ALGORITHMS = [GOOGLE_ID_TOKEN_ALGORITHM];
var isGoogleHostedDomainAllowed = (configuredHostedDomain, tokenHostedDomain) => {
  if (!configuredHostedDomain) return true;
  if (typeof tokenHostedDomain !== "string" || !tokenHostedDomain) return false;
  if (configuredHostedDomain === "*") return true;
  return tokenHostedDomain === configuredHostedDomain;
};
var google = (options) => {
  return {
    id: "google",
    name: "Google",
    accountSubject: ({ profile }) => profile.sub,
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI, loginHint, display, additionalParams }) {
      if (!getPrimaryClientId(options.clientId) || !options.clientSecret) {
        logger.error("Client Id and Client Secret is required for Google. Make sure to provide them in the options.");
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (!codeVerifier) throw new BetterAuthError("codeVerifier is required for Google");
      const _scopes = options.disableDefaultScope ? [] : [
        "email",
        "profile",
        "openid"
      ];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return await createAuthorizationURL({
        id: "google",
        options,
        authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        prompt: options.prompt,
        accessType: options.accessType,
        display: display || options.display,
        loginHint,
        hd: options.hd,
        additionalParams: {
          ...options.includeGrantedScopes === false ? {} : { include_granted_scopes: "true" },
          ...additionalParams ?? {}
        }
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: "https://oauth2.googleapis.com/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://oauth2.googleapis.com/token"
      });
    },
    idToken: {
      jwks: (header) => getGooglePublicKey(header.kid),
      issuer: ["https://accounts.google.com", "accounts.google.com"],
      audience: options.clientId,
      algorithms: GOOGLE_ID_TOKEN_ALGORITHMS,
      maxTokenAge: GOOGLE_ID_TOKEN_MAX_AGE,
      verifyClaims: options.hd ? (claims) => isGoogleHostedDomainAllowed(options.hd, claims.hd) : void 0
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      if (!token.idToken) return null;
      const user = decodeJwt(token.idToken);
      if (!isGoogleHostedDomainAllowed(options.hd, user.hd)) {
        logger.error(`Google sign-in rejected: id token hosted domain (hd) "${user.hd ?? "<missing>"}" does not satisfy the configured "hd" option "${options.hd}".`);
        return null;
      }
      const userMap = await options.mapProfileToUser?.(user);
      return {
        user: {
          name: user.name,
          email: user.email,
          image: user.picture,
          emailVerified: user.email_verified,
          ...userMap
        },
        data: user
      };
    },
    options
  };
};
var getGooglePublicKey = async (kid) => {
  const [publicKey] = await getGooglePublicKeys(kid);
  if (!publicKey) throw new Error(`JWK with kid ${kid} not found`);
  return publicKey;
};
var getGooglePublicKeys = async (kid) => {
  const { data } = await fetchRefusingRedirects("https://www.googleapis.com/oauth2/v3/certs");
  if (!data?.keys) throw new APIError2("BAD_REQUEST", { message: "Keys not found" });
  const jwks = kid ? data.keys.filter((key) => key.kid === kid) : data.keys;
  if (!jwks.length) throw new Error(`JWK with kid ${kid} not found`);
  return Promise.all(jwks.map((jwk) => importJWK(jwk, GOOGLE_ID_TOKEN_ALGORITHM)));
};

// node_modules/@better-auth/core/dist/social-providers/huggingface.mjs
var huggingface = (options) => {
  const tokenEndpoint3 = "https://huggingface.co/oauth/token";
  return {
    id: "huggingface",
    name: "Hugging Face",
    accountSubject: ({ profile }) => profile.sub,
    createAuthorizationURL({ state, scopes, codeVerifier, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : [
        "openid",
        "profile",
        "email"
      ];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "huggingface",
        options,
        authorizationEndpoint: "https://huggingface.co/oauth/authorize",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://huggingface.co/oauth/userinfo", {
        method: "GET",
        headers: { Authorization: `Bearer ${token.accessToken}` }
      });
      if (error2) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.name || profile.preferred_username || "",
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified ?? false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/kakao.mjs
var kakao = (options) => {
  const tokenEndpoint3 = "https://kauth.kakao.com/oauth/token";
  const getUserInfoFromProfile = async (profile) => {
    const userMap = await options.mapProfileToUser?.(profile);
    const account = profile.kakao_account || {};
    const kakaoProfile = account.profile || {};
    return {
      user: {
        name: kakaoProfile.nickname || account.name || "",
        email: account.email,
        image: kakaoProfile.profile_image_url || kakaoProfile.thumbnail_image_url,
        emailVerified: !!account.is_email_valid && !!account.is_email_verified,
        ...userMap
      },
      data: profile
    };
  };
  return {
    id: "kakao",
    name: "Kakao",
    accountSubject: ({ profile }) => profile.id,
    createAuthorizationURL({ state, scopes, codeVerifier, redirectURI, loginHint, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : [
        "account_email",
        "profile_image",
        "profile_nickname"
      ];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "kakao",
        options,
        authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        loginHint,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    idToken: {
      jwks: createRemoteJWKSet(new URL("https://kauth.kakao.com/.well-known/jwks.json")),
      issuer: "https://kauth.kakao.com",
      audience: options.clientId,
      algorithms: ["RS256"]
    },
    async getUserInfoFromIdToken(idToken) {
      if (options.getUserInfo) return options.getUserInfo({ idToken });
      const claims = decodeJwt(idToken);
      return getUserInfoFromProfile({
        id: Number(claims.sub),
        kakao_account: {
          email: claims.email,
          profile: {
            nickname: claims.nickname,
            thumbnail_image_url: claims.picture
          }
        }
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://kapi.kakao.com/v2/user/me", { headers: { Authorization: `Bearer ${token.accessToken}` } });
      if (error2 || !profile) return null;
      return getUserInfoFromProfile(profile);
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/kick.mjs
var kick = (options) => {
  return {
    id: "kick",
    name: "Kick",
    accountSubject: ({ profile }) => profile.user_id,
    createAuthorizationURL({ state, scopes, redirectURI, codeVerifier, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : ["user:read"];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "kick",
        redirectURI,
        options,
        authorizationEndpoint: "https://id.kick.com/oauth/authorize",
        scopes: _scopes,
        codeVerifier,
        state,
        additionalParams
      });
    },
    async validateAuthorizationCode({ code, redirectURI, codeVerifier }) {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://id.kick.com/oauth/token",
        codeVerifier
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://id.kick.com/oauth/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data, error: error2 } = await betterFetch("https://api.kick.com/public/v1/users", {
        method: "GET",
        headers: { Authorization: `Bearer ${token.accessToken}` }
      });
      if (error2) return null;
      const profile = data.data[0];
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.name,
          email: profile.email,
          image: profile.profile_picture,
          emailVerified: false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/line.mjs
var line = (options) => {
  const authorizationEndpoint3 = "https://access.line.me/oauth2/v2.1/authorize";
  const tokenEndpoint3 = "https://api.line.me/oauth2/v2.1/token";
  const userInfoEndpoint = "https://api.line.me/oauth2/v2.1/userinfo";
  const verifyIdTokenEndpoint = "https://api.line.me/oauth2/v2.1/verify";
  return {
    id: "line",
    name: "LINE",
    accountSubject: ({ profile }) => profile.sub,
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI, loginHint, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : [
        "openid",
        "profile",
        "email"
      ];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return await createAuthorizationURL({
        id: "line",
        options,
        authorizationEndpoint: authorizationEndpoint3,
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        loginHint,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    idToken: { verify: async (token, nonce) => {
      const body = new URLSearchParams();
      body.set("id_token", token);
      body.set("client_id", options.clientId);
      if (nonce) body.set("nonce", nonce);
      const { data, error: error2 } = await fetchRefusingRedirects(verifyIdTokenEndpoint, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body
      });
      if (error2 || !data) return false;
      if (data.aud !== options.clientId) return false;
      if (data.nonce && data.nonce !== nonce) return false;
      return true;
    } },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      let profile = null;
      if (token.idToken) try {
        profile = decodeJwt(token.idToken);
      } catch {
      }
      if (!profile) {
        const { data } = await betterFetch(userInfoEndpoint, { headers: { authorization: `Bearer ${token.accessToken}` } });
        profile = data || null;
      }
      if (!profile) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.name || "",
          email: profile.email,
          image: profile.picture,
          emailVerified: false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/linear.mjs
var linear = (options) => {
  const tokenEndpoint3 = "https://api.linear.app/oauth/token";
  return {
    id: "linear",
    name: "Linear",
    accountSubject: ({ profile }) => profile.id,
    createAuthorizationURL({ state, scopes, loginHint, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : ["read"];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "linear",
        options,
        authorizationEndpoint: "https://linear.app/oauth/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        loginHint,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://api.linear.app/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`
        },
        body: JSON.stringify({ query: `
							query {
								viewer {
									id
									name
									email
									avatarUrl
									active
									createdAt
									updatedAt
								}
							}
						` })
      });
      if (error2 || !profile?.data?.viewer) return null;
      const userData = profile.data.viewer;
      const userMap = await options.mapProfileToUser?.(userData);
      return {
        user: {
          name: profile.data.viewer.name,
          email: profile.data.viewer.email,
          image: profile.data.viewer.avatarUrl,
          emailVerified: false,
          ...userMap
        },
        data: userData
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/linkedin.mjs
var linkedin = (options) => {
  const authorizationEndpoint3 = "https://www.linkedin.com/oauth/v2/authorization";
  const tokenEndpoint3 = "https://www.linkedin.com/oauth/v2/accessToken";
  return {
    id: "linkedin",
    name: "Linkedin",
    accountSubject: ({ profile }) => profile.sub,
    createAuthorizationURL: async ({ state, scopes, redirectURI, loginHint, additionalParams }) => {
      const _scopes = options.disableDefaultScope ? [] : [
        "profile",
        "email",
        "openid"
      ];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return await createAuthorizationURL({
        id: "linkedin",
        options,
        authorizationEndpoint: authorizationEndpoint3,
        scopes: _scopes,
        state,
        loginHint,
        redirectURI,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return await validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://api.linkedin.com/v2/userinfo", {
        method: "GET",
        headers: { Authorization: `Bearer ${token.accessToken}` }
      });
      if (error2) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.name,
          email: profile.email,
          emailVerified: profile.email_verified ?? false,
          image: profile.picture,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/microsoft-entra-id.mjs
var MICROSOFT_CONSUMER_TENANT_ID = "9188040d-6c67-4c5b-b112-36a304b66dad";
var microsoft = (options) => {
  const tenant = options.tenantId || "common";
  let authority = options.authority || "https://login.microsoftonline.com";
  while (authority.endsWith("/")) authority = authority.slice(0, -1);
  const authorizationEndpoint3 = `${authority}/${tenant}/oauth2/v2.0/authorize`;
  const tokenEndpoint3 = `${authority}/${tenant}/oauth2/v2.0/token`;
  if (options.clientSecret && options.clientAssertion) throw new BetterAuthError("Microsoft Entra ID clientAssertion cannot be combined with clientSecret");
  const tokenEndpointAuth = options.clientAssertion ? {
    method: "private_key_jwt",
    getClientAssertion: options.clientAssertion
  } : void 0;
  return {
    id: "microsoft",
    name: "Microsoft EntraID",
    accountSubject: ({ profile }) => profile.oid,
    createAuthorizationURL(data) {
      if (!getPrimaryClientId(options.clientId)) {
        logger.error("Client Id is required for Microsoft Entra ID. Make sure to provide it in the options.");
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      const scopes = options.disableDefaultScope ? [] : [
        "openid",
        "profile",
        "email",
        "User.Read",
        "offline_access"
      ];
      if (options.scope) scopes.push(...options.scope);
      if (data.scopes) scopes.push(...data.scopes);
      return createAuthorizationURL({
        id: "microsoft",
        options,
        authorizationEndpoint: authorizationEndpoint3,
        state: data.state,
        codeVerifier: data.codeVerifier,
        scopes,
        redirectURI: data.redirectURI,
        prompt: options.prompt,
        loginHint: data.loginHint,
        additionalParams: data.additionalParams
      });
    },
    validateAuthorizationCode({ code, codeVerifier, redirectURI }) {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3,
        tokenEndpointAuth
      });
    },
    idToken: {
      jwks: (header) => getMicrosoftPublicKey(header.kid, tenant, authority),
      algorithms: ["RS256"],
      audience: options.clientId,
      maxTokenAge: "1h",
      /**
      * Issuer varies per tenant for multi-tenant endpoints, so only validate it for
      * specific tenants.
      * @see https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols#endpoints
      */
      issuer: tenant !== "common" && tenant !== "organizations" && tenant !== "consumers" ? `${authority}/${tenant}/v2.0` : void 0,
      /**
      * The multi-tenant endpoints (common/organizations/consumers) skip the
      * issuer check above because the issuer varies per tenant, and the
      * organizations and consumers JWKS sets overlap. Enforce the tenant
      * binding explicitly so a token from a disallowed account class cannot
      * pass: the issuer must name the token's own tenant, and the account
      * class must match the configured restriction.
      * @see https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference
      */
      verifyClaims: (claims) => {
        const tid = claims.tid;
        if (typeof tid !== "string" || claims.iss !== `${authority}/${tid}/v2.0`) return false;
        if (tenant === "organizations" && tid === MICROSOFT_CONSUMER_TENANT_ID) return false;
        if (tenant === "consumers" && tid !== MICROSOFT_CONSUMER_TENANT_ID) return false;
        return true;
      }
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      if (!token.idToken) return null;
      const user = decodeJwt(token.idToken);
      if (typeof user.oid !== "string" || user.oid.trim().length === 0) {
        logger.error("Microsoft Entra ID token did not include a valid oid claim; unable to resolve a stable account identifier.");
        return null;
      }
      const profilePhotoSize = options.profilePhotoSize || 48;
      if (!options.disableProfilePhoto && token.accessToken) await betterFetch(`https://graph.microsoft.com/v1.0/me/photos/${profilePhotoSize}x${profilePhotoSize}/$value`, {
        headers: { Authorization: `Bearer ${token.accessToken}` },
        async onResponse(context) {
          if (!context.response.ok) return;
          try {
            const pictureBuffer = await context.response.clone().arrayBuffer();
            const pictureBase64 = base64.encode(pictureBuffer);
            user.picture = `data:image/jpeg;base64, ${pictureBase64}`;
          } catch (e) {
            logger.error(e && typeof e === "object" && "name" in e ? e.name : "", e);
          }
        }
      });
      const userMap = await options.mapProfileToUser?.(user);
      const emailVerified = user.email_verified !== void 0 ? parseStringBoolean(user.email_verified) ?? false : user.email && (user.verified_primary_email?.includes(user.email) || user.verified_secondary_email?.includes(user.email)) ? true : false;
      return {
        user: {
          name: user.name,
          email: user.email,
          image: user.picture,
          emailVerified,
          ...userMap
        },
        data: user
      };
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      const scopes = options.disableDefaultScope ? [] : [
        "openid",
        "profile",
        "email",
        "User.Read",
        "offline_access"
      ];
      if (options.scope) scopes.push(...options.scope);
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientSecret: options.clientSecret
        },
        extraParams: { scope: scopes.join(" ") },
        tokenEndpoint: tokenEndpoint3,
        tokenEndpointAuth
      });
    },
    options
  };
};
var getMicrosoftPublicKey = async (kid, tenant, authority) => {
  const { data } = await fetchRefusingRedirects(`${authority}/${tenant}/discovery/v2.0/keys`);
  if (!data?.keys) throw new APIError2("BAD_REQUEST", { message: "Keys not found" });
  const jwk = data.keys.find((key) => key.kid === kid);
  if (!jwk) throw new Error(`JWK with kid ${kid} not found`);
  return await importJWK(jwk, jwk.alg ?? "RS256");
};

// node_modules/@better-auth/core/dist/social-providers/naver.mjs
var naver = (options) => {
  const tokenEndpoint3 = "https://nid.naver.com/oauth2.0/token";
  return {
    id: "naver",
    name: "Naver",
    accountSubject: ({ profile }) => profile.response.id,
    createAuthorizationURL({ state, scopes, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : ["profile", "email"];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "naver",
        options,
        authorizationEndpoint: "https://nid.naver.com/oauth2.0/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://openapi.naver.com/v1/nid/me", { headers: { Authorization: `Bearer ${token.accessToken}` } });
      if (error2 || !profile || profile.resultcode !== "00") return null;
      const userMap = await options.mapProfileToUser?.(profile);
      const res = profile.response || {};
      return {
        user: {
          name: res.name || res.nickname || "",
          email: res.email,
          image: res.profile_image,
          emailVerified: false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/notion.mjs
var notion = (options) => {
  const tokenEndpoint3 = "https://api.notion.com/v1/oauth/token";
  return {
    id: "notion",
    name: "Notion",
    accountSubject: ({ profile }) => profile.id,
    createAuthorizationURL({ state, scopes, loginHint, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : [];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "notion",
        options,
        authorizationEndpoint: "https://api.notion.com/v1/oauth/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        loginHint,
        additionalParams: {
          ...additionalParams ?? {},
          owner: "user"
        }
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3,
        authentication: "basic"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://api.notion.com/v1/users/me", { headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Notion-Version": "2022-06-28"
      } });
      if (error2 || !profile) return null;
      const userProfile = profile.bot?.owner?.user;
      if (!userProfile) return null;
      const userMap = await options.mapProfileToUser?.(userProfile);
      return {
        user: {
          name: userProfile.name || "",
          email: userProfile.person?.email || null,
          image: userProfile.avatar_url,
          emailVerified: false,
          ...userMap
        },
        data: userProfile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/paybin.mjs
var paybin = (options) => {
  const issuer = options.issuer || "https://idp.paybin.io";
  const authorizationEndpoint3 = `${issuer}/oauth2/authorize`;
  const tokenEndpoint3 = `${issuer}/oauth2/token`;
  return {
    id: "paybin",
    name: "Paybin",
    accountSubject: ({ profile }) => profile.sub,
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI, loginHint, additionalParams }) {
      if (!options.clientId || !options.clientSecret) {
        logger.error("Client Id and Client Secret is required for Paybin. Make sure to provide them in the options.");
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (!codeVerifier) throw new BetterAuthError("codeVerifier is required for Paybin");
      const _scopes = options.disableDefaultScope ? [] : [
        "openid",
        "email",
        "profile"
      ];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return await createAuthorizationURL({
        id: "paybin",
        options,
        authorizationEndpoint: authorizationEndpoint3,
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        prompt: options.prompt,
        loginHint,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      if (!token.idToken) return null;
      const user = decodeJwt(token.idToken);
      const userMap = await options.mapProfileToUser?.(user);
      return {
        user: {
          name: user.name || user.preferred_username || "",
          email: user.email,
          image: user.picture,
          emailVerified: user.email_verified || false,
          ...userMap
        },
        data: user
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/paypal.mjs
var paypal = (options) => {
  const isSandbox = (options.environment || "sandbox") === "sandbox";
  const authorizationEndpoint3 = isSandbox ? "https://www.sandbox.paypal.com/signin/authorize" : "https://www.paypal.com/signin/authorize";
  const tokenEndpoint3 = isSandbox ? "https://api-m.sandbox.paypal.com/v1/oauth2/token" : "https://api-m.paypal.com/v1/oauth2/token";
  const userInfoEndpoint = isSandbox ? "https://api-m.sandbox.paypal.com/v1/identity/oauth2/userinfo" : "https://api-m.paypal.com/v1/identity/oauth2/userinfo";
  const tokenRequestOptions = {
    clientId: options.clientId,
    clientSecret: options.clientSecret
  };
  const tokenEndpointAuth = { method: "client_secret_basic" };
  return {
    id: "paypal",
    name: "PayPal",
    accountSubject: ({ profile }) => profile.user_id,
    async createAuthorizationURL({ state, codeVerifier, redirectURI, additionalParams }) {
      if (!options.clientId || !options.clientSecret) {
        logger.error("Client Id and Client Secret is required for PayPal. Make sure to provide them in the options.");
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      return await createAuthorizationURL({
        id: "paypal",
        options,
        authorizationEndpoint: authorizationEndpoint3,
        scopes: [],
        state,
        codeVerifier,
        redirectURI,
        prompt: options.prompt,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      try {
        return await validateAuthorizationCode({
          code,
          codeVerifier,
          redirectURI: options.redirectURI || redirectURI,
          options: tokenRequestOptions,
          tokenEndpoint: tokenEndpoint3,
          tokenEndpointAuth
        });
      } catch (error2) {
        logger.error("PayPal token exchange failed:", error2);
        throw new BetterAuthError("FAILED_TO_GET_ACCESS_TOKEN");
      }
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      try {
        return await refreshAccessToken({
          refreshToken: refreshToken2,
          options: tokenRequestOptions,
          tokenEndpoint: tokenEndpoint3,
          tokenEndpointAuth
        });
      } catch (error2) {
        logger.error("PayPal token refresh failed:", error2);
        throw new BetterAuthError("FAILED_TO_REFRESH_ACCESS_TOKEN");
      }
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      if (!token.accessToken) {
        logger.error("Access token is required to fetch PayPal user info");
        return null;
      }
      try {
        const response = await betterFetch(`${userInfoEndpoint}?schema=paypalv1.1`, { headers: {
          Authorization: `Bearer ${token.accessToken}`,
          Accept: "application/json"
        } });
        if (!response.data) {
          logger.error("Failed to fetch user info from PayPal");
          return null;
        }
        const userInfo = response.data;
        if (token.idToken) {
          let idTokenSubject;
          try {
            idTokenSubject = decodeJwt(token.idToken).sub;
          } catch (error2) {
            logger.error("Failed to decode PayPal ID token:", error2);
            return null;
          }
          const userInfoSubject = userInfo.sub ?? userInfo.user_id;
          if (!idTokenSubject || userInfoSubject !== idTokenSubject) {
            logger.error("PayPal user info subject does not match ID token subject");
            return null;
          }
        }
        const userMap = await options.mapProfileToUser?.(userInfo);
        return {
          user: {
            name: userInfo.name,
            email: userInfo.email,
            image: userInfo.picture,
            emailVerified: userInfo.email_verified,
            ...userMap
          },
          data: userInfo
        };
      } catch (error2) {
        logger.error("Failed to fetch user info from PayPal:", error2);
        return null;
      }
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/polar.mjs
var polar = (options) => {
  const tokenEndpoint3 = "https://api.polar.sh/v1/oauth2/token";
  return {
    id: "polar",
    name: "Polar",
    accountSubject: ({ profile }) => profile.id,
    createAuthorizationURL({ state, scopes, codeVerifier, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : [
        "openid",
        "profile",
        "email"
      ];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "polar",
        options,
        authorizationEndpoint: "https://polar.sh/oauth2/authorize",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        prompt: options.prompt,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://api.polar.sh/v1/oauth2/userinfo", { headers: { Authorization: `Bearer ${token.accessToken}` } });
      if (error2) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.public_name || profile.username || "",
          email: profile.email,
          image: profile.avatar_url,
          emailVerified: profile.email_verified ?? false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/railway.mjs
var authorizationEndpoint2 = "https://backboard.railway.com/oauth/auth";
var tokenEndpoint2 = "https://backboard.railway.com/oauth/token";
var userinfoEndpoint = "https://backboard.railway.com/oauth/me";
var railway = (options) => {
  return {
    id: "railway",
    name: "Railway",
    accountSubject: ({ profile }) => profile.sub,
    createAuthorizationURL({ state, scopes, codeVerifier, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : [
        "openid",
        "email",
        "profile"
      ];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "railway",
        options,
        authorizationEndpoint: authorizationEndpoint2,
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint2,
        authentication: "basic"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint2,
        authentication: "basic"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch(userinfoEndpoint, { headers: { authorization: `Bearer ${token.accessToken}` } });
      if (error2 || !profile) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/utils/email.mjs
var PLACEHOLDER_EMAIL_DOMAIN = "placeholder.invalid";
function createPlaceholderEmail({ identifier, namespace }) {
  const result = email().safeParse(`${identifier}@${namespace}.${PLACEHOLDER_EMAIL_DOMAIN}`);
  if (!result.success) throw new TypeError("Invalid placeholder email");
  return result.data;
}

// node_modules/@better-auth/core/dist/social-providers/reddit.mjs
var reddit = (options) => {
  const tokenEndpoint3 = "https://www.reddit.com/api/v1/access_token";
  const tokenRequestOptions = {
    clientId: options.clientId,
    clientSecret: options.clientSecret
  };
  const tokenEndpointAuth = { method: "client_secret_basic" };
  return {
    id: "reddit",
    name: "Reddit",
    accountSubject: ({ profile }) => profile.id,
    createAuthorizationURL({ state, scopes, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : ["identity"];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "reddit",
        options,
        authorizationEndpoint: "https://www.reddit.com/api/v1/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        duration: options.duration,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI: options.redirectURI || redirectURI,
        options: tokenRequestOptions,
        tokenEndpoint: tokenEndpoint3,
        tokenEndpointAuth,
        headers: {
          accept: "text/plain",
          "user-agent": "better-auth"
        }
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: tokenRequestOptions,
        tokenEndpoint: tokenEndpoint3,
        tokenEndpointAuth
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://oauth.reddit.com/api/v1/me", { headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "User-Agent": "better-auth"
      } });
      if (error2) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      const email2 = userMap?.email || createPlaceholderEmail({
        identifier: profile.id,
        namespace: "reddit"
      });
      return {
        user: {
          name: profile.name,
          image: profile.icon_img?.split("?")[0],
          ...userMap,
          email: email2,
          emailVerified: userMap?.emailVerified ?? false
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/roblox.mjs
var roblox = (options) => {
  const tokenEndpoint3 = "https://apis.roblox.com/oauth/v1/token";
  return {
    id: "roblox",
    name: "Roblox",
    accountSubject: ({ profile }) => profile.sub,
    createAuthorizationURL({ state, scopes, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : ["openid", "profile"];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "roblox",
        options,
        authorizationEndpoint: "https://apis.roblox.com/oauth/v1/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        prompt: options.prompt || "select_account consent",
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI: options.redirectURI || redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3,
        authentication: "post"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://apis.roblox.com/oauth/v1/userinfo", { headers: { authorization: `Bearer ${token.accessToken}` } });
      if (error2) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.nickname || profile.preferred_username || "",
          image: profile.picture,
          email: createPlaceholderEmail({
            identifier: profile.sub,
            namespace: "roblox"
          }),
          emailVerified: false,
          ...userMap
        },
        data: { ...profile }
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/salesforce.mjs
var salesforce = (options) => {
  const isSandbox = (options.environment ?? "production") === "sandbox";
  const authorizationEndpoint3 = options.loginUrl ? `https://${options.loginUrl}/services/oauth2/authorize` : isSandbox ? "https://test.salesforce.com/services/oauth2/authorize" : "https://login.salesforce.com/services/oauth2/authorize";
  const tokenEndpoint3 = options.loginUrl ? `https://${options.loginUrl}/services/oauth2/token` : isSandbox ? "https://test.salesforce.com/services/oauth2/token" : "https://login.salesforce.com/services/oauth2/token";
  const userInfoEndpoint = options.loginUrl ? `https://${options.loginUrl}/services/oauth2/userinfo` : isSandbox ? "https://test.salesforce.com/services/oauth2/userinfo" : "https://login.salesforce.com/services/oauth2/userinfo";
  return {
    id: "salesforce",
    name: "Salesforce",
    accountSubject: ({ profile }) => profile.user_id,
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI, additionalParams }) {
      if (!options.clientId || !options.clientSecret) {
        logger.error("Client Id and Client Secret are required for Salesforce. Make sure to provide them in the options.");
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (!codeVerifier) throw new BetterAuthError("codeVerifier is required for Salesforce");
      const _scopes = options.disableDefaultScope ? [] : [
        "openid",
        "email",
        "profile"
      ];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "salesforce",
        options,
        authorizationEndpoint: authorizationEndpoint3,
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI: options.redirectURI || redirectURI,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI: options.redirectURI || redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      try {
        const { data: user } = await betterFetch(userInfoEndpoint, { headers: { Authorization: `Bearer ${token.accessToken}` } });
        if (!user) {
          logger.error("Failed to fetch user info from Salesforce");
          return null;
        }
        const userMap = await options.mapProfileToUser?.(user);
        return {
          user: {
            name: user.name,
            email: user.email,
            image: user.photos?.picture || user.photos?.thumbnail,
            emailVerified: user.email_verified ?? false,
            ...userMap
          },
          data: user
        };
      } catch (error2) {
        logger.error("Failed to fetch user info from Salesforce:", error2);
        return null;
      }
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/slack.mjs
var slack = (options) => {
  const tokenEndpoint3 = "https://slack.com/api/openid.connect.token";
  return {
    id: "slack",
    name: "Slack",
    accountSubject: ({ profile }) => profile["https://slack.com/user_id"],
    createAuthorizationURL({ state, scopes, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : [
        "openid",
        "profile",
        "email"
      ];
      if (scopes) _scopes.push(...scopes);
      if (options.scope) _scopes.push(...options.scope);
      return createAuthorizationURL({
        id: "slack",
        options,
        authorizationEndpoint: "https://slack.com/openid/connect/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://slack.com/api/openid.connect.userInfo", { headers: { authorization: `Bearer ${token.accessToken}` } });
      if (error2) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.name || "",
          email: profile.email,
          emailVerified: profile.email_verified,
          image: profile.picture || profile["https://slack.com/user_image_512"],
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/spotify.mjs
var spotify = (options) => {
  const tokenEndpoint3 = "https://accounts.spotify.com/api/token";
  return {
    id: "spotify",
    name: "Spotify",
    accountSubject: ({ profile }) => profile.id,
    createAuthorizationURL({ state, scopes, codeVerifier, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : ["user-read-email"];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "spotify",
        options,
        authorizationEndpoint: "https://accounts.spotify.com/authorize",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token.accessToken}` }
      });
      if (error2) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.display_name,
          email: profile.email,
          image: profile.images[0]?.url,
          emailVerified: false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/tiktok.mjs
var tiktok = (options) => {
  const tokenEndpoint3 = "https://open.tiktokapis.com/v2/oauth/token/";
  const tokenEndpointAuth = {
    method: "custom",
    customizeRequest({ body }) {
      body.set("client_key", options.clientKey);
      body.set("client_secret", options.clientSecret);
    }
  };
  return {
    id: "tiktok",
    name: "TikTok",
    accountSubject: ({ profile }) => profile.data.user.open_id,
    createAuthorizationURL({ state, scopes, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : ["user.info.profile"];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      const url = new URL("https://www.tiktok.com/v2/auth/authorize");
      url.searchParams.set("scope", _scopes.join(","));
      url.searchParams.set("response_type", "code");
      url.searchParams.set("client_key", options.clientKey);
      url.searchParams.set("redirect_uri", options.redirectURI || redirectURI);
      url.searchParams.set("state", state);
      if (additionalParams) for (const [key, value] of Object.entries(additionalParams)) {
        if (RESERVED_AUTHORIZATION_PARAMS_SET.has(key)) continue;
        if (key === "client_key") continue;
        url.searchParams.set(key, value);
      }
      return url;
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI: options.redirectURI || redirectURI,
        options: {},
        tokenEndpoint: tokenEndpoint3,
        tokenEndpointAuth
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {},
        tokenEndpoint: tokenEndpoint3,
        tokenEndpointAuth
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch(`https://open.tiktokapis.com/v2/user/info/?fields=${[
        "open_id",
        "avatar_large_url",
        "display_name",
        "username"
      ].join(",")}`, { headers: { authorization: `Bearer ${token.accessToken}` } });
      if (error2) return null;
      return {
        user: {
          email: profile.data.user.email || createPlaceholderEmail({
            identifier: profile.data.user.open_id,
            namespace: "tiktok"
          }),
          name: profile.data.user.display_name || profile.data.user.username || "",
          image: profile.data.user.avatar_large_url,
          emailVerified: false
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/twitch.mjs
var twitch = (options) => {
  const tokenEndpoint3 = "https://id.twitch.tv/oauth2/token";
  return {
    id: "twitch",
    name: "Twitch",
    accountSubject: ({ profile }) => profile.sub,
    createAuthorizationURL({ state, scopes, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : ["user:read:email", "openid"];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "twitch",
        redirectURI,
        options,
        authorizationEndpoint: "https://id.twitch.tv/oauth2/authorize",
        scopes: _scopes,
        state,
        claims: options.claims || [
          "email",
          "email_verified",
          "preferred_username",
          "picture"
        ],
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const idToken = token.idToken;
      if (!idToken) {
        logger.error("No idToken found in token");
        return null;
      }
      const profile = decodeJwt(idToken);
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.preferred_username,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/twitter.mjs
var twitter = (options) => {
  const tokenEndpoint3 = "https://api.x.com/2/oauth2/token";
  return {
    id: "twitter",
    name: "Twitter",
    accountSubject: ({ profile }) => profile.data.id,
    createAuthorizationURL(data) {
      const _scopes = options.disableDefaultScope ? [] : [
        "users.read",
        "tweet.read",
        "offline.access",
        "users.email"
      ];
      if (options.scope) _scopes.push(...options.scope);
      if (data.scopes) _scopes.push(...data.scopes);
      return createAuthorizationURL({
        id: "twitter",
        options,
        authorizationEndpoint: "https://x.com/i/oauth2/authorize",
        scopes: _scopes,
        state: data.state,
        codeVerifier: data.codeVerifier,
        redirectURI: data.redirectURI,
        additionalParams: data.additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        authentication: "basic",
        redirectURI,
        options,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        authentication: "basic",
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: profileError } = await betterFetch("https://api.x.com/2/users/me?user.fields=profile_image_url", {
        method: "GET",
        headers: { Authorization: `Bearer ${token.accessToken}` }
      });
      if (profileError) return null;
      const { data: emailData, error: emailError } = await betterFetch("https://api.x.com/2/users/me?user.fields=confirmed_email", {
        method: "GET",
        headers: { Authorization: `Bearer ${token.accessToken}` }
      });
      let emailVerified = false;
      if (!emailError && emailData?.data?.confirmed_email) {
        profile.data.email = emailData.data.confirmed_email;
        emailVerified = true;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.data.name,
          email: profile.data.email || createPlaceholderEmail({
            identifier: profile.data.id,
            namespace: "twitter"
          }),
          image: profile.data.profile_image_url,
          emailVerified,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/vercel.mjs
var vercel = (options) => {
  const authMethod = options.tokenEndpointAuth?.method;
  if (options.clientSecret && (authMethod === "private_key_jwt" || authMethod === "none")) throw new BetterAuthError(`Vercel ${authMethod} token endpoint authentication cannot be combined with clientSecret`);
  if (!options.clientSecret && (authMethod === "client_secret_basic" || authMethod === "client_secret_post")) throw new BetterAuthError(`Vercel ${authMethod} token endpoint authentication requires clientSecret`);
  return {
    id: "vercel",
    name: "Vercel",
    accountSubject: ({ profile }) => profile.sub,
    createAuthorizationURL({ state, scopes, codeVerifier, redirectURI, additionalParams }) {
      if (!codeVerifier) throw new BetterAuthError("codeVerifier is required for Vercel");
      let _scopes = void 0;
      if (options.scope !== void 0 || scopes !== void 0) {
        _scopes = [];
        if (options.scope) _scopes.push(...options.scope);
        if (scopes) _scopes.push(...scopes);
      }
      return createAuthorizationURL({
        id: "vercel",
        options,
        authorizationEndpoint: "https://vercel.com/oauth/authorize",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: "https://api.vercel.com/login/oauth/token",
        tokenEndpointAuth: options.tokenEndpointAuth
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://api.vercel.com/login/oauth/userinfo", { headers: { Authorization: `Bearer ${token.accessToken}` } });
      if (error2 || !profile) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.name ?? profile.preferred_username ?? "",
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified ?? false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/vk.mjs
var vk = (options) => {
  const tokenEndpoint3 = "https://id.vk.com/oauth2/auth";
  return {
    id: "vk",
    name: "VK",
    accountSubject: ({ profile }) => profile.user.user_id,
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : ["email", "phone"];
      if (options.scope) _scopes.push(...options.scope);
      if (scopes) _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "vk",
        options,
        authorizationEndpoint: "https://id.vk.com/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        codeVerifier,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI, deviceId }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI: options.redirectURI || redirectURI,
        options,
        deviceId,
        tokenEndpoint: tokenEndpoint3
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: tokenEndpoint3
      });
    },
    async getUserInfo(data) {
      if (options.getUserInfo) return options.getUserInfo(data);
      if (!data.accessToken) return null;
      const formBody = new URLSearchParams({
        access_token: data.accessToken,
        client_id: options.clientId
      }).toString();
      const { data: profile, error: error2 } = await betterFetch("https://id.vk.com/oauth2/user_info", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody
      });
      if (error2) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      if (!profile.user.email && !userMap?.email) return null;
      return {
        user: {
          first_name: profile.user.first_name,
          last_name: profile.user.last_name,
          email: profile.user.email,
          image: profile.user.avatar,
          emailVerified: false,
          birthday: profile.user.birthday,
          sex: profile.user.sex,
          name: `${profile.user.first_name} ${profile.user.last_name}`,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/wechat.mjs
var wechat = (options) => {
  return {
    id: "wechat",
    name: "WeChat",
    accountSubject: ({ profile }) => profile.unionid || profile.openid,
    createAuthorizationURL({ state, scopes, redirectURI, additionalParams }) {
      const _scopes = options.disableDefaultScope ? [] : ["snsapi_login"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      const url = new URL("https://open.weixin.qq.com/connect/qrconnect");
      url.searchParams.set("scope", _scopes.join(","));
      url.searchParams.set("response_type", "code");
      url.searchParams.set("appid", options.clientId);
      url.searchParams.set("redirect_uri", options.redirectURI || redirectURI);
      url.searchParams.set("state", state);
      url.searchParams.set("lang", options.lang || "cn");
      if (additionalParams) for (const [key, value] of Object.entries(additionalParams)) {
        if (RESERVED_AUTHORIZATION_PARAMS_SET.has(key)) continue;
        if (key === "appid") continue;
        url.searchParams.set(key, value);
      }
      url.hash = "wechat_redirect";
      return url;
    },
    validateAuthorizationCode: async ({ code }) => {
      const { data: tokenData, error: error2 } = await fetchRefusingRedirects("https://api.weixin.qq.com/sns/oauth2/access_token", {
        method: "GET",
        query: {
          appid: options.clientId,
          secret: options.clientSecret,
          code,
          grant_type: "authorization_code"
        }
      });
      if (error2 || !tokenData || tokenData.errcode) throw new Error(`Failed to validate authorization code: ${tokenData?.errmsg || error2?.message || "Unknown error"}`);
      return {
        tokenType: "Bearer",
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        accessTokenExpiresAt: new Date(Date.now() + tokenData.expires_in * 1e3),
        scopes: tokenData.scope.split(","),
        openid: tokenData.openid,
        unionid: tokenData.unionid
      };
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      const { data: tokenData, error: error2 } = await fetchRefusingRedirects("https://api.weixin.qq.com/sns/oauth2/refresh_token", {
        method: "GET",
        query: {
          appid: options.clientId,
          grant_type: "refresh_token",
          refresh_token: refreshToken2
        }
      });
      if (error2 || !tokenData || tokenData.errcode) throw new Error(`Failed to refresh access token: ${tokenData?.errmsg || error2?.message || "Unknown error"}`);
      return {
        tokenType: "Bearer",
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        accessTokenExpiresAt: new Date(Date.now() + tokenData.expires_in * 1e3),
        scopes: tokenData.scope.split(",")
      };
    },
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const openid = token.openid;
      if (!openid) return null;
      const params = new URLSearchParams({
        access_token: token.accessToken || "",
        openid,
        lang: "zh_CN"
      });
      const { data: profile, error: error2 } = await betterFetch("https://api.weixin.qq.com/sns/userinfo?" + params.toString(), { method: "GET" });
      if (error2 || !profile || profile.errcode) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      const userId = profile.unionid || profile.openid || openid;
      return {
        user: {
          name: profile.nickname,
          email: profile.email || createPlaceholderEmail({
            identifier: userId,
            namespace: "wechat"
          }),
          image: profile.headimgurl,
          emailVerified: false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/zoom.mjs
var zoom = (userOptions) => {
  const options = {
    pkce: true,
    ...userOptions
  };
  return {
    id: "zoom",
    name: "Zoom",
    accountSubject: ({ profile }) => profile.id,
    createAuthorizationURL: async ({ state, redirectURI, codeVerifier, additionalParams }) => createAuthorizationURL({
      id: "zoom",
      options,
      authorizationEndpoint: "https://zoom.us/oauth/authorize",
      state,
      redirectURI,
      codeVerifier: options.pkce ? codeVerifier : void 0,
      additionalParams
    }),
    validateAuthorizationCode: async ({ code, redirectURI, codeVerifier }) => {
      return validateAuthorizationCode({
        code,
        redirectURI: options.redirectURI || redirectURI,
        codeVerifier,
        options,
        tokenEndpoint: "https://zoom.us/oauth/token",
        authentication: "post"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => refreshAccessToken({
      refreshToken: refreshToken2,
      options: {
        clientId: options.clientId,
        clientKey: options.clientKey,
        clientSecret: options.clientSecret
      },
      tokenEndpoint: "https://zoom.us/oauth/token"
    }),
    async getUserInfo(token) {
      if (options.getUserInfo) return options.getUserInfo(token);
      const { data: profile, error: error2 } = await betterFetch("https://api.zoom.us/v2/users/me", { headers: { authorization: `Bearer ${token.accessToken}` } });
      if (error2) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          name: profile.display_name,
          image: profile.pic_url,
          email: profile.email,
          emailVerified: Boolean(profile.verified),
          ...userMap
        },
        data: { ...profile }
      };
    },
    options
  };
};

// node_modules/@better-auth/core/dist/social-providers/index.mjs
var socialProviders = {
  apple,
  atlassian,
  cloudflare,
  cognito,
  discord,
  facebook,
  figma,
  github,
  microsoft,
  google,
  huggingface,
  slack,
  spotify,
  twitch,
  twitter,
  dropbox,
  kick,
  linear,
  linkedin,
  gitlab,
  tiktok,
  reddit,
  roblox,
  salesforce,
  vk,
  zoom,
  notion,
  kakao,
  naver,
  line,
  paybin,
  paypal,
  polar,
  railway,
  vercel,
  wechat
};
var socialProviderList = Object.keys(socialProviders);
var SocialProviderListEnum = _enum(socialProviderList).or(string());

// node_modules/better-auth/dist/api/routes/account.mjs
function parseStoredScopes(scope) {
  if (!scope) return [];
  return scope.split(",").map((s) => s.trim()).filter(Boolean);
}
var listUserAccounts = createAuthEndpoint("/list-accounts", {
  method: "GET",
  use: [sessionMiddleware],
  metadata: { openapi: {
    operationId: "listUserAccounts",
    description: "List all accounts linked to the user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            providerId: { type: "string" },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            },
            accountId: { type: "string" },
            userId: { type: "string" },
            scopes: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: [
            "id",
            "providerId",
            "createdAt",
            "updatedAt",
            "accountId",
            "userId",
            "scopes"
          ]
        }
      } } }
    } }
  } }
}, async (c) => {
  const session = c.context.session;
  const accounts = await c.context.internalAdapter.findAccounts(session.user.id);
  return c.json(accounts.map((a) => {
    const { scope, ...parsed } = parseAccountOutput(c.context.options, a);
    return {
      ...parsed,
      scopes: parseStoredScopes(scope)
    };
  }));
});
var linkSocialAccount = createAuthEndpoint("/link-social", {
  method: "POST",
  requireHeaders: true,
  body: object({
    /**
    * Callback URL to redirect to after the user has signed in.
    */
    callbackURL: string().meta({ description: "The URL to redirect to after the user has signed in" }).optional(),
    /**
    * OAuth2 provider to use
    */
    provider: SocialProviderListEnum,
    /**
    * ID Token for direct authentication without redirect
    */
    idToken: object({
      token: string(),
      nonce: string().optional(),
      accessToken: string().optional(),
      refreshToken: string().optional()
    }).optional(),
    /**
    * Whether to allow sign up for new users
    */
    requestSignUp: boolean().optional(),
    /**
    * Additional scopes to request when linking the account.
    * This is useful for requesting additional permissions when
    * linking a social account compared to the initial authentication.
    */
    scopes: array(string()).meta({ description: "Additional scopes to request from the provider" }).optional(),
    /**
    * The URL to redirect to if there is an error during the link process.
    */
    errorCallbackURL: string().meta({ description: "The URL to redirect to if there is an error during the link process" }).optional(),
    /**
    * Disable automatic redirection to the provider
    *
    * This is useful if you want to handle the redirection
    * yourself like in a popup or a different tab.
    */
    disableRedirect: boolean().meta({ description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself" }).optional(),
    /**
    * The login hint to forward to the provider authorization endpoint.
    */
    loginHint: string().meta({ description: "The login hint to use for the authorization code request" }).optional(),
    /**
    * Extra query parameters to append to the provider authorization URL.
    * Reserved OAuth keys (state, client_id, redirect_uri, response_type,
    * code_challenge, code_challenge_method, nonce, scope) are rejected.
    */
    additionalParams: additionalAuthorizationParamsSchema,
    /**
    * Any additional data to pass through the oauth flow.
    */
    additionalData: record(string(), any()).optional()
  }),
  use: [sensitiveSessionMiddleware],
  metadata: { openapi: {
    description: "Link a social account to the user",
    operationId: "linkSocialAccount",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "The authorization URL to redirect the user to"
          },
          redirect: {
            type: "boolean",
            description: "Indicates if the user should be redirected to the authorization URL"
          },
          status: { type: "boolean" }
        },
        required: ["redirect"]
      } } }
    } }
  } }
}, async (c) => {
  const session = c.context.session;
  const provider = await getAwaitableValue(c.context.socialProviders, { value: c.body.provider });
  if (!provider) {
    c.context.logger.error("Provider not found. Make sure to add the provider in your auth config", { provider: c.body.provider });
    throw APIError2.from("NOT_FOUND", BASE_ERROR_CODES.PROVIDER_NOT_FOUND);
  }
  if (c.body.idToken) {
    if (!supportsIdTokenSignIn(provider)) {
      c.context.logger.error("Provider does not support id token verification", { provider: c.body.provider });
      throw APIError2.from("NOT_FOUND", BASE_ERROR_CODES.ID_TOKEN_NOT_SUPPORTED);
    }
    const { token, nonce } = c.body.idToken;
    if (!await verifyProviderIdToken(provider, token, nonce, c)) {
      c.context.logger.warn("Invalid id token", { provider: c.body.provider });
      throw APIError2.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_TOKEN);
    }
    const oauthTokens = {
      idToken: token,
      accessToken: c.body.idToken.accessToken,
      refreshToken: c.body.idToken.refreshToken
    };
    const linkingUserInfo = provider.getUserInfoFromIdToken ? await provider.getUserInfoFromIdToken(token) : await provider.getUserInfo(oauthTokens);
    if (!linkingUserInfo || !linkingUserInfo?.user) {
      c.context.logger.error("Failed to get user info", { provider: c.body.provider });
      throw APIError2.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO);
    }
    if (!linkingUserInfo.user.email) {
      c.context.logger.error(missingEmailLogMessage(c.body.provider, { source: "id_token" }), { provider: c.body.provider });
      throw APIError2.from("UNAUTHORIZED", BASE_ERROR_CODES.USER_EMAIL_NOT_FOUND);
    }
    const accountKey = await resolveOAuthAccountKeyForAPI(provider, {
      idToken: token,
      accessToken: c.body.idToken.accessToken,
      refreshToken: c.body.idToken.refreshToken
    }, linkingUserInfo.data);
    const linkedAccount = await c.context.internalAdapter.findAccountByKey(accountKey);
    if (linkedAccount?.userId === session.user.id) {
      const accountFields2 = await resolveOAuthAccountFields(c, provider, oauthTokens, linkingUserInfo.user);
      const updateData = Object.fromEntries(Object.entries({
        ...accountFields2,
        providerId: provider.id,
        accessToken: await setTokenUtil(c.body.idToken.accessToken, c.context),
        idToken: token,
        refreshToken: await setTokenUtil(c.body.idToken.refreshToken, c.context)
      }).filter(([_, value]) => value !== void 0));
      await c.context.internalAdapter.updateAccount(linkedAccount.id, updateData);
      await applyUpdateUserInfoOnLink(c, session.user.id, linkingUserInfo.user);
      return c.json({
        url: "",
        status: true,
        redirect: false
      });
    }
    if (linkedAccount) throw APIError2.from("CONFLICT", BASE_ERROR_CODES.SOCIAL_ACCOUNT_ALREADY_LINKED);
    const isTrustedProvider = c.context.trustedProviders.includes(provider.id);
    const emailVerified = parseStringBoolean(linkingUserInfo.user.emailVerified) ?? false;
    if (!isTrustedProvider && !emailVerified || c.context.options.account?.accountLinking?.enabled === false) throw APIError2.from("UNAUTHORIZED", {
      message: "Account not linked - linking not allowed",
      code: "LINKING_NOT_ALLOWED"
    });
    if (linkingUserInfo.user.email?.toLowerCase() !== session.user.email.toLowerCase() && c.context.options.account?.accountLinking?.allowDifferentEmails !== true) throw APIError2.from("UNAUTHORIZED", {
      message: "Account not linked - different emails not allowed",
      code: "LINKING_DIFFERENT_EMAILS_NOT_ALLOWED"
    });
    const accountFields = await resolveOAuthAccountFields(c, provider, oauthTokens, linkingUserInfo.user);
    try {
      await c.context.internalAdapter.createAccount({
        ...accountFields,
        userId: session.user.id,
        ...accountKey,
        accessToken: await setTokenUtil(c.body.idToken.accessToken, c.context),
        idToken: token,
        refreshToken: await setTokenUtil(c.body.idToken.refreshToken, c.context)
      });
    } catch {
      throw APIError2.from("EXPECTATION_FAILED", {
        message: "Account not linked - unable to create account",
        code: "LINKING_FAILED"
      });
    }
    await applyUpdateUserInfoOnLink(c, session.user.id, linkingUserInfo.user);
    return c.json({
      url: "",
      status: true,
      redirect: false
    });
  }
  const idTokenNonce = generateIdTokenNonce(provider);
  const state = await generateState(c, {
    link: {
      userId: session.user.id,
      email: session.user.email,
      encryptedSessionToken: await symmetricEncrypt({
        key: derivePurposeKey(c.context.secretConfig, "oauth-link-session-token"),
        data: session.session.token
      })
    },
    additionalData: c.body.additionalData,
    idTokenNonce
  });
  const url = await provider.createAuthorizationURL({
    state: state.state,
    codeVerifier: state.codeVerifier,
    idTokenNonce,
    redirectURI: `${c.context.baseURL}${getOAuthCallbackPath(provider)}`,
    scopes: c.body.scopes,
    loginHint: c.body.loginHint,
    additionalParams: c.body.additionalParams
  });
  if (!c.body.disableRedirect) c.setHeader("Location", url.toString());
  return c.json({
    url: url.toString(),
    redirect: !c.body.disableRedirect
  });
});
var unlinkAccount = createAuthEndpoint("/unlink-account", {
  method: "POST",
  body: object({ accountId: string().meta({ description: "The Better Auth account ID to unlink" }) }),
  use: [freshSessionMiddleware],
  metadata: { openapi: {
    description: "Unlink an account",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const { accountId } = ctx.body;
  const accounts = await ctx.context.internalAdapter.findAccounts(ctx.context.session.user.id);
  if (accounts.length === 1 && !ctx.context.options.account?.accountLinking?.allowUnlinkingAll) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.FAILED_TO_UNLINK_LAST_ACCOUNT);
  const accountExist = accounts.find((account) => account.id === accountId);
  if (!accountExist) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.ACCOUNT_NOT_FOUND);
  await ctx.context.internalAdapter.deleteAccount(accountExist.id);
  return ctx.json({ status: true });
});
async function resolveUserId(ctx, userId) {
  const session = await getSessionFromCtx(ctx, { disableCookieCache: isStateful(ctx) });
  if (!session && (ctx.request || ctx.headers)) throw ctx.error("UNAUTHORIZED");
  const resolvedUserId = session?.user?.id || userId;
  if (!resolvedUserId) throw APIError2.from("BAD_REQUEST", {
    message: "Either userId or session is required",
    code: "USER_ID_OR_SESSION_REQUIRED"
  });
  return resolvedUserId;
}
var accountSelectionSchema = union([strictObject({
  accountId: string().meta({ description: "The Better Auth account ID" }),
  userId: string().meta({ description: "The user ID associated with the account" }).optional()
}), strictObject({
  useAccountCookie: literal(true).meta({ description: "Select the current OAuth account from its signed cookie" }),
  userId: string().meta({ description: "The user ID associated with the account" }).optional()
})]);
function matchesAccountSelection(ctx, account, { resolvedUserId, selection }) {
  return (!shouldBindAccountCookieToSessionUser(ctx.context.options) || account.userId === resolvedUserId) && ("accountId" in selection ? account.id === selection.accountId : true);
}
async function resolveUserAccount(ctx, { resolvedUserId, selection }) {
  if ("accountId" in selection) {
    const account = (await ctx.context.internalAdapter.findAccounts(resolvedUserId)).find((candidate) => candidate.id === selection.accountId);
    if (account) return {
      account,
      accountCookie: null
    };
  } else if (ctx.context.options.account?.storeAccountCookie) {
    const accountCookie = await getAccountCookie(ctx);
    if (accountCookie && matchesAccountSelection(ctx, accountCookie, {
      resolvedUserId,
      selection
    })) return {
      account: accountCookie,
      accountCookie
    };
  }
  throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.ACCOUNT_NOT_FOUND);
}
async function getValidAccessToken(ctx, { resolvedUserId, selection, account: resolvedAccount }) {
  const account = resolvedAccount ?? (await resolveUserAccount(ctx, {
    resolvedUserId,
    selection
  })).account;
  if (!matchesAccountSelection(ctx, account, {
    resolvedUserId,
    selection
  })) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.ACCOUNT_NOT_FOUND);
  const provider = await getAwaitableValue(ctx.context.socialProviders, { value: account.providerId });
  if (!provider) throw APIError2.from("BAD_REQUEST", {
    message: `Provider ${account.providerId} is not supported.`,
    code: "PROVIDER_NOT_SUPPORTED"
  });
  try {
    let newTokens = null;
    const accessTokenExpired = account.accessTokenExpiresAt && new Date(account.accessTokenExpiresAt).getTime() - Date.now() < 5e3;
    if (account.refreshToken && accessTokenExpired && provider.refreshAccessToken) {
      const refreshToken2 = await decryptOAuthToken(account.refreshToken, ctx.context);
      newTokens = await provider.refreshAccessToken(refreshToken2, ctx);
      const updatedData = {
        accessToken: await setTokenUtil(newTokens?.accessToken, ctx.context),
        accessTokenExpiresAt: newTokens?.accessTokenExpiresAt,
        refreshToken: newTokens?.refreshToken ? await setTokenUtil(newTokens.refreshToken, ctx.context) : account.refreshToken,
        refreshTokenExpiresAt: newTokens?.refreshTokenExpiresAt ?? account.refreshTokenExpiresAt,
        idToken: newTokens?.idToken || account.idToken
      };
      let updatedAccount = null;
      if (account.id) updatedAccount = await ctx.context.internalAdapter.updateAccount(account.id, updatedData);
      if (ctx.context.options.account?.storeAccountCookie) await setAccountCookie(ctx, {
        ...account,
        ...updatedAccount ?? updatedData
      });
    }
    const accessTokenExpiresAt = (() => {
      if (newTokens?.accessTokenExpiresAt) {
        if (typeof newTokens.accessTokenExpiresAt === "string") return new Date(newTokens.accessTokenExpiresAt);
        return newTokens.accessTokenExpiresAt;
      }
      if (account.accessTokenExpiresAt) {
        if (typeof account.accessTokenExpiresAt === "string") return new Date(account.accessTokenExpiresAt);
        return account.accessTokenExpiresAt;
      }
    })();
    return {
      accessToken: newTokens?.accessToken ?? await decryptOAuthToken(account.accessToken ?? "", ctx.context),
      accessTokenExpiresAt,
      scopes: parseStoredScopes(account.scope),
      idToken: newTokens?.idToken ?? account.idToken ?? void 0
    };
  } catch (_error) {
    throw APIError2.from("BAD_REQUEST", {
      message: "Failed to get a valid access token",
      code: "FAILED_TO_GET_ACCESS_TOKEN"
    });
  }
}
var getAccessToken = createAuthEndpoint("/get-access-token", {
  method: "POST",
  body: accountSelectionSchema,
  metadata: { openapi: {
    description: "Get a valid access token, doing a refresh if needed",
    responses: {
      200: {
        description: "A Valid access token",
        content: { "application/json": { schema: {
          type: "object",
          properties: {
            tokenType: { type: "string" },
            idToken: { type: "string" },
            accessToken: { type: "string" },
            accessTokenExpiresAt: {
              type: "string",
              format: "date-time"
            }
          }
        } } }
      },
      400: { description: "Invalid refresh token or provider configuration" }
    }
  } }
}, async (ctx) => {
  const { userId } = ctx.body;
  const tokens = await getValidAccessToken(ctx, {
    resolvedUserId: await resolveUserId(ctx, userId),
    selection: ctx.body
  });
  return ctx.json(tokens);
});
var refreshToken = createAuthEndpoint("/refresh-token", {
  method: "POST",
  body: accountSelectionSchema,
  metadata: { openapi: {
    description: "Refresh the access token using a refresh token",
    responses: {
      200: {
        description: "Access token refreshed successfully",
        content: { "application/json": { schema: {
          type: "object",
          properties: {
            tokenType: { type: "string" },
            idToken: { type: "string" },
            accessToken: { type: "string" },
            refreshToken: { type: "string" },
            accessTokenExpiresAt: {
              type: "string",
              format: "date-time"
            },
            refreshTokenExpiresAt: {
              type: "string",
              format: "date-time"
            }
          }
        } } }
      },
      400: { description: "Invalid refresh token or provider configuration" }
    }
  } }
}, async (ctx) => {
  const { userId } = ctx.body;
  const { account, accountCookie } = await resolveUserAccount(ctx, {
    resolvedUserId: await resolveUserId(ctx, userId),
    selection: ctx.body
  });
  const provider = await getAwaitableValue(ctx.context.socialProviders, { value: account.providerId });
  if (!provider) throw APIError2.from("BAD_REQUEST", {
    message: `Provider ${account.providerId} is not supported.`,
    code: "PROVIDER_NOT_SUPPORTED"
  });
  if (!provider.refreshAccessToken) throw APIError2.from("BAD_REQUEST", {
    message: `Provider ${account.providerId} does not support token refreshing.`,
    code: "TOKEN_REFRESH_NOT_SUPPORTED"
  });
  const refreshToken2 = account.refreshToken ?? void 0;
  if (!refreshToken2) throw APIError2.from("BAD_REQUEST", {
    message: "Refresh token not found",
    code: "REFRESH_TOKEN_NOT_FOUND"
  });
  try {
    const decryptedRefreshToken = await decryptOAuthToken(refreshToken2, ctx.context);
    const tokens = await provider.refreshAccessToken(decryptedRefreshToken, ctx);
    const resolvedRefreshToken = tokens.refreshToken ? await setTokenUtil(tokens.refreshToken, ctx.context) : refreshToken2;
    const resolvedRefreshTokenExpiresAt = tokens.refreshTokenExpiresAt ?? account.refreshTokenExpiresAt;
    const updatedTokenData = {
      accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
      refreshToken: resolvedRefreshToken,
      accessTokenExpiresAt: tokens.accessTokenExpiresAt,
      refreshTokenExpiresAt: resolvedRefreshTokenExpiresAt,
      idToken: tokens.idToken || account.idToken
    };
    let updatedAccount = null;
    if (account.id)
      updatedAccount = await ctx.context.internalAdapter.updateAccount(account.id, updatedTokenData);
    if (accountCookie?.id === account.id && ctx.context.options.account?.storeAccountCookie) {
      const updateData = {
        ...accountCookie,
        ...updatedAccount ?? updatedTokenData
      };
      await setAccountCookie(ctx, updateData);
    }
    const responseScope = updatedAccount?.scope ?? account.scope;
    return ctx.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken ?? decryptedRefreshToken,
      accessTokenExpiresAt: tokens.accessTokenExpiresAt,
      refreshTokenExpiresAt: resolvedRefreshTokenExpiresAt,
      scope: responseScope,
      idToken: tokens.idToken || account.idToken,
      providerId: account.providerId,
      accountId: account.id
    });
  } catch (_error) {
    throw APIError2.from("BAD_REQUEST", {
      message: "Failed to refresh access token",
      code: "FAILED_TO_REFRESH_ACCESS_TOKEN"
    });
  }
});
var accountInfo = createAuthEndpoint("/account-info", {
  method: "GET",
  metadata: { openapi: {
    description: "Get the account info provided by the provider",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: {
                type: "string",
                nullable: true
              },
              image: { type: "string" },
              emailVerified: { type: "boolean" }
            },
            required: ["emailVerified"]
          },
          account: {
            type: "object",
            properties: {
              id: { type: "string" },
              providerId: { type: "string" },
              accountId: { type: "string" }
            },
            required: [
              "id",
              "providerId",
              "accountId"
            ],
            additionalProperties: false
          },
          data: {
            type: "object",
            properties: {},
            additionalProperties: true
          }
        },
        required: [
          "user",
          "data",
          "account"
        ],
        additionalProperties: false
      } } }
    } }
  } },
  query: accountSelectionSchema
}, async (ctx) => {
  const { userId } = ctx.query;
  const resolvedUserId = await resolveUserId(ctx, userId);
  const { account } = await resolveUserAccount(ctx, {
    resolvedUserId,
    selection: ctx.query
  });
  const provider = await getAwaitableValue(ctx.context.socialProviders, { value: account.providerId });
  if (!provider) throw APIError2.from("BAD_REQUEST", {
    message: "Account is not associated with a configured social provider.",
    code: "PROVIDER_NOT_CONFIGURED"
  });
  const tokens = await getValidAccessToken(ctx, {
    resolvedUserId,
    selection: ctx.query,
    account
  });
  if (!tokens.accessToken) throw APIError2.from("BAD_REQUEST", {
    message: "Access token not found",
    code: "ACCESS_TOKEN_NOT_FOUND"
  });
  const info2 = await provider.getUserInfo({
    ...tokens,
    accessToken: tokens.accessToken
  });
  if (!info2) throw APIError2.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO);
  return ctx.json({
    ...info2,
    account: {
      id: account.id,
      providerId: account.providerId,
      accountId: account.accountId
    }
  });
});

// node_modules/better-auth/dist/oauth2/callback.mjs
async function exchangeOAuthCallback(ctx, provider, callback) {
  if (callback.iss && provider.issuer && callback.iss !== provider.issuer) {
    ctx.context.logger.error("OAuth issuer mismatch", {
      expected: provider.issuer,
      received: callback.iss
    });
    return { error: OAUTH_CALLBACK_ERROR_CODES.ISSUER_MISMATCH };
  }
  if (provider.requiresIdTokenNonce && !callback.idTokenNonce) {
    ctx.context.logger.error("OAuth id_token nonce binding required but no expected nonce was found in state", { providerId: provider.id });
    return { error: OAUTH_CALLBACK_ERROR_CODES.NONCE_BINDING_MISSING };
  }
  let tokens;
  try {
    tokens = await provider.validateAuthorizationCode({
      code: callback.code,
      codeVerifier: callback.codeVerifier,
      deviceId: callback.deviceId,
      redirectURI: `${ctx.context.baseURL}${getOAuthCallbackPath(provider)}`
    });
  } catch (error2) {
    ctx.context.logger.error("Failed to validate authorization code", error2);
    return { error: OAUTH_CALLBACK_ERROR_CODES.INVALID_CODE };
  }
  if (!tokens) return { error: OAUTH_CALLBACK_ERROR_CODES.INVALID_CODE };
  const result = await provider.getUserInfo({
    ...tokens,
    expectedIdTokenNonce: callback.idTokenNonce,
    /**
    * The user object from the provider
    * This is only available for some providers like Apple
    */
    user: safeJSONParse(callback.user) ?? void 0
  });
  if (!result?.user) {
    ctx.context.logger.error("Unable to get user info");
    return { error: OAUTH_CALLBACK_ERROR_CODES.UNABLE_TO_GET_USER_INFO };
  }
  const accountKey = await resolveOAuthAccountKey(provider, tokens, result.data).catch((error2) => {
    ctx.context.logger.error("Unable to derive provider account identity", {
      providerId: provider.id,
      error: error2
    });
    return null;
  });
  if (!accountKey) return { error: OAUTH_CALLBACK_ERROR_CODES.UNABLE_TO_GET_USER_INFO };
  return {
    tokens,
    userInfo: result.user,
    providerProfile: toOAuthProfileRecord(result.data),
    accountKey
  };
}

// node_modules/better-auth/dist/api/routes/callback.mjs
var schema = object({
  code: string().optional(),
  error: string().optional(),
  device_id: string().optional(),
  error_description: string().optional(),
  state: string().optional(),
  user: string().optional(),
  iss: string().optional()
});
var callbackOAuth = createAuthEndpoint("/callback/:id", {
  method: ["GET", "POST"],
  operationId: "handleOAuthCallback",
  body: schema.optional(),
  query: schema.optional(),
  metadata: {
    ...HIDE_METADATA,
    allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"]
  }
}, async (c) => {
  let queryOrBody;
  const defaultErrorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
  if (c.method === "POST") {
    const postData = c.body ? schema.parse(c.body) : {};
    const queryData = c.query ? schema.parse(c.query) : {};
    const mergedData = schema.parse({
      ...postData,
      ...queryData
    });
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(mergedData)) if (value !== void 0 && value !== null) params.set(key, String(value));
    const redirectURL = `${c.context.baseURL}/callback/${c.params.id}?${params.toString()}`;
    throw c.redirect(redirectURL);
  }
  try {
    if (c.method === "GET") queryOrBody = schema.parse(c.query);
    else if (c.method === "POST") queryOrBody = schema.parse(c.body);
    else throw new Error("Unsupported method");
  } catch (e) {
    c.context.logger.error("INVALID_CALLBACK_REQUEST", e);
    const params = new URLSearchParams({ error: "invalid_callback_request" });
    const redirectURL = appendQueryParams(defaultErrorURL, params);
    throw c.redirect(redirectURL);
  }
  const { code, error: error2, state, error_description, device_id, user: userData, iss } = queryOrBody;
  if (state === void 0 && code) {
    const provider2 = await getAwaitableValue(c.context.socialProviders, { value: c.params.id });
    if (provider2?.allowIdpInitiated) {
      const idTokenNonce2 = generateIdTokenNonce(provider2);
      const { state: freshState, codeVerifier: codeVerifier2 } = await generateState(c, { idTokenNonce: idTokenNonce2 });
      const authUrl = await provider2.createAuthorizationURL({
        state: freshState,
        codeVerifier: codeVerifier2,
        idTokenNonce: idTokenNonce2,
        redirectURI: `${c.context.baseURL}${getOAuthCallbackPath(provider2)}`
      });
      throw c.redirect(authUrl.toString());
    }
  }
  if (!state) {
    c.context.logger.error("State not found", error2);
    const params = new URLSearchParams({ error: "state_not_found" });
    const redirectURL = appendQueryParams(defaultErrorURL, params);
    throw c.redirect(redirectURL);
  }
  const { codeVerifier, callbackURL, link, errorURL, newUserURL, requestSignUp, idTokenNonce } = await parseState(c);
  function redirectOnError2(error3, description) {
    const baseURL = errorURL ?? defaultErrorURL;
    const params = new URLSearchParams({ error: error3 });
    if (description) params.set("error_description", description);
    const redirectURL = appendQueryParams(baseURL, params);
    throw c.redirect(redirectURL);
  }
  if (error2) redirectOnError2(error2, error_description);
  if (!code) {
    c.context.logger.warn("Code not found");
    throw redirectOnError2(OAUTH_CALLBACK_ERROR_CODES.NO_CODE);
  }
  const provider = await getAwaitableValue(c.context.socialProviders, { value: c.params.id });
  if (!provider) {
    c.context.logger.warn("OAuth provider not found", { providerId: c.params.id });
    throw redirectOnError2(OAUTH_CALLBACK_ERROR_CODES.PROVIDER_NOT_FOUND);
  }
  const exchanged = await exchangeOAuthCallback(c, provider, {
    code,
    codeVerifier,
    iss,
    deviceId: device_id,
    user: userData,
    idTokenNonce
  });
  if (exchanged.error) throw redirectOnError2(exchanged.error);
  const { tokens, userInfo, providerProfile, accountKey } = exchanged;
  const { accountId } = accountKey;
  if (!callbackURL) {
    c.context.logger.error("No callback URL found");
    throw redirectOnError2(OAUTH_CALLBACK_ERROR_CODES.NO_CALLBACK_URL);
  }
  const accountData = {
    ...accountKey,
    ...tokens,
    scope: tokens.scopes?.join(",")
  };
  let accountFields;
  try {
    accountFields = await resolveOAuthAccountFields(c, provider, tokens, userInfo);
  } catch (e) {
    if (isAPIError2(e) && e.body?.code) return redirectOnError2(e.body.code, e.body.message);
    c.context.logger.error("getAccountFields failed", e);
    return redirectOnError2(OAUTH_CALLBACK_ERROR_CODES.UNABLE_TO_GET_USER_INFO);
  }
  if (link) {
    const linkResult = await linkOAuthAccount(c, {
      link,
      userInfo,
      account: accountData,
      accountFields,
      profile: providerProfile,
      scopes: tokens.scopes
    });
    if (!linkResult.linked) return redirectOnError2(linkResult.error.code, linkResult.error.message);
    throw c.redirect(callbackURL);
  }
  if (!userInfo.email) {
    c.context.logger.error(missingEmailLogMessage(provider.id));
    return redirectOnError2(OAUTH_CALLBACK_ERROR_CODES.EMAIL_NOT_FOUND);
  }
  let result;
  try {
    result = await handleOAuthUserInfo(c, {
      userInfo: {
        ...userInfo,
        id: accountId,
        email: userInfo.email,
        name: userInfo.name || ""
      },
      account: accountData,
      accountFields,
      callbackURL,
      disableSignUp: provider.disableImplicitSignUp && !requestSignUp || provider.options?.disableSignUp,
      overrideUserInfo: provider.options?.overrideUserInfoOnSignIn,
      source: {
        method: "oauth",
        oauth: {
          providerId: provider.id,
          profile: providerProfile
        }
      }
    });
  } catch (e) {
    if (isAPIError2(e) && e.body?.code) redirectOnError2(e.body.code, e.body.message);
    throw e;
  }
  if (result.error) {
    c.context.logger.error(result.error.split(" ").join("_"));
    return redirectOnError2(result.error.split(" ").join("_"));
  }
  const { session, user } = result.data;
  await setSessionCookie(c, {
    session,
    user
  });
  let toRedirectTo;
  try {
    toRedirectTo = (result.isRegister ? newUserURL || callbackURL : callbackURL).toString();
  } catch {
    toRedirectTo = result.isRegister ? newUserURL || callbackURL : callbackURL;
  }
  throw c.redirect(toRedirectTo);
});

// node_modules/better-auth/dist/utils/password.mjs
function assertPasswordNotTooShort(ctx, password) {
  if (password.length < ctx.context.password.config.minPasswordLength) {
    ctx.context.logger.warn("Password is too short");
    throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_SHORT);
  }
}
function assertPasswordNotTooLong(ctx, password) {
  if (password.length > ctx.context.password.config.maxPasswordLength) {
    ctx.context.logger.warn("Password is too long");
    throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_LONG);
  }
}
async function resetCredentialPassword(ctx, userId, passwordHash, consumeResetToken) {
  await runWithTransaction(ctx.context.adapter, async () => {
    await consumeResetToken?.();
    if (ctx.context.options.emailAndPassword?.revokeSessionsOnPasswordReset) await ctx.context.internalAdapter.deleteUserSessions(userId);
    if (!await ctx.context.internalAdapter.findCredentialAccount(userId)) {
      await ctx.context.internalAdapter.createAccount({
        userId,
        providerId: "credential",
        accountId: userId,
        password: passwordHash
      });
      return;
    }
    await ctx.context.internalAdapter.updatePassword(userId, passwordHash);
  });
}
async function validatePassword(ctx, data) {
  assertPasswordNotTooLong(ctx, data.password);
  const credentialAccount = await ctx.context.internalAdapter.findCredentialAccount(data.userId);
  const currentPassword = credentialAccount?.password;
  if (!credentialAccount || !currentPassword) return false;
  return await ctx.context.password.verify({
    hash: currentPassword,
    password: data.password
  });
}
async function checkPassword(userId, c) {
  const password = c.body.password;
  if (typeof password === "string") assertPasswordNotTooLong(c, password);
  const credentialAccount = await c.context.internalAdapter.findCredentialAccount(userId);
  const currentPassword = credentialAccount?.password;
  if (!credentialAccount || !currentPassword || !password) {
    if (password) await c.context.password.hash(password);
    throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
  }
  if (!await c.context.password.verify({
    hash: currentPassword,
    password
  })) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
  return true;
}

// node_modules/better-auth/dist/api/routes/update-user.mjs
var updateUserBodySchema = record(string().meta({ description: "Field name must be a string" }), any());
var updateUser = () => createAuthEndpoint("/update-user", {
  method: "POST",
  operationId: "updateUser",
  body: updateUserBodySchema,
  use: [sessionMiddleware],
  metadata: {
    $Infer: { body: {} },
    openapi: {
      operationId: "updateUser",
      description: "Update the current user",
      requestBody: { content: { "application/json": { schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the user"
          },
          image: {
            type: "string",
            description: "The image of the user",
            nullable: true
          }
        }
      } } } },
      responses: { "200": {
        description: "Success",
        content: { "application/json": { schema: {
          type: "object",
          properties: { user: {
            type: "object",
            $ref: "#/components/schemas/User"
          } }
        } } }
      } }
    }
  }
}, async (ctx) => {
  const body = ctx.body;
  if (typeof body !== "object" || Array.isArray(body)) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.BODY_MUST_BE_AN_OBJECT);
  if (body.email) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.EMAIL_CAN_NOT_BE_UPDATED);
  const { name, image, ...rest } = body;
  const session = ctx.context.session;
  const additionalFields = parseUserInput(ctx.context.options, rest, "update");
  if (image === void 0 && name === void 0 && Object.keys(additionalFields).length === 0) throw APIError2.fromStatus("BAD_REQUEST", { message: "No fields to update" });
  const updatedUser = await ctx.context.internalAdapter.updateUser(session.user.id, {
    name,
    image,
    ...additionalFields
  }) ?? {
    ...session.user,
    ...name !== void 0 && { name },
    ...image !== void 0 && { image },
    ...additionalFields
  };
  await setSessionCookie(ctx, {
    session: session.session,
    user: updatedUser
  });
  return ctx.json({ status: true });
});
var changePassword = createAuthEndpoint("/change-password", {
  method: "POST",
  operationId: "changePassword",
  body: object({
    /**
    * The new password to set
    */
    newPassword: string().meta({ description: "The new password to set" }),
    /**
    * The current password of the user
    */
    currentPassword: string().meta({ description: "The current password is required" }),
    /**
    * revoke all sessions that are not the
    * current one logged in by the user
    */
    revokeOtherSessions: boolean().meta({ description: "Must be a boolean value" }).optional()
  }),
  use: [sensitiveSessionMiddleware],
  metadata: { openapi: {
    operationId: "changePassword",
    description: "Change the password of the user",
    responses: { "200": {
      description: "Password successfully changed",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          token: {
            type: "string",
            nullable: true,
            description: "New session token if other sessions were revoked"
          },
          user: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "The unique identifier of the user"
              },
              email: {
                type: "string",
                format: "email",
                description: "The email address of the user"
              },
              name: {
                type: "string",
                description: "The name of the user"
              },
              image: {
                type: "string",
                format: "uri",
                nullable: true,
                description: "The profile image URL of the user"
              },
              emailVerified: {
                type: "boolean",
                description: "Whether the email has been verified"
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "When the user was created"
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                description: "When the user was last updated"
              }
            },
            required: [
              "id",
              "email",
              "name",
              "emailVerified",
              "createdAt",
              "updatedAt"
            ]
          }
        },
        required: ["user"]
      } } }
    } }
  } }
}, async (ctx) => {
  const { newPassword, currentPassword, revokeOtherSessions: revokeOtherSessions2 } = ctx.body;
  const session = ctx.context.session;
  assertPasswordNotTooShort(ctx, newPassword);
  assertPasswordNotTooLong(ctx, newPassword);
  assertPasswordNotTooLong(ctx, currentPassword);
  const account = await ctx.context.internalAdapter.findCredentialAccount(session.user.id);
  if (!account || !account.password) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND);
  const passwordHash = await ctx.context.password.hash(newPassword);
  if (!await ctx.context.password.verify({
    hash: account.password,
    password: currentPassword
  })) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
  const newSession = await runWithTransaction(ctx.context.adapter, async () => {
    if (revokeOtherSessions2) await ctx.context.internalAdapter.deleteUserSessions(session.user.id);
    await ctx.context.internalAdapter.updateAccount(account.id, { password: passwordHash });
    if (!revokeOtherSessions2) return null;
    const created = await ctx.context.internalAdapter.createSession(session.user.id, void 0, void 0, void 0, { deferSecondaryStorageWrites: true });
    if (!created) throw APIError2.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_GET_SESSION);
    return created;
  });
  let token = null;
  if (newSession) {
    await setSessionCookie(ctx, {
      session: newSession,
      user: session.user
    });
    token = newSession.token;
  }
  return ctx.json({
    token,
    user: parseUserOutput(ctx.context.options, session.user)
  });
});
var setPassword = createAuthEndpoint.serverOnly({
  method: "POST",
  body: object({
    /**
    * The new password to set
    */
    newPassword: string().meta({ description: "The new password to set is required" })
  }),
  use: [sensitiveSessionMiddleware]
}, async (ctx) => {
  const { newPassword } = ctx.body;
  const session = ctx.context.session;
  assertPasswordNotTooShort(ctx, newPassword);
  assertPasswordNotTooLong(ctx, newPassword);
  const account = await ctx.context.internalAdapter.findCredentialAccount(session.user.id);
  const passwordHash = await ctx.context.password.hash(newPassword);
  if (!account) {
    await ctx.context.internalAdapter.linkAccount({
      userId: session.user.id,
      providerId: "credential",
      accountId: session.user.id,
      password: passwordHash
    });
    return ctx.json({ status: true });
  }
  if (!account.password) {
    await ctx.context.internalAdapter.updateAccount(account.id, { password: passwordHash });
    return ctx.json({ status: true });
  }
  throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_ALREADY_SET);
});
async function deleteCurrentUser(ctx, user) {
  const beforeDelete = ctx.context.options.user?.deleteUser?.beforeDelete;
  if (beforeDelete) await beforeDelete(user, ctx.request);
  await ctx.context.internalAdapter.deleteUser(user.id);
  await ctx.context.internalAdapter.deleteUserSessions(user.id);
  deleteSessionCookie(ctx);
  const afterDelete = ctx.context.options.user?.deleteUser?.afterDelete;
  if (afterDelete) await afterDelete(user, ctx.request);
}
async function deleteUserWithToken(ctx, user, token) {
  const verification = await ctx.context.internalAdapter.consumeVerificationValue(`delete-account-${token}`);
  if (!verification || verification.value !== user.id) throw APIError2.from("NOT_FOUND", BASE_ERROR_CODES.INVALID_TOKEN);
  await deleteCurrentUser(ctx, user);
}
var deleteUser = createAuthEndpoint("/delete-user", {
  method: "POST",
  use: [sensitiveSessionMiddleware],
  body: object({
    /**
    * The callback URL to redirect to after the user is deleted
    * this is only used on delete user callback
    */
    callbackURL: string().meta({ description: "The callback URL to redirect to after the user is deleted" }).optional(),
    /**
    * The password of the user. If the password isn't provided, session freshness
    * will be checked.
    */
    password: string().meta({ description: "The password of the user is required to delete the user" }).optional(),
    /**
    * The token to delete the user. If the token is provided, the user will be deleted
    */
    token: string().meta({ description: "The token to delete the user is required" }).optional()
  }),
  metadata: { openapi: {
    operationId: "deleteUser",
    description: "Delete the user",
    requestBody: { content: { "application/json": { schema: {
      type: "object",
      properties: {
        callbackURL: {
          type: "string",
          description: "The callback URL to redirect to after the user is deleted"
        },
        password: {
          type: "string",
          description: "The user's password. Required if session is not fresh"
        },
        token: {
          type: "string",
          description: "The deletion verification token"
        }
      }
    } } } },
    responses: { "200": {
      description: "User deletion processed successfully",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            description: "Indicates if the operation was successful"
          },
          message: {
            type: "string",
            enum: ["User deleted", "Verification email sent"],
            description: "Status message of the deletion process"
          }
        },
        required: ["success", "message"]
      } } }
    } }
  } }
}, async (ctx) => {
  if (!ctx.context.options.user?.deleteUser?.enabled) {
    ctx.context.logger.error("Delete user is disabled. Enable it in the options");
    throw APIError2.fromStatus("NOT_FOUND");
  }
  const session = ctx.context.session;
  if (ctx.body.password) {
    assertPasswordNotTooLong(ctx, ctx.body.password);
    const account = await ctx.context.internalAdapter.findCredentialAccount(session.user.id);
    if (!account || !account.password) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND);
    if (!await ctx.context.password.verify({
      hash: account.password,
      password: ctx.body.password
    })) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
  }
  if (ctx.body.token) {
    await deleteUserWithToken(ctx, session.user, ctx.body.token);
    return ctx.json({
      success: true,
      message: "User deleted"
    });
  }
  if (ctx.context.options.user.deleteUser?.sendDeleteAccountVerification) {
    const token = generateRandomString(32, "0-9", "a-z");
    await ctx.context.internalAdapter.createVerificationValue({
      value: session.user.id,
      identifier: `delete-account-${token}`,
      expiresAt: new Date(Date.now() + (ctx.context.options.user.deleteUser?.deleteTokenExpiresIn || 86400) * 1e3)
    });
    const url = `${ctx.context.baseURL}/delete-user/callback?token=${token}&callbackURL=${encodeURIComponent(ctx.body.callbackURL || "/")}`;
    await ctx.context.runInBackgroundOrAwait(ctx.context.options.user.deleteUser.sendDeleteAccountVerification({
      user: session.user,
      url,
      token
    }, ctx.request));
    return ctx.json({
      success: true,
      message: "Verification email sent"
    });
  }
  if (!ctx.body.password && ctx.context.sessionConfig.freshAge !== 0) {
    const createdAt = new Date(session.session.createdAt).getTime();
    const freshAge = ctx.context.sessionConfig.freshAge * 1e3;
    if (Date.now() - createdAt >= freshAge) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.SESSION_EXPIRED);
  }
  await deleteCurrentUser(ctx, session.user);
  return ctx.json({
    success: true,
    message: "User deleted"
  });
});
var deleteUserCallback = createAuthEndpoint("/delete-user/callback", {
  method: "GET",
  query: object({
    token: string().meta({ description: "The token to verify the deletion request" }),
    callbackURL: string().meta({ description: "The URL to redirect to after deletion" }).optional()
  }),
  use: [originCheck((ctx) => ctx.query.callbackURL)],
  metadata: { openapi: {
    description: "Callback to complete user deletion with verification token",
    responses: { "200": {
      description: "User successfully deleted",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            description: "Indicates if the deletion was successful"
          },
          message: {
            type: "string",
            enum: ["User deleted"],
            description: "Confirmation message"
          }
        },
        required: ["success", "message"]
      } } }
    } }
  } }
}, async (ctx) => {
  if (!ctx.context.options.user?.deleteUser?.enabled) {
    ctx.context.logger.error("Delete user is disabled. Enable it in the options");
    throw APIError2.from("NOT_FOUND", {
      message: "Not found",
      code: "NOT_FOUND"
    });
  }
  const session = await getSessionFromCtx(ctx, { disableCookieCache: isStateful(ctx) });
  if (!session) throw APIError2.from("NOT_FOUND", BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO);
  await deleteUserWithToken(ctx, session.user, ctx.query.token);
  if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL || "/");
  return ctx.json({
    success: true,
    message: "User deleted"
  });
});
var changeEmail = createAuthEndpoint("/change-email", {
  method: "POST",
  body: object({
    newEmail: email().meta({ description: "The new email address to set must be a valid email address" }),
    callbackURL: string().meta({ description: "The URL to redirect to after email verification" }).optional()
  }),
  use: [sensitiveSessionMiddleware],
  metadata: { openapi: {
    operationId: "changeEmail",
    responses: { "200": {
      description: "Email change request processed successfully",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          user: {
            type: "object",
            $ref: "#/components/schemas/User"
          },
          status: {
            type: "boolean",
            description: "Indicates if the request was successful"
          },
          message: {
            type: "string",
            enum: ["Email updated", "Verification email sent"],
            description: "Status message of the email change process",
            nullable: true
          }
        },
        required: ["status"]
      } } }
    } }
  } }
}, async (ctx) => {
  if (!ctx.context.options.user?.changeEmail?.enabled) {
    ctx.context.logger.error("Change email is disabled.");
    throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.CHANGE_EMAIL_DISABLED);
  }
  const newEmail = ctx.body.newEmail.toLowerCase();
  if (newEmail === ctx.context.session.user.email) {
    ctx.context.logger.warn("Email is the same");
    throw APIError2.fromStatus("BAD_REQUEST", { message: "Email is the same" });
  }
  const canUpdateWithoutVerification = ctx.context.session.user.emailVerified !== true && ctx.context.options.user.changeEmail.updateEmailWithoutVerification;
  const canSendVerification = ctx.context.options.emailVerification?.sendVerificationEmail;
  const canSendConfirmation = canSendVerification && ctx.context.session.user.emailVerified && ctx.context.options.user.changeEmail.sendChangeEmailConfirmation;
  if (!canUpdateWithoutVerification && !canSendConfirmation && !canSendVerification) {
    ctx.context.logger.error("Verification email isn't enabled.");
    throw APIError2.fromStatus("BAD_REQUEST", { message: "Verification email isn't enabled" });
  }
  if (await ctx.context.internalAdapter.findUserByEmail(newEmail)) {
    await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, ctx.context.options.emailVerification?.expiresIn, { userId: ctx.context.session.user.id });
    ctx.context.logger.info("Change email attempt for existing email");
    return ctx.json({ status: true });
  }
  if (canUpdateWithoutVerification) {
    await ctx.context.internalAdapter.updateUser(ctx.context.session.user.id, { email: newEmail });
    await setSessionCookie(ctx, {
      session: ctx.context.session.session,
      user: {
        ...ctx.context.session.user,
        email: newEmail
      }
    });
    if (canSendVerification) {
      const token2 = await createEmailVerificationToken(ctx.context.secret, newEmail, void 0, ctx.context.options.emailVerification?.expiresIn, { userId: ctx.context.session.user.id });
      const url2 = `${ctx.context.baseURL}/verify-email?token=${token2}&callbackURL=${encodeURIComponent(ctx.body.callbackURL || "/")}`;
      await ctx.context.runInBackgroundOrAwait(canSendVerification({
        user: {
          ...ctx.context.session.user,
          email: newEmail
        },
        url: url2,
        token: token2
      }, ctx.request));
    }
    return ctx.json({ status: true });
  }
  if (canSendConfirmation) {
    const token2 = await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, ctx.context.options.emailVerification?.expiresIn, {
      requestType: "change-email-confirmation",
      userId: ctx.context.session.user.id
    });
    const url2 = `${ctx.context.baseURL}/verify-email?token=${token2}&callbackURL=${encodeURIComponent(ctx.body.callbackURL || "/")}`;
    await ctx.context.runInBackgroundOrAwait(canSendConfirmation({
      user: ctx.context.session.user,
      newEmail,
      url: url2,
      token: token2
    }, ctx.request));
    return ctx.json({ status: true });
  }
  if (!canSendVerification) {
    ctx.context.logger.error("Verification email isn't enabled.");
    throw APIError2.fromStatus("BAD_REQUEST", { message: "Verification email isn't enabled" });
  }
  const token = await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, ctx.context.options.emailVerification?.expiresIn, {
    requestType: "change-email-verification",
    userId: ctx.context.session.user.id
  });
  const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${encodeURIComponent(ctx.body.callbackURL || "/")}`;
  await ctx.context.runInBackgroundOrAwait(canSendVerification({
    user: {
      ...ctx.context.session.user,
      email: newEmail
    },
    url,
    token
  }, ctx.request));
  return ctx.json({ status: true });
});

// node_modules/better-auth/dist/api/routes/error.mjs
function sanitize(input) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/&(?!amp;|lt;|gt;|quot;|#39;|#x[0-9a-fA-F]+;|#[0-9]+;)/g, "&amp;");
}
var html = (options, code = "Unknown", description = null) => {
  const custom = options.onAPIError?.customizeDefaultErrorPage;
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Error</title>
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        font-family: ${custom?.font?.defaultFamily || "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"};
        background: ${custom?.colors?.background || "var(--background)"};
        color: var(--foreground);
        margin: 0;
      }
      :root,
      :host {
        --spacing: 0.25rem;
        --container-md: 28rem;
        --text-sm: ${custom?.size?.textSm || "0.875rem"};
        --text-sm--line-height: calc(1.25 / 0.875);
        --text-2xl: ${custom?.size?.text2xl || "1.5rem"};
        --text-2xl--line-height: calc(2 / 1.5);
        --text-4xl: ${custom?.size?.text4xl || "2.25rem"};
        --text-4xl--line-height: calc(2.5 / 2.25);
        --text-6xl: ${custom?.size?.text6xl || "3rem"};
        --text-6xl--line-height: 1;
        --font-weight-medium: 500;
        --font-weight-semibold: 600;
        --font-weight-bold: 700;
        --default-transition-duration: 150ms;
        --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        --radius: ${custom?.size?.radiusSm || "0.625rem"};
        --default-mono-font-family: ${custom?.font?.monoFamily || "var(--font-geist-mono)"};
        --primary: ${custom?.colors?.primary || "black"};
        --primary-foreground: ${custom?.colors?.primaryForeground || "white"};
        --background: ${custom?.colors?.background || "white"};
        --foreground: ${custom?.colors?.foreground || "oklch(0.271 0 0)"};
        --border: ${custom?.colors?.border || "oklch(0.89 0 0)"};
        --destructive: ${custom?.colors?.destructive || "oklch(0.55 0.15 25.723)"};
        --muted-foreground: ${custom?.colors?.mutedForeground || "oklch(0.545 0 0)"};
        --corner-border: ${custom?.colors?.cornerBorder || "#404040"};
      }

      button, .btn {
        cursor: pointer;
        background: none;
        border: none;
        color: inherit;
        font: inherit;
        transition: all var(--default-transition-duration)
          var(--default-transition-timing-function);
      }
      button:hover, .btn:hover {
        opacity: 0.8;
      }

      @media (prefers-color-scheme: dark) {
        :root,
        :host {
          --primary: ${custom?.colors?.primary || "white"};
          --primary-foreground: ${custom?.colors?.primaryForeground || "black"};
          --background: ${custom?.colors?.background || "oklch(0.15 0 0)"};
          --foreground: ${custom?.colors?.foreground || "oklch(0.98 0 0)"};
          --border: ${custom?.colors?.border || "oklch(0.27 0 0)"};
          --destructive: ${custom?.colors?.destructive || "oklch(0.65 0.15 25.723)"};
          --muted-foreground: ${custom?.colors?.mutedForeground || "oklch(0.65 0 0)"};
          --corner-border: ${custom?.colors?.cornerBorder || "#a0a0a0"};
        }
      }
      @media (max-width: 640px) {
        :root, :host {
          --text-6xl: 2.5rem;
          --text-2xl: 1.25rem;
          --text-sm: 0.8125rem;
        }
      }
      @media (max-width: 480px) {
        :root, :host {
          --text-6xl: 2rem;
          --text-2xl: 1.125rem;
        }
      }
    </style>
  </head>
  <body style="width: 100vw; min-height: 100vh; overflow-x: hidden; overflow-y: auto;">
    <div
        style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            position: relative;
            width: 100%;
            min-height: 100vh;
            padding: 1rem;
        "
        >
${custom?.disableBackgroundGrid ? "" : `
      <div
        style="
          position: absolute;
          inset: 0;
          background-image: linear-gradient(to right, ${custom?.colors?.gridColor || "var(--border)"} 1px, transparent 1px),
            linear-gradient(to bottom, ${custom?.colors?.gridColor || "var(--border)"} 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.6;
          pointer-events: none;
          width: 100vw;
          height: 100vh;
        "
      ></div>
      <div
        style="
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${custom?.colors?.background || "var(--background)"};
          mask-image: radial-gradient(ellipse at center, transparent 20%, black);
          -webkit-mask-image: radial-gradient(ellipse at center, transparent 20%, black);
          pointer-events: none;
        "
      ></div>
`}

<div
  style="
    position: relative;
    z-index: 10;
    border: 2px solid var(--border);
    background: ${custom?.colors?.cardBackground || "var(--background)"};
    padding: 1.5rem;
    max-width: 42rem;
    width: 100%;
  "
>
    ${custom?.disableCornerDecorations ? "" : `
        <!-- Corner decorations -->
        <div
          style="
            position: absolute;
            top: -2px;
            left: -2px;
            width: 2rem;
            height: 2rem;
            border-top: 4px solid var(--corner-border);
            border-left: 4px solid var(--corner-border);
          "
        ></div>
        <div
          style="
            position: absolute;
            top: -2px;
            right: -2px;
            width: 2rem;
            height: 2rem;
            border-top: 4px solid var(--corner-border);
            border-right: 4px solid var(--corner-border);
          "
        ></div>
  
        <div
          style="
            position: absolute;
            bottom: -2px;
            left: -2px;
            width: 2rem;
            height: 2rem;
            border-bottom: 4px solid var(--corner-border);
            border-left: 4px solid var(--corner-border);
          "
        ></div>
        <div
          style="
            position: absolute;
            bottom: -2px;
            right: -2px;
            width: 2rem;
            height: 2rem;
            border-bottom: 4px solid var(--corner-border);
            border-right: 4px solid var(--corner-border);
          "
        ></div>`}

        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="margin-bottom: 1.5rem;">
            <div
              style="
                display: inline-block;
                border: 2px solid ${custom?.disableTitleBorder ? "transparent" : custom?.colors?.titleBorder || "var(--destructive)"};
                padding: 0.375rem 1rem;
              "
            >
              <h1
                style="
                  font-size: var(--text-6xl);
                  font-weight: var(--font-weight-semibold);
                  color: ${custom?.colors?.titleColor || "var(--foreground)"};
                  letter-spacing: -0.02em;
                  margin: 0;
                "
              >
                ERROR
              </h1>
            </div>
            <div
              style="
                height: 2px;
                background-color: var(--border);
                width: calc(100% + 3rem);
                margin-left: -1.5rem;
                margin-top: 1.5rem;
              "
            ></div>
          </div>

          <h2
            style="
              font-size: var(--text-2xl);
              font-weight: var(--font-weight-semibold);
              color: var(--foreground);
              margin: 0 0 1rem;
            "
          >
            Something went wrong
          </h2>

          <div
            style="
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                border: 2px solid var(--border);
                background-color: var(--muted);
                padding: 0.375rem 0.75rem;
                margin: 0 0 1rem;
                flex-wrap: wrap;
                justify-content: center;
            "
            >
            <span
                style="
                font-size: 0.75rem;
                color: var(--muted-foreground);
                font-weight: var(--font-weight-semibold);
                "
            >
                CODE:
            </span>
            <span
                style="
                font-size: var(--text-sm);
                font-family: var(--default-mono-font-family, monospace);
                color: var(--foreground);
                word-break: break-all;
                "
            >
                ${sanitize(code)}
            </span>
            </div>

          <p
            style="
              color: var(--muted-foreground);
              max-width: 28rem;
              margin: 0 auto;
              font-size: var(--text-sm);
              line-height: 1.5;
              text-wrap: pretty;
            "
          >
            ${!description ? `We encountered an unexpected error. Please try again or return to the home page. If you're a developer, you can find <a href='https://better-auth.com/docs/reference/errors/${encodeURIComponent(code)}' target='_blank' rel="noopener noreferrer" style='color: var(--foreground); text-decoration: underline;'>more information about the error</a>.` : description}
          </p>
        </div>

        <div
          style="
            display: flex;
            gap: 0.75rem;
            margin-top: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
          "
        >
          <a
            href="/"
            style="
              text-decoration: none;
            "
          >
            <div
              style="
                border: 2px solid var(--border);
                background: var(--primary);
                color: var(--primary-foreground);
                padding: 0.5rem 1rem;
                border-radius: 0;
                white-space: nowrap;
              "
              class="btn"
            >
              Go Home
            </div>
          </a>
          <a
            href="https://better-auth.com/docs/reference/errors/${encodeURIComponent(code)}?askai=${encodeURIComponent(`What does the error code ${code} mean?`)}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              text-decoration: none;
            "
          >
            <div
              style="
                border: 2px solid var(--border);
                background: transparent;
                color: var(--foreground);
                padding: 0.5rem 1rem;
                border-radius: 0;
                white-space: nowrap;
              "
              class="btn"
            >
              Ask AI
            </div>
          </a>
        </div>
      </div>
    </div>
  </body>
</html>`;
};
var error = createAuthEndpoint("/error", {
  method: "GET",
  metadata: {
    ...HIDE_METADATA,
    openapi: {
      description: "Displays an error page",
      responses: { "200": {
        description: "Success",
        content: { "text/html": { schema: {
          type: "string",
          description: "The HTML content of the error page"
        } } }
      } }
    }
  }
}, async (c) => {
  const url = new URL(c.request?.url || "");
  const unsanitizedCode = url.searchParams.get("error") || "UNKNOWN";
  const unsanitizedDescription = url.searchParams.get("error_description") || null;
  const safeCode = /^[\'A-Za-z0-9_-]+$/.test(unsanitizedCode || "") ? unsanitizedCode : "UNKNOWN";
  const safeDescription = unsanitizedDescription ? sanitize(unsanitizedDescription) : null;
  const params = new URLSearchParams();
  params.set("error", safeCode);
  if (unsanitizedDescription) params.set("error_description", unsanitizedDescription);
  const options = c.context.options;
  const errorURL = options.onAPIError?.errorURL;
  if (errorURL) {
    const redirectURL = appendQueryParams(errorURL, params);
    return new Response(null, {
      status: 302,
      headers: { Location: redirectURL }
    });
  }
  if (isProduction && !options.onAPIError?.customizeDefaultErrorPage) return new Response(null, {
    status: 302,
    headers: { Location: `/?${params.toString()}` }
  });
  return new Response(html(c.context.options, safeCode, safeDescription), { headers: { "Content-Type": "text/html" } });
});

// node_modules/better-auth/dist/api/routes/ok.mjs
var ok = createAuthEndpoint("/ok", {
  method: "GET",
  metadata: {
    ...HIDE_METADATA,
    openapi: {
      description: "Check if the API is working",
      responses: { "200": {
        description: "API is working",
        content: { "application/json": { schema: {
          type: "object",
          properties: { ok: {
            type: "boolean",
            description: "Indicates if the API is working"
          } },
          required: ["ok"]
        } } }
      } }
    }
  }
}, async (ctx) => {
  return ctx.json({ ok: true });
});

// node_modules/better-auth/dist/api/routes/password.mjs
function redirectError(ctx, callbackURL, query) {
  const url = callbackURL ? new URL(callbackURL, ctx.baseURL) : new URL(`${ctx.baseURL}/error`);
  if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.href;
}
function redirectCallback(ctx, callbackURL, query) {
  const url = new URL(callbackURL, ctx.baseURL);
  if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.href;
}
var requestPasswordReset = createAuthEndpoint("/request-password-reset", {
  method: "POST",
  body: object({
    /**
    * The email address of the user to send a password reset email to.
    */
    email: email().meta({ description: "The email address of the user to send a password reset email to" }),
    /**
    * The URL to redirect the user to reset their password.
    * If the token isn't valid or expired, it'll be redirected with a query parameter `?
    * error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?
    * token=VALID_TOKEN
    */
    redirectTo: string().meta({ description: "The URL to redirect the user to reset their password. If the token isn't valid or expired, it'll be redirected with a query parameter `?error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?token=VALID_TOKEN" }).optional()
  }),
  metadata: { openapi: {
    operationId: "requestPasswordReset",
    description: "Send a password reset email to the user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          status: { type: "boolean" },
          message: { type: "string" }
        }
      } } }
    } }
  } },
  use: [originCheck((ctx) => ctx.body.redirectTo)]
}, async (ctx) => {
  if (!ctx.context.options.emailAndPassword?.sendResetPassword) {
    ctx.context.logger.error("Reset password isn't enabled.Please pass an emailAndPassword.sendResetPassword function in your auth config!");
    throw APIError2.from("BAD_REQUEST", {
      message: "Reset password isn't enabled",
      code: "RESET_PASSWORD_DISABLED"
    });
  }
  const { email: email2, redirectTo } = ctx.body;
  const user = await ctx.context.internalAdapter.findUserByEmail(email2, { includeAccounts: true });
  if (!user) {
    generateId(24);
    await ctx.context.internalAdapter.findVerificationValue("dummy-verification-token");
    ctx.context.logger.warn("Reset Password: User not found");
    return ctx.json({
      status: true,
      message: "If this email exists in our system, check your email for the reset link"
    });
  }
  const expiresAt = getDate(ctx.context.options.emailAndPassword.resetPasswordTokenExpiresIn || 3600, "sec");
  const verificationToken = generateId(24);
  await ctx.context.internalAdapter.createVerificationValue({
    value: user.user.id,
    identifier: `reset-password:${verificationToken}`,
    expiresAt
  });
  const callbackURL = redirectTo ? encodeURIComponent(redirectTo) : "";
  const url = `${ctx.context.baseURL}/reset-password/${verificationToken}?callbackURL=${callbackURL}`;
  await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailAndPassword.sendResetPassword({
    user: user.user,
    url,
    token: verificationToken
  }, ctx.request));
  return ctx.json({
    status: true,
    message: "If this email exists in our system, check your email for the reset link"
  });
});
var requestPasswordResetCallback = createAuthEndpoint("/reset-password/:token", {
  method: "GET",
  operationId: "resetPasswordCallback",
  query: object({ callbackURL: string().meta({ description: "The URL to redirect the user to reset their password" }) }),
  use: [originCheck((ctx) => ctx.query.callbackURL)],
  metadata: { openapi: {
    operationId: "resetPasswordCallback",
    description: "Redirects the user to the callback URL with the token",
    parameters: [{
      name: "token",
      in: "path",
      required: true,
      description: "The token to reset the password",
      schema: { type: "string" }
    }, {
      name: "callbackURL",
      in: "query",
      required: true,
      description: "The URL to redirect the user to reset their password",
      schema: { type: "string" }
    }],
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { token: { type: "string" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const { token } = ctx.params;
  const { callbackURL } = ctx.query;
  if (!token || !callbackURL) throw ctx.redirect(redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" }));
  const verification = await ctx.context.internalAdapter.findVerificationValue(`reset-password:${token}`);
  if (!verification || verification.expiresAt < /* @__PURE__ */ new Date()) throw ctx.redirect(redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" }));
  throw ctx.redirect(redirectCallback(ctx.context, callbackURL, { token }));
});
var resetPassword = createAuthEndpoint("/reset-password", {
  method: "POST",
  operationId: "resetPassword",
  query: object({ token: string().optional() }).optional(),
  body: object({
    newPassword: string().meta({ description: "The new password to set" }),
    token: string().meta({ description: "The token to reset the password" }).optional()
  }),
  metadata: { openapi: {
    operationId: "resetPassword",
    description: "Reset the password for a user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const token = ctx.body.token || ctx.query?.token;
  if (!token) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_TOKEN);
  const { newPassword } = ctx.body;
  assertPasswordNotTooShort(ctx, newPassword);
  assertPasswordNotTooLong(ctx, newPassword);
  const id = `reset-password:${token}`;
  const verification = await ctx.context.internalAdapter.findVerificationValue(id);
  if (!verification || verification.expiresAt < /* @__PURE__ */ new Date()) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_TOKEN);
  const userId = verification.value;
  const user = await ctx.context.internalAdapter.findUserById(userId);
  if (!user) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.USER_NOT_FOUND);
  const hashedPassword = await ctx.context.password.hash(newPassword);
  await resetCredentialPassword(ctx, userId, hashedPassword, async () => {
    if (!await ctx.context.internalAdapter.consumeVerificationValue(id)) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_TOKEN);
  });
  if (ctx.context.options.emailAndPassword?.onPasswordReset) await ctx.context.options.emailAndPassword.onPasswordReset({ user }, ctx.request);
  return ctx.json({ status: true });
});
var verifyPassword2 = createAuthEndpoint("/verify-password", {
  method: "POST",
  body: object({
    /**
    * The password to verify
    */
    password: string().meta({ description: "The password to verify" })
  }),
  metadata: {
    scope: "server",
    openapi: {
      operationId: "verifyPassword",
      description: "Verify the current user's password",
      responses: { "200": {
        description: "Success",
        content: { "application/json": { schema: {
          type: "object",
          properties: { status: { type: "boolean" } }
        } } }
      } }
    }
  },
  use: [sensitiveSessionMiddleware]
}, async (ctx) => {
  const { password } = ctx.body;
  const session = ctx.context.session;
  if (!await validatePassword(ctx, {
    password,
    userId: session.user.id
  })) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
  return ctx.json({ status: true });
});

// node_modules/better-auth/dist/api/routes/sign-in.mjs
var socialSignInBodySchema = object({
  /**
  * Callback URL to redirect to after the user
  * has signed in.
  */
  callbackURL: string().meta({ description: "Callback URL to redirect to after the user has signed in" }).optional(),
  /**
  * callback url to redirect if the user is newly registered.
  *
  * useful if you have different routes for existing users and new users
  */
  newUserCallbackURL: string().optional(),
  /**
  * Callback url to redirect to if an error happens
  *
  * If it's initiated from the client sdk this defaults to
  * the current url.
  */
  errorCallbackURL: string().meta({ description: "Callback URL to redirect to if an error happens" }).optional(),
  /**
  * OAuth2 provider to use`
  */
  provider: SocialProviderListEnum,
  /**
  * Disable automatic redirection to the provider
  *
  * This is useful if you want to handle the redirection
  * yourself like in a popup or a different tab.
  */
  disableRedirect: boolean().meta({ description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself" }).optional(),
  /**
  * ID token from the provider
  *
  * This is used to sign in the user
  * if the user is already signed in with the
  * provider in the frontend.
  *
  * Only applicable if the provider supports
  * it. Currently only `apple` and `google` is
  * supported out of the box.
  */
  idToken: optional(object({
    /**
    * ID token from the provider
    */
    token: string().meta({ description: "ID token from the provider" }),
    /**
    * The nonce used to generate the token
    */
    nonce: string().meta({ description: "Nonce used to generate the token" }).optional(),
    /**
    * Access token from the provider
    */
    accessToken: string().meta({ description: "Access token from the provider" }).optional(),
    /**
    * Refresh token from the provider
    */
    refreshToken: string().meta({ description: "Refresh token from the provider" }).optional(),
    /**
    * Expiry date of the token
    */
    expiresAt: number().meta({ description: "Expiry date of the token" }).optional(),
    /**
    * The user object from the provider.
    * This is only available for some providers like Apple.
    */
    user: object({
      name: object({
        firstName: string().optional(),
        lastName: string().optional()
      }).optional(),
      email: string().optional()
    }).meta({ description: "The user object from the provider. Only available for some providers like Apple." }).optional()
  })),
  scopes: array(string()).meta({ description: "Array of scopes to request from the provider. This will override the default scopes passed." }).optional(),
  /**
  * Explicitly request sign-up
  *
  * Should be used to allow sign up when
  * disableImplicitSignUp for this provider is
  * true
  */
  requestSignUp: boolean().meta({ description: "Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider" }).optional(),
  /**
  * The login hint to use for the authorization code request
  */
  loginHint: string().meta({ description: "The login hint to use for the authorization code request" }).optional(),
  /**
  * Extra query parameters to append to the provider authorization URL.
  * Reserved OAuth keys (state, client_id, redirect_uri, response_type,
  * code_challenge, code_challenge_method, nonce, scope) are rejected.
  */
  additionalParams: additionalAuthorizationParamsSchema,
  /**
  * Additional data to be passed through the OAuth flow
  */
  additionalData: record(string(), any()).optional().meta({ description: "Additional data to be passed through the OAuth flow" })
});
var signInSocial = () => createAuthEndpoint("/sign-in/social", {
  method: "POST",
  operationId: "socialSignIn",
  body: socialSignInBodySchema,
  metadata: {
    $Infer: {
      body: {},
      returned: {}
    },
    openapi: {
      description: "Sign in with a social provider",
      operationId: "socialSignIn",
      responses: { "200": {
        description: "Success - Returns session details (idToken branch) or an authorize URL (redirect branch)",
        content: { "application/json": { schema: {
          type: "object",
          description: "Returns session details when idToken is provided, or an authorize URL otherwise",
          properties: {
            token: { type: "string" },
            user: {
              type: "object",
              $ref: "#/components/schemas/User"
            },
            url: { type: "string" },
            redirect: { type: "boolean" }
          },
          required: ["redirect"]
        } } }
      } }
    }
  }
}, async (c) => {
  const provider = await getAwaitableValue(c.context.socialProviders, { value: c.body.provider });
  if (!provider) {
    c.context.logger.error("Provider not found. Make sure to add the provider in your auth config", { provider: c.body.provider });
    throw APIError2.from("NOT_FOUND", BASE_ERROR_CODES.PROVIDER_NOT_FOUND);
  }
  if (c.body.idToken) {
    if (!supportsIdTokenSignIn(provider)) {
      c.context.logger.error("Provider does not support id token verification", { provider: c.body.provider });
      throw APIError2.from("NOT_FOUND", BASE_ERROR_CODES.ID_TOKEN_NOT_SUPPORTED);
    }
    const { token, nonce } = c.body.idToken;
    if (!await verifyProviderIdToken(provider, token, nonce, c)) {
      c.context.logger.warn("Invalid id token", { provider: c.body.provider });
      throw APIError2.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_TOKEN);
    }
    const oauthTokens = {
      idToken: token,
      accessToken: c.body.idToken.accessToken,
      refreshToken: c.body.idToken.refreshToken,
      user: c.body.idToken.user
    };
    const userInfo = provider.getUserInfoFromIdToken ? await provider.getUserInfoFromIdToken(token) : await provider.getUserInfo(oauthTokens);
    if (!userInfo || !userInfo?.user) {
      c.context.logger.error("Failed to get user info", { provider: c.body.provider });
      throw APIError2.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO);
    }
    if (!userInfo.user.email) {
      c.context.logger.error(missingEmailLogMessage(c.body.provider, { source: "id_token" }), { provider: c.body.provider });
      throw APIError2.from("UNAUTHORIZED", BASE_ERROR_CODES.USER_EMAIL_NOT_FOUND);
    }
    const accountKey = await resolveOAuthAccountKeyForAPI(provider, oauthTokens, userInfo.data);
    const providerProfile = toOAuthProfileRecord(userInfo.data);
    const accountFields = await resolveOAuthAccountFields(c, provider, oauthTokens, userInfo.user);
    const data = await handleOAuthUserInfo(c, {
      userInfo: {
        ...userInfo.user,
        email: userInfo.user.email,
        id: accountKey.accountId,
        name: userInfo.user.name || "",
        image: userInfo.user.image,
        emailVerified: userInfo.user.emailVerified || false
      },
      account: {
        ...accountKey,
        accessToken: c.body.idToken.accessToken,
        idToken: token
      },
      accountFields,
      callbackURL: c.body.callbackURL,
      disableSignUp: provider.disableImplicitSignUp && !c.body.requestSignUp || provider.options?.disableSignUp || provider.disableSignUp,
      source: {
        method: "oauth",
        oauth: {
          providerId: provider.id,
          profile: providerProfile
        }
      }
    });
    if (data.error) {
      if (data.error === OAUTH_CALLBACK_ERROR_CODES.EMAIL_NOT_VERIFIED) throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.EMAIL_NOT_VERIFIED);
      throw APIError2.from("UNAUTHORIZED", {
        message: data.error,
        code: "OAUTH_LINK_ERROR"
      });
    }
    await setSessionCookie(c, data.data);
    return c.json({
      redirect: false,
      token: data.data.session.token,
      url: void 0,
      user: parseUserOutput(c.context.options, data.data.user)
    });
  }
  const idTokenNonce = generateIdTokenNonce(provider);
  const { codeVerifier, state } = await generateState(c, {
    additionalData: c.body.additionalData,
    idTokenNonce
  });
  const url = await provider.createAuthorizationURL({
    state,
    codeVerifier,
    idTokenNonce,
    redirectURI: `${c.context.baseURL}${getOAuthCallbackPath(provider)}`,
    scopes: c.body.scopes,
    loginHint: c.body.loginHint,
    additionalParams: c.body.additionalParams
  });
  if (!c.body.disableRedirect) c.setHeader("Location", url.toString());
  return c.json({
    url: url.toString(),
    redirect: !c.body.disableRedirect
  });
});
var signInEmail = () => createAuthEndpoint("/sign-in/email", {
  method: "POST",
  operationId: "signInEmail",
  use: [formCsrfMiddleware],
  cloneRequest: true,
  body: object({
    /**
    * Email of the user
    */
    email: string().meta({ description: "Email of the user" }),
    /**
    * Password of the user
    */
    password: string().meta({ description: "Password of the user" }),
    /**
    * Callback URL to use as a redirect for email
    * verification and for possible redirects
    */
    callbackURL: string().meta({ description: "Callback URL to use as a redirect for email verification" }).optional(),
    /**
    * If this is false, the session will not be remembered
    * @default true
    */
    rememberMe: boolean().meta({ description: "If this is false, the session will not be remembered. Default is `true`." }).default(true).optional()
  }),
  metadata: {
    allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"],
    $Infer: {
      body: {},
      returned: {}
    },
    openapi: {
      operationId: "signInEmail",
      description: "Sign in with email and password",
      responses: { "200": {
        description: "Success - Returns either session details or redirect URL",
        content: { "application/json": { schema: {
          type: "object",
          description: "Session response when idToken is provided",
          properties: {
            redirect: {
              type: "boolean",
              enum: [false]
            },
            token: {
              type: "string",
              description: "Session token"
            },
            url: {
              type: "string",
              nullable: true
            },
            user: {
              type: "object",
              $ref: "#/components/schemas/User"
            }
          },
          required: [
            "redirect",
            "token",
            "user"
          ]
        } } }
      } }
    }
  }
}, async (ctx) => {
  if (!ctx.context.options?.emailAndPassword?.enabled) {
    ctx.context.logger.error("Email and password is not enabled. Make sure to enable it in the options on you `auth.ts` file. Check `https://better-auth.com/docs/authentication/email-password` for more!");
    throw APIError2.from("BAD_REQUEST", {
      code: "EMAIL_PASSWORD_DISABLED",
      message: "Email and password is not enabled"
    });
  }
  const { email: email2, password } = ctx.body;
  if (!email().safeParse(email2).success) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_EMAIL);
  assertPasswordNotTooLong(ctx, password);
  const userRecord = await ctx.context.internalAdapter.findUserByEmail(email2.toLowerCase(), { includeAccounts: true });
  const credentialAccount = userRecord?.accounts.find((account) => account.providerId === "credential" && account.accountId === userRecord.user.id);
  if (!userRecord || !credentialAccount) {
    await ctx.context.password.hash(password);
    ctx.context.logger.warn("User not found");
    throw APIError2.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
  }
  const user = userRecord.user;
  const currentPassword = credentialAccount.password;
  if (!currentPassword) {
    await ctx.context.password.hash(password);
    ctx.context.logger.warn("Password not found");
    throw APIError2.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
  }
  if (!await ctx.context.password.verify({
    hash: currentPassword,
    password
  })) {
    ctx.context.logger.warn("Invalid password");
    throw APIError2.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
  }
  if (ctx.context.options?.emailAndPassword?.requireEmailVerification && !user.emailVerified) {
    if (!ctx.context.options?.emailVerification?.sendVerificationEmail) throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.EMAIL_NOT_VERIFIED);
    if (ctx.context.options?.emailVerification?.sendOnSignIn) {
      const token = await createEmailVerificationToken(ctx.context.secret, user.email, void 0, ctx.context.options.emailVerification?.expiresIn, { userId: user.id });
      const callbackURL = ctx.body.callbackURL ? encodeURIComponent(ctx.body.callbackURL) : encodeURIComponent("/");
      const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
      await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
        user,
        url,
        token
      }, safeCloneRequest(ctx.request)));
    }
    throw APIError2.from("FORBIDDEN", BASE_ERROR_CODES.EMAIL_NOT_VERIFIED);
  }
  const session = await ctx.context.internalAdapter.createSession(user.id, ctx.body.rememberMe === false);
  if (!session) {
    ctx.context.logger.error("Failed to create session");
    throw APIError2.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
  }
  await setSessionCookie(ctx, {
    session,
    user
  }, ctx.body.rememberMe === false);
  if (ctx.body.callbackURL) ctx.setHeader("Location", ctx.body.callbackURL);
  return ctx.json({
    redirect: !!ctx.body.callbackURL,
    token: session.token,
    url: ctx.body.callbackURL,
    user: parseUserOutput(ctx.context.options, user)
  });
});

// node_modules/better-auth/dist/api/routes/sign-out.mjs
var signOutBodySchema = object({
  callbackURL: string().meta({ description: "The URL to redirect to after provider logout" }).optional(),
  disableRedirect: boolean().meta({ description: "Return the provider logout URL without redirecting" }).optional(),
  state: string().meta({ description: "State to pass to the provider logout endpoint" }).optional()
}).optional();
var signOutResponse = (providerLogout) => ({
  success: true,
  url: providerLogout?.url,
  redirect: providerLogout?.redirect
});
var signOut = createAuthEndpoint("/sign-out", {
  method: "POST",
  body: signOutBodySchema,
  operationId: "signOut",
  requireHeaders: true,
  metadata: { openapi: {
    operationId: "signOut",
    description: "Sign out the current user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          url: {
            type: "string",
            description: "Provider logout URL when RP-initiated logout is available"
          },
          redirect: {
            type: "boolean",
            description: "Whether the client should redirect to the provider logout URL"
          }
        }
      } } }
    } }
  } }
}, async (ctx) => {
  const sessionCookieToken = await ctx.getSignedCookie(ctx.context.authCookies.sessionToken.name, ctx.context.secret);
  let currentSession = null;
  if (sessionCookieToken) try {
    currentSession = await ctx.context.internalAdapter.findSession(sessionCookieToken);
  } catch (e) {
    ctx.context.logger.error("Failed to read session from database", e);
  }
  if (sessionCookieToken) try {
    await ctx.context.internalAdapter.deleteSession(sessionCookieToken);
  } catch (e) {
    ctx.context.logger.error("Failed to delete session from database", e);
  }
  deleteSessionCookie(ctx);
  const providerLogoutResult = await (async () => {
    try {
      if (!currentSession) return null;
      const accounts = await ctx.context.internalAdapter.findAccounts(currentSession.user.id);
      const providersById = new Map(ctx.context.socialProviders.map((provider) => [provider.id, provider]));
      const logoutAccounts = accounts.filter((account) => Boolean(providersById.get(account.providerId)?.createEndSessionURL)).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
      if (logoutAccounts.length === 0) return null;
      const seenProviderIds = /* @__PURE__ */ new Set();
      const postLogoutRedirectURI = ctx.body?.callbackURL ? new URL(ctx.body.callbackURL, ctx.context.baseURL).toString() : void 0;
      for (const account of logoutAccounts) {
        if (seenProviderIds.has(account.providerId)) continue;
        seenProviderIds.add(account.providerId);
        const provider = providersById.get(account.providerId);
        try {
          const url = await provider?.createEndSessionURL?.({
            idToken: account.idToken,
            postLogoutRedirectURI,
            state: ctx.body?.state
          });
          if (url) return url.toString();
        } catch (e) {
          ctx.context.logger.error(`Failed to create logout URL for provider "${account.providerId}"`, e);
        }
      }
      return null;
    } catch (e) {
      ctx.context.logger.error("Failed to create provider logout URL", e);
      return null;
    }
  })();
  if (providerLogoutResult) {
    const shouldRedirect = !ctx.body?.disableRedirect;
    if (shouldRedirect) ctx.setHeader("Location", providerLogoutResult);
    return ctx.json(signOutResponse({
      url: providerLogoutResult,
      redirect: shouldRedirect
    }));
  }
  return ctx.json(signOutResponse());
});

// node_modules/better-auth/dist/api/routes/sign-up.mjs
var signUpEmailBodySchema = object({
  name: string(),
  email: email(),
  password: string().nonempty(),
  image: string().optional(),
  callbackURL: string().optional(),
  rememberMe: boolean().optional()
}).and(record(string(), any()));
var signUpEmail = () => createAuthEndpoint("/sign-up/email", {
  method: "POST",
  operationId: "signUpWithEmailAndPassword",
  use: [formCsrfMiddleware],
  body: signUpEmailBodySchema,
  cloneRequest: true,
  metadata: {
    allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"],
    $Infer: {
      body: {},
      returned: {}
    },
    openapi: {
      operationId: "signUpWithEmailAndPassword",
      description: "Sign up a user using email and password",
      requestBody: { content: { "application/json": { schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the user"
          },
          email: {
            type: "string",
            description: "The email of the user"
          },
          password: {
            type: "string",
            description: "The password of the user"
          },
          image: {
            type: "string",
            description: "The profile image URL of the user"
          },
          callbackURL: {
            type: "string",
            description: "The URL to use for email verification callback"
          },
          rememberMe: {
            type: "boolean",
            description: "If this is false, the session will not be remembered. Default is `true`."
          }
        },
        required: [
          "name",
          "email",
          "password"
        ]
      } } } },
      responses: {
        "200": {
          description: "Successfully created user",
          content: { "application/json": { schema: {
            type: "object",
            properties: {
              token: {
                type: "string",
                nullable: true,
                description: "Authentication token for the session"
              },
              user: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    description: "The unique identifier of the user"
                  },
                  email: {
                    type: "string",
                    format: "email",
                    description: "The email address of the user"
                  },
                  name: {
                    type: "string",
                    description: "The name of the user"
                  },
                  image: {
                    type: "string",
                    format: "uri",
                    nullable: true,
                    description: "The profile image URL of the user"
                  },
                  emailVerified: {
                    type: "boolean",
                    description: "Whether the email has been verified"
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    description: "When the user was created"
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                    description: "When the user was last updated"
                  }
                },
                required: [
                  "id",
                  "email",
                  "name",
                  "emailVerified",
                  "createdAt",
                  "updatedAt"
                ]
              }
            },
            required: ["user"]
          } } }
        },
        "422": {
          description: "Unprocessable Entity. User already exists or failed to create user.",
          content: { "application/json": { schema: {
            type: "object",
            properties: { message: { type: "string" } }
          } } }
        }
      }
    }
  }
}, async (ctx) => {
  return runWithTransaction(ctx.context.adapter, async () => {
    if (!ctx.context.options.emailAndPassword?.enabled || ctx.context.options.emailAndPassword?.disableSignUp) throw APIError2.from("BAD_REQUEST", {
      message: "Email and password sign up is not enabled",
      code: "EMAIL_PASSWORD_SIGN_UP_DISABLED"
    });
    const body = ctx.body;
    const { name, email: email2, password, image, callbackURL: _callbackURL, rememberMe, ...rest } = body;
    if (!email().safeParse(email2).success) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_EMAIL);
    if (!password || typeof password !== "string") throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
    assertPasswordNotTooShort(ctx, password);
    assertPasswordNotTooLong(ctx, password);
    const shouldReturnGenericDuplicateResponse = ctx.context.options.emailAndPassword.requireEmailVerification || ctx.context.options.emailAndPassword.autoSignIn === false;
    const shouldSkipAutoSignIn = ctx.context.options.emailAndPassword.autoSignIn === false || shouldReturnGenericDuplicateResponse;
    const additionalUserFields = parseUserInput(ctx.context.options, rest, "create");
    const normalizedEmail = email2.toLowerCase();
    const buildGenericDuplicateResponse = () => {
      const now2 = /* @__PURE__ */ new Date();
      const generatedId = ctx.context.generateId({ model: "user" }) || generateId();
      const coreFields = {
        name,
        email: normalizedEmail,
        emailVerified: false,
        image: image ?? null,
        createdAt: now2,
        updatedAt: now2
      };
      const customSyntheticUser = ctx.context.options.emailAndPassword?.customSyntheticUser;
      let syntheticUser;
      if (customSyntheticUser) {
        const additionalFieldKeys = Object.keys(ctx.context.options.user?.additionalFields ?? {});
        const additionalFields = {};
        for (const key of additionalFieldKeys) if (key in additionalUserFields) additionalFields[key] = additionalUserFields[key];
        const customResult = customSyntheticUser({
          coreFields,
          additionalFields,
          id: generatedId
        });
        syntheticUser = buildSyntheticUserOutput(ctx.context.options, customResult);
      } else syntheticUser = buildSyntheticUserOutput(ctx.context.options, {
        ...coreFields,
        ...additionalUserFields,
        id: generatedId
      });
      return ctx.json({
        token: null,
        user: parseUserOutput(ctx.context.options, syntheticUser)
      });
    };
    const dbUser = await ctx.context.internalAdapter.findUserByEmail(normalizedEmail);
    if (dbUser?.user) {
      ctx.context.logger.info(`Sign-up attempt for existing email: ${email2}`);
      if (shouldReturnGenericDuplicateResponse) {
        await ctx.context.password.hash(password);
        const onExistingUserSignUp = ctx.context.options.emailAndPassword?.onExistingUserSignUp;
        if (onExistingUserSignUp) {
          const request = safeCloneRequest(ctx.request);
          await queueAfterTransactionHook(async () => {
            await ctx.context.runInBackgroundOrAwait(onExistingUserSignUp({ user: dbUser.user }, request));
          }, { onError: (error2) => ctx.context.logger.error("Failed to run onExistingUserSignUp after sign-up", error2) });
        }
        return buildGenericDuplicateResponse();
      }
      throw APIError2.from("UNPROCESSABLE_ENTITY", BASE_ERROR_CODES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL);
    }
    const hash = await ctx.context.password.hash(password);
    let createdUser;
    try {
      createdUser = await ctx.context.internalAdapter.createUser({
        email: normalizedEmail,
        name,
        image,
        ...additionalUserFields,
        emailVerified: false
      }, { method: "email-password" });
      if (!createdUser) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.FAILED_TO_CREATE_USER);
    } catch (e) {
      if (isAPIError2(e)) {
        if (e.statusCode === 403 && shouldReturnGenericDuplicateResponse) return buildGenericDuplicateResponse();
        throw e;
      }
      if (isDevelopment()) ctx.context.logger.error("Failed to create user", e);
      ctx.context.logger?.error("Failed to create user", e);
      throw APIError2.from("UNPROCESSABLE_ENTITY", BASE_ERROR_CODES.FAILED_TO_CREATE_USER);
    }
    if (!createdUser) throw APIError2.from("UNPROCESSABLE_ENTITY", BASE_ERROR_CODES.FAILED_TO_CREATE_USER);
    await ctx.context.internalAdapter.linkAccount({
      userId: createdUser.id,
      providerId: "credential",
      accountId: createdUser.id,
      password: hash
    });
    const shouldSendVerificationEmail = ctx.context.options.emailVerification?.sendOnSignUp ?? ctx.context.options.emailAndPassword.requireEmailVerification;
    const sendVerificationEmail2 = ctx.context.options.emailVerification?.sendVerificationEmail;
    if (shouldSendVerificationEmail && sendVerificationEmail2) {
      const callbackURL = body.callbackURL ? encodeURIComponent(body.callbackURL) : encodeURIComponent("/");
      const request = safeCloneRequest(ctx.request);
      await queueAfterTransactionHook(async () => {
        const token = await createEmailVerificationToken(ctx.context.secret, createdUser.email, void 0, ctx.context.options.emailVerification?.expiresIn, { userId: createdUser.id });
        const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
        await ctx.context.runInBackgroundOrAwait(sendVerificationEmail2({
          user: createdUser,
          url,
          token
        }, request));
      }, { onError: (error2) => ctx.context.logger.error("Failed to send the sign-up verification email", error2) });
    }
    if (shouldSkipAutoSignIn) return ctx.json({
      token: null,
      user: parseUserOutput(ctx.context.options, createdUser)
    });
    const session = await ctx.context.internalAdapter.createSession(createdUser.id, rememberMe === false, void 0, void 0, { deferSecondaryStorageWrites: true });
    if (!session) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
    await setSessionCookie(ctx, {
      session,
      user: createdUser
    }, rememberMe === false);
    return ctx.json({
      token: session.token,
      user: parseUserOutput(ctx.context.options, createdUser)
    });
  });
});

// node_modules/better-auth/dist/api/routes/update-session.mjs
var updateSessionBodySchema = record(string().meta({ description: "Field name must be a string" }), any());
var updateSession = () => createAuthEndpoint("/update-session", {
  method: "POST",
  operationId: "updateSession",
  body: updateSessionBodySchema,
  use: [sessionMiddleware],
  metadata: {
    $Infer: { body: {} },
    openapi: {
      operationId: "updateSession",
      description: "Update the current session",
      responses: { "200": {
        description: "Success",
        content: { "application/json": { schema: {
          type: "object",
          properties: { session: {
            type: "object",
            $ref: "#/components/schemas/Session"
          } }
        } } }
      } }
    }
  }
}, async (ctx) => {
  const body = ctx.body;
  if (typeof body !== "object" || Array.isArray(body)) throw APIError2.from("BAD_REQUEST", BASE_ERROR_CODES.BODY_MUST_BE_AN_OBJECT);
  const session = ctx.context.session;
  const additionalFields = parseSessionInput(ctx.context.options, body, "update");
  if (Object.keys(additionalFields).length === 0) throw APIError2.fromStatus("BAD_REQUEST", { message: "No fields to update" });
  const updatedSession = await ctx.context.internalAdapter.updateSession(session.session.token, {
    ...additionalFields,
    updatedAt: /* @__PURE__ */ new Date()
  });
  if (!updatedSession && isStateful(ctx)) {
    deleteSessionCookie(ctx);
    throw APIError2.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_SESSION);
  }
  const newSession = updatedSession ?? {
    ...session.session,
    ...additionalFields,
    updatedAt: /* @__PURE__ */ new Date()
  };
  await setSessionCookie(ctx, {
    session: newSession,
    user: session.user
  });
  return ctx.json({ session: parseSessionOutput(ctx.context.options, newSession) });
});

// node_modules/better-auth/dist/api/dispatch.mjs
var defuReplaceArrays = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value;
    return true;
  }
});
var hooksSourceWeakMap = /* @__PURE__ */ new WeakMap();
function getOperationId(endpoint, fallback) {
  const opts = endpoint.options;
  return opts?.operationId ?? opts?.metadata?.openapi?.operationId ?? fallback ?? endpoint.path ?? "/:virtual";
}
function mergeHeader(target, key, value) {
  const name = key.toLowerCase();
  if (name === "set-cookie") {
    target.append(key, value);
    return;
  }
  if (name === "access-control-expose-headers") {
    const exposed = (target.get(key) ?? "").split(",").map((header) => header.trim()).filter(Boolean);
    for (const header of value.split(",").map((part) => part.trim())) if (header && !exposed.some((item) => item.toLowerCase() === header.toLowerCase())) exposed.push(header);
    target.set(key, exposed.join(", "));
    return;
  }
  target.set(key, value);
}
function mergeResponseHeaders(context, headers) {
  if (!headers) return;
  headers.forEach((value, key) => {
    context.responseHeaders ??= new Headers();
    mergeHeader(context.responseHeaders, key, value);
  });
}
function mergeAPIErrorHeaders(error2) {
  const ctxHeaders = error2[kAPIErrorHeaderSymbol];
  const errHeaders = error2.headers && error2.headers !== ctxHeaders ? new Headers(error2.headers) : null;
  if (!ctxHeaders && !errHeaders) return null;
  const headers = new Headers();
  ctxHeaders?.forEach((value, key) => {
    headers.append(key, value);
  });
  errHeaders?.forEach((value, key) => {
    mergeHeader(headers, key, value);
  });
  return headers;
}
async function runBeforeHooks(context, hooks, endpoint, operationId) {
  const withSpan = createWithSpan(context.context.options);
  let modifiedContext = {};
  for (const hook of hooks) {
    let matched = false;
    try {
      matched = hook.matcher(context);
    } catch (error2) {
      const hookSource2 = hooksSourceWeakMap.get(hook.handler) ?? "unknown";
      context.context.logger.error(`An error occurred during ${hookSource2} hook matcher execution:`, error2);
      throw new APIError2("INTERNAL_SERVER_ERROR", { message: "An error occurred during hook matcher execution. Check the logs for more details." });
    }
    if (!matched) continue;
    const hookSource = hooksSourceWeakMap.get(hook.handler) ?? "unknown";
    const route = endpoint.path ?? "/:virtual";
    const result = await withSpan(`hook before ${route} ${hookSource}`, {
      [ATTR_HOOK_TYPE]: "before",
      [ATTR_HTTP_ROUTE]: route,
      [ATTR_CONTEXT]: hookSource,
      [ATTR_OPERATION_ID]: operationId
    }, () => hook.handler({
      ...context,
      returnHeaders: true
    })).catch((e) => {
      if (isAPIError2(e) && shouldPublishLog(context.context.logger.level, "debug")) e.stack = e.errorStack;
      throw e;
    });
    mergeResponseHeaders(context.context, result?.headers);
    const hookReturn = result?.response;
    if (hookReturn && typeof hookReturn === "object") {
      if ("context" in hookReturn && typeof hookReturn.context === "object") {
        const { headers, ...rest } = hookReturn.context;
        if (headers instanceof Headers) {
          if (modifiedContext.headers) headers.forEach((value, key) => {
            modifiedContext.headers?.set(key, value);
          });
          else modifiedContext.headers = headers;
        }
        modifiedContext = defuReplaceArrays(rest, modifiedContext);
        continue;
      }
      return hookReturn;
    }
  }
  return { context: modifiedContext };
}
async function runAfterHooks(context, hooks, endpoint, operationId) {
  const withSpan = createWithSpan(context.context.options);
  for (const hook of hooks) {
    if (!hook.matcher(context)) continue;
    const hookSource = hooksSourceWeakMap.get(hook.handler) ?? "unknown";
    const route = endpoint.path ?? "/:virtual";
    const result = await withSpan(`hook after ${route} ${hookSource}`, {
      [ATTR_HOOK_TYPE]: "after",
      [ATTR_HTTP_ROUTE]: route,
      [ATTR_CONTEXT]: hookSource,
      [ATTR_OPERATION_ID]: operationId
    }, () => hook.handler(context)).catch((e) => {
      if (isAPIError2(e)) {
        if (shouldPublishLog(context.context.logger.level, "debug")) e.stack = e.errorStack;
        return {
          response: e,
          headers: mergeAPIErrorHeaders(e)
        };
      }
      throw e;
    });
    mergeResponseHeaders(context.context, result.headers);
    if (result.response !== void 0) context.context.returned = result.response;
  }
  return {
    response: context.context.returned,
    headers: context.context.responseHeaders
  };
}
function getHooks(authContext) {
  const plugins = authContext.options.plugins || [];
  const beforeHooks = [];
  const afterHooks = [];
  const beforeHookHandler = authContext.options.hooks?.before;
  if (beforeHookHandler) {
    hooksSourceWeakMap.set(beforeHookHandler, "user");
    beforeHooks.push({
      matcher: () => true,
      handler: beforeHookHandler
    });
  }
  const afterHookHandler = authContext.options.hooks?.after;
  if (afterHookHandler) {
    hooksSourceWeakMap.set(afterHookHandler, "user");
    afterHooks.push({
      matcher: () => true,
      handler: afterHookHandler
    });
  }
  const pluginBeforeHooks = plugins.flatMap((plugin) => (plugin.hooks?.before ?? []).map((h) => {
    hooksSourceWeakMap.set(h.handler, `plugin:${plugin.id}`);
    return h;
  }));
  const pluginAfterHooks = plugins.flatMap((plugin) => (plugin.hooks?.after ?? []).map((h) => {
    hooksSourceWeakMap.set(h.handler, `plugin:${plugin.id}`);
    return h;
  }));
  if (pluginBeforeHooks.length) beforeHooks.push(...pluginBeforeHooks);
  if (pluginAfterHooks.length) afterHooks.push(...pluginAfterHooks);
  return {
    beforeHooks,
    afterHooks
  };
}
async function dispatchAuthEndpoint(endpoint, input) {
  const withSpan = createWithSpan(input.context.options);
  const operationId = input.operationId ?? getOperationId(endpoint);
  const route = endpoint.path ?? "/:virtual";
  const endpointMethod = endpoint.options?.method;
  const defaultMethod = Array.isArray(endpointMethod) ? endpointMethod[0] : endpointMethod;
  const methodName = input.method ?? input.request?.method ?? defaultMethod ?? "?";
  const shouldReturnResponse = input.asResponse ?? isRequestLike(input.request);
  let internalContext = {
    ...input,
    context: {
      ...input.context,
      returned: void 0,
      responseHeaders: void 0,
      session: input.context.session ?? null
    },
    path: endpoint.path,
    headers: input.headers ? new Headers(input.headers) : void 0
  };
  return withSpan(`${methodName} ${route}`, {
    [ATTR_HTTP_ROUTE]: route,
    [ATTR_OPERATION_ID]: operationId
  }, async () => runWithEndpointContext(internalContext, async () => {
    const { beforeHooks, afterHooks } = getHooks(internalContext.context);
    const before = await runBeforeHooks(internalContext, beforeHooks, endpoint, operationId);
    if ("context" in before && before.context && typeof before.context === "object") {
      const { headers, ...rest } = before.context;
      if (headers) {
        if (!internalContext.headers) internalContext.headers = new Headers();
        const requestHeaders = internalContext.headers;
        headers.forEach((value, key) => {
          requestHeaders.set(key, value);
        });
      }
      internalContext = defuReplaceArrays(rest, internalContext);
    } else if (before) {
      const responseHeaders = internalContext.context.responseHeaders;
      return shouldReturnResponse ? toResponse(before, { headers: responseHeaders }) : input.returnHeaders ? {
        headers: responseHeaders,
        response: before
      } : before;
    }
    internalContext.asResponse = false;
    internalContext.returnHeaders = true;
    internalContext.returnStatus = true;
    const result = await runWithEndpointContext(internalContext, () => withSpan(`handler ${route}`, {
      [ATTR_HTTP_ROUTE]: route,
      [ATTR_OPERATION_ID]: operationId
    }, () => endpoint(internalContext))).catch((e) => {
      if (isAPIError2(e)) return {
        response: e,
        status: e.statusCode,
        headers: mergeAPIErrorHeaders(e)
      };
      throw e;
    });
    if (result instanceof Response) return result;
    internalContext.context.returned = result.response;
    mergeResponseHeaders(internalContext.context, result.headers);
    const after = await runAfterHooks(internalContext, afterHooks, endpoint, operationId);
    if (after.response !== void 0) result.response = after.response;
    result.headers = after.headers ?? result.headers;
    if (isAPIError2(result.response) && shouldPublishLog(internalContext.context.logger.level, "debug")) result.response.stack = result.response.errorStack;
    if (isAPIError2(result.response) && !shouldReturnResponse) {
      if (result.headers) Object.defineProperty(result.response, kAPIErrorHeaderSymbol, {
        enumerable: false,
        configurable: true,
        writable: false,
        value: result.headers
      });
      throw result.response;
    }
    return shouldReturnResponse ? toResponse(result.response, {
      headers: result.headers ?? void 0,
      status: result.status
    }) : input.returnHeaders ? input.returnStatus ? {
      headers: result.headers,
      response: result.response,
      status: result.status
    } : {
      headers: result.headers,
      response: result.response
    } : input.returnStatus ? {
      response: result.response,
      status: result.status
    } : result.response;
  }));
}

// node_modules/better-auth/dist/api/to-auth-endpoints.mjs
async function resolveDynamicContext(rawCtx, input) {
  if (rawCtx.baseURL) return rawCtx;
  const source = pickSource(input);
  const config2 = rawCtx.options.baseURL;
  const hasFallback = isDynamicBaseURLConfig(config2) && Boolean(config2.fallback);
  if (source === void 0 && !hasFallback) throw new APIError2("INTERNAL_SERVER_ERROR", { message: "Dynamic baseURL could not be resolved for this direct auth.api call. Pass `headers: request.headers` (or `request`) to the call, or add `fallback` to your baseURL config." });
  try {
    return await resolveRequestContext(rawCtx, source, resolveDynamicTrustedProxyHeaders(rawCtx.options));
  } catch (err) {
    if (err instanceof BetterAuthError) throw new APIError2("INTERNAL_SERVER_ERROR", { message: err.message });
    throw err;
  }
}
function toAuthEndpoints(endpoints, ctx) {
  const api = {};
  for (const [key, endpoint] of Object.entries(endpoints)) {
    api[key] = async (context) => {
      const operationId = getOperationId(endpoint, key);
      const run = async () => {
        const rawContext = await ctx;
        const pendingSchemaCheck = rawContext.checkSchema?.();
        if (pendingSchemaCheck) await pendingSchemaCheck;
        const authContext = isDynamicBaseURLConfig(rawContext.options.baseURL) ? await resolveDynamicContext(rawContext, context) : rawContext;
        return dispatchAuthEndpoint(endpoint, {
          ...context,
          context: authContext,
          operationId,
          asResponse: context?.asResponse ?? isRequestLike(context?.request)
        });
      };
      if (await hasRequestState()) return run();
      return runWithRequestState(/* @__PURE__ */ new WeakMap(), run);
    };
    api[key].path = endpoint.path;
    api[key].options = endpoint.options;
  }
  return api;
}

// node_modules/better-auth/dist/api/index.mjs
function checkEndpointConflicts(options, logger2) {
  const endpointRegistry = /* @__PURE__ */ new Map();
  options.plugins?.forEach((plugin) => {
    if (plugin.endpoints) {
      for (const [key, endpoint] of Object.entries(plugin.endpoints)) if (endpoint && "path" in endpoint && typeof endpoint.path === "string") {
        const path2 = endpoint.path;
        let methods2 = [];
        if (endpoint.options && "method" in endpoint.options) {
          if (Array.isArray(endpoint.options.method)) methods2 = endpoint.options.method;
          else if (typeof endpoint.options.method === "string") methods2 = [endpoint.options.method];
        }
        if (methods2.length === 0) methods2 = ["*"];
        if (!endpointRegistry.has(path2)) endpointRegistry.set(path2, []);
        endpointRegistry.get(path2).push({
          pluginId: plugin.id,
          endpointKey: key,
          methods: methods2
        });
      }
    }
  });
  const conflicts = [];
  for (const [path2, entries] of endpointRegistry.entries()) if (entries.length > 1) {
    const methodMap = /* @__PURE__ */ new Map();
    let hasConflict = false;
    for (const entry of entries) for (const method of entry.methods) {
      if (!methodMap.has(method)) methodMap.set(method, []);
      methodMap.get(method).push(entry.pluginId);
      if (methodMap.get(method).length > 1) hasConflict = true;
      if (method === "*" && entries.length > 1) hasConflict = true;
      else if (method !== "*" && methodMap.has("*")) hasConflict = true;
    }
    if (hasConflict) {
      const uniquePlugins = [...new Set(entries.map((e) => e.pluginId))];
      const conflictingMethods = [];
      for (const [method, plugins] of methodMap.entries()) if (plugins.length > 1 || method === "*" && entries.length > 1 || method !== "*" && methodMap.has("*")) conflictingMethods.push(method);
      conflicts.push({
        path: path2,
        plugins: uniquePlugins,
        conflictingMethods
      });
    }
  }
  if (conflicts.length > 0) {
    const conflictMessages = conflicts.map((conflict) => `  - "${conflict.path}" [${conflict.conflictingMethods.join(", ")}] used by plugins: ${conflict.plugins.join(", ")}`).join("\n");
    logger2.error(`Endpoint path conflicts detected! Multiple plugins are trying to use the same endpoint paths with conflicting HTTP methods:
${conflictMessages}

To resolve this, you can:
	1. Use only one of the conflicting plugins
	2. Configure the plugins to use different paths (if supported)
	3. Ensure plugins use different HTTP methods for the same path
`);
  }
}
function getEndpoints(ctx, options) {
  const withSpan = createWithSpan(options);
  const pluginEndpoints = options.plugins?.reduce((acc, plugin) => {
    return {
      ...acc,
      ...plugin.endpoints
    };
  }, {}) ?? {};
  const middlewares = options.plugins?.map((plugin) => plugin.middlewares?.map((m) => {
    const middleware = (async (context) => {
      const authContext = await ctx;
      return withSpan(`middleware ${m.path} ${plugin.id}`, {
        [ATTR_HOOK_TYPE]: "middleware",
        [ATTR_HTTP_ROUTE]: m.path,
        [ATTR_CONTEXT]: `plugin:${plugin.id}`
      }, () => m.middleware({
        ...context,
        context: {
          ...authContext,
          ...context.context
        }
      }));
    });
    middleware.options = m.middleware.options;
    return {
      path: m.path,
      middleware
    };
  })).filter((plugin) => plugin !== void 0).flat() || [];
  const endpoints = {
    signInSocial: signInSocial(),
    callbackOAuth,
    getSession: getSession(),
    signOut,
    signUpEmail: signUpEmail(),
    signInEmail: signInEmail(),
    resetPassword,
    verifyPassword: verifyPassword2,
    verifyEmail,
    sendVerificationEmail,
    changeEmail,
    changePassword,
    setPassword,
    updateSession: updateSession(),
    updateUser: updateUser(),
    deleteUser,
    requestPasswordReset,
    requestPasswordResetCallback,
    listSessions: listSessions(),
    revokeSession,
    revokeSessions,
    revokeOtherSessions,
    linkSocialAccount,
    listUserAccounts,
    deleteUserCallback,
    unlinkAccount,
    refreshToken,
    getAccessToken,
    accountInfo,
    ...pluginEndpoints,
    ok,
    error
  };
  return {
    api: toAuthEndpoints(endpoints, ctx),
    middlewares
  };
}
var router = (ctx, options) => {
  const withSpan = createWithSpan(options);
  const { api, middlewares } = getEndpoints(ctx, options);
  const basePath = new URL(ctx.baseURL).pathname;
  return createRouter$1(api, {
    routerContext: ctx,
    openapi: { disabled: true },
    basePath,
    routerMiddleware: [{
      path: "/**",
      middleware: originCheckMiddleware
    }, ...middlewares],
    allowedMediaTypes: ["application/json"],
    skipTrailingSlashes: options.advanced?.skipTrailingSlashes ?? false,
    async onRequest(req) {
      const disabledPaths = ctx.options.disabledPaths || [];
      const normalizedPath = normalizePathname(req.url, basePath);
      if (disabledPaths.includes(normalizedPath)) return new Response("Not Found", { status: 404 });
      const pendingSchemaCheck = ctx.checkSchema?.();
      if (pendingSchemaCheck) await pendingSchemaCheck;
      let currentRequest = req;
      const rateLimitResponse2 = await onRequestRateLimit(currentRequest, ctx);
      if (rateLimitResponse2) return rateLimitResponse2;
      for (const plugin of ctx.options.plugins || []) if (plugin.onRequest) {
        const response = await withSpan(`onRequest ${plugin.id}`, {
          [ATTR_HOOK_TYPE]: "onRequest",
          [ATTR_CONTEXT]: `plugin:${plugin.id}`
        }, () => plugin.onRequest(currentRequest, ctx));
        if (response && "response" in response) return response.response;
        if (response && "request" in response) currentRequest = response.request;
      }
      return currentRequest;
    },
    async onResponse(res, req) {
      for (const plugin of ctx.options.plugins || []) if (plugin.onResponse) {
        const response = await withSpan(`onResponse ${plugin.id}`, {
          [ATTR_HOOK_TYPE]: "onResponse",
          [ATTR_CONTEXT]: `plugin:${plugin.id}`,
          [ATTR_HTTP_RESPONSE_STATUS_CODE]: res.status
        }, () => plugin.onResponse(res, ctx));
        if (response) return response.response;
      }
      return res;
    },
    async onError(e) {
      if (isAPIError2(e) && e.status === "FOUND") return;
      if (options.onAPIError?.throw) throw e;
      if (options.onAPIError?.onError) {
        try {
          await options.onAPIError.onError(e, ctx);
        } catch (hookError) {
          ctx.logger.error("onAPIError.onError threw", hookError);
        }
        return;
      }
      const optLogLevel = options.logger?.level;
      const log = optLogLevel === "error" || optLogLevel === "warn" || optLogLevel === "debug" ? logger : void 0;
      if (options.logger?.disabled !== true) {
        if (e && typeof e === "object" && "message" in e && typeof e.message === "string") {
          if (e.message.includes("no column") || e.message.includes("column") || e.message.includes("relation") || e.message.includes("table") || e.message.includes("does not exist")) {
            ctx.logger?.error(e.message);
            return;
          }
        }
        if (isAPIError2(e)) {
          if (e.status === "INTERNAL_SERVER_ERROR") ctx.logger.error(e.status, e);
          log?.error(e.message);
        } else ctx.logger?.error(e && typeof e === "object" && "name" in e ? e.name : "", e);
      }
    }
  });
};

// node_modules/better-auth/dist/utils/constants.mjs
var DEFAULT_SECRET = "better-auth-secret-12345678901234567890";

// node_modules/better-auth/dist/context/secret-utils.mjs
function estimateEntropy(str) {
  const unique = new Set(str).size;
  if (unique === 0) return 0;
  return Math.log2(Math.pow(unique, str.length));
}
function parseSecretsEnv(envValue) {
  if (!envValue) return null;
  return envValue.split(",").map((entry, index) => {
    entry = entry.trim();
    const colonIdx = entry.indexOf(":");
    if (colonIdx === -1) throw new BetterAuthError(`Invalid BETTER_AUTH_SECRETS entry at position ${index + 1}. Expected format: "<version>:<secret>"`);
    const version2 = parseInt(entry.slice(0, colonIdx), 10);
    if (!Number.isInteger(version2) || version2 < 0) throw new BetterAuthError(`Invalid version in BETTER_AUTH_SECRETS entry at position ${index + 1}. Version must be a non-negative integer.`);
    const value = entry.slice(colonIdx + 1).trim();
    if (!value) throw new BetterAuthError(`Empty secret value for version ${version2} in BETTER_AUTH_SECRETS.`);
    return {
      version: version2,
      value
    };
  });
}
function validateSecretsArray(secrets, logger2) {
  if (secrets.length === 0) throw new BetterAuthError("`secrets` array must contain at least one entry.");
  const seen = /* @__PURE__ */ new Set();
  for (const s of secrets) {
    const version2 = parseInt(String(s.version), 10);
    if (!Number.isInteger(version2) || version2 < 0 || String(version2) !== String(s.version).trim()) throw new BetterAuthError(`Invalid version ${s.version} in \`secrets\`. Version must be a non-negative integer.`);
    if (!s.value) throw new BetterAuthError(`Empty secret value for version ${version2} in \`secrets\`.`);
    if (seen.has(version2)) throw new BetterAuthError(`Duplicate version ${version2} in \`secrets\`. Each version must be unique.`);
    seen.add(version2);
  }
  const current = secrets[0];
  if (current.value.length < 32) logger2.warn(`[better-auth] Warning: the current secret (version ${current.version}) should be at least 32 characters long for adequate security.`);
  if (estimateEntropy(current.value) < 120) logger2.warn("[better-auth] Warning: the current secret appears low-entropy. Use a randomly generated secret for production.");
}
function buildSecretConfig(secrets, legacySecret) {
  const keys = /* @__PURE__ */ new Map();
  for (const s of secrets) keys.set(parseInt(String(s.version), 10), s.value);
  return {
    keys,
    currentVersion: parseInt(String(secrets[0].version), 10),
    legacySecret: legacySecret && legacySecret !== "better-auth-secret-12345678901234567890" ? legacySecret : void 0
  };
}

// node_modules/@better-auth/telemetry/dist/node.mjs
import fs from "fs";
import fsPromises from "fs/promises";
import os from "os";
import path from "path";
async function getTelemetryAuthConfig(options, context) {
  return {
    database: context?.database,
    adapter: context?.adapter,
    emailVerification: {
      sendVerificationEmail: !!options.emailVerification?.sendVerificationEmail,
      sendOnSignUp: !!options.emailVerification?.sendOnSignUp,
      sendOnSignIn: !!options.emailVerification?.sendOnSignIn,
      autoSignInAfterVerification: !!options.emailVerification?.autoSignInAfterVerification,
      expiresIn: options.emailVerification?.expiresIn,
      beforeEmailVerification: !!options.emailVerification?.beforeEmailVerification,
      afterEmailVerification: !!options.emailVerification?.afterEmailVerification
    },
    emailAndPassword: {
      enabled: !!options.emailAndPassword?.enabled,
      disableSignUp: !!options.emailAndPassword?.disableSignUp,
      requireEmailVerification: !!options.emailAndPassword?.requireEmailVerification,
      maxPasswordLength: options.emailAndPassword?.maxPasswordLength,
      minPasswordLength: options.emailAndPassword?.minPasswordLength,
      sendResetPassword: !!options.emailAndPassword?.sendResetPassword,
      resetPasswordTokenExpiresIn: options.emailAndPassword?.resetPasswordTokenExpiresIn,
      onPasswordReset: !!options.emailAndPassword?.onPasswordReset,
      password: {
        hash: !!options.emailAndPassword?.password?.hash,
        verify: !!options.emailAndPassword?.password?.verify
      },
      autoSignIn: !!options.emailAndPassword?.autoSignIn,
      revokeSessionsOnPasswordReset: !!options.emailAndPassword?.revokeSessionsOnPasswordReset
    },
    socialProviders: await Promise.all(Object.keys(options.socialProviders || {}).map(async (key) => {
      const p = options.socialProviders?.[key];
      if (!p) return {};
      const provider = typeof p === "function" ? await p() : p;
      return {
        id: key,
        mapProfileToUser: !!provider.mapProfileToUser,
        disableDefaultScope: !!provider.disableDefaultScope,
        disableIdTokenSignIn: !!provider.disableIdTokenSignIn,
        disableImplicitSignUp: provider.disableImplicitSignUp,
        disableSignUp: provider.disableSignUp,
        getUserInfo: !!provider.getUserInfo,
        overrideUserInfoOnSignIn: !!provider.overrideUserInfoOnSignIn,
        prompt: provider.prompt,
        verifyIdToken: !!provider.verifyIdToken,
        scope: provider.scope,
        refreshAccessToken: !!provider.refreshAccessToken
      };
    })),
    plugins: options.plugins?.map((p) => p.id.toString()),
    user: {
      modelName: options.user?.modelName,
      fields: options.user?.fields,
      additionalFields: options.user?.additionalFields,
      changeEmail: {
        enabled: options.user?.changeEmail?.enabled,
        sendChangeEmailConfirmation: !!options.user?.changeEmail?.sendChangeEmailConfirmation
      }
    },
    verification: {
      modelName: options.verification?.modelName,
      disableCleanup: options.verification?.disableCleanup,
      fields: options.verification?.fields
    },
    session: {
      modelName: options.session?.modelName,
      additionalFields: options.session?.additionalFields,
      cookieCache: {
        enabled: options.session?.cookieCache?.enabled,
        maxAge: options.session?.cookieCache?.maxAge,
        strategy: options.session?.cookieCache?.strategy
      },
      disableSessionRefresh: options.session?.disableSessionRefresh,
      expiresIn: options.session?.expiresIn,
      fields: options.session?.fields,
      freshAge: options.session?.freshAge,
      preserveSessionInDatabase: options.session?.preserveSessionInDatabase,
      storeSessionInDatabase: options.session?.storeSessionInDatabase,
      updateAge: options.session?.updateAge
    },
    account: {
      modelName: options.account?.modelName,
      fields: options.account?.fields,
      encryptOAuthTokens: options.account?.encryptOAuthTokens,
      updateAccountOnSignIn: options.account?.updateAccountOnSignIn,
      accountLinking: {
        enabled: options.account?.accountLinking?.enabled,
        trustedProviders: options.account?.accountLinking?.trustedProviders,
        updateUserInfoOnLink: options.account?.accountLinking?.updateUserInfoOnLink,
        allowUnlinkingAll: options.account?.accountLinking?.allowUnlinkingAll
      }
    },
    hooks: {
      after: !!options.hooks?.after,
      before: !!options.hooks?.before
    },
    secondaryStorage: !!options.secondaryStorage,
    advanced: {
      cookiePrefix: !!options.advanced?.cookiePrefix,
      cookies: !!options.advanced?.cookies,
      crossSubDomainCookies: {
        domain: !!options.advanced?.crossSubDomainCookies?.domain,
        enabled: options.advanced?.crossSubDomainCookies?.enabled,
        additionalCookies: options.advanced?.crossSubDomainCookies?.additionalCookies
      },
      database: {
        generateId: options.advanced?.database?.generateId,
        defaultFindManyLimit: options.advanced?.database?.defaultFindManyLimit
      },
      useSecureCookies: options.advanced?.useSecureCookies,
      ipAddress: {
        disableIpTracking: options.advanced?.ipAddress?.disableIpTracking,
        ipAddressHeaders: options.advanced?.ipAddress?.ipAddressHeaders
      },
      disableCSRFCheck: options.advanced?.disableCSRFCheck,
      cookieAttributes: {
        expires: options.advanced?.defaultCookieAttributes?.expires,
        secure: options.advanced?.defaultCookieAttributes?.secure,
        sameSite: options.advanced?.defaultCookieAttributes?.sameSite,
        domain: !!options.advanced?.defaultCookieAttributes?.domain,
        path: options.advanced?.defaultCookieAttributes?.path,
        httpOnly: options.advanced?.defaultCookieAttributes?.httpOnly
      }
    },
    trustedOrigins: options.trustedOrigins?.length,
    rateLimit: {
      storage: options.rateLimit?.storage,
      modelName: options.rateLimit?.modelName,
      window: options.rateLimit?.window,
      customStorage: !!options.rateLimit?.customStorage,
      enabled: options.rateLimit?.enabled,
      max: options.rateLimit?.max
    },
    onAPIError: {
      errorURL: options.onAPIError?.errorURL,
      onError: !!options.onAPIError?.onError,
      throw: options.onAPIError?.throw
    },
    logger: {
      disabled: options.logger?.disabled,
      level: options.logger?.level,
      log: !!options.logger?.log
    },
    databaseHooks: {
      user: {
        create: {
          after: !!options.databaseHooks?.user?.create?.after,
          before: !!options.databaseHooks?.user?.create?.before
        },
        update: {
          after: !!options.databaseHooks?.user?.update?.after,
          before: !!options.databaseHooks?.user?.update?.before
        }
      },
      session: {
        create: {
          after: !!options.databaseHooks?.session?.create?.after,
          before: !!options.databaseHooks?.session?.create?.before
        },
        update: {
          after: !!options.databaseHooks?.session?.update?.after,
          before: !!options.databaseHooks?.session?.update?.before
        }
      },
      account: {
        create: {
          after: !!options.databaseHooks?.account?.create?.after,
          before: !!options.databaseHooks?.account?.create?.before
        },
        update: {
          after: !!options.databaseHooks?.account?.update?.after,
          before: !!options.databaseHooks?.account?.update?.before
        }
      },
      verification: {
        create: {
          after: !!options.databaseHooks?.verification?.create?.after,
          before: !!options.databaseHooks?.verification?.create?.before
        },
        update: {
          after: !!options.databaseHooks?.verification?.update?.after,
          before: !!options.databaseHooks?.verification?.update?.before
        }
      }
    }
  };
}
function detectPackageManager() {
  const userAgent = env.npm_config_user_agent;
  if (!userAgent) return;
  const pmSpec = userAgent.split(" ")[0];
  const separatorPos = pmSpec.lastIndexOf("/");
  const name = pmSpec.substring(0, separatorPos);
  return {
    name: name === "npminstall" ? "cnpm" : name,
    version: pmSpec.substring(separatorPos + 1)
  };
}
function isCI() {
  return env.CI !== "false" && ("BUILD_ID" in env || "BUILD_NUMBER" in env || "CI" in env || "CI_APP_ID" in env || "CI_BUILD_ID" in env || "CI_BUILD_NUMBER" in env || "CI_NAME" in env || "CONTINUOUS_INTEGRATION" in env || "RUN_ID" in env);
}
function detectRuntime() {
  const name = getRuntimeName();
  if (name === "deno") return {
    name,
    version: Deno?.version?.deno ?? null
  };
  if (name === "bun") return {
    name,
    version: Bun?.version ?? null
  };
  if (name === "node") return {
    name,
    version: process.versions.node ?? null
  };
  return {
    name: name ?? "edge",
    version: null
  };
}
function detectEnvironment() {
  return getEnvVar("NODE_ENV") === "production" ? "production" : isCI() ? "ci" : isTest() ? "test" : "development";
}
async function hashToBase64(data) {
  const buffer = await createHash("SHA-256").digest(data);
  return base64.encode(buffer);
}
var generateId2 = (size) => {
  return createRandomStringGenerator("a-z", "A-Z", "0-9")(size || 32);
};
var packageJSONCache;
async function readRootPackageJson() {
  if (packageJSONCache) return packageJSONCache;
  try {
    const cwd = process.cwd();
    if (!cwd) return void 0;
    const raw = await fsPromises.readFile(path.join(cwd, "package.json"), "utf-8");
    packageJSONCache = JSON.parse(raw);
    return packageJSONCache;
  } catch {
  }
}
async function getPackageVersion(pkg) {
  if (packageJSONCache) return packageJSONCache.dependencies?.[pkg] || packageJSONCache.devDependencies?.[pkg] || packageJSONCache.peerDependencies?.[pkg];
  try {
    const cwd = process.cwd();
    if (!cwd) throw new Error("no-cwd");
    const pkgJsonPath = path.join(cwd, "node_modules", pkg, "package.json");
    const raw = await fsPromises.readFile(pkgJsonPath, "utf-8");
    return JSON.parse(raw).version || await getVersionFromLocalPackageJson(pkg) || void 0;
  } catch {
  }
  return getVersionFromLocalPackageJson(pkg);
}
async function getVersionFromLocalPackageJson(pkg) {
  const json = await readRootPackageJson();
  if (!json) return void 0;
  return {
    ...json.dependencies,
    ...json.devDependencies,
    ...json.peerDependencies
  }[pkg];
}
async function getNameFromLocalPackageJson() {
  return (await readRootPackageJson())?.name;
}
async function detectSystemInfo() {
  try {
    const cpus = os.cpus();
    return {
      deploymentVendor: getVendor(),
      systemPlatform: os.platform(),
      systemRelease: os.release(),
      systemArchitecture: os.arch(),
      cpuCount: cpus.length,
      cpuModel: cpus.length ? cpus[0].model : null,
      cpuSpeed: cpus.length ? cpus[0].speed : null,
      memory: os.totalmem(),
      isWSL: await isWsl(),
      isDocker: await isDocker(),
      isTTY: process.stdout ? process.stdout.isTTY : null
    };
  } catch {
    return {
      systemPlatform: null,
      systemRelease: null,
      systemArchitecture: null,
      cpuCount: null,
      cpuModel: null,
      cpuSpeed: null,
      memory: null,
      isWSL: null,
      isDocker: null,
      isTTY: null
    };
  }
}
function getVendor() {
  const env2 = process.env;
  const hasAny = (...keys) => keys.some((k) => Boolean(env2[k]));
  if (hasAny("CF_PAGES", "CF_PAGES_URL", "CF_ACCOUNT_ID") || isWorkerd()) return "cloudflare";
  if (hasAny("VERCEL", "VERCEL_URL", "VERCEL_ENV")) return "vercel";
  if (hasAny("NETLIFY", "NETLIFY_URL")) return "netlify";
  if (hasAny("RENDER", "RENDER_URL", "RENDER_INTERNAL_HOSTNAME", "RENDER_SERVICE_ID")) return "render";
  if (hasAny("AWS_LAMBDA_FUNCTION_NAME", "AWS_EXECUTION_ENV", "LAMBDA_TASK_ROOT")) return "aws";
  if (hasAny("GOOGLE_CLOUD_FUNCTION_NAME", "GOOGLE_CLOUD_PROJECT", "GCP_PROJECT", "K_SERVICE")) return "gcp";
  if (hasAny("AZURE_FUNCTION_NAME", "FUNCTIONS_WORKER_RUNTIME", "WEBSITE_INSTANCE_ID", "WEBSITE_SITE_NAME")) return "azure";
  if (hasAny("DENO_DEPLOYMENT_ID", "DENO_REGION")) return "deno-deploy";
  if (hasAny("FLY_APP_NAME", "FLY_REGION", "FLY_ALLOC_ID")) return "fly-io";
  if (hasAny("RAILWAY_STATIC_URL", "RAILWAY_ENVIRONMENT_NAME")) return "railway";
  if (hasAny("DYNO", "HEROKU_APP_NAME")) return "heroku";
  if (hasAny("DO_DEPLOYMENT_ID", "DO_APP_NAME", "DIGITALOCEAN")) return "digitalocean";
  if (hasAny("KOYEB", "KOYEB_DEPLOYMENT_ID", "KOYEB_APP_NAME")) return "koyeb";
  return null;
}
var isDockerCached;
async function hasDockerEnv() {
  try {
    fs.statSync("/.dockerenv");
    return true;
  } catch {
    return false;
  }
}
async function hasDockerCGroup() {
  try {
    return fs.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
  } catch {
    return false;
  }
}
async function isDocker() {
  if (isDockerCached === void 0) isDockerCached = await hasDockerEnv() || await hasDockerCGroup();
  return isDockerCached;
}
var isInsideContainerCached;
var hasContainerEnv = async () => {
  try {
    fs.statSync("/run/.containerenv");
    return true;
  } catch {
    return false;
  }
};
async function isInsideContainer() {
  if (isInsideContainerCached === void 0) isInsideContainerCached = await hasContainerEnv() || await isDocker();
  return isInsideContainerCached;
}
async function isWsl() {
  try {
    if (process.platform !== "linux") return false;
    if (os.release().toLowerCase().includes("microsoft")) {
      if (await isInsideContainer()) return false;
      return true;
    }
    return fs.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft") ? !await isInsideContainer() : false;
  } catch {
    return false;
  }
}
var projectIdCached = null;
async function getProjectId(baseUrl) {
  if (projectIdCached) return projectIdCached;
  const projectName = await getNameFromLocalPackageJson();
  if (projectName) {
    projectIdCached = await hashToBase64(baseUrl ? baseUrl + projectName : projectName);
    return projectIdCached;
  }
  if (baseUrl) {
    projectIdCached = await hashToBase64(baseUrl);
    return projectIdCached;
  }
  projectIdCached = generateId2(32);
  return projectIdCached;
}
async function detectDatabaseNode() {
  for (const [pkg, name] of Object.entries({
    pg: "postgresql",
    mysql: "mysql",
    mariadb: "mariadb",
    sqlite3: "sqlite",
    "better-sqlite3": "sqlite",
    "@prisma/client": "prisma",
    mongoose: "mongodb",
    mongodb: "mongodb",
    "drizzle-orm": "drizzle"
  })) {
    const version2 = await getPackageVersion(pkg);
    if (version2) return {
      name,
      version: version2
    };
  }
}
async function detectFrameworkNode() {
  for (const [pkg, name] of Object.entries({
    next: "next",
    nuxt: "nuxt",
    "react-router": "react-router",
    astro: "astro",
    "@sveltejs/kit": "sveltekit",
    "solid-start": "solid-start",
    "tanstack-start": "tanstack-start",
    hono: "hono",
    express: "express",
    elysia: "elysia",
    expo: "expo"
  })) {
    const version2 = await getPackageVersion(pkg);
    if (version2) return {
      name,
      version: version2
    };
  }
}
var noop = async function noop2() {
};
async function createTelemetry(options, context) {
  const debugEnabled = options.telemetry?.debug || getBooleanEnvVar("BETTER_AUTH_TELEMETRY_DEBUG", false);
  const telemetryEndpoint = ENV.BETTER_AUTH_TELEMETRY_ENDPOINT;
  if (!telemetryEndpoint && !context?.customTrack) return { publish: noop };
  const track = async (event) => {
    if (context?.customTrack) await context.customTrack(event).catch(logger.error);
    else if (telemetryEndpoint) {
      if (debugEnabled) logger.info("telemetry event", JSON.stringify(event, null, 2));
      else await betterFetch(telemetryEndpoint, {
        method: "POST",
        body: event
      }).catch(logger.error);
    }
  };
  const isEnabled = async () => {
    const telemetryEnabled = options.telemetry?.enabled !== void 0 ? options.telemetry.enabled : false;
    return (getBooleanEnvVar("BETTER_AUTH_TELEMETRY", false) || telemetryEnabled) && (context?.skipTestCheck || !isTest());
  };
  const enabled = await isEnabled();
  let anonymousId;
  if (enabled) anonymousId = await getProjectId(typeof options.baseURL === "string" ? options.baseURL : void 0).catch(() => void 0);
  if (anonymousId) track({
    type: "init",
    payload: {
      config: await getTelemetryAuthConfig(options, context),
      runtime: detectRuntime(),
      database: await detectDatabaseNode(),
      framework: await detectFrameworkNode(),
      environment: detectEnvironment(),
      systemInfo: await detectSystemInfo(),
      packageManager: detectPackageManager()
    },
    anonymousId
  });
  return { publish: async (event) => {
    if (!enabled) return;
    if (!anonymousId) anonymousId = await getProjectId(typeof options.baseURL === "string" ? options.baseURL : void 0);
    await track({
      type: event.type,
      payload: event.payload,
      anonymousId
    });
  } };
}

// node_modules/better-auth/dist/context/create-context.mjs
function estimateEntropy2(str) {
  const unique = new Set(str).size;
  if (unique === 0) return 0;
  return Math.log2(Math.pow(unique, str.length));
}
function validateSecret(secret, logger2) {
  const isDefaultSecret = secret === DEFAULT_SECRET;
  if (isTest()) return;
  if (isDefaultSecret && isProduction) throw new BetterAuthError("You are using the default secret. Please set `BETTER_AUTH_SECRET` in your environment variables or pass `secret` in your auth config.");
  if (!secret) throw new BetterAuthError("BETTER_AUTH_SECRET is missing. Set it in your environment or pass `secret` to betterAuth({ secret }).");
  if (secret.length < 32) logger2.warn(`[better-auth] Warning: your BETTER_AUTH_SECRET should be at least 32 characters long for adequate security. Generate one with \`npx auth secret\` or \`openssl rand -base64 32\`.`);
  if (estimateEntropy2(secret) < 120) logger2.warn("[better-auth] Warning: your BETTER_AUTH_SECRET appears low-entropy. Use a randomly generated secret for production.");
}
async function createAuthContext(adapter, options, getDatabaseType) {
  const isStateful2 = hasServerSessionStore(options);
  if (!isStateful2) options = defu(options, { session: { cookieCache: {
    enabled: true,
    strategy: "jwe",
    refreshCache: true,
    maxAge: options.session?.expiresIn || 604800
  } } });
  if (!options.database) options = defu(options, { account: { storeAccountCookie: true } });
  const plugins = options.plugins || [];
  const internalPlugins = getInternalPlugins(options);
  const logger2 = createLogger(options.logger);
  const isDynamicConfig = isDynamicBaseURLConfig(options.baseURL);
  if (isDynamicBaseURLConfig(options.baseURL)) {
    const { allowedHosts } = options.baseURL;
    if (!allowedHosts || allowedHosts.length === 0) throw new BetterAuthError('baseURL.allowedHosts cannot be empty. Provide at least one allowed host pattern (e.g., ["myapp.com", "*.vercel.app"]).');
  }
  const baseURL = isDynamicConfig ? void 0 : getBaseURL(typeof options.baseURL === "string" ? options.baseURL : void 0, options.basePath);
  if (!baseURL && !isDynamicConfig) logger2.warn(`[better-auth] Base URL is not set. Set the baseURL option or BETTER_AUTH_URL env, or use a dynamic baseURL with allowedHosts for multi-host setups. Without it the origin is derived from the incoming request, and callbacks and redirects may not work correctly.`);
  if (adapter.id === "memory" && options.advanced?.database?.generateId === false) logger2.error(`[better-auth] Misconfiguration detected.
You are using the memory DB with generateId: false.
This will cause no id to be generated for any model.
Most of the features of Better Auth will not work correctly.`);
  const secretsArray = options.secrets ?? parseSecretsEnv(env.BETTER_AUTH_SECRETS);
  const legacySecret = options.secret || env.BETTER_AUTH_SECRET || env.AUTH_SECRET || "";
  let secret;
  let secretConfig;
  if (secretsArray) {
    validateSecretsArray(secretsArray, logger2);
    secret = secretsArray[0].value;
    secretConfig = buildSecretConfig(secretsArray, legacySecret);
  } else {
    secret = legacySecret || "better-auth-secret-12345678901234567890";
    validateSecret(secret, logger2);
    secretConfig = secret;
  }
  options = {
    ...options,
    secret,
    baseURL: isDynamicConfig ? options.baseURL : baseURL ? new URL(baseURL).origin : "",
    basePath: options.basePath || "/api/auth",
    plugins: plugins.concat(internalPlugins)
  };
  checkEndpointConflicts(options, logger2);
  const trustedProxies = options.advanced?.ipAddress?.trustedProxies;
  if (trustedProxies && trustedProxies.length > 0) {
    const invalid2 = findInvalidTrustedProxies(trustedProxies);
    if (invalid2.length > 0) logger2.warn(`Ignoring invalid \`advanced.ipAddress.trustedProxies\` entries: ${invalid2.join(", ")}. Each entry must be an IP address or CIDR range.`);
  }
  const cookies = getCookies(options);
  const tables = getAuthTables(options);
  const providers = (await Promise.all(Object.entries(options.socialProviders || {}).map(async ([key, originalConfig]) => {
    const config2 = typeof originalConfig === "function" ? await originalConfig() : originalConfig;
    if (config2 == null) return null;
    if (config2.enabled === false) return null;
    if (!config2.clientId) logger2.warn(`Social provider ${key} is missing clientId or clientSecret`);
    const provider = socialProviders[key](config2);
    provider.disableImplicitSignUp = config2.disableImplicitSignUp;
    return provider;
  }))).filter((x) => x !== null);
  const generateIdFunc = ({ model, size }) => {
    if (typeof options.advanced?.generateId === "function") return options.advanced.generateId({
      model,
      size
    });
    const dbGenerateId = options?.advanced?.database?.generateId;
    if (typeof dbGenerateId === "function") return dbGenerateId({
      model,
      size
    });
    if (dbGenerateId === "uuid") return crypto.randomUUID();
    if (dbGenerateId === "serial" || dbGenerateId === false) return false;
    return generateId(size);
  };
  const { publish } = await createTelemetry(options, {
    adapter: adapter.id,
    database: typeof options.database === "function" ? "adapter" : getDatabaseType(options.database)
  });
  const pluginIds = new Set(options.plugins.map((p) => p.id));
  const getPluginFn = (id) => options.plugins.find((p) => p.id === id) ?? null;
  const hasPluginFn = (id) => pluginIds.has(id);
  const trustedOrigins = await getTrustedOrigins(options);
  const trustedProviders = await getTrustedProviders(options);
  const ctx = {
    appName: options.appName || "Better Auth",
    baseURL: baseURL || "",
    version: getBetterAuthVersion(),
    socialProviders: providers,
    options,
    oauthConfig: {
      storeStateStrategy: options.account?.storeStateStrategy || (isStateful2 ? "database" : "cookie"),
      skipStateCookieCheck: !!options.account?.skipStateCookieCheck
    },
    tables,
    trustedOrigins,
    trustedProviders,
    isTrustedOrigin(url, settings) {
      return this.trustedOrigins.some((origin) => matchesOriginPattern(url, origin, settings));
    },
    sessionConfig: {
      updateAge: options.session?.updateAge !== void 0 ? options.session.updateAge : 86400,
      expiresIn: options.session?.expiresIn || 604800,
      freshAge: options.session?.freshAge === void 0 ? 86400 : options.session.freshAge,
      cookieRefreshCache: (() => {
        const refreshCache = options.session?.cookieCache?.refreshCache;
        const maxAge = options.session?.cookieCache?.maxAge || 300;
        if (isStateful2 && refreshCache) {
          logger2.warn("[better-auth] `session.cookieCache.refreshCache` is enabled while `database` or `secondaryStorage` is configured. `refreshCache` is meant for stateless (DB-less) setups. Disabling `refreshCache` \u2014 remove it from your config to silence this warning.");
          return false;
        }
        if (refreshCache === false || refreshCache === void 0) return false;
        if (refreshCache === true) return {
          enabled: true,
          updateAge: Math.floor(maxAge * 0.2)
        };
        return {
          enabled: true,
          updateAge: refreshCache.updateAge !== void 0 ? refreshCache.updateAge : Math.floor(maxAge * 0.2)
        };
      })()
    },
    secret,
    secretConfig,
    rateLimit: {
      ...options.rateLimit,
      enabled: options.rateLimit?.enabled ?? isProduction,
      window: options.rateLimit?.window || 10,
      max: options.rateLimit?.max || 100,
      storage: options.rateLimit?.storage || (options.secondaryStorage ? "secondary-storage" : "memory")
    },
    authCookies: cookies,
    logger: logger2,
    generateId: generateIdFunc,
    session: null,
    secondaryStorage: options.secondaryStorage,
    password: {
      hash: options.emailAndPassword?.password?.hash || hashPassword$1,
      verify: options.emailAndPassword?.password?.verify || verifyPassword$1,
      config: {
        minPasswordLength: options.emailAndPassword?.minPasswordLength || 8,
        maxPasswordLength: options.emailAndPassword?.maxPasswordLength || 128
      },
      checkPassword
    },
    setNewSession(session) {
      this.newSession = session;
    },
    newSession: null,
    adapter,
    internalAdapter: createInternalAdapter(adapter, {
      options,
      logger: logger2,
      hooks: options.databaseHooks ? [{
        source: "user",
        hooks: options.databaseHooks
      }] : [],
      generateId: generateIdFunc
    }),
    createAuthCookie: createCookieGetter(options),
    async runMigrations() {
      throw new BetterAuthError("runMigrations will be set by the specific init implementation");
    },
    publishTelemetry: publish,
    skipCSRFCheck: !!options.advanced?.disableCSRFCheck,
    skipOriginCheck: options.advanced?.disableOriginCheck !== void 0 ? options.advanced.disableOriginCheck : isTest() ? true : false,
    runInBackground: options.advanced?.backgroundTasks?.handler ?? ((p) => {
      p.catch(() => {
      });
    }),
    async runInBackgroundOrAwait(promise) {
      try {
        if (options.advanced?.backgroundTasks?.handler) {
          if (promise instanceof Promise) options.advanced.backgroundTasks.handler(promise.catch((e) => {
            logger2.error("Failed to run background task:", e);
          }));
        } else await promise;
      } catch (e) {
        logger2.error("Failed to run background task:", e);
      }
    },
    getPlugin: getPluginFn,
    hasPlugin: hasPluginFn
  };
  const initOrPromise = runPluginInit(ctx);
  if (isPromise(initOrPromise)) await initOrPromise;
  ctx.checkSchema = runtimeSchemaCheckFor(ctx.adapter);
  ctx.explicitSchemaCheck = schemaCheckFor(ctx.adapter);
  return ctx;
}

// node_modules/better-auth/dist/context/init.mjs
var init = async (options) => {
  const adapter = await getAdapter(options);
  const getDatabaseType = (database) => getKyselyDatabaseType(database) || "unknown";
  const ctx = await createAuthContext(adapter, options, getDatabaseType);
  ctx.runMigrations = async function() {
    if (!options.database || "updateMany" in options.database) throw new BetterAuthError("Database is not provided or it's an adapter. Migrations are only supported with a database instance.");
    const { runMigrations } = await getMigrations(options);
    await runMigrations();
  };
  return ctx;
};

// node_modules/better-auth/dist/auth/base.mjs
var createBetterAuth = (options, initFn) => {
  const authContext = initFn(options).then((ctx) => {
    const validateSchema = ctx.options.advanced?.database?.validateSchema;
    if (!ctx.checkSchema && validateSchema !== false) {
      const level = validateSchema === true ? "warn" : "debug";
      ctx.logger[level](`Schema validation is not available for adapter "${ctx.adapter.id}". Skipping schema validation. Database operations will proceed normally.`);
    }
    return ctx;
  });
  const { api } = getEndpoints(authContext, options);
  const errorCodes = options.plugins?.reduce((acc, plugin) => {
    if (plugin.$ERROR_CODES) return {
      ...acc,
      ...plugin.$ERROR_CODES
    };
    return acc;
  }, {});
  const handler = async (request) => {
    const ctx = await authContext;
    const basePath = ctx.options.basePath || "/api/auth";
    let handlerCtx;
    if (isDynamicBaseURLConfig(options.baseURL)) handlerCtx = await resolveRequestContext(ctx, request, resolveDynamicTrustedProxyHeaders(ctx.options));
    else {
      handlerCtx = Object.create(Object.getPrototypeOf(ctx), Object.getOwnPropertyDescriptors(ctx));
      let trustOptions = ctx.options;
      if (!ctx.options.baseURL) {
        const baseURL = getBaseURL(void 0, basePath, request, void 0, ctx.options.advanced?.trustedProxyHeaders);
        if (!baseURL) throw new BetterAuthError("Could not get base URL from request. Please provide a valid base URL.");
        handlerCtx.baseURL = baseURL;
        handlerCtx.options = {
          ...ctx.options,
          baseURL: getOrigin(baseURL) || void 0
        };
        trustOptions = handlerCtx.options;
      }
      handlerCtx.trustedOrigins = await getTrustedOrigins(trustOptions, request);
      handlerCtx.trustedProviders = await getTrustedProviders(trustOptions, request);
    }
    const { handler: handler2 } = router(handlerCtx, options);
    return runWithAdapter(handlerCtx.adapter, () => handler2(request));
  };
  return {
    handler,
    fetch: handler,
    api,
    options,
    $context: authContext,
    $ERROR_CODES: {
      ...errorCodes,
      ...BASE_ERROR_CODES
    }
  };
};

// node_modules/better-auth/dist/auth/full.mjs
var betterAuth = (options) => {
  return createBetterAuth(options, init);
};

// node_modules/@better-auth/mongo-adapter/dist/index.mjs
import { MongoError, MongoErrorLabel, MongoNetworkError, MongoServerError, MongoServerSelectionError, ObjectId, UUID } from "mongodb";
function escapeForMongoRegex(input, maxLength = 256) {
  if (typeof input !== "string") return "";
  return input.slice(0, maxLength).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function insensitiveEq(field, value) {
  return { [field]: {
    $regex: `^${escapeForMongoRegex(value)}$`,
    $options: "i"
  } };
}
function insensitiveIn(field, values) {
  if (values.length === 0) return { $expr: { $eq: [1, 0] } };
  return { $or: values.map((v) => ({ [field]: {
    $regex: `^${escapeForMongoRegex(v)}$`,
    $options: "i"
  } })) };
}
function insensitiveNotIn(field, values) {
  if (values.length === 0) return {};
  return { $nor: values.map((v) => ({ [field]: {
    $regex: `^${escapeForMongoRegex(v)}$`,
    $options: "i"
  } })) };
}
function insensitiveNe(field, value) {
  return { [field]: { $not: {
    $regex: `^${escapeForMongoRegex(value)}$`,
    $options: "i"
  } } };
}
function insensitiveContains(field, value) {
  return { [field]: {
    $regex: `.*${escapeForMongoRegex(value)}.*`,
    $options: "i"
  } };
}
function insensitiveStartsWith(field, value) {
  return { [field]: {
    $regex: `^${escapeForMongoRegex(value)}`,
    $options: "i"
  } };
}
function insensitiveEndsWith(field, value) {
  return { [field]: {
    $regex: `${escapeForMongoRegex(value)}$`,
    $options: "i"
  } };
}
var MongoAdapterError = class extends Error {
  code;
  constructor(code, message2) {
    super(message2);
    this.code = code;
    this.name = "MongoAdapterError";
  }
};
var ABORT_SETTLED_CODES = /* @__PURE__ */ new Set([251, 256]);
async function abortTransactionCommand(client, session) {
  for (let attempt = 0; ; attempt++) try {
    await client.db("admin").command({ abortTransaction: 1 }, { session });
    return;
  } catch (abortError) {
    const code = abortError?.code;
    if (code !== void 0 && ABORT_SETTLED_CODES.has(code)) return;
    if (abortError instanceof MongoError && abortError.hasErrorLabel(MongoErrorLabel.RetryableWriteError) && attempt === 0) continue;
    logger.error("Failed to abort a MongoDB transaction whose commit did not complete", abortError);
    return;
  }
}
var INDEX_OPTIONS_CONFLICT = 85;
var INDEX_KEY_SPECS_CONFLICT = 86;
var DUPLICATE_KEY = 11e3;
var UNAUTHORIZED = 13;
var TRANSIENT_SERVER_CODES = /* @__PURE__ */ new Set([
  6,
  7,
  89,
  91,
  189,
  262,
  9001,
  10107,
  11600,
  11602,
  13435,
  13436
]);
var UNIQUE_VALUE_FILTERS = {
  string: { $gte: "" },
  number: { $gte: Number.NEGATIVE_INFINITY },
  date: { $gte: /* @__PURE__ */ new Date(-864e13) },
  boolean: { $type: "bool" }
};
var mongodbAdapter = (db2, config2) => {
  let lazyOptions;
  const indexSetupByDefinition = /* @__PURE__ */ new Map();
  const startedFieldIndexes = /* @__PURE__ */ new Set();
  const warnedFieldIndexes = /* @__PURE__ */ new Set();
  const pendingFieldIndexRetries = /* @__PURE__ */ new Set();
  const getCustomIdGenerator = (options) => {
    const generator2 = options.advanced?.database?.generateId;
    if (typeof generator2 === "function") return generator2;
  };
  const createCustomAdapter = (db3, session) => ({ getFieldAttributes, getFieldName, getModelName, schema: schema2, options }) => {
    const customIdGen = getCustomIdGenerator(options);
    const useUUIDs = options.advanced?.database?.generateId === "uuid";
    const resolvedIndexesByModel = /* @__PURE__ */ new Map();
    const getResolvedModelIndexes = (model, modelKey) => {
      const cachedIndexes = resolvedIndexesByModel.get(model);
      if (cachedIndexes) return cachedIndexes;
      const table2 = schema2[modelKey];
      const indexes = !table2 || table2.disableMigrations ? [] : resolveDatabaseTableIndexes({
        fields: table2.fields,
        indexes: table2.indexes,
        tableName: model
      });
      resolvedIndexesByModel.set(model, indexes);
      return indexes;
    };
    const getFieldIndexes = (modelKey) => {
      const model = getModelName(modelKey);
      const table2 = schema2[modelKey];
      if (!table2 || table2.disableMigrations) return [];
      const singleFieldTableIndexes = getResolvedModelIndexes(model, modelKey).filter((index) => index.columns.length === 1);
      const fieldIndexes2 = [];
      for (const [fieldName, field] of Object.entries(table2.fields)) {
        if (!field.unique && !field.index) continue;
        if (field.type === "json" || field.type === "string[]" || field.type === "number[]") continue;
        const column = field.fieldName || fieldName;
        if (column === "id") continue;
        const unique = field.unique === true;
        if (singleFieldTableIndexes.some((index) => index.columns[0] === column && (!unique || index.unique === true))) continue;
        let partialFilterExpression;
        if (unique && field.required === false) {
          const valueFilter = field.references?.field === "id" ? { $type: [
            "string",
            "objectId",
            "binData"
          ] } : UNIQUE_VALUE_FILTERS[Array.isArray(field.type) ? "string" : field.type];
          if (valueFilter === void 0) continue;
          partialFilterExpression = { [column]: valueFilter };
        }
        const name = getDatabaseFieldIndexName(model, column, unique);
        fieldIndexes2.push({
          key: JSON.stringify([
            model,
            name,
            column,
            unique,
            partialFilterExpression ?? null
          ]),
          model,
          name,
          column,
          unique,
          partialFilterExpression
        });
      }
      return fieldIndexes2;
    };
    const isEquivalentIndex = (existing, index) => existing.unique === true === index.unique && JSON.stringify(existing.partialFilterExpression ?? null) === JSON.stringify(index.partialFilterExpression ?? null);
    const describeFailure = (code, sameKeyIndexes) => {
      switch (code) {
        case UNAUTHORIZED:
          return "the database user is not allowed to create indexes. Grant it the createIndex action or create the index yourself, then restart the application.";
        case INDEX_OPTIONS_CONFLICT:
          return `the index ${sameKeyIndexes.map((existing) => `"${existing.name}"`).join(", ")} has the same key and different options. Drop it and restart the application.`;
        case INDEX_KEY_SPECS_CONFLICT:
          return "an index with that name and a different definition already exists. Drop or rename it and restart the application.";
        default:
          return "of a server error. It is not retried until the application restarts.";
      }
    };
    const ensureFieldIndex = (index) => {
      if (startedFieldIndexes.has(index.key)) return;
      startedFieldIndexes.add(index.key);
      const collection = db3.collection(index.model);
      const target = `"${index.name}" on ${index.model}.${index.column}`;
      const handleError = async (error2) => {
        if (error2 instanceof MongoNetworkError || error2 instanceof MongoServerSelectionError || error2 instanceof MongoServerError && TRANSIENT_SERVER_CODES.has(Number(error2.code))) {
          startedFieldIndexes.delete(index.key);
          pendingFieldIndexRetries.add(index.key);
          if (!warnedFieldIndexes.has(index.key)) {
            warnedFieldIndexes.add(index.key);
            logger.warn(`Could not create the MongoDB index ${target} yet. The next operation tries again.`, error2);
          }
          return;
        }
        if (!(error2 instanceof MongoServerError)) {
          logger.error(`Could not create the MongoDB index ${target} (${error2 instanceof Error ? error2.name : "unknown error"}). It is not retried until the application restarts.`);
          return;
        }
        const reason = `${error2.codeName ?? "MongoServerError"} ${error2.code}`;
        if (error2.code === DUPLICATE_KEY) {
          logger.error(`Could not create the unique MongoDB index ${target} because the collection already contains duplicate values (${reason}). Uniqueness is not enforced until the duplicates are removed and the application restarts.`);
          return;
        }
        const indexKey = JSON.stringify({ [index.column]: 1 });
        const sameKeyIndexes = await collection.listIndexes().toArray().then((indexes) => indexes.filter((candidate) => JSON.stringify(candidate.key) === indexKey), () => []);
        if (sameKeyIndexes.some((existing) => isEquivalentIndex(existing, index))) return;
        logger.error(`Could not create the MongoDB index ${target} (${reason}) because ${describeFailure(error2.code, sameKeyIndexes)}`);
      };
      Promise.resolve().then(() => collection.createIndex({ [index.column]: 1 }, {
        name: index.name,
        unique: index.unique,
        ...index.partialFilterExpression ? { partialFilterExpression: index.partialFilterExpression } : {},
        timeoutMS: 0
      })).catch(handleError).catch(() => void 0);
    };
    const fieldIndexes = session ? [] : Object.keys(schema2).flatMap(getFieldIndexes);
    for (const index of fieldIndexes) ensureFieldIndex(index);
    const retryFieldIndexSetup = () => {
      if (session || pendingFieldIndexRetries.size === 0) return;
      for (const index of fieldIndexes) if (pendingFieldIndexRetries.delete(index.key)) ensureFieldIndex(index);
    };
    const ensureModelIndexes = async (model, modelKey) => {
      const indexes = getResolvedModelIndexes(model, modelKey);
      await Promise.all(indexes.map((index) => {
        const physicalFieldNames = index.columns.map((fieldName) => fieldName === "id" ? "_id" : fieldName);
        const indexDefinition = JSON.stringify([
          model,
          index.name,
          physicalFieldNames,
          index.unique ?? false
        ]);
        const existingIndexSetup = indexSetupByDefinition.get(indexDefinition);
        if (existingIndexSetup !== void 0) return existingIndexSetup;
        const indexFields = Object.fromEntries(physicalFieldNames.map((field) => [field, 1]));
        const indexSetup = Promise.resolve().then(() => db3.collection(model).createIndex(indexFields, {
          name: index.name,
          unique: index.unique ?? false
        }));
        indexSetupByDefinition.set(indexDefinition, indexSetup);
        indexSetup.catch(() => {
          if (indexSetupByDefinition.get(indexDefinition) === indexSetup) indexSetupByDefinition.delete(indexDefinition);
        });
        return indexSetup;
      }));
    };
    function coerceToIdType(value) {
      if (useUUIDs) return new UUID(value);
      return new ObjectId(value);
    }
    function isIdInstance(value) {
      if (useUUIDs) return value instanceof UUID;
      return value instanceof ObjectId;
    }
    function serializeID({ field, value, model }) {
      if (customIdGen) return value;
      if (field === "id" || field === "_id" || schema2[model].fields[field]?.references?.field === "id") {
        if (value === null || value === void 0) return value;
        if (typeof value !== "string") {
          if (isIdInstance(value)) return value;
          if (Array.isArray(value)) return value.map((v) => {
            if (v === null || v === void 0) return v;
            if (typeof v === "string") try {
              return coerceToIdType(v);
            } catch {
              return v;
            }
            if (isIdInstance(v)) return v;
            throw new MongoAdapterError("INVALID_ID", "Invalid id value");
          });
          throw new MongoAdapterError("INVALID_ID", "Invalid id value");
        }
        try {
          return coerceToIdType(value);
        } catch {
          return value;
        }
      }
      return value;
    }
    function convertWhereClause({ where, modelKey }) {
      if (!where.length) return {};
      const conditions = where.map((w) => {
        const { field: field_, value, operator = "eq", connector = "AND", mode = "sensitive" } = w;
        let condition;
        let field = getFieldName({
          model: modelKey,
          field: field_
        });
        if (field === "id") field = "_id";
        const fieldAttributes = getFieldAttributes({
          model: modelKey,
          field: field_
        });
        const isInsensitive = !(field === "_id" || fieldAttributes?.references?.field === "id") && mode === "insensitive" && (typeof value === "string" || Array.isArray(value) && value.every((v) => typeof v === "string"));
        switch (operator.toLowerCase()) {
          case "eq":
            if (isInsensitive && typeof value === "string") condition = insensitiveEq(field, value);
            else condition = { [field]: serializeID({
              field,
              value,
              model: modelKey
            }) };
            break;
          case "in":
            if (isInsensitive && Array.isArray(value)) condition = insensitiveIn(field, value);
            else condition = { [field]: { $in: Array.isArray(value) ? value.map((v) => serializeID({
              field,
              value: v,
              model: modelKey
            })) : [serializeID({
              field,
              value,
              model: modelKey
            })] } };
            break;
          case "not_in":
            if (isInsensitive && Array.isArray(value)) condition = insensitiveNotIn(field, value);
            else condition = { [field]: { $nin: Array.isArray(value) ? value.map((v) => serializeID({
              field,
              value: v,
              model: modelKey
            })) : [serializeID({
              field,
              value,
              model: modelKey
            })] } };
            break;
          case "gt":
            condition = { [field]: { $gt: serializeID({
              field,
              value,
              model: modelKey
            }) } };
            break;
          case "gte":
            condition = { [field]: { $gte: serializeID({
              field,
              value,
              model: modelKey
            }) } };
            break;
          case "lt":
            condition = { [field]: { $lt: serializeID({
              field,
              value,
              model: modelKey
            }) } };
            break;
          case "lte":
            condition = { [field]: { $lte: serializeID({
              field,
              value,
              model: modelKey
            }) } };
            break;
          case "ne":
            if (isInsensitive && typeof value === "string") condition = insensitiveNe(field, value);
            else condition = { [field]: { $ne: serializeID({
              field,
              value,
              model: modelKey
            }) } };
            break;
          case "contains":
            condition = isInsensitive ? insensitiveContains(field, value) : { [field]: { $regex: `.*${escapeForMongoRegex(value)}.*` } };
            break;
          case "starts_with":
            condition = isInsensitive ? insensitiveStartsWith(field, value) : { [field]: { $regex: `^${escapeForMongoRegex(value)}` } };
            break;
          case "ends_with":
            condition = isInsensitive ? insensitiveEndsWith(field, value) : { [field]: { $regex: `${escapeForMongoRegex(value)}$` } };
            break;
          default:
            throw new MongoAdapterError("UNSUPPORTED_OPERATOR", `Unsupported operator: ${operator}`);
        }
        return {
          condition,
          connector
        };
      });
      if (conditions.length === 1) return conditions[0].condition;
      const andConditions = conditions.filter((c) => c.connector === "AND").map((c) => c.condition);
      const orConditions = conditions.filter((c) => c.connector === "OR").map((c) => c.condition);
      let clause = {};
      if (andConditions.length) clause = {
        ...clause,
        $and: andConditions
      };
      if (orConditions.length) clause = {
        ...clause,
        $or: orConditions
      };
      return clause;
    }
    return {
      async create({ model, modelKey = model, data: values }) {
        retryFieldIndexSetup();
        await ensureModelIndexes(model, modelKey);
        return {
          _id: (await db3.collection(model).insertOne(values, { session })).insertedId.toString(),
          ...values
        };
      },
      async findOne({ model, modelKey = model, where, select, join }) {
        retryFieldIndexSetup();
        const pipeline = [where ? { $match: convertWhereClause({
          where,
          modelKey
        }) } : { $match: {} }];
        if (join) for (const [joinedModel, joinConfig] of Object.entries(join)) {
          const localField = getFieldName({
            field: joinConfig.on.from,
            model: modelKey
          });
          const foreignField = getFieldName({
            field: joinConfig.on.to,
            model: joinConfig.modelKey ?? joinedModel
          });
          const localFieldName = localField === "id" ? "_id" : localField;
          const foreignFieldName = foreignField === "id" ? "_id" : foreignField;
          const isUnique = schema2[joinConfig.modelKey ?? joinedModel]?.fields[joinConfig.on.to]?.unique === true;
          const shouldLimit = !isUnique && joinConfig.limit !== void 0;
          const limit = joinConfig.limit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
          if (shouldLimit && limit > 0) {
            const foreignFieldRef = `$${foreignFieldName}`;
            pipeline.push({ $lookup: {
              from: joinedModel,
              let: { localFieldValue: `$${localFieldName}` },
              pipeline: [{ $match: { $expr: { $eq: [foreignFieldRef, "$$localFieldValue"] } } }, { $limit: limit }],
              as: joinedModel
            } });
          } else pipeline.push({ $lookup: {
            from: joinedModel,
            localField: localFieldName,
            foreignField: foreignFieldName,
            as: joinedModel
          } });
          if (isUnique) pipeline.push({ $unwind: {
            path: `$${joinedModel}`,
            preserveNullAndEmptyArrays: true
          } });
        }
        if (select) {
          const projection = {};
          select.forEach((field) => {
            projection[getFieldName({
              field,
              model: modelKey
            })] = 1;
          });
          if (join) for (const joinedModel of Object.keys(join)) projection[joinedModel] = 1;
          pipeline.push({ $project: projection });
        }
        pipeline.push({ $limit: 1 });
        const res = await db3.collection(model).aggregate(pipeline, { session }).toArray();
        if (!res || res.length === 0) return null;
        return res[0];
      },
      async findMany({ model, modelKey = model, where, limit, select, offset, sortBy, join }) {
        retryFieldIndexSetup();
        const pipeline = [where ? { $match: convertWhereClause({
          where,
          modelKey
        }) } : { $match: {} }];
        if (join) for (const [joinedModel, joinConfig] of Object.entries(join)) {
          const localField = getFieldName({
            field: joinConfig.on.from,
            model: modelKey
          });
          const foreignField = getFieldName({
            field: joinConfig.on.to,
            model: joinConfig.modelKey ?? joinedModel
          });
          const localFieldName = localField === "id" ? "_id" : localField;
          const foreignFieldName = foreignField === "id" ? "_id" : foreignField;
          const isUnique = getFieldAttributes({
            model: joinConfig.modelKey ?? joinedModel,
            field: joinConfig.on.to
          })?.unique === true;
          const shouldLimit = joinConfig.relation !== "one-to-one" && joinConfig.limit !== void 0;
          const limit2 = joinConfig.limit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
          if (shouldLimit && limit2 > 0) {
            const foreignFieldRef = `$${foreignFieldName}`;
            pipeline.push({ $lookup: {
              from: joinedModel,
              let: { localFieldValue: `$${localFieldName}` },
              pipeline: [{ $match: { $expr: { $eq: [foreignFieldRef, "$$localFieldValue"] } } }, { $limit: limit2 }],
              as: joinedModel
            } });
          } else pipeline.push({ $lookup: {
            from: joinedModel,
            localField: localFieldName,
            foreignField: foreignFieldName,
            as: joinedModel
          } });
          if (isUnique) pipeline.push({ $unwind: {
            path: `$${joinedModel}`,
            preserveNullAndEmptyArrays: true
          } });
        }
        if (select?.length && select.length > 0) {
          const projection = {};
          select.forEach((field) => {
            projection[getFieldName({
              field,
              model: modelKey
            })] = 1;
          });
          if (join) for (const joinedModel of Object.keys(join)) projection[joinedModel] = 1;
          pipeline.push({ $project: projection });
        }
        if (sortBy) {
          const sortField = getFieldName({
            field: sortBy.field,
            model: modelKey
          });
          pipeline.push({ $sort: { [sortField === "id" ? "_id" : sortField]: sortBy.direction === "desc" ? -1 : 1 } });
        }
        if (offset) pipeline.push({ $skip: offset });
        if (limit) pipeline.push({ $limit: limit });
        return await db3.collection(model).aggregate(pipeline, { session }).toArray();
      },
      async count({ model, modelKey = model, where }) {
        retryFieldIndexSetup();
        const pipeline = [where ? { $match: convertWhereClause({
          where,
          modelKey
        }) } : { $match: {} }, { $count: "total" }];
        const res = await db3.collection(model).aggregate(pipeline, { session }).toArray();
        if (!res || res.length === 0) return 0;
        return res[0]?.total ?? 0;
      },
      async update({ model, modelKey = model, where, update: values }) {
        retryFieldIndexSetup();
        await ensureModelIndexes(model, modelKey);
        const clause = convertWhereClause({
          where,
          modelKey
        });
        const doc = (await db3.collection(model).findOneAndUpdate(clause, { $set: values }, {
          session,
          returnDocument: "after",
          includeResultMetadata: true
        }))?.value ?? null;
        if (!doc) return null;
        return doc;
      },
      async updateMany({ model, modelKey = model, where, update: values }) {
        retryFieldIndexSetup();
        await ensureModelIndexes(model, modelKey);
        const clause = convertWhereClause({
          where,
          modelKey
        });
        return (await db3.collection(model).updateMany(clause, { $set: values }, { session })).modifiedCount;
      },
      async delete({ model, modelKey = model, where }) {
        retryFieldIndexSetup();
        const clause = convertWhereClause({
          where,
          modelKey
        });
        await db3.collection(model).deleteOne(clause, { session });
      },
      async deleteMany({ model, modelKey = model, where }) {
        retryFieldIndexSetup();
        const clause = convertWhereClause({
          where,
          modelKey
        });
        return (await db3.collection(model).deleteMany(clause, { session })).deletedCount;
      },
      async consumeOne({ model, modelKey = model, where }) {
        retryFieldIndexSetup();
        const clause = convertWhereClause({
          where,
          modelKey
        });
        return (await db3.collection(model).findOneAndDelete(clause, {
          session,
          includeResultMetadata: true
        }))?.value ?? null;
      },
      async incrementOne({ model, modelKey = model, where, increment, set }) {
        retryFieldIndexSetup();
        await ensureModelIndexes(model, modelKey);
        const clause = convertWhereClause({
          where,
          modelKey
        });
        const update = {};
        if (Object.keys(increment).length > 0) update.$inc = increment;
        if (set && Object.keys(set).length > 0) update.$set = set;
        if (!update.$inc && !update.$set) return db3.collection(model).findOne(clause, { session });
        return (await db3.collection(model).findOneAndUpdate(clause, update, {
          session,
          returnDocument: "after",
          includeResultMetadata: true
        }))?.value ?? null;
      }
    };
  };
  let lazyAdapter = null;
  let adapterOptions = null;
  adapterOptions = {
    config: {
      adapterId: "mongodb-adapter",
      adapterName: "MongoDB Adapter",
      usePlural: config2?.usePlural ?? false,
      debugLogs: config2?.debugLogs ?? false,
      mapKeysTransformInput: { id: "_id" },
      mapKeysTransformOutput: { _id: "id" },
      supportsArrays: true,
      supportsNumericIds: false,
      transaction: config2?.client && (config2?.transaction ?? true) ? async (cb) => {
        if (!config2.client) return cb(lazyAdapter(lazyOptions));
        const session = config2.client.startSession();
        let commitAttempted = false;
        try {
          const adapter = createAdapterFactory({
            config: {
              ...adapterOptions.config,
              transaction: false
            },
            adapter: createCustomAdapter(db2, session)
          })(lazyOptions);
          return await session.withTransaction(async () => {
            commitAttempted = false;
            const result = await cb(adapter);
            commitAttempted = true;
            return result;
          });
        } catch (err) {
          if (commitAttempted) await abortTransactionCommand(config2.client, session);
          throw err;
        } finally {
          await session.endSession();
        }
      } : false,
      customTransformInput({ action, data, field, fieldAttributes, schema: schema2, model, options }) {
        const customIdGen = getCustomIdGenerator(options);
        if (field === "_id" || fieldAttributes.references?.field === "id") {
          if (customIdGen) return data;
          if (action !== "create" && action !== "update") return data;
          const IdClass = options.advanced?.database?.generateId === "uuid" ? UUID : ObjectId;
          if (data instanceof IdClass) return data;
          if (Array.isArray(data)) return data.map((v) => {
            if (typeof v === "string") try {
              return new IdClass(v);
            } catch {
              return v;
            }
            return v;
          });
          if (typeof data === "string") try {
            return new IdClass(data);
          } catch {
            return data;
          }
          if (fieldAttributes?.references?.field === "id" && !fieldAttributes?.required && data === null) return null;
          if (action === "update") return data;
          return new IdClass();
        }
        return data;
      },
      customTransformOutput({ data, field, fieldAttributes }) {
        if (field === "id" || fieldAttributes.references?.field === "id") {
          if (data instanceof UUID) return data.toString();
          if (data instanceof ObjectId) return data.toHexString();
          if (Array.isArray(data)) return data.map((v) => {
            if (v instanceof UUID) return v.toString();
            if (v instanceof ObjectId) return v.toHexString();
            return v;
          });
          return data;
        }
        return data;
      },
      customIdGenerator() {
        return new ObjectId().toString();
      }
    },
    adapter: createCustomAdapter(db2)
  };
  lazyAdapter = createAdapterFactory(adapterOptions);
  return (options) => {
    lazyOptions = options;
    return lazyAdapter(options);
  };
};

// node_modules/better-auth/dist/package.mjs
var version = "1.7.26";

// node_modules/better-auth/dist/version.mjs
var PACKAGE_VERSION = version;

// node_modules/better-auth/dist/plugins/bearer/index.mjs
var BEARER_SCHEME = "bearer ";
function tryDecode3(str) {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}
var bearer = (options) => {
  return {
    id: "bearer",
    version: PACKAGE_VERSION,
    hooks: {
      before: [{
        matcher(context) {
          return Boolean(context.request?.headers.get("authorization") || context.headers?.get("authorization"));
        },
        handler: createAuthMiddleware(async (c) => {
          const authHeader = c.request?.headers.get("authorization") || c.headers?.get("Authorization");
          if (!authHeader) return;
          if (authHeader.slice(0, 7).toLowerCase() !== BEARER_SCHEME) return;
          const token = authHeader.slice(7).trim();
          if (!token) return;
          let decodedToken;
          if (token.includes(".")) decodedToken = token.includes("%") ? tryDecode3(token) : token;
          else {
            if (options?.requireSignature) return;
            decodedToken = tryDecode3((await serializeSignedCookie("", token, c.context.secret)).replace("=", ""));
          }
          try {
            if (!await createHMAC("SHA-256", "base64urlnopad").verify(c.context.secret, decodedToken.split(".")[0], decodedToken.split(".")[1])) return;
          } catch {
            return;
          }
          const existingHeaders = c.request?.headers || c.headers;
          const headers = new Headers({ ...Object.fromEntries(existingHeaders?.entries()) });
          setRequestCookie(headers, c.context.authCookies.sessionToken.name, decodedToken);
          return { context: { headers } };
        })
      }],
      after: [{
        matcher(context) {
          return true;
        },
        handler: createAuthMiddleware(async (ctx) => {
          const setCookie = ctx.context.responseHeaders?.get("set-cookie");
          if (!setCookie) return;
          const parsedCookies = parseSetCookieHeader(setCookie);
          const cookieName = ctx.context.authCookies.sessionToken.name;
          const sessionCookie = parsedCookies.get(cookieName);
          if (!sessionCookie || !sessionCookie.value || sessionCookie["max-age"] === 0) return;
          const token = sessionCookie.value;
          const exposedHeaders = ctx.context.responseHeaders?.get("access-control-expose-headers") || "";
          const headersSet = new Set(exposedHeaders.split(",").map((header) => header.trim()).filter(Boolean));
          headersSet.add("set-auth-token");
          ctx.setHeader("set-auth-token", token);
          ctx.setHeader("Access-Control-Expose-Headers", Array.from(headersSet).join(", "));
        })
      }]
    },
    options
  };
};

// src/config/auth.ts
import bcrypt from "bcryptjs";
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
}
var mongoUri = process.env.MONGODB_URI || "mongodb+srv://fahadhossain04_db_user:taY4IFn2PrqN6Kak@cluster0.ulcxjyj.mongodb.net/salonbook?retryWrites=true&w=majority";
var mongoClient = new MongoClient(mongoUri);
var db = mongoClient.db();
var clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
var serverUrl = process.env.BETTER_AUTH_URL || (process.env.NODE_ENV === "production" ? "https://salonbook-api.vercel.app" : "http://localhost:5000");
var auth = betterAuth({
  database: mongodbAdapter(db, {
    client: mongoClient
  }),
  user: {
    modelName: "users",
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "customer",
        input: false
      },
      isBlocked: {
        type: "boolean",
        defaultValue: false,
        input: false
      },
      phone: {
        type: "string",
        defaultValue: "",
        input: true
      }
    }
  },
  session: {
    modelName: "sessions",
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24
  },
  account: {
    modelName: "accounts"
  },
  verification: {
    modelName: "verifications"
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => bcrypt.hash(password, 10),
      verify: async ({ hash, password }) => bcrypt.compare(password, hash)
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              role: "customer",
              isBlocked: false
            }
          };
        }
      }
    }
  },
  plugins: [bearer()],
  baseURL: serverUrl,
  secret: process.env.BETTER_AUTH_SECRET || "salonbook_better_auth_secret_key_production_2026_secure",
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://salonbook-booking.vercel.app",
    clientUrl
  ].filter(Boolean)
});

// src/routes/authRoutes.ts
import express, { Router } from "express";

// src/models/User.ts
import mongoose, { Schema } from "mongoose";
var UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    password: {
      type: String,
      select: false
    },
    image: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
      index: true
    },
    isBlocked: {
      type: Boolean,
      default: false,
      index: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);
var User = mongoose.models.User || mongoose.model("User", UserSchema);

// src/config/db.ts
import dns2 from "dns";
import mongoose2 from "mongoose";
try {
  dns2.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
}
var cached = global.mongooseCache;
if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}
async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is missing");
  }
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5e3
    };
    cached.promise = mongoose2.connect(uri, opts).then((m) => {
      console.log("MongoDB successfully connected");
      return m;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}

// src/controllers/authController.ts
var PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
async function signUp(req, res) {
  try {
    const { name, email: email2, password, image, phone } = req.body;
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res.status(400).json({ success: false, message: "Full name is required." });
      return;
    }
    if (!email2 || typeof email2 !== "string" || !/^\S+@\S+\.\S+$/.test(email2)) {
      res.status(400).json({ success: false, message: "Valid email address is required." });
      return;
    }
    if (!password || typeof password !== "string" || !PASSWORD_REGEX.test(password)) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter."
      });
      return;
    }
    const signUpRes = await auth.api.signUpEmail({
      body: {
        name: name.trim(),
        email: email2.toLowerCase().trim(),
        password,
        image: typeof image === "string" ? image.trim() : "",
        phone: typeof phone === "string" ? phone.trim() : ""
      },
      headers: fromNodeHeaders(req.headers)
    });
    if (!signUpRes?.user) {
      res.status(400).json({ success: false, message: "Failed to create user account." });
      return;
    }
    res.status(201).json({
      success: true,
      message: "Account registered successfully.",
      token: signUpRes.token || "",
      user: {
        id: signUpRes.user.id,
        _id: signUpRes.user.id,
        name: signUpRes.user.name,
        email: signUpRes.user.email,
        image: signUpRes.user.image,
        phone: signUpRes.user.phone || "",
        role: signUpRes.user.role || "customer",
        isBlocked: signUpRes.user.isBlocked || false
      }
    });
  } catch (error2) {
    console.error("Better Auth sign-up error:", error2);
    res.status(error2.statusCode || 400).json({
      success: false,
      message: error2.message || "Failed to create account."
    });
  }
}
async function signIn(req, res) {
  try {
    const { email: email2, password } = req.body;
    if (!email2 || !password) {
      res.status(400).json({ success: false, message: "Email and password are required." });
      return;
    }
    const signInRes = await auth.api.signInEmail({
      body: {
        email: email2.toLowerCase().trim(),
        password
      },
      headers: fromNodeHeaders(req.headers)
    });
    if (!signInRes?.user) {
      res.status(401).json({ success: false, message: "Invalid credentials." });
      return;
    }
    if (signInRes.user.isBlocked) {
      res.status(403).json({
        success: false,
        message: "Your account has been suspended by salon administration."
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Signed in successfully.",
      token: signInRes.token || "",
      user: {
        id: signInRes.user.id,
        _id: signInRes.user.id,
        name: signInRes.user.name,
        email: signInRes.user.email,
        image: signInRes.user.image,
        phone: signInRes.user.phone || "",
        role: signInRes.user.role || "customer",
        isBlocked: signInRes.user.isBlocked || false
      }
    });
  } catch (error2) {
    console.error("Better Auth sign-in error:", error2);
    const status = error2.statusCode || 401;
    res.status(status).json({
      success: false,
      message: error2.message || "Invalid email or password."
    });
  }
}
async function googleTokenAuth(req, res) {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      res.status(400).json({ success: false, message: "Google ID token is required." });
      return;
    }
    const signInRes = await auth.api.signInSocial({
      body: {
        provider: "google",
        idToken: {
          token: idToken
        }
      },
      headers: fromNodeHeaders(req.headers)
    });
    if (!("user" in signInRes) || !signInRes.user) {
      res.status(401).json({ success: false, message: "Google authentication failed." });
      return;
    }
    const authUser = signInRes.user;
    if (authUser.isBlocked) {
      res.status(403).json({
        success: false,
        message: "Your account has been suspended by salon administration."
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Google authentication successful.",
      token: signInRes.token || "",
      user: {
        id: authUser.id,
        _id: authUser.id,
        name: authUser.name,
        email: authUser.email,
        image: authUser.image,
        phone: authUser.phone || "",
        role: authUser.role || "customer",
        isBlocked: authUser.isBlocked || false
      }
    });
  } catch (error2) {
    console.error("Google token auth error:", error2);
    res.status(400).json({
      success: false,
      message: error2.message || "Google authentication failed."
    });
  }
}
async function getMe(req, res) {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "User not authenticated" });
      return;
    }
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id || req.user.id,
        _id: req.user._id || req.user.id,
        name: req.user.name,
        email: req.user.email,
        image: req.user.image || "",
        phone: req.user.phone || "",
        role: req.user.role || "customer",
        isBlocked: req.user.isBlocked || false
      }
    });
  } catch (error2) {
    console.error("Get profile error:", error2);
    res.status(500).json({ success: false, message: "Failed to retrieve profile" });
  }
}
async function updateProfile(req, res) {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }
    await connectDB();
    const { name, phone, image } = req.body;
    const userId = req.user._id || req.user.id;
    const updated = await User.findByIdAndUpdate(
      userId,
      {
        ...typeof name === "string" && name.trim() ? { name: name.trim() } : {},
        ...typeof phone === "string" ? { phone: phone.trim() } : {},
        ...typeof image === "string" ? { image: image.trim() } : {}
      },
      { new: true, runValidators: true }
    );
    if (!updated) {
      res.status(404).json({ success: false, message: "User account not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updated._id,
        _id: updated._id,
        name: updated.name,
        email: updated.email,
        image: updated.image,
        phone: updated.phone,
        role: updated.role,
        isBlocked: updated.isBlocked
      }
    });
  } catch (error2) {
    console.error("Update profile error:", error2);
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
}

// src/middleware/auth.ts
async function authenticate(req, res, next) {
  try {
    const headers = fromNodeHeaders(req.headers);
    const session = await auth.api.getSession({
      headers
    });
    if (!session || !session.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required. Active session not found."
      });
      return;
    }
    if (session.user.isBlocked) {
      res.status(403).json({
        success: false,
        message: "Your account has been suspended by salon administration."
      });
      return;
    }
    const userId = session.user.id || session.user._id;
    req.user = {
      ...session.user,
      _id: userId,
      id: userId
    };
    req.tokenPayload = {
      id: userId,
      email: session.user.email,
      role: session.user.role || "customer"
    };
    next();
  } catch (error2) {
    console.error("Better Auth session verification error:", error2);
    res.status(500).json({
      success: false,
      message: "Internal authentication verification error."
    });
  }
}

// src/routes/authRoutes.ts
var router2 = Router();
var jsonParser = express.json({ limit: "5mb" });
router2.post("/sign-up", jsonParser, signUp);
router2.post("/sign-in", jsonParser, signIn);
router2.post("/google-token", jsonParser, googleTokenAuth);
router2.get("/me", authenticate, getMe);
router2.put("/profile", jsonParser, authenticate, updateProfile);
var authRoutes_default = router2;

// src/routes/uploadRoutes.ts
import { Router as Router2 } from "express";

// src/services/imgbb.ts
async function uploadToImgBB(fileBuffer, fileName) {
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error("IMGBB_API_KEY environment variable is not configured");
  }
  const base64Data = fileBuffer.toString("base64");
  const formData = new URLSearchParams();
  formData.append("image", base64Data);
  if (fileName) {
    formData.append("name", fileName);
  }
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData.toString()
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || "Failed to upload image to ImgBB");
  }
  return data.data.url;
}

// src/controllers/uploadController.ts
async function handleImageUpload(req, res) {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: "No image file uploaded" });
      return;
    }
    const imageUrl = await uploadToImgBB(req.file.buffer, req.file.originalname);
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      url: imageUrl
    });
  } catch (error2) {
    console.error("Image upload error:", error2);
    res.status(500).json({
      success: false,
      message: error2.message || "Image upload failed"
    });
  }
}

// src/middleware/upload.ts
import multer from "multer";
var storage = multer.memoryStorage();
var upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  }
});

// src/routes/uploadRoutes.ts
var router3 = Router2();
router3.post("/", upload.single("image"), handleImageUpload);
var uploadRoutes_default = router3;

// src/routes/serviceRoutes.ts
import { Router as Router3 } from "express";

// src/models/Service.ts
import mongoose3, { Schema as Schema2 } from "mongoose";
var SERVICE_CATEGORIES = [
  "Haircut & Styling",
  "Hair Coloring",
  "Hair Treatment",
  "Facial & Skincare",
  "Makeup",
  "Manicure & Pedicure",
  "Spa & Massage"
];
var ServiceSchema = new Schema2(
  {
    serviceName: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      index: true
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: SERVICE_CATEGORIES,
      index: true
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be greater than 0"],
      index: true
    },
    duration: {
      type: Number,
      required: [true, "Duration in minutes is required"],
      min: [5, "Duration must be at least 5 minutes"]
    },
    image: {
      type: String,
      required: [true, "Service image is required"],
      trim: true
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);
var Service = mongoose3.models.Service || mongoose3.model("Service", ServiceSchema);

// src/controllers/serviceController.ts
var BROKEN_404_IMAGE = "photo-1512290900672-1f416d860d5b";
var VERIFIED_FACIAL_IMAGE = "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=80";
function sanitizeServiceImage(service) {
  if (service && service.image && service.image.includes(BROKEN_404_IMAGE)) {
    service.image = VERIFIED_FACIAL_IMAGE;
    Service.updateOne({ _id: service._id }, { image: VERIFIED_FACIAL_IMAGE }).exec().catch(() => {
    });
  }
  return service;
}
async function getActiveServices(req, res) {
  try {
    await connectDB();
    const { search, category, sort, limit, page } = req.query;
    const query = {
      status: "active"
    };
    if (search && typeof search === "string" && search.trim() !== "") {
      query.serviceName = { $regex: search.trim(), $options: "i" };
    }
    if (category && typeof category === "string" && category.trim() !== "" && category !== "all") {
      query.category = category.trim();
    }
    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") {
      sortOption = { price: 1 };
    } else if (sort === "price_desc") {
      sortOption = { price: -1 };
    }
    const totalCount = await Service.countDocuments(query);
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = parseInt(limit, 10);
    let serviceQuery = Service.find(query).sort(sortOption);
    if (!isNaN(limitNum) && limitNum > 0) {
      serviceQuery = serviceQuery.skip((pageNum - 1) * limitNum).limit(limitNum);
    }
    const services = await serviceQuery.exec();
    services.forEach(sanitizeServiceImage);
    const totalPages = !isNaN(limitNum) && limitNum > 0 ? Math.ceil(totalCount / limitNum) : 1;
    res.status(200).json({
      success: true,
      count: services.length,
      totalCount,
      currentPage: pageNum,
      totalPages,
      data: services
    });
  } catch (error2) {
    console.error("Get active services error:", error2);
    res.status(500).json({ success: false, message: "Failed to retrieve services" });
  }
}
async function getServiceById(req, res) {
  try {
    await connectDB();
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      res.status(404).json({ success: false, message: "Service not found" });
      return;
    }
    sanitizeServiceImage(service);
    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error2) {
    console.error("Get service by id error:", error2);
    res.status(500).json({ success: false, message: "Invalid service identifier" });
  }
}
async function getAllServicesAdmin(_req, res) {
  try {
    await connectDB();
    const services = await Service.find().sort({ createdAt: -1 });
    services.forEach(sanitizeServiceImage);
    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error2) {
    console.error("Admin get services error:", error2);
    res.status(500).json({ success: false, message: "Failed to fetch services list" });
  }
}
async function createService(req, res) {
  try {
    await connectDB();
    const { serviceName, category, description, price, duration, image, status } = req.body;
    if (!serviceName || typeof serviceName !== "string" || serviceName.trim().length === 0) {
      res.status(400).json({ success: false, message: "Service name is required" });
      return;
    }
    if (!category || !SERVICE_CATEGORIES.includes(category)) {
      res.status(400).json({
        success: false,
        message: `Valid category is required. Options: ${SERVICE_CATEGORIES.join(", ")}`
      });
      return;
    }
    if (!description || typeof description !== "string" || description.trim().length === 0) {
      res.status(400).json({ success: false, message: "Description is required" });
      return;
    }
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      res.status(400).json({ success: false, message: "Price must be greater than 0" });
      return;
    }
    const parsedDuration = Number(duration);
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      res.status(400).json({ success: false, message: "Duration must be greater than 0 minutes" });
      return;
    }
    if (!image || typeof image !== "string" || !image.trim().startsWith("http")) {
      res.status(400).json({
        success: false,
        message: "A valid hosted image URL from ImgBB is required"
      });
      return;
    }
    const newService = await Service.create({
      serviceName: serviceName.trim(),
      category,
      description: description.trim(),
      price: parsedPrice,
      duration: parsedDuration,
      image: image.trim(),
      status: status === "inactive" ? "inactive" : "active"
    });
    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: newService
    });
  } catch (error2) {
    console.error("Create service error:", error2);
    res.status(500).json({ success: false, message: "Failed to create salon service" });
  }
}
async function updateService(req, res) {
  try {
    await connectDB();
    const { id } = req.params;
    const { serviceName, category, description, price, duration, image, status } = req.body;
    const service = await Service.findById(id);
    if (!service) {
      res.status(404).json({ success: false, message: "Service not found" });
      return;
    }
    if (serviceName !== void 0) service.serviceName = serviceName.trim();
    if (category !== void 0) {
      if (!SERVICE_CATEGORIES.includes(category)) {
        res.status(400).json({ success: false, message: "Invalid category" });
        return;
      }
      service.category = category;
    }
    if (description !== void 0) service.description = description.trim();
    if (price !== void 0) {
      const p = Number(price);
      if (isNaN(p) || p <= 0) {
        res.status(400).json({ success: false, message: "Price must be greater than 0" });
        return;
      }
      service.price = p;
    }
    if (duration !== void 0) {
      const d = Number(duration);
      if (isNaN(d) || d <= 0) {
        res.status(400).json({ success: false, message: "Duration must be greater than 0" });
        return;
      }
      service.duration = d;
    }
    if (image !== void 0) service.image = image.trim();
    if (status !== void 0 && (status === "active" || status === "inactive")) {
      service.status = status;
    }
    await service.save();
    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service
    });
  } catch (error2) {
    console.error("Update service error:", error2);
    res.status(500).json({ success: false, message: "Failed to update service" });
  }
}
async function toggleServiceStatus(req, res) {
  try {
    await connectDB();
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      res.status(404).json({ success: false, message: "Service not found" });
      return;
    }
    service.status = service.status === "active" ? "inactive" : "active";
    await service.save();
    res.status(200).json({
      success: true,
      message: `Service status updated to ${service.status}`,
      data: service
    });
  } catch (error2) {
    console.error("Toggle status error:", error2);
    res.status(500).json({ success: false, message: "Failed to toggle service status" });
  }
}
async function deleteService(req, res) {
  try {
    await connectDB();
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      res.status(404).json({ success: false, message: "Service not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Service removed successfully"
    });
  } catch (error2) {
    console.error("Delete service error:", error2);
    res.status(500).json({ success: false, message: "Failed to delete service" });
  }
}

// src/middleware/role.ts
function requireAdmin(req, res, next) {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required"
    });
    return;
  }
  if (req.user.role !== "admin") {
    res.status(403).json({
      success: false,
      message: "Access restricted to salon administrators only"
    });
    return;
  }
  next();
}
function requireCustomer(req, res, next) {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required"
    });
    return;
  }
  if (req.user.role !== "customer") {
    res.status(403).json({
      success: false,
      message: "Administrative accounts cannot submit customer bookings"
    });
    return;
  }
  next();
}

// src/routes/serviceRoutes.ts
var router4 = Router3();
router4.get("/", getActiveServices);
router4.get("/detail/:id", getServiceById);
router4.get("/admin/all", authenticate, requireAdmin, getAllServicesAdmin);
router4.post("/", authenticate, requireAdmin, createService);
router4.put("/:id", authenticate, requireAdmin, updateService);
router4.patch("/:id/status", authenticate, requireAdmin, toggleServiceStatus);
router4.delete("/:id", authenticate, requireAdmin, deleteService);
var serviceRoutes_default = router4;

// src/routes/appointmentRoutes.ts
import { Router as Router4 } from "express";

// src/models/Appointment.ts
import mongoose4, { Schema as Schema3 } from "mongoose";
var SALON_TIME_SLOTS = [
  "10:00 AM - 11:00 AM",
  "11:30 AM - 12:30 PM",
  "02:00 PM - 03:00 PM",
  "04:00 PM - 05:00 PM",
  "06:00 PM - 07:00 PM"
];
var AppointmentSchema = new Schema3(
  {
    serviceId: {
      type: Schema3.Types.ObjectId,
      ref: "Service",
      required: [true, "Service reference is required"],
      index: true
    },
    customerId: {
      type: Schema3.Types.ObjectId,
      ref: "User",
      required: [true, "Customer reference is required"],
      index: true
    },
    appointmentDate: {
      type: String,
      required: [true, "Appointment date is required"],
      match: [/^\d{4}-\d{2}-\d{2}$/, "Date format must be YYYY-MM-DD"],
      index: true
    },
    timeSlot: {
      type: String,
      required: [true, "Time slot is required"],
      enum: SALON_TIME_SLOTS,
      index: true
    },
    message: {
      type: String,
      default: "",
      trim: true
    },
    servicePrice: {
      type: Number,
      required: [true, "Service price is required"],
      min: [1, "Price must be greater than 0"]
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
      index: true
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
      index: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);
AppointmentSchema.index(
  { serviceId: 1, appointmentDate: 1, timeSlot: 1, status: 1 }
);
var Appointment = mongoose4.models.Appointment || mongoose4.model("Appointment", AppointmentSchema);

// src/models/Transaction.ts
import mongoose5, { Schema as Schema4 } from "mongoose";
var TransactionSchema = new Schema4(
  {
    appointmentId: {
      type: Schema4.Types.ObjectId,
      ref: "Appointment",
      required: [true, "Appointment reference is required"],
      index: true
    },
    customerId: {
      type: Schema4.Types.ObjectId,
      ref: "User",
      required: [true, "Customer reference is required"],
      index: true
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"]
    },
    currency: {
      type: String,
      default: "usd",
      lowercase: true,
      trim: true
    },
    stripeSessionId: {
      type: String,
      required: [true, "Stripe session ID is required"],
      unique: true,
      index: true
    },
    status: {
      type: String,
      enum: ["paid", "failed"],
      required: [true, "Payment status is required"],
      index: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);
var Transaction = mongoose5.models.Transaction || mongoose5.model("Transaction", TransactionSchema);

// src/controllers/appointmentController.ts
async function createBooking(req, res) {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }
    if (req.user.role !== "customer") {
      res.status(403).json({
        success: false,
        message: "Administrative accounts cannot submit customer bookings"
      });
      return;
    }
    if (req.user.isBlocked) {
      res.status(403).json({
        success: false,
        message: "Your account is suspended. Bookings are disabled."
      });
      return;
    }
    await connectDB();
    const { serviceId, appointmentDate, timeSlot, message: message2 } = req.body;
    if (!serviceId) {
      res.status(400).json({ success: false, message: "Service ID is required" });
      return;
    }
    const service = await Service.findById(serviceId);
    if (!service) {
      res.status(404).json({ success: false, message: "Service not found" });
      return;
    }
    if (service.status !== "active") {
      res.status(400).json({
        success: false,
        message: "This salon service is currently inactive and cannot be reserved."
      });
      return;
    }
    if (!appointmentDate || !/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)) {
      res.status(400).json({
        success: false,
        message: "Valid appointment date (YYYY-MM-DD) is required"
      });
      return;
    }
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    if (appointmentDate < today) {
      res.status(400).json({
        success: false,
        message: "Cannot schedule appointments for past dates"
      });
      return;
    }
    if (!timeSlot || !SALON_TIME_SLOTS.includes(timeSlot)) {
      res.status(400).json({
        success: false,
        message: `Valid time slot required. Available slots: ${SALON_TIME_SLOTS.join(", ")}`
      });
      return;
    }
    const customerConflict = await Appointment.findOne({
      customerId: req.user._id,
      appointmentDate,
      timeSlot,
      status: { $in: ["pending", "confirmed"] }
    });
    if (customerConflict) {
      res.status(409).json({
        success: false,
        message: "You already have an active appointment scheduled for this date and time slot. Please choose another time slot."
      });
      return;
    }
    const serviceConflict = await Appointment.findOne({
      serviceId: service._id,
      appointmentDate,
      timeSlot,
      status: { $in: ["pending", "confirmed"] }
    });
    if (serviceConflict) {
      res.status(409).json({
        success: false,
        message: "This appointment time slot has already been reserved for this service. Please select another slot."
      });
      return;
    }
    const appointment = await Appointment.create({
      serviceId: service._id,
      customerId: req.user._id,
      appointmentDate,
      timeSlot,
      message: typeof message2 === "string" ? message2.trim() : "",
      servicePrice: service.price,
      paymentStatus: "unpaid",
      status: "pending"
    });
    const populated = await Appointment.findById(appointment._id).populate("serviceId", "serviceName category price duration image").populate("customerId", "name email phone");
    res.status(201).json({
      success: true,
      message: "Appointment request submitted successfully",
      data: populated
    });
  } catch (error2) {
    console.error("Create booking error:", error2);
    res.status(500).json({ success: false, message: "Failed to create appointment booking" });
  }
}
async function getCustomerAppointments(req, res) {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }
    await connectDB();
    const appointments = await Appointment.find({ customerId: req.user._id }).populate("serviceId", "serviceName category price duration image status").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error2) {
    console.error("Get customer appointments error:", error2);
    res.status(500).json({ success: false, message: "Failed to retrieve appointments" });
  }
}
async function getCustomerDashboardStats(req, res) {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }
    await connectDB();
    const customerId = req.user._id;
    const [total, pending, confirmed, cancelled] = await Promise.all([
      Appointment.countDocuments({ customerId }),
      Appointment.countDocuments({ customerId, status: "pending" }),
      Appointment.countDocuments({ customerId, status: "confirmed" }),
      Appointment.countDocuments({ customerId, status: "cancelled" })
    ]);
    res.status(200).json({
      success: true,
      data: {
        totalRequests: total,
        pending,
        confirmed,
        cancelled
      }
    });
  } catch (error2) {
    console.error("Customer stats error:", error2);
    res.status(500).json({ success: false, message: "Failed to calculate statistics" });
  }
}
async function cancelCustomerAppointment(req, res) {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }
    await connectDB();
    const { id } = req.params;
    const appointment = await Appointment.findOne({
      _id: id,
      customerId: req.user._id
    });
    if (!appointment) {
      res.status(404).json({ success: false, message: "Appointment not found" });
      return;
    }
    if (appointment.status !== "pending") {
      res.status(400).json({
        success: false,
        message: "Only pending appointment requests can be cancelled directly by the customer."
      });
      return;
    }
    appointment.status = "cancelled";
    await appointment.save();
    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      data: appointment
    });
  } catch (error2) {
    console.error("Cancel appointment error:", error2);
    res.status(500).json({ success: false, message: "Failed to cancel appointment" });
  }
}
async function getAllAppointmentsAdmin(_req, res) {
  try {
    await connectDB();
    const appointments = await Appointment.find().populate("serviceId", "serviceName category price duration image status").populate("customerId", "name email phone isBlocked").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error2) {
    console.error("Admin get appointments error:", error2);
    res.status(500).json({ success: false, message: "Failed to retrieve appointments" });
  }
}
async function updateAppointmentStatusAdmin(req, res) {
  try {
    await connectDB();
    const { id } = req.params;
    const { status } = req.body;
    if (!["confirmed", "cancelled"].includes(status)) {
      res.status(400).json({
        success: false,
        message: "Invalid status. Status can only be updated to confirmed or cancelled."
      });
      return;
    }
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      res.status(404).json({ success: false, message: "Appointment not found" });
      return;
    }
    if (status === "confirmed" && appointment.status !== "pending") {
      res.status(400).json({
        success: false,
        message: "Only pending appointments can be confirmed."
      });
      return;
    }
    if (status === "cancelled" && !["pending", "confirmed"].includes(appointment.status)) {
      res.status(400).json({
        success: false,
        message: "Only pending or confirmed appointments can be cancelled."
      });
      return;
    }
    appointment.status = status;
    await appointment.save();
    const populated = await Appointment.findById(id).populate("serviceId", "serviceName category price duration image").populate("customerId", "name email phone");
    res.status(200).json({
      success: true,
      message: `Appointment ${status} successfully`,
      data: populated
    });
  } catch (error2) {
    console.error("Admin update status error:", error2);
    res.status(500).json({ success: false, message: "Failed to update appointment status" });
  }
}
async function getAdminDashboardStats(_req, res) {
  try {
    await connectDB();
    const [
      totalCustomers,
      activeServices,
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      successfulPayments
    ] = await Promise.all([
      User.countDocuments({ role: "customer" }),
      Service.countDocuments({ status: "active" }),
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: "pending" }),
      Appointment.countDocuments({ status: "confirmed" }),
      Transaction.countDocuments({ status: "paid" })
    ]);
    const revenueResult = await Transaction.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
    res.status(200).json({
      success: true,
      data: {
        totalCustomers,
        activeServices,
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        successfulPayments,
        totalRevenue
      }
    });
  } catch (error2) {
    console.error("Admin dashboard stats error:", error2);
    res.status(500).json({ success: false, message: "Failed to retrieve metrics" });
  }
}
async function getBookedSlots(req, res) {
  try {
    await connectDB();
    const { serviceId, date: date3, customerId } = req.query;
    if (!serviceId || !date3) {
      res.status(400).json({
        success: false,
        message: "serviceId and date query parameters are required"
      });
      return;
    }
    const queryConditions = [
      {
        serviceId,
        appointmentDate: String(date3),
        status: { $in: ["pending", "confirmed"] }
      }
    ];
    if (customerId && typeof customerId === "string" && customerId.trim().length > 0) {
      queryConditions.push({
        customerId: customerId.trim(),
        appointmentDate: String(date3),
        status: { $in: ["pending", "confirmed"] }
      });
    }
    const activeBookings = await Appointment.find({
      $or: queryConditions
    }).select("timeSlot");
    const bookedSlots = Array.from(new Set(activeBookings.map((b) => b.timeSlot)));
    res.status(200).json({
      success: true,
      bookedSlots
    });
  } catch (error2) {
    console.error("Booked slots error:", error2);
    res.status(500).json({ success: false, message: "Failed to fetch booked slots" });
  }
}

// src/routes/appointmentRoutes.ts
var router5 = Router4();
router5.get("/booked-slots", getBookedSlots);
router5.post("/", authenticate, requireCustomer, createBooking);
router5.get("/my", authenticate, requireCustomer, getCustomerAppointments);
router5.get("/my/stats", authenticate, requireCustomer, getCustomerDashboardStats);
router5.patch("/:id/cancel", authenticate, requireCustomer, cancelCustomerAppointment);
router5.get("/admin/all", authenticate, requireAdmin, getAllAppointmentsAdmin);
router5.get("/admin/stats", authenticate, requireAdmin, getAdminDashboardStats);
router5.patch("/:id/status", authenticate, requireAdmin, updateAppointmentStatusAdmin);
var appointmentRoutes_default = router5;

// src/routes/userRoutes.ts
import { Router as Router5 } from "express";

// src/controllers/userController.ts
async function getAllCustomersAdmin(_req, res) {
  try {
    await connectDB();
    const customers = await User.find({ role: "customer" }).select("-password").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers
    });
  } catch (error2) {
    console.error("Get customers error:", error2);
    res.status(500).json({ success: false, message: "Failed to retrieve customer list" });
  }
}
async function toggleCustomerBlockAdmin(req, res) {
  try {
    await connectDB();
    const { id } = req.params;
    if (req.user && req.user._id.toString() === id) {
      res.status(400).json({ success: false, message: "Administrators cannot block themselves" });
      return;
    }
    const targetUser = await User.findById(id);
    if (!targetUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    if (targetUser.role === "admin") {
      res.status(403).json({ success: false, message: "Administrative accounts cannot be blocked" });
      return;
    }
    targetUser.isBlocked = !targetUser.isBlocked;
    await targetUser.save();
    res.status(200).json({
      success: true,
      message: `Customer ${targetUser.isBlocked ? "blocked" : "unblocked"} successfully`,
      data: {
        id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
        isBlocked: targetUser.isBlocked
      }
    });
  } catch (error2) {
    console.error("Toggle block error:", error2);
    res.status(500).json({ success: false, message: "Failed to toggle account block status" });
  }
}

// src/routes/userRoutes.ts
var router6 = Router5();
router6.get("/", authenticate, requireAdmin, getAllCustomersAdmin);
router6.patch("/:id/block", authenticate, requireAdmin, toggleCustomerBlockAdmin);
var userRoutes_default = router6;

// src/routes/paymentRoutes.ts
import { Router as Router6 } from "express";

// src/config/stripe.ts
import Stripe from "stripe";
var stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_key_for_build";
var stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-01-27.acacia",
  typescript: true
});

// src/controllers/paymentController.ts
async function createCheckoutSession(req, res) {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }
    if (req.user.isBlocked) {
      res.status(403).json({ success: false, message: "Account is suspended" });
      return;
    }
    await connectDB();
    const { appointmentId } = req.body;
    if (!appointmentId) {
      res.status(400).json({ success: false, message: "Appointment ID is required" });
      return;
    }
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      customerId: req.user._id
    });
    if (!appointment) {
      res.status(404).json({ success: false, message: "Appointment reservation not found" });
      return;
    }
    if (appointment.status !== "confirmed") {
      res.status(400).json({
        success: false,
        message: "Payment is only permitted for confirmed appointments."
      });
      return;
    }
    if (appointment.paymentStatus === "paid") {
      res.status(400).json({
        success: false,
        message: "This appointment has already been paid in full."
      });
      return;
    }
    const service = await Service.findById(appointment.serviceId);
    if (!service) {
      res.status(404).json({ success: false, message: "Associated service not found" });
      return;
    }
    const clientUrl2 = process.env.CLIENT_URL || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: req.user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `SalonBook: ${service.serviceName}`,
              description: `Date: ${appointment.appointmentDate} | Slot: ${appointment.timeSlot}`,
              images: service.image.startsWith("http") ? [service.image] : void 0
            },
            unit_amount: Math.round(appointment.servicePrice * 100)
          },
          quantity: 1
        }
      ],
      metadata: {
        appointmentId: appointment._id.toString(),
        customerId: req.user._id.toString(),
        serviceId: service._id.toString()
      },
      success_url: `${clientUrl2}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl2}/payment/cancel?appointment_id=${appointment._id.toString()}`
    });
    res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url
    });
  } catch (error2) {
    console.error("Create checkout session error:", error2);
    res.status(500).json({
      success: false,
      message: error2.message || "Failed to initiate Stripe checkout"
    });
  }
}
async function getAllTransactionsAdmin(_req, res) {
  try {
    await connectDB();
    const transactions = await Transaction.find().populate("customerId", "name email phone").populate({
      path: "appointmentId",
      select: "appointmentDate timeSlot servicePrice status paymentStatus serviceId",
      populate: {
        path: "serviceId",
        select: "serviceName category"
      }
    }).sort({ createdAt: -1 });
    const formatted = transactions.map((t) => {
      const fullId = t.stripeSessionId || "";
      const maskedSessionId = fullId.length > 16 ? `${fullId.substring(0, 8)}...${fullId.substring(fullId.length - 8)}` : fullId;
      return {
        _id: t._id,
        amount: t.amount,
        currency: t.currency.toUpperCase(),
        status: t.status,
        stripeSessionId: maskedSessionId,
        fullSessionId: fullId,
        createdAt: t.createdAt,
        customer: t.customerId,
        appointment: t.appointmentId
      };
    });
    res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted
    });
  } catch (error2) {
    console.error("Get transactions error:", error2);
    res.status(500).json({ success: false, message: "Failed to retrieve transactions ledger" });
  }
}

// src/routes/paymentRoutes.ts
var router7 = Router6();
router7.post("/create-checkout-session", authenticate, requireCustomer, createCheckoutSession);
router7.get("/transactions", authenticate, requireAdmin, getAllTransactionsAdmin);
var paymentRoutes_default = router7;

// src/routes/webhookRoutes.ts
import { Router as Router7 } from "express";

// src/controllers/webhookController.ts
async function handleStripeWebhook(req, res) {
  const signature = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    res.status(400).json({
      success: false,
      message: "Missing stripe signature header or STRIPE_WEBHOOK_SECRET environment key"
    });
    return;
  }
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    res.status(400).json({
      success: false,
      message: `Webhook signature verification failed: ${err.message}`
    });
    return;
  }
  try {
    await connectDB();
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const appointmentId = session.metadata?.appointmentId;
      const customerId = session.metadata?.customerId;
      const amountInDollars = (session.amount_total || 0) / 100;
      const currency = session.currency || "usd";
      if (appointmentId && customerId) {
        const existingTx = await Transaction.findOne({ stripeSessionId: session.id });
        if (!existingTx) {
          await Appointment.findByIdAndUpdate(appointmentId, {
            paymentStatus: "paid"
          });
          await Transaction.create({
            appointmentId,
            customerId,
            amount: amountInDollars,
            currency,
            stripeSessionId: session.id,
            status: "paid"
          });
          console.log(`Successfully verified and settled payment for Appointment ${appointmentId}`);
        }
      }
    } else if (event.type === "checkout.session.async_payment_failed") {
      const session = event.data.object;
      const appointmentId = session.metadata?.appointmentId;
      const customerId = session.metadata?.customerId;
      const amountInDollars = (session.amount_total || 0) / 100;
      if (appointmentId && customerId) {
        const existingTx = await Transaction.findOne({ stripeSessionId: session.id });
        if (!existingTx) {
          await Transaction.create({
            appointmentId,
            customerId,
            amount: amountInDollars,
            currency: session.currency || "usd",
            stripeSessionId: session.id,
            status: "failed"
          });
        }
      }
    }
    res.status(200).json({ received: true });
  } catch (error2) {
    console.error("Error processing Stripe webhook payload:", error2);
    res.status(500).json({ success: false, message: "Internal webhook execution failure" });
  }
}

// src/routes/webhookRoutes.ts
var router8 = Router7();
router8.post("/stripe", handleStripeWebhook);
var webhookRoutes_default = router8;

// src/app.ts
var app = express2();
var allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.CLIENT_URL
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "stripe-signature"],
    exposedHeaders: ["set-auth-token"]
  })
);
app.use(
  "/api/webhooks/stripe",
  express2.raw({ type: "application/json" })
);
app.use("/api/webhooks", webhookRoutes_default);
app.use("/api/auth", authRoutes_default);
app.all("/api/auth/*", toNodeHandler2(auth));
app.use(express2.json({ limit: "10mb" }));
app.use(express2.urlencoded({ extended: true, limit: "10mb" }));
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "SalonBook Server API",
    authEngine: "Better Auth (MongoDB Adapter)",
    environment: process.env.NODE_ENV || "development",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
app.use("/api/upload", uploadRoutes_default);
app.use("/api/services", serviceRoutes_default);
app.use("/api/appointments", appointmentRoutes_default);
app.use("/api/users", userRoutes_default);
app.use("/api/payments", paymentRoutes_default);
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});
var app_default = app;

// api/index.ts
dotenv.config();
var index_default = app_default;
export {
  index_default as default
};
/*! Bundled license information:

@noble/ciphers/utils.js:
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)
*/
