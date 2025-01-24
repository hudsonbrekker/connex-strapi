import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placehold.co",
			},
			{
				protocol: "https",
				hostname: "img.daisyui.com",
			},
			{
				protocol: 'http',
				hostname: '127.0.0.1',
				port: '1337'
			}
		],
		localPatterns: [
			{
				pathname: "src/assets/images/**",
				search: "",
			},
		],
	},
	// experimental: {
	// 	swcPlugins: [
	// 		[
	// 			"@graphql-codegen/client-preset-swc-plugin",
	// 			{ artifactDirectory: "./src/__generated__", gqlTagName: "gql" },
	// 		],
	// 	],
	// },
}

export default nextConfig
