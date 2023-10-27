import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://magexo-interview.myshopify.com/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-Shopify-Storefront-Access-Token': '4a7580803918255b7e93ee661ff2cead'
    }
  }
});

const logLink = new ApolloLink((operation, forward) => {
  console.log(`Starting request for ${operation.operationName}`);
  console.log('Query:\n', operation.query.loc.source.body);
  console.log('Variables:\n', operation.variables);

  return forward(operation).map(response => {
    console.log(`Response from ${operation.operationName}:\n`, response);
    return response;
  });
});

const client = new ApolloClient({
  link: ApolloLink.from([logLink, authLink, httpLink]),
  cache: new InMemoryCache()
});

export default client;
