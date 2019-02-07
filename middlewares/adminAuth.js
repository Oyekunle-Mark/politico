class AdminValidation {
  static adminCheck(req, res, next) {
    if (req.user.isadmin === false) {
      return res.status(401).json({
        status: 401,
        error: 'Only admins are authorized to view this page.',
      });
    }

    next();
  }
}

export default AdminValidation;
