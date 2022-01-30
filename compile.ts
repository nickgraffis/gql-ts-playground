const glob = require("fast-glob");
const fsSync = require("fs");
const { promises: fs } = require("fs");
const { convertSchemas } = require("appsync-schema-converter");
const YAML = require('yaml');
const { generate } = require('@graphql-codegen/cli')

type DataSource = {
  dataSource: string,
  type: string,
  field: string,
  request: string,
  response: string
}

type DataSourceOptions = {
  hardCodedMappingTemplates?: string,
  templatesDirectory?: string,
}

function writeDataSourcesYaml(file: string, options: DataSourceOptions) {
  const schema = fsSync.readFileSync(file, { encoding: "utf-8" });
  const types = schema.split('type')
  .map((type: string) => ({type: type.split('\n')[0].replace('{', '').trim(), data: type.split('\n').slice(1)}))
  .filter((type: { type: string; }) => type.type === 'Query' || type.type === 'Mutation');
  const hasHardCodedMappingTemplate = fsSync.existsSync(options.hardCodedMappingTemplates);
  const hardCodedMappingTempaltes = 
    hasHardCodedMappingTemplate ? 
      fsSync.readFileSync(options.hardCodedMappingTemplates, { encoding: "utf-8"}) :
      '';
  const hardCodedMappingTemplatesObject: {
    mappingTemplates: DataSource[]
  } = YAML.parse(hardCodedMappingTempaltes);
  const previousDataSource: {
    mappingTemplates: DataSource[]
  } = {
    mappingTemplates: []
  }

  if (hasHardCodedMappingTemplate) 
    previousDataSource.mappingTemplates.push(...hardCodedMappingTemplatesObject.mappingTemplates);
  console.log('✓ Generating request templates...');
  const dataSources = types.map((type: { data: string[]; type: string; }) => {
    const fields = type.data
      .filter(data => data.includes('('))
      .map(data => data.split('(')[0].trim());
      return fields.map(field => {
        const requestTemplate = `
{
  "version": "2017-02-28",
  "operation": "Invoke",
  "payload": {
    "field": "${field}",
    "identity": $util.toJson($context.identity),
    "arguments": $util.toJson($context.arguments)
  }
}`

fsSync.writeFileSync(`${__dirname}/${options.templatesDirectory}/${field}RequestTemplate.json`, requestTemplate)      
      return {
        dataSource: 'marketinsights',
        type: type.type,
        field,
        request: field + 'RequestTemplate.json',
        response: 'defaultResponseTemplate.json'
      }
    })
  }).flat()
  previousDataSource.mappingTemplates.push(...dataSources);
  console.log('✓ Generating mapping templates...');
  fsSync.writeFileSync('./datasources.yml', YAML.stringify(previousDataSource));
}

export type CompileOptions = {
  schemaInput: string,
  schemaOutput: string,
  documents: string[],
  typesOutputFrontEnd: string,
  typesOutputBackEnd: string,
  templatesDirectory: string,
}

 export async function compile(options: CompileOptions) {
  const { 
    schemaInput: inputSchema, 
    schemaOutput, 
    documents, 
    typesOutputFrontEnd, 
    typesOutputBackEnd,
    templatesDirectory 
  } = options;
  let schemas;
  const SCHEMA_PATH = schemaOutput || "./schema.graphql";
  // Stitch together all the schemas
  schemas = await glob(`${__dirname}${inputSchema}`);
  schemas.forEach((schema: string) => {
    writeDataSourcesYaml(schema, {
      hardCodedMappingTemplates: './hardCodedMappingTemplates.yml',
      templatesDirectory
    })
  });
  schemas = await Promise.all(schemas.map((schema: string) => fs.readFile(schema, { encoding: "utf-8" })));
  schemas = convertSchemas(schemas, {
    commentDescriptions: true,
    includeDirectives: true,
    includeEnumDescriptions: false,
    interfaceSeparator: ", ",
  });
  // Or use the simplified version: convertAppSyncSchemas(schemas);
  console.log('✓ Generating GraphQL Schema...');
  await fs.writeFile(SCHEMA_PATH, schemas);
  console.log('✓ Generating types...');
  await generate(
    {
      schema: SCHEMA_PATH,
      log: false,
      documents: documents.map(document => `${__dirname}/${document}`),
      generates: {
        [process.cwd() + typesOutputFrontEnd]: {
          plugins: [
            'typescript',
            "typescript-operations",
            "typescript-apollo-angular"
          ]
        },
        [process.cwd() + typesOutputBackEnd]: {
          plugins: [
            'typescript',
            "typescript-operations",
          ]
        },
        [process.cwd() + '/graphql.schema.json']: {
          plugins: [
            "introspection"
          ]
        }
      }
    },
    true
  )

  // Add all the schema fields to the datasources yaml

  return SCHEMA_PATH;
};