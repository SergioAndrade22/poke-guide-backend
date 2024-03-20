var express = require('express')
var router = express.Router()

var getPokemonByName = require('../apis/pokemon')

router.get("/:name", async function(req, res, next) {
    let name = req.params.name
    getPokemonByName(name)
        .then(pokemon => res.send({
            ...pokemon
        }))
        .catch(error => {
            res.status(error.response.status).send({
                message: error.response.statusText            
            })
        })
    
})

module.exports = router