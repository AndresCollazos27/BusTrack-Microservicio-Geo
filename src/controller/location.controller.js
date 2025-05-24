const traccarService = require('../services/traccar.service');

exports.getLocation = async (req, res) => {
  const { deviceId } = req.params;

  try {
    const location = await traccarService.getDeviceLocation(deviceId);
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener ubicación', error: err.message });
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await traccarService.getAllDeviceLocations();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener ubicaciones', error: err.message });
  }
};
