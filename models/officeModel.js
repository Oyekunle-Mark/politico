import offices from './datastore/officeData';

class OfficeModel {
  static createOffice(res, type, name) {
    const office = {
      id: offices.length + 1,
      type,
      name,
    };

    offices.push(office);

    return office;
  }

  static getAllOffices(res) {
    if (offices.length === 0) {
      res.status(200).json({
        status: 200,
        message: 'No office created',
      });
    }

    return offices;
  }

  static getSpecificOffice(res, id) {
    if (offices.length === 0) {
      res.status(200).json({
        status: 200,
        message: 'No office created',
      });
    } else if (id > offices.length) {
      res.status(404).send({
        status: 404,
        error: 'Id exceeds number of offices',
      });
    }

    const office = offices[id - 1];

    return office;
  }
}

export default OfficeModel;
