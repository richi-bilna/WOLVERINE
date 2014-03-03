var BaseController = require('./Base'),
	View           = require('../views/Base'),
	model          = new (require('../models/ProductsModel'));

module.exports = BaseController.extend({
	name : 'request',
	
	content : null,
	idBlock : null,
	
	onSale1 : function(req, res, next){
		model.setConnection(req.connection);
		var self = this;
		var storeId = req.param('storeId');
		var numProducts = req.param('numProducts');
		var idblk = '';

		this.getIdBlock('product_sale', function(){
//console.log(self.idBlock);
			this.content = {};
			model.getProducts(self.idBlock, storeId, numProducts, function(err, records) {
				var productList = '';
				if(records.length > 0) {
					productList = JSON.stringify(records);
				}
console.log(productList);
				//self.content.productList = productList;
				res.set('Access-Control-Allow-Origin', '*');
				res.set('Access-Control-Allow-Method', 'POST, GET, OPTIONS');
				res.set('Content-Type', 'application/json');
				res.json(productList);
				//res.json(self.content);
	            callback();
			}, { type: 'request' });
		});

//console.log(this.idblk);

		/*this.getProducts(idblk, storeId, numProducts, function(){
			res.set('Access-Control-Allow-Origin', '*');
			res.set('Access-Control-Allow-Method', 'POST, GET, OPTIONS');
			res.set('Content-Type', 'application/json');
			res.json(self.content);
		});*/

		/*this.getProductsOnSale(storeId, numProducts, function(){
			res.set('Access-Control-Allow-Origin', '*');
			res.set('Access-Control-Allow-Method', 'POST, GET, OPTIONS');
			res.set('Content-Type', 'application/json');
			res.json(self.content);
		});*/

	},

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
	}, 

	getIdBlock : function(blockId, callback){
		var self = this;
		this.idBlock = { };
		model.getIdBlock(blockId, function(err, records){

			self.idBlock = records[0].id;
			callback();
		});
		return idBlock;
	},

	getProducts: function(idBlock, storeId, numProducts, callback){
		var self = this;
		this.content = {};
		model.getProducts(idBlock, storeId, numProducts, function(err, records) {
			var productList = '';
			if(records.length > 0) {
				productList = JSON.stringify(records);
			}
			self.content.productList = productList;
            callback();
		}, { type: 'request' });
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
	},

	onArrival : function(req, res, next){
		model.setConnection(req.connection);
		var self = this;
		var storeId = req.param('storeId');
		var numProducts = req.param('numProducts');

		this.getProductsOnArrival(storeId, numProducts, function(){
			res.set('Access-Control-Allow-Origin', '*');
			res.set('Access-Control-Allow-Method', 'POST, GET, OPTIONS');
			res.set('Content-Type', 'application/json');
			res.json(self.content);
		});

	},

	getProductsOnArrival: function(storeId, numProducts, callback) {
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