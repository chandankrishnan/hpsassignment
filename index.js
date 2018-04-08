var express = require('express')
var app = express()
var router = express.Router()
var bodyParser = require('body-parser')
var cors = require('cors');
var path=require('path')

app.use(function (req, res, next) {
    console.log("API backend called ")
    if (req.is('multipart/form-data')) {
    } else {
        req.headers["content-type"] = "application/json"
    }
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin,Authorization,X-HIP-KEY,X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Credentials', false)
    next()
})
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/',function(req,res){
    
  res.sendFile(path.resolve('index.html'));

});

app.use('/file', require('./modules/file/controllers/file.js'))
var port = process.env.PORT || 3008;
var server = app.listen(port, function () {
    console.log("Backedn API running on*** " + port);
})
module.exports = app;