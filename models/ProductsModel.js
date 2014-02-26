var Model = require("./Base"),
    crypto = require("crypto"),
    model = new Model();

var ProductsModel = model.extend({
    
    getListProductsOnSale: function(storeId, numProducts, callback) {
        var sql = 'SELECT *, IF(CURDATE()>=DATE(news_from_date) && CURDATE()<=DATE(news_to_date), 1, 0 ) AS is_new FROM bilna_featured_product_1 LIMIT '+numProducts+'';
        this.connection.query(sql, function (error, rows, fields) {
            	callback(error, rows);
        });

    }

});

module.exports = ProductsModel;