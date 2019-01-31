import OfficeModel from '../../models/officeModel';
import OfficeMiddeware from '../../middlewares/officeMiddleware';

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

      const office = OfficeModel.createOffice(res, type, name);

      res.status(201).json({
        status: 201,
        data: [{
          ...office,
        }],
      });
    }
  }

  static getAllOffices(req, res) {
    const offices = OfficeModel.getAllOffices(res);

    res.status(200).json({
      status: 200,
      data: [
        ...offices,
      ],
    });
  }

  static getSpecificOffice(req, res) {
    const id = parseInt(req.params.id, 10);

    const office = OfficeModel.getSpecificOffice(res, id);

    res.status(200).json({
      status: 200,
      data: [{
        ...office,
      }],
    });
  }
}

export default OfficeController;
