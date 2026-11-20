import {
  BetterAuthError,
  createAdapterFactory,
  getAuthTables,
  isWorkerd,
  logger
} from "./chunk-LC2AGRHH.mjs";
import {
  CompiledQuery
} from "./chunk-HQMQQQT6.mjs";
import {
  DialectAdapterBase,
  SqliteAdapter,
  SqliteQueryCompiler
} from "./chunk-WTC3CQCW.mjs";
import {
  CaseBuilder,
  CaseNode,
  ColumnNode,
  CreateTableNode,
  CreateViewNode,
  DefaultQueryCompiler,
  Deferred,
  DynamicReferenceBuilder,
  DynamicTableBuilder,
  IdentifierNode,
  ON_COMMIT_ACTIONS,
  OperationNodeTransformer,
  QueryCreator,
  QueryExecutorBase,
  QueryNode,
  RawNode,
  ReferenceNode,
  SchemableIdentifierNode,
  SelectAllNode,
  SelectQueryNode,
  TableNode,
  ValueListNode,
  ValueNode,
  WithSchemaPlugin,
  createFunctionModule,
  createQueryId,
  freeze,
  introspectSqliteTables,
  isBigInt,
  isBoolean,
  isBuffer,
  isDate,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isOperationNodeSource,
  isString,
  isUndefined,
  logOnce,
  noop,
  parseColumnName,
  parseDataTypeExpression,
  parseExpression,
  parseOrderedColumnName,
  parseStringReference,
  parseTable,
  parseValueBinaryOperationOrExpression,
  printBackgroundFail,
  provideControlledConnection,
  randomString,
  sql,
  waitOrAbort
} from "./chunk-FZ4KF7GL.mjs";

// node_modules/kysely/dist/operation-node/alter-table-node.js
var AlterTableNode = freeze({
  is(node) {
    return node.kind === "AlterTableNode";
  },
  create(table) {
    return freeze({
      kind: "AlterTableNode",
      table
    });
  },
  cloneWithTableProps(node, props) {
    return freeze({
      ...node,
      ...props
    });
  },
  cloneWithColumnAlteration(node, columnAlteration) {
    return freeze({
      ...node,
      columnAlterations: node.columnAlterations ? [...node.columnAlterations, columnAlteration] : [columnAlteration]
    });
  }
});

// node_modules/kysely/dist/operation-node/create-index-node.js
var CreateIndexNode = freeze({
  is(node) {
    return node.kind === "CreateIndexNode";
  },
  create(name) {
    return freeze({
      kind: "CreateIndexNode",
      name: IdentifierNode.create(name)
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  },
  cloneWithColumns(node, columns) {
    return freeze({
      ...node,
      columns: [...node.columns || [], ...columns]
    });
  }
});

// node_modules/kysely/dist/operation-node/create-schema-node.js
var CreateSchemaNode = freeze({
  is(node) {
    return node.kind === "CreateSchemaNode";
  },
  create(schema, params) {
    return freeze({
      kind: "CreateSchemaNode",
      schema: IdentifierNode.create(schema),
      ...params
    });
  },
  cloneWith(createSchema, params) {
    return freeze({
      ...createSchema,
      ...params
    });
  }
});

// node_modules/kysely/dist/operation-node/drop-index-node.js
var DropIndexNode = freeze({
  is(node) {
    return node.kind === "DropIndexNode";
  },
  create(name, params) {
    return freeze({
      kind: "DropIndexNode",
      name: SchemableIdentifierNode.create(name),
      ...params
    });
  },
  cloneWith(dropIndex, props) {
    return freeze({
      ...dropIndex,
      ...props
    });
  }
});

// node_modules/kysely/dist/operation-node/drop-schema-node.js
var DropSchemaNode = freeze({
  is(node) {
    return node.kind === "DropSchemaNode";
  },
  create(schema, params) {
    return freeze({
      kind: "DropSchemaNode",
      schema: IdentifierNode.create(schema),
      ...params
    });
  },
  cloneWith(dropSchema, params) {
    return freeze({
      ...dropSchema,
      ...params
    });
  }
});

// node_modules/kysely/dist/operation-node/drop-table-node.js
var DropTableNode = freeze({
  is(node) {
    return node.kind === "DropTableNode";
  },
  create(table, params) {
    return freeze({
      kind: "DropTableNode",
      table,
      ...params
    });
  },
  cloneWith(dropIndex, params) {
    return freeze({
      ...dropIndex,
      ...params
    });
  }
});

// node_modules/kysely/dist/operation-node/add-column-node.js
var AddColumnNode = freeze({
  is(node) {
    return node.kind === "AddColumnNode";
  },
  create(column) {
    return freeze({
      kind: "AddColumnNode",
      column
    });
  }
});

// node_modules/kysely/dist/operation-node/column-definition-node.js
var ColumnDefinitionNode = freeze({
  is(node) {
    return node.kind === "ColumnDefinitionNode";
  },
  create(column, dataType) {
    return freeze({
      kind: "ColumnDefinitionNode",
      column: ColumnNode.create(column),
      dataType
    });
  },
  cloneWithFrontModifier(node, modifier) {
    return freeze({
      ...node,
      frontModifiers: node.frontModifiers ? freeze([...node.frontModifiers, modifier]) : [modifier]
    });
  },
  cloneWithEndModifier(node, modifier) {
    return freeze({
      ...node,
      endModifiers: node.endModifiers ? freeze([...node.endModifiers, modifier]) : [modifier]
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});

// node_modules/kysely/dist/operation-node/drop-column-node.js
var DropColumnNode = freeze({
  is(node) {
    return node.kind === "DropColumnNode";
  },
  create(column) {
    return freeze({
      kind: "DropColumnNode",
      column: ColumnNode.create(column)
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});

// node_modules/kysely/dist/operation-node/rename-column-node.js
var RenameColumnNode = freeze({
  is(node) {
    return node.kind === "RenameColumnNode";
  },
  create(column, newColumn) {
    return freeze({
      kind: "RenameColumnNode",
      column: ColumnNode.create(column),
      renameTo: ColumnNode.create(newColumn)
    });
  }
});

// node_modules/kysely/dist/operation-node/check-constraint-node.js
var CheckConstraintNode = freeze({
  is(node) {
    return node.kind === "CheckConstraintNode";
  },
  create(expression, constraintName) {
    return freeze({
      kind: "CheckConstraintNode",
      expression,
      name: constraintName ? IdentifierNode.create(constraintName) : void 0
    });
  }
});

// node_modules/kysely/dist/operation-node/references-node.js
var ON_MODIFY_FOREIGN_ACTIONS_DICTIONARY = freeze({
  cascade: true,
  "no action": true,
  restrict: true,
  "set default": true,
  "set null": true
});
var ON_MODIFY_FOREIGN_ACTIONS = Object.keys(ON_MODIFY_FOREIGN_ACTIONS_DICTIONARY);
var ReferencesNode = freeze({
  is(node) {
    return node.kind === "ReferencesNode";
  },
  create(table, columns) {
    return freeze({
      kind: "ReferencesNode",
      table,
      columns: freeze([...columns])
    });
  },
  cloneWithOnDelete(references, onDelete) {
    return freeze({
      ...references,
      onDelete
    });
  },
  cloneWithOnUpdate(references, onUpdate) {
    return freeze({
      ...references,
      onUpdate
    });
  }
});
function isOnModifyForeignAction(thing) {
  return isString(thing) && ON_MODIFY_FOREIGN_ACTIONS_DICTIONARY[thing];
}

// node_modules/kysely/dist/parser/default-value-parser.js
function parseDefaultValueExpression(value) {
  return isOperationNodeSource(value) ? value.toOperationNode() : ValueNode.createImmediate(value);
}

// node_modules/kysely/dist/operation-node/generated-node.js
var GeneratedNode = freeze({
  is(node) {
    return node.kind === "GeneratedNode";
  },
  create(params) {
    return freeze({
      kind: "GeneratedNode",
      ...params
    });
  },
  createWithExpression(expression) {
    return freeze({
      kind: "GeneratedNode",
      always: true,
      expression
    });
  },
  cloneWith(node, params) {
    return freeze({
      ...node,
      ...params
    });
  }
});

// node_modules/kysely/dist/operation-node/default-value-node.js
var DefaultValueNode = freeze({
  is(node) {
    return node.kind === "DefaultValueNode";
  },
  create(defaultValue) {
    return freeze({
      kind: "DefaultValueNode",
      defaultValue
    });
  }
});

// node_modules/kysely/dist/parser/on-modify-action-parser.js
function parseOnModifyForeignAction(action) {
  if (isOnModifyForeignAction(action)) {
    return action;
  }
  throw new Error(`invalid OnModifyForeignAction ${action}`);
}

// node_modules/kysely/dist/schema/column-definition-builder.js
var ColumnDefinitionBuilder = class _ColumnDefinitionBuilder {
  #node;
  constructor(node) {
    this.#node = node;
  }
  /**
   * Adds `auto_increment` or `autoincrement` to the column definition
   * depending on the dialect.
   *
   * Some dialects like PostgreSQL don't support this. On PostgreSQL
   * you can use the `serial` or `bigserial` data type instead.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.autoIncrement().primaryKey())
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key auto_increment
   * )
   * ```
   */
  autoIncrement() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { autoIncrement: true }));
  }
  /**
   * Makes the column an identity column.
   *
   * This only works on some dialects like MS SQL Server (MSSQL).
   *
   * For PostgreSQL's `generated always as identity` use {@link generatedAlwaysAsIdentity}.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.identity().primaryKey())
   *   .execute()
   * ```
   *
   * The generated SQL (MSSQL):
   *
   * ```sql
   * create table "person" (
   *   "id" integer identity primary key
   * )
   * ```
   */
  identity() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { identity: true }));
  }
  /**
   * Makes the column the primary key.
   *
   * If you want to specify a composite primary key use the
   * {@link CreateTableBuilder.addPrimaryKeyConstraint} method.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key
   * )
   */
  primaryKey() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { primaryKey: true }));
  }
  /**
   * Adds a foreign key constraint for the column.
   *
   * If your database engine doesn't support foreign key constraints in the
   * column definition (like MySQL 5) you need to call the table level
   * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('owner_id', 'integer', (col) => col.references('person.id'))
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "pet" (
   *   "owner_id" integer references "person" ("id")
   * )
   * ```
   */
  references(ref) {
    const references = parseStringReference(ref);
    if (!references.table || SelectAllNode.is(references.column)) {
      throw new Error(`invalid call references('${ref}'). The reference must have format table.column or schema.table.column`);
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      references: ReferencesNode.create(references.table, [
        references.column
      ])
    }));
  }
  /**
   * Adds an `on delete` constraint for the foreign key column.
   *
   * If your database engine doesn't support foreign key constraints in the
   * column definition (like MySQL 5) you need to call the table level
   * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn(
   *     'owner_id',
   *     'integer',
   *     (col) => col.references('person.id').onDelete('cascade')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "pet" (
   *   "owner_id" integer references "person" ("id") on delete cascade
   * )
   * ```
   */
  onDelete(onDelete) {
    if (!this.#node.references) {
      throw new Error("on delete constraint can only be added for foreign keys");
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      references: ReferencesNode.cloneWithOnDelete(this.#node.references, parseOnModifyForeignAction(onDelete))
    }));
  }
  /**
   * Adds an `on update` constraint for the foreign key column.
   *
   * If your database engine doesn't support foreign key constraints in the
   * column definition (like MySQL 5) you need to call the table level
   * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn(
   *     'owner_id',
   *     'integer',
   *     (col) => col.references('person.id').onUpdate('cascade')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "pet" (
   *   "owner_id" integer references "person" ("id") on update cascade
   * )
   * ```
   */
  onUpdate(onUpdate) {
    if (!this.#node.references) {
      throw new Error("on update constraint can only be added for foreign keys");
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      references: ReferencesNode.cloneWithOnUpdate(this.#node.references, parseOnModifyForeignAction(onUpdate))
    }));
  }
  /**
   * Adds a unique constraint for the column.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('email', 'varchar(255)', col => col.unique())
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `email` varchar(255) unique
   * )
   * ```
   */
  unique() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { unique: true }));
  }
  /**
   * Adds a `not null` constraint for the column.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('first_name', 'varchar(255)', col => col.notNull())
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `first_name` varchar(255) not null
   * )
   * ```
   */
  notNull() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { notNull: true }));
  }
  /**
   * Adds a `unsigned` modifier for the column.
   *
   * This only works on some dialects like MySQL.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('age', 'integer', col => col.unsigned())
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `age` integer unsigned
   * )
   * ```
   */
  unsigned() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { unsigned: true }));
  }
  /**
   * Adds a default value constraint for the column.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('number_of_legs', 'integer', (col) => col.defaultTo(4))
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `pet` (
   *   `number_of_legs` integer default 4
   * )
   * ```
   *
   * Values passed to `defaultTo` are interpreted as value literals by default. You can define
   * an arbitrary SQL expression using the {@link sql} template tag:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('pet')
   *   .addColumn(
   *     'created_at',
   *     'timestamp',
   *     (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`)
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `pet` (
   *   `created_at` timestamp default CURRENT_TIMESTAMP
   * )
   * ```
   */
  defaultTo(value) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      defaultTo: DefaultValueNode.create(parseDefaultValueExpression(value))
    }));
  }
  /**
   * Adds a check constraint for the column.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('number_of_legs', 'integer', (col) =>
   *     col.check(sql`number_of_legs < 5`)
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `pet` (
   *   `number_of_legs` integer check (number_of_legs < 5)
   * )
   * ```
   */
  check(expression) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      check: CheckConstraintNode.create(expression.toOperationNode())
    }));
  }
  /**
   * Makes the column a generated column using a `generated always as` statement.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('full_name', 'varchar(255)',
   *     (col) => col.generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `full_name` varchar(255) generated always as (concat(first_name, ' ', last_name))
   * )
   * ```
   */
  generatedAlwaysAs(expression) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      generated: GeneratedNode.createWithExpression(expression.toOperationNode())
    }));
  }
  /**
   * Adds the `generated always as identity` specifier.
   *
   * This only works on some dialects like PostgreSQL.
   *
   * For MS SQL Server (MSSQL)'s identity column use {@link identity}.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.generatedAlwaysAsIdentity().primaryKey())
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "person" (
   *   "id" integer generated always as identity primary key
   * )
   * ```
   */
  generatedAlwaysAsIdentity() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      generated: GeneratedNode.create({ identity: true, always: true })
    }));
  }
  /**
   * Adds the `generated by default as identity` specifier on supported dialects.
   *
   * This only works on some dialects like PostgreSQL.
   *
   * For MS SQL Server (MSSQL)'s identity column use {@link identity}.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.generatedByDefaultAsIdentity().primaryKey())
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "person" (
   *   "id" integer generated by default as identity primary key
   * )
   * ```
   */
  generatedByDefaultAsIdentity() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      generated: GeneratedNode.create({ identity: true, byDefault: true })
    }));
  }
  /**
   * Makes a generated column stored instead of virtual. This method can only
   * be used with {@link generatedAlwaysAs}
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('full_name', 'varchar(255)', (col) => col
   *     .generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
   *     .stored()
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `full_name` varchar(255) generated always as (concat(first_name, ' ', last_name)) stored
   * )
   * ```
   */
  stored() {
    if (!this.#node.generated) {
      throw new Error("stored() can only be called after generatedAlwaysAs");
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      generated: GeneratedNode.cloneWith(this.#node.generated, {
        stored: true
      })
    }));
  }
  /**
   * This can be used to add any additional SQL right after the column's data type.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn(
   *     'first_name',
   *     'varchar(36)',
   *     (col) => col.modifyFront(sql`collate utf8mb4_general_ci`).notNull()
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key,
   *   `first_name` varchar(36) collate utf8mb4_general_ci not null
   * )
   * ```
   */
  modifyFront(modifier) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithFrontModifier(this.#node, modifier.toOperationNode()));
  }
  /**
   * Adds `nulls not distinct` specifier.
   * Should be used with `unique` constraint.
   *
   * This only works on some dialects like PostgreSQL.
   *
   * ### Examples
   *
   * ```ts
   * db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn('first_name', 'varchar(30)', col => col.unique().nullsNotDistinct())
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "person" (
   *   "id" integer primary key,
   *   "first_name" varchar(30) unique nulls not distinct
   * )
   * ```
   */
  nullsNotDistinct() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { nullsNotDistinct: true }));
  }
  /**
   * Adds `if not exists` specifier. This only works for PostgreSQL.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .alterTable('person')
   *   .addColumn('email', 'varchar(255)', col => col.unique().ifNotExists())
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * alter table "person" add column if not exists "email" varchar(255) unique
   * ```
   */
  ifNotExists() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { ifNotExists: true }));
  }
  /**
   * This can be used to add any additional SQL to the end of the column definition.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn(
   *     'age',
   *     'integer',
   *     col => col.unsigned()
   *       .notNull()
   *       .modifyEnd(sql`comment ${sql.lit('it is not polite to ask a woman her age')}`)
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key,
   *   `age` integer unsigned not null comment 'it is not polite to ask a woman her age'
   * )
   * ```
   */
  modifyEnd(modifier) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithEndModifier(this.#node, modifier.toOperationNode()));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#node;
  }
};

// node_modules/kysely/dist/operation-node/modify-column-node.js
var ModifyColumnNode = freeze({
  is(node) {
    return node.kind === "ModifyColumnNode";
  },
  create(column) {
    return freeze({
      kind: "ModifyColumnNode",
      column
    });
  }
});

// node_modules/kysely/dist/operation-node/foreign-key-constraint-node.js
var ForeignKeyConstraintNode = freeze({
  is(node) {
    return node.kind === "ForeignKeyConstraintNode";
  },
  create(sourceColumns, targetTable, targetColumns, constraintName) {
    return freeze({
      kind: "ForeignKeyConstraintNode",
      columns: sourceColumns,
      references: ReferencesNode.create(targetTable, targetColumns),
      name: constraintName ? IdentifierNode.create(constraintName) : void 0
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});

// node_modules/kysely/dist/schema/foreign-key-constraint-builder.js
var ForeignKeyConstraintBuilder = class _ForeignKeyConstraintBuilder {
  #node;
  constructor(node) {
    this.#node = node;
  }
  onDelete(onDelete) {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
      onDelete: parseOnModifyForeignAction(onDelete)
    }));
  }
  onUpdate(onUpdate) {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
      onUpdate: parseOnModifyForeignAction(onUpdate)
    }));
  }
  deferrable() {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, { deferrable: true }));
  }
  notDeferrable() {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, { deferrable: false }));
  }
  initiallyDeferred() {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
      initiallyDeferred: true
    }));
  }
  initiallyImmediate() {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
      initiallyDeferred: false
    }));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#node;
  }
};

// node_modules/kysely/dist/operation-node/add-constraint-node.js
var AddConstraintNode = freeze({
  is(node) {
    return node.kind === "AddConstraintNode";
  },
  create(constraint) {
    return freeze({
      kind: "AddConstraintNode",
      constraint
    });
  }
});

// node_modules/kysely/dist/operation-node/unique-constraint-node.js
var UniqueConstraintNode = freeze({
  is(node) {
    return node.kind === "UniqueConstraintNode";
  },
  create(columns, constraintName, nullsNotDistinct) {
    if (isString(columns.at(0))) {
      logOnce("`UniqueConstraintNode.create(columns: string[], ...)` is deprecated - pass `ColumnNode[]` instead.");
      columns = columns.map(ColumnNode.create);
    }
    return freeze({
      kind: "UniqueConstraintNode",
      columns: freeze(columns),
      name: constraintName ? IdentifierNode.create(constraintName) : void 0,
      nullsNotDistinct
    });
  },
  cloneWith(node, props) {
    return freeze({ ...node, ...props });
  }
});

// node_modules/kysely/dist/operation-node/drop-constraint-node.js
var DropConstraintNode = freeze({
  is(node) {
    return node.kind === "DropConstraintNode";
  },
  create(constraintName) {
    return freeze({
      kind: "DropConstraintNode",
      constraintName: IdentifierNode.create(constraintName)
    });
  },
  cloneWith(dropConstraint, props) {
    return freeze({
      ...dropConstraint,
      ...props
    });
  }
});

// node_modules/kysely/dist/operation-node/alter-column-node.js
var AlterColumnNode = freeze({
  is(node) {
    return node.kind === "AlterColumnNode";
  },
  create(column, prop, value) {
    return freeze({
      kind: "AlterColumnNode",
      column: ColumnNode.create(column),
      [prop]: value
    });
  }
});

// node_modules/kysely/dist/schema/alter-column-builder.js
var AlterColumnBuilder = class {
  #column;
  constructor(column) {
    this.#column = column;
  }
  setDataType(dataType) {
    return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, "dataType", parseDataTypeExpression(dataType)));
  }
  setDefault(value) {
    return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, "setDefault", parseDefaultValueExpression(value)));
  }
  dropDefault() {
    return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, "dropDefault", true));
  }
  setNotNull() {
    return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, "setNotNull", true));
  }
  dropNotNull() {
    return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, "dropNotNull", true));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
};
var AlteredColumnBuilder = class {
  #alterColumnNode;
  constructor(alterColumnNode) {
    this.#alterColumnNode = alterColumnNode;
  }
  toOperationNode() {
    return this.#alterColumnNode;
  }
};

// node_modules/kysely/dist/schema/alter-table-executor.js
var AlterTableExecutor = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/schema/alter-table-add-foreign-key-constraint-builder.js
var AlterTableAddForeignKeyConstraintBuilder = class _AlterTableAddForeignKeyConstraintBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  onDelete(onDelete) {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder: this.#props.constraintBuilder.onDelete(onDelete)
    });
  }
  onUpdate(onUpdate) {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder: this.#props.constraintBuilder.onUpdate(onUpdate)
    });
  }
  deferrable() {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder: this.#props.constraintBuilder.deferrable()
    });
  }
  notDeferrable() {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder: this.#props.constraintBuilder.notDeferrable()
    });
  }
  initiallyDeferred() {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder: this.#props.constraintBuilder.initiallyDeferred()
    });
  }
  initiallyImmediate() {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder: this.#props.constraintBuilder.initiallyImmediate()
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(AlterTableNode.cloneWithTableProps(this.#props.node, {
      addConstraint: AddConstraintNode.create(this.#props.constraintBuilder.toOperationNode())
    }), this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/schema/alter-table-drop-constraint-builder.js
var AlterTableDropConstraintBuilder = class _AlterTableDropConstraintBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  ifExists() {
    return new _AlterTableDropConstraintBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        dropConstraint: DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
          ifExists: true
        })
      })
    });
  }
  cascade() {
    return new _AlterTableDropConstraintBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        dropConstraint: DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
          modifier: "cascade"
        })
      })
    });
  }
  restrict() {
    return new _AlterTableDropConstraintBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        dropConstraint: DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
          modifier: "restrict"
        })
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/operation-node/primary-key-constraint-node.js
var PrimaryKeyConstraintNode = freeze({
  is(node) {
    return node.kind === "PrimaryKeyConstraintNode";
  },
  create(columns, constraintName) {
    return freeze({
      kind: "PrimaryKeyConstraintNode",
      columns: freeze(columns.map(ColumnNode.create)),
      name: constraintName ? IdentifierNode.create(constraintName) : void 0
    });
  },
  cloneWith(node, props) {
    return freeze({ ...node, ...props });
  }
});

