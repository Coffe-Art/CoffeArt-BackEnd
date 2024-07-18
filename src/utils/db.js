const mysql = require('mysql2');

let pool;

function createPool() {
  pool = mysql.createPool({
    host: 'bs3k43znev9zti3mtb1t-mysql.services.clever-cloud.com',
    user: 'uaak3xe9jirlkf23',
    password: '1p8KPuSCC0v6qHC5Jtyi',
    database: 'bs3k43znev9zti3mtb1t',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 15, 
    queueLimit: 0
  });

  pool.on('connection', (connection) => {
    console.log('New connection established with the database.');
  });

  pool.on('acquire', (connection) => {
    console.log('Connection %d acquired', connection.threadId);
  });

  pool.on('release', (connection) => {
    console.log('Connection %d released', connection.threadId);
  });

  pool.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Attempting to reconnect...');
      createPool(); 
    } else {
      throw err;
    }
  });
}

createPool();

module.exports = pool;
