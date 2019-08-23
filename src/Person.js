import React from 'react';
import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

const ONE_PERSON = gql`
  query OnePerson($id: String!) {
    person(id: $id) {
      id
      name
    }
  }
`;

const Person = ({ data }) => {
  console.log('<Person />', {
    error: data.error,
    loading: data.loading,
    data,
  });

  return (
    <>
      <h2>Person</h2>
      {data.error && <p>Got error</p>}
      {data.loading && <p>Loading...</p>}
      {!data.error && !data.loading && <pre>{JSON.stringify(data.person, undefined, 2)}</pre>}
    </>
  );
};

export default graphql(ONE_PERSON, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
})(Person);
