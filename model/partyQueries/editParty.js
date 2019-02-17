import db from '../db/db';

const editParty = (req, res) => {
  if (req.user.isadmin === false) {
    return res.status(403).json({
      status: 403,
      error: 'Only admins are authorized to view this page.',
    });
  }

  const isValid = /^[\d]+$/.test(req.params.id);
  if (!isValid) {
    return res.status(400).json({
      status: 400,
      error: 'Request parameter must be an integer',
    });
  }

  const id = parseInt(req.params.id, 10);
  const { name } = req.body;

  const text = 'UPDATE party SET name=$1 WHERE id=$2 RETURNING *';
  const values = [name, id];

  db.query(text, values, (error, results) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        error: error.detail,
      });
    }

    if (results.rowCount > 0) {
      res.status(202).json({
        status: 202,
        data: [{
          id,
          name,
        }],
      });
    } else {
      res.status(404).send({
        status: 404,
        error: 'No party matches the id',
      });
    }
  });
};

export default editParty;
