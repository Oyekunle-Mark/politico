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

dropTableOffice();
dropTableParty();

db.end();
