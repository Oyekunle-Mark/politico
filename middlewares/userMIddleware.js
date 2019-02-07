class UserMiddleware {
  static createUserCheck(req, res, next) {
    const {
      firstname, lastname, othername, email, phoneNumber, passportUrl, password,
    } = req.body;

    if (!firstname || !(firstname.length >= 3)) {
      return res.status(400).json({
        status: 400,
        error: 'Provide name of 3 characters or more',
      });
    }

    if (!lastname || !(lastname.length >= 3)) {
      return res.status(400).json({
        status: 400,
        error: 'Last name must be provided and be 3 characters or more',
      });
    }

    if (!othername || !(othername.length >= 3)) {
      return res.status(400).json({
        status: 400,
        error: 'Other name must be provided and be 3 characters or more',
      });
    }

    if (!email || !(/[\w]+@[a-zA-Z]+\.com$/.test(email))) {
      return res.status(400).json({
        status: 400,
        error: 'Make sure you provide a vaid email address',
      });
    }

    if (!phoneNumber || !(phoneNumber.length > 6)) {
      return res.status(400).json({
        status: 400,
        error: 'Provide a phone number of 7 digits or more',
      });
    }

    if (!passportUrl || !(/[\w]+:[a-zA-Z]+\.[\w]+/.test(passportUrl))) {
      return res.status(400).json({
        status: 400,
        error: 'Ensure you provide a valid passportUrl field',
      });
    }

    if (!password || !(password.length >= 8)) {
      return res.status(400).json({
        status: 400,
        error: 'Provide password of 8 or more characters.',
      });
    }

    next();
  }

  static loginUserCheck(req, res, next) {
    const { email, password } = req.body;

    if (!password || !(password.length >= 8)) {
      return res.status(400).json({
        status: 400,
        error: 'Provide password of 8 or more characters.',
      });
    }

    if (!email || !(/[\w]+@[a-zA-Z]+\.com$/.test(email))) {
      return res.status(400).json({
        status: 400,
        error: 'Make sure you provide a valid email address',
      });
    }

    next();
  }

  static candidateCheck(req, res, next) {
    const { party, office } = req.body;

    if (!party) {
      return res.status(400).json({
        status: 400,
        error: 'Provide party',
      });
    }

    if (!office) {
      return res.status(400).json({
        status: 400,
        error: 'Provide office',
      });
    }

    next();
  }

  static voteCheck(req, res, next) {
    const { office, candidate } = req.body;

    if (!office) {
      return res.status(400).json({
        status: 400,
        error: 'Enter office',
      });
    }

    if (!candidate) {
      return res.status(400).json({
        status: 400,
        error: 'Enter candidate',
      });
    }

    next();
  }
}

export default UserMiddleware;
