import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import gql from 'graphql-tag';

const ALL_PEOPLE = gql`
  query AllPeople {
    people {
      id
      name
    }
  }
`;

const People = () => {
  const {
    loading,
    data,
  } = useQuery(ALL_PEOPLE);

  return (
    <>
      <h2>Names</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul>
          {data.people.map(person => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default People;
