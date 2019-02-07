import bcrypt from 'bcrypt';

import db from '../db/db';
import GenToken from '../../middlewares/genToken';

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
      const token = GenToken.newToken(results.rows[0]);

      bcrypt.compare(password, results.rows[0].password, (err, result) => {
        if (result) {
          return res.status(200).json({
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
