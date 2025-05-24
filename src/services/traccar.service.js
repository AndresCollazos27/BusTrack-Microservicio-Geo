const axios = require('axios');
const qs = require('qs');

const TRACCAR_URL = process.env.TRACCAR_URL;
const DEVICE_ID = process.env.DEVICE_ID;

let sessionCookie = '';

async function createSession() {
  const response = await axios.post(`${TRACCAR_URL}/api/session`, qs.stringify({
    email: process.env.TRACCAR_USER,
    password: process.env.TRACCAR_PASS
  }), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  sessionCookie = response.headers['set-cookie'][0].split(';')[0];
}

exports.getDeviceLocation = async (deviceId) => {
  if (!sessionCookie) await createSession();

  const response = await axios.get(`${TRACCAR_URL}/api/positions`, {
    headers: { Cookie: sessionCookie }
  });

  const positions = response.data;
  const target = positions.find(pos => pos.deviceId.toString() === deviceId);

  if (!target) throw new Error('Dispositivo no encontrado');

  return {
    latitude: target.latitude,
    longitude: target.longitude,
    speed: target.speed,
    time: target.fixTime
  };
};

exports.getAllDeviceLocations = async () => {
  if (!sessionCookie) await createSession();

  const response = await axios.get(`${TRACCAR_URL}/api/positions`, {
    headers: { Cookie: sessionCookie }
  });

  const positions = response.data;

  return positions.map(pos => ({
    deviceId: pos.deviceId,
    latitude: pos.latitude,
    longitude: pos.longitude,
    speed: pos.speed,
    time: pos.fixTime
  }));
};

