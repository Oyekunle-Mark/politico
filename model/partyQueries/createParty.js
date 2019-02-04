import db from '../db/db';

const createParty = (req, res) => {
  const { name, hqAddress, logoUrl } = req.body;

  const text = 'INSERT INTO party(name, hqAddress, logoUrl) VALUES($1, $2, $3) RETURNING *';
  const values = [name, hqAddress, logoUrl];

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
        id: results.rows[0].id,
        name,
      }],
    });
  });
};

export default createParty;
