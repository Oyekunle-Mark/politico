class OfficeMiddleware {
  static createOfficeCheck(req) {
    if (!req.body.type || !req.body.name) {
      req.error = true;
    }
  }
}

export default OfficeMiddleware;
