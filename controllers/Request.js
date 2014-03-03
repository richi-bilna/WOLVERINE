var BaseController = require('./Base'),
	View           = require('../views/Base'),
	model          = new (require('../models/ProductsModel'));

module.exports = BaseController.extend({
	name : 'request',
	content : null,

	onFeaturedProducts : function(req, res, next){
		model.setConnection(req.connection);
		
		var self = this;
		var storeId = req.param('storeId');
		var numProducts = req.param('numProducts');
		var blockName = req.param('blockName');
		this.content = {};

		model.getIdBlock(blockName, function(err, result){
			if(result.length > 0)
			{
				model.getProducts(result[0].id, storeId, numProducts, function(err, records){
					var productList = '';
					if(records.length > 0)
					{
						productList = JSON.stringify(records);
					}
					self.content.productList = productList;
					res.set('Access-Control-Allow-Origin', '*');
					res.set('Access-Control-Allow-Method', 'POST, GET, OPTIONS');
					res.set('Content-Type', 'application/json');
					res.json(self.content);
				});
			}
		});
	}

});