import db from '../db/db';

const createOffice = (req, res) => {
  if (req.user.isadmin === false) {
    return res.status(403).json({
      status: 403,
      error: 'Only admins are authorized to view this page.',
    });
  }

  const { type, name } = req.body;

  const text = 'INSERT INTO office(name, type) VALUES($1, $2) RETURNING *';
  const values = [name, type];

  db.query(text, values, (error, results) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        error: error.detail,
      });
    }

    return res.status(201).json({
      status: 201,
      data: [
        results.rows[0],
      ],
    });
  });
};

export default createOffice;
