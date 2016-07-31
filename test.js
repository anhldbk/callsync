'use strict'

const chai = require('chai')
const expect = chai.expect
const callSync = require('./')

describe('Tests for callsync', function(){
	it('should handle successful callbacks', function(){
		function downloadSuccessful(url, callback){
			console.log('Downloading url = ' + url + ' ...')
			var content = 'hi'
			callback(null, content)
		}		

		var res = callSync( downloadSuccessful, null, ['https://github.com'] )
        expect(res[0]).to.equal(null)		
        expect(res[1]).to.equal('hi')		
	})

	it('should handle failed callbacks', function(){
		function downloadFailed(url, callback){
			console.log('Downloading url = ' + url + ' ...')
			callback( 'failed' )
		}		

		var res = callSync( downloadFailed, null, ['https://github.com'] )
        expect(res[0]).to.equal('failed')		
        expect(res[1]).to.equal(undefined)		
	})

	it('should handle default parameters', function(){
		function download(callback){
			callback()
		}

		var res = callSync( download )
        expect(res[0]).to.equal(undefined)		
        expect(res[1]).to.equal(undefined)		
	})

	it('should handle contexts', function(){
		var object  = {
			data: 'Hi hi hi'
		}
		function showData(callback){
			console.log(this.data)
			callback()
		}		
		var res = callSync( showData, object )
        expect(res[0]).to.equal(undefined)		
        expect(res[1]).to.equal(undefined)				
	})
})
