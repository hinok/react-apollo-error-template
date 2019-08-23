import React, { useState } from 'react';
import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';

const ADD_PERSON = gql`
  mutation AddPerson($person: Person) {
    addPerson(person: $person) {
      id
      name
    }
  }
`;

const renderLabel = (added, loading, error) => {
  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return 'Error...';
  }

  if (added) {
    return 'OK! Added person';
  }

  return 'Add person';
};

const AddPerson = ({ mutate, rerender }) => {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setLoading(true);

    mutate({
      variables: {
        person: {
          name: Date.now(),
        },
      },
    })
      .then(() => {
        rerender();
        setLoading(false);
        setAdded(true);
        setError(null);
        setTimeout(() => {
          setAdded(false);
        }, 1000);
      })
      .catch(error => {
        setLoading(false);
        setError(error);
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
  };

  return <button onClick={handleClick}>{renderLabel(added, loading, error)}</button>;
};

export default graphql(ADD_PERSON)(AddPerson);
