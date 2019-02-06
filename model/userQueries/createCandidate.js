import db from '../db/db';

const createCandidate = (req, res) => {
  const candidate = parseInt(req.params.id, 10);
  const { party, office } = req.body;

  const text = 'INSERT INTO candidate(party, office, candidate) VALUES($1, $2, $3) RETURNING *';
  const values = [party, office, candidate];

  db.query(text, values, (error) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        error: error.detail,
      });
    }

    return res.status(201).json({
      status: 201,
      data: [{
        office,
        user: candidate
      }],
    });
  });
};

export default createCandidate;
