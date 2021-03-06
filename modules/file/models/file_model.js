/**
 * @requires define require
 */
var express = require('express')
var multiparty = require('multiparty')
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var async = require('async')
var sys = require('util')
var exec = require('child_process').exec;
var filedata = ''
var filecount = 0;


function Media() {
    if (!(this instanceof Media)) return new Media();
    this._started = false;
    EventEmitter.call(this);
}

inherits(Media, EventEmitter)

Media.prototype.insertFile = function (data, callback) {
    var form = new multiparty.Form();
    form.parse(data, function (error, fields, files) {
        async.map(files.file, function (dd, i) {
            if (dd.path.match(/.(doc|txt|json|js|html|xml|yml|csv)$/i)) {                
                var cmd = 'tail -n 10 ' + dd.path
                exec(cmd, function (err, stdout, stderr) {
                    if (err)
                        callback(err, null)
                    else {
                        ++filecount
                        filedata += "----" + dd.originalFilename + "----\n"
                        filedata += stdout;
                        filedata += "\n"
                        if (files.file.length == filecount) {
                            callback(null, filedata)
                            filecount = 0
                            filedata = ''
                        }
                    }
                })
            } else {
                callback("Please select doc|txt|json|js|html|xml|yml|csv file format", null)
            }
        })
    })
}

module.exports = new Media()
