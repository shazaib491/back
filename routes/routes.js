let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
const multer = require('multer')
const admin = require('../database/model/admin')
const material = require('../database/model/material')
const contacts = require('../database/model/contacts')
const db = require('../database/mongoose')
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var passport = require('passport');
require('../database/passport')(passport);





// Register user
router.post('/register', (req, res) => {
    let newUser = new admin({
        unmae: req.body.uname,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
    })
    var password = req.body.password;
    var cpassword = req.body.cpassword;
    if (password !== cpassword) {
        res.json({
            warn: "password is not matching"
        })
    } else {
        admin.addUser(newUser, (err, user) => {
            if (err) {
                res.json({
                    err: "user not registered",
                    errr: err
                });
            } else {
                res.json({
                    success: "user registered",
                    data: newUser
                });
            }
        })
    }
});

// Register user

// Authentication
router.post('/authenticate', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        admin.getUserByName(email, (err, user) => {
            if (err) throw err;
            if (!user) {
                res.json({
                    msg: "user not registred"
                })
            } else {
                admin.comparePassword(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        const token = jwt.sign({
                                user
                            },
                            db.secret, {
                                expiresIn: 604800 // 1 week
                            });
                        res.json({
                            success: true,
                            token: token
                        })
                    } else {
                        res.json({
                            success: false,
                            msg: "worng password"
                        })
                    }
                })

            }
        })
    })
    // Authentication

// check profile
router.get('/profile', passport.authenticate('jwt', {
        session: false

    }), (req, res) => {
        res.send(req.user);
    })
    // check profile

// set directory for public folder path
const DIR = './public/images/';
// set directory for public folder path

// set storage dir using multer
const storage = multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, DIR)
        },
        filename: (req, file, cb) => {
            const filename = file.originalname.toLowerCase();
            cb(null, filename)
            console.log(filename);
        }
    })
    // set storage dir using multer


// set file limitation
var upload = multer({
        storage: storage,
        limit: {
            fieldSize: 1024 * 1024 * 5
        },
        fileFilter: (req, file, cb) => {
            if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
                cb(null, true)
            } else {
                cb(null, false);
                return cb(new Error("only png jpeg jpg file allowed"))
            }
        }
    })
    // set file limitation

// shop material inserted data
router.post('/insert', upload.fields([{ name: 'avatar' }, { name: 'gallery'}, { name: 'third'}]), (req, res) => {
        console.log('comes')
        const url = req.protocol + '://' + req.get('host');
        let data = new material({
            p_name: req.body.p_name,
            p_sname: req.body.p_sname,
            discount: req.body.discount,
            price: req.body.price,
            image1: url + '/public/images/' + req.files['avatar'][0],
            image2: url + '/public/images/' + req.files['gallery'][0],
            image3: url + '/public/images/' + req.files['third'][0],
            p_category: req.body.p_category,
            c_date: Date.now(),
            u_date: Date.now()
        })

        material.addMaterail(data, (err, data) => {
            if (err) {
                res.json(err)};
            if (data) {
                res.json({
                    success: true,
                    msg: "Request Saved",
                    data: data
                })
            }
        })
    })
    // shop material
    // select all
router.get('/selectAll', (req, res) => {
        material.find({}).then((data) => res.json(data))
            .catch(err => res.json(err))
    })
    // select all

// select by id
router.get('/selectById/:_id', (req, res) => {
        const id = req.params._id;
        material.findById({
            _id: id
        }).then((result) => {
            res.send(result)
        }).catch(err => res.send(err))
    })
    // select by id
    // update  by id
router.patch('/update/:_id', upload.single('image'), (req, res) => {
        console.log(req);
        const url = req.protocol + '://' + req.get('host');
        const newValues = {
            $set: {
                p_name: req.body.p_name,
                p_sname: req.body.p_sname,
                discount: req.body.discount,
                price: req.body.price,
                p_category: req.body.p_category,
                image: url + '/public/images/' + req.file.filename
            }
        };
        material.updateOne({
            _id: req.params._id
        }, newValues).then((data) => {
            res.send("data Edited");
        }).catch(err => res.send(err, "wrong"))
    })
    // update  by id

//deleted  by id
router.delete('/remove/:_id', (req, res) => {
        material.deleteOne({
                _id: req.params._id
            })
            .then((result) => {
                res.send('data deleted')
            }).catch(err => res.send(err))
    })
    //deleted record by id

// Conatact Request inserted data
router.post('/contacts', (req, res) => {
        let data = new contacts({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            message: req.body.message
        })

        contacts.addContacts(data, (err, data) => {
            if (err) throw err;
            if (data) {
                res.json({
                  msg:"data submitted",
                  success:true
                })
                // var transporter = nodemailer.createTransport({
                //     service: 'gmail',
                //     host: 'smtp.gmail.com',
                //     port: 587,
                //     secure: false,
                //     requireTLS: true,
                //     auth: {
                //         user: 'uniquemensboutique@gmail.com',
                //         pass: 'mausamash'
                //     }
                // });
                // var mailOptions = {
                //     from: 'uniquemensboutique@gmail.com',
                //     to: data.email,
                //     subject: 'Dear user ',
                //     text: 'We Will contact you Soon!'
                // };
                // var mailOptions1 = {
                //
                //     from: data.email,
                //     to: 'uniquemensboutique@gmail.com',
                //     subject: 'New request comes',
                //     text: "\n" + "from:- Name:- \t" + data.name + "\n" + "  Email is :-\t" + data.email + "\n Mobile no :- \t " + data.mobile
                //
                // };
                // transporter.sendMail(mailOptions, function(error, info) {
                //     if (error) {
                //         console.log(error);
                //     } else {
                //         console.log('Email sent: ' + info.response);
                //         res.send({
                //             success: true,
                //             msg: "we will contact you soon"
                //         })
                //     }
                // });
                // transporter.sendMail(mailOptions1, function(error, info) {
                //     if (error) {
                //         console.log(error);
                //     } else {
                //         console.log('Email sent: ' + info.response);
                //         res.send({
                //             success: true,
                //
                //         })
                //     }
                // });

            }
        })
    })
    //  Conatct Request

module.exports = router;
