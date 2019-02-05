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
}

export default UserMiddleware;
