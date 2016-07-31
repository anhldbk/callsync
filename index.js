'use strict'
const _ = require('lodash')
const deasync = require('deasync')

// Make an asynchronous function to be synchronous
// @param fnAsync: A function `(arg1, arg2, ..., argn, callback)`
// @parm context: [Optional] Context for the function to bind to. Default null
// @param args: [Optional] List of arguments excluding the callback, [arg1, arg2..., argn]
// @return: Returns [err, result] which are parameters passed to the callback
function callSync(fnAsync, context, args){
    if(! _.isFunction(fnAsync)){
        throw new Error('Invalid function')
    }
    if( ! _.isNil(args) ){
        if( ! _.isArray(args) ) {
            throw new Error('Invalid arguments')
        }
    } else {
        args = []
    }
    var result = null
    var loopStep = function(){
        return result === null
    }
    var done = function(err, res){
        result = [err, res]
    }
    args.push(done)
    fnAsync.apply(context, args)
    deasync.loopWhile(loopStep)
    return result
}

module.exports = callSync