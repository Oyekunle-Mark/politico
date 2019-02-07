class PartyMiddleware {
  static createPartyCheck(req, res, next) {
    const { logoUrl } = req.body;

    if (!req.body.name || !req.body.hqAddress || !req.body.logoUrl || req.body.name.length < 3
      || req.body.hqAddress.length < 10 || !(/[\w]+:[\w]+\.[\w]+/.test(logoUrl))) {
      return res.status(404).json({
        status: 404,
        error: 'All fields must be valid and of appropriate length',
      });
    }

    next();
  }

  static editSpecificPartyCheck(req, res, next) {
    if (!req.body.name || req.body.name.length < 3) {
      return res.status(404).json({
        status: 404,
        error: 'Name cannot be less than 3 characters',
      });
    }

    next();
  }
}

export default PartyMiddleware;
