import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool();

const createCandidate = () => {
  const query = `CREATE TABLE IF NOT EXISTS candidate(
          id SERIAL NOT NULL,
          party INT NOT NULL REFERENCES party(id),
          office INT NOT NULL REFERENCES office(id),
          candidate INT NOT NULL REFERENCES users(id),
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

createCandidate();
