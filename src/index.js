const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

const routes = require('./routes');
const db = require('./config/db')

//connect to db
db.connect()

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//overide method post
app.use(methodOverride('_method'))

//HTTP logger
// app.use(morgan('combined'))
//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a,b) => a + b,
        }
    }),
);
app.set(
    'view engine',
    'hbs',
);
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
routes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
