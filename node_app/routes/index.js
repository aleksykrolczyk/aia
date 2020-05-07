let express = require('express');
let router = express.Router();

let MongoClient = require('mongodb').MongoClient
const mongoURI = 'mongodb+srv://user_aia:password_aia@aiacluster-rff7e.mongodb.net/test?retryWrites=true&w=majority\n'


router.get(['/', '/home'], (req, res, next) => {
    if (req.cookies.cart === undefined) res.cookie('cart', JSON.stringify([]))

    let guitars = []
    MongoClient.connect(mongoURI, (err, client) => {
        if (err) throw err
        let db = client.db('aiadb')
        db.collection('guitars').find({'is_bought': false}).toArray((err, result) => {
            if (err) throw err

            let cart = req.cookies.cart || []
            let available = result.filter(item => !cart.includes(item._id.toString()))
            res.render('index', {available: available})
        })
    })
});

router.get('/fail', (req, res, next) => {
    res.render('fail')
})

router.get('/success', (req, res, next) => {
    res.render('success')
})

module.exports = router;
