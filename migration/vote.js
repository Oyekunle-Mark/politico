import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool();

const createTableVote = () => {
  const query = `CREATE TABLE IF NOT EXISTS vote(
            id SERIAL NOT NULL,
            createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
            createdBy INT NOT NULL REFERENCES users(id),
            office INT NOT NULL REFERENCES office(id),
            candidate INT NOT NULL REFERENCES candidate(id),
            PRIMARY KEY (office, createdBy)
      )`;

  db.query(query)
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

createTableVote();

db.end();
