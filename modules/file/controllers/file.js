/**
 * @author chandan
 * @description Get one and more files from users 
 * and display the last 10 lines of each file using tail command
 */
var express = require('express')
var file_model = require('../models/file_model')
var router = express.Router()

/**
 * @param file
 * @returns json string
 */
router.post('/read', function (req, res) {
    file_model.insertFile(req, function (err, data) {
        if (err) res.status(400).json(err)
        else
            res.status(200).json(data)
            console.log(data)
    })
})

module.exports = router;