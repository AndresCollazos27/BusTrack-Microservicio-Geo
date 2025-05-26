const bcrypt = require('bcryptjs');

async function test() {
  const hash = '$2b$10$TYU8sl89dNbc812nKsRdx.fmTX5ha2.gCEaI9w7rkFvftw1NcXqs6';
  const plain = 'admin';

  const match = await bcrypt.compare(plain, hash);
  console.log('¿Coinciden?', match);
}

test().catch(console.error);
