import db from '../db/db';

const viewResults = (req, res) => {
  const office = parseInt(req.params.id, 10);

  const isValid = /^[\d]+$/.test(req.params.id);
  if (!isValid) {
    return res.status(400).json({
      status: 400,
      error: 'Request parameter must be an integer',
    });
  }

  const text = 'SELECT office, candidate, COUNT(candidate) FROM vote WHERE office=$1 GROUP BY candidate, office';
  const values = [office];

  db.query(text, values, (error, results) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        error: error.detail,
      });
    }

    if (results.rowCount === 0) {
      return res.status(200).json({
        status: 200,
        data: 'No vote for the party yet',
      });
    }

    return res.status(200).json({
      status: 200,
      data: results.rows,
    });
  });
};

export default viewResults;
