import db from '../db/db';

const viewResults = (req, res) => {
  const office = parseInt(req.params.id, 10);

  const text = 'SELECT candidate, COUNT(candidate) FROM vote GROUP BY candidate RETURNING $1, candidate, count';
  const values = [office];

  db.query(text, values, (error, results) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        error: error.detail,
      });
    }

    return res.status(200).json({
      status: 200,
      data: results.rows,
    });
  });
};

export default viewResults;
