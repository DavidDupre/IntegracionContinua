const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'mi-db',
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

testConnection();