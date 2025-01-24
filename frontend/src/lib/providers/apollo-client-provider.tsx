"use client"

import { ApolloProvider } from "@apollo/client"
import type { PropsWithChildren } from "react"
import client from "../apollo-client"

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloClientProvider
