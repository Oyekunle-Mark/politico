class OfficeMiddleware {
  static createOfficeCheck(req, res, next) {
    if (!req.body.type || !req.body.name) {
      return res.status(404).json({
        status: 404,
        error: 'Provide type and name of the office.',
      });
    }

    next();
  }
}

export default OfficeMiddleware;
