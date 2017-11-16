var express = require('express')
var ggImages = require('google-images')
var client = new ggImages('004520671583386434812:ggwqkizegke','AIzaSyDRaybZit8AND4YTmyjcpDbV85Np4DlUJY')
var app = express()
var history = new Array()
app.get('/search/:q',function(req,res){
	var arr = []
	var temp = {}
	client.search(req.params.q,{page: req.query.offset}).then(function(images){
		images.forEach(function(obj){
			var temp = new Object()
			temp.url = obj.url
			temp.snippet = obj.description
			temp.thumbnail = obj.thumbnail.url
			temp.website = obj.parentPage
			arr.push(temp)
			
		})
		res.json(arr)
	})
	history.push({term:req.params.q,when: new Date() })
	
})
app.get('/history',function(req,res){
	res.json(history)
})
app.listen(process.env.PORT)