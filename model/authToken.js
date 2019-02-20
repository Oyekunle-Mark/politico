import jwt from 'jsonwebtoken';

class AuthToken {
  static decryptToken(req, res) {
    const { token } = req.body;

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: 'Not authorized to view page. Sign in first.'
        });
      }

      return res.status(200).json({
        status: 200,
        data: decoded
      });
    });
  }
}

export default AuthToken;
