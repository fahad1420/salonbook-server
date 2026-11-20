import {
  RawNode,
  createQueryId,
  freeze
} from "./chunk-FZ4KF7GL.mjs";

// node_modules/kysely/dist/query-compiler/compiled-query.js
var CompiledQuery = freeze({
  raw(sql, parameters = []) {
    return freeze({
      sql,
      query: RawNode.createWithSql(sql),
      parameters: freeze(parameters),
      queryId: createQueryId()
    });
  }
});

export {
  CompiledQuery
};
