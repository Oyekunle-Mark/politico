import PartyMiddleware from '../../middlewares/partyMiddleware';

const parties = [];

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

      const party = {
        id: parties.length + 1,
        name,
        hqAddress,
        logoUrl,
      };

      parties.push(party);

      res.status(200).json({
        status: 200,
        data: [{
          id: party.id,
          name,
        }],
      });
    }
  }

  static getSpecificParty(req, res) {
    if (parties.length === 0) {
      res.status(404).send({
        status: 404,
        errror: 'No parties added',
      });
    }

    const id = parseInt(req.params.id, 10);

    if (id > parties.length) {
      res.status(404).send({
        status: 404,
        error: 'Id exceeds number of parties',
      });
    }

    const party = parties[id - 1];

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
    if (parties.length === 0) {
      res.status(200).json({
        status: 200,
        message: 'No parties created',
      });
    }

    res.status(200).json({
      status: 200,
      data: [
        parties.map(party => ({ id: party.id, name: party.name, logoUrl: party.logoUrl })),
      ],
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
      if (parties.length === 0) {
        res.status(404).send({
          tatus: 404,
          errror: 'No parties added',
        });
      }

      const id = parseInt(req.params.id, 10);

      if (id > parties.length) {
        res.status(404).send({
          status: 404,
          error: 'Id exceeds number of parties',
        });
      }

      const { name } = req.body;

      // const partyList = parties.map(party => (
      // party.id !== id ? party : ({id, name, hqAddress: party.hqAddress, logoUrl: party.logoUrl })
      // ));

      // parties = {
      //   ...partyList,
      // };

      const specificParty = parties[id - 1];

      parties[id - 1] = {
        id,
        name,
        hqAddress: specificParty.hqAddress,
        logoUrl: specificParty.logoUrl,
      };

      res.status(200).json({
        status: 200,
        data: [{
          id,
          name,
        }],
      });
    }
  }

  static deleteSpecificParty(req, res) {
    if (parties.length === 0) {
      res.status(404).send({
        tatus: 404,
        errror: 'No parties added',
      });
    }

    const id = parseInt(req.params.id, 10);

    if (id > parties.length) {
      res.status(404).send({
        status: 404,
        error: 'Id exceeds number of parties',
      });
    }

    // const newParties = parties.filter(party => party.id === id );

    // parties = {
    //   ...newParties,
    // };

    parties.splice(id - 1, 1);

    res.status(200).json({
      status: 200,
      data: [{
        message: 'Party deleted',
      }],
    });
  }
}

export default PartyController;
