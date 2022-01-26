const glob = require("fast-glob");
const { promises: fs } = require("fs");
const { convertSchemas } = require("appsync-schema-converter");

const SCHEMA_PATH = "./schema.graphql";

module.exports.compile = async (_) => {
  let schemas;

  schemas = await glob(`${__dirname}/**/*.graphql`);
  schemas = await Promise.all(schemas.map((schema) => fs.readFile(schema, { encoding: "utf-8" })));
  schemas = convertSchemas(schemas, {
    commentDescriptions: true,
    includeDirectives: true,
    includeEnumDescriptions: false,
    interfaceSeparator: ", ",
  });
  // Or use the simplified version: convertAppSyncSchemas(schemas);

  await fs.writeFile(SCHEMA_PATH, schemas);

  return SCHEMA_PATH;
};