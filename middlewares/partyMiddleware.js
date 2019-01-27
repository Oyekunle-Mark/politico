class PartyMiddleware {
  static createPartyCheck(req) {
    if (!req.body.name || !req.body.hqAddress || !req.body.logoUrl) {
      req.error = true;
    }
  }

  static editSpecificPartyCheck(req) {
    if (!req.body.name) {
      req.error = true;
    }
  }
}

export default PartyMiddleware;
