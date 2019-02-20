class AuthToken {
  static auth(req, res, next) {
    if (!req.body.token) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a token'
      });
    }

    next();
  }
}

export default AuthToken;
