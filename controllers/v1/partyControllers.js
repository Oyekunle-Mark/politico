const parties = [];

class PartyController {
  static createParty(req, res) {
    const { name, hqAddress, logoUrl } = req.body;

    const party = {
      id: parties.length + 1,
      name,
      hqAddress,
      logoUrl,
    };

    parties.push(party);
    
    return res.status(200).json({
      status: 200,
      data: [{
        id: party.id,
        name,
      }],
    });
  }

  static getSpecificParty(req, res) {
    if (parties.length === 0) {
      return res.status(404).send({
        status: 404,
        errror: 'No parties added',
      });
    }

    const id = parseInt(req.params.id, 10);
    const party = parties[id - 1];

    return res.status(200).json({
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
      return res.status(200).json({
        status: 200,
        message: 'No parties created',
      });
    }

    return res.status(200).json({
      status: 200,
      data: [
        parties.map(party => ({ id: party.id, name: party.name, logoUrl: party.logoUrl })),
      ],
    });
  }

  static editSpecificParty(req, res) {
    if (parties.length === 0) {
      return res.status(404).send({
        tatus: 404,
        errror: 'No parties added',
      });
    }

    const id = parseInt(req.params.id, 10);
    const { name } = req.body;

    // const partyList = parties.map(party => (
    //   party.id !== id ? party : ({id, name, hqAddress: party.hqAddress, logoUrl: party.logoUrl })
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

    return res.status(200).json({
      status: 200,
      data: [{
        id,
        name,
      }],
    });
  }

  static deleteSpecificParty(req, res) {
    if (parties.length === 0) {
      return res.status(404).send({
        tatus: 404,
        errror: 'No parties added',
      });
    }

    const id = parseInt(req.params.id, 10);

    // const newParties = parties.filter(party => party.id === id );

    // parties = {
    //   ...newParties,
    // };

    parties.splice(id - 1, 1);

    return res.status(200).json({
      status: 200,
      data: [{
        message: 'Party deleted',
      }],
    });
  }
}

export default PartyController;
