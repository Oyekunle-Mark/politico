const parties = [];

const offices = [];

class Controller {
  createParty(req, res) {
    const party = {
      id: parties.length + 1,
      name: req.body.name,
      hqAddress: req.body.hqAddress,
      logoUrl: req.body.logoUrl
    }

    parties.push(party);
    
    return res.status(200).send({
      status: 200,
      data: [{
        "id": party.id,
        "name": party.name
      }]
    })
  }

  getSpecificParty(req, res) {
    if (parties.length === 0) {
      return res.status(404).send({
        status: 404,
        errror: "No parties added"
      })
    }

    const id = parseInt(req.params.id);
    const party = parties[id - 1];

    return res.status(200).send({
      status: 200,
      data: [{
        id,
        name: party.name,
        logoUrl: party.logoUrl
      }]
    })
  }

  getAllParty(req, res) {
    return res.status(200).send({
      status: 200,
      data: [
        parties.map(party => ({id: party.id, name: party.name, logoUrl: party.logoUrl}))
      ]
    })
  }
}

const controller = new Controller();
export default controller;
