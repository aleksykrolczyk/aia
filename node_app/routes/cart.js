let express = require('express')
let router = express.Router()
let semaphore = require('semaphore')(1)

let ObjectId = require('mongodb').ObjectID
let MongoClient = require('mongodb').MongoClient
const mongoURI = 'mongodb+srv://user_aia:password_aia@aiacluster-rff7e.mongodb.net/test?retryWrites=true&w=majority\n'

router.get('/', (req, res, next) => {
    if (req.cookies.cart === undefined) res.redirect('/')

    MongoClient.connect(mongoURI, (err, client) => {
        if (err) throw err
        let db = client.db('aiadb')
        db.collection('guitars').find({}).toArray((err, result) => {
            if (err) throw err

            let cart = JSON.parse(req.cookies.cart)

            let selected = result.filter(item => cart.includes(item._id.toString()))
            res.render('cart', {selected: selected})

        })
    })
})


router.post('/', (req, res, next) => {
    let cart = JSON.parse(req.cookies.cart)

    semaphore.take( () => {
        MongoClient.connect(mongoURI, (err, client) => {
            if (err) throw err
            let db = client.db('aiadb')
            db.collection('guitars').find({}).toArray((err, documents) => {
                if (err) throw err

                let alreadyBought = documents.filter(doc => doc.is_bought === true)
                if ( alreadyBought.some(doc => cart.includes(doc._id.toString())) ){
                    semaphore.leave()

                    res.cookie('cart', JSON.stringify([]))
                    res.redirect('/fail')
                }
                else {
                    let query = {"_id": {$in: cart.map( id => new ObjectId(id))}}
                    let newValues = {$set: {'is_bought': true}}
                    db.collection('guitars').updateMany(query, newValues)
                    semaphore.leave()

                    res.cookie('cart', JSON.stringify([]))
                    res.redirect('/success')
                }
            })
        })
    })
})

module.exports = router