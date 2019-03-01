import db from '../db/db';

class GetAllUsers {
  static getAllUsers(req, res) {
    const text = 'SELECT * from users';

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
          message: 'No users yet',
        });
      }
    });
  }
}

export default GetAllUsers;
