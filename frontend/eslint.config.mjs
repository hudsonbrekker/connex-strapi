import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import graphqlPlugin from "@graphql-eslint/eslint-plugin"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.config({
		extends: ["next/core-web-vitals", "next/typescript"],
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
		},
	}),
	{
		files: ["**/*.graphql"],
		languageOptions: {
			parser: graphqlPlugin.parser,
			parserOptions: {
				graphQLConfig: {
					schema: "./schema.graphql",
				},
			},
		},
		plugins: {
			"@graphql-eslint": graphqlPlugin,
		},
		rules: {
			"@graphql-eslint/known-type-names": "error",
		},
	},
]

export default eslintConfig
