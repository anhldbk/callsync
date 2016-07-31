Callsync
=====


### Overview

Being built on top of [deasync](https://github.com/abbr/deasync), this simple utility is to simplify the process of de-async callback functions. 

### Install

```sh
$ npm install --save callsync
```

### Usage

```js
const callsync = require('callsync')

// Download a resource
// @param url: (String) A valid url
// @param callback: (Function) a function (err, result) to process result
function download(url, callback){
	console.log('Downloading url = ' + url + '...')
	var content = 'hi hi hi' // just fake it
	callback(null, content)
}

var res = callsync( download, null, ['https://github.com/anhldbk/callsync'] )
// err = res[0], result = res[1]
```

For more usecases, have a look at `./test.js`

### License
The MIT License (MIT)

