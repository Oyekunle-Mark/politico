class UserMiddleware {
  static createUserCheck(req, res, next) {
    const {
      firstname, lastname, othername, email, phoneNumber, passportUrl, password,
    } = req.body;

    if (!firstname || !lastname || !othername || !email
      || !phoneNumber || !passportUrl || !password || !(firstname.length >= 3) || !(lastname.length >= 3) || !(othername.length >= 3) || !(/[\w]+@[a-zA-Z]+\.com$/.test(email))
      || !(phoneNumber.length > 6) || !(/[\w]+:[a-zA-Z]+\.[\w]+/.test(passportUrl)) || !(password.length >= 8)) {
      return res.status(404).json({
        status: 404,
        error: 'Fill all fields. Password must be 8 characters or more',
      });
    }

    next();
  }

  static loginUserCheck(req, res, next) {
    const { email, password } = req.body;

    if (!password || !email || !(password.length >= 8) || !(/[\w]+@[a-zA-Z]+\.com$/.test(email))) {
      return res.status(404).json({
        status: 404,
        error: 'Enter a valid email and a password 8 characters or longer.',
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
