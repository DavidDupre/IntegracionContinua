const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 3001;

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'db',
      user: 'root',
      password: 'password'
    });
    console.log('✅ Conexión exitosa a MySQL');
    const [rows] = await connection.execute('SELECT 1 + 1 AS result');
    console.log(`🔢 Resultado de prueba: ${rows[0].result}`);
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}
app.listen(PORT, () => console.log(`Backend corriendo en puerto ${PORT}`));
testConnection();