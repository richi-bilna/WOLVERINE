var Model = require("./Base"),
    crypto = require("crypto"),
    model = new Model();

var ProductsModel = model.extend({
    
    getlist: function(callback) {
        this.connection.query('SELECT *, IF(CURDATE()>=DATE(news_from_date) && CURDATE()<=DATE(news_to_date), 1, 0 ) AS is_new FROM bilna_featured_product_1 LIMIT 7', function (error, rows, fields) {
            callback(error, rows);
        });

    }

});

module.exports = ProductsModel;