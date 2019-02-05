import db from '../db/db';

const createUser = (req, res) => {
  const {
    firstname, lastname, othername, email, phoneNumber, passportUrl, password,
  } = req.body;

  const text = 'INSERT INTO users(firstname, lastname, othername, email, phoneNumber, passportUrl, password) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [firstname, lastname, othername, email, phoneNumber, passportUrl, password];

  db.query(text, values, (error, results) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        error: error.detail,
      });
    }

    return res.status(201).json({
      status: 201,
      data: [{
        user: results.rows[0],
      }],
    });
  });
};

export default createUser;