// node_modules/kysely/dist/operation-node/add-index-node.js
var AddIndexNode = freeze({
  is(node) {
    return node.kind === "AddIndexNode";
  },
  create(name) {
    return freeze({
      kind: "AddIndexNode",
      name: IdentifierNode.create(name)
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  },
  cloneWithColumns(node, columns) {
    return freeze({
      ...node,
      columns: [...node.columns || [], ...columns]
    });
  }
});

// node_modules/kysely/dist/schema/alter-table-add-index-builder.js
var AlterTableAddIndexBuilder = class _AlterTableAddIndexBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Makes the index unique.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .alterTable('person')
   *   .addIndex('person_first_name_index')
   *   .unique()
   *   .column('email')
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` add unique index `person_first_name_index` (`email`)
   * ```
   */
  unique() {
    return new _AlterTableAddIndexBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addIndex: AddIndexNode.cloneWith(this.#props.node.addIndex, {
          unique: true
        })
      })
    });
  }
  column(arg) {
    return new _AlterTableAddIndexBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addIndex: AddIndexNode.cloneWithColumns(this.#props.node.addIndex, [
          isString(arg) ? parseOrderedColumnName(arg) : arg.toOperationNode()
        ])
      })
    });
  }
  /**
   * Specifies a list of columns for the index.
   *
   * Also see {@link column} for adding a single column or {@link expression} for
   * specifying an arbitrary expression.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .alterTable('person')
   *   .addIndex('person_first_name_and_age_index')
   *   .columns(['first_name', sql`(left(lower(last_name), 1))`, 'age desc'])
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person`
   * add index `person_first_name_and_age_index` (
   *   `first_name`,
   *   (left(lower(last_name), 1)),
   *   `age` desc
   * )
   * ```
   */
  columns(columns) {
    return new _AlterTableAddIndexBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addIndex: AddIndexNode.cloneWithColumns(this.#props.node.addIndex, columns.map((item) => isString(item) ? parseOrderedColumnName(item) : item.toOperationNode()))
      })
    });
  }
  /**
   * Specifies an arbitrary expression for the index.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .alterTable('person')
   *   .addIndex('person_first_name_index')
   *   .expression(sql<boolean>`(first_name < 'Sami')`)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` add index `person_first_name_index` ((first_name < 'Sami'))
   * ```
   *
   * @deprecated Use {@link column} or {@link columns} with an {@link Expression} instead.
   */
  // TODO: remove in v0.30
  expression(expression) {
    return new _AlterTableAddIndexBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addIndex: AddIndexNode.cloneWithColumns(this.#props.node.addIndex, [
          expression.toOperationNode()
        ])
      })
    });
  }
  using(indexType) {
    return new _AlterTableAddIndexBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addIndex: AddIndexNode.cloneWith(this.#props.node.addIndex, {
          using: RawNode.createWithSql(indexType)
        })
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/schema/unique-constraint-builder.js
var UniqueConstraintNodeBuilder = class _UniqueConstraintNodeBuilder {
  #node;
  constructor(node) {
    this.#node = node;
  }
  /**
   * Adds `nulls not distinct` to the unique constraint definition
   *
   * Supported by PostgreSQL dialect only
   */
  nullsNotDistinct() {
    return new _UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, { nullsNotDistinct: true }));
  }
  deferrable() {
    return new _UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, { deferrable: true }));
  }
  notDeferrable() {
    return new _UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, { deferrable: false }));
  }
  initiallyDeferred() {
    return new _UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, {
      initiallyDeferred: true
    }));
  }
  initiallyImmediate() {
    return new _UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, {
      initiallyDeferred: false
    }));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#node;
  }
};

// node_modules/kysely/dist/schema/primary-key-constraint-builder.js
var PrimaryKeyConstraintBuilder = class _PrimaryKeyConstraintBuilder {
  #node;
  constructor(node) {
    this.#node = node;
  }
  deferrable() {
    return new _PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(this.#node, { deferrable: true }));
  }
  notDeferrable() {
    return new _PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(this.#node, { deferrable: false }));
  }
  initiallyDeferred() {
    return new _PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(this.#node, {
      initiallyDeferred: true
    }));
  }
  initiallyImmediate() {
    return new _PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(this.#node, {
      initiallyDeferred: false
    }));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#node;
  }
};

// node_modules/kysely/dist/schema/check-constraint-builder.js
var CheckConstraintBuilder = class {
  #node;
  constructor(node) {
    this.#node = node;
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#node;
  }
};

// node_modules/kysely/dist/operation-node/rename-constraint-node.js
var RenameConstraintNode = freeze({
  is(node) {
    return node.kind === "RenameConstraintNode";
  },
  create(oldName, newName) {
    return freeze({
      kind: "RenameConstraintNode",
      oldName: IdentifierNode.create(oldName),
      newName: IdentifierNode.create(newName)
    });
  }
});

// node_modules/kysely/dist/schema/drop-column-builder.js
var DropColumnBuilder = class _DropColumnBuilder {
  #props;
  constructor(props) {
    this.#props = freeze({ ...props });
  }
  ifExists() {
    return new _DropColumnBuilder({
      ...this.#props,
      node: DropColumnNode.cloneWith(this.#props.node, { ifExists: true })
    });
  }
  toOperationNode() {
    return this.#props.node;
  }
};

// node_modules/kysely/dist/schema/alter-table-builder.js
var AlterTableBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  renameTo(newTableName) {
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        renameTo: parseTable(newTableName)
      })
    });
  }
  setSchema(newSchema) {
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        setSchema: IdentifierNode.create(newSchema)
      })
    });
  }
  alterColumn(column, alteration) {
    const builder = alteration(new AlterColumnBuilder(column));
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, builder.toOperationNode())
    });
  }
  dropColumn(column, build = noop) {
    const builder = build(new DropColumnBuilder({ node: DropColumnNode.create(column) }));
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, builder.toOperationNode())
    });
  }
  renameColumn(column, newColumn) {
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, RenameColumnNode.create(column, newColumn))
    });
  }
  addColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, AddColumnNode.create(builder.toOperationNode()))
    });
  }
  modifyColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, ModifyColumnNode.create(builder.toOperationNode()))
    });
  }
  /**
   * See {@link CreateTableBuilder.addUniqueConstraint}
   */
  addUniqueConstraint(constraintName, columns, build = noop) {
    const uniqueConstraintBuilder = build(new UniqueConstraintNodeBuilder(UniqueConstraintNode.create(columns.map((column) => isString(column) ? ColumnNode.create(column) : parseExpression(column)), constraintName)));
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addConstraint: AddConstraintNode.create(uniqueConstraintBuilder.toOperationNode())
      })
    });
  }
  /**
   * See {@link CreateTableBuilder.addCheckConstraint}
   */
  addCheckConstraint(constraintName, checkExpression, build = noop) {
    const constraintBuilder = build(new CheckConstraintBuilder(CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName)));
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addConstraint: AddConstraintNode.create(constraintBuilder.toOperationNode())
      })
    });
  }
  /**
   * See {@link CreateTableBuilder.addForeignKeyConstraint}
   *
   * Unlike {@link CreateTableBuilder.addForeignKeyConstraint} this method returns
   * the constraint builder and doesn't take a callback as the last argument. This
   * is because you can only add one column per `ALTER TABLE` query.
   */
  addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = noop) {
    const constraintBuilder = build(new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName)));
    return new AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder
    });
  }
  /**
   * See {@link CreateTableBuilder.addPrimaryKeyConstraint}
   */
  addPrimaryKeyConstraint(constraintName, columns, build = noop) {
    const constraintBuilder = build(new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.create(columns, constraintName)));
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addConstraint: AddConstraintNode.create(constraintBuilder.toOperationNode())
      })
    });
  }
  dropConstraint(constraintName) {
    return new AlterTableDropConstraintBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        dropConstraint: DropConstraintNode.create(constraintName)
      })
    });
  }
  renameConstraint(oldName, newName) {
    return new AlterTableDropConstraintBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        renameConstraint: RenameConstraintNode.create(oldName, newName)
      })
    });
  }
  /**
   * This can be used to add index to table.
   *
   *  ### Examples
   *
   * ```ts
   * db.schema.alterTable('person')
   *   .addIndex('person_email_index')
   *   .column('email')
   *   .unique()
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` add unique index `person_email_index` (`email`)
   * ```
   */
  addIndex(indexName) {
    return new AlterTableAddIndexBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addIndex: AddIndexNode.create(indexName)
      })
    });
  }
  /**
   * This can be used to drop index from table.
   *
   * ### Examples
   *
   * ```ts
   * db.schema.alterTable('person')
   *   .dropIndex('person_email_index')
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` drop index `test_first_name_index`
   * ```
   */
  dropIndex(indexName) {
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        dropIndex: DropIndexNode.create(indexName)
      })
    });
  }
  /**
   * Calls the given function passing `this` as the only argument.
   *
   * See {@link CreateTableBuilder.$call}
   */
  $call(func) {
    return func(this);
  }
};
var AlterTableColumnAlteringBuilder = class _AlterTableColumnAlteringBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  alterColumn(column, alteration) {
    const builder = alteration(new AlterColumnBuilder(column));
    return new _AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, builder.toOperationNode())
    });
  }
  dropColumn(column, build = noop) {
    const builder = build(new DropColumnBuilder({ node: DropColumnNode.create(column) }));
    return new _AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, builder.toOperationNode())
    });
  }
  renameColumn(column, newColumn) {
    return new _AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, RenameColumnNode.create(column, newColumn))
    });
  }
  addColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new _AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, AddColumnNode.create(builder.toOperationNode()))
    });
  }
  modifyColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new _AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, ModifyColumnNode.create(builder.toOperationNode()))
    });
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/plugin/immediate-value/immediate-value-transformer.js
var ImmediateValueTransformer = class extends OperationNodeTransformer {
  transformPrimitiveValueList(node) {
    return ValueListNode.create(node.values.map(ValueNode.createImmediate));
  }
  transformValue(node) {
    return ValueNode.createImmediate(node.value);
  }
};

