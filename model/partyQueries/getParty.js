import db from '../db/db';

const getParty = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const isValid = /^[\d]+$/.test(req.params.id);
  if (!isValid) {
    return res.status(400).json({
      status: 400,
      error: 'Request parameter must be an integer',
    });
  }

  const text = 'SELECT name, logourl FROM party WHERE id=$1';
  const values = [id];

  db.query(text, values, (error, results) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        error: error.detail,
      });
    }

    if (results.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: [{
          id,
          name: results.rows[0].name,
          logourl: results.rows[0].logourl,
        }],
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'No party matches the id',
      });
    }
  });
};

export default getParty;
