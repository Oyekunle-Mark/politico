class PartyMiddleware {
  static createPartyCheck(req, res, next) {
    if (!req.body.name || req.body.name.length < 3) {
      return res.status(400).json({
        status: 400,
        error: 'Name must be provided and be 3 characters or more',
      });
    }

    if (!req.body.hqAddress || req.body.hqAddress.length < 10) {
      return res.status(400).json({
        status: 400,
        error: 'hqAddress must be provided and be 10 characters or more',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a party logo.',
      });
    }

    next();
  }

  static editSpecificPartyCheck(req, res, next) {
    if (!req.body.name || req.body.name.length < 3) {
      return res.status(400).json({
        status: 400,
        error: 'Provide name of 3 characters or more',
      });
    }

    next();
  }
}

export default PartyMiddleware;
