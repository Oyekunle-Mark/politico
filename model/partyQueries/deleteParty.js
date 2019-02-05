import db from '../db/db';

const deleteParty = (req, res) => {
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
