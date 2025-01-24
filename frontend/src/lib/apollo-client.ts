import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import { GRAPHQL_URL } from '../types/constants';

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       authorization: `Bearer ${HYGRAPH_PERMANENTAUTH_TOKEN}`
//     }
//   };
// });

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,  
  cache: new InMemoryCache()
});

export default client;