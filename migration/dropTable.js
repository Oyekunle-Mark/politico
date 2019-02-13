import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool();

const dropTableParty = () => {
  const query = `DROP TABLE party CASCADE;
  DROP TABLE office CASCADE;
  DROP TABLE users CASCADE;
  DROP TABLE candidate CASCADE;
  DROP TABLE vote CASCADE;`;

  db.query(query)
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

dropTableParty();

db.end();
