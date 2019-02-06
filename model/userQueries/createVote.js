import db from '../db/db';

const createVote = (req, res) => {
  const createdBy = req.user.id;
  const { office, candidate } = req.body;

  const text = 'INSERT INTO vote(createdBy, office, candidate) VALUES($1, $2, $3) RETURNING *';
  const values = [createdBy, office, candidate];

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
        candidate,
        voter: createdBy
      }],
    });
  });
};

export default createVote;
