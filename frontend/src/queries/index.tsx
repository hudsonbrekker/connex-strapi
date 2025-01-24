import {
	LogoDocument,
	LogoQuery,
	LogoQueryVariables,
	HeroDocument,
	HeroQuery,
	HeroQueryVariables,
	KeySolutionQueryVariables,
	KeySolutionQuery,
	KeySolutionDocument,
	ServiceQueryVariables,
	ServiceQuery,
	ServiceDocument,
	ProjectQueryVariables,
	ProjectQuery,
	ProjectDocument,
} from "@/__generated__/graphql"
import { execute } from "@/graphql/execute"
import { queryOptions } from "@tanstack/react-query"

/**
 * Query Sample
 * (Do not remove)
 * */
// export const useGetLogoQuery = <TData = LogoQuery, TError = unknown>(
// 	variables?: LogoQueryVariables,
// 	options?: UseQueryOptions<LogoQuery, TError, TData>,
// ) => {
// 	return useQuery<LogoQuery, TError, TData>({
// 		queryKey: variables === undefined ? ["GetLogo"] : ["GetLogo", variables],
// 		queryFn: execute<LogoQuery, LogoQueryVariables>(LogoDocument, variables),
// 		...options,
// 	})
// }

/**
 * Get Global Logo from Strapi GraphQL using codegen
 */
export const getLogoOptions = (variables?: LogoQueryVariables) => {
	return queryOptions({
		queryKey: variables === undefined ? ["GetLogo"] : ["GetLogo", variables],
		queryFn: execute<LogoQuery, LogoQueryVariables>(LogoDocument, variables),
	})
}

export const heroOptions = (variables?: HeroQueryVariables) => {
	return queryOptions({
		queryKey: variables === undefined ? ["Hero"] : ["Hero", variables],
		queryFn: execute<HeroQuery, HeroQueryVariables>(HeroDocument, variables),
	})
}

export const keySolutionOptions = (variables?: KeySolutionQueryVariables) => {
	return queryOptions({
		queryKey: variables === undefined ? ["KeySolution"] : ["KeySolution", variables],
		queryFn: execute<KeySolutionQuery, KeySolutionQueryVariables>(KeySolutionDocument, variables),
	})
}

export const servicesOptions = (variables?: ServiceQueryVariables) => {
	return queryOptions({
		queryKey: variables === undefined ? ["Service"] : ["Service", variables],
		queryFn: execute<ServiceQuery, ServiceQueryVariables>(ServiceDocument, variables),
	})
}

export const projectsOptions = (variables?: ProjectQueryVariables) => {
	return queryOptions({
		queryKey: variables === undefined ? ["Project"] : ["Project", variables],
		queryFn: execute<ProjectQuery, ProjectQueryVariables>(ProjectDocument, variables),
	})
}