// node_modules/kysely/dist/schema/create-index-builder.js
var CreateIndexBuilder = class _CreateIndexBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds the "if not exists" modifier.
   *
   * If the index already exists, no error is thrown if this method has been called.
   */
  ifNotExists() {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWith(this.#props.node, {
        ifNotExists: true
      })
    });
  }
  /**
   * Makes the index unique.
   */
  unique() {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWith(this.#props.node, {
        unique: true
      })
    });
  }
  /**
   * Adds `nulls not distinct` specifier to index.
   * This only works on some dialects like PostgreSQL.
   *
   * ### Examples
   *
   * ```ts
   * db.schema.createIndex('person_first_name_index')
   *  .on('person')
   *  .column('first_name')
   *  .nullsNotDistinct()
   *  .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create index "person_first_name_index"
   * on "test" ("first_name")
   * nulls not distinct;
   * ```
   */
  nullsNotDistinct() {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWith(this.#props.node, {
        nullsNotDistinct: true
      })
    });
  }
  /**
   * Specifies the table for the index.
   */
  on(table) {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWith(this.#props.node, {
        table: parseTable(table)
      })
    });
  }
  column(arg) {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWithColumns(this.#props.node, [
        isString(arg) ? parseOrderedColumnName(arg) : arg.toOperationNode()
      ])
    });
  }
  /**
   * Adds a list of columns to the index.
   *
   * Also see {@link column} for adding a single column.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createIndex('person_first_name_and_age_index')
   *   .on('person')
   *   .columns(['first_name', sql`left(lower("last_name"), 1)`, 'age desc'])
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create index "person_first_name_and_age_index"
   * on "person" ("first_name", left(lower("last_name"), 1), "age" desc)
   * ```
   */
  columns(columns) {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWithColumns(this.#props.node, columns.map((item) => isString(item) ? parseOrderedColumnName(item) : item.toOperationNode()))
    });
  }
  /**
   * Adds an arbitrary expression as a column to the index.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createIndex('person_first_name_index')
   *   .on('person')
   *   .expression(sql`first_name COLLATE "fi_FI"`)
   *   .column('gender')
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create index "person_first_name_index"
   * on "person" (first_name COLLATE "fi_FI", "gender")
   * ```
   *
   * @deprecated Use {@link column} or {@link columns} with an {@link Expression} instead.
   */
  // TODO: remove in v0.30
  expression(expression) {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWithColumns(this.#props.node, [
        expression.toOperationNode()
      ])
    });
  }
  using(indexType) {
    return new _CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWith(this.#props.node, {
        using: RawNode.createWithSql(indexType)
      })
    });
  }
  where(...args) {
    const transformer = new ImmediateValueTransformer();
    return new _CreateIndexBuilder({
      ...this.#props,
      node: QueryNode.cloneWithWhere(this.#props.node, transformer.transformNode(parseValueBinaryOperationOrExpression(args), this.#props.queryId))
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/schema/create-schema-builder.js
var CreateSchemaBuilder = class _CreateSchemaBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  ifNotExists() {
    return new _CreateSchemaBuilder({
      ...this.#props,
      node: CreateSchemaNode.cloneWith(this.#props.node, { ifNotExists: true })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/parser/on-commit-action-parse.js
function parseOnCommitAction(action) {
  if (ON_COMMIT_ACTIONS.includes(action)) {
    return action;
  }
  throw new Error(`invalid OnCommitAction ${action}`);
}

// node_modules/kysely/dist/schema/create-table-add-index-builder.js
var CreateTableAddIndexBuilder = class _CreateTableAddIndexBuilder {
  #node;
  constructor(node) {
    this.#node = node;
  }
  using(indexType) {
    return new _CreateTableAddIndexBuilder(AddIndexNode.cloneWith(this.#node, {
      using: RawNode.createWithSql(indexType)
    }));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#node;
  }
};

// node_modules/kysely/dist/schema/create-table-builder.js
var CreateTableBuilder = class _CreateTableBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds the "temporary" modifier.
   *
   * Use this to create a temporary table.
   */
  temporary() {
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWith(this.#props.node, {
        temporary: true
      })
    });
  }
  /**
   * Adds an "on commit" statement.
   *
   * This can be used in conjunction with temporary tables on supported databases
   * like PostgreSQL.
   */
  onCommit(onCommit) {
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWith(this.#props.node, {
        onCommit: parseOnCommitAction(onCommit)
      })
    });
  }
  /**
   * Adds the "if not exists" modifier.
   *
   * If the table already exists, no error is thrown if this method has been called.
   */
  ifNotExists() {
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWith(this.#props.node, {
        ifNotExists: true
      })
    });
  }
  /**
   * Adds a column to the table.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
   *   .addColumn('first_name', 'varchar(50)', (col) => col.notNull())
   *   .addColumn('last_name', 'varchar(255)')
   *   .addColumn('bank_balance', 'numeric(8, 2)')
   *   // You can specify any data type using the `sql` tag if the types
   *   // don't include it.
   *   .addColumn('data', sql`any_type_here`)
   *   .addColumn('parent_id', 'integer', (col) =>
   *     col.references('person.id').onDelete('cascade')
   *   )
   * ```
   *
   * With this method, it's once again good to remember that Kysely just builds the
   * query and doesn't provide the same API for all databases. For example, some
   * databases like older MySQL don't support the `references` statement in the
   * column definition. Instead foreign key constraints need to be defined in the
   * `create table` query. See the next example:
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', (col) => col.primaryKey())
   *   .addColumn('parent_id', 'integer')
   *   .addForeignKeyConstraint(
   *     'person_parent_id_fk',
   *     ['parent_id'],
   *     'person',
   *     ['id'],
   *     (cb) => cb.onDelete('cascade')
   *   )
   *   .execute()
   * ```
   *
   * Another good example is that PostgreSQL doesn't support the `auto_increment`
   * keyword and you need to define an autoincrementing column for example using
   * `serial`:
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'serial', (col) => col.primaryKey())
   *   .execute()
   * ```
   */
  addColumn(columnName, dataType, build = noop) {
    const columnBuilder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithColumn(this.#props.node, columnBuilder.toOperationNode())
    });
  }
  /**
   * Adds a primary key constraint for one or more columns.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('first_name', 'varchar(64)')
   *   .addColumn('last_name', 'varchar(64)')
   *   .addPrimaryKeyConstraint('primary_key', ['first_name', 'last_name'])
   *   .execute()
   * ```
   */
  addPrimaryKeyConstraint(constraintName, columns, build = noop) {
    const constraintBuilder = build(new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.create(columns, constraintName)));
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithConstraint(this.#props.node, constraintBuilder.toOperationNode())
    });
  }
  /**
   * Adds a unique constraint for one or more columns.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('first_name', 'varchar(64)')
   *   .addColumn('last_name', 'varchar(64)')
   *   .addUniqueConstraint(
   *     'first_name_last_name_unique',
   *     ['first_name', 'last_name']
   *   )
   *   .execute()
   * ```
   *
   * In dialects such as PostgreSQL you can specify `nulls not distinct` as follows:
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('first_name', 'varchar(64)')
   *   .addColumn('last_name', 'varchar(64)')
   *   .addUniqueConstraint(
   *     'first_name_last_name_unique',
   *     ['first_name', 'last_name'],
   *     (cb) => cb.nullsNotDistinct()
   *   )
   *   .execute()
   * ```
   *
   * In dialects such as MySQL you create unique constraints on expressions as follows:
   *
   * ```ts
   *
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('first_name', 'varchar(64)')
   *   .addColumn('last_name', 'varchar(64)')
   *   .addUniqueConstraint(
   *     'first_name_last_name_unique',
   *     [sql`(lower('first_name'))`, 'last_name']
   *   )
   *   .execute()
   * ```
   */
  addUniqueConstraint(constraintName, columns, build = noop) {
    const uniqueConstraintBuilder = build(new UniqueConstraintNodeBuilder(UniqueConstraintNode.create(columns.map((column) => isString(column) ? ColumnNode.create(column) : parseExpression(column)), constraintName)));
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithConstraint(this.#props.node, uniqueConstraintBuilder.toOperationNode())
    });
  }
  /**
   * Adds an index that includes one or more columns.
   *
   * This is only supported by some dialects like MySQL.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('first_name', 'varchar(64)')
   *   .addColumn('last_name', 'varchar(64)')
   *   .addIndex('last_name_key', ['last_name'])
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key,
   *   `first_name` varchar(64) not null,
   *   `last_name` varchar(64) not null,
   *   index `last_name_key` (`last_name`)
   * )
   * ```
   */
  addIndex(indexName, columns, build = noop) {
    const addIndexBuilder = build(new CreateTableAddIndexBuilder(AddIndexNode.cloneWithColumns(AddIndexNode.create(indexName), columns.map((column) => isString(column) ? ColumnNode.create(column) : parseExpression(column)))));
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithIndex(this.#props.node, addIndexBuilder.toOperationNode())
    });
  }
  /**
   * Adds a check constraint.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('animal')
   *   .addColumn('number_of_legs', 'integer')
   *   .addCheckConstraint('check_legs', sql`number_of_legs < 5`)
   *   .execute()
   * ```
   */
  addCheckConstraint(constraintName, checkExpression, build = noop) {
    const constraintBuilder = build(new CheckConstraintBuilder(CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName)));
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithConstraint(this.#props.node, constraintBuilder.toOperationNode())
    });
  }
  /**
   * Adds a foreign key constraint.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('owner_id', 'integer')
   *   .addForeignKeyConstraint(
   *     'owner_id_foreign',
   *     ['owner_id'],
   *     'person',
   *     ['id'],
   *   )
   *   .execute()
   * ```
   *
   * Add constraint for multiple columns:
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('owner_id1', 'integer')
   *   .addColumn('owner_id2', 'integer')
   *   .addForeignKeyConstraint(
   *     'owner_id_foreign',
   *     ['owner_id1', 'owner_id2'],
   *     'person',
   *     ['id1', 'id2'],
   *     (cb) => cb.onDelete('cascade')
   *   )
   *   .execute()
   * ```
   */
  addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = noop) {
    const builder = build(new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName)));
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithConstraint(this.#props.node, builder.toOperationNode())
    });
  }
  /**
   * This can be used to add any additional SQL to the front of the query __after__ the `create` keyword.
   *
   * Also see {@link temporary}.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .modifyFront(sql`global temporary`)
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
   *   .addColumn('last_name', 'varchar(64)', col => col.notNull())
   *   .execute()
   * ```
   *
   * The generated SQL (Postgres):
   *
   * ```sql
   * create global temporary table "person" (
   *   "id" integer primary key,
   *   "first_name" varchar(64) not null,
   *   "last_name" varchar(64) not null
   * )
   * ```
   */
  modifyFront(modifier) {
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithFrontModifier(this.#props.node, modifier.toOperationNode())
    });
  }
  /**
   * This can be used to add any additional SQL to the end of the query.
   *
   * Also see {@link onCommit}.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
   *   .addColumn('last_name', 'varchar(64)', col => col.notNull())
   *   .modifyEnd(sql`collate utf8_unicode_ci`)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key,
   *   `first_name` varchar(64) not null,
   *   `last_name` varchar(64) not null
   * ) collate utf8_unicode_ci
   * ```
   */
  modifyEnd(modifier) {
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithEndModifier(this.#props.node, modifier.toOperationNode())
    });
  }
  /**
   * Allows to create table from `select` query.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('copy')
   *   .temporary()
   *   .as(db.selectFrom('person').select(['first_name', 'last_name']))
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create temporary table "copy" as
   * select "first_name", "last_name" from "person"
   * ```
   */
  as(expression) {
    return new _CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWith(this.#props.node, {
        selectQuery: parseExpression(expression)
      })
    });
  }
  /**
   * Calls the given function passing `this` as the only argument.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('test')
   *   .$call((builder) => builder.addColumn('id', 'integer'))
   *   .execute()
   * ```
   *
   * This is useful for creating reusable functions that can be called with a builder.
   *
   * ```ts
   * import { type CreateTableBuilder, sql } from 'kysely'
   *
   * const addDefaultColumns = (ctb: CreateTableBuilder<any, any>) => {
   *   return ctb
   *     .addColumn('id', 'integer', (col) => col.notNull())
   *     .addColumn('created_at', 'date', (col) =>
   *       col.notNull().defaultTo(sql`now()`)
   *     )
   *     .addColumn('updated_at', 'date', (col) =>
   *       col.notNull().defaultTo(sql`now()`)
   *     )
   * }
   *
   * await db.schema
   *   .createTable('test')
   *   .$call(addDefaultColumns)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/schema/drop-index-builder.js
var DropIndexBuilder = class _DropIndexBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Specifies the table the index was created for. This is not needed
   * in all dialects.
   */
  on(table) {
    return new _DropIndexBuilder({
      ...this.#props,
      node: DropIndexNode.cloneWith(this.#props.node, {
        table: parseTable(table)
      })
    });
  }
  ifExists() {
    return new _DropIndexBuilder({
      ...this.#props,
      node: DropIndexNode.cloneWith(this.#props.node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropIndexBuilder({
      ...this.#props,
      node: DropIndexNode.cloneWith(this.#props.node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/schema/drop-schema-builder.js
var DropSchemaBuilder = class _DropSchemaBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  ifExists() {
    return new _DropSchemaBuilder({
      ...this.#props,
      node: DropSchemaNode.cloneWith(this.#props.node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropSchemaBuilder({
      ...this.#props,
      node: DropSchemaNode.cloneWith(this.#props.node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/schema/drop-table-builder.js
var DropTableBuilder = class _DropTableBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds the "temporary" modifier.
   *
   * This is only supported by some dialects like MySQL.
   */
  temporary() {
    return new _DropTableBuilder({
      ...this.#props,
      node: DropTableNode.cloneWith(this.#props.node, {
        temporary: true
      })
    });
  }
  ifExists() {
    return new _DropTableBuilder({
      ...this.#props,
      node: DropTableNode.cloneWith(this.#props.node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropTableBuilder({
      ...this.#props,
      node: DropTableNode.cloneWith(this.#props.node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/plugin/immediate-value/immediate-value-plugin.js
var ImmediateValuePlugin = class {
  #transformer = new ImmediateValueTransformer();
  transformQuery(args) {
    return this.#transformer.transformNode(args.node, args.queryId);
  }
  transformResult(args) {
    return Promise.resolve(args.result);
  }
};

// node_modules/kysely/dist/schema/create-view-builder.js
var CreateViewBuilder = class _CreateViewBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds the "temporary" modifier.
   *
   * Use this to create a temporary view.
   */
  temporary() {
    return new _CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        temporary: true
      })
    });
  }
  materialized() {
    return new _CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        materialized: true
      })
    });
  }
  /**
   * Only implemented on some dialects like SQLite. On most dialects, use {@link orReplace}.
   */
  ifNotExists() {
    return new _CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        ifNotExists: true
      })
    });
  }
  orReplace() {
    return new _CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        orReplace: true
      })
    });
  }
  columns(columns) {
    return new _CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        columns: columns.map(parseColumnName)
      })
    });
  }
  /**
   * Sets the select query or a `values` statement that creates the view.
   *
   * WARNING!
   * Some dialects don't support parameterized queries in DDL statements and therefore
   * the query or raw {@link sql } expression passed here is interpolated into a single
   * string opening an SQL injection vulnerability. DO NOT pass unchecked user input
   * into the query or raw expression passed to this method!
   */
  as(query) {
    const queryNode = query.withPlugin(new ImmediateValuePlugin()).toOperationNode();
    return new _CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        as: queryNode
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/operation-node/drop-view-node.js
var DropViewNode = freeze({
  is(node) {
    return node.kind === "DropViewNode";
  },
  create(name) {
    return freeze({
      kind: "DropViewNode",
      name: SchemableIdentifierNode.create(name)
    });
  },
  cloneWith(dropView, params) {
    return freeze({
      ...dropView,
      ...params
    });
  }
});

// node_modules/kysely/dist/schema/drop-view-builder.js
var DropViewBuilder = class _DropViewBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  materialized() {
    return new _DropViewBuilder({
      ...this.#props,
      node: DropViewNode.cloneWith(this.#props.node, {
        materialized: true
      })
    });
  }
  ifExists() {
    return new _DropViewBuilder({
      ...this.#props,
      node: DropViewNode.cloneWith(this.#props.node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropViewBuilder({
      ...this.#props,
      node: DropViewNode.cloneWith(this.#props.node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/operation-node/create-type-node.js
var CreateTypeNode = freeze({
  is(node) {
    return node.kind === "CreateTypeNode";
  },
  create(name) {
    return freeze({
      kind: "CreateTypeNode",
      name
    });
  },
  cloneWithEnum(createType, values) {
    return freeze({
      ...createType,
      enum: ValueListNode.create(values.map(ValueNode.createImmediate))
    });
  }
});

// node_modules/kysely/dist/schema/create-type-builder.js
var CreateTypeBuilder = class _CreateTypeBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  /**
   * Creates an enum type.
   *
   * ### Examples
   *
   * ```ts
   * db.schema.createType('species').asEnum(['cat', 'dog', 'frog'])
   * ```
   */
  asEnum(values) {
    return new _CreateTypeBuilder({
      ...this.#props,
      node: CreateTypeNode.cloneWithEnum(this.#props.node, values)
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/operation-node/drop-type-node.js
var DropTypeNode = freeze({
  is(node) {
    return node.kind === "DropTypeNode";
  },
  create(names) {
    if (!Array.isArray(names)) {
      names = [names];
    }
    return freeze({
      kind: "DropTypeNode",
      name: names[0],
      additionalNames: names.slice(1)
    });
  },
  cloneWith(dropType, params) {
    return freeze({
      ...dropType,
      ...params
    });
  }
});

// node_modules/kysely/dist/schema/drop-type-builder.js
var DropTypeBuilder = class _DropTypeBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds `if exists` to the query.
   */
  ifExists() {
    return new _DropTypeBuilder({
      ...this.#props,
      node: DropTypeNode.cloneWith(this.#props.node, {
        ifExists: true
      })
    });
  }
  /**
   * Adds `cascade` to the query.
   */
  cascade() {
    return new _DropTypeBuilder({
      ...this.#props,
      node: DropTypeNode.cloneWith(this.#props.node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/parser/identifier-parser.js
function parseSchemableIdentifier(id) {
  const SCHEMA_SEPARATOR = ".";
  if (id.includes(SCHEMA_SEPARATOR)) {
    const parts = id.split(SCHEMA_SEPARATOR).map(trim);
    if (parts.length === 2) {
      return SchemableIdentifierNode.createWithSchema(parts[0], parts[1]);
    } else {
      throw new Error(`invalid schemable identifier ${id}`);
    }
  } else {
    return SchemableIdentifierNode.create(id);
  }
}
function parseSchemableIdentifierArray(id) {
  if (!Array.isArray(id)) {
    id = [id];
  }
  return id.map(parseSchemableIdentifier);
}
function trim(str) {
  return str.trim();
}

// node_modules/kysely/dist/operation-node/refresh-materialized-view-node.js
var RefreshMaterializedViewNode = freeze({
  is(node) {
    return node.kind === "RefreshMaterializedViewNode";
  },
  create(name) {
    return freeze({
      kind: "RefreshMaterializedViewNode",
      name: SchemableIdentifierNode.create(name)
    });
  },
  cloneWith(createView, params) {
    return freeze({
      ...createView,
      ...params
    });
  }
});

// node_modules/kysely/dist/schema/refresh-materialized-view-builder.js
var RefreshMaterializedViewBuilder = class _RefreshMaterializedViewBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds the "concurrently" modifier.
   *
   * Use this to refresh the view without locking out concurrent selects on the materialized view.
   *
   * WARNING!
   * This cannot be used with the "with no data" modifier.
   */
  concurrently() {
    return new _RefreshMaterializedViewBuilder({
      ...this.#props,
      node: RefreshMaterializedViewNode.cloneWith(this.#props.node, {
        concurrently: true,
        withNoData: false
      })
    });
  }
  /**
   * Adds the "with data" modifier.
   *
   * If specified (or defaults) the backing query is executed to provide the new data, and the materialized view is left in a scannable state
   */
  withData() {
    return new _RefreshMaterializedViewBuilder({
      ...this.#props,
      node: RefreshMaterializedViewNode.cloneWith(this.#props.node, {
        withNoData: false
      })
    });
  }
  /**
   * Adds the "with no data" modifier.
   *
   * If specified, no new data is generated and the materialized view is left in an unscannable state.
   *
   * WARNING!
   * This cannot be used with the "concurrently" modifier.
   */
  withNoData() {
    return new _RefreshMaterializedViewBuilder({
      ...this.#props,
      node: RefreshMaterializedViewNode.cloneWith(this.#props.node, {
        withNoData: true,
        concurrently: false
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute(options) {
    await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/operation-node/alter-type-node.js
var AlterTypeNode = freeze({
  is(node) {
    return node.kind === "AlterTypeNode";
  },
  create(name) {
    return freeze({
      kind: "AlterTypeNode",
      name
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});

// node_modules/kysely/dist/operation-node/add-value-node.js
var AddValueNode = freeze({
  is(node) {
    return node.kind === "AddValueNode";
  },
  create(value) {
    return freeze({
      kind: "AddValueNode",
      value
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});

// node_modules/kysely/dist/query-finalizer.js
var QueryFinalizer = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  /**
   * Compiles the query.
   */
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  /**
   * Executes the query.
   */
  async execute(options) {
    return await this.#props.executor.executeQuery(this.compile(), options);
  }
};

// node_modules/kysely/dist/schema/alter-type-add-value-builder.js
var _a;
var AlterTypeAddValueBuilder = class extends QueryFinalizer {
  #props;
  constructor(props) {
    super(props);
    this.#props = props;
  }
  /**
   * Adds an `if not exists` clause.
   */
  ifNotExists() {
    return new _a({
      ...this.#props,
      node: AlterTypeNode.cloneWith(this.#props.node, {
        addValue: AddValueNode.cloneWith(this.#props.node.addValue, {
          ifNotExists: true
        })
      })
    });
  }
  /**
   * Sets a `before <value>` clause.
   */
  before(neighborValue) {
    return this.#setNeighbor(neighborValue, true);
  }
  /**
   * Sets an `after <value>` clause.
   */
  after(neighborValue) {
    return this.#setNeighbor(neighborValue, false);
  }
  #setNeighbor(neighborValue, isBefore) {
    return new _a({
      ...this.#props,
      node: AlterTypeNode.cloneWith(this.#props.node, {
        addValue: AddValueNode.cloneWith(this.#props.node.addValue, {
          isBefore,
          neighborValue: ValueNode.createImmediate(neighborValue)
        })
      })
    });
  }
};
_a = AlterTypeAddValueBuilder;

// node_modules/kysely/dist/operation-node/rename-value-node.js
var RenameValueNode = freeze({
  is(node) {
    return node.kind === "RenameValueNode";
  },
  create(oldValue, newValue) {
    return freeze({
      kind: "RenameValueNode",
      oldValue,
      newValue
    });
  }
});

// node_modules/kysely/dist/schema/alter-type-builder.js
var AlterTypeBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds a new value to an enum type.
   */
  addValue(value) {
    return new AlterTypeAddValueBuilder({
      ...this.#props,
      node: AlterTypeNode.cloneWith(this.#props.node, {
        addValue: AddValueNode.create(ValueNode.createImmediate(value))
      })
    });
  }
  /**
   * Rename the type.
   */
  renameTo(newName) {
    return new QueryFinalizer({
      ...this.#props,
      node: AlterTypeNode.cloneWith(this.#props.node, {
        renameTo: IdentifierNode.create(newName)
      })
    });
  }
  /**
   * Renames a value of an enum type.
   */
  renameValue(oldValue, newValue) {
    return new QueryFinalizer({
      ...this.#props,
      node: AlterTypeNode.cloneWith(this.#props.node, {
        renameValue: RenameValueNode.create(ValueNode.createImmediate(oldValue), ValueNode.createImmediate(newValue))
      })
    });
  }
  /**
   * Changes the type's schema.
   */
  setSchema(schema) {
    return new QueryFinalizer({
      ...this.#props,
      node: AlterTypeNode.cloneWith(this.#props.node, {
        setSchema: IdentifierNode.create(schema)
      })
    });
  }
};

// node_modules/kysely/dist/schema/schema-module.js
var SchemaModule = class _SchemaModule {
  #executor;
  constructor(executor) {
    this.#executor = executor;
  }
  /**
   * Create a new table.
   *
   * ### Examples
   *
   * This example creates a new table with columns `id`, `first_name`,
   * `last_name` and `gender`:
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
   *   .addColumn('first_name', 'varchar', col => col.notNull())
   *   .addColumn('last_name', 'varchar', col => col.notNull())
   *   .addColumn('gender', 'varchar')
   *   .execute()
   * ```
   *
   * This example creates a table with a foreign key. Not all database
   * engines support column-level foreign key constraint definitions.
   * For example if you are using MySQL 5.X see the next example after
   * this one.
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
   *   .addColumn('owner_id', 'integer', col => col
   *     .references('person.id')
   *     .onDelete('cascade')
   *   )
   *   .execute()
   * ```
   *
   * This example adds a foreign key constraint for a columns just
   * like the previous example, but using a table-level statement.
   * On MySQL 5.X you need to define foreign key constraints like
   * this:
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
   *   .addColumn('owner_id', 'integer')
   *   .addForeignKeyConstraint(
   *     'pet_owner_id_foreign', ['owner_id'], 'person', ['id'],
   *     (constraint) => constraint.onDelete('cascade')
   *   )
   *   .execute()
   * ```
   */
  createTable(table) {
    return new CreateTableBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: CreateTableNode.create(parseTable(table))
    });
  }
  /**
   * Drop a table.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropTable('person')
   *   .execute()
   * ```
   */
  dropTable(table) {
    return new DropTableBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: DropTableNode.create(parseTable(table))
    });
  }
  /**
   * Create a new index.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createIndex('person_full_name_unique_index')
   *   .on('person')
   *   .columns(['first_name', 'last_name'])
   *   .execute()
   * ```
   */
  createIndex(indexName) {
    return new CreateIndexBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: CreateIndexNode.create(indexName)
    });
  }
  /**
   * Drop an index.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropIndex('person_full_name_unique_index')
   *   .execute()
   * ```
   */
  dropIndex(indexName) {
    return new DropIndexBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: DropIndexNode.create(indexName)
    });
  }
  /**
   * Create a new schema.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createSchema('some_schema')
   *   .execute()
   * ```
   */
  createSchema(schema) {
    return new CreateSchemaBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: CreateSchemaNode.create(schema)
    });
  }
  /**
   * Drop a schema.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropSchema('some_schema')
   *   .execute()
   * ```
   */
  dropSchema(schema) {
    return new DropSchemaBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: DropSchemaNode.create(schema)
    });
  }
  /**
   * Alter a table.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .alterTable('person')
   *   .alterColumn('first_name', (ac) => ac.setDataType('text'))
   *   .execute()
   * ```
   */
  alterTable(table) {
    return new AlterTableBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: AlterTableNode.create(parseTable(table))
    });
  }
  /**
   * Create a new view.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createView('dogs')
   *   .orReplace()
   *   .as(db.selectFrom('pet').selectAll().where('species', '=', 'dog'))
   *   .execute()
   * ```
   */
  createView(viewName) {
    return new CreateViewBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: CreateViewNode.create(viewName)
    });
  }
  /**
   * Refresh a materialized view.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .refreshMaterializedView('my_view')
   *   .concurrently()
   *   .execute()
   * ```
   */
  refreshMaterializedView(viewName) {
    return new RefreshMaterializedViewBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: RefreshMaterializedViewNode.create(viewName)
    });
  }
  /**
   * Drop a view.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropView('dogs')
   *   .ifExists()
   *   .execute()
   * ```
   */
  dropView(viewName) {
    return new DropViewBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: DropViewNode.create(viewName)
    });
  }
  /**
   * Create a new type.
   *
   * Only some dialects like PostgreSQL have user-defined types.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createType('species')
   *   .asEnum(['dog', 'cat', 'frog'])
   *   .execute()
   * ```
   */
  createType(typeName) {
    return new CreateTypeBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: CreateTypeNode.create(parseSchemableIdentifier(typeName))
    });
  }
  /**
   * Alter a type. Rename it, change schema or add/rename enum type values.
   *
   * Only some dialects like PostgreSQL have user-defined types.
   *
   * ```ts
   * await db.schema
   *   .alterType('species')
   *   .addValue('capybara')
   *   .execute()
   * ```
   */
  alterType(name) {
    return new AlterTypeBuilder({
      executor: this.#executor,
      node: AlterTypeNode.create(parseSchemableIdentifier(name)),
      queryId: createQueryId()
    });
  }
  /**
   * Drop a type.
   *
   * Only some dialects like PostgreSQL have user-defined types.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropType('species')
   *   .ifExists()
   *   .execute()
   * ```
   *
   * You can also provide multiple type names:
   *
   * ```ts
   * await db.schema
   *   .dropType(['species', 'colors'])
   *   .ifExists()
   *   .cascade()
   *   .execute()
   * ```
   */
  dropType(typeName) {
    return new DropTypeBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: DropTypeNode.create(parseSchemableIdentifierArray(typeName))
    });
  }
  /**
   * Returns a copy of this schema module with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _SchemaModule(this.#executor.withPlugin(plugin));
  }
  /**
   * Returns a copy of this schema module  without any plugins.
   */
  withoutPlugins() {
    return new _SchemaModule(this.#executor.withoutPlugins());
  }
  /**
   * See {@link QueryCreator.withSchema}
   */
  withSchema(schema) {
    return new _SchemaModule(this.#executor.withPluginAtFront(new WithSchemaPlugin(schema)));
  }
};

// node_modules/kysely/dist/dynamic/dynamic.js
var DynamicModule = class {
  /**
   * Creates a dynamic reference to a column that is not know at compile time.
   *
   * Kysely is built in a way that by default you can't refer to tables or columns
   * that are not actually visible in the current query and context. This is all
   * done by TypeScript at compile time, which means that you need to know the
   * columns and tables at compile time. This is not always the case of course.
   *
   * This method is meant to be used in those cases where the column names
   * come from the user input or are not otherwise known at compile time.
   *
   * WARNING! Unlike values, column names are not escaped by the database engine
   * or Kysely and if you pass in unchecked column names using this method, you
   * create an SQL injection vulnerability. Always __always__ validate the user
   * input before passing it to this method.
   *
   * There are couple of examples below for some use cases, but you can pass
   * `ref` to other methods as well. If the types allow you to pass a `ref`
   * value to some place, it should work.
   *
   * ### Examples
   *
   * Filter by a column not know at compile time:
   *
   * ```ts
   * async function someQuery(filterColumn: string, filterValue: string) {
   *   const { ref } = db.dynamic
   *
   *   return await db
   *     .selectFrom('person')
   *     .selectAll()
   *     .where(ref(filterColumn), '=', filterValue)
   *     .execute()
   * }
   *
   * someQuery('first_name', 'Arnold')
   * someQuery('person.last_name', 'Aniston')
   * ```
   *
   * Order by a column not know at compile time:
   *
   * ```ts
   * async function someQuery(orderBy: string) {
   *   const { ref } = db.dynamic
   *
   *   return await db
   *     .selectFrom('person')
   *     .select('person.first_name as fn')
   *     .orderBy(ref(orderBy))
   *     .execute()
   * }
   *
   * someQuery('fn')
   * ```
   *
   * In this example we add selections dynamically:
   *
   * ```ts
   * const { ref } = db.dynamic
   *
   * // Some column name provided by the user. Value not known at compile time.
   * const columnFromUserInput: PossibleColumns = 'birthdate';
   *
   * // A type that lists all possible values `columnFromUserInput` can have.
   * // You can use `keyof Person` if any column of an interface is allowed.
   * type PossibleColumns = 'last_name' | 'first_name' | 'birthdate'
   *
   * const [person] = await db.selectFrom('person')
   *   .select([
   *     ref<PossibleColumns>(columnFromUserInput),
   *     'id'
   *   ])
   *   .execute()
   *
   * // The resulting type contains all `PossibleColumns` as optional fields
   * // because we cannot know which field was actually selected before
   * // running the code.
   * const lastName: string | null | undefined = person?.last_name
   * const firstName: string | undefined = person?.first_name
   * const birthDate: Date | null | undefined = person?.birthdate
   *
   * // The result type also contains the compile time selection `id`.
   * person?.id
   * ```
   */
  ref(reference) {
    return new DynamicReferenceBuilder(reference);
  }
  /**
   * Creates a table reference to a table that's not fully known at compile time.
   *
   * The type `T` is allowed to be a union of multiple tables.
   *
   * <!-- siteExample("select", "Generic find query", 130) -->
   *
   * A generic type-safe helper function for finding a row by a column value:
   *
   * ```ts
   * import { SelectType } from 'kysely'
   * import { Database } from 'type-editor'
   *
   * async function getRowByColumn<
   *   T extends keyof Database,
   *   C extends keyof Database[T] & string,
   *   V extends SelectType<Database[T][C]>,
   * >(t: T, c: C, v: V) {
   *   // We need to use the dynamic module since the table name
   *   // is not known at compile time.
   *   const { table, ref } = db.dynamic
   *
   *   return await db
   *     .selectFrom(table(t).as('t'))
   *     .selectAll()
   *     .where(ref(c), '=', v)
   *     .orderBy('t.id')
   *     .executeTakeFirstOrThrow()
   * }
   *
   * const person = await getRowByColumn('person', 'first_name', 'Arnold')
   * ```
   */
  table(table) {
    return new DynamicTableBuilder(table);
  }
};

// node_modules/kysely/dist/driver/default-connection-provider.js
var DefaultConnectionProvider = class {
  #driver;
  constructor(driver) {
    this.#driver = driver;
  }
  async provideConnection(consumer, options) {
    const connection = await this.#driver.acquireConnection(options);
    try {
      return await consumer(connection);
    } finally {
      await this.#driver.releaseConnection(connection, options);
    }
  }
};

// node_modules/kysely/dist/query-executor/default-query-executor.js
var DefaultQueryExecutor = class _DefaultQueryExecutor extends QueryExecutorBase {
  #compiler;
  #adapter;
  #connectionProvider;
  constructor(compiler, adapter, connectionProvider, plugins = []) {
    super(plugins);
    this.#compiler = compiler;
    this.#adapter = adapter;
    this.#connectionProvider = connectionProvider;
  }
  get adapter() {
    return this.#adapter;
  }
  compileQuery(node, queryId) {
    return this.#compiler.compileQuery(node, queryId);
  }
  provideConnection(consumer, options) {
    return this.#connectionProvider.provideConnection(consumer, options);
  }
  withPlugins(plugins) {
    return new _DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [...this.plugins, ...plugins]);
  }
  withPlugin(plugin) {
    return new _DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [...this.plugins, plugin]);
  }
  withPluginAtFront(plugin) {
    return new _DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [plugin, ...this.plugins]);
  }
  withConnectionProvider(connectionProvider) {
    return new _DefaultQueryExecutor(this.#compiler, this.#adapter, connectionProvider, [...this.plugins]);
  }
  withoutPlugins() {
    return new _DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, []);
  }
};

// node_modules/kysely/dist/util/performance-now.js
function performanceNow() {
  if (typeof performance !== "undefined" && isFunction(performance.now)) {
    return performance.now();
  } else {
    return Date.now();
  }
}

// node_modules/kysely/dist/driver/connection-mutex.js
var ConnectionMutex = class {
  #promise;
  #resolve;
  async obtainLock() {
    while (this.#promise) {
      await this.#promise;
    }
    this.#promise = new Promise((resolve) => {
      this.#resolve = resolve;
    });
  }
  releaseLock() {
    const resolve = this.#resolve;
    this.#promise = void 0;
    this.#resolve = void 0;
    resolve?.();
  }
};

// node_modules/kysely/dist/driver/runtime-driver.js
var RuntimeDriver = class {
  #driver;
  #log;
  #initPromise;
  #initDone;
  #destroyPromise;
  #connections = /* @__PURE__ */ new WeakSet();
  #connectionMutex;
  constructor(driver, adapter, log) {
    this.#driver = driver;
    this.#initDone = false;
    this.#log = log;
    if (adapter.supportsMultipleConnections === false) {
      this.#connectionMutex = new ConnectionMutex();
    }
  }
  async init(options) {
    if (this.#destroyPromise) {
      throw new Error("driver has already been destroyed");
    }
    this.#initPromise ??= this.#driver.init(options).then(() => {
      this.#initDone = true;
    }).catch((reason) => {
      this.#initPromise = void 0;
      throw reason;
    });
    await waitOrAbort(this.#initPromise, options?.signal, "init");
  }
  async acquireConnection(options) {
    if (this.#destroyPromise) {
      throw new Error("driver has already been destroyed");
    }
    if (!this.#initDone) {
      await this.init(options);
    }
    if (this.#connectionMutex) {
      const lockPromise = this.#connectionMutex.obtainLock();
      await waitOrAbort(lockPromise, options?.signal, "acquireConnection:mutex", () => lockPromise.then(() => this.#connectionMutex?.releaseLock()));
    }
    const connectionPromise = this.#driver.acquireConnection(options);
    const connection = await waitOrAbort(connectionPromise, options?.signal, "acquireConnection:acquire", () => connectionPromise?.then((connection2) => this.releaseConnection(connection2).catch(printBackgroundFail("driver.releaseConnection"))).catch(printBackgroundFail("driver.acquireConnection")));
    if (!this.#connections.has(connection)) {
      if (this.#needsLogging()) {
        this.#addLogging(connection);
      }
      this.#connections.add(connection);
    }
    return connection;
  }
  async releaseConnection(connection, options) {
    await this.#driver.releaseConnection(connection, options);
    this.#connectionMutex?.releaseLock();
  }
  async beginTransaction(connection, settings) {
    return await this.#driver.beginTransaction(connection, settings);
  }
  async commitTransaction(connection) {
    return await this.#driver.commitTransaction(connection);
  }
  async rollbackTransaction(connection) {
    return await this.#driver.rollbackTransaction(connection);
  }
  async savepoint(connection, savepointName, compileQuery) {
    if (this.#driver.savepoint) {
      return await this.#driver.savepoint(connection, savepointName, compileQuery);
    }
    throw new Error("The `savepoint` method is not supported by this driver");
  }
  async rollbackToSavepoint(connection, savepointName, compileQuery) {
    if (this.#driver.rollbackToSavepoint) {
      return await this.#driver.rollbackToSavepoint(connection, savepointName, compileQuery);
    }
    throw new Error("The `rollbackToSavepoint` method is not supported by this driver");
  }
  async releaseSavepoint(connection, savepointName, compileQuery) {
    if (this.#driver.releaseSavepoint) {
      return await this.#driver.releaseSavepoint(connection, savepointName, compileQuery);
    }
    throw new Error("The `releaseSavepoint` method is not supported by this driver");
  }
  async destroy(options) {
    if (!this.#initPromise) {
      return;
    }
    await waitOrAbort(this.#initPromise, options?.signal, "destroy:initPromise");
    this.#destroyPromise ??= this.#driver.destroy(options).catch((reason) => {
      this.#destroyPromise = void 0;
      throw reason;
    });
    await waitOrAbort(this.#destroyPromise, options?.signal, "destroy");
  }
  #needsLogging() {
    return this.#log.isLevelEnabled("query") || this.#log.isLevelEnabled("error");
  }
  // This method monkey patches the database connection's executeQuery method
  // by adding logging code around it. Monkey patching is not pretty, but it's
  // the best option in this case.
  #addLogging(connection) {
    const executeQuery = connection.executeQuery;
    const streamQuery = connection.streamQuery;
    const dis = this;
    connection.executeQuery = async (compiledQuery, options) => {
      let caughtError;
      const startTime = performanceNow();
      try {
        return await executeQuery.call(connection, compiledQuery, options);
      } catch (error) {
        caughtError = error;
        await dis.#logError(error, compiledQuery, startTime);
        throw error;
      } finally {
        if (!caughtError) {
          await dis.#logQuery(compiledQuery, startTime);
        }
      }
    };
    connection.streamQuery = async function* (compiledQuery, chunkSize, options) {
      let caughtError;
      const startTime = performanceNow();
      try {
        for await (const result of streamQuery.call(connection, compiledQuery, chunkSize, options)) {
          yield result;
        }
      } catch (error) {
        caughtError = error;
        await dis.#logError(error, compiledQuery, startTime);
        throw error;
      } finally {
        if (!caughtError) {
          await dis.#logQuery(compiledQuery, startTime, true);
        }
      }
    };
  }
  async #logError(error, compiledQuery, startTime) {
    await this.#log.error(() => ({
      level: "error",
      error,
      query: compiledQuery,
      queryDurationMillis: this.#calculateDurationMillis(startTime)
    }));
  }
  async #logQuery(compiledQuery, startTime, isStream = false) {
    await this.#log.query(() => ({
      level: "query",
      isStream,
      query: compiledQuery,
      queryDurationMillis: this.#calculateDurationMillis(startTime)
    }));
  }
  #calculateDurationMillis(startTime) {
    return performanceNow() - startTime;
  }
};

