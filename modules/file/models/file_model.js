var express = require('express')
var multiparty = require('multiparty')
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var fs = require('fs')
var async = require('async')
var fs = require('fs');
var pushdata = ''
// var writeStream = fs.createWriteStream(path.resolve('modules/file/models/report.txt'));
var filecount=0;
var path = require('path');


function Media() {
    if (!(this instanceof Media)) return new Media();
    this._started = false;
    EventEmitter.call(this);
}

inherits(Media, EventEmitter)

Media.prototype.insertFile = function (data, callback) {
    console.log("call")
    // callback(null,"chandan")
    fs.unlink(path.resolve('modules/file/models/report.txt'), function (err) {
        if (err) {
            console.error(err);
        }
        console.log("File deleted successfully!");
    });
    
    
    var form = new multiparty.Form();
    var url = []
    form.parse(data, function (error, fields, files) {
        console.log("filesss",files)
        var writeStream = fs.createWriteStream(path.resolve('modules/file/models/report.txt'));
        async.map(files.file, function (dd, i) {
            var readl = require('readl');
            filecount++
            //File content 
            var content = []

            //Read the file 
            readl(dd.path, { encoding: 'utf8', start: 0 }, function (line, index, position_start, position_end, length) {
                //Save the file content 
                content.push(line)

            });

            //Show the file content 
            ReadTenline(content,dd.originalFilename, function (err, data) {
                if (err) callback(err, null)
                else {
                    writeStream.write(data);
                }
            })
            if(files.file.length==filecount){
                console.log("callll eqqqq")
                callback(null, { "path": path.resolve('modules/file/models/report.txt') })
                filecount=0
            }
        })
        

    })

}


module.exports = new Media()

function ReadTenline(con,filename ,cb) {
    // console.log("Ccc",con)
    var pushdata = filename+'\n'  
    for (var i = 10; i >= 1; i--) {
        console.log(con[con.length - i]);
        pushdata = pushdata + con[con.length - i] + '\n';
        // console.log(pushdata)
    }
    cb(null, pushdata+'\n\n')
}