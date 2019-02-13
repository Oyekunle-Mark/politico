import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool();

const createTableParty = async () => {
  const query = `CREATE TABLE IF NOT EXISTS party(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    hqAddress TEXT NOT NULL,
    logoUrl TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS office(
    id SERIAL PRIMARY KEY,
    type VARCHAR(30) NOT NULL,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    othername VARCHAR(30) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    phoneNumber VARCHAR(30) UNIQUE NOT NULL,
    passportUrl TEXT NOT NULL,
    password TEXT NOT NULL,
    isAdmin BOOL DEFAULT false
);

CREATE TABLE IF NOT EXISTS candidate(
    id SERIAL UNIQUE NOT NULL,
    party INT NOT NULL REFERENCES party(id) ON DELETE CASCADE,
    office INT NOT NULL REFERENCES office(id) ON DELETE CASCADE,
    candidate INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (office, candidate)
);

CREATE TABLE IF NOT EXISTS vote(
    id SERIAL NOT NULL,
    createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
    createdBy INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    office INT NOT NULL REFERENCES office(id) ON DELETE CASCADE,
    candidate INT NOT NULL REFERENCES candidate(id) ON DELETE CASCADE,
    PRIMARY KEY (office, createdBy)
);
`;

  await db.query(query)
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

createTableParty();

db.end();
