//ADD BUFFER START, END AND LENGTH
//Import dependencies
var fs = require('fs');
var pstat = require('pstat');

//Read line from file
function readl(fd, start, chunk, endl)
{
  //Create the buffer
  var buff = new Buffer(chunk);

  //Get the chunk
  var bytesRead = fs.readSync(fd, buff, 0, chunk, start);

  //Check the length
  if(bytesRead === 0){ return false; }

  //Compare with the chunk size
  if(bytesRead < chunk){ buff = buff.slice(0, bytesRead); }

  //Get the line end
  var index = buff.indexOf(endl);

  //Slice the buffer
  buff = (index !== -1) ? buff.slice(0, index) : buff;

  //Return the buffer
  return buff;
}

//Exports to node
module.exports = function(file, opt, callback)
{
  //Check the file
  if(typeof file !== 'string'){ return new Error('Undefined file name'); }

  //Check for no options
  if(typeof opt === 'undefined'){ return new Error('Undefined callback function'); }

  //Check the options
  if(typeof opt === 'function'){ var callback = opt; opt = {}; }

  //Check the options
  if(typeof opt === 'string'){ opt = { encoding: opt }; }

  //Check the encoding option
  if(typeof opt.encoding === 'undefined'){ opt.encoding = 'utf8'; }

  //Check the empty line option
  if(typeof opt.emptyLines === 'undefined'){ opt.emptyLines = true; }

  //Check the start option
  if(typeof opt.start === 'undefined'){ opt.start = 0; }

  //Check the endline character
  if(typeof opt.endl === 'undefined'){ opt.endl = 0x0a; }

  //Check the chunk
  if(typeof opt.chunk === 'undefined'){ opt.chunk = 1024; }

  //Check for no options
  if(typeof callback === 'undefined'){ return new Error('Undefined callback function'); }

  //Check if file exists
  if(pstat.isFileSync(file) === false){ return new Error('File not found'); }

  //Open the file
  var fd = fs.openSync(file, 'r');

  //Actual position
  var position = opt.start;

  //Line count
  var count = 0;

  //Read all the lines
  while(true)
  {
    //Get the line
    var line = readl(fd, position, opt.chunk, opt.endl);

    //Check for exit
    if(line === false){ break; }

    //Convert the line to utf8
    var line_str = line.toString(opt.encoding);

    //Increment the line counter
    count = count + 1;

    //Save the start position
    var position_start = position;

    //Save the end position
    var position_end = position + line.length + 1;

    //Update the position
    position = position_end;

    //Check for empty line
    if(line_str.replace(/\s/g, '') === '' && opt.emptyLines === false){ continue; }

    //Do the callback
    var next = callback(line_str, count, position_start, position_end, line.length);

    //Check the next
    if(typeof next === 'undefined'){ var next = true; }

    //Check for breaking the loop
    if(next === false){ break; }
  }

  //Close the file
  fs.closeSync(fd);

  //Exit
  return;
};
