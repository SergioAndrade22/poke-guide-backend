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
            console.error(error)
            const parsedError = {
                status: 404,
                message: "Not Found"
            }
            if (error.response) {
                parsedError.status = error.response.status
                parsedError.message = error.response.message
            }
            res.status(parsedError.status).send({
                message: parsedError.message    
            })
        })
    
});

module.exports = router