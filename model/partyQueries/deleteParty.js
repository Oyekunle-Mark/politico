import db from '../db/db';

const deleteParty = (req, res) => {
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

  const id = parseInt(req.params.id, 10);

  const text = 'DELETE FROM party WHERE id=$1 RETURNING *';
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
          message: 'Party deleted',
        }],
      });
    } else {
      res.status(404).send({
        status: 404,
        errror: 'No party matched the id',
      });
    }
  });
};

export default deleteParty;
