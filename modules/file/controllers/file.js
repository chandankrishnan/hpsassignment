var express = require('express')
var file_model=require('../models/file_model')
var router = express.Router()


router.post('/read', function (req, res) {
    file_model.insertFile(req,function(err,data){
        if(err)res.status(400).json(err)
        else 
        res.status(200).json(data)
        console.log("data",data)
    })
})

module.exports = router;