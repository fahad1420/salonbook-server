import {
  DefaultQueryCompiler
} from "./chunk-FZ4KF7GL.mjs";

// node_modules/kysely/dist/dialect/sqlite/sqlite-query-compiler.js
var ID_WRAP_REGEX = /"/g;
var JSON_PATH_MEMBER_ESCAPE_REGEX = /[\\'"]/g;
var SqliteQueryCompiler = class extends DefaultQueryCompiler {
  visitOrAction(node) {
    this.append("or ");
    this.append(node.action);
  }
  getCurrentParameterPlaceholder() {
    return "?";
  }
  getLeftExplainOptionsWrapper() {
    return "";
  }
  getRightExplainOptionsWrapper() {
    return "";
  }
  getLeftIdentifierWrapper() {
    return '"';
  }
  getRightIdentifierWrapper() {
    return '"';
  }
  getAutoIncrement() {
    return "autoincrement";
  }
  sanitizeIdentifier(identifier) {
    return identifier.replace(ID_WRAP_REGEX, '""');
  }
  sanitizeJSONPathMemberValue(value) {
    return value.replace(JSON_PATH_MEMBER_ESCAPE_REGEX, (char) => char === "\\" ? "\\\\" : char === "'" ? "''" : '\\"');
  }
  visitDefaultInsertValue(_) {
    this.append("null");
  }
};

// node_modules/kysely/dist/dialect/dialect-adapter-base.js
var DialectAdapterBase = class {
  get supportsCreateIfNotExists() {
    return true;
  }
  get supportsMultipleConnections() {
    return true;
  }
  get supportsTransactionalDdl() {
    return false;
  }
  get supportsReturning() {
    return false;
  }
  get supportsOutput() {
    return false;
  }
};

// node_modules/kysely/dist/dialect/sqlite/sqlite-adapter.js
var SqliteAdapter = class extends DialectAdapterBase {
  get supportsMultipleConnections() {
    return false;
  }
  get supportsTransactionalDdl() {
    return false;
  }
  get supportsReturning() {
    return true;
  }
  async acquireMigrationLock(_db, _opt) {
  }
  async releaseMigrationLock(_db, _opt) {
  }
};

export {
  DialectAdapterBase,
  SqliteQueryCompiler,
  SqliteAdapter
};
