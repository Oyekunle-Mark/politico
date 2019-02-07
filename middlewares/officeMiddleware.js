class OfficeMiddleware {
  static createOfficeCheck(req, res, next) {
    if (!req.body.type || !req.body.name || req.body.type.length < 5 || req.body.name.length < 5) {
      return res.status(400).json({
        status: 400,
        error: 'Provide fields not less than 5 characters',
      });
    }

    next();
  }
}

export default OfficeMiddleware;
