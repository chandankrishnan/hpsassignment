//Import dependencies
var readl = require('./index.js');

//File content
var content = '';

//Read the file
readl('file.txt', { encoding: 'utf8', emptyLines: false }, function(line, index)
{
  //Check the content
  if(line.replace(/\s/g, '') === ''){ return true; }

  //Save the file content
  content = content + line + '\n';
});

//Show the file content
console.log(content);
