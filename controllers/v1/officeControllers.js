import OfficeMiddeware from '../../middlewares/officeMiddleware';

const offices = [];

class OfficeController {
  static createOffice(req, res) {
    OfficeMiddeware.createOfficeCheck(req);

    if (req.error === true) {
      res.status(404).json({
        status: 404,
        error: 'Provide type and name of the office.',
      });
    } else {
      const { type, name } = req.body;

      const office = {
        id: offices.length + 1,
        type,
        name,
      };

      offices.push(office);

      res.status(200).json({
        status: 200,
        data: [{
          ...office,
        }],
      });
    }
  }

  static getAllOffices(req, res) {
    if (offices.length === 0) {
      res.status(200).json({
        status: 200,
        message: 'No office created',
      });
    }

    res.status(200).json({
      status: 200,
      data: [
        ...offices,
      ],
    });
  }

  static getSpecificOffice(req, res) {
    if (offices.length === 0) {
      res.status(200).json({
        status: 200,
        message: 'No office created',
      });
    }

    const id = parseInt(req.params.id, 10);

    if (id > offices.length) {
      res.status(404).send({
        status: 404,
        error: 'Id exceeds number of offices',
      });
    }

    const office = offices[id - 1];

    res.status(200).json({
      status: 200,
      data: [{
        ...office,
      }],
    });
  }
}

export default OfficeController;
