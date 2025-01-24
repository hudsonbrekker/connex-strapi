import type { CodegenConfig } from "@graphql-codegen/cli"
import "./envConfig.ts"

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.NEXT_PUBLIC_CMS_URL! + "/graphql",
	documents: "src/**/*.{ts,tsx}",
	generates: {
		"./src/__generated__/": {
			preset: "client",
			presetConfig: {
				gqlTagName: "gql",
			},
			config: {
				includeDirectives: true,
				documentMode: "string",
			},
		},
		// "./src/__generated__/types.ts": {
		// 	plugins: ["typescript", "typescript-operations"],
		// },
		"./src/__generated__/query-types.ts": {
			plugins: ["typescript-react-query"],
			config: {
				fetcher: {
					func: "../graphql/execute#execute",
					isReactHook: false, // optional, defaults to false, controls the function's signature.
				},
			},
		},
		"./graphql.schema.json": {
			plugins: ["introspection"],
			config: {
				minify: true,
			},
		},
		"./schema.graphql": {
			plugins: ["schema-ast"],
			config: {
				includeIntrospectionTypes: true,
			},
		},
	},
}

export default config
