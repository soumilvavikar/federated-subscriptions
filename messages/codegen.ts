import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/*.graphql",
  generates: {
    "./src/__generated__/resolvers-types.ts": {
      config: {
        federation: true,
        useIndexSignature: true,
        contextType: '../types/DataSourceContext#DataSourceContext',
        mappers: {
          Message: "../datasources/models#MessageRepresentation",
          User: "../datasources/models#UserRepresentation"
        }
      },
      plugins: ["typescript","typescript-resolvers"]
    },
  },
};

export default config;
