var express = require('express')
var router = express.Router()

var fetchAllLeaders = require('../apis/gym')

router.get("/:game", async function(req, res, next) {
    let game = req.params.game
    fetchAllLeaders(game)
        .then(leaders => {
            if (leaders.length > 0)
                res.send({
                    leaders
                })
            else
                res.status(404).send({
                    message: "Not found"
                })
        }).catch(error => {
            res.status(error.response.status).send({
                message: error.response.statusText            
            })
        })
    
});

module.exports = router