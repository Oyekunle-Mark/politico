import db from '../db/db';

const getAllOffice = (req, res) => {
  const text = 'SELECT * FROM office';

  db.query(text, (error, results) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        error: error.detail,
      });
    }

    if (results.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: results.rows,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'No office created',
      });
    }
  });
};

export default getAllOffice;
