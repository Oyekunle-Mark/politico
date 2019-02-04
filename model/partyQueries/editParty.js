import db from '../db/db';

const editParty = (req, res) => {
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
