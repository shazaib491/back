var express = require('express');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var admin = require('./database/model/admin');
var route = require('./routes/routes');
var passport = require('passport');
var path = require('path');
const { env } = require('process');
app.use(cors())
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', route);
app.use('/public', express.static('public'));

// app.use req error
app.use(function(err, req, res, next) {
        console.log(err.message);
        if (!err.statusCode) err.statusCode = 500;
        res.status(err.statusCode).send(err.message)

    })
    // app.use req error

app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'))
    })
    // ###### get null request #####
    // app.get('/', (req, res, next) => {
    //         res.send('nothing should be found');
    //     })
    // ###### get null request #####
const port = process.env.PORT || 8080;

//########server started#############
app.listen(process.env.PORT || 3000, () => {
    console.log('your server is running at port number 3000')
})

//########server started#############

// app.use request error
app.use((req, res, next) => {
        setImmediate(() => {
            next(new Error('something is wrong'));
        })
    })
    // app.use request error