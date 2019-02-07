import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool();

const createTableCandidate = () => {
  const query = `CREATE TABLE IF NOT EXISTS candidate(
          id SERIAL UNIQUE NOT NULL,
          party INT NOT NULL REFERENCES party(id) ON DELETE CASCADE,
          office INT NOT NULL REFERENCES office(id) ON DELETE CASCADE,
          candidate INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          PRIMARY KEY (office, candidate)
    )`;

  db.query(query)
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const createTableVote = () => {
  const query = `CREATE TABLE IF NOT EXISTS vote(
            id SERIAL NOT NULL,
            createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
            createdBy INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            office INT NOT NULL REFERENCES office(id) ON DELETE CASCADE,
            candidate INT NOT NULL REFERENCES candidate(id) ON DELETE CASCADE,
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

createTableCandidate();
createTableVote();

db.end();
