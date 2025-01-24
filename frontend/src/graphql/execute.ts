import { TypedDocumentString } from "@/__generated__/graphql"
import { CMS_URL, GRAPHQL_URL } from "@/types/constants"

/* 	variables: TVariables extends Record<string, never> ? [] : [TVariables], */

export const execute = <TData, TVariables>(
	query: TypedDocumentString<TData, TVariables>,
	variables?: TVariables,
	options?: RequestInit["headers"],
): (() => Promise<TData>) => {
	return async () => {
		if (!CMS_URL) {
			throw new Error("CMS_URL is not defined")
		}

		const res = await fetch(GRAPHQL_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/graphql-response+json",
				...options,
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		})

		if (!res.ok) {
			throw new Error("Network response was not ok")
		}

		const json = await res.json()

		if (json.errors) {
			const { message } = json.errors[0] || {}
			throw new Error(message || "Error…")
		}

		return json.data
	}
}
