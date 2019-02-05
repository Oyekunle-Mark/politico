class PartyMiddleware {
  static createPartyCheck(req, res, next) {
    if (!req.body.name || !req.body.hqAddress || !req.body.logoUrl) {
      return res.status(404).json({
        status: 404,
        error: 'Provide name, address and logo of the party',
      });
    }

    next();
  }

  static editSpecificPartyCheck(req, res, next) {
    if (!req.body.name) {
      return res.status(404).json({
        status: 404,
        error: 'Provide new name of the party',
      });
    }

    next();
  }
}

export default PartyMiddleware;
