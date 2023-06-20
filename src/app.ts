import express from 'express';
import countriesRoute from './routes/countries';
import dictionariesRoute from './routes/dictionaries';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use('/countries', countriesRoute);
app.use('/dictionaries', dictionariesRoute);


app.listen(3000);