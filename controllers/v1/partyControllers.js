import PartyModel from '../../models/partyModel';
import PartyMiddleware from '../../middlewares/partyMiddleware';

class PartyController {
  static createParty(req, res) {
    PartyMiddleware.createPartyCheck(req);

    if (req.error === true) {
      res.status(404).json({
        status: 404,
        error: 'Provide name, address and logo of the party',
      });
    } else {
      const { name, hqAddress, logoUrl } = req.body;

      const id = PartyModel.createParty(name, hqAddress, logoUrl);

      res.status(201).json({
        status: 201,
        data: [{
          id,
          name,
        }],
      });
    }
  }

  static getSpecificParty(req, res) {
    const id = parseInt(req.params.id, 10);

    const party = PartyModel.getSpecificParty(res, id);

    res.status(200).json({
      status: 200,
      data: [{
        id,
        name: party.name,
        logoUrl: party.logoUrl,
      }],
    });
  }

  static getAllParty(req, res) {
    const parties = PartyModel.getAllParty(res);

    res.status(200).json({
      status: 200,
      data: parties.map(party => ({ id: party.id, name: party.name, logoUrl: party.logoUrl })),
    });
  }

  static editSpecificParty(req, res) {
    PartyMiddleware.editSpecificPartyCheck(req);

    if (req.error === true) {
      res.status(404).json({
        status: 404,
        error: 'Provide new name of the party',
      });
    } else {
      const id = parseInt(req.params.id, 10);

      const { name } = req.body;

      PartyModel.editSpecificParty(res, id, name);

      res.status(202).json({
        status: 202,
        data: [{
          id,
          name,
        }],
      });
    }
  }

  static deleteSpecificParty(req, res) {
    const id = parseInt(req.params.id, 10);

    PartyModel.deleteSpecificParty(res, id);

    res.status(200).json({
      status: 200,
      data: [{
        message: 'Party deleted',
      }],
    });
  }
}

export default PartyController;
