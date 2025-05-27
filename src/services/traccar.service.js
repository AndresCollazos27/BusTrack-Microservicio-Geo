const axios = require('axios');
const qs = require('qs');
const { USERNAME, PASSWORD, TRACCAR_HTTP_URL } = require('../config/traccar');

let sessionCookie = null;

async function createSession() {
  const response = await axios.post(
    `${TRACCAR_HTTP_URL}/api/session`,
    qs.stringify({ email: USERNAME, password: PASSWORD }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  sessionCookie = response.headers['set-cookie'][0].split(';')[0];
}

async function ensureSession() {
  if (!sessionCookie) {
    await createSession();
  }
}

exports.getDeviceLocation = async (deviceId) => {
  await ensureSession();

  const response = await axios.get(`${TRACCAR_HTTP_URL}/api/positions`, {
    headers: { Cookie: sessionCookie }
  });

  const positions = response.data;
  const target = positions.find(pos => pos.deviceId.toString() === deviceId.toString());

  if (!target) throw new Error('Dispositivo no encontrado');

  return {
    latitude: target.latitude,
    longitude: target.longitude,
    speed: target.speed,
    time: target.fixTime
  };
};

exports.getAllDeviceLocations = async () => {
  await ensureSession();

  const response = await axios.get(`${TRACCAR_HTTP_URL}/api/positions`, {
    headers: { Cookie: sessionCookie }
  });

  return response.data.map(pos => ({
    deviceId: pos.deviceId,
    latitude: pos.latitude,
    longitude: pos.longitude,
    speed: pos.speed,
    time: pos.fixTime
  }));
};

exports.createDevice = async (data) => {
  await ensureSession();

  if (!data.name || !data.uniqueId) {
    throw new Error("Se requieren los campos 'name' y 'uniqueId'");
  }

  const response = await axios.post(`${TRACCAR_HTTP_URL}/api/devices`, data, {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': sessionCookie
    }
  });

  if (response.status !== 200) {
    throw new Error(`Error al crear dispositivo: ${response.status} - ${response.statusText}`);
  }

  const dispositivo = response.data;

  return {
    mensaje: 'Dispositivo creado correctamente',
    dispositivo: {
      id: dispositivo.id,
      name: dispositivo.name,
      uniqueId: dispositivo.uniqueId
    }
  };
};
