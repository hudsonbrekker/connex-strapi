import AppQueryProvider from "@/lib/providers/query-provider"
import { PropsWithChildren } from "react"
import ApolloClientProvider from "./apollo-client-provider"

const Providers = async ({ children }: PropsWithChildren) => {
	return (
		<ApolloClientProvider>
			<AppQueryProvider>{children}</AppQueryProvider>
		</ApolloClientProvider>
	)
}

export default Providers
