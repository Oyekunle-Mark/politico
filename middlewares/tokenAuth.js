import jwt from 'jsonwebtoken';

class TokenAuth {
  static tokenCheck(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(404).json({
        status: 404,
        error: 'Provide token to access page'
      });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(404).json({
          status: 401,
          error: 'Not authorized to view this page',
        });
      }

      req.user = decoded;

      next();
    });
  }
}

export default TokenAuth;
