# readl

> Read a file line-by-line in node.js

[![npm](https://img.shields.io/npm/v/readl.svg?style=flat-square)](https://www.npmjs.com/package/readl)
[![npm](https://img.shields.io/npm/dt/readl.svg?style=flat-square)](https://www.npmjs.com/package/readl)

## Install

You can install the latest version of the package using **npm**:

```
$ npm install --save readl
```

## Usage

```javascript
//Import dependencies
var readl = require('readl');

//File content
var content = '';

//Read the file
readl('file.txt', { encoding: 'utf8', start: 0 }, function(line)
{
  //Save the file content
  content = content + line + '\n';
});

//Show the file content
console.log(content);
```

## API

### readl(file, options, callback)

Execute the `callback` function one time for each line on the `file`.

##### file

A `string` with the path to the file.

##### options

An `object` with the following options:

- `encoding`: set the encoding. Default: `utf8`.
- `emptyLines`: set it to `false` if you want to omit the empty lines. Default: `true`.
- `start`: start position. Default is 0.
- `chunk`: set the chunk size. Default is 1024.
- `endl`: set the end-line character. Default is `0x0a`.

##### callback

A `function` that will be executed one time for each read line on the file. This function will pass the following arguments:

- `line`: a `string` with the read line.
- `index`: an `integer` with the line number. The line counter starts in 1.
- `position_start`: an `integer` with the start position of the line in the file.
- `position_end`: an `integer` with the end position of the line in the file.
- `length`: an `integer` with the number of bytes read.

You can break the loop at a particular line by making the callback function return `false`.  


## Related

- [readl-async](https://github.com/jmjuanes/readl-async): asynchronous version of this module.

## License

[MIT](./LICENSE) &copy; Josemi Juanes.
