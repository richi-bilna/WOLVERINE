var BaseController = require('./Base'),
	View           = require('../views/Base'),
	model          = new (require('../models/ProductsModel'));

module.exports = BaseController.extend({
	name : 'request',
	
	content : null,
	
	onSale : function(req, res, next){
		model.setConnection(req.connection);
		var self = this;
		var storeId = req.param('storeId');
		var numProducts = req.param('numProducts');

		this.getProductsOnSale(storeId, numProducts, function(){
			res.set('Access-Control-Allow-Origin', '*');
			res.set('Access-Control-Allow-Method', 'POST, GET, OPTIONS');
			res.set('Content-Type', 'application/json');
			res.json(self.content);
		});

	},

	getProductsOnSale: function(storeId, numProducts, callback) {
		var self = this;
		this.content = {};
		model.getListProductsOnSale(storeId, numProducts, function(err, records) {
			var productList = '';
			if(records.length > 0) {
				productList = JSON.stringify(records);
			}
			self.content.productList = productList;
            callback();
		}, { type: 'request' });
	}

});