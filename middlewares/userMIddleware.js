class UserMiddleware {
  static createUserCheck(req, res, next) {
    const {
      firstname, lastname, othername, email, phoneNumber, passportUrl, password,
    } = req.body;

    const verifiedEmail = /[\w]+@[\w]+\.com$/.test(email);

    if (!firstname || !lastname || !othername || !verifiedEmail
      || !phoneNumber || !passportUrl || !password) {
      return res.status(404).json({
        status: 404,
        error: 'Make sure all fields are filled',
      });
    }

    next();
  }

  static loginUserCheck(req, res, next) {
    const { email, password } = req.body;

    const verifiedEmail = /[\w]+@[\w]+\.com$/.test(email);

    if (!password || !verifiedEmail) {
      return res.status(404).json({
        status: 404,
        error: 'Make sure all fields are filled',
      });
    }

    next();
  }

  static candidateCheck(req, res, next) {
    const { party, office } = req.body;

    if (!party || !office) {
      return res.status(404).json({
        status: 404,
        error: 'Make sure all fields are filled',
      });
    }

    next();
  }

  static voteCheck(req, res, next) {
    const { office, candidate } = req.body;

    if (!office || !candidate) {
      return res.status(404).json({
        status: 404,
        error: 'Make sure all fields are filled',
      });
    }

    next();
  }
}

export default UserMiddleware;
