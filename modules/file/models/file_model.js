/**
 * @requires define require
 */
var express = require('express')
var multiparty = require('multiparty')
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var fs = require('fs')
var async = require('async')
var readl = require('readl');
var pushdata = ''
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
    var url = []
    form.parse(data, function (error, fields, files) {
        async.map(files.file, function (dd, i) {
            if (dd.path.match(/.(doc|txt|json|js|html)$/i)) {
                filecount++
                var content = [];
                readl(dd.path, { encoding: 'utf8', start: 0 }, function (line, index, position_start, position_end, length) {
                    content.push(line)
                });
                ReadTenline(content, dd.originalFilename, function (err, data) {
                    if (err) callback(err, null)
                    else {
                        filedata += data
                        if (files.file.length == filecount) {
                            callback(null, filedata)
                            filecount = 0
                            filedata = ''
                        }
                    }
                })
            } else {
                callback("Please select doc|txt|json|js|html file format", null)
            }
        })
    })
}

module.exports = new Media()

function ReadTenline(con, filename, cb) {
    var pushdata = filename + '\n'
    for (var i = 10; i >= 1; i--) {
        pushdata = pushdata + con[con.length - i] + '\n';
    }
    cb(null, pushdata + '------########---------')
}
