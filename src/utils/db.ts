import mysql2 from 'mysql2';

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_complete',
    password: 'newDeal#1'
});

export default pool.promise();