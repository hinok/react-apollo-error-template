import { graphql, print } from 'graphql';
import { ApolloLink, Observable } from 'apollo-link';
import { schema } from './schema';
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

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

const delayedLink = new ApolloLink(operation => {
  return new Observable(observer => {
    const { query, operationName, variables } = operation;
    delay(300)
      .then(() => {
        if (operationName === 'OnePerson' && variables.id === '1') {
          throw new Error('Bad request');
        }

        return graphql(schema, print(query), null, null, variables, operationName);
      })
      .then(result => {
        observer.next(result);
        observer.complete();
      })
      .catch(observer.error.bind(observer));
  });
});

export const link = ApolloLink.from([middlewareLink, delayedLink]);