// node_modules/kysely/dist/driver/aborted-transaction-error.js
var ABORTED_TRANSACTION_ERROR = /* @__PURE__ */ Symbol.for("kysely.AbortedTransactionError");
var AbortedTransactionError = class extends Error {
  name = "AbortedTransactionError";
  [ABORTED_TRANSACTION_ERROR] = true;
  constructor(options) {
    super("Transaction was rolled back instead of committed", options);
  }
};
function isAbortedTransactionError(error) {
  return isObject(error) && ABORTED_TRANSACTION_ERROR in error;
}

// node_modules/kysely/dist/driver/single-connection-provider.js
var ignoreError = () => {
};
var SingleConnectionProvider = class {
  #connection;
  #runningPromise;
  constructor(connection) {
    this.#connection = connection;
  }
  async provideConnection(consumer) {
    while (this.#runningPromise) {
      await this.#runningPromise.catch(ignoreError);
    }
    this.#runningPromise = this.#run(consumer).finally(() => {
      this.#runningPromise = void 0;
    });
    return this.#runningPromise;
  }
  // Run the runner in an async function to make sure it doesn't
  // throw synchronous errors.
  async #run(runner) {
    return await runner(this.#connection);
  }
};

// node_modules/kysely/dist/driver/driver.js
var TRANSACTION_ACCESS_MODES = ["read only", "read write"];
var TRANSACTION_ISOLATION_LEVELS = [
  "read uncommitted",
  "read committed",
  "repeatable read",
  "serializable",
  "snapshot"
];
function validateTransactionSettings(settings) {
  if (settings.accessMode && !TRANSACTION_ACCESS_MODES.includes(settings.accessMode)) {
    throw new Error(`invalid transaction access mode ${settings.accessMode}`);
  }
  if (settings.isolationLevel && !TRANSACTION_ISOLATION_LEVELS.includes(settings.isolationLevel)) {
    throw new Error(`invalid transaction isolation level ${settings.isolationLevel}`);
  }
}

// node_modules/kysely/dist/util/log.js
var logLevels = ["query", "error"];
var LOG_LEVELS = freeze(logLevels);
var Log = class {
  #levels;
  #logger;
  constructor(config) {
    if (isFunction(config)) {
      this.#logger = config;
      this.#levels = freeze({
        query: true,
        error: true
      });
    } else {
      this.#logger = defaultLogger;
      this.#levels = freeze({
        query: config.includes("query"),
        error: config.includes("error")
      });
    }
  }
  isLevelEnabled(level) {
    return this.#levels[level];
  }
  async query(getEvent) {
    if (this.#levels.query) {
      await this.#logger(getEvent());
    }
  }
  async error(getEvent) {
    if (this.#levels.error) {
      await this.#logger(getEvent());
    }
  }
};
function defaultLogger(event) {
  if (event.level === "query") {
    const prefix = `kysely:query:${event.isStream ? "stream:" : ""}`;
    console.log(`${prefix} ${event.query.sql}`);
    console.log(`${prefix} duration: ${event.queryDurationMillis.toFixed(1)}ms`);
  } else if (event.level === "error") {
    if (event.error instanceof Error) {
      console.error(`kysely:error: ${event.error.stack ?? event.error.message}`);
    } else {
      console.error(`kysely:error: ${JSON.stringify({
        error: event.error,
        query: event.query.sql,
        queryDurationMillis: event.queryDurationMillis
      })}`);
    }
  }
}

// node_modules/kysely/dist/util/compilable.js
function isCompilable(value) {
  return isObject(value) && isFunction(value.compile);
}

