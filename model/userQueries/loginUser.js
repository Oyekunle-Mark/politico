import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/db';

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const text = 'SELECT * FROM users WHERE email=$1';
  const values = [email];

  db.query(text, values, (error, results) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        error: error.detail,
      });
    }

    if (results.rowCount > 0) {
      const token = jwt.sign(results.rows[0], process.env.SECRET, { expiresIn: 3600 });

      bcrypt.compare(password, results.rows[0].password, (err, result) => {
        if (result) {
          return res.status(201).json({
            status: 200,
            data: [{
              token,
              user: results.rows[0],
            }],
          });
        }

        return res.status(401).json({
          status: 401,
          errror: 'Username or password incorrect',
        });
      });
    } else {
      res.status(401).json({
        status: 401,
        errror: 'Username or password incorrect',
      });
    }
  });
};

export default loginUser;
