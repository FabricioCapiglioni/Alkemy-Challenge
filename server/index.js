const apiRoutes = require('./routes/route');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

var app = express()

app.set('port', process.env.PORT || 3000)

app.use(cors());
app.use(morgan("dev"));

app.use('/', apiRoutes);

app.get('/hulk', (req, res) => {
    console.log(res, req)
})

app.listen(app.get('port'), () => {
    console.log(`Server running on Port ${app.get('port')}`)
});