// node_modules/kysely/dist/kysely.js
Symbol.asyncDispose ??= /* @__PURE__ */ Symbol("Symbol.asyncDispose");
var Kysely = class _Kysely extends QueryCreator {
  #props;
  constructor(args) {
    let superProps;
    let props;
    if (isKyselyProps(args)) {
      superProps = { executor: args.executor };
      props = { ...args };
    } else {
      const dialect = args.dialect;
      const driver = dialect.createDriver();
      const compiler = dialect.createQueryCompiler();
      const adapter = dialect.createAdapter();
      const log = new Log(args.log ?? []);
      const runtimeDriver = new RuntimeDriver(driver, adapter, log);
      const connectionProvider = new DefaultConnectionProvider(runtimeDriver);
      const executor = new DefaultQueryExecutor(compiler, adapter, connectionProvider, args.plugins ?? []);
      superProps = { executor };
      props = {
        config: args,
        executor,
        dialect,
        driver: runtimeDriver
      };
    }
    super(superProps);
    this.#props = freeze(props);
  }
  /**
   * Returns the {@link SchemaModule} module for building database schema.
   */
  get schema() {
    return new SchemaModule(this.#props.executor);
  }
  /**
   * Returns a the {@link DynamicModule} module.
   *
   * The {@link DynamicModule} module can be used to bypass strict typing and
   * passing in dynamic values for the queries.
   */
  get dynamic() {
    return new DynamicModule();
  }
  /**
   * Returns a {@link DatabaseIntrospector | database introspector}.
   */
  get introspection() {
    return this.#props.dialect.createIntrospector(this.withoutPlugins());
  }
  case(value) {
    return new CaseBuilder({
      node: CaseNode.create(isUndefined(value) ? void 0 : parseExpression(value))
    });
  }
  /**
   * Returns a {@link FunctionModule} that can be used to write somewhat type-safe function
   * calls.
   *
   * ```ts
   * const { count } = db.fn
   *
   * await db.selectFrom('person')
   *   .innerJoin('pet', 'pet.owner_id', 'person.id')
   *   .select([
   *     'id',
   *     count('pet.id').as('person_count'),
   *   ])
   *   .groupBy('person.id')
   *   .having(count('pet.id'), '>', 10)
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "person"."id", count("pet"."id") as "person_count"
   * from "person"
   * inner join "pet" on "pet"."owner_id" = "person"."id"
   * group by "person"."id"
   * having count("pet"."id") > $1
   * ```
   *
   * Why "somewhat" type-safe? Because the function calls are not bound to the
   * current query context. They allow you to reference columns and tables that
   * are not in the current query. E.g. remove the `innerJoin` from the previous
   * query and TypeScript won't even complain.
   *
   * If you want to make the function calls fully type-safe, you can use the
   * {@link ExpressionBuilder.fn} getter for a query context-aware, stricter {@link FunctionModule}.
   *
   * ```ts
   * await db.selectFrom('person')
   *   .innerJoin('pet', 'pet.owner_id', 'person.id')
   *   .select((eb) => [
   *     'person.id',
   *     eb.fn.count('pet.id').as('pet_count')
   *   ])
   *   .groupBy('person.id')
   *   .having((eb) => eb.fn.count('pet.id'), '>', 10)
   *   .execute()
   * ```
   */
  get fn() {
    return createFunctionModule();
  }
  /**
   * Creates a {@link TransactionBuilder} that can be used to run queries inside a transaction.
   *
   * The returned {@link TransactionBuilder} can be used to configure the transaction. The
   * {@link TransactionBuilder.execute} method can then be called to run the transaction.
   * {@link TransactionBuilder.execute} takes a function that is run inside the
   * transaction. If the function throws an exception,
   * 1. the exception is caught,
   * 2. the transaction is rolled back, and
   * 3. the exception is thrown again.
   * Otherwise the transaction is committed.
   *
   * The callback function passed to the {@link TransactionBuilder.execute | execute}
   * method gets the transaction object as its only argument. The transaction is
   * of type {@link Transaction} which inherits {@link Kysely}. Any query
   * started through the transaction object is executed inside the transaction.
   *
   * To run a controlled transaction, allowing you to commit and rollback manually,
   * use {@link startTransaction} instead.
   *
   * ### Examples
   *
   * <!-- siteExample("transactions", "Simple transaction", 10) -->
   *
   * This example inserts two rows in a transaction. If an exception is thrown inside
   * the callback passed to the `execute` method,
   * 1. the exception is caught,
   * 2. the transaction is rolled back, and
   * 3. the exception is thrown again.
   * Otherwise the transaction is committed.
   *
   * ```ts
   * const catto = await db.transaction().execute(async (trx) => {
   *   const jennifer = await trx.insertInto('person')
   *     .values({
   *       first_name: 'Jennifer',
   *       last_name: 'Aniston',
   *       age: 40,
   *     })
   *     .returning('id')
   *     .executeTakeFirstOrThrow()
   *
   *   return await trx.insertInto('pet')
   *     .values({
   *       owner_id: jennifer.id,
   *       name: 'Catto',
   *       species: 'cat',
   *       is_favorite: false,
   *     })
   *     .returningAll()
   *     .executeTakeFirst()
   * })
   * ```
   *
   * Setting the isolation level:
   *
   * ```ts
   * import type { Kysely } from 'kysely'
   *
   * await db
   *   .transaction()
   *   .setIsolationLevel('serializable')
   *   .execute(async (trx) => {
   *     await doStuff(trx)
   *   })
   *
   * async function doStuff(kysely: typeof db) {
   *   // ...
   * }
   * ```
   */
  transaction() {
    return new TransactionBuilder({ ...this.#props });
  }
  /**
   * Creates a {@link ControlledTransactionBuilder} that can be used to run queries inside a controlled transaction.
   *
   * The returned {@link ControlledTransactionBuilder} can be used to configure the transaction.
   * The {@link ControlledTransactionBuilder.execute} method can then be called
   * to start the transaction and return a {@link ControlledTransaction}.
   *
   * A {@link ControlledTransaction} allows you to commit and rollback manually,
   * execute savepoint commands. It extends {@link Transaction} which extends {@link Kysely},
   * so you can run queries inside the transaction. Once the transaction is committed,
   * or rolled back, it can't be used anymore - all queries will throw an error.
   * This is to prevent accidentally running queries outside the transaction - where
   * atomicity is not guaranteed anymore.
   *
   * ### Examples
   *
   * <!-- siteExample("transactions", "Controlled transaction", 11) -->
   *
   * A controlled transaction allows you to commit and rollback manually, execute
   * savepoint commands, and queries in general.
   *
   * In this example we start a transaction, use it to insert two rows and then commit
   * the transaction. If an error is thrown, we catch it and rollback the transaction.
   *
   * ```ts
   * const trx = await db.startTransaction().execute()
   *
   * try {
   *   const jennifer = await trx.insertInto('person')
   *     .values({
   *       first_name: 'Jennifer',
   *       last_name: 'Aniston',
   *       age: 40,
   *     })
   *     .returning('id')
   *     .executeTakeFirstOrThrow()
   *
   *   const catto = await trx.insertInto('pet')
   *     .values({
   *       owner_id: jennifer.id,
   *       name: 'Catto',
   *       species: 'cat',
   *       is_favorite: false,
   *     })
   *     .returningAll()
   *     .executeTakeFirstOrThrow()
   *
   *   await trx.commit().execute()
   *
   *   // ...
   * } catch (error) {
   *   await trx.rollback().execute()
   * }
   * ```
   *
   * <!-- siteExample("transactions", "Controlled transaction /w savepoints", 12) -->
   *
   * A controlled transaction allows you to commit and rollback manually, execute
   * savepoint commands, and queries in general.
   *
   * In this example we start a transaction, insert a person, create a savepoint,
   * try inserting a toy and a pet, and if an error is thrown, we rollback to the
   * savepoint. Eventually we release the savepoint, insert an audit record and
   * commit the transaction. If an error is thrown, we catch it and rollback the
   * transaction.
   *
   * ```ts
   * const trx = await db.startTransaction().execute()
   *
   * try {
   *   const jennifer = await trx
   *     .insertInto('person')
   *     .values({
   *       first_name: 'Jennifer',
   *       last_name: 'Aniston',
   *       age: 40,
   *     })
   *     .returning('id')
   *     .executeTakeFirstOrThrow()
   *
   *   const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
   *
   *   try {
   *     const catto = await trxAfterJennifer
   *       .insertInto('pet')
   *       .values({
   *         owner_id: jennifer.id,
   *         name: 'Catto',
   *         species: 'cat',
   *       })
   *       .returning('id')
   *       .executeTakeFirstOrThrow()
   *
   *     await trxAfterJennifer
   *       .insertInto('toy')
   *       .values({ name: 'Bone', price: 1.99, pet_id: catto.id })
   *       .execute()
   *   } catch (error) {
   *     await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
   *   }
   *
   *   await trxAfterJennifer.releaseSavepoint('after_jennifer').execute()
   *
   *   await trx.insertInto('audit').values({ action: 'added Jennifer' }).execute()
   *
   *   await trx.commit().execute()
   * } catch (error) {
   *   await trx.rollback().execute()
   * }
   * ```
   */
  startTransaction() {
    return new ControlledTransactionBuilder({ ...this.#props });
  }
  /**
   * Provides a kysely instance bound to a single database connection.
   *
   * ### Examples
   *
   * ```ts
   * await db
   *   .connection()
   *   .execute(async (db) => {
   *     // `db` is an instance of `Kysely` that's bound to a single
   *     // database connection. All queries executed through `db` use
   *     // the same connection.
   *     await doStuff(db)
   *   })
   *
   * async function doStuff(kysely: typeof db) {
   *   // ...
   * }
   * ```
   */
  connection() {
    return new ConnectionBuilder({ ...this.#props });
  }
  /**
   * Returns a copy of this Kysely instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _Kysely({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  /**
   * Returns a copy of this Kysely instance without any plugins.
   */
  withoutPlugins() {
    return new _Kysely({
      ...this.#props,
      executor: this.#props.executor.withoutPlugins()
    });
  }
  /**
   * @override
   */
  withSchema(schema) {
    return new _Kysely({
      ...this.#props,
      executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
  /**
   * Returns a copy of this Kysely instance with tables added to its
   * database type.
   *
   * This method only modifies the types and doesn't affect any of the
   * executed queries in any way.
   *
   * ### Examples
   *
   * The following example adds and uses a temporary table:
   *
   * ```ts
   * await db.schema
   *   .createTable('temp_table')
   *   .temporary()
   *   .addColumn('some_column', 'integer')
   *   .execute()
   *
   * const tempDb = db.$extendTables<{
   *   temp_table: {
   *     some_column: number
   *   }
   * }>()
   *
   * await tempDb
   *   .insertInto('temp_table')
   *   .values({ some_column: 100 })
   *   .execute()
   * ```
   */
  $extendTables() {
    return new _Kysely({ ...this.#props });
  }
  /**
   * Returns a copy of this Kysely instance without the given tables (provided as
   * a union type of table names).
   *
   * This method only modifies the types and doesn't affect any of the executed
   * queries in any way.
   *
   * See also {@link $pickTables} and {@link $extendTables}.
   *
   * ### Examples
   *
   * The following example omits tables not used in the downstream query. This
   * can help with compile-time performance as downstream checks and calculations
   * work against a smaller scope of the database - less tables and columns.
   *
   * Don't optimize prematurely! Build your queries first, measure later. If you
   * realize the query has a noticeable impact on compilation - try the helper.
   *
   * ```ts
   * const results = await db
   *   .$omitTables<'toy'>()
   *   .selectFrom('person')
   *   .innerJoin('pet', 'pet.owner_id', 'person.id')
   *   .selectAll()
   *   .execute()
   * ```
   *
   * The query is arguably less readable now, and changing it is less obvious -
   * e.g. adding another table.
   */
  $omitTables() {
    return new _Kysely({ ...this.#props });
  }
  /**
   * Returns a copy of this Kysely instance with just the given tables (provided as
   * a union type of table names).
   *
   * This method only modifies the types and doesn't affect any of the executed
   * queries in any way.
   *
   * See also {@link $omitTables} and {@link $extendTables}.
   *
   * ### Examples
   *
   * The following example picks the tables used in the downstream query. This
   * can help with compile-time performance as downstream checks and calculations
   * work against a smaller scope of the database - less tables and columns.
   *
   * Don't optimize prematurely! Build your queries first, measure later. If you
   * realize the query has a noticeable impact on compilation - try the helper.
   *
   * ```ts
   * const results = await db
   *   .$pickTables<'person' | 'pet'>()
   *   .selectFrom('person')
   *   .innerJoin('pet', 'pet.owner_id', 'person.id')
   *   .selectAll()
   *   .execute()
   * ```
   *
   * The query is arguably less readable now, and changing it is less obvious -
   * e.g. adding another table.
   */
  $pickTables() {
    return new _Kysely({ ...this.#props });
  }
  /**
   * @deprecated use {@link $extendTables} instead.
   */
  // TODO: remove in 0.30
  withTables() {
    return this.$extendTables();
  }
  /**
   * Releases all resources and disconnects from the database.
   *
   * Call this when you are done using the `Kysely` instance and Kysely is
   * responsible for closing its connections, pool, or database instance.
   *
   * If the pool or database instance is shared with other consumers or its
   * lifecycle is managed elsewhere, skip this call. Let the application close it
   * once all consumers, including Kysely, have finished. No separate cleanup of
   * the `Kysely` instance is needed.
   *
   * The driver is initialized lazily. If initialization hasn't started, this
   * method does nothing.
   */
  async destroy() {
    await this.#props.driver.destroy();
  }
  /**
   * Returns true if this `Kysely` instance is a transaction.
   *
   * You can also use `db instanceof Transaction`.
   */
  get isTransaction() {
    return false;
  }
  /**
   * @internal
   * @private
   */
  getExecutor() {
    return this.#props.executor;
  }
  /**
   * Executes a given compiled query or query builder.
   *
   * Returns a {@link QueryResult} containing `rows` and any metadata provided
   * by the dialect, such as `numAffectedRows` or `insertId`.
   * Unlike a query builder's `execute`, this method doesn't wrap write metadata
   * in an {@link InsertResult}, {@link UpdateResult} or {@link DeleteResult}.
   * Without `returning` or `output`, a write normally has an empty `rows` array.
   *
   * ### Examples
   *
   * ```ts
   * const query = db
   *   .selectFrom('person')
   *   .select(['id', 'first_name'])
   *   .where('id', '=', 123)
   *   .compile()
   *
   * const { rows } = await db.executeQuery(query)
   * console.log(rows[0]?.first_name)
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "id", "first_name"
   * from "person"
   * where "id" = $1
   * ```
   *
   * Read metadata from a write query:
   *
   * ```ts
   * const query = db
   *   .updateTable('person')
   *   .set({ first_name: 'Jennifer' })
   *   .where('id', '=', 123)
   *   .compile()
   *
   * const { numAffectedRows } = await db.executeQuery(query)
   * console.log(numAffectedRows)
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * update "person"
   * set "first_name" = $1
   * where "id" = $2
   * ```
   *
   * See {@link https://github.com/kysely-org/kysely/blob/master/site/docs/recipes/0004-splitting-query-building-and-execution.md#execute-compiled-queries splitting build, compile and execute code recipe} for more information.
   */
  async executeQuery(query, options) {
    const compiledQuery = isCompilable(query) ? query.compile() : query;
    return await this.#props.executor.executeQuery(compiledQuery, options);
  }
  async [Symbol.asyncDispose]() {
    await this.destroy();
  }
};
var Transaction = class _Transaction extends Kysely {
  #props;
  constructor(props) {
    super(props);
    this.#props = props;
  }
  // The return type is `true` instead of `boolean` to make Kysely<DB>
  // unassignable to Transaction<DB> while allowing assignment the
  // other way around.
  get isTransaction() {
    return true;
  }
  /**
   * @deprecated calling the transaction method for a Transaction is not supported
   */
  transaction() {
    throw new Error("calling the transaction method for a Transaction is not supported");
  }
  /**
   * @deprecated calling the controlled transaction method for a Transaction is not supported
   */
  startTransaction() {
    throw new Error("calling the controlled transaction method for a Transaction is not supported");
  }
  /**
   * @deprecated calling the connection method for a Transaction is not supported
   */
  connection() {
    throw new Error("calling the connection method for a Transaction is not supported");
  }
  /**
   * @deprecated calling the destroy method for a Transaction is not supported
   */
  destroy() {
    throw new Error("calling the destroy method for a Transaction is not supported");
  }
  /**
   * Similar to {@link Kysely.withPlugin} but returns the transaction.
   */
  withPlugin(plugin) {
    return new _Transaction({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  /**
   * Similar to {@link Kysely.withoutPlugins} but returns the transaction.
   */
  withoutPlugins() {
    return new _Transaction({
      ...this.#props,
      executor: this.#props.executor.withoutPlugins()
    });
  }
  /**
   * Similar to {@link Kysely.withSchema} but returns the transaction.
   */
  withSchema(schema) {
    return new _Transaction({
      ...this.#props,
      executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
  /**
   * Similar to {@link Kysely.withTables} but returns the transaction.
   *
   * @deprecated use {@link $extendTables} instead.
   */
  withTables() {
    return new _Transaction({ ...this.#props });
  }
  /**
   * Similar to {@link Kysely.$extendTables} but returns the transaction.
   */
  $extendTables() {
    return new _Transaction({ ...this.#props });
  }
  /**
   * Similar to {@link Kysely.$omitTables} but returns the transaction.
   */
  $omitTables() {
    return new _Transaction({ ...this.#props });
  }
  /**
   * Similar to {@link Kysely.$pickTables} but returns the transaction.
   */
  $pickTables() {
    return new _Transaction({ ...this.#props });
  }
};
function isKyselyProps(obj) {
  return isObject(obj) && isObject(obj.config) && isObject(obj.driver) && isObject(obj.executor) && isObject(obj.dialect);
}
var ConnectionBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  async execute(callback, options) {
    return this.#props.executor.provideConnection(async (connection) => {
      const executor = this.#props.executor.withConnectionProvider(new SingleConnectionProvider(connection));
      const db = new Kysely({ ...this.#props, executor });
      return await callback(db);
    }, freeze({ signal: options?.signal }));
  }
};
var TransactionBuilder = class _TransactionBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  setAccessMode(accessMode) {
    return new _TransactionBuilder({
      ...this.#props,
      accessMode
    });
  }
  setIsolationLevel(isolationLevel) {
    return new _TransactionBuilder({
      ...this.#props,
      isolationLevel
    });
  }
  async execute(callback) {
    const { isolationLevel, accessMode, ...kyselyProps } = this.#props;
    const settings = { isolationLevel, accessMode };
    validateTransactionSettings(settings);
    return this.#props.executor.provideConnection(async (connection) => {
      const transactionState = {
        status: "active"
      };
      const executor = new NotCommittedOrRolledBackAssertingExecutor(this.#props.executor.withConnectionProvider(new SingleConnectionProvider(connection)), transactionState);
      const transaction = new Transaction({ ...kyselyProps, executor });
      let transactionBegun = false;
      try {
        await this.#props.driver.beginTransaction(connection, settings);
        transactionBegun = true;
        const result = await callback(transaction);
        await this.#props.driver.commitTransaction(connection);
        transactionState.status = "committed";
        return result;
      } catch (error) {
        if (isAbortedTransactionError(error)) {
          transactionState.status = "aborted";
        } else if (transactionBegun) {
          await this.#props.driver.rollbackTransaction(connection);
          transactionState.status = "rolled back";
        }
        throw error;
      }
    });
  }
};
var ControlledTransactionBuilder = class _ControlledTransactionBuilder {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  setAccessMode(accessMode) {
    return new _ControlledTransactionBuilder({
      ...this.#props,
      accessMode
    });
  }
  setIsolationLevel(isolationLevel) {
    return new _ControlledTransactionBuilder({
      ...this.#props,
      isolationLevel
    });
  }
  async execute() {
    const { isolationLevel, accessMode, ...props } = this.#props;
    const settings = { isolationLevel, accessMode };
    validateTransactionSettings(settings);
    const connection = await provideControlledConnection(this.#props.executor);
    try {
      await this.#props.driver.beginTransaction(connection.connection, settings);
    } catch (error) {
      connection.release();
      throw error;
    }
    return new ControlledTransaction({
      ...props,
      connection,
      transactionState: { status: "active" },
      executor: this.#props.executor.withConnectionProvider(new SingleConnectionProvider(connection.connection))
    });
  }
};
var ControlledTransaction = class _ControlledTransaction extends Transaction {
  #props;
  #compileQuery;
  constructor(props) {
    props = {
      ...props,
      executor: new NotCommittedOrRolledBackAssertingExecutor(props.executor, props.transactionState)
    };
    const { connection, transactionState, ...transactionProps } = props;
    super(transactionProps);
    this.#props = freeze(props);
    const queryId = createQueryId();
    this.#compileQuery = (node) => props.executor.compileQuery(node, queryId);
  }
  get isCommitted() {
    return this.#props.transactionState.status === "committed";
  }
  get isRolledBack() {
    return this.#props.transactionState.status === "rolled back" || this.#props.transactionState.status === "aborted";
  }
  /**
   * Commits the transaction.
   *
   * If the database rolls back instead of committing, marks the transaction
   * as rolled back, releases the connection and throws {@link AbortedTransactionError}.
   *
   * Waits for ongoing queries to finish. Streams must be exhausted or closed
   * before awaiting this command. When consuming a stream with `for await`,
   * exit the loop before committing.
   *
   * See {@link rollback}.
   *
   * ### Examples
   *
   * ```ts
   * import type { Kysely } from 'kysely'
   * import type { Database } from 'type-editor' // imaginary module
   *
   * const trx = await db.startTransaction().execute()
   *
   * try {
   *   await doSomething(trx)
   *
   *   await trx.commit().execute()
   * } catch (error) {
   *   await trx.rollback().execute()
   * }
   *
   * async function doSomething(kysely: Kysely<Database>) {}
   * ```
   */
  commit() {
    return new Command(async () => {
      await this.#props.executor.provideConnection(async (connection) => {
        try {
          await this.#props.driver.commitTransaction(connection);
        } catch (error) {
          if (isAbortedTransactionError(error)) {
            this.#props.transactionState.status = "aborted";
            this.#props.connection.release();
          }
          throw error;
        }
        this.#props.transactionState.status = "committed";
        this.#props.connection.release();
      });
    });
  }
  /**
   * Rolls back the transaction.
   *
   * If a commit already reported that the database rolled back the transaction,
   * succeeds without sending another rollback command.
   *
   * The connection is released even if the rollback fails, so the transaction
   * cannot be used afterwards in either case.
   *
   * Waits for ongoing queries to finish. Streams must be exhausted or closed
   * before awaiting this command. When consuming a stream with `for await`,
   * exit the loop before rolling back.
   *
   * See {@link commit} and {@link rollbackToSavepoint}.
   *
   * ### Examples
   *
   * ```ts
   * import type { Kysely } from 'kysely'
   * import type { Database } from 'type-editor' // imaginary module
   *
   * const trx = await db.startTransaction().execute()
   *
   * try {
   *   await doSomething(trx)
   *
   *   await trx.commit().execute()
   * } catch (error) {
   *   await trx.rollback().execute()
   * }
   *
   * async function doSomething(kysely: Kysely<Database>) {}
   * ```
   */
  rollback() {
    return new Command(async () => {
      if (this.#props.transactionState.status === "aborted") {
        return;
      }
      await this.#props.executor.provideConnection(async (connection) => {
        try {
          await this.#props.driver.rollbackTransaction(connection);
        } finally {
          this.#props.transactionState.status = "rolled back";
          this.#props.connection.release();
        }
      });
    });
  }
  /**
   * Creates a savepoint with a given name.
   *
   * Waits for ongoing queries to finish. Streams must be exhausted or closed
   * before awaiting this command. When consuming a stream with `for await`,
   * exit the loop before creating a savepoint.
   *
   * See {@link rollbackToSavepoint} and {@link releaseSavepoint}.
   *
   * For a type-safe experience, you should use the returned instance from now on.
   *
   * ### Examples
   *
   * ```ts
   * import type { Kysely } from 'kysely'
   * import type { Database } from 'type-editor' // imaginary module
   *
   * const trx = await db.startTransaction().execute()
   *
   * await insertJennifer(trx)
   *
   * const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
   *
   * try {
   *   await doSomething(trxAfterJennifer)
   * } catch (error) {
   *   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
   * }
   *
   * async function insertJennifer(kysely: Kysely<Database>) {}
   * async function doSomething(kysely: Kysely<Database>) {}
   * ```
   */
  savepoint(savepointName) {
    return new Command(async () => {
      await this.#props.executor.provideConnection(async (connection) => {
        await this.#props.driver.savepoint?.(connection, savepointName, this.#compileQuery);
      });
      return new _ControlledTransaction({ ...this.#props });
    });
  }
  /**
   * Rolls back to a savepoint with a given name.
   *
   * Waits for ongoing queries to finish. Streams must be exhausted or closed
   * before awaiting this command. When consuming a stream with `for await`,
   * exit the loop before rolling back to a savepoint.
   *
   * See {@link savepoint} and {@link releaseSavepoint}.
   *
   * You must use the same instance returned by {@link savepoint}, or
   * escape the type-check by using `as any`.
   *
   * ### Examples
   *
   * ```ts
   * import type { Kysely } from 'kysely'
   * import type { Database } from 'type-editor' // imaginary module
   *
   * const trx = await db.startTransaction().execute()
   *
   * await insertJennifer(trx)
   *
   * const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
   *
   * try {
   *   await doSomething(trxAfterJennifer)
   * } catch (error) {
   *   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
   * }
   *
   * async function insertJennifer(kysely: Kysely<Database>) {}
   * async function doSomething(kysely: Kysely<Database>) {}
   * ```
   */
  rollbackToSavepoint(savepointName) {
    return new Command(async () => {
      await this.#props.executor.provideConnection(async (connection) => {
        await this.#props.driver.rollbackToSavepoint?.(connection, savepointName, this.#compileQuery);
      });
      return new _ControlledTransaction({ ...this.#props });
    });
  }
  /**
   * Releases a savepoint with a given name.
   *
   * Waits for ongoing queries to finish. Streams must be exhausted or closed
   * before awaiting this command. When consuming a stream with `for await`,
   * exit the loop before releasing a savepoint.
   *
   * See {@link savepoint} and {@link rollbackToSavepoint}.
   *
   * You must use the same instance returned by {@link savepoint}, or
   * escape the type-check by using `as any`.
   *
   * ### Examples
   *
   * ```ts
   * import type { Kysely } from 'kysely'
   * import type { Database } from 'type-editor' // imaginary module
   *
   * const trx = await db.startTransaction().execute()
   *
   * await insertJennifer(trx)
   *
   * const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
   *
   * try {
   *   await doSomething(trxAfterJennifer)
   * } catch (error) {
   *   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
   * }
   *
   * await trxAfterJennifer.releaseSavepoint('after_jennifer').execute()
   *
   * await doSomethingElse(trx)
   *
   * async function insertJennifer(kysely: Kysely<Database>) {}
   * async function doSomething(kysely: Kysely<Database>) {}
   * async function doSomethingElse(kysely: Kysely<Database>) {}
   * ```
   */
  releaseSavepoint(savepointName) {
    return new Command(async () => {
      await this.#props.executor.provideConnection(async (connection) => {
        await this.#props.driver.releaseSavepoint?.(connection, savepointName, this.#compileQuery);
      });
      return new _ControlledTransaction({ ...this.#props });
    });
  }
  withPlugin(plugin) {
    return new _ControlledTransaction({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  withoutPlugins() {
    return new _ControlledTransaction({
      ...this.#props,
      executor: this.#props.executor.withoutPlugins()
    });
  }
  withSchema(schema) {
    return new _ControlledTransaction({
      ...this.#props,
      executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
  withTables() {
    return new _ControlledTransaction({ ...this.#props });
  }
  $extendTables() {
    return new _ControlledTransaction({ ...this.#props });
  }
  $omitTables() {
    return new _ControlledTransaction({ ...this.#props });
  }
  $pickTables() {
    return new _ControlledTransaction({ ...this.#props });
  }
};
var Command = class {
  #cb;
  constructor(cb) {
    this.#cb = cb;
  }
  /**
   * Executes the command.
   */
  async execute() {
    return await this.#cb();
  }
};
function assertNotCommittedOrRolledBack(transactionState) {
  if (transactionState.status === "committed") {
    throw new Error("Transaction is already committed");
  }
  if (transactionState.status !== "active") {
    throw new Error("Transaction is already rolled back");
  }
}
var NotCommittedOrRolledBackAssertingExecutor = class _NotCommittedOrRolledBackAssertingExecutor {
  #executor;
  #transactionState;
  constructor(executor, transactionState) {
    this.#executor = executor instanceof _NotCommittedOrRolledBackAssertingExecutor ? executor.#executor : executor;
    this.#transactionState = transactionState;
  }
  get adapter() {
    return this.#executor.adapter;
  }
  get plugins() {
    return this.#executor.plugins;
  }
  transformQuery(node, queryId) {
    return this.#executor.transformQuery(node, queryId);
  }
  compileQuery(node, queryId) {
    return this.#executor.compileQuery(node, queryId);
  }
  provideConnection(consumer, options) {
    assertNotCommittedOrRolledBack(this.#transactionState);
    return this.#executor.provideConnection(async (connection) => {
      assertNotCommittedOrRolledBack(this.#transactionState);
      return await consumer(connection);
    }, options);
  }
  executeQuery(compiledQuery, options) {
    assertNotCommittedOrRolledBack(this.#transactionState);
    return this.#executor.withConnectionProvider(this).executeQuery(compiledQuery, options);
  }
  stream(compiledQuery, chunkSize, options) {
    assertNotCommittedOrRolledBack(this.#transactionState);
    return this.#executor.withConnectionProvider(this).stream(compiledQuery, chunkSize, options);
  }
  withConnectionProvider(connectionProvider) {
    return new _NotCommittedOrRolledBackAssertingExecutor(this.#executor.withConnectionProvider(connectionProvider), this.#transactionState);
  }
  withPlugin(plugin) {
    return new _NotCommittedOrRolledBackAssertingExecutor(this.#executor.withPlugin(plugin), this.#transactionState);
  }
  withPlugins(plugins) {
    return new _NotCommittedOrRolledBackAssertingExecutor(this.#executor.withPlugins(plugins), this.#transactionState);
  }
  withPluginAtFront(plugin) {
    return new _NotCommittedOrRolledBackAssertingExecutor(this.#executor.withPluginAtFront(plugin), this.#transactionState);
  }
  withoutPlugins() {
    return new _NotCommittedOrRolledBackAssertingExecutor(this.#executor.withoutPlugins(), this.#transactionState);
  }
};

// node_modules/kysely/dist/parser/savepoint-parser.js
function parseSavepointCommand(command, savepointName) {
  return RawNode.createWithChildren([
    RawNode.createWithSql(`${command} `),
    IdentifierNode.create(savepointName)
    // ensures savepointName gets sanitized
  ]);
}

// node_modules/kysely/dist/dialect/sqlite/sqlite-driver.js
var SqliteDriver = class {
  #config;
  #db;
  #connection;
  constructor(config) {
    this.#config = freeze({ ...config });
  }
  async init(options) {
    this.#db = isFunction(this.#config.database) ? await this.#config.database(options) : this.#config.database;
    this.#connection = new SqliteConnection(this.#db);
    if (this.#config.onCreateConnection) {
      await this.#config.onCreateConnection(this.#connection, options);
    }
  }
  async acquireConnection() {
    return this.#connection;
  }
  async beginTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("begin"));
  }
  async commitTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("commit"));
  }
  async rollbackTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("rollback"));
  }
  async savepoint(connection, savepointName, compileQuery) {
    await connection.executeQuery(compileQuery(parseSavepointCommand("savepoint", savepointName), createQueryId()));
  }
  async rollbackToSavepoint(connection, savepointName, compileQuery) {
    await connection.executeQuery(compileQuery(parseSavepointCommand("rollback to", savepointName), createQueryId()));
  }
  async releaseSavepoint(connection, savepointName, compileQuery) {
    await connection.executeQuery(compileQuery(parseSavepointCommand("release", savepointName), createQueryId()));
  }
  async releaseConnection() {
  }
  async destroy() {
    this.#db?.close();
  }
};
var SqliteConnection = class {
  #db;
  constructor(db) {
    this.#db = db;
  }
  async executeQuery(compiledQuery) {
    const { sql: sql2, parameters } = compiledQuery;
    const stmt = this.#db.prepare(sql2);
    if (stmt.reader) {
      return {
        rows: stmt.all(parameters)
      };
    }
    const { changes, lastInsertRowid } = stmt.run(parameters);
    return {
      insertId: lastInsertRowid != null ? BigInt(lastInsertRowid) : void 0,
      numAffectedRows: changes != null ? BigInt(changes) : void 0,
      rows: []
    };
  }
  async *streamQuery(compiledQuery, _chunkSize) {
    const { sql: sql2, parameters, query } = compiledQuery;
    const stmt = this.#db.prepare(sql2);
    if (!SelectQueryNode.is(query)) {
      throw new Error("Sqlite driver only supports streaming of select queries");
    }
    const iter = stmt.iterate(parameters);
    for (const row of iter) {
      yield {
        rows: [row]
      };
    }
  }
};

// node_modules/kysely/dist/migration/migrator.js
var DEFAULT_MIGRATION_TABLE = "kysely_migration";
var DEFAULT_MIGRATION_LOCK_TABLE = "kysely_migration_lock";
var NO_MIGRATIONS = freeze({ __noMigrations__: true });

// node_modules/kysely/dist/dialect/sqlite/sqlite-introspector.js
var SqliteIntrospector = class {
  #db;
  constructor(db) {
    this.#db = db;
  }
  async getSchemas() {
    return [];
  }
  async getTables(options = { withInternalKyselyTables: false }) {
    return await this.#getTableMetadata(options);
  }
  #tablesQuery(qb, options) {
    let tablesQuery = qb.selectFrom("sqlite_master").where("type", "in", ["table", "view"]).where("name", "not like", "sqlite_%").select(["name", "sql", "type"]).orderBy("name");
    if (!options.withInternalKyselyTables) {
      tablesQuery = tablesQuery.where("name", "!=", DEFAULT_MIGRATION_TABLE).where("name", "!=", DEFAULT_MIGRATION_LOCK_TABLE);
    }
    return tablesQuery;
  }
  async #getTableMetadata(options) {
    const tablesResult = await this.#tablesQuery(this.#db, options).execute();
    const tableMetadata = await this.#db.with("table_list", (qb) => this.#tablesQuery(qb, options)).selectFrom([
      "table_list as tl",
      sql`pragma_table_info(tl.name)`.as("p")
    ]).select([
      "tl.name as table",
      "p.cid",
      "p.name",
      "p.type",
      "p.notnull",
      "p.dflt_value",
      "p.pk"
    ]).orderBy("tl.name").orderBy("p.cid").execute();
    const columnsByTable = {};
    for (const row of tableMetadata) {
      columnsByTable[row.table] ??= [];
      columnsByTable[row.table].push(row);
    }
    return tablesResult.map(({ name, sql: sql2, type }) => {
      let autoIncrementCol = sql2?.split(/[\(\),]/)?.find((it) => it.toLowerCase().includes("autoincrement"))?.trimStart()?.split(/\s+/)?.[0]?.replace(/["`]/g, "");
      const columns = columnsByTable[name] ?? [];
      if (!autoIncrementCol) {
        const pkCols = columns.filter((r) => r.pk > 0);
        if (pkCols.length === 1 && pkCols[0].type.toLowerCase() === "integer") {
          autoIncrementCol = pkCols[0].name;
        }
      }
      return {
        name,
        isView: type === "view",
        isForeign: false,
        columns: columns.map((col) => ({
          name: col.name,
          dataType: col.type,
          isNullable: !col.notnull,
          isAutoIncrementing: col.name === autoIncrementCol,
          hasDefaultValue: col.dflt_value != null,
          comment: void 0
        }))
      };
    });
  }
};

// node_modules/kysely/dist/dialect/sqlite/sqlite-dialect.js
var SqliteDialect = class {
  #config;
  constructor(config) {
    this.#config = freeze({ ...config });
  }
  createDriver() {
    return new SqliteDriver(this.#config);
  }
  createQueryCompiler() {
    return new SqliteQueryCompiler();
  }
  createAdapter() {
    return new SqliteAdapter();
  }
  createIntrospector(db) {
    return new SqliteIntrospector(db);
  }
};

// node_modules/kysely/dist/util/stack-trace-utils.js
function extendStackTrace(err, stackError) {
  if (isStackHolder(err) && stackError.stack) {
    const stackExtension = stackError.stack.split("\n").slice(1).join("\n");
    err.stack += `
${stackExtension}`;
    return err;
  }
  return err;
}
function isStackHolder(obj) {
  return isObject(obj) && isString(obj.stack);
}

// node_modules/kysely/dist/dialect/mysql/mysql-driver.js
var PRIVATE_RELEASE_METHOD = /* @__PURE__ */ Symbol();
var MysqlDriver = class {
  #config;
  #connections = /* @__PURE__ */ new WeakMap();
  #pool;
  constructor(config) {
    this.#config = freeze({ ...config });
  }
  async init(options) {
    this.#pool = isFunction(this.#config.pool) ? await this.#config.pool(options) : this.#config.pool;
  }
  async acquireConnection(options) {
    const rawConnection = await this.#acquireConnection();
    let connection = this.#connections.get(rawConnection);
    if (!connection) {
      connection = new MysqlConnection(rawConnection, this.#config.controlConnection);
      this.#connections.set(rawConnection, connection);
      if (this.#config?.onCreateConnection) {
        await this.#config.onCreateConnection(connection, options);
      }
    }
    if (this.#config?.onReserveConnection) {
      await this.#config.onReserveConnection(connection, options);
    }
    return connection;
  }
  async beginTransaction(connection, settings) {
    if (settings.isolationLevel || settings.accessMode) {
      const parts = [];
      if (settings.isolationLevel) {
        parts.push(`isolation level ${settings.isolationLevel}`);
      }
      if (settings.accessMode) {
        parts.push(settings.accessMode);
      }
      const sql2 = `set transaction ${parts.join(", ")}`;
      await connection.executeQuery(CompiledQuery.raw(sql2));
    }
    await connection.executeQuery(CompiledQuery.raw("begin"));
  }
  async commitTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("commit"));
  }
  async rollbackTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("rollback"));
  }
  async savepoint(connection, savepointName, compileQuery) {
    await connection.executeQuery(compileQuery(parseSavepointCommand("savepoint", savepointName), createQueryId()));
  }
  async rollbackToSavepoint(connection, savepointName, compileQuery) {
    await connection.executeQuery(compileQuery(parseSavepointCommand("rollback to", savepointName), createQueryId()));
  }
  async releaseSavepoint(connection, savepointName, compileQuery) {
    await connection.executeQuery(compileQuery(parseSavepointCommand("release savepoint", savepointName), createQueryId()));
  }
  async releaseConnection(connection) {
    connection[PRIVATE_RELEASE_METHOD]();
  }
  async destroy() {
    return new Promise((resolve, reject) => {
      this.#pool.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  async #acquireConnection() {
    return new Promise((resolve, reject) => {
      this.#pool.getConnection(async (err, rawConnection) => {
        if (err) {
          reject(err);
        } else {
          resolve(rawConnection);
        }
      });
    });
  }
};
function isOkPacket(obj) {
  return isObject(obj) && "insertId" in obj && "affectedRows" in obj;
}
var MysqlConnection = class {
  #connection;
  #controlConnection;
  #cid;
  #queryId;
  constructor(connection, controlConnection) {
    this.#connection = connection;
    this.#controlConnection = controlConnection;
  }
  async cancelQuery(controlConnectionProvider) {
    await this.#executeControlQuery(`kill query ${this.#cid}`, controlConnectionProvider);
  }
  async collectSessionInfo() {
    if (this.#cid) {
      return;
    }
    const { threadId } = this.#connection;
    if (threadId != null) {
      this.#cid = threadId;
    } else {
      const [{ cid }] = await this.#executeQuery(CompiledQuery.raw(`select connection_id() as cid`));
      this.#cid = Number(cid);
    }
  }
  async executeQuery(compiledQuery) {
    try {
      this.#queryId = compiledQuery.queryId;
      const result = await this.#executeQuery(compiledQuery);
      if (!isOkPacket(result)) {
        return {
          rows: Array.isArray(result) ? result : []
        };
      }
      const { insertId, affectedRows, changedRows } = result;
      return {
        insertId: insertId != null && insertId.toString() !== "0" ? BigInt(insertId) : void 0,
        numAffectedRows: affectedRows != null ? BigInt(affectedRows) : void 0,
        numChangedRows: changedRows != null ? BigInt(changedRows) : void 0,
        rows: []
      };
    } catch (err) {
      throw extendStackTrace(err, new Error());
    } finally {
      this.#queryId = void 0;
    }
  }
  async killSession(controlConnectionProvider) {
    try {
      this.#connection.destroy();
    } catch {
    }
    await this.#executeControlQuery(`kill connection ${this.#cid}`, controlConnectionProvider);
  }
  async *streamQuery(compiledQuery, _chunkSize) {
    this.#queryId = compiledQuery.queryId;
    const stream = this.#connection.query(compiledQuery.sql, compiledQuery.parameters).stream({ objectMode: true });
    try {
      for await (const row of stream) {
        yield {
          rows: [row]
        };
      }
    } catch (error) {
      if (isObject(error) && "code" in error && // @ts-ignore
      error.code === "ERR_STREAM_PREMATURE_CLOSE") {
        return;
      }
      throw error;
    } finally {
      this.#queryId = void 0;
    }
  }
  [PRIVATE_RELEASE_METHOD]() {
    this.#connection.release();
  }
  #executeQuery(compiledQuery) {
    return new Promise((resolve, reject) => {
      this.#connection.query(compiledQuery.sql, compiledQuery.parameters, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  async #executeControlQuery(query, controlConnectionProvider) {
    if (!this.#queryId) {
      return;
    }
    const { config } = this.#connection;
    const queryIdToCancel = this.#queryId;
    if (!this.#controlConnection || !config) {
      return await controlConnectionProvider(async (controlConnection2) => {
        if (queryIdToCancel.queryId === this.#queryId?.queryId) {
          await controlConnection2.executeQuery(CompiledQuery.raw(query, []));
        }
      });
    }
    const {
      // omitting these as they cause a warning and perhaps a future error when passed.
      clientFlags: _,
      maxPacketSize: __,
      ...cfg
    } = config;
    const controlConnection = this.#controlConnection(cfg);
    try {
      await new Promise((resolve, reject) => {
        controlConnection.connect((connectError) => {
          if (connectError) {
            return reject(connectError);
          }
          if (queryIdToCancel.queryId !== this.#queryId?.queryId) {
            return resolve();
          }
          controlConnection.query(query, [], (queryError) => {
            if (queryError) {
              return reject(queryError);
            }
            resolve();
          });
        });
      });
    } finally {
      controlConnection.destroy();
    }
  }
};

// node_modules/kysely/dist/dialect/mysql/mysql-query-compiler.js
var LITERAL_ESCAPE_REGEX = /[\\']/g;
var ID_WRAP_REGEX = /`/g;
var JSON_PATH_MEMBER_ESCAPE_REGEX = /[\\'"]/g;
var MysqlQueryCompiler = class extends DefaultQueryCompiler {
  getCurrentParameterPlaceholder() {
    return "?";
  }
  getLeftExplainOptionsWrapper() {
    return "";
  }
  getExplainOptionAssignment() {
    return "=";
  }
  getExplainOptionsDelimiter() {
    return " ";
  }
  getRightExplainOptionsWrapper() {
    return "";
  }
  getLeftIdentifierWrapper() {
    return ID_WRAP_REGEX.source;
  }
  getRightIdentifierWrapper() {
    return ID_WRAP_REGEX.source;
  }
  sanitizeIdentifier(identifier) {
    return identifier.replace(ID_WRAP_REGEX, "``");
  }
  /**
   * MySQL requires escaping backslashes in string literals when using the
   * default NO_BACKSLASH_ESCAPES=OFF mode. Without this, a backslash
   * followed by a quote (\') can break out of the string literal.
   *
   * @see https://dev.mysql.com/doc/refman/9.6/en/string-literals.html
   */
  sanitizeStringLiteral(value) {
    return value.replace(LITERAL_ESCAPE_REGEX, (char) => char === "\\" ? "\\\\" : "''");
  }
  /**
   * Member values appear inside `"..."` in the JSON path, which itself sits
   * inside a SQL string literal. They must therefore be escaped twice — once
   * for the JSON path grammar, then again for MySQL's string literal parser.
   */
  sanitizeJSONPathMemberValue(value) {
    return value.replace(JSON_PATH_MEMBER_ESCAPE_REGEX, (char) => char === "\\" ? "\\\\\\\\" : char === "'" ? "''" : '\\\\"');
  }
  visitCreateIndex(node) {
    this.append("create ");
    if (node.unique) {
      this.append("unique ");
    }
    this.append("index ");
    if (node.ifNotExists) {
      this.append("if not exists ");
    }
    this.visitNode(node.name);
    if (node.using) {
      this.append(" using ");
      this.visitNode(node.using);
    }
    if (node.table) {
      this.append(" on ");
      this.visitNode(node.table);
    }
    if (node.columns) {
      this.append(" (");
      this.compileList(node.columns);
      this.append(")");
    }
    if (node.where) {
      this.append(" ");
      this.visitNode(node.where);
    }
  }
};

// node_modules/kysely/dist/dialect/mysql/mysql-introspector.js
var MysqlIntrospector = class {
  #db;
  constructor(db) {
    this.#db = db;
  }
  async getSchemas() {
    let rawSchemas = await this.#db.selectFrom("information_schema.schemata").select("schema_name").$castTo().execute();
    return rawSchemas.map((it) => ({ name: it.SCHEMA_NAME }));
  }
  async getTables(options = { withInternalKyselyTables: false }) {
    let query = this.#db.selectFrom("information_schema.columns as columns").innerJoin("information_schema.tables as tables", (b) => b.onRef("columns.TABLE_CATALOG", "=", "tables.TABLE_CATALOG").onRef("columns.TABLE_SCHEMA", "=", "tables.TABLE_SCHEMA").onRef("columns.TABLE_NAME", "=", "tables.TABLE_NAME")).select([
      "columns.COLUMN_NAME",
      "columns.COLUMN_DEFAULT",
      "columns.TABLE_NAME",
      "columns.TABLE_SCHEMA",
      "tables.TABLE_TYPE",
      "tables.ENGINE",
      "columns.IS_NULLABLE",
      "columns.DATA_TYPE",
      "columns.EXTRA",
      "columns.COLUMN_COMMENT"
    ]).where("columns.TABLE_SCHEMA", "=", sql`database()`).orderBy("columns.TABLE_NAME").orderBy("columns.ORDINAL_POSITION").$castTo();
    if (!options.withInternalKyselyTables) {
      query = query.where("columns.TABLE_NAME", "!=", DEFAULT_MIGRATION_TABLE).where("columns.TABLE_NAME", "!=", DEFAULT_MIGRATION_LOCK_TABLE);
    }
    const rawColumns = await query.execute();
    return this.#parseTableMetadata(rawColumns);
  }
  #parseTableMetadata(columns) {
    return columns.reduce((tables, it) => {
      let table = tables.find((tbl) => tbl.name === it.TABLE_NAME);
      if (!table) {
        table = freeze({
          name: it.TABLE_NAME,
          isView: it.TABLE_TYPE === "VIEW",
          isForeign: it.ENGINE === "FEDERATED",
          schema: it.TABLE_SCHEMA,
          columns: []
        });
        tables.push(table);
      }
      table.columns.push(freeze({
        name: it.COLUMN_NAME,
        dataType: it.DATA_TYPE,
        isNullable: it.IS_NULLABLE === "YES",
        isAutoIncrementing: it.EXTRA.toLowerCase().includes("auto_increment"),
        hasDefaultValue: it.COLUMN_DEFAULT !== null,
        comment: it.COLUMN_COMMENT === "" ? void 0 : it.COLUMN_COMMENT
      }));
      return tables;
    }, []);
  }
};

// node_modules/kysely/dist/dialect/mysql/mysql-adapter.js
var LOCK_ID = "ea586330-2c93-47c8-908d-981d9d270f9d";
var LOCK_TIMEOUT_SECONDS = 60 * 60;
var MysqlAdapter = class extends DialectAdapterBase {
  get supportsTransactionalDdl() {
    return false;
  }
  get supportsReturning() {
    return false;
  }
  async acquireMigrationLock(db, _opt) {
    await sql`select get_lock(${sql.lit(LOCK_ID)}, ${sql.lit(LOCK_TIMEOUT_SECONDS)})`.execute(db);
  }
  async releaseMigrationLock(db, _opt) {
    await sql`select release_lock(${sql.lit(LOCK_ID)})`.execute(db);
  }
};

// node_modules/kysely/dist/dialect/mysql/mysql-dialect.js
var MysqlDialect = class {
  #config;
  constructor(config) {
    this.#config = config;
  }
  createDriver() {
    return new MysqlDriver(this.#config);
  }
  createQueryCompiler() {
    return new MysqlQueryCompiler();
  }
  createAdapter() {
    return new MysqlAdapter();
  }
  createIntrospector(db) {
    return new MysqlIntrospector(db);
  }
};

// node_modules/kysely/dist/dialect/postgres/postgres-driver.js
var PRIVATE_RELEASE_METHOD2 = /* @__PURE__ */ Symbol();
var PRIVATE_MARK_FOR_DISCARD_METHOD = /* @__PURE__ */ Symbol();
var PostgresDriver = class {
  #config;
  #connections = /* @__PURE__ */ new WeakMap();
  #pool;
  constructor(config) {
    this.#config = freeze({ ...config });
  }
  async init(options) {
    this.#pool = isFunction(this.#config.pool) ? await this.#config.pool(options) : this.#config.pool;
  }
  async acquireConnection(options) {
    const client = await this.#pool.connect();
    if (!this.#pool) {
      client.release();
      throw new Error("driver has already been destroyed");
    }
    let connection = this.#connections.get(client);
    if (!connection) {
      connection = new PostgresConnection(client, {
        controlClient: this.#config.controlClient || this.#pool.Client,
        cursor: this.#config.cursor ?? null,
        poolOptions: this.#pool.options
      });
      this.#connections.set(client, connection);
      if (this.#config.onCreateConnection) {
        await this.#config.onCreateConnection(connection, options);
      }
    }
    if (this.#config.onReserveConnection) {
      await this.#config.onReserveConnection(connection, options);
    }
    return connection;
  }
  async beginTransaction(connection, settings) {
    let sql2 = "begin";
    if (settings.isolationLevel || settings.accessMode) {
      sql2 = "start transaction";
      if (settings.isolationLevel) {
        sql2 += ` isolation level ${settings.isolationLevel}`;
      }
      if (settings.accessMode) {
        sql2 += ` ${settings.accessMode}`;
      }
    }
    await connection.executeQuery(CompiledQuery.raw(sql2));
  }
  async commitTransaction(connection) {
    const { rows } = await connection.executeQuery(CompiledQuery.raw("commit"));
    if (rows[0]?.command === "ROLLBACK") {
      throw new AbortedTransactionError();
    }
  }
  async rollbackTransaction(connection) {
    try {
      await connection.executeQuery(CompiledQuery.raw("rollback"));
    } catch (err) {
      connection[PRIVATE_MARK_FOR_DISCARD_METHOD]();
      throw err;
    }
  }
  async savepoint(connection, savepointName, compileQuery) {
    await connection.executeQuery(compileQuery(parseSavepointCommand("savepoint", savepointName), createQueryId()));
  }
  async rollbackToSavepoint(connection, savepointName, compileQuery) {
    await connection.executeQuery(compileQuery(parseSavepointCommand("rollback to", savepointName), createQueryId()));
  }
  async releaseSavepoint(connection, savepointName, compileQuery) {
    await connection.executeQuery(compileQuery(parseSavepointCommand("release", savepointName), createQueryId()));
  }
  async releaseConnection(connection) {
    connection[PRIVATE_RELEASE_METHOD2]();
  }
  async destroy() {
    if (this.#pool) {
      const pool = this.#pool;
      this.#pool = void 0;
      await pool.end();
    }
  }
};
var PostgresConnection = class {
  #client;
  #options;
  #queryId;
  #pid;
  #discarded;
  constructor(client, options) {
    this.#client = client;
    this.#options = options;
  }
  async cancelQuery(controlConnectionProvider) {
    return await this.#executeControlQuery(`select pg_cancel_backend(${this.#pid})`, controlConnectionProvider);
  }
  async collectSessionInfo() {
    if (this.#pid) {
      return;
    }
    const { processID } = this.#client;
    if (processID) {
      this.#pid = processID;
    } else {
      this.#assertNotDiscarded();
      const { rows: [{ pid }] } = await this.#client.query("select pg_backend_pid() as pid", []);
      this.#pid = Number(pid);
    }
  }
  async executeQuery(compiledQuery) {
    this.#assertNotDiscarded();
    try {
      this.#queryId = compiledQuery.queryId;
      const result = await this.#client.query(compiledQuery.sql, compiledQuery.parameters);
      const { command, rowCount, rows } = result;
      if (command === "ROLLBACK" || command === "COMMIT") {
        return { rows: [{ command }] };
      }
      return {
        numAffectedRows: command === "INSERT" || command === "UPDATE" || command === "DELETE" || command === "MERGE" ? BigInt(rowCount) : void 0,
        rows: rows ?? []
      };
    } catch (err) {
      throw extendStackTrace(err, new Error());
    } finally {
      this.#queryId = void 0;
    }
  }
  async killSession(controlConnectionProvider) {
    return await this.#executeControlQuery(`select pg_terminate_backend(${this.#pid})`, controlConnectionProvider);
  }
  async *streamQuery(compiledQuery, chunkSize) {
    if (!this.#options.cursor) {
      throw new Error("`cursor` is not present in your postgres dialect config. It's required to make streaming work in postgres.");
    }
    this.#assertNotDiscarded();
    this.#queryId = compiledQuery.queryId;
    const cursor = this.#client.query(new this.#options.cursor(compiledQuery.sql, compiledQuery.parameters.slice()));
    try {
      while (true) {
        const rows = await cursor.read(chunkSize);
        if (rows.length === 0) {
          break;
        }
        yield {
          rows
        };
      }
    } finally {
      await cursor.close();
      this.#queryId = void 0;
    }
  }
  [PRIVATE_RELEASE_METHOD2]() {
    this.#client.release(Boolean(this.#discarded));
  }
  [PRIVATE_MARK_FOR_DISCARD_METHOD]() {
    this.#discarded = true;
  }
  #assertNotDiscarded() {
    if (this.#discarded) {
      throw new Error("Postgres connection has been discarded");
    }
  }
  async #executeControlQuery(query, controlConnectionProvider) {
    if (!this.#queryId) {
      return;
    }
    const { controlClient: Client, poolOptions } = this.#options;
    const queryIdToCancel = this.#queryId;
    if (!Client) {
      return await controlConnectionProvider(async (controlConnection) => {
        if (queryIdToCancel.queryId === this.#queryId?.queryId) {
          await controlConnection.executeQuery(CompiledQuery.raw(query, []));
        }
      });
    }
    const controlClient = new Client({
      ...poolOptions,
      // `password` is not enumerable, so we have to explicitly set it after the spread.
      password: "password" in poolOptions ? poolOptions.password : void 0
    });
    try {
      await controlClient.connect();
      if (queryIdToCancel.queryId !== this.#queryId.queryId) {
        return;
      }
      await controlClient.query(query, []);
    } finally {
      controlClient.end();
    }
  }
};

// node_modules/kysely/dist/dialect/postgres/postgres-introspector.js
var PostgresIntrospector = class {
  #db;
  constructor(db) {
    this.#db = db;
  }
  async getSchemas() {
    let rawSchemas = await this.#db.selectFrom("pg_catalog.pg_namespace").select("nspname").$castTo().execute();
    return rawSchemas.map((it) => ({ name: it.nspname }));
  }
  async getTables(options = { withInternalKyselyTables: false }) {
    let query = this.#db.selectFrom("pg_catalog.pg_attribute as a").innerJoin("pg_catalog.pg_class as c", "a.attrelid", "c.oid").innerJoin("pg_catalog.pg_namespace as ns", "c.relnamespace", "ns.oid").innerJoin("pg_catalog.pg_type as typ", "a.atttypid", "typ.oid").innerJoin("pg_catalog.pg_namespace as dtns", "typ.typnamespace", "dtns.oid").select([
      "a.attname as column",
      "a.attnotnull as not_null",
      "a.atthasdef as has_default",
      "c.relname as table",
      "c.relkind as table_type",
      "ns.nspname as schema",
      "typ.typname as type",
      "dtns.nspname as type_schema",
      sql`col_description(a.attrelid, a.attnum)`.as("column_description"),
      sql`pg_get_serial_sequence(quote_ident(ns.nspname) || '.' || quote_ident(c.relname), a.attname)`.as("auto_incrementing")
    ]).where("c.relkind", "in", [
      "r",
      "v",
      "p",
      "f"
    ]).where("ns.nspname", "!~", "^pg_").where("ns.nspname", "!=", "information_schema").where("ns.nspname", "!=", "crdb_internal").where(sql`has_schema_privilege(ns.nspname, 'USAGE')`).where("a.attnum", ">=", 0).where("a.attisdropped", "!=", true).orderBy("ns.nspname").orderBy("c.relname").orderBy("a.attnum").$castTo();
    if (!options.withInternalKyselyTables) {
      query = query.where("c.relname", "!=", DEFAULT_MIGRATION_TABLE).where("c.relname", "!=", DEFAULT_MIGRATION_LOCK_TABLE);
    }
    const rawColumns = await query.execute();
    return this.#parseTableMetadata(rawColumns);
  }
  #parseTableMetadata(columns) {
    const tables = [];
    const schemas = /* @__PURE__ */ new Map();
    for (const column of columns) {
      let schema = schemas.get(column.schema);
      if (!schema) {
        schema = /* @__PURE__ */ new Map();
        schemas.set(column.schema, schema);
      }
      let table = schema.get(column.table);
      if (!table) {
        table = freeze({
          columns: [],
          isForeign: column.table_type === "f",
          isView: column.table_type === "v",
          name: column.table,
          schema: column.schema
        });
        schema.set(column.table, table);
        tables.push(table);
      }
      table.columns.push(freeze({
        comment: column.column_description ?? void 0,
        dataType: column.type,
        dataTypeSchema: column.type_schema,
        hasDefaultValue: column.has_default,
        isAutoIncrementing: column.auto_incrementing !== null,
        isNullable: !column.not_null,
        name: column.column
      }));
    }
    return tables;
  }
};

// node_modules/kysely/dist/dialect/postgres/postgres-query-compiler.js
var ID_WRAP_REGEX2 = /"/g;
var PostgresQueryCompiler = class extends DefaultQueryCompiler {
  sanitizeIdentifier(identifier) {
    return identifier.replace(ID_WRAP_REGEX2, '""');
  }
};

// node_modules/kysely/dist/dialect/postgres/postgres-adapter.js
var LOCK_ID2 = BigInt("3853314791062309107");
var LOCK_TIMEOUT_MILLISECONDS = 60 * 60 * 1e3;
var PostgresAdapter = class extends DialectAdapterBase {
  get supportsTransactionalDdl() {
    return true;
  }
  get supportsReturning() {
    return true;
  }
  async acquireMigrationLock(db, _opt) {
    await sql`
    with set_timeout as (
      select set_config('lock_timeout', '${sql.lit(LOCK_TIMEOUT_MILLISECONDS)}', true) as config_val
    )
    select pg_advisory_lock(${sql.lit(LOCK_ID2)})
    from set_timeout`.execute(db);
  }
  async releaseMigrationLock(db, _opt) {
    await sql`select pg_advisory_unlock(${sql.lit(LOCK_ID2)})`.execute(db);
  }
};

// node_modules/kysely/dist/dialect/postgres/postgres-dialect.js
var PostgresDialect = class {
  #config;
  constructor(config) {
    this.#config = config;
  }
  createDriver() {
    return new PostgresDriver(this.#config);
  }
  createQueryCompiler() {
    return new PostgresQueryCompiler();
  }
  createAdapter() {
    return new PostgresAdapter();
  }
  createIntrospector(db) {
    return new PostgresIntrospector(db);
  }
};

// node_modules/kysely/dist/dialect/mssql/mssql-adapter.js
var LOCK_PRINCIPAL = "dbo";
var MssqlAdapter = class extends DialectAdapterBase {
  get supportsCreateIfNotExists() {
    return false;
  }
  get supportsTransactionalDdl() {
    return true;
  }
  get supportsOutput() {
    return true;
  }
  async acquireMigrationLock(db, _opt) {
    await sql`exec sp_getapplock @DbPrincipal = ${sql.lit(LOCK_PRINCIPAL)}, @Resource = ${sql.lit(DEFAULT_MIGRATION_TABLE)}, @LockMode = ${sql.lit("Exclusive")}, @LockOwner = ${sql.lit("Session")}`.execute(db);
  }
  async releaseMigrationLock(db, _opt) {
    await sql`exec sp_releaseapplock @DbPrincipal = ${sql.lit(LOCK_PRINCIPAL)}, @Resource = ${sql.lit(DEFAULT_MIGRATION_TABLE)}, @LockOwner = ${sql.lit("Session")}`.execute(db);
  }
};

// node_modules/kysely/dist/dialect/mssql/mssql-driver.js
var PRIVATE_RESET_METHOD = /* @__PURE__ */ Symbol();
var PRIVATE_DESTROY_METHOD = /* @__PURE__ */ Symbol();
var PRIVATE_VALIDATE_METHOD = /* @__PURE__ */ Symbol();
var MssqlDriver = class {
  #config;
  #pool;
  constructor(config) {
    this.#config = freeze({ ...config });
    const { tarn, tedious, validateConnections } = this.#config;
    this.#pool = new tarn.Pool({
      ...tarn.options,
      create: async () => {
        const connection = await tedious.connectionFactory();
        return await new MssqlConnection(connection, tedious).connect();
      },
      destroy: async (connection) => {
        await connection[PRIVATE_DESTROY_METHOD]();
      },
      // @ts-ignore `tarn` accepts a function that returns a promise here, but
      // the types are not aligned and it type errors.
      validate: validateConnections === false ? void 0 : (connection) => connection[PRIVATE_VALIDATE_METHOD]()
    });
  }
  async init() {
  }
  async acquireConnection() {
    return await this.#pool.acquire().promise;
  }
  async beginTransaction(connection, settings) {
    await connection.beginTransaction(settings);
  }
  async commitTransaction(connection) {
    await connection.commitTransaction();
  }
  async rollbackTransaction(connection) {
    await connection.rollbackTransaction();
  }
  async savepoint(connection, savepointName) {
    await connection.savepoint(savepointName);
  }
  async rollbackToSavepoint(connection, savepointName) {
    await connection.rollbackTransaction(savepointName);
  }
  async releaseConnection(connection) {
    if (this.#config.resetConnectionsOnRelease) {
      await connection[PRIVATE_RESET_METHOD]();
    }
    this.#pool.release(connection);
  }
  async destroy() {
    await this.#pool.destroy();
  }
};
var MssqlConnection = class {
  #connection;
  #hasSocketError;
  #tedious;
  #inflightRequest;
  constructor(connection, tedious) {
    this.#connection = connection;
    this.#hasSocketError = false;
    this.#tedious = tedious;
  }
  async beginTransaction(settings) {
    const { isolationLevel } = settings;
    await new Promise((resolve, reject) => this.#connection.beginTransaction((error) => {
      if (error)
        reject(error);
      else
        resolve(void 0);
    }, isolationLevel ? randomString(8) : void 0, isolationLevel ? this.#getTediousIsolationLevel(isolationLevel) : void 0));
  }
  async cancelQuery() {
    if (!this.#inflightRequest) {
      return;
    }
    return new Promise((resolve) => {
      this.#inflightRequest?.request.once("requestCompleted", resolve);
      const wasCanceled = this.#connection.cancel();
      if (!wasCanceled) {
        this.#inflightRequest?.request.off("requestCompleted", resolve);
        resolve();
      }
    });
  }
  async commitTransaction() {
    await new Promise((resolve, reject) => this.#connection.commitTransaction((error) => {
      if (error)
        reject(error);
      else
        resolve(void 0);
    }));
  }
  async connect() {
    const { promise: waitForConnected, reject, resolve } = new Deferred();
    this.#connection.connect((error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
    this.#connection.on("error", (error) => {
      if (error instanceof Error && "code" in error && error.code === "ESOCKET") {
        this.#hasSocketError = true;
      }
      console.error(error);
      reject(error);
    });
    function endListener() {
      reject(new Error("The connection ended without ever completing the connection"));
    }
    this.#connection.once("end", endListener);
    await waitForConnected;
    this.#connection.off("end", endListener);
    return this;
  }
  async executeQuery(compiledQuery) {
    try {
      const deferred = new Deferred();
      this.#inflightRequest = new MssqlRequest({
        compiledQuery,
        tedious: this.#tedious,
        onDone: deferred
      });
      this.#connection.execSql(this.#inflightRequest.request);
      const { rowCount, rows } = await deferred.promise;
      return {
        numAffectedRows: rowCount !== void 0 ? BigInt(rowCount) : void 0,
        rows
      };
    } catch (err) {
      throw extendStackTrace(err, new Error());
    } finally {
      this.#inflightRequest = void 0;
    }
  }
  async rollbackTransaction(savepointName) {
    await new Promise((resolve, reject) => this.#connection.rollbackTransaction((error) => {
      if (error)
        reject(error);
      else
        resolve(void 0);
    }, savepointName));
  }
  async savepoint(savepointName) {
    await new Promise((resolve, reject) => this.#connection.saveTransaction((error) => {
      if (error)
        reject(error);
      else
        resolve(void 0);
    }, savepointName));
  }
  async *streamQuery(compiledQuery, chunkSize) {
    this.#inflightRequest = new MssqlRequest({
      compiledQuery,
      streamChunkSize: chunkSize,
      tedious: this.#tedious
    });
    this.#connection.execSql(this.#inflightRequest.request);
    try {
      while (true) {
        const rows = await this.#inflightRequest.readChunk();
        if (rows.length === 0) {
          break;
        }
        yield { rows };
        if (rows.length < chunkSize) {
          break;
        }
      }
    } finally {
      await this.cancelQuery();
      this.#inflightRequest = void 0;
    }
  }
  #getTediousIsolationLevel(isolationLevel) {
    const { ISOLATION_LEVEL } = this.#tedious;
    const mapper = {
      "read committed": ISOLATION_LEVEL.READ_COMMITTED,
      "read uncommitted": ISOLATION_LEVEL.READ_UNCOMMITTED,
      "repeatable read": ISOLATION_LEVEL.REPEATABLE_READ,
      serializable: ISOLATION_LEVEL.SERIALIZABLE,
      snapshot: ISOLATION_LEVEL.SNAPSHOT
    };
    const tediousIsolationLevel = mapper[isolationLevel];
    if (tediousIsolationLevel === void 0) {
      throw new Error(`Unknown isolation level: ${isolationLevel}`);
    }
    return tediousIsolationLevel;
  }
  [PRIVATE_DESTROY_METHOD]() {
    if ("closed" in this.#connection && this.#connection.closed) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.#connection.once("end", resolve);
      this.#connection.close();
    });
  }
  async [PRIVATE_RESET_METHOD]() {
    await new Promise((resolve, reject) => {
      this.#connection.reset((error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  }
  async [PRIVATE_VALIDATE_METHOD]() {
    if (this.#hasSocketError || this.#isConnectionClosed()) {
      return false;
    }
    try {
      const deferred = new Deferred();
      const request = new MssqlRequest({
        compiledQuery: CompiledQuery.raw("select 1"),
        onDone: deferred,
        tedious: this.#tedious
      });
      this.#connection.execSql(request.request);
      await deferred.promise;
      return true;
    } catch {
      return false;
    }
  }
  #isConnectionClosed() {
    return "closed" in this.#connection && Boolean(this.#connection.closed);
  }
};
var MssqlRequest = class {
  #request;
  #rows;
  #streamChunkSize;
  #subscribers;
  #tedious;
  #rowCount;
  constructor(props) {
    const { compiledQuery, onDone, streamChunkSize, tedious } = props;
    this.#rows = [];
    this.#streamChunkSize = streamChunkSize;
    this.#subscribers = {};
    this.#tedious = tedious;
    if (onDone) {
      const subscriptionKey = "onDone";
      this.#subscribers[subscriptionKey] = (event, error) => {
        if (event === "chunkReady") {
          return;
        }
        delete this.#subscribers[subscriptionKey];
        if (event === "error") {
          return onDone.reject(error);
        }
        onDone.resolve({
          rowCount: this.#rowCount,
          rows: this.#rows
        });
      };
    }
    this.#request = new this.#tedious.Request(compiledQuery.sql, (err, rowCount) => {
      if (err) {
        return Object.values(this.#subscribers).forEach((subscriber) => subscriber("error", err instanceof AggregateError ? err.errors : err));
      }
      this.#rowCount = rowCount;
    });
    this.#addParametersToRequest(compiledQuery.parameters);
    this.#attachListeners();
  }
  get request() {
    return this.#request;
  }
  readChunk() {
    const subscriptionKey = this.readChunk.name;
    return new Promise((resolve, reject) => {
      this.#subscribers[subscriptionKey] = (event, error) => {
        delete this.#subscribers[subscriptionKey];
        if (event === "error") {
          return reject(error);
        }
        resolve(this.#rows.splice(0, this.#streamChunkSize));
      };
      this.#request.resume();
    });
  }
  #addParametersToRequest(parameters) {
    for (let i = 0; i < parameters.length; i++) {
      const parameter = parameters[i];
      this.#request.addParameter(String(i + 1), this.#getTediousDataType(parameter), parameter);
    }
  }
  #attachListeners() {
    const pauseAndEmitChunkReady = this.#streamChunkSize ? () => {
      if (this.#streamChunkSize <= this.#rows.length) {
        this.#request.pause();
        Object.values(this.#subscribers).forEach((subscriber) => subscriber("chunkReady"));
      }
    } : () => {
    };
    const rowListener = (columns) => {
      const row = {};
      for (const column of columns) {
        row[column.metadata.colName] = column.value;
      }
      this.#rows.push(row);
      pauseAndEmitChunkReady();
    };
    this.#request.on("row", rowListener);
    this.#request.once("requestCompleted", () => {
      Object.values(this.#subscribers).forEach((subscriber) => subscriber("completed"));
      this.#request.off("row", rowListener);
    });
  }
  #getTediousDataType(value) {
    if (isNull(value) || isUndefined(value) || isString(value)) {
      return this.#tedious.TYPES.NVarChar;
    }
    if (isBigInt(value) || isNumber(value) && value % 1 === 0) {
      if (value < -2147483648 || value > 2147483647) {
        return this.#tedious.TYPES.BigInt;
      } else {
        return this.#tedious.TYPES.Int;
      }
    }
    if (isNumber(value)) {
      return this.#tedious.TYPES.Float;
    }
    if (isBoolean(value)) {
      return this.#tedious.TYPES.Bit;
    }
    if (isDate(value)) {
      return this.#tedious.TYPES.DateTime;
    }
    if (isBuffer(value)) {
      return this.#tedious.TYPES.VarBinary;
    }
    return this.#tedious.TYPES.NVarChar;
  }
};

// node_modules/kysely/dist/dialect/mssql/mssql-introspector.js
var MssqlIntrospector = class {
  #db;
  constructor(db) {
    this.#db = db;
  }
  async getSchemas() {
    return await this.#db.selectFrom("sys.schemas").select("name").execute();
  }
  async getTables(options = { withInternalKyselyTables: false }) {
    const rawColumns = await this.#db.selectFrom("sys.tables as tables").leftJoin("sys.schemas as table_schemas", "table_schemas.schema_id", "tables.schema_id").innerJoin("sys.columns as columns", "columns.object_id", "tables.object_id").innerJoin("sys.types as types", "types.user_type_id", "columns.user_type_id").leftJoin("sys.schemas as type_schemas", "type_schemas.schema_id", "types.schema_id").leftJoin("sys.extended_properties as comments", (join) => join.onRef("comments.major_id", "=", "tables.object_id").onRef("comments.minor_id", "=", "columns.column_id").on("comments.name", "=", "MS_Description")).$if(!options.withInternalKyselyTables, (qb) => qb.where("tables.name", "!=", DEFAULT_MIGRATION_TABLE).where("tables.name", "!=", DEFAULT_MIGRATION_LOCK_TABLE)).select([
      "tables.name as table_name",
      (eb) => eb.ref("tables.type").$castTo().as("table_type"),
      "table_schemas.name as table_schema_name",
      "columns.default_object_id as column_default_object_id",
      "columns.generated_always_type_desc as column_generated_always_type",
      "columns.is_computed as column_is_computed",
      "columns.is_identity as column_is_identity",
      "columns.is_nullable as column_is_nullable",
      "columns.is_rowguidcol as column_is_rowguidcol",
      "columns.name as column_name",
      "types.is_nullable as type_is_nullable",
      "types.name as type_name",
      "type_schemas.name as type_schema_name",
      "comments.value as column_comment"
    ]).unionAll(this.#db.selectFrom("sys.views as views").leftJoin("sys.schemas as view_schemas", "view_schemas.schema_id", "views.schema_id").innerJoin("sys.columns as columns", "columns.object_id", "views.object_id").innerJoin("sys.types as types", "types.user_type_id", "columns.user_type_id").leftJoin("sys.schemas as type_schemas", "type_schemas.schema_id", "types.schema_id").leftJoin("sys.extended_properties as comments", (join) => join.onRef("comments.major_id", "=", "views.object_id").onRef("comments.minor_id", "=", "columns.column_id").on("comments.name", "=", "MS_Description")).select([
      "views.name as table_name",
      "views.type as table_type",
      "view_schemas.name as table_schema_name",
      "columns.default_object_id as column_default_object_id",
      "columns.generated_always_type_desc as column_generated_always_type",
      "columns.is_computed as column_is_computed",
      "columns.is_identity as column_is_identity",
      "columns.is_nullable as column_is_nullable",
      "columns.is_rowguidcol as column_is_rowguidcol",
      "columns.name as column_name",
      "types.is_nullable as type_is_nullable",
      "types.name as type_name",
      "type_schemas.name as type_schema_name",
      "comments.value as column_comment"
    ])).orderBy("table_schema_name").orderBy("table_name").orderBy("column_name").execute();
    const tableDictionary = {};
    for (const rawColumn of rawColumns) {
      const key = `${rawColumn.table_schema_name}.${rawColumn.table_name}`;
      const table = tableDictionary[key] = tableDictionary[key] || freeze({
        columns: [],
        isForeign: false,
        isView: rawColumn.table_type === "V ",
        name: rawColumn.table_name,
        schema: rawColumn.table_schema_name ?? void 0
      });
      table.columns.push(freeze({
        dataType: rawColumn.type_name,
        dataTypeSchema: rawColumn.type_schema_name ?? void 0,
        hasDefaultValue: rawColumn.column_default_object_id > 0 || rawColumn.column_generated_always_type !== "NOT_APPLICABLE" || rawColumn.column_is_identity || rawColumn.column_is_computed || rawColumn.column_is_rowguidcol,
        isAutoIncrementing: rawColumn.column_is_identity,
        isNullable: rawColumn.column_is_nullable && rawColumn.type_is_nullable,
        name: rawColumn.column_name,
        comment: rawColumn.column_comment ?? void 0
      }));
    }
    return Object.values(tableDictionary);
  }
};

// node_modules/kysely/dist/dialect/mssql/mssql-query-compiler.js
var COLLATION_CHAR_REGEX = /^[a-z0-9_]$/i;
var MssqlQueryCompiler = class extends DefaultQueryCompiler {
  getCurrentParameterPlaceholder() {
    return `@${this.numParameters}`;
  }
  visitOffset(node) {
    super.visitOffset(node);
    this.append(" rows");
  }
  // mssql allows multi-column alterations in a single statement,
  // but you can only use the command keyword/s once.
  // it also doesn't support multiple kinds of commands in the same
  // alter table statement, but we compile that anyway for the sake
  // of WYSIWYG.
  compileColumnAlterations(columnAlterations) {
    const nodesByKind = {};
    for (const columnAlteration of columnAlterations) {
      if (!nodesByKind[columnAlteration.kind]) {
        nodesByKind[columnAlteration.kind] = [];
      }
      nodesByKind[columnAlteration.kind].push(columnAlteration);
    }
    let first = true;
    if (nodesByKind.AddColumnNode) {
      this.append("add ");
      this.compileList(nodesByKind.AddColumnNode);
      first = false;
    }
    if (nodesByKind.AlterColumnNode) {
      if (!first) {
        this.append(", ");
      }
      this.compileList(nodesByKind.AlterColumnNode);
    }
    if (nodesByKind.DropColumnNode) {
      if (!first) {
        this.append(", ");
      }
      this.append("drop ");
      this.compileList(nodesByKind.DropColumnNode);
      first = false;
    }
    if (nodesByKind.ModifyColumnNode) {
      if (!first) {
        this.append(", ");
      }
      this.compileList(nodesByKind.ModifyColumnNode);
    }
    if (nodesByKind.RenameColumnNode) {
      if (!first) {
        this.append(", ");
      }
      this.compileList(nodesByKind.RenameColumnNode);
    }
  }
  visitAddColumn(node) {
    this.visitNode(node.column);
  }
  visitDropColumn(node) {
    this.append("column ");
    if (node.ifExists) {
      this.append("if exists ");
    }
    this.visitNode(node.column);
  }
  visitMergeQuery(node) {
    super.visitMergeQuery(node);
    this.append(";");
  }
  visitCollate(node) {
    this.append("collate ");
    const { name } = node.collation;
    for (const char of name) {
      if (!COLLATION_CHAR_REGEX.test(char)) {
        throw new Error(`Invalid collation: ${name}`);
      }
    }
    this.append(name);
  }
  announcesNewColumnDataType() {
    return false;
  }
};

// node_modules/kysely/dist/dialect/mssql/mssql-dialect.js
var MssqlDialect = class {
  #config;
  constructor(config) {
    this.#config = config;
  }
  createDriver() {
    return new MssqlDriver(this.#config);
  }
  createQueryCompiler() {
    return new MssqlQueryCompiler();
  }
  createAdapter() {
    return new MssqlAdapter();
  }
  createIntrospector(db) {
    return new MssqlIntrospector(db);
  }
};

// node_modules/@better-auth/core/dist/db/schema-diff.mjs
function getExpectedSchema(options, { usePlural = false } = {}) {
  const expected = {};
  for (const table of Object.values(getAuthTables(options))) {
    const name = usePlural ? `${table.modelName}s` : table.modelName;
    const entry = expected[name] ??= {
      fields: {},
      disableMigrations: true
    };
    for (const [key, field] of Object.entries(table.fields)) entry.fields[field.fieldName || key] = field;
    entry.disableMigrations = entry.disableMigrations && !!table.disableMigrations;
  }
  return expected;
}
function diffSchema(expected, actual) {
  const findings = [];
  for (const [tableName, table] of Object.entries(expected)) {
    if (table.disableMigrations) continue;
    const actualTable = actual.find((candidate) => candidate.name === tableName && (table.schema === void 0 || candidate.schema === table.schema));
    if (!actualTable) {
      findings.push({
        kind: "missing-table",
        table: tableName
      });
      continue;
    }
    const written = /* @__PURE__ */ new Set([table.idColumn ?? "id", ...Object.keys(table.fields)]);
    for (const column of written) if (!actualTable.columns.some((candidate) => candidate.name === column)) findings.push({
      kind: "missing-column",
      table: tableName,
      column
    });
    for (const column of actualTable.columns) {
      if (written.has(column.name) || column.nullable || column.hasDefault) continue;
      findings.push({
        kind: "unexpected-required-column",
        table: tableName,
        column: column.name
      });
    }
  }
  return findings;
}
var applyHint = {
  database: "Run `npx auth migrate` to add it.",
  drizzle: "Run `npx auth generate` to refresh the Drizzle schema, then apply it with your migration tool.",
  prisma: "Run `npx auth generate` to refresh the Prisma schema, then run `prisma migrate`."
};
var relaxHint = {
  database: "Drop the column, make it nullable, or give it a database default.",
  drizzle: "Remove it from the Drizzle schema, make it nullable, or give it a default, then apply the change with your migration tool.",
  prisma: "Remove it from the Prisma schema, make it optional, or give it a default, then run `prisma migrate`."
};
var sourceLabel = {
  database: "Database",
  drizzle: "Drizzle",
  prisma: "Prisma"
};
function formatSchemaFinding(finding, source) {
  switch (finding.kind) {
    case "missing-table":
      return `Table "${finding.table}" is missing. ${applyHint[source]}`;
    case "missing-column":
      return `Column "${finding.column}" is missing from table "${finding.table}". ${applyHint[source]}`;
    case "unexpected-required-column": {
      const issuer = finding.column === "issuer" ? " If this column came from Better Auth 1.7.0 through 1.7.2, follow the upgrade guide before removing it: https://www.better-auth.com/docs/guides/1-7-upgrade-guide" : "";
      return `Column "${finding.column}" on table "${finding.table}" is required but Better Auth never writes it, so every insert into "${finding.table}" fails. ${relaxHint[source]}${issuer}`;
    }
  }
}
var repairHint = {
  database: "Make the listed columns nullable, give them defaults, or remove them.",
  drizzle: "Make the listed columns nullable in your Drizzle schema, give them defaults, or remove them.",
  prisma: "Make the listed fields optional in your Prisma schema, give them defaults, or remove them."
};
var migrationHint = {
  ...applyHint,
  database: "Run `npx auth migrate` to add the missing tables and columns."
};
function formatSchemaMismatch(findings, source) {
  const tables = [];
  const columns = [];
  const required = [];
  const affectedTables = /* @__PURE__ */ new Set();
  let hasIssuer = false;
  for (const finding of findings) switch (finding.kind) {
    case "missing-table":
      tables.push(finding.table);
      break;
    case "missing-column":
      columns.push(`${finding.table}.${finding.column}`);
      break;
    case "unexpected-required-column":
      required.push(`${finding.table}.${finding.column}`);
      affectedTables.add(finding.table);
      hasIssuer ||= finding.column === "issuer";
  }
  const sections = [`${sourceLabel[source]} schema mismatch`];
  if (tables.length) sections.push(`  Missing tables
    ${tables.join(", ")}`);
  if (columns.length) sections.push(`  Missing columns
    ${columns.join("\n    ")}`);
  if (required.length) {
    sections.push(`  Required columns Better Auth never writes
    ${required.join("\n    ")}`);
    sections.push(`  Inserts into ${[...affectedTables].join(", ")} will fail.`);
  }
  const help = [];
  if (required.length) help.push(repairHint[source]);
  if (tables.length || columns.length || required.length && source !== "database") help.push(migrationHint[source]);
  if (help.length) sections.push(`  help: ${help.join("\n        ")}`);
  if (hasIssuer) sections.push("  note: If this column came from Better Auth 1.7.0 through 1.7.2,\n        follow the upgrade guide before removing it:\n        https://www.better-auth.com/docs/guides/1-7-upgrade-guide");
  return sections.join("\n\n");
}
var SchemaMismatchError = class extends BetterAuthError {
  findings;
  source;
  code = "SCHEMA_MISMATCH";
  constructor(findings, source) {
    super(formatSchemaMismatch(findings, source));
    this.findings = findings;
    this.source = source;
  }
};

// node_modules/@better-auth/core/dist/db/schema-check.mjs
function checksSchema(options) {
  return options.advanced?.database?.validateSchema !== false;
}
var schemaChecks = /* @__PURE__ */ new WeakMap();
var schemaRevisions = /* @__PURE__ */ new WeakMap();
function invalidateSchemaChecks(database) {
  const revision = schemaRevisions.get(database);
  if (revision) revision.value++;
}
function registerSchemaCheck(adapter, check, options = {}) {
  const runtimeEnabled = options.runtimeEnabled ?? true;
  schemaChecks.set(adapter, {
    check,
    runtimeEnabled
  });
}
function schemaCheckFor(adapter) {
  return schemaChecks.get(adapter)?.check;
}
function runtimeSchemaCheckFor(adapter) {
  const registration = schemaChecks.get(adapter);
  return registration?.runtimeEnabled ? registration.check : void 0;
}
function createSchemaCheck(find, source, database) {
  const revision = database ? schemaRevisions.get(database) ?? { value: 0 } : void 0;
  if (database && revision) schemaRevisions.set(database, revision);
  const sharesLookups = !isWorkerd();
  let verdict;
  let pending;
  let lookupSequence = 0;
  const runLookup = (currentRevision) => {
    const sequence = ++lookupSequence;
    return Promise.resolve().then(find).then((findings) => {
      if (revision?.value !== currentRevision || verdict && sequence < verdict.sequence) return checkSchema();
      const error = findings.length ? new SchemaMismatchError(findings, source) : void 0;
      verdict = {
        revision: currentRevision,
        sequence,
        error
      };
      if (error) throw error;
    }, (error) => {
      if (revision?.value !== currentRevision) return checkSchema();
      throw error;
    });
  };
  const checkSchema = () => {
    const currentRevision = revision?.value;
    if (verdict && verdict.revision === currentRevision) return verdict.error ? Promise.reject(verdict.error) : void 0;
    if (!sharesLookups) return runLookup(currentRevision);
    if (pending && pending.revision === currentRevision) return pending.lookup;
    const lookup = runLookup(currentRevision).finally(() => {
      if (pending?.lookup === lookup) pending = void 0;
    });
    pending = {
      revision: currentRevision,
      lookup
    };
    return lookup;
  };
  checkSchema.source = source;
  return checkSchema;
}

// node_modules/@better-auth/core/dist/utils/string.mjs
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
var WORD_PATTERN = new RegExp("[\\p{Ll}\\d]+|\\p{Lu}+(?!\\p{Ll})|\\p{Lu}[\\p{Ll}\\d]+|\\p{Lo}+", "gu");

// node_modules/@better-auth/kysely-adapter/dist/index.mjs
function getKyselyDatabaseType(db) {
  if (!db) return null;
  if ("dialect" in db) return getKyselyDatabaseType(db.dialect);
  if ("createDriver" in db) {
    if (db instanceof SqliteDialect) return "sqlite";
    if (db instanceof MysqlDialect) return "mysql";
    if (db instanceof PostgresDialect) return "postgres";
    if (db instanceof MssqlDialect) return "mssql";
  }
  if ("aggregate" in db) return "sqlite";
  if ("getConnection" in db) return "mysql";
  if ("connect" in db) return "postgres";
  if ("fileControl" in db) return "sqlite";
  if ("open" in db && "close" in db && "prepare" in db) return "sqlite";
  if ("batch" in db && "exec" in db && "prepare" in db) return "sqlite";
  return null;
}
function checkSchemaName(schemaName, databaseType) {
  if (schemaName === void 0) return;
  if (typeof schemaName !== "string" || schemaName.length === 0) throw new BetterAuthError("`database.schemaName` must be a non-empty schema name.");
  if (databaseType !== "postgres") throw new BetterAuthError(`\`database.schemaName\` is only supported on PostgreSQL, but the configured database type is "${databaseType ?? "unknown"}".`);
}
var createKyselyAdapter = async (config) => {
  const db = config.database;
  if (!db) return {
    kysely: null,
    databaseType: null,
    introspectIndexes: void 0,
    schemaName: void 0,
    transaction: void 0
  };
  if ("db" in db) {
    const schemaName = db.schemaName;
    checkSchemaName(schemaName, db.type);
    return {
      kysely: schemaName ? db.db.withSchema(schemaName) : db.db,
      databaseType: db.type,
      introspectIndexes: void 0,
      schemaName,
      transaction: db.transaction
    };
  }
  if ("dialect" in db) {
    const schemaName = db.schemaName;
    checkSchemaName(schemaName, db.type);
    const kysely = new Kysely({ dialect: db.dialect });
    return {
      kysely: schemaName ? kysely.withSchema(schemaName) : kysely,
      databaseType: db.type,
      introspectIndexes: void 0,
      schemaName,
      transaction: db.transaction
    };
  }
  let dialect = void 0;
  let introspectIndexes = void 0;
  let transaction = void 0;
  const databaseType = getKyselyDatabaseType(db);
  if ("createDriver" in db) dialect = db;
  if ("aggregate" in db && !("createSession" in db)) {
    dialect = new SqliteDialect({ database: db });
    transaction = true;
  }
  if ("getConnection" in db) {
    dialect = new MysqlDialect(db);
    transaction = true;
  }
  if ("connect" in db) {
    dialect = new PostgresDialect({ pool: db });
    transaction = true;
  }
  if ("fileControl" in db) {
    const { BunSqliteDialect } = await import("./bun-sqlite-dialect-C1xgdqho-K5ULOIBG.mjs");
    dialect = new BunSqliteDialect({ database: db });
    transaction = true;
  }
  if ("createSession" in db) {
    let DatabaseSync = void 0;
    try {
      const nodeSqlite = "node:sqlite";
      ({ DatabaseSync } = await import(
        /* @vite-ignore */
        /* webpackIgnore: true */
        nodeSqlite
      ));
    } catch (error) {
      if (error !== null && typeof error === "object" && "code" in error && error.code !== "ERR_UNKNOWN_BUILTIN_MODULE") throw error;
    }
    if (DatabaseSync && db instanceof DatabaseSync) {
      const { NodeSqliteDialect } = await import("./node-sqlite-dialect-PNPRKSY5.mjs");
      dialect = new NodeSqliteDialect({ database: db });
      transaction = true;
    }
  }
  if ("batch" in db && "exec" in db && "prepare" in db) {
    const { createD1IndexIntrospector, D1SqliteDialect } = await import("./d1-sqlite-dialect-CFQyWgtB-CK6J242E.mjs");
    dialect = new D1SqliteDialect({ database: db });
    introspectIndexes = createD1IndexIntrospector(db);
    transaction = false;
  }
  return {
    kysely: dialect ? new Kysely({ dialect }) : null,
    databaseType,
    introspectIndexes,
    schemaName: void 0,
    transaction
  };
};
function insensitiveIlike(columnRef, pattern, dbType) {
  return dbType === "postgres" ? sql`${sql.ref(columnRef)} ILIKE ${pattern}` : sql`LOWER(${sql.ref(columnRef)}) LIKE LOWER(${pattern})`;
}
function insensitiveIn(columnRef, values) {
  return {
    lhs: sql`LOWER(${sql.ref(columnRef)})`,
    values: values.map((v) => v.toLowerCase())
  };
}
function insensitiveNotIn(columnRef, values) {
  return {
    lhs: sql`LOWER(${sql.ref(columnRef)})`,
    values: values.map((v) => v.toLowerCase())
  };
}
function insensitiveEq(columnRef, value) {
  return {
    lhs: sql`LOWER(${sql.ref(columnRef)})`,
    value: value.toLowerCase()
  };
}
function insensitiveNe(columnRef, value) {
  return {
    lhs: sql`LOWER(${sql.ref(columnRef)})`,
    value: value.toLowerCase()
  };
}
function toIntrospectedTables(tables) {
  return tables.map((table) => ({
    name: table.name,
    schema: table.schema,
    columns: table.columns.map((column) => ({
      name: column.name,
      nullable: column.isNullable,
      hasDefault: column.hasDefaultValue || column.isAutoIncrementing
    }))
  }));
}
function toPhysicalSchema(db, expected) {
  const physical = {};
  for (const [table, definition] of Object.entries(expected)) {
    const entries = Object.entries(definition.fields);
    const sent = sentIdentifiers(db, table, [definition.idColumn ?? "id", ...entries.map(([column]) => column)]);
    const fields = {};
    entries.forEach(([column, attribute], index) => {
      fields[sent.columns[index + 1] ?? column] = attribute;
    });
    physical[sent.table] = {
      ...definition,
      fields,
      schema: sent.schema ?? definition.schema,
      ...sent.columns[0] !== "id" && { idColumn: sent.columns[0] }
    };
  }
  return physical;
}
function sentIdentifiers(db, table, columns) {
  const { query } = db.selectFrom(table).select(columns).compile();
  if (!SelectQueryNode.is(query)) return {
    table,
    columns: []
  };
  const from = query.from?.froms[0];
  const sentTable = from && TableNode.is(from) ? from.table : void 0;
  return {
    schema: sentTable?.schema?.name,
    table: sentTable?.identifier.name ?? table,
    columns: (query.selections ?? []).map(({ selection }) => ReferenceNode.is(selection) && ColumnNode.is(selection.column) ? selection.column.column.name : void 0)
  };
}
async function getPostgresSchema(db) {
  return (await sql`
		SELECT pg_catalog.current_schema() AS schema
	`.execute(db.withoutPlugins())).rows[0]?.schema ?? "public";
}
async function getMssqlSchema(db) {
  return (await sql`
		SELECT SCHEMA_NAME() AS "schemaName"
	`.execute(db.withoutPlugins())).rows[0]?.schemaName || "dbo";
}
async function introspectPostgresTables(db, schemas) {
  if (schemas.length === 0) return [];
  const { rows } = await sql`
		SELECT
			ns.nspname AS "schema",
			c.relname AS "table",
			c.relkind = 'v' AS "isView",
			c.relkind = 'f' AS "isForeign",
			a.attname AS "column",
			typ.typname AS "dataType",
			NOT a.attnotnull AS "isNullable",
			a.atthasdef AS "hasDefaultValue",
			pg_catalog.pg_get_serial_sequence(
				pg_catalog.quote_ident(ns.nspname) || '.' || pg_catalog.quote_ident(c.relname),
				a.attname
			) IS NOT NULL AS "isAutoIncrementing"
		FROM pg_catalog.pg_attribute AS a
		INNER JOIN pg_catalog.pg_class AS c ON c.oid = a.attrelid
		INNER JOIN pg_catalog.pg_namespace AS ns ON ns.oid = c.relnamespace
		INNER JOIN pg_catalog.pg_type AS typ ON typ.oid = a.atttypid
		WHERE ns.nspname IN (${sql.join(schemas)})
			AND ns.nspname !~ '^pg_'
			AND pg_catalog.has_schema_privilege(ns.oid, 'USAGE')
			AND c.relkind IN ('r', 'v', 'p', 'f')
			AND a.attnum >= 0
			AND NOT a.attisdropped
		ORDER BY ns.nspname, c.relname, a.attnum
	`.execute(db.withoutPlugins());
  const tables = [];
  let current;
  for (const { schema, table, isView, isForeign, column, ...metadata } of rows) {
    if (current?.schema !== schema || current.name !== table) {
      current = {
        name: table,
        schema,
        isView,
        isForeign,
        columns: []
      };
      tables.push(current);
    }
    current.columns.push({
      name: column,
      ...metadata
    });
  }
  return tables;
}
async function schemaSearchPath(db, dbType) {
  if (dbType === "postgres") return (await sql`
			SELECT pg_catalog.current_schemas(true)::text[] AS schemas
		`.execute(db.withoutPlugins())).rows[0]?.schemas ?? [];
  if (dbType === "mssql") return [await getMssqlSchema(db), "dbo"];
}
async function findSchemaProblems(db, dbType, expected) {
  const physical = toPhysicalSchema(db, expected);
  if (dbType === "sqlite") {
    const tableNames = Object.entries(physical).flatMap(([name, table]) => table.disableMigrations ? [] : [name]);
    const tables = await introspectSqliteTables(db, tableNames);
    return diffSchema(physical, toIntrospectedTables(tables));
  }
  return db.connection().execute(async (connection) => {
    const searchPath = await schemaSearchPath(connection, dbType);
    const tables = toIntrospectedTables(dbType === "postgres" ? await introspectPostgresTables(connection, [...searchPath ?? [], ...Object.values(physical).flatMap(({ schema }) => schema ?? [])]) : await connection.introspection.getTables());
    for (const [name, table] of Object.entries(physical)) {
      if (table.schema !== void 0 || !searchPath) continue;
      table.schema = searchPath.find((schema) => tables.some((candidate) => candidate.name === name && candidate.schema === schema)) ?? "";
    }
    return diffSchema(physical, tables);
  });
}
var kyselyAdapter = (db, config) => {
  let lazyOptions = null;
  let mysqlNoIdWarned = false;
  const createCustomAdapter = (db2, inTransaction = false) => {
    return ({ getFieldName, schema, getDefaultFieldName, getDefaultModelName, getFieldAttributes, getModelName, options }) => {
      if (config?.type === "mysql" && options.advanced?.database?.generateId === false && !mysqlNoIdWarned) {
        mysqlNoIdWarned = true;
        logger.warn(`[Kysely Adapter] MySQL does not support INSERT...RETURNING. With generateId set to false, the adapter uses best-effort fallback strategies (unique columns, full-field match) to retrieve inserted rows. For reliable behavior, use Better Auth's default ID generation, a custom generateId function, or generateId: "serial" for auto-increment.`);
      }
      const selectAllJoins = (join) => {
        const allSelects = [];
        const allSelectsStr = [];
        if (join) for (const [joinModel, joinConfig] of Object.entries(join)) {
          const fields = schema[joinConfig.modelKey ?? getDefaultModelName(joinModel)]?.fields;
          const [_joinModelSchema, joinModelName] = joinModel.includes(".") ? joinModel.split(".") : [void 0, joinModel];
          if (!fields) continue;
          fields.id = { type: "string" };
          for (const [field, fieldAttr] of Object.entries(fields)) {
            allSelects.push(sql`${sql.ref(`join_${joinModelName}`)}.${sql.ref(fieldAttr.fieldName || field)} as ${sql.ref(`_joined_${joinModelName}_${fieldAttr.fieldName || field}`)}`);
            allSelectsStr.push({
              joinModel,
              joinModelRef: joinModelName,
              fieldName: fieldAttr.fieldName || field
            });
          }
        }
        return {
          allSelectsStr,
          allSelects
        };
      };
      const encodeJSONArrays = (modelKey, values) => {
        if (config?.type !== "postgres") return values;
        const fields = schema[getDefaultModelName(modelKey)]?.fields;
        if (!fields) return values;
        let encoded;
        for (const [field, attributes] of Object.entries(fields)) {
          if (attributes.type !== "json") continue;
          const column = getFieldName({
            model: modelKey,
            field
          });
          if (!Array.isArray(values[column])) continue;
          encoded ??= { ...values };
          encoded[column] = JSON.stringify(values[column]);
        }
        return encoded ?? values;
      };
      const withReturning = async (values, builder, model, modelKey, where) => {
        if (config?.type === "mysql") {
          if (where.length > 0) {
            const updateResult = await builder.executeTakeFirst();
            if (!updateResult || Number(updateResult.numUpdatedRows ?? 0) === 0) return null;
            const idEqualityWhere = where.find((w) => w.field === "id" && (w.operator === void 0 || w.operator === "eq") && w.connector !== "OR" && w.value !== void 0 && w.value !== null);
            let reselectField;
            let reselectValue;
            if (values.id !== void 0 && values.id !== null) {
              reselectField = "id";
              reselectValue = values.id;
            } else if (idEqualityWhere) {
              reselectField = "id";
              reselectValue = idEqualityWhere.value;
            } else if (where[0]?.field) {
              reselectField = where[0].field;
              reselectValue = values[reselectField] !== void 0 ? values[reselectField] : where[0].value;
            } else return null;
            return await db2.selectFrom(model).selectAll().where(getFieldName({
              model: modelKey,
              field: reselectField
            }), reselectValue === null ? "is" : "=", reselectValue).limit(1).executeTakeFirst();
          }
          const fetchInserted = async (trx) => {
            const insertId = (await trx.executeQuery(builder)).insertId;
            if (values.id) return await trx.selectFrom(model).selectAll().where(getFieldName({
              model: modelKey,
              field: "id"
            }), "=", values.id).limit(1).executeTakeFirst();
            if (options.advanced?.database?.generateId === "serial") {
              if (insertId === void 0) throw new BetterAuthError(`[Kysely Adapter] MySQL did not report an auto-increment id for the inserted "${model}" row. With generateId: "serial" the "id" column must be AUTO_INCREMENT.`);
              return await trx.selectFrom(model).selectAll().where(getFieldName({
                model: modelKey,
                field: "id"
              }), "=", insertId <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(insertId) : insertId.toString()).limit(1).executeTakeFirst();
            }
            const modelSchema = schema[modelKey]?.fields;
            if (modelSchema) for (const [fieldKey, fieldAttr] of Object.entries(modelSchema)) {
              if (!fieldAttr.unique) continue;
              const dbFieldName = getFieldName({
                model: modelKey,
                field: fieldKey
              });
              const val = values[dbFieldName];
              if (val === void 0 || val === null) continue;
              const row = await trx.selectFrom(model).selectAll().where(dbFieldName, "=", val).limit(1).executeTakeFirst();
              if (row) return row;
            }
            let query = trx.selectFrom(model).selectAll();
            let hasConditions = false;
            for (const [key, val] of Object.entries(values)) {
              if (val === void 0) continue;
              query = query.where(key, val === null ? "is" : "=", val);
              hasConditions = true;
            }
            if (hasConditions) {
              const rows = await query.limit(2).execute();
              if (rows.length === 1) return rows[0];
            }
            logger.warn(`[Kysely Adapter] Unable to safely identify the inserted "${model}" row on MySQL. Enable Better Auth ID generation or use generateId: "serial" for reliable behavior.`);
            return null;
          };
          return inTransaction ? fetchInserted(db2) : db2.transaction().execute(fetchInserted);
        }
        if (config?.type === "mssql") return await builder.outputAll("inserted").executeTakeFirst();
        return await builder.returningAll().executeTakeFirst();
      };
      function convertWhereClause(model, modelKey, w) {
        if (!w) return {
          and: null,
          or: null
        };
        const conditions = {
          and: [],
          or: []
        };
        w.forEach((condition) => {
          const { field: _field, value: _value, operator = "eq", connector = "AND", mode = "sensitive" } = condition;
          const value = _value;
          const field = getFieldName({
            model: modelKey,
            field: _field
          });
          const isInsensitive = mode === "insensitive" && (typeof value === "string" || Array.isArray(value) && value.every((v) => typeof v === "string"));
          const expr = (eb) => {
            const f = `${model}.${field}`;
            if (operator.toLowerCase() === "in") {
              if (isInsensitive) {
                const { lhs, values } = insensitiveIn(f, Array.isArray(value) ? value : [value]);
                return eb(lhs, "in", values);
              }
              return eb(f, "in", Array.isArray(value) ? value : [value]);
            }
            if (operator.toLowerCase() === "not_in") {
              if (isInsensitive) {
                const { lhs, values } = insensitiveNotIn(f, Array.isArray(value) ? value : [value]);
                return eb(lhs, "not in", values);
              }
              return eb(f, "not in", Array.isArray(value) ? value : [value]);
            }
            if (operator === "contains") {
              if (isInsensitive && typeof value === "string") return insensitiveIlike(f, `%${value}%`, config?.type);
              return eb(f, "like", `%${value}%`);
            }
            if (operator === "starts_with") {
              if (isInsensitive && typeof value === "string") return insensitiveIlike(f, `${value}%`, config?.type);
              return eb(f, "like", `${value}%`);
            }
            if (operator === "ends_with") {
              if (isInsensitive && typeof value === "string") return insensitiveIlike(f, `%${value}`, config?.type);
              return eb(f, "like", `%${value}`);
            }
            if (operator === "eq") {
              if (value === null) return eb(f, "is", null);
              if (isInsensitive && typeof value === "string") {
                const { lhs, value: v } = insensitiveEq(f, value);
                return eb(lhs, "=", v);
              }
              return eb(f, "=", value);
            }
            if (operator === "ne") {
              if (value === null) return eb(f, "is not", null);
              if (isInsensitive && typeof value === "string") {
                const { lhs, value: v } = insensitiveNe(f, value);
                return eb(lhs, "<>", v);
              }
              return eb(f, "<>", value);
            }
            if (operator === "gt") return eb(f, ">", value);
            if (operator === "gte") return eb(f, ">=", value);
            if (operator === "lt") return eb(f, "<", value);
            if (operator === "lte") return eb(f, "<=", value);
            return eb(f, operator, value);
          };
          if (connector === "OR") conditions.or.push(expr);
          else conditions.and.push(expr);
        });
        return {
          and: conditions.and.length ? conditions.and : null,
          or: conditions.or.length ? conditions.or : null
        };
      }
      function processJoinedResults(rows, joinConfig, allSelectsStr) {
        if (!joinConfig || !rows.length) return rows;
        const groupedByMainId = /* @__PURE__ */ new Map();
        for (const currentRow of rows) {
          const mainModelFields = {};
          const joinedModelFields = {};
          for (const [joinModel] of Object.entries(joinConfig)) joinedModelFields[joinModel] = {};
          for (const [key, value] of Object.entries(currentRow)) {
            const keyStr = String(key);
            let assigned = false;
            for (const { joinModel, fieldName, joinModelRef } of allSelectsStr) if (keyStr === `_joined_${joinModelRef}_${fieldName}` || keyStr === `_Joined${capitalizeFirstLetter(joinModelRef)}${capitalizeFirstLetter(fieldName)}`) {
              joinedModelFields[joinModel][getFieldName({
                model: joinConfig[joinModel]?.modelKey ?? joinModel,
                field: fieldName
              })] = value;
              assigned = true;
              break;
            }
            if (!assigned) mainModelFields[key] = value;
          }
          const mainId = mainModelFields.id;
          if (!mainId) continue;
          if (!groupedByMainId.has(mainId)) {
            const entry2 = { ...mainModelFields };
            for (const [joinModel, joinAttr] of Object.entries(joinConfig)) entry2[joinModel] = joinAttr.relation === "one-to-one" ? null : [];
            groupedByMainId.set(mainId, entry2);
          }
          const entry = groupedByMainId.get(mainId);
          for (const [joinModel, joinAttr] of Object.entries(joinConfig)) {
            const isUnique = joinAttr.relation === "one-to-one";
            const limit = joinAttr.limit ?? 100;
            const joinedObj = joinedModelFields[joinModel];
            const hasData = joinedObj && Object.keys(joinedObj).length > 0 && Object.values(joinedObj).some((value) => value !== null && value !== void 0);
            if (isUnique) entry[joinModel] = hasData ? joinedObj : null;
            else {
              const joinModelName = joinModel;
              if (Array.isArray(entry[joinModelName]) && hasData) {
                if (entry[joinModelName].length >= limit) continue;
                const idFieldName = getFieldName({
                  model: joinAttr.modelKey ?? joinModel,
                  field: "id"
                });
                const joinedId = joinedObj[idFieldName];
                if (joinedId) {
                  if (!entry[joinModelName].some((item) => item[idFieldName] === joinedId) && entry[joinModelName].length < limit) entry[joinModelName].push(joinedObj);
                } else if (entry[joinModelName].length < limit) entry[joinModelName].push(joinedObj);
              }
            }
          }
        }
        const result = Array.from(groupedByMainId.values());
        for (const entry of result) for (const [joinModel, joinAttr] of Object.entries(joinConfig)) if (joinAttr.relation !== "one-to-one") {
          const joinModelName = joinModel;
          if (Array.isArray(entry[joinModelName])) {
            const limit = joinAttr.limit ?? 100;
            if (entry[joinModelName].length > limit) entry[joinModelName] = entry[joinModelName].slice(0, limit);
          }
        }
        return result;
      }
      return {
        async create({ data, model, modelKey = model }) {
          const builder = db2.insertInto(model).values(encodeJSONArrays(modelKey, data));
          return await withReturning(data, builder, model, modelKey, []);
        },
        async findOne({ model, modelKey = model, where, select, join }) {
          const { and, or } = convertWhereClause(model, modelKey, where);
          let query = db2.selectFrom((eb) => {
            let b = eb.selectFrom(model);
            if (and) b = b.where((eb2) => eb2.and(and.map((expr) => expr(eb2))));
            if (or) b = b.where((eb2) => eb2.or(or.map((expr) => expr(eb2))));
            if (select?.length && select.length > 0) b = b.select(select.map((field) => getFieldName({
              model: modelKey,
              field
            })));
            else b = b.selectAll();
            return b.as("primary");
          }).selectAll("primary");
          if (join) for (const [joinModel, joinAttr] of Object.entries(join)) {
            const [_joinModelSchema, joinModelName] = joinModel.includes(".") ? joinModel.split(".") : [void 0, joinModel];
            query = query.leftJoin(`${joinModel} as join_${joinModelName}`, (join2) => join2.onRef(`join_${joinModelName}.${joinAttr.on.to}`, "=", `primary.${joinAttr.on.from}`));
          }
          const { allSelectsStr, allSelects } = selectAllJoins(join);
          query = query.select(allSelects);
          const res = await query.execute();
          if (!res || !Array.isArray(res) || res.length === 0) return null;
          const row = res[0];
          if (join) return processJoinedResults(res, join, allSelectsStr)[0];
          return row;
        },
        async findMany({ model, modelKey = model, where, limit, select, offset, sortBy, join }) {
          const { and, or } = convertWhereClause(model, modelKey, where);
          let query = db2.selectFrom((eb) => {
            let b = eb.selectFrom(model);
            if (config?.type === "mssql") {
              if (offset !== void 0) {
                if (!sortBy) b = b.orderBy(getFieldName({
                  model: modelKey,
                  field: "id"
                }));
                b = b.offset(offset).fetch(limit || 100);
              } else if (limit !== void 0) b = b.top(limit);
            } else {
              if (limit !== void 0) b = b.limit(limit);
              if (offset !== void 0) b = b.offset(offset);
            }
            if (sortBy?.field) b = b.orderBy(`${getFieldName({
              model: modelKey,
              field: sortBy.field
            })}`, sortBy.direction);
            if (and) b = b.where((eb2) => eb2.and(and.map((expr) => expr(eb2))));
            if (or) b = b.where((eb2) => eb2.or(or.map((expr) => expr(eb2))));
            if (select?.length && select.length > 0) b = b.select(select.map((field) => getFieldName({
              model: modelKey,
              field
            })));
            else b = b.selectAll();
            return b.as("primary");
          }).selectAll("primary");
          if (join) for (const [joinModel, joinAttr] of Object.entries(join)) {
            const [_joinModelSchema, joinModelName] = joinModel.includes(".") ? joinModel.split(".") : [void 0, joinModel];
            query = query.leftJoin(`${joinModel} as join_${joinModelName}`, (join2) => join2.onRef(`join_${joinModelName}.${joinAttr.on.to}`, "=", `primary.${joinAttr.on.from}`));
          }
          const { allSelectsStr, allSelects } = selectAllJoins(join);
          query = query.select(allSelects);
          if (sortBy?.field) query = query.orderBy(`${getFieldName({
            model: modelKey,
            field: sortBy.field
          })}`, sortBy.direction);
          const res = await query.execute();
          if (!res) return [];
          if (join) return processJoinedResults(res, join, allSelectsStr);
          return res;
        },
        async update({ model, modelKey = model, where, update: values }) {
          if (where.length === 0) return null;
          const { and, or } = convertWhereClause(model, modelKey, where);
          let query = db2.updateTable(model).set(encodeJSONArrays(modelKey, values));
          if (and) query = query.where((eb) => eb.and(and.map((expr) => expr(eb))));
          if (or) query = query.where((eb) => eb.or(or.map((expr) => expr(eb))));
          return await withReturning(values, query, model, modelKey, where);
        },
        async updateMany({ model, modelKey = model, where, update: values }) {
          const { and, or } = convertWhereClause(model, modelKey, where);
          let query = db2.updateTable(model).set(encodeJSONArrays(modelKey, values));
          if (and) query = query.where((eb) => eb.and(and.map((expr) => expr(eb))));
          if (or) query = query.where((eb) => eb.or(or.map((expr) => expr(eb))));
          const res = (await query.executeTakeFirst()).numUpdatedRows;
          return res > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : Number(res);
        },
        async count({ model, modelKey = model, where }) {
          const { and, or } = convertWhereClause(model, modelKey, where);
          let query = db2.selectFrom(model).select(db2.fn.count("id").as("count"));
          if (and) query = query.where((eb) => eb.and(and.map((expr) => expr(eb))));
          if (or) query = query.where((eb) => eb.or(or.map((expr) => expr(eb))));
          const res = await query.execute();
          if (typeof res[0].count === "number") return res[0].count;
          if (typeof res[0].count === "bigint") return Number(res[0].count);
          return parseInt(res[0].count);
        },
        async delete({ model, modelKey = model, where }) {
          const { and, or } = convertWhereClause(model, modelKey, where);
          let query = db2.deleteFrom(model);
          if (and) query = query.where((eb) => eb.and(and.map((expr) => expr(eb))));
          if (or) query = query.where((eb) => eb.or(or.map((expr) => expr(eb))));
          await query.execute();
        },
        async deleteMany({ model, modelKey = model, where }) {
          const { and, or } = convertWhereClause(model, modelKey, where);
          let query = db2.deleteFrom(model);
          if (and) query = query.where((eb) => eb.and(and.map((expr) => expr(eb))));
          if (or) query = query.where((eb) => eb.or(or.map((expr) => expr(eb))));
          const res = (await query.executeTakeFirst()).numDeletedRows;
          return res > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : Number(res);
        },
        async consumeOne({ model, modelKey = model, where }) {
          const { and, or } = convertWhereClause(model, modelKey, where);
          const applyWhere = (query) => {
            if (and) query = query.where((eb) => eb.and(and.map((expr) => expr(eb))));
            if (or) query = query.where((eb) => eb.or(or.map((expr) => expr(eb))));
            return query;
          };
          const idField = getFieldName({
            model: modelKey,
            field: "id"
          });
          const deleteSelectedRow = async (db3, row) => {
            const targetId = row[idField] ?? row.id;
            if (targetId === void 0 || targetId === null) return null;
            const query = db3.deleteFrom(model).where(`${model}.${idField}`, "=", targetId);
            if (config?.type === "mysql") {
              const result = await query.executeTakeFirst();
              return Number(result.numDeletedRows) > 0 ? row : null;
            }
            if (config?.type === "mssql") return await query.outputAll("deleted").executeTakeFirst() ?? null;
            return await query.returningAll().executeTakeFirst() ?? null;
          };
          const deleteWithReturning = async (query) => {
            if (config?.type === "mssql") return await query.outputAll("deleted").executeTakeFirst() ?? null;
            return await query.returningAll().executeTakeFirst() ?? null;
          };
          if (config?.type === "mysql") {
            const claimFromTransaction = async (trx) => {
              const row = await applyWhere(trx.selectFrom(model).selectAll().forUpdate()).limit(1).executeTakeFirst();
              if (!row) return null;
              return deleteSelectedRow(trx, row);
            };
            return inTransaction ? claimFromTransaction(db2) : db2.transaction().execute(claimFromTransaction);
          }
          const selectIds = applyWhere(db2.selectFrom(model).select(`${model}.${idField}`));
          const targetIds = config?.type === "mssql" ? selectIds.top(1) : selectIds.limit(1);
          return deleteWithReturning(applyWhere(db2.deleteFrom(model).where(`${model}.${idField}`, "in", targetIds)));
        },
        async incrementOne({ model, modelKey = model, where, increment, set }) {
          const { and, or } = convertWhereClause(model, modelKey, where);
          const applyWhere = (query) => {
            if (and) query = query.where((eb) => eb.and(and.map((expr) => expr(eb))));
            if (or) query = query.where((eb) => eb.or(or.map((expr) => expr(eb))));
            return query;
          };
          const assignments = { ...encodeJSONArrays(modelKey, set ?? {}) };
          for (const [field, delta] of Object.entries(increment)) assignments[field] = sql`${sql.ref(field)} + ${delta}`;
          const idField = getFieldName({
            model: modelKey,
            field: "id"
          });
          if (config?.type === "mysql") {
            const incrementInTransaction = async (trx) => {
              const target = await applyWhere(trx.selectFrom(model).select(`${model}.${idField}`).forUpdate()).limit(1).executeTakeFirst();
              if (!target) return null;
              const targetId = target[idField] ?? target.id;
              if (targetId === void 0 || targetId === null) return null;
              const updated = await applyWhere(trx.updateTable(model).set(assignments)).where(`${model}.${idField}`, "=", targetId).executeTakeFirst();
              if (Number(updated.numUpdatedRows) === 0) return null;
              return await trx.selectFrom(model).selectAll().where(`${model}.${idField}`, "=", targetId).limit(1).executeTakeFirst() ?? null;
            };
            return inTransaction ? incrementInTransaction(db2) : db2.transaction().execute(incrementInTransaction);
          }
          const selectIds = applyWhere(db2.selectFrom(model).select(`${model}.${idField}`));
          const targetIds = config?.type === "mssql" ? selectIds.top(1) : selectIds.limit(1);
          const updateQuery = applyWhere(db2.updateTable(model).set(assignments)).where(`${model}.${idField}`, "in", targetIds);
          if (config?.type === "mssql") return await updateQuery.outputAll("inserted").executeTakeFirst() ?? null;
          return await updateQuery.returningAll().executeTakeFirst() ?? null;
        },
        options: config
      };
    };
  };
  let adapterOptions = null;
  adapterOptions = {
    config: {
      adapterId: "kysely",
      adapterName: "Kysely Adapter",
      usePlural: config?.usePlural,
      debugLogs: config?.debugLogs,
      supportsBooleans: config?.type === "sqlite" || config?.type === "mssql" || config?.type === "mysql" || !config?.type ? false : true,
      supportsDates: config?.type === "sqlite" || config?.type === "mssql" || !config?.type ? false : true,
      supportsJSON: config?.type === "postgres" ? true : false,
      supportsArrays: false,
      supportsUUIDs: config?.type === "postgres" ? true : false,
      transaction: config?.transaction ? (cb) => db.transaction().execute((trx) => {
        return cb(createAdapterFactory({
          config: {
            ...adapterOptions.config,
            transaction: false
          },
          adapter: createCustomAdapter(trx, true)
        })(lazyOptions));
      }) : false
    },
    adapter: createCustomAdapter(db)
  };
  const adapter = createAdapterFactory(adapterOptions);
  return (options) => {
    lazyOptions = options;
    const instance = adapter(options);
    const schemaCheck = createSchemaCheck(() => findSchemaProblems(db, config?.type, getExpectedSchema(options, { usePlural: config?.usePlural })), "database", options.database);
    registerSchemaCheck(instance, schemaCheck, { runtimeEnabled: checksSchema(options) });
    return instance;
  };
};

export {
  diffSchema,
  formatSchemaFinding,
  invalidateSchemaChecks,
  schemaCheckFor,
  runtimeSchemaCheckFor,
  getKyselyDatabaseType,
  createKyselyAdapter,
  toIntrospectedTables,
  toPhysicalSchema,
  getPostgresSchema,
  getMssqlSchema,
  introspectPostgresTables,
  kyselyAdapter
};
