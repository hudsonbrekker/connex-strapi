import AppQueryProvider from "@/lib/providers/query-provider"
import { PropsWithChildren } from "react"
import ApolloClientProvider from "./apollo-client-provider"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

const Providers = async ({ children }: PropsWithChildren) => {
	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages()

	return (
		<NextIntlClientProvider messages={messages}>
			<ApolloClientProvider>
				<AppQueryProvider>{children}</AppQueryProvider>
			</ApolloClientProvider>
		</NextIntlClientProvider>
	)
}

export default Providers
