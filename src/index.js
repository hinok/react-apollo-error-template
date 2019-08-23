import React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { link } from './graphql/link';
import App from './App';
import './index.css';

const client = new ApolloClient({
  cache: new InMemoryCache({
    cacheRedirects: {
      Query: {
        person: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Person', id: args.id }),
      },
    },
    dataIdFromObject: object => {
      switch (object.__typename) {
        case 'Wohoho':
          return `Wohoho:${object.slug}`;
        default:
          return defaultDataIdFromObject(object);
      }
    },
  }).restore({
    "Person:4":{"id":"4","__typename":"Person"},
  }),
  link,
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
