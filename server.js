const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const port = 3005;

const app = express();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey' },
];

const appendTypename = person => ({
  ...person,
  __typename: 'Person',
});

const handlers = {
  OnePerson: operation => {
    const id = operation.variables.id;
    const person = peopleData.find(person => String(person.id) === String(id));
    if (!person) {
      return {
        data: {
          person: null,
        },
        errors: [
          {
            message: '404',
          },
        ],
      };
    }

    return {
      data: {
        person: appendTypename(person),
      },
    };
  },
  AllPeople: () => {
    return {
      data: {
        people: peopleData.map(appendTypename),
      },
    };
  },
  AddPerson: (operation) => {
    const nextPerson = {
      id: Date.now(),
      ...operation.variables.person,
    };

    peopleData.push(nextPerson);

    return {
      data: {
        addPerson: appendTypename(nextPerson),
      },
    };
  }
};

app.use(cors());
app.use(bodyParser.json());

app.post('/graphql', async function(req, res) {
  try {
    const result = [];

    req.body.forEach(operation => {
      const handler = handlers[operation.operationName];
      if (!handler) {
        return;
      }

      result.push(handler(operation));
    });

    await delay(500);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({
      data: {
        person: null,
        people: [],
      },
      errors: [error, error],
    });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
