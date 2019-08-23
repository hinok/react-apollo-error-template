import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { isAuth } from './../auth';

const middlewareLink = new ApolloLink((operation, forward) => {
  let headers = {};

  console.log('middlewareLink');

  if (isAuth()) {
    console.log('Appending authorization to headers');
    headers = {
      authorization: 'Bearer foo',
    };
  }

  operation.setContext({
    headers,
  });

  return forward(operation);
});

export const link = ApolloLink.from([
  middlewareLink,
  new BatchHttpLink({
    uri: 'http://localhost:3005/graphql',
    batchInterval: 15,
  }),
]);
