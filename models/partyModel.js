import parties from './datastore/partyData';

class PartyModel {
  static createParty(name, hqAddress, logoUrl) {
    const party = {
      id: parties.length + 1,
      name,
      hqAddress,
      logoUrl,
    };

    parties.push(party);

    return party.id;
  }

  static getSpecificParty(res, id) {
    if (parties.length === 0) {
      res.status(404).send({
        status: 404,
        errror: 'No parties added',
      });
    } else if (id > parties.length) {
      res.status(404).send({
        status: 404,
        error: 'Id exceeds number of parties',
      });
    }

    const party = parties[id - 1];

    return { name: party.name, logoUrl: party.logoUrl };
  }

  static getAllParty(res) {
    if (parties.length === 0) {
      res.status(404).json({
        status: 404,
        message: 'No parties created',
      });
    }

    return parties;
  }

  static editSpecificParty(res, id, name) {
    if (parties.length === 0) {
      res.status(404).send({
        tatus: 404,
        errror: 'No parties added',
      });
    } else if (id > parties.length) {
      res.status(404).send({
        status: 404,
        error: 'Id exceeds number of parties',
      });
    }

    const specificParty = parties[id - 1];

    parties[id - 1] = {
      id,
      name,
      hqAddress: specificParty.hqAddress,
      logoUrl: specificParty.logoUrl,
    };
  }

  static deleteSpecificParty(res, id) {
    if (parties.length === 0) {
      res.status(404).send({
        tatus: 404,
        errror: 'No parties added',
      });
    } else if (id > parties.length) {
      res.status(404).send({
        status: 404,
        error: 'Id exceeds number of parties',
      });
    }

    parties.splice(id - 1, 1);
  }
}

export default PartyModel;
