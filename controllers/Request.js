var BaseController = require('./Base'),
	View           = require('../views/Base'),
	model          = new (require('../models/ProductsModel'));

module.exports = BaseController.extend({
	name : 'request',
	
	content : null,
	
	run : function(get, req, res, next){
		model.setConnection(req.connection);
		var self = this;

		this.getContent(function(){
			res.set('Access-Control-Allow-Origin', '*');
			res.set('Access-Control-Allow-Method', 'POST, GET, OPTIONS');
			res.set('Content-Type', 'application/json');
			res.json(self.content);
		});

	},

	getContent: function(callback) {
		var self = this;
		this.content = {};
		model.getlist(function(err, records) {
			var productList = '';
			if(records.length > 0) {
				/*for(var i=0; record=records[i]; i++) {
					var record = records[i];
					productList += '<br/>record ad name ' + record.name;
				}*/
				productList = JSON.stringify(records);
				//console.log(productList);
			}
			self.content.productList = productList;
            callback();
		}, { type: 'request' });
	}

});