const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'bvrslesowa23kntfxwij-mysql.services.clever-cloud.com',
  user: 'upynnvka8ziz9ag6',
  password: 'JP4Uyh7UzoWdDSTvGQzV',
  database: 'bvrslesowa23kntfxwij',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = connection;
