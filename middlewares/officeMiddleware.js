class OfficeMiddleware {
  static createOfficeCheck(req, res, next) {
    if (!req.body.type || req.body.type.length < 5) {
      return res.status(400).json({
        status: 400,
        error: 'Ensure type is filled and is 5 characters or more'
      });
    }

    if (!req.body.name || req.body.name.length < 5) {
      return res.status(400).json({
        status: 400,
        error: 'Ensure name is filled and is 5 characters or more'
      });
    }
    next();
  }
}

export default OfficeMiddleware;
