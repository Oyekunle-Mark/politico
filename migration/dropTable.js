import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool();

const dropTableParty = () => {
  const query = 'DROP TABLE party';

  db.query(query)
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const dropTableOffice = () => {
  const query = 'DROP TABLE office';

  db.query(query)
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const dropTableUsers = () => {
  const query = 'DROP TABLE users';

  db.query(query)
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const dropTableCandidate = () => {
  const query = 'DROP TABLE candidate';

  db.query(query)
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const dropTableVote = () => {
  const query = 'DROP TABLE vote';

  db.query(query)
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

dropTableVote();
dropTableCandidate();
dropTableUsers();
dropTableOffice();
dropTableParty();

db.end();
