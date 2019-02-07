import db from '../db/db';

const createCandidate = (req, res) => {
  if (req.user.isadmin === false) {
    return res.status(403).json({
      status: 403,
      error: 'Only admins are authorized to view this page.',
    });
  }

  const isValid = /[1-9]+/.test(req.params.id);
  if (!isValid) {
    return res.status(400).json({
      status: 400,
      error: 'Request parameter must be an integer',
    });
  }

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
