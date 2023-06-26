import mysql2 from 'mysql2';

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_complete',
    password: ''
});

export default pool.promise();
