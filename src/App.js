import React, { useState } from 'react';
import { setAuth } from './auth';
import People from './People';
import Person from './Person';
import AddPerson from './AddPerson';

export default function App() {
  const [personId, setPerson] = useState('1');
  const [rendered, setRendered] = useState(1);

  const rerender = () => setRendered(rendered + 1);

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>This application can be used to demonstrate an error in Apollo Client.</p>
      <hr />
      <button onClick={() => setAuth(true)}>Set auth: true</button>
      <button onClick={() => setAuth(false)}>Set auth: false</button>
      <button onClick={() => setPerson('1')}>Load person id: 1</button>
      <button onClick={() => setPerson('2')}>Load person id: 2</button>
      <button onClick={() => setPerson('4')}>Load person id: 4</button>
      <AddPerson rerender={rerender} />
      <p>
        Rendered times: {rendered}{' '}
        <button onClick={() => setRendered(rendered + 1)}>Re-render</button>
      </p>
      <hr />
      <People key={`people-${rendered}`} personId={personId} />
      <Person key={`person-${rendered}`} id={personId} />
    </main>
  );
}
