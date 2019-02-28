import db from '../db/db';

class GetSpecificVoter {
  static getVoter(req, res) {
    const voterId = parseInt(req.params.id, 10);

    const isValid = /^[\d]+$/.test(req.params.id);
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        error: 'Request parameter must be an integer',
      });
    }

    const text = 'SELECT createdOn, office, candidate FROM vote WHERE createdBy=$1';
    const values = [voterId];

    db.query(text, values, (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: error.detail,
        });
      }

      if (results.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          message: 'You are yet to vote.',
        });
      }

      return res.status(200).json({
        status: 200,
        data: results.rows,
      });
    });
  }
}

export default GetSpecificVoter;
