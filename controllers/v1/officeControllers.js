const offices = [];

class OfficeController {
  static createOffice(req, res) {
    const { type, name } = req.body;

    const office = {
      id: offices.length + 1,
      type,
      name,
    };

    offices.push(office);

    return res.status(200).json({
      status: 200,
      data: [{
        ...office,
      }],
    });
  }

  static getAllOffices(req, res) {
    if (offices.length === 0) {
      return res.status(200).json({
        status: 200,
        message: 'No office created',
      });
    }

    return res.status(200).json({
      status: 200,
      data: [
        ...offices,
      ],
    });
  }
}

export default OfficeController;
