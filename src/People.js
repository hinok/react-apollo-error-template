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
  const { loading, error, data } = useQuery(ALL_PEOPLE);

  console.log('<People />', {
    loading,
    error,
    data,
  });

  return (
    <>
      <h2>People</h2>
      {error && <p>Got error...</p>}
      {loading && <p>Loading...</p>}
      {!error && !loading && (
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
