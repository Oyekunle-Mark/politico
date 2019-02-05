import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/db';

const createUser = (req, res) => {
  const {
    firstname, lastname, othername, email, phoneNumber, passportUrl, password,
  } = req.body;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    const text = 'INSERT INTO users(firstname, lastname, othername, email, phoneNumber, passportUrl, password) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [firstname, lastname, othername, email, phoneNumber, passportUrl, hash];

    db.query(text, values, (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: error.detail,
        });
      }

      const token = jwt.sign(results.rows[0], process.env.SECRET, { expiresIn: 3600 });

      return res.status(201).json({
        status: 201,
        data: [{
          token,
          user: results.rows[0],
        }],
      });
    });
  });
};

export default createUser;
