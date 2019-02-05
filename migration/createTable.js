import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool();

const createTableParty = () => {
  const query = `CREATE TABLE IF NOT EXISTS party(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        hqAddress TEXT NOT NULL,
        logoUrl TEXT NOT NULL
  )`;

  db.query(query)
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const createTableOffice = () => {
  const query = `CREATE TABLE IF NOT EXISTS office(
        id SERIAL PRIMARY KEY,
        type VARCHAR(30) NOT NULL,
        name VARCHAR(30) UNIQUE NOT NULL
  )`;

  db.query(query)
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const createTableUser = () => {
  const query = `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(30) NOT NULL,
        lastname VARCHAR(30) NOT NULL,
        othername VARCHAR(30) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        phoneNumber VARCHAR(30) UNIQUE NOT NULL,
        passportUrl TEXT NOT NULL,
        password VARCHAR(30) UNIQUE NOT NULL,
        isAdmin BOOL DEFAULT false
  )`;

  db.query(query)
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.log(error);
    });
};


createTableParty();
createTableOffice();
createTableUser();

db.end();